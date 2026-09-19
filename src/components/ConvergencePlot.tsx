"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

/**
 * Convergence plot built from the published 30-trial benchmark table in the
 * KRNA README (krna benchmark --trials 30, Rastrigin D=10, 50 agents, 500
 * iterations, seeds 1000-1029):
 *
 *   SKROA final best fitness: 14.196 ± 3.012
 *   PSO   final best fitness:  7.368 ± 2.966
 *   Wilcoxon rank-sum p = 5.97e-09, Cohen's r = 0.75
 *   Verdict: PSO significantly better at this iteration budget.
 *
 * The per-iteration traces are representative best-so-far curves drawn
 * through those exact published endpoints (global-best curves are monotone
 * non-increasing: long plateaus, then drops when the swarm finds a new best).
 * Bands show the published ±1 std dev at every iteration.
 */

type Knot = [iteration: number, fitness: number];

const SKROA_KNOTS: Knot[] = [
  [0, 33], [20, 29], [45, 27], [70, 25.5], [90, 25], [120, 23],
  [150, 22.5], [185, 21], [220, 20.3], [250, 19.5], [300, 19.2],
  [340, 17.8], [380, 17.5], [420, 16.2], [460, 15.8], [500, 14.196],
];

const PSO_KNOTS: Knot[] = [
  [0, 33], [10, 24], [20, 18], [35, 14], [50, 11.5], [70, 10],
  [90, 9], [120, 8.4], [150, 8.1], [180, 7.9], [220, 7.75],
  [260, 7.7], [300, 7.6], [350, 7.55], [400, 7.5], [450, 7.45], [500, 7.368],
];

const SKROA_MEAN = 14.196;
const SKROA_STD = 3.012;
const PSO_MEAN = 7.368;
const PSO_STD = 2.966;

const W = 600;
const H = 260;
const PAD_L = 42;
const PAD_R = 14;
const PAD_T = 14;
const PAD_B = 32;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;

// Log-scale y domain: PSO's lower band (7.368 - 2.966 ≈ 4.4) and SKROA's
// upper band (33 + 3 ≈ 36) both fit comfortably inside [3, 45].
const Y_MIN = 3;
const Y_MAX = 45;
const Y_TICKS = [5, 10, 20, 40];
const X_MAX = 500;
const X_TICKS = [0, 100, 200, 300, 400, 500];

const x = (t: number) => PAD_L + (t / X_MAX) * PLOT_W;
const y = (v: number) =>
  PAD_T + PLOT_H - ((Math.log10(v) - Math.log10(Y_MIN)) / (Math.log10(Y_MAX) - Math.log10(Y_MIN))) * PLOT_H;

function sampleTrace(knots: Knot[], step = 5): number[] {
  const out: number[] = [];
  for (let t = knots[0][0]; t <= knots[knots.length - 1][0]; t += step) {
    let j = 1;
    while (j < knots.length - 1 && knots[j][0] < t) j++;
    const [t0, v0] = knots[j - 1];
    const [t1, v1] = knots[j];
    const u = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
    out.push(v0 + (v1 - v0) * u);
  }
  return out;
}

const skroa = sampleTrace(SKROA_KNOTS);
const pso = sampleTrace(PSO_KNOTS);

/** Trials diverge as they run: spread grows from init variance to the published final std dev. */
function band(trace: number[], stdFinal: number): { upper: number[]; lower: number[] } {
  const start = trace[0];
  const end = trace[trace.length - 1];
  const spread = trace.map((v) => (stdFinal * (v - end)) / (start - end));
  return {
    upper: trace.map((v, i) => v + spread[i]),
    lower: trace.map((v, i) => v - spread[i]),
  };
}

const skroaBand = band(skroa, SKROA_STD);
const psoBand = band(pso, PSO_STD);

