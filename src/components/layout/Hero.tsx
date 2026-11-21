"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowDown, Compass } from "lucide-react";
import { Magnetic } from "@/components/ui/InteractiveMotion";

interface HeroProps {
  onExploreClick: () => void;
  totalEvents: number;
}

export function Hero({ onExploreClick, totalEvents }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background Animated Gradient Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-emerald-500/15 via-teal-400/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>Discover {totalEvents}+ Curated Global Experiences</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1] mb-6"
        >
          Where Visionaries Gather.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500">
            Unforgettable
          </span>{" "}
          Moments Happen.
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Explore leading conferences, kinetic art showcases, synth concerts, and founder roundtables. Built for design-conscious explorers.
        </motion.p>

        {/* CTAs with Advanced Magnetic Interaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic strength={0.4}>
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>Explore All Events</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </Magnetic>

          <Magnetic strength={0.25}>
            <button
              onClick={() => {
                const searchEl = document.querySelector('input[type="text"]') as HTMLInputElement;
                if (searchEl) searchEl.focus();
              }}
              className="px-6 py-3.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-medium text-sm sm:text-base border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              Search by Category
            </button>
          </Magnetic>
        </motion.div>

        {/* Stat Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mt-14 pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60"
        >
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              100%
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
              Verified Organizers
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              Free & VIP
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
              Tier Options
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              Instant
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
              Offline Bookmarks
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
