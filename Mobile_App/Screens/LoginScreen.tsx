import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundPattern from '../components/BackgroundPattern';

// Mock user data for demonstration
const MOCK_USER = {
  phoneNumber: '1234567890',
  password: 'password123'
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (phoneNumber === MOCK_USER.phoneNumber && password === MOCK_USER.password) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <BackgroundPattern opacity={0.8} />
      
      <Text style={styles.title}>Login</Text>
      
      <View style={styles.formBox}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Loading...' : 'Login'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.signupText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'RobotoCondensed-Regular',
    marginBottom: 30,
    zIndex: 1,
  },
  formBox: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    width: '90%',
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
  loginButton: {
    backgroundColor: 'rgba(191, 252, 191, 0.9)',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    fontFamily: 'RobotoCondensed-Bold',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#000000',
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export default LoginScreen; 