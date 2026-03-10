"use client";

import { useRef, useState } from "react";
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
  const [hovered, setHovered] = useState(false);

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

  const handleMouseLeave = () => { x.set(0); y.set(0); setHovered(false); };

  const Component = href ? "a" : "button";
  const linkProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Component
        {...linkProps}
        onClick={onClick}
        className={`group relative overflow-hidden inline-flex items-center gap-3 cursor-pointer transition-all duration-300 ${className}`}
        style={{
          padding: variant === "primary" ? "16px 36px" : "14px 28px",
          borderRadius: "4px",
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 600,
          fontSize: "15px",
          letterSpacing: "0.05em",
          textTransform: "uppercase" as const,
          ...(variant === "primary" ? {
            background: "var(--accent)",
            color: "#000000",
            border: "2px solid var(--accent)",
          } : variant === "ghost" ? {
            background: "transparent",
            color: "var(--text)",
            border: "1px solid rgba(255,255,255,0.15)",
          } : {
            background: "transparent",
            color: "var(--text)",
            border: "1px solid var(--accent-border)",
          }),
        }}
      >
        {/* Border draw animation on hover — primary */}
        {variant === "primary" && !prefersReduced && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              border: "2px solid #000",
              borderRadius: "4px",
            }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={hovered ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
        {/* Arrow indicator */}
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <motion.span
            className="relative z-10"
            animate={hovered ? { x: 4 } : { x: 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: "#000" }}
          >
            →
          </motion.span>
        )}
      </Component>
    </motion.div>
  );
}
