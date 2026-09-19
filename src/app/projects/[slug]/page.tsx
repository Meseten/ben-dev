import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Layers,
  ListChecks,
  Lock,
  Mail,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SiteDock from "@/components/SiteDock";
import ScrollProgress from "@/components/ScrollProgress";
import { OPEN_SOURCE, PROJECTS, SITE } from "@/data/resume";

export function generateStaticParams() {
  return PROJECTS.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} case study`,
    description: project.desc,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} case study`,
      description: project.desc,
      url: `${SITE.domain}/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} case study`,
      description: project.desc,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project || !project.caseStudy) notFound();

  const idx = PROJECTS.indexOf(project);
  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];
  const cs = project.caseStudy;
  const locked = Boolean(project.locked);
  const openSourceIndex = OPEN_SOURCE.find((o) =>
    o.link === project.repo || o.link === project.link
  );

  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <SiteDock />

      {/* Ambient header background */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[420px] bg-node-path pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/[0.07] blur-3xl pointer-events-none"
      />

      <article className="relative max-w-4xl mx-auto px-4 pt-32 pb-24">
        <ScrollReveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            All projects
          </Link>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            {project.year && (
              <span className="font-mono text-xs font-bold text-slate-400">{project.year}</span>
            )}
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded-full"
              >
                {cat}
              </span>
            ))}
            {locked && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 rounded-full">
                <Lock size={10} />
                Client build
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-slate-900 dark:text-white mb-4 break-words">
            {project.title}
          </h1>
          <p className="text-base font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
            {project.role}
          </p>
          {project.subRoles.length > 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
              {project.subRoles.join(" | ")}
            </p>
          )}
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            {!locked && project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:bg-cyan-600 dark:hover:bg-cyan-400 hover:text-white dark:hover:text-slate-950 transition-colors"
              >
                Visit live site
                <ArrowUpRight size={16} />
              </a>
            )}
            {!locked && project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Github size={16} />
                Source
              </a>
            )}
            {locked && (
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${project.title} inquiry`)}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm transition-colors"
              >
                <Mail size={16} />
                Ask about this build
              </a>
            )}
          </div>
          {locked && (
            <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-12 -mt-6">
              <Lock size={12} />
              Built for a client. The source is not public, the full story is right here.
            </p>
          )}
        </ScrollReveal>

        {/* Tags */}
        <ScrollReveal delay={0.05} className="mb-14">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Overview */}
        <ScrollReveal className="mb-14">
          <section>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center">
                <Layers size={15} className="text-cyan-500" />
              </span>
              Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{cs.overview}</p>
          </section>
        </ScrollReveal>

        {/* Architecture */}
        <ScrollReveal className="mb-14">
          <section>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-bamboo-500/10 border border-bamboo-500/25 flex items-center justify-center">
                <Github size={15} className="text-bamboo-500" />
              </span>
              Architecture
            </h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{cs.architecture}</p>
          </section>
        </ScrollReveal>

        {/* Outcomes */}
        <ScrollReveal className="mb-16">
          <section>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                <ListChecks size={15} className="text-emerald-500" />
              </span>
              Outcomes
            </h2>
            <ul className="space-y-3">
              {cs.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-bamboo-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300 leading-relaxed">{o}</span>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        {/* Open-source pointer for OSS projects */}
        {openSourceIndex && (
          <ScrollReveal className="mb-16">
            <div className="rounded-2xl border border-bamboo-500/25 bg-bamboo-500/[0.04] p-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-bamboo-600 dark:text-bamboo-400 mb-1">
                Open source
              </p>
              <a
                href={openSourceIndex.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-slate-900 dark:text-white hover:text-bamboo-600 dark:hover:text-bamboo-400 transition-colors"
              >
                {openSourceIndex.name}
              </a>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {openSourceIndex.desc}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Prev / next */}
        <div className="grid sm:grid-cols-2 gap-4 border-t border-slate-200 dark:border-slate-800 pt-8">
          {prev?.caseStudy ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:border-cyan-500/50 transition-colors"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                Previous
              </p>
              <p className="font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next?.caseStudy && (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-right hover:border-cyan-500/50 transition-colors"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                Next
              </p>
              <p className="font-display font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </article>
    </main>
  );
}
