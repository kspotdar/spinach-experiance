"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { FilterBar } from "@/components/filters/FilterBar";
import { EventGrid } from "@/components/events/EventGrid";
import { SavedDrawer } from "@/components/layout/SavedDrawer";
import { EVENTS_DATA } from "@/data/events";
import { useSavedEvents } from "@/hooks/useSavedEvents";
import { useEventFilters } from "@/hooks/useEventFilters";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const eventsSectionRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Bar for advanced interaction
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Saved events state
  const {
    savedEvents,
    toggleSave,
    isSaved,
    clearAllSaved,
    savedCount,
  } = useSavedEvents(EVENTS_DATA);

  // Filters and search logic
  const {
    filters,
    setFilters,
    filteredEvents,
    resetFilters,
    totalCount,
    filteredCount,
  } = useEventFilters(EVENTS_DATA);

  const scrollToEvents = () => {
    if (eventsSectionRef.current) {
      eventsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">
      {/* Scroll-triggered Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        savedCount={savedCount}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero Section */}
        <Hero onExploreClick={scrollToEvents} totalEvents={totalCount} />

        {/* Discovery & Filters Section */}
        <section ref={eventsSectionRef} id="explore" className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Curated Schedule</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
                Upcoming Experiences
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Showing <span className="font-bold text-zinc-900 dark:text-zinc-100">{filteredCount}</span> of {totalCount} events
            </p>
          </div>

          {/* Interactive Filters */}
          <FilterBar
            filters={filters}
            onChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
            onReset={resetFilters}
          />

          {/* Staggered Event Grid */}
          <EventGrid
            events={filteredEvents}
            isSaved={isSaved}
            onToggleSave={toggleSave}
            onResetFilters={resetFilters}
          />
        </section>
      </main>

      {/* Saved Events Drawer */}
      <SavedDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        savedEvents={savedEvents}
        onRemove={toggleSave}
        onClearAll={clearAllSaved}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 py-10 bg-white/50 dark:bg-zinc-900/40 text-center text-xs text-zinc-500 dark:text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 PulseFest Experience Engine. Local JSON Driven Discovery.</p>
          <div className="flex items-center gap-1">
            <span>Engineered with React 19, TypeScript & Framer Motion</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
