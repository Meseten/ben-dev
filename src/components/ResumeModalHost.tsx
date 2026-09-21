"use client";

import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import ResumeModal from "@/components/ResumeModal";

const ResumeContext = createContext<{ open: () => void }>({ open: () => {} });

export const useResume = () => useContext(ResumeContext);

export default function ResumeModalHost({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setOpen(true) }), []);

  // The command palette opens the résumé through this window event so it
  // does not need the React context (it renders outside the host tree).
  useEffect(() => {
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("ben4dev:resume-open", onOpenEvent);
    return () => window.removeEventListener("ben4dev:resume-open", onOpenEvent);
  }, []);

  return (
    <ResumeContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && <ResumeModal isOpen={isOpen} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </ResumeContext.Provider>
  );
}
