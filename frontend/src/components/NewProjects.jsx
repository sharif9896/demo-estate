import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Building2 } from 'lucide-react';
import { newProjects, uaeCities } from '../data/staticData';

const formatPrice = (price) => `${new Intl.NumberFormat('en-AE').format(price)} AED`;

export default function NewProjects() {
  const [city, setCity] = useState('Dubai');
  const list = useMemo(() => newProjects.filter((p) => p.city === city), [city]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-2 flex items-center gap-3">
        <Building2 className="text-gold" size={26} />
        <h2 className="font-display text-3xl text-navy">Explore new projects in the UAE</h2>
      </div>
      <p className="text-slate mb-6">Discover the latest off-plan properties and be informed.</p>

      <div className="flex gap-6 border-b border-black/10 mb-8 overflow-x-auto no-scrollbar">
        {uaeCities.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCity(c)}
            className={`relative pb-3 text-sm whitespace-nowrap transition-colors focus-ring ${
              city === c ? 'text-navy font-medium' : 'text-slate hover:text-navy'
            }`}
          >
            {c}
            {city === c && (
              <motion.span layoutId="project-city-underline" className="absolute left-0 right-0 -bottom-px h-0.5 bg-gold" />
            )}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {list.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05 }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="relative h-64">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />

              <span className="absolute top-3 left-3 bg-white/90 text-navy text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wide font-medium">
                Off-Plan
              </span>
              <span className="absolute top-3 right-3 bg-navy/80 text-ivory text-[11px] px-2.5 py-1 rounded-full">
                {p.deliveryDate}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-4 text-ivory">
                <span className="inline-block bg-white/90 text-navy text-[10px] font-bold tracking-wide px-2 py-0.5 rounded mb-2">
                  {p.developer}
                </span>
                <h3 className="font-display text-lg leading-snug mb-1">{p.title}</h3>
                <p className="text-ivory/70 text-xs mb-2">{p.location}</p>
                <p className="text-ivory/70 text-xs mb-3">{p.beds}</p>
                <p className="text-gold font-mono text-sm mb-1">Launch price:</p>
                <p className="font-mono text-base mb-3">{formatPrice(p.launchPrice)}</p>
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-teal/90 text-ivory text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap">
                    {p.paymentPlan}
                  </span>
                  <a
                    href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hi, I'm interested in ${p.title}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-[#25D366] text-white text-xs px-3 py-2 rounded-lg hover:bg-[#1fbd5a] transition-colors focus-ring shrink-0"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
