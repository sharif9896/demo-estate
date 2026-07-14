import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ChevronDown, Trophy, Wallet, Briefcase, Leaf, Globe2, Users, Trees, Award } from 'lucide-react';
import Carousel, { CarouselArrows } from './Carousel';
import { communities, communityCategories, uaeCities } from '../data/staticData';

// Maps the string icon names in staticData.js to the actual lucide-react
// components, keeping every category badge a single-color, on-theme icon.
const categoryIcons = { Trophy, Wallet, Briefcase, Leaf, Globe2, Users, Trees };

export default function TopCommunities() {
  const [category, setCategory] = useState('popular');
  const [city, setCity] = useState('Dubai');
  const [cityOpen, setCityOpen] = useState(false);
  const trackRef = useRef(null);

  const filtered = useMemo(
    () => communities.filter((c) => c.tags.includes(category) && c.city === city),
    [category, city]
  );
  const list = filtered.length ? filtered : communities.filter((c) => c.city === city);

  const scrollBy = (dir) => {
    if (trackRef.current) trackRef.current.scrollBy({ left: dir * 324, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            <Award size={20} strokeWidth={1.75} />
          </span>
          <h2 className="font-display text-3xl text-navy">Search by top communities</h2>
        </div>
        <CarouselArrows onLeft={() => scrollBy(-1)} onRight={() => scrollBy(1)} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {communityCategories.map((c) => {
            const Icon = categoryIcons[c.icon];
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setCategory(c.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border transition-colors focus-ring ${
                  category === c.key ? 'border-navy bg-navy text-gold' : 'border-black/10 text-slate hover:border-navy/30'
                }`}
              >
                {Icon && <Icon size={15} strokeWidth={1.75} />} {c.label}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setCityOpen((o) => !o)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/10 text-sm text-navy hover:border-navy/30 transition-colors focus-ring"
          >
            {city} <ChevronDown size={15} className={`transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
          </button>
          {cityOpen && (
            <div className="absolute z-20 top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden min-w-[160px]">
              {uaeCities.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => { setCity(c); setCityOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-ivory transition-colors ${city === c ? 'text-navy font-medium' : 'text-slate'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Carousel ref={trackRef} itemWidth={300}>
        {list.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
            className="snap-start shrink-0 w-[280px] bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-36">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <Star size={12} className="fill-gold text-gold" /> {c.rating.toFixed(1)}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-display text-base text-navy mb-3">{c.name}</h3>
              <div className="flex gap-2">
                <Link
                  to={`/buy?q=${encodeURIComponent(c.name)}`}
                  className="flex-1 text-center text-xs border border-navy/20 text-navy py-2 rounded-lg hover:bg-navy hover:text-ivory transition-colors focus-ring"
                >
                  Search
                </Link>
                <Link
                  to={`/rent?q=${encodeURIComponent(c.name)}`}
                  className="flex-1 text-center text-xs bg-navy text-gold py-2 rounded-lg hover:bg-navy-700 transition-colors focus-ring"
                >
                  Explore community
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </section>
  );
}
