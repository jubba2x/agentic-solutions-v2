"use client";

import { lazy, Suspense } from "react";
import Navbar from "@/components/shared/Navbar";
import ScrollProgress from "@/components/shared/ScrollProgress";
import AmbientOrbs from "@/components/shared/AmbientOrbs";
import LoadScreen from "@/components/sections/LoadScreen";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Problem from "@/components/sections/Problem";
import Solution from "@/components/sections/Solution";
import AIAgents from "@/components/sections/AIAgents";
import CommandCenter from "@/components/sections/CommandCenter";
import GEOAudit from "@/components/sections/GEOAudit";
import HowItWorks from "@/components/sections/HowItWorks";
import ValueStack from "@/components/sections/ValueStack";
import Proof from "@/components/sections/Proof";
import Pricing from "@/components/sections/Pricing";
import Guarantee from "@/components/sections/Guarantee";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/shared/Footer";

export default function ClientApp() {
  return (
    <>
      <LoadScreen />
      <ScrollProgress />
      <Navbar />
      <AmbientOrbs />
      <main className="relative min-h-screen">
        <Hero />
        <TrustedBy />
        <Problem />
        <Solution />
        <AIAgents />
        <CommandCenter />
        <GEOAudit />
        <HowItWorks />
        <ValueStack />
        <Proof />
        <Pricing />
        <Guarantee />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
