"use client";

import ScrollReveal from "./ScrollReveal";

export default function SectionHeading({
  index,
  title,
  description,
}: {
  index?: string;
  title: string;
  description?: string;
}) {
  return (
    <ScrollReveal className="mb-12">
      {index && (
        <p className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 tracking-[0.2em] uppercase mb-3">
          {index}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 break-words">
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
