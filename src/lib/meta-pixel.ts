// Meta Pixel (Healing Hive). Never send name, email or phone through here.
export const META_PIXEL_ID = "1115241467884805";
export const WEBINAR_VALUE = { value: 499, currency: "PKR" } as const;
export const WEBINAR_NAME = "Root-Cause Health Webinar";
const PURCHASE_FLAG = "pixel_purchase_pending";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

// Regions where ad tracking needs prior consent (EU/EEA, UK, Switzerland).
const CONSENT_REGIONS = new Set(
  "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO GB CH".split(" "),
);

let allowedPromise: Promise<boolean> | null = null;
function isAllowed(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if ((navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return Promise.resolve(false);
  allowedPromise ??= (async () => {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 2000);
      const res = await fetch("/cdn-cgi/trace", { signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) return false;
      const txt = await res.text();
      const loc = /^loc=(.+)$/m.exec(txt)?.[1]?.trim();
      const h = /^h=(.+)$/m.exec(txt)?.[1]?.trim();
      if (!loc || loc === "XX" || loc === "T1" || (h && h !== location.host)) return false;
      return !CONSENT_REGIONS.has(loc);
    } catch {
      return false;
    }
  })();
  return allowedPromise;
}

let lastPath: string | null = null;
let loaded = false;

function load() {
  if (loaded || window.fbq) return;
  loaded = true;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod.apply(n, args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", META_PIXEL_ID, {}, { agent: "lovable" });
}

export async function track(event: string, params?: Record<string, unknown>) {
  if (!(await isAllowed())) return;
  load();
  if (params) window.fbq?.("track", event, params);
  else window.fbq?.("track", event);
}

/** Fire PageView once per page (initial load + each route change). */
export function trackPageView(pathname: string) {
  if (pathname === lastPath) return;
  lastPath = pathname;
  void track("PageView");
}

export function markRegistrationComplete() {
  try {
    sessionStorage.setItem(PURCHASE_FLAG, "1");
  } catch {
    /* ignore */
  }
}

/** Returns true once after a completed registration; false on refresh. */
export function consumeRegistrationComplete(): boolean {
  try {
    if (sessionStorage.getItem(PURCHASE_FLAG) !== "1") return false;
    sessionStorage.removeItem(PURCHASE_FLAG);
    return true;
  } catch {
    return false;
  }
}
