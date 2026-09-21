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
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";
import SiteDock from "@/components/SiteDock";
import type { CSSProperties } from "react";
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

      {/* Ambient header background: the motif's home turf, same as krna */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[420px] bg-node-path pointer-events-none" />
      <div
        aria-hidden
        className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full bg-bamboo-500/10 dark:bg-bamboo-500/[0.07] blur-3xl pointer-events-none"
      />

      <article className="relative max-w-4xl mx-auto px-4 pt-32 pb-24">
        <ScrollReveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink-soft dark:text-ink-faint hover:text-bamboo-600 dark:hover:text-bamboo-400 transition-colors mb-10"
          >
            <ArrowLeft size={14} aria-hidden />
            All projects
          </Link>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            {project.year && (
              <span className="font-mono text-xs font-bold text-ink-faint">{project.year}</span>
            )}
            {project.categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-mono font-bold uppercase tracking-wider text-bamboo-700 dark:text-bamboo-400 bg-bamboo-500/10 border border-bamboo-500/25 px-2 py-0.5 rounded-full"
              >
                {cat}
              </span>
            ))}
            {locked && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-benchmark bg-benchmark/10 border border-benchmark/25 px-2 py-0.5 rounded-full">
                <Lock size={10} aria-hidden />
                Client build
              </span>
            )}
          </div>

          <h1
            className="vt-project-title font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-ink dark:text-ink-light mb-4 break-words"
            style={{ "--vt-name": `vt-t-${project.slug}` } as CSSProperties}
          >
            {project.title}
          </h1>
          <p className="text-base font-mono font-bold text-bamboo-600 dark:text-bamboo-400 uppercase tracking-wider mb-2">
            {project.role}
          </p>
          {project.subRoles.length > 0 && (
            <p className="text-sm text-ink-soft dark:text-ink-faint mb-8">
              {project.subRoles.join(" | ")}
            </p>
          )}
          <p className="text-lg text-ink-soft dark:text-ink-faint leading-relaxed mb-8 max-w-3xl">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            {!locked && project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-ink dark:bg-ink-light text-paper-light dark:text-paper-dark font-bold text-sm hover:bg-bamboo-600 dark:hover:bg-bamboo-400 dark:hover:text-paper-dark transition-colors"
              >
                Visit live site
                <ArrowUpRight size={16} aria-hidden />
              </a>
            )}
            {!locked && project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-ink/20 dark:border-ink-light/20 text-ink dark:text-ink-light font-bold text-sm hover:border-bamboo-600 hover:text-bamboo-600 dark:hover:text-bamboo-400 dark:hover:border-bamboo-400 transition-colors"
              >
                <Github size={16} aria-hidden />
                Source
              </a>
            )}
            {locked && (
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${project.title} inquiry`)}`}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-benchmark-deep hover:bg-benchmark text-white font-bold text-sm transition-colors"
              >
                <Mail size={16} aria-hidden />
                Ask about this build
              </a>
            )}
          </div>
          {locked && (
            <p className="flex items-center gap-2 text-xs text-ink-soft dark:text-ink-faint mb-12 -mt-6">
              <Lock size={12} aria-hidden />
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
                className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-bamboo-50 dark:bg-ink-softdark text-ink-soft dark:text-ink-faint border border-bamboo-100 dark:border-bamboo-900"
              >
                {tag}
              </span>
            ))}
          </div>
        </ScrollReveal>

        {/* Overview */}
        <ScrollReveal className="mb-14">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink dark:text-ink-light mb-4 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-bamboo-500/10 border border-bamboo-500/25 flex items-center justify-center">
                <Layers size={15} className="text-bamboo-600 dark:text-bamboo-400" aria-hidden />
              </span>
              Overview
            </h2>
            <p className="text-ink-soft dark:text-ink-faint leading-relaxed">{cs.overview}</p>
          </section>
        </ScrollReveal>

        {/* Architecture */}
        <ScrollReveal className="mb-14">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink dark:text-ink-light mb-4 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-bamboo-500/10 border border-bamboo-500/25 flex items-center justify-center">
                <Github size={15} className="text-bamboo-600 dark:text-bamboo-400" aria-hidden />
              </span>
              Architecture
            </h2>
            <p className="text-ink-soft dark:text-ink-faint leading-relaxed">{cs.architecture}</p>
          </section>
        </ScrollReveal>

        {/* Outcomes */}
        <ScrollReveal className="mb-16">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink dark:text-ink-light mb-5 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-bamboo-500/10 border border-bamboo-500/25 flex items-center justify-center">
                <ListChecks size={15} className="text-bamboo-600 dark:text-bamboo-400" aria-hidden />
              </span>
              Outcomes
            </h2>
            <ul className="space-y-3">
              {cs.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="text-bamboo-600 dark:text-bamboo-400 mt-0.5 shrink-0" aria-hidden />
                  <span className="text-ink-soft dark:text-ink-faint leading-relaxed">{o}</span>
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
                className="font-display font-bold text-ink dark:text-ink-light hover:text-bamboo-600 dark:hover:text-bamboo-400 transition-colors"
              >
                {openSourceIndex.name}
              </a>
              <p className="text-sm text-ink-soft dark:text-ink-faint mt-1">
                {openSourceIndex.desc}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Prev / next */}
        <div className="grid sm:grid-cols-2 gap-4 border-t border-ink/10 dark:border-ink-light/10 pt-8">
          {prev?.caseStudy ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group rounded-2xl border border-ink/10 dark:border-ink-light/10 p-5 hover:border-bamboo-500/50 transition-colors"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint mb-1">
                Previous
              </p>
              <p className="font-display font-bold text-ink dark:text-ink-light group-hover:text-bamboo-600 dark:group-hover:text-bamboo-400 transition-colors">
                {prev.title}
              </p>
            </Link>
          ) : (
            <span />
          )}
          {next?.caseStudy && (
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-2xl border border-ink/10 dark:border-ink-light/10 p-5 text-right hover:border-bamboo-500/50 transition-colors"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint mb-1">
                Next
              </p>
              <p className="font-display font-bold text-ink dark:text-ink-light group-hover:text-bamboo-600 dark:group-hover:text-bamboo-400 transition-colors">
                {next.title}
              </p>
            </Link>
          )}
        </div>
      </article>
    </main>
  );
}
