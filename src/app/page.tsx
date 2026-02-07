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

    useEffect(() => {
        setIsClient(true);
        const stored = localStorage.getItem("seenQuotes");
        if (stored) {
            setSeenQuotes(JSON.parse(stored));
        }

        // Initialize sound
        setPlayKissSound(() => createKissSound());
    }, []);

    const handleStart = () => {
        setView("kitty");
        // Optional: Play sound
    };

    const handleKittyClick = () => {
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

        // Play sound effect
        if (playKissSound) {
            playKissSound();
        }

        // Trigger confetti explosion with hearts!
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF69B4', '#FFD1DC', '#FFF'],
            shapes: ['circle'] // 'heart' shape sometimes requires extra config/version, keeping safe with colors for now or we can try heart
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
                        <h1 className="font-pacifico text-6xl text-hk-hot mb-8 drop-shadow-md tracking-wide">
                            Para Ti 💖
                        </h1>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStart}
                            className="glass text-hk-accent text-2xl font-quicksand font-bold py-4 px-10 rounded-full border-2 border-white/50 hover:bg-white/50 transition-all"
                        >
                            Abrir Regalo ✨
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
