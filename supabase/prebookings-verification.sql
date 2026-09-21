-- Run AFTER applying prebookings.sql, in a privileged SQL editor.
-- Every inserted record and counter increment is rolled back.
begin;
do $$
declare
  a jsonb; b jsonb; c jsonb; result jsonb; id1 uuid; id2 uuid; id3 uuid;
  test_start bigint; live_start bigint;
begin
  select last_number into test_start from public.aira_ticket_counters where mode='test';
  select last_number into live_start from public.aira_ticket_counters where mode='live';
  if has_table_privilege('anon','public.aira_prebookings','SELECT')
    or has_table_privilege('authenticated','public.aira_prebookings','INSERT')
    or has_function_privilege('anon','public.aira_reconcile_prebooking(uuid,text,text,integer,text,text,integer)','EXECUTE')
    or has_function_privilege('authenticated','public.aira_start_prebooking(text,text,text,text,text[],text,text)','EXECUTE')
    then raise exception 'Public privileges exposed'; end if;

  a := public.aira_start_prebooking(repeat('f',64),repeat('a',64),'SQL Test','sql-test@example.invalid',array['Meetings & work'],'test','rzp_test_verification');
  id1 := (a->'booking'->>'id')::uuid;
  b := public.aira_start_prebooking(repeat('f',64),repeat('a',64),'SQL Test','sql-test@example.invalid',array['Meetings & work'],'test','rzp_test_verification');
  if (b->>'is_new')::boolean or (b->'booking'->>'id')::uuid <> id1 then raise exception 'Create is not idempotent'; end if;
  update public.aira_prebookings set razorpay_order_id='order_sqltest1',payment_status='pending' where id=id1;
  result := public.aira_reconcile_prebooking(id1,'order_sqltest1','pay_sqltest1',9900,'INR','authorized',0);
  if result->>'ticket_id' is not null then raise exception 'Authorized payment got ticket'; end if;

  begin
    perform public.aira_reconcile_prebooking(id1,'order_sqltest1','pay_sqltest1',99,'INR','captured',0);
    raise exception 'Expected amount mismatch';
  exception when others then
    if sqlerrm <> 'PAYMENT_MISMATCH' then raise; end if;
  end;
  a := public.aira_reconcile_prebooking(id1,'order_sqltest1','pay_sqltest1',9900,'INR','captured',0);
  b := public.aira_reconcile_prebooking(id1,'order_sqltest1','pay_sqltest1',9900,'INR','captured',0);
  if a->>'ticket_id' <> 'TEST-AI500RA' || (test_start+1)::text or a->>'ticket_id' <> b->>'ticket_id'
    then raise exception 'Ticket allocation failed'; end if;

  c := public.aira_start_prebooking(repeat('e',64),repeat('a',64),'SQL Test','sql-test@example.invalid',array['Meetings & work'],'test','rzp_test_verification');
  id2 := (c->'booking'->>'id')::uuid;
  update public.aira_prebookings set razorpay_order_id='order_sqltest2',payment_status='pending' where id=id2;
  c := public.aira_reconcile_prebooking(id2,'order_sqltest2','pay_sqltest2',9900,'INR','captured',0);
  if c->>'ticket_id' <> 'TEST-AI500RA' || (test_start+2)::text then raise exception 'Second ticket not sequential'; end if;

  c := public.aira_start_prebooking(repeat('d',64),repeat('a',64),'SQL Test','sql-test@example.invalid',array['Meetings & work'],'live','rzp_live_verification');
  id3 := (c->'booking'->>'id')::uuid;
  update public.aira_prebookings set razorpay_order_id='order_sqltest3',payment_status='pending' where id=id3;
  c := public.aira_reconcile_prebooking(id3,'order_sqltest3','pay_sqltest3',9900,'INR','captured',0);
  if c->>'ticket_id' <> 'AI500RA' || (live_start+1)::text then raise exception 'Live counter affected by test'; end if;

  result := public.aira_reconcile_prebooking(id1,'order_sqltest1','pay_sqltest1',9900,'INR','refunded',9900);
  result := public.aira_reconcile_prebooking(id1,'order_sqltest1','pay_sqltest1',9900,'INR','captured',0);
  if result->>'payment_status' <> 'refunded' or result->>'ticket_id' <> a->>'ticket_id'
    then raise exception 'Stale capture reversed refund'; end if;
  result := public.aira_reconcile_prebooking(id2,'order_sqltest2','pay_sqltestfailed',9900,'INR','failed',0);
  if result->>'payment_status' <> 'paid' then raise exception 'Failure reversed capture'; end if;
end $$;
rollback;
