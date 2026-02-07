"use client";

import { useState, useEffect } from "react";
import Background from "@/components/Background";
import HelloKitty from "@/components/HelloKitty";
import QuoteCard from "@/components/QuoteCard";
import { phrases } from "@/data/phrases";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { createKissSound } from "@/utils/sound";

export default function Home() {
    const [view, setView] = useState<"welcome" | "kitty" | "quote">("welcome");
    const [currentQuote, setCurrentQuote] = useState("");
    const [seenQuotes, setSeenQuotes] = useState<string[]>([]);
    const [isClient, setIsClient] = useState(false);
    const [playKissSound, setPlayKissSound] = useState<(() => void) | null>(null);
    const [isBirthdayMode, setIsBirthdayMode] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const stored = localStorage.getItem("seenQuotes");
        if (stored) {
            setSeenQuotes(JSON.parse(stored));
        }

        // Initialize sound
        setPlayKissSound(() => createKissSound());

        // Check if today is her birthday (February 7)
        const today = new Date();
        const isBirthday = today.getMonth() === 1 && today.getDate() === 7; // Month is 0-indexed
        setIsBirthdayMode(isBirthday);
    }, []);

    const handleStart = () => {
        setView("kitty");
    };

    const getTimeBasedGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 6 && hour < 12) {
            return "Buenos días mi gatita hermosa ☀️ Espero que tengas un día increíble 💖";
        } else if (hour >= 12 && hour < 20) {
            return "Buenas tardes mi amorcito 🌤️ Espero que tu día esté yendo genial 💕";
        } else {
            return "Buenas noches bebe 🌙 Descansa bien, te amo ✨💖";
        }
    };

    const handleKittyClick = () => {
        // 10% chance to show time-based greeting
        const showTimeGreeting = Math.random() < 0.1;

        if (showTimeGreeting) {
            setCurrentQuote(getTimeBasedGreeting());
        } else {
            const availableQuotes = phrases.filter(q => !seenQuotes.includes(q));

            if (availableQuotes.length === 0) {
                setCurrentQuote("¡Ya has visto todas mis notitas! Eres increíble. Te amo ❤️ (Reiniciando...)");
                setSeenQuotes([]);
                localStorage.setItem("seenQuotes", JSON.stringify([]));
            } else {
                const randomIndex = Math.floor(Math.random() * availableQuotes.length);
                const newQuote = availableQuotes[randomIndex];
                setCurrentQuote(newQuote);

                const newSeen = [...seenQuotes, newQuote];
                setSeenQuotes(newSeen);
                localStorage.setItem("seenQuotes", JSON.stringify(newSeen));
            }
        }

        // Play sound effect
        if (playKissSound) {
            playKissSound();
        }

        // Birthday mode: MEGA confetti explosion!
        if (isBirthdayMode) {
            // Massive birthday confetti burst
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFF', '#FFB6C1', '#00CED1'],
                shapes: ['circle', 'square']
            });

            // Multiple bursts from different angles
            setTimeout(() => {
                confetti({
                    particleCount: 150,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0, y: 0.7 },
                    colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFF']
                });
                confetti({
                    particleCount: 150,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1, y: 0.7 },
                    colors: ['#FF69B4', '#FFD700', '#FF1493', '#FFF']
                });
            }, 200);

            // Top burst
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 120,
                    origin: { y: 0.3 },
                    colors: ['#FFD700', '#FF69B4', '#00CED1']
                });
            }, 400);
        } else {
            // Regular confetti explosion with hearts
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF69B4', '#FFD1DC', '#FFF'],
                shapes: ['circle']
            });

            // Fire a second burst for more effect
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FF69B4', '#FFD1DC', '#FFF']
                });
                confetti({
                    particleCount: 100,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF69B4', '#FFD1DC', '#FFF']
                });
            }, 250);
        }

        setView("quote");
    };

    const handleReset = () => {
        setView("kitty");
    };

    if (!isClient) return null; // Hydration fix

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden relative">
            <Background />

            <AnimatePresence mode="wait">
                {view === "welcome" && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center z-10"
                    >
                        {isBirthdayMode ? (
                            <>
                                <motion.h1
                                    className="font-pacifico text-7xl text-hk-hot mb-4 drop-shadow-md tracking-wide"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        rotate: [0, 2, -2, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    ¡Feliz Cumpleaños! 🎂
                                </motion.h1>
                                <p className="text-3xl font-quicksand text-hk-accent mb-8 drop-shadow">
                                    Mi Gatita Hermosa 💖✨
                                </p>
                            </>
                        ) : (
                            <h1 className="font-pacifico text-6xl text-hk-hot mb-8 drop-shadow-md tracking-wide">
                                Para Ti 💖
                            </h1>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStart}
                            className={`glass text-2xl font-quicksand font-bold py-4 px-10 rounded-full border-2 border-white/50 hover:bg-white/50 transition-all ${isBirthdayMode ? 'text-yellow-400 animate-pulse' : 'text-hk-accent'
                                }`}
                        >
                            {isBirthdayMode ? '🎉 Abrir Regalo de Cumpleaños 🎁' : 'Abrir Regalo ✨'}
                        </motion.button>
                    </motion.div>
                )}

                {view === "kitty" && (
                    <motion.div
                        key="kitty"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="z-10"
                    >
                        <HelloKitty onClick={handleKittyClick} />
                    </motion.div>
                )}

                {view === "quote" && (
                    <motion.div
                        key="quote"
                        className="z-10 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <QuoteCard quote={currentQuote} onReset={handleReset} />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
