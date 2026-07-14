import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Building2, Users, FileEdit, LogOut, Gem } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/listings', label: 'Listings', icon: Building2 },
  { to: '/admin/agents', label: 'Agents', icon: Users },
  { to: '/admin/pages', label: 'Site Pages', icon: FileEdit },
];

export default function AdminSidebar() {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-navy text-ivory min-h-screen fixed left-0 top-0 flex flex-col p-6">
      <div className="flex items-center gap-2 font-display text-lg mb-10">
        <Gem size={20} className="text-gold" /> Almas Admin
      </div>
      <nav className="flex-1 space-y-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive ? 'bg-gold/15 text-gold' : 'text-ivory/70 hover:bg-white/5'
              }`
            }
          >
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/10 pt-4">
        <p className="text-xs text-ivory/50 mb-2">{admin?.name} · {admin?.role}</p>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-2 text-sm text-ivory/70 hover:text-gold transition-colors"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </aside>
  );
}
