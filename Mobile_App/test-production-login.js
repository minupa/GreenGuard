/**
 * Test script specifically for testing login with production API
 */
const axios = require('axios');

// Hardcode the production API URL for this test
const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

console.log('====== TESTING PRODUCTION LOGIN ======');
console.log('Using API URL:', API_URL);

// Test user credentials 
const testUsers = [
  {
    phoneNumber: "+949962058",
    password: "ScreenTest123!",
    label: "Screen Test User"
  },
  {
    phoneNumber: "+94123457233",
    password: "TestPassword123!",
    label: "Backend Test User 1"
  },
  {
    phoneNumber: "+94779873440",
    password: "Password123!",
    label: "Backend Test User 2"
  }
];

// Function to test login for a specific user
async function testLogin(user) {
  console.log(`\nTesting login for: ${user.label}`);
  console.log(`Phone: ${user.phoneNumber}`);
  console.log(`Password: ${user.password}`);
  
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      phoneNumber: user.phoneNumber,
      password: user.password
    });
    
    console.log('Status Code:', response.status);
    
    if (response.data.success) {
      console.log('✅ LOGIN SUCCESSFUL!');
      console.log('User ID:', response.data.user.id);
      console.log('Name:', response.data.user.fullName);
      console.log('Phone:', response.data.user.phoneNumber);
      console.log('Token:', response.data.token.substring(0, 20) + '...');
      return true;
    } else {
      console.log('❌ LOGIN FAILED!');
      console.log('Message:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ LOGIN ERROR!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}

// Test all users
async function runTests() {
  console.log('\nTesting all users...\n');
  
  let successCount = 0;
  
  for (const user of testUsers) {
    const success = await testLogin(user);
    if (success) successCount++;
    console.log('-'.repeat(40));
  }
  
  console.log(`\nResults: ${successCount}/${testUsers.length} logins successful`);
  
  if (successCount === 0) {
    console.log('\n⚠️ IMPORTANT: None of the test users could log in!');
    console.log('This suggests there might be an issue with your backend connection.');
  }
  
  console.log('\n====== TEST COMPLETE ======');
}

// Run the tests
runTests();
