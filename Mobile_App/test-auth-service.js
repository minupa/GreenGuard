/**
 * Test script for auth service
 * This doesn't rely on React Native specific features
 */
const axios = require('axios');

// Base URLs
const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Token storage (simplified for Node.js testing)
let authToken = null;
let userData = null;

// Auth service (simplified version of what's in the app)
const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        // Store auth token
        authToken = response.data.token;
        userData = response.data.user;
        
        return { success: true, user: response.data.user };
      } else {
        return { success: false, message: response.data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Network error during registration'
      };
    }
  },
  
  login: async (phoneNumber, password) => {
    try {
      const response = await api.post('/auth/login', { phoneNumber, password });
      
      if (response.data.success) {
        // Store auth token
        authToken = response.data.token;
        userData = response.data.user;
        
        return { success: true, user: response.data.user };
      } else {
        return { success: false, message: response.data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error.message);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Network error during login'
      };
    }
  },
  
  getUserProfile: async () => {
    try {
      // Add token to request
      const response = await api.get('/auth/profile', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      
      if (response.data.success) {
        return { success: true, user: response.data.user };
      } else {
        return { success: false, message: response.data.message || 'Failed to get profile' };
      }
    } catch (error) {
      console.error('Get profile error:', error.message);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Network error getting profile'
      };
    }
  }
};

async function testAuthService() {
  console.log('====== TESTING AUTH SERVICE ======\n');
  
  // Generate a random phone number to avoid conflicts
  const randomNum = Math.floor(Math.random() * 100000);
  const testUser = {
    fullName: 'Screen Test User',
    age: 25,
    address: 'Screen Test Address',
    phoneNumber: `+9499${randomNum}`,
    password: 'ScreenTest123!',
    selectedCrops: ['Rice', 'Coconut']
  };
  
  console.log(`Test user phone: ${testUser.phoneNumber}`);
  console.log(`Test user password: ${testUser.password}\n`);

  try {
    // SIGNUP SCREEN TEST
    console.log('1. Testing SignupScreen functionality:');
    
    // This simulates what happens when a user submits the signup form
    console.log('   Calling register API...');
    const signupResult = await authService.register(testUser);
    
    if (signupResult.success) {
      console.log('   ✅ Signup successful!');
      console.log('   User created with ID: ' + signupResult.user.id);
      console.log('   Full name: ' + signupResult.user.fullName);
      console.log('   Phone: ' + signupResult.user.phoneNumber + '\n');
    } else {
      console.log(`   ❌ Signup failed: ${signupResult.message}\n`);
      // If signup fails, try logging in with these credentials
      // (they might already exist)
      console.log('   Trying login instead...');
      const altLoginResult = await authService.login(testUser.phoneNumber, testUser.password);
      if (altLoginResult.success) {
        console.log('   ✅ Login with existing account successful!');
      }
    }
    
    // LOGIN SCREEN TEST
    console.log('2. Testing LoginScreen functionality:');
    
    // This simulates what happens when a user submits the login form
    console.log('   Calling login API...');
    const loginResult = await authService.login(testUser.phoneNumber, testUser.password);
    
    if (loginResult.success) {
      console.log('   ✅ Login successful!');
      console.log('   User authenticated with ID: ' + loginResult.user.id);
      console.log('   Full name: ' + loginResult.user.fullName);
      console.log('   Phone: ' + loginResult.user.phoneNumber + '\n');
    } else {
      console.log(`   ❌ Login failed: ${loginResult.message}\n`);
    }
    
    // PROFILE RETRIEVAL TEST
    console.log('3. Testing profile retrieval:');
    console.log('   Calling profile API...');
    const profileResult = await authService.getUserProfile();
    
    if (profileResult.success) {
      console.log('   ✅ Profile retrieval successful!');
      console.log('   User profile with ID: ' + profileResult.user.id);
      console.log('   Full name: ' + profileResult.user.fullName);
      console.log('   Phone: ' + profileResult.user.phoneNumber + '\n');
    } else {
      console.log(`   ❌ Profile retrieval failed: ${profileResult.message}\n`);
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
  
  console.log('====== TEST COMPLETE ======');
  console.log('\nVerdict: If all checks pass, your LoginScreen and SignupScreen are correctly connected to the backend!');
}

// Run the test
testAuthService();
