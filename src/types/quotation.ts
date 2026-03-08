export type HotelItem = {
  name: string;
  city: string;
  checkIn: string;
  checkOut: string;
  roomsGuests: string;
  roomType: string;
  mealType: string;
  stars: number;
  image?: string;
};

export type SightseeingItem = {
  title: string;
  mode: 'PRIVATE' | 'SIC';
};

export type ItineraryTransfer = {
  type: 'transfer';
  title: string;
  mode: 'PRIVATE' | 'SIC';
  pickup: string;
  drop: string;
  route: string;
};

export type ItineraryActivity = {
  type: 'activity';
  title: string;
  mode: 'PRIVATE' | 'SIC';
  description: string;
  terms?: string[];
  images?: string[];
};

export type ItineraryEntry = ItineraryTransfer | ItineraryActivity;

export type ItineraryDay = {
  dayLabel: string;
  entries: ItineraryEntry[];
};

export type QuotationData = {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  logoDataUrl: string;
  pickupIconUrl: string;
  dropIconUrl: string;
  inclusionIconsJson: string;
  tripTitle: string;
  tripSubtitle: string;
  travelDate: string;
  totalNetPrice: string;
  inclusions: string;
  guests: string;
  hotelsJson: string;
  sightseeingJson: string;
  itineraryJson: string;
  feedbackPhone: string;
  thankYouText: string;
};

const svgDataUrl = (label: string, bg = '#dbeafe') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='150'>
      <rect width='100%' height='100%' fill='${bg}' />
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='Helvetica' font-size='16' fill='#1f2937'>${label}</text>
    </svg>`,
  )}`;

const sampleHotels: HotelItem[] = [
  {
    name: 'FX Hotel Pattaya',
    city: 'Pattaya',
    checkIn: '09 Feb, 2026',
    checkOut: '12 Feb, 2026',
    roomsGuests: '2 Room | 4 Adult(s)',
    roomType: '2 Superior Double | 3 Night(s)',
    mealType: 'Bed and Breakfast',
    stars: 3,
    image: svgDataUrl('FX Hotel'),
  },
  {
    name: 'Grand Alpine Hotel',
    city: 'Bangkok',
    checkIn: '12 Feb, 2026',
    checkOut: '14 Feb, 2026',
    roomsGuests: '2 Room | 4 Adult(s)',
    roomType: '2 Superior Double | 2 Night(s)',
    mealType: 'Room and Breakfast',
    stars: 3,
    image: svgDataUrl('Grand Alpine'),
  },
];

const sampleSightseeing: SightseeingItem[] = [
  { title: 'Pattaya Floating Market (Including Boat Ticket)', mode: 'PRIVATE' },
  { title: 'Tiger Park (Big Tiger, only for Adults)', mode: 'PRIVATE' },
  { title: 'Coral Island Tour with Lunch by Speed Boat (From Pattaya)', mode: 'SIC' },
  {
    title: 'Bangkok City Temple Tour (Marble and Golden Buddha) enroute Bangkok Hotel from BKK Airport',
    mode: 'PRIVATE',
  },
  { title: 'Princess Chao Phraya Dinner Cruise (Indian)', mode: 'SIC' },
  { title: 'Safari World and Marine Park with Lunch (Mon Closed)', mode: 'SIC' },
];

