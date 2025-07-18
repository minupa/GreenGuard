import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const navigation = useNavigation();

  // Reset active tab when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setActiveTab('Home');
    }, [])
  );

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
        if (name === 'Settings') {
          navigation.navigate('Settings');
        } else if (name === 'Profile') {
          navigation.navigate('UserProfile');
        } else {
          setActiveTab(name);
          onPress();
        }
      }}
    >
      <Icon 
        name={icon} 
        size={20}
        color={isActive ? '#2ecc71' : '#666'} 
      />
      <Text style={[
        styles.navLabel,
        isActive && styles.navLabelActive,
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
              Hi, Minupa
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
          <TouchableOpacity 
            style={styles.featureButton}
            onPress={() => navigation.navigate('DetectionPrompt')}
          >
            <Image 
              source={require('../assets/detection.png')} 
              style={styles.featureImage}
            />
            <Text style={styles.featureLabel}>Detection</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton}
            onPress={() => navigation.navigate('Community')}
          >
            <Image 
              source={require('../assets/social-media-management.png')} 
              style={styles.featureImage}
            />
            <Text style={styles.featureLabel}>Community</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.featureButton}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Image 
              source={require('../assets/dashboard.png')} 
              style={styles.featureImage}
            />
            <Text style={styles.featureLabel}>Dashboard</Text>
          </TouchableOpacity>
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
          onPress={() => {}}
          isActive={activeTab === 'Home'}
        />
        <NavItem
          name="Profile"
          icon="person"
          onPress={() => {}}
          isActive={activeTab === 'Profile'}
        />
        <NavItem
          name="Settings"
          icon="settings"
          onPress={() => {}}
          isActive={activeTab === 'Settings'}
        />
        <NavItem
          name="Logout"
          icon="logout"
          onPress={handleLogout}
          isActive={activeTab === 'Logout'}
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
    paddingTop: 10,
  },
  featureIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  featureButton: {
    alignItems: 'center',
    width: '30%',
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 8,
    borderRadius: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  featureImage: {
    width: 35,
    height: 35,
    borderRadius: 8,
    marginBottom: 4,
  },
  featureLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
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
    paddingVertical: 8,
    paddingHorizontal: 16,
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
    minWidth: 50,
  },
  navItemActive: {
    transform: [{ scale: 1.1 }],
  },
  navLabel: {
    fontSize: 11,
    marginTop: 2,
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
    height: 100,
    paddingHorizontal: 20,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    zIndex: 10,
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  logoImage: {
    width: 60,
    height: 60,
    tintColor: '#FFFFFF',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -30 }],
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
