"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";

/**
 * Dock item that opens a tiny lightning panel with the three fastest ways to
 * reach Ben. Pointer-following glow on the icon, reduced-motion aware.
 */
export default function BoltDockItem({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Quick contact, email Ben now"
      title="Fastest way to reach Ben, opens your email app"
      whileHover={reduce ? undefined : { scale: 1.12, y: -4 }}
      whileTap={reduce ? undefined : { scale: 0.95 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="relative w-11 h-11 rounded-2xl bg-slate-900 dark:bg-white text-amber-400 dark:text-amber-500 border border-slate-900 dark:border-white flex items-center justify-center shadow-md hover:shadow-amber-500/25 cursor-pointer"
    >
      <Zap size={18} className="relative z-10" />
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-amber-400/20"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
}
