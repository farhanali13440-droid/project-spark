import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  Baby,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileQuestion,
  FlaskConical,
  Globe,
  HeartPulse,
  HelpCircle,
  MessageCircleQuestion,
  MonitorPlay,
  Pill as PillIcon,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Video,
  Wallet,
  Wheat,
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
  brand: "Root-Cause Health",
  fee: "PKR 499",
  eyebrow: "Live Online Health Webinar",
  headlineTop: "Find the answers",
  headlineBottom: "your health deserves",
  subheadline:
    "Discover how root-cause testing uncovers what routine check-ups miss — from chronic gut issues to PCOS, autism and beyond.",
  details: [
    { icon: MonitorPlay, label: "Format", value: "Live Webinar" },
    { icon: Globe, label: "Platform", value: "Online" },
    { icon: MessageCircleQuestion, label: "Includes", value: "Live Q&A session" },
    { icon: Users, label: "After registration", value: "Community access" },
    { icon: Stethoscope, label: "Hosted by", value: "Root-Cause Health" },
    { icon: Wallet, label: "Registration fee", value: "PKR 499" },
  ],
  pains: [
    { icon: FileQuestion, title: "Reports say 'normal'", text: "Your tests come back fine, yet you still don't feel well." },
    { icon: RefreshCcw, title: "Symptoms keep returning", text: "Bloating, fatigue or skin issues come back no matter what you try." },
    { icon: PillIcon, title: "Only managing symptoms", text: "Medicines help for a while, but nobody explains the underlying cause." },
    { icon: HelpCircle, title: "Conflicting advice", text: "Everyone tells you something different and none of it feels reliable." },
    { icon: ClipboardList, title: "Not sure which test to do", text: "There are so many tests — you don't know which ones actually matter." },
    { icon: Baby, title: "Worried about your child", text: "You want to understand what may be affecting your child's health and behaviour." },
  ],
  topics: [
    { icon: HeartPulse, title: "Cancer", text: "Understanding risk factors and supportive testing approaches." },
    { icon: Activity, title: "Digestive Disorders", text: "Bloating, IBS, acidity — finding the underlying triggers." },
    { icon: Baby, title: "Autism", text: "Nutritional and environmental factors worth investigating." },
    { icon: Sparkles, title: "PCOS", text: "Hormonal balance, metabolism and targeted testing." },
    { icon: Wheat, title: "Food Allergy Testing", text: "How hidden sensitivities affect your daily health." },
    { icon: FlaskConical, title: "Heavy Metal Testing", text: "Detecting toxic exposure and what to do next." },
    { icon: HelpCircle, title: "When Doctors Have No Answers", text: "Next steps when reports are 'normal' but you still feel unwell." },
  ],
  audience: [
    "People with long-standing digestive problems",
    "Women dealing with PCOS or hormonal issues",
    "Parents of children with autism",
    "Anyone curious about food allergy or heavy metal testing",
    "Families affected by cancer who want to understand more",
    "Anyone whose reports are 'normal' but who still feels unwell",
  ],
  benefits: [
    { icon: Video, title: "Live webinar", text: "Full access to the live webinar session." },
    { icon: MessageCircleQuestion, title: "Live Q&A", text: "Ask your own health questions directly." },
    { icon: FlaskConical, title: "Testing guidance", text: "Practical guidance on which tests to consider." },
    { icon: Users, title: "Community", text: "Join a supportive community after registration." },
  ],
  faqs: [
    { q: "What is this webinar about?", a: "It explains how root-cause testing can help with Cancer, Digestive Disorders, Autism, PCOS, Food Allergies and Heavy Metal exposure." },
    { q: "How much does registration cost?", a: "Registration is a one-time fee of PKR 499." },
    { q: "How do I register?", a: "Fill in your name, WhatsApp number and email on the checkout page, then complete the payment." },
    { q: "Can I ask my own questions?", a: "Yes. There is a live Q&A where you can ask about your own health concerns." },
    { q: "Will this replace my doctor's treatment?", a: "No. The webinar is educational only and does not replace professional medical advice. Don't change any medication without speaking to your doctor." },
  ],
};

function CheckoutCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <div className="bg-gradient-brand px-6 py-8 text-center text-primary-foreground sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-90">Reserve your seat</p>
        <p className="mt-1 font-display text-5xl font-bold">{CONTENT.fee}</p>
        <p className="text-sm opacity-85">One-time registration fee</p>
      </div>
      <div className="space-y-5 p-6 sm:p-8">
        <ul className="space-y-3">
          {["Live webinar access", "All 7 topics covered", "Live Q&A session", "Community access"].map((b) => (
            <li key={b} className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              <span className="font-medium">{b}</span>
            </li>
          ))}
        </ul>
        <Link
          to="/checkout"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 text-base font-bold text-primary-foreground shadow-soft transition hover:opacity-95"
        >
          Register Now — {CONTENT.fee} <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4" /> Secure checkout — takes 2 minutes.
        </p>
      </div>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  );
}

function SectionHead({ pill, title, text }: { pill: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Pill>{pill}</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg text-muted-foreground">{text}</p>}
    </div>
  );
}

function CtaButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href="/checkout"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-7 py-4 text-base font-bold text-primary-foreground shadow-soft transition hover:opacity-95 ${className}`}
    >
      {children} <ArrowRight className="h-4 w-4 shrink-0" />
    </a>
  );
}

function Brand() {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Stethoscope className="h-5 w-5" />
      </span>
      <span className="truncate font-display text-lg font-bold">{CONTENT.brand}</span>
    </div>
  );
}

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5">
          <Brand />
          <a
            href="/checkout"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-soft"
          >
            Join for {CONTENT.fee} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/70 to-background">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pt-20">
          <div>
            <Pill>
              <Video className="h-3.5 w-3.5" /> {CONTENT.eyebrow}
            </Pill>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              {CONTENT.headlineTop}
              <span className="block text-gradient-brand">{CONTENT.headlineBottom}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{CONTENT.subheadline}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <span className="flex items-center gap-2"><MonitorPlay className="h-4 w-4 text-primary" /> Live online session</span>
              <span className="flex items-center gap-2"><MessageCircleQuestion className="h-4 w-4 text-primary" /> Live Q&A</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Community access</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaButton>Join the Webinar — {CONTENT.fee}</CtaButton>
              <a
                href="#learn"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-7 py-3.5 font-bold text-primary transition hover:bg-primary/5"
              >
                See what you'll learn
              </a>
            </div>
          </div>
          <div id="register" className="scroll-mt-24">
            <CheckoutCard />
          </div>
        </div>
      </section>

      {/* Details card */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-8 rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Pill>Webinar details</Pill>
            <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Root-Cause Health Webinar</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CONTENT.details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 rounded-2xl bg-secondary/60 p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
                    <p className="font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:w-64">
            <CtaButton>Reserve My Seat</CtaButton>
            <p className="text-center text-xs text-muted-foreground">Joining details are shared after payment.</p>
          </div>
        </div>
      </section>

      {/* Honest question */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            pill="The honest question"
            title="Still searching for answers about your health?"
            text="Feeling unwell without a clear reason is exhausting. Understanding the root cause is where real change begins."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTENT.pains.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaButton>Join the Root-Cause Health Webinar</CtaButton>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="learn" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead
            pill="The curriculum"
            title="What you'll learn inside the webinar"
            text="Seven focused topics with clear, practical insights on the conditions and tests that matter most."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTENT.topics.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="relative rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand font-bold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-6 w-6 text-primary/60" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who should attend */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <div>
            <Pill>Who it's for</Pill>
            <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">Who should attend?</h2>
            <p className="mt-4 text-muted-foreground">
              This webinar is educational and is not a substitute for medical treatment.
            </p>
          </div>
          <ul className="grid gap-3">
            {CONTENT.audience.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                <span className="font-medium">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead pill="What's included" title="Your webinar registration includes" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENT.benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-bold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <SectionHead pill="Your registration" title="Take the first step towards real answers" />
          <div className="mx-auto mt-12 max-w-xl overflow-hidden rounded-[2rem] bg-card shadow-soft">
            <div className="bg-gradient-brand px-6 py-8 text-center text-primary-foreground">
              <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-90">Root-Cause Health Webinar</p>
              <p className="mt-2 font-display text-5xl font-bold">{CONTENT.fee}</p>
              <p className="mt-1 text-sm opacity-85">Registration fee</p>
            </div>
            <div className="p-6 sm:p-8">
              {[
                ["Live webinar access", "Included"],
                ["All 7 topics", "Included"],
                ["Live Q&A + community", "Included"],
                ["Webinar registration", CONTENT.fee],
              ].map(([k, v], i, arr) => (
                <div
                  key={k}
                  className={`flex items-center justify-between py-3.5 text-sm ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-muted-foreground">{k}</span>
                  <span className={`font-bold ${v === CONTENT.fee ? "text-primary" : ""}`}>{v}</span>
                </div>
              ))}
              <CtaButton className="mt-6 w-full">Join the Webinar for {CONTENT.fee}</CtaButton>
              <p className="mt-4 text-center text-sm text-muted-foreground">Secure your seat today.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-5">
          <SectionHead pill="Questions" title="Frequently asked questions" />
          <div className="mt-10 space-y-3">
            {CONTENT.faqs.map(({ q, a }) => (
              <details key={q} className="group rounded-2xl border border-border bg-card px-5 py-4 open:shadow-soft">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                  {q}
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-brand px-6 py-14 text-center text-primary-foreground sm:px-12">
          <h2 className="font-display text-3xl font-bold sm:text-5xl">Stop guessing. Start understanding.</h2>
          <p className="mx-auto mt-4 max-w-2xl opacity-90">
            Your health deserves more than guesswork. Get the knowledge to take the right next step.
          </p>
          <a
            href="/checkout"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-bold text-accent-foreground transition hover:opacity-90"
          >
            Register Now for {CONTENT.fee} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl space-y-4 px-5 text-center text-sm text-muted-foreground">
          <div className="flex justify-center"><Brand /></div>
          <p className="mx-auto max-w-3xl">
            This webinar is for educational and awareness purposes only and does not replace professional medical
            diagnosis, treatment or advice. Do not change or stop prescribed medication without consulting your
            healthcare professional.
          </p>
          <p>© {new Date().getFullYear()} {CONTENT.brand}. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
