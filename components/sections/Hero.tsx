"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HERO, BOOKING_URL } from "@/lib/constants";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const promptBarY = useTransform(scrollYProgress, [0, 0.5], [0, 300]);
  const promptBarOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrompt((p) => (p + 1) % HERO.prompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-dvh min-h-screen overflow-hidden">

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
        style={{ y: heroTextY, opacity: heroTextOpacity }}
      >
        {/* Main headline line 1 */}
        <motion.h1
          className="italic text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold text-white leading-[1.1] tracking-tight max-w-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          {HERO.headlinePart1}
        </motion.h1>

        {/* Headline line 2 — "Let Agentic Solutions Fix That." with brand name in logo font */}
        <motion.h2
          className="mt-2 text-[clamp(2rem,5.5vw,4rem)] font-extrabold text-white leading-[1.1] tracking-tight max-w-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", textShadow: "0 2px 40px rgba(0,0,0,0.6)" }}
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <span className="italic">{HERO.headlinePart2} </span>
          <span
            className="not-italic"
            style={{
              fontFamily: "var(--font-logo, var(--font-geist-sans), system-ui)",
              color: "var(--accent, #7BB5D6)",
              fontWeight: 800,
            }}
          >
            {HERO.brandName}
          </span>
          <span className="italic"> {HERO.headlinePart3}</span>
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="mt-5 text-lg tracking-wide"
          style={{ color: "var(--text-body)", textShadow: "0 1px 20px rgba(0,0,0,0.8)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {HERO.tagline}
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-8 py-3 rounded-full border border-white/40 text-white text-sm font-medium backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-400 relative overflow-hidden group"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">{HERO.cta}</span>
          <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.a>
      </motion.div>

      {/* Prompt Showcase Bar */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-2xl px-4"
        style={{ y: promptBarY, opacity: promptBarOpacity }}
      >
        <motion.div
          className="backdrop-blur-xl rounded-2xl border px-5 py-3.5 flex items-center gap-4"
          style={{
            background: "rgba(10, 15, 24, 0.7)",
            borderColor: "rgba(123, 181, 214, 0.12)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {/* Icon */}
          <div
            className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center"
            style={{ background: "rgba(123, 181, 214, 0.1)", border: "1px solid rgba(123, 181, 214, 0.15)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          {/* Prompt text with cycling animation */}
          <div className="flex-1 min-w-0">
            <PromptCycler prompts={HERO.prompts} current={currentPrompt} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function PromptCycler({ prompts, current }: { prompts: readonly string[]; current: number }) {
  return (
    <div className="relative h-5 overflow-hidden">
      {prompts.map((prompt, i) => (
        <motion.p
          key={i}
          className="absolute inset-0 text-sm truncate"
          style={{ color: "var(--text-body)" }}
          initial={false}
          animate={{
            y: i === current ? 0 : i > current ? 20 : -20,
            opacity: i === current ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {prompt}
        </motion.p>
      ))}
    </div>
  );
}
