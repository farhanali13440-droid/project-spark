import { describe, expect, it } from "vitest";
import {
  META_PIXEL_ID,
  VIEW_CONTENT_PARAMS,
  WEBINAR_NAME,
  WEBINAR_VALUE,
} from "@/lib/meta-pixel";

describe("Landing page ViewContent event", () => {
  it("sends the webinar product details to the pixel", () => {
    expect(VIEW_CONTENT_PARAMS).toEqual({
      content_name: "Root-Cause Health Webinar",
      content_type: "product",
      value: 499,
      currency: "PKR",
    });
  });

  it("stays in step with the shared price and name", () => {
    expect(VIEW_CONTENT_PARAMS.content_name).toBe(WEBINAR_NAME);
    expect(VIEW_CONTENT_PARAMS.value).toBe(WEBINAR_VALUE.value);
    expect(VIEW_CONTENT_PARAMS.currency).toBe(WEBINAR_VALUE.currency);
    expect(META_PIXEL_ID).toBe("1115241467884805");
  });

  it("never carries visitor identity fields", () => {
    expect(Object.keys(VIEW_CONTENT_PARAMS).sort()).toEqual([
      "content_name",
      "content_type",
      "currency",
      "value",
    ]);
  });
});
