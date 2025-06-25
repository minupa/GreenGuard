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
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });

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

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    };

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = () => {
    if (validateForm()) {
      setLoading(true);

      setTimeout(() => {
        Alert.alert(
          'Success',
          'Account created successfully',
          [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
        );
        setLoading(false);
      }, 1000); // Simulate a fake network delay
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '');
              if (numericText.length <= 10) {
                setFormData({ ...formData, phoneNumber: numericText });
              }
            }}
            keyboardType="numeric"
          />
          {errors.phoneNumber ? (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData(prev => ({...prev, confirmPassword: text}))}
            secureTextEntry
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}

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
    paddingBottom: 50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  backButton: {
    padding: 8,
  },
  backArrow: {
    fontSize: 28,
    color: '#000000',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#000000',
    marginBottom: 20,
    fontFamily: 'RobotoCondensed-Bold',
  },
  formBox: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
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
    marginTop: 10,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default SignupScreen;
