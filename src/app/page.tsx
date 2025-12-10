"use client";

import { motion, useScroll, useTransform, AnimatePresence, type Variants } from "framer-motion";
import { 
  Github, Linkedin, Mail, Code2, Cpu, Globe, Moon, Sun, 
  ArrowUpRight, Database, Layers, Smartphone, Server, MapPin, 
  GraduationCap, Briefcase, FileSearch, ShieldCheck, HeartHandshake, Copy, Check,
  MonitorCheck, Lock, Users, Network, TerminalSquare, Gamepad2, Facebook
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
    icon: <MonitorCheck size={18} />
  },
  {
    role: "Resident Member",
    org: "Computer Science Student Organization (CSSO)",
    date: "Oct 2025 - Present",
    desc: "Active member contributing to the Computer Science academic community at CvSU Naic.",
    icon: <Users size={18} />
  },
  {
    role: "Resident Member",
    org: "ICT Student Organization (ICTSO)",
    date: "Sep 2023 - Oct 2025",
    desc: "Contributed to technical events and peer support within the ICT department.",
    icon: <Users size={18} />
  },
  {
    role: "Advocate / Volunteer",
    org: "MentalHealthPH",
    date: "Apr 2022 - Present",
    desc: "Promoting mental health awareness and support systems through digital advocacy.",
    icon: <HeartHandshake size={18} />
  },
  {
    role: "Advocate / Member",
    org: "Philippine Alliance of Human Rights Advocate (PAHRA)",
    date: "Apr 2022 - Present",
    desc: "Participating in forums centered on human rights education and social sciences advocacy.",
    icon: <ShieldCheck size={18} />
  },
  {
    role: "Volunteer Staff",
    org: "Childhope Philippines Foundation",
    date: "Mar 2021 - Present",
    desc: "Supporting street children through education and social welfare initiatives.",
    icon: <HeartHandshake size={18} />
  },
  {
    role: "Ambassador",
    org: "PinasForward Digital Democracy and Development Inc.",
    date: "Jan 2021 - Present",
    desc: "Promoting digital democracy and youth engagement initiatives.",
    icon: <Globe size={18} />
  }
];

const projects = [
  {
    title: "AGWA Water Services, Inc.",
    role: "Web Architect & DevOps Engineer",
    subRoles: "QA/QC Engineer • Project Manager • Database Lead • Data Administrator • Data Privacy Officer • EU Representative • Backend Developer • API & AI Integration Manager",
    desc: "A massive-scale sociotechnical system for water utility management. As the end-to-end technical lead, I architected the infrastructure, managed Database Administration, and ensured strict Data Privacy compliance.",
    tags: ["React", "Node.js", "AI Integration", "DevOps", "Data Privacy"],
    link: "https://agwa-wsinc.vercel.app",
    featured: true
  },
  {
    title: "OS Scheduler Ultima",
    role: "Full Stack Developer & DevOps Engineer",
    subRoles: "Advanced Algorithms • Visualization Specialist",
    desc: "A high-performance explainer tool for Operating System scheduling algorithms. It visualizes complex logic to solve conflict management and optimize time-slot allocation with zero-collision logic.",
    tags: ["Next.js", "Algorithms", "OS Theory", "Visualization"],
    link: "https://schedultima.vercel.app",
    featured: true
  },
  {
    title: "NextQue",
    role: "Lead Developer",
    subRoles: "System Architect",
    desc: "A robust government queuing system built to reduce wait times and improve public service efficiency. Developed as a desktop application running on Apache NetBeans, featuring a local SQLite database for offline reliability.",
    tags: ["Java", "SQLite", "Apache NetBeans"],
    link: "#",
    featured: false
  },
  {
    title: "ARIA",
    role: "Network Architect & Network Engineer",
    subRoles: "Cisco Enterprise Simulation",
    desc: "Designed comprehensive network topologies for enterprise environments using Cisco Packet Tracer. Implemented OSPF routing protocols, VLAN segmentation for security, and ACL policies to manage traffic flow.",
    tags: ["Cisco", "Packet Tracer", "VLAN/OSPF"],
    link: "#",
    featured: false
  },
  {
    title: "Void Strike (Space Shooter)",
    role: "Frontend & Logic Developer",
    subRoles: "Feature Implementation • Debugging",
    desc: "A fast-paced 2D space shooter game built in Java. I led the frontend development, implemented core gameplay features, and managed the debugging process to ensure smooth frame rates and responsive controls.",
    tags: ["Java", "Apache NetBeans", "Game Development"],
    link: "#",
    featured: false
  },
  {
    title: "OSINT Automation Suite",
    role: "Security Researcher",
    subRoles: "Reconnaissance • Vulnerability Scan",
    desc: "Developed a suite of Bash and Python scripts for Termux and Linux environments to automate reconnaissance, vulnerability scanning, and Open-Source Intelligence gathering.",
    tags: ["Bash", "Python", "Linux", "Forensics"],
    link: "#",
    featured: false
  }
];

