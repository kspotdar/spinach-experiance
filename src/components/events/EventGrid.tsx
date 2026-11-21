"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { EventItem } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";

interface EventGridProps {
  events: EventItem[];
  isSaved: (id: string) => boolean;
  onToggleSave: (id: string) => void;
  onResetFilters: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

export function EventGrid({
  events,
  isSaved,
  onToggleSave,
  onResetFilters,
}: EventGridProps) {
  if (events.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {events.map((event) => (
            <motion.div
              key={event.id}
              layout
              variants={cardItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="h-full"
            >
              <EventCard
                event={event}
                isSaved={isSaved(event.id)}
                onToggleSave={onToggleSave}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
