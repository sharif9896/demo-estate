require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Property = require('./models/Property');
const Agent = require('./models/Agent');
const Admin = require('./models/Admin');
const Page = require('./models/Page');

// Lorem Picsum serves freely licensed (CC0) photographs, seeded so the same
// listing always gets the same consistent set of images across reloads.
const photoSet = (seed, count = 4) =>
  Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/${seed}-${i}/900/600`);

const run = async () => {
  await connectDB();
  await Promise.all([
    Property.deleteMany(),
    Agent.deleteMany(),
    Admin.deleteMany(),
    Page.deleteMany(),
  ]);

  await Admin.create({
    name: 'Site Administrator',
    email: 'admin@almasestates.com',
    password: 'Admin@123',
    role: 'superadmin',
  });

  const agents = await Agent.insertMany([
    {
      name: 'Layla Haddad', title: 'Senior Property Consultant', agency: 'Almas Estates',
      email: 'layla@almasestates.com', phone: '+971 50 123 4567', whatsapp: '+971501234567',
      bio: 'Specializing in luxury waterfront properties across Dubai for over 8 years.',
      languages: ['English', 'Arabic', 'French'], yearsExperience: 8,
      photo: 'https://picsum.photos/seed/agent-layla/300/300',
    },
    {
      name: 'Omar Al Farsi', title: 'Investment Advisor', agency: 'Almas Estates',
      email: 'omar@almasestates.com', phone: '+971 55 987 6543', whatsapp: '+971559876543',
      bio: 'Helping investors find high-yield rental opportunities across the Emirates.',
      languages: ['English', 'Arabic'], yearsExperience: 6,
      photo: 'https://picsum.photos/seed/agent-omar/300/300',
    },
    {
      name: 'Sofia Marchetti', title: 'Leasing Specialist', agency: 'Almas Estates',
      email: 'sofia@almasestates.com', phone: '+971 52 456 7890', whatsapp: '+971524567890',
      bio: 'Dedicated to matching families with their perfect rental home.',
      languages: ['English', 'Italian', 'Arabic'], yearsExperience: 4,
      photo: 'https://picsum.photos/seed/agent-sofia/300/300',
    },
    {
      name: 'Rashid Al Mansoori', title: 'Commercial Property Specialist', agency: 'Almas Estates',
      email: 'rashid@almasestates.com', phone: '+971 56 234 5678', whatsapp: '+971562345678',
      bio: 'Focused on office space and commercial land across the Emirates business districts.',
      languages: ['English', 'Arabic', 'Hindi'], yearsExperience: 10,
      photo: 'https://picsum.photos/seed/agent-rashid/300/300',
    },
    {
      name: 'Elena Petrova', title: 'New Developments Consultant', agency: 'Almas Estates',
      email: 'elena@almasestates.com', phone: '+971 54 345 6789', whatsapp: '+971543456789',
      bio: 'Guides buyers through off-plan and newly handed-over developments across Dubai.',
      languages: ['English', 'Russian', 'Arabic'], yearsExperience: 5,
      photo: 'https://picsum.photos/seed/agent-elena/300/300',
    },
  ]);

  const neighborhoods = {
    Dubai: ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Business Bay', 'JVC', 'Arabian Ranches', 'Dubai Hills Estate', 'Jumeirah Village Triangle', 'DIFC', 'City Walk'],
    'Abu Dhabi': ['Al Reem Island', 'Yas Island', 'Saadiyat Island', 'Al Raha Beach', 'Corniche Road'],
    Sharjah: ['Al Majaz', 'Al Khan', 'Muwaileh', 'Al Nahda', 'Tilal City'],
  };
  const cities = Object.keys(neighborhoods);
  const types = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio', 'Office', 'Land'];
  const amenitiesPool = [
    'Swimming Pool', 'Gym', 'Covered Parking', 'Balcony', 'Pet Friendly', 'Security',
    'Central A/C', 'Kids Play Area', 'Sea View', 'Concierge', "Maid's Room",
    'Walk-in Closet', 'Built-in Wardrobes', 'Shared Spa', 'Private Garden', 'Study Room',
  ];
  const descriptors = [
    'A beautifully finished', 'A bright and spacious', 'An elegantly upgraded', 'A move-in ready',
    'A meticulously maintained', 'A rare corner-unit', 'A recently renovated', 'A sought-after',
  ];
  const closers = [
    'walking distance to schools, retail and dining.',
    'with quick access to major highways and the metro.',
    'offering unobstructed views and abundant natural light.',
    "in one of the community's most requested layouts.",
    'ideal for growing families or investors seeking strong rental yield.',
    'moments from waterfront promenades and community parks.',
  ];

  const properties = [];
  const total = 42;

  for (let i = 0; i < total; i++) {
    const purpose = i % 3 === 0 ? 'rent' : 'buy';
    const city = cities[i % cities.length];
    const hoods = neighborhoods[city];
    const neighborhood = hoods[i % hoods.length];
    const propertyType = types[i % types.length];
    const isLandOrOffice = ['Land', 'Office'].includes(propertyType);
    const bedrooms = propertyType === 'Studio' || isLandOrOffice ? 0 : (i % 5) + 1;
    const areaSqft = isLandOrOffice ? 1200 + (i * 233) % 8000 : 550 + (i * 137) % 3200;
    const basePrice = purpose === 'rent'
      ? 40000 + (i * 6700) % 220000
      : (isLandOrOffice ? 1500000 : 850000) + (i * 165000) % 9000000;

    const descriptor = descriptors[i % descriptors.length];
    const closer = closers[i % closers.length];
    const bedroomLabel = bedrooms > 0 ? `${bedrooms}BR ` : '';
    const seed = `${city}-${neighborhood}-${i}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const images = photoSet(seed, 3 + (i % 2));

    properties.push({
      title: `${bedroomLabel}${propertyType} in ${neighborhood}`,
      purpose,
      propertyType,
      price: basePrice,
      priceFrequency: purpose === 'rent' ? 'yearly' : 'total',
      bedrooms,
      bathrooms: isLandOrOffice ? 0 : Math.max(1, bedrooms),
      areaSqft,
      city,
      neighborhood,
      address: `${neighborhood}, ${city}, UAE`,
      description: `${descriptor} ${propertyType.toLowerCase()} located in the heart of ${neighborhood}, ${closer} This ${purpose === 'rent' ? 'rental' : 'home'} suits ${purpose === 'rent' ? 'tenants' : 'buyers'} looking for quality finishes and a well-connected address in ${city}.`,
      amenities: isLandOrOffice
        ? amenitiesPool.filter((_, idx) => (i + idx) % 5 === 0)
        : amenitiesPool.filter((_, idx) => (i + idx) % 3 === 0),
      images,
      coverImage: images[0],
      isFeatured: i % 6 === 0,
      status: 'available',
      agent: agents[i % agents.length]._id,
    });
  }

  await Property.insertMany(properties);

  await Page.insertMany([
    {
      key: 'home', title: 'Home', content: {
        heroHeadline: 'Find your place in the city of tomorrow',
        heroSubhead: 'Curated homes across Dubai, Abu Dhabi and Sharjah — verified listings, real agents, zero guesswork.',
      },
    },
    {
      key: 'about', title: 'About Almas Estates', content: {
        body: `Almas Estates was founded to make property search in the UAE simple, transparent and genuinely helpful — for buyers, tenants, and investors alike.

We work with a small team of licensed consultants who know their neighborhoods block by block, not just by the numbers. Every listing on our platform is reviewed before it goes live, so what you see is what you get: real photos, accurate pricing, and agents who actually pick up the phone.

Whether you're searching for your first rental in Dubai Marina, a family villa in Arabian Ranches, or a commercial unit in Business Bay, our goal is the same — fewer surprises, faster decisions, and a home that actually fits your life.`,
      },
    },
    {
      key: 'contact', title: 'Contact Us', content: {
        address: 'Level 12, Almas Tower, Jumeirah Lakes Towers, Dubai, UAE',
        phone: '+971 4 123 4567',
        email: 'hello@almasestates.com',
      },
    },
  ]);

  console.log(`Seed complete: ${properties.length} listings, ${agents.length} agents, 1 admin, 3 pages.`);
  console.log('Admin login -> email: admin@almasestates.com | password: Admin@123');
  await mongoose.connection.close();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});