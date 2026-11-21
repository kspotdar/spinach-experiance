"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Trash2, ArrowRight } from "lucide-react";
import { EventItem } from "@/types/event";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedEvents: EventItem[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onSelectEvent?: (id: string) => void;
}

export function SavedDrawer({
  isOpen,
  onClose,
  savedEvents,
  onRemove,
  onClearAll,
  onSelectEvent,
}: SavedDrawerProps) {
  // ESC key handler for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCardClick = (id: string) => {
    onClose();
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Saved Events Drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  Saved Experiences
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {savedEvents.length}
                </span>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close drawer"
                className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Event List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {savedEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 mb-4">
                    <Calendar className="w-8 h-8 opacity-60" />
                  </div>
                  <h3 className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                    No events saved yet
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mb-6">
                    Tap the bookmark icon on any event card to save it here for quick access later.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
                  >
                    Browse Events
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {savedEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                      onClick={() => handleCardClick(event.id)}
                      className="group relative flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-800/60 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 transition-all hover:shadow-md cursor-pointer select-none"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 cursor-pointer">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
                          {event.category}
                        </span>
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{event.displayDate}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {formatPrice(event.price, event.currency)}
                          </span>
                          <span className="text-[10px] text-zinc-400 truncate max-w-[100px]">
                            {event.location.city}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(event.id);
                        }}
                        aria-label={`Remove ${event.title} from saved`}
                        className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer with Clear All & Checkout CTA */}
            {savedEvents.length > 0 && (
              <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Total Bookmarks</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {savedEvents.length} {savedEvents.length === 1 ? "Event" : "Events"}
                  </span>
                </div>
                <div className="flex gap-2.5">
                  <button
                    onClick={onClearAll}
                    className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => {
                      alert("RSVP confirmation summary generated!");
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 transition-colors cursor-pointer"
                  >
                    <span>Bulk RSVP</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
