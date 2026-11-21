"use client";

import { motion } from "framer-motion";

interface PulseIconProps {
  className?: string;
  size?: number;
}

export function PulseIcon({ className = "", size = 28 }: PulseIconProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Subtle Emerald glow for the core pulse */}
          <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Radar Sonic Wave (Expanding Heartbeat Ring) */}
        <motion.circle
          cx="18"
          cy="18"
          r="10"
          stroke="#10B981"
          strokeWidth="1.2"
          fill="none"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{
            scale: [0.6, 1.45, 1.6],
            opacity: [0.9, 0.35, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: [0.21, 0.61, 0.35, 1],
          }}
          style={{ originX: "18px", originY: "18px" }}
        />

        {/* 2. Secondary Harmonic Ripple */}
        <motion.circle
          cx="18"
          cy="18"
          r="7"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="2 3"
          fill="none"
          animate={{
            scale: [0.8, 1.3],
            opacity: [0.5, 0],
            rotate: 360,
          }}
          transition={{
            scale: { duration: 2.4, repeat: Infinity, delay: 0.6, ease: "easeOut" },
            opacity: { duration: 2.4, repeat: Infinity, delay: 0.6, ease: "easeOut" },
            rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          }}
          style={{ originX: "18px", originY: "18px" }}
        />

        {/* 3. Outer Orbiting Synapses (4 Celestial Stage Nodes) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ originX: "18px", originY: "18px" }}
        >
          {/* 4 Cardinal Nodes */}
          <circle cx="18" cy="4" r="1.5" fill="#10B981" />
          <circle cx="32" cy="18" r="1.2" fill="#10B981" opacity="0.6" />
          <circle cx="18" cy="32" r="1.5" fill="#10B981" />
          <circle cx="4" cy="18" r="1.2" fill="#10B981" opacity="0.6" />
        </motion.g>

        {/* 4. The Iconic Monogram Letter 'P' forged from an ECG Cardiogram Wave */}
        {/* Continuous single stroke: Pulse baseline -> Spike -> Loop of P */}
        <motion.path
          d="M 12 26 L 12 10 M 12 10 C 12 10 16 9.5 19 12 C 22 14.5 21 19 18 20 C 15 21 12 20.5 12 20.5"
          stroke="#10B981"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 5. Live Cardiac Blip / Beacon Light traversing along the P-loop */}
        <motion.path
          d="M 7 20 L 11 20 L 13 15 L 15.5 25 L 18 18 L 20 20 L 29 20"
          stroke="#10B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0.2, pathOffset: 0, opacity: 0 }}
          animate={{
            pathLength: [0.15, 0.45, 0.15],
            pathOffset: [0, 1, 2],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* 6. Glowing Central Heartbeat Nucleus */}
        <motion.circle
          cx="17"
          cy="15"
          r="2.5"
          fill="#10B981"
          filter="url(#coreGlow)"
          animate={{
            scale: [1, 1.45, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: "17px", originY: "15px" }}
        />
        <circle cx="17" cy="15" r="1.2" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
