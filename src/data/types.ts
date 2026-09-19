export type Experience = {
  role: string;
  org: string;
  date: string;
  period: string;
  type: string;
  desc: string;
  current: boolean;
  link?: string;
};

export type CaseStudy = {
  overview: string;
  architecture: string;
  outcomes: readonly string[];
};

export type Category = "Open Source" | "Web" | "Systems" | "AI/ML";

export type Project = {
  slug: string;
  title: string;
  role: string;
  subRoles: readonly string[];
  desc: string;
  tags: readonly string[];
  link?: string;
  repo?: string;
  /** When true the card shows a lock icon and no case study page is generated. */
  locked?: boolean;
  year?: string;
  /** Card size: spans two columns when true. */
  featured?: boolean;
  /** Adds the cyan glow highlight to the card. */
  highlight?: boolean;
  /** Renders the PyPI badge. */
  package?: boolean;
  /** Long-form content for the /projects/[slug] page. */
  caseStudy?: CaseStudy;
  /** One or more buckets; the card shows a badge per category. */
  categories: readonly Category[];
};

export type SkillGroup = {
  label: string;
  items: readonly string[];
};

export type OpenSourceEntry = {
  name: string;
  kind: string;
  desc: string;
  link: string;
};

export type FilterKey = "All" | Category;
