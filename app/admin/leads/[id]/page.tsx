import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/session";
import StatusSelect from "../StatusSelect";
import LeadNotes from "./LeadNotes";
import DeleteLeadButton from "./DeleteLeadButton";

const TYPE_LABELS: Record<string, string> = {
  start_project: "Start a Project",
  contact: "Contact Form",
};

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function formatValue(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ") || "—";
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyAdminSession())) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) notFound();

  const payload = lead.payload as Record<string, unknown>;

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/leads" className="mb-6 inline-block text-sm text-white/40 hover:text-white">
        ← Back to leads
      </Link>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">{lead.name}</h1>
          <p className="mt-1 text-sm text-white/40">
            {TYPE_LABELS[lead.type] || lead.type} · Submitted{" "}
            {lead.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
        <StatusSelect leadId={lead.id} status={lead.status} />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm sm:grid-cols-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">Email</p>
          <a href={`mailto:${lead.email}`} className="text-[#FAC02D] hover:underline">
            {lead.email}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">Phone</p>
          <p>{lead.phone || "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">Company</p>
          <p>{lead.company || "—"}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">Subject</p>
          <p>{lead.subject || "—"}</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="mb-4 text-xs uppercase tracking-wide text-white/40">Full submission</h2>
        <dl className="space-y-3 text-sm">
          {Object.entries(payload).map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-4">
              <dt className="text-white/50">{formatLabel(key)}</dt>
              <dd className="col-span-2 whitespace-pre-wrap">{formatValue(value)}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mb-6 rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="mb-3 text-xs uppercase tracking-wide text-white/40">Notes</h2>
        <LeadNotes leadId={lead.id} notes={lead.notes} />
      </div>

      <div className="flex justify-end">
        <DeleteLeadButton leadId={lead.id} />
      </div>
    </div>
  );
}
