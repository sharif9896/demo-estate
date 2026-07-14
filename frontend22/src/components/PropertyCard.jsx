import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BedDouble, Bath, Ruler, MapPin, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUserAuth } from '../context/UserAuthContext';
import userApi from '../api/userApi';

const formatPrice = (price, purpose, freq) => {
  const amount = new Intl.NumberFormat('en-AE').format(price);
  if (purpose === 'rent') return `AED ${amount} / ${freq === 'monthly' ? 'mo' : 'yr'}`;
  return `AED ${amount}`;
};

export default function PropertyCard({ property, index = 0 }) {
  const { user } = useUserAuth();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user && Array.isArray(user.savedProperties)) {
      setSaved(user.savedProperties.some((id) => id === property._id || id?._id === property._id));
    }
  }, [user, property._id]);

  const toggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast('Sign in to save properties', { icon: '🔒' });
      return;
    }
    setBusy(true);
    try {
      const res = await userApi.post(`/users/saved/${property._id}`);
      setSaved(res.data.saved);
      toast.success(res.data.saved ? 'Saved to your shortlist' : 'Removed from shortlist');
    } catch (err) {
      toast.error('Could not update saved properties');
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
    >
      <Link
        to={`/property/${property.slug}`}
        className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-black/5"
      >
        <div className="relative h-52 overflow-hidden bg-slate/10">
          {property.coverImage ? (
            <img
              src={property.coverImage}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy to-navy-700 text-ivory/30 font-display text-sm">
              No image yet
            </div>
          )}
          <span className="absolute top-3 left-3 bg-navy/90 text-gold text-xs px-3 py-1 rounded-full tracking-wide uppercase">
            {property.purpose === 'rent' ? 'For Rent' : 'For Sale'}
          </span>
          {property.isFeatured && (
            <span className="absolute top-3 right-12 bg-gold text-navy text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
          <button
            onClick={toggleSave}
            disabled={busy}
            aria-label={saved ? 'Remove from saved properties' : 'Save property'}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors focus-ring"
          >
            <Heart size={16} className={saved ? 'fill-red-500 text-red-500' : 'text-navy'} />
          </button>
        </div>

        <div className="p-5">
          <p className="font-mono text-gold text-lg mb-1">
            {formatPrice(property.price, property.purpose, property.priceFrequency)}
          </p>
          <h3 className="font-display text-lg text-navy leading-snug mb-2 group-hover:text-teal transition-colors">
            {property.title}
          </h3>
          <p className="flex items-center gap-1 text-slate text-sm mb-3">
            <MapPin size={14} /> {property.neighborhood}, {property.city}
          </p>
          <div className="flex items-center gap-4 text-sm text-slate border-t border-black/5 pt-3">
            <span className="flex items-center gap-1"><BedDouble size={15} /> {property.bedrooms || 'Studio'}</span>
            <span className="flex items-center gap-1"><Bath size={15} /> {property.bathrooms}</span>
            <span className="flex items-center gap-1"><Ruler size={15} /> {property.areaSqft} sqft</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
