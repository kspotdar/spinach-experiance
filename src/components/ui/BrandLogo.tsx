"use client";

import { motion } from "framer-motion";

export function BrandLogo() {
  return (
    <div className="relative flex items-center gap-3 cursor-pointer select-none group py-1">
      {/* Centered, Prominent Transparent PulseFest Emblem */}
      <div className="flex items-center justify-center self-center shrink-0">
        <img
          src="/pulsefest-icon.png"
          alt="PulseFest Icon"
          className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0 group-hover:scale-105 transition-transform drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]"
        />
      </div>

      <div className="flex flex-col items-start justify-center self-center">
        <div className="flex items-center gap-2">
          {/* Main Logo Text with High-Craft Visual Presence */}
          <div className="relative font-black text-2xl tracking-tight leading-none text-zinc-900 dark:text-white flex items-center">
            <span className="tracking-tight">Pulse</span>
            <span className="animate-liquid-pulse font-black ml-0.5">Fest</span>
          </div>
        </div>

        {/* Kinetic Audio Frequency Waveform Underline (Living ECG & Soundwave Hybrid) */}
        <div className="relative w-full max-w-[170px] h-3 mt-1 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 170 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Subtle baseline track */}
            <line
              x1="0"
              y1="6"
              x2="170"
              y2="6"
              stroke="currentColor"
              strokeOpacity="0.1"
              strokeWidth="1"
            />

            {/* Dynamic Traveling Sound Waveform Path */}
            <motion.path
              d="M 0 6 L 30 6 L 40 6 L 50 2 L 60 10 L 70 0 L 80 12 L 90 4 L 100 8 L 110 6 L 170 6"
              stroke="url(#brandWaveGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0.25, pathOffset: 0 }}
              animate={{
                pathOffset: [0, 1],
                pathLength: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Neon traveling blip particle on the waveform */}
            <motion.circle
              r="1.8"
              fill="#34D399"
              animate={{
                cx: [0, 50, 70, 80, 110, 170],
                cy: [6, 2, 0, 12, 6, 6],
                opacity: [0, 1, 1, 1, 0.8, 0],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <defs>
              <linearGradient id="brandWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#34D399" />
                <stop offset="65%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="text-[10px] uppercase font-semibold text-zinc-400 dark:text-zinc-500 tracking-wider -mt-0.5">
          Experience Discovery Engine
        </p>
      </div>
    </div>
  );
}
