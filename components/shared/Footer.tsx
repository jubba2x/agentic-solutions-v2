"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { FOOTER, EASE_SNAPPY, BOOKING_URL } from "@/lib/constants";

const socialIcons = [
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter/X", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@agenticsolutions.com" },
];

export default function Footer() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <footer className="relative border-t overflow-hidden" style={{ borderColor: "rgba(59,130,246,0.1)", background: "var(--bg-alt)" }}>
      {/* Watermark */}
      <span className="pointer-events-none absolute -right-8 -bottom-16 select-none text-[16rem] font-bold leading-none md:text-[20rem]" style={{ opacity: 0.015, fontFamily: "var(--font-heading)", color: "var(--accent)" }}>
        A
      </span>

      <motion.div
        className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4"
        initial={prefersReduced ? undefined : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {/* Logo Column */}
        <motion.div variants={prefersReduced ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_SNAPPY } } }}>
          <Image src="/logo.png" alt="Agentic Solutions" width={140} height={48} className="h-10 w-auto" />
          <p className="mt-3 text-sm text-text-muted">{FOOTER.tagline}</p>

          <div className="mt-6 flex gap-4">
            {socialIcons.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300 hover:border-accent-border"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                whileHover={{ scale: 1.1, color: "var(--accent)" }}
                aria-label={label}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:shadow-[0_0_20px_var(--accent-glow)]"
            style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))" }}
          >
            Book a Call
          </a>
        </motion.div>

        {/* Link Columns */}
        {FOOTER.columns.map((col) => (
          <motion.div key={col.title} variants={prefersReduced ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_SNAPPY } } }}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white" style={{ fontFamily: "var(--font-mono)" }}>
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl border-t px-6 py-6" style={{ borderColor: "rgba(59,130,246,0.08)" }}>
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-text-muted sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Agentic Solutions. All rights reserved.</span>
          <span>{FOOTER.credit}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      className="relative inline-block text-sm text-text-body transition-colors hover:text-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute bottom-0 left-0 h-px"
        style={{ backgroundColor: "var(--accent)", width: "100%", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </a>
  );
}
