import { z } from "zod";
// Explicit .ts extension so the same module can be imported by Deno in the
// submit-admission edge function (Vite/TS allow this via allowImportingTsExtensions).
import { findProgramBySlug } from "../data/school.ts";

/**
 * Validation and metadata for the admission form, shared by the website, the
 * MCP enrollment tool and the `submit-admission` edge function. Field rules
 * live here only, so every surface enforces the same contract.
 */

/**
 * Accept the common Nigerian formats and return a canonical E.164 number:
 * 0803 123 4567 / +2348031234567 / 2348031234567 -> +2348031234567
 * Returns null for anything that is not a valid Nigerian mobile number.
 */
export function normalizeNigerianPhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("0") && digits.length === 11 ? `234${digits.slice(1)}` : digits;
  return /^234[789]\d{9}$/.test(local) ? `+${local}` : null;
}

export const isNigerianPhone = (value: string) => normalizeNigerianPhone(value) !== null;

const nigerianPhone = z
  .string()
  .trim()
  .min(1, "Enter a phone number.")
  .refine(isNigerianPhone, {
    message: "Enter a valid Nigerian number, e.g. 0803 123 4567 or +234 803 123 4567.",
  });

const baseSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Enter the student's full name (at least 3 characters)."),
  age: z
    .string()
    .trim()
    .regex(/^\d+$/, "Enter a whole number for age.")
    .refine((value) => Number(value) >= 4 && Number(value) <= 100, {
      message: "Age must be between 4 and 100.",
    }),
  /** Required when age < 18; enforced by the superRefine below. */
  guardianName: z.string().trim().optional(),
  phone: nigerianPhone,
  email: z
    .union([z.string().trim().email("Enter a valid email address."), z.literal("")])
    .optional(),
  gender: z.enum(["female", "male"], {
    error: "Select a gender.",
  }),
  /** Canonical programme slug from src/data/school.ts (the active programme list). */
  program: z
    .string()
    .refine((slug) => Boolean(findProgramBySlug(slug)), {
      message: "Choose a valid programme.",
    }),
  address: z.string().trim().min(5, "Enter a full address (street, area, town)."),
  background: z.string().trim().max(500, "Keep this under 500 characters.").optional(),
  emergencyContact: nigerianPhone,
  agreedToTerms: z.literal(true, {
    error: "You must accept the attendance and fee terms.",
  }),
  /** Hidden honeypot. Empty for real users; the API silently drops filled submissions. */
  honeypot: z.string().optional(),
});

export const admissionSchema = baseSchema.superRefine((data, ctx) => {
  const age = Number(data.age);
  if (Number.isInteger(age) && age < 18 && (!data.guardianName || data.guardianName.length < 3)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["guardianName"],
      message: "Enter the parent/guardian's full name for applicants under 18.",
    });
  }

  if (
    normalizeNigerianPhone(data.phone) &&
    normalizeNigerianPhone(data.phone) === normalizeNigerianPhone(data.emergencyContact)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["emergencyContact"],
      message: "Use a different number from the primary phone number.",
    });
  }
});

export type AdmissionFormValues = z.infer<typeof admissionSchema>;

/** Human-readable labels exported over MCP and used by the form and tests. */
export const admissionFieldLabels: Record<keyof AdmissionFormValues, string> = {
  fullName: "Full name (min. 3 characters)",
  age: "Age (4–100)",
  guardianName: "Parent / guardian full name (required under 18)",
  phone: "Applicant / parent phone number (Nigerian format)",
  email: "Email address",
  gender: "Gender",
  program: "Programme selection",
  address: "Home address (min. 5 characters)",
  background: "Previous Islamic education (max. 500 characters)",
  emergencyContact: "Emergency contact number (different from primary)",
  agreedToTerms: "Acceptance of attendance and fee terms",
  honeypot: "Leave this field empty",
};

type FieldName = Exclude<keyof AdmissionFormValues, "honeypot">;
type OptionalCheck = { isOptional: () => boolean };

const fieldNames = Object.keys(baseSchema.shape).filter((name) => name !== "honeypot") as FieldName[];

const optionalFields = fieldNames.filter((name) =>
  (baseSchema.shape[name] as unknown as OptionalCheck).isOptional(),
);

/** Fields applicants must supply (guardianName is additionally conditional on age). */
export const requiredAdmissionFields = fieldNames
  .filter((name) => !optionalFields.includes(name))
  .map((name) => admissionFieldLabels[name]);

/** Fields applicants may leave blank. */
export const optionalAdmissionFields = optionalFields.map(
  (name) => admissionFieldLabels[name],
);

/** Extra rules that the MCP enrollment tool should communicate to callers. */
export const conditionalAdmissionRules = [
  "Applicants under 18 must provide a parent/guardian full name; that number becomes the primary contact.",
  "The emergency contact number must be different from the primary phone number.",
  "Only programme slugs currently published on the website are accepted.",
] as const;
