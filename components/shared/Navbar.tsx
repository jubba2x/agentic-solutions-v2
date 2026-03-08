"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";
import { NAV_LINKS, BOOKING_URL, EASE_SNAPPY } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile(1024);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={prefersReduced ? false : { y: -100 }}
        animate={{
          y: 0,
          backgroundColor: scrolled ? "rgba(3,0,20,0.9)" : "rgba(3,0,20,0)",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px)",
        }}
        transition={{
          y: { duration: 0.6, ease: EASE_SNAPPY, delay: 1.2 },
          backgroundColor: { duration: 0.3 },
          backdropFilter: { duration: 0.3 },
        }}
        style={{
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(59,130,246,0.1)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Agentic Solutions"
              width={140}
              height={48}
              className="h-10 w-auto md:h-12"
              priority
            />
          </a>

          {!isMobile && (
            <div className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </div>
          )}

          {!isMobile && (
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_var(--accent-glow)]"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
              }}
            >
              Book a Call
            </a>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(true)} className="text-white p-2" aria-label="Open menu">
              <Menu size={24} />
            </button>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
            style={{ background: "rgba(3,0,20,0.98)", backdropFilter: "blur(40px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button onClick={() => setMenuOpen(false)} className="absolute top-6 right-6 text-white p-2" aria-label="Close menu">
              <X size={24} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-heading text-3xl font-bold text-white"
                  initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: EASE_SNAPPY }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-4 rounded-xl px-10 py-4 text-lg font-semibold text-white"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))" }}
                initial={prefersReduced ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.4, ease: EASE_SNAPPY }}
              >
                Book a Call
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.span
        className="absolute inset-0 rounded-lg"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ backgroundColor: "rgba(59,130,246,0.08)", transformOrigin: "left" }}
      />
      <span className="relative">{label}</span>
    </a>
  );
}
