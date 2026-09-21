# AIRA early pre-bookings — key-and-secret setup

## Current status

The hosted tables exist with RLS enabled. The aira-prebook Edge Function is active
at version 2 with verify_jwt=false and key-and-secret checkout is working.

The latest local update adds token-authorized editing of unpaid pre-bookings and
name/device fields in receipts. Publishing it through MCP was blocked by the
approval service (HTTP 404: review API deployment missing). Redeploy the generated
single-file function below to activate editing; no SQL changes are required.

## Apply the fix

1. Open the existing aira-prebook function in the Supabase dashboard.
2. Replace its index.ts contents with supabase/dashboard/aira-prebook.ts and deploy.
   Keep JWT verification off; custom API-key/origin checks, private receipt tokens
   and payment HMAC verification are implemented inside the function.
3. Keep these two existing Edge Function secrets:
   - RAZORPAY_KEY_ID
   - RAZORPAY_SECRET

No webhook, RAZORPAY_WEBHOOK_SECRET or AIRA_PAYMENTS_ENABLED setting is required.
The old enable flag is ignored. Do not re-run the SQL creation script.

The generated single-file source comes from supabase/functions/aira-prebook/index.ts
and core.ts. Regenerate after edits with:

    node scripts/package-prebooking-function.mjs

## Verify after deployment

- Reopen the website's Early pre-bookings form. Its config request should return
  enabled:true when a correctly formatted key ID and nonempty secret are present.
  This checks configuration presence; valid merchant credentials are confirmed
  when Razorpay accepts the server-created order.
- In Razorpay test mode, complete a ₹99 test payment and confirm a TEST-AI500RA...
  ticket is displayed and stored. Test failed/cancelled checkout and Resume checkout.
- Enable automatic capture in Razorpay. The backend issues tickets only for captured
  payments, never for a merely authorized payment or unverified browser message.
- Default allowed website origins are http://localhost:8080 and
  https://useaira.netlify.app. For other domains, set AIRA_ALLOWED_ORIGINS to exact
  comma-separated origins without trailing slashes.
- The server charges only INR 9900 paise (₹99). It verifies the checkout signature,
  retrieves the payment from Razorpay, and checks order ID, amount, currency and status.
- The secret key stays in the Edge Function. Never put it in frontend code.

## Recovery without webhooks

Normal success uses the checkout callback and server verification immediately.
The browser saves a private receipt token. Reopening the form or choosing Check
payment status queries Razorpay and reconciles a completed payment. Retrying a
saved checkout reuses its original order.

If the browser closes before confirmation, records update when the customer next
checks status; there is no background webhook reconciliation. Refunds processed
in the Razorpay dashboard likewise appear after a status check. Optional signed
webhook handling remains available if enabled later, but does not gate checkout.

If an order-creation response is lost before the order ID is stored, the record
stays creating to prevent a duplicate charge. Check Razorpay using the reservation
UUID as receipt before resolving that record or asking for another deposit.

## Validation

25 mocked payment and receipt tests pass, including key-pair-only checkout, signature rejection,
amount validation, confirmation without webhooks, and payment status recovery.
TypeScript checks pass. A real Razorpay end-to-end payment has not been performed.
SQL runtime verification was blocked by automatic approval review. Security advisors
reported only expected backend-only RLS tables with no public policies:
https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy

Live tickets use AI500RA1, AI500RA2, etc. Test tickets use a separate counter and
TEST- prefix. Customer records and ticket-allocation RPCs remain backend-only.

## Receipt and editing update

The downloaded text receipt contains only Name, Token (public ticket ID), Device,
Status, Amount and Paid at (date/time in IST). It never contains the private recovery token.

Edit pre-booking reloads name, email and selected uses after checking Razorpay.
Save & continue to payment updates the existing reservation and reuses its order.
Captured/refunded records cannot be edited; authorized payments must finish first.
The database update is conditional on unpaid status so a concurrent stored payment
confirmation prevents the edit. Original receipt access and order IDs are preserved.
