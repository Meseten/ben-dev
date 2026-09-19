import { GraduationCap, Heart, MapPin, ShieldCheck } from "lucide-react";
import AccordionTimeline from "@/components/AccordionTimeline";
import AmbienceToggle from "@/components/AmbienceToggle";
import ContactModalHost from "@/components/ContactModalHost";
import ContactSection from "@/components/ContactSection";
import GithubActivity from "@/components/GithubActivity";
import Hero from "@/components/Hero";
import KrnaShowcase from "@/components/KrnaShowcase";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeModalHost from "@/components/ResumeModalHost";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgress from "@/components/ScrollProgress";
import SectionHeading from "@/components/SectionHeading";
import SiteDock from "@/components/SiteDock";
import SkillMarquee from "@/components/SkillMarquee";
import SpotlightCard from "@/components/SpotlightCard";
import StatsStrip from "@/components/StatsStrip";
import { EDUCATION, SITE, SKILL_GROUPS } from "@/data/resume";
import { getGithubActivity, getKrnaStats } from "@/data/stats";

// Home page revalidates hourly. Live numbers stay fresh without paying the
// external-API latency on every visit.
export const revalidate = 3600;

export default async function Home() {
  const [krna, activity] = await Promise.all([getKrnaStats(), getGithubActivity()]);

  return (
    <main id="top" className="relative min-h-screen">
      <AmbienceToggle />
      <ContactModalHost>
        <ResumeModalHost>
          <ScrollProgress />
          <SiteDock />

        {/* ============================= HERO ============================= */}
        <Hero />

        {/* ============================= STATS ============================= */}
        <StatsStrip />

        {/* ============================= ABOUT ============================= */}
        <section id="about" className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24">
          <SectionHeading
            index="01 / About"
            title="Where code meets civic life"
            description="Software that serves people. Tools for communities, government offices, and the people who use them every day."
          />

          <div className="grid md:grid-cols-3 gap-6">
            <ScrollReveal className="md:col-span-2">
              <SpotlightCard className="h-full p-8 md:p-10">
                <div className="relative z-10">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-5">
                    Ben James Duag
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    A Computer Science undergraduate at{" "}
                    <strong className="text-slate-900 dark:text-white">
                      Cavite State University – Naic
                    </strong>{" "}
                    (expected Oct 2027), with a foundation in applications development, data
                    structures and algorithms, and advanced database systems.
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    Outside the classroom I&apos;m an advocate and volunteer with{" "}
                    <strong className="text-slate-900 dark:text-white">#MentalHealthPH</strong>,{" "}
                    <strong className="text-slate-900 dark:text-white">PAHRA</strong>,{" "}
                    <strong className="text-slate-900 dark:text-white">BetterGov.ph</strong>, and{" "}
                    <strong className="text-slate-900 dark:text-white">Pinas Forward</strong>, working
                    on transparency, human rights education, and digital youth engagement.
                    I also research optimization algorithms and open-source intelligence (OSINT).
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Systems & Applications", "AI Research", "Cybersecurity", "OSINT", "Civic Tech"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-600 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>

            <div className="grid gap-6 content-start">
              <ScrollReveal delay={0.1}>
                <div className="p-7 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-900/20">
                  <GraduationCap size={32} className="mb-4 opacity-80" />
                  <p className="text-cyan-100 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Education
                  </p>
                  <h4 className="font-display text-xl font-bold leading-tight">
                    {EDUCATION[0].degree}
                  </h4>
                  <p className="text-cyan-100 text-sm mt-1.5">{EDUCATION[0].school}</p>
                  <p className="text-cyan-200/70 text-xs mt-0.5 font-mono">{EDUCATION[0].date}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Cavite, PH</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">
                      Naic &amp; Maragondon, open to remote
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="p-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ShieldCheck size={18} className="text-cyan-500" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      TESDA Certified
                    </h4>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    2D Animation, Certificate of Competency 1. TVL-ICT-Animation strand graduate.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal className="mt-6" delay={0.1}>
            <SkillMarquee />
          </ScrollReveal>
        </section>

        {/* ============================= EXPERIENCE ============================= */}
        <section id="experience" className="relative py-24 px-4 max-w-5xl mx-auto scroll-mt-24">
          <SectionHeading
            index="02 / Experience"
            title="Work history"
            description="The offices, organizations, and advocacies I have worked with, and what I did in each."
          />
          <ScrollReveal>
            <AccordionTimeline />
          </ScrollReveal>
        </section>

        <div aria-hidden className="beam-divider max-w-5xl mx-auto" />

        {/* ============================= PROJECTS ============================= */}
        <ProjectsSection />

        {/* ============================= GITHUB ACTIVITY ============================= */}
        <section id="activity" className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24">
          <div aria-hidden className="absolute inset-0 bg-dots opacity-50 pointer-events-none" />
          <div className="relative">
            <SectionHeading
            index="04 / Activity"
              title="Commit history, all years"
              description={
                activity.live
                  ? "Every public contribution since the first commit, straight from GitHub."
                  : "Public contribution history from GitHub."
              }
            />
            <ScrollReveal>
              <SpotlightCard className="p-6 md:p-8">
                <div className="relative z-10">
                  <GithubActivity activity={activity} />
                  <p className="mt-4 font-mono text-[11px] text-slate-400">
                    source:{" "}
                    <a
                      href={SITE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-cyan-500 transition-colors"
                    >
                      github.com/Meseten
                    </a>
                  </p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </section>

        {/* ============================= KRNA ============================= */}
        <KrnaShowcase stats={krna} />

        {/* ============================= SKILLS DETAIL ============================= */}
        <section id="skills" className="relative py-24 px-4 max-w-7xl mx-auto scroll-mt-24">
          <div aria-hidden className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />
          <div className="relative">
            <SectionHeading
            index="05 / Toolkit"
              title="Skills, organized"
              description="What I use to build, from on-device machine learning to helpdesk operations."
            />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILL_GROUPS.map((group, gi) => (
                <ScrollReveal key={group.label} delay={gi * 0.07}>
                  <SpotlightCard className="h-full p-6">
                    <div className="relative z-10">
                      <h3 className="font-display font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                        {group.label}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SpotlightCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div aria-hidden className="beam-divider max-w-5xl mx-auto" />

        {/* ============================= CONTACT ============================= */}
        <ContactSection />

        {/* ============================= FOOTER ============================= */}
        <footer className="relative py-12 px-4 border-t border-slate-200 dark:border-slate-800">
          <div aria-hidden className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-slate-400 dark:text-slate-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} {SITE.name}{" | "}
              <a href={SITE.domain} className="hover:text-cyan-500 transition-colors">
                ben4dev.vercel.app
              </a>
            </p>
            <p className="flex items-center gap-1.5 font-mono text-xs text-slate-400 dark:text-slate-500">
              Built with <Heart size={12} className="text-cyan-500" aria-hidden /> using Next.js,
              Tailwind &amp; Framer Motion
            </p>
          </div>
        </footer>
        </ResumeModalHost>
      </ContactModalHost>
    </main>
  );
}
