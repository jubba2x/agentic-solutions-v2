"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { COMMAND_CENTER, EASE_SNAPPY } from "@/lib/constants";

function MiniChart({ color, height = 60 }: { color: string; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 200 * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const points = Array.from({ length: 20 }, (_, i) => ({
      x: (i / 19) * 200,
      y: height * 0.2 + Math.sin(i * 0.5) * height * 0.15 + Math.random() * height * 0.2 + (i / 19) * height * -0.3,
    }));

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}30`);
    gradient.addColorStop(1, "transparent");

    ctx.beginPath();
    ctx.moveTo(points[0].x, height);
    for (const p of points) ctx.lineTo(p.x, p.y);
    ctx.lineTo(200, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const cp1x = (points[i - 1].x + points[i].x) / 2;
      ctx.quadraticCurveTo(cp1x, points[i - 1].y, points[i].x, points[i].y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }, [color, height, prefersReduced]);

  return <canvas ref={canvasRef} className="w-full" style={{ height }} />;
}

const METRIC_COLORS = ["#7BB5D6", "#B4A0D8", "#5A9CC5", "#6BC5D4"];

export default function CommandCenter() {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section
      id="command-center"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--bg-alt)" }}
      aria-label="AI Command Center Dashboard"
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(123,181,214,0.04) 0%, transparent 60%)" }} />

      <div className="relative mx-auto max-w-5xl px-4">
        <motion.div
          className="mb-12 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_SNAPPY }}
        >
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-xs tracking-widest uppercase" style={{ background: "rgba(107,197,212,0.08)", color: "#6BC5D4", border: "1px solid rgba(107,197,212,0.15)", fontFamily: "var(--font-mono)" }}>
            Dashboard
          </span>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">{COMMAND_CENTER.heading}</h2>
          <p className="mt-4 text-base md:text-lg" style={{ color: "var(--text-body)" }}>{COMMAND_CENTER.subheading}</p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border"
          style={{ borderColor: "rgba(123,181,214,0.12)", background: "rgba(6,10,16,0.8)" }}
          initial={prefersReduced ? {} : { scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_SNAPPY }}
        >
          {!prefersReduced && (
            <motion.div
              className="pointer-events-none absolute inset-x-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(123,181,214,0.3), transparent)" }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          )}

          {!isMobile && (
            <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(123,181,214,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(123,181,214,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          )}

          <div className="relative flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "rgba(123,181,214,0.1)" }}>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#E87B7B" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#D4A85A" }} />
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#5AC5A0" }} />
              <span className="ml-4 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>agentic-command-center</span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "#5AC5A0" }}
                animate={prefersReduced ? {} : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-xs font-medium" style={{ color: "#5AC5A0", fontFamily: "var(--font-mono)" }}>LIVE</span>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-4 p-6 md:grid-cols-4 md:gap-6 md:p-8">
            {COMMAND_CENTER.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className="rounded-xl border p-4"
                style={{ borderColor: `${METRIC_COLORS[i]}15`, background: `${METRIC_COLORS[i]}05` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: METRIC_COLORS[i] }}
                    animate={prefersReduced ? {} : { opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <span className="text-[10px] tracking-wider" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{metric.label.toUpperCase()}</span>
                </div>

                <AnimatedCounter
                  value={metric.value}
                  prefix={"prefix" in metric ? String(metric.prefix) : ""}
                  suffix={metric.suffix}
                  useLocale={"useLocale" in metric ? Boolean(metric.useLocale) : false}
                  className="text-2xl font-bold text-white md:text-3xl"
                />

                <MiniChart color={METRIC_COLORS[i]} height={40} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
