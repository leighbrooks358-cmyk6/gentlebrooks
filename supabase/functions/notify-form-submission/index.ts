import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET");
const NOTIFY_EMAIL = "leighbrooks358@gmail.com";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!WEBHOOK_SECRET || req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (!RESEND_API_KEY) {
    return new Response("Server not configured: missing RESEND_API_KEY", { status: 500 });
  }

  const payload = await req.json();
  const table = payload.table;
  const record = payload.record ?? {};

  let subject: string;
  let lines: string[];

  if (table === "booking_requests") {
    subject = `New booking request from ${record.name ?? "unknown"}`;
    lines = [
      `Name: ${record.name ?? ""}`,
      `Phone: ${record.phone ?? ""}`,
      `Email: ${record.email ?? ""}`,
      `Care for: ${record.care_for ?? ""}`,
      `Frequency: ${record.frequency ?? ""}`,
      `Hospice status: ${record.hospice_status ?? ""}`,
      `Notes: ${record.notes ?? ""}`,
      `Submitted: ${record.created_at ?? ""}`,
    ];
  } else if (table === "contact_messages") {
    subject = `New contact message from ${record.name ?? "unknown"}`;
    lines = [
      `Name: ${record.name ?? ""}`,
      `Email: ${record.email ?? ""}`,
      `Message: ${record.message ?? ""}`,
      `Submitted: ${record.created_at ?? ""}`,
    ];
  } else {
    return new Response("Unknown table", { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Gentle Brooks Site <notifications@gentlebrooksbathingservices.com>",
      to: [NOTIFY_EMAIL],
      subject,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Resend error:", errText);
    return new Response(`Resend error: ${errText}`, { status: 502 });
  }

  return new Response("ok", { status: 200 });
});
