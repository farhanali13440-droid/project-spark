import { useEffect, useState } from "react";
import { CalendarDays, Clock3 } from "lucide-react";
import { getWebinarCountdown, WEBINAR_DATE_LABEL, WEBINAR_TIME_LABEL } from "@/lib/webinar-config";

export function WebinarSchedule({ centered = false, inverse = false }: { centered?: boolean; inverse?: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = now === null ? null : getWebinarCountdown(now);

  return (
    <div className={`mt-6 max-w-xl ${centered ? "mx-auto text-center" : ""}`}>
      <div className={`flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold sm:text-base ${centered ? "justify-center" : ""}`}>
        <p className="flex items-center gap-2"><CalendarDays className={`h-5 w-5 shrink-0 ${inverse ? "text-primary-foreground" : "text-primary"}`} />{WEBINAR_DATE_LABEL}</p>
        <p className="flex items-center gap-2"><Clock3 className={`h-5 w-5 shrink-0 ${inverse ? "text-primary-foreground" : "text-primary"}`} />{WEBINAR_TIME_LABEL}</p>
      </div>
      <p className={`mt-5 text-sm font-bold ${inverse ? "text-primary-foreground" : "text-primary"}`} aria-live="polite">
        {countdown?.status === "live" ? "The webinar is live now" : countdown?.status === "ended" ? "The webinar has ended" : "WEBINAR STARTS IN"}
      </p>
      <div role="timer" aria-label="Countdown to the webinar" className={`mt-3 grid max-w-sm grid-cols-4 gap-3 ${centered ? "mx-auto" : ""}`}>
        {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
          <div key={unit} className={`rounded-lg border py-3 text-center ${inverse ? "border-primary-foreground/30 bg-primary-foreground/10" : "border-border bg-secondary/50"}`}>
            <span className={`block font-display text-2xl font-bold tabular-nums sm:text-3xl ${inverse ? "text-primary-foreground" : "text-primary"}`}>{countdown ? String(countdown[unit]).padStart(2, "0") : "–"}</span>
            <span className={`mt-1 block text-xs capitalize ${inverse ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}