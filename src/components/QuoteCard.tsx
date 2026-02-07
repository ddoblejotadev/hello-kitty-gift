"use client";

import { motion } from "framer-motion";

export default function QuoteCard({ quote, onReset }: { quote: string, onReset: () => void }) {
    return (
        <div className="relative max-w-sm mx-auto p-8 glass rounded-3xl text-center transform transition-all duration-500 hover:scale-105">
            <div className="absolute -top-6 -left-6 text-4xl animate-bounce">🎀</div>
            <div className="absolute -bottom-6 -right-6 text-4xl animate-bounce delay-700">💖</div>

            <h2 className="text-2xl font-quicksand font-bold text-hk-accent mb-4 leading-relaxed">
                "{quote}"
            </h2>

            <button
                onClick={onReset}
                className="mt-6 px-6 py-2 bg-hk-hot text-white rounded-full font-bold shadow-md hover:bg-hk-accent transition-colors"
            >
                Otra vez ↺
            </button>
        </div>
    );
}
