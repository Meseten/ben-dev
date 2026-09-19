"use client";

import { ArrowUpRight, BookOpen, Github, Lock, Mail, Package } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useContact } from "./ContactModalHost";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE: Record<string, string> = {
  "Open Source": "border-bamboo-500/40 bg-bamboo-500/10 text-bamboo-600 dark:text-bamboo-400",
  Web: "border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "AI/ML": "border-violet-500/40 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Systems: "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLive = Boolean(project.link) && !project.locked;
  const { open } = useContact();

  return (
    <ScrollReveal
      delay={Math.min(index * 0.05, 0.4)}
      className={project.featured ? "md:col-span-2" : ""}
    >
      <SpotlightCard
        className={cn(
          "h-full transition-all duration-300",
          project.highlight &&
            "border-cyan-500/50 shadow-[0_0_0_1px_rgba(6,182,212,0.25),0_0_44px_-8px_rgba(6,182,212,0.4)] hover:shadow-[0_0_0_1px_rgba(6,182,212,0.4),0_0_60px_-6px_rgba(6,182,212,0.55)]"
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
                  <button
                    onClick={() => open(project.title)}
                    aria-label={`${project.title} is client work. Ask about it`}
                    title="Client build, ask about it"
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider hover:border-amber-500 hover:bg-amber-500/20 transition-colors cursor-pointer"
                  >
                    <Lock size={10} />
                    Client build
                  </button>
                )}
                {project.year && (
                  <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500">
                    {project.year}
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg md:text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mt-1">
                {project.role}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.caseStudy && (
                <Link
                  href={`/projects/${project.slug}`}
                  aria-label={`Read the ${project.title} case study`}
                  title={`Full story of ${project.title}, what it does and how it is built`}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 hover:bg-cyan-500 hover:text-white transition-colors"
                >
                  <BookOpen size={15} />
                  Case study
                </Link>
              )}
              {project.repo && !project.locked && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source on GitHub`}
                  title={`Open the ${project.title} source code on GitHub`}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 transition-colors"
                >
                  <Github size={17} />
                </a>
              )}
              {isLive && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title}`}
                  title={`Open the live ${project.title} site in a new tab`}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-cyan-500 hover:text-white transition-colors"
                >
                  <ArrowUpRight size={17} />
                </a>
              )}
              {project.locked && (
                <button
                  onClick={() => open(project.title)}
                  aria-label={`Ask about ${project.title}`}
                  title={`Email Ben about ${project.title}, the source stays with the client`}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  Ask about it
                </button>
              )}
            </div>
          </div>

          {project.subRoles.length > 0 && (
            <p className="text-xs italic text-slate-500 dark:text-slate-400 border-l-2 border-cyan-500/30 pl-3 mb-3">
              {project.subRoles.join(" | ")}
            </p>
          )}

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
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
