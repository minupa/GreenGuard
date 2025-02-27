import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} - Promise with registration result
 */
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    
    if (response.data.success) {
      // Store auth token
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      
      // Store user data
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      
      return { success: true, user: response.data.user };
    } else {
      return { success: false, message: response.data.message || 'Registration failed' };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Network error during registration'
    };
  }
};

/**
 * Login a user
 * @param {string} phoneNumber - User's phone number
 * @param {string} password - User's password
 * @returns {Promise} - Promise with login result
 */
export const login = async (phoneNumber, password) => {
  try {
    const response = await api.post('/auth/login', { phoneNumber, password });
    
    if (response.data.success) {
      // Store auth token
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
      
      // Store user data
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      
      return { success: true, user: response.data.user };
    } else {
      return { success: false, message: response.data.message || 'Login failed' };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Network error during login'
    };
  }
};

/**
 * Get the current user profile
 * @returns {Promise} - Promise with user profile
 */
export const getUserProfile = async () => {
  try {
    const response = await api.get('/auth/profile');
    
    if (response.data.success) {
      // Update stored user data
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(response.data.user));
      
      return { success: true, user: response.data.user };
    } else {
      return { success: false, message: response.data.message || 'Failed to get profile' };
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || 'Network error getting profile'
    };
  }
};

/**
 * Check if user is logged in
 * @returns {Promise<boolean>} - Promise with login status
 */
export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    return !!token;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

/**
 * Logout the current user
 * @returns {Promise} - Promise indicating logout success
 */
export const logout = async () => {
  try {
    // Remove auth token
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    
    // Remove user data
    await AsyncStorage.removeItem(USER_DATA_KEY);
    
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, message: 'Error during logout' };
  }
};

/**
 * Get the stored user data
 * @returns {Promise<Object|null>} - Promise with user data or null if not logged in
 */
export const getStoredUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting stored user data:', error);
    return null;
  }
};

export default {
  register,
  login,
  getUserProfile,
  isLoggedIn,
  logout,
  getStoredUserData
};
