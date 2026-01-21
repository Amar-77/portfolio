"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { IDENTITY } from "@/data/identity";

export default function Contact() {
    return (
        <section id="contact" className="py-40 px-6 bg-white text-black flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl"
            >
                <h2 className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 leading-[0.8]">
                    {IDENTITY.sections.contact.title}
                </h2>

                <div className="mt-12 flex justify-center gap-8 text-black/60">
                    <a
                        href={`mailto:${IDENTITY.sections.contact.email}`}
                        className="hover:text-black transition-colors hover:scale-110 transform duration-200"
                        aria-label="Email"
                    >
                        <Mail size={40} />
                    </a>
                    <a
                        href={IDENTITY.sections.contact.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors hover:scale-110 transform duration-200"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={40} />
                    </a>
                    <a
                        href={IDENTITY.sections.contact.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors hover:scale-110 transform duration-200"
                        aria-label="GitHub"
                    >
                        <Github size={40} />
                    </a>
                    <a
                        href={IDENTITY.sections.contact.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-black transition-colors hover:scale-110 transform duration-200"
                        aria-label="Instagram"
                    >
                        <Instagram size={40} />
                    </a>
                </div>
            </motion.div>
        </section>
    );
}
