import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { courses } from "../data";

export default defineTool({
  name: "list_courses",
  title: "List courses",
  description:
    "List the Islamic courses offered by the school, with level, duration and class size. Optionally filter by a keyword.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional keyword to filter courses by title or description."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.trim().toLowerCase();
    const matches = q
      ? courses.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q),
        )
      : [...courses];
    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { courses: matches },
    };
  },
});
