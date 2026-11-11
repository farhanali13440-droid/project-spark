import type { Tables } from "@/integrations/supabase/types";

export type Registration = Tables<"payments">;
export type RegistrationFilter = "all" | "pending" | "approved" | "rejected";

export function filterRegistrations(rows: Registration[], status: RegistrationFilter, search: string) {
  const query = search.trim().toLowerCase();
  return rows.filter((row) => (status === "all" || row.status === status) &&
    [row.full_name, row.whatsapp, row.email, row.city, row.transaction_id, row.learn_goal, row.id]
      .some((value) => value?.toLowerCase().includes(query)));
}

export function registrationSummary(rows: Registration[]) {
  return {
    total: rows.length,
    pending: rows.filter((row) => row.status === "pending").length,
    approved: rows.filter((row) => row.status === "approved").length,
    rejected: rows.filter((row) => row.status === "rejected").length,
    approvedAmount: rows.filter((row) => row.status === "approved").reduce((total, row) => total + row.amount, 0),
  };
}