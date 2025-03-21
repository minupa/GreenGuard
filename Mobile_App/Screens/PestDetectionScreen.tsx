import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../app';

type PestDetectionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PestDetection'
>;

type Props = {
  navigation: PestDetectionScreenNavigationProp;
};

const PestDetectionScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pest Detection Screen</Text>
      {/* Add your pest detection UI/components here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default PestDetectionScreen;