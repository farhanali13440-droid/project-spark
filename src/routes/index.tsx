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
  { icon: HeartPulse, title: "Cancer", text: "Explore important cancer-related health information and understand why informed medical guidance matters." },
  { icon: Activity, title: "Digestive Disorders", text: "Learn about digestive health concerns and why persistent symptoms deserve proper medical evaluation." },
  { icon: HelpCircle, title: "When Doctors Haven't Found the Answers", text: "Explore how to approach unresolved health concerns and prepare questions for further medical assessment." },
  { icon: Baby, title: "Autism", text: "Understand key aspects of autism and developmental health." },
  { icon: Sparkles, title: "PCOS", text: "Explore polycystic ovary syndrome (PCOS) and its impact on women's health." },
  { icon: Wheat, title: "Food Allergy Testing", text: "Understand the role of food allergy testing and why choosing appropriate tests matters." },
  { icon: FlaskConical, title: "Heavy Metal Testing", text: "Explore the basics of heavy metal testing and the importance of interpreting results in the right clinical context." },
];
const benefits = [
  { icon: Stethoscope, title: "Understand Complex Health Topics", text: "Explore cancer, digestive disorders, PCOS, autism, and other important health subjects in one educational session." },
  { icon: FlaskConical, title: "Learn About Health Testing", text: "Discover key considerations around food allergy testing and heavy metal testing, and understand why professional interpretation matters." },
  { icon: Sparkles, title: "Become a More Informed Health Advocate", text: "Learn to ask better questions, seek reliable health information, and have more informed conversations with healthcare professionals." },
];
const audience = [
  { title: "You're Seeking Answers", text: "You have ongoing health concerns and want to understand what questions to discuss with a healthcare professional." },
  { title: "You Want to Understand Complex Health Topics", text: "You're interested in learning more about cancer, digestive disorders, PCOS, autism, and other health conditions." },
  { title: "You're Interested in Health Testing", text: "You want to learn about food allergy testing and heavy metal testing, including their role and limitations." },
  { title: "You Want to Make Informed Health Decisions", text: "You want to become more confident in evaluating health information and discussing your concerns with qualified healthcare professionals." },
  { title: "You Believe in Learning Before Making Decisions", text: "You want to improve your health knowledge and understand the importance of appropriate medical guidance." },
];
const included = ["Live online webinar access", "All seven webinar topics", "Live Q&A session", "Testing guidance", "WhatsApp community access"];
const faqs = [
  { q: "Which payment methods can I use?", a: "You can select JazzCash, Easypaisa or bank transfer at checkout. The registration fee is PKR 499. Bank transfer details (Meezan Bank) are shown on the checkout page; the JazzCash and Easypaisa numbers are still being confirmed." },
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
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary"><MonitorPlay className="h-4 w-4" />EXCLUSIVE HEALTH EDUCATION WEBINAR</p>
        <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">How to Take Control of Your Health Without Relying on Endless Medications</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Understand complex health concerns, explore important health topics, and learn how to make more informed decisions about your health.</p>
        <p className="mt-7 font-bold">IN THIS WEBINAR, WE'LL EXPLORE:</p>
        <div className="mt-4 flex max-w-3xl flex-wrap gap-x-5 gap-y-3">
          {["Cancer & Digestive Disorders", "PCOS & Autism", "Food Allergy & Heavy Metal Testing", "When Doctors Haven't Found the Answers"].map(item => <span key={item} className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />{item}</span>)}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6"><div><p className="font-display text-3xl font-bold text-primary">WEBINAR ACCESS: {PAYMENT_AMOUNT}</p></div><Cta>Register Now — {PAYMENT_AMOUNT}</Cta></div>
        <p className="mt-5 text-sm text-muted-foreground">Click below to continue to checkout and secure your spot.</p>
      </div>
    </section>

    {/* 2. Why attend */}
    <section className="py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5"><SectionHead label="WHY THIS WEBINAR MATTERS" title="Your Health Deserves More Than Guesswork" text="When health concerns persist and answers are unclear, knowing what questions to ask and what information to seek can make a difference." /><p className="mx-auto mt-5 max-w-3xl text-center text-muted-foreground">This educational webinar will help you explore important health topics and develop a better understanding of your health-related concerns.</p><div className="mt-10 grid gap-6 md:grid-cols-3">{benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-lg border border-border bg-card p-6"><Icon className="h-7 w-7 text-primary" /><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-3 text-sm text-muted-foreground">{text}</p></div>)}</div><div className="mt-8 text-center"><p className="font-bold">Your health journey starts with knowledge.</p><Cta className="mt-5">Register Now — {PAYMENT_AMOUNT}</Cta></div></div></section>

    {/* 3. What you'll discover */}
    <section id="learn" className="bg-secondary/50 py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5"><SectionHead label="WHAT YOU'LL DISCOVER" title="Explore the Health Topics That Matter" text="Gain a better understanding of important health topics, explore common concerns, and learn what questions to discuss with qualified healthcare professionals." /><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{topics.map(({ icon: Icon, title, text }, i) => <div key={title} className="rounded-lg border border-border bg-card p-6"><div className="flex items-center justify-between"><span className="font-display text-2xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span><Icon className="h-6 w-6 text-primary" /></div><h3 className="mt-4 font-display text-xl font-bold">{title}</h3><p className="mt-3 text-sm text-muted-foreground">{text}</p></div>)}</div><div className="mt-8 flex justify-center"><Cta>Explore These Topics — Register for {PAYMENT_AMOUNT}</Cta></div></div></section>

    {/* 4. Is this webinar for you? */}
    <section className="py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5">
      <SectionHead label="IS THIS WEBINAR FOR YOU?" title="Take a More Informed Approach to Your Health" text="This webinar is designed for people who want to better understand important health topics and explore reliable ways to learn more about their health concerns." />
      <h3 className="mt-10 text-center text-xl font-bold">This Webinar May Be Right for You If:</h3>
      <div className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2">{audience.map(({ title, text }, i) => <div key={title} className="rounded-lg border border-border bg-card p-6"><div className="flex items-start gap-4"><span className="font-display text-2xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span><div><h4 className="font-bold">{title}</h4><p className="mt-2 text-sm text-muted-foreground">{text}</p></div></div></div>)}</div>
      <div className="mt-10 text-center"><h3 className="font-display text-2xl font-bold">Start Your Health Education Journey Today</h3><p className="mt-3 text-muted-foreground">Join the webinar for <strong className="text-foreground">{PAYMENT_AMOUNT}</strong>.</p><Cta className="mt-5">Register Now — {PAYMENT_AMOUNT}</Cta></div>
    </div></section>

    {/* 5. Meet your webinar host */}
    <section className="bg-secondary/50 py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5">
      <SectionHead label="MEET YOUR WEBINAR HOST" title="Learn From Dr. Adeel Anwar" text="Get a fresh perspective on important health topics and develop a better understanding of the questions surrounding your health." />
      <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-[240px_1fr] sm:items-center">
        <div className="flex aspect-[4/5] flex-col items-center justify-center gap-4 rounded-lg border border-border bg-card text-muted-foreground"><UserRound className="h-20 w-20 stroke-1" /><p className="text-sm">Host photo coming soon</p></div>
        <div>
          <h3 className="font-display text-3xl font-bold">Dr. Adeel Anwar</h3>
          <p className="mt-2 font-semibold text-primary">Chemical Engineer, Scientific Researcher &amp; Holistic Naturopath</p>
          <p className="mt-5 leading-relaxed text-muted-foreground">Dr. Adeel Anwar is a chemical engineer, scientific researcher, social entrepreneur, life coach, and holistic naturopath. He holds a First-Class MEng degree in Chemical Engineering with Business Management and a PhD in Chemical Engineering and Analytical Sciences from The University of Manchester, UK.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">With a background spanning scientific research, entrepreneurship, education, and holistic health, he is passionate about personal development, optimal health, and empowering individuals through knowledge. He is also the author of <span className="font-semibold text-foreground">The Ultimate Bioreactor: The 4 Key Factors to Optimal Health</span>, published in 2018.</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">Through his work, Dr. Adeel Anwar brings together scientific knowledge, health awareness, and personal development to encourage a more informed and holistic approach to well-being.</p>
          <h4 className="mt-6 font-bold">What You Can Expect:</h4>
          <ul className="mt-3 space-y-3">{["Clear explanations of important health topics.", "Educational insights into health concerns and testing.", "Guidance on asking informed questions about your health."].map(item => <li key={item} className="flex items-start gap-3 text-sm"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" /><span>{item}</span></li>)}</ul>
          <p className="mt-6 font-semibold">Your health journey begins with knowledge.</p>
          <Cta className="mt-6">Join the Webinar — {PAYMENT_AMOUNT}</Cta>
        </div>
      </div>
    </div></section>

    {/* 6. Your opportunity to learn */}
    <section className="py-16 sm:py-20"><div className="mx-auto max-w-6xl px-5">
      <SectionHead label="YOUR OPPORTUNITY TO LEARN" title="Invest in Your Health Knowledge for Just PKR 499" text="Get access to an educational webinar covering important health topics, helping you better understand health concerns and make more informed decisions." />
      <div className="mx-auto mt-10 grid max-w-4xl gap-10 md:grid-cols-[1fr_320px] md:items-center">
        <div>
          <h3 className="text-xl font-bold">What You'll Get</h3>
          <ul className="mt-6 space-y-5">
            {[{title:"Educational Webinar Access",text:"Explore important health topics in one learning session."},{title:"Insights Into 7 Important Health Topics",text:"Learn about cancer, digestive disorders, unresolved health concerns, autism, PCOS, food allergy testing, and heavy metal testing."},{title:"Practical Health Awareness",text:"Develop a better understanding of health information and questions to discuss with healthcare professionals."},{title:"WhatsApp Community Access",text:"Join the webinar community to receive important announcements and joining instructions."}].map(item => <li key={item.title} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" /><div><h4 className="font-bold">{item.title}</h4><p className="mt-1 text-sm text-muted-foreground">{item.text}</p></div></li>)}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-7 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-wide text-primary">YOUR REGISTRATION FEE</p>
          <div className="mt-5 flex items-center justify-center gap-3"><span className="text-xl text-muted-foreground line-through">PKR 999</span><span className="font-display text-4xl font-bold text-primary">PKR 499</span></div>
          <Cta className="mt-7 w-full">Get Access for PKR 499</Cta>
          <p className="mt-4 text-xs text-muted-foreground">Click below to continue to checkout and complete your registration.</p>
        </div>
      </div>
    </div></section>

    {/* 7. Frequently asked questions */}
    <section className="bg-secondary/50 py-16 sm:py-20"><div className="mx-auto max-w-3xl px-5">
      <SectionHead label="GOT QUESTIONS? WE HAVE ANSWERS." title="Frequently Asked Questions" />
      <div className="mt-10 divide-y divide-border">{[
        {q:"What is the webinar registration fee?",a:<>The registration fee is just <strong className="text-foreground">PKR 499</strong>.</>},
        {q:"Which health topics will the webinar cover?",a:"The webinar will cover cancer, digestive disorders, unresolved health concerns, autism, PCOS, food allergy testing, and heavy metal testing."},
        {q:"How can I pay the registration fee?",a:<>You can pay through <strong className="text-foreground">JazzCash, Easypaisa, or bank transfer</strong>. Payment instructions will be provided on the checkout page.</>},
        {q:"How do I join the webinar community?",a:"After submitting your payment details and screenshot, you'll be directed to the WhatsApp community joining page."},
        {q:"Will I receive webinar updates?",a:"Yes. The WhatsApp community will be used to share important announcements and webinar joining instructions."},
        {q:"Is this webinar a substitute for medical consultation?",a:"No. This is an educational webinar. It does not replace professional medical advice, diagnosis, or treatment."},
        {q:"How do I register?",a:<>Click the <strong className="text-foreground">"Register Now — PKR 499"</strong> button on this page. You'll be redirected to the checkout page to complete your registration.</>},
      ].map(({q,a}, i) => <details key={q} className="group py-5"><summary className="flex cursor-pointer list-none items-start gap-4 font-bold"><span className="text-primary">{i + 1}.</span><span className="flex-1">{q}</span><ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary><div className="mt-3 pl-8 leading-relaxed text-muted-foreground">{a}</div></details>)}</div>
      <div className="mt-10 rounded-lg border border-border bg-card p-7 text-center sm:p-9"><h3 className="font-display text-2xl font-bold">Still Have Questions?</h3><p className="mt-3 text-muted-foreground">Take the first step toward expanding your health knowledge.</p><Cta className="mt-6">Register Now — PKR 499</Cta></div>
    </div></section>

    {/* 8. Final CTA */}
    <section className="bg-primary py-16 text-primary-foreground sm:py-20"><div className="mx-auto max-w-3xl px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-wide">YOUR HEALTH JOURNEY STARTS HERE</p>
      <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Stop Guessing. Start Understanding Your Health.</h2>
      <p className="mt-5 opacity-90">Your health deserves attention, knowledge, and informed decisions.</p>
      <p className="mt-3 opacity-90">Join this educational webinar to explore 7 important health topics, understand key health considerations, and learn how to have more informed conversations with healthcare professionals.</p>
      <div className="mx-auto mt-7 max-w-xl rounded-lg bg-primary-foreground/10 p-5 text-left">
        <p className="text-center text-sm font-bold uppercase tracking-wide">WHAT YOU'LL EXPLORE</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">{["Cancer & Digestive Disorders","Unresolved Health Concerns","Autism & PCOS","Food Allergy & Heavy Metal Testing"].map(item => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /><span>{item}</span></li>)}</ul>
      </div>
      <p className="mt-8 text-sm font-bold uppercase tracking-wide">YOUR WEBINAR ACCESS</p>
      <div className="mt-3 flex items-center justify-center gap-3"><span className="text-xl opacity-75 line-through">PKR 999</span><span className="font-display text-4xl font-bold">PKR 499</span></div>
      <p className="mt-4 opacity-90">Get access to the educational webinar and join the WhatsApp community for important announcements and joining instructions.</p>
      <Cta className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">Register Now — PKR 499</Cta>
      <p className="mt-4 text-sm opacity-90">Click below to continue to checkout and complete your registration.</p>
      <p className="mt-5 text-sm font-semibold">Take the first step toward becoming a more informed health advocate.</p>
      <p className="mt-6 text-xs opacity-80">Disclaimer: This webinar is for educational purposes only and does not replace professional medical advice, diagnosis, or treatment.</p>
    </div></section>
    <footer className="border-t border-border py-10"><div className="mx-auto max-w-4xl space-y-5 px-5 text-center text-sm text-muted-foreground"><div className="flex justify-center"><Brand /></div><p></p><p>© {new Date().getFullYear()} Root-Cause Health. All rights reserved.</p></div></footer>
  </main>;
}
