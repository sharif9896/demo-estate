import React, { createContext, useContext, useState, useEffect } from 'react';
import userApi from '../api/userApi';

const UserAuthContext = createContext(null);

export const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('almas_user_token');
    if (!token) { setLoading(false); return; }
    userApi.get('/users/me')
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('almas_user_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const res = await userApi.post('/users/login', { email, password });
    localStorage.setItem('almas_user_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const signup = async (name, email, password, phone) => {
    const res = await userApi.post('/users/signup', { name, email, password, phone });
    localStorage.setItem('almas_user_token', res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('almas_user_token');
    setUser(null);
  };

  return (
    <UserAuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const useUserAuth = () => useContext(UserAuthContext);
