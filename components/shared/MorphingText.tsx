"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

interface MorphingTextProps {
  words: readonly string[];
  interval?: number;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function MorphingText({
  words,
  interval = 3000,
  className = "",
  style,
  delay = 0,
}: MorphingTextProps) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [started, words.length, interval]);

  if (!started) return <span className={className} style={style}>{words[0]}</span>;

  if (prefersReduced) return <span className={className} style={style}>{words[index]}</span>;

  return (
    <span className={`relative inline-block ${className}`} style={style}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
