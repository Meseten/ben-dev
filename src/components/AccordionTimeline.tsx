"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { EXPERIENCE } from "@/data/resume";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Work history, GitHub layout: a single left rail with node dots, one card
 * per role, date chip on the right of the header row, ACTIVE live badge.
 * Skinned in bamboo: nodes fill bamboo for current roles, accents green.
 */
export default function AccordionTimeline() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* Vertical rail (left, GitHub position) */}
      <div
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-bamboo-600/60 dark:from-bamboo-400/50 via-ink/15 dark:via-ink-light/15 to-transparent"
      />

      <ol className="space-y-3">
        {EXPERIENCE.map((item, i) => {
          const isOpen = open === i;

          return (
            <li key={`${item.org}-${item.role}`} className="relative pl-8">
              {/* Node dot */}
              <span
                aria-hidden
                className={`absolute left-0 top-5 w-[15px] h-[15px] rounded-full border-2 transition-colors duration-300 ${
                  item.current
                    ? "bg-bamboo-600 dark:bg-bamboo-400 border-bamboo-200 dark:border-bamboo-800 shadow-[0_0_0_3px_rgba(63,125,46,0.15)]"
                    : "bg-bamboo-200 dark:bg-ink-softdark border-paper-light dark:border-paper-dark"
                }`}
              />

              <motion.button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`exp-panel-${i}`}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: EASE }}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white dark:bg-ink-card border-bamboo-500/40 shadow-lg shadow-bamboo-900/5"
                    : "bg-white/60 dark:bg-ink-card/40 border-ink/10 dark:border-ink-light/10 hover:border-bamboo-500/30 hover:bg-white dark:hover:bg-ink-card"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-ink dark:text-ink-light leading-snug">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-bamboo-600 dark:text-bamboo-400 mt-0.5">
                      {item.org}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-ink-soft dark:text-ink-faint bg-bamboo-50 dark:bg-ink-softdark px-2.5 py-1 rounded-full">
                      {item.date}
                    </span>
                    {item.current && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-bamboo-700 dark:text-bamboo-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bamboo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-bamboo-500" />
                        </span>
                        ACTIVE
                      </span>
                    )}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-ink-faint"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </div>
                </div>

                {/* Accordion panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-panel-${i}`}
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-ink/10 dark:border-ink-light/10">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint mb-2 sm:hidden">
                          {item.date}
                          {item.current ? " | Active" : ""}
                        </p>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-bamboo-700 dark:text-bamboo-400 bg-bamboo-500/10 px-2 py-0.5 rounded mb-2">
                          {item.type}
                        </span>
                        <p className="text-sm text-ink-soft dark:text-ink-faint leading-relaxed">
                          {item.desc}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-bamboo-700 dark:text-bamboo-400 hover:underline"
                          >
                            Visit org site
                            <ExternalLink size={12} aria-hidden />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
