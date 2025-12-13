"use client";

import { 
  motion, useScroll, useTransform, useSpring, useMotionValue, 
  AnimatePresence 
} from "framer-motion";
import { 
  Github, Linkedin, Mail, Moon, Sun, ArrowUpRight, Lock, 
  MonitorCheck, Users, HeartHandshake, ShieldCheck, Globe, 
  GraduationCap, Briefcase, Copy, Check, Facebook, MapPin,
  Terminal, Server, Code2, Database, FileText, X, Cpu, Search
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";


const experience = [
  {
    role: "Support Staff Intern (GIP)",
    org: "Dept. of Labor and Employment (DOLE)",
    date: "Nov 2025 - Dec 2025",
    desc: "Assisted in office administration, administrative assistance, and help desk support operations.",
    icon: <MonitorCheck size={20} />,
    color: "text-blue-500",
    bg: "bg-blue-500"
  },
  {
    role: "Project Reviewer & Volunteer",
    org: "BetterGov.ph",
    date: "Nov 2025 - Present",
    desc: "Support initiatives and discussions promoting transparency, accountability, and technological innovations in public service.",
    icon: <Globe size={20} />,
    color: "text-indigo-500",
    bg: "bg-indigo-500"
  },
  {
    role: "Resident Member",
    org: "Computer Science Student Organization (CSSO)",
    date: "Oct 2025 - Present",
    desc: "Active member contributing to the Computer Science academic community at CvSU Naic.",
    icon: <Code2 size={20} />,
    color: "text-yellow-500",
    bg: "bg-yellow-500"
  },
  {
    role: "Resident Member",
    org: "ICT Student Organization (ICTSO)",
    date: "Sep 2023 - Oct 2025",
    desc: "Contributed to technical events and peer support within the ICT department.",
    icon: <Database size={20} />,
    color: "text-purple-500",
    bg: "bg-purple-500"
  },
  {
    role: "Advocate / Volunteer",
    org: "MentalHealthPH",
    date: "Apr 2022 - Present",
    desc: "Promoting mental health awareness and support systems through digital advocacy.",
    icon: <HeartHandshake size={20} />,
    color: "text-red-500",
    bg: "bg-red-500"
  },
  {
    role: "Advocate / Member",
    org: "Philippine Alliance of Human Rights Advocate (PAHRA)",
    date: "Jan 2022 - Present",
    desc: "Participating in forums and campaigns centered on human rights education and social sciences advocacy.",
    icon: <ShieldCheck size={20} />,
    color: "text-green-500",
    bg: "bg-green-500"
  },
  {
    role: "Volunteer Staff",
    org: "Childhope Philippines Foundation",
    date: "Mar 2021 - Present",
    desc: "Supporting street children through education and social welfare initiatives.",
    icon: <HeartHandshake size={20} />,
    color: "text-orange-500",
    bg: "bg-orange-500"
  },
  {
    role: "Youth Ambassador/Member",
    org: "Pinas Forward Digital Democracy and Development Inc.",
    date: "Nov 2021 - Present",
    desc: "Promote digital and youth engagement initiatives through online campaigns and community outreach.",
    icon: <Globe size={20} />,
    color: "text-cyan-500",
    bg: "bg-cyan-500"
  }
];

const projects = [
  {
    title: "AGWA Water Services, Inc.",
    role: "Web Architect & DevOps Engineer",
    subRoles: "QA/QC Engineer • Project Manager • Database Lead • Data Admin",
    desc: "A centralized system for managing water utility operations, from meter reading to payments. Built to streamline logistics and customer service.",
    tags: [
      "React", "Lucide", "JS", "Stripe", "Groq AI", "Firebase Console", "Firestore Database",
      "Node.js", "DevOps", "Data Privacy"
    ],
    link: "https://agwa-wsinc.vercel.app",
    featured: true,
    highlight: true
  },
  {
    title: "OS Scheduler Ultima",
    role: "Full Stack Developer",
    subRoles: "Advanced Algorithms • Visualization Specialist",
    desc: "A high-performance explainer tool for OS scheduling algorithms. Visualizes complex logic to solve conflict management and optimize time-slot allocation.",
    tags: ["Next.js", "Algorithms", "OS Theory", "Visualization"],
    link: "https://schedultima.vercel.app",
    featured: true,
    highlight: true
  },
  {
    title: "Local RAG System",
    role: "AI Engineer & Backend Dev",
    subRoles: "Gov Ordinances & Local Docs",
    desc: "A Retrieval-Augmented Generation system for querying local ordinances and memos. Powered by local Ollama 3 (8B) or Mistral AI models to ensure data sovereignty.",
    tags: ["Ollama 3", "Mistral AI", "Python", "Local LLM", "RAG"],
    link: "#",
    featured: false,
    highlight: false
  },
  {
    title: "NextQue",
    role: "Lead Developer",
    subRoles: "System Architect",
    desc: "A robust government queuing system designed to reduce wait times and improve public service efficiency. Features local SQLite database for offline reliability.",
    tags: ["Java", "SQLite", "Apache NetBeans"],
    link: "#",
    featured: false,
    highlight: false
  },
  {
    title: "ARIA",
    role: "Network Architect",
    subRoles: "Cisco Enterprise Simulation",
    desc: "Designed comprehensive network topologies for enterprise environments using Cisco Packet Tracer. Implemented OSPF routing, VLAN segmentation, and ACL policies.",
    tags: ["Cisco", "Packet Tracer", "VLAN/OSPF"],
    link: "#",
    featured: false,
    highlight: false
  },
  {
    title: "Void Strike",
    role: "Frontend & Logic Developer",
    subRoles: "Game Development",
    desc: "A fast-paced 2D space shooter game built in Java. I led the frontend development, implemented core gameplay features, and managed debugging.",
    tags: ["Java", "NetBeans", "Game Dev"],
    link: "#",
    featured: false,
    highlight: false
  }
];

const skills = [
  "System Architecture", "Project Management", "Digital Forensics", "OSINT", 
  "Linux/Ubuntu", "Data Privacy", "Backend Operations", "Strategic Planning",
  "Full Stack Dev", "Database Admin", "Domain Management", "Hardware Support",
  "Social Sciences", "Office Admin", "Technical Troubleshooting", "Git/GitHub",
  "Web Development", "Microsoft Office Suites", "Data Security", "Research Analysis"
];


function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-[8.5in] h-[85vh] md:h-[90vh] bg-white text-slate-900 shadow-2xl overflow-y-auto font-serif rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-50 text-slate-500 bg-white/80 backdrop-blur"
        >
          <X size={20} />
        </button>
        
        <div className="p-6 md:p-14 space-y-6">
          <div className="text-center border-b-2 border-slate-900 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide mb-2">Ben James Jocson Duag</h2>
            <div className="w-full overflow-x-auto scrollbar-hide">
               <p className="text-[10px] md:text-[11px] text-slate-700 whitespace-nowrap font-medium min-w-max px-1">
                 Capt, J, Angeles St, Poblacion III (Caingin), Maragondon, Cavite &bull; benjamesduag.edu@gmail.com &bull; 09938086885 / 09766075495
               </p>
            </div>
          </div>

          <section>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 tracking-wider">Education</h3>
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between font-bold text-sm">
                <span>Cavite State University</span>
                <span className="font-normal sm:font-bold">Naic, Cavite</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between italic text-sm">
                <span>Bachelor of Science in Computer Science</span>
                <span>2023 - Present</span>
              </div>
              <p className="text-xs mt-1 text-slate-700 leading-tight text-justify">
                <span className="font-semibold">Relevant Coursework:</span> Applications Development and Emerging Technologies, Data Structures and Algorithms, Discrete Structures, Advanced Database Management Systems, Linear Algebra, Operating Systems.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row justify-between font-bold text-sm">
                <span>Bucal National High School</span>
                <span></span>
              </div>
              <p className="italic text-sm">Technical Vocational Livelihood - ICT - Animation</p>
              <div className="flex justify-between text-xs text-slate-700 mt-1">
                <span>GPA: 92</span>
                <span className="italic">2021 - 2023</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 tracking-wider">Technical Projects</h3>
            {projects.map((proj, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-sm gap-1">
                  <span>{proj.title}</span>
                  <span className="text-[9px] sm:text-[10px] font-normal bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-fit">
                    {proj.tags.slice(0, 5).join(", ")}{proj.tags.length > 5 ? "..." : ""}
                  </span>
                </div>
                <div className="flex justify-between italic text-xs mb-1">
                  <span>{proj.role}</span>
                </div>
                <ul className="list-disc ml-4 text-xs space-y-0.5 text-slate-700 leading-tight text-justify">
                  <li>{proj.desc}</li>
                  {proj.subRoles && <li>Key Areas: {proj.subRoles}</li>}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 tracking-wider">Leadership & Experience</h3>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-3 break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:justify-between font-bold text-sm">
                  <span>{exp.org}</span>
                  <span className="font-normal text-[10px] text-slate-500 sm:text-slate-900">{exp.date}</span>
                </div>
                <div className="flex justify-between italic text-xs">
                  <span>{exp.role}</span>
                </div>
                <p className="text-xs mt-0.5 text-slate-700 leading-tight text-justify">{exp.desc}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase border-b border-slate-300 mb-2 tracking-wider">Skills & Interests</h3>
            <div className="text-xs space-y-2 text-slate-700 leading-tight text-justify">
              <p>
                <span className="font-bold">Core Competencies:</span> {skills.join(", ")}.
              </p>
              <p>
                <span className="font-bold">Interests:</span> Open-Source Intelligence (OSINT), Application Development for Social Good, Cybersecurity, Social Sciences, Solutions for Sociotechnical Issues.
              </p>
            </div>
          </section>

        </div>
      </motion.div>
    </div>
  );
}

function DockItem({ mouseX, children, href, onClick }: { mouseX: any, children: React.ReactNode, href?: string, onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Content = (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-200 cursor-pointer shadow-sm relative group"
      onClick={onClick}
    >
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href} target={href.startsWith("http") ? "_blank" : "_self"}>{Content}</Link>;
  }
  return Content;
}

function Card3D({ children, className, highlight = false }: { children: React.ReactNode; className?: string; highlight?: boolean }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${className} ${highlight ? 'relative z-10' : ''}`}
    >
      {highlight && (
        <div className="absolute -inset-[1px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-[2rem] blur-sm opacity-50 animate-pulse -z-10" />
      )}
      <motion.div
        className="h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          rotateX: useTransform(mouseY, [-300, 300], [5, -5]),
          rotateY: useTransform(mouseX, [-300, 300], [-5, 5]),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const TypewriterTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const allLines = [
    "[ 0.000000] Linux version 6.8.0-ben-arch (root@cavite) (gcc version 12.2.0)",
    "[ 0.000123] Command line: BOOT_IMAGE=/boot/vmlinuz-ben-os root=UUID=ben-duag-systems ro quiet",
    "[ 0.000456] KERNEL: Arch: x86_64, Detected Family: Ben James Duag",
    "[ 0.150000] Memory: 64GB available (System Architect Mode enabled)",
    "[ 0.200000] SMP: Allowing 32 CPUs, 0 hotplug CPUs",
    "[ 0.450000] systemd[1]: Starting Portfolio Service...",
    "[ 0.550000] [ OK ] Loading Module: React_NextJS_Core... DONE.",
    "[ 0.580000] [ OK ] Loading Module: Java_Backend_Runtime... DONE.",
    "[ 0.610000] [ OK ] Loading Module: Python_OSINT_Scripting... DONE.",
    "[ 0.650000] [ OK ] Mounted filesystem: /cavite/naic/campus",
    "[ 0.700000] [ OK ] Initializing Network Protocols (Cisco/OSPF/VLAN)... CONNECTED.",
    "[ 0.750000] [ OK ] Started Human Rights Advocacy Daemon (PAHRA, MentalHealthPH).",
    "[ 0.800000] [ OK ] Started Digital Forensics & Vulnerability Scan.",
    "[ 0.850000] [ OK ] Checking Database Integrity (PostgreSQL/SQLite/Mongo)... PASS.",
    "[ 0.950000] [INFO] Ben James Duag (uid=1000) logged in.",
    "[ 1.000000] [INFO] Roles: Architect | DevOps | Advocate | Researcher.",
    "[ 1.100000] Welcome to ben.dev.",
    "> executing main()..._"
  ];

  useEffect(() => {
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let currentText = "";
    setLines([]);

    const interval = setInterval(() => {
      if (currentLineIndex >= allLines.length) {
        clearInterval(interval);
        return;
      }
      const targetLine = allLines[currentLineIndex];
      if (currentCharIndex < targetLine.length) {
        currentText += targetLine[currentCharIndex];
        setLines(prev => {
          const newLines = [...prev];
          if (newLines.length === 0 || newLines.length <= currentLineIndex) {
            newLines.push(currentText);
          } else {
            newLines[currentLineIndex] = currentText;
          }
          return newLines;
        });
        currentCharIndex++;
      } else {
        currentLineIndex++;
        currentCharIndex = 0;
        currentText = "";
      }
    }, 5); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 md:h-80 bg-slate-950 rounded-xl border border-slate-800 p-4 md:p-6 font-mono text-[10px] md:text-xs shadow-2xl overflow-hidden relative group flex flex-col hover:border-cyan-500/30 transition-colors duration-500">
      <div className="absolute inset-0 bg-cyan-900/5 pointer-events-none" />
      <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2 relative z-10">
        <div className="w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-500/20" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-md shadow-yellow-500/20" />
        <div className="w-3 h-3 rounded-full bg-green-500 shadow-md shadow-green-500/20" />
        <div className="ml-auto text-[10px] text-slate-600">bash — 80x24</div>
      </div>
      <div className="text-green-400 space-y-1 overflow-y-auto font-medium tracking-tight font-mono h-full relative z-10 scrollbar-hide">
        {lines.map((line, index) => (
          <div key={index} className={`${index === lines.length - 1 ? "animate-pulse" : ""} break-all`}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};


export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const mouseX = useMotionValue(Infinity);

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("benjamesduag.edu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">
      
      <AnimatePresence>
        {isResumeOpen && <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}
      </AnimatePresence>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-20 opacity-100" />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent blur-3xl"
        />
      </div>

      <div className="fixed top-4 md:top-6 inset-x-0 flex justify-center z-50 pointer-events-none px-2">
        <div 
          className="pointer-events-auto flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg shadow-black/5 w-auto max-w-full overflow-x-auto no-scrollbar"
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          
          <Link href="/" className="mr-2 md:mr-4 group shrink-0">
            <div className="font-bold text-lg md:text-xl tracking-tighter font-mono flex items-center h-10">
              ben<span className="text-cyan-500 group-hover:text-cyan-400 transition-colors">.dev</span>
            </div>
          </Link>

          <div className="flex items-end gap-1 md:gap-2 h-12 md:h-14 pb-2 shrink-0">
            <DockItem mouseX={mouseX} href="#about"><Users size={20} /></DockItem>
            <DockItem mouseX={mouseX} href="#experience"><Briefcase size={20} /></DockItem>
            <DockItem mouseX={mouseX} href="#projects"><Code2 size={20} /></DockItem>
            
            <div className="w-px h-6 md:h-8 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />
            
            <DockItem mouseX={mouseX} href="https://github.com/Meseten"><Github size={20} /></DockItem>
            <DockItem mouseX={mouseX} href="https://www.linkedin.com/in/ben-james-duag/"><Linkedin size={20} /></DockItem>
            <DockItem mouseX={mouseX} href="https://facebook.com/kadashiga"><Facebook size={20} /></DockItem>
            
            <div className="w-px h-6 md:h-8 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />
            
            <DockItem mouseX={mouseX} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </DockItem>
          </div>
        </div>
      </div>

      <section className="relative min-h-screen flex items-center justify-center pt-32 px-4 overflow-hidden">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 md:space-y-8 order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-bold uppercase tracking-wider border border-cyan-500/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
              System Architect & Developer
            </div>

            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95] text-slate-900 dark:text-white">
                ben<span className="text-cyan-500">.dev</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-lg">
                Engineering <span className="text-slate-900 dark:text-white font-bold">Resilient Systems</span> for <br className="hidden md:block" />
                Social Impact.
              </p>
            </div>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Merging Computer Science with Social Advocacy. Based in <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Cavite, PH</span>, I aim to create a better future with ease through software engineering.
            </p>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setIsResumeOpen(true)}
                className="group relative px-6 py-3 md:px-8 md:py-4 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl overflow-hidden transition-transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2"><FileText size={18} /> View Résumé</span>
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-1 lg:order-2 perspective-1000 w-full"
          >
            <div className="transform transition-transform hover:rotate-y-[-5deg] duration-500">
               <TypewriterTerminal />
            </div>
          </motion.div>

        </div>
      </section>

      <section id="about" className="py-20 md:py-24 px-4 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
            <Terminal className="text-cyan-500" /> System Status
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/10 transition-colors" />
            
            <h3 className="text-3xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
              Ben James Duag
            </h3>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
              A Computer Science student at <strong className="text-cyan-500">Cavite State University - Naic</strong>. I am an advocate and member of organizations like <span className="font-semibold text-slate-900 dark:text-white">#MentalHealthPH</span> and <span className="font-semibold text-slate-900 dark:text-white">PAHRA</span>, leveraging my technical skills to support initiatives for transparency and social justice.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 md:px-3 rounded-lg bg-slate-900/5 dark:bg-slate-100/5 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-[10px] md:text-xs font-mono font-bold shadow-sm">
                 System Architecture
              </span>
              <span className="px-2 py-1 md:px-3 rounded-lg bg-slate-900/5 dark:bg-slate-100/5 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-[10px] md:text-xs font-mono font-bold shadow-sm">
                 Digital Forensics
              </span>
              <span className="px-2 py-1 md:px-3 rounded-lg bg-slate-900/5 dark:bg-slate-100/5 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] md:text-xs font-mono font-bold shadow-sm">
                 Advocacy
              </span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-900/20 flex flex-col justify-between min-h-[200px]"
          >
            <GraduationCap size={32} className="mb-4 opacity-80" />
            <div>
              <div className="text-cyan-100 text-xs font-bold uppercase tracking-wider mb-1">Education</div>
              <h4 className="text-xl md:text-2xl font-bold">BS Computer Science</h4>
              <p className="text-cyan-100 text-xs md:text-sm mt-2">Cavite State University</p>
              <p className="text-cyan-200/60 text-[10px] md:text-xs mt-1">2023 - Present</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center text-center group min-h-[200px]"
          >
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin size={24} className="text-cyan-500" />
            </div>
            <h4 className="font-bold text-lg">Cavite, PH</h4>
            <p className="text-slate-500 text-sm">Naic & Maragondon</p>
          </motion.div>

          <div className="md:col-span-2 p-6 md:p-8 rounded-3xl bg-slate-900 text-white overflow-hidden relative flex items-center min-h-[100px]">
            <div className="absolute left-0 w-16 md:w-20 h-full bg-gradient-to-r from-slate-900 to-transparent z-10" />
            <div className="absolute right-0 w-16 md:w-20 h-full bg-gradient-to-l from-slate-900 to-transparent z-10" />
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
              className="flex gap-6 md:gap-8 whitespace-nowrap"
            >
              {[...skills, ...skills].map((skill, i) => (
                <span key={i} className="text-lg md:text-xl font-bold opacity-50 hover:opacity-100 hover:text-cyan-400 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 md:py-24 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-3 text-slate-900 dark:text-white">
          <Server className="text-cyan-500" /> Professional & Volunteer History
        </h2>
        
        <div className="relative space-y-4">
          <div className="absolute left-[9px] top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" />
          
          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05 }}
              className="relative pl-8"
            >
              <div className={`absolute left-0 top-2 w-5 h-5 rounded-full border-4 border-slate-50 dark:border-slate-950 ${item.bg} z-10`} />
              
              <div className="group p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                    {item.role}
                  </h3>
                  <span className="font-mono text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">{item.date}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <span className={`${item.color}`}>{item.icon}</span> {item.org}
                </div>
                
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="py-20 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Featured <span className="text-cyan-500">Works</span></h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-base md:text-lg">
            Deploying scalable solutions for government efficiency and social innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
          {projects.map((project, index) => (
            <Card3D 
              key={index} 
              className={`h-full ${project.featured ? 'md:col-span-2' : 'md:col-span-1'}`}
              highlight={project.highlight}
            >
              <div className={`h-full bg-white dark:bg-slate-900/80 border ${project.highlight ? 'border-cyan-500/50' : 'border-slate-200 dark:border-slate-800'} rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-cyan-500/80 transition-all duration-300 flex flex-col shadow-sm hover:shadow-2xl`}>
                
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-[10px] md:text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mt-1">{project.role}</p>
                    </div>
                    {project.link !== "#" ? (
                      <Link href={project.link} target="_blank" className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                      </Link>
                    ) : (
                      <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 opacity-50 cursor-not-allowed">
                        <Lock size={18} />
                      </div>
                    )}
                  </div>

                  {project.subRoles && (
                    <div className="mb-4 pl-3 border-l-2 border-cyan-500/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-2">{project.subRoles}</p>
                    </div>
                  )}

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

      <footer className="py-16 md:py-20 px-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-slate-900 dark:text-white">Ready to Architect the Future?</h2>
          
          <button 
            onClick={handleCopy}
            className="group inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/20 mb-8 md:mb-12"
          >
            <Mail className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
            <span className="font-mono text-xs md:text-sm text-slate-700 dark:text-slate-300">benjamesduag.edu@gmail.com</span>
            <div className="w-px h-5 md:h-6 bg-slate-200 dark:bg-slate-800 mx-1 md:mx-2" />
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-400 group-hover:text-cyan-500" />}
          </button>

          <p className="text-slate-500 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Ben.dev. Designed & Engineered in Cavite.
          </p>
        </div>
      </footer>

    </main>
  );
}