"use client";

import { motion } from "framer-motion";

export default function HelloKitty({ onClick }: { onClick: () => void }) {
    return (
        <motion.div
            className="relative cursor-pointer group"
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            style={{ WebkitTapHighlightColor: 'transparent' }}
        >
            <div className="relative w-72 h-72 drop-shadow-2xl filter">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Head */}
                    <ellipse cx="100" cy="110" rx="75" ry="55" fill="white" stroke="#333" strokeWidth="3" />

                    {/* Ears */}
                    <path d="M35 75 L30 50 L60 60 Z" fill="white" stroke="#333" strokeWidth="3" strokeLinejoin="round" />
                    <path d="M165 75 L170 50 L140 60 Z" fill="white" stroke="#333" strokeWidth="3" strokeLinejoin="round" />

                    {/* Bow (The iconic red/pink bow) */}
                    <g transform="translate(130, 60) rotate(15)">
                        <path d="M0 10 Q5 0 20 5 Q35 0 40 10 Q45 25 30 30 Q40 40 20 40 Q0 40 10 30 Q-5 25 0 10 Z" fill="#FF1493" stroke="#333" strokeWidth="2" />
                        <circle cx="20" cy="20" r="6" fill="#FF69B4" stroke="#333" strokeWidth="2" />
                    </g>

                    {/* Eyes */}
                    <ellipse cx="70" cy="115" rx="5" ry="7" fill="#333" />
                    <ellipse cx="130" cy="115" rx="5" ry="7" fill="#333" />

                    {/* Nose */}
                    <ellipse cx="100" cy="125" rx="6" ry="4" fill="#FFD700" stroke="#333" strokeWidth="1" />

                    {/* Whiskers */}
                    <g stroke="#333" strokeWidth="2" strokeLinecap="round">
                        <line x1="25" y1="105" x2="55" y2="110" />
                        <line x1="25" y1="120" x2="55" y2="120" />
                        <line x1="25" y1="135" x2="55" y2="130" />

                        <line x1="145" y1="110" x2="175" y2="105" />
                        <line x1="145" y1="120" x2="175" y2="120" />
                        <line x1="145" y1="130" x2="175" y2="135" />
                    </g>
                </svg>
            </div>

            {/* "Tap Me" Badge - Fixed for Safari */}
            <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-2 rounded-full text-hk-hot font-bold shadow-lg border border-hk-pink whitespace-nowrap"
                style={{
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                }}
                animate={{
                    y: [0, -8, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }}
            >
                ✨ ¡Tócame! ✨
            </motion.div>
        </motion.div>
    );
}
