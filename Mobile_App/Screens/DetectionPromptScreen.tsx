import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app';

type DetectionPromptScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DetectionPrompt'
>;

type Props = {
  navigation: DetectionPromptScreenNavigationProp;
};

const DetectionPromptScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#E8F5E9', '#C8E6C9', '#A5D6A7']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Crop Health Scanner</Text>
        <Text style={styles.subtitle}>Choose Detection Method</Text>
        <View style={styles.decorationLine} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detection')}
      >
        <LinearGradient
          colors={['#81C784', '#4CAF50']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name="local-hospital" size={28} color="white" />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Disease Detection</Text>
            <Text style={styles.buttonSubtext}>Identify plant diseases</Text>
          </View>
          <Icon name="arrow-forward" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PestDetection')}
      >
        <LinearGradient
          colors={['#FFB74D', '#FFA000']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Icon name="bug-report" size={28} color="white" />
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Pest Detection</Text>
            <Text style={styles.buttonSubtext}>Detect harmful pests</Text>
          </View>
          <Icon name="arrow-forward" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.tipContainer}>
        <Icon name="lightbulb" size={24} color="#2E7D32" />
        <Text style={styles.tipText}>
          Tip: Use clear, well-lit photos for best results
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'RobotoCondensed-Bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    fontFamily: 'RobotoCondensed-Regular',
  },
  decorationLine: {
    width: 50,
    height: 4,
    backgroundColor: '#81C784',
    borderRadius: 2,
    marginTop: 15,
  },
  button: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    marginVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContent: {
    flex: 1,
    marginHorizontal: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'RobotoCondensed-Bold',
    marginBottom: 4,
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontFamily: 'RobotoCondensed-Regular',
  },
  tipContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  tipText: {
    color: '#2E7D32',
    fontSize: 14,
    marginLeft: 10,
    fontFamily: 'RobotoCondensed-Italic',
  },
});

export default DetectionPromptScreen;