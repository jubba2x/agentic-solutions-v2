"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { VALUE_STACK, EASE_SNAPPY } from "@/lib/constants";

export default function ValueStack() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="value-stack" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.04) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-4xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(59,130,246,0.08)", color: "var(--accent)", border: "1px solid rgba(59,130,246,0.15)", fontFamily: "var(--font-mono)" }}>
            Value Stack
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">{VALUE_STACK.heading}</h2>
        </motion.div>

        {/* Deliverables */}
        <div className="mb-8 space-y-3">
          {VALUE_STACK.deliverables.map((item, i) => (
            <motion.div
              key={item.name}
              className="group flex flex-col gap-3 rounded-xl border p-5 transition-all duration-300 hover:border-accent-border md:flex-row md:items-center md:justify-between md:gap-8 md:p-6"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
              initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_SNAPPY }}
              whileHover={prefersReduced ? {} : { borderColor: "rgba(59,130,246,0.3)", x: 4 }}
            >
              <div className="flex-1">
                <h3 className="mb-1 text-base font-bold text-white md:text-lg">{item.name}</h3>
                <p className="text-sm leading-relaxed text-text-body">{item.description}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <AnimatedCounter
                  value={item.value}
                  prefix="$"
                  suffix={"valueSuffix" in item ? String(item.valueSuffix) : ""}
                  useLocale
                  className="text-lg font-bold md:text-xl"
                  style={{ color: "var(--accent)" }}
                />
                <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>VALUE</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <motion.div
          className="mb-10 rounded-xl border p-4 text-center"
          style={{ borderColor: "rgba(59,130,246,0.2)", background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(6,182,212,0.03))" }}
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_SNAPPY }}
        >
          <p className="text-lg text-text-body md:text-xl">
            Total value:{" "}
            <AnimatedCounter value={VALUE_STACK.totalValue} prefix="$" useLocale className="font-bold text-white" />
          </p>
        </motion.div>

        {/* Divider */}
        <div className="my-10 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)" }} />

        {/* Bonuses */}
        <motion.h3
          className="mb-6 text-center text-xl font-bold md:text-2xl"
          initial={prefersReduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Bonuses Included
        </motion.h3>

        <div className="space-y-3">
          {VALUE_STACK.bonuses.map((bonus, i) => (
            <motion.div
              key={bonus.name}
              className="group flex flex-col gap-3 rounded-xl border p-5 transition-all duration-300 hover:border-accent-secondary/30 md:flex-row md:items-center md:justify-between md:gap-8 md:p-6"
              style={{ borderColor: "rgba(6,182,212,0.1)", background: "var(--card)" }}
              initial={prefersReduced ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_SNAPPY }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4", fontFamily: "var(--font-mono)" }}>BONUS</span>
                  <h4 className="text-base font-bold text-white">{bonus.name}</h4>
                </div>
                <p className="text-sm leading-relaxed text-text-body">{bonus.description}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <AnimatedCounter value={bonus.value} prefix="$" useLocale className="text-lg font-bold" style={{ color: "var(--accent-secondary)" }} />
                <p className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>VALUE</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
