"use client";

import { useState, useMemo } from "react";
import { EventItem, FilterState } from "@/types/event";

export const INITIAL_FILTERS: FilterState = {
  searchQuery: "",
  selectedCategory: "All",
  dateRange: "all",
  priceRange: [0, 200],
  freeOnly: false,
  sortBy: "date-asc",
};

export function useEventFilters(events: EventItem[]) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  const filteredEvents = useMemo(() => {
    return events
      .filter((evt) => {
        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchesTitle = evt.title.toLowerCase().includes(q);
          const matchesTagline = evt.tagline.toLowerCase().includes(q);
          const matchesTags = evt.tags.some((t) => t.toLowerCase().includes(q));
          const matchesCity = evt.location.city.toLowerCase().includes(q);
          if (!matchesTitle && !matchesTagline && !matchesTags && !matchesCity) {
            return false;
          }
        }

        // Category filter
        if (filters.selectedCategory !== "All" && evt.category !== filters.selectedCategory) {
          return false;
        }

        // Free only filter
        if (filters.freeOnly && evt.price > 0) {
          return false;
        }

        // Price range filter
        if (!filters.freeOnly) {
          if (evt.price < filters.priceRange[0] || evt.price > filters.priceRange[1]) {
            return false;
          }
        }

        // Date range filter
        if (filters.dateRange !== "all") {
          const eventDate = new Date(evt.date);
          const now = new Date("2026-11-21T00:00:00");
          if (filters.dateRange === "today") {
            const isToday = eventDate.toDateString() === now.toDateString();
            if (!isToday) return false;
          } else if (filters.dateRange === "this-week") {
            const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            if (eventDate < now || eventDate > next7Days) return false;
          } else if (filters.dateRange === "this-month") {
            const next30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
            if (eventDate < now || eventDate > next30Days) return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === "date-asc") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        if (filters.sortBy === "date-desc") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        if (filters.sortBy === "price-asc") {
          return a.price - b.price;
        }
        if (filters.sortBy === "price-desc") {
          return b.price - a.price;
        }
        if (filters.sortBy === "popular") {
          return (b.totalSeats - b.availableSeats) - (a.totalSeats - a.availableSeats);
        }
        return 0;
      });
  }, [events, filters]);

  const resetFilters = () => setFilters(INITIAL_FILTERS);

  return {
    filters,
    setFilters,
    filteredEvents,
    resetFilters,
    totalCount: events.length,
    filteredCount: filteredEvents.length,
  };
}
