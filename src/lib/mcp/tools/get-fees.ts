import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { feeStructure, paymentPlans } from "../data";

export default defineTool({
  name: "get_fees",
  title: "Get fees and payment plans",
  description:
    "Get the school's fee structure per program (monthly, quarterly, annual, registration) and the available payment plans.",
  inputSchema: {
    program: z
      .string()
      .optional()
      .describe("Optional program name to filter the fee structure."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ program }) => {
    const q = program?.trim().toLowerCase();
    const fees = q
      ? feeStructure.filter((f) => f.program.toLowerCase().includes(q))
      : [...feeStructure];
    const payload = { currency: "USD", fees, paymentPlans };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
