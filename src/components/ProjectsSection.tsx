"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";
import { OPEN_SOURCE, PROJECTS } from "@/data/resume";
import type { FilterKey } from "@/data/types";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

const FILTERS: FilterKey[] = ["All", "Open Source", "AI/ML", "Web", "Systems"];

export default function ProjectsSection() {
  const [filter, setFilter] = useState<FilterKey>("All");
  const reduce = useReducedMotion();

  const visibleProjects = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24">
      <SectionHeading
        index="03 / Projects"
        title="Selected work"
        description="Nine builds across web platforms, Android, systems tools, and open-source packages. Every project has a full case study covering what it does, how it is built, and what it shipped."
      />

      {/* Filter pills */}
      <ScrollReveal className="mb-10">
        <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f;
            const count =
              f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.categories.includes(f)).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider border transition-colors ${
                  active
                    ? "text-paper-light dark:text-paper-dark border-ink dark:border-ink-light"
                    : "bg-white/70 dark:bg-ink-card/60 text-ink-soft dark:text-ink-faint border-ink/10 dark:border-ink-light/10 hover:border-bamboo-500/50 hover:text-bamboo-600 dark:hover:text-bamboo-400"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-ink dark:bg-ink-light"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {f}
                  <span className="ml-1.5 opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      <motion.div layout className="grid md:grid-cols-2 gap-6 auto-rows-fr">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={cn(p.featured ? "md:col-span-2" : "", "h-full")}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Open-source index */}
      <ScrollReveal className="mt-14">
        <SpotlightCard className="p-7 md:p-9">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Github size={20} className="text-bamboo-500" />
              <h3 className="font-display text-xl md:text-2xl font-bold text-ink dark:text-ink-light">
                Open source index
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {OPEN_SOURCE.map((o) => (
                <a
                  key={o.name}
                  href={o.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-ink/10 dark:border-ink-light/10 bg-white/60 dark:bg-ink-card/60 p-4 hover:border-bamboo-500/50 transition-colors"
                >
                  <p className="font-mono text-sm font-bold text-ink dark:text-ink-light group-hover:text-bamboo-600 dark:group-hover:text-bamboo-400 transition-colors">
                    {o.name}
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-ink-faint mt-0.5">
                    {o.kind}
                  </p>
                  <p className="text-xs text-ink-soft dark:text-ink-faint mt-2">{o.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </ScrollReveal>
    </section>
  );
}
