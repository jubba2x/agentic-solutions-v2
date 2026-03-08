"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  useLocale?: boolean;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  useLocale = false,
  className = "",
  style,
  duration = 1500,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };
    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  const formatted = useLocale ? display.toLocaleString() : String(display);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{formatted}{suffix}
    </span>
  );
}
