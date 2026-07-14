import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import api from '../api/api';

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.get('/agents').then((res) => setAgents(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Our Team</p>
      <h1 className="font-display text-4xl text-navy mb-10">Meet Our Agents</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((a, i) => (
          <motion.div
            key={a._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.06, duration: 0.5 }}
            className="bg-white rounded-2xl border border-black/5 p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div className="w-20 h-20 rounded-full bg-navy mx-auto mb-4 flex items-center justify-center text-gold font-display text-2xl overflow-hidden">
              {a.photo ? <img src={a.photo} alt={a.name} className="w-full h-full object-cover" /> : a.name.charAt(0)}
            </div>
            <h3 className="font-display text-lg text-navy">{a.name}</h3>
            <p className="text-slate text-sm mb-3">{a.title}</p>
            <div className="flex justify-center gap-4 text-teal text-sm mb-4">
              <a href={`tel:${a.phone}`} className="flex items-center gap-1 hover:underline"><Phone size={14} /></a>
              <a href={`mailto:${a.email}`} className="flex items-center gap-1 hover:underline"><Mail size={14} /></a>
            </div>
            <Link to={`/agents/${a._id}`} className="text-sm text-navy border border-navy/20 rounded-full px-4 py-2 hover:bg-navy hover:text-gold transition-colors inline-block">
              View Profile
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
