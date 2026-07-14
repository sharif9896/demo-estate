import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/api';

export default function About() {
  const [content, setContent] = useState({});

  useEffect(() => {
    api.get('/pages/about').then((res) => setContent(res.data.content || {}));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Our Story</p>
        <h1 className="font-display text-4xl text-navy mb-8">About Almas Estates</h1>
        <p className="text-slate text-lg leading-relaxed whitespace-pre-line">
          {content.body || 'Content coming soon.'}
        </p>

        <div className="divider-gold my-12" />

        <div className="grid sm:grid-cols-3 gap-8 text-center">
          {[
            { label: 'Founded', value: '2019' },
            { label: 'Cities', value: '3' },
            { label: 'Team Members', value: '20+' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-mono text-3xl text-navy">{s.value}</p>
              <p className="text-slate text-sm uppercase tracking-wide mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
