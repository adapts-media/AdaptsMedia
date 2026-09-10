import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLeadNotification } from "@/lib/email";
import { projectFormSchema } from "@/components/start-project/types";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = projectFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;

  try {
    const lead = await prisma.lead.create({
      data: {
        type: "start_project",
        name: data.name,
        email: data.email,
        company: data.company,
        payload: data,
      },
    });

    await sendLeadNotification(lead);

    return NextResponse.json({ id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[api/leads/start-project] Failed to save lead:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
