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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    lineHeight: 35,
    includeFontPadding: false,
    padding: 0,
    margin: 0,
  },
});

export default DetectionPromptScreen;