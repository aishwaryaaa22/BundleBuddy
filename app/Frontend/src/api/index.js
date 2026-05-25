import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Request mein JWT Token automatic add karne ke liye
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const joinGroup = (groupData) => API.post('/groups/join-group', groupData);