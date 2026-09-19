"use client";

import { Briefcase, Check, Copy, Facebook, Github, Linkedin, Mail, Sprout } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/data/resume";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (insecure context); fall through silently.
    }
  };

  return (
    <section id="contact" className="relative py-28 px-4 max-w-4xl mx-auto text-center scroll-mt-24">
      <SectionHeading title="Let's build something that matters" />
      <ScrollReveal>
        <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Open to internships, junior developer roles, freelance builds, and collaboration on
          civic-tech or research projects. Email reaches Ben directly, and every message gets a
          reply.
        </p>
        <button
          onClick={copyEmail}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-cyan-500/60 shadow-lg transition-all mb-12"
          aria-live="polite"
        >
          <Mail size={20} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
          <span className="font-mono text-sm md:text-base text-slate-700 dark:text-slate-200">
            {SITE.email}
          </span>
          <span className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" aria-hidden />
          {copied ? (
            <Check size={18} className="text-emerald-500" />
          ) : (
            <Copy size={18} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
          )}
        </button>

        <div className="flex justify-center gap-4">
          {[
            { label: "GitHub", href: SITE.github, icon: <Github size={20} /> },
            { label: "LinkedIn", href: SITE.linkedin, icon: <Linkedin size={20} /> },
            { label: "Facebook", href: SITE.facebook, icon: <Facebook size={20} /> },
            { label: "JobStreet", href: SITE.jobstreet, icon: <Briefcase size={20} /> },
            { label: "PyPI", href: SITE.pypiUser, icon: <Sprout size={20} /> },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
