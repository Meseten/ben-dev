"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data/resume";

export default function ContactModal({
  isOpen,
  projectTitle,
  onClose,
}: {
  isOpen: boolean;
  projectTitle?: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; fall through silently.
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact Ben about this project"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-7 shadow-2xl"
      >
        <button
          onClick={onClose}
          ref={closeRef}
          aria-label="Close contact dialog"
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center mb-4">
          <Mail size={20} className="text-cyan-500" />
        </div>

        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
          {projectTitle ? `About ${projectTitle}` : "Get in touch"}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          This project runs for real clients, so the source stays with the build. If you want
          something like it, or want to hear how it works, send a message and Ben will reply
          personally.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <a
            href={`mailto:${SITE.email}${projectTitle ? `?subject=${encodeURIComponent(`${projectTitle} inquiry`)}` : ""}`}
            className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-slate-950 transition-colors"
          >
            <Mail size={16} />
            Send email
          </a>
          <button
            onClick={copyEmail}
            aria-live="polite"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-bold hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
