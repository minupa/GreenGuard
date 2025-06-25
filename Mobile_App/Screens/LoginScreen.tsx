import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      setError('Phone number and password are required');
      return;
    }

    setError('');
    setLoading(true);

    const validPhone = '0783490343';
    const validPassword = 'minupa1234';

    // Simulate async login
    setTimeout(() => {
      if (phoneNumber === validPhone && password === validPassword) {
        navigation.replace('Home');
      } else {
        setError('Invalid phone number or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/logo-light.png')}
        style={styles.logo}
      />
      <Text style={styles.brandName}>GreenGuard</Text>
      
      <Text style={styles.title}>Login</Text>
      
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      
      <View style={styles.formBox}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => Alert.alert('Signup is disabled in this version')}
        >
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign up</Text>
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
    paddingTop: 80,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: -25,
  },
  brandName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006400',
    fontFamily: 'RobotoCondensed-Bold',
    marginBottom: 10,
    marginTop: -5,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'RobotoCondensed-Regular',
    marginBottom: 15,
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
  signupLink: {
    color: '#006400',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 15,
  },
  passwordInput: {
    marginBottom: 0,
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
