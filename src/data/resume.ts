// Central source of truth for all portfolio content.
// Sources: JobStreet profile, LinkedIn, resume PDF, github.com/Meseten, pypi.org/user/Reben.
// Site is live at https://ben4dev.vercel.app

import type { Experience, Project } from "./types";

export const SITE = {
  name: "Ben James Duag",
  role: "Systems & Applications Developer",
  tagline: "Engineering resilient systems for social impact",
  location: "Cavite, Philippines",
  email: "benjamesduag.edu@gmail.com",
  domain: "https://ben4dev.vercel.app",
  brand: "ben4dev",
  github: "https://github.com/Meseten",
  githubUser: "Meseten",
  pypiUser: "https://pypi.org/user/Reben/",
  linkedin: "https://www.linkedin.com/in/ben-james-duag/",
  facebook: "https://facebook.com/kadashiga",
  jobstreet: "https://ph.jobstreet.com/profiles/benjames-duag-BXSkxgJrYT",
} as const;

// Newest first.
export const EXPERIENCE: readonly Experience[] = [
  {
    role: "Intern",
    org: "Tricycle Franchise Regulatory Unit, Municipality of Naic",
    date: "Jul 2026",
    period: "1 mo",
    type: "Internship",
    desc: "Interned with the unit that regulates tricycle franchises in Naic. Supported MTOP records processing, franchise application intake, and daily document workflows.",
    current: false,
  },
  {
    role: "Amplifier",
    org: "BetterGov.ph",
    date: "Nov 2025 to Present",
    period: "Ongoing",
    type: "Volunteer",
    desc: "Support open-source civic-tech projects that push for transparency and better public service.",
    current: true,
    link: "https://bettergov.ph",
  },
  {
    role: "Support Staff Intern (GIP)",
    org: "Department of Labor and Employment",
    date: "Nov 2025 to Dec 2025",
    period: "2 mos",
    type: "Government Internship Program",
    desc: "Handled office administration, document support, and help-desk work at a national agency.",
    current: false,
  },
  {
    role: "Resident Member",
    org: "Computer Science Student Organization",
    date: "Sep 2025 to Present",
    period: "Ongoing",
    type: "Student Org",
    desc: "Active member of the Computer Science academic community at Cavite State University Naic.",
    current: true,
  },
  {
    role: "Resident Member",
    org: "ICT Student Organization",
    date: "Oct 2023 to Sep 2025",
    period: "1 yr 11 mos",
    type: "Student Org",
    desc: "Active member of the ICT academic community at Cavite State University Naic.",
    current: false,
  },
  {
    role: "IT Team Lead",
    org: "CREOTEC Philippines",
    date: "Mar 2023",
    period: "1 mo",
    type: "Internship",
    desc: "Led the IT team during a one-month internship. Coordinated tasks and deliverables.",
    current: false,
  },
  {
    role: "Advocate",
    org: "#MentalHealthPH",
    date: "Apr 2022 to Present",
    period: "Ongoing",
    type: "Advocacy",
    desc: "Promote mental health awareness through digital campaigns.",
    current: true,
  },
  {
    role: "Advocate / Member",
    org: "Philippine Alliance of Human Rights Advocates",
    date: "Apr 2022 to Present",
    period: "Ongoing",
    type: "Advocacy",
    desc: "Join forums and campaigns on human rights education.",
    current: true,
  },
  {
    role: "Ambassador",
    org: "Pinas Forward Digital Democracy & Development, Inc.",
    date: "Jan 2021 to Present",
    period: "Ongoing",
    type: "Advocacy",
    desc: "Run digital campaigns and community outreach for youth engagement.",
    current: true,
  },
];

