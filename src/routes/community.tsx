import { createFileRoute } from "@tanstack/react-router";
import { Bell, ClipboardList, Megaphone } from "lucide-react";
import { WHATSAPP_COMMUNITY_URL } from "@/lib/community-config";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Join Our WhatsApp Community — Root-Cause Health Webinar" },
      { name: "description", content: "Join our WhatsApp community for webinar updates, announcements and joining instructions." },
      { property: "og:title", content: "Your Next Step Starts Here — Join the Community" },
      { property: "og:description", content: "Get webinar updates, announcements and joining instructions on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityPage,
});

function WhatsAppIcon({ className }: { className?: string | undefined }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.5h-.01a9.43 9.43 0 0 1-4.81-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.42 9.42 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.77 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.33 11.33 0 0 0 5.37 1.37h.01c6.26 0 11.36-5.1 11.36-11.37 0-3.04-1.18-5.89-3.33-8.04z" />
    </svg>
  );
}

const BENEFITS = [
  { icon: Bell, title: "Important Webinar Updates" },
  { icon: Megaphone, title: "Exclusive Community Announcements" },
  { icon: ClipboardList, title: "Webinar Joining Instructions" },
];

function CommunityPage() {
  const hasLink = WHATSAPP_COMMUNITY_URL.trim().length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-xl text-center">
          <div className="relative mx-auto mb-8 h-24 w-24">
            <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/20" />
            <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-xl shadow-whatsapp/30">
              <WhatsAppIcon className="h-12 w-12" />
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">Your Next Step Starts Here!</h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Thank you for registering for our webinar. Join our exclusive WhatsApp community to receive important webinar updates,
            announcements, and joining instructions.
          </p>

          {hasLink ? (
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-whatsapp px-8 py-5 text-lg font-bold text-whatsapp-foreground shadow-lg shadow-whatsapp/30 transition hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              <WhatsAppIcon className="h-6 w-6" /> Join Our WhatsApp Community
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="mt-10 inline-flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-full bg-whatsapp px-8 py-5 text-lg font-bold text-whatsapp-foreground opacity-60 sm:w-auto"
            >
              <WhatsAppIcon className="h-6 w-6" /> Join Our WhatsApp Community
            </button>
          )}
          {!hasLink && <p className="mt-2 text-xs text-muted-foreground">Invitation link coming soon.</p>}

          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Join the community now so you don't miss important webinar announcements and updates.
          </p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title }) => (
              <li key={title} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left sm:flex-col sm:text-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-whatsapp/10 text-whatsapp">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold">{title}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Thank you for being part of this learning experience.
      </footer>
    </div>
  );
}
