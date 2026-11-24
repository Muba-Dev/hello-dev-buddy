/**
 * Public admission submission endpoint.
 *
 * The shared Zod schema is imported from the app so client and server cannot
 * drift. Deploy with `supabase functions deploy submit-admission`; the import
 * map in deno.json resolves the bare `zod` specifier for Deno.
 */
import { createClient } from "@supabase/supabase-js";
import {
  admissionSchema,
  normalizeNigerianPhone,
} from "../../../src/lib/admission.ts";
import {
  findProgramBySlug,
  OFFICE_HOURS,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION,
  SCHOOL_NAME,
} from "../../../src/data/school.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

type Receipt = {
  referenceId: string;
  fullName: string;
  programme: string;
  duplicate: boolean;
  message: string;
};

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c,
  );

async function sendEmail(to: string, subject: string, html: string) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) {
    console.info(`RESEND_API_KEY not configured; skipped email to ${to}`);
    return;
  }
  const from = Deno.env.get("NOTIFICATION_FROM_EMAIL") ?? "Admissions <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!response.ok) console.error("Resend error", response.status, await response.text());
}

async function sendWhatsApp(to: string | undefined, body: string) {
  const token = Deno.env.get("WHATSAPP_TOKEN");
  const phoneId = Deno.env.get("WHATSAPP_PHONE_ID");
  if (!token || !phoneId || !to) {
    console.info("WhatsApp credentials not configured; skipped alert");
    return;
  }
  const version = Deno.env.get("WHATSAPP_API_VERSION") ?? "v19.0";
  const response = await fetch(
    `https://graph.facebook.com/${version}/${phoneId}/messages`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    },
  );
  if (!response.ok) console.error("WhatsApp error", response.status, await response.text());
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body." }, 400);
  }

  const parsed = admissionSchema.safeParse(body);
  if (!parsed.success) {
    return json({ error: "Please check the highlighted fields.", issues: parsed.error.flatten() }, 422);
  }

  const values = parsed.data;
  const phone = normalizeNigerianPhone(values.phone)!;
  const emergencyPhone = normalizeNigerianPhone(values.emergencyContact)!;
  const programmeTitle = findProgramBySlug(values.program)?.title ?? values.program;
  const message =
    `A teacher will call within three working days to confirm placement. ` +
    `Office hours: ${OFFICE_HOURS}.`;

  // Honeypot: respond as if successful but store nothing. Bots see a normal
  // response; real users never populate this hidden field.
  if (values.honeypot) {
    return json({
      referenceId: "",
      fullName: values.fullName,
      programme: programmeTitle,
      duplicate: false,
      message,
    } satisfies Receipt);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  // Deduplicate: identical name + phone within 24 hours returns the original
  // receipt instead of creating a second row (protects against double-clicks).
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  // Escape ILIKE wildcards so a name containing % or _ cannot match other rows.
  const safeName = values.fullName.replace(/[\\%_]/g, "\\$&");
  const { data: existing } = await supabase
    .from("admission_applications")
    .select("reference_id")
    .ilike("full_name", safeName)
    .eq("phone", phone)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existing) {
    return json({
      referenceId: existing.reference_id,
      fullName: values.fullName,
      programme: programmeTitle,
      duplicate: true,
      message: "We already received this application. Use the reference below if you call us.",
    } satisfies Receipt);
  }

  const { data: inserted, error } = await supabase
    .from("admission_applications")
    .insert({
      full_name: values.fullName,
      age: Number(values.age),
      guardian_name: values.guardianName || null,
      phone,
      email: values.email || null,
      gender: values.gender,
      program_slug: values.program,
      home_address: values.address,
      previous_education: values.background || null,
      emergency_contact: emergencyPhone,
      agreed_to_terms: true,
    })
    .select("reference_id")
    .single();

  if (error || !inserted) {
    console.error("Insert failed", error?.message);
    return json({ error: "We could not save your application. Please try again." }, 500);
  }

  const referenceId = inserted.reference_id;
  const adminText =
    `New admission application ${referenceId}\n` +
    `${values.fullName} (age ${values.age}), ${programmeTitle}\n` +
    `Phone: ${phone}\nEmail: ${values.email || "not provided"}`;

  // Notifications are best-effort: a provider outage must never lose a lead.
  await Promise.allSettled([
    sendEmail(
      Deno.env.get("ADMISSION_ALERT_EMAIL") ?? SCHOOL_EMAIL,
      `New application ${referenceId} — ${values.fullName}`,
      `<p><strong>${escapeHtml(referenceId)}</strong></p>` +
        `<p>${escapeHtml(values.fullName)} (age ${escapeHtml(values.age)}) — ${escapeHtml(programmeTitle)}</p>` +
        `<p>Phone: ${escapeHtml(phone)}<br>Email: ${escapeHtml(values.email || "not provided")}</p>`,
    ),
    sendWhatsApp(Deno.env.get("ADMISSIONS_WHATSAPP_NUMBER"), adminText),
    ...(values.email
      ? [
          sendEmail(
            values.email,
            `Your ${SCHOOL_NAME} application ${referenceId}`,
            `<p>Dear ${escapeHtml(values.fullName)},</p>` +
              `<p>We received your application for <strong>${escapeHtml(programmeTitle)}</strong>. ` +
              `Your reference is <strong>${escapeHtml(referenceId)}</strong>.</p>` +
              `<p>A teacher will call within three working days to confirm placement.</p>` +
              `<p>${SCHOOL_NAME}<br>${SCHOOL_LOCATION}<br>Office hours: ${OFFICE_HOURS}</p>`,
          ),
        ]
      : []),
  ]);

  return json({
    referenceId,
    fullName: values.fullName,
    programme: programmeTitle,
    duplicate: false,
    message,
  } satisfies Receipt);
});
