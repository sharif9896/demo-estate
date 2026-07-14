import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/api';

export default function Contact() {
  const [content, setContent] = useState({});
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    api.get('/pages/contact').then((res) => setContent(res.data.content || {}));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent — a consultant will reach out shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 grid md:grid-cols-2 gap-14">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Get in Touch</p>
        <h1 className="font-display text-4xl text-navy mb-6">Contact Us</h1>
        <ul className="space-y-4 text-slate">
          <li className="flex items-center gap-3"><MapPin size={18} className="text-teal" /> {content.address || 'Dubai, UAE'}</li>
          <li className="flex items-center gap-3"><Phone size={18} className="text-teal" /> {content.phone || '+971 4 123 4567'}</li>
          <li className="flex items-center gap-3"><Mail size={18} className="text-teal" /> {content.email || 'hello@almasestates.com'}</li>
        </ul>
      </motion.div>

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white border border-black/10 rounded-2xl p-6 space-y-4"
      >
        <div>
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Name</label>
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Email</label>
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Message</label>
          <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <button type="submit" className="w-full bg-navy text-gold py-3 rounded-xl hover:bg-navy-700 transition-colors">
          Send Message
        </button>
      </motion.form>
    </div>
  );
}
