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
  const [diseaseTrends, setDiseaseTrends] = useState([]); // New state for disease trends
  const [pestActivity, setPestActivity] = useState([]); // New state for pest activity
  const [communityEngagement, setCommunityEngagement] = useState([]); // New state for community posts
  const [exportReadiness, setExportReadiness] = useState([]); // New state for export readiness
  const [loading, setLoading] = useState(true);

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

  const renderDiseaseTrendItem = ({ item }) => (
    <View style={styles.diseaseTrendItem}>
      <Text style={styles.diseaseTrendText}>{item.disease}</Text>
      <Text style={styles.diseaseTrendText}>{item.cases} cases</Text>
    </View>
  );

  const renderPestActivityItem = ({ item }) => (
    <View style={styles.pestActivityItem}>
      <Text style={styles.pestActivityText}>{item.pest}</Text>
      <Text style={styles.pestActivityText}>{item.occurrences} occurrences</Text>
    </View>
  );

  const renderCommunityPostItem = ({ item }) => (
    <View style={styles.communityPostItem}>
      <Text style={styles.communityPostText}>{item.user}</Text>
      <Text style={styles.communityPostText}>{item.post}</Text>
    </View>
  );

  const renderExportReadinessItem = ({ item }) => (
    <View style={styles.exportReadinessItem}>
      <Text style={styles.exportReadinessText}>{item.crop}</Text>
      <Text style={styles.exportReadinessText}>{item.status}</Text>
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

        {/* Disease Trends */}
        <View style={styles.diseaseTrendsContainer}>
          <Text style={styles.sectionTitle}>Disease Trends</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : diseaseTrends.length > 0 ? (
            <FlatList
              data={diseaseTrends}
              renderItem={renderDiseaseTrendItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noDataText}>No disease trends found.</Text>
          )}
        </View>

        {/* Pest Activity */}
        <View style={styles.pestActivityContainer}>
          <Text style={styles.sectionTitle}>Pest Activity</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : pestActivity.length > 0 ? (
            <FlatList
              data={pestActivity}
              renderItem={renderPestActivityItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noDataText}>No pest activity found.</Text>
          )}
        </View>

        {/* Community Engagement */}
        <View style={styles.communityEngagementContainer}>
          <Text style={styles.sectionTitle}>Community Engagement</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : communityEngagement.length > 0 ? (
            <FlatList
              data={communityEngagement}
              renderItem={renderCommunityPostItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noDataText}>No community posts found.</Text>
          )}
        </View>

        {/* Export Readiness */}
        <View style={styles.exportReadinessContainer}>
          <Text style={styles.sectionTitle}>Export Readiness</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : exportReadiness.length > 0 ? (
            <FlatList
              data={exportReadiness}
              renderItem={renderExportReadinessItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noDataText}>No export readiness data found.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    backgroundColor: 'rgba(227, 227, 227, 0.78)',
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
    backgroundColor: 'rgba(227, 227, 227, 0.72)',
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
    marginBottom: 20,
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
  diseaseTrendsContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  diseaseTrendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  diseaseTrendText: {
    fontSize: 16,
    color: '#333',
  },
  pestActivityContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  pestActivityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  pestActivityText: {
    fontSize: 16,
    color: '#333',
  },
  communityEngagementContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  communityPostItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  communityPostText: {
    fontSize: 16,
    color: '#333',
  },
  exportReadinessContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  exportReadinessItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  exportReadinessText: {
    fontSize: 16,
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default DashboardScreen;