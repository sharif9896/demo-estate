import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminSidebar from '../../components/AdminSidebar';
import api from '../../api/api';

const pageDefs = [
  { key: 'home', label: 'Home Page', fields: [
    { name: 'heroHeadline', label: 'Hero Headline' },
    { name: 'heroSubhead', label: 'Hero Subheading', textarea: true },
  ]},
  { key: 'about', label: 'About Page', fields: [
    { name: 'body', label: 'About Body Text', textarea: true },
  ]},
  { key: 'contact', label: 'Contact Page', fields: [
    { name: 'address', label: 'Office Address' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'email', label: 'Contact Email' },
  ]},
];

export default function ManagePages() {
  const [active, setActive] = useState('home');
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get(`/pages/${active}`).then((res) => setContent(res.data.content || {}));
  }, [active]);

  const onSave = async () => {
    setSaving(true);
    try {
      await api.put(`/pages/${active}`, { content });
      toast.success('Page content updated');
    } catch (err) {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const def = pageDefs.find((p) => p.key === active);

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-10 bg-ivory min-h-screen">
        <h1 className="font-display text-3xl text-navy mb-8">Site Pages</h1>

        <div className="flex gap-2 mb-6">
          {pageDefs.map((p) => (
            <button
              key={p.key}
              onClick={() => setActive(p.key)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${active === p.key ? 'bg-navy text-gold' : 'bg-white border border-black/10 text-slate'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-black/5 p-8 max-w-2xl space-y-5">
          {def.fields.map((f) => (
            <div key={f.name}>
              <label className="block text-xs uppercase tracking-wide text-slate mb-1">{f.label}</label>
              {f.textarea ? (
                <textarea
                  rows={5}
                  value={content[f.name] || ''}
                  onChange={(e) => setContent({ ...content, [f.name]: e.target.value })}
                  className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring"
                />
              ) : (
                <input
                  value={content[f.name] || ''}
                  onChange={(e) => setContent({ ...content, [f.name]: e.target.value })}
                  className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring"
                />
              )}
            </div>
          ))}
          <button onClick={onSave} disabled={saving} className="bg-navy text-gold px-6 py-3 rounded-xl hover:bg-navy-700 transition-colors disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Page Content'}
          </button>
        </div>
      </main>
    </div>
  );
}
