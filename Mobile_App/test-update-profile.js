/**
 * Test script to verify the update profile functionality
 */

const axios = require('axios');

// Production API URL
const API_URL = 'https://gg-mobileapp-backend.vercel.app/api';

// Test credentials
const testUser = {
  phoneNumber: '+949962058',
  password: 'ScreenTest123!'
};

// Test profile update data
const updateData = {
  fullName: 'Screen Test User Updated',
  age: 30,
  address: 'Updated Test Address, Sri Lanka',
  selectedCrops: ['Tea', 'Rice', 'Spices']
};

const testUpdateProfile = async () => {
  try {
    console.log('====== TESTING PROFILE UPDATE ======\n');
    
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
    
    // Step 2: Get current profile data
    console.log('\n2. Fetching current profile data...');
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
    console.log('\n3. Updating profile with new data:');
    console.log(JSON.stringify(updateData, null, 2));
    
    const updateResponse = await axios.put(`${API_URL}/auth/profile`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!updateResponse.data.success) {
      console.log('❌ Profile update failed:', updateResponse.data.message);
      return;
    }
    
    console.log('✅ Profile update successful!');
    
    // Step 4: Verify updated profile
    console.log('\n4. Fetching updated profile to verify changes...');
    const updatedProfileResponse = await axios.get(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!updatedProfileResponse.data.success) {
      console.log('❌ Updated profile fetch failed:', updatedProfileResponse.data.message);
      return;
    }
    
    const updatedProfile = updatedProfileResponse.data.user;
    console.log('✅ Updated profile data:');
    console.log(JSON.stringify(updatedProfile, null, 2));
    
    // Step 5: Compare and verify changes
    console.log('\n5. Verifying changes were applied correctly:');
    const verificationResults = {
      fullName: {
        expected: updateData.fullName,
        actual: updatedProfile.fullName,
        match: updateData.fullName === updatedProfile.fullName
      },
      age: {
        expected: updateData.age,
        actual: updatedProfile.age,
        match: updateData.age === updatedProfile.age
      },
      address: {
        expected: updateData.address,
        actual: updatedProfile.address,
        match: updateData.address === updatedProfile.address
      },
      selectedCrops: {
        expected: updateData.selectedCrops.sort().join(', '),
        actual: updatedProfile.selectedCrops.sort().join(', '),
        match: updateData.selectedCrops.sort().join(', ') === updatedProfile.selectedCrops.sort().join(', ')
      }
    };
    
    console.log('Verification results:');
    console.log('- Full Name: ' + (verificationResults.fullName.match ? '✅ MATCH' : '❌ MISMATCH'));
    console.log('- Age: ' + (verificationResults.age.match ? '✅ MATCH' : '❌ MISMATCH'));
    console.log('- Address: ' + (verificationResults.address.match ? '✅ MATCH' : '❌ MISMATCH'));
    console.log('- Selected Crops: ' + (verificationResults.selectedCrops.match ? '✅ MATCH' : '❌ MISMATCH'));
    
    const allMatched = Object.values(verificationResults).every(result => result.match);
    
    if (allMatched) {
      console.log('\n✅ SUCCESS: All profile updates were applied correctly!');
    } else {
      console.log('\n❌ ISSUE: Some profile updates were not applied correctly');
      console.log('Check the API implementation for potential issues.');
    }
    
    // Reset to original values
    console.log('\n6. Resetting profile to original values...');
    const resetData = {
      fullName: currentProfile.fullName,
      age: currentProfile.age,
      address: currentProfile.address,
      selectedCrops: currentProfile.selectedCrops
    };
    
    await axios.put(`${API_URL}/auth/profile`, resetData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Profile reset to original values');
    
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
testUpdateProfile();
