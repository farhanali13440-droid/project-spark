import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock3, Eye, Loader2, LogOut, RefreshCw, Search, ShieldCheck, UserRound, Users, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { RegistrationDetail, formatDate } from "@/components/RegistrationDetail";
import { filterRegistrations, registrationSummary, type Registration, type RegistrationFilter } from "@/lib/admin-registrations";
import logoAsset from "@/assets/academy-logo.jpg.asset.json";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Webinar Registrations — Academy Admin" },
    { name: "description", content: "Private admin dashboard for webinar registrations, payment screenshots and reviews." },
    { property: "og:title", content: "Webinar Registrations — Academy Admin" },
    { property: "og:description", content: "Private registration and payment management for The Academy of Champions." },
    { name: "robots", content: "noindex, nofollow" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: AdminPage,
});

const field = "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20";

function AdminPage() {
  const user = useQuery({ queryKey: ["admin-user"], queryFn: async () => {
    const { data } = await supabase.auth.getUser();
    return data.user;
  }, retry: false });
  return <main className="min-h-screen bg-background text-foreground">
    {user.isPending ? <div className="flex min-h-screen items-center justify-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin motion-reduce:animate-none" />Checking access…</div> : user.data ? <Dashboard userId={user.data.id} email={user.data.email ?? ""} /> : <Login />}
  </main>;
}

function Login() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const queryClient = useQueryClient();
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email")).trim();
    const password = String(data.get("password"));
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await queryClient.invalidateQueries({ queryKey: ["admin-user"] });
      } else {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
        if (error) throw error;
        setMessage("Check your email to confirm your account, then return here to sign in. Only authorized administrators can view registrations.");
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : "Could not sign in. Please try again."); }
    finally { setBusy(false); }
  }
  return <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12">
    <Link to="/" className="mb-8 self-center"><img src={logoAsset.url} alt="The Academy of Champions" className="h-20 w-auto mix-blend-multiply" /></Link>
    <div className="mb-6 text-center"><ShieldCheck className="mx-auto mb-3 h-7 w-7 text-primary" /><p className="text-xs font-semibold uppercase text-muted-foreground">Academy administration</p><h1 className="mt-2 font-display text-3xl font-bold">{mode === "in" ? "Admin sign in" : "Create your account"}</h1></div>
    <form onSubmit={submit} className="space-y-5 rounded-lg border border-border bg-card p-6">
      <label className="block text-sm font-medium">Email address<input name="email" type="email" autoComplete="email" required className={`${field} mt-2`} /></label>
      <label className="block text-sm font-medium">Password<input name="password" type="password" autoComplete={mode === "in" ? "current-password" : "new-password"} required minLength={6} className={`${field} mt-2`} /></label>
      {message && <p role="alert" className="break-words text-sm text-muted-foreground">{message}</p>}
      <Button type="submit" className="w-full" size="lg" disabled={busy}>{busy && <Loader2 className="animate-spin motion-reduce:animate-none" />}{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}</Button>
      <Button type="button" variant="link" className="h-auto w-full whitespace-normal" disabled={busy} onClick={() => { setMode(mode === "in" ? "up" : "in"); setMessage(""); }}>{mode === "in" ? "Need an account? Sign up" : "Have an account? Sign in"}</Button>
    </form>
  </div>;
}

