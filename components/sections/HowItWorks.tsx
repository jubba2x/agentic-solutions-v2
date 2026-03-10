"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { HOW_IT_WORKS } from "@/lib/constants";

const STEP_COLORS = ["#7BB5D6", "#B4A0D8", "#5A9CC5", "#6BC5D4"];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end center"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotPosition = useTransform(scrollYProgress, [0, 1], ["0%", "95%"]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-alt)" }}
    >
      <div className="relative mx-auto max-w-4xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase"
            style={{ background: "rgba(123,181,214,0.06)", color: "#7BB5D6", border: "1px solid rgba(123,181,214,0.12)", fontFamily: "var(--font-mono)" }}
            initial={prefersReduced ? {} : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            Process
          </motion.span>
          <motion.h2
            className="mt-6 text-3xl font-bold md:text-5xl lg:text-6xl"
            initial={prefersReduced ? {} : { opacity: 0, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {HOW_IT_WORKS.heading}
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px md:left-10">
            <div className="absolute inset-0" style={{ background: "rgba(123,181,214,0.06)" }} />
            {!prefersReduced && (
              <>
                <motion.div
                  className="absolute inset-x-0 top-0 origin-top"
                  style={{
                    scaleY: pathLength,
                    background: "linear-gradient(180deg, #7BB5D6, #B4A0D8, #5A9CC5, #6BC5D4)",
                    height: "100%",
                    width: 2,
                  }}
                />
                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 h-3 w-3 rounded-full"
                  style={{
                    top: dotPosition,
                    backgroundColor: "var(--accent)",
                    boxShadow: "0 0 12px rgba(123,181,214,0.5), 0 0 24px rgba(123,181,214,0.2)",
                  }}
                />
              </>
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
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="absolute left-3.5 top-1 flex h-6 w-6 items-center justify-center rounded-full md:left-7 md:h-7 md:w-7"
                  style={{
                    background: STEP_COLORS[i],
                    boxShadow: `0 0 15px ${STEP_COLORS[i]}40`,
                  }}
                  whileInView={prefersReduced ? {} : { scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <span className="text-[10px] font-bold text-white">{step.number}</span>
                </motion.div>

                <span
                  className="pointer-events-none absolute -left-4 -top-8 select-none text-[6rem] font-bold leading-none md:-left-2 md:-top-10 md:text-[8rem]"
                  style={{ opacity: 0.03, color: STEP_COLORS[i] }}
                >
                  {step.number}
                </span>

                <div className="rounded-2xl border p-6 transition-all duration-300 hover:border-[rgba(123,181,214,0.2)]" style={{ borderColor: "var(--border)", background: "var(--card)" }}>
                  <div className="mb-3 flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                    <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: `${STEP_COLORS[i]}10`, color: STEP_COLORS[i], fontFamily: "var(--font-mono)" }}>
                      {step.subtitle}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed md:text-base" style={{ color: "var(--text-body)" }}>{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
