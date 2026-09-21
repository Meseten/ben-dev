"use client";

import ScrollReveal from "./ScrollReveal";

/**
 * GitHub layout: optional mono index line (e.g. "01 / About") above a
 * left-aligned display heading, then the description. Bamboo accent on the
 * index, ink palette on the text.
 */
export default function SectionHeading({
  index,
  note,
  title,
  description,
}: {
  index?: string;
  note?: string;
  title: string;
  description?: string;
}) {
  const kicker = index ?? note;
  return (
    <ScrollReveal className="mb-12">
      {kicker && (
        <p className="font-mono text-xs font-bold text-bamboo-600 dark:text-bamboo-400 tracking-[0.2em] uppercase mb-3">
          {kicker}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink dark:text-ink-light mb-4 break-words">
        {title}
      </h2>
      {description && (
        <p className="text-ink-soft dark:text-ink-faint max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
