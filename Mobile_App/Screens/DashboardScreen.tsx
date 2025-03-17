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

  const handleStartNewScan = () => {
    navigation.navigate('CropSelection'); // Navigate to the scan screen
  };

  const handleViewReports = () => {
    navigation.navigate('Reports'); // Navigate to the reports screen
  };

  const renderRecentScanItem = ({ item }) => (
    <View style={styles.recentScanItem}>
      <Text style={styles.recentScanText}>{item.date}</Text>
      <Text style={styles.recentScanText}>{item.type}</Text>
    </View>
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  totalScansContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalScansLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  totalScansValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  quickActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userActivityContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  userActivityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userActivityLabel: {
    fontSize: 16,
    color: '#333',
  },
  userActivityValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  recentScansContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
  },
  recentScanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  recentScanText: {
    fontSize: 16,
    color: '#333',
  },
  noScansText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default DashboardScreen;