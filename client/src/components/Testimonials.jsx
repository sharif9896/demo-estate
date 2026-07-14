import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Layla Haddad',
    role: 'Bought a villa in Al Reem Island',
    quote:
      "Almas Estates made buying our first villa feel effortless. Our agent understood exactly what we wanted and found it within two weeks.",
    rating: 5,
    initials: 'LH',
  },
  {
    name: 'James Whitfield',
    role: 'Rented an apartment in Dubai Marina',
    quote:
      'Transparent pricing, no pressure, and a team that actually answered the phone. Renting through them was the easiest part of moving to Dubai.',
    rating: 5,
    initials: 'JW',
  },
  {
    name: 'Fatima Al Suwaidi',
    role: 'Sold a property in Yas Island',
    quote:
      'They handled every step of the sale, from staging photos to closing paperwork. We sold above asking price in under a month.',
    rating: 5,
    initials: 'FA',
  },
  {
    name: 'Carlos Mendes',
    role: 'Invested in Saadiyat Lagoons',
    quote:
      'As an overseas investor I needed someone I could trust completely. Almas gave me clear numbers and honest advice at every stage.',
    rating: 4,
    initials: 'CM',
  },
  {
    name: 'Noora Al Mazrouei',
    role: 'Bought an apartment in Al Majaz Waterfront',
    quote:
      "Our agent knew the Sharjah market inside and out. He steered us away from two buildings with hidden issues and toward the right one.",
    rating: 5,
    initials: 'NM',
  },
];

const AUTOPLAY_MS = 5500;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  }, []);

  const goTo = useCallback((i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }, [index]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, go]);

  const t = testimonials[index];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Testimonials</p>
        <h2 className="font-display text-3xl md:text-4xl text-navy">What our clients say</h2>
        <div className="divider-gold w-16 mx-auto mt-4" />
      </div>

      <div
        className="relative max-w-3xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 text-gold/15" size={72} strokeWidth={1} />

        <div className="relative min-h-[280px] sm:min-h-[240px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center text-center px-4 sm:px-10"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < t.rating ? 'fill-gold text-gold' : 'text-black/10'}
                  />
                ))}
              </div>

              <p className="font-display text-xl sm:text-2xl text-navy leading-relaxed mb-8">
                "{t.quote}"
              </p>

              <div className="w-14 h-14 rounded-full bg-navy text-gold flex items-center justify-center font-display text-lg mb-3">
                {t.initials}
              </div>
              <p className="text-navy font-medium">{t.name}</p>
              <p className="text-slate text-sm">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="hidden sm:flex absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-black/5 items-center justify-center text-navy hover:bg-ivory transition-colors focus-ring"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="hidden sm:flex absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border border-black/5 items-center justify-center text-navy hover:bg-ivory transition-colors focus-ring"
        >
          <ChevronRight size={18} />
        </button>

        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 focus-ring ${
                i === index ? 'w-8 bg-gold' : 'w-1.5 bg-black/15 hover:bg-black/25'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
