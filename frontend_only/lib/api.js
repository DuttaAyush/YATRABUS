/**
 * DEMO MODE – api.js (frontend_only)
 * Completely standalone mock API layer with zero backend dependency.
 * Persists bookings, profile updates, and cancellations in localStorage.
 */

export const API_BASE_URL = 'http://localhost:5000'; // Fallback reference

// ─── Mock Datasets ────────────────────────────────────────────────────────────

export const DEMO_USER = {
  id: 'demo-user-001',
  name: 'Rajesh Patel',
  email: 'rajesh.patel@gmail.com',
  phone: '9876543210',
  gender: 'Male',
  ageGroup: '25-34',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  walletBalance: 2500,
  loyaltyPoints: 1240,
  joinedDate: '2024-01-15',
};

const BASE_BUSES = [
  {
    id: 'bus-1',
    operator: 'VedBus Gold Express',
    busType: 'BharatBenz AC Sleeper (2+1)',
    busPlate: 'MH-31-AP-4921',
    category: 'sleeper',
    price: 850,
    rating: '4.8',
    reviews: '2,341',
    depTime: '20:30',
    arrTime: '07:00',
    duration: '10h 30m',
    routeVia: 'Samruddhi Mahamarg',
    seatsLeft: 6,
    amenities: ['wifi', 'blanket', 'charging', 'water'],
  },
  {
    id: 'bus-2',
    operator: 'Shivneri Super Luxury',
    busType: 'Multi-Axle Volvo B11R AC Seater',
    busPlate: 'MH-12-QZ-8812',
    category: 'seater',
    price: 650,
    rating: '4.6',
    reviews: '1,892',
    depTime: '22:00',
    arrTime: '08:30',
    duration: '10h 30m',
    routeVia: 'Expressway Direct',
    seatsLeft: 12,
    amenities: ['wifi', 'charging', 'water'],
  },
  {
    id: 'bus-3',
    operator: 'Orange Royal Travels',
    busType: 'Scania Multi-Axle AC Sleeper',
    busPlate: 'MH-40-ZK-1122',
    category: 'sleeper',
    price: 950,
    rating: '4.9',
    reviews: '3,120',
    depTime: '21:15',
    arrTime: '07:45',
    duration: '10h 30m',
    routeVia: 'Samruddhi Mahamarg Express',
    seatsLeft: 4,
    amenities: ['wifi', 'blanket', 'charging', 'water'],
  },
  {
    id: 'bus-4',
    operator: 'VRL Premier Travels',
    busType: 'Volvo B9R AC Sleeper (2+1)',
    busPlate: 'KA-01-AA-3344',
    category: 'sleeper',
    price: 780,
    rating: '4.5',
    reviews: '987',
    depTime: '19:45',
    arrTime: '06:30',
    duration: '10h 45m',
    routeVia: 'NH Bypass Corridor',
    seatsLeft: 8,
    amenities: ['blanket', 'water'],
  },
  {
    id: 'bus-5',
    operator: 'IntraBus City Connect',
    busType: 'BharatBenz AC Seater (2+2)',
    busPlate: 'MH-49-CD-5566',
    category: 'seater',
    price: 480,
    rating: '4.3',
    reviews: '541',
    depTime: '06:00',
    arrTime: '16:30',
    duration: '10h 30m',
    routeVia: 'National Highway Highway',
    seatsLeft: 16,
    amenities: ['charging', 'water'],
  },
];

