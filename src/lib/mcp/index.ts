import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCourses from "./tools/list-courses";
import listSessions from "./tools/list-sessions";
import getFees from "./tools/get-fees";
import getEnrollmentInfo from "./tools/get-enrollment-info";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "hello-dev-buddy",
  title: "hello-dev-buddy",
  version: "0.1.0",
  instructions:
    "Public information tools for Darul-Huda Wal-Furquran, an Islamic school and learning center. Use `list_courses` for programs, `list_sessions` for class schedules, `get_fees` for fees and payment plans, and `get_enrollment_info` for how to apply.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listCourses, listSessions, getFees, getEnrollmentInfo],
});
