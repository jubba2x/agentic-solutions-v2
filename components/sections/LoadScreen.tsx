"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export default function LoadScreen() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const hasPlayed = useRef(false);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("loaded")) {
      setShow(false);
      return;
    }
    if (hasPlayed.current) return;
    hasPlayed.current = true;

    if (prefersReduced) {
      sessionStorage.setItem("loaded", "1");
      setShow(false);
      return;
    }

    // Pick the right video based on viewport width
    const isMobile = window.innerWidth < 768;
    const video = isMobile ? mobileVideoRef.current : desktopVideoRef.current;
    if (!video) return;

    // Make the active video visible
    video.style.display = "block";

    video.play().catch(() => {
      sessionStorage.setItem("loaded", "1");
      setShow(false);
    });
  }, [prefersReduced]);

  const handleVideoEnd = () => {
    setFading(true);
    sessionStorage.setItem("loaded", "1");
    setTimeout(() => setShow(false), 800);
  };

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200]"
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="absolute inset-0 bg-black" />

      {/* Desktop intro (landscape 1920x1080) — hidden by default, shown via JS */}
      <video
        ref={desktopVideoRef}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: "none" }}
        poster="/galaxy-bg.jpg"
      >
        <source src="/intro-desktop.mp4" type="video/mp4" />
      </video>

      {/* Mobile intro (portrait 1080x1920) — hidden by default, shown via JS */}
      <video
        ref={mobileVideoRef}
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: "none" }}
        poster="/galaxy-bg.jpg"
      >
        <source src="/intro-mobile.mp4" type="video/mp4" />
      </video>
    </motion.div>
  );
}
