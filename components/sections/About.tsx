"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/data/identity";

export default function About() {
    return (
        <section id="about" className="py-24 px-6 bg-white text-black">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-12"
                >
                    {/* Header */}
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                            {IDENTITY.sections.about.title}
                        </h2>
                        <h3 className="text-xl md:text-2xl text-gray-600 font-medium tracking-tight">
                            {IDENTITY.content.about.headline}
                        </h3>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed border-l-4 border-black pl-6 py-2">
                        {IDENTITY.content.about.quote}
                    </blockquote>

                    {/* Bullets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-lg text-gray-700 leading-relaxed">
                        {IDENTITY.content.about.bullets.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <span className="mt-1.5 w-2 h-2 rounded-full bg-black shrink-0" />
                                <span>{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
