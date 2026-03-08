"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimate } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function LoadScreen() {
  const [scope, animate] = useAnimate();
  const [show, setShow] = useState(true);
  const hasPlayed = useRef(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("loaded")) { setShow(false); return; }
    if (hasPlayed.current) return;
    hasPlayed.current = true;
    if (prefersReduced) { sessionStorage.setItem("loaded", "1"); setShow(false); return; }

    const run = async () => {
      // Logo scales up with glow pulse
      await animate(".logo-container", { opacity: 1, scale: 1 }, { duration: 0.8, ease: "easeOut" });
      // Glow ring expands
      animate(".glow-ring", { scale: [0, 3], opacity: [0.6, 0] }, { duration: 1.2, ease: "easeOut" });
      // Particle burst
      animate(".particle", { scale: [0, 1, 0], opacity: [1, 0.8, 0] }, { duration: 1, ease: "easeOut" });
      await new Promise((r) => setTimeout(r, 600));
      // Overlay splits and slides
      await Promise.all([
        animate(".split-top", { y: "-100%" }, { duration: 0.6, ease: [0.7, 0, 0.84, 0] }),
        animate(".split-bottom", { y: "100%" }, { duration: 0.6, ease: [0.7, 0, 0.84, 0] }),
      ]);
      sessionStorage.setItem("loaded", "1");
      setShow(false);
    };
    run();
  }, [animate, prefersReduced]);

  if (!show) return null;

  return (
    <div ref={scope} className="fixed inset-0 z-[200]">
      {/* Top half */}
      <div className="split-top absolute inset-x-0 top-0 h-1/2" style={{ background: "#030014" }} />
      {/* Bottom half */}
      <div className="split-bottom absolute inset-x-0 bottom-0 h-1/2" style={{ background: "#030014" }} />

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        {/* Glow ring */}
        <div
          className="glow-ring absolute rounded-full"
          style={{
            width: 200, height: 200, opacity: 0, scale: 0,
            border: "2px solid rgba(59,130,246,0.4)",
            boxShadow: "0 0 60px rgba(59,130,246,0.3), inset 0 0 60px rgba(59,130,246,0.1)",
          }}
        />

        {/* Background glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300,
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Particles */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (360 / 12) * i;
          const rad = (angle * Math.PI) / 180;
          const dist = 100 + Math.random() * 50;
          return (
            <motion.div
              key={i}
              className="particle absolute h-1 w-1 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? "var(--accent)" : "var(--accent-secondary)",
                left: `calc(50% + ${Math.cos(rad) * dist}px)`,
                top: `calc(50% + ${Math.sin(rad) * dist}px)`,
                opacity: 0,
              }}
            />
          );
        })}

        {/* Logo */}
        <motion.div
          className="logo-container relative"
          initial={{ opacity: 0, scale: 0.5 }}
        >
          <Image
            src="/logo.png"
            alt="Agentic Solutions"
            width={240}
            height={96}
            className="h-24 w-auto md:h-32"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}
