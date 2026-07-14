import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Gem } from 'lucide-react';
import { useUserAuth } from '../context/UserAuthContext';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back');
      navigate(location.state?.from || '/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-skyline-gradient flex items-center justify-center px-6 pt-24 pb-12">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={onSubmit}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm"
      >
        <div className="flex items-center gap-2 justify-center mb-6 text-navy font-display text-xl">
          <Gem size={22} className="text-gold" /> Almas Estates
        </div>
        <h1 className="text-center text-slate text-sm mb-6 uppercase tracking-wide">Sign In</h1>
        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <button disabled={loading} type="submit" className="w-full bg-navy text-gold py-3 rounded-xl hover:bg-navy-700 transition-colors disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-sm text-slate text-center mt-5">
          New to Almas Estates?{' '}
          <Link to="/signup" className="text-teal hover:underline">Create an account</Link>
        </p>
      </motion.form>
    </div>
  );
}
