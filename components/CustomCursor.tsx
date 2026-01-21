"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: "-50%",
                translateY: "-50%",
                opacity: isVisible ? 1 : 0,
            }}
        >
            {/* Black Thick Triangle */}
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white drop-shadow-md" // Using white with mix-blend-difference makes it invert colors (visible on white and black)
            >
                <path
                    d="M12 2L2 22H22L12 2Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        </motion.div>
    );
}
