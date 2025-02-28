/**
 * Test script to verify profile update functionality with the Vercel backend
 */

const axios = require('axios');

// Production API URL (Vercel deployment)
const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

// Test credentials
const testUser = {
  phoneNumber: '+949962058',
  password: 'ScreenTest123!'
};

// Test profile update data
const updateData = {
  fullName: 'Vercel Test User',
  age: 35,
  address: 'Vercel Test Address, Sri Lanka',
  selectedCrops: ['Tea', 'Spices', 'Fruits']
};

const testVercelProfileUpdate = async () => {
  try {
    console.log('====== TESTING VERCEL BACKEND PROFILE UPDATE ======\n');
    
    // Step 1: Login to get auth token
    console.log('1. Logging in to Vercel backend...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, testUser);
    
    if (!loginResponse.data.success) {
      console.log('❌ Login failed:', loginResponse.data.message);
      return;
    }
    
    const token = loginResponse.data.token;
    const userId = loginResponse.data.user.id;
    console.log(`✅ Login successful for user ID: ${userId}`);
    
    // Step 2: Get current profile data
    console.log('\n2. Fetching current profile data from Vercel...');
    const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!profileResponse.data.success) {
      console.log('❌ Profile fetch failed:', profileResponse.data.message);
      return;
    }
    
    const currentProfile = profileResponse.data.user;
    console.log('✅ Current profile data retrieved:');
    console.log(JSON.stringify(currentProfile, null, 2));
    
    // Step 3: Update profile
    console.log('\n3. Testing PUT endpoint on Vercel backend with data:');
    console.log(JSON.stringify(updateData, null, 2));
    
    try {
      const updateResponse = await axios.put(`${API_URL}/auth/profile`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('\nServer Response:', JSON.stringify(updateResponse.data, null, 2));
      
      if (updateResponse.data.success) {
        console.log('✅ Profile update successful on Vercel backend!');
      } else {
        console.log('❌ Profile update failed:', updateResponse.data.message);
      }
    } catch (error) {
      console.log('❌ Error with PUT request to Vercel backend:');
      console.log('Status:', error.response?.status);
      console.log('Response:', error.response?.data);
      
      console.log('\nTesting if PUT endpoint exists...');
      try {
        // Try OPTIONS request to see if PUT is allowed
        const optionsResponse = await axios.options(`${API_URL}/auth/profile`);
        console.log('OPTIONS response headers:', optionsResponse.headers);
      } catch (optionsError) {
        console.log('OPTIONS request failed:', optionsError.message);
      }
    }
    
    // Step 4: Check if Vercel has these endpoints
    console.log('\n4. Checking available endpoints on Vercel backend...');
    
    const checkEndpoint = async (method, path) => {
      try {
        const response = await axios({
          method: method === 'PUT' ? 'OPTIONS' : method, // Use OPTIONS to check for PUT
          url: `${API_URL}${path}`,
          headers: {
            Authorization: method !== 'POST' ? `Bearer ${token}` : undefined
          }
        });
        console.log(`✅ ${method} ${path}: AVAILABLE (${response.status})`);
        return true;
      } catch (error) {
        console.log(`❌ ${method} ${path}: NOT AVAILABLE (${error.response?.status || 'Error'})`);
        return false;
      }
    };
    
    await checkEndpoint('POST', '/auth/login');
    await checkEndpoint('POST', '/auth/register');
    await checkEndpoint('GET', '/auth/profile');
    await checkEndpoint('PUT', '/auth/profile');
    
    console.log('\n====== TEST COMPLETE ======');
  } catch (error) {
    console.error('❌ Error during test:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
};

// Run the test
testVercelProfileUpdate();
