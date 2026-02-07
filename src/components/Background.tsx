"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-hk-pink/40 text-4xl"
                    initial={{
                        opacity: 0,
                        y: "110vh",
                        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 300),
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        y: "-10vh",
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear",
                    }}
                >
                    {i % 2 === 0 ? "💖" : "🎀"}
                </motion.div>
            ))}
        </div>
    );
}
