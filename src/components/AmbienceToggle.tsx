"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { useMounted } from "@/lib/useMounted";

/**
 * Toggles an extra layer of aurora washes, floating orbs, and drifting
 * particles across the whole page. Off by default so motion-sensitive
 * visitors get the calm layout, and so the signature look stays one click
 * away instead of forced.
 */
export default function AmbienceToggle() {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const [on, setOn] = useState(false);
  if (!mounted || reduce) return null;

  return (
    <>
      <AnimatePresence>
        {on && (
          <motion.div
            key="ambience"
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="pointer-events-none fixed inset-0 z-0"
          >
            {/* Large slow aurora washes */}
            <div className="absolute -top-32 -left-40 w-[42rem] h-[42rem] rounded-full bg-cyan-500/12 blur-3xl animate-float-slow" />
            <div
              className="absolute top-1/3 -right-48 w-[38rem] h-[38rem] rounded-full bg-fuchsia-500/10 blur-3xl animate-float"
              style={{ animationDelay: "-4s" }}
            />
            <div
              className="absolute bottom-[-12rem] left-1/4 w-[40rem] h-[40rem] rounded-full bg-bamboo-500/10 blur-3xl animate-float-slow"
              style={{ animationDelay: "-8s" }}
            />
            <div
              className="absolute top-[55%] left-[8%] w-[26rem] h-[26rem] rounded-full bg-indigo-500/10 blur-3xl animate-float"
              style={{ animationDelay: "-2s" }}
            />

            {/* Drifting light particles */}
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-cyan-400/25"
                style={{
                  width: 3 + (i % 3) * 2,
                  height: 3 + (i % 3) * 2,
                  left: `${(i * 67) % 100}%`,
                  top: `${(i * 37) % 100}%`,
                }}
                animate={{ y: [0, -26, 0], opacity: [0.2, 0.7, 0.2] }}
                transition={{
                  duration: 7 + (i % 5) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOn((v) => !v)}
        whileTap={reduce ? undefined : { scale: 0.92 }}
        aria-pressed={on}
        aria-label={on ? "Turn off background effects" : "Turn on background effects"}
        title={on ? "Hide the ambient glow" : "Add ambient glow to the page"}
        className="fixed bottom-5 right-5 z-50 p-3.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-900/85 backdrop-blur text-slate-500 dark:text-slate-300 hover:text-cyan-500 hover:border-cyan-500/50 shadow-lg transition-colors"
      >
        <Sparkles size={18} className={on ? "text-cyan-500" : undefined} />
        {on && (
          <motion.span
            aria-hidden
            layoutId="ambience-glow"
            className="absolute inset-0 rounded-full ring-2 ring-cyan-500/40"
          />
        )}
      </motion.button>
    </>
  );
}