const skills = [
  "System Architecture", "Project Management", "Digital Forensics", "OSINT", 
  "Linux/Ubuntu", "Data Privacy", "Backend Operations", "Strategic Planning",
  "Full Stack Dev", "Database Admin", "Domain Management", "Hardware Support",
  "Social Sciences", "Office Admin", "Technical Troubleshooting", "Git/GitHub"
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const TypewriterTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const allLines = [
    "[    0.000000] Linux version 6.8.0-ben-arch (root@cavite) (gcc version 12.2.0)",
    "[    0.000123] Command line: BOOT_IMAGE=/boot/vmlinuz-ben-os root=UUID=ben-duag-systems ro quiet",
    "[    0.000456] KERNEL: Arch: x86_64, Detected Family: Ben James Duag",
    "[    0.150000] Memory: 64GB available (System Architect Mode enabled)",
    "[    0.200000] SMP: Allowing 32 CPUs, 0 hotplug CPUs",
    "[    0.450000] systemd[1]: Starting Portfolio Service...",
    "[    0.550000] [ OK ] Loading Module: React_NextJS_Core... DONE.",
    "[    0.580000] [ OK ] Loading Module: Java_Backend_Runtime... DONE.",
    "[    0.610000] [ OK ] Loading Module: Python_OSINT_Scripting... DONE.",
    "[    0.650000] [ OK ] Mounted filesystem: /cavite/naic/campus",
    "[    0.700000] [ OK ] Initializing Network Protocols (Cisco/OSPF/VLAN)... CONNECTED.",
    "[    0.750000] [ OK ] Started Human Rights Advocacy Daemon (PAHRA, MentalHealthPH).",
    "[    0.800000] [ OK ] Started Digital Forensics & Vulnerability Scan.",
    "[    0.850000] [ OK ] Checking Database Integrity (PostgreSQL/SQLite/Mongo)... PASS.",
    "[    0.950000] [INFO] Ben James Duag (uid=1000) logged in.",
    "[    1.000000] [INFO] Roles: Architect | DevOps | Advocate | Researcher.",
    "[    1.100000] Welcome to ben.dev.",
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
    <div className="w-full h-64 md:h-80 bg-slate-950 rounded-xl border border-slate-800 p-4 md:p-6 font-mono text-[10px] md:text-xs shadow-2xl overflow-hidden relative group flex flex-col">
      <div className="flex gap-2 mb-4 border-b border-slate-800 pb-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="ml-auto text-[10px] text-slate-600">bash — 80x24</div>
      </div>
      <div className="text-green-400 space-y-1 overflow-y-auto font-medium tracking-tight font-mono h-full">
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
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.getElementsByClassName("card-hover-effect");
      for (const card of cards) {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("benjamesduag.edu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen relative bg-slate-50 dark:bg-slate-950 transition-colors duration-500 selection:bg-cyan-500/30">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent" />
      </div>

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-lg px-6 py-3 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-bold text-lg tracking-tight font-mono"
        >
          ben<span className="text-cyan-500">.dev</span>
        </motion.div>
        
        <div className="flex items-center gap-2 md:gap-6 text-sm font-medium">
          <Link href="#about" className="hidden md:block hover:text-cyan-500 transition-colors">About</Link>
          <Link href="#projects" className="hidden md:block hover:text-cyan-500 transition-colors">Works</Link>
          <div className="hidden md:block h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2" />
          <div className="flex gap-3">
            <a href="https://github.com/Meseten" target="_blank" className="hover:text-cyan-500 transition-colors"><Github size={18}/></a>
            <a href="https://www.linkedin.com/in/ben-james-duag/" target="_blank" className="hover:text-blue-500 transition-colors"><Linkedin size={18}/></a>
            <a href="https://www.facebook.com/kadashiga" target="_blank" className="hover:text-blue-600 transition-colors"><Facebook size={18}/></a>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2 md:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              System Architect & Developer
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1]">
              ben<span className="text-cyan-500">.dev</span>
            </h1>

            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-lg leading-relaxed font-medium">
              Merging <span className="font-bold text-slate-900 dark:text-white">Computer Science</span> with Social Advocacy. 
              I architect resilient sociotechnical systems in <span className="text-cyan-600 dark:text-cyan-400">Cavite, PH</span>, focusing on transparency, security, and digital democracy.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="#projects">
                <button className="px-6 py-3 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black font-bold hover:scale-105 transition-transform shadow-xl shadow-cyan-500/20">
                  View Portfolio
                </button>
              </Link>
              <Link href="https://facebook.com/kadashiga" target="_blank">
                <button className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-semibold">
                  Contact Me
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 md:order-2 w-full"
          >
            <TypewriterTerminal />
          </motion.div>

        </div>
      </section>

      <section id="about" className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-full">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/50 transition-colors"
          >
            <div className="absolute right-0 top-0 h-32 w-32 bg-cyan-500/10 rounded-bl-full blur-2xl transition-all group-hover:bg-cyan-500/20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-2">
                Ben James Duag
              </h2>
              <div className="flex gap-2 mb-6">
                <span className="px-2 py-1 bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-mono rounded font-bold">System Architect</span>
                <span className="px-2 py-1 bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-mono rounded font-bold">DevOps</span>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed text-sm md:text-base font-medium">
                Evolving from a code-first developer to a System Architect, I bridge the gap between technical infrastructure and social impact. 
                As a Computer Science student at <strong className="text-cyan-600 dark:text-cyan-400">Cavite State University - Naic</strong>, I specialize in Applications Development and Emerging Technologies. 
                My approach is multidisciplinary—fusing digital forensics, systems architecture, and social sciences—to engineer secure, scalable solutions for organizations like <em className="not-italic font-bold text-slate-900 dark:text-slate-100">#MentalHealthPH</em> and <em className="not-italic font-bold text-slate-900 dark:text-slate-100">PAHRA</em>.
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://github.com/Meseten" target="_blank" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-cyan-500 transition-colors"><Github size={20} /></a>
              <a href="https://www.linkedin.com/in/ben-james-duag/" target="_blank" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 flex flex-col justify-center"
          >
            <GraduationCap className="text-cyan-500 mb-3" size={32} />
            <h3 className="font-bold text-lg">Education</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">BS Computer Science</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Cavite State University (2021-Present)</p>
          </motion.div>

          <motion.div 
             whileHover={{ scale: 0.98 }}
             className="md:col-span-1 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-cyan-600 to-blue-700 text-white p-6 flex flex-col justify-between shadow-lg shadow-cyan-900/20"
          >
            <MapPin size={32} />
            <div>
              <h3 className="font-bold text-xl">Cavite, PH</h3>
              <p className="text-cyan-100 text-sm">Naic & Maragondon</p>
            </div>
          </motion.div>

          <div className="md:col-span-2 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 p-6 overflow-hidden flex items-center relative">
            <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-slate-100 dark:from-slate-900 to-transparent z-10" />
            <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-slate-100 dark:from-slate-900 to-transparent z-10" />
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {[...skills, ...skills].map((skill, i) => (
                <span key={i} className="text-lg font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      <section id="experience" className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 text-slate-900 dark:text-white">
          <Briefcase className="text-cyan-500" /> Professional & Volunteer History
        </h2>
        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 space-y-12">
          {experience.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-50 dark:border-slate-950" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
                <span className="text-sm font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded w-fit mt-1 sm:mt-0">{item.date}</span>
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                {item.icon} {item.org}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 dark:text-white mb-6">Featured <span className="text-cyan-500">Works</span></h2>
          <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-lg text-center font-medium">
            A selection of projects focusing on sociotechnical systems, government efficiency, and resource optimization.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`card-hover-effect group relative rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 p-8 overflow-hidden transition-all hover:border-cyan-500/50 ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                   style={{
                     background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(6, 182, 212, 0.06), transparent 40%)`
                   }}
              />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-cyan-500 transition-colors text-slate-900 dark:text-white">{project.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">{project.role}</p>
                    {project.subRoles && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed border-l-2 border-slate-300 dark:border-slate-700 pl-3 italic">
                        {project.subRoles}
                      </p>
                    )}
                  </div>

                  {project.link !== "#" ? (
                    <Link href={project.link} target="_blank" className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors" aria-label="View Project">
                      <ArrowUpRight size={20} className="text-slate-900 dark:text-white" />
                    </Link>
                  ) : (
                    <div className="p-2 rounded-full border border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed" title="Internal/Local Project">
                      <Lock size={20} className="text-slate-400" />
                    </div>
                  )}

                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                  {project.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <footer className="py-20 px-4 text-center border-t border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950">
        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Let's Build Something Impactful.</h2>
        
        <button 
          onClick={handleCopy}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all mx-auto mb-12 shadow-sm hover:shadow-cyan-500/20"
        >
          <Mail className="text-slate-500" />
          <span className="font-mono text-sm text-slate-700 dark:text-slate-200">benjamesduag.edu@gmail.com</span>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
          {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-slate-400 group-hover:text-cyan-500" />}
        </button>

        <div className="text-slate-500 text-sm">
          <p className="mb-2 font-semibold text-slate-700 dark:text-slate-400">Ben James Jocson Duag</p>
          <p>&copy; {new Date().getFullYear()} Ben.dev. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}