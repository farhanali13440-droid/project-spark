import { useEffect, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { getWebinarCountdown, WEBINAR_DATE_LABEL, WEBINAR_TIME_LABEL } from "@/lib/webinar-config";

export function WebinarSchedule() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = now === null ? null : getWebinarCountdown(now);

  return (
    <div className="mt-6 max-w-xl">
      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold sm:text-base">
        <p className="flex items-center gap-2"><CalendarDays className="h-5 w-5 shrink-0 text-primary" />{WEBINAR_DATE_LABEL}</p>
        <p className="flex items-center gap-2"><Clock3 className="h-5 w-5 shrink-0 text-primary" />{WEBINAR_TIME_LABEL}</p>
      </div>
      <p className="mt-5 text-sm font-bold text-primary" aria-live="polite">
        {countdown?.status === "live" ? "The webinar is live now" : countdown?.status === "ended" ? "The webinar has ended" : "WEBINAR STARTS IN"}
      </p>
      <div role="timer" aria-label="Countdown to the webinar" className="mt-3 grid max-w-sm grid-cols-4 gap-3">
        {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
          <div key={unit} className="rounded-lg border border-border bg-secondary/50 py-3 text-center">
            <span className="block font-display text-2xl font-bold tabular-nums text-primary sm:text-3xl">{countdown ? String(countdown[unit]).padStart(2, "0") : "–"}</span>
            <span className="mt-1 block text-xs capitalize text-muted-foreground">{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}