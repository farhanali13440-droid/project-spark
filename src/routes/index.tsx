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
  ArrowRight,
  Check,
  Microscope,
  CalendarDays,
  PlayCircle,
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
    "Discover how root-cause testing can help you explore what may be behind ongoing health concerns — from digestive issues and PCOS to food sensitivities and environmental exposure.",
  topics: [
    { icon: HeartPulse, title: "Cancer", text: "Understanding risk factors and supportive testing approaches." },
    { icon: Activity, title: "Digestive Disorders", text: "Bloating, IBS, acidity — finding the underlying triggers." },
    { icon: Baby, title: "Autism", text: "Nutritional and environmental factors worth discussing with a qualified professional." },
    { icon: Sparkles, title: "PCOS", text: "Hormonal health, metabolism and targeted testing." },
    { icon: Wheat, title: "Food Allergy Testing", text: "How food allergies and sensitivities can affect everyday wellbeing." },
    { icon: FlaskConical, title: "Heavy Metal Testing", text: "Understanding testing for possible toxic exposure and appropriate next steps." },
    { icon: HelpCircle, title: "When You Still Have Questions", text: "How to prepare for a more informed conversation when symptoms persist." },
  ],
  benefits: [
    "Full access to the live webinar session",
    "Live Q&A — ask your own health questions",
    "Practical guidance on tests to discuss with a qualified healthcare professional",
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

  const field =
    "w-full rounded-xl border border-[#dbe5e1] bg-white px-4 py-3.5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-4 focus:ring-teal-700/10";

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-white/70 bg-white p-6 shadow-[0_24px_80px_rgba(10,54,48,0.16)] sm:p-8"
    >
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-800">Reserve your seat</p>
          <p className="mt-1 font-display text-4xl font-bold tracking-tight text-slate-900">{CONTENT.fee}</p>
          <p className="mt-1 text-sm text-slate-500">One-time registration fee</p>
        </div>
        <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900">Live webinar</span>
      </div>
      <div className="mb-5 rounded-xl bg-[#f2f8f5] px-4 py-3 text-sm leading-relaxed text-slate-700">
        <span className="font-bold text-teal-900">What you'll get:</span> live session access, Q&A and practical educational guidance.
      </div>
      {([
        ["name", "Full Name", "text", "e.g. Ayesha Khan"],
        ["whatsapp", "WhatsApp Number", "tel", "+92 300 1234567"],
        ["email", "Email Address", "email", "you@example.com"],
      ] as const).map(([name, label, type, ph]) => (
        <label key={name} className="mb-4 block">
          <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>
          <input name={name} type={type} placeholder={ph} className={field} aria-invalid={!!errors[name]} />
          {errors[name] && <span className="mt-1 block text-sm text-red-600">{errors[name]}</span>}
        </label>
      ))}
      <button
        type="submit"
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-4 text-base font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:opacity-70"
      >
        {loading ? "Saving…" : `Register Now for ${CONTENT.fee}`}
        {!loading && <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />}
      </button>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="h-4 w-4 text-teal-700" /> Your details are kept private.
      </p>
    </form>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbfcf8] text-slate-900">
      <div className="bg-[#103f39] px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
        Live online learning • Practical health education • Registration just {CONTENT.fee}
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <a href="#" className="flex items-center gap-3" aria-label="Root-Cause Health home">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e4f1e9] text-teal-800">
            <Stethoscope className="h-6 w-6" />
          </span>
          <span>
            <span className="block font-display text-lg font-bold leading-tight text-[#143f38]">Root-Cause Health</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Health education webinar</span>
          </span>
        </a>
        <a href="#register" className="inline-flex items-center gap-2 rounded-full bg-[#164e45] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#103f39]">
          Save My Seat <ArrowRight className="h-4 w-4" />
        </a>
      </header>

      <section className="relative isolate bg-[#edf5ef]">
        <div className="pointer-events-none absolute -right-20 -top-28 -z-10 h-96 w-96 rounded-full bg-[#d7e9dc] blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 pt-8 sm:pb-20 sm:pt-12 lg:grid-cols-[1.08fr_0.82fr] lg:items-center lg:gap-16 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-teal-900 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <Video className="h-4 w-4" /> {CONTENT.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-[#123d36] sm:text-5xl lg:text-[3.8rem]">
              {CONTENT.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">{CONTENT.subheadline}</p>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal-800" /> Live session + Q&A</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-teal-800" /> Community access</span>
              <span className="flex items-center gap-2"><Microscope className="h-4 w-4 text-teal-800" /> Testing education</span>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 border-t border-teal-900/10 pt-6">
              {[
                ["01", "Understand possible root causes"],
                ["02", "Learn about relevant testing"],
                ["03", "Know what to ask next"],
              ].map(([number, text]) => (
                <div key={number}>
                  <span className="font-display text-2xl font-bold text-amber-700">{number}</span>
                  <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">{text}</p>
                </div>
              ))}
            </div>
            <a href="#learn" className="mt-7 inline-flex items-center gap-2 text-sm font-extrabold text-teal-900 underline decoration-amber-500 decoration-2 underline-offset-4">
              Explore webinar topics <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div id="register" className="scroll-mt-6">
            <RegistrationForm />
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
              <CalendarDays className="h-4 w-4 shrink-0" /> Register now to continue to the payment step.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e5ece6] bg-white py-7">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 text-sm font-semibold text-slate-600">
          <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-teal-700" /> Live educational session</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-teal-700" /> Practical explanations</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-teal-700" /> Live question & answer</span>
          <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-teal-700" /> Just {CONTENT.fee}</span>
        </div>
      </section>

      <section id="learn" className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-800">Inside the webinar</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#143f38] sm:text-4xl">Explore the topics that matter to your health</h2>
          <p className="mt-4 leading-7 text-slate-600">Get a clearer introduction to testing topics and learn how to have more informed conversations with your healthcare professional.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTENT.topics.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="group rounded-2xl border border-[#e1eae3] bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-teal-800/30 hover:shadow-xl hover:shadow-teal-950/5">
              <div className="flex items-start justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf4ed] text-teal-800 transition group-hover:bg-[#164e45] group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-lg font-bold text-[#b9c9bd]">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#163f38]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-9 text-center">
          <a href="#register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#164e45] px-6 py-4 font-bold text-white transition hover:bg-[#103f39]">
            Join the Webinar for {CONTENT.fee} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <section className="bg-[#123f38] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:px-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300">Your next step</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">A clearer conversation starts with better questions.</h2>
            <p className="mt-5 max-w-lg leading-7 text-white/75">The webinar is designed to help you understand health-testing topics and prepare useful questions for a qualified healthcare professional. It is educational and does not replace individual diagnosis or treatment.</p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-300"><PlayCircle className="h-5 w-5" /></span>
              <span><span className="block text-sm font-bold">Live webinar + Q&A</span><span className="mt-0.5 block text-xs text-white/60">Practical, accessible health education</span></span>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 text-slate-900 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-[#143f38]">Your registration includes</h3>
            <ul className="mt-6 space-y-4">
              {CONTENT.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e6f2e9] text-teal-800"><Check className="h-3.5 w-3.5" /></span>
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6">
              <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">One-time fee</p><p className="font-display text-4xl font-bold text-[#143f38]">{CONTENT.fee}</p></div>
              <a href="#register" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300">Reserve my seat <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 text-center sm:py-16">
        <ShieldCheck className="mx-auto h-8 w-8 text-teal-800" />
        <h2 className="mt-4 font-display text-2xl font-bold text-[#143f38]">Health education, with realistic expectations</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">This webinar provides general educational information only. It does not diagnose conditions, guarantee results, or replace advice, testing, or treatment from a qualified healthcare professional. Discuss personal health concerns and testing decisions with your clinician.</p>
        <a href="#register" className="mt-6 inline-flex items-center gap-2 font-bold text-teal-900 underline decoration-amber-500 decoration-2 underline-offset-4">Register for {CONTENT.fee} <ArrowRight className="h-4 w-4" /></a>
      </section>

      <footer className="border-t border-[#e1eae3] bg-white px-5 py-7 text-center text-xs leading-6 text-slate-500">
        © {new Date().getFullYear()} Root-Cause Health. Educational content only — not a substitute for medical advice.
      </footer>
    </main>
  );
}
