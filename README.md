# ben4dev.vercel.app | Portfolio

Personal portfolio of Ben James Duag, systems & applications developer based in Cavite, Philippines. Terminal-aesthetic hero, macOS-style dock navigation, animated project filters, a dedicated showcase for the [krna](https://pypi.org/project/krna/) PyPI package, and content sourced from a single data file.

## Stack

- **Framework.** Next.js 16 (App Router, Turbopack, RSC)
- **Language.** TypeScript
- **Styling.** Tailwind CSS v3 + shadcn/ui (Badge, Button, Tooltip)
- **Animation.** Framer Motion (reduced-motion aware)
- **Icons.** Lucide React
- **Theming.** next-themes (system / dark / light)
- **Fonts.** Unbounded (display), Manrope (body), JetBrains Mono (code)
- **Live data.** PyPI + pypistats APIs, GitHub GraphQL / contributions API (hourly revalidate)

## Structure

```
src/
├── app/
│   ├── layout.tsx        # Fonts, SEO metadata, JSON-LD, skip link, theme provider
│   ├── page.tsx          # Page composition (hero, stats, about, experience, projects, krna, skills, contact)
│   ├── globals.css       # Tailwind + ambient backgrounds + focus styles + print stylesheet
│   ├── robots.ts         # Crawler rules
│   └── sitemap.ts        # Sitemap
├── components/
│   ├── Dock.tsx              # macOS-style dock with magnification + tooltips
│   ├── HeroTerminal.tsx      # Typewriter kernel-boot terminal
│   ├── StatsStrip.tsx        # Count-up quick stats
│   ├── AccordionTimeline.tsx # Expandable experience timeline (newest first)
│   ├── ProjectCard.tsx       # Spotlight-hover project cards with repo/live links
│   ├── KrnaShowcase.tsx      # PyPI package showcase (pip install, operators, stats)
│   ├── ConvergencePlot.tsx   # Self-drawing SVG convergence chart with PSO baseline
│   ├── SpotlightCard.tsx     # Pointer-tracking spotlight wrapper
│   ├── SkillMarquee.tsx      # Infinite skill ticker
│   ├── ResumeModal.tsx       # Printable résumé modal (ESC / backdrop close)
│   ├── ScrollReveal.tsx      # Scroll-triggered reveal wrapper
│   ├── SectionHeading.tsx    # Numbered section headings
│   └── theme-provider.tsx    # next-themes wrapper
└── data/
    ├── resume.ts         # All content lives here (edit this to update the site)
    └── types.ts          # Shared types
```

## Editing content

Experience, projects, skills, open-source links, certifications, education, stats, and social links are all defined in `src/data/resume.ts`. Components render from that single source of truth.

## Development

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run lint       # eslint
```

Requires Node.js 20.9 or newer.

## Features

- **krna showcase.** Live PyPI package section with copy-to-clipboard install command, operator cards, real download counts, and an animated convergence plot benchmarked against the PSO baseline.
- **Nine projects, fully tagged.** Color-coded category badges (Open Source / Web / AI-ML / Systems) with animated filtering and per-category counts. krna and PASADA carry the highlight treatment.
- **Case-study pages.** `/projects/[slug]` pages for every project with overview, architecture, and outcomes.
- **Commit history.** Full-year GitHub contribution heatmap with streak and tooltips (GraphQL with `GITHUB_TOKEN`, token-free fallback included).
- **Count-up stats.** Projects, PyPI packages, repositories, and years of advocacy, animating on scroll.
- **Ambient backgrounds.** Global aurora wash, grid, dots, and bamboo node-path layers with floating gradient orbs.
- **Printable résumé.** The modal includes a print stylesheet so "Print / Save as PDF" produces a clean one-page document.
- **Reduced motion.** Terminal, marquee, reveals, count-ups, and plot drawing degrade gracefully under `prefers-reduced-motion`.
- **Accessible.** Labeled dock icons, keyboard-navigable accordion and filter tabs, visible focus rings, skip link, ARIA dialog semantics, responsive from 320 px up.
- **SEO.** Dynamic Open Graph and Twitter images, JSON-LD Person schema, `robots.txt`, sitemap, semantic headings.
