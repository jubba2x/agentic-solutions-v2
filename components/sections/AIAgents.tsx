"use client";

import { useRef, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { AI_AGENTS, EASE_SNAPPY } from "@/lib/constants";

const AGENT_COLORS = ["#7BB5D6", "#B4A0D8", "#5A9CC5", "#E87B7B", "#D4A85A", "#6BC5D4"];

function AgentNetworkVisual({ reduced, inView }: { reduced: boolean; inView: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const agents = useMemo(() => {
    const cx = 300, cy = 300, r = 200;
    return AI_AGENTS.cards.map((card, i) => {
      const angle = (i / AI_AGENTS.cards.length) * Math.PI * 2 - Math.PI / 2;
      return {
        label: card.title.split(" ").slice(0, 2).join(" "),
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        color: AGENT_COLORS[i],
        angle,
      };
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 600 * dpr;
    canvas.height = 600 * dpr;
    ctx.scale(dpr, dpr);

    const cx = 300, cy = 300;

    const draw = () => {
      if (!inView) { animRef.current = requestAnimationFrame(draw); return; }
      timeRef.current += 0.008;
      const t = timeRef.current;
      ctx.clearRect(0, 0, 600, 600);

      for (const agent of agents) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(agent.x, agent.y);
        ctx.strokeStyle = `${agent.color}30`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (!reduced) {
          const pulsePos = (t * 0.8 + agents.indexOf(agent) * 0.15) % 1;
          const px = cx + (agent.x - cx) * pulsePos;
          const py = cy + (agent.y - cy) * pulsePos;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = `${agent.color}80`;
          ctx.fill();
        }
      }

      for (let i = 0; i < agents.length; i++) {
        const next = agents[(i + 1) % agents.length];
        ctx.beginPath();
        ctx.moveTo(agents[i].x, agents[i].y);
        ctx.lineTo(next.x, next.y);
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      hubGlow.addColorStop(0, "rgba(123,181,214,0.15)");
      hubGlow.addColorStop(1, "transparent");
      ctx.fillStyle = hubGlow;
      ctx.fillRect(cx - 50, cy - 50, 100, 100);

      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#7BB5D6";
      ctx.fill();

      if (!reduced) {
        const ringAlpha = 0.3 + Math.sin(t * 2) * 0.15;
        ctx.beginPath();
        ctx.arc(cx, cy, 30 + Math.sin(t * 1.5) * 5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(123,181,214,${ringAlpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.fillStyle = "#000";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AI", cx, cy);

      for (const agent of agents) {
        const glow = ctx.createRadialGradient(agent.x, agent.y, 0, agent.x, agent.y, 30);
        glow.addColorStop(0, `${agent.color}20`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(agent.x - 30, agent.y - 30, 60, 60);

        const nodeRadius = reduced ? 10 : 10 + Math.sin(t * 2 + agents.indexOf(agent)) * 2;
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = agent.color;
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "500 11px sans-serif";
        ctx.textAlign = "center";
        const labelY = agent.y > cy ? agent.y + 24 : agent.y - 20;
        ctx.fillText(agent.label, agent.x, labelY);
      }

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [agents, reduced, inView]);

  return <canvas ref={canvasRef} className="w-full max-w-[500px] aspect-square" />;
}

export default function AIAgents() {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="ai-agents"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      <div className="relative mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span
            className="mb-4 inline-block rounded-none px-4 py-1.5 text-xs tracking-widest uppercase"
            style={{ background: "rgba(180,160,216,0.06)", color: "#B4A0D8", border: "1px solid rgba(180,160,216,0.12)", fontFamily: "var(--font-mono)" }}
          >
            AI Agents
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl lg:text-6xl">{AI_AGENTS.heading}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-base md:text-lg" style={{ color: "var(--text-body)" }}>{AI_AGENTS.subheading}</p>
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            className="flex justify-center"
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_SNAPPY }}
          >
            <AgentNetworkVisual reduced={prefersReduced} inView={isInView} />
          </motion.div>

          <div className="space-y-4">
            {AI_AGENTS.cards.map((card, i) => (
              <motion.div
                key={card.title}
                className="group flex items-start gap-4 rounded-lg p-4 transition-all duration-300 hover:bg-white/[0.02]"
                initial={prefersReduced ? {} : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_SNAPPY }}
              >
                <div className="mt-1.5 flex-shrink-0">
                  <motion.div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: AGENT_COLORS[i] }}
                    animate={prefersReduced ? {} : { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
