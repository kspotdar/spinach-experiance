"use client";

const SPONSORS = [
  { name: "Spotify", icon: "🎵" },
  { name: "Red Bull Events", icon: "⚡" },
  { name: "Figma Community", icon: "🎨" },
  { name: "Ableton Live", icon: "🎹" },
  { name: "Vercel", icon: "▲" },
  { name: "Pioneer DJ", icon: "🎧" },
  { name: "GitHub Universe", icon: "🐙" },
  { name: "Supabase", icon: "⚡" },
];

export function SponsorsMarquee() {
  return (
    <section className="py-14 sm:py-20 border-t border-b border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 mb-6 sm:mb-8 text-center">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Backed by Global Experience Leaders & Creative Studios
        </span>
      </div>

      <div className="w-full overflow-hidden select-none">
        <div className="animate-infinite-marquee">
          {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 mx-6 sm:mx-10 shrink-0 cursor-pointer group transition-all duration-300 filter grayscale opacity-45 hover:grayscale-0 hover:opacity-100"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">
                {sponsor.icon}
              </span>
              <span className="text-sm sm:text-base font-extrabold tracking-tight text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
