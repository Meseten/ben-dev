"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import HeroTerminal from "@/components/HeroTerminal";
import { useResume } from "@/components/ResumeModalHost";
import TiltCard from "@/components/TiltCard";
import { Tip } from "@/components/ui/tooltip";
import { SITE } from "@/data/resume";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * GitHub layout, bamboo skin: two-column hero, text left + terminal right,
 * role badge, scroll cue, staggered entrance. The CTA buttons are wrapped in
 * tooltips (Tip) without moving anything.
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const { open } = useResume();

  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 26 },
    show: (d: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: d, ease: EASE },
    }),
  };

  return (
    <section className="relative min-h-svh flex items-center pt-24 pb-14 px-4 overflow-hidden">
      {/* Ambient background: aurora washes in the site palette (no grid: the
          bamboo world uses washes, not blueprint lines) */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-bamboo-500/15 dark:bg-bamboo-500/10 blur-3xl animate-float-slow pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -right-32 w-[520px] h-[520px] rounded-full bg-bamboo-600/10 dark:bg-bamboo-400/10 blur-3xl animate-float pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-20 w-[380px] h-[380px] rounded-full bg-benchmark/10 dark:bg-benchmark/[0.06] blur-3xl animate-float-slow pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper-light dark:from-paper-dark to-transparent pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="order-2 lg:order-1 space-y-7">
          <motion.span
            variants={item}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-bamboo-500/10 border border-bamboo-500/20 text-bamboo-700 dark:text-bamboo-400 text-xs font-bold uppercase tracking-[0.15em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bamboo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bamboo-500" />
            </span>
            {SITE.role}
          </motion.span>

          <motion.h1
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.08}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-ink dark:text-ink-light"
          >
            Building systems
            <br />
            that <span className="text-bamboo-600 dark:text-bamboo-400">serve people</span>.
          </motion.h1>

          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.16}
            className="text-lg md:text-xl text-ink-soft dark:text-ink-faint leading-relaxed max-w-xl"
          >
            I&apos;m {SITE.name}, a Computer Science student in {SITE.location} building real
            systems for real users. A PyPI optimization package, an on-device AI gallery for
            Android, water-utility platforms, and government tools used in actual offices.
          </motion.p>

          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.24}
            className="flex flex-wrap gap-3"
          >
            <Tip label="Opens the full résumé, printable to PDF">
              <motion.button
                onClick={open}
                whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-ink dark:bg-ink-light text-paper-light dark:text-paper-dark font-bold text-sm hover:bg-bamboo-600 dark:hover:bg-bamboo-400 dark:hover:text-ink transition-colors shadow-lg shadow-ink/10 dark:shadow-black/30"
              >
                <FileText size={17} aria-hidden />
                View Résumé
              </motion.button>
            </Tip>
            <Tip label="Opens your email app, every message gets a reply">
              <motion.a
                href={`mailto:${SITE.email}`}
                whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-ink/20 dark:border-ink-light/20 text-ink dark:text-ink-light font-bold text-sm hover:border-bamboo-600 hover:text-bamboo-600 dark:hover:text-bamboo-400 dark:hover:border-bamboo-400 transition-colors"
              >
                <Mail size={17} aria-hidden />
                Get in Touch
              </motion.a>
            </Tip>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <TiltCard>
            <HeroTerminal />
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
