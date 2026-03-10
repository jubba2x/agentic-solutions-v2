"use client";

import { useRef, useEffect, useCallback } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  a: number;
  size: number;
  settled: boolean;
}

interface ParticleLogoCanvasProps {
  src?: string;
  gap?: number;
  className?: string;
  /** Width override for the canvas container */
  width?: number;
  /** Height override for the canvas container */
  height?: number;
}

export default function ParticleLogoCanvas({
  src = "/logo.png",
  gap,
  className = "",
  width,
  height,
}: ParticleLogoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const initializedRef = useRef(false);
  const assembledRef = useRef(false);
  const frameCountRef = useRef(0);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  const samplePixels = useCallback(
    (img: HTMLImageElement, canvasW: number, canvasH: number) => {
      const offscreen = document.createElement("canvas");
      // Scale logo to fit within canvas bounds with padding
      const padding = 0.1; // 10% padding on each side
      const maxW = canvasW * (1 - padding * 2);
      const maxH = canvasH * (1 - padding * 2);
      const scale = Math.min(maxW / img.width, maxH / img.height);
      const drawW = img.width * scale;
      const drawH = img.height * scale;

      offscreen.width = Math.ceil(drawW);
      offscreen.height = Math.ceil(drawH);
      const octx = offscreen.getContext("2d");
      if (!octx) return [];

      octx.drawImage(img, 0, 0, drawW, drawH);
      const imageData = octx.getImageData(0, 0, offscreen.width, offscreen.height);
      const data = imageData.data;

      const pixelGap = gap ?? (isMobile ? 5 : 3);
      const particles: Particle[] = [];

      // Offset to center the logo in the canvas
      const offsetX = (canvasW - drawW) / 2;
      const offsetY = (canvasH - drawH) / 2;

      for (let y = 0; y < offscreen.height; y += pixelGap) {
        for (let x = 0; x < offscreen.width; x += pixelGap) {
          const i = (y * offscreen.width + x) * 4;
          const alpha = data[i + 3];
          if (alpha > 80) {
            // Particle starts at random position, targets the pixel position
            const targetX = x + offsetX;
            const targetY = y + offsetY;
            particles.push({
              x: Math.random() * canvasW,
              y: Math.random() * canvasH,
              targetX,
              targetY,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              r: data[i],
              g: data[i + 1],
              b: data[i + 2],
              a: alpha / 255,
              size: pixelGap * 0.6,
              settled: false,
            });
          }
        }
      }

      return particles;
    },
    [gap, isMobile]
  );

  useEffect(() => {
    if (prefersReduced || initializedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Load the logo image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const rect = canvas.getBoundingClientRect();
      particlesRef.current = samplePixels(img, rect.width, rect.height);
      initializedRef.current = true;
      assembledRef.current = false;
      frameCountRef.current = 0;
      startAnimation();
    };
    img.src = src;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mouseRef.current.x = touch.clientX - rect.left;
      mouseRef.current.y = touch.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", resize);

    function startAnimation() {
      const draw = () => {
        if (!canvas || !ctx) return;
        const rect = canvas.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        ctx.clearRect(0, 0, w, h);
        frameCountRef.current++;

        const particles = particlesRef.current;
        const mouse = mouseRef.current;
        const repelRadius = isMobile ? 60 : 100;
        const repelForce = isMobile ? 3 : 5;
        // Faster spring for initial assembly, then gentle
        const springBase = assembledRef.current ? 0.06 : 0.04;
        const spring = Math.min(springBase + frameCountRef.current * 0.0003, 0.12);
        const friction = 0.88;

        let settledCount = 0;

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Spring force toward target
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.vx += dx * spring;
          p.vy += dy * spring;

          // Mouse repulsion
          if (mouse.active) {
            const mx = p.x - mouse.x;
            const my = p.y - mouse.y;
            const dist = Math.sqrt(mx * mx + my * my);
            if (dist < repelRadius && dist > 0) {
              const force = (1 - dist / repelRadius) * repelForce;
              p.vx += (mx / dist) * force;
              p.vy += (my / dist) * force;
              p.settled = false;
            }
          }

          // Friction
          p.vx *= friction;
          p.vy *= friction;

          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Check if settled
          const totalDist = Math.abs(dx) + Math.abs(dy);
          const totalVel = Math.abs(p.vx) + Math.abs(p.vy);
          if (totalDist < 0.5 && totalVel < 0.1) {
            p.x = p.targetX;
            p.y = p.targetY;
            p.settled = true;
            settledCount++;
          }

          // Draw particle
          // Subtle glow for lighter particles (metallic logo highlights)
          const brightness = (p.r + p.g + p.b) / 3;
          const glowAlpha = brightness > 180 ? 0.15 : 0;

          if (glowAlpha > 0 && !isMobile) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(204, 255, 0, ${glowAlpha * p.a})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a})`;
          ctx.fill();
        }

        if (settledCount > particles.length * 0.95) {
          assembledRef.current = true;
        }

        // Add subtle ambient shimmer on settled particles
        if (assembledRef.current && !isMobile) {
          const time = frameCountRef.current * 0.02;
          for (let i = 0; i < particles.length; i += 8) {
            const p = particles[i];
            if (!p.settled) continue;
            const shimmer = Math.sin(time + p.targetX * 0.01 + p.targetY * 0.01) * 0.5 + 0.5;
            if (shimmer > 0.7) {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(204, 255, 0, ${(shimmer - 0.7) * 0.25})`;
              ctx.fill();
            }
          }
        }

        animRef.current = requestAnimationFrame(draw);
      };
      animRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", resize);
    };
  }, [src, samplePixels, isMobile, prefersReduced]);

  if (prefersReduced) {
    // Fallback: just show the logo image
    return (
      <div className={className} style={{ width, height }}>
        <img src={src} alt="Agentic Solutions" className="h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: width ?? "100%",
        height: height ?? "100%",
        touchAction: "none",
      }}
    />
  );
}
