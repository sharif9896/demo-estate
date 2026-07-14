import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Gem } from 'lucide-react';
import { useUserAuth } from '../context/UserAuthContext';

export default function UserSignup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const { signup } = useUserAuth();
  const navigate = useNavigate();

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.phone);
      toast.success('Account created — welcome!');
      navigate('/');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Signup failed');
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
        <h1 className="text-center text-slate text-sm mb-6 uppercase tracking-wide">Create Your Account</h1>

        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Full Name</label>
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Email</label>
          <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Phone (optional)</label>
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
        </div>
        <div className="mb-6">
          <label className="block text-xs uppercase tracking-wide text-slate mb-1">Password</label>
          <input required type="password" minLength={8} value={form.password} onChange={(e) => update('password', e.target.value)} className="w-full border border-black/10 rounded-lg px-3 py-2 focus-ring" />
          <p className="text-xs text-slate mt-1">At least 8 characters.</p>
        </div>

        <button disabled={loading} type="submit" className="w-full bg-navy text-gold py-3 rounded-xl hover:bg-navy-700 transition-colors disabled:opacity-60">
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="text-sm text-slate text-center mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-teal hover:underline">Sign in</Link>
        </p>
      </motion.form>
    </div>
  );
}
