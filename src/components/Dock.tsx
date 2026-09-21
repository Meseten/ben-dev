"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Tip } from "@/components/ui/tooltip";

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

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-140, 0, 140], [40, 72, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 160, damping: 12 });

  // The dock hugs the top of the viewport, so its tooltips open below.
  // Tip carries its own Radix provider and works on hover and keyboard focus.
  const inner = (
    <Tip label={entry.tooltip ?? entry.label} side="bottom">
      <motion.div
        ref={ref}
        style={{ width }}
        className="relative aspect-square rounded-2xl bg-white dark:bg-ink-softdark border border-ink/10 dark:border-ink-light/20 flex items-center justify-center text-ink-soft dark:text-ink-faint hover:text-bamboo-600 dark:hover:text-bamboo-400 hover:border-bamboo-500/50 shadow-sm cursor-pointer transition-colors"
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
      </motion.div>
    </Tip>
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
        className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/75 dark:bg-ink-card/75 backdrop-blur-xl border border-ink/10/60 dark:border-ink-light/20/60 shadow-lg shadow-black/5 overflow-x-auto scrollbar-hide max-w-[calc(100vw-2rem)]"
      >
        <Tip label="Back to top" side="bottom">
          <Link
            href="#top"
            className="mr-2 font-display font-bold text-base md:text-lg tracking-tighter shrink-0 h-10 flex items-center"
            aria-label="Back to top"
          >
            ben<span className="text-bamboo-600 dark:text-bamboo-400">4</span>
            <span>dev</span>
          </Link>
        </Tip>
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
