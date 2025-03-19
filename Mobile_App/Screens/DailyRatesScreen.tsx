import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

type CropRate = {
  id: string;
  name: string;
  price: number;
  unit: string;
  lastUpdated: string;
};

type CropInfo = {
  id: string;
  name: string;
  image: any;
  description: string;
};

const cropInformation: CropInfo[] = [
  {
    id: '1',
    name: 'Rice',
    image: require('../assets/rice.jpg'),  
    description: 'Export-quality rice is characterized by long, uniform grains that are free from cracks, discoloration, or foreign materials, with minimal broken grains (usually under 5%). Premium varieties like Basmati or Jasmine should maintain their distinct aroma and flavor. The moisture content should be between 12-14% to ensure optimal quality and prevent spoilage. Rice must be pure, free from stones, dirt, and pests, and should not be contaminated with other grains. It is packaged in durable, high-quality bags to protect the rice during transport. Additionally, export rice must meet international health and safety standards, ensuring it is free from harmful pesticides and contaminants.'},
  {
    id: '2',
    name: 'Tea',
    image: require('../assets/tea.jpg'),
    description: 'Export-quality tea is characterized by its fresh, consistent appearance with uniform leaf size and shape. The leaves should be free from dust, stems, and other foreign matter, with minimal broken leaves. Premium tea varieties, such as Darjeeling, Assam, or Ceylon, should have a distinct aroma and flavor profile specific to the region. The moisture content should be around 3-5% to maintain freshness and prevent mold or spoilage during transport. The tea should be free from contaminants like pesticides and should comply with international food safety standards. It is usually packaged in airtight, durable containers to preserve quality and prevent damage during shipping. Overall, export tea should reflect the best characteristics of its origin, with high purity and optimal taste.'},
  {
    id: '3',
    name: 'Rubber',
    image: require('../assets/rubber.jpg'),
    description: 'Export-quality rubber is characterized by its purity, uniformity, and consistency in terms of color, texture, and properties. It should be free from contaminants such as dirt, stones, and foreign materials. The rubber must be in the form of well-processed, clean sheets or bales, with minimal defects like holes or cracks. The quality should be measured by its high elasticity, durability, and strength, ensuring it meets the standards of various industrial applications. The moisture content should be controlled to prevent deterioration during transport and storage. Export rubber should also meet international standards for quality and safety, including compliance with environmental regulations and being free from harmful chemicals. It is typically packaged securely to prevent damage, ensuring it arrives at its destination in optimal condition.'},
  {
    id: '4',
    name: 'Coconut',
    image: require('../assets/coconut.jpg'),
    description: 'Export-quality coconut is characterized by its freshness, size, and appearance. The coconuts should have a clean, intact outer husk, free from cracks or damage, and the shell should be firm and not overly dried. The inner water content (in fresh coconuts) or the quality of the meat (in mature coconuts) should be optimal, with no signs of spoilage, mold, or contamination. The coconut meat should be white, firm, and free from dark spots or discoloration. The nuts must be properly cleaned and prepared for export, ensuring they are free from dirt, pests, or other foreign matter. Additionally, export coconuts must comply with international health and safety standards, including being free from harmful pesticides. They are typically packaged in durable, breathable materials to prevent damage and preserve freshness during transport. Overall, export-quality coconuts should reflect the best characteristics of the variety and origin, with high-quality meat, good moisture content, and secure packaging.'},
  {
    id: '5',
    name: 'Cinnamon',
    image: require('../assets/cinnamon.jpg'),
    description: 'Export-quality cinnamon is characterized by its rich, aromatic fragrance, which should be strong and natural, reflecting the true essence of the spice. The cinnamon should be in the form of tightly rolled quills or sticks, with a smooth texture and a consistent, light-brown color. It should be free from cracks, mold, or any signs of moisture, ensuring the spice is dry and properly cured. The cinnamon should be pure, with minimal broken pieces or dust, and free from contaminants like dirt, foreign particles, or pests. It should also meet international food safety standards, ensuring it is free from harmful chemicals, pesticides, or contaminants. The packaging for export cinnamon is typically airtight and moisture-proof, protecting it from damage and preserving its flavor and quality during transit. Export-quality cinnamon should reflect the best characteristics of the variety and origin, offering a potent, flavorful, and safe spice for international markets.'},
  {
    id: '6',
    name: 'Pepper',
    image: require('../assets/pepper.jpg'),
    description: 'Export-quality black pepper is characterized by its uniform size, shape, and color, with mature, fully dried berries that are free from any green or immature seeds. The peppercorns should be round, firm, and have a smooth texture, free from cracks, mold, or any signs of moisture. The spice should have a strong, pungent aroma and a sharp, characteristic flavor without any off odors, indicating proper curing and storage. Black pepper must be free from contaminants like dirt, stones, or foreign materials, and the number of broken peppercorns should be minimal. It should also comply with international food safety standards, ensuring it is free from harmful pesticides or chemicals. Typically, export-quality black pepper is packaged in airtight, durable containers to protect the pepper from moisture, air, and damage during transport. The packaging ensures that the pepper retains its flavor and freshness until it reaches the international market.'},
];

const DailyRatesScreen = ({ navigation }) => {
  const [rates, setRates] = useState<CropRate[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchRates = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get('https://67b83103699a8a7baef3061a.mockapi.io/rates');
      setRates(response.data);

      if (response.data.length > 0) {
        const latestUpdate = response.data[0].lastUpdated;
        const formattedDate = moment.utc(latestUpdate).format('DD MMM YYYY hh:mm A');
        setLastUpdated(formattedDate);
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

      <ScrollView
        style={styles.mainContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchRates}
          />
        }
      >
        {/* Rates Section */}
        <View style={styles.ratesSection}>
          <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}

          {rates.map((item) => (
            <View key={item.id} style={styles.rateItem}>
              <Text style={styles.cropName}>{item.name}</Text>
              <Text style={styles.price}>Rs. {item.price}/{item.unit}</Text>
            </View>
          ))}
        </View>

        {/* Crop Information Section */}
        <View style={styles.cropInfoSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.sectionTitle}>Crop Quality Guide</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cropCardsContainer}
          >
            {cropInformation.map((crop) => (
              <View key={crop.id} style={styles.cropCard}>
                <Image 
                  source={crop.image} 
                  style={styles.cropImage} 
                  resizeMode="cover"
                />
                <Text style={styles.cropCardTitle}>{crop.name}</Text>
                <Text style={styles.cropDescription}>{crop.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',  // Light gray background for better contrast
  },
  mainContainer: {
    flex: 1,
  },
  ratesSection: {
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
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
    fontSize: 28,
    fontWeight: '800',
    color: '#2C5530', // Dark green color
    fontFamily: 'RobotoCondensed-Bold',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  listContainer: {
    paddingBottom: 20,
  },
  lastUpdated: {
    fontSize: 16,
    color: '#4A5568',
    fontFamily: 'RobotoCondensed-Regular',
    marginBottom: 10,
    marginTop: 10,
  },
  rateItem: {
    backgroundColor: '#e8f5e9', // Light green color
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  cropInfoSection: {
    marginTop: 20,
    paddingVertical: 20,
    width: '100%',
    paddingBottom: 40,
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginBottom: 15,
    fontFamily: 'RobotoCondensed-Bold',
    textAlign: 'center',
  },
  cropCardsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  cropCard: {
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    marginBottom: 10,
    shadowColor: '#1a365d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  cropImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cropCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
    fontFamily: 'RobotoCondensed-Bold',
  },
  cropDescription: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    fontFamily: 'RobotoCondensed-Regular',
  },
});

export default DailyRatesScreen;