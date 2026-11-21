"use client";

import { motion } from "framer-motion";

interface EmptyStateProps {
  onReset: () => void;
  title?: string;
  description?: string;
}

export function EmptyState({
  onReset,
  title = "No events found matching your criteria",
  description = "Try adjusting your price range, date horizon, or search query to discover more experiences.",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center p-8 sm:p-14 text-center max-w-lg mx-auto bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-xl my-8"
      role="status"
      aria-live="polite"
    >
      {/* Custom Designed Animated SVG Illustration */}
      <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
        {/* Ambient glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl"
        />

        <svg
          viewBox="0 0 240 240"
          className="w-full h-full relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Calendar background plate */}
          <rect
            x="40"
            y="50"
            width="160"
            height="140"
            rx="24"
            className="fill-zinc-100 dark:fill-zinc-800 stroke-zinc-300 dark:stroke-zinc-700"
            strokeWidth="3"
          />

          {/* Top header bar */}
          <path
            d="M40 74C40 60.7452 50.7452 50 64 50H176C189.255 50 200 60.7452 200 74V84H40V74Z"
            className="fill-emerald-500"
          />

          {/* Binder clips */}
          <rect x="70" y="38" width="12" height="24" rx="6" className="fill-zinc-400 dark:fill-zinc-600" />
          <rect x="158" y="38" width="12" height="24" rx="6" className="fill-zinc-400 dark:fill-zinc-600" />

          {/* Calendar grid dots */}
          <circle cx="80" cy="115" r="5" className="fill-zinc-300 dark:fill-zinc-600" />
          <circle cx="120" cy="115" r="5" className="fill-zinc-300 dark:fill-zinc-600" />
          <circle cx="160" cy="115" r="5" className="fill-zinc-300 dark:fill-zinc-600" />
          <circle cx="80" cy="145" r="5" className="fill-zinc-300 dark:fill-zinc-600" />
          <circle cx="120" cy="145" r="5" className="fill-zinc-300 dark:fill-zinc-600" />
          <circle cx="160" cy="145" r="5" className="fill-zinc-300 dark:fill-zinc-600" />

          {/* Magnifying Glass with Floating Motion */}
          <motion.g
            animate={{
              x: [0, 8, -6, 0],
              y: [0, -8, 6, 0],
              rotate: [0, 4, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Glass Lens */}
            <circle
              cx="145"
              cy="135"
              r="34"
              className="fill-emerald-50/70 dark:fill-emerald-950/60 stroke-emerald-500"
              strokeWidth="4"
            />
            {/* Lens Reflection highlight */}
            <path
              d="M128 122C133 115 142 111 152 113"
              stroke="currentColor"
              className="text-emerald-300 dark:text-emerald-400"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Question Mark or Spark inside */}
            <motion.path
              d="M141 127C141 124 144 121 147 121C150 121 152 123 152 126C152 128 150 130 147 132V136"
              className="stroke-emerald-600 dark:stroke-emerald-400"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="147" cy="142" r="1.5" className="fill-emerald-600 dark:fill-emerald-400" />

            {/* Handle */}
            <line
              x1="170"
              y1="160"
              x2="198"
              y2="188"
              className="stroke-emerald-600 dark:stroke-emerald-400"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Floating decorative particles */}
          <motion.circle
            cx="65"
            cy="170"
            r="3"
            className="fill-emerald-400"
            animate={{ y: [0, -10, 0], opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.polygon
            points="180,95 183,101 189,102 185,106 186,112 180,109 174,112 175,106 171,102 177,101"
            className="fill-amber-400"
            animate={{ rotate: 360, scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-lg shadow-emerald-500/25 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
      >
        Clear All Filters
      </motion.button>
    </motion.div>
  );
}
