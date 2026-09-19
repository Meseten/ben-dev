"use client";

import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import ResumeModal from "@/components/ResumeModal";

const ResumeContext = createContext<{ open: () => void }>({ open: () => {} });

export const useResume = () => useContext(ResumeContext);

export default function ResumeModalHost({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const value = useMemo(() => ({ open: () => setOpen(true) }), []);

  return (
    <ResumeContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && <ResumeModal isOpen={isOpen} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </ResumeContext.Provider>
  );
}
