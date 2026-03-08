"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import MagneticButton from "@/components/shared/MagneticButton";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { FINAL_CTA, EASE_SNAPPY, BOOKING_URL } from "@/lib/constants";

function PulsingLogo({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mb-12 flex items-center justify-center">
      {/* Outer glow rings */}
      {!reduced && [1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full border"
          style={{
            width: 120 + ring * 60,
            height: 120 + ring * 60,
            borderColor: `rgba(59,130,246,${0.15 - ring * 0.04})`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + ring * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ring * 0.3,
          }}
        />
      ))}

      {/* Center glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Logo */}
      <motion.div
        animate={reduced ? {} : {
          y: [0, -8, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/logo.png"
          alt="Agentic Solutions"
          width={180}
          height={72}
          className="relative h-16 w-auto md:h-20"
        />
      </motion.div>
    </div>
  );
}

export default function FinalCTA() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <section
      id="final-cta"
      className="relative py-28 md:py-36 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Gradient mesh */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(6,182,212,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 text-center">
        {/* Animated logo */}
        <PulsingLogo reduced={prefersReduced} />

        <motion.h2
          className="mb-6 text-3xl font-bold md:text-5xl lg:text-6xl"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          {FINAL_CTA.heading}
        </motion.h2>

        <motion.p
          className="mb-4 text-base leading-relaxed text-text-body md:text-lg"
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_SNAPPY }}
        >
          {FINAL_CTA.body}
        </motion.p>

        <motion.p
          className="mb-10 text-sm font-medium md:text-base"
          style={{ color: "var(--accent)" }}
          initial={prefersReduced ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE_SNAPPY }}
        >
          {FINAL_CTA.urgency}
        </motion.p>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6, ease: EASE_SNAPPY }}
        >
          <MagneticButton href={BOOKING_URL} variant="primary" strength={0.3}>
            {FINAL_CTA.cta}
          </MagneticButton>
        </motion.div>

        <motion.p
          className="mt-5 text-xs text-text-muted md:text-sm"
          initial={prefersReduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          {FINAL_CTA.microCopy}
        </motion.p>
      </div>
    </section>
  );
}
