"use client";

import { useState } from "react";
import { SKILL_GROUPS, INTERESTS } from "@/data/resume";

// Loop duration is set in globals.css (.marquee-track / marquee-scroll keyframes).

export default function SkillMarquee() {
  const skills = SKILL_GROUPS.flatMap((g) => g.items);
  const interests = [...INTERESTS];
  const items = [...skills, ...interests];
  const [paused, setPaused] = useState(false);
  // `running` freezes the CSS animation so hover-resume lands exactly where
  // the strip left off (a framer-motion tween can't pause mid-flight).
  const [running, setRunning] = useState(true);

  return (
    <div
      className="relative flex overflow-hidden bg-slate-900 dark:bg-black rounded-3xl border border-slate-800 py-6 select-none"
      aria-label="Skills and interests"
      onMouseEnter={() => {
        setPaused(true);
        setRunning(false);
      }}
      onMouseLeave={() => {
        setPaused(false);
        setRunning(true);
      }}
    >
      <div
        aria-hidden
        className="absolute left-0 w-24 h-full bg-gradient-to-r from-slate-900 dark:from-black to-transparent z-10"
      />
      <div
        aria-hidden
        className="absolute right-0 w-24 h-full bg-gradient-to-l from-slate-900 dark:from-black to-transparent z-10"
      />

      {paused ? (
        // Frozen layout: same items wrapped into rows, readable while paused.
        <div className="flex flex-wrap gap-x-8 gap-y-3 px-8 justify-center w-full">
          {items.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="font-mono text-sm md:text-base font-bold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      ) : (
        <div
          className="marquee-track flex gap-8 whitespace-nowrap px-4"
          style={{ animationPlayState: running ? "running" : "paused" }}
        >
          {[...items, ...items].map((skill, i) => (
            <span
              key={`${skill}-${i}`}
              className="font-mono text-sm md:text-base font-bold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
