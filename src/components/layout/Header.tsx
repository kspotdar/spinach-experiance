"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Moon, Sun, Bookmark, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { EVENTS_DATA } from "@/data/events";
import { formatPrice } from "@/lib/utils";
import { BrandLogo } from "@/components/ui/BrandLogo";
import Image from "next/image";

interface HeaderProps {
  savedCount: number;
  onOpenDrawer: () => void;
  onSelectEvent?: (eventId: string) => void;
}

export function Header({
  savedCount,
  onOpenDrawer,
  onSelectEvent,
}: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [headerQuery, setHeaderQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const hasDarkClass = document.documentElement.classList.contains("dark");
    setIsDark(hasDarkClass);
  }, []);

  // Monitor scroll for subtle shadow & blur effect (Clean sticky like Mahamaya)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Dedicated Header Quick Search Results
  const searchResults = useMemo(() => {
    if (!headerQuery.trim()) return [];
    const q = headerQuery.toLowerCase();
    return EVENTS_DATA.filter((evt) => {
      return (
        evt.title.toLowerCase().includes(q) ||
        evt.category.toLowerCase().includes(q) ||
        evt.location.city.toLowerCase().includes(q) ||
        evt.tags.some((t) => t.toLowerCase().includes(q))
      );
    }).slice(0, 5); // top 5 results in header
  }, [headerQuery]);

  const handleSelectEvent = (id: string) => {
    setIsDropdownOpen(false);
    setHeaderQuery("");
    if (onSelectEvent) {
      onSelectEvent(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-[60] w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-sm border-b border-zinc-200/80 dark:border-zinc-800/80"
          : "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-200/50 dark:border-zinc-800/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Animated Brand Typography (Logo Text with Live Waveform Shimmer & Pulse) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <BrandLogo />
        </motion.div>

        {/* Header Instant Search Bar with Inline Dropdown Results */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-6 min-w-0">
          <div className="relative group">
            <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-emerald-500 transition-colors pointer-events-none" />
            <input
              type="text"
              value={headerQuery}
              onChange={(e) => {
                setHeaderQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => {
                if (headerQuery.trim()) setIsDropdownOpen(true);
              }}
              placeholder="Quick search events in dropdown..."
              aria-label="Quick search events"
              className="w-full pl-10 pr-8 py-2.5 rounded-full text-xs sm:text-sm bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all cursor-text shadow-inner"
            />
            {headerQuery && (
              <button
                onClick={() => {
                  setHeaderQuery("");
                  setIsDropdownOpen(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                aria-label="Clear header search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Search Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && headerQuery.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-2xl overflow-hidden z-50 p-2"
                role="listbox"
              >
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-zinc-500 dark:text-zinc-400">
                    No matching events found for &quot;{headerQuery}&quot;
                  </div>
                ) : (
                  <div>
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Quick Matches ({searchResults.length})
                    </div>
                    {searchResults.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => handleSelectEvent(evt.id)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer transition-colors group"
                        role="option"
                        aria-selected="false"
                      >
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={evt.image}
                            alt={evt.title}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {evt.title}
                            </h4>
                            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 ml-2">
                              {formatPrice(evt.price, evt.currency)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-zinc-400" />
                              {evt.displayDate}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-zinc-400" />
                              {evt.location.city}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls: Theme Toggle & Saved Drawer Button */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Theme Toggle Button */}
          {mounted && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="p-2 sm:p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200/80 dark:border-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer shrink-0"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </motion.button>
          )}

          {/* Saved Drawer Trigger Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            onClick={onOpenDrawer}
            aria-label={`Open saved events drawer (${savedCount} saved)`}
            className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 cursor-pointer shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white/20 shrink-0" />
            <span className="hidden sm:inline">Saved</span>
            <span className="flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-4 sm:h-5 px-1 sm:px-1.5 rounded-full bg-white text-emerald-700 text-[10px] sm:text-xs font-bold">
              {savedCount}
            </span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}
