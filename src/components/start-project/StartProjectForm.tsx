"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Image from "next/image";

import ParticleBackground from "./ParticleBackground";
import ProgressBar from "./ProgressBar";
import StepWelcome from "./StepWelcome";
import StepProjectType from "./StepProjectType";
import StepBusinessDetails from "./StepBusinessDetails";
import StepGoals from "./StepGoals";
import StepBudget from "./StepBudget";
import StepTimeline from "./StepTimeline";
import StepDescription from "./StepDescription";
import StepReview from "./StepReview";
import SuccessScreen from "./SuccessScreen";
import MagneticButton from "./MagneticButton";

import { projectFormSchema, type ProjectFormData } from "./types";

const INITIAL_DATA: ProjectFormData = {
  projectType: "",
  name: "",
  company: "",
  email: "",
  website: "",
  goals: [],
  budget: "",
  timeline: "",
  description: "",
};

export default function StartProjectForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ProjectFormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const stepContainerRef = useRef<HTMLDivElement>(null);

  // GSAP transition
  useEffect(() => {
    if (!stepContainerRef.current) return;
    const el = stepContainerRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: direction === 1 ? 40 : -40, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    );
  }, [step, direction]);

  const updateField = useCallback((field: string, value: string | string[]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validateStep = useCallback((): boolean => {
    const newErrors: Record<string, string | undefined> = {};
    switch (step) {
      case 1:
        if (!data.projectType) newErrors.projectType = "Please select a project type";
        break;
      case 2:
        if (data.name.length < 2) newErrors.name = "Name must be at least 2 characters";
        if (data.company.length < 2) newErrors.company = "Company name is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newErrors.email = "Please enter a valid email";
        if (data.website && !/^https?:\/\/.+/.test(data.website)) newErrors.website = "Enter a valid URL starting with http(s)://";
        break;
      case 3:
        if (data.goals.length === 0) newErrors.goals = "Select at least one goal";
        break;
      case 4:
        if (!data.budget) newErrors.budget = "Please select a budget range";
        break;
      case 5:
        if (!data.timeline) newErrors.timeline = "Please select a timeline";
        break;
      case 6:
        if (data.description.length < 10) newErrors.description = "Please provide more details (at least 10 characters)";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [step, data]);

  const goNext = useCallback(() => {
    if (step > 0 && !validateStep()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 7));
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleSubmit = useCallback(async () => {
    const result = projectFormSchema.safeParse(data);
    if (!result.success) {
      console.error("Validation failed:", result.error);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit project request");
      }

      setIsSuccess(true);
    } catch {
      setSubmitError("Something went wrong sending your request. Please try again, or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }, [data]);

  const handleReset = useCallback(() => {
    setData(INITIAL_DATA);
    setStep(0);
    setIsSuccess(false);
    setErrors({});
    setSubmitError(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && step > 0 && step < 7) {
        // Don't trigger on Enter in textarea
        if ((e.target as HTMLElement)?.tagName === "TEXTAREA") return;
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [step, goNext]);

  if (isSuccess) {
    return (
      <div className="relative h-screen bg-black overflow-hidden">
        <ParticleBackground />
        {/* Grain overlay */}
        <div
          className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />
        <SuccessScreen onReset={handleReset} />
      </div>
    );
  }

  const showBack = step > 0;
  const showNext = step > 0 && step < 7;

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden overflow-y-auto">
      <ParticleBackground />

      {/* Grain overlay — matches hero section */}
      <div
        className="fixed inset-0 z-[1] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Subtle background video — like the hero */}
      <div className="fixed inset-0 z-0 opacity-[0.06] pointer-events-none">
        <video autoPlay loop muted playsInline suppressHydrationWarning className="w-full h-full object-cover" style={{ filter: "contrast(200%) saturate(0%)" }}>
          <source
            src="https://cdn.prod.website-files.com/6984f3310998e8295121e212/6984f3310998e8295121e1ec_Work%20-%20Social%20PAGE%202%204k_mp4.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <ProgressBar currentStep={step} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-28 pb-32 md:py-20">
        <div ref={stepContainerRef} className="w-full" key={step}>
          {step === 0 && <StepWelcome onNext={goNext} />}
          {step === 1 && <StepProjectType value={data.projectType} onChange={(v) => updateField("projectType", v)} />}
          {step === 2 && (
            <StepBusinessDetails
              values={{ name: data.name, company: data.company, email: data.email, website: data.website ?? "" }}
              onChange={(field, val) => updateField(field, val)}
              errors={errors}
            />
          )}
          {step === 3 && <StepGoals value={data.goals} onChange={(v) => updateField("goals", v)} />}
          {step === 4 && <StepBudget value={data.budget} onChange={(v) => updateField("budget", v)} />}
          {step === 5 && <StepTimeline value={data.timeline} onChange={(v) => updateField("timeline", v)} />}
          {step === 6 && <StepDescription value={data.description} onChange={(v) => updateField("description", v)} error={errors.description} />}
          {step === 7 && (
            <StepReview data={data} onSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} />
          )}
        </div>

        {/* Navigation buttons */}
        {(showBack || showNext) && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-xl border-t border-white/10 px-4 py-3 sm:px-6 md:px-12 md:py-0 md:bg-transparent md:backdrop-blur-none md:border-none md:bottom-8 flex justify-between items-center max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {showBack ? (
              <MagneticButton variant="ghost" onClick={goBack}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </MagneticButton>
            ) : <div />}
            {showNext && (
              <MagneticButton variant="secondary" onClick={goNext}>
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </MagneticButton>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
