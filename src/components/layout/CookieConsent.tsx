"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cookie,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  Check,
  Lock,
  Info,
} from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  performance: boolean;
  advertisement: boolean;
}

const STORAGE_KEY = "adapts_cookie_consent_v1";

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: true,
  analytics: true,
  performance: true,
  advertisement: true,
};

const CATEGORIES = [
  {
    id: "necessary" as const,
    title: "Necessary",
    badge: "Always Active",
    locked: true,
    description:
      "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
  },
  {
    id: "functional" as const,
    title: "Functional",
    badge: null,
    locked: false,
    description:
      "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
  },
  {
    id: "analytics" as const,
    title: "Analytics",
    badge: null,
    locked: false,
    description:
      "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
  },
  {
    id: "performance" as const,
    title: "Performance",
    badge: null,
    locked: false,
    description:
      "Performance cookies are used to understand and analyse the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
  },
  {
    id: "advertisement" as const,
    title: "Advertisement",
    badge: null,
    locked: false,
    description:
      "Advertisement cookies are used to provide visitors with customised advertisements based on the pages you visited previously and to analyse the effectiveness of the ad campaigns.",
  },
];

export default function CookieConsent() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomising, setIsCustomising] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("necessary");

  // Push to GTM dataLayer if available
  const updateDataLayer = useCallback((prefs: CookiePreferences) => {
    if (typeof window !== "undefined") {
      const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
      if (win.dataLayer && Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: "cookie_consent_update",
          consent: {
            necessary: true,
            functional: prefs.functional,
            analytics: prefs.analytics,
            performance: prefs.performance,
            advertisement: prefs.advertisement,
          },
        });
      }
    }
  }, []);

  // Check saved consent in localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookiePreferences;
        setPreferences(parsed);
        setIsOpen(false);
        updateDataLayer(parsed);
      } else {
        // First visit - display banner after brief delay
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }
  }, [updateDataLayer]);

  // Persist consent
  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage errors
    }
    setPreferences(prefs);
    updateDataLayer(prefs);
    setIsOpen(false);
    setIsCustomising(false);
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      performance: true,
      advertisement: true,
    };
    saveConsent(allAccepted);
  };

  const handleRejectAll = () => {
    const allRejected: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      performance: false,
      advertisement: false,
    };
    saveConsent(allRejected);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const toggleCategory = (id: keyof CookiePreferences) => {
    if (id === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Don't render until client mounted, on admin routes, or if closed
  if (!mounted || !isOpen) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <AnimatePresence>
        {/* ============================================================ */}
        {/* 1. BOTTOM FULL-WIDTH LOW-HEIGHT BANNER                       */}
        {/* ============================================================ */}
        {isOpen && !isCustomising && (
          <motion.aside
            key="cookie-bottom-full-bar"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="region"
            aria-label="Cookie consent banner"
            className="fixed bottom-0 inset-x-0 w-full z-[99990] bg-[#070c18]/96 border-t border-white/12 shadow-[0_-12px_45px_rgba(0,0,0,0.7)] backdrop-blur-2xl text-white"
          >
            {/* Top luxury accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#0052FF] to-[#C9A84C]/80" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-6">
                {/* Left / Info Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#0052FF]/20 to-[#064ED3]/40 border border-[#0052FF]/30 flex items-center justify-center text-[#558eff] shrink-0">
                      <Cookie className="w-3 h-3 text-[#88b1ff]" />
                    </div>
                    <h2
                      id="cookie-banner-title"
                      className="text-xs sm:text-sm font-semibold tracking-tight text-white flex items-center gap-1.5"
                    >
                      We value your privacy
                    </h2>
                    <span className="text-[10px] uppercase tracking-wider text-[#C9A84C] font-semibold hidden sm:inline-block">
                      • Cookie Policy
                    </span>
                  </div>

                  <p className="text-[11.5px] sm:text-[12.5px] leading-relaxed text-white/75 font-normal">
                    We use cookies to ensure smooth website functionality, improve your browsing
                    experience, and display relevant content and ads. Some cookies are essential for
                    the site to work properly, while others help us analyse usage and enhance
                    performance. You can choose which types of cookies to allow, but disabling
                    certain cookies may affect how the site functions.{" "}
                    <button
                      type="button"
                      onClick={() => setIsCustomising(true)}
                      className="inline-flex items-center gap-1 text-[11.5px] sm:text-[12.5px] font-medium text-[#C9A84C] hover:text-[#dfbd5b] underline underline-offset-2 transition-colors cursor-pointer ml-1"
                    >
                      <SlidersHorizontal className="w-3 h-3" />
                      Customise Consent Preferences / Read more
                    </button>
                  </p>
                </div>

                {/* Right / Compact Action Buttons */}
                <div className="flex items-center justify-end gap-2 shrink-0 self-end lg:self-center">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/8 border border-white/10 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Reject All
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-white bg-gradient-to-r from-[#0052FF] to-[#064ED3] hover:from-[#1a66ff] hover:to-[#0855ea] shadow-[0_2px_14px_rgba(0,82,255,0.4)] hover:shadow-[0_2px_20px_rgba(0,82,255,0.6)] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Dismiss notice"
                    className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer ml-0.5"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}

        {/* ============================================================ */}
        {/* 2. CUSTOMISE CONSENT PREFERENCES MODAL                       */}
        {/* ============================================================ */}
        {isOpen && isCustomising && (
          <div className="fixed inset-0 z-[99990] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCustomising(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-preferences-title"
              className="relative w-full max-w-3xl max-h-[86vh] flex flex-col rounded-2xl bg-[#080d1a]/98 border border-white/12 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-white overflow-hidden z-10"
            >
              {/* Top Accent bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0052FF] to-[#C9A84C]/80" />

              {/* Modal Header */}
              <div className="p-5 sm:p-6 pb-4 border-b border-white/8 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF]/20 to-[#064ED3]/40 border border-[#0052FF]/30 flex items-center justify-center text-[#558eff] shrink-0 shadow-[0_0_20px_rgba(0,82,255,0.2)]">
                    <ShieldCheck className="w-5 h-5 text-[#88b1ff]" />
                  </div>
                  <div>
                    <h2
                      id="cookie-preferences-title"
                      className="text-base sm:text-lg font-bold tracking-tight text-white"
                    >
                      Customise Consent Preferences
                    </h2>
                    <span className="text-[11px] uppercase tracking-wider text-[#C9A84C] font-semibold">
                      Privacy & Consent Manager
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCustomising(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white/70 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
                  >
                    <span>Show less</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomising(false);
                      setIsOpen(false);
                    }}
                    aria-label="Close preferences"
                    className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto max-h-[55vh] custom-consent-scroll text-white/80 text-sm leading-relaxed">
                {/* Introductory Copy */}
                <div className="space-y-2 text-xs sm:text-[13px] text-white/75 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  <p>
                    We use cookies to help you navigate efficiently and perform certain functions.
                    You will find detailed information about all cookies under each consent category
                    below.
                  </p>
                  <p>
                    The cookies that are categorised as &ldquo;Necessary&rdquo; are stored on your
                    browser as they are essential for enabling the basic functionalities of the site.
                  </p>
                  <p>
                    We also use third-party cookies that help us analyse how you use this website,
                    store your preferences, and provide the content and advertisements that are
                    relevant to you. These cookies will only be stored in your browser with your
                    prior consent.
                  </p>
                  <p className="text-white/60">
                    You can choose to enable or disable some or all of these cookies but disabling
                    some of them may affect your browsing experience.
                  </p>
                </div>

                {/* Categories */}
                <div className="space-y-2.5 pt-1">
                  {CATEGORIES.map((cat) => {
                    const isExpanded = expandedCategory === cat.id;
                    const isEnabled = preferences[cat.id];

                    return (
                      <div
                        key={cat.id}
                        className={`rounded-xl border transition-colors ${
                          isExpanded
                            ? "bg-white/[0.04] border-white/15 shadow-sm"
                            : "bg-white/[0.02] border-white/8 hover:border-white/12"
                        }`}
                      >
                        <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedCategory(isExpanded ? null : cat.id)
                            }
                            className="flex-1 flex items-center gap-2.5 text-left cursor-pointer group"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#C9A84C] shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors shrink-0" />
                            )}
                            <span className="font-semibold text-white text-sm sm:text-base tracking-wide">
                              {cat.title}
                            </span>
                          </button>

                          <div className="flex items-center gap-3 shrink-0">
                            {cat.badge && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30">
                                <Lock className="w-2.5 h-2.5" />
                                {cat.badge}
                              </span>
                            )}

                            {cat.locked ? (
                              <div
                                aria-disabled="true"
                                className="relative inline-flex h-6 w-11 shrink-0 cursor-not-allowed items-center rounded-full bg-[#0052FF]/60 p-0.5 opacity-90"
                              >
                                <div className="h-5 w-5 rounded-full bg-white shadow-md translate-x-5 flex items-center justify-center">
                                  <Check className="w-3 h-3 text-[#0052FF]" />
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                role="switch"
                                aria-checked={isEnabled}
                                aria-label={`Toggle ${cat.title} cookies`}
                                onClick={() => toggleCategory(cat.id)}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0052FF] p-0.5 ${
                                  isEnabled ? "bg-[#0052FF]" : "bg-white/15 hover:bg-white/20"
                                }`}
                              >
                                <span
                                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
                                    isEnabled ? "translate-x-5" : "translate-x-0"
                                  }`}
                                />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Category Description */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-3.5 pt-1 text-xs sm:text-[13px] text-white/70 leading-relaxed border-t border-white/5 mt-0.5 flex items-start gap-2.5">
                                <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                                <span>{cat.description}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-[#050812] border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomising(false)}
                  className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer order-last sm:order-first"
                >
                  &larr; Back to summary
                </button>

                <div className="flex flex-wrap items-center justify-end gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 border border-white/10 transition-colors cursor-pointer text-center"
                  >
                    Reject All
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 border border-white/15 transition-colors cursor-pointer text-center"
                  >
                    Accept All
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#0052FF] to-[#064ED3] hover:from-[#1a66ff] hover:to-[#0855ea] shadow-[0_4px_16px_rgba(0,82,255,0.4)] transition-all cursor-pointer text-center"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-consent-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-consent-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-consent-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }
        .custom-consent-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </>
  );
}
