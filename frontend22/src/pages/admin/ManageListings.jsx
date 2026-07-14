import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const purposeFilters = [
  { value: '', label: 'All' },
  { value: 'buy', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
];

export default function ManageListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purpose, setPurpose] = useState('');

  const load = (purposeFilter = purpose) => {
    setLoading(true);
    const params = { limit: 100 };
    if (purposeFilter) params.purpose = purposeFilter;
    api.get('/properties', { params }).then((res) => {
      setItems(res.data.items);
      setLoading(false);
    });
  };

  useEffect(() => { load(purpose); }, [purpose]);

  const onDelete = async (id) => {
    if (!confirm('Delete this listing? This cannot be undone.')) return;
    try {
      await api.delete(`/properties/${id}`);
      toast.success('Listing deleted');
      load();
    } catch (err) {
      toast.error('Could not delete listing');
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-10 bg-ivory min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl text-navy">Listings</h1>
          <Link to="/admin/listings/new" className="flex items-center gap-2 bg-navy text-gold px-5 py-3 rounded-xl hover:bg-navy-700 transition-colors">
            <Plus size={18} /> Add Listing
          </Link>
        </div>

        <div className="inline-flex bg-white border border-black/10 rounded-xl p-1 mb-6">
          {purposeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setPurpose(f.value)}
              className={`px-4 py-1.5 rounded-lg text-sm capitalize transition-colors focus-ring ${
                purpose === f.value ? 'bg-navy text-gold' : 'text-slate'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ivory text-slate uppercase text-xs">
              <tr>
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3">Purpose</th>
                <th className="text-left px-5 py-3">Price</th>
                <th className="text-left px-5 py-3">City</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-slate">Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-10 text-slate">No listings yet — add your first one.</td></tr>
              ) : items.map((p) => (
                <tr key={p._id}>
                  <td className="px-5 py-3 text-navy font-medium flex items-center gap-2">
                    {p.isFeatured && <Star size={14} className="text-gold fill-gold" />} {p.title}
                  </td>
                  <td className="px-5 py-3 capitalize text-slate">{p.purpose}</td>
                  <td className="px-5 py-3 font-mono text-slate">{new Intl.NumberFormat('en-AE').format(p.price)}</td>
                  <td className="px-5 py-3 text-slate">{p.city}</td>
                  <td className="px-5 py-3 text-slate capitalize">{p.status}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <Link to={`/admin/listings/${p._id}`} className="text-teal hover:text-navy"><Pencil size={16} /></Link>
                      <button onClick={() => onDelete(p._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
