// Fill in your real account details here. Leave as placeholders until confirmed.
export const PAYMENT_AMOUNT = "PKR 499";

export const PAYMENT_METHODS = [
  {
    id: "jazzcash",
    name: "JazzCash",
    fields: [
      { label: "Account Holder Name", value: "[Account holder name]" },
      { label: "JazzCash Number", value: "[03XX XXXXXXX]" },
    ],
  },
  {
    id: "easypaisa",
    name: "Easypaisa",
    fields: [
      { label: "Account Holder Name", value: "[Account holder name]" },
      { label: "Easypaisa Number", value: "[03XX XXXXXXX]" },
    ],
  },
  {
    id: "bank",
    name: "Bank Transfer",
    fields: [
      { label: "Bank Name", value: "Meezan Bank" },
      { label: "Account Holder Name", value: "The Academy of Champions" },
      { label: "Account Number", value: "02140106229369" },
      { label: "IBAN", value: "PK11MEZN0002140106229369" },
    ],
  },
] as const;

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]["id"];
