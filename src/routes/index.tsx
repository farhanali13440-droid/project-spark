import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Activity, ArrowRight, Baby, CheckCircle2, ChevronDown, FlaskConical, HeartPulse, HelpCircle, MessageCircleQuestion, MonitorPlay, Sparkles, Stethoscope, UserRound, Users, Wheat } from "lucide-react";
import logoAsset from "@/assets/academy-logo.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { PAYMENT_AMOUNT } from "@/lib/payment-config";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Root-Cause Health Webinar with Dr Adeel — PKR 499" },
    { name: "description", content: "Explore digestive health, PCOS, autism, cancer, food allergy and heavy metal testing with Dr Adeel. Register for the live webinar for PKR 499." },
    { property: "og:title", content: "Root-Cause Health Webinar with Dr Adeel — PKR 499" },
    { property: "og:description", content: "Seven health topics, live Q&A and community access. Reserve your webinar seat for PKR 499." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const topics = [
  { icon: HeartPulse, title: "Cancer", text: "An educational overview of risk factors and the role of supportive testing." },
  { icon: Activity, title: "Digestive Disorders", text: "Explore bloating, IBS and acidity, and questions to discuss with your doctor." },
  { icon: Baby, title: "Autism", text: "Understand nutritional and environmental factors without replacing specialist care." },
  { icon: Sparkles, title: "PCOS", text: "Learn about hormonal health, metabolism and when testing may be appropriate." },
  { icon: Wheat, title: "Food Allergy Testing", text: "Understand testing options and the difference between allergy and sensitivity." },
  { icon: FlaskConical, title: "Heavy Metal Testing", text: "Learn about exposure, testing considerations and professional follow-up." },
  { icon: HelpCircle, title: "When Doctors Have No Answers", text: "Prepare informed questions and consider next steps when symptoms remain unexplained." },
];
const benefits = [
  { icon: Stethoscope, title: "A clearer health perspective", text: "Understand how symptoms, health history and testing fit together." },
  { icon: FlaskConical, title: "More informed testing decisions", text: "Learn which questions to ask before choosing a test." },
  { icon: MessageCircleQuestion, title: "Live questions, thoughtful discussion", text: "Bring your concerns to the live Q&A session." },
  { icon: Users, title: "Stay connected", text: "Community access for webinar updates and joining instructions." },
];
const audience = [
  "People with recurring digestive problems",
  "Women dealing with PCOS or hormonal concerns",
  "Parents of children with autism",
  "Anyone exploring food allergy or heavy metal testing",
  "Families affected by cancer who want to learn more",
  "Anyone with unexplained symptoms despite routine reports",
];
const included = ["Live online webinar access", "All seven webinar topics", "Live Q&A session", "Testing guidance", "WhatsApp community access"];
const faqs = [
  { q: "Which payment methods can I use?", a: "You can select JazzCash, Easypaisa or bank transfer at checkout. The registration fee is PKR 499. Payment account details are awaiting confirmation." },
  { q: "How do I register for the webinar?", a: "Click Register Now, enter your contact details, then choose a payment method. Add your transaction ID and upload your payment screenshot to submit your registration." },
  { q: "How much does registration cost?", a: "Registration is a one-time payment of PKR 499 and includes the live webinar, all seven topics, live Q&A, testing guidance and community access." },
  { q: "How do I access the WhatsApp community?", a: "After submitting your registration, use the community button to open the community page. The WhatsApp invite link is awaiting confirmation and will be available there once added." },
  { q: "Can I ask Dr Adeel questions?", a: "Yes. The webinar includes a live Q&A session where you can raise your health-related questions." },
  { q: "Does this webinar replace medical advice or treatment?", a: "No. This webinar is for education and awareness only. It does not provide a diagnosis or replace professional medical advice, treatment or specialist care. Do not change or stop prescribed medication without consulting your healthcare professional." },
];

function Brand() {
  return <img src={logoAsset.url} alt="The Academy of Champions" className="h-12 max-w-48 object-contain mix-blend-multiply sm:h-14" />;
}
function Cta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Button asChild size="lg" className={`h-auto min-h-12 whitespace-normal px-6 py-3 text-center font-bold ${className}`}><Link to="/checkout">{children}<ArrowRight /></Link></Button>;
}
function SectionHead({ label, title, text }: { label: string; title: string; text?: string }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold text-primary">{label}</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{title}</h2>{text && <p className="mt-4 text-muted-foreground">{text}</p>}</div>;
}
function Index() {
  return <main className="min-h-screen bg-background text-foreground">
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3"><Brand /><Cta className="px-4 text-sm">Join for {PAYMENT_AMOUNT}</Cta></div></header>

    {/* 1. Hero */}
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <p className="flex items-center gap-2 text-sm font-bold text-primary"><MonitorPlay className="h-4 w-4" />Live Online Health Webinar · With Dr Adeel</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Root-Cause Health Webinar</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Find the answers your health deserves. Explore how health history and appropriate testing can help you ask better questions about persistent symptoms.</p>
        <div className="mt-7 flex max-w-3xl flex-wrap gap-x-5 gap-y-3">{topics.map(({ title }) => <span key={title} className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{title}</span>)}</div>
        <div className="mt-8 flex flex-wrap items-center gap-6"><div><p className="font-display text-3xl font-bold text-primary">{PAYMENT_AMOUNT}</p><p className="text-xs text-muted-foreground">One-time registration fee</p></div><Cta>Register Now <span className="sr-only">for the webinar</span></Cta></div>
        <p className="mt-5 text-sm text-muted-foreground">Live webinar · Live Q&A · Community access</p>
      </div>
    </section>

    {/* 2. Why attend */}
    <section className="py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5"><SectionHead label="Make sense of your health" title="Why Attend This Webinar?" text="Move beyond uncertainty with knowledge you can bring to your next health conversation." /><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-lg border border-border bg-card p-6"><Icon className="h-7 w-7 text-primary" /><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm text-muted-foreground">{text}</p></div>)}</div></div></section>

    {/* 3. Topics */}
    <section id="learn" className="bg-secondary/50 py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5"><SectionHead label="Seven focused topics" title="What Will You Learn?" text="A practical overview of health conditions and testing considerations, with room for your questions." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{topics.map(({ icon: Icon, title, text }, i) => <div key={title} className="rounded-lg border border-border bg-card p-6"><div className="flex items-center justify-between"><span className="font-display text-2xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span><Icon className="h-6 w-6 text-primary" /></div><h3 className="mt-4 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm text-muted-foreground">{text}</p></div>)}</div></div></section>

    {/* 4. Audience */}
    <section className="py-16 sm:py-20"><div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold text-primary">Is this for you?</p><h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Who Should Attend?</h2><p className="mt-5 max-w-md text-muted-foreground">For individuals and families who want to understand health concerns and have more informed conversations with their healthcare professionals.</p></div><ul className="divide-y divide-border">{audience.map(item => <li key={item} className="flex items-start gap-3 py-4"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span className="font-medium">{item}</span></li>)}</ul></div></section>

    {/* 5. Speaker */}
    <section className="bg-secondary/50 py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5"><SectionHead label="Your webinar speaker" title="Meet the Speaker" /><div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-[240px_1fr] sm:items-center"><div className="flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card text-muted-foreground"><UserRound className="h-20 w-20 stroke-1" /><p className="text-sm">Dr Adeel’s photo coming soon</p></div><div><h3 className="font-display text-3xl font-bold">Dr Adeel</h3><p className="mt-2 font-semibold text-primary">Root-Cause Health Webinar Speaker</p><dl className="mt-6 divide-y divide-border">{["Qualifications", "Specialty", "Experience"].map(label => <div key={label} className="grid grid-cols-[110px_1fr] gap-4 py-3 text-sm"><dt className="font-semibold">{label}</dt><dd className="text-muted-foreground">Awaiting confirmation</dd></div>)}</dl></div></div></div></section>

    {/* 6. Offer */}
    <section className="py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5"><SectionHead label="Your seat, your next step" title="Webinar Registration Offer" /><div className="mx-auto mt-10 grid max-w-4xl gap-8 border-y border-border py-8 sm:grid-cols-2 sm:items-center"><ul className="space-y-4">{included.map(item => <li key={item} className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /><span className="font-medium">{item}</span></li>)}</ul><div className="sm:border-l sm:border-border sm:pl-10"><p className="text-sm text-muted-foreground">One-time registration fee</p><p className="mt-2 font-display text-5xl font-bold text-primary">{PAYMENT_AMOUNT}</p><Cta className="mt-6 w-full">Reserve My Seat</Cta><p className="mt-3 text-center text-xs text-muted-foreground">JazzCash · Easypaisa · Bank transfer</p></div></div></div></section>

    {/* 7. FAQs */}
    <section className="bg-secondary/50 py-16 sm:py-20"><div className="mx-auto max-w-3xl px-5"><SectionHead label="Before you register" title="Frequently Asked Questions" /><div className="mt-10 divide-y divide-border">{faqs.map(({ q, a }) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">{q}<ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><p className="mt-3 leading-relaxed text-muted-foreground">{a}</p></details>)}</div></div></section>

    {/* 8. Final CTA */}
    <section className="bg-primary py-16 text-primary-foreground sm:py-20"><div className="mx-auto max-w-3xl px-5 text-center"><h2 className="font-display text-3xl font-bold sm:text-4xl">Stop guessing. Start understanding.</h2><p className="mt-5 opacity-90">Join Dr Adeel for an informed conversation about your health.</p><p className="mt-6 font-display text-4xl font-bold">{PAYMENT_AMOUNT}</p><Cta className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">Join the Webinar Now</Cta></div></section>
    <footer className="border-t border-border py-10"><div className="mx-auto max-w-4xl space-y-5 px-5 text-center text-sm text-muted-foreground"><div className="flex justify-center"><Brand /></div><p>This webinar is for educational and awareness purposes only and does not replace professional medical diagnosis, treatment or advice. Do not change or stop prescribed medication without consulting your healthcare professional.</p><p>© {new Date().getFullYear()} Root-Cause Health. All rights reserved.</p></div></footer>
  </main>;
}
