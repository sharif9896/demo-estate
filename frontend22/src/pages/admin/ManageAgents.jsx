import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const empty = { name: '', title: 'Property Consultant', email: '', phone: '', whatsapp: '', bio: '', languages: '', yearsExperience: 1 };

export default function ManageAgents() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/agents').then((res) => { setAgents(res.data); setLoading(false); });
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(empty); setEditingId(null); setShowForm(true); };
  const openEdit = (a) => {
    setForm({ ...a, languages: (a.languages || []).join(', ') });
    setEditingId(a._id);
    setShowForm(true);
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this agent?')) return;
    try {
      await api.delete(`/agents/${id}`);
      toast.success('Agent deleted');
      load();
    } catch {
      toast.error('Could not delete agent');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, languages: form.languages.split(',').map((l) => l.trim()).filter(Boolean), yearsExperience: Number(form.yearsExperience) };
    try {
      if (editingId) {
        await api.put(`/agents/${editingId}`, payload);
        toast.success('Agent updated');
      } else {
        await api.post('/agents', payload);
        toast.success('Agent added');
      }
      setShowForm(false);
      load();
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-navy">Agents</h1>
          <button onClick={openNew} className="flex items-center gap-2 bg-navy text-gold px-5 py-3 rounded-xl hover:bg-navy-700 transition-colors">
            <Plus size={18} /> Add Agent
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ivory text-slate uppercase text-xs">
              <tr>
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Phone</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10 text-slate">Loading...</td></tr>
              ) : agents.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-10 text-slate">No agents yet.</td></tr>
              ) : agents.map((a) => (
                <tr key={a._id}>
                  <td className="px-5 py-3 text-navy font-medium">{a.name}</td>
                  <td className="px-5 py-3 text-slate">{a.title}</td>
                  <td className="px-5 py-3 text-slate">{a.email}</td>
                  <td className="px-5 py-3 text-slate">{a.phone}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openEdit(a)} className="text-teal hover:text-navy"><Pencil size={16} /></button>
                      <button onClick={() => onDelete(a._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-navy/60 flex items-center justify-center z-50 px-6">
            <form onSubmit={onSubmit} className="bg-white rounded-2xl p-8 w-full max-w-lg space-y-4 relative max-h-[90vh] overflow-y-auto">
              <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-slate hover:text-navy"><X size={20} /></button>
              <h2 className="font-display text-xl text-navy mb-2">{editingId ? 'Edit Agent' : 'Add Agent'}</h2>
              <div>
                <label className="block text-xs uppercase tracking-wide text-slate mb-1">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-slate mb-1">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-slate mb-1">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-slate mb-1">Phone</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-slate mb-1">WhatsApp</label>
                <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-slate mb-1">Bio</label>
                <textarea rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wide text-slate mb-1">Languages (comma-separated)</label>
                  <input value={form.languages} onChange={(e) => setForm({ ...form, languages: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wide text-slate mb-1">Years Experience</label>
                  <input type="number" min="0" value={form.yearsExperience} onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
                </div>
              </div>
              <button disabled={saving} type="submit" className="w-full bg-navy text-gold py-3 rounded-xl hover:bg-navy-700 transition-colors disabled:opacity-60">
                {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Agent'}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
