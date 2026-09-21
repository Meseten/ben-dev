"use client";

import { ArrowUpRight, BookOpen, Github, Lock, Mail, Package } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useContact } from "./ContactModalHost";
import { Tip } from "@/components/ui/tooltip";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE: Record<string, string> = {
  "Open Source": "border-bamboo-500/40 bg-bamboo-500/10 text-bamboo-600 dark:text-bamboo-400",
  Web: "border-bamboo-500/40 bg-bamboo-500/10 text-bamboo-600 dark:text-bamboo-400",
  "AI/ML": "border-benchmark/40 bg-benchmark/10 text-benchmark-deep dark:text-benchmark-light",
  Systems: "border-benchmark/40 bg-benchmark/10 text-benchmark-deep dark:text-benchmark-light",
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLive = Boolean(project.link) && !project.locked;
  const { open } = useContact();

  return (
    <ScrollReveal
      delay={Math.min(index * 0.05, 0.4)}
      className={cn(project.featured ? "md:col-span-2" : "", "h-full")}
    >
      <SpotlightCard
        className={cn(
          "h-full transition-all duration-300",
          project.highlight &&
            "border-bamboo-500/50 shadow-[0_0_0_1px_rgba(90,166,73,0.25),0_0_44px_-8px_rgba(90,166,73,0.4)] hover:shadow-[0_0_0_1px_rgba(90,166,73,0.4),0_0_60px_-6px_rgba(90,166,73,0.55)]"
        )}
      >
        <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
          <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {project.categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="outline"
                    className={cn(
                      "text-[10px] font-mono font-bold uppercase tracking-wider rounded-full",
                      CATEGORY_STYLE[cat]
                    )}
                  >
                    {cat}
                  </Badge>
                ))}
                {project.package && (
                  <Badge className="text-[10px] font-mono font-bold uppercase tracking-wider rounded-full bg-bamboo-600 hover:bg-bamboo-600 text-white border-transparent">
                    <Package size={10} />
                    pypi
                  </Badge>
                )}
                {project.locked && (
                  <Tip label="Client build. The source stays with the client, ask Ben about it">
                    <button
                      onClick={() => open(project.title)}
                      aria-label={`${project.title} is client work. Ask about it`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-benchmark/40 bg-benchmark/10 text-benchmark-deep dark:text-benchmark-light px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider hover:border-benchmark hover:bg-benchmark/20 transition-colors cursor-pointer"
                    >
                      <Lock size={10} />
                      Client build
                    </button>
                  </Tip>
                )}
                {project.year && (
                  <span className="font-mono text-[10px] font-bold text-ink-faint">
                    {project.year}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-ink dark:text-ink-light group-hover:text-bamboo-600 dark:group-hover:text-bamboo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-[11px] font-mono font-bold text-bamboo-600 dark:text-bamboo-400 uppercase tracking-wider mt-1">
                {project.role}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.caseStudy && (
                <Tip label={`Full story of ${project.title}, what it does and how it is built`}>
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`Read the ${project.title} case study`}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-bamboo-50 dark:bg-ink-softdark text-xs font-mono font-bold text-ink-soft dark:text-ink-faint hover:bg-bamboo-500 hover:text-white transition-colors"
                  >
                    <BookOpen size={15} />
                    Case study
                  </Link>
                </Tip>
              )}
              {project.repo && !project.locked && (
                <Tip label={`Open the ${project.title} source code on GitHub`}>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source on GitHub`}
                    className="p-2.5 rounded-xl bg-bamboo-50 dark:bg-ink-softdark text-ink-faint hover:bg-ink hover:text-paper-light dark:hover:bg-ink-light dark:hover:text-ink transition-colors"
                  >
                    <Github size={17} />
                  </a>
                </Tip>
              )}
              {isLive && (
                <Tip label={`Open the live ${project.title} site in a new tab`}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title}`}
                    className="p-2.5 rounded-xl bg-bamboo-50 dark:bg-ink-softdark text-ink-faint hover:bg-bamboo-500 hover:text-white transition-colors"
                  >
                    <ArrowUpRight size={17} />
                  </a>
                </Tip>
              )}
              {project.locked && (
                <Tip label={`Email Ben about ${project.title}, the source stays with the client`}>
                  <button
                    onClick={() => open(project.title)}
                    aria-label={`Ask about ${project.title}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-benchmark/10 border border-benchmark/30 text-xs font-mono font-bold text-benchmark-deep dark:text-benchmark-light hover:bg-benchmark hover:text-white transition-colors"
                  >
                    <Mail size={14} />
                    Ask about it
                  </button>
                </Tip>
              )}
            </div>
          </div>

          {project.subRoles.length > 0 && (
            <p className="text-xs italic text-ink-soft dark:text-ink-faint border-l-2 border-bamboo-500/30 pl-3 mb-3">
              {project.subRoles.join(" | ")}
            </p>
          )}

          <p className="text-sm text-ink-soft dark:text-ink-faint leading-relaxed flex-grow">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-auto pt-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-bamboo-50 dark:bg-ink-softdark text-ink-soft dark:text-ink-faint border border-ink/10 dark:border-ink-light/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  );
}