// Ordered by weight. Categories drive the color-coded badges and the filter.
// Anything with an algorithm or a model behind it is tagged AI/ML as well.
// Projects marked locked keep their repo hidden. Visitors can read the case
// study and reach out, and the code stays with Ben.
export const PROJECTS: readonly Project[] = [
  {
    slug: "krna",
    title: "krna",
    role: "Author & Maintainer",
    subRoles: ["Sympodial Kawayan Rhizome Optimization Algorithm"],
    desc: "A bamboo-inspired optimization algorithm published on PyPI. Lévy-flight exploration pairs with gradient exploitation, and the package ships with benchmarks, a multi-objective variant, and a scikit-learn tuner.",
    tags: ["Python", "NumPy", "scikit-learn", "PyPI"],
    link: "https://pypi.org/project/krna/",
    repo: "https://github.com/Meseten/KRNA",
    year: "2026",
    featured: true,
    highlight: true,
    package: true,
    categories: ["Open Source", "AI/ML"],
    caseStudy: {
      overview:
        "Most optimization algorithms live only in papers. krna is a working one. SKROA, the Sympodial Kawayan Rhizome Optimization Algorithm, is a swarm algorithm modeled on how running bamboo spreads, published as a real pip package with tests, docs, and reproducible benchmarks.",
      architecture:
        "Python 3.11+ with NumPy as the only core dependency. SKROA runs two phases. Agents explore with Lévy flights, then exploit with finite-difference gradients. Two extra operators keep the swarm healthy. Sympodial Clamping spreads out crowded agents, and Culm-Abortion prunes stalled ones and respawns them near the best point. MO-SKROA adds a non-dominated archive for multi-objective problems. The tuner accepts any scikit-learn model and searches mixed parameter spaces. Releases publish to PyPI through GitHub Actions with trusted publishing.",
      outcomes: [
        "Published on PyPI as krna, MIT licensed",
        "Benchmark suite runs Wilcoxon tests and reports honest results",
        "Every operator can be switched off for ablation studies",
        "Works as a hyperparameter tuner for scikit-learn models",
      ],
    },
  },
  {
    slug: "pasada",
    title: "PASADA",
    role: "Software Engineer",
    subRoles: ["B&V Software Solutions, Inc."],
    desc: "A desktop franchise registry for municipal tricycle permits. It runs offline, prints MTOP certificates, and syncs records between office computers over the local network.",
    tags: ["Tauri", "FastAPI", "SQLite", "Next.js"],
    year: "2026",
    featured: true,
    highlight: true,
    locked: true,
    categories: ["Systems", "AI/ML"],
    caseStudy: {
      overview:
        "Municipal offices track tricycle franchise permits on paper. They have slow internet, Windows machines, and clerks who need printed certificates. PASADA is built for exactly that environment, and it carries its own document intelligence layer so records become searchable without any cloud service.",
      architecture:
        "The app uses the sidecar pattern. A Next.js UI sits inside a Tauri shell with a FastAPI backend that starts alongside it and answers a /health check before the UI loads data. Records live in SQLite through SQLAlchemy, and a self-healing migration layer fixes the schema on upgrade. Certificates are filled into .docx templates and printed to PDF through Word automation. A LAN sync engine finds other computers by UDP broadcast and pulls new records from them, so several machines can share one dataset without a server. Document processing runs locally so text extraction and search stay inside the office network.",
      outcomes: [
        "Full permit lifecycle from application to numbering and status tracking",
        "Automated MTOP certificate printing to PDF",
        "Works with no internet at all, syncing over LAN between computers",
        "Upgrades are safe for non-technical staff",
      ],
    },
  },
  {
    slug: "gallry",
    title: "Gallry",
    role: "Android Developer",
    subRoles: ["On-device gallery with local LLM"],
    desc: "An Android gallery app that manages photos like a dating app manages matches. A TensorFlow Lite model runs entirely on the phone, so every photo is searchable by what it shows without any upload.",
    tags: ["Kotlin", "Android", "TensorFlow Lite", "RAG"],
    year: "2026",
    featured: true,
    locked: true,
    categories: ["AI/ML"],
    caseStudy: {
      overview:
        "Phone galleries are a wall of thumbnails and folders nobody maintains. Gallry borrows the mechanics of dating apps for file management. You swipe through photos, the ones you pass get archived, and the ones you keep stay front and center. Underneath it, a TensorFlow Lite model reads each image on the device and a local RAG layer lets you ask questions about your own library in plain language.",
      architecture:
        "Kotlin on Android with images indexed in a local Room database. A quantized TensorFlow Lite model generates embeddings for every photo during idle-time indexing, so indexing never blocks the UI. Embeddings and captions feed a local vector store, and retrieval-augmented generation answers queries like beach trips last March using only what is already on the phone. The LLM runs through TensorFlow Lite as well, so nothing is uploaded, no account is needed, and the whole pipeline works in airplane mode.",
      outcomes: [
        "Swipe-based triage turns a backlog into a curated gallery",
        "Search by content, not by folder name, with every model call on the device",
        "Local RAG answers natural-language questions about the library",
        "Runs fully offline with no accounts and no uploads",
      ],
    },
  },
  {
    slug: "os-scheduler-ultima",
    title: "OS Scheduler Ultima",
    role: "Full Stack Developer & System Architect",
    subRoles: ["Advanced Algorithms", "Visualization"],
    desc: "A CPU scheduling visualizer. Give it a set of processes and watch FCFS, SJF, Priority, and Round Robin compete on the same workload, with all metrics computed live.",
    tags: ["Next.js", "TypeScript", "Algorithms"],
    link: "https://schedultima.vercel.app",
    repo: "https://github.com/Meseten/cpu-scheduler",
    year: "2026",
    featured: true,
    categories: ["Web", "AI/ML"],
    caseStudy: {
      overview:
        "Scheduling is taught on whiteboards, so most students never see the algorithms compete. This tool takes one process set and races all four policies side by side, computing turnaround, waiting, and response times as it runs.",
      architecture:
        "TypeScript Next.js app. Every scheduling algorithm is a pure function over a process table, kept separate from the UI. The same engine drives the step animation, the Gantt chart, and the comparison tables. The cpu-scheduler repo holds the algorithm core so it can be reused or tested on its own.",
      outcomes: [
        "Four scheduling policies compared on identical inputs",
        "Live metrics for turnaround, waiting, and response time",
        "Reusable, testable algorithm core",
        "Used as a study aid at Cavite State University",
      ],
    },
  },
  {
    slug: "agwa",
    title: "AGWA Water Services, Inc.",
    role: "Web Architect & DevOps Engineer",
    subRoles: ["QA/QC Engineer", "Project Manager", "Database Lead", "Data Admin"],
    desc: "The operating platform of a real water district. Meter reading, billing, online payments through Stripe, customer accounts, and an AI assistant for routine questions, in daily use by AGWA staff.",
    tags: ["React", "Next.js", "Firebase", "Stripe", "Groq AI"],
    link: "https://agwa-wsinc.vercel.app",
    year: "2025",
    featured: true,
    categories: ["Web", "Systems", "AI/ML"],
    caseStudy: {
      overview:
        "AGWA is a water district with real customers. Its records lived on paper. Meter readings in notebooks, billing in spreadsheets, payments collected in person. This platform moved the whole cycle online, and the staff use it every day.",
      architecture:
        "Next.js and React on the front end. Firebase handles auth and data. Stripe processes payments. A Groq-powered assistant answers routine customer questions before they reach staff. I led DevOps as well, with CI deployments to Vercel, Firestore security rules, and privacy handling for customer records. I also carried the QA/QC, project management, and database-admin work across the AGWA repositories.",
      outcomes: [
        "Replaced paper meter reading and billing",
        "Customers pay online instead of traveling to the office",
        "AI support handles routine questions",
        "Runs in production for a real utility",
      ],
    },
  },
  {
    slug: "local-rag",
    title: "Local RAG System",
    role: "AI Engineer & Backend Developer",
    subRoles: ["Government Ordinances"],
    desc: "A question-answering system for municipal ordinances and memos. It runs on local models only, so government text never leaves the machine.",
    tags: ["Llama 3", "Mistral AI", "Python", "RAG"],
    year: "2025",
    locked: true,
    categories: ["AI/ML"],
    caseStudy: {
      overview:
        "Ordinances and memos are the documents people most need to search and the documents government cannot paste into cloud chatbots. This system answers questions over that corpus, and every model call stays on local hardware.",
      architecture:
        "A Python pipeline chunks documents, embeds them, and stores them in a local vector index. At query time it retrieves by similarity and generates answers with Ollama serving Llama 3 8B or Mistral. Retrieval and generation are separate layers, so either model can be swapped without touching the other.",
      outcomes: [
        "Answers grounded in the source documents",
        "Fully offline, no data leaves the machine",
        "Swap between Llama 3 8B and Mistral behind one interface",
        "The pattern fed into PASADA's document pipeline",
      ],
    },
  },
  {
    slug: "nextque",
    title: "NextQue",
    role: "Lead Developer & Technical Lead",
    subRoles: ["System Architect"],
    desc: "A queuing system for government service offices. It keeps issuing tickets with the network down, and it records how long every customer actually waited.",
    tags: ["Java", "SQLite", "Apache NetBeans"],
    repo: "https://github.com/Meseten/NextQue3.0",
    year: "2025",
    categories: ["Systems"],
    caseStudy: {
      overview:
        "Government offices run on physical queues, and nobody measures them. NextQue digitizes the flow. Tickets, window calling, and wait-time records, sized for the hardware these offices already own.",
      architecture:
        "A Java desktop app built in Apache NetBeans with SQLite as the embedded store. The hard requirement was offline operation, and SQLite makes it absolute. I led the design across three versions, from a single-window prototype to a multi-window layout with a public display screen for called numbers.",
      outcomes: [
        "Ticket flow that keeps working offline",
        "Wait-time data for every ticket",
        "Three versions shipped from user feedback",
        "Deploys as one JAR and one database file",
      ],
    },
  },
  {
    slug: "aria",
    title: "ARIA",
    role: "Network Architect & Simulation Engineer",
    subRoles: ["Cisco Enterprise Simulation"],
    desc: "An enterprise network design proven in Cisco Packet Tracer. Department VLANs, an OSPF core, and access rules, all verified before touching real hardware.",
    tags: ["Cisco", "Packet Tracer", "VLAN/OSPF"],
    year: "2025",
    categories: ["Systems"],
    caseStudy: {
      overview:
        "ARIA is a network design exercise. A multi-building organization needs department isolation, resilient routing, and enforced access rules, tested in simulation first.",
      architecture:
        "Departments sit in their own VLANs with inter-VLAN routing on layer-3 switches. OSPF runs across the core. ACLs decide which segments reach which servers. The design includes redundant uplinks and failure tests. Pull a link and watch OSPF reconverge.",
      outcomes: [
        "VLAN plan with routing between departments",
        "OSPF core verified under link failure",
        "Access rules between segments by least privilege",
        "Reproducible from the Packet Tracer file",
      ],
    },
  },
  {
    slug: "iso-iec-evaluator",
    title: "ISO/IEC Evaluator",
    role: "Author",
    subRoles: ["Software quality evaluation toolkit"],
    desc: "A toolkit for evaluating software against ISO/IEC 25010, the international standard for software product quality. It turns the eight quality characteristics into scored reviews, written reports, and documentation clients can act on.",
    tags: ["ISO/IEC 25010", "Quality Assurance", "Documentation", "Auditing"],
    year: "2026",
    categories: ["Systems"],
    caseStudy: {
      overview:
        "Most software gets judged by how it looks in a demo. ISO/IEC 25010 defines what quality actually means, across eight characteristics from security to maintainability. This toolkit turns that standard into a practical evaluation process, so any project can be assessed honestly and the result can be defended with evidence.",
      architecture:
        "The toolkit walks each product through the eight ISO/IEC 25010 characteristics. Functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, and portability each get a structured review with a scoring rubric. Findings are recorded with the evidence behind them, then compiled into a report that states what was measured, what passed, and what needs work. The same process backs every project on this portfolio, which is why the claims here stay concrete.",
      outcomes: [
        "Eight-characteristic evaluation grounded in an international standard",
        "Scored rubric with documented evidence per finding",
        "Written reports clients can hand to their own stakeholders",
        "Applied to every build in this portfolio before delivery",
      ],
    },
  },
];

