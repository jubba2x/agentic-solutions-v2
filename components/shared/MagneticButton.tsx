"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  href,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const baseStyles = {
    primary: "text-white font-semibold",
    ghost: "border text-white hover:bg-white/5",
    outline: "border text-white",
  }[variant];

  const Component = href ? "a" : "button";
  const linkProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Component
        {...linkProps}
        onClick={onClick}
        className={`group relative overflow-hidden rounded-xl px-10 py-5 text-lg inline-block cursor-pointer transition-all duration-300 ${baseStyles} ${className}`}
        style={{
          background: variant === "primary"
            ? "linear-gradient(135deg, var(--accent), var(--accent-secondary))"
            : "transparent",
          borderColor: variant !== "primary" ? "var(--accent-border)" : undefined,
          boxShadow: variant === "primary"
            ? "0 0 30px var(--accent-glow), 0 0 60px rgba(59,130,246,0.1)"
            : undefined,
        }}
      >
        {/* Shimmer */}
        {!prefersReduced && variant === "primary" && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
            animate={{ backgroundPosition: ["-200% center", "200% center"] }}
            transition={{ duration: 2.5, repeatDelay: 3, repeat: Infinity, ease: "linear" }}
          />
        )}
        {/* Hover glow ring */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: "inset 0 0 20px rgba(59,130,246,0.15)" }}
        />
        <span className="relative z-10">{children}</span>
      </Component>
    </motion.div>
  );
}
