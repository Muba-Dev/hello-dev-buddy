import { defineTool } from "@lovable.dev/mcp-js";
import { enrollmentInfo } from "../data";

export default defineTool({
  name: "get_enrollment_info",
  title: "Get enrollment information",
  description:
    "Explain how to enroll at the school: where the enrollment form lives and which details applicants must provide.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(enrollmentInfo, null, 2) }],
    structuredContent: enrollmentInfo,
  }),
});
