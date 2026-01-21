"use client";

import { motion } from "framer-motion";
import { IDENTITY } from "@/data/identity";

export default function Projects() {
    return (
        <section id="projects" className="py-32 px-6 bg-white text-black">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-24 tracking-tighter"
                >
                    {IDENTITY.sections.projects.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {IDENTITY.content.projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative border border-black/10 bg-black/5 p-8 hover:bg-black/10 transition-colors duration-500 flex flex-col h-full rounded-3xl"
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 z-10"
                                aria-label={`View ${project.title} on GitHub`}
                            >
                                <span className="sr-only">View on GitHub</span>
                            </a>

                            <div className="mb-8 aspect-video bg-white overflow-hidden relative shadow-sm rounded-2xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-2xl font-semibold mb-3 group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                                <p className="text-gray-600 mb-6">{project.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-xs font-mono text-gray-500 border border-black/10 px-2 py-1 bg-white/50 rounded-lg">
                                        {tag}
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
