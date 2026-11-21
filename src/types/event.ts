export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Tech' | 'Design' | 'Music' | 'Art' | 'Business' | 'Wellness';
  date: string; // ISO date 'YYYY-MM-DD'
  displayDate: string;
  time: string;
  location: {
    venue: string;
    city: string;
    type: 'In-Person' | 'Virtual' | 'Hybrid';
  };
  price: number; // 0 for free
  currency: string;
  image: string;
  tags: string[];
  featured?: boolean;
  totalSeats: number;
  availableSeats: number;
  organizer: {
    name: string;
    avatar: string;
  };
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: string; // 'All' | category
  dateRange: string; // 'all' | 'today' | 'this-week' | 'this-month'
  priceRange: [number, number]; // [min, max]
  freeOnly: boolean;
  sortBy: 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'popular';
}
