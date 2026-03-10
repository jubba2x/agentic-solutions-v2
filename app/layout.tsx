import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agentic Solutions — AI Transformation Partner",
  description:
    "We embed into your business, rebuild operations with AI, and hand you back 20+ hours a week. For info product creators, SaaS founders, and agency owners doing $500K-$5M.",
  openGraph: {
    title: "Agentic Solutions — Stop Running Your Business Like It's 2019",
    description:
      "AI operations audit, custom automation builds, and strategic consulting. First automation live in 7 days.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic Solutions — AI Transformation Partner",
    description: "20+ hours/week back. First result in 7 days. Guaranteed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased`}>
        {children}
        <div className="grain-overlay" />
      </body>
    </html>
  );
}
