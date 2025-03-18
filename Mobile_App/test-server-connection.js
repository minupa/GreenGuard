/**
 * Test script to verify server connection and local storage fallback
 */

const axios = require('axios');

// Test the connection to the backend server
const testServerConnection = async () => {
  console.log('===== TESTING SERVER CONNECTION =====');
  
  // URL from the api.js configuration
  const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';
  
  console.log(`Testing connection to: ${API_URL}`);
  
  try {
    // Test the health endpoint
    const healthResponse = await axios.get(`${API_URL}/health`);
    
    console.log('✅ Server connection successful:');
    console.log('Status:', healthResponse.status);
    console.log('Server response:', JSON.stringify(healthResponse.data, null, 2));
    
    // Test login with test credentials
    console.log('\nTesting login with test credentials...');
    try {
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        phoneNumber: '+949962058',  // Replace with your test credentials
        password: 'testpassword123' // Replace with your test credentials
      });
      
      console.log('✅ Login successful:');
      console.log('Status:', loginResponse.status);
      console.log('Has Token:', !!loginResponse.data.token);
      console.log('Has User Data:', !!loginResponse.data.user);
    } catch (loginError) {
      console.log('❌ Login failed:');
      console.log('Status:', loginError.response?.status);
      console.log('Error:', loginError.response?.data || loginError.message);
    }
    
  } catch (error) {
    console.log('❌ Server connection failed:');
    console.log('Error:', error.message);
    console.log('Error details:', error.response?.data);
    
    console.log('\nFallback mechanism will use local storage when the app runs.');
  }
  
  console.log('\n===== TEST COMPLETE =====');
};

// Run the test
testServerConnection();
