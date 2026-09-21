"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * The original boot log from the first deployed hero ("ben-os", the dmesg-style
 * kernel boot), restored as requested. The layout shell around it is the current
 * bamboo one; only the typed content is the original.
 */
const BOOT_LINES = [
  "[ 0.000000] Linux version 6.9.0-ben-arch (root@cavite) (gcc version 13.2.0)",
  "[ 0.000123] Command line: BOOT_IMAGE=/boot/vmlinuz-ben-os root=UUID=ben-duag-systems ro quiet",
  "[ 0.000456] KERNEL: Arch: x86_64, Detected Family: Ben James Duag",
  "[ 0.150000] Memory: 64GB available (System Architect Mode enabled)",
  "[ 0.200000] SMP: Allowing 32 CPUs, 0 hotplug CPUs",
  "[ 0.450000] systemd[1]: Starting Portfolio Service...",
  "[ 0.550000] [ OK ] Loading Module: React_NextJS_Core... DONE.",
  "[ 0.580000] [ OK ] Loading Module: Java_Backend_Runtime... DONE.",
  "[ 0.600000] [ OK ] Loading Module: Local_LLM_Inference (Ollama 3/Mistral)... DONE.",
  "[ 0.620000] [ OK ] Loading Module: Python_OSINT_Scripting... DONE.",
  "[ 0.650000] [ OK ] Mounted filesystem: /cavite/naic/campus",
  "[ 0.700000] [ OK ] Initializing Sociotechnical Protocols (AGWA/NextQue)... CONNECTED.",
  "[ 0.750000] [ OK ] Started Advocacy Daemon (PAHRA, MentalHealthPH, BetterGov).",
  "[ 0.800000] [ OK ] Started Digital Forensics & Vulnerability Scan.",
  "[ 0.850000] [ OK ] Checking Database Integrity (Firebase/Firestore/SQLite)... PASS.",
  "[ 0.950000] [INFO] Ben James Duag (uid=1000) logged in.",
  "[ 1.000000] [INFO] Roles: Architect | DevOps | Advocate | Researcher.",
  "[ 1.100000] Welcome to ben4dev.",
  "> executing main()..._",
];

/**
 * Hero terminal, bamboo skin: typing boot log, traffic-light title bar,
 * bottom fade. Content is the original ben-os boot log.
 */
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
    }, 10);

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
      <div
        className={`w-full h-[360px] md:h-[420px] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col transition-colors duration-500 ${
          "bg-ink dark:bg-ink-card border border-ink-light/20 dark:border-ink-light/10 hover:border-bamboo-400/40"
        }`}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-light/10 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500/90" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <span className="w-3 h-3 rounded-full bg-bamboo-400" />
          <span className="ml-auto text-[10px] font-mono text-ink-faint">
            ben-os — 80×24
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          aria-label="Terminal boot sequence for Ben James Duag"
          className="flex-1 overflow-y-auto p-4 md:p-5 font-mono text-[10px] md:text-xs leading-relaxed text-bamboo-400 scrollbar-hide"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={`break-all ${i === lines.length - 1 && typing ? "after:content-['▌'] after:animate-pulse" : ""}`}
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink dark:from-ink-card to-transparent"
        />
      </div>
    </motion.div>
  );
}
