"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { PROOF, EASE_SNAPPY } from "@/lib/constants";

const STUDY_COLORS = ["#3B82F6", "#06B6D4", "#10B981"];

export default function Proof() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="proof" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--bg-alt)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(6,182,212,0.03) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-5xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(6,182,212,0.08)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.15)", fontFamily: "var(--font-mono)" }}>
            Case Studies
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">{PROOF.heading}</h2>
        </motion.div>

        <div className="space-y-8">
          {PROOF.caseStudies.map((study, i) => {
            const color = STUDY_COLORS[i];
            return (
              <motion.div
                key={study.number}
                className="group relative overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-500"
                style={{ borderColor: `${color}20`, background: "var(--card)" }}
                initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: EASE_SNAPPY }}
                whileHover={prefersReduced ? {} : { borderColor: `${color}40` }}
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${color}, ${color}40, transparent)` }} />

                {/* Watermark */}
                <span className="pointer-events-none absolute right-6 top-4 select-none text-[7rem] font-bold leading-none md:right-10 md:text-[10rem]" style={{ opacity: 0.02, fontFamily: "var(--font-heading)", color }}>
                  {study.number}
                </span>

                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full px-3 py-1 text-[10px] font-bold tracking-wider" style={{ background: `${color}12`, color, fontFamily: "var(--font-mono)" }}>
                      CASE STUDY {study.number}
                    </span>
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">{study.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-text-body md:text-base">{study.narrative}</p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border p-4 transition-all duration-300"
                        style={{ borderColor: `${color}15`, background: `${color}05` }}
                      >
                        {"value" in metric ? (
                          <AnimatedCounter
                            value={metric.value}
                            prefix={("prefix" in metric ? metric.prefix : "") ?? ""}
                            suffix={("suffix" in metric ? metric.suffix : "") ?? ""}
                            useLocale={metric.value >= 1000}
                            className="text-2xl font-bold text-white md:text-3xl"
                          />
                        ) : (
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-text-muted line-through">{metric.before}</span>
                            <span className="text-xl font-bold text-white">{metric.after}</span>
                          </div>
                        )}
                        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
