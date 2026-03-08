"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SplitText from "@/components/shared/SplitText";
import MorphingText from "@/components/shared/MorphingText";
import MagneticButton from "@/components/shared/MagneticButton";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { usePrefersReducedMotion, useIsMobile } from "@/lib/hooks";
import { HERO, EASE_SNAPPY, BOOKING_URL } from "@/lib/constants";

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  const starsRef = useRef<{ x: number; y: number; z: number; size: number; hue: number }[]>([]);

  const init = useCallback((w: number, h: number) => {
    const count = prefersReduced ? 50 : isMobile ? 100 : 250;
    starsRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w - w / 2,
      y: Math.random() * h - h / 2,
      z: Math.random() * 1000,
      size: Math.random() * 1.5 + 0.5,
      hue: 200 + Math.random() * 60,
    }));
  }, [isMobile, prefersReduced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      if (starsRef.current.length === 0) init(rect.width, rect.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const speed = prefersReduced ? 0.2 : 0.5;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "rgba(3, 0, 20, 0.15)";
      ctx.fillRect(0, 0, w, h);

      for (const star of starsRef.current) {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * w - cx;
          star.y = Math.random() * h - cy;
        }

        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;
        const r = (1 - star.z / 1000) * star.size * 2;
        const alpha = (1 - star.z / 1000) * 0.8;

        if (sx >= 0 && sx <= w && sy >= 0 && sy <= h) {
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(r, 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${star.hue}, 70%, 75%, ${alpha})`;
          ctx.fill();

          // Star trail
          if (!prefersReduced && r > 0.8) {
            const trail = r * 4;
            const gradient = ctx.createLinearGradient(sx, sy, sx + (star.x > 0 ? -trail : trail), sy);
            gradient.addColorStop(0, `hsla(${star.hue}, 70%, 75%, ${alpha * 0.3})`);
            gradient.addColorStop(1, "transparent");
            ctx.strokeStyle = gradient;
            ctx.lineWidth = r * 0.5;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx + (star.x > 0 ? -trail : trail), sy + (star.y > 0 ? -trail * 0.3 : trail * 0.3));
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [init, prefersReduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: EASE_SNAPPY },
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Starfield */}
      <StarfieldCanvas />

      {/* Nebula gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(6,182,212,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center"
        style={prefersReduced ? {} : { scale, opacity }}
      >
        {/* Badge */}
        <motion.div
          {...fadeUp(0.2)}
          className="mb-8 rounded-full px-6 py-2.5 text-sm"
          style={{
            border: "1px solid rgba(59,130,246,0.2)",
            background: "rgba(59,130,246,0.05)",
            color: "var(--accent)",
            backdropFilter: "blur(10px)",
          }}
        >
          {HERO.badge}
        </motion.div>

        {/* Headline */}
        <div className="mb-6">
          <SplitText
            text={HERO.headline}
            as="h1"
            className="text-4xl font-bold leading-tight md:text-6xl lg:text-8xl"
            staggerDelay={0.03}
            delay={0.4}
          />
          <h1
            className="mt-2 text-4xl font-bold leading-tight md:text-6xl lg:text-8xl"
            aria-hidden="true"
          >
            <MorphingText
              words={HERO.morphingWords}
              interval={3000}
              className="bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary bg-clip-text text-transparent"
              delay={1500}
            />
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          {...fadeUp(1.0)}
          className="mx-auto mb-10 max-w-2xl text-lg text-text-body md:text-xl"
        >
          {HERO.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(1.2)}
          className="mb-14 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton href={BOOKING_URL} variant="primary">
            {HERO.ctaPrimary}
          </MagneticButton>
          <MagneticButton
            variant="ghost"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            {HERO.ctaSecondary}
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <div className="grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
          {HERO.stats.map((stat, i) => (
            <motion.div
              key={stat.unit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.1, ease: EASE_SNAPPY }}
              className="group flex flex-col items-center rounded-xl border p-4 transition-all duration-300 hover:border-accent-border"
              style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(10px)" }}
            >
              <span className="text-3xl font-bold md:text-4xl" style={{ color: "var(--accent)" }}>
                <AnimatedCounter
                  value={stat.value}
                  prefix={"prefix" in stat ? String(stat.prefix) : ""}
                  suffix={stat.suffix}
                />
              </span>
              <span className="mt-1 text-sm text-text-muted">{stat.unit}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-text-muted tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>SCROLL</span>
          <ChevronDown className="h-5 w-5" style={{ color: "var(--accent)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
