import { describe, expect, it } from "vitest";
import {
  findProgramBySlug,
  findProgramByTitle,
  paymentPlans,
  programs,
  sessions,
  teachers,
} from "./school";
import {
  admissionSchema,
  optionalAdmissionFields,
  requiredAdmissionFields,
} from "@/lib/admission";
import {
  courses,
  enrollmentInfo,
  feeStructure,
  paymentPlans as mcpPaymentPlans,
} from "@/lib/mcp/data";

describe("school content", () => {
  it("uses unique programme ids and slugs", () => {
    expect(new Set(programs.map((p) => p.id)).size).toBe(programs.length);
    expect(new Set(programs.map((p) => p.slug)).size).toBe(programs.length);
  });

  it("resolves links by slug and by legacy title", () => {
    expect(findProgramBySlug(programs[0].slug)?.id).toBe(programs[0].id);
    expect(findProgramByTitle(programs[0].title)?.id).toBe(programs[0].id);
  });

  it("keeps session teachers in sync with the staff list", () => {
    for (const session of sessions) {
      const teacher = teachers.find((t) => t.id === session.teacherId);
      expect(teacher, `Unknown teacher for session ${session.id}`).toBeDefined();
      expect(session.teacher).toBe(teacher?.shortName);
    }
  });

  it("exposes the canonical payment plans", () => {
    expect(mcpPaymentPlans.map((plan) => plan.name)).toEqual(
      paymentPlans.map((plan) => plan.name),
    );
  });
});

describe("MCP adapters", () => {
  it("publishes the same programmes and fees as the website", () => {
    expect(courses.map((course) => course.title)).toEqual(
      programs.map((program) => program.title),
    );
    expect(feeStructure).toEqual(
      programs.map((program) => ({
        id: program.id,
        program: program.title,
        monthly: program.monthlyFee,
        quarterly: program.quarterlyFee,
        annual: program.annualFee,
        registration: program.registrationFee,
      })),
    );
  });

  it("finds a programme by an alternative name such as hifz", () => {
    const hifz = programs.find((program) => program.slug === "hifz");
    const matches = courses.filter((course) =>
      course.keywords.some((keyword) => keyword.includes("hifz")),
    );
    expect(matches.map((course) => course.title)).toContain(hifz?.title);
  });

  it("publishes the same enrollment fields as the form schema", () => {
    expect(enrollmentInfo.requiredFields).toEqual(requiredAdmissionFields);
    expect(enrollmentInfo.optionalFields).toEqual(optionalAdmissionFields);
    expect(optionalAdmissionFields).toContain("Email address");
  });

  it("accepts a minor application with guardian details", () => {
    const result = admissionSchema.safeParse({
      fullName: "Aisha Bello",
      age: "12",
      guardianName: "Hajiya Bello",
      phone: "08012345678",
      gender: "female",
      program: programs[0].slug,
      address: "Itaolokan, Osogbo",
      emergencyContact: "08087654321",
      agreedToTerms: true,
    });
    expect(result.success).toBe(true);
  });
});
