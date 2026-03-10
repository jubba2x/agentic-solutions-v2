"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";

// SVG network of circuit-like lines that draw themselves on page load
// Signature element for Agentic Solutions — data/AI flow visualization

const LINES = [
  // Horizontal flows
  { x1: 0, y1: 120, x2: 280, y2: 120 },
  { x1: 320, y1: 120, x2: 600, y2: 120 },
  { x1: 650, y1: 120, x2: 900, y2: 120 },
  { x1: 0, y1: 280, x2: 200, y2: 280 },
  { x1: 250, y1: 280, x2: 500, y2: 280 },
  { x1: 550, y1: 280, x2: 900, y2: 280 },
  // Vertical connectors
  { x1: 280, y1: 120, x2: 280, y2: 200 },
  { x1: 280, y1: 200, x2: 320, y2: 120 },
  { x1: 600, y1: 120, x2: 600, y2: 200 },
  { x1: 600, y1: 200, x2: 650, y2: 120 },
  { x1: 200, y1: 280, x2: 200, y2: 200 },
  { x1: 200, y1: 200, x2: 250, y2: 280 },
  { x1: 500, y1: 280, x2: 500, y2: 200 },
  { x1: 500, y1: 200, x2: 550, y2: 280 },
  // Diagonal branches
  { x1: 150, y1: 120, x2: 100, y2: 60 },
  { x1: 450, y1: 120, x2: 500, y2: 50 },
  { x1: 750, y1: 120, x2: 800, y2: 60 },
  { x1: 350, y1: 280, x2: 400, y2: 340 },
  { x1: 700, y1: 280, x2: 750, y2: 340 },
  { x1: 100, y1: 280, x2: 50, y2: 340 },
];

const NODES = [
  { cx: 280, cy: 120, r: 4 },
  { cx: 600, cy: 120, r: 4 },
  { cx: 200, cy: 280, r: 4 },
  { cx: 500, cy: 280, r: 4 },
  { cx: 100, cy: 60, r: 3 },
  { cx: 500, cy: 50, r: 3 },
  { cx: 800, cy: 60, r: 3 },
  { cx: 400, cy: 340, r: 3 },
  { cx: 750, cy: 340, r: 3 },
  { cx: 50, cy: 340, r: 3 },
];

export default function DataFlowNetwork() {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (isMobile || prefersReduced) return null;

  return (
    <svg
      viewBox="0 0 900 400"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.12 }}
      preserveAspectRatio="xMidYMid slice"
    >
      {LINES.map((line, i) => (
        <motion.line
          key={`l-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="var(--accent)"
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: 1.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.3, delay: i * 0.08 },
          }}
        />
      ))}
      {NODES.map((node, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill="var(--accent)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 0.4, delay: 1.2 + i * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
        />
      ))}
      {/* Animated data pulse traveling along first horizontal line */}
      <motion.circle
        cx={0}
        cy={120}
        r={2}
        fill="var(--accent-secondary)"
        initial={{ opacity: 0 }}
        animate={{
          cx: [0, 280, 320, 600, 650, 900],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          delay: 2.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      />
      <motion.circle
        cx={900}
        cy={280}
        r={2}
        fill="var(--accent-tertiary)"
        initial={{ opacity: 0 }}
        animate={{
          cx: [900, 550, 500, 250, 200, 0],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          delay: 4,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      />
    </svg>
  );
}
