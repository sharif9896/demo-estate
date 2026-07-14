import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import api from '../api/api';

export default function AgentDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/agents/${id}`).then((res) => setData(res.data));
  }, [id]);

  if (!data) return <div className="min-h-screen flex items-center justify-center text-slate pt-24">Loading...</div>;
  const { agent, listings } = data;

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
      <div className="flex flex-col sm:flex-row gap-8 items-start mb-14">
        <div className="w-28 h-28 rounded-full bg-navy flex items-center justify-center text-gold font-display text-3xl overflow-hidden shrink-0">
          {agent.photo ? <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" /> : agent.name.charAt(0)}
        </div>
        <div>
          <h1 className="font-display text-3xl text-navy mb-1">{agent.name}</h1>
          <p className="text-gold mb-3">{agent.title} · {agent.yearsExperience} yrs experience</p>
          <p className="text-slate mb-4 max-w-xl">{agent.bio}</p>
          <div className="flex gap-5 text-sm text-teal">
            <a href={`tel:${agent.phone}`} className="flex items-center gap-1 hover:underline"><Phone size={14} /> {agent.phone}</a>
            <a href={`mailto:${agent.email}`} className="flex items-center gap-1 hover:underline"><Mail size={14} /> {agent.email}</a>
            {agent.whatsapp && <a href={`https://wa.me/${agent.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline"><MessageCircle size={14} /> WhatsApp</a>}
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl text-navy mb-6">Active Listings</h2>
      {listings.length === 0 ? (
        <p className="text-slate">No active listings from this agent right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
