import logoAsset from "@/assets/academy-logo.jpg.asset.json";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Copy,
  Landmark,
  Lock,
  ShieldCheck,
  Smartphone,
  Upload,
  Video,
  Wallet,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { PAYMENT_AMOUNT, PAYMENT_METHODS, type PaymentMethodId } from "@/lib/payment-config";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Root-Cause Health Webinar" },
      { name: "description", content: "Secure registration for the Root-Cause Health webinar. Pay PKR 499 via JazzCash, Easypaisa or bank transfer." },
      { property: "og:title", content: "Checkout — Root-Cause Health Webinar (PKR 499)" },
      { property: "og:description", content: "Enter your details and pay PKR 499 to reserve your webinar seat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

const WEBINAR = "Root-Cause Health Webinar";

const detailsSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  whatsapp: z.string().trim().regex(/^\+?[0-9\s-]{10,16}$/, "Enter a valid WhatsApp number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  city: z.string().trim().min(2, "Please enter your city").max(100),
  learn_goal: z.string().trim().max(1000).optional(),
});
type Details = z.infer<typeof detailsSchema>;

const paySchema = z.object({
  method: z.enum(["jazzcash", "easypaisa", "bank"]),
  transaction_id: z.string().trim().min(3, "Enter the transaction ID").max(100),
});

type Errors = Partial<Record<"full_name" | "whatsapp" | "email" | "city" | "method" | "transaction_id" | "screenshot" | "form", string>>;

const input =
  "w-full rounded-full border border-input bg-background px-5 py-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20";
const card = "rounded-3xl border border-border bg-card shadow-lg shadow-primary/5";

function Label({ children, optional }: { children: string; optional?: boolean | undefined }) {
  return (
    <span className="mb-1.5 block text-sm font-semibold text-foreground">
      {children}{" "}
      {optional ? <span className="text-xs font-normal text-muted-foreground">(optional)</span> : <span className="text-destructive">*</span>}
    </span>
  );
}

function Err({ msg }: { msg?: string | undefined }) {
  return msg ? <span className="mt-1 block pl-2 text-sm text-destructive">{msg}</span> : null;
}

function CheckoutPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [details, setDetails] = useState<Details | null>(null);
  const [prefill, setPrefill] = useState({ name: "", whatsapp: "", email: "" });
  const [active, setActive] = useState<PaymentMethodId>("jazzcash");
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    try {
      const r = JSON.parse(localStorage.getItem("currentRegistration") ?? "null");
      if (r) setPrefill({ name: r.name ?? "", whatsapp: r.whatsapp ?? "", email: r.email ?? "" });
    } catch {
      /* ignore */
    }
  }, []);

  function onDetails(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = detailsSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!res.success) {
      const errs: Errors = {};
      for (const i of res.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setDetails(res.data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onPay(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!details) return;
    const fd = new FormData(e.currentTarget);
    const file = fd.get("screenshot") as File | null;
    const res = paySchema.safeParse(Object.fromEntries(fd));
    const errs: Errors = {};
    if (!res.success) for (const i of res.error.issues) errs[i.path[0] as keyof Errors] ??= i.message;
    if (!file || file.size === 0) errs.screenshot = "Please upload your payment screenshot";
    else if (!file.type.startsWith("image/")) errs.screenshot = "Screenshot must be an image";
    else if (file.size > 5 * 1024 * 1024) errs.screenshot = "Image must be under 5 MB";
    setErrors(errs);
    if (!res.success || Object.keys(errs).length || !file) return;

    setLoading(true);
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const up = await supabase.storage.from("payment-screenshots").upload(path, file, { contentType: file.type });
    if (up.error) {
      setLoading(false);
      setErrors({ form: "Upload failed. Please try again." });
      return;
    }
    const { error } = await supabase.from("payments").insert({
      ...details,
      learn_goal: details.learn_goal || null,
      ...res.data,
      screenshot_path: path,
    });
    setLoading(false);
    if (error) {
      setErrors({ form: "Could not submit. Please try again." });
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const method = PAYMENT_METHODS.find((m) => m.id === active)!;

  return (
    <div className="flex min-h-screen flex-col bg-secondary/40 text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <img src={logoAsset.url} alt="The Academy of Champions" className="h-10 w-auto mix-blend-multiply sm:h-12" />
          </Link>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" /> Secure registration
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
        <section className={`${card} flex flex-wrap items-center justify-between gap-6 p-6 sm:p-8`}>
          <div>
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{WEBINAR}</h1>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <span className="flex items-center gap-1.5"><Video className="h-4 w-4 text-primary" /> Live online + Q&amp;A</span>
              <span className="flex items-center gap-1.5"><Wallet className="h-4 w-4 text-primary" /> {PAYMENT_AMOUNT}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 font-display font-bold">
            <img src={logoAsset.url} alt="The Academy of Champions" className="h-16 w-auto mix-blend-multiply" />
          </div>
        </section>

        {step < 3 && (
          <div className="my-8 flex items-center gap-3">
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${step === 1 ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`}>
              {step > 1 ? "✓ " : ""}1. Your Details
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${step === 2 ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>
              2. Payment
            </span>
          </div>
        )}

        {step === 3 ? (
          <section className={`${card} mx-auto mt-8 max-w-xl p-8 text-center`}>
            <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-whatsapp/15 text-whatsapp">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="font-display text-3xl font-bold">Thank you, {details?.full_name}!</h2>
            <p className="mt-3 text-muted-foreground">
              Your details have been received. Join our WhatsApp community for webinar updates and joining instructions.
            </p>
            <Link
              to="/community"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-lg font-bold text-whatsapp-foreground shadow-lg shadow-whatsapp/30 transition hover:-translate-y-0.5 sm:w-auto"
            >
              Join Our WhatsApp Community <ArrowRight className="h-5 w-5" />
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            {step === 1 ? (
              <form onSubmit={onDetails} noValidate className={`${card} space-y-5 p-6 sm:p-8`}>
                <h2 className="font-display text-xl font-bold">Your details</h2>
                <label className="block">
                  <Label>Full Name</Label>
                  <input name="full_name" defaultValue={details?.full_name ?? prefill.name} key={`n${prefill.name}`} className={input} />
                  <Err msg={errors.full_name} />
                </label>
                <label className="block">
                  <Label>WhatsApp Number</Label>
                  <input name="whatsapp" type="tel" placeholder="+92 300 1234567" defaultValue={details?.whatsapp ?? prefill.whatsapp} key={`w${prefill.whatsapp}`} className={input} />
                  <Err msg={errors.whatsapp} />
                </label>
                <label className="block">
                  <Label>Email Address</Label>
                  <input name="email" type="email" defaultValue={details?.email ?? prefill.email} key={`e${prefill.email}`} className={input} />
                  <Err msg={errors.email} />
                </label>
                <label className="block">
                  <Label>City</Label>
                  <input name="city" defaultValue={details?.city} className={input} />
                  <Err msg={errors.city} />
                </label>
                <label className="block">
                  <Label optional>What would you most like to learn?</Label>
                  <textarea name="learn_goal" rows={3} defaultValue={details?.learn_goal} className={`${input} rounded-2xl`} />
                </label>
                <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/70 px-6 py-4 font-bold uppercase tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95">
                  Continue to Payment <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={onPay} noValidate className={`${card} space-y-5 p-6 sm:p-8`}>
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold">Payment</h2>
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-primary underline">Edit details</button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Send exactly <strong className="text-foreground">{PAYMENT_AMOUNT}</strong> using one of the methods below, then enter your transaction ID and upload a screenshot.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActive(m.id)}
                      className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-sm font-semibold transition ${
                        active === m.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-secondary"
                      }`}
                    >
                      {m.id === "bank" ? <Landmark className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                      {m.name}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="method" value={active} />
                <dl className="space-y-2">
                  {method.fields.map((f) => (
                    <div key={f.label} className="flex items-center justify-between gap-3 rounded-2xl bg-secondary/60 px-4 py-3">
                      <div className="min-w-0">
                        <dt className="text-xs text-muted-foreground">{f.label}</dt>
                        <dd className="truncate font-semibold">{f.value}</dd>
                      </div>
                      <button type="button" aria-label={`Copy ${f.label}`} onClick={() => navigator.clipboard?.writeText(f.value)} className="rounded-lg p-2 text-muted-foreground hover:bg-background">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </dl>
                <label className="block">
                  <Label>Transaction ID / Reference Number</Label>
                  <input name="transaction_id" className={input} />
                  <Err msg={errors.transaction_id} />
                </label>
                <label className="block cursor-pointer">
                  <Label>Payment Screenshot</Label>
                  <span className="flex items-center gap-3 rounded-2xl border border-dashed border-input bg-background px-5 py-4 text-sm text-muted-foreground">
                    {fileName ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <Upload className="h-5 w-5" />}
                    <span className="truncate">{fileName || "Tap to upload (image, max 5 MB)"}</span>
                  </span>
                  <input name="screenshot" type="file" accept="image/*" className="sr-only" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} />
                  <Err msg={errors.screenshot} />
                </label>
                {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}
                <button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-to-r from-primary to-primary/70 px-6 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:opacity-70">
                  {loading ? "Submitting…" : "Submit Payment for Verification"}
                </button>
              </form>
            )}

            <aside className="space-y-4">
              <div className={`${card} p-6`}>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">Your registration</p>
                <p className="mt-2 font-display text-xl font-bold">{WEBINAR}</p>
                <p className="mt-1 text-sm text-muted-foreground">Live online session · Q&amp;A · Community access</p>
                <div className="mt-5 flex justify-between border-t border-border pt-4 text-sm font-medium">
                  <span>Registration fee</span>
                  <span>{PAYMENT_AMOUNT}</span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-semibold">Total payable</span>
                  <span className="font-display text-3xl font-bold text-primary">{PAYMENT_AMOUNT}</span>
                </div>
              </div>
              <div className={`${card} flex gap-2 p-6 text-sm text-muted-foreground`}>
                <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                This webinar is educational and does not replace individual medical advice.
              </div>
            </aside>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-5xl px-5 text-sm text-muted-foreground">
          <p>This webinar is for educational purposes and does not replace professional medical diagnosis, treatment or advice.</p>
          <p className="mt-3">© {new Date().getFullYear()} Root-Cause Health. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
