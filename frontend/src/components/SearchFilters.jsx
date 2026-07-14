import React from 'react';

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Land', 'Studio'];
const cities = ['Dubai', 'Abu Dhabi', 'Sharjah'];

export default function SearchFilters({ filters, setFilters }) {
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-wide text-slate mb-1">City</label>
        <select value={filters.city} onChange={(e) => update('city', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring">
          <option value="">All Cities</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-slate mb-1">Type</label>
        <select value={filters.propertyType} onChange={(e) => update('propertyType', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring">
          <option value="">All Types</option>
          {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-slate mb-1">Min Bedrooms</label>
        <select value={filters.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring">
          <option value="">Any</option>
          {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wide text-slate mb-1">Max Price (AED)</label>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) => update('maxPrice', e.target.value)}
          placeholder="No limit"
          className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring"
        />
      </div>
    </div>
  );
}
