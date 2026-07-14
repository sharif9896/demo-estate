// Static/marketing data used to power the PropertyFinder-style discovery
// sections (top communities, new off-plan projects, travel-time landmarks).
// These are presentational blocks that sit alongside the live MongoDB-backed
// listings and don't require their own backend models.

// `icon` names map to lucide-react components (see TopCommunities.jsx) so every
// category badge renders as a themed, single-color line icon instead of a
// platform-dependent, multi-color emoji.
export const communityCategories = [
  { key: 'popular', label: 'Popular', icon: 'Trophy' },
  { key: 'budget', label: 'Budget-Friendly', icon: 'Wallet' },
  { key: 'business', label: 'Business Friendly', icon: 'Briefcase' },
  { key: 'eco', label: 'Eco & Sustainability', icon: 'Leaf' },
  { key: 'expats', label: 'Expats', icon: 'Globe2' },
  { key: 'family', label: 'Family Friendly', icon: 'Users' },
  { key: 'green', label: 'Green Areas', icon: 'Trees' },
];

export const uaeCities = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah'];

export const communities = [

  {
    id: 'emirates-hills', name: 'Emirates Hills', city: 'Dubai', rating: 4.4,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    tags: ['popular', 'family', 'green'],
  },
  {
    id: 'downtown-dubai', name: 'Downtown Dubai', city: 'Dubai', rating: 4.2,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    tags: ['popular', 'business'],
  },
  {
    id: 'dubai-marina', name: 'Dubai Marina', city: 'Dubai', rating: 4.0,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80',
    tags: ['popular', 'expats', 'business'],
  },
  {
    id: 'business-bay', name: 'Business Bay', city: 'Dubai', rating: 3.9,
    image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=600&q=80',
    tags: ['business', 'budget'],
  },
  {
    id: 'jvc', name: 'Jumeirah Village Circle', city: 'Dubai', rating: 3.8,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    tags: ['budget', 'family'],
  },
  {
    id: 'arabian-ranches', name: 'Arabian Ranches', city: 'Dubai', rating: 4.3,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80',
    tags: ['family', 'green'],
  },
  {
    id: 'al-reem-island', name: 'Al Reem Island', city: 'Abu Dhabi', rating: 4.0,
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=600&q=80',
    tags: ['popular', 'expats'],
  },
  {
    id: 'yas-island', name: 'Yas Island', city: 'Abu Dhabi', rating: 4.5,
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=600&q=80',
    tags: ['family', 'green', 'popular'],
  },
  {
    id: 'saadiyat-island', name: 'Saadiyat Island', city: 'Abu Dhabi', rating: 4.6,
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&q=80',
    tags: ['eco', 'green', 'family'],
  },
  {
    id: 'al-majaz', name: 'Al Majaz', city: 'Sharjah', rating: 3.9,
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80',
    tags: ['budget', 'family'],
  },
  {
    id: 'al-khan', name: 'Al Khan', city: 'Sharjah', rating: 3.7,
    image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=600&q=80',
    tags: ['budget'],
  },
];

