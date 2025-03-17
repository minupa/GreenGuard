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

const DashboardScreen = ({ navigation }) => {
  const [totalScans, setTotalScans] = useState(0);
  const [recentScans, setRecentScans] = useState([]);
  const [userActivity, setUserActivity] = useState({
    activeUsers: 0,
    scansPerUser: 0,
    userEngagement: 0,
  });
  const [diseaseTrends, setDiseaseTrends] = useState([]);
  const [pestActivity, setPestActivity] = useState([]);
  const [communityEngagement, setCommunityEngagement] = useState([]);
  const [exportReadiness, setExportReadiness] = useState([]);
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
  useEffect(() => {
    fetchScanData();
    fetchDiseaseTrends();
    fetchPestActivity();
    fetchCommunityEngagement();
    fetchExportReadiness();
  }, []);

  const fetchScanData = async () => {
    try {
      setLoading(true);
      const response = await authService.getScanData();
      if (response.success) {
        setTotalScans(response.totalScans);
        setRecentScans(response.recentScans || []);
        setUserActivity(response.userActivity || {
          activeUsers: 0,
          scansPerUser: 0,
          userEngagement: 0,
        });
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

  const fetchDiseaseTrends = async () => {
    try {
      const response = await authService.getDiseaseTrends();
      if (response.success) {
        setDiseaseTrends(response.diseaseTrends || []);
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch disease trends');
      }
    } catch (error) {
      console.error('Error fetching disease trends:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchPestActivity = async () => {
    try {
      const response = await authService.getPestActivity();
      if (response.success) {
        setPestActivity(response.pestActivity || []);
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch pest activity');
      }
    } catch (error) {
      console.error('Error fetching pest activity:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchCommunityEngagement = async () => {
    try {
      const response = await authService.getCommunityEngagement();
      if (response.success) {
        setCommunityEngagement(response.communityEngagement || []);
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch community engagement');
      }
    } catch (error) {
      console.error('Error fetching community engagement:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const fetchExportReadiness = async () => {
    try {
      const response = await authService.getExportReadiness();
      if (response.success) {
        setExportReadiness(response.exportReadiness || []);
      } else {
        Alert.alert('Error', response.message || 'Failed to fetch export readiness');
      }
    } catch (error) {
      console.error('Error fetching export readiness:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };