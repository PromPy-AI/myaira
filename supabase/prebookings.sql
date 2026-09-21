-- Source for the hosted early_prebookings migration. Backend-only access.
create table public.aira_ticket_counters (
  mode text primary key check (mode in ('test', 'live')),
  last_number bigint not null default 0
);
insert into public.aira_ticket_counters(mode) values ('test'), ('live');

create table public.aira_prebookings (
  id uuid primary key default gen_random_uuid(),
  token_hash text not null unique,
  request_hash text not null,
  name text not null check (length(name) between 2 and 120),
  email text not null check (length(email) <= 254),
  country text not null default 'India' check (country = 'India'),
  usage text[] not null check (cardinality(usage) between 1 and 8),
  device text not null default 'AIRA Loop' check (device = 'AIRA Loop'),
  consent_version text not null default 'early-prebook-v1',
  consent_at timestamptz not null default now(),
  mode text not null check (mode in ('test', 'live')),
  key_id text not null,
  amount integer not null default 9900 check (amount = 9900),
  currency text not null default 'INR' check (currency = 'INR'),
  payment_status text not null default 'creating'
    check (payment_status in ('creating','pending','failed','paid','partially_refunded','refunded')),
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  refunded_amount integer not null default 0 check (refunded_amount between 0 and 9900),
  ticket_id text unique,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ticket_id is null or paid_at is not null)
);
create index aira_prebookings_email_created on public.aira_prebookings(email, created_at);
create index aira_prebookings_created on public.aira_prebookings(created_at);
alter table public.aira_prebookings enable row level security;
alter table public.aira_ticket_counters enable row level security;
revoke all on public.aira_prebookings, public.aira_ticket_counters from public, anon, authenticated;
grant all on public.aira_prebookings, public.aira_ticket_counters to service_role;

-- Serializes request retries and bounds order creation. Receipt tokens never store PII.
create function public.aira_start_prebooking(p_token_hash text, p_request_hash text,
  p_name text, p_email text, p_usage text[], p_mode text, p_key_id text)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare b public.aira_prebookings;
begin
  perform pg_advisory_xact_lock(514092701);
  select * into b from public.aira_prebookings where token_hash = p_token_hash;
  if found then
    if b.request_hash <> p_request_hash then raise exception 'REQUEST_CONFLICT'; end if;
    return jsonb_build_object('is_new',false,'booking',to_jsonb(b));
  end if;
  if (select count(*) from public.aira_prebookings where created_at > now() - interval '1 hour') >= 500
    or (select count(*) from public.aira_prebookings where email = p_email and created_at > now() - interval '1 day') >= 5
  then raise exception 'RATE_LIMIT'; end if;
  insert into public.aira_prebookings(token_hash,request_hash,name,email,usage,mode,key_id)
    values(p_token_hash,p_request_hash,p_name,p_email,p_usage,p_mode,p_key_id) returning * into b;
  return jsonb_build_object('is_new',true,'booking',to_jsonb(b));
end $$;

-- Called ONLY by the backend after querying Razorpay. Row/counter locks make
-- callback + webhook retries atomic, and separate test tickets from real tickets.
create function public.aira_reconcile_prebooking(p_id uuid, p_order_id text,
  p_payment_id text, p_amount integer, p_currency text, p_status text,
  p_refunded integer default 0)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare b public.aira_prebookings; n bigint;
begin
  select * into b from public.aira_prebookings where id = p_id for update;
  if not found then raise exception 'NOT_FOUND'; end if;
  if b.razorpay_order_id is null or b.razorpay_order_id is distinct from p_order_id
    or p_amount is distinct from b.amount or p_currency is distinct from b.currency
    then raise exception 'PAYMENT_MISMATCH'; end if;
  if p_status is null or p_status not in ('captured','refunded','failed','authorized','created')
    then raise exception 'INVALID_STATUS'; end if;
  if p_status in ('captured','refunded') then
    if b.razorpay_payment_id is not null and b.razorpay_payment_id <> p_payment_id
      then raise exception 'PAYMENT_CONFLICT'; end if;
    if p_payment_id is null or p_refunded is null or p_refunded < 0 or p_refunded > b.amount
      or (p_status = 'refunded' and p_refunded = 0) then raise exception 'INVALID_REFUND'; end if;
    b.refunded_amount := greatest(b.refunded_amount, p_refunded);
    if b.ticket_id is null and b.refunded_amount < b.amount then
      update public.aira_ticket_counters set last_number = last_number + 1
        where mode = b.mode returning last_number into n;
      b.ticket_id := case when b.mode = 'test' then 'TEST-' else '' end || 'AI500RA' || n;
    end if;
    update public.aira_prebookings set
      payment_status = case when b.refunded_amount = b.amount then 'refunded'
        when b.refunded_amount > 0 then 'partially_refunded' else 'paid' end,
      razorpay_payment_id = p_payment_id, refunded_amount = b.refunded_amount,
      ticket_id = b.ticket_id, paid_at = coalesce(paid_at, now()), updated_at = now()
      where id = p_id returning * into b;
  elsif b.paid_at is null then
    update public.aira_prebookings set payment_status = case when p_status = 'failed' then 'failed' else 'pending' end,
      updated_at = now() where id = p_id returning * into b;
  end if;
  return to_jsonb(b);
end $$;
revoke all on function public.aira_start_prebooking(text,text,text,text,text[],text,text) from public, anon, authenticated;
revoke all on function public.aira_reconcile_prebooking(uuid,text,text,integer,text,text,integer) from public, anon, authenticated;
grant execute on function public.aira_start_prebooking(text,text,text,text,text[],text,text) to service_role;
grant execute on function public.aira_reconcile_prebooking(uuid,text,text,integer,text,text,integer) to service_role;
