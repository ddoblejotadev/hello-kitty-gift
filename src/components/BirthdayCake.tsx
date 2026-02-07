"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdayCake({ onComplete }: { onComplete: () => void }) {
    const [candlesLit, setCandlesLit] = useState(true);
    const [showMessage, setShowMessage] = useState(false);

    const blowCandles = () => {
        setCandlesLit(false);

        // Massive celebration confetti
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFF', '#FFB6C1'],
        });

        setTimeout(() => {
            confetti({
                particleCount: 150,
                angle: 60,
                spread: 70,
                origin: { x: 0, y: 0.7 },
                colors: ['#FF69B4', '#FFD700', '#FF1493']
            });
            confetti({
                particleCount: 150,
                angle: 120,
                spread: 70,
                origin: { x: 1, y: 0.7 },
                colors: ['#FF69B4', '#FFD700', '#FF1493']
            });
        }, 200);

        setShowMessage(true);

        setTimeout(() => {
            onComplete();
        }, 4000);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mb-8 text-center"
                    >
                        <h2 className="text-4xl font-pacifico text-hk-hot mb-2">
                            ¡Feliz Cumpleaños! 🎉
                        </h2>
                        <p className="text-2xl font-quicksand text-hk-accent">
                            Que todos tus deseos se cumplan 💖✨
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative"
            >
                {/* Cake SVG */}
                <svg width="300" height="350" viewBox="0 0 300 350" className="drop-shadow-2xl">
                    {/* Plate */}
                    <ellipse cx="150" cy="320" rx="120" ry="20" fill="#E0E0E0" />

                    {/* Cake layers */}
                    <rect x="60" y="240" width="180" height="80" rx="10" fill="#FFB6C1" />
                    <rect x="70" y="180" width="160" height="60" rx="8" fill="#FF69B4" />
                    <rect x="80" y="130" width="140" height="50" rx="6" fill="#FFB6C1" />

                    {/* Frosting details */}
                    <path d="M 60 240 Q 70 230 80 240 Q 90 230 100 240 Q 110 230 120 240 Q 130 230 140 240 Q 150 230 160 240 Q 170 230 180 240 Q 190 230 200 240 Q 210 230 220 240 Q 230 230 240 240"
                        fill="white" opacity="0.7" />

                    {/* Decorative hearts */}
                    <text x="90" y="270" fontSize="24">💖</text>
                    <text x="180" y="270" fontSize="24">💖</text>
                    <text x="100" y="210" fontSize="20">✨</text>
                    <text x="170" y="210" fontSize="20">✨</text>

                    {/* Candles */}
                    {candlesLit ? (
                        <>
                            {/* Left candle */}
                            <rect x="110" y="100" width="15" height="30" fill="#FFD700" stroke="#333" strokeWidth="1" />
                            <motion.path
                                d="M 117.5 95 Q 115 85 117.5 80 Q 120 85 117.5 95"
                                fill="#FF6B00"
                                animate={{
                                    scaleY: [1, 1.1, 1],
                                    y: [0, -2, 0]
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            <ellipse cx="117.5" cy="95" rx="3" ry="2" fill="#FFD700" />

                            {/* Right candle */}
                            <rect x="175" y="100" width="15" height="30" fill="#FFD700" stroke="#333" strokeWidth="1" />
                            <motion.path
                                d="M 182.5 95 Q 180 85 182.5 80 Q 185 85 182.5 95"
                                fill="#FF6B00"
                                animate={{
                                    scaleY: [1, 1.1, 1],
                                    y: [0, -2, 0]
                                }}
                                transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.2
                                }}
                            />
                            <ellipse cx="182.5" cy="95" rx="3" ry="2" fill="#FFD700" />
                        </>
                    ) : (
                        <>
                            {/* Smoke after blowing */}
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2 }}
                            >
                                <motion.ellipse
                                    cx="117.5"
                                    cy="90"
                                    rx="4"
                                    ry="6"
                                    fill="#999"
                                    opacity="0.5"
                                    animate={{ y: [-10, -30] }}
                                    transition={{ duration: 2 }}
                                />
                                <motion.ellipse
                                    cx="182.5"
                                    cy="90"
                                    rx="4"
                                    ry="6"
                                    fill="#999"
                                    opacity="0.5"
                                    animate={{ y: [-10, -30] }}
                                    transition={{ duration: 2, delay: 0.2 }}
                                />
                            </motion.g>
                            {/* Candles without flame */}
                            <rect x="110" y="100" width="15" height="30" fill="#FFD700" stroke="#333" strokeWidth="1" />
                            <rect x="175" y="100" width="15" height="30" fill="#FFD700" stroke="#333" strokeWidth="1" />
                        </>
                    )}
                </svg>
            </motion.div>

            {candlesLit && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center"
                >
                    <p className="text-xl font-quicksand text-hk-accent mb-4">
                        Sopla las velitas y pide un deseo 💫
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={blowCandles}
                        className="glass text-hk-hot text-xl font-quicksand font-bold py-3 px-8 rounded-full border-2 border-hk-pink hover:bg-white/50 transition-all"
                    >
                        💨 Soplar
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
}
