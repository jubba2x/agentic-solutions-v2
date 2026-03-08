"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { FAQ as FAQ_DATA, EASE_SNAPPY } from "@/lib/constants";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="faq" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 60%, rgba(59,130,246,0.03) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-3xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(59,130,246,0.08)", color: "var(--accent)", border: "1px solid rgba(59,130,246,0.15)", fontFamily: "var(--font-mono)" }}>
            FAQ
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">{FAQ_DATA.heading}</h2>
        </motion.div>

        <div className="space-y-2">
          {FAQ_DATA.items.map((item, i) => {
            const isOpen = activeIndex === i;
            return (
              <motion.div
                key={i}
                className="overflow-hidden rounded-xl border transition-all duration-300"
                style={{
                  borderColor: isOpen ? "rgba(59,130,246,0.2)" : "var(--border)",
                  background: isOpen ? "rgba(59,130,246,0.03)" : "var(--card)",
                }}
                initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_SNAPPY }}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:py-6"
                >
                  <span className="text-base font-medium text-white md:text-lg">{item.question}</span>
                  <motion.span
                    className="flex-shrink-0"
                    style={{ color: isOpen ? "var(--accent)" : "var(--text-muted)" }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                      transition={{ height: { duration: 0.3, ease: EASE_SNAPPY }, opacity: { duration: 0.2 } }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-text-body md:pb-6 md:text-base">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
