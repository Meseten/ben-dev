"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Copy, Github, Sprout, Package } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { KrnaStats } from "@/data/stats";
import ConvergencePlot from "./ConvergencePlot";

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduce]);

  return <span ref={ref}>{reduce ? target : value}</span>;
}

const OPERATORS = [
  {
    title: "Biphasic Search",
    desc: "Lévy-flight rhizome exploration alternates with vertical-shoot gradient exploitation.",
  },
  {
    title: "Sympodial Clamping",
    desc: "Crowded agents repel each other, delaying premature convergence.",
  },
  {
    title: "Culm-Abortion",
    desc: "Stalled exploiters are pruned and respawned near the current best.",
  },
  {
    title: "MO-SKROA",
    desc: "Multi-objective variant with a non-dominated archive for Pareto fronts.",
  },
] as const;

// Real counts from the published package: 3 search operators power SKROA
// (biphasic search, sympodial clamping, culm abortion) plus the multi-objective
// variant MO-SKROA = 2 algorithms. Keep in sync with the KRNA README.
const PACKAGE_NUMBERS = {
  operators: 3,
  algorithms: 2,
  benchmarkTrials: 30,
} as const;

export default function KrnaShowcase({ stats }: { stats: KrnaStats }) {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const downloadLabel =
    stats.downloads !== null
      ? `${stats.downloads.toLocaleString()} / mo`
      : stats.totalDownloads !== null
        ? `${stats.totalDownloads.toLocaleString()} total`
        : null;

  const downloadBlock = downloadLabel ? (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">
        downloads
      </p>
      <p className="font-mono text-sm font-bold text-bamboo-600 dark:text-bamboo-400">
        {downloadLabel}
      </p>
    </div>
  ) : (
    // No fabricated numbers: if both live sources are down, link out instead.
    <a
      href="https://pypistats.org/packages/krna"
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">
        downloads
      </p>
      <p className="font-mono text-sm font-bold text-bamboo-600 dark:text-bamboo-400 group-hover:underline">
        live on PyPI →
      </p>
    </a>
  );

  const copyPip = async () => {
    try {
      await navigator.clipboard.writeText("pip install krna");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; fall through silently.
    }
  };

  return (
    <section id="krna" className="relative py-28 px-4 scroll-mt-24 overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0 bg-node-path" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-bamboo-500/10 dark:bg-bamboo-500/[0.07] blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: pitch */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-bamboo-500/10 border border-bamboo-500/30 px-4 py-1.5 mb-6">
              <Sprout size={14} className="text-bamboo-500" />
              <span className="text-xs font-mono font-bold tracking-wider text-bamboo-600 dark:text-bamboo-400 uppercase">
                Open Source, live on PyPI
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
              krna
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              <strong className="text-slate-900 dark:text-white">SKROA</strong>, the Sympodial
              Kawayan Rhizome Optimization Algorithm. A gradient-free, swarm-style optimization
              framework inspired by how running bamboo spreads, installable with one command.
            </p>

            {/* pip install */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 pl-4 pr-2 py-2.5 mb-8 shadow-lg max-w-sm">
              <span className="text-bamboo-400 font-mono text-sm select-none">$</span>
              <code className="font-mono text-sm text-slate-200 flex-1">pip install krna</code>
              <button
                onClick={copyPip}
                aria-label="Copy pip install command"
                className="p-2 rounded-lg text-slate-500 hover:text-bamboo-400 hover:bg-slate-900 transition-colors"
              >
                {copied ? <Check size={16} className="text-bamboo-400" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Operators */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {OPERATORS.map((op) => (
                <div
                  key={op.title}
                  className="rounded-xl border border-bamboo-500/20 bg-bamboo-500/[0.04] p-4"
                >
                  <h4 className="font-mono text-xs font-bold text-bamboo-600 dark:text-bamboo-400 mb-1">
                    {op.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{op.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://pypi.org/project/krna/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-bamboo-600 hover:bg-bamboo-500 text-white font-bold text-sm transition-colors shadow-lg shadow-bamboo-600/25"
              >
                <Package size={17} />
                View on PyPI
              </a>
              <a
                href="https://github.com/Meseten/KRNA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-bamboo-500 hover:text-bamboo-600 dark:hover:text-bamboo-400 transition-colors"
              >
                <Github size={17} />
                Source
              </a>
            </div>
          </motion.div>

          {/* Right: package card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 32, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-6 md:p-8 shadow-2xl shadow-bamboo-900/10">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">
                    pypi.org/project/krna
                    {stats.live && (
                      <span className="ml-2 inline-flex items-center gap-1 text-bamboo-600 dark:text-bamboo-400">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bamboo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-bamboo-500" />
                        </span>
                        live
                      </span>
                    )}
                  </p>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    krna <span className="text-bamboo-500">v{stats.version}</span>
                  </h3>
                </div>
                <div className="relative flex items-center justify-center">
                  <span aria-hidden className="pulse-ring absolute inset-0 rounded-full" />
                  <span className="w-11 h-11 rounded-full bg-bamboo-500/15 border border-bamboo-500/30 flex items-center justify-center">
                    <Sprout size={20} className="text-bamboo-500" />
                  </span>
                </div>
              </div>

              <ConvergencePlot />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                {downloadBlock}
                {[
                  { label: "license", value: "MIT" },
                  { label: "python", value: stats.requiresPython },
                  { label: "dependencies", value: "NumPy" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-0.5">
                      {s.label}
                    </p>
                    <p className="font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { value: PACKAGE_NUMBERS.benchmarkTrials, suffix: "", label: "benchmark trials" },
                  { value: PACKAGE_NUMBERS.operators, suffix: "", label: "search operators" },
                  { value: PACKAGE_NUMBERS.algorithms, suffix: "", label: "algorithms" },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 p-3 text-center">
                    <p className="font-display text-2xl font-bold text-bamboo-600 dark:text-bamboo-400">
                      <CountUp target={s.value} />
                      {s.suffix}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
