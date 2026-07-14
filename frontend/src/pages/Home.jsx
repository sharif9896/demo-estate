import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import TopCommunities from '../components/TopCommunities';
import NewProjects from '../components/NewProjects';
import WhyChooseUs from '../components/WhyChooseUs';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import api from '../api/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [pageContent, setPageContent] = useState({});
  const [stats, setStats] = useState({ total: 0 });

  useEffect(() => {
    api.get('/properties?featured=true&limit=6').then((res) => setFeatured(res.data.items));
    api.get('/pages/home').then((res) => setPageContent(res.data.content || {}));
    api.get('/properties?limit=1').then((res) => setStats(res.data));
  }, []);

  return (
    <div>
      <Hero headline={pageContent.heroHeadline} subhead={pageContent.heroSubhead} />

      <section className="max-w-7xl mx-auto px-6 mt-28">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Handpicked</p>
            <h2 className="font-display text-3xl text-navy">Featured Properties</h2>
          </div>
          <Link to="/buy" className="text-teal text-sm hover:underline hidden sm:block">View all listings →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
        </div>
        {featured.length === 0 && (
          <p className="text-slate text-center py-16">No featured properties yet — check back soon.</p>
        )}
      </section>

      <section className="divider-gold max-w-7xl mx-auto mt-20" />

      <TopCommunities />

      <section className="divider-gold max-w-7xl mx-auto" />

      <NewProjects />

      <section className="divider-gold max-w-7xl mx-auto mt-8" />

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-10 text-center">
        {[
          { label: 'Verified Listings', value: `${stats.total || 0}+` },
          { label: 'Licensed Agents', value: '20+' },
          { label: 'Cities Covered', value: '3' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <p className="font-mono text-4xl text-navy mb-2">{s.value}</p>
            <div className="divider-gold w-16 mx-auto mb-2" />
            <p className="text-slate text-sm uppercase tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="divider-gold max-w-7xl mx-auto" />

      <WhyChooseUs />

      <section className="divider-gold max-w-7xl mx-auto" />

      <HowItWorks />

      <section className="bg-navy-800/[0.03] mt-8">
        <Testimonials />
      </section>

      <CTASection />
    </div>
  );
}
