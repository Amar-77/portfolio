"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useSpring, useMotionValueEvent } from "framer-motion";
import IdentityTextOverlay from "./IdentityTextOverlay";
import Preloader from "./Preloader";

// 190 frames as per the new folder content
const FRAME_COUNT = 190;
// Note: We use the base path for production compatibility
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

    // Preload images with progressive loading strategy
    useEffect(() => {
        const imgArray: HTMLImageElement[] = new Array(FRAME_COUNT);
        let loadedCount = 0;

        const updateLoadingProgress = () => {
            loadedCount++;
            // Mark as loaded when we have enough frames for smooth playback (Phase 1 complete)
            if (loadedCount >= Math.ceil(FRAME_COUNT / 10)) {
                setIsLoaded(true);
            }
        };

        const loadImage = (index: number, priority: number = 0): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();
                const paddedIndex = index.toString().padStart(3, "0");
                img.src = `${IMAGES_DIR}/upscaled-video${paddedIndex}.webp`;

                img.onload = () => {
                    imgArray[index] = img;
                    updateLoadingProgress();
                    resolve();
                };
                img.onerror = () => {
                    // Create placeholder to prevent gaps
                    imgArray[index] = img;
                    resolve();
                };
            });
        };

        const loadImagesProgressively = async () => {
            // Phase 1: Load every 10th frame (19 frames = ~300KB)
            // This gives us instant playback capability
            const phase1Promises: Promise<void>[] = [];
            for (let i = 0; i < FRAME_COUNT; i += 10) {
                phase1Promises.push(loadImage(i, 1));
            }
            await Promise.all(phase1Promises);
            setImages([...imgArray]); // Trigger first render

            // Phase 2: Load every 5th frame (fill gaps)
            const phase2Promises: Promise<void>[] = [];
            for (let i = 0; i < FRAME_COUNT; i += 5) {
                if (i % 10 !== 0) { // Skip already loaded frames
                    phase2Promises.push(loadImage(i, 2));
                }
            }
            await Promise.all(phase2Promises);
            setImages([...imgArray]); // Update with more frames

            // Phase 3: Load remaining frames (background)
            // Use requestIdleCallback for non-blocking load
            const phase3Indices: number[] = [];
            for (let i = 0; i < FRAME_COUNT; i++) {
                if (i % 5 !== 0) { // Skip already loaded frames
                    phase3Indices.push(i);
                }
            }

            // Load in small batches to avoid blocking
            const batchSize = 10;
            for (let i = 0; i < phase3Indices.length; i += batchSize) {
                const batch = phase3Indices.slice(i, i + batchSize);
                await Promise.all(batch.map(idx => loadImage(idx, 3)));
                setImages([...imgArray]); // Progressive updates

                // Small delay to prevent blocking
                await new Promise(resolve => setTimeout(resolve, 50));
            }
        };

        loadImagesProgressively();
    }, []);

    // Draw frame with fallback for progressive loading
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = (progress: number) => {
            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress * (FRAME_COUNT - 1))
            );

            // Find the nearest loaded frame (for progressive loading)
            let img = images[frameIndex];
            if (!img) {
                // Search for nearest loaded frame
                for (let offset = 1; offset < FRAME_COUNT; offset++) {
                    const before = frameIndex - offset;
                    const after = frameIndex + offset;

                    if (before >= 0 && images[before]) {
                        img = images[before];
                        break;
                    }
                    if (after < FRAME_COUNT && images[after]) {
                        img = images[after];
                        break;
                    }
                }
            }

            if (img && img.complete && img.naturalWidth > 0) {
                // Responsive cover fit calculation
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const scale = Math.max(
                    canvas.width / img.width,
                    canvas.height / img.height
                ) * 1.0; // Exact fit

                // Position on the right side (70% of width)
                const x = (canvas.width * 0.7) - (img.width / 2) * scale;
                const y = (canvas.height / 2) - (img.height / 2) * scale;

                // Optional: Adjust X if you want it off-center like before
                // const x = (canvas.width * 0.7) - (img.width / 2) * scale;

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

                {/* Creative Preloader - Handles its own exit animation */}
                <Preloader loaded={isLoaded} />

                {/* Canvas for Image Sequence */}
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
