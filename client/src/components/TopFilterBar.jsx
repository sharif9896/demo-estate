import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const propertyTypes = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Land', 'Studio'];
const amenitiesList = ['Swimming Pool', 'Gym', 'Covered Parking', 'Balcony', 'Pet Friendly', 'Security', 'Central A/C', 'Kids Play Area', 'Sea View', 'Concierge'];

function Dropdown({ label, isOpen, onToggle, onClose, children, active }) {
  const ref = useRef(null);
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [onClose]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-1.5 whitespace-nowrap px-4 py-2.5 rounded-full border text-sm transition-colors focus-ring ${
          active ? 'border-navy text-navy bg-ivory font-medium' : 'border-black/10 text-slate hover:border-navy/30'
        }`}
      >
        {label}
        <ChevronDown size={15} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-30 top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-black/5 p-4 min-w-[240px]"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TopFilterBar({ filters, setFilters }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [q, setQ] = useState(filters.q || '');
  const toggle = (name) => setOpenMenu((m) => (m === name ? null : name));
  const close = () => setOpenMenu(null);
  const update = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  useEffect(() => {
    const t = setTimeout(() => update('q', q), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const toggleAmenity = (a) => {
    const current = filters.amenities || [];
    update('amenities', current.includes(a) ? current.filter((x) => x !== a) : [...current, a]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg border border-black/5 p-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-2"
    >
      {/* Rent / Buy toggle */}
      <div className="flex bg-ivory rounded-full p-1 shrink-0">
        {['rent', 'buy'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => update('purpose', p)}
            className={`px-4 py-2 text-sm rounded-full capitalize transition-colors focus-ring ${
              filters.purpose === p ? 'bg-navy text-gold' : 'text-slate'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Search box */}
      <div className="flex items-center gap-2 flex-1 border border-black/10 rounded-full px-4 py-2.5 min-w-[220px]">
        <Search size={16} className="text-slate shrink-0" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="City, community or building"
          className="w-full outline-none text-sm text-navy placeholder:text-slate/60"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Dropdown label="Property type" isOpen={openMenu === 'type'} onToggle={() => toggle('type')} onClose={close} active={!!filters.propertyType}>
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => { update('propertyType', filters.propertyType === t ? '' : t); close(); }}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${filters.propertyType === t ? 'bg-navy text-gold' : 'hover:bg-ivory text-slate'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown label="Beds & Baths" isOpen={openMenu === 'beds'} onToggle={() => toggle('beds')} onClose={close} active={!!filters.bedrooms}>
          <p className="text-xs uppercase tracking-wide text-slate mb-2">Min Bedrooms</p>
          <div className="flex gap-2 flex-wrap">
            {['Any', 1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => update('bedrooms', n === 'Any' ? '' : n)}
                className={`w-10 h-10 rounded-full text-sm transition-colors ${
                  (filters.bedrooms === n || (n === 'Any' && !filters.bedrooms)) ? 'bg-navy text-gold' : 'bg-ivory text-slate hover:bg-navy/10'
                }`}
              >
                {n === 'Any' ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>
        </Dropdown>

        <Dropdown label="Price" isOpen={openMenu === 'price'} onToggle={() => toggle('price')} onClose={close} active={!!(filters.minPrice || filters.maxPrice)}>
          <div className="flex flex-col gap-3 w-56">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Min Price (AED)</label>
              <input type="number" value={filters.minPrice || ''} onChange={(e) => update('minPrice', e.target.value)} placeholder="No min" className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm focus-ring" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Max Price (AED)</label>
              <input type="number" value={filters.maxPrice || ''} onChange={(e) => update('maxPrice', e.target.value)} placeholder="No limit" className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm focus-ring" />
            </div>
          </div>
        </Dropdown>

        <Dropdown label="Amenities" isOpen={openMenu === 'amenities'} onToggle={() => toggle('amenities')} onClose={close} active={(filters.amenities || []).length > 0}>
          <div className="flex flex-col gap-1 max-h-56 overflow-y-auto w-56">
            {amenitiesList.map((a) => (
              <label key={a} className="flex items-center gap-2 text-sm text-slate px-2 py-1.5 rounded-lg hover:bg-ivory cursor-pointer">
                <input type="checkbox" checked={(filters.amenities || []).includes(a)} onChange={() => toggleAmenity(a)} className="accent-navy" />
                {a}
              </label>
            ))}
          </div>
        </Dropdown>

        <Dropdown label="Area (sqft)" isOpen={openMenu === 'area'} onToggle={() => toggle('area')} onClose={close} active={!!(filters.minArea || filters.maxArea)}>
          <div className="flex flex-col gap-3 w-56">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Min Area</label>
              <input type="number" value={filters.minArea || ''} onChange={(e) => update('minArea', e.target.value)} placeholder="No min" className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm focus-ring" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Max Area</label>
              <input type="number" value={filters.maxArea || ''} onChange={(e) => update('maxArea', e.target.value)} placeholder="No limit" className="w-full border border-black/10 rounded-lg px-3 py-2 text-sm focus-ring" />
            </div>
          </div>
        </Dropdown>

        <Dropdown label="Residential" isOpen={openMenu === 'category'} onToggle={() => toggle('category')} onClose={close} active={!!filters.category}>
          <div className="flex flex-col gap-1 w-44">
            {['Residential', 'Commercial'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => { update('category', c); close(); }}
                className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${filters.category === c ? 'bg-navy text-gold' : 'hover:bg-ivory text-slate'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </Dropdown>
      </div>
    </motion.div>
  );
}
