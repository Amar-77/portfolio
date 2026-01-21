"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/data/identity";

interface IdentityTextOverlayProps {
    scrollProgress: number; // 0 to 1
}

export default function IdentityTextOverlay({ scrollProgress }: IdentityTextOverlayProps) {
    const currentRoleIndex = Math.min(
        Math.floor(scrollProgress * IDENTITY.roles.length * 1.5),
        IDENTITY.roles.length - 1
    );

    const safeIndex = Math.max(0, Math.min(currentRoleIndex, IDENTITY.roles.length - 1));

    return (
        <div className="absolute inset-0 z-20 flex items-center pl-12 md:pl-24 lg:pl-32 pointer-events-none">
            <div className="text-left space-y-2">
                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-script text-black leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    {IDENTITY.sections.hero.title}
                </motion.h1>

                <div className="h-12 md:h-16 overflow-hidden relative">
                    <motion.div
                        key={safeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-xl md:text-2xl font-sans font-light text-gray-600 tracking-wide lowercase"
                    >
                        {/* Dynamic article based on role vowel start */}
                        {(() => {
                            const role = IDENTITY.roles[safeIndex].toLowerCase();
                            const isVowel = ['a', 'e', 'i', 'o', 'u'].includes(role[0]);
                            return `${isVowel ? 'an' : 'a'} ${role}`;
                        })()}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