export const SKILL_GROUPS = [
  {
    label: "Engineering",
    items: [
      "Applications Development",
      "Full Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "Kotlin",
      "Back End Development",
      "Software Architecture",
      "Database Administration",
      "Deployment",
    ],
  },
  {
    label: "AI & Data",
    items: [
      "Local LLMs",
      "TensorFlow Lite",
      "RAG Systems",
      "Vector Search",
      "Optimization Algorithms",
      "scikit-learn",
      "NumPy",
      "Groq AI",
    ],
  },
  {
    label: "Security & Networks",
    items: [
      "Cybersecurity",
      "Digital Forensics",
      "OSINT",
      "Firewalls",
      "VPN",
      "WAN / LAN",
      "TCP/IP",
      "Data Security",
      "Linux",
    ],
  },
  {
    label: "Operations",
    items: [
      "IT Technical Support",
      "Helpdesk Support",
      "Ticketing",
      "Troubleshooting",
      "Process Improvement",
      "Project Management",
      "Administrative Support",
      "Microsoft Office 365",
    ],
  },
  {
    label: "Quality & Assurance",
    items: [
      "ISO/IEC 25010 Evaluation",
      "Software Quality Assurance",
      "QA/QC",
      "Technical Documentation",
      "Requirements Analysis",
      "Testing",
    ],
  },
  {
    label: "Creative & Research",
    items: [
      "2D Animation",
      "Character Animation",
      "Adobe Animate",
      "Research Analysis",
      "Strategic Planning",
      "Digital Domain Management",
    ],
  },
] as const;

