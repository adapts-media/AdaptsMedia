import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email";
import { contactFormSchema, CONTACT_SUBJECTS } from "@/components/contact/types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;

  // Honeypot tripped — pretend success so the bot doesn't learn anything,
  // but don't persist or notify.
  if (data.website_url) {
    return NextResponse.json({ id: "ok" }, { status: 201 });
  }

  const subjectLabel = CONTACT_SUBJECTS.find((s) => s.id === data.subject)?.label ?? data.subject;

  try {
    const lead = await prisma.lead.create({
      data: {
        type: "contact",
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        subject: subjectLabel,
        payload: { name: data.name, email: data.email, phone: data.phone, company: data.company, subject: subjectLabel, message: data.message },
      },
    });

    await sendLeadNotification(lead);

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[api/leads/contact] Failed to save lead:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
