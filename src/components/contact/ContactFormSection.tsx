"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactFormSchema, type ContactFormData, CONTACT_SUBJECTS } from "./types";

const ContactFormSection = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", subject: "", message: "", website_url: "" },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: ContactFormData) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/images/ContactSectionBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1350px] 2xl:max-w-[1600px] mx-auto px-8 md:px-16 lg:px-20 w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">

        {/* Left Side Content */}
        <div className="flex-1 flex flex-col w-full text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">Free Consultation</h2>
          <p className="text-white/80 text-base md:text-lg max-w-md leading-relaxed mb-12">
            Whether you&rsquo;re launching a new brand, scaling your business, or looking for a strategic marketing partner, we&rsquo;re ready to help.
          </p>

          <div className="relative w-full max-w-[400px] aspect-square mx-auto lg:mx-0">
            <Image
              src="/images/ContactStarPattern.png"
              alt="Star Pattern"
              fill
              className="object-contain opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
              <Image
                src="/images/ContactRocket.png"
                alt="Rocket"
                width={350}
                height={350}
                className="object-contain drop-shadow-2xl hover:-translate-y-4 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="flex-1 w-full max-w-2xl lg:ml-auto">
          <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] p-8 md:p-10 shadow-2xl">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-14 h-14 rounded-full bg-[#f5b800]/20 flex items-center justify-center mb-4">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f5b800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">Message sent</h3>
                <p className="text-white/70 text-sm max-w-xs mb-6">
                  Thanks for reaching out — our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-sm text-[#f5b800] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Honeypot — hidden from real visitors, catches basic bots */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] w-px h-px opacity-0"
                  {...register("website_url")}
                />

                {/* Row 1 */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter Full Name"
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                      {...register("name")}
                    />
                    {errors.name && <p className="text-red-300 text-xs ml-1">{errors.name.message}</p>}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Email</label>
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                      {...register("email")}
                    />
                    {errors.email && <p className="text-red-300 text-xs ml-1">{errors.email.message}</p>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col md:flex-row gap-6 w-full">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                      {...register("phone")}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-white text-sm font-medium ml-1">Company</label>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800]"
                      {...register("company")}
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-white text-sm font-medium ml-1">Subject</label>
                  <div className="relative">
                    <select
                      className="w-full bg-[#F0F0F0] rounded-full px-5 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f5b800] appearance-none cursor-pointer"
                      {...register("subject")}
                      defaultValue=""
                    >
                      <option value="" disabled className="text-gray-400">Select a subject...</option>
                      {CONTACT_SUBJECTS.map((s) => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-black">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {errors.subject && <p className="text-red-300 text-xs ml-1">{errors.subject.message}</p>}
                </div>

                {/* Row 4 */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-white text-sm font-medium ml-1">Leave us a message</label>
                  <textarea
                    rows={4}
                    placeholder="Please type your message here..."
                    className="w-full bg-[#F0F0F0] rounded-[20px] px-5 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f5b800] resize-none"
                    {...register("message")}
                  />
                  {errors.message && <p className="text-red-300 text-xs ml-1">{errors.message.message}</p>}
                </div>

                {status === "error" && (
                  <p className="text-red-300 text-sm text-center">
                    Something went wrong sending your message. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto self-center bg-[#f5b800] hover:bg-[#e0a800] transition-colors text-black font-semibold rounded-full px-10 py-3 text-sm disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactFormSection;
