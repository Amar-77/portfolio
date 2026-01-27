"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ContributionDay } from "@/data/contributions";

// Utility to generate the last 365 days grid (52 weeks x 7 days)
const generateCalendarGrid = (contributions: ContributionDay[]) => {
    const today = new Date();
    const days: { date: string; count: number; level: number }[] = [];
    const contributionMap = new Map<string, ContributionDay>();
    contributions.forEach((day) => {
        contributionMap.set(day.date, day);
    });

    for (let i = 0; i < 364; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        const data = contributionMap.get(dateStr) || { date: dateStr, count: 0, level: 0 };
        days.unshift(data);
    }

    const weeks = [];
    while (days.length > 0) {
        weeks.push(days.splice(0, 7));
    }
    return weeks;
};

interface ProofOfWorkProps {
    initialData?: ContributionDay[];
}

export default function ProofOfWork({ initialData = [] }: ProofOfWorkProps) {
    const weeks = useMemo(() => generateCalendarGrid(initialData), [initialData]);
    const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

    return (
        <section className="py-24 px-6 bg-white text-black relative">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold tracking-tight">Proof of Work</h3>
                    <span className="text-xs font-mono text-gray-400">Consistency & Discipline</span>
                </div>

                {/* The "Box" - Contained Card (Light Theme) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.99 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-slate-50 rounded-xl p-8 sm:p-12 border border-slate-100 relative shadow-sm"
                >
                    {/* Inner Grid Container */}
                    <div className="flex flex-col items-center justify-center">
                        <div
                            className="w-full overflow-x-auto"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseLeave={() => setHoveredDay(null)} // Fix: Clear hover only when leaving the entire container
                        >
                            <div className="min-w-max mx-auto flex gap-[3px] items-end justify-center h-[160px]">
                                {weeks.map((week, weekIndex) => (
                                    <motion.div
                                        key={weekIndex}
                                        className="flex flex-col gap-[3px]"
                                        initial={{ y: -20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 50,
                                            damping: 15,
                                            mass: 0.5,
                                            delay: weekIndex * 0.01,
                                        }}
                                    >
                                        {week.map((day, dayIndex) => {
                                            const getBgColor = (level: number) => {
                                                // Light Theme Palette
                                                switch (level) {
                                                    case 1: return "#86efac"; // Emerald 300
                                                    case 2: return "#4ade80"; // Emerald 400
                                                    case 3: return "#22c55e"; // Emerald 500
                                                    case 4: return "#15803d"; // Emerald 700
                                                    default: return "#e2e8f0"; // Slate 200 (Empty)
                                                }
                                            };

                                            // Scale height slightly based on level
                                            const height = day.level > 0 ? 10 + (day.level * 3) : 10;

                                            return (
                                                <motion.div
                                                    key={`${weekIndex}-${dayIndex}`}
                                                    className="w-2.5 sm:w-3 rounded-[1px]"
                                                    style={{
                                                        backgroundColor: getBgColor(day.level),
                                                        height: `${height}px`,
                                                    }}
                                                    onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                                                // Removed individual onMouseLeave to prevent flicker
                                                />
                                            );
                                        })}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Footer inside the box */}
                        <div className="mt-8 flex justify-between items-center w-full px-1 border-t border-slate-200 pt-4">
                            <div className="h-6 flex items-center font-mono text-xs text-gray-500">
                                {hoveredDay ? (
                                    <span className="text-gray-600">
                                        <span className="font-semibold text-black">{hoveredDay.count}</span> contribution{hoveredDay.count !== 1 && 's'} on <span className="text-black">{hoveredDay.date}</span>
                                    </span>
                                ) : (
                                    <span>Hover for details</span>
                                )}
                            </div>

                            {/* Simple Legend */}
                            <div className="flex gap-1 items-center">
                                <span className="text-[10px] text-gray-400 mr-2">Less</span>
                                <div className="w-2 h-2 bg-slate-200 rounded-[1px]" />
                                <div className="w-2 h-2 bg-[#86efac] rounded-[1px]" />
                                <div className="w-2 h-2 bg-[#4ade80] rounded-[1px]" />
                                <div className="w-2 h-2 bg-[#22c55e] rounded-[1px]" />
                                <div className="w-2 h-2 bg-[#15803d] rounded-[1px]" />
                                <span className="text-[10px] text-gray-400 ml-2">More</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .overflow-x-auto::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
