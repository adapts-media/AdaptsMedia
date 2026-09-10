import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyAdminSession } from "@/lib/session";
import type { Prisma, LeadType, LeadStatus } from "@prisma/client";
import LeadFilters from "./LeadFilters";
import StatusSelect from "./StatusSelect";

const PAGE_SIZE = 25;

const TYPE_LABELS: Record<string, string> = {
  start_project: "Start a Project",
  contact: "Contact Form",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; status?: string; q?: string; page?: string }>;
}) {
  // Belt-and-suspenders check — proxy.ts already redirects unauthenticated
  // requests, but this route's data access shouldn't rely on that alone.
  if (!(await verifyAdminSession())) {
    redirect("/admin/login");
  }

  const { type, status, q, page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const where: Prisma.LeadWhereInput = {
    ...(type ? { type: type as LeadType } : {}),
    ...(status ? { status: status as LeadStatus } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" } },
            { email: { contains: q, mode: "insensitive" } },
            { company: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.lead.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-baseline justify-between">
        <h1 className="text-2xl font-medium tracking-tight">Leads</h1>
        <p className="text-sm text-white/40">{total} total</p>
      </div>

      <LeadFilters />

      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-wide text-white/40">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                <td className="px-4 py-3 text-white/50 whitespace-nowrap">
                  <Link href={`/admin/leads/${lead.id}`} className="block">
                    {lead.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </Link>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <Link href={`/admin/leads/${lead.id}`} className="block">
                    {TYPE_LABELS[lead.type] || lead.type}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="block font-medium">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3 text-white/70">
                  <Link href={`/admin/leads/${lead.id}`} className="block">
                    {lead.email}
                  </Link>
                </td>
                <td className="px-4 py-3 text-white/50">
                  <Link href={`/admin/leads/${lead.id}`} className="block">
                    {lead.company || "—"}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <StatusSelect leadId={lead.id} status={lead.status} />
                </td>
              </tr>
            ))}

            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-white/40">
                  No leads match these filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-white/50">
          <PageLink page={page - 1} disabled={page <= 1} label="← Previous" searchParams={{ type, status, q }} />
          <span>
            Page {page} of {totalPages}
          </span>
          <PageLink page={page + 1} disabled={page >= totalPages} label="Next →" searchParams={{ type, status, q }} />
        </div>
      )}
    </div>
  );
}

function PageLink({
  page,
  disabled,
  label,
  searchParams,
}: {
  page: number;
  disabled: boolean;
  label: string;
  searchParams: { type?: string; status?: string; q?: string };
}) {
  if (disabled) return <span className="opacity-30">{label}</span>;

  const params = new URLSearchParams();
  if (searchParams.type) params.set("type", searchParams.type);
  if (searchParams.status) params.set("status", searchParams.status);
  if (searchParams.q) params.set("q", searchParams.q);
  params.set("page", String(page));

  return (
    <Link href={`/admin/leads?${params.toString()}`} className="hover:text-white">
      {label}
    </Link>
  );
}
