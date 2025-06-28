import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfileScreen = ({ navigation, route }) => {
  const defaultData = {
    fullName: 'Minupa',
    phoneNumber: '0783490343',
    age: '20',
    address: 'not provided',
    selectedCrops: ['Coconut', 'Tea'],
  };

  const userDisplayData = route.params?.updatedUserData || defaultData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {userDisplayData.fullName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.userName}>{userDisplayData.fullName}</Text>
        <Text style={styles.userPhone}>{userDisplayData.phoneNumber}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.item}>Age: {userDisplayData.age}</Text>
          <Text style={styles.item}>Address: {userDisplayData.address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Crops</Text>
          {userDisplayData.selectedCrops.map((crop, index) => (
            <View key={index} style={styles.cropItem}>
              <MaterialCommunityIcons
                name="leaf"
                size={18}
                color="#22c55e"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cropText}>{crop}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditProfile', { userData: userDisplayData })
          }
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#111827',
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
  },
  cropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f4ea',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  cropText: {
    fontSize: 16,
    color: '#166534',
  },
  editButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
