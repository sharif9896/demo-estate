import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BedDouble, Bath, Ruler, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import api from '../api/api';

const formatPrice = (price, purpose, freq) => {
  const amount = new Intl.NumberFormat('en-AE').format(price);
  if (purpose === 'rent') return `AED ${amount} / ${freq === 'monthly' ? 'mo' : 'yr'}`;
  return `AED ${amount}`;
};

export default function PropertyDetail() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    api.get(`/properties/${slug}`).then((res) => setProperty(res.data));
  }, [slug]);

  if (!property) return <div className="min-h-screen flex items-center justify-center text-slate pt-24">Loading property...</div>;

  const images = property.images?.length ? property.images : [];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="rounded-2xl overflow-hidden bg-navy h-[420px] mb-4">
          {images.length > 0 ? (
            <img src={images[activeImg]} alt={property.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ivory/30 font-display">No images uploaded yet</div>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 mb-10 overflow-x-auto">
            {images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 ${activeImg === i ? 'border-gold' : 'border-transparent'}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-10 mt-6">
          <div className="md:col-span-2">
            <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">
              {property.purpose === 'rent' ? 'For Rent' : 'For Sale'} · {property.propertyType}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-navy mb-3">{property.title}</h1>
            <p className="flex items-center gap-1 text-slate mb-6"><MapPin size={16} /> {property.address}</p>

            <div className="flex gap-8 mb-8 border-y border-black/10 py-4">
              <span className="flex items-center gap-2 text-navy"><BedDouble size={18} /> {property.bedrooms || 'Studio'} Beds</span>
              <span className="flex items-center gap-2 text-navy"><Bath size={18} /> {property.bathrooms} Baths</span>
              <span className="flex items-center gap-2 text-navy"><Ruler size={18} /> {property.areaSqft} sqft</span>
            </div>

            <h2 className="font-display text-xl text-navy mb-3">Description</h2>
            <p className="text-slate leading-relaxed mb-8">{property.description}</p>

            {property.amenities?.length > 0 && (
              <>
                <h2 className="font-display text-xl text-navy mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {property.amenities.map((a) => (
                    <span key={a} className="bg-ivory border border-black/10 text-slate text-sm px-3 py-1 rounded-full">{a}</span>
                  ))}
                </div>
              </>
            )}

            <p className="text-xs text-slate">Reference: {property.reference}</p>
          </div>

          <aside className="bg-white border border-black/10 rounded-2xl p-6 h-fit sticky top-28">
            <p className="font-mono text-2xl text-gold mb-4">{formatPrice(property.price, property.purpose, property.priceFrequency)}</p>
            {property.agent && (
              <div className="mb-4">
                <p className="font-display text-lg text-navy">{property.agent.name}</p>
                <p className="text-sm text-slate mb-3">{property.agent.title}</p>
                <div className="flex flex-col gap-2 text-sm">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 text-teal hover:underline"><Phone size={15} /> {property.agent.phone}</a>
                  <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 text-teal hover:underline"><Mail size={15} /> {property.agent.email}</a>
                  {property.agent.whatsapp && (
                    <a href={`https://wa.me/${property.agent.whatsapp.replace(/[^\d]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-teal hover:underline"><MessageCircle size={15} /> WhatsApp</a>
                  )}
                </div>
              </div>
            )}
            <Link to="/contact" className="block text-center bg-navy text-gold py-3 rounded-xl mt-4 hover:bg-navy-700 transition-colors">
              Request a Viewing
            </Link>
          </aside>
        </div>
      </motion.div>
    </div>
  );
}
