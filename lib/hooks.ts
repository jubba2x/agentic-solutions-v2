"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

export function useTextScramble(
  finalText: string,
  options: { duration?: number; delay?: number; trigger?: boolean } = {}
): string {
  const { duration = 1000, delay = 0, trigger = true } = options;
  const [display, setDisplay] = useState("");
  const frameRef = useRef<number>(0);

  const scramble = useCallback(() => {
    const totalFrames = Math.ceil((duration / 1000) * 60);
    let frame = 0;
    const update = () => {
      frame++;
      const progress = frame / totalFrames;
      const result = finalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (progress * finalText.length > i) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(result);
      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplay(finalText);
      }
    };
    frameRef.current = requestAnimationFrame(update);
  }, [finalText, duration]);

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(scramble, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [trigger, delay, scramble]);

  return display;
}

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}
