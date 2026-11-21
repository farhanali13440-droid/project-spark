export const WEBINAR_START = "2026-11-24T20:00:00+05:00";
export const WEBINAR_END = "2026-11-24T21:00:00+05:00";
export const WEBINAR_DATE_LABEL = "Tuesday, 24 November 2026";
export const WEBINAR_TIME_LABEL = "8:00 PM – 9:00 PM (Pakistan time)";

export function getWebinarCountdown(now: number) {
  const secondsRemaining = Math.max(0, Math.floor((Date.parse(WEBINAR_START) - now) / 1000));
  return {
    days: Math.floor(secondsRemaining / 86400),
    hours: Math.floor((secondsRemaining % 86400) / 3600),
    minutes: Math.floor((secondsRemaining % 3600) / 60),
    seconds: secondsRemaining % 60,
    status: now >= Date.parse(WEBINAR_END) ? "ended" : now >= Date.parse(WEBINAR_START) ? "live" : "upcoming",
  };
}