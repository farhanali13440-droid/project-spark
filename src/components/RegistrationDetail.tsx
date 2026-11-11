import { useEffect, useState } from "react";
import { Check, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Registration } from "@/lib/admin-registrations";
import { PAYMENT_METHODS } from "@/lib/payment-config";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function RegistrationDetail({ registration, onClose, onReview }: {
  registration: Registration;
  onClose: () => void;
  onReview: (id: string, status: string, note: string) => Promise<void>;
}) {
  const [note, setNote] = useState(registration.admin_note ?? "");
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    let active = true;
    supabase.storage.from("payment-screenshots").createSignedUrl(registration.screenshot_path, 300).then(({ data, error }) => {
      if (!active) return;
      if (error) setImageError("Could not load the payment screenshot.");
      else if (data) setImage(data.signedUrl);
    });
    return () => { active = false; };
  }, [registration.screenshot_path]);
  async function review(status: string) {
    setSaving(true);
    setError("");
    try { await onReview(registration.id, status, note); onClose(); }
    catch { setError("Could not save this review. Please try again."); }
    finally { setSaving(false); }
  }
  const fields = [
    ["Full name", registration.full_name], ["WhatsApp number", registration.whatsapp],
    ["Email address", registration.email], ["City", registration.city],
    ["Learning goal", registration.learn_goal], ["Payment method", PAYMENT_METHODS.find((m) => m.id === registration.method)?.name ?? registration.method],
    ["Amount", `PKR ${registration.amount.toLocaleString()}`], ["Transaction ID", registration.transaction_id],
    ["Status", registration.status], ["Submitted", formatDate(registration.created_at)],
    ["Reviewed", registration.reviewed_at ? formatDate(registration.reviewed_at) : "Not yet reviewed"],
    ["Registration ID", registration.id], ["Screenshot file", registration.screenshot_path],
  ];
  return <Dialog open onOpenChange={(open) => { if (!open && !saving) onClose(); }}>
    <DialogContent className="max-h-[90dvh] max-w-4xl overflow-y-auto rounded-lg">
      <DialogTitle>Registration details</DialogTitle>
      <DialogDescription>{registration.full_name} · Payment review</DialogDescription>
      <div className="grid gap-6 md:grid-cols-2">
        <dl className="space-y-3">{fields.map(([label, value]) => <div key={label} className="border-b border-border pb-2"><dt className="text-xs text-muted-foreground">{label}</dt><dd className="mt-1 whitespace-pre-wrap break-words text-sm font-medium">{value || "Not provided"}</dd></div>)}</dl>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Payment screenshot</h3>
          {imageError ? <p role="alert" className="text-sm text-destructive">{imageError}</p> : image ? <a href={image} target="_blank" rel="noopener noreferrer" aria-label="Open full payment screenshot"><img src={image} alt={`Payment screenshot for ${registration.full_name}`} className="max-h-96 w-full rounded-lg border border-border object-contain" onError={() => setImageError("This screenshot could not be displayed.")} /></a> : <p className="text-sm text-muted-foreground">Loading screenshot…</p>}
          <label className="mt-6 block text-sm font-semibold" htmlFor="review-note">Admin note</label>
          <textarea id="review-note" value={note} onChange={(e) => setNote(e.target.value)} rows={4} maxLength={2000} className="mt-2 w-full rounded-md border border-input bg-background p-3 text-sm" />
          {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button disabled={saving || registration.status === "approved"} onClick={() => review("approved")}><Check />Approve</Button>
            <Button variant="destructive" disabled={saving || registration.status === "rejected"} onClick={() => review("rejected")}><X />Reject</Button>
            <Button variant="outline" disabled={saving} onClick={() => review(registration.status)}><Save />Save note</Button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PK", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" }).format(new Date(value));
}