// 20 off-plan projects spread across the four tabs shown in the UI.
const dev = (name) => ({ name });
export const newProjects = [
  // Dubai (8)
  { id: 'raw-district-2', title: 'Raw District 2 by Imtiaz', developer: 'IMTIAZ', city: 'Dubai', location: 'Sheikh Zayed Road, Dubai', launchPrice: 666000, deliveryDate: 'Q1 2030', paymentPlan: '10/40/50', beds: '1 - 3 Beds', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=700&q=80' },
  { id: 'the-edit-d3', title: 'The Edit at D3', developer: 'MERAAS', city: 'Dubai', location: 'Dubai Design District, D3', launchPrice: 2000000, deliveryDate: 'Q2 2028', paymentPlan: '2 Payment Plans', beds: '1 - 5 Beds', image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=80' },
  { id: 'raw-district', title: 'Raw District', developer: 'IMTIAZ', city: 'Dubai', location: 'Downtown Jebel Ali, Raw District', launchPrice: 649000, deliveryDate: 'Q1 2029', paymentPlan: '2 Payment Plans', beds: 'Studio - 2 Beds', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80' },
  { id: 'marina-vista', title: 'Marina Vista Residences', developer: 'EMAAR', city: 'Dubai', location: 'Dubai Marina', launchPrice: 1450000, deliveryDate: 'Q4 2028', paymentPlan: '60/40', beds: '1 - 3 Beds', image: 'https://images.unsplash.com/photo-1499602340034-058e4d7b5b40?auto=format&fit=crop&w=700&q=80' },
  { id: 'creek-horizon', title: 'Creek Horizon Towers', developer: 'EMAAR', city: 'Dubai', location: 'Dubai Creek Harbour', launchPrice: 1120000, deliveryDate: 'Q3 2029', paymentPlan: '1/99', beds: '1 - 4 Beds', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80' },
  { id: 'jvc-greens', title: 'JVC Greens', developer: 'DANUBE', city: 'Dubai', location: 'Jumeirah Village Circle', launchPrice: 540000, deliveryDate: 'Q2 2027', paymentPlan: '1% Monthly', beds: 'Studio - 2 Beds', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=700&q=80' },
  { id: 'business-bay-spire', title: 'Business Bay Spire', developer: 'SOBHA', city: 'Dubai', location: 'Business Bay', launchPrice: 1890000, deliveryDate: 'Q1 2029', paymentPlan: '80/20', beds: '2 - 4 Beds', image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=700&q=80' },
  { id: 'palm-frond-villas', title: 'Palm Frond Villas', developer: 'NAKHEEL', city: 'Dubai', location: 'Palm Jumeirah', launchPrice: 8500000, deliveryDate: 'Q4 2029', paymentPlan: '50/50', beds: '4 - 6 Beds', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=700&q=80' },
  // Abu Dhabi (5)
  { id: 'yas-bay-residences', title: 'Yas Bay Residences', developer: 'ALDAR', city: 'Abu Dhabi', location: 'Yas Island', launchPrice: 980000, deliveryDate: 'Q2 2028', paymentPlan: '40/60', beds: '1 - 3 Beds', image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=700&q=80' },
  { id: 'saadiyat-lagoons', title: 'Saadiyat Lagoons', developer: 'ALDAR', city: 'Abu Dhabi', location: 'Saadiyat Island', launchPrice: 2650000, deliveryDate: 'Q1 2030', paymentPlan: '20/80', beds: '3 - 5 Beds', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=700&q=80' },
  { id: 'reem-hills', title: 'Reem Hills Villas', developer: 'ALDAR', city: 'Abu Dhabi', location: 'Al Reem Island', launchPrice: 3200000, deliveryDate: 'Q3 2028', paymentPlan: '2 Payment Plans', beds: '4 - 5 Beds', image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=700&q=80' },
  { id: 'corniche-residences', title: 'Corniche Residences', developer: 'IMKAN', city: 'Abu Dhabi', location: 'Corniche Road', launchPrice: 1750000, deliveryDate: 'Q4 2027', paymentPlan: '60/40', beds: '2 - 4 Beds', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=700&q=80' },
  { id: 'masdar-eco-towers', title: 'Masdar Eco Towers', developer: 'MASDAR', city: 'Abu Dhabi', location: 'Masdar City', launchPrice: 890000, deliveryDate: 'Q2 2029', paymentPlan: '1% Monthly', beds: 'Studio - 2 Beds', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80' },
  // Sharjah (4)
  { id: 'al-majaz-waterfront', title: 'Al Majaz Waterfront', developer: 'ARADA', city: 'Sharjah', location: 'Al Majaz', launchPrice: 620000, deliveryDate: 'Q3 2027', paymentPlan: '10/40/50', beds: '1 - 3 Beds', image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=700&q=80' },
  { id: 'aljada-square', title: 'Aljada Square', developer: 'ARADA', city: 'Sharjah', location: 'Aljada', launchPrice: 480000, deliveryDate: 'Q1 2028', paymentPlan: '2 Payment Plans', beds: 'Studio - 2 Beds', image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=700&q=80' },
  { id: 'tilal-city-villas', title: 'Tilal City Villas', developer: 'TILAL', city: 'Sharjah', location: 'Tilal City', launchPrice: 1350000, deliveryDate: 'Q4 2028', paymentPlan: '50/50', beds: '3 - 5 Beds', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=700&q=80' },
  { id: 'muwaileh-gardens', title: 'Muwaileh Gardens', developer: 'ARADA', city: 'Sharjah', location: 'Muwaileh', launchPrice: 560000, deliveryDate: 'Q2 2027', paymentPlan: '1% Monthly', beds: '1 - 3 Beds', image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=700&q=80' },
  // Ras Al Khaimah (3)
  { id: 'mina-al-arab', title: 'Mina Al Arab Residences', developer: 'RAK PROPERTIES', city: 'Ras Al Khaimah', location: 'Mina Al Arab', launchPrice: 890000, deliveryDate: 'Q3 2028', paymentPlan: '60/40', beds: '1 - 4 Beds', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=700&q=80' },
  { id: 'al-marjan-towers', title: 'Al Marjan Island Towers', developer: 'RAK PROPERTIES', city: 'Ras Al Khaimah', location: 'Al Marjan Island', launchPrice: 1050000, deliveryDate: 'Q1 2029', paymentPlan: '2 Payment Plans', beds: '1 - 3 Beds', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=700&q=80' },
  { id: 'hayat-island-villas', title: 'Hayat Island Villas', developer: 'RAK PROPERTIES', city: 'Ras Al Khaimah', location: 'Hayat Island', launchPrice: 2100000, deliveryDate: 'Q4 2029', paymentPlan: '10/40/50', beds: '3 - 5 Beds', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=700&q=80' },
].map((p, i) => ({ ...p, id: p.id || `project-${i}` }));

// Landmarks used by the "Search by travel times" tool
export const landmarks = [
  { id: 'burj-khalifa', name: 'Burj Khalifa', city: 'Dubai' },
  { id: 'dubai-mall', name: 'The Dubai Mall', city: 'Dubai' },
  { id: 'dxb-airport', name: 'Dubai International Airport', city: 'Dubai' },
  { id: 'dubai-marina', name: 'Dubai Marina', city: 'Dubai' },
  { id: 'business-bay', name: 'Business Bay', city: 'Dubai' },
  { id: 'abu-dhabi-corniche', name: 'Abu Dhabi Corniche', city: 'Abu Dhabi' },
  { id: 'yas-island', name: 'Yas Island', city: 'Abu Dhabi' },
  { id: 'sharjah-city-centre', name: 'Sharjah City Centre', city: 'Sharjah' },
];

// Deterministic pseudo travel-time (in minutes) between a property and a
// landmark, derived from a simple string hash so the same pair always
// returns the same value without needing a real mapping/directions API.
export function estimateTravelMinutes(property, landmarkId, mode = 'driving') {
  const key = `${property._id || property.slug}-${landmarkId}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  const base = 5 + (hash % 50); // 5-54 mins baseline (driving)
  const modeMultiplier = mode === 'walking' ? 3.2 : mode === 'transit' ? 1.6 : 1;
  return Math.max(3, Math.round(base * modeMultiplier / (mode === 'driving' ? 1 : 1)));
}
