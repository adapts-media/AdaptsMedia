"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const TYPES = [
  { value: "", label: "All types" },
  { value: "start_project", label: "Start a Project" },
  { value: "contact", label: "Contact Form" },
];

const STATUSES = [
  { value: "", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "in_progress", label: "In Progress" },
  { value: "archived", label: "Archived" },
];

export default function LeadFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [, startTransition] = useTransition();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <select
        defaultValue={searchParams.get("type") || ""}
        onChange={(e) => updateParam("type", e.target.value)}
        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#FAC02D]/60"
      >
        {TYPES.map((t) => (
          <option key={t.value} value={t.value} className="bg-[#0B0B0C]">
            {t.label}
          </option>
        ))}
      </select>

      <select
        defaultValue={searchParams.get("status") || ""}
        onChange={(e) => updateParam("status", e.target.value)}
        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#FAC02D]/60"
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value} className="bg-[#0B0B0C]">
            {s.label}
          </option>
        ))}
      </select>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParam("q", q);
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Search name, email, company…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-64 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-[#FAC02D]/60"
        />
        <button
          type="submit"
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-white/70 transition hover:bg-white/5"
        >
          Search
        </button>
      </form>
    </div>
  );
}
