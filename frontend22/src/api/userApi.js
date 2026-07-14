import axios from 'axios';

// Separate axios instance for site-user (buyer/renter) requests, using its
// own token so a logged-in visitor and a logged-in admin can coexist without
// clobbering each other's auth header.
const userApi = axios.create({ baseURL: '/api' });

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('almas_user_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default userApi;
