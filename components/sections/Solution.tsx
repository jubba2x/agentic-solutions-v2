"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
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

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 400 * dpr;
    canvas.height = 400 * dpr;
    ctx.scale(dpr, dpr);

    const colors = ["#7BB5D6", "#B4A0D8", "#5A9CC5", "#7BB5D6", "#B4A0D8", "#5A9CC5", "#7BB5D6"];
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
            ctx.strokeStyle = `rgba(123, 181, 214, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            if (!reduced) {
              const pulsePos = ((time * 30 + i * 50) % dist) / dist;
              const px = nodes[i].x + (nodes[j].x - nodes[i].x) * pulsePos;
              const py = nodes[i].y + (nodes[j].y - nodes[i].y) * pulsePos;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(123, 181, 214, ${alpha * 2})`;
              ctx.fill();
            }
          }
        }
      }

      for (const node of nodes) {
        if (!reduced) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 50 || node.x > 350) node.vx *= -1;
          if (node.y < 50 || node.y > 350) node.vy *= -1;
        }
        const glowSize = node.radius * 3;
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
        glow.addColorStop(0, `${node.color}20`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(node.x - glowSize, node.y - glowSize, glowSize * 2, glowSize * 2);
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
      style={{ background: "var(--bg-alt)" }}
    >
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 perspective-grid" style={{ opacity: 0.5 }} />
      )}

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:gap-16">
        {!isMobile && (
          <motion.div
            initial={prefersReduced ? {} : { scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE_SNAPPY }}
            className="order-2 flex justify-center md:order-1"
          >
            <NetworkGraph reduced={prefersReduced} />
          </motion.div>
        )}

        <div className={isMobile ? "" : "order-1 md:order-2"}>
          <motion.span
            className="mb-4 inline-block rounded-none px-4 py-1.5 text-xs tracking-widest uppercase"
            style={{ background: "rgba(123,181,214,0.06)", color: "var(--accent)", border: "1px solid rgba(123,181,214,0.12)", fontFamily: "var(--font-mono)" }}
            initial={prefersReduced ? {} : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            The Solution
          </motion.span>

          <motion.h2
            className="mb-6 mt-4 text-3xl font-bold md:text-5xl"
            initial={prefersReduced ? {} : { opacity: 0, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {SOLUTION.heading}
          </motion.h2>

          {SOLUTION.body.map((para, i) => (
            <motion.p
              key={i}
              className="mb-6 text-base leading-relaxed last:mb-0"
              style={{ color: "var(--text-body)" }}
              initial={prefersReduced ? {} : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {para.includes(SOLUTION.highlightPhrase)
                ? para.split(SOLUTION.highlightPhrase).map((part, j, arr) => (
                    <span key={j}>
                      {part}
                      {j < arr.length - 1 && (
                        <span className="font-semibold" style={{ color: "var(--accent)" }}>
                          {SOLUTION.highlightPhrase}
                        </span>
                      )}
                    </span>
                  ))
                : para}
            </motion.p>
          ))}

          {"bullets" in SOLUTION && (
            <div className="mt-4 space-y-3">
              {(SOLUTION.bullets as readonly string[]).map((bullet, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={prefersReduced ? {} : { opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: EASE_SNAPPY }}
                >
                  <span className="mt-1.5 flex h-2 w-2 flex-shrink-0 rounded-full" style={{ background: "var(--accent)" }} />
                  <span className="text-sm md:text-base" style={{ color: "var(--text-body)" }}>{bullet}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
