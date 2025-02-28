import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as authService from '../services/authService';

// Custom MultiSelect component for crops
const MultiSelect = ({ items, selectedItems, onSelectionChange }) => {
  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      onSelectionChange(selectedItems.filter(i => i !== item));
    } else {
      onSelectionChange([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.multiSelectContainer}>
      {items.map((item) => (
        <TouchableOpacity
          key={item}
          style={[
            styles.cropItem,
            selectedItems.includes(item) && styles.selectedCropItem
          ]}
          onPress={() => toggleItem(item)}
        >
          <Text style={selectedItems.includes(item) ? styles.selectedCropText : styles.cropText}>
            {item}
          </Text>
          {selectedItems.includes(item) && (
            <MaterialCommunityIcons name="check" size={16} color="#fff" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userData = route.params?.userData || {};

  const [fullName, setFullName] = useState(userData.fullName || '');
  const [age, setAge] = useState(userData.age ? String(userData.age) : '');
  const [address, setAddress] = useState(userData.address || '');
  const [selectedCrops, setSelectedCrops] = useState(userData.selectedCrops || []);
  const [isLoading, setIsLoading] = useState(false);

  // Crop options - same as in signup screen
  const cropOptions = [
    'Rice', 'Tea', 'Rubber', 'Coconut', 'Spices',
    'Vegetables', 'Fruits', 'Coffee', 'Black Pepper', 'Cinnamon'
  ];

  // Save profile changes
  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    
    if (age && isNaN(parseInt(age))) {
      Alert.alert('Error', 'Age must be a number');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Create updated user data
      const updatedUserData = {
        fullName: fullName.trim(),
        age: age ? parseInt(age) : null,
        address: address.trim(),
        selectedCrops
      };
      
      console.log('Updating profile with data:', updatedUserData);
      
      // Call the backend API to update the profile
      const result = await authService.updateProfile(updatedUserData);
      
      if (result.success) {
        let message = 'Profile updated successfully';
        
        // If local only update, show a different message
        if (result.localOnly) {
          message = 'Profile updated locally only. Changes will be synced with the server when connection is available.';
        }
        
        Alert.alert(
          'Success',
          message,
          [{ text: 'OK', onPress: () => navigation.navigate('Profile', { refresh: true }) }]
        );
      } else {
        Alert.alert('Error', result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An unexpected error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} /> {/* Empty view for spacing */}
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
          multiline
        />

        <Text style={styles.label}>Select Crops</Text>
        <Text style={styles.subLabel}>
          Choose the crops you cultivate
        </Text>
        <MultiSelect
          items={cropOptions}
          selectedItems={selectedCrops}
          onSelectionChange={setSelectedCrops}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  multiSelectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  cropItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCropItem: {
    backgroundColor: '#4c669f',
  },
  cropText: {
    color: '#333',
  },
  selectedCropText: {
    color: '#fff',
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: '#4c669f',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
