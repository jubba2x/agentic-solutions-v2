"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 120;

// Build array of frame paths
const framePaths = Array.from(
  { length: TOTAL_FRAMES },
  (_, i) => `/frames/frame-${String(i + 1).padStart(3, "0")}.jpg`
);

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll();

  // Subtle scale as you scroll deeper — reduced on mobile to prevent overflow clipping
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.4, 0.2]);

  // Preload all frames
  useEffect(() => {
    let mounted = true;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    framePaths.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES && mounted) {
          imagesRef.current = images;
          setLoaded(true);
          // Draw first frame immediately
          drawFrame(0, images);
        }
      };
      images[i] = img;
    });

    return () => { mounted = false; };
  }, []);

  // Draw a specific frame to canvas
  const drawFrame = (index: number, images?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    const imgs = images || imagesRef.current;
    if (!canvas || !imgs.length) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(index, TOTAL_FRAMES - 1));
    const img = imgs[clampedIndex];
    if (!img || !img.complete) return;

    // Match canvas to viewport
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    // Draw with cover behavior
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (canvas.width - w) / 2;
    const y = (canvas.height - h) / 2;

    ctx.drawImage(img, x, y, w, h);
  };

  // Sync scroll to frame index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const frameIndex = Math.round(latest * (TOTAL_FRAMES - 1));
    drawFrame(frameIndex);
  });

  // Handle resize
  useEffect(() => {
    const onResize = () => {
      if (loaded) {
        const latest = scrollYProgress.get();
        drawFrame(Math.round(latest * (TOTAL_FRAMES - 1)));
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [loaded, scrollYProgress]);

  return (
    <motion.div
      className="fixed inset-0 z-0 overflow-hidden"
      style={{ scale: bgScale, opacity: bgOpacity }}
    >
      {/* Poster fallback while frames load */}
      {!loaded && (
        <img
          src="/galaxy-bg.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: loaded ? "block" : "none" }}
      />
      {/* Radial overlay to deepen edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, transparent 20%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />
    </motion.div>
  );
}
