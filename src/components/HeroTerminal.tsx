"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "$ whoami",
  "ben4dev | Ben James Duag | Cavite, PH",
  "$ cat stack.txt",
  "Next.js | TypeScript | Python | Tauri | Firebase | SQLite",
  "$ pip install krna",
  "Collecting krna",
  "  Downloading krna-1.0.2-py3-none-any.whl (39.6 kB)",
  "Installing collected packages: krna",
  "Successfully installed krna-1.0.2  ✓ [pypi.org/project/krna]",
  "$ krna status",
  "SKROA optimizer ready | MO-SKROA armed | tuner attached",
  "$ ls ~/clients",
  "LGU Naic | AGWA Water Services | B&V Software Solutions",
  "$ systemctl --user start pasada gallry agwa scheduler",
  "[  OK  ] Started pasada.service      | LGU franchise registry",
  "[  OK  ] Started gallry.service      | Android gallery, on-device AI",
  "[  OK  ] Started agwa.service        | water-utility platform",
  "[  OK  ] Started scheduler.service   | CPU scheduling visualizer",
  "$ sudo systemctl start advocacy",
  "[  OK  ] BetterGov | PAHRA | MentalHealthPH | Pinas Forward",
  "$ npx serve ~/career --port 2027",
  "  → BS Computer Science, CvSU Naic, graduating Oct 2027",
  "  → open to internships, junior roles, and freelance builds",
  "$ █",
];

export default function HeroTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setLines(BOOT_LINES);
      setDone(true);
      return;
    }

    let lineIdx = 0;
    let charIdx = 0;
    let current = "";

    const timer = setInterval(() => {
      if (lineIdx >= BOOT_LINES.length) {
        clearInterval(timer);
        setDone(true);
        return;
      }
      const target = BOOT_LINES[lineIdx];
      if (charIdx < target.length) {
        current += target[charIdx++];
        setLines((prev) => {
          const next = [...prev];
          next[lineIdx] = current;
          return next;
        });
      } else {
        lineIdx++;
        charIdx = 0;
        current = "";
      }
    }, 18);

    return () => clearInterval(timer);
  }, [reduce]);

  // Auto-scroll to bottom as lines fill
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const typing = !done;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.96, rotateY: 12 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="w-full"
    >
      <div className="w-full h-[360px] md:h-[420px] bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden relative flex flex-col hover:border-cyan-500/30 transition-colors duration-500">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800/80 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500/90" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <span className="w-3 h-3 rounded-full bg-green-500/90" />
          <span className="ml-auto text-[10px] font-mono text-slate-600">
            ben4dev | zsh | 80×24
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          aria-label="Terminal boot sequence for ben4dev"
          className="flex-1 overflow-y-auto p-4 md:p-5 font-mono text-[10px] md:text-xs leading-relaxed text-green-400 scrollbar-hide"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={i === lines.length - 1 && typing ? "after:content-['▌'] after:animate-pulse" : ""}
            >
              {line || "\u00A0"}
            </div>
          ))}
          {lines.length === 0 && (
            <div className="after:content-['▌'] after:animate-pulse">&nbsp;</div>
          )}
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-950 to-transparent"
        />
      </div>
    </motion.div>
  );
}
