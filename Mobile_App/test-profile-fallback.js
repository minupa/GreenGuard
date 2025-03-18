/**
 * Test script to verify the profile update fallback mechanism
 */

const authService = require('./services/authService');
const AsyncStorage = require('@react-native-async-storage/async-storage');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock API calls
jest.mock('./services/api', () => ({
  api: {
    put: jest.fn().mockRejectedValue(new Error('Network error')),
  },
}));

// Test data
const originalUserData = {
  id: 1,
  fullName: 'Original Name',
  age: 25,
  address: 'Original Address',
  phoneNumber: '+94123456789',
  selectedCrops: ['Rice', 'Coconut'],
  createdAt: new Date().toISOString()
};

const updatedUserData = {
  fullName: 'Updated Name',
  age: 30,
  address: 'Updated Address, Sri Lanka',
  selectedCrops: ['Tea', 'Rice', 'Spices']
};

// Expected result
const expectedUpdatedData = {
  ...originalUserData,
  fullName: updatedUserData.fullName,
  age: updatedUserData.age,
  address: updatedUserData.address,
  selectedCrops: updatedUserData.selectedCrops
};

// Test function
const testProfileFallback = async () => {
  console.log('====== TESTING PROFILE UPDATE FALLBACK ======\n');
  
  // Mock getting stored user data
  AsyncStorage.getItem.mockResolvedValue(JSON.stringify(originalUserData));
  
  // Test update with API failure
  console.log('1. Testing profile update with API failure:');
  
  try {
    const result = await authService.updateProfile(updatedUserData);
    
    console.log('\nUpdate result:', result);
    
    if (result.success && result.localOnly) {
      console.log('✅ PASS: Detected API failure and fell back to local storage');
    } else {
      console.log('❌ FAIL: Did not handle API failure correctly');
    }
    
    // Check if AsyncStorage.setItem was called with right data
    const setItemMockCalls = AsyncStorage.setItem.mock.calls;
    
    if (setItemMockCalls.length > 0) {
      const lastCall = setItemMockCalls[setItemMockCalls.length - 1];
      const storedData = JSON.parse(lastCall[1]);
      
      console.log('\n2. Checking if data was stored correctly:');
      console.log('Stored data:', storedData);
      
      // Check each field
      const fieldsMatch = 
        storedData.fullName === expectedUpdatedData.fullName &&
        storedData.age === expectedUpdatedData.age &&
        storedData.address === expectedUpdatedData.address;
      
      const cropsMatch = 
        JSON.stringify(storedData.selectedCrops.sort()) === 
        JSON.stringify(expectedUpdatedData.selectedCrops.sort());
      
      if (fieldsMatch && cropsMatch) {
        console.log('✅ PASS: Data was stored correctly');
      } else {
        console.log('❌ FAIL: Data was not stored correctly');
      }
    } else {
      console.log('❌ FAIL: AsyncStorage.setItem was not called');
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
  
  console.log('\n====== TEST COMPLETE ======');
};

// Run the test
testProfileFallback();
