import { describe, expect, it } from "vitest";
import { programs } from "@/data/school";
import {
  admissionSchema,
  isNigerianPhone,
  normalizeNigerianPhone,
  optionalAdmissionFields,
  requiredAdmissionFields,
} from "./admission";

const validAdult = {
  fullName: "Ibrahim Salaudeen",
  age: "34",
  phone: "0803 123 4567",
  gender: "male" as const,
  program: programs[0].slug,
  address: "12 Adekunle Street, Itaolokan, Osogbo",
  emergencyContact: "+234 805 987 6543",
  agreedToTerms: true as const,
};

describe("Nigerian phone handling", () => {
  it.each([
    ["08031234567", "+2348031234567"],
    ["0803 123 4567", "+2348031234567"],
    ["+2348031234567", "+2348031234567"],
    ["+234 803 123 4567", "+2348031234567"],
    ["2348031234567", "+2348031234567"],
  ])("normalises %s to %s", (input, expected) => {
    expect(normalizeNigerianPhone(input)).toBe(expected);
  });

  it.each(["12345", "+44 7700 900123", "0201234567", "0803123456"])(
    "rejects %s",
    (input) => {
      expect(isNigerianPhone(input)).toBe(false);
    },
  );
});

describe("admissionSchema", () => {
  it("accepts a valid adult application without a guardian", () => {
    expect(admissionSchema.safeParse(validAdult).success).toBe(true);
  });

  it("requires a guardian name when age is under 18", () => {
    const minor = { ...validAdult, age: "12", guardianName: "Amina Salaudeen" };
    expect(admissionSchema.safeParse(minor).success).toBe(true);

    const missing = admissionSchema.safeParse({ ...validAdult, age: "12" });
    expect(missing.success).toBe(false);
    if (!missing.success) {
      expect(missing.error.issues.some((i) => i.path[0] === "guardianName")).toBe(true);
    }
  });

  it("requires a guardian for an 18-year-old only from 18 upwards", () => {
    expect(admissionSchema.safeParse({ ...validAdult, age: "18" }).success).toBe(true);
  });

  it("enforces the age range 4-100", () => {
    expect(admissionSchema.safeParse({ ...validAdult, age: "3" }).success).toBe(false);
    expect(admissionSchema.safeParse({ ...validAdult, age: "101" }).success).toBe(false);
    expect(admissionSchema.safeParse({ ...validAdult, age: "12.5" }).success).toBe(false);
  });

  it("rejects an emergency contact identical to the primary phone", () => {
    const result = admissionSchema.safeParse({
      ...validAdult,
      emergencyContact: "2348031234567", // same number, different format
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "emergencyContact")).toBe(true);
    }
  });

  it("rejects invalid programme slugs", () => {
    expect(
      admissionSchema.safeParse({ ...validAdult, program: "not-a-programme" }).success,
    ).toBe(false);
  });

  it("enforces name, address and education lengths", () => {
    expect(admissionSchema.safeParse({ ...validAdult, fullName: "Ab" }).success).toBe(false);
    expect(admissionSchema.safeParse({ ...validAdult, address: "Oyo" }).success).toBe(false);
    expect(
      admissionSchema.safeParse({ ...validAdult, background: "x".repeat(501) }).success,
    ).toBe(false);
  });

  it("requires explicit terms acceptance", () => {
    const withoutTerms: Partial<typeof validAdult> = { ...validAdult };
    delete withoutTerms.agreedToTerms;
    expect(admissionSchema.safeParse(withoutTerms).success).toBe(false);
  });

  it("trims whitespace from text fields", () => {
    const result = admissionSchema.parse({
      ...validAdult,
      fullName: "  Ibrahim Salaudeen  ",
      address: "  12 Adekunle Street, Itaolokan, Osogbo  ",
    });
    expect(result.fullName).toBe("Ibrahim Salaudeen");
    expect(result.address).toBe("12 Adekunle Street, Itaolokan, Osogbo");
  });
});

describe("published field metadata", () => {
  it("excludes the honeypot and marks conditional/optional fields correctly", () => {
    expect(requiredAdmissionFields).not.toContain("Leave this field empty");
    expect(optionalAdmissionFields).not.toContain("Leave this field empty");
    expect(optionalAdmissionFields).toContain("Email address");
    expect(optionalAdmissionFields).toContain(
      "Previous Islamic education (max. 500 characters)",
    );
    // Guardian is conditionally required; the rule is published separately.
    expect(optionalAdmissionFields).toContain(
      "Parent / guardian full name (required under 18)",
    );
  });
});
