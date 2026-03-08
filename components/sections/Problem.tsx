"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, Layers, TrendingDown, GitBranch } from "lucide-react";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { PROBLEM, EASE_SNAPPY } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock, Layers, TrendingDown, GitBranch,
};

const CARD_ACCENTS = [
  { gradient: "from-red-500/10 to-red-900/5", border: "rgba(239,68,68,0.2)", icon: "#ef4444", glow: "rgba(239,68,68,0.15)" },
  { gradient: "from-amber-500/10 to-amber-900/5", border: "rgba(245,158,11,0.2)", icon: "#f59e0b", glow: "rgba(245,158,11,0.15)" },
  { gradient: "from-blue-500/10 to-blue-900/5", border: "rgba(59,130,246,0.2)", icon: "#3b82f6", glow: "rgba(59,130,246,0.15)" },
  { gradient: "from-purple-500/10 to-purple-900/5", border: "rgba(168,85,247,0.2)", icon: "#a855f7", glow: "rgba(168,85,247,0.15)" },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Gradient mesh background */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          y: prefersReduced ? 0 : bgY,
          background: "radial-gradient(ellipse at 20% 30%, rgba(239,68,68,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(245,158,11,0.03) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase"
            style={{ background: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.15)", fontFamily: "var(--font-mono)" }}
          >
            The Problem
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl lg:text-6xl">
            {PROBLEM.heading}
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {PROBLEM.cards.map((card, i) => {
            const Icon = ICONS[card.icon];
            const accent = CARD_ACCENTS[i];
            return (
              <motion.div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border p-6 md:p-8 transition-all duration-500"
                style={{ borderColor: accent.border, background: "var(--card)" }}
                initial={prefersReduced ? {} : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_SNAPPY }}
                whileHover={prefersReduced ? {} : {
                  borderColor: accent.icon,
                  boxShadow: `0 0 50px ${accent.glow}, 0 20px 60px rgba(0,0,0,0.4)`,
                  y: -4,
                }}
              >
                {/* Hover gradient reveal */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${accent.glow}, transparent 70%)` }}
                />

                <div className="relative">
                  {Icon && (
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${accent.icon}15` }}>
                      <span style={{ color: accent.icon }}><Icon className="h-6 w-6" /></span>
                    </div>
                  )}
                  <h3 className="mb-3 text-xl font-bold text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-text-body md:text-base">
                    {card.body.split(card.highlight).map((part, j, arr) => (
                      <span key={j}>
                        {part}
                        {j < arr.length - 1 && (
                          <span className="font-semibold text-white" style={{ textShadow: `0 0 20px ${accent.glow}` }}>
                            {"counterValue" in card ? (
                              <AnimatedCounter
                                value={Number(card.counterValue)}
                                prefix={"counterPrefix" in card ? String(card.counterPrefix) : ""}
                                suffix={"counterSuffix" in card ? String(card.counterSuffix) : ""}
                              />
                            ) : (
                              card.highlight
                            )}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
