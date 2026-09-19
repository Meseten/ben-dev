"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export type DockEntry = {
  label: string;
  tooltip?: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  external?: boolean;
};

function DockButton({
  entry,
  mouseX,
}: {
  entry: DockEntry;
  mouseX: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [40, 72, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 12 });

  const inner = (
    <motion.div
      ref={ref}
      style={{ width }}
      className="relative aspect-square rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 shadow-sm cursor-pointer transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={entry.onClick}
      role={entry.onClick ? "button" : undefined}
      tabIndex={entry.onClick ? 0 : undefined}
      onKeyDown={
        entry.onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") entry.onClick?.();
            }
          : undefined
      }
      aria-label={entry.label}
    >
      {entry.icon}
      {hovered && (
        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-white shadow-lg z-50">
          {entry.tooltip ?? entry.label}
        </span>
      )}
    </motion.div>
  );

  if (entry.href) {
    return (
      <Link
        href={entry.href}
        target={entry.external ? "_blank" : undefined}
        rel={entry.external ? "noopener noreferrer" : undefined}
        aria-label={entry.label}
      >
        {inner}
      </Link>
    );
  }
  return inner;
}

export default function Dock({
  items,
  leading,
}: {
  items: DockEntry[];
  leading?: React.ReactNode;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/60 shadow-lg shadow-black/5 overflow-x-auto scrollbar-hide max-w-[calc(100vw-2rem)]"
      >
        <Link
          href="#top"
          className="mr-2 font-display font-bold text-base md:text-lg tracking-tighter shrink-0 h-10 flex items-center"
          aria-label="Back to top"
          title="Back to top"
        >
          ben<span className="text-fuchsia-500">4</span>
          <span className="text-cyan-500">dev</span>
        </Link>
        {leading && <div className="mr-1 flex items-center">{leading}</div>}
        <div className="flex items-end gap-2 h-14 pb-1">
          {items.map((item) => (
            <DockButton key={item.label} entry={item} mouseX={mouseX} />
          ))}
        </div>
      </nav>
    </div>
  );
}
