import React from 'react';
import { motion } from 'framer-motion';
import { Search, CalendarCheck, Key } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Search & Shortlist',
    desc: 'Browse verified listings by community, budget, or travel time to the places that matter to you.',
  },
  {
    icon: CalendarCheck,
    step: '02',
    title: 'Tour & Decide',
    desc: 'Book a viewing with a local agent who knows the building, the block, and the paperwork involved.',
  },
  {
    icon: Key,
    step: '03',
    title: 'Close & Move In',
    desc: 'We handle the contracts and coordination so you can focus on packing for your new home.',
  },
];

export default function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">The Process</p>
        <h2 className="font-display text-3xl md:text-4xl text-navy">How it works</h2>
        <div className="divider-gold w-16 mx-auto mt-4" />
      </div>

      <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
        <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mx-auto mb-6 w-16 h-16 rounded-full bg-navy text-gold flex items-center justify-center shadow-lg">
                <Icon size={26} strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold text-navy text-xs font-mono flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="font-display text-lg text-navy mb-2">{s.title}</h3>
              <p className="text-slate text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
