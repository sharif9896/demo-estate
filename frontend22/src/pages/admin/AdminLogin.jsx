import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Gem } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-skyline-gradient flex items-center justify-center px-6">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-6 text-navy font-display text-xl">
          <Gem size={22} className="text-gold" /> Almas Estates
        </div>
        <h1 className="text-center text-slate text-sm mb-6 uppercase tracking-wide">Admin Sign In</h1>
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
        <p className="text-xs text-slate text-center mt-4">
          Default seed login: admin@almasestates.com / Admin@123
        </p>
        <p className="text-sm text-slate text-center mt-4">
          Need an account?{' '}
          <Link to="/admin/signup" className="text-teal hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
}