// Personal interests, shown alongside skills in the marquee.
// Mirrors the About section: advocacy work, research, and creative practice.
export const INTERESTS = [
  "Mental Health Advocacy",
  "Human Rights Education",
  "Civic Tech",
  "Open Source Intelligence",
  "Optimization Research",
  "Digital Youth Engagement",
  "2D Animation",
  "Open Source",
] as const;

export const OPEN_SOURCE = [
  {
    name: "krna",
    kind: "PyPI package",
    desc: "SKROA optimizer. Install with pip install krna",
    link: "https://pypi.org/project/krna/",
  },
  {
    name: "KRNA",
    kind: "GitHub repository",
    desc: "Source, benchmarks, and docs for SKROA",
    link: "https://github.com/Meseten/KRNA",
  },
  {
    name: "cpu-scheduler",
    kind: "GitHub repository",
    desc: "Scheduling algorithm core behind OS Scheduler Ultima",
    link: "https://github.com/Meseten/cpu-scheduler",
  },
  {
    name: "BetterGov.ph",
    kind: "Volunteer org",
    desc: "Open-source civic tech movement",
    link: "https://github.com/bettergovph",
  },
] as const;

export const CERTIFICATIONS = [
  {
    name: "2D Animation, Certificate of Competency 1",
    issuer: "TESDA",
  },
] as const;

export const EDUCATION = [
  {
    school: "Cavite State University Naic",
    degree: "BS Computer Science",
    date: "2023 to Oct 2027 (expected)",
  },
  {
    school: "Bucal National Integrated School",
    degree: "TVL ICT Animation",
    date: "Finished 2023",
  },
] as const;

export const STATS = [
  { value: 9, suffix: "", label: "Projects built and shipped" },
  { value: 1, suffix: "", label: "Package on PyPI" },
  { value: 18, suffix: "", label: "Public repositories" },
  { value: 5, suffix: "", label: "Years of advocacy work" },
] as const;
