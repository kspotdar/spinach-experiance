"use client";

import { motion } from "framer-motion";
import { Search, Calendar, IndianRupee, RotateCcw, ArrowUpDown } from "lucide-react";
import { FilterState } from "@/types/event";
import { Dropdown } from "@/components/form/Dropdown";
import { formatPrice } from "@/lib/utils";

interface FilterBarProps {
  filters: FilterState;
  onChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
}

const CATEGORIES = ["All", "Tech", "Design", "Music", "Art", "Business", "Wellness"];

const DATE_OPTIONS = [
  { label: "Any Date", value: "all" },
  { label: "Today", value: "today" },
  { label: "Next 7 Days", value: "this-week" },
  { label: "Next 30 Days", value: "this-month" },
];

const SORT_OPTIONS = [
  { label: "Date: Upcoming first", value: "date-asc" },
  { label: "Date: Furthest first", value: "date-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most In-Demand", value: "popular" },
];

export function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  return (
    <div className="w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-5 sm:p-8 shadow-lg mb-12 sm:mb-16 transition-all relative z-30">
      {/* Dedicated Section Search Bar */}
      <div className="relative mb-7">
        <Search className="w-4 h-4 text-zinc-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onChange({ searchQuery: e.target.value })}
          placeholder="Filter upcoming experiences by keyword, speaker, city, or tags..."
          aria-label="Filter events by search keyword"
          className="w-full pl-10 pr-10 py-3 rounded-2xl text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all cursor-text shadow-sm"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onChange({ searchQuery: "" })}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer p-1"
            aria-label="Clear filter search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Pills with animated tab indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = filters.selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange({ selectedCategory: cat })}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors select-none cursor-pointer ${
                isActive
                  ? "text-white"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/60"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-emerald-600 rounded-full -z-10 shadow-md shadow-emerald-600/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: 1. Date, 2. Free Toggle, 3. Sort, 4. Price Slider */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
        {/* 1. Date Filter using custom Dropdown with properly aligned chevron */}
        <Dropdown
          id="date-filter"
          label={
            <>
              <Calendar className="w-3.5 h-3.5" />
              <span>Time Horizon</span>
            </>
          }
          options={DATE_OPTIONS}
          value={filters.dateRange}
          onChange={(val) => onChange({ dateRange: val })}
        />

        {/* 2. Free Events Toggle */}
        <div className="flex items-center justify-between sm:justify-start gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-700/60 h-[46px]">
          <label
            htmlFor="freeOnlyToggle"
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 cursor-pointer select-none"
          >
            Free Events Only
          </label>
          <button
            id="freeOnlyToggle"
            type="button"
            role="switch"
            aria-checked={filters.freeOnly}
            onClick={() => onChange({ freeOnly: !filters.freeOnly })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
              filters.freeOnly ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                filters.freeOnly ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* 3. Sort & Reset Actions with custom Dropdown */}
        <div className="flex items-end gap-2">
          <Dropdown
            id="sort-filter"
            label={
              <>
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Sort Events</span>
              </>
            }
            options={SORT_OPTIONS}
            value={filters.sortBy}
            onChange={(val) =>
              onChange({ sortBy: val as FilterState["sortBy"] })
            }
            className="flex-1"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            title="Reset Filters"
            aria-label="Reset all filters"
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer shrink-0 h-[46px] flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>
        </div>

        {/* 4. Price Slider (4th position) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Max Price</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {formatPrice(filters.priceRange[1], "INR")}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="9999"
            step="250"
            disabled={filters.freeOnly}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onChange({ priceRange: [0, parseInt(e.target.value, 10)] })
            }
            className={`w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 ${
              filters.freeOnly ? "opacity-30 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}
