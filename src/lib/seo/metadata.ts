import type { Metadata } from "next";

export const SITE = {
  name: "PulseFest - Experience Discovery Engine",
  shortName: "PulseFest",
  description: "A premier single-page Event Discovery Dashboard showcasing high-craft animations, responsive design, accessibility, and local JSON driven events.",
  url: "https://spinach-experiance.vercel.app",
  ogImage: "/og-image.png",
  author: "Kedar Potdar",
};

export const defaultRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};
