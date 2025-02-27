import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundPattern from '../components/BackgroundPattern';
import authService from '../services/authService';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    address: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const crops = [
    'Black Pepper',
    'Cinnamon',
    'Tea',
    'Coconut',
    'Rice',
    'Rubber'
  ];

  const toggleCropSelection = (crop: string) => {
    setSelectedCrops(prev => 
      prev.includes(crop)
        ? prev.filter(c => c !== crop)
        : [...prev, crop]
    );
  };

  const handleSignup = async () => {
    // Validation
    if (Object.values(formData).some(value => !value)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (selectedCrops.length === 0) {
      Alert.alert('Error', 'Please select at least one crop');
      return;
    }

    setLoading(true);

    try {
      // Call the register API with the format expected by the backend
      const userData = {
        fullName: formData.fullName,
        age: parseInt(formData.age),
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        selectedCrops
      };
      
      const result = await authService.register(userData);
      
      if (result.success) {
        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        Alert.alert('Error', result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <BackgroundPattern opacity={0.8} />

        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Sign Up</Text>

        <View style={styles.formBox}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(text) => setFormData(prev => ({...prev, fullName: text}))}
          />

          <TextInput
            style={styles.input}
            placeholder="Age"
            value={formData.age}
            onChangeText={(text) => setFormData(prev => ({...prev, age: text}))}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => setFormData(prev => ({...prev, address: text}))}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData(prev => ({...prev, phoneNumber: text}))}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData(prev => ({...prev, password: text}))}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData(prev => ({...prev, confirmPassword: text}))}
            secureTextEntry
          />

          <Text style={styles.cropTitle}>Select Your Export Crops</Text>
          
          {crops.map((crop) => (
            <TouchableOpacity
              key={crop}
              style={styles.radioOption}
              onPress={() => toggleCropSelection(crop)}
            >
              <View
                style={
                  selectedCrops.includes(crop)
                    ? styles.radioIndicatorSelected
                    : styles.radioIndicatorUnselected
                }
              />
              <Text
                style={
                  selectedCrops.includes(crop)
                    ? styles.radioTextSelected
                    : styles.radioText
                }
              >
                {crop}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <Text style={styles.signupButtonText}>Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backArrow: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 35,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'RobotoCondensed-Regular',
    marginBottom: 30,
    textAlign: 'center',
  },
  formBox: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'RobotoCondensed-Regular',
  },
  cropTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'RobotoCondensed-Bold',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioIndicatorSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000000',
    marginRight: 10,
  },
  radioIndicatorUnselected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#B3B3B3',
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
    color: '#6A6A6A',
    fontFamily: 'RobotoCondensed-Regular',
  },
  radioTextSelected: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'RobotoCondensed-Bold',
  },
  signupButton: {
    backgroundColor: 'rgba(191, 252, 191, 0.9)',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'RobotoCondensed-Bold',
  },
});

export default SignupScreen;