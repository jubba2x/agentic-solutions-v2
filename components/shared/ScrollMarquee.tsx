"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface ScrollMarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function ScrollMarquee({ text, speed = -25, className = "" }: ScrollMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `${speed}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const repeated = `${text} \u00B7 `.repeat(6);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden py-8 md:py-12 ${className}`}
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        className="whitespace-nowrap"
        style={{
          x: prefersReduced ? 0 : x,
          opacity: prefersReduced ? 0.15 : opacity,
          fontSize: "clamp(3rem, 10vw, 10rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(123,181,214,0.15)",
          lineHeight: 1,
          userSelect: "none",
        }}
      >
        {repeated}
      </motion.div>
    </div>
  );
}
