import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PestDetectionScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#E8F5E9', '#C8E6C9', '#A5D6A7']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Select Detection Method</Text>
        <Text style={styles.subHeader}>Choose how you want to detect pests</Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Detection')}
        >
          <LinearGradient
            colors={['#4CAF50', '#81C784']}
            style={styles.cardGradient}
          >
            <Icon name="photo-camera" size={40} color="white" />
            <Text style={styles.cardTitle}>Image Scan</Text>
            <Text style={styles.cardDescription}>Upload or capture a photo for instant analysis</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Detection')}
        >
          <LinearGradient
            colors={['#FFB300', '#FFCA28']}
            style={styles.cardGradient}
          >
            <Icon name="videocam" size={40} color="white" />
            <Text style={styles.cardTitle}>Live Scan</Text>
            <Text style={styles.cardDescription}>Real-time detection using camera feed</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Icon name="info" size={24} color="#2E7D32" />
        <Text style={styles.infoText}>
          For best results:{"\n"}
          - Ensure good lighting{"\n"}
          - Focus on affected area{"\n"}
          - Capture clear images
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'RobotoCondensed-Bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#4CAF50',
    fontFamily: 'RobotoCondensed-Regular',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardGradient: {
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'RobotoCondensed-Bold',
    marginVertical: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    marginLeft: 15,
    fontFamily: 'RobotoCondensed-Italic',
    lineHeight: 22,
  },
});

export default PestDetectionScreen;