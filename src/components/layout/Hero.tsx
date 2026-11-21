"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Magnetic } from "@/components/ui/InteractiveMotion";
import { useRef, useState, useEffect } from "react";
import heroData from "@/data/hero.json";

interface HeroProps {
  onExploreClick: () => void;
  totalEvents: number;
}

export function Hero({ onExploreClick, totalEvents }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { heroSlides, marqueeItems } = heroData;

  // Auto-advance slideshow every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Parallax on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-between overflow-hidden text-white"
    >
      {/* 6 Direct Native HTML Img Backgrounds from hero.json */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.9 } }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroSlides[currentSlide].src}
              alt={heroSlides[currentSlide].alt}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Sophisticated Cine-Grade Radial & Directional Scrim for bottom-left text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      </div>

      {/* Top Bar: Minimal Slide Indicator Dots Only */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex items-center justify-end">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Jump to backdrop ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? "w-6 bg-[#10b981]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hero Typography & CTAs Anchored to Bottom-Left for Cinematic Contrast */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pb-24 mt-auto text-left"
      >
        <div className="max-w-3xl">
          {/* Scaled & Balanced Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-white mb-5 drop-shadow-xl"
          >
            WE CONNECT PEOPLE TO <br />
            <span className="text-[#10b981]">IN-REAL-LIFE</span> EXPERIENCES.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-zinc-200 max-w-xl font-normal leading-relaxed mb-8 drop-shadow"
          >
            From strategy to execution, discovering culturally relevant moments that spark emotion, build loyalty, and turn audiences into communities.
          </motion.p>

          {/* Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic strength={0.35}>
              <button
                onClick={onExploreClick}
                className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-black text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2.5 shadow-2xl shadow-[#10b981]/40 transition-all cursor-pointer group"
              >
                <span>Explore All {totalEvents} Events</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </Magnetic>

            <Magnetic strength={0.2}>
              <button
                onClick={() => {
                  const searchEl = document.querySelector(
                    'input[placeholder*="Filter upcoming"]'
                  ) as HTMLInputElement;
                  if (searchEl) {
                    searchEl.scrollIntoView({ behavior: "smooth", block: "center" });
                    searchEl.focus();
                  }
                }}
                className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white font-bold text-xs sm:text-sm border border-white/25 transition-all cursor-pointer"
              >
                Filter by Mood & City
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      {/* Infinite Seamless Horizontal Running Slider from hero.json */}
      <div className="relative z-10 w-full py-3 sm:py-4 border-t border-white/10 bg-black/75 backdrop-blur-md overflow-hidden select-none">
        <div className="animate-infinite-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center mx-4 sm:mx-6 shrink-0">
              <span className="text-xs sm:text-sm font-black tracking-widest uppercase text-white/90">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] ml-8 sm:ml-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
