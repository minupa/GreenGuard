import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundPattern from '../components/BackgroundPattern';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarWidth = 250;
  const sidebarAnimation = useRef(new Animated.Value(-sidebarWidth)).current;

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? -sidebarWidth : 0;
    
    Animated.spring(sidebarAnimation, {
      toValue,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start(({ finished }) => {
      if (finished) {
        setIsSidebarOpen(!isSidebarOpen);
      }
    });
  };

  const handleLogout = () => {
    // Add logout logic here
    navigation.navigate('Login');
  };

  const FeatureIcon = ({ 
    iconName, 
    label, 
    onPress, 
    iconType = 'MaterialIcons' 
  }) => {
    const IconComponent = iconType === 'MaterialIcons' ? Icon : MaterialCommunityIcons;
    
    return (
      <TouchableOpacity 
        style={styles.featureIconContainer} 
        onPress={onPress}
      >
        <View style={styles.iconGradientWrapper}>
          <LinearGradient 
            colors={['#2ecc71', '#28a745', '#20bf6b']} 
            style={styles.iconGradientWrapper}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          >
            <IconComponent 
              name={iconName} 
              size={32} 
              color="#FFFFFF" 
              style={styles.centeredIcon}
            />
          </LinearGradient>
        </View>
        <Text style={styles.featureIconLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundPattern 
        numberOfElements={25}
        opacity={0.4}
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBarLeftButton} onPress={toggleSidebar}>
            <Icon name="menu" style={styles.menuIcon} />
          </TouchableOpacity>
          <View style={styles.topBarCenterContent}>
            <Icon name="home" style={styles.topBarHomeIcon} />
          </View>
        </View>

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
      </View>

      {/* Sidebar */}
      <Animated.View 
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: sidebarAnimation }],
            elevation: 5,
          }
        ]}
      >
        <View style={styles.sidebarContent}>
          <TouchableOpacity 
            style={styles.sidebarItem}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.sidebarText}>Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sidebarItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.sidebarText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.sidebarItem, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={[styles.sidebarText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 60,
  },
  topBarLeftButton: {
    padding: 8,
    width: 50,
  },
  topBarCenterContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarRightContent: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  topBarRightButton: {
    padding: 8,
  },
  topBarRightIcon: {
    fontSize: 24,
    color: '#000',
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    fontSize: 24,
    color: '#000',
  },
  featureIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
    paddingHorizontal: 20,
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
    display: 'flex',
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
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 250,
    height: '100%',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
  },
  sidebarItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  sidebarText: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'RobotoCondensed-Regular',
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#FF6B6B',
  },
  logoutText: {
    color: '#FFFFFF',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  centeredIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarHomeIcon: {
    fontSize: 28,
    color: '#2C3E50',
  },
});

export default HomeScreen;
