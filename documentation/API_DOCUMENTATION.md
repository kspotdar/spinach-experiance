# 📡 PulseFest — API Documentation (Offline Local Architecture & Simulated Contract)

> **Context**: As defined by the Spinach assessment constraints (*"Do not use backend APIs. Use local JSON only"*), PulseFest runs completely client-side without runtime network overhead.  
> However, to ensure full enterprise compliance, the data layer is architected using **Repository Pattern contracts**, making it 100% ready to bind to any REST/GraphQL backend in the future.

---

## 🏗️ Architecture Overview

The application abstracts data queries through typed service layers (`useEventFilters` and `useSavedEvents`). Below is the formal API contract specification corresponding to the local schema and simulated endpoints.

```text
Base Simulated Endpoint: https://api.pulsefest.io/v1 (or local mock handler)
Data Format: JSON
Authentication: None (Public Discovery Engine)
```

---

## 1. Events Endpoints

### 1.1 List All Events (with Query Filters)
Retrieves a paginated/filtered list of events matching search, category, price range, and date horizon criteria.

- **Method**: `GET`
- **Endpoint**: `/events`
- **Query Parameters**:

| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `search` | `string` | No | `""` | Case-insensitive substring match against title, category, city, or tags |
| `category` | `string` | No | `"All"` | One of: `All`, `Tech`, `Design`, `Music`, `Art`, `Business`, `Wellness` |
| `timeHorizon` | `string` | No | `"all"` | Horizon window: `all`, `today`, `week`, `month` |
| `onlyFree` | `boolean` | No | `false` | When true, filters strictly for `price === 0` |
| `priceRange` | `number` | No | `200` | Maximum price ceiling ($0 - $200) |
| `sort` | `string` | No | `"date-asc"` | Sort order: `date-asc`, `date-desc`, `price-asc`, `price-desc`, `popular` |

#### Example Request:
```http
GET /events?category=Tech&onlyFree=false&priceRange=150&sort=date-asc HTTP/1.1
Host: api.pulsefest.io
Accept: application/json
```

#### Example 200 OK Response:
```json
{
  "status": "success",
  "meta": {
    "totalCount": 10,
    "filteredCount": 2,
    "appliedFilters": {
      "category": "Tech",
      "priceCeiling": 150,
      "onlyFree": false,
      "sort": "date-asc"
    }
  },
  "data": [
    {
      "id": "evt-01",
      "title": "Quantum Leap: Future of AI & Spatial Computing",
      "tagline": "A deep dive into neural architectures, agentic intelligence, and spatial OS paradigms.",
      "description": "Join researchers from top AI labs for an intensive full-day summit uncovering breakthroughs in autonomous models, neuromorphic hardware, and real-time vision.",
      "category": "Tech",
      "date": "2026-12-05",
      "displayDate": "Dec 5, 2026",
      "time": "09:00 AM - 06:00 PM",
      "price": 49,
      "currency": "USD",
      "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      "tags": ["AI", "SpatialComputing", "NeuralNetworks", "FutureTech"],
      "featured": true,
      "totalSeats": 250,
      "availableSeats": 18,
      "location": {
        "venue": "Apex Innovation Campus, Hall A",
        "city": "San Francisco, CA",
        "type": "Hybrid"
      },
      "organizer": {
        "name": "Synthetic Horizons Lab",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80"
      }
    }
  ]
}
```

---

### 1.2 Get Single Event Details
Retrieves full event metadata by unique ID.

- **Method**: `GET`
- **Endpoint**: `/events/:id`

#### Example Request:
```http
GET /events/evt-01 HTTP/1.1
Host: api.pulsefest.io
Accept: application/json
```

#### Example 200 OK Response:
```json
{
  "status": "success",
  "data": {
    "id": "evt-01",
    "title": "Quantum Leap: Future of AI & Spatial Computing",
    "category": "Tech",
    "price": 49,
    "availableSeats": 18,
    "location": {
      "venue": "Apex Innovation Campus, Hall A",
      "city": "San Francisco, CA",
      "type": "Hybrid"
    }
  }
}
```

---

## 2. Bookmarks & Local Preferences (Client-Side Storage Contract)

The application persists user bookmarks in client-side storage without requiring server authentication.

- **LocalStorage Key**: `pulsefest_saved_events`
- **Type Signature**: `string[]` (Array of `Event.id` values)

```json
["evt-01", "evt-03", "evt-07"]
```

---

## 3. Bulk RSVP Confirmation (Contract)

Triggered from the Saved Drawer when users confirm their presence across all bookmarked experiences.

- **Method**: `POST`
- **Endpoint**: `/rsvp/bulk`
- **Payload**:
```json
{
  "eventIds": ["evt-01", "evt-03"],
  "timestamp": "2026-11-23T08:20:00.000Z"
}
```

#### Response (200 OK):
```json
{
  "status": "confirmed",
  "message": "Guest list confirmed for 2 events.",
  "confirmationCode": "PF-RSVP-882190"
}
```

---

## 4. Newsletter Subscription (Contract)

- **Method**: `POST`
- **Endpoint**: `/newsletter/subscribe`
- **Payload**:
```json
{
  "email": "developer@spinach.design"
}
```

#### Response (200 OK):
```json
{
  "status": "success",
  "message": "Subscribed to priority event dispatches.",
  "email": "developer@spinach.design"
}
```