export const MOCK_PACKAGES_DATA = [
  // Spiritual Packages
  {
    id: 'chardham',
    _id: 'chardham',
    title: 'Char Dham Yatra & Haridwar Special',
    subtitle: 'Kedarnath • Badrinath • Gangotri • Yamunotri',
    destinations: 'Kedarnath • Badrinath • Gangotri • Yamunotri',
    duration: '10 Days / 9 Nights',
    basePrice: 24499,
    price: '₹24,499',
    pricePerPerson: 24499,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
    category: 'spiritual',
    badge: 'VIP Darshan & Helicopter Assist',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Complete sacred Himalayan pilgrimage with 2x2 BharatBenz AC Pushback transit, verified warm Himalayan stays, hot Satvik meals, and medical oxygen kit onboard.',
    desc: 'Complete sacred Himalayan pilgrimage with 2x2 BharatBenz AC Pushback transit, verified warm Himalayan stays, and hot Satvik meals.',
    tag: 'Deluxe Stays • Pure Satvik Food',
    tag1: 'Verified Warm Stays',
    tag2: 'Pure Satvik Dining',
    tags: ['Deluxe Stays', 'Pure Satvik Food', 'Har Ki Pauri Aarti'],
    inclusions: ['2x2 BharatBenz AC Pushback Coach', 'Verified Warm Stays', 'Pure Satvik Dining', 'Har Ki Pauri Aarti Slot', 'VIP Darshan Passes'],
    highlights: ['2x2 BharatBenz AC Pushback Coach', 'Verified Warm Stays', 'Pure Satvik Dining', 'Har Ki Pauri Aarti Slot', 'VIP Darshan Passes'],
    addons: [
      { id: 'heli', label: 'Kedarnath Helicopter Ticket ex-Phata', price: 3500, selected: false },
      { id: 'vip-pass', label: 'VIP Priority Queue Pass for Badrinath', price: 999, selected: true },
      { id: 'ganga-aarti', label: 'Har Ki Pauri Reserved Ganga Aarti Seat', price: 499, selected: true },
      { id: 'oxygen', label: 'Portable Medical Oxygen Cylinder Onboard', price: 650, selected: false },
    ],
  },
  {
    id: 'kashi-ayodhya',
    _id: 'kashi-ayodhya',
    title: 'Ayodhya Shri Ram Mandir & Kashi Corridor',
    subtitle: 'Ayodhya • Varanasi • Prayagraj Sangam',
    destinations: 'Ayodhya • Varanasi • Prayagraj Sangam',
    duration: '4 Days / 3 Nights',
    basePrice: 6499,
    price: '₹6,499',
    pricePerPerson: 6499,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_10.jpg',
    category: 'spiritual',
    badge: 'Ram Lalla & Kashi Corridor Pass',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Experience grand Ram Mandir darshan in Ayodhya, holy Triveni Sangam snan in Prayagraj, and private reserved boat for evening Varanasi Ganga Aarti.',
    desc: 'Experience grand Ram Mandir darshan in Ayodhya, holy Triveni Sangam snan, and private reserved boat for Varanasi Ganga Aarti.',
    tag: '3★ AC Hotel • Ganga Boat Included',
    tag1: '3★ AC Hotel',
    tag2: 'Ganga Boat Included',
    tags: ['3★ AC Hotel', 'Ganga Boat Included', 'Sugam Darshan Entry'],
    inclusions: ['3★ AC Hotel', 'Ganga Boat Included', 'Sugam Darshan Entry', 'Banarasi Pure Veg Thali'],
    highlights: ['3★ AC Hotel', 'Ganga Boat Included', 'Sugam Darshan Entry', 'Banarasi Pure Veg Thali'],
    addons: [
      { id: 'private-boat', label: 'Private Handcrafted Bajra Boat for Evening Aarti', price: 1200, selected: true },
      { id: 'sugam-darshan', label: 'Kashi Vishwanath Sugam Darshan Fast Pass', price: 600, selected: true },
      { id: 'ayodhya-guide', label: 'Dedicated Vedic Historian Guide in Ayodhya', price: 800, selected: false },
    ],
  },
  {
    id: 'tirupati-south',
    _id: 'tirupati-south',
    title: 'Tirupati Balaji & Meenakshi Amman',
    subtitle: 'Tirupati • Madurai • Rameshwaram',
    destinations: 'Tirupati • Madurai • Rameshwaram',
    duration: '5 Days / 4 Nights',
    basePrice: 8950,
    price: '₹8,950',
    pricePerPerson: 8950,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_11.jpg',
    category: 'spiritual',
    badge: '₹300 Seeghra Darshan & Laddu Prasadam',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Pre-booked Tirumala special entry darshan, tonsure assistance, holy snan at 22 teerthams of Rameshwaram, and Madurai Meenakshi temple guide.',
    desc: 'Pre-booked Tirumala special entry darshan, tonsure assistance, and holy snan at 22 teerthams of Rameshwaram.',
    tag: 'VIP Laddu Combo • Uphill AC Transit',
    tag1: 'VIP Laddu Combo',
    tag2: 'Uphill AC Transit',
    tags: ['VIP Laddu Combo', 'Uphill AC Transit', '22 Teertham Snan'],
    inclusions: ['VIP Laddu Combo', 'Uphill AC Transit', '22 Teertham Snan', 'Banana Leaf Satvik Meals'],
    highlights: ['VIP Laddu Combo', 'Uphill AC Transit', '22 Teertham Snan', 'Banana Leaf Satvik Meals'],
    addons: [
      { id: 'laddu-combo', label: 'Special Prasadam Laddu Box (4 Pieces)', price: 200, selected: true },
      { id: 'teertham-purohit', label: 'Dedicated Purohit for Rameshwaram 22 Wells Snan', price: 950, selected: true },
      { id: 'uphill-suv', label: 'Private Uphill Tirumala AC Innova Upgrade', price: 2200, selected: false },
    ],
  },
  {
    id: 'maharashtra-5jyotirlinga',
    _id: 'maharashtra-5jyotirlinga',
    title: 'Maharashtra 5 Jyotirlinga Darshan Circuit',
    subtitle: 'Trimbak • Bhimashankar • Grishneshwar • Aundha • Parli',
    destinations: 'Trimbak • Bhimashankar • Grishneshwar • Aundha • Parli',
    duration: '7 Days / 6 Nights',
    basePrice: 11499,
    price: '₹11,499',
    pricePerPerson: 11499,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_6.jpg',
    category: 'spiritual',
    badge: 'Complete Maharashtra Shiv Teerth',
    badgeColor: 'bg-amber-600 text-white',
    description: 'Holy circumambulation covering all five sacred Jyotirlingas in Maharashtra with Shirdi Sai Baba darshan included. Pre-booked Rudrabhishek slots.',
    desc: 'Holy circumambulation covering all five sacred Jyotirlingas in Maharashtra with Shirdi Sai Baba darshan included.',
    tag: 'Direct AC Sleeper • Pundit Escort',
    tag1: 'Direct AC Sleeper',
    tag2: 'Pundit Escort',
    tags: ['Direct AC Sleeper', 'Pundit Escort', 'VIP Rudrabhishek'],
    inclusions: ['Direct AC Sleeper', 'Pundit Escort', 'VIP Rudrabhishek', 'Shirdi Sai Darshan'],
    highlights: ['Direct AC Sleeper', 'Pundit Escort', 'VIP Rudrabhishek', 'Shirdi Sai Darshan'],
    addons: [
      { id: 'rudrabhishek', label: 'Trimbakeshwar Special Rudrabhishek Puja Slot', price: 1500, selected: true },
      { id: 'shirdi-vip', label: 'Shirdi Sai Baba VIP Samadhi Darshan Pass', price: 500, selected: true },
      { id: 'ellora-caves', label: 'Ellora Kailasa Temple Guided Excursion', price: 750, selected: false },
    ],
  },

  // International Packages
  {
    id: 'dubai-marina',
    _id: 'dubai-marina',
    title: 'Dubai Desert Safari & Marina Skyline',
    subtitle: 'Dubai • Abu Dhabi • Desert Safari',
    destinations: 'Dubai • Abu Dhabi • Desert Safari',
    duration: '5 Days / 4 Nights',
    basePrice: 48999,
    price: '₹48,999',
    pricePerPerson: 48999,
    image: '/images/vedbus_international_holiday_travel_packages_1.jpg',
    category: 'international',
    badge: '4-Star Marina Hotel & Visa Included',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Burj Khalifa VIP, Ferrari World, Desert Dune Safari & Marina Yacht Cruise with Indian Dinner.',
    desc: 'Burj Khalifa VIP, Ferrari World, Desert Dune Safari & Marina Yacht Cruise with Indian Dinner.',
    tag: '5★ Marriott Stay • Daily Indian Meals',
    tag1: '4★ Marina Hotel',
    tag2: 'Desert Safari Included',
    tags: ['4★ Marina Hotel Stay', 'Burj Khalifa 124th Floor Ticket', '4x4 Desert Safari & BBQ Dinner'],
    inclusions: ['4★ Marina Hotel Stay', 'Burj Khalifa 124th Floor Ticket', '4x4 Desert Safari & BBQ Dinner', 'Dhow Marina Cruise Dinner', 'Express eVisa Assistance'],
    highlights: ['4★ Marina Hotel Stay', 'Burj Khalifa 124th Floor Ticket', '4x4 Desert Safari & BBQ Dinner', 'Dhow Marina Cruise Dinner', 'Express eVisa Assistance'],
    addons: [
      { id: 'burj-prime', label: 'Burj Khalifa 148th Floor Sky Lounge Upgrade', price: 4200, selected: false },
      { id: 'abu-dhabi', label: 'Full Day Abu Dhabi Tour & BAPS Hindu Mandir', price: 2800, selected: true },
      { id: 'limo-transfer', label: 'VIP Stretch Limousine Airport Transfer', price: 3500, selected: false },
    ],
  },
  {
    id: 'singapore-malaysia',
    _id: 'singapore-malaysia',
    title: 'Singapore Gardens & Genting Highlands',
    subtitle: 'Singapore • Kuala Lumpur • Genting Highlands',
    destinations: 'Singapore • Kuala Lumpur • Genting Highlands',
    duration: '7 Days / 6 Nights',
    basePrice: 62500,
    price: '₹62,500',
    pricePerPerson: 62500,
    image: '/images/vedbus_international_holiday_travel_packages_2.jpg',
    category: 'international',
    badge: 'Universal Studios & Cable Car Pass',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Universal Studios Pass, Gardens by the Bay Entry, Genting Cable Car Ride, and 4★ City Center Stays.',
    desc: 'Universal Studios Pass, Gardens by the Bay Entry, Genting Cable Car Ride, and 4★ City Center Stays.',
    tag: 'Universal Studios • Cable Car Pass',
    tag1: '4★ City Center Stays',
    tag2: 'Dual Country Visa Assist',
    tags: ['Universal Studios Pass', 'Gardens by the Bay Entry', 'Genting Cable Car Ride'],
    inclusions: ['Universal Studios Pass', 'Gardens by the Bay Entry', 'Genting Cable Car Ride', '4★ City Center Stays', 'Dual Country Visa Assist'],
    highlights: ['Universal Studios Pass', 'Gardens by the Bay Entry', 'Genting Cable Car Ride', '4★ City Center Stays', 'Dual Country Visa Assist'],
    addons: [
      { id: 'universal-express', label: 'Universal Studios Express Unlimited Ride Pass', price: 3200, selected: false },
      { id: 'night-safari', label: 'Singapore Night Safari Tram Adventure', price: 1900, selected: true },
      { id: 'batu-caves', label: 'Private Guided Tour of Batu Caves & Murugan Temple', price: 1100, selected: true },
    ],
  },
  {
    id: 'bali-escape',
    _id: 'bali-escape',
    title: 'Bali Tropical Beaches & Ubud Culture',
    subtitle: 'Seminyak • Ubud • Kintamani Volcano',
    destinations: 'Seminyak • Ubud • Kintamani Volcano',
    duration: '6 Days / 5 Nights',
    basePrice: 39999,
    price: '₹39,999',
    pricePerPerson: 39999,
    image: '/images/vedbus_international_holiday_travel_packages_3.jpg',
    category: 'international',
    badge: 'Private Pool Villa & Floating Breakfast',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Ubud private pool villa, Tegalalang rice terraces swing, Uluwatu sunset temple & water sports.',
    desc: 'Ubud private pool villa, Tegalalang rice terraces swing, Uluwatu sunset temple & water sports.',
    tag: 'Private Pool Villa • Pure Veg / Jain',
    tag1: 'Private Pool Villa',
    tag2: 'Indian Food Buffets',
    tags: ['Private Pool Villa 2 Nights', 'Ubud Rice Terraces & Swing', 'Nusa Penida Island Ferry'],
    inclusions: ['Private Pool Villa 2 Nights', 'Ubud Rice Terraces & Swing', 'Nusa Penida Island Ferry', 'Indian Food Buffets'],
    highlights: ['Private Pool Villa 2 Nights', 'Ubud Rice Terraces & Swing', 'Nusa Penida Island Ferry', 'Indian Food Buffets'],
    addons: [
      { id: 'floating-breakfast', label: 'Iconic Floating Breakfast in Villa Pool', price: 1400, selected: true },
      { id: 'nusa-penida', label: 'Nusa Penida West Coast Snorkeling Excursion', price: 2400, selected: true },
      { id: 'uluwatu-kecak', label: 'Uluwatu Sunset Temple & Kecak Fire Dance Pass', price: 1200, selected: false },
    ],
  },
  {
    id: 'europe-wonders',
    _id: 'europe-wonders',
    title: 'Swiss Alps & Paris Romance',
    subtitle: 'Zurich • Mount Titlis • Lucerne • Paris',
    destinations: 'Zurich • Mount Titlis • Lucerne • Paris',
    duration: '8 Days / 7 Nights',
    basePrice: 124999,
    price: '₹1,24,999',
    pricePerPerson: 124999,
    image: '/images/vedbus_international_holiday_travel_packages_4.jpg',
    category: 'international',
    badge: 'Jungfrau Train & Eiffel Tower Entry',
    badgeColor: 'bg-teal-600 text-white',
    description: 'Eiffel Tower 2nd Level, Mt. Titlis Rotair Cable Car, Rhine Falls cruise, and scenic Interlaken trains.',
    desc: 'Eiffel Tower 2nd Level, Mt. Titlis Rotair Cable Car, Rhine Falls cruise, and scenic Interlaken trains.',
    tag: 'Premium 4★ Hotels • Hindi Tour Manager',
    tag1: 'Eiffel Tower 2nd Level',
    tag2: 'Swiss Travel Pass',
    tags: ['Eiffel Tower 2nd Level Access', 'Seine River Cruise', 'Mt. Titlis Rotair Cable Car'],
    inclusions: ['Eiffel Tower 2nd Level Access', 'Seine River Cruise', 'Mt. Titlis Rotair Cable Car', 'Swiss Travel Pass', 'Indian Dinners with Jain Options'],
    highlights: ['Eiffel Tower 2nd Level Access', 'Seine River Cruise', 'Mt. Titlis Rotair Cable Car', 'Swiss Travel Pass', 'Indian Dinners with Jain Options'],
    addons: [
      { id: 'jungfrau', label: 'Jungfraujoch - Top of Europe Mountain Rail Pass', price: 9500, selected: true },
      { id: 'louvre', label: 'Louvre Museum Priority Entry with Audio Guide', price: 2600, selected: false },
      { id: 'disneyland', label: '1-Day Disneyland Paris 1-Park Entry Ticket', price: 6800, selected: false },
    ],
  },

  // Domestic Packages
  {
    id: 'goa-coastal',
    _id: 'goa-coastal',
    title: 'Goa Coastal & Heritage Villa Escape',
    subtitle: 'Calangute • Baga • Mandovi Sunset Cruise',
    destinations: 'Calangute • Baga • Mandovi Sunset Cruise',
    duration: '4 Days / 3 Nights',
    basePrice: 6999,
    price: '₹6,999',
    pricePerPerson: 6999,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_15.jpg',
    category: 'domestic',
    badge: 'Beachfront Villa & Sunset Cruise',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Candolim beachside resort, private cab for North/South Goa, Spice plantation tour with Goan buffet lunch.',
    desc: 'Candolim beachside resort, private cab for North/South Goa, Spice plantation tour with Goan buffet lunch.',
    tag: '4★ Heritage Villa • Daily Meals',
    tag1: '4★ Heritage Villa',
    tag2: 'Daily Breakfast & Dinner',
    tags: ['Heritage Boutique Stay', 'Mandovi Luxury Sunset Cruise', 'North & South Goa Sightseeing'],
    inclusions: ['Heritage Boutique Stay', 'Mandovi Luxury Sunset Cruise', 'North & South Goa Sightseeing', 'All Transfers'],
    highlights: ['Heritage Boutique Stay', 'Mandovi Luxury Sunset Cruise', 'North & South Goa Sightseeing', 'All Transfers'],
    addons: [
      { id: 'catamaran', label: 'Private Sunset Catamaran Cruise with Drinks', price: 1500, selected: true },
      { id: 'water-sports', label: '5-in-1 Water Sports Combo (Parasailing/JetSki)', price: 1200, selected: true },
      { id: 'scooter', label: 'Self-Drive Activa Scooter Rental (3 Days)', price: 900, selected: false },
    ],
  },
  {
    id: 'kerala-backwaters',
    _id: 'kerala-backwaters',
    title: 'Kerala Backwaters & Munnar Tea Trails',
    subtitle: 'Kochi • Munnar Hills • Alleppey Houseboat',
    destinations: 'Kochi • Munnar Hills • Alleppey Houseboat',
    duration: '5 Days / 4 Nights',
    basePrice: 11200,
    price: '₹11,200',
    pricePerPerson: 11200,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_14.jpg',
    category: 'domestic',
    badge: 'Private AC Houseboat & Tea Trails',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Alleppey luxury houseboat overnight cruise, tea plantations in Munnar, Kathakali dance cultural show.',
    desc: 'Alleppey luxury houseboat overnight cruise, tea plantations in Munnar, Kathakali dance cultural show.',
    tag: 'Private Houseboat • Pure Veg / Jain',
    tag1: 'Private Houseboat',
    tag2: 'Pure Veg / Jain Chef',
    tags: ['Deluxe Resort Stays', 'Private AC Houseboat Cruise', 'Munnar Tea Plantation Escort'],
    inclusions: ['Deluxe Resort Stays', 'Private AC Houseboat Cruise', 'Munnar Tea Plantation Escort', 'Kathakali Show Ticket', 'All Transfers'],
    highlights: ['Deluxe Resort Stays', 'Private AC Houseboat Cruise', 'Munnar Tea Plantation Escort', 'Kathakali Show Ticket', 'All Transfers'],
    addons: [
      { id: 'houseboat-upgrade', label: 'Luxury AC Houseboat Master Suite Upgrade', price: 2500, selected: true },
      { id: 'kathakali', label: 'Kathakali Dance & Martial Arts VIP Front Row', price: 450, selected: true },
      { id: 'spice-tour', label: 'Munnar Spice Plantation Guided Walk & Lunch', price: 750, selected: false },
    ],
  },
  {
    id: 'himachal-manali',
    _id: 'himachal-manali',
    title: 'Himachal Snow Valley & Rohtang Pass',
    subtitle: 'Shimla • Kullu • Manali • Solang Valley',
    destinations: 'Shimla • Kullu • Manali • Solang Valley',
    duration: '5 Days / 4 Nights',
    basePrice: 9800,
    price: '₹9,800',
    pricePerPerson: 9800,
    image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_5.jpg',
    category: 'domestic',
    badge: 'Atal Tunnel & Solang Snow Pass',
    badgeColor: 'bg-emerald-600 text-white',
    description: 'Delhi/Chandigarh Volvo semi-sleeper transit, Beas river valley cottage, Solang snow sports, Manikaran hot springs.',
    desc: 'Delhi/Chandigarh Volvo semi-sleeper transit, Beas river valley cottage, Solang snow sports, Manikaran hot springs.',
    tag: 'Heated Chalet • All Meals Included',
    tag1: 'Heated Chalet',
    tag2: 'All Meals Included',
    tags: ['Cedar Wood Chalet Stay', 'Solang Valley Snow Point Transit', 'Atal Tunnel Crossing'],
    inclusions: ['Cedar Wood Chalet Stay', 'Solang Valley Snow Point Transit', 'Atal Tunnel Crossing', 'Bonfire & Himachali Dinner'],
    highlights: ['Cedar Wood Chalet Stay', 'Solang Valley Snow Point Transit', 'Atal Tunnel Crossing', 'Bonfire & Himachali Dinner'],
    addons: [
      { id: 'rohtang-pass', label: 'Special Green Permit for Rohtang Pass 4x4', price: 1800, selected: true },
      { id: 'paragliding', label: 'High Fly Paragliding in Solang Valley with GoPro', price: 2200, selected: false },
      { id: 'river-rafting', label: 'Kullu Beas River Rafting Combo (12 Km)', price: 1100, selected: true },
    ],
  },
];

