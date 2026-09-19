"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileText, Mail } from "lucide-react";
import HeroTerminal from "@/components/HeroTerminal";
import { useResume } from "@/components/ResumeModalHost";
import TiltCard from "@/components/TiltCard";
import { SITE } from "@/data/resume";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

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
      {/* Ambient background: grid + aurora glows + moving beam */}
      <div aria-hidden className="absolute inset-0 bg-grid" />
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-cyan-500/15 dark:bg-cyan-500/10 blur-3xl animate-float-slow pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -right-32 w-[520px] h-[520px] rounded-full bg-bamboo-500/15 dark:bg-bamboo-500/10 blur-3xl animate-float pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute top-1/3 -right-20 w-[380px] h-[380px] rounded-full bg-fuchsia-500/8 dark:bg-fuchsia-500/[0.06] blur-3xl animate-float-slow pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-slate-950 to-transparent pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="order-2 lg:order-1 space-y-7">
          <motion.span
            variants={item}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-[0.15em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            {SITE.role}
          </motion.span>

          <motion.h1
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.08}
            className="font-display text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-slate-900 dark:text-white"
          >
            Building systems
            <br />
            that <span className="text-cyan-500">serve people</span>.
          </motion.h1>

          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.16}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
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
            <motion.button
              onClick={open}
              whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-slate-950 transition-colors shadow-lg shadow-slate-900/10 dark:shadow-black/30"
            >
              <FileText size={17} />
              View Résumé
            </motion.button>
            <motion.a
              href={`mailto:${SITE.email}`}
              whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <Mail size={17} />
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <TiltCard>
            <HeroTerminal />
          </TiltCard>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          Scroll to explore
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent"
        />
      </div>
    </section>
  );
}
