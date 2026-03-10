"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const orbs = [
  { size: 600, x: "10%", y: "5%", color: "rgba(204,255,0,0.06)", duration: 25 },
  { size: 500, x: "80%", y: "15%", color: "rgba(6,182,212,0.05)", duration: 30 },
  { size: 700, x: "50%", y: "35%", color: "rgba(139,92,246,0.04)", duration: 35 },
  { size: 400, x: "20%", y: "55%", color: "rgba(204,255,0,0.05)", duration: 28 },
  { size: 550, x: "75%", y: "65%", color: "rgba(6,182,212,0.04)", duration: 32 },
  { size: 650, x: "40%", y: "85%", color: "rgba(139,92,246,0.05)", duration: 27 },
];

export default function AmbientOrbs() {
  const prefersReduced = usePrefersReducedMotion();
  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
