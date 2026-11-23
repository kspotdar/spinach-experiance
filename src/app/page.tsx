"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { FilterBar } from "@/components/filters/FilterBar";
import { EventGrid } from "@/components/events/EventGrid";
import { SavedDrawer } from "@/components/layout/SavedDrawer";
import { SponsorsMarquee } from "@/components/layout/SponsorsMarquee";
import { Footer } from "@/components/layout/Footer";
import { EVENTS_DATA } from "@/data/events";
import { useSavedEvents } from "@/hooks/useSavedEvents";
import { useEventFilters } from "@/hooks/useEventFilters";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Sparkles, Bookmark } from "lucide-react";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const eventsSectionRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Bar for advanced scroll interaction
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

  // Dedicated in-section filters and search logic
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

  const handleSelectEventFromHeaderOrDrawer = (id: string) => {
    // If the event is currently filtered out, reset category/search so it shows up
    const isCurrentlyVisible = filteredEvents.some((e) => e.id === id);
    if (!isCurrentlyVisible) {
      resetFilters();
    }
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-4", "ring-emerald-500");
        setTimeout(() => el.classList.remove("ring-4", "ring-emerald-500"), 2000);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 selection:bg-emerald-500 selection:text-white w-full">
      {/* Scroll-triggered Reading Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Header with Quick Dropdown Search */}
      <Header
        savedCount={savedCount}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onSelectEvent={handleSelectEventFromHeaderOrDrawer}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero Section */}
        <Hero onExploreClick={scrollToEvents} totalEvents={totalCount} />

        {/* Discovery & Filters Section with Generous Consistent Rhythm */}
        <section ref={eventsSectionRef} id="explore" className="pt-20 sm:pt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Curated Schedule</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Upcoming Experiences
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Showing <span className="font-bold text-zinc-900 dark:text-zinc-100">{filteredCount}</span> of {totalCount} events
            </p>
          </div>

          {/* Dedicated Section Filters & Search */}
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

        {/* Global Sponsors Marquee Strip (Greyscale by default, Color on Hover) */}
        <div className="mt-20 sm:mt-28">
          <SponsorsMarquee />
        </div>
      </main>

      {/* Saved Events Drawer */}
      <SavedDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        savedEvents={savedEvents}
        onRemove={toggleSave}
        onClearAll={clearAllSaved}
        onSelectEvent={handleSelectEventFromHeaderOrDrawer}
      />

      {/* Floating Action Button (Mobile View - Chatbot Style Bottom Right, hides when drawer is open) */}
      <AnimatePresence>
        {!isDrawerOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsDrawerOpen(true)}
            aria-label={`Open saved events (${savedCount} saved)`}
            className="sm:hidden fixed bottom-6 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-[0_10px_25px_rgba(16,185,129,0.45)] border-2 border-white/20 hover:bg-emerald-500 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
          >
            <Bookmark className="w-6 h-6 fill-white/20" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-2 border-white dark:border-zinc-900 text-[11px] font-extrabold shadow-md animate-pulse">
                {savedCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Comprehensive Large Footer with Newsletter & LocalStorage Persistence */}
      <Footer />
    </div>
  );
}
