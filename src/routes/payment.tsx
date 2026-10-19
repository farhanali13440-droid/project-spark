import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import { CheckCircle2, Clock, Copy, Landmark, Smartphone, Stethoscope, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PAYMENT_AMOUNT, PAYMENT_METHODS, type PaymentMethodId } from "@/lib/payment-config";

export const Route = createFileRoute("/payment")({
  head: () => ({
    meta: [
      { title: "Complete Payment — Root-Cause Health Webinar" },
      { name: "description", content: "Pay PKR 499 via JazzCash, Easypaisa or bank transfer and submit your proof for verification." },
      { property: "og:title", content: "Complete Your Webinar Payment — PKR 499" },
      { property: "og:description", content: "Pay via JazzCash, Easypaisa or bank transfer to confirm your seat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PaymentPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  whatsapp: z.string().trim().regex(/^\+?[0-9\s-]{10,16}$/, "Enter a valid WhatsApp number"),
  method: z.enum(["jazzcash", "easypaisa", "bank"], { message: "Choose a payment method" }),
  transaction_id: z.string().trim().min(3, "Enter the transaction ID").max(100),
});
type Errors = Partial<Record<keyof z.infer<typeof schema> | "screenshot" | "form", string>>;

const field =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20";

function PaymentPage() {
  const [active, setActive] = useState<PaymentMethodId>("jazzcash");
  const [prefill, setPrefill] = useState({ name: "", whatsapp: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem("currentRegistration") ?? "null");
      if (r) setPrefill({ name: r.name ?? "", whatsapp: r.whatsapp ?? "" });
    } catch {
      /* ignore */
    }
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const file = fd.get("screenshot") as File | null;
    const result = schema.safeParse(Object.fromEntries(fd));
    const errs: Errors = {};
    if (!result.success) for (const i of result.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
    if (!file || file.size === 0) errs.screenshot = "Please upload your payment screenshot";
    else if (!file.type.startsWith("image/")) errs.screenshot = "Screenshot must be an image";
    else if (file.size > 5 * 1024 * 1024) errs.screenshot = "Image must be under 5 MB";
    setErrors(errs);
    if (!result.success || Object.keys(errs).length || !file) return;

    setLoading(true);
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const up = await supabase.storage.from("payment-screenshots").upload(path, file, { contentType: file.type });
    if (up.error) {
      setLoading(false);
      setErrors({ form: "Upload failed. Please try again." });
      return;
    }
    const { error } = await supabase.from("payments").insert({ ...result.data, screenshot_path: path });
    setLoading(false);
    if (error) {
      setErrors({ form: "Could not submit. Please try again." });
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const method = PAYMENT_METHODS.find((m) => m.id === active)!;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <Stethoscope className="h-6 w-6 text-primary" /> Root-Cause Health
        </Link>
        <span className="text-sm text-muted-foreground">Step 2 of 2 · Payment</span>
      </header>

      {done ? (
        <section className="mx-auto max-w-xl px-5 py-16 text-center">
          <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
            <Clock className="h-8 w-8" />
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            Pending Verification
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold">Thank you! We've received your payment details.</h1>
          <p className="mt-4 text-muted-foreground">
            Our team will verify your payment and contact you on WhatsApp once it's confirmed.
          </p>
        </section>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-8 px-5 pb-16 lg:grid-cols-[1fr_1.1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl bg-primary p-8 text-primary-foreground">
              <p className="text-sm font-semibold uppercase tracking-wider opacity-80">Amount due</p>
              <p className="mt-2 font-display text-5xl font-bold">{PAYMENT_AMOUNT}</p>
              <p className="mt-2 opacity-90">Webinar registration fee</p>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl font-bold">How to pay</h2>
              <ol className="mt-4 space-y-3 text-sm">
                {[
                  `Send exactly ${PAYMENT_AMOUNT} using one of the methods below.`,
                  "Save the transaction ID and take a screenshot of the receipt.",
                  "Fill in the form and upload your screenshot.",
                  "We'll verify and confirm your seat on WhatsApp.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6">
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActive(m.id)}
                    className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-3 text-sm font-semibold transition ${
                      active === m.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {m.id === "bank" ? <Landmark className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                    {m.name}
                  </button>
                ))}
              </div>
              <dl className="mt-5 space-y-3">
                {method.fields.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-3 rounded-xl bg-secondary/60 px-4 py-3">
                    <div className="min-w-0">
                      <dt className="text-xs text-muted-foreground">{f.label}</dt>
                      <dd className="truncate font-semibold">{f.value}</dd>
                    </div>
                    <button
                      type="button"
                      aria-label={`Copy ${f.label}`}
                      onClick={() => navigator.clipboard?.writeText(f.value)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-background"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <form onSubmit={onSubmit} noValidate className="h-fit space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">After paying</p>
              <h2 className="font-display text-3xl font-bold">Submit your payment proof</h2>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Full Name</span>
              <input name="full_name" defaultValue={prefill.name} key={`n${prefill.name}`} className={field} />
              {errors.full_name && <span className="mt-1 block text-sm text-destructive">{errors.full_name}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">WhatsApp Number</span>
              <input name="whatsapp" type="tel" defaultValue={prefill.whatsapp} key={`w${prefill.whatsapp}`} placeholder="+92 300 1234567" className={field} />
              {errors.whatsapp && <span className="mt-1 block text-sm text-destructive">{errors.whatsapp}</span>}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Payment Method</span>
              <select name="method" value={active} onChange={(e) => setActive(e.target.value as PaymentMethodId)} className={field}>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Transaction ID / Reference Number</span>
              <input name="transaction_id" className={field} />
              {errors.transaction_id && <span className="mt-1 block text-sm text-destructive">{errors.transaction_id}</span>}
            </label>
            <label className="block cursor-pointer">
              <span className="mb-1.5 block text-sm font-medium">Payment Screenshot</span>
              <span className="flex items-center gap-3 rounded-xl border border-dashed border-input bg-background px-4 py-4 text-sm text-muted-foreground">
                {fileName ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Upload className="h-5 w-5" />}
                <span className="truncate">{fileName || "Tap to upload (image, max 5 MB)"}</span>
              </span>
              <input name="screenshot" type="file" accept="image/*" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
              {errors.screenshot && <span className="mt-1 block text-sm text-destructive">{errors.screenshot}</span>}
            </label>
            {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
            >
              {loading ? "Submitting…" : "Submit Payment for Verification"}
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
