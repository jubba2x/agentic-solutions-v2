"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, BOOKING_URL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-8 h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="Agentic Solutions"
            width={140}
            height={48}
            className="h-8 w-auto md:h-10"
            priority
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 ml-12">
          {NAV_LINKS.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm text-white/80 hover:text-white transition-colors py-4 block"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:block text-sm px-5 py-2 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Book AI Audit
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 space-y-4">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm px-5 py-2.5 rounded-full border border-white/30 text-white mt-4"
              >
                Book AI Audit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
