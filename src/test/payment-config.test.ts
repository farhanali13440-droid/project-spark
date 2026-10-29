import { describe, expect, it } from "vitest";
import { PAYMENT_AMOUNT, PAYMENT_METHODS } from "@/lib/payment-config";

describe("Webinar registration price", () => {
  it("costs PKR 499", () => {
    expect(PAYMENT_AMOUNT).toBe("PKR 499");
  });
});

describe("Bank transfer account details", () => {
  const bank = PAYMENT_METHODS.find((m) => m.id === "bank")!;
  const value = (label: string) => bank.fields.find((f) => f.label === label)?.value;

  it("pays to The Academy of Champions at Meezan Bank", () => {
    expect(value("Bank Name")).toBe("Meezan Bank");
    expect(value("Account Holder Name")).toBe("The Academy of Champions");
  });

  it("shows the confirmed IBAN and account number", () => {
    expect(value("IBAN")).toBe("PK11MEZN0002140106229369");
    expect(value("Account Number")).toBe("02140106229369");
  });
});
