"use client";

import LenisProvider from "@/components/shared/LenisProvider";
import Navbar from "@/components/shared/Navbar";
import ScrollProgress from "@/components/shared/ScrollProgress";
import CursorSpotlight from "@/components/shared/CursorSpotlight";
import SectionDivider from "@/components/shared/SectionDivider";
import ScrollMarquee from "@/components/shared/ScrollMarquee";
import ScrollVideo from "@/components/shared/ScrollVideo";
import LoadScreen from "@/components/sections/LoadScreen";
import Hero from "@/components/sections/Hero";
import Solution from "@/components/sections/Solution";
import AIAgents from "@/components/sections/AIAgents";
import CommandCenter from "@/components/sections/CommandCenter";
import GEOAudit from "@/components/sections/GEOAudit";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/shared/Footer";

export default function ClientApp() {
  return (
    <LenisProvider>
      <LoadScreen />
      <ScrollProgress />
      <Navbar />
      <CursorSpotlight />
      <ScrollVideo />
      <main className="relative z-[1] min-h-screen">
        <Hero />
        <SectionDivider />
        <Solution />
        <ScrollMarquee text="AUTOMATE" speed={-20} />
        <AIAgents />
        <ScrollMarquee text="AI AGENTS" speed={15} />
        <CommandCenter />
        <SectionDivider />
        <GEOAudit />
        <SectionDivider />
        <HowItWorks />
        <ScrollMarquee text="SELF-RUNNING OPS" speed={-18} />
        <FAQ />
        <SectionDivider />
        <FinalCTA />
      </main>
      <Footer />
    </LenisProvider>
  );
}
