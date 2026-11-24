import type { Tables } from "@/integrations/supabase/types";

export type Application = Tables<"admission_applications">;
export type AuditEntry = Tables<"admission_audit_log">;
export type AdmissionStatus = Application["status"];
export type PaymentStatus = Application["payment_status"];
export type PaymentMethod = NonNullable<Application["payment_method"]>;

export const admissionStatuses: AdmissionStatus[] = [
  "NEW",
  "CONTACTED",
  "PLACEMENT_DONE",
  "ENROLLED",
  "ARCHIVED",
];

/** Labels deliberately mirror the five steps promised on the public page. */
export const statusMeta: Record<
  AdmissionStatus,
  { label: string; step: string; hint: string; badge: string }
> = {
  NEW: {
    label: "New",
    step: "Step 02 · Submitted",
    hint: "Awaiting the first placement call (3 working-day SLA).",
    badge: "bg-amber-100 text-amber-900",
  },
  CONTACTED: {
    label: "Contacted",
    step: "Step 03 · Placement conversation",
    hint: "A teacher has spoken with the applicant.",
    badge: "bg-sky-100 text-sky-900",
  },
  PLACEMENT_DONE: {
    label: "Placement done",
    step: "Step 04 · Fee pending",
    hint: "Level assigned; waiting for the registration fee.",
    badge: "bg-violet-100 text-violet-900",
  },
  ENROLLED: {
    label: "Enrolled",
    step: "Step 05 · Active",
    hint: "Fee verified; timetable and materials issued.",
    badge: "bg-emerald-100 text-emerald-900",
  },
  ARCHIVED: {
    label: "Archived",
    step: "Closed",
    hint: "Spam, duplicate or applicant withdrew.",
    badge: "bg-muted text-muted-foreground",
  },
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  CASH_AT_OFFICE: "Cash at Itaolokan office",
  BANK_TRANSFER: "Bank transfer",
};

/** Count weekdays elapsed since a timestamp (used for the first-call SLA). */
export function workingDaysSince(timestamp: string, now = new Date()): number {
  const cursor = new Date(timestamp);
  cursor.setHours(0, 0, 0, 0);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  let count = 0;
  while (cursor < today) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() !== 0 && cursor.getDay() !== 6) count += 1;
  }
  return count;
}

export type SlaState = "breached" | "due" | "ok";

/** New applications should receive a call within three working days. */
export function callSla(application: Application, now = new Date()): SlaState {
  if (application.status !== "NEW") return "ok";
  const days = workingDaysSince(application.created_at, now);
  return days >= 3 ? "breached" : days === 2 ? "due" : "ok";
}

export const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("en-NG", { dateStyle: "medium" }) : "—";

export const formatDateTime = (value: string | null) =>
  value ? new Date(value).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }) : "—";
