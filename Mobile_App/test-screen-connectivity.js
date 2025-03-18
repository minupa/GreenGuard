/**
 * This test script simulates the behavior of the login and signup screens
 * to verify their connectivity to the backend
 */

const { api } = require('./services/api');
const authService = require('./services/authService').default;

async function testScreenConnectivity() {
  console.log('====== TESTING SCREEN CONNECTIVITY ======\n');
  
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
    
    // This is what happens when a user submits the signup form
    console.log('   Calling register API...');
    const signupResult = await authService.register(testUser);
    
    if (signupResult.success) {
      console.log('   ✅ Signup successful!');
      console.log(`   User created: ${JSON.stringify(signupResult.user)}\n`);
    } else {
      console.log(`   ❌ Signup failed: ${signupResult.message}\n`);
    }
    
    // LOGIN SCREEN TEST
    console.log('2. Testing LoginScreen functionality:');
    
    // This is what happens when a user submits the login form
    console.log('   Calling login API...');
    const loginResult = await authService.login(testUser.phoneNumber, testUser.password);
    
    if (loginResult.success) {
      console.log('   ✅ Login successful!');
      console.log(`   User authenticated: ${JSON.stringify(loginResult.user)}\n`);
    } else {
      console.log(`   ❌ Login failed: ${loginResult.message}\n`);
    }
    
    // PROFILE RETRIEVAL TEST
    console.log('3. Testing profile retrieval:');
    console.log('   Calling profile API...');
    const profileResult = await authService.getUserProfile();
    
    if (profileResult.success) {
      console.log('   ✅ Profile retrieval successful!');
      console.log(`   User profile: ${JSON.stringify(profileResult.user, null, 2)}\n`);
    } else {
      console.log(`   ❌ Profile retrieval failed: ${profileResult.message}\n`);
    }
    
  } catch (error) {
    console.error('Test error:', error);
  }
  
  console.log('====== TEST COMPLETE ======');
}

// Run the test
testScreenConnectivity();
