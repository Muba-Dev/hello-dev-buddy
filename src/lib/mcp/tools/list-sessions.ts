import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { sessions } from "../data";

export default defineTool({
  name: "list_sessions",
  title: "List class sessions",
  description:
    "List scheduled class sessions with days, times, location and teacher. Optionally filter by schedule type or keyword.",
  inputSchema: {
    type: z
      .enum(["Regular", "Weekly", "Weekend"])
      .optional()
      .describe("Optional schedule type filter."),
    query: z
      .string()
      .optional()
      .describe("Optional keyword to match session title, teacher or location."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ type, query }) => {
    const q = query?.trim().toLowerCase();
    const matches = sessions.filter((s) => {
      if (type && s.type !== type) return false;
      if (!q) return true;
      return (
        s.title.toLowerCase().includes(q) ||
        s.teacher.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      );
    });
    return {
      content: [{ type: "text", text: JSON.stringify(matches, null, 2) }],
      structuredContent: { sessions: matches },
    };
  },
});
