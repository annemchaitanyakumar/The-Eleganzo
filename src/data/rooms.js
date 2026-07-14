export const rooms = [
  {
    id: 'valley-view-suite',
    title: 'Valley View Suite',
    subtitle: 'Master Bedroom',
    description:
      'Wake to panoramic views of the Palani Hills. Floor-to-ceiling windows frame a living canvas of mist-draped valleys and ancient forests. A king-size bed, stone fireplace, and private balcony create an intimate sanctuary at 7,000 feet.',
    shortDescription: 'Panoramic valley views with private balcony and stone fireplace.',
    images: [
      '/images/room-valley-1.jpg',
      '/images/room-valley-2.jpg',
      '/images/room-valley-3.jpg',
    ],
    amenities: ['King Bed', 'Valley View', 'Fireplace', 'Private Balcony', 'Smart TV', 'Wi-Fi', 'En-suite Bath'],
    size: '450 sq ft',
    occupancy: '2 Guests',
    price: '₹8,500',
    priceUnit: 'per night',
    features: [
      'Floor-to-ceiling panoramic windows',
      'Hand-crafted stone fireplace',
      'Premium Egyptian cotton linens',
      'Rainfall shower with mountain herbs',
      'Curated minibar with local selections',
    ],
  },
  {
    id: 'forest-retreat-room',
    title: 'Forest Retreat Room',
    subtitle: 'Second Bedroom',
    description:
      'Nestled among towering pines, this serene retreat offers a cocooning warmth with rich wood interiors, plush bedding, and the gentle sounds of the forest. Perfect for contemplation and deep rest.',
    shortDescription: 'Cozy woodland retreat with pine forest views and warm interiors.',
    images: [
      '/images/room-forest-1.jpg',
      '/images/room-forest-2.jpg',
      '/images/room-forest-3.jpg',
    ],
    amenities: ['Queen Bed', 'Forest View', 'Reading Nook', 'Smart TV', 'Wi-Fi', 'En-suite Bath'],
    size: '380 sq ft',
    occupancy: '2 Guests',
    price: '₹6,500',
    priceUnit: 'per night',
    features: [
      'Panoramic forest-facing windows',
      'Cozy reading nook with mountain views',
      'Premium organic cotton bedding',
      'Aromatic cedar wood interiors',
      'Private herb garden access',
    ],
  },
  {
    id: 'the-eleganzo-complete',
    title: 'The Eleganzo — Complete',
    subtitle: 'Entire Property',
    description:
      'Reserve the entire Eleganzo for an exclusive mountain getaway. Two luxurious bedrooms, a grand living space with a roaring fireplace, a fully equipped kitchen, private balconies, and a dedicated bonfire area — all yours.',
    shortDescription: 'The complete 2BHK luxury homestay — your private mountain estate.',
    images: [
      '/images/room-complete-1.jpg',
      '/images/room-complete-2.jpg',
      '/images/room-complete-3.jpg',
    ],
    amenities: ['2 Bedrooms', '360° Views', 'Fireplace', 'Full Kitchen', 'Bonfire Area', 'Private Parking', 'Smart TVs'],
    size: '1,200 sq ft',
    occupancy: '4 Guests',
    price: '₹14,000',
    priceUnit: 'per night',
    features: [
      'Complete 2BHK luxury accommodation',
      'Grand living room with stone fireplace',
      'Fully equipped modern kitchen',
      'Private bonfire and barbecue area',
      'Dedicated parking and caretaker service',
      'Home-cooked meals on request',
    ],
  },
];

export const getRoomById = (id) => rooms.find((room) => room.id === id);
