"use client";

import { motion } from "framer-motion";
import { PROJECT_TYPES, PROJECT_GOALS, BUDGET_RANGES, TIMELINE_OPTIONS, type ProjectFormData } from "./types";
import MagneticButton from "./MagneticButton";

interface StepReviewProps {
  data: ProjectFormData;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError?: string | null;
}

function SummaryCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  return (
    <motion.div
      className="relative group bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.15] rounded-[0.75rem] p-3 md:p-4 backdrop-blur-xl transition-all duration-500 overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative z-10">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#FAC02D] mb-1 font-sans font-semibold truncate">{label}</p>
        <p className="text-white/90 text-[13px] md:text-sm font-light font-sans truncate" title={value}>{value || "—"}</p>
      </div>
    </motion.div>
  );
}

export default function StepReview({ data, onSubmit, isSubmitting, submitError }: StepReviewProps) {
  const projectType = PROJECT_TYPES.find((t) => t.id === data.projectType);
  const goals = data.goals.map((g) => PROJECT_GOALS.find((pg) => pg.id === g)?.label).filter(Boolean).join(", ");
  const budget = BUDGET_RANGES.find((b) => b.id === data.budget);
  const timeline = TIMELINE_OPTIONS.find((t) => t.id === data.timeline);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-0">
      <motion.div className="mb-6 md:mb-8 flex flex-col items-center text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>


        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extralight text-white tracking-[-0.03em] leading-tight mb-2 sm:mb-4" style={{ fontFamily: "var(--font-heading), sans-serif" }}>
          Ready to create{" "}
          <br className="hidden sm:block" />
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FAC02D] to-[#C52A27]">
            something remarkable?
          </span>
        </h2>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3">
          <SummaryCard label="Project Type" value={projectType?.label || ""} delay={0.1} />
          <SummaryCard label="Name" value={data.name} delay={0.15} />
          <SummaryCard label="Company" value={data.company} delay={0.2} />
          <SummaryCard label="Email" value={data.email} delay={0.25} />
          <SummaryCard label="Goals" value={goals} delay={0.3} />
          <SummaryCard label="Budget" value={budget?.label || ""} delay={0.35} />
          <SummaryCard label="Timeline" value={timeline?.label || ""} delay={0.4} />
          {data.website ? (
            <SummaryCard label="Website" value={data.website} delay={0.45} />
          ) : (
            <SummaryCard label="Website" value="None" delay={0.45} />
          )}
        </div>

        {data.description && (
          <motion.div className="relative group bg-white/[0.02] border border-white/[0.06] rounded-[0.75rem] p-4 mb-8 md:mb-10 backdrop-blur-xl overflow-hidden"
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <div 
              className="absolute inset-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            <div className="relative z-10">
              <p className="text-[9px] tracking-[0.2em] uppercase text-[#FAC02D] mb-2 font-sans font-semibold">Project Description</p>
              <p className="text-white/70 text-sm font-light leading-relaxed font-sans line-clamp-2 md:line-clamp-3" title={data.description}>{data.description}</p>
            </div>
          </motion.div>
        )}

        {submitError && (
          <motion.p
            className="mb-4 text-center text-sm text-red-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {submitError}
          </motion.p>
        )}

        <motion.div className="flex justify-center relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-gradient-to-r from-[#C52A27] to-[#FAC02D] rounded-full blur-xl opacity-20 pointer-events-none" />
          <MagneticButton onClick={onSubmit} disabled={isSubmitting} variant="primary">
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Project Request
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
