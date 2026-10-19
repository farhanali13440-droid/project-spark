import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { PAYMENT_METHODS } from "@/lib/payment-config";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Payment Verification — Admin" },
      { name: "description", content: "Review and approve webinar payments." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Payment Verification — Admin" },
      { property: "og:description", content: "Admin area for webinar payment verification." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Payment = {
  id: string;
  full_name: string;
  whatsapp: string;
  method: string;
  transaction_id: string;
  screenshot_path: string;
  status: string;
  created_at: string;
};

const field = "w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:border-ring";

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return null;
  return <main className="min-h-screen bg-background px-5 py-10 text-foreground">{session ? <Dashboard userId={session.user.id} /> : <Login />}</main>;
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [msg, setMsg] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email")), password = String(fd.get("password"));
    setMsg("");
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      setMsg(error ? error.message : "Check your email to confirm your account, then sign in.");
    }
  }
  return (
    <form onSubmit={submit} className="mx-auto max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8">
      <h1 className="font-display text-2xl font-bold">Admin {mode === "in" ? "sign in" : "sign up"}</h1>
      <input name="email" type="email" required placeholder="Email" className={field} />
      <input name="password" type="password" required minLength={6} placeholder="Password" className={field} />
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
      <button className="w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground">{mode === "in" ? "Sign in" : "Create account"}</button>
      <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-muted-foreground underline">
        {mode === "in" ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>
    </form>
  );
}

function Dashboard({ userId }: { userId: string }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [filter, setFilter] = useState("pending");
  const [rows, setRows] = useState<Payment[]>([]);

  useEffect(() => {
    supabase.rpc("has_role", { _user_id: userId, _role: "admin" }).then(({ data }) => setIsAdmin(!!data));
  }, [userId]);

  const load = useCallback(async () => {
    const { data } = await supabase.from("payments").select("*").eq("status", filter).order("created_at", { ascending: false });
    setRows((data as Payment[]) ?? []);
  }, [filter]);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  async function setStatus(id: string, status: "approved" | "rejected") {
    await supabase.from("payments").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
    load();
  }
  async function viewShot(path: string) {
    const { data } = await supabase.storage.from("payment-screenshots").createSignedUrl(path, 300);
    if (data) window.open(data.signedUrl, "_blank", "noopener");
  }

  const signOut = (
    <button onClick={() => supabase.auth.signOut()} className="rounded-lg border border-border px-3 py-2 text-sm">Sign out</button>
  );

  if (isAdmin === null) return null;
  if (!isAdmin)
    return (
      <div className="mx-auto max-w-md space-y-4 text-center">
        <p>This account does not have admin access.</p>
        {signOut}
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Payment verification</h1>
        {signOut}
      </div>
      <div className="mt-6 flex gap-2">
        {["pending", "approved", "rejected"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${filter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
            {s === "pending" ? "Pending Verification" : s}
          </button>
        ))}
      </div>
      <div className="mt-6 space-y-3">
        {rows.length === 0 && <p className="text-muted-foreground">No payments here.</p>}
        {rows.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5">
            <div className="text-sm">
              <p className="text-base font-bold">{p.full_name}</p>
              <p className="text-muted-foreground">{p.whatsapp} · {PAYMENT_METHODS.find((m) => m.id === p.method)?.name}</p>
              <p>Txn: <span className="font-mono">{p.transaction_id}</span></p>
              <p className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleString()}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => viewShot(p.screenshot_path)} className="rounded-lg border border-border px-3 py-2 text-sm">View screenshot</button>
              {p.status !== "approved" && <button onClick={() => setStatus(p.id, "approved")} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">Approve</button>}
              {p.status !== "rejected" && <button onClick={() => setStatus(p.id, "rejected")} className="rounded-lg bg-destructive px-3 py-2 text-sm font-semibold text-destructive-foreground">Reject</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
