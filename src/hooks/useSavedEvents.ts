"use client";

import { useState, useEffect, useCallback } from "react";
import { EventItem } from "@/types/event";

const STORAGE_KEY = "spinach_saved_events_v1";

export function useSavedEvents(allEvents: EventItem[]) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load saved events from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to LocalStorage
  const updateSaved = useCallback((newIds: string[]) => {
    setSavedIds(newIds);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
    } catch (e) {
      console.error("Failed to save events to localStorage", e);
    }
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const clearAllSaved = useCallback(() => {
    updateSaved([]);
  }, [updateSaved]);

  const savedEvents = allEvents.filter((event) => savedIds.includes(event.id));

  return {
    savedIds,
    savedEvents,
    toggleSave,
    isSaved,
    clearAllSaved,
    isLoaded,
    savedCount: savedIds.length,
  };
}
