"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteLeadButton({ leadId }: { leadId: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/leads");
        router.refresh();
      }
    } finally {
      setIsDeleting(false);
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-xs text-white/40 transition hover:text-red-400"
      >
        Delete lead
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="text-white/60">Delete this lead permanently?</span>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-red-400 hover:text-red-300 disabled:opacity-50"
      >
        {isDeleting ? "Deleting…" : "Yes, delete"}
      </button>
      <button onClick={() => setConfirming(false)} className="text-white/40 hover:text-white">
        Cancel
      </button>
    </div>
  );
}
