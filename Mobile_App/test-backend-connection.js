const axios = require('axios');

// Base URLs - make sure these match your app's config
const LOCAL_API_URL = 'http://localhost:3000/api';
const VERCEL_API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

const testLocalConnection = async () => {
  console.log('\n==== Testing Local Backend Connection ====\n');
  
  try {
    const response = await axios.get(`${LOCAL_API_URL}/test/db`);
    console.log('Local backend response:', response.data);
    console.log('✅ Local backend connection successful!');
  } catch (error) {
    console.error('❌ Error connecting to local backend:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('   Make sure your local server is running with: npm start');
    }
  }
};

const testVercelConnection = async () => {
  console.log('\n==== Testing Vercel Backend Connection ====\n');
  
  try {
    const response = await axios.get(`${VERCEL_API_URL}/test/db`);
    console.log('Vercel backend response:', response.data);
    console.log('✅ Vercel backend connection successful!');
  } catch (error) {
    console.error('❌ Error connecting to Vercel backend:', error.message);
    console.log('   Check your Vercel deployment and logs for details.');
  }
};

const testAuthentication = async () => {
  console.log('\n==== Testing Authentication Endpoints ====\n');
  
  // Use a random number to avoid conflicts with existing users
  const randomNumber = Math.floor(Math.random() * 10000);
  
  const testUser = {
    fullName: "Test Mobile User",
    age: 30,
    address: "Test Mobile Address",
    phoneNumber: `+9412345${randomNumber}`,
    password: "TestPassword123!",
    selectedCrops: ["Rice", "Tea"]
  };
  
  try {
    // 1. Test registration
    console.log('Testing registration...');
    const registerResponse = await axios.post(`${VERCEL_API_URL}/auth/register`, testUser);
    console.log('Registration successful:', registerResponse.data);
    
    // Save the token
    const token = registerResponse.data.token;
    
    // 2. Test login
    console.log('\nTesting login...');
    const loginResponse = await axios.post(`${VERCEL_API_URL}/auth/login`, {
      phoneNumber: testUser.phoneNumber,
      password: testUser.password
    });
    console.log('Login status:', loginResponse.status);
    console.log('Login successful:', JSON.stringify(loginResponse.data, null, 2));
    
    // 3. Test profile
    console.log('\nTesting profile retrieval...');
    const profileResponse = await axios.get(`${VERCEL_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Profile retrieved:', profileResponse.data);
    
    console.log('\n✅ All authentication tests passed!');
  } catch (error) {
    console.error('❌ Authentication test failed:', error.message);
    if (error.response) {
      console.log('Response data:', error.response.data);
      console.log('Response status:', error.response.status);
    }
  }
};

// Run the tests
const runTests = async () => {
  try {
    // Test local connection if needed
    // await testLocalConnection();
    
    // Test Vercel connection
    await testVercelConnection();
    
    // Test authentication
    await testAuthentication();
  } catch (error) {
    console.error('Test execution error:', error);
  }
};

runTests();
