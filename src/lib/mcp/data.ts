/**
 * MCP-facing view of the school content.
 *
 * This module contains no content of its own: every value is derived from
 * `src/data/school.ts` and the shared admission schema. Keeping adapters here
 * lets the tools expose a stable, tool-friendly shape without creating a
 * second, drifting copy of the school's data.
 */
// Relative imports are required here: the MCP bundler that generates the
// Supabase edge function does not resolve the app's `@/` path alias.
import {
  paymentPlans as canonicalPaymentPlans,
  programs,
  sessions,
} from "../../data/school";
import {
  conditionalAdmissionRules,
  optionalAdmissionFields,
  requiredAdmissionFields,
} from "../admission";

export const courses = programs.map((program) => ({
  id: program.id,
  title: program.title,
  description: program.summary,
  keywords: program.keywords,
  level: program.level,
  duration: program.duration,
  classSize: program.classSize,
}));

export { sessions };

export const feeStructure = programs.map((program) => ({
  id: program.id,
  program: program.title,
  monthly: program.monthlyFee,
  quarterly: program.quarterlyFee,
  annual: program.annualFee,
  registration: program.registrationFee,
}));

export const paymentPlans = canonicalPaymentPlans.map((plan) => ({
  id: plan.id,
  name: plan.name,
  period: plan.period,
  detail: plan.detail,
}));

export const enrollmentInfo = {
  page: "/admission",
  referenceFormat: "DHF-YYYY-NNNN",
  requiredFields: requiredAdmissionFields,
  optionalFields: optionalAdmissionFields,
  conditionalRules: conditionalAdmissionRules,
  notes:
    "Applications are submitted through the form at /admission and stored by the school. A registration fee applies per programme. Applicants receive an on-screen reference ID and a call within three working days.",
} as const;
