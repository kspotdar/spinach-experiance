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
import { motion, useScroll, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";

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

      {/* Comprehensive Large Footer with Newsletter & LocalStorage Persistence */}
      <Footer />
    </div>
  );
}
