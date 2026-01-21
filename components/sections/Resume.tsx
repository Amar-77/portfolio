"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/data/identity";

export default function Resume() {
    return (
        <section id="resume" className="py-32 px-6 bg-white text-black border-t border-black/5 flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl space-y-8"
            >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Resume
                </h2>

                <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto">
                    Explore my background, experience, and technical expertise in detail.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-black text-black font-medium text-lg rounded-full hover:bg-black hover:text-white transition-colors"
                    >
                        View Resume
                    </a>

                    <a
                        href="/resume.pdf"
                        download
                        className="px-8 py-4 bg-black text-white font-medium text-lg rounded-full hover:bg-gray-800 transition-transform hover:scale-105"
                    >
                        Download Resume
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
