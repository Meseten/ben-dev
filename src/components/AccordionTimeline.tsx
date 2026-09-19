"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { EXPERIENCE } from "@/data/resume";

export default function AccordionTimeline() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      {/* Vertical rail */}
      <div
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/60 via-slate-200 dark:via-slate-800 to-transparent"
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
                    ? "bg-cyan-500 border-cyan-200 dark:border-cyan-900 shadow-[0_0_0_3px_rgba(6,182,212,0.15)]"
                    : "bg-slate-300 dark:bg-slate-600 border-slate-100 dark:border-slate-900"
                }`}
              />

              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`exp-panel-${i}`}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "bg-white dark:bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-500/5"
                    : "bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-cyan-500/30 hover:bg-white dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-slate-900 dark:text-white leading-snug">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 mt-0.5">
                      {item.org}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                      {item.date}
                    </span>
                    {item.current && (
                      <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        ACTIVE
                      </span>
                    )}
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-slate-400"
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`exp-panel-${i}`}
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-2 sm:hidden">
                          {item.date}
                          {item.current ? " | Active" : ""}
                        </p>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded mb-2">
                          {item.type}
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.desc}
                        </p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                          >
                            Visit org site
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
