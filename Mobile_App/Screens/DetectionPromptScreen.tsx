import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Select Detection Type</Text>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detection')}
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

// Keep the same styles as before
const styles = StyleSheet.create({
  container: {
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
});

export default DetectionPromptScreen;