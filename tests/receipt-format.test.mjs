import test from "node:test";
import assert from "node:assert/strict";
import { formatReceipt } from "../src/lib/receipt-format.ts";
test("download contains only six requested fields, with an explicit payment timezone", () => {
  const result = formatReceipt({
    name: "Test Customer",
    ticketId: "AI500RA1",
    device: "AIRA Loop",
    status: "paid",
    amount: 9900,
    currency: "INR",
    paidAt: "2026-09-17T05:30:00Z",
  });
  assert.deepEqual(
    result.split("\n").map((x) => x.split(":")[0]),
    ["Name", "Token", "Device", "Status", "Amount", "Paid at"],
  );
  assert.match(result, /Token: AI500RA1/);
  assert.match(result, /Amount: ₹99\.00/);
  assert.match(result, /11:00:00.*IST/);
});
