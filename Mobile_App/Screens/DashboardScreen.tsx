import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackgroundPattern from '../components/BackgroundPattern';
import * as authService from '../services/authService';

//Component Definition and State
// ===================================================
const DashboardScreen = ({ navigation }) => {
  const [totalScans, setTotalScans] = useState(0);
  const [recentScans, setRecentScans] = useState([]);
  const [userActivity, setUserActivity] = useState({
    activeUsers: 0,
    scansPerUser: 0,
    userEngagement: 0,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchScanData();
  }, []);
  const fetchScanData = async () => {
    try {
      setLoading(true);
      const response = await authService.getScanData(); // Replace with your actual API call
      if (response.success) {
        setTotalScans(response.totalScans);
        setRecentScans(response.recentScans || []); // Fetch recent scans
        setUserActivity(response.userActivity || {
          activeUsers: 0,
          scansPerUser: 0,
          userEngagement: 0,
        }); // Fetch user activity
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch scan data');
      }
    } catch (error) {
      console.error('Error fetching scan data:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
