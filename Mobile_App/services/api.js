import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Always use production API
const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

console.log('Using production API URL:', API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor to include the auth token on each request
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export as both named exports and default export for compatibility
export { api, API_URL };
export default api;
