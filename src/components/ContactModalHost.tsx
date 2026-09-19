"use client";

import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import ContactModal from "@/components/ContactModal";

const ContactContext = createContext<{
  open: (projectTitle?: string) => void;
}>({ open: () => {} });

export const useContact = () => useContext(ContactContext);

export default function ContactModalHost({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState<string | undefined>(undefined);
  const value = useMemo(
    () => ({
      open: (title?: string) => {
        setProjectTitle(title);
        setOpen(true);
      },
    }),
    []
  );

  return (
    <ContactContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <ContactModal
            isOpen={isOpen}
            projectTitle={projectTitle}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </ContactContext.Provider>
  );
}