const MOCK_COUPONS = {
  VEDBUS10: { code: 'VEDBUS10', discountPercentage: 10, maxDiscountAmount: 500, description: '10% off up to ₹500' },
  YATRA20: { code: 'YATRA20', discountPercentage: 20, maxDiscountAmount: 1000, description: '20% off up to ₹1000' },
  FIRST50: { code: 'FIRST50', discountPercentage: 50, maxDiscountAmount: 300, description: '50% off first booking up to ₹300' },
  FESTIVE15: { code: 'FESTIVE15', discountPercentage: 15, maxDiscountAmount: 750, description: '15% festive discount' },
};

function getLocalTrips() {
  if (typeof window === 'undefined') return [];
  try {
    const u = JSON.parse(localStorage.getItem('vedbus_user') || 'null') || DEMO_USER;
    const key = u?.id ? `vedbus_user_trips_${u.id}` : 'vedbus_user_trips';
    const stored = localStorage.getItem(key) || localStorage.getItem('vedbus_user_trips');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function saveLocalTrip(newTrip) {
  if (typeof window === 'undefined') return;
  try {
    const u = JSON.parse(localStorage.getItem('vedbus_user') || 'null') || DEMO_USER;
    const key = u?.id ? `vedbus_user_trips_${u.id}` : 'vedbus_user_trips';
    const existing = getLocalTrips();
    const updated = [newTrip, ...existing.filter((t) => t.id !== newTrip.id)];
    localStorage.setItem(key, JSON.stringify(updated));
    localStorage.setItem('vedbus_user_trips', JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save local trip:', err);
  }
}

// ─── Mock apiFetch ─────────────────────────────────────────────────────────────

export async function apiFetch(endpoint, options = {}) {
  // Simulate natural quick network response
  await new Promise((r) => setTimeout(r, 120 + Math.random() * 150));

  const url = endpoint.startsWith('http') ? endpoint : endpoint;
  const method = (options.method || 'GET').toUpperCase();

  // ── 1. Bus Search ───────────────────────────────────────────────────────────
  if (url.includes('/api/buses/search')) {
    let from = 'Nagpur';
    let to = 'Pune';
    try {
      const qIndex = url.indexOf('?');
      if (qIndex !== -1) {
        const params = new URLSearchParams(url.slice(qIndex));
        if (params.get('from')) from = params.get('from');
        if (params.get('to')) to = params.get('to');
      }
    } catch {}

    const buses = BASE_BUSES.map((b) => ({
      ...b,
      depLocation: `${from} City Terminal`,
      arrLocation: `${to} Central Drop Point`,
    }));
    return mockResponse({ success: true, data: buses });
  }

  // ── 2. Seat Availability ───────────────────────────────────────────────────
  if (url.includes('/api/bookings/seats')) {
    return mockResponse({
      success: true,
      data: {
        bookedSeats: ['2', '13', '19', '25', '32', '38'],
        lockedSeats: ['7', '28'],
      },
    });
  }

  // ── 3. Hold Seat ───────────────────────────────────────────────────────────
  if (url.includes('/api/bookings/hold')) {
    const holdId = 'HOLD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return mockResponse({ success: true, data: { holdId, expiresInSeconds: 600 } });
  }

  // ── 4. Packages By ID (e.g. /api/packages/chardham) ──────────────────────
  const pkgIdMatch = url.match(/\/api\/packages\/([a-zA-Z0-9_-]+)/);
  if (pkgIdMatch && pkgIdMatch[1] && !pkgIdMatch[1].startsWith('search')) {
    const reqId = pkgIdMatch[1].toLowerCase();
    const found = MOCK_PACKAGES_DATA.find((p) => p.id.toLowerCase() === reqId) || MOCK_PACKAGES_DATA[0];
    return mockResponse({ success: true, data: found });
  }

  // ── 5. Packages List (all or by category) ──────────────────────────────────
  if (url.includes('/api/packages')) {
    let filtered = MOCK_PACKAGES_DATA;
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('category=spiritual')) {
      filtered = MOCK_PACKAGES_DATA.filter((p) => p.category === 'spiritual');
    } else if (lowerUrl.includes('category=international')) {
      filtered = MOCK_PACKAGES_DATA.filter((p) => p.category === 'international');
    } else if (lowerUrl.includes('category=domestic')) {
      filtered = MOCK_PACKAGES_DATA.filter((p) => p.category === 'domestic');
    }
    return mockResponse({ success: true, data: filtered });
  }

  // ── 6. Coupon Validation ───────────────────────────────────────────────────
  if (url.includes('/api/offers/validate') && method === 'POST') {
    let body = {};
    try { body = JSON.parse(options.body || '{}'); } catch {}
    const code = (body.code || '').toUpperCase().trim();
    if (MOCK_COUPONS[code]) {
      return mockResponse({ success: true, data: MOCK_COUPONS[code] });
    }
    return mockResponse({ success: false, message: 'Invalid coupon code. Try VEDBUS10 or YATRA20' }, 400);
  }

  // ── 7. Bus Tracking ────────────────────────────────────────────────────────
  if (url.includes('/api/tracking/')) {
    const ticketId = url.split('/api/tracking/')[1] || 'YB-994821';
    return mockResponse({
      success: true,
      data: {
        ticketId,
        status: 'On Time (Samruddhi Mahamarg)',
        busPlate: 'MH-31-AP-4921',
        speed: '78 km/h',
        progressPercentage: 68,
        eta: '2h 15m remaining',
        currentLocation: 'Jalna Expressway Rest Plaza',
        milestones: [
          { location: 'Nagpur Terminal (Departed)', time: '20:30', status: 'completed' },
          { location: 'Karanja Lad Interchange', time: '22:00', status: 'completed' },
          { location: 'Jalna Expressway Rest Plaza', time: '23:45', status: 'current' },
          { location: 'Aurangabad Bypass', time: '02:15', status: 'upcoming' },
          { location: 'Pune Swargate Terminal', time: '07:00', status: 'upcoming' },
        ],
      },
    });
  }

  // ── 8. Create Bus Booking ──────────────────────────────────────────────────
  if (url.includes('/api/bookings') && method === 'POST') {
    let body = {};
    try { body = JSON.parse(options.body || '{}'); } catch {}
    const ticketId = `YB-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTrip = {
      id: ticketId,
      bookingId: ticketId,
      type: 'bus',
      operator: body.operator || 'VedBus Gold Express',
      busType: body.busType || 'BharatBenz AC Sleeper (2+1)',
      busPlate: body.busPlate || 'MH-31-AP-4921',
      from: body.from || 'Nagpur',
      fromStation: `${body.from || 'Nagpur'} Terminal`,
      depTime: body.depTime || '20:30',
      depDate: body.date || 'Tomorrow, 24 Oct',
      to: body.to || 'Pune',
      toStation: `${body.to || 'Pune'} Terminal`,
      arrTime: body.arrTime || '07:00',
      arrDate: 'Next Day',
      seats: (body.selectedSeats || [{ name: '3' }]).map((s) => s.name || s.id),
      passengerCount: (body.selectedSeats || [1]).length,
      totalFare: body.totalAmount || 850,
      totalAmount: body.totalAmount || 850,
      status: 'Confirmed',
      driverName: 'Sunil Sharma',
      driverPhone: '+91 98220 11223',
      currentLocation: 'Terminal Bay (Scheduled)',
      speed: '0 km/h',
      bookedAt: new Date().toISOString(),
    };

    saveLocalTrip(newTrip);

    return mockResponse({
      success: true,
      booking: { id: ticketId },
      data: { booking: { id: ticketId }, ticketId },
      message: 'Bus ticket booking confirmed!',
    });
  }

  // ── 9. Create Package Booking ──────────────────────────────────────────────
  if ((url.includes('/api/packages/book') || url.includes('/package-bookings')) && method === 'POST') {
    let body = {};
    try { body = JSON.parse(options.body || '{}'); } catch {}
    const bookingId = `VEDBUS-PKG-${Math.floor(100000 + Math.random() * 900000)}`;
    const pkg = MOCK_PACKAGES_DATA.find((p) => p.id === body.packageId) || MOCK_PACKAGES_DATA[0];

    const newTrip = {
      id: bookingId,
      bookingId,
      isPackage: true,
      pkgId: pkg.id,
      title: pkg.title,
      subtitle: pkg.subtitle,
      category: pkg.category,
      duration: pkg.duration,
      image: pkg.image,
      date: new Date(Date.now() + 86400000 * 7).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      travelerCount: body.travelersCount || 2,
      totalAmount: body.totalAmount || pkg.basePrice,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    saveLocalTrip(newTrip);

    return mockResponse({
      success: true,
      booking: { id: bookingId },
      data: { booking: { id: bookingId } },
      message: 'Package booking confirmed!',
    });
  }

  // ── 10. Cancel Booking (Bus) ────────────────────────────────────────────────
  if (method === 'DELETE' && url.includes('/api/bookings/')) {
    const id = url.split('/api/bookings/')[1];
    if (typeof window !== 'undefined') {
      const trips = getLocalTrips();
      const updated = trips.map((t) => (t.id === id || t.bookingId === id ? { ...t, status: 'Cancelled' } : t));
      const u = JSON.parse(localStorage.getItem('vedbus_user') || 'null') || DEMO_USER;
      const key = u?.id ? `vedbus_user_trips_${u.id}` : 'vedbus_user_trips';
      localStorage.setItem(key, JSON.stringify(updated));
      localStorage.setItem('vedbus_user_trips', JSON.stringify(updated));
    }
    return mockResponse({ success: true, message: 'Booking cancelled. 100% refund credited to Yatra Wallet.' });
  }

  // ── 11. Cancel/Update Package Status ─────────────────────────────────────────
  if (method === 'PATCH' && url.includes('/status')) {
    return mockResponse({ success: true, message: 'Package status updated to Cancelled.' });
  }

  // ── 12. User Profile (GET) ─────────────────────────────────────────────────
  if (url.includes('/api/users/profile') && method === 'GET') {
    let user = DEMO_USER;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('vedbus_user');
        if (stored && stored !== 'null') {
          user = { ...DEMO_USER, ...JSON.parse(stored) };
        }
      } catch {}
    }
    return mockResponse({ success: true, data: user, name: user.name });
  }

  // ── 13. User Profile (PATCH) ───────────────────────────────────────────────
  if (url.includes('/api/users/profile') && method === 'PATCH') {
    let body = {};
    try { body = JSON.parse(options.body || '{}'); } catch {}
    if (typeof window !== 'undefined') {
      const current = JSON.parse(localStorage.getItem('vedbus_user') || JSON.stringify(DEMO_USER));
      const updated = { ...current, ...body };
      localStorage.setItem('vedbus_user', JSON.stringify(updated));
      window.dispatchEvent(new Event('vedbus-auth-change'));
    }
    return mockResponse({ success: true, message: 'Profile updated successfully!' });
  }

  // ── 14. User My Bookings (GET) ─────────────────────────────────────────────
  if (url.includes('/api/users/my-bookings')) {
    const localTrips = getLocalTrips();

    // Default seeded bus bookings if none exist yet
    const busBookings = localTrips.filter((t) => !t.isPackage);
    const packageBookings = localTrips.filter((t) => t.isPackage);

    // If completely brand new session, return at least 1 default active journey
    const finalBusBookings =
      busBookings.length > 0
        ? busBookings.map((b) => ({
            id: b.id || b.bookingId,
            seatNumbers: Array.isArray(b.seats) ? b.seats : ['3', '5'],
            totalAmount: b.totalFare || b.totalAmount || 1785,
            status: b.status || 'Confirmed',
            trip: {
              departureDatetime: new Date(Date.now() + 86400000).toISOString(),
              arrivalDatetime: new Date(Date.now() + 120000000).toISOString(),
              bus: {
                plateNumber: b.busPlate || 'MH-31-AP-4921',
                type: b.busType || 'BharatBenz AC Sleeper (2+1)',
                busStyle: 'sleeper',
              },
              route: {
                originCity: b.from || 'Nagpur',
                destinationCity: b.to || 'Pune',
              },
            },
          }))
        : [
            {
              id: 'YB-994821',
              seatNumbers: ['3', '5'],
              totalAmount: 1870,
              status: 'Confirmed',
              trip: {
                departureDatetime: new Date(Date.now() + 86400000).toISOString(),
                arrivalDatetime: new Date(Date.now() + 120000000).toISOString(),
                bus: {
                  plateNumber: 'MH-31-AP-4921',
                  type: 'BharatBenz AC Sleeper (2+1)',
                  busStyle: 'sleeper',
                },
                route: {
                  originCity: 'Nagpur',
                  destinationCity: 'Pune',
                },
              },
            },
          ];

    const finalPackageBookings =
      packageBookings.length > 0
        ? packageBookings.map((pb) => ({
            id: pb.id || pb.bookingId,
            packageId: pb.pkgId || 'chardham',
            travelDate: pb.date || new Date(Date.now() + 604800000).toISOString(),
            travelersCount: pb.travelerCount || 2,
            totalAmount: pb.totalAmount || 48998,
            status: pb.status || 'Confirmed',
            package: {
              title: pb.title || 'Char Dham Yatra & Haridwar Special',
              category: pb.category || 'Spiritual',
              durationDays: 10,
              itinerary: {
                image: pb.image || '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
              },
            },
          }))
        : [
            {
              id: 'PKG-28441',
              packageId: 'chardham',
              travelDate: new Date(Date.now() + 604800000).toISOString(),
              travelersCount: 2,
              totalAmount: 48998,
              status: 'Confirmed',
              package: {
                title: 'Char Dham Yatra & Haridwar Special',
                category: 'Spiritual',
                durationDays: 10,
                itinerary: {
                  image: '/images/vedbus_all_india_spiritual_darshan_bus_tickets_holiday_packages_9.jpg',
                },
              },
            },
          ];

    return mockResponse({
      success: true,
      data: {
        busBookings: finalBusBookings,
        packageBookings: finalPackageBookings,
      },
    });
  }

  // ── 15. Auth: Login ─────────────────────────────────────────────────────────
  if (url.includes('/api/auth/login')) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vedbus_user', JSON.stringify(DEMO_USER));
      localStorage.setItem('vedbus_token', 'demo-token-' + Date.now());
      window.dispatchEvent(new Event('vedbus-auth-change'));
    }
    return mockResponse({
      success: true,
      data: { accessToken: 'demo-token-123', user: DEMO_USER },
      accessToken: 'demo-token-123',
      user: DEMO_USER,
    });
  }

  // ── 16. Auth: Register ──────────────────────────────────────────────────────
  if (url.includes('/api/auth/register')) {
    let body = {};
    try { body = JSON.parse(options.body || '{}'); } catch {}
    const newUser = {
      ...DEMO_USER,
      name: body.name || DEMO_USER.name,
      email: body.email || DEMO_USER.email,
      phone: body.phone || DEMO_USER.phone,
    };
    if (typeof window !== 'undefined') {
      localStorage.setItem('vedbus_user', JSON.stringify(newUser));
      localStorage.setItem('vedbus_token', 'demo-token-' + Date.now());
      window.dispatchEvent(new Event('vedbus-auth-change'));
    }
    return mockResponse({
      success: true,
      data: { accessToken: 'demo-token-123', user: newUser },
      accessToken: 'demo-token-123',
      user: newUser,
    });
  }

  // ── 17. Auth: Logout ────────────────────────────────────────────────────────
  if (url.includes('/api/auth/logout')) {
    return mockResponse({ success: true });
  }

  // ── 18. Default fallback ───────────────────────────────────────────────────
  return mockResponse({ success: true, data: null });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mockResponse(data, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: async () => data,
    text: async () => JSON.stringify(data),
  };
}
