"use client";

import { motion } from "framer-motion";
import { TRUSTED_BY } from "@/lib/constants";

export default function TrustedBy() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden" style={{ background: "var(--bg-alt)" }}>
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(139,92,246,0.15), transparent)" }} />

      <div className="mx-auto max-w-6xl px-4">
        <motion.p
          className="mb-8 text-center text-xs tracking-[0.3em] uppercase"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {TRUSTED_BY.heading}
        </motion.p>

        {/* Scrolling logo marquee */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20" style={{ background: "linear-gradient(90deg, var(--bg-alt), transparent)" }} />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20" style={{ background: "linear-gradient(-90deg, var(--bg-alt), transparent)" }} />

          <motion.div
            className="flex gap-16 items-center"
            animate={{ x: [0, -600] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...TRUSTED_BY.logos, ...TRUSTED_BY.logos, ...TRUSTED_BY.logos].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 rounded-lg border px-8 py-4"
                style={{
                  borderColor: "rgba(255,255,255,0.04)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span className="text-sm font-medium whitespace-nowrap" style={{ color: "var(--text-muted)" }}>
                  {name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(139,92,246,0.15), transparent)" }} />
    </section>
  );
}
