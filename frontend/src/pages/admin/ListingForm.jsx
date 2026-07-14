import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/AdminSidebar';
import PurposeToggle from '../../components/PurposeToggle';
import api from '../../api/api';

const empty = {
  title: '', purpose: 'buy', propertyType: 'Apartment', price: '', priceFrequency: 'total',
  bedrooms: 1, bathrooms: 1, areaSqft: '', city: 'Dubai', neighborhood: '', address: '',
  description: '', amenities: '', isFeatured: false, status: 'available', agent: '',
};

export default function ListingForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [agents, setAgents] = useState([]);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/agents').then((res) => setAgents(res.data));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    api.get('/properties', { params: { limit: 200 } }).then((res) => {
      const p = res.data.items.find((x) => x._id === id);
      if (p) {
        setForm({
          ...p,
          amenities: (p.amenities || []).join(', '),
          agent: p.agent?._id || p.agent || '',
        });
        setImages(p.images || []);
      }
    });
  }, [id]);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const onFileChange = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append('images', f));
    setUploading(true);
    try {
      const res = await api.post('/properties/upload/image', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setImages((prev) => [...prev, ...res.data.paths]);
      toast.success('Images uploaded');
    } catch (err) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      areaSqft: Number(form.areaSqft),
      amenities: form.amenities.split(',').map((a) => a.trim()).filter(Boolean),
      images,
      coverImage: images[0] || '',
      agent: form.agent || undefined,
    };
    try {
      if (isEdit) {
        await api.put(`/properties/${id}`, payload);
        toast.success('Listing updated');
      } else {
        await api.post('/properties', payload);
        toast.success('Listing created');
      }
      navigate('/admin/listings');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-10 bg-ivory min-h-screen">
        <h1 className="font-display text-3xl text-navy mb-8">{isEdit ? 'Edit Listing' : 'Add Listing'}</h1>

        <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-black/5 p-8 max-w-3xl space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wide text-slate mb-1">Title</label>
            <input required value={form.title} onChange={(e) => update('title', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Purpose</label>
              <PurposeToggle value={form.purpose} onChange={(v) => update('purpose', v)} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Property Type</label>
              <select value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring">
                {['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Office', 'Land', 'Studio'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Price (AED)</label>
              <input required type="number" value={form.price} onChange={(e) => update('price', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Bedrooms</label>
              <input type="number" min="0" value={form.bedrooms} onChange={(e) => update('bedrooms', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Bathrooms</label>
              <input type="number" min="0" value={form.bathrooms} onChange={(e) => update('bathrooms', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Area (sqft)</label>
              <input required type="number" value={form.areaSqft} onChange={(e) => update('areaSqft', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">City</label>
              <select value={form.city} onChange={(e) => update('city', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring">
                {['Dubai', 'Abu Dhabi', 'Sharjah'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">Neighborhood</label>
              <input required value={form.neighborhood} onChange={(e) => update('neighborhood', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-slate mb-1">Full Address</label>
            <input value={form.address} onChange={(e) => update('address', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-slate mb-1">Description</label>
            <textarea required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-slate mb-1">Amenities (comma-separated)</label>
            <input value={form.amenities} onChange={(e) => update('amenities', e.target.value)} placeholder="Swimming Pool, Gym, Balcony" className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-slate mb-1">Assign Agent</label>
            <select value={form.agent} onChange={(e) => update('agent', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring">
              <option value="">Unassigned</option>
              {agents.map((a) => <option key={a._id} value={a._id}>{a.name}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-slate mb-1">Images</label>
            <input type="file" multiple accept="image/*" onChange={onFileChange} className="w-full text-sm" />
            {uploading && <p className="text-xs text-slate mt-1">Uploading...</p>}
            {images.length > 0 && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img src={img} alt="" className="w-20 h-16 object-cover rounded-lg" />
                    <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs">×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input id="featured" type="checkbox" checked={form.isFeatured} onChange={(e) => update('isFeatured', e.target.checked)} />
            <label htmlFor="featured" className="text-sm text-slate">Mark as Featured</label>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wide text-slate mb-1">Status</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring">
              {['available', 'pending', 'sold', 'rented'].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <button disabled={saving} type="submit" className="bg-navy text-gold px-6 py-3 rounded-xl hover:bg-navy-700 transition-colors disabled:opacity-60">
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Listing'}
          </button>
        </form>
      </main>
    </div>
  );
}
