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
<<<<<<< Updated upstream
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
=======
  Navigation Handlers
  // ===================================================
  const handleStartNewScan = () => {
    navigation.navigate('CropSelection'); // Navigate to the scan screen
  };

  const handleViewReports = () => {
    navigation.navigate('Reports'); // Navigate to the reports screen
  };

  // SECTION 6: Render Function for Recent Scans
  // ===================================================
  const renderRecentScanItem = ({ item }) => (
    <View style={styles.recentScanItem}>
      <Text style={styles.recentScanText}>{item.date}</Text>
      <Text style={styles.recentScanText}>{item.type}</Text>
    </View>
  );

  // SECTION 7: JSX Structure
  // ===================================================
  return (
    <View style={styles.container}>
      <BackgroundPattern opacity={0.8} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Dashboard</Text>
        </View>

        {/* Total Scans */}
        <View style={styles.totalScansContainer}>
          <Text style={styles.totalScansLabel}>Total Scans</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text style={styles.totalScansValue}>{totalScans}</Text>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={handleStartNewScan}
          >
            <Text style={styles.quickActionText}>Start New Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickActionButton}
            onPress={handleViewReports}
          >
            <Text style={styles.quickActionText}>View Reports</Text>
          </TouchableOpacity>
        </View>

        {/* User Activity */}
        <View style={styles.userActivityContainer}>
          <Text style={styles.sectionTitle}>User Activity</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <>
              <View style={styles.userActivityItem}>
                <Text style={styles.userActivityLabel}>Active Users</Text>
                <Text style={styles.userActivityValue}>
                  {userActivity.activeUsers}
                </Text>
              </View>
              <View style={styles.userActivityItem}>
                <Text style={styles.userActivityLabel}>Scans Per User</Text>
                <Text style={styles.userActivityValue}>
                  {userActivity.scansPerUser}
                </Text>
              </View>
              <View style={styles.userActivityItem}>
                <Text style={styles.userActivityLabel}>User Engagement</Text>
                <Text style={styles.userActivityValue}>
                  {userActivity.userEngagement}%
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Recent Scans */}
        <View style={styles.recentScansContainer}>
          <Text style={styles.sectionTitle}>Recent Scans</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : recentScans.length > 0 ? (
            <FlatList
              data={recentScans}
              renderItem={renderRecentScanItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noScansText}>No recent scans found.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
>>>>>>> Stashed changes
