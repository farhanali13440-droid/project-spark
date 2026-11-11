import { describe, expect, it } from "vitest";
import { getWebinarCountdown, WEBINAR_END, WEBINAR_START } from "@/lib/webinar-config";

describe("Webinar schedule", () => {
  it("starts on Sunday 22 November 2026 at 7 PM Pakistan time", () => {
    expect(WEBINAR_START).toBe("2026-11-22T19:00:00+05:00");
    expect(new Date(WEBINAR_START).getUTCDay()).toBe(0);
    expect(new Date(WEBINAR_START).toISOString()).toBe("2026-11-22T14:00:00.000Z");
  });
  it("ends at 8 PM Pakistan time", () => {
    expect(WEBINAR_END).toBe("2026-11-22T20:00:00+05:00");
    expect(Date.parse(WEBINAR_END) - Date.parse(WEBINAR_START)).toBe(3600000);
  });
  it("counts down to the start regardless of visitor timezone", () => {
    expect(getWebinarCountdown(Date.parse("2026-11-21T12:57:56Z"))).toEqual({ days: 1, hours: 1, minutes: 2, seconds: 4, status: "upcoming" });
  });
  it("shows live during the session and never counts below zero", () => {
    expect(getWebinarCountdown(Date.parse(WEBINAR_START))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, status: "live" });
    expect(getWebinarCountdown(Date.parse(WEBINAR_END))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, status: "ended" });
  });
});