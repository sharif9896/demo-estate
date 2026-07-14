import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('almas_admin_token');
    if (!token) { setLoading(false); return; }
    api.get('/auth/me')
      .then((res) => setAdmin(res.data))
      .catch(() => localStorage.removeItem('almas_admin_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('almas_admin_token', res.data.token);
    setAdmin(res.data.admin);
    return res.data.admin;
  };

  const signup = async (name, email, password, signupCode) => {
    const res = await api.post('/auth/signup', { name, email, password, signupCode });
    localStorage.setItem('almas_admin_token', res.data.token);
    setAdmin(res.data.admin);
    return res.data.admin;
  };

  const logout = () => {
    localStorage.removeItem('almas_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);