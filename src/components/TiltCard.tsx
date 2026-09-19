"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

export default function TiltCard({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const sx = useSpring(px, { stiffness: 120, damping: 18 });
  const sy = useSpring(py, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const glowX = useTransform(sx, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(sy, [0, 1], ["20%", "80%"]);
  const glow = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, rgba(6,182,212,0.14), transparent 70%)`;

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className="relative"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: glow }}
      />
      {children}
    </motion.div>
  );
}
