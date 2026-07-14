import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import PurposeToggle from './PurposeToggle';

export default function Hero({ headline, subhead }) {
  const [purpose, setPurpose] = useState('buy');
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/${purpose}?q=${encodeURIComponent(q)}`);
  };

  return (
    <section className="relative bg-navy overflow-hidden pt-40 pb-40">
      {/* Hero background: real Dubai skyline photo (Burj Khalifa — the
          world's tallest building) sitting behind a navy gradient scrim so
          the headline, subhead and search card stay legible on top. Photo:
          Sirav Talwar / Unsplash, free to use under the Unsplash License. */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <img
          src="https://images.unsplash.com/photo-1745750434535-5943ef2fd31a?auto=format&fit=crop&w=2400&q=80"
          alt="Dubai skyline with the Burj Khalifa, the world's tallest building"
          className="w-full h-full object-cover object-bottom"
        />
      </motion.div>
      {/* Scrim: darkens the photo and fades it into the navy page background
          so text stays readable at every breakpoint. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/95 via-navy/75 to-navy" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.25em] text-gold text-xs mb-4"
        >
          UAE Property Marketplace
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl text-ivory leading-tight mb-6"
        >
          {headline || 'Find your place in the city of tomorrow'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-ivory/70 text-lg mb-10 max-w-xl mx-auto"
        >
          {subhead || 'Curated homes across Dubai, Abu Dhabi and Sharjah — verified listings, real agents, zero guesswork.'}
        </motion.p>
      </div>

      {/* Floating search card straddling hero/content boundary */}
      <motion.form
        onSubmit={onSearch}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative max-w-3xl mx-auto mt-4 px-6"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
          <div className="sm:w-40 shrink-0">
            <PurposeToggle value={purpose} onChange={setPurpose} />
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by city, neighborhood, or property name"
            className="flex-1 px-4 py-2 outline-none text-navy placeholder:text-slate/60 focus-ring rounded-lg"
          />
          <button type="submit" className="bg-gold hover:bg-gold-light text-navy px-6 py-2 rounded-xl flex items-center gap-2 justify-center font-medium transition-colors focus-ring">
            <Search size={18} /> Search
          </button>
        </div>
      </motion.form>

      <p className="absolute bottom-3 right-4 text-[10px] text-ivory/30 tracking-wide">
        Photo: Sirav Talwar / Unsplash
      </p>
    </section>
  );
}
