import { describe, expect, it } from "vitest";
import { PAYMENT_AMOUNT } from "@/lib/payment-config";

describe("Webinar registration price", () => {
  it("costs PKR 499", () => {
    expect(PAYMENT_AMOUNT).toBe("PKR 499");
  });
});
