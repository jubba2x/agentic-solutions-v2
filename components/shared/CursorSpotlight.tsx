"use client";

import { useEffect, useState } from "react";

export default function CursorSpotlight() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ("ontouchstart" in window) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(800px circle at ${pos.x}px ${pos.y}px, rgba(204, 255, 0, 0.04), transparent 40%)`,
      }}
    />
  );
}
