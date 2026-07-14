import React from 'react';
import { Link } from 'react-router-dom';
import { Gem, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-ivory/70 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 text-ivory font-display text-lg mb-3">
              <Gem size={20} className="text-gold" strokeWidth={1.5} /> Almas Estates
            </div>
            <p className="text-sm leading-relaxed">
              Verified listings, real agents, zero guesswork — across Dubai, Abu Dhabi and Sharjah.
            </p>
          </div>
          <div>
            <h4 className="text-ivory font-medium mb-3 text-sm tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/buy" className="hover:text-gold">Properties for Sale</Link></li>
              <li><Link to="/rent" className="hover:text-gold">Properties for Rent</Link></li>
              <li><Link to="/agents" className="hover:text-gold">Find an Agent</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-ivory font-medium mb-3 text-sm tracking-wide uppercase">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link to="/admin/login" className="hover:text-gold">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-ivory font-medium mb-3 text-sm tracking-wide uppercase">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><MapPin size={14} /> Jumeirah Lakes Towers, Dubai</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +971 4 123 4567</li>
              <li className="flex items-center gap-2"><Mail size={14} /> hello@almasestates.com</li>
            </ul>
          </div>
        </div>
        <div className="divider-gold my-8" />
        <p className="text-xs text-center text-ivory/40">
          © {new Date().getFullYear()} Almas Estates. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
