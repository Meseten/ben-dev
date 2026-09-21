"use client";

import { Briefcase, Check, Copy, Facebook, Github, Linkedin, Mail, Sprout } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import { Tip } from "@/components/ui/tooltip";
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
        <p className="text-ink-soft dark:text-ink-faint text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Open to internships, junior developer roles, freelance builds, and collaboration on
          civic-tech or research projects. Email reaches Ben directly, and every message gets a
          reply.
        </p>
        <button
          onClick={copyEmail}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-ink/10 dark:border-ink-light/10 bg-white dark:bg-ink-card hover:border-bamboo-500/60 shadow-lg transition-all mb-12"
          aria-live="polite"
        >
          <Mail size={20} className="text-ink-faint group-hover:text-bamboo-500 transition-colors" />
          <span className="font-mono text-sm md:text-base text-ink dark:text-ink-light">
            {SITE.email}
          </span>
          <span className="w-px h-6 bg-bamboo-100 dark:bg-ink-softdark mx-1" aria-hidden />
          {copied ? (
            <Check size={18} className="text-bamboo-600 dark:text-bamboo-400" />
          ) : (
            <Copy size={18} className="text-ink-faint group-hover:text-bamboo-500 transition-colors" />
          )}
        </button>

        <div className="flex justify-center gap-4">
          {[
            { label: "GitHub", tooltip: "Open-source code and repositories", href: SITE.github, icon: <Github size={20} /> },
            { label: "LinkedIn", tooltip: "Professional profile and recommendations", href: SITE.linkedin, icon: <Linkedin size={20} /> },
            { label: "Facebook", tooltip: "Social profile and community work", href: SITE.facebook, icon: <Facebook size={20} /> },
            { label: "JobStreet", tooltip: "Employment profile and work history", href: SITE.jobstreet, icon: <Briefcase size={20} /> },
            { label: "PyPI", tooltip: "krna, the optimization package live on PyPI", href: SITE.pypiUser, icon: <Sprout size={20} /> },
          ].map((s) => (
            <Tip key={s.label} label={s.tooltip} side="top">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-3.5 rounded-2xl border border-ink/10 dark:border-ink-light/10 bg-white dark:bg-ink-card text-ink-soft dark:text-ink-faint hover:text-bamboo-600 dark:hover:text-bamboo-400 hover:border-bamboo-500/50 transition-colors"
              >
                {s.icon}
              </a>
            </Tip>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
