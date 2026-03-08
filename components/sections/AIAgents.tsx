"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Users, Target, Repeat, UserPlus, BarChart3, Database } from "lucide-react";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { AI_AGENTS, EASE_SNAPPY } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Target, Repeat, UserPlus, BarChart3, Database,
};

const CARD_COLORS = [
  { icon: "#3B82F6", bg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.12)", glow: "rgba(59,130,246,0.2)" },
  { icon: "#06B6D4", bg: "rgba(6,182,212,0.06)", border: "rgba(6,182,212,0.12)", glow: "rgba(6,182,212,0.2)" },
  { icon: "#8B5CF6", bg: "rgba(139,92,246,0.06)", border: "rgba(139,92,246,0.12)", glow: "rgba(139,92,246,0.2)" },
  { icon: "#10B981", bg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.12)", glow: "rgba(16,185,129,0.2)" },
  { icon: "#F59E0B", bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.12)", glow: "rgba(245,158,11,0.2)" },
  { icon: "#EF4444", bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.12)", glow: "rgba(239,68,68,0.2)" },
];

export default function AIAgents() {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="ai-agents"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.04) 0%, transparent 60%)" }} />

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
            style={{ background: "rgba(139,92,246,0.08)", color: "#8B5CF6", border: "1px solid rgba(139,92,246,0.15)", fontFamily: "var(--font-mono)" }}
          >
            AI Agents
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl lg:text-6xl">{AI_AGENTS.heading}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-base text-text-body md:text-lg">{AI_AGENTS.subheading}</p>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        {isMobile ? (
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
            {AI_AGENTS.cards.map((card, i) => (
              <AgentCard key={card.title} card={card} i={i} prefersReduced={prefersReduced} mobile />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AI_AGENTS.cards.map((card, i) => (
              <AgentCard key={card.title} card={card} i={i} prefersReduced={prefersReduced} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function AgentCard({
  card,
  i,
  prefersReduced,
  mobile = false,
}: {
  card: (typeof AI_AGENTS.cards)[number];
  i: number;
  prefersReduced: boolean;
  mobile?: boolean;
}) {
  const Icon = ICONS[card.icon];
  const color = CARD_COLORS[i];

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 ${mobile ? "min-w-[280px] snap-center flex-shrink-0" : ""}`}
      style={{ borderColor: color.border, background: "var(--card)" }}
      initial={prefersReduced ? {} : { opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_SNAPPY }}
      whileHover={prefersReduced ? {} : {
        borderColor: color.icon,
        boxShadow: `0 0 40px ${color.glow}, 0 8px 32px rgba(0,0,0,0.3)`,
        y: -6,
      }}
    >
      {/* Corner glow on hover */}
      <div
        className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle, ${color.glow}, transparent)` }}
      />

      {/* Animated border shimmer */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `conic-gradient(from var(--border-angle, 0deg), ${color.icon}20, transparent, ${color.icon}20)`,
          animation: "rotateBorder 4s linear infinite",
          zIndex: -1,
          margin: -1,
        }}
      />

      <div className="relative">
        {/* Icon with pulse ring */}
        <div className="relative mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: color.bg }}>
            {Icon && <span style={{ color: color.icon }}><Icon className="h-6 w-6" /></span>}
          </div>
          {/* Status dot */}
          <motion.div
            className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
            style={{ backgroundColor: color.icon }}
            animate={prefersReduced ? {} : { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          />
        </div>

        <h3 className="mb-2 text-lg font-bold text-white">{card.title}</h3>
        <p className="text-sm leading-relaxed text-text-body">{card.description}</p>
      </div>
    </motion.div>
  );
}
