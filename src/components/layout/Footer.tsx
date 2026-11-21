"use client";

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, Sparkles, Send, CheckCircle2, X } from "lucide-react";
import { TextInput } from "@/components/form/Input";

const STORAGE_KEY = "spinach_subscribed_emails";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // ESC key closes the modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const validateEmail = (val: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val);
  };

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(trimmed)) {
      setError("Please enter a valid email address (e.g. name@domain.com).");
      return;
    }

    // Save to LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (!existing.includes(trimmed)) {
        existing.push(trimmed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
    } catch (err) {
      console.error("Failed to save subscriber email", err);
    }

    setSubmittedEmail(trimmed);
    setEmail("");
    setIsModalOpen(true);
  };

  return (
    <footer className="w-full bg-zinc-100/70 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Top Newsletter Card Section */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-zinc-900 p-6 sm:p-10 text-white shadow-xl mb-10 sm:mb-12">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase mb-3 text-emerald-200 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Priority Drop Dispatch</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black tracking-tight mb-2 sm:mb-3">
              Never Miss an Underground Set or VIP Ticket Drop.
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-6">
              Join 18,000+ creators, founders, and music explorers. Get weekly secret RSVP invites directly in your inbox. No spam, ever.
            </p>

            {/* Newsletter Form with Mahamaya Form Component Architecture */}
            <form
              noValidate
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-lg"
            >
              <div className="flex-1">
                <TextInput
                  type="text"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Enter your work or personal email..."
                  aria-label="Email address for newsletter"
                  icon={<Mail className="w-4 h-4" />}
                  error={error}
                  className="text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900 border-white/20 focus:border-emerald-300 rounded-full py-2.5 sm:py-3"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 sm:py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-emerald-950 dark:hover:bg-emerald-100 shadow-xl transition-all cursor-pointer shrink-0 self-start sm:self-auto h-[46px]"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Multi-column Large Footer Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-10 pb-8 sm:pb-10 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {/* Brand info */}
          <div className="col-span-2">
            <span className="font-black text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-white">
              Pulse<span className="text-emerald-500">Fest</span>
            </span>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-2.5 max-w-sm leading-relaxed">
              The single-page discovery engine connecting explorers to extraordinary in-real-life festivals, tech summits, and creative labs. Built with zero runtime API latency.
            </p>
          </div>

          {/* Column 1 */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Explore
            </h5>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li><a href="#explore" className="hover:text-emerald-500 transition-colors">Tech Summits</a></li>
              <li><a href="#explore" className="hover:text-emerald-500 transition-colors">Electronic Music</a></li>
              <li><a href="#explore" className="hover:text-emerald-500 transition-colors">Design Salons</a></li>
              <li><a href="#explore" className="hover:text-emerald-500 transition-colors">Free Community Passes</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Resources
            </h5>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li><a href="https://github.com/kspotdar/spinach-experiance" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">GitHub Repository</a></li>
              <li><a href="#explore" className="hover:text-emerald-500 transition-colors">Architecture ERD</a></li>
              <li><a href="#explore" className="hover:text-emerald-500 transition-colors">Documentation</a></li>
              <li><a href="#explore" className="hover:text-emerald-500 transition-colors">Offline Local JSON</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Legal
            </h5>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li><span className="hover:text-emerald-500 transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-emerald-500 transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-emerald-500 transition-colors cursor-pointer">Security Standards</span></li>
              <li><span className="hover:text-emerald-500 transition-colors cursor-pointer">Accessibility Statement</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright (3-column layout on desktop, center-aligned creator) */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-3 items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <p className="text-center md:text-left">
            © 2026 PulseFest Experience Engine. All rights reserved.
          </p>

          <p className="text-center text-zinc-700 dark:text-zinc-300 font-medium order-first md:order-none">
            Developed with <span className="text-rose-500 inline-block animate-pulse">❤</span> by <span className="font-semibold text-zinc-900 dark:text-white">Kedar</span>
          </p>

          <p className="text-center md:text-right">
            Built with React 19, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>

      {/* Thank You For Subscribing Newsletter Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
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
              className="relative w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl text-zinc-900 dark:text-zinc-100 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="absolute right-4 top-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Success Visual */}
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 350 }}
                  className="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-5 border border-emerald-500/20"
                >
                  <Send className="w-8 h-8" />
                </motion.div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscription Confirmed</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-zinc-900 dark:text-white">
                  Thank You for Subscribing!
                </h3>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  You&apos;re now on the list to receive weekly curated festival drops, secret RSVP links, and tech showcases.
                </p>

                {/* Email Confirmation Pill */}
                {submittedEmail && (
                  <div className="w-full p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center gap-2 mb-6 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="truncate max-w-[260px] font-mono">{submittedEmail}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 px-6 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                >
                  Explore Upcoming Events
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
