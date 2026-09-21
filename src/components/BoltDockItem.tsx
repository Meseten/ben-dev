"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";
import { Tip } from "@/components/ui/tooltip";

/**
 * Dock item that opens a tiny lightning panel with the three fastest ways to
 * reach Ben. Pointer-following glow on the icon, reduced-motion aware.
 * Radix tooltip (same as every dock item) instead of a native title.
 */
export default function BoltDockItem({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();

  return (
    <Tip label="Fastest way to reach Ben, opens your email app" side="bottom">
      <motion.button
        onClick={onOpen}
        aria-label="Quick contact, email Ben now"
        whileHover={reduce ? undefined : { scale: 1.12, y: -4 }}
        whileTap={reduce ? undefined : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="relative w-11 h-11 rounded-2xl bg-ink dark:bg-ink-light text-benchmark-light dark:text-benchmark border border-ink dark:border-ink-light flex items-center justify-center shadow-md hover:shadow-benchmark/25 cursor-pointer"
      >
        <Zap size={18} className="relative z-10" />
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl bg-benchmark/20"
            animate={{ opacity: [0.15, 0.45, 0.15] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.button>
    </Tip>
  );
}
