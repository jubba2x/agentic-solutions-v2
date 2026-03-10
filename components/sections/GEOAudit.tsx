"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { GEO_AUDIT, EASE_SNAPPY } from "@/lib/constants";

function TypewriterText({ text, speed = 25, onComplete, trigger }: { text: string; speed?: number; onComplete?: () => void; trigger: boolean }) {
  const [display, setDisplay] = useState("");
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!trigger) return;
    if (prefersReduced) { setDisplay(text); onComplete?.(); return; }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); onComplete?.(); }
    }, speed);
    return () => clearInterval(interval);
  }, [trigger, text, speed, prefersReduced, onComplete]);

  return (
    <span>
      {display}
      {trigger && display.length < text.length && !prefersReduced && (
        <span className="animate-pulse" style={{ color: "var(--accent)" }}>|</span>
      )}
    </span>
  );
}

function ChatMock() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"idle" | "typing" | "thinking" | "results">("idle");

  useEffect(() => {
    if (!isInView || phase !== "idle") return;
    setPhase("typing");
  }, [isInView, phase]);

  const handleTypingComplete = useCallback(() => {
    if (prefersReduced) { setPhase("results"); return; }
    setPhase("thinking");
    setTimeout(() => setPhase("results"), 1200);
  }, [prefersReduced]);

  return (
    <div ref={sectionRef} className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(123,181,214,0.12)", background: "rgba(6,10,16,0.8)" }}>
      <div className="flex items-center gap-2 border-b px-5 py-3" style={{ borderColor: "rgba(123,181,214,0.1)" }}>
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#EF4444" }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#22C55E" }} />
        <span className="ml-3 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>AI Search Engine</span>
      </div>

      <div className="p-5 md:p-6">
        <div className="mb-4 rounded-lg px-4 py-3" style={{ background: "rgba(123,181,214,0.05)", border: "1px solid rgba(123,181,214,0.1)" }}>
          <p className="text-sm" style={{ color: "var(--text-body)" }}>
            <TypewriterText text={GEO_AUDIT.prompt} speed={25} trigger={phase === "typing" || phase === "thinking" || phase === "results"} onComplete={handleTypingComplete} />
          </p>
        </div>

        {phase === "thinking" && (
          <div className="flex items-center gap-2 px-4 py-3">
            {[0, 1, 2].map((i) => (
              <motion.div key={i} className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
            ))}
            <span className="ml-2 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Analyzing...</span>
          </div>
        )}

        {phase === "results" && (
          <motion.div className="space-y-2" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
            {GEO_AUDIT.results.map((result, ri) => (
              <motion.div
                key={result.name}
                className={`rounded-lg px-4 py-3 text-sm ${result.featured ? "font-semibold text-white" : ""}`}
                style={result.featured
                  ? { background: "linear-gradient(135deg, rgba(123,181,214,0.1), rgba(123,181,214,0.08))", border: "1px solid rgba(123,181,214,0.2)", color: "white" }
                  : { background: "rgba(255,255,255,0.02)", color: "var(--text-muted)" }
                }
                variants={prefersReduced ? {} : { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_SNAPPY } } }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: result.featured ? "var(--accent)" : "var(--text-muted)", fontFamily: "var(--font-mono)" }}>#{ri + 1}</span>
                  {result.name}
                  {result.featured && (
                    <motion.span className="ml-auto text-[10px] tracking-wider" style={{ color: "var(--accent-secondary)" }} animate={prefersReduced ? {} : { opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                      FEATURED
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function GEOAudit() {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="geo-audit" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(123,181,214,0.04) 0%, transparent 60%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={prefersReduced ? {} : { x: isMobile ? 0 : -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <ChatMock />
        </motion.div>

        <div>
          <motion.span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase"
            style={{ background: "rgba(123,181,214,0.08)", color: "#7BB5D6", border: "1px solid rgba(123,181,214,0.15)", fontFamily: "var(--font-mono)" }}
            initial={prefersReduced ? {} : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            GEO Audit
          </motion.span>
          <motion.h2
            className="mb-6 mt-4 text-3xl font-bold md:text-5xl"
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_SNAPPY }}
          >
            {GEO_AUDIT.heading}
          </motion.h2>
          <motion.p
            className="text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-body)" }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_SNAPPY }}
          >
            {GEO_AUDIT.body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