const sampleItinerary: ItineraryDay[] = [
  {
    dayLabel: 'Day 1 : Monday, February 9th, 2026',
    entries: [
      {
        type: 'transfer',
        title: 'Arrival',
        mode: 'PRIVATE',
        pickup: 'Bangkok Suvarnabhumi Airport',
        drop: 'FX Hotel Pattaya',
        route: 'Transfers from BKK Airport to Pattaya Hotel',
      },
      {
        type: 'activity',
        title: 'Tiger Park (Big Tiger, only for Adults)',
        mode: 'PRIVATE',
        description:
          'Experience the awe-inspiring presence of the Big Tiger at Tiger Park, exclusively for adults. Encounter these majestic creatures in a secure and controlled environment, marveling at their strength and beauty up close.',
        terms: [
          'Children under 18: only allowed to visit the small tiger, Forest Safari, or walk around the park if they are under 160 cm tall.',
          'Children under 13: must be accompanied by at least one paying adult.',
          'Visitors 16 years and older: those who are 160 cm or taller can visit the Small, Smallest, Forest Safari, or walk around.',
          'Visitors 18 years and older: those who are 160 cm or taller can visit any type of tiger.',
          'Disabled visitors: people requiring wheelchair or walking stick are not allowed to enter the tiger cage.',
          'Reservations: must be made at least one day before the visit.',
        ],
        images: [svgDataUrl('Tiger 1'), svgDataUrl('Tiger 2'), svgDataUrl('Tiger 3')],
      },
    ],
  },
  {
    dayLabel: 'Day 2 : Tuesday, February 10th, 2026',
    entries: [
      {
        type: 'activity',
        title: 'Coral Island Tour with Lunch by Speed Boat (From Pattaya)',
        mode: 'SIC',
        description:
          'Embark on a thrilling Coral Island tour by speedboat, whisking you away to pristine beaches and vibrant coral reefs. Enjoy a delicious lunch amidst stunning tropical surroundings, with opportunities for snorkeling and relaxation.',
        terms: [
          'Please stay in the lobby at the designated time. The driver will call your name upon arrival.',
          'Ensure you stay in the lobby until the pickup is complete.',
          'The driver will not wait for more than 5 mins.',
        ],
        images: [svgDataUrl('Coral 1'), svgDataUrl('Coral 2'), svgDataUrl('Coral 3')],
      },
    ],
  },
  {
    dayLabel: 'Day 3 : Wednesday, February 11th, 2026',
    entries: [
      {
        type: 'activity',
        title: 'Pattaya Floating Market (Including Boat Ticket)',
        mode: 'PRIVATE',
        description:
          'Embark on an immersive journey through the vibrant Pattaya Floating Market, including a boat ticket. Explore bustling market stalls offering a variety of local delicacies, handmade crafts, and authentic souvenirs.',
        images: [svgDataUrl('Floating 1'), svgDataUrl('Floating 2'), svgDataUrl('Floating 3')],
      },
    ],
  },
  {
    dayLabel: 'Day 4 : Thursday, February 12th, 2026',
    entries: [
      {
        type: 'transfer',
        title: 'Inter-Hotel Transfer',
        mode: 'PRIVATE',
        pickup: 'FX Hotel Pattaya',
        drop: 'Grand Alpine Hotel',
        route: 'Transfers from Pattaya Hotel to Bangkok Hotel',
      },
      {
        type: 'activity',
        title: 'Princess Chao Phraya Dinner Cruise (Indian)',
        mode: 'SIC',
        description:
          'Embark on a delightful culinary journey along the Chao Phraya River with our Princess Chao Phraya Dinner Cruise. Enjoy a sumptuous Indian dinner buffet while taking in Bangkok skyline illuminated at night.',
        images: [svgDataUrl('Cruise 1'), svgDataUrl('Cruise 2'), svgDataUrl('Cruise 3')],
      },
    ],
  },
  {
    dayLabel: 'Day 5 : Friday, February 13th, 2026',
    entries: [
      {
        type: 'activity',
        title: 'Safari World and Marine Park with Lunch (Mon Closed)',
        mode: 'SIC',
        description:
          'Join us on an exhilarating expedition to Safari World and Marine Park, inclusive of lunch (closed on Mondays). Encounter a diverse array of wildlife and witness captivating marine spectacles.',
      },
    ],
  },
  {
    dayLabel: 'Day 6 : Saturday, February 14th, 2026',
    entries: [
      {
        type: 'activity',
        title:
          'Bangkok City Temple Tour (Marble and Golden Buddha with Gems Gallery) enroute Bangkok Hotel from BKK Airport',
        mode: 'PRIVATE',
        description:
          'Embark on a cultural journey from Suvarnabhumi Airport to your hotel, exploring Bangkok iconic landmarks. Visit the Marble Temple and Golden Buddha, followed by a Gems Gallery stop to discover Thailand gemstone heritage.',
        images: [svgDataUrl('Temple 1'), svgDataUrl('Temple 2'), svgDataUrl('Temple 3')],
      },
      {
        type: 'transfer',
        title: 'Departure',
        mode: 'PRIVATE',
        pickup: 'Grand Alpine Hotel',
        drop: 'Bangkok Suvarnabhumi Airport',
        route: 'Departure transfer from hotel to airport',
      },
    ],
  },
];

export const defaultQuotationData: QuotationData = {
  companyName: 'Through Vacations',
  companyAddress:
    'No.30, Gangaiamman Koil Street, Abishegapakkam, Puducherry, Puducherry, 605007',
  companyPhone: '918015950987',
  companyEmail: 'throughvacations@gmail.com',
  logoDataUrl: svgDataUrl('Through Vacations', '#2f4b8f'),
  pickupIconUrl: '',
  dropIconUrl: '',
  inclusionIconsJson: '[]',
  tripTitle: '5N Thailand',
  tripSubtitle: 'Trip to Thailand',
  travelDate: '09 Feb, 2026',
  totalNetPrice: 'INR 1,06,746.00',
  inclusions: [
    'FX Hotel Pattaya',
    'Grand Alpine Hotel',
    'Pattaya Floating Market (Including Boat Ticket)',
    'Tiger Park (Big Tiger, only for Adults)',
    'Coral Island Tour with Lunch by Speed Boat',
    'Bangkok City Temple Tour',
    'Princess Chao Phraya Dinner Cruise',
    'Safari World and Marine Park with Lunch',
    'Transfers (Private)',
    'Pick up from: Bangkok Suvarnabhumi Airport',
    'Drop at: Bangkok Suvarnabhumi Airport',
  ].join('\n'),
  guests: 'Miss Sruthi Gopalakrishnan',
  hotelsJson: JSON.stringify(sampleHotels, null, 2),
  sightseeingJson: JSON.stringify(sampleSightseeing, null, 2),
  itineraryJson: JSON.stringify(sampleItinerary, null, 2),
  feedbackPhone: '918015950987',
  thankYouText: 'Thank You',
};
