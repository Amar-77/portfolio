"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/data/identity";

export default function Skills() {
    return (
        <section id="skills" className="py-32 px-6 bg-white text-black border-t border-black/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">

                <div className="md:w-1/3">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold tracking-tighter sticky top-32"
                    >
                        {IDENTITY.sections.skills.title}
                    </motion.h2>
                </div>

                <div className="md:w-2/3 space-y-16">
                    {IDENTITY.content.skills.map((group, index) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <h3 className="text-xl font-light text-gray-500 mb-6 uppercase tracking-widest">{group.category}</h3>
                            <div className="flex flex-wrap gap-4">
                                {group.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="text-2xl md:text-4xl font-semibold text-gray-400 hover:text-black transition-colors cursor-default"
                                    >
                                        {skill} <span className="text-gray-200 mx-2">/</span>
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
