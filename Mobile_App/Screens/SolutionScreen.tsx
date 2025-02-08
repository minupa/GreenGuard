import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackgroundPattern from '../components/BackgroundPattern';

type RouteParams = {
  diseaseName: string;
  solution: string;
};

const SolutionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { diseaseName, solution } = route.params as RouteParams;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <BackgroundPattern 
          numberOfElements={25}
          opacity={0.4}
        />

        {/* Top Bar with Back Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Disease</Text>
        </View>

        {/* Disease Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Disease Information</Text>
          <Text style={styles.diseaseName}>{diseaseName}</Text>
          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>Solution:</Text>
            <Text style={styles.solutionText}>{solution}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
    zIndex: 1,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  backArrow: {
    fontSize: 20,
    color: '#000000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  card: {
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    zIndex: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  diseaseName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  solutionContainer: {
    marginTop: 20,
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  solutionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default SolutionScreen;
