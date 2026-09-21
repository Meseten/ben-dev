"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";
import { useState } from "react";
import { useMounted } from "@/lib/useMounted";
import { Tip } from "@/components/ui/tooltip";

/**
 * Opt-in ambience with three visible layers: glowing spores drifting up,
 * fireflies tracing slow loops, and bamboo leaves falling through. A faint
 * page tint ties them together. Off by default (motion-sensitive visitors get
 * the calm layout), remembered across visits, and everything is transform and
 * opacity only.
 */
export default function AmbienceToggle() {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  // Remember the visitor's choice between visits. The lazy initializer only
  // affects the post-mount render (the component renders null until mounted),
  // so there is no hydration mismatch and no state write inside an effect.
  const [on, setOn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem("ben4dev-ambience") === "on";
    } catch {
      // Storage unavailable (private mode), stay off.
      return false;
    }
  });

  const toggle = () => {
    setOn((v) => {
      try {
        window.localStorage.setItem("ben4dev-ambience", v ? "off" : "on");
      } catch {
        // Storage unavailable, state still flips for this visit.
      }
      return !v;
    });
  };

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
            {/* Page tint: a faint warm shift so the whole ground changes */}
            <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_115%,rgba(90,166,73,0.12),transparent_70%)]" />

            {/* Two slow accent washes, dose-capped */}
            <div className="absolute -top-32 -left-40 w-[42rem] h-[42rem] rounded-full bg-bamboo-500/10 blur-3xl animate-float-slow" />
            <div
              className="absolute bottom-[-12rem] right-[-8rem] w-[38rem] h-[38rem] rounded-full bg-bamboo-400/[0.07] blur-3xl animate-float"
              style={{ animationDelay: "-6s" }}
            />

            {/* Glowing spores drifting upward */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.span
                key={`spore-${i}`}
                className="absolute rounded-full bg-bamboo-400/40"
                style={{
                  width: 3 + (i % 3) * 2,
                  height: 3 + (i % 3) * 2,
                  left: `${(i * 53) % 100}%`,
                  top: `${(i * 41) % 100}%`,
                  boxShadow: "0 0 6px 1px rgba(123,201,106,0.35)",
                }}
                animate={{ y: [0, -34 - (i % 4) * 10, 0], opacity: [0.15, 0.75, 0.15] }}
                transition={{
                  duration: 7 + (i % 5) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.45,
                }}
              />
            ))}

            {/* Fireflies: larger glows tracing looping paths */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.span
                key={`fly-${i}`}
                className="absolute w-2 h-2 rounded-full bg-bamboo-300/70 blur-[1px]"
                style={{
                  left: `${12 + i * 15}%`,
                  top: `${30 + (i % 3) * 18}%`,
                  boxShadow: "0 0 12px 3px rgba(168,209,128,0.45)",
                }}
                animate={{
                  x: [0, 60 + i * 12, -40, 0],
                  y: [0, -50, 30, 0],
                  opacity: [0.2, 0.9, 0.4, 0.2],
                }}
                transition={{
                  duration: 16 + i * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.3,
                }}
              />
            ))}

            {/* Bamboo leaves falling through, the rhizome's canopy */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.span
                key={`leaf-${i}`}
                className="absolute text-bamboo-500/30 dark:text-bamboo-400/25"
                style={{ left: `${18 + i * 17}%`, top: "-4%" }}
                animate={{
                  y: ["-5vh", "108vh"],
                  x: [0, 40 + i * 14, -30, 0],
                  rotate: [0, 160 + i * 40, 320],
                }}
                transition={{
                  duration: 22 + i * 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 4.5,
                }}
              >
                <Leaf size={16 + (i % 3) * 6} aria-hidden />
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Tip label={on ? "Calm the background, spores off" : "Add drifting spores and fireflies"} side="left">
        <motion.button
          onClick={toggle}
          whileTap={reduce ? undefined : { scale: 0.92 }}
          aria-pressed={on}
          aria-label={on ? "Turn off background effects" : "Turn on background effects"}
          className="fixed bottom-5 right-5 z-50 p-3.5 rounded-full border border-ink/15 dark:border-ink-light/15 bg-paper-light/85 dark:bg-ink-carddark/85 backdrop-blur text-ink-soft dark:text-ink-faint hover:text-bamboo-600 dark:hover:text-bamboo-400 hover:border-bamboo-500/50 shadow-lg transition-colors"
        >
          <Sparkles size={18} className={on ? "text-bamboo-600 dark:text-bamboo-400" : undefined} aria-hidden />
          {on && (
            <motion.span
              aria-hidden
              layoutId="ambience-glow"
              className="absolute inset-0 rounded-full ring-2 ring-bamboo-500/40"
            />
          )}
        </motion.button>
      </Tip>
    </>
  );
}
