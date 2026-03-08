"use client";

import { motion } from "framer-motion";
import { Shield, Zap } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { GUARANTEE, EASE_SNAPPY } from "@/lib/constants";

const GUARANTEE_ICONS = [Shield, Zap];
const GUARANTEE_COLORS = ["#3B82F6", "#06B6D4"];

export default function Guarantee() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="guarantee" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--bg-section)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.03) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-4xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(59,130,246,0.08)", color: "var(--accent)", border: "1px solid rgba(59,130,246,0.15)", fontFamily: "var(--font-mono)" }}>
            Guarantees
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">{GUARANTEE.heading}</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {GUARANTEE.guarantees.map((g, i) => {
            const Icon = GUARANTEE_ICONS[i];
            const color = GUARANTEE_COLORS[i];
            return (
              <motion.div
                key={g.number}
                className="group relative overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-500"
                style={{ borderColor: `${color}20`, background: "var(--card)" }}
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: EASE_SNAPPY }}
                whileHover={prefersReduced ? {} : { borderColor: `${color}40`, boxShadow: `0 0 40px ${color}15` }}
              >
                <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${color}10` }}>
                  <span style={{ color }}><Icon className="h-6 w-6" /></span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">{g.title}</h3>

                <p className="mb-4 text-base leading-relaxed text-text-body">
                  {g.body.split(g.highlight).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <strong className="text-white" style={{ textShadow: `0 0 20px ${color}40` }}>{g.highlight}</strong>
                      )}
                    </span>
                  ))}
                </p>

                {"conditions" in g && g.conditions && (
                  <p className="text-xs leading-relaxed text-text-muted">{g.conditions}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
