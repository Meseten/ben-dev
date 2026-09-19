"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Facebook,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sprout,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import BoltDockItem from "@/components/BoltDockItem";
import Dock, { type DockEntry } from "@/components/Dock";
import { useContact } from "@/components/ContactModalHost";
import { SITE } from "@/data/resume";

export default function SiteDock() {
  const { resolvedTheme, setTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState<"sun" | "moon">("moon");
  const { open } = useContact();

  // Sync theme icon after hydration so SSR markup matches (avoids hydration mismatch)
  useEffect(() => {
    const id = window.requestAnimationFrame(() =>
      setThemeIcon(resolvedTheme === "dark" ? "sun" : "moon")
    );
    return () => cancelAnimationFrame(id);
  }, [resolvedTheme]);

  const dockItems: DockEntry[] = [
    { label: "About", tooltip: "Who Ben is and what he works on", icon: <Users size={20} />, href: "#about" },
    { label: "Experience", tooltip: "Work history, internships, and advocacies", icon: <Briefcase size={20} />, href: "#experience" },
    { label: "Projects", tooltip: "Every build with its full case study", icon: <FolderGit2 size={20} />, href: "#projects" },
    { label: "krna", tooltip: "The krna optimization package, live on PyPI", icon: <Sprout size={20} />, href: "#krna" },
    { label: "Contact", tooltip: "Email Ben directly, every message gets a reply", icon: <Mail size={20} />, href: "#contact" },
    { label: "GitHub", tooltip: "Open-source code and repositories", icon: <Github size={20} />, href: SITE.github, external: true },
    { label: "LinkedIn", tooltip: "Professional profile and recommendations", icon: <Linkedin size={20} />, href: SITE.linkedin, external: true },
    { label: "Facebook", tooltip: "Social profile and community work", icon: <Facebook size={20} />, href: SITE.facebook, external: true },
    {
      label: "Toggle theme",
      icon: (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={themeIcon}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {themeIcon === "sun" ? <Sun size={20} /> : <Moon size={20} />}
          </motion.span>
        </AnimatePresence>
      ),
      onClick: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
    },
  ];

  return <Dock items={dockItems} leading={<BoltDockItem onOpen={() => open()} />} />;
}
