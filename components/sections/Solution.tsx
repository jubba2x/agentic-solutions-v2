"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { SOLUTION, EASE_SNAPPY } from "@/lib/constants";

function NetworkGraph({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const nodesRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number; color: string; pulse: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = 400 * dpr;
      canvas.height = 400 * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const colors = ["#3B82F6", "#06B6D4", "#8B5CF6", "#10B981", "#3B82F6", "#06B6D4", "#8B5CF6"];
    if (nodesRef.current.length === 0) {
      nodesRef.current = Array.from({ length: 7 }, (_, i) => ({
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: i === 0 ? 12 : 6 + Math.random() * 4,
        color: colors[i],
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    let time = 0;
    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, 400, 400);

      const nodes = nodesRef.current;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.4;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Traveling pulse along connection
            if (!reduced) {
              const pulsePos = ((time * 30 + i * 50) % dist) / dist;
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 2})`;
              ctx.fill();
            }
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        if (!reduced) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 50 || node.x > 350) node.vx *= -1;
          if (node.y < 50 || node.y > 350) node.vy *= -1;
        }

        // Glow
        const glowSize = node.radius * 4;
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        glow.addColorStop(0, `${node.color}30`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(node.x - glowSize, node.y - glowSize, glowSize * 2, glowSize * 2);

        // Pulse ring
        if (!reduced) {
          const pulseR = node.radius + Math.sin(time * 2 + node.pulse) * 3 + 6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = `${node.color}20`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [reduced]);

  return <canvas ref={canvasRef} className="h-[300px] w-[300px] md:h-[400px] md:w-[400px]" style={{ maxWidth: "100%" }} />;
}

export default function Solution() {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      id="solution"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-section)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.05) 0%, transparent 60%)" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
        {/* Network Graph */}
        <motion.div
          initial={prefersReduced ? {} : { x: isMobile ? 0 : -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE_SNAPPY }}
          className="order-2 flex justify-center md:order-1"
        >
          <NetworkGraph reduced={prefersReduced} />
        </motion.div>

        {/* Copy */}
        <div className="order-1 md:order-2">
          <motion.span
            className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase"
            style={{ background: "rgba(59,130,246,0.08)", color: "var(--accent)", border: "1px solid rgba(59,130,246,0.15)", fontFamily: "var(--font-mono)" }}
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_SNAPPY }}
          >
            The Solution
          </motion.span>

          <motion.h2
            className="mb-6 mt-4 text-3xl font-bold md:text-5xl"
            initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_SNAPPY }}
          >
            {SOLUTION.heading}
          </motion.h2>

          {SOLUTION.body.map((para, i) => (
            <motion.p
              key={i}
              className="mb-4 text-base leading-relaxed text-text-body last:mb-0"
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: EASE_SNAPPY }}
            >
              {para.includes(SOLUTION.highlightPhrase)
                ? para.split(SOLUTION.highlightPhrase).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="font-semibold bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                          {SOLUTION.highlightPhrase}
                        </span>
                      )}
                    </span>
                  ))
                : para}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
