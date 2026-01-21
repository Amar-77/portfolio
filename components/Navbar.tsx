"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { IDENTITY } from "@/data/identity";
import { cn } from "@/lib/utils"; // Wait, I need utils.ts. I'll create it inline or make the file.

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5" : "bg-transparent"
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Link href="#home" className="text-xl font-bold tracking-tight text-black uppercase sm:text-2xl">
                {IDENTITY.name}
            </Link>

            <ul className="hidden gap-8 sm:flex">
                {IDENTITY.nav.map((item) => (
                    <li key={item.label}>
                        <Link
                            href={item.href}
                            className="text-sm font-medium text-gray-500 transition-colors hover:text-black uppercase tracking-wider"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu Placeholder (Simple) */}
            <div className="sm:hidden text-sm uppercase text-gray-400">Menu</div>
        </motion.nav>
    );
}
