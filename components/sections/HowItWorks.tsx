"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { HOW_IT_WORKS, EASE_SNAPPY } from "@/lib/constants";

const STEP_COLORS = ["#3B82F6", "#06B6D4", "#10B981", "#8B5CF6"];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-section)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.03) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-4xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(16,185,129,0.08)", color: "#10B981", border: "1px solid rgba(16,185,129,0.15)", fontFamily: "var(--font-mono)" }}>
            Process
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl lg:text-6xl">{HOW_IT_WORKS.heading}</h2>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px md:left-10">
            <div className="absolute inset-0" style={{ background: "rgba(59,130,246,0.08)" }} />
            {!prefersReduced && (
              <motion.div
                className="absolute inset-x-0 top-0 origin-top"
                style={{
                  scaleY: pathLength,
                  background: "linear-gradient(180deg, #3B82F6, #06B6D4, #10B981, #8B5CF6)",
                  height: "100%",
                  width: 2,
                }}
              />
            )}
          </div>

          <div className="space-y-16">
            {HOW_IT_WORKS.steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pl-16 md:pl-24"
                initial={prefersReduced ? {} : { opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_SNAPPY }}
              >
                {/* Step node */}
                <div
                  className="absolute left-3.5 top-1 flex h-6 w-6 items-center justify-center rounded-full md:left-7 md:h-7 md:w-7"
                  style={{
                    background: STEP_COLORS[i],
                    boxShadow: `0 0 20px ${STEP_COLORS[i]}50, 0 0 40px ${STEP_COLORS[i]}20`,
                  }}
                >
                  <span className="text-[10px] font-bold text-white">{step.number}</span>
                </div>

                {/* Watermark */}
                <span
                  className="pointer-events-none absolute -left-4 -top-8 select-none text-[6rem] font-bold leading-none md:-left-2 md:-top-10 md:text-[8rem]"
                  style={{ opacity: 0.03, fontFamily: "var(--font-heading)", color: STEP_COLORS[i] }}
                >
                  {step.number}
                </span>

                <div className="rounded-2xl border p-6 transition-all duration-300 hover:border-accent-border" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                    <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: `${STEP_COLORS[i]}12`, color: STEP_COLORS[i], fontFamily: "var(--font-mono)" }}>
                      {step.subtitle}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-text-body md:text-base">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
