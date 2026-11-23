# 🌟 PulseFest — Event Discovery Dashboard

> Built as part of the **Spinach Experience Design UI Developer Practical Assessment**.  
> A high-craft, fully responsive single-page Event Discovery Dashboard demonstrating strong UI engineering, physics-based micro-interactions, responsive design, accessibility (WCAG 2.1 AA), and clean architecture with zero external runtime API dependencies.

---

## 🔗 Live Deployment & Links
- **GitHub Repository**: [https://github.com/kspotdar/spinach-experiance](https://github.com/kspotdar/spinach-experiance)
- **Primary Branches**: `main` (clean baseline), `develop` (active feature branch)
- **Architecture & ER Diagram**: [documentation/pulsefest_er_diagram.jpg](file:///d:/projects-backup/spinach-experiance/documentation/pulsefest_er_diagram.jpg)
- **API Documentation**: [documentation/API_DOCUMENTATION.md](file:///d:/projects-backup/spinach-experiance/documentation/API_DOCUMENTATION.md)
- **Postman Collection**: [documentation/PulseFest_Postman_Collection.json](file:///d:/projects-backup/spinach-experiance/documentation/PulseFest_Postman_Collection.json)
- **Live Deployment**: Ready to deploy directly to Vercel / Netlify.

---

## 🛠️ Tech Stack & Decisions

| Technology | Purpose & Decision Rationale |
|---|---|
| **Next.js 15 (App Router)** | Zero backend APIs needed. Delivers lightning-fast static page generation, server components for SEO, and clean client interactivity. |
| **TypeScript (Strict Mode)** | Full end-to-end type safety for events, filter models, and component contracts. |
| **Tailwind CSS** | Design system tokenization, dark/light theme switching, and fluid responsive grid layouts without CSS bloat. |
| **Framer Motion** | Spring physics animations, staggered card entrance, layout transitions (`AnimatePresence`, `layoutId`), and scroll progress triggers. |
| **Lucide Icons** | Accessible, light SVG icons with consistent stroke weights. |
| **Canvas Confetti** | Delightful micro-interaction feedback when users bookmark/save an event card. |

---

## 🎯 Requirements Met & Implemented Checklist

### 1. Functional Requirements
- [x] **Header Navigation**: Dynamic animated brand identity with live waveform ECG shimmer, theme toggle (Dark/Light mode with local persistence), and responsive saved events trigger.
- [x] **Mobile UX & Floating Action Button (FAB)**:
  - Header is kept clutter-free on mobile by resizing the brand logo (`w-8 h-8` on mobile vs `w-14 h-14` on desktop) and hiding redundant horizontal badges.
  - Chatbot-style bottom-right floating trigger (`fixed bottom-6 right-5 z-50`) with live saved notification badge.
  - Automatically hides with spring exit transitions when the Saved Drawer is opened to prevent overlapping UI artifacts.
- [x] **Independent Search Mechanisms**:
  - **Header Search**: Displays instant quick-matches right inside a floating dropdown list without disturbing the main feed. Clicking an item auto-scrolls and highlights the card.
  - **Upcoming Experiences Search**: Dedicated search bar within the filter dashboard to dynamically filter the active grid.
- [x] **Hero Section**: 6 dynamically cycling full-bleed HD festival/party photography backdrops (sourced from local `src/data/hero.json`), indicator dots, `#10B981` brand emerald theme, anchored bottom-left typography, and magnetic CTA buttons.
- [x] **Global Infinite Sponsors Marquee**: Continuous GPU-accelerated marquee strip (`translate3d`), grayscale by default and transforms into full vibrant brand colors on cursor hover.
- [x] **Comprehensive Multi-Dimensional Filters**:
  - Category selector with animated spring indicator (`All`, `Tech`, `Design`, `Music`, `Art`, `Business`, `Wellness`).
  - Custom `Dropdown` for Time Horizon (`Any Date`, `Today`, `Next 7 Days`, `Next 30 Days`) with perfectly aligned chevron.
  - Free Events toggle switch with smooth animated thumb.
  - Custom `Dropdown` for Sort selector (Upcoming, Furthest, Price Low-High, Price High-Low, Most In-Demand) + Reset action.
  - Interactive price range slider ($0 - $200) situated at 4th position.
- [x] **Responsive Grid & Dedicated Primary Action Cards (10 Local Events)**:
  - 10 realistic, locally seeded events in `src/data/events.ts`.
  - Image banner with fallback styling, date, time, location, price, tag pills, host avatar, and seats left.
  - **Single Prominent Save Action CTA**: Full-width button at the bottom of the card ("Save Experience" / "Saved to My List") recognizing that bookmarking is the primary action in an event discovery engine (no e-commerce cart/checkout needed).
  - Clean brand-aligned emerald styling without jarring red hover states.
- [x] **Saved Events Slide-out Drawer & Custom RSVP Modal**:
  - Slide-out spring animation from right with backdrop blur (`z-[70]`).
  - Add and remove bookmark capabilities with state saved to `localStorage`.
  - Empty state when no events are bookmarked.
  - **Custom High-Craft RSVP Modal**: Replaced native browser alert with an animated celebratory confirmation dialog featuring guest list status, event list summary chips, and confetti celebration.
  - Accessible ESC key listener and background scroll lock.
- [x] **Meaningful Custom SVG Empty State**:
  - Handcrafted SVG illustration of an event calendar with an animated floating magnifying glass and particles.
  - One-click "Clear All Filters" button.
- [x] **Large Footer & Validated Newsletter Drop**:
  - Multi-column footer with brand statement, navigation links, and legal resources.
  - Newsletter input modeled after Mahamaya form architecture with custom in-line red error feedback (HTML5 tooltips suppressed).
  - Subscriptions saved safely to `localStorage` (`spinach_subscribed_emails`).
  - Interactive "Thank You for Subscribing" celebratory confirmation modal with auto-focus trap and ESC dismissal.
  - Centered bottom credit: `Developed with ❤ by Kedar`.

### 2. Animation & Interaction Requirements
- [x] **Page-Load Animation**: Coordinated staggered entrance for Header, Hero, and Filter elements.
- [x] **Staggered Card Entrance**: `staggerChildren` layout animation using Framer Motion variants.
- [x] **Hover Micro-Interactions**:
  - Cards elevate and show deep emerald glow shadows.
  - Buttons scale with spring feedback on hover and tap (`whileTap={{ scale: 0.95 }}`).
- [x] **Animated Bookmark State**: Heart/bookmark pulse animation accompanied by a celebratory confetti particle burst.
- [x] **Smooth Drawer Transition**: Physical spring transition (`damping: 28, stiffness: 260`) for drawer entry and exit.
- [x] **Animated Filtering & Reordering**: Smooth grid re-shuffling using Framer Motion `<AnimatePresence mode="popLayout">` and `layout` props.
- [x] **Theme Transition**: Smooth CSS transitions between dark mode (`zinc-950`) and light mode (`slate-50`).
- [x] **Scroll-Triggered Animation**: Top reading progress bar tied to `scrollYProgress` with spring dampening.
- [x] **Advanced Interactions**:
  1. **3D Card Tilt with Dynamic Lighting Glare**: Cards compute cursor angle (`rotateX`, `rotateY`) and cast a moving radial specular highlight.
  2. **Magnetic CTA Button**: Attracts towards the cursor on hover using spring physics.

---

## 🗂️ Component & Directory Architecture

```text
src/
├── app/
│   ├── globals.css              # Custom styling, dark mode variables
│   ├── layout.tsx               # Root layout, OpenGraph, JSON-LD schemas
│   └── page.tsx                 # Single-page orchestrator
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Logo, dropdown search, theme toggle, saved badge
│   │   ├── Hero.tsx             # Animated hero section with magnetic CTAs
│   │   └── SavedDrawer.tsx      # Slide-out drawer with ESC key support
│   ├── filters/
│   │   └── FilterBar.tsx        # In-section search & multidimensional controls
│   ├── events/
│   │   ├── EventCard.tsx        # 3D tilt card, bookmark micro-interaction & confetti
│   │   └── EventGrid.tsx        # Responsive staggered layout with AnimatePresence
│   └── ui/
│       ├── EmptyState.tsx       # Custom SVG animated calendar illustration
│       └── InteractiveMotion.tsx# Reusable 3D TiltCard & Magnetic primitives
├── data/
│   └── events.ts                # Local seed dataset (10 events)
├── hooks/
│   ├── useSavedEvents.ts        # LocalStorage persistence & bookmark state
│   └── useEventFilters.ts       # Filtering, search, and sorting logic
├── lib/
│   ├── seo/
│   │   ├── metadata.ts          # OpenGraph, Twitter card, robots config
│   │   └── schema.ts            # Schema.org JSON-LD (WebSite, ItemList, Event)
│   └── utils.ts                 # ClassName merger & currency formatters
└── types/
    └── event.ts                 # TypeScript interfaces for EventItem & FilterState
```

---

## 🌐 SEO & Accessibility (WCAG 2.1 AA)

- **Semantic HTML**: `<header>`, `<main>`, `<section>`, `<article>`, `<button>`, `<dialog>` role for drawer.
- **Keyboard Navigation**:
  - Full tab order across search inputs, filters, event cards, and drawer.
  - ESC key dismisses the Saved Events drawer.
  - Space and Enter activate buttons and magnetic wrappers.
- **Aria Attributes**: `aria-label`, `aria-checked` for toggles, `aria-modal="true"`, `role="status"` for the empty state.
- **Search Engine Optimization**:
  - Meta tags configured for OpenGraph and Twitter cards.
  - Structured Data (`application/ld+json`) with **Schema.org/Event** and **Schema.org/ItemList** for rich search results.

---

## 🚀 Setup & Local Running Instructions

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### Quick Start
```bash
# 1. Clone the repository
git clone git@github.com:kspotdar/spinach-experiance.git
cd spinach-experiance

# 2. Checkout the develop branch
git checkout develop

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Verification
```bash
npm run build
```
Generates an optimized, statically prerendered production build with 0 TypeScript/ESLint errors.

---

## 📝 Project Decisions & Coding Rationale

1. **Why Local State + LocalStorage instead of a Mock Server?**  
   Per the constraints, zero backend APIs should be queried. Local storage guarantees instant 0ms latency, works completely offline, and ensures persistent bookmarks across reloads.
2. **Why Two Search Inputs?**  
   Header searches serve as global quick-lookups where results drop down in a popover without shifting viewport context. The in-section search is dedicated to filtering the event grid directly.
3. **Card Architecture & Save Action Decision**:
   Since PulseFest is an event discovery engine rather than an e-commerce platform with a shopping cart, "Save" / "Bookmark" represents the highest-intent user action. Rather than burying it as an ambiguous top icon, it is placed as a full-width primary CTA button ("Save Experience" / "Saved to My List") at the base of every card.
4. **Mobile Navigation & Floating Action Button (FAB)**:
   On mobile screens, header space is constrained. Cramming the logo, search bar, theme switch, and saved bookmarks creates visual clutter and squeezes the search input. The saved items trigger is delegated to a bottom-right chatbot-style floating button with real-time badge count, which automatically hides via Framer Motion when the drawer opens to prevent layer clashing.
5. **Custom Modal Architecture over Native Browser Popups**:
   Native `alert()` breaks immersion and blocks browser threads. Both newsletter subscription and Bulk RSVP triggers are routed through accessible, keyboard-trapped modal dialogs featuring spring animations, confetti physics, and event summaries.
6. **Performance Optimization**:  
   - Images are loaded through `next/image` with responsive `sizes` definitions to avoid layout shifts (CLS = 0).
   - Heavy 3D tilt effects use hardware-accelerated CSS `transform-style: preserve-3d` and `will-change: transform`.
   - Category filtering uses `layoutId` for GPU-accelerated spring animations.
