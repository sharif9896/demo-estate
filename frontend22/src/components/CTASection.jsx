import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden bg-skyline-gradient px-8 py-16 sm:py-20 text-center"
      >
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-3">Ready when you are</p>
        <h2 className="font-display text-3xl sm:text-4xl text-ivory max-w-xl mx-auto mb-4">
          Let's find your next address
        </h2>
        <p className="text-ivory/70 max-w-lg mx-auto mb-9">
          Tell us what you're looking for and one of our agents will reach out within the day.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/buy"
            className="inline-flex items-center justify-center gap-2 bg-gold text-navy px-7 py-3 rounded-full text-sm font-medium hover:bg-gold-light transition-colors focus-ring"
          >
            Browse Properties <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 border border-ivory/30 text-ivory px-7 py-3 rounded-full text-sm font-medium hover:bg-ivory/10 transition-colors focus-ring"
          >
            Talk to an Agent
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
