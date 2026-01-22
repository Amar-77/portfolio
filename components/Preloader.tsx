"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreloaderProps {
    loaded: boolean;
}

const LOADING_MESSAGES = [
    "Simulating Physics...",
    "Brewing Pixels...",
    "Calibrating Experience...",
    "Almost There..."
];

export default function Preloader({ loaded }: PreloaderProps) {
    const [msgIndex, setMsgIndex] = useState(0);

    useEffect(() => {
        if (loaded) return;

        // Cycle through messages every 800ms
        const interval = setInterval(() => {
            setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
        }, 800);

        return () => clearInterval(interval);
    }, [loaded]);

    return (
        <AnimatePresence>
            {!loaded && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
                >
                    {/* Animated Text Container */}
                    <div className="h-12 overflow-hidden flex flex-col items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={msgIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="text-xl md:text-2xl font-light tracking-widest font-mono"
                            >
                                {LOADING_MESSAGES[msgIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Progress Bar (Visual only, indefinite) */}
                    <motion.div
                        className="mt-8 h-0.5 bg-white/20 w-48 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="h-full bg-white"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "linear"
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
