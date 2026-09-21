# DESIGN.md, ben4dev portfolio

Design direction for Ben James Duag's portfolio. Written by the agent from Ben's real
materials (krna, civic-tech work, advocacy), per the direction process Ben chose.
Every major choice carries a one-line reason (antislop R-31).

## Identity

A bamboo-systems portfolio. Ben's flagship work, krna, is a bamboo-rhizome optimization
algorithm published on PyPI: the whole visual world grows from that one real artifact,
so the design belongs to this person and to nobody else.

- **Identity motif:** the rhizome node. A small filled dot with a soft outer ring,
  repeated wherever the design marks a real thing: timeline entries, the plot's
  endpoints, list markers, the dock's active state. One gesture, many places, always
  meaning "this is a real node in Ben's work."
- **One-line reason:** an identity drawn from the subject's own published work cannot
  be swapped onto another person's portfolio (antislop R-20).

## Palette

Max 2 core colors + 1 accent, all locked site-wide (antislop R-29, one palette per page):

| Role | Light | Dark | Reason |
|---|---|---|---|
| Paper | `#FAF7EF` warm paper | `#0C130D` bamboo-ink | Paper reads as field notes, ink as soil; both come from the bamboo world |
| Ink (text) | `#1A2419` | `#EDF3EA` | Green-cast neutrals instead of slate keep the page in one temperature |
| Accent | `#3F7D2E` bamboo green | `#7BC96A` | The one accent, taken from the bamboo motif; used for identity, never for decoration |
| Benchmark orange | `#C97A1B` | `#E09A45` | Second data color, reserved exclusively for the PSO baseline in charts, so chart reading stays honest |

State colors (success/active "live" dots) reuse the accent; error/destructive stays
semantic red. No cyan, no fuchsia, no violet, no indigo anywhere (one accent, locked,
R-29 / Color Consistency Lock).

## Typography

- **Display:** Unbounded (already in the project). Rounded, geometric, slightly
  botanical; reads as growth, not corporate. Reason: distinctive and already owned,
  replacing it would only trade one default for another.
- **Body:** Manrope (already in the project). Reason: humanist sans that stays
  legible at small sizes against warm paper.
- **Data/mono:** JetBrains Mono (already in the project). Reason: real data labels
  (plot axes, pip command, contribution counts) deserve a data voice; body text
  never goes mono (antislop R-06).
- No italic headers, no single-accent-word headlines. Emphasis via weight and the
  accent color only (Hallmark typography purity).

## Layout

- **GitHub layout structure, bamboo skin.** The page keeps the deployed layout
  the owner wants: two-column hero (text left, terminal right), four stat
  cards, 2+1 about grid, left-rail accordion timeline, filterable project
  grid, heatmap section, split krna showcase, skills grid, centered contact.
  Reason: the owner reverted the centered redesign and asked for the GitHub
  layout, kept aligned and consistent; the skin carries the identity, the
  structure stays the deployed one.
- Left-aligned section headings with a mono index line ("01 / About"), the
  original scale and rhythm.
- One corner-radius system: 12px controls, 20px cards, 24px showcase panels.
- Cards only where elevation carries meaning; everything else groups with
  space and hairlines.

## Background

- Warm paper / bamboo-ink base. Two fixed aurora washes breathe on a slow
  18s loop (transform only), so the page feels alive without scroll motion.
- Light mode gets its own presence: a slightly deeper paper tone, stronger
  washes, and light-only band tints (bamboo-50) on alternating sections so
  the theme reads as designed rather than default-white.
- The krna section keeps its masked node-path field, its home turf.
- AmbienceToggle is the opt-in ambience layer, off by default, remembered per
  visitor via localStorage: drifting glowing spores, six fireflies tracing
  loops, five falling bamboo leaves, and a faint ground tint, so the toggle
  visibly changes the page instead of whispering.

## Transitions

- **View Transitions API** for page changes: cross-document auto-fade on
  case-study navigation via `@view-transition`, shared-element morphs for
  project titles and cards via `view-transition-name`, and a same-document
  fade on the project filter. The helper no-ops on unsupported browsers and
  under reduced motion.
- A native CSS scroll progress bar (animation-timeline scroll()) replaces
  the JS one where supported, falling back to the Framer Motion bar.
- MOTION stays 2: choreographed entrances, no pinning, no parallax.

## Motion

Dial: **ENERGY 2 / RHYTHM 3 / MOTION 2** (scroll-reveal, transitions, and view
transitions, no pinning, no parallax). Every animation answers the purpose test:

- Hero: two-column with the boot-log terminal, staggered entrance, once,
  0.7s. Purpose: sequence the value proposition.
- Hero terminal is the typing boot log (whoami, pip install krna, services,
  advocacy, career). Every line describes a real system or a real fact; the
  one package size (39.6 kB) comes from the actual PyPI wheel.
- ScrollReveal: 24px rise, once per element. Purpose: narrative order on scroll.
- Convergence plot: draws itself in view. Purpose: shows the algorithm actually
  converging, the section's whole point.
- Dock magnification + filter layout animations. Purpose: direct manipulation
  feedback.
- CountUp on stats. Purpose: draws the eye to real numbers.
- Everything honors `prefers-reduced-motion` and collapses to static.
- No command palette in this layout; the dock covers navigation.

## Copy voice

Plain, specific, evidence-first. The site's copy already does this well; the
overhaul changes presentation, not claims. No fabricated numbers (every number on
the page traces to stats.ts, the PyPI package, or Ben's records). One label per
intent: "View résumé" for the resume modal, "Email Ben" for contact.
