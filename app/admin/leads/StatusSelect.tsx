"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const STATUSES = [
  { value: "new", label: "New", className: "text-[#FAC02D]" },
  { value: "contacted", label: "Contacted", className: "text-blue-400" },
  { value: "in_progress", label: "In Progress", className: "text-purple-400" },
  { value: "archived", label: "Archived", className: "text-white/40" },
];

export default function StatusSelect({ leadId, status }: { leadId: string; status: string }) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [isSaving, setIsSaving] = useState(false);

  async function handleChange(next: string) {
    const previous = current;
    setCurrent(next);
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      router.refresh();
    } catch {
      setCurrent(previous);
    } finally {
      setIsSaving(false);
    }
  }

  const active = STATUSES.find((s) => s.value === current);

  return (
    <select
      value={current}
      disabled={isSaving}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => handleChange(e.target.value)}
      className={`rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-xs outline-none disabled:opacity-50 ${active?.className || ""}`}
    >
      {STATUSES.map((s) => (
        <option key={s.value} value={s.value} className="bg-[#0B0B0C] text-white">
          {s.label}
        </option>
      ))}
    </select>
  );
}
