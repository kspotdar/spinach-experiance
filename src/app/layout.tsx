import type { Metadata } from "next";
import "./globals.css";
import { SITE, defaultRobots } from "@/lib/seo/metadata";
import { websiteJsonLd, eventListJsonLd } from "@/lib/seo/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.shortName} | Curated Event Discovery Dashboard`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  keywords: [
    "Event Discovery",
    "Conferences",
    "Tech Summits",
    "Art Exhibitions",
    "Design Labs",
    "Live Concerts",
    "Next.js Dashboard",
    "Framer Motion",
  ],
  authors: [{ name: SITE.author }],
  creator: SITE.author,
  publisher: SITE.name,
  robots: defaultRobots,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.shortName} - Discover Curated Global Experiences`,
    description: SITE.description,
    images: [
      {
        url: `${SITE.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "PulseFest Event Discovery Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    creator: "@kedarpotdar",
    images: [`${SITE.url}/og-image.png`],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Rich SEO JSON-LD Structured Data Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListJsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
