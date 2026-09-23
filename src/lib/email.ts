import "server-only";
import nodemailer from "nodemailer";
import type { Lead } from "@prisma/client";

const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const notifyTo = process.env.LEAD_NOTIFICATION_EMAIL;

const transporter =
  smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: { user: smtpUser, pass: smtpPass },
      })
    : null;

const TYPE_LABELS: Record<string, string> = {
  start_project: "Start a Project",
  contact: "Contact Form",
};

/**
 * Notify the team of a new lead by email. Never throws — a missing/invalid
 * email configuration should not fail the form submission itself, since the
 * lead is already durably saved in the database by the time this runs.
 */
export async function sendLeadNotification(lead: Lead) {
  if (!transporter || !notifyTo) {
    console.warn(
      "[email] Skipping lead notification — SMTP_USER/SMTP_PASS or LEAD_NOTIFICATION_EMAIL is not set."
    );
    return;
  }

  const rows = Object.entries(lead.payload as Record<string, unknown>)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
      const display = Array.isArray(value) ? value.join(", ") : String(value ?? "—");
      return `<tr><td style="padding:6px 12px;color:#888;font:13px sans-serif;white-space:nowrap;vertical-align:top;">${label}</td><td style="padding:6px 12px;font:13px sans-serif;">${escapeHtml(display)}</td></tr>`;
    })
    .join("");

  const subject = `New ${TYPE_LABELS[lead.type] || lead.type} lead — ${lead.name}`;

  try {
    await transporter.sendMail({
      from: `Adapts Media Leads <${smtpUser}>`,
      to: notifyTo,
      replyTo: lead.email,
      subject,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="font-size:18px;">${subject}</h2>
          <table style="border-collapse:collapse;width:100%;">${rows}</table>
          <p style="margin-top:16px;font-size:12px;color:#aaa;">Lead ID: ${lead.id}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[email] Failed to send lead notification:", error);
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
