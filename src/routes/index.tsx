import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Activity,
  Baby,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wheat,
  Users,
  Video,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Root-Cause Health Webinar — Register for PKR 499" },
      {
        name: "description",
        content:
          "Live webinar on Cancer, Digestive Disorders, Autism, PCOS, Food Allergy & Heavy Metal Testing. Register now for PKR 499.",
      },
      { property: "og:title", content: "Root-Cause Health Webinar — PKR 499" },
      {
        property: "og:description",
        content: "Find answers when doctors couldn't. Reserve your seat for PKR 499.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- Editable content ---------- */
const CONTENT = {
  fee: "PKR 499",
  eyebrow: "Live Online Webinar",
  headline: "Find the answers your health deserves",
  subheadline:
    "Discover how root-cause testing uncovers what routine check-ups miss — from chronic gut issues to PCOS, autism and beyond.",
  topics: [
    { icon: HeartPulse, title: "Cancer", text: "Understanding risk factors and supportive testing approaches." },
    { icon: Activity, title: "Digestive Disorders", text: "Bloating, IBS, acidity — finding the underlying triggers." },
    { icon: Baby, title: "Autism", text: "Nutritional and environmental factors worth investigating." },
    { icon: Sparkles, title: "PCOS", text: "Hormonal balance, metabolism and targeted testing." },
    { icon: Wheat, title: "Food Allergy Testing", text: "How hidden sensitivities affect your daily health." },
    { icon: FlaskConical, title: "Heavy Metal Testing", text: "Detecting toxic exposure and what to do next." },
    { icon: HelpCircle, title: "When Doctors Have No Answers", text: "Next steps when reports are 'normal' but you still feel unwell." },
  ],
  benefits: [
    "Full access to the live webinar session",
    "Live Q&A — ask your own health questions",
    "Practical guidance on which tests to consider",
    "Join a supportive community after registration",
  ],
};

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{10,16}$/, "Enter a valid WhatsApp number"),
  email: z.string().trim().email("Enter a valid email").max(255),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function RegistrationForm({ id }: { id?: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Errors = {};
      for (const issue of result.error.issues) errs[issue.path[0] as keyof Errors] ??= issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    const list = JSON.parse(localStorage.getItem("registrations") ?? "[]");
    list.push({ ...result.data, createdAt: new Date().toISOString() });
    localStorage.setItem("registrations", JSON.stringify(list));
    localStorage.setItem("currentRegistration", JSON.stringify(result.data));
    window.location.assign("/payment");
  }

  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20";

  return (
    <form id={id} onSubmit={onSubmit} noValidate className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Reserve your seat</p>
          <p className="font-display text-4xl font-bold text-foreground">{CONTENT.fee}</p>
        </div>
        <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">Limited seats</span>
      </div>
      {([
        ["name", "Full Name", "text", "e.g. Ayesha Khan"],
        ["whatsapp", "WhatsApp Number", "tel", "+92 300 1234567"],
        ["email", "Email Address", "email", "you@example.com"],
      ] as const).map(([name, label, type, ph]) => (
        <label key={name} className="block">
          <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
          <input name={name} type={type} placeholder={ph} className={field} aria-invalid={!!errors[name]} />
          {errors[name] && <span className="mt-1 block text-sm text-destructive">{errors[name]}</span>}
        </label>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:opacity-70"
      >
        {loading ? "Saving…" : `Register Now for ${CONTENT.fee}`}
      </button>
      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4" /> Your details are kept private.
      </p>
    </form>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 font-display text-lg font-bold">
          <Stethoscope className="h-6 w-6 text-primary" /> Root-Cause Health
        </div>
        <a href="#register" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Register
        </a>
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary-foreground">
            <Video className="h-3.5 w-3.5" /> {CONTENT.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {CONTENT.headline}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{CONTENT.subheadline}</p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Live session + Q&A</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Community access</span>
          </div>
        </div>
        <div id="register" className="scroll-mt-6">
          <RegistrationForm />
        </div>
      </section>

      <section className="bg-secondary/60 py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">What you'll learn</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Clear, practical insights on the conditions and tests that matter most.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTENT.topics.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">What's included</h2>
          <ul className="mt-6 space-y-4">
            {CONTENT.benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider opacity-80">One-time registration</p>
          <p className="mt-2 font-display text-5xl font-bold">{CONTENT.fee}</p>
          <p className="mt-3 opacity-90">Stop guessing. Get the knowledge to take the right next step for your health.</p>
          <a href="#register" className="mt-6 inline-block rounded-xl bg-accent px-6 py-4 font-bold text-accent-foreground transition hover:opacity-90">
            Register Now for {CONTENT.fee}
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Root-Cause Health. Educational content only — not a substitute for medical advice.
      </footer>
    </main>
  );
}
