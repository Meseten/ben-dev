"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, Printer, X } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  SKILL_GROUPS,
  CERTIFICATIONS,
} from "@/data/resume";

/** Fire-and-forget notification to the owner. Never blocks the UI. */
function trackResume(action: "view" | "print" | "download") {
  fetch("/api/track-resume", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
    keepalive: true,
  }).catch(() => {});
}

export default function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  // When the Download button already notified as "download", suppress the
  // beforeprint notification for that same dialog so the owner gets one
  // email, not two.
  const suppressPrintNotify = useRef(false);

  // ESC to close + focus the close button when opened
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    // Notify the owner that the résumé was opened (silent no-op without RESEND_API_KEY).
    trackResume("view");
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Print / save-as-PDF notification — single source of truth is the
  // beforeprint event, so browser-menu printing is covered too.
  useEffect(() => {
    if (!isOpen) return;
    const onPrint = () => {
      if (suppressPrintNotify.current) return;
      trackResume("print");
    };
    window.addEventListener("beforeprint", onPrint);
    return () => window.removeEventListener("beforeprint", onPrint);
  }, [isOpen]);

  /** Track as a download, then open the print dialog (the save-as-PDF path). */
  const downloadPdf = () => {
    trackResume("download");
    suppressPrintNotify.current = true;
    window.print();
    setTimeout(() => {
      suppressPrintNotify.current = false;
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 resume-modal-root"
      role="dialog"
      aria-modal="true"
      aria-label="Résumé of Ben James Duag"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full max-w-[8.5in] h-[92svh] bg-white text-slate-900 shadow-2xl overflow-y-auto rounded-xl [font-family:Arial,Helvetica,sans-serif] print:shadow-none print:rounded-none print:h-auto print:max-h-none"
      >
        {/* Sticky toolbar */}
        <div className="sticky top-0 z-50 flex items-center justify-end gap-2 px-4 py-3 bg-white/90 backdrop-blur border-b border-slate-200 print:hidden">
          <button
            onClick={downloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
            title="Opens the print dialog — choose 'Save as PDF' as the destination"
          >
            <Download size={16} />
            Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            <Printer size={16} />
            Print
          </button>
          <button
            onClick={onClose}
            ref={closeRef}
            aria-label="Close résumé"
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {/* Résumé body */}
        <div className="p-6 md:p-14 space-y-8">
          <header className="text-center border-b-2 border-slate-900 pb-6">
            <h2 className="text-3xl font-display font-bold tracking-tight">
              Ben James Jocson Duag
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Systems &amp; Applications Developer, Cavite, Philippines
            </p>
            <p className="text-xs text-slate-500 mt-2">
              benjamesduag.edu@gmail.com | +63 993 808 6865 | linkedin.com/in/ben-james-duag | github.com/Meseten
            </p>
          </header>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
              Education
            </h3>
            {EDUCATION.map((e) => (
              <div key={e.school} className="mb-3 flex flex-col md:flex-row md:items-baseline md:justify-between gap-0.5">
                <div>
                  <p className="font-bold text-sm">{e.school}</p>
                  <p className="text-xs italic text-slate-600">{e.degree}</p>
                </div>
                <span className="text-xs text-slate-500 shrink-0 md:text-right">{e.date}</span>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
              Technical Projects
            </h3>
            {PROJECTS.map((p) => (
              <div key={p.title} className="mb-4 break-inside-avoid">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-0.5">
                  <p className="font-bold text-sm">{p.title}</p>
                  <p className="text-[10px] font-mono text-slate-500">{p.tags.slice(0, 4).join(" | ")}</p>
                </div>
                <p className="text-xs italic text-slate-600">{p.role}</p>
                <p className="text-xs text-slate-700 mt-1 leading-snug">{p.desc}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
              Leadership &amp; Volunteer Experience
            </h3>
            {EXPERIENCE.map((x) => (
              <div key={x.org + x.role} className="mb-3 break-inside-avoid">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-0.5">
                  <p className="font-bold text-sm">{x.org}</p>
                  <span className="text-[10px] font-mono text-slate-500">{x.date}</span>
                </div>
                <p className="text-xs italic text-slate-600">{x.role}, {x.type}</p>
                <p className="text-xs text-slate-700 mt-0.5 leading-snug">{x.desc}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
              Skills
            </h3>
            <div className="text-xs leading-relaxed text-slate-700 space-y-2">
              {SKILL_GROUPS.map((g) => (
                <p key={g.label}>
                  <span className="font-bold">{g.label}.</span> {g.items.join(", ")}.
                </p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4">
              Certifications
            </h3>
            {CERTIFICATIONS.map((c) => (
              <p key={c.name} className="text-xs text-slate-700">
                <span className="font-bold">{c.name}</span>, {c.issuer}
              </p>
            ))}
          </section>
        </div>
      </motion.div>
    </div>
  );
}