function Dashboard({ userId, email }: { userId: string; email: string }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<RegistrationFilter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Registration | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const role = useQuery({ queryKey: ["admin-role", userId], queryFn: async () => {
    const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    if (error) throw error;
    return data;
  } });
  const registrations = useQuery({ queryKey: ["admin-registrations", userId], enabled: role.data === true, queryFn: async () => {
    const rows: Registration[] = [];
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await supabase.from("payments").select("*").order("created_at", { ascending: false }).order("id").range(offset, offset + 999);
      if (error) throw error;
      rows.push(...data);
      if (data.length < 1000) break;
    }
    return rows;
  }, refetchInterval: 30000 });
  const profile = useQuery({ queryKey: ["admin-profile", userId], enabled: role.data === true, queryFn: async () => {
    const { data, error } = await supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle();
    if (error) throw error;
    return data;
  } });
  async function signOut() {
    setSignOutError("");
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error } = await supabase.auth.signOut();
    if (error) { setSignOutError("Could not sign out. Please try again."); return; }
    await navigate({ to: "/admin", replace: true });
  }
  async function review(id: string, status: string, note: string) {
    const { data, error } = await supabase.from("payments").update({ status, admin_note: note.trim() || null, reviewed_at: new Date().toISOString() }).eq("id", id).select("id").single();
    if (error || !data) throw error ?? new Error("Review not saved");
    await queryClient.invalidateQueries({ queryKey: ["admin-registrations", userId] });
  }
  if (role.isPending) return <p className="p-10 text-center text-muted-foreground">Checking administrator access…</p>;
  if (role.isError || !role.data) return <div className="mx-auto max-w-md space-y-4 px-5 py-20 text-center"><ShieldCheck className="mx-auto h-8 w-8 text-primary" /><h1 className="font-display text-2xl font-bold">{role.isError ? "Could not check access" : "Admin access required"}</h1><p className="text-muted-foreground">{role.isError ? "Please try again." : "This account is not authorized to view registrations."}</p>{role.isError && <Button variant="outline" onClick={() => role.refetch()}>Retry</Button>}<Button variant="outline" onClick={signOut}><LogOut />Sign out</Button>{signOutError && <p role="alert">{signOutError}</p>}</div>;
  const rows = registrations.data ?? [];
  const summary = registrationSummary(rows);
  const filtered = filterRegistrations(rows, filter, search);
  return <>
    <header className="border-b border-border bg-card"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="flex items-center gap-4"><Link to="/"><img src={logoAsset.url} alt="The Academy of Champions" className="h-12 w-auto mix-blend-multiply" /></Link><span className="border-l border-border pl-4 text-sm font-semibold">Admin</span></div>
      <div className="flex flex-wrap items-center gap-2"><Button variant="ghost" onClick={() => setProfileOpen(true)}><UserRound /><span className="max-w-40 truncate">{profile.data?.display_name || "My profile"}</span></Button><Button variant="outline" onClick={signOut}><LogOut />Sign out</Button></div>
    </div></header>
    <div className="mx-auto max-w-7xl px-5 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-muted-foreground">Root-Cause Health Webinar</p><h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">Registrations</h1></div><Button variant="outline" onClick={() => registrations.refetch()} disabled={registrations.isFetching}><RefreshCw className={registrations.isFetching ? "animate-spin motion-reduce:animate-none" : ""} />Refresh</Button></div>
      {signOutError && <p role="alert" className="mt-4 text-destructive">{signOutError}</p>}
      <div className="my-7 grid grid-cols-2 gap-4 lg:grid-cols-5">{[
        { label: "Total registrations", value: summary.total, icon: Users }, { label: "Pending review", value: summary.pending, icon: Clock3 },
        { label: "Approved", value: summary.approved, icon: CheckCircle2 }, { label: "Rejected", value: summary.rejected, icon: XCircle },
        { label: "Approved payments", value: `PKR ${summary.approvedAmount.toLocaleString()}`, icon: ShieldCheck },
      ].map(({ label, value, icon: Icon }) => <div key={label} className="rounded-lg border border-border bg-card p-4"><div className="flex items-start justify-between gap-2"><p className="text-xs text-muted-foreground">{label}</p><Icon className="h-4 w-4 shrink-0 text-primary" /></div><p className="mt-3 break-words text-2xl font-bold tabular-nums">{registrations.isPending ? "–" : value}</p></div>)}</div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div className="flex flex-wrap gap-1" role="group" aria-label="Registration status">{(["all", "pending", "approved", "rejected"] as const).map((status) => <Button key={status} variant={filter === status ? "default" : "ghost"} aria-pressed={filter === status} onClick={() => setFilter(status)} className="capitalize">{status === "all" ? "All registrations" : status}</Button>)}</div>
        <div className="relative w-full sm:w-80"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><input aria-label="Search registrations" placeholder="Search name, email, phone, city…" value={search} onChange={(e) => setSearch(e.target.value)} className={`${field} pl-9`} /></div>
      </div>
      {registrations.isError ? <p role="alert" className="py-10 text-destructive">Could not load registrations. Please refresh to try again.</p> : registrations.isPending ? <p className="py-10 text-muted-foreground">Loading registrations…</p> : <>
        <p className="my-4 text-xs text-muted-foreground">{filtered.length} of {rows.length} registrations · Times in Pakistan time</p>
        <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-secondary/50 text-xs text-muted-foreground"><tr>{["Registrant", "WhatsApp", "City", "Payment", "Status", "Submitted", ""].map((title, i) => <th key={i} className="px-3 py-3 font-semibold">{title}</th>)}</tr></thead><tbody>{filtered.map((row) => <tr key={row.id} className="border-b border-border"><td className="max-w-56 px-3 py-4"><p className="break-words font-semibold">{row.full_name}</p><p className="mt-1 break-words text-xs text-muted-foreground">{row.email || "No email provided"}</p></td><td className="px-3 py-4">{row.whatsapp}</td><td className="max-w-32 break-words px-3 py-4">{row.city || "—"}</td><td className="px-3 py-4"><p className="font-semibold">PKR {row.amount}</p><p className="mt-1 max-w-36 break-words font-mono text-xs text-muted-foreground">{row.transaction_id}</p></td><td className="px-3 py-4"><span className={`inline-flex items-center gap-1.5 text-xs font-semibold capitalize ${row.status === "rejected" ? "text-destructive" : "text-primary"}`}>{row.status === "pending" ? <Clock3 className="h-3.5 w-3.5" /> : row.status === "approved" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{row.status}</span></td><td className="px-3 py-4 text-xs text-muted-foreground">{formatDate(row.created_at)}</td><td className="px-3 py-4"><Button variant="outline" size="sm" onClick={() => setSelected(row)} aria-label={`View registration for ${row.full_name}`}><Eye />View details</Button></td></tr>)}</tbody></table></div>
        {!filtered.length && <p className="py-12 text-center text-muted-foreground">{rows.length ? "No registrations match this search." : "No registrations yet."}</p>}
      </>}
    </div>
    {selected && <RegistrationDetail key={selected.id} registration={selected} onClose={() => setSelected(null)} onReview={review} />}
    {profileOpen && <Profile userId={userId} email={email} name={profile.data?.display_name ?? ""} onClose={() => setProfileOpen(false)} />}
  </>;
}

function Profile({ userId, email, name, onClose }: { userId: string; email: string; name: string; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const displayName = String(new FormData(e.currentTarget).get("display_name")).trim();
    setBusy(true);
    setError("");
    const { error } = await supabase.from("profiles").upsert({ id: userId, display_name: displayName });
    setBusy(false);
    if (error) { setError("Could not save your profile. Please try again."); return; }
    await queryClient.invalidateQueries({ queryKey: ["admin-profile", userId] });
    onClose();
  }
  return <Dialog open onOpenChange={(open) => { if (!open && !busy) onClose(); }}><DialogContent className="rounded-lg"><DialogTitle>My profile</DialogTitle><DialogDescription>Administrator account</DialogDescription><form onSubmit={save} className="space-y-4"><label className="block text-sm font-medium">Display name<input name="display_name" defaultValue={name} maxLength={100} required className={`${field} mt-2`} /></label><div className="text-sm"><p className="font-medium">Email address</p><p className="mt-2 break-words text-muted-foreground">{email}</p></div><p className="text-sm"><ShieldCheck className="mr-2 inline h-4 w-4 text-primary" />Administrator</p>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save profile"}</Button></form></DialogContent></Dialog>;
}