const toPath = (trace: number[]) =>
  trace.map((v, i) => `${i === 0 ? "M" : "L"}${x(i * 5).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

const skroaPath = toPath(skroa);
const psoPath = toPath(pso);

const bandPath = (b: { upper: number[]; lower: number[] }) =>
  `${b.upper.map((v, i) => `${i === 0 ? "M" : "L"}${x(i * 5).toFixed(1)},${y(v).toFixed(1)}`).join(" ")} ` +
  `${b.lower
    .map((v, i) => `L${x((b.lower.length - 1 - i) * 5).toFixed(1)},${y(b.lower[b.lower.length - 1 - i]).toFixed(1)}`)
    .join(" ")} Z`;

const STATS = [
  { label: "Wilcoxon p", value: "5.97e-09" },
  { label: "effect size r", value: "0.75" },
  { label: "trials", value: "30 × seeds 1000–1029" },
  { label: "verdict", value: "PSO significantly better (α=0.05)" },
] as const;

export default function ConvergencePlot() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Log-scale convergence plot on Rastrigin: SKROA ends at 14.2 plus or minus 3.0 and baseline PSO at 7.4 plus or minus 3.0 after 500 iterations; Wilcoxon test says PSO is significantly better at this budget"
      >
        <defs>
          <linearGradient id="krnaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#16A34A" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#16A34A" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="psoFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal log-scale gridlines */}
        {Y_TICKS.map((v) => (
          <g key={v}>
            <line x1={PAD_L} y1={y(v)} x2={W - PAD_R} y2={y(v)} stroke="rgba(148,163,184,0.25)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={PAD_L - 8} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontFamily="var(--font-mono)">
              {v}
            </text>
          </g>
        ))}
        <text
          x={PAD_L - 8}
          y={PAD_T + 8}
          textAnchor="end"
          fontSize="9"
          fill="#64748b"
          fontFamily="var(--font-mono)"
        >
          log
        </text>

        {/* X axis ticks */}
        {X_TICKS.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={PAD_T + PLOT_H} x2={x(t)} y2={PAD_T + PLOT_H + 4} stroke="rgba(148,163,184,0.5)" />
            <text
              x={x(t)}
              y={PAD_T + PLOT_H + 15}
              textAnchor="middle"
              fontSize="10"
              fill="#94a3b8"
              fontFamily="var(--font-mono)"
            >
              {t}
            </text>
          </g>
        ))}
        <text
          x={PAD_L + PLOT_W / 2}
          y={H - 2}
          textAnchor="middle"
          fontSize="9"
          fill="#64748b"
          fontFamily="var(--font-mono)"
        >
          iteration
        </text>

        {/* Curves + bands, drawn when scrolled into view */}
        {inView && (
          <>
            {!reduce && (
              <motion.path
                d={bandPath(psoBand)}
                fill="url(#psoFill)"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              />
            )}
            <motion.path
              d={psoPath}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="7 4"
              strokeLinecap="round"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 1.1 }}
            />
            {!reduce && (
              <motion.path
                d={bandPath(skroaBand)}
                fill="url(#krnaFill)"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1, delay: 1.7 }}
              />
            )}
            <motion.path
              d={skroaPath}
              fill="none"
              stroke="#16A34A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reduce ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0 : 1.8, ease: "easeInOut" }}
            />
            {/* Endpoints with published final values */}
            <motion.g
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 1.9 }}
            >
              <circle cx={x(500)} cy={y(PSO_MEAN)} r="4" fill="#F59E0B" />
              <circle cx={x(500)} cy={y(SKROA_MEAN)} r="4.5" fill="#16A34A" />
              <text
                x={x(500) - 10}
                y={y(PSO_MEAN) - 8}
                textAnchor="end"
                fontSize="10"
                fontWeight="bold"
                fill="#d97706"
                fontFamily="var(--font-mono)"
              >
                PSO 7.37 ± 2.97
              </text>
              <text
                x={x(500) - 10}
                y={y(SKROA_MEAN) + 16}
                textAnchor="end"
                fontSize="10"
                fontWeight="bold"
                fill="#16A34A"
                fontFamily="var(--font-mono)"
              >
                SKROA 14.20 ± 3.01
              </text>
            </motion.g>
          </>
        )}
      </svg>

      {/* Statistical test results, exactly as the benchmark suite reports them */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {STATS.map((s) => (
          <span
            key={s.label}
            className="inline-flex items-baseline gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 px-2 py-1"
          >
            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">{s.label}</span>
            <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-200">{s.value}</span>
          </span>
        ))}
      </div>

      <p className="mt-2 text-[11px] font-mono text-slate-400 leading-relaxed">
        Rastrigin, D=10, 50 agents, 500 iterations, identical budgets. Published 30-trial means
        from <span className="text-bamboo-600 dark:text-bamboo-400">krna benchmark --trials 30</span>;
        log scale; ±1 std dev bands. Per-iteration curves are representative traces through the
        published endpoints.
      </p>
    </div>
  );
}
