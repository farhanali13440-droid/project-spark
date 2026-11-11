import { describe, expect, it } from "vitest";
import { filterRegistrations, registrationSummary, type Registration } from "@/lib/admin-registrations";

const row: Registration = { id: "registration-1", full_name: "Ayesha Khan", whatsapp: "+923001234567", email: "ayesha@example.com", city: "Karachi", learn_goal: "Digestive health", method: "bank", amount: 499, transaction_id: "TXN-123", screenshot_path: "receipt.png", status: "pending", admin_note: null, reviewed_at: null, created_at: "2026-11-11T03:47:00Z" };
describe("Admin registration information", () => {
  it("includes registrations of every status in the all view", () => {
    const rows = [row, { ...row, id: "2", status: "approved" }, { ...row, id: "3", status: "rejected" }];
    expect(filterRegistrations(rows, "all", "").map((r) => r.id)).toEqual(["registration-1", "2", "3"]);
    expect(filterRegistrations(rows, "pending", "").map((r) => r.id)).toEqual(["registration-1"]);
  });
  it("finds submitted contact, city, learning and transaction information", () => {
    for (const query of ["Ayesha", "+923001234567", "ayesha@example.com", "Karachi", "Digestive", "TXN-123"]) {
      expect(filterRegistrations([row], "all", query)).toEqual([row]);
    }
    expect(filterRegistrations([row], "all", "Lahore")).toEqual([]);
  });
  it("totals approved payment amounts without counting pending or rejected payments", () => {
    expect(registrationSummary([row, { ...row, id: "2", status: "approved" }, { ...row, id: "3", status: "rejected" }])).toEqual({ total: 3, pending: 1, approved: 1, rejected: 1, approvedAmount: 499 });
  });
});