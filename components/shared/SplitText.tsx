"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface SplitTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

export default function SplitText({
  text,
  as: Tag = "h1",
  className = "",
  staggerDelay = 0.03,
  delay = 0,
}: SplitTextProps) {
  const prefersReduced = usePrefersReducedMotion();

  if (prefersReduced) return <Tag className={className}>{text}</Tag>;

  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden" style={{ marginRight: "0.25em" }}>
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: delay + wi * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
