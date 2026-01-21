import type { Metadata } from "next";
import { Outfit, Caveat } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amar | AI-Driven Creative Technologist",
  description: "Personal portfolio of Amar - AI Engineer and Creative Technologist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${caveat.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-black/10 selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
