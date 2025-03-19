import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as authService from '../services/authService';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Home'); // Changed from 'home' to 'Home'
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await authService.getUserProfile();
        if (response.success) {
          setUserData(response.user);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const FeatureIcon = ({ iconName, label, onPress, iconType = 'MaterialIcons' }) => {
    const IconComponent = iconType === 'MaterialIcons' ? Icon : MaterialCommunityIcons;
    
    return (
      <TouchableOpacity style={styles.featureIconContainer} onPress={onPress}>
        <View style={[styles.iconGradientWrapper, styles.buttonContainer]}>
          <LinearGradient 
            colors={['#2ecc71', '#28a745', '#20bf6b']} 
            style={styles.iconGradientWrapper}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <IconComponent name={iconName} size={32} color="#FFFFFF" style={styles.centeredIcon} />
          </LinearGradient>
        </View>
        <Text style={styles.featureIconLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const ImageButton = ({ source, title, onPress }) => (
    <View style={styles.imageBox}>
      <Text style={[styles.imageButtonLabel, { alignSelf: 'flex-start' }]}>{title}</Text>
      <TouchableOpacity style={styles.imageButton} onPress={onPress}>
        <Image source={source} style={styles.image} />
      </TouchableOpacity>
    </View>
  );

  const NavItem = ({ name, icon, onPress, isActive }) => (
    <TouchableOpacity 
      style={[styles.navItem, isActive && styles.navItemActive]}
      onPress={() => {
        setActiveTab(name);
        onPress();
      }}
    >
      <Icon 
        name={icon} 
        size={20} // Reduced from 24
        color={isActive ? '#2ecc71' : '#666'} 
      />
      <Text style={[
        styles.navLabel,
        isActive && styles.navLabelActive
      ]}>{name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Green Header Section */}
      <LinearGradient
        colors={['#2ecc71', '#27ae60']}
        style={styles.headerSection}
      >
        <View style={styles.headerContent}>
          <View style={styles.greetingBox}>
            <Text style={styles.greeting}>
              Hi, {userData?.fullName?.split(' ')[0] || 'User'}
            </Text>
          </View>
          <Image 
            source={require('../assets/logo-light.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Feature Icons */}
        <View style={styles.featureIconRow}>
          <FeatureIcon 
            iconName="local-hospital" 
            label="Disease Detection" 
            onPress={() => navigation.navigate('CropSelection')} 
          />
          <FeatureIcon 
            iconName="group" 
            label="Community" 
            onPress={() => navigation.navigate('Community')} 
            iconType="MaterialIcons"
          />
          <FeatureIcon 
            iconName="view-dashboard" 
            label="Dashboard" 
            onPress={() => navigation.navigate('Dashboard')} 
            iconType="MaterialCommunityIcons"
          />
        </View>

        {/* Image Buttons */}
        <View style={styles.imageButtonRow}>
          <ImageButton 
            source={require('../assets/weather.jpg')} 
            title="Weather" 
            onPress={() => navigation.navigate('Weather')} 
          />
          <ImageButton 
            source={require('../assets/quality.jpg')} 
            title="Daily rates and Quality"
            onPress={() => navigation.navigate('DailyRates')}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <NavItem
          name="Home"
          icon="home"
          onPress={() => navigation.navigate('Home')}
          isActive={activeTab === 'Home'}  // Changed from 'home' to 'Home'
        />
        <NavItem
          name="Profile"
          icon="person"
          onPress={() => navigation.navigate('UserProfile')}
          isActive={activeTab === 'Profile'}
        />
        <NavItem
          name="Settings"
          icon="settings"
          onPress={() => {}}
          isActive={activeTab === 'settings'}
        />
        <NavItem
          name="Logout"
          icon="logout"
          onPress={handleLogout}
          isActive={activeTab === 'logout'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10, // Reduced top padding since we have the header
  },
  featureIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
  featureIconContainer: {
    alignItems: 'center',
    width: 100,
  },
  iconGradientWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIconLabel: {
    fontSize: 13,
    color: '#2C3E50',
    fontWeight: '600',
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
  },
  imageButtonRow: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  imageBox: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  imageButton: {
    alignItems: 'center',
    width: '100%',
    height: 140,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 24,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageButtonLabel: {
    fontSize: 16,
    color: '#2C3E50',
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'left',
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 8, // Reduced from 12
    paddingHorizontal: 16, // Reduced from 20
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
    minWidth: 50, // Reduced from 60
  },
  navItemActive: {
    transform: [{scale: 1.1}],
  },
  navLabel: {
    fontSize: 11, // Reduced from 12
    marginTop: 2, // Reduced from 4
    color: '#666',
    fontFamily: 'RobotoCondensed-Regular',
  },
  navLabelActive: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  centeredIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  headerSection: {
    width: '100%',
    height: 100, // Fixed height for consistent vertical centering
    paddingHorizontal: 20,
    elevation: 15, // Increased elevation for Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8, // Increased offset
    },
    shadowOpacity: 0.4, // Increased opacity
    shadowRadius: 10, // Increased radius
    zIndex: 10,
    justifyContent: 'center', // Ensures vertical centering
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',  // Add this
  },
  logoImage: {
    width: 60,
    height: 60,
    tintColor: '#FFFFFF',
    position: 'absolute',  // Add this
    right: 0,            // Add this
    top: '50%',          // Add this
    transform: [{translateY: -30}], // Add this to center vertically
  },
  greetingBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export default HomeScreen;
