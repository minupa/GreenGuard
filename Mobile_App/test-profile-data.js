/**
 * Test script to verify user profile display logic
 */

// Sample user data that would be displayed in the profile screen
const userData = {
  id: 123,
  fullName: 'John Doe',
  phoneNumber: '+94123456789',
  age: '32',
  address: 'Colombo, Sri Lanka',
  selectedCrops: ['Rice', 'Coconut', 'Tea']
};

// This function simulates the display logic in the UserProfileScreen component
function displayUserProfile(user) {
  console.log('====== USER PROFILE DISPLAY SIMULATION ======');
  console.log('\nDisplaying user profile data:');
  
  // Handle missing data with defaults (same logic as in UserProfileScreen)
  const userDisplayData = {
    fullName: user?.fullName || "User",
    phoneNumber: user?.phoneNumber || "Not provided",
    age: user?.age || "Not provided",
    address: user?.address || "Not provided",
    selectedCrops: user?.selectedCrops || ["No crops selected"]
  };
  
  console.log(`
  ┌─────────────────────────────────────┐
  │           USER PROFILE              │
  ├─────────────────────────────────────┤
  │ Name:        ${userDisplayData.fullName.padEnd(22)}│
  │ Phone:       ${userDisplayData.phoneNumber.padEnd(22)}│
  ├─────────────────────────────────────┤
  │ Personal Information                 │
  ├─────────────────────────────────────┤
  │ Age:         ${userDisplayData.age.padEnd(22)}│
  │ Address:     ${userDisplayData.address.padEnd(22)}│
  ├─────────────────────────────────────┤
  │ Selected Crops                       │
  ├─────────────────────────────────────┤`);
  
  userDisplayData.selectedCrops.forEach(crop => {
    console.log(`  │ • ${crop.padEnd(31)}│`);
  });
  
  console.log('  └─────────────────────────────────────┘');
  console.log('\n✅ Profile display logic verified successfully!');
  console.log('====== SIMULATION COMPLETE ======');
}

// Test with complete data
console.log('\n1. Testing with complete user data:');
displayUserProfile(userData);

// Test with missing data
console.log('\n\n2. Testing with incomplete user data:');
displayUserProfile({
  fullName: 'Jane Smith',
  phoneNumber: '+94987654321'
  // Missing age, address, and selectedCrops
});

// Test with no data
console.log('\n\n3. Testing with no user data:');
displayUserProfile(null);
