import { SITE } from "./metadata";
import { EVENTS_DATA } from "@/data/events";

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
};

export const eventListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: EVENTS_DATA.map((evt, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Event",
      name: evt.title,
      description: evt.tagline,
      startDate: `${evt.date}T${evt.time.split(" - ")[0]}`,
      endDate: `${evt.date}T${evt.time.split(" - ")[1]}`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode:
        evt.location.type === "Virtual"
          ? "https://schema.org/OnlineEventAttendanceMode"
          : evt.location.type === "Hybrid"
          ? "https://schema.org/MixedEventAttendanceMode"
          : "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: evt.location.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: evt.location.city,
        },
      },
      image: [evt.image],
      offers: {
        "@type": "Offer",
        price: evt.price,
        priceCurrency: evt.currency,
        availability:
          evt.availableSeats > 0
            ? "https://schema.org/InStock"
            : "https://schema.org/SoldOut",
        validFrom: "2026-11-01T00:00:00Z",
        url: `${SITE.url}#${evt.id}`,
      },
      organizer: {
        "@type": "Organization",
        name: evt.organizer.name,
      },
    },
  })),
};
