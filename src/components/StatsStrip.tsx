"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { STATS } from "@/data/resume";

function StatNumber({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1200;
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

  const display = reduce ? target : value;
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsStrip() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="Quick stats" className="relative py-14 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 text-center"
          >
            <p className="font-display text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              <StatNumber target={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
