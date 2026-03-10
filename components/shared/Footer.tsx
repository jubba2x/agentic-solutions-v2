"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FOOTER, BOOKING_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative" style={{ borderTop: "1px solid var(--color-border-frame)" }}>
      {/* Ambient glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <motion.div
              className="flex items-center gap-2.5 mb-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Image
                src="/logo.png"
                alt="Agentic Solutions"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </motion.div>
            <p className="text-xs leading-relaxed max-w-[200px]" style={{ color: "var(--text-muted)" }}>
              {FOOTER.tagline}
            </p>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {["LI", "X", "EM"].map((label, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] transition-all"
                  style={{
                    background: "var(--color-bg-secondary)",
                    border: "1px solid var(--color-border-frame)",
                    color: "var(--text-muted)",
                  }}
                  whileHover={{ y: -2, color: "var(--accent)" }}
                >
                  {label}
                </motion.a>
              ))}
            </div>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-xs px-4 py-2 rounded-full border transition-all hover:bg-white hover:text-black"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              Book AI Audit
            </a>
          </div>

          {/* Link columns */}
          {FOOTER.columns.map((col, i) => (
            <div key={i}>
              <p className="text-xs font-semibold mb-4 tracking-wide" style={{ color: "var(--text-body)" }}>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-xs hover:text-white transition-colors"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid var(--color-border-frame)" }}>
          <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
            &copy; {new Date().getFullYear()} Agentic Solutions. All rights reserved.
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
            {FOOTER.credit}
          </p>
        </div>
      </div>
    </footer>
  );
}
