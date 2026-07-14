import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, TrendingUp, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Listings',
    desc: 'Every property is inspected and verified before it goes live, so what you see is exactly what you get.',
  },
  {
    icon: Users,
    title: 'Expert Local Agents',
    desc: 'Our agents live in the communities they sell, giving you real insight no listing page can offer.',
  },
  {
    icon: TrendingUp,
    title: 'Transparent Pricing',
    desc: 'No hidden fees or last-minute surprises — clear numbers from your first call to closing day.',
  },
  {
    icon: HeartHandshake,
    title: 'End-to-End Support',
    desc: 'From viewings to paperwork to move-in day, we stay with you at every step of the journey.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Why Almas Estates</p>
        <h2 className="font-display text-3xl md:text-4xl text-navy">Why choose us</h2>
        <p className="text-slate mt-3">
          A decade of trusted service across the UAE's most sought-after addresses.
        </p>
        <div className="divider-gold w-16 mx-auto mt-4" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-black/5 p-7 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <span className="inline-flex w-14 h-14 rounded-full bg-gold/10 items-center justify-center text-gold mb-5 group-hover:bg-navy group-hover:text-gold transition-colors duration-300">
                <Icon size={26} strokeWidth={1.5} />
              </span>
              <h3 className="font-display text-lg text-navy mb-2">{f.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
