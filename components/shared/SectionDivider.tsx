"use client";

import { motion } from "framer-motion";

export default function SectionDivider({ color = "rgba(123, 181, 214, 0.15)" }: { color?: string }) {
  return (
    <motion.div
      className="mx-auto max-w-[80%]"
      style={{ height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, transformOrigin: "center" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
