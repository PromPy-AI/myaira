export function formatReceipt(receipt: {
  name: string;
  ticketId: string | null;
  device: string;
  status: string;
  amount: number;
  currency: string;
  paidAt: string | null;
}) {
  const paidAt = receipt.paidAt
    ? new Intl.DateTimeFormat("en-IN", {
        dateStyle: "medium",
        timeStyle: "medium",
        timeZone: "Asia/Kolkata",
      }).format(new Date(receipt.paidAt)) + " IST"
    : "Not paid";
  const amount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: receipt.currency,
  }).format(receipt.amount / 100);
  const status = receipt.status.replaceAll("_", " ").replace(/^./, (x) => x.toUpperCase());
  return [
    `Name: ${receipt.name.replace(/[\r\n]+/g, " ")}`,
    `Token: ${receipt.ticketId || "Not issued"}`,
    `Device: ${receipt.device}`,
    `Status: ${status}`,
    `Amount: ${amount}`,
    `Paid at: ${paidAt}`,
  ].join("\n");
}
