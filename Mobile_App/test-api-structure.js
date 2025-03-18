/**
 * Test script to check API structure and endpoints
 */

const axios = require('axios');

// API URL used in the app
const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

// Test access token (will be needed for authenticated requests)
let authToken = '';

// Test credentials
const testUser = {
  phoneNumber: '+949962058',
  password: 'ScreenTest123!'
};

const testApiStructure = async () => {
  try {
    console.log('===== TESTING API STRUCTURE =====\n');
    
    // 1. Try accessing root endpoint
    console.log('1. Testing base API URL...');
    try {
      const rootResponse = await axios.get('https://gg-mobileapp-backend.vercel.app/');
      console.log(`✅ Base URL works (Status: ${rootResponse.status})`);
      console.log('Response:', rootResponse.data);
    } catch (error) {
      console.log(`❌ Base URL failed: ${error.message}`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log('Response:', error.response.data);
      }
    }
    
    // 2. Check API base endpoint
    console.log('\n2. Testing API base endpoint...');
    try {
      const apiResponse = await axios.get(API_URL);
      console.log(`✅ API endpoint works (Status: ${apiResponse.status})`);
      console.log('Response:', apiResponse.data);
    } catch (error) {
      console.log(`❌ API endpoint failed: ${error.message}`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log('Response:', error.response.data);
      }
    }
    
    // 3. Login to get auth token
    console.log('\n3. Testing login endpoint...');
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, testUser);
      console.log(`✅ Login endpoint works (Status: ${loginResponse.status})`);
      
      if (loginResponse.data.success) {
        console.log('Login successful, received token');
        authToken = loginResponse.data.token;
      } else {
        console.log('Login response did not contain success=true');
        console.log('Response:', loginResponse.data);
      }
    } catch (error) {
      console.log(`❌ Login endpoint failed: ${error.message}`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log('Response:', error.response.data);
      }
    }
    
    if (!authToken) {
      console.log('\n⚠️ No auth token received, can\'t test protected endpoints');
      return;
    }
    
    // 4. Test GET profile endpoint
    console.log('\n4. Testing GET profile endpoint...');
    try {
      const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log(`✅ GET profile endpoint works (Status: ${profileResponse.status})`);
      console.log('Response:', profileResponse.data);
    } catch (error) {
      console.log(`❌ GET profile endpoint failed: ${error.message}`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log('Response:', error.response.data);
      }
    }
    
    // 5. Test PUT profile endpoint - which is having issues
    console.log('\n5. Testing PUT profile endpoint...');
    const updateData = {
      fullName: 'API Test User',
      age: 32,
      address: 'API Test Address, Sri Lanka',
      selectedCrops: ['Tea', 'Rice']
    };
    
    // 5.1 Try standard format
    try {
      const updateResponse = await axios.put(`${API_URL}/auth/profile`, updateData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log(`✅ PUT profile endpoint works (Status: ${updateResponse.status})`);
      console.log('Response:', updateResponse.data);
    } catch (error) {
      console.log(`❌ PUT profile standard format failed: ${error.message}`);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log('Response:', error.response.data);
      }
      
      // 5.2 Try alternative formats if the standard one fails
      console.log('\n5.2 Trying alternative API formats...');
      
      const alternativeUrls = [
        `${API_URL}/auth/profile/update`,
        `${API_URL}/auth/update-profile`,
        `${API_URL}/profile`,
        `https://gg-mobileapp-backend.vercel.app/api/auth/profile`,
        `https://gg-mobileapp-backend.vercel.app/auth/profile`
      ];
      
      for (const url of alternativeUrls) {
        try {
          console.log(`Testing: ${url}`);
          const altResponse = await axios.put(url, updateData, {
            headers: { Authorization: `Bearer ${authToken}` }
          });
          console.log(`✅ Alternative endpoint works: ${url}`);
          console.log(`Status: ${altResponse.status}`);
          console.log('Response:', altResponse.data);
          break;
        } catch (error) {
          console.log(`❌ Failed: ${error.message}`);
          if (error.response) {
            console.log(`Status: ${error.response.status}`);
          }
        }
      }
    }
    
    console.log('\n===== API STRUCTURE TEST COMPLETE =====');
  } catch (error) {
    console.error('❌ Error during test:', error.message);
  }
};

// Run the test
testApiStructure();
