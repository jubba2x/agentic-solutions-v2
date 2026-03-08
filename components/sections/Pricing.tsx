"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { PRICING, EASE_SNAPPY, BOOKING_URL } from "@/lib/constants";

export default function Pricing() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 50%)" }} />

      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-14 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(139,92,246,0.08)", color: "#8B5CF6", border: "1px solid rgba(139,92,246,0.15)", fontFamily: "var(--font-mono)" }}>
            Pricing
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">{PRICING.heading}</h2>
          <p className="mt-4 mx-auto max-w-xl text-sm text-text-body md:text-base">{PRICING.foundingNote}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 md:items-start">
          {PRICING.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-500 ${tier.featured ? "md:scale-105" : ""}`}
              style={{
                borderColor: tier.featured ? "transparent" : "var(--border)",
                background: "var(--card)",
              }}
              initial={prefersReduced ? {} : { opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: tier.featured ? 1.05 : 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_SNAPPY }}
              whileHover={prefersReduced ? {} : {
                y: -8,
                boxShadow: tier.featured
                  ? "0 0 60px rgba(59,130,246,0.2), 0 20px 60px rgba(0,0,0,0.4)"
                  : "0 0 40px rgba(59,130,246,0.1), 0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              {/* Animated gradient border on featured */}
              {tier.featured && (
                <div
                  className="pointer-events-none absolute -inset-[1px] -z-10 rounded-2xl"
                  style={{
                    background: "conic-gradient(from var(--border-angle, 0deg), var(--accent), var(--accent-secondary), var(--accent-tertiary), var(--accent))",
                    animation: "rotateBorder 3s linear infinite",
                  }}
                />
              )}

              {/* RECOMMENDED badge */}
              {tier.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold tracking-widest text-white"
                  style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-tertiary))", fontFamily: "var(--font-mono)" }}
                >
                  RECOMMENDED
                </span>
              )}

              <h3 className="mb-2 text-lg font-bold text-white md:text-xl">{tier.name}</h3>
              <p className="mb-4 text-sm text-text-body">{tier.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white md:text-5xl">${tier.price.toLocaleString()}</span>
                <span className="ml-1 text-sm text-text-muted">{tier.period}</span>
                {"commitment" in tier && <p className="mt-1 text-xs text-text-muted">{tier.commitment}</p>}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-text-body">
                    <span style={{ color: tier.featured ? "var(--accent)" : "var(--accent-secondary)" }}>
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-xl py-3.5 text-center text-sm font-semibold transition-all duration-300 ${
                  tier.featured
                    ? "text-white hover:shadow-[0_0_30px_var(--accent-glow)]"
                    : "border text-white hover:bg-white/5"
                }`}
                style={tier.featured ? {
                  background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
                  boxShadow: "0 0 20px var(--accent-glow)",
                } : {
                  borderColor: "var(--accent-border)",
                }}
              >
                {tier.cta}
              </a>

              {tier.note && (
                <p className="mt-4 text-center text-xs text-text-muted">{tier.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
