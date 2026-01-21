"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/data/identity";

export default function Journey() {
    return (
        <section id="journey" className="py-32 px-6 bg-white text-black border-t border-black/5">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-24 tracking-tighter text-center"
                >
                    {IDENTITY.sections.journey.title}
                </motion.h2>

                <div className="space-y-12">
                    {IDENTITY.content.journey.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col md:flex-row items-baseline justify-between py-8 border-b border-black/10 hover:border-black/30 transition-colors"
                        >
                            <span className="text-5xl font-bold text-gray-200">{item.year}</span>
                            <div className="md:text-right mt-4 md:mt-0">
                                <h3 className="text-2xl font-medium text-black">{item.title}</h3>
                                <p className="text-gray-500 mt-1">{item.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
