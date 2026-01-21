"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IDENTITY } from "@/data/identity";

export default function VideoEditing() {
    const [showAll, setShowAll] = useState(false);

    // Default to showing only first 3, or all if toggled
    const visibleVideos = showAll ? IDENTITY.content.videos : IDENTITY.content.videos.slice(0, 3);

    return (
        <section id="video-editing" className="py-32 px-6 bg-white text-black border-t border-black/5">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-24 tracking-tighter"
                >
                    {IDENTITY.sections.videoEditing.title}
                </motion.h2>

                {/* Grid Layout taking natural height of videos (Original Aspect Ratio) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    <AnimatePresence>
                        {visibleVideos.map((video, index) => {
                            // Only autoplay the first 3 videos, AND only when we are NOT showing all videos.
                            // This ensures that when expanded, everything is paused to prevent lag.
                            const shouldAutoplay = !showAll && index < 3;

                            return (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex flex-col gap-4"
                                >
                                    {/* Natural height container based on video content */}
                                    <div className="relative w-full bg-black/5 rounded-3xl overflow-hidden shadow-sm">
                                        <video
                                            src={video.src}
                                            autoPlay={shouldAutoplay}
                                            muted
                                            loop
                                            playsInline
                                            controls
                                            className="w-full h-auto block"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-1">{video.title}</h3>
                                        <p className="text-gray-500 text-sm">{video.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {IDENTITY.content.videos.length > 3 && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-4 border border-black text-black font-medium text-lg rounded-full hover:bg-black hover:text-white transition-colors"
                        >
                            {showAll ? "Show Less" : IDENTITY.sections.videoEditing.cta}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
