"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LeadNotes({ leadId, notes }: { leadId: string; notes: string | null }) {
  const router = useRouter();
  const [value, setValue] = useState(notes || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setIsSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: value }),
      });
      if (res.ok) {
        setSaved(true);
        router.refresh();
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setSaved(false);
        }}
        rows={4}
        placeholder="Internal notes about this lead…"
        className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-[#FAC02D]/60"
      />
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/5 disabled:opacity-50"
        >
          {isSaving ? "Saving…" : "Save notes"}
        </button>
        {saved && <span className="text-xs text-green-400">Saved</span>}
      </div>
    </div>
  );
}
