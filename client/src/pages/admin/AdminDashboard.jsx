import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/stats').then((res) => setStats(res.data));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-10 bg-ivory min-h-screen">
        <h1 className="font-display text-3xl text-navy mb-8">Dashboard</h1>

        {!stats ? (
          <p className="text-slate">Loading stats...</p>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
              {[
                { label: 'Total Listings', value: stats.totalListings },
                { label: 'For Sale', value: stats.forSale },
                { label: 'For Rent', value: stats.forRent },
                { label: 'Agents', value: stats.totalAgents },
                { label: 'Featured', value: stats.featured },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl border border-black/5 p-5">
                  <p className="font-mono text-3xl text-navy">{s.value}</p>
                  <p className="text-slate text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-6 mb-8">
              <h2 className="font-display text-lg text-navy mb-4">Most Viewed Properties</h2>
              <ul className="divide-y divide-black/5">
                {stats.mostViewed.map((p) => (
                  <li key={p._id} className="py-3 flex justify-between text-sm">
                    <Link to={`/property/${p.slug}`} target="_blank" className="text-teal hover:underline">{p.title}</Link>
                    <span className="text-slate">{p.views} views</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Link to="/admin/listings" className="bg-navy text-gold px-5 py-3 rounded-xl hover:bg-navy-700 transition-colors">
                Manage Listings
              </Link>
              <Link to="/admin/agents" className="bg-white border border-navy/20 text-navy px-5 py-3 rounded-xl hover:bg-navy hover:text-gold transition-colors">
                Manage Agents
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
