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
          opacity={0.8}
        />

        {/* Top Bar with Back Button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Solutions</Text>
          </View>
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
  titleContainer: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 40,
  },
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
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
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export default SolutionScreen;
