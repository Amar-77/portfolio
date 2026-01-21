"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from "framer-motion";
import IdentityTextOverlay from "./IdentityTextOverlay";

const FRAME_COUNT = 238;
const IMAGES_DIR = "/portfolio/amar_animation";

export default function HeroScrollExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Scroll progress of this specific section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        const loadImages = async () => {
            for (let i = 0; i < FRAME_COUNT; i++) {
                const img = new Image();
                // Filename format: upscaled-video_2000.jpg
                // We start at 2000
                const fileIndex = 2000 + i;
                img.src = `${IMAGES_DIR}/upscaled-video_${fileIndex}.jpg`;

                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if error
                });

                imgArray.push(img);
                loadedCount++;
                // Optional: Update loading state here if we want a progress bar
            }
            setImages(imgArray);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Draw frame
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Use smoothProgress changes to draw
        const render = (progress: number) => {
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress * (FRAME_COUNT - 1))
            );

            const img = images[frameIndex];
            if (img) {
                // Responsive cover fit
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // We want the image to be positioned on the right side.
                // Let's create a focus point around 75% of width.
                const scale = Math.max(
                    canvas.width / img.width,
                    canvas.height / img.height
                ) * 1.1; // Slight zoom to ensure coverage

                // Center X at 70% of screen width
                const x = (canvas.width * 0.7) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        // Initial draw
        render(smoothProgress.get());

        // Subscribe to updates
        const unsubscribe = smoothProgress.on("change", (latest) => {
            render(latest);
        });

        return () => unsubscribe();
    }, [images, smoothProgress]);

    // Pass raw progress to overlay for text switching logic
    const [progressVal, setProgressVal] = useState(0);
    useMotionValueEvent(smoothProgress, "change", (latest: number) => {
        setProgressVal(latest);
    });

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-black z-50">
                        Loading Experience...
                    </div>
                )}

                {/* Canvas for Video/Image Sequence */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Text Overlay */}
                <IdentityTextOverlay scrollProgress={progressVal} />

                {/* Scroll Indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 left-10 text-black/50 text-sm animate-bounce"
                >
                    Scroll to Explore
                </motion.div>
            </div>
        </div>
    );
}
