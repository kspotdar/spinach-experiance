"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Bookmark, Users, Clock } from "lucide-react";
import { EventItem } from "@/types/event";
import { formatPrice } from "@/lib/utils";
import { TiltCard } from "@/components/ui/InteractiveMotion";
import Image from "next/image";
import confetti from "canvas-confetti";

interface EventCardProps {
  event: EventItem;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function EventCard({ event, isSaved, onToggleSave }: EventCardProps) {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(event.id);

    // Micro-celebration confetti burst when saving an event
    if (!isSaved) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { x, y },
        colors: ["#10b981", "#14b8a6", "#3b82f6", "#f59e0b"],
        disableForReducedMotion: true,
      });
    }
  };

  return (
    <TiltCard className="h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-full flex flex-col bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 shadow-md hover:shadow-2xl hover:shadow-emerald-500/10 transition-shadow duration-300 overflow-hidden group focus-within:ring-2 focus-within:ring-emerald-500"
      >
        {/* Event Media Banner */}
        <div className="relative w-full h-52 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Gradient Scrim for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Category Pill */}
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/60 backdrop-blur-md text-emerald-400 border border-white/10 shadow-sm">
            {event.category}
          </span>

          {/* Interactive Bookmark / Save Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.12 }}
            onClick={handleSaveClick}
            aria-label={isSaved ? `Remove ${event.title} from saved` : `Save ${event.title}`}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-colors shadow-md ${
              isSaved
                ? "bg-emerald-500 text-white shadow-emerald-500/40"
                : "bg-black/50 text-white/90 hover:bg-black/70 hover:text-white"
            }`}
          >
            <motion.div
              animate={isSaved ? { scale: [1, 1.35, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
              />
            </motion.div>
          </motion.button>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-3 left-4">
            <span className="inline-block px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow-lg">
              {formatPrice(event.price, event.currency)}
            </span>
          </div>

          {/* Location Badge Overlay */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate max-w-[130px]">{event.location.city}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Date & Time metadata */}
            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2.5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                {event.displayDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                {event.time.split("-")[0]}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 mb-2">
              {event.title}
            </h3>

            {/* Tagline / Subtitle */}
            <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed mb-4">
              {event.tagline}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {event.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card Footer: Seats & RSVP */}
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700">
                <Image
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-[11px] leading-tight">
                <span className="block text-zinc-400 text-[10px]">Host</span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  {event.organizer.name}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              <Users className="w-3.5 h-3.5 text-emerald-500" />
              <span>{event.availableSeats} left</span>
            </div>
          </div>
        </div>
      </motion.article>
    </TiltCard>
  );
}
