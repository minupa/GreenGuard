import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const Stack = createStackNavigator();

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Crop Health Dashboard</Text>

      {/* Disease Trends Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Disease Trends</Text>
        <LineChart
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={300}
          height={220}
          yAxisLabel="Cases"
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Pest Identification Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Pest Identification</Text>
        <BarChart
          data={{
            labels: ['Aphids', 'Locusts', 'Beetles', 'Moths'],
            datasets: [
              {
                data: [20, 45, 28, 80],
              },
            ],
          }}
          width={300}
          height={220}
          yAxisLabel="Cases"
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#3fba26',
            backgroundGradientTo: '#5ccb48',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>

      {/* Export Readiness */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Export Readiness</Text>
        <PieChart
          data={[
            { name: 'Ready', population: 80, color: 'green' },
            { name: 'Not Ready', population: 20, color: 'red' },
          ]}
          width={300}
          height={200}
          chartConfig={{
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Navigation Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DiseaseDiagnosis')}
      >
        <Text style={styles.buttonText}>Disease Diagnosis</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CommunityPosting')}
      >
        <Text style={styles.buttonText}>Community Posting</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const DiseaseDiagnosisScreen = () => (
  <View style={styles.container}>
    <Text>Disease Diagnosis Screen</Text>
  </View>
);

const CommunityPostingScreen = () => (
  <View style={styles.container}>
    <Text>Community Posting Screen</Text>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="DiseaseDiagnosis" component={DiseaseDiagnosisScreen} />
        <Stack.Screen name="CommunityPosting" component={CommunityPostingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;