"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Trash2, ArrowRight, CheckCircle2, Ticket, MapPin, Sparkles } from "lucide-react";
import { EventItem } from "@/types/event";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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
  const [isRsvpModalOpen, setIsRsvpModalOpen] = useState(false);

  // ESC key handler for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isRsvpModalOpen) {
          setIsRsvpModalOpen(false);
        } else if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isRsvpModalOpen, onClose]);

  // Lock body scroll when drawer or RSVP modal is open
  useEffect(() => {
    if (isOpen || isRsvpModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, isRsvpModalOpen]);

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

  const handleBulkRsvp = () => {
    setIsRsvpModalOpen(true);
    // Confetti celebration for RSVP confirmation
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#14b8a6", "#3b82f6", "#a855f7"],
      disableForReducedMotion: true,
    });
  };

  return (
    <>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] cursor-pointer"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl z-[70] flex flex-col"
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

              {/* Footer with Clear All & Bulk RSVP CTA */}
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
                      onClick={handleBulkRsvp}
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

      {/* Custom High-Craft RSVP Confirmation Modal */}
      <AnimatePresence>
        {isRsvpModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRsvpModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl text-zinc-900 dark:text-zinc-100 z-10 overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsRsvpModalOpen(false)}
                aria-label="Close RSVP modal"
                className="absolute right-4 top-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 350 }}
                  className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4 border border-emerald-500/20"
                >
                  <Ticket className="w-8 h-8" />
                </motion.div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>RSVP Request Confirmed</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-zinc-900 dark:text-white">
                  You&apos;re on the Guest List!
                </h3>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                  Passes and secret entry coordinates for your <span className="font-semibold text-zinc-800 dark:text-zinc-200">{savedEvents.length} selected experiences</span> have been prepared.
                </p>
              </div>

              {/* Event list summary chips inside modal */}
              <div className="flex-1 overflow-y-auto max-h-48 my-2 space-y-2 pr-1">
                {savedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/60 text-left text-xs"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {event.title}
                      </h5>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-emerald-500" />
                          {event.displayDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-zinc-400" />
                          {event.location.city}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsRsvpModalOpen(false);
                    onClose();
                  }}
                  className="w-full py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Done & View Schedule</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
