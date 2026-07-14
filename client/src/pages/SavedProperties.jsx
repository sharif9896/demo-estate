import React, { useEffect, useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import userApi from '../api/userApi';

export default function SavedProperties() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    userApi.get('/users/saved').then((res) => setItems(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      <p className="text-gold text-xs uppercase tracking-[0.2em] mb-2">Your Shortlist</p>
      <h1 className="font-display text-4xl text-navy mb-10">Saved Properties</h1>

      {items === null ? (
        <p className="text-slate">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-slate">You haven't saved any properties yet — tap the heart icon on any listing to save it here.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => <PropertyCard key={p._id} property={p} index={i} />)}
        </div>
      )}
    </div>
  );
}
