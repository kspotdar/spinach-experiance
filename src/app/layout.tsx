import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseFest - Event Discovery Dashboard",
  description: "Curated experiences, interactive discovery dashboard built with Next.js, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
