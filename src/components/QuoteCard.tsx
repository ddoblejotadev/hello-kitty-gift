"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

export default function QuoteCard({ quote, onReset }: { quote: string, onReset: () => void }) {
    const handleShare = async () => {
        const shareText = `💖 ${quote}\n\n✨ Un mensaje especial de amor`;
        const shareUrl = "https://hello-kitty-gift.vercel.app";

        // Try Web Share API first (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Un mensaje para ti 💖",
                    text: shareText,
                    url: shareUrl
                });
            } catch (err) {
                // User cancelled or error occurred
                console.log("Share cancelled");
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
                alert("¡Mensaje copiado! Ahora puedes pegarlo donde quieras 💖");
            } catch (err) {
                alert("No se pudo compartir. Copia manualmente: " + shareText);
            }
        }
    };

    return (
        <div className="relative max-w-sm mx-auto p-8 glass rounded-3xl text-center transform transition-all duration-500 hover:scale-105">
            <div className="absolute -top-6 -left-6 text-4xl animate-bounce">🎀</div>
            <div className="absolute -bottom-6 -right-6 text-4xl animate-bounce delay-700">💖</div>

            <h2 className="text-2xl font-quicksand font-bold text-hk-accent mb-4 leading-relaxed">
                "{quote}"
            </h2>

            <div className="flex gap-3 justify-center mt-6">
                <button
                    onClick={onReset}
                    className="px-6 py-2 bg-hk-hot text-white rounded-full font-bold shadow-md hover:bg-hk-accent transition-colors"
                >
                    Otra vez ↺
                </button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="px-6 py-2 bg-pink-500 text-white rounded-full font-bold shadow-md hover:bg-pink-600 transition-colors flex items-center gap-2"
                    title="Compartir este mensaje"
                >
                    <Share2 size={18} />
                    Compartir
                </motion.button>
            </div>
        </div>
    );
}
