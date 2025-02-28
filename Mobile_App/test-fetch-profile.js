/**
 * Test script to fetch a user profile directly from the API
 * to verify all fields are being returned properly
 */

const axios = require('axios');

// Production API URL
const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

// Test credentials
const testUser = {
  phoneNumber: '+949962058',
  password: 'ScreenTest123!'
};

const fetchProfile = async () => {
  try {
    console.log('====== TESTING PROFILE RETRIEVAL ======\n');
    
    // Step 1: Login to get auth token
    console.log('1. Logging in to get auth token...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, testUser);
    
    if (!loginResponse.data.success) {
      console.log('❌ Login failed:', loginResponse.data.message);
      return;
    }
    
    const token = loginResponse.data.token;
    const userId = loginResponse.data.user.id;
    console.log(`✅ Login successful for user ID: ${userId}`);
    console.log(`✅ Token received: ${token.substring(0, 15)}...`);
    
    // Step 2: Fetch user profile using the token
    console.log('\n2. Fetching user profile...');
    const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!profileResponse.data.success) {
      console.log('❌ Profile fetch failed:', profileResponse.data.message);
      return;
    }
    
    console.log('✅ Profile fetch successful!');
    
    // Step 3: Analyze returned profile data
    console.log('\n3. Analyzing returned profile data:');
    const user = profileResponse.data.user;
    
    console.log('\nProfile Data:');
    console.log('=============');
    console.log(`ID: ${user.id}`);
    console.log(`Full Name: ${user.fullName}`);
    console.log(`Phone Number: ${user.phoneNumber}`);
    console.log(`Age: ${user.age !== undefined && user.age !== null ? user.age : 'NULL'}`);
    console.log(`Address: ${user.address || 'NULL'}`);
    console.log(`Selected Crops: ${user.selectedCrops && user.selectedCrops.length ? user.selectedCrops.join(', ') : 'NULL'}`);
    console.log(`Created At: ${user.createdAt}`);
    
    // Step 4: Check for missing fields
    console.log('\n4. Checking for missing fields:');
    const expectedFields = ['id', 'fullName', 'phoneNumber', 'age', 'address', 'selectedCrops'];
    const missingFields = [];
    
    for (const field of expectedFields) {
      if (user[field] === undefined) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      console.log(`❌ Missing fields in profile data: ${missingFields.join(', ')}`);
    } else {
      console.log('✅ All expected fields are present in the response');
    }
    
    // Step 5: Final verdict
    console.log('\n5. Final verdict:');
    if (user.age !== undefined && user.address !== undefined && user.selectedCrops !== undefined) {
      console.log('✅ SUCCESS: The backend is returning all required fields (age, address, selectedCrops)');
      console.log('If the profile screen is not showing this data, the issue is in the mobile app\'s display logic.');
    } else {
      console.log('❌ ISSUE: Some required fields are missing or null in the backend response');
      console.log('The backend API needs to be updated to include these fields.');
    }
    
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
fetchProfile();
