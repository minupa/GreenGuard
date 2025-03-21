import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
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
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Select Detection Type</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CropSelection')}
      >
        <Text style={styles.buttonText}>Disease Detection</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PestDetection')}
      >
        <Text style={styles.buttonText}>Pest Detection</Text>
      </TouchableOpacity>
    </View>
  );
};

// Keep the same styles as before  uuuuu
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 32,
    marginTop: 96,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 18,
    borderRadius: 12,
    width: '85%',
    alignItems: 'center',
    marginVertical: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 48,
    backgroundColor: '#FFFFFF',
    zIndex: 1,
    height: 96,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 32,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 32,
  },
});

export default DetectionPromptScreen;