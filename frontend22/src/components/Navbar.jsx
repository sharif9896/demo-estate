import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Gem, User, Heart, LogOut, ChevronRight } from 'lucide-react';
import { useUserAuth } from '../context/UserAuthContext';

const links = [
  { to: '/buy', label: 'Buy' },
  { to: '/rent', label: 'Rent' },
  { to: '/agents', label: 'Agents' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  // Only the home page has a dark hero at the top for the transparent navbar
  // to sit on. Every other page starts with a light background, so the
  // navbar needs a solid dark background from the start to stay readable.
  const isHome = location.pathname === '/';
  const solid = !isHome || scrolledPastHero;

  useEffect(() => {
    if (!isHome) { setScrolledPastHero(false); return; }
    const onScroll = () => setScrolledPastHero(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setOpen(false); setAccountOpen(false); }, [location.pathname]);

  const onLogout = () => {
    logout();
    setAccountOpen(false);
    navigate('/');
  };

  return (
    // IMPORTANT: this outer <header> must never carry a transform/filter/
    // backdrop-filter class. Those properties create a CSS "containing
    // block" for any position:fixed descendant, which would trap the
    // mobile drawer and its overlay inside the header's own (short) box
    // instead of letting them cover the full viewport. All the visual
    // styling (background, blur, shadow) lives on the inner div below
    // instead, so the drawer/overlay — direct children of <header> —
    // stay correctly fixed to the viewport on every page.
    <header className="fixed top-0 inset-x-0 z-50">
      <div className={`transition-all duration-300 ${solid ? 'bg-navy/95 backdrop-blur shadow-lg' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-ivory font-display text-xl tracking-wide">
          <Gem size={22} className="text-gold" strokeWidth={1.5} />
          Almas Estates
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors focus-ring ${isActive ? 'text-gold' : 'text-ivory/80 hover:text-gold'}`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <div className="relative">
            <button
              onClick={() => setAccountOpen((v) => !v)}
              className="flex items-center gap-2 text-sm px-4 py-2 border border-gold/60 text-gold rounded-full hover:bg-gold hover:text-navy transition-colors focus-ring"
            >
              <User size={15} />
              {user ? user.name.split(' ')[0] : 'Sign In'}
            </button>

            <AnimatePresence>
              {accountOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-black/5 overflow-hidden"
                >
                  {user ? (
                    <>
                      <Link to="/saved-properties" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm text-navy hover:bg-ivory transition-colors">
                        <Heart size={15} /> Saved Properties
                      </Link>
                      <button onClick={onLogout} className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-500 hover:bg-ivory transition-colors">
                        <LogOut size={15} /> Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setAccountOpen(false)} className="block px-4 py-3 text-sm text-navy hover:bg-ivory transition-colors">
                        Sign In
                      </Link>
                      <Link to="/signup" onClick={() => setAccountOpen(false)} className="block px-4 py-3 text-sm text-navy hover:bg-ivory transition-colors border-t border-black/5">
                        Create Account
                      </Link>
                      <Link to="/admin/login" onClick={() => setAccountOpen(false)} className="block px-4 py-3 text-xs text-slate hover:bg-ivory transition-colors border-t border-black/5">
                        Admin Login
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button className="md:hidden text-ivory" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={26} />
        </button>
      </nav>
      </div>

      {/* Mobile off-canvas drawer, slides in from the left. Rendered as a
          direct child of <header> (outside the blurred inner div above) so
          it always covers the full viewport, on every page. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-navy/70 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="fixed top-0 left-0 h-full w-[82%] max-w-xs bg-navy z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 text-ivory font-display text-lg">
                  <Gem size={20} className="text-gold" strokeWidth={1.5} /> Almas Estates
                </Link>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-ivory/70 hover:text-gold transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-3 text-lg font-display border-b border-white/5 ${isActive ? 'text-gold' : 'text-ivory/90'}`
                      }
                    >
                      {l.label}
                      <ChevronRight size={18} className="text-ivory/30" />
                    </NavLink>
                  </motion.div>
                ))}

                <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                  {user ? (
                    <>
                      <p className="text-ivory/50 text-xs uppercase tracking-wide">Signed in as {user.name}</p>
                      <Link to="/saved-properties" onClick={() => setOpen(false)} className="flex items-center gap-2 text-ivory/90 text-base">
                        <Heart size={16} /> Saved Properties
                      </Link>
                      <button onClick={onLogout} className="flex items-center gap-2 text-red-400 text-base text-left">
                        <LogOut size={16} /> Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setOpen(false)} className="text-gold text-base font-medium">
                        Sign In
                      </Link>
                      <Link to="/signup" onClick={() => setOpen(false)} className="text-ivory/90 text-base">
                        Create Account
                      </Link>
                    </>
                  )}
                  <div className="pt-3 mt-1 border-t border-white/10">
                    <Link to="/admin/login" onClick={() => setOpen(false)} className="text-ivory/50 text-sm">
                      Admin Login
                    </Link>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
