import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundPattern from '../components/BackgroundPattern';

type CropRate = {
  id: string;
  name: string;
  price: number;
  unit: string;
  lastUpdated: string;
};

const DailyRatesScreen = ({ navigation }) => {
  const [rates, setRates] = useState<CropRate[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchRates = async () => {
    try {
      const response = await axios.get('https://67b83103699a8a7baef3061a.mockapi.io/rates');
      setRates(response.data);
  
      if (response.data.length > 0) {
        const latestUpdate = response.data[0].lastUpdated; // Get the lastUpdated from the first item
        console.log('Raw lastUpdated:', latestUpdate);  // Log the raw value to debug
  
        // Keep the time in UTC and format it
        const formattedDate = moment.utc(latestUpdate).format('DD MMM YYYY hh:mm A');
        console.log('Formatted lastUpdated (UTC):', formattedDate); // Log the formatted date
        setLastUpdated(formattedDate); // Set formatted date
      }
    } catch (error) {
      console.error('Error fetching rates:', error.response ? error.response.data : error.message);
      setError('Failed to load rates. Check server connection');
    } finally {
      setRefreshing(false);
    }
  };
  
   

  useEffect(() => {
    fetchRates();     
  }, []);

  return (
    <View style={styles.container}>
      <BackgroundPattern opacity={0.8} />
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Today's Crop Rates</Text>
      </View>

      <FlatList
        data={rates}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchRates}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.rateItem}>
            <Text style={styles.cropName}>{item.name}</Text>
            <Text style={styles.price}>Rs. {item.price}/{item.unit}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    zIndex: 1,
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
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
  title: {
    fontSize: 27,
    fontWeight: '800',
    color: '#000',
    fontFamily: 'RobotoCondensed-Regular',
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 16,
    color: '#4A5568',
    fontFamily: 'RobotoCondensed-Regular',
    marginBottom: 10,
  },
  rateItem: {
    backgroundColor: 'rgba(227, 227, 227, 0.9)',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  cropName: {
    fontSize: 16,
    fontFamily: 'RobotoCondensed-Bold',
    color: '#000000',
  },
  price: {
    fontSize: 16,
    fontFamily: 'RobotoCondensed-Regular',
    color: '#000000',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 16,
    fontFamily: 'RobotoCondensed-Regular',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default DailyRatesScreen;
