import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import BackgroundPattern from '../components/BackgroundPattern';
import { Image } from "react-native";


const API_URL = "https://adithyakithmina-greenweather.hf.space";

  const WeatherApp = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherImages = {
    "Clear sky": "https://icons.iconarchive.com/icons/dtafalonso/win-10x/512/Weather-icon.png",
    "Few clouds": "https://cdn-icons-png.flaticon.com/512/4834/4834559.png",
    "Scattered clouds": "https://cdn-icons-png.flaticon.com/512/4834/4834559.png",
    "Broken clouds": "https://cdn-icons-png.flaticon.com/512/4834/4834559.png",
    "Shower rain": "https://cdn-icons-png.flaticon.com/512/4150/4150897.png",
    "Light rain": "https://icons.veryicon.com/png/o/weather/weather-7/rain-light.png",
    "Moderate rain": "https://cdn-icons-png.flaticon.com/512/4150/4150897.png",
    "Light rain and snow": "https://cdn-icons-png.flaticon.com/512/6221/6221304.png",
    "Rain": "https://cdn-icons-png.flaticon.com/512/6408/6408892.png",
    "Heavy rain": "https://cdn-icons-png.flaticon.com/512/6408/6408892.png",
    "Heavy intensity rain": "https://cdn-icons-png.flaticon.com/512/6408/6408892.png",
    "Very heavy rain": "https://cdn-icons-png.flaticon.com/512/6408/6408892.png",
    "Thunderstorm": "https://cdn-icons-png.flaticon.com/512/3104/3104612.png",
    "Snow": "https://cdn-icons-png.flaticon.com/512/6221/6221304.png",
    "Light snow": "https://cdn-icons-png.flaticon.com/512/6221/6221304.png",
    "Heavy snow": "https://cdn-icons-png.flaticon.com/512/6221/6221304.png",
    "Mist": "https://i.pinimg.com/564x/1e/c4/e8/1ec4e83f5d60afc434ac5dc8a9efcdf4.jpg",
    "Overcast clouds": "https://cdn-icons-png.flaticon.com/512/4834/4834559.png",
    "Fog": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4gBhS3bH8YfBk1662tzIaMp6BATf9bQgrDEw24xyf4EkyrDr5fuIgm_RdPQmVn8AtGCY&usqp=CAU",
    "Haze": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4gBhS3bH8YfBk1662tzIaMp6BATf9bQgrDEw24xyf4EkyrDr5fuIgm_RdPQmVn8AtGCY&usqp=CAU",
    "Smoke":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsmqfmyQciXH5lb68rWf8OPwZdbd-iWqlVNQ&s",
    "Windy":"https://www.clipartmax.com/png/middle/363-3638728_wind-icon-png-free-stock-blue-wind-icon.png",
    "Drizzle":"https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather05-512.png",
  };

  const rainimages={
    "Low possibility":"https://icons.veryicon.com/png/o/weather/weather-7/rain-light.png",
    "Moderate possibility":"https://cdn-icons-png.flaticon.com/512/4150/4150897.png",
    "High possibility":"https://cdn-icons-png.flaticon.com/512/6408/6408892.png",
  }

  const fetchWeather = useCallback(async () => {
    if (!city.trim()) {
      Toast.show({ type: "error", text1: "Error", text2: "City name cannot be empty." });
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await axios.get(`${API_URL}?city=${encodeURIComponent(city.trim())}`);
      setWeatherData(response.data);
    } catch (err) {
      setError("Could not fetch weather data.");
      Toast.show({ type: "error", text1: "Error", text2: "Could not fetch weather data." });
    } finally {
      setLoading(false);
    }
  }, [city]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
    <BackgroundPattern opacity={0.8} />
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.innerContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title1}>Weather Forecast</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter city name"
            value={city}
            onChangeText={setCity}
            editable={!loading}
            placeholderTextColor="#888"
          />
          <TouchableOpacity 
            style={[styles.button, !city.trim() && styles.buttonDisabled]} 
            onPress={fetchWeather} 
            disabled={loading || !city.trim()}
          >
          <Text style={styles.buttonText}>{loading ? "Loading..." : "Get Weather"}</Text>
          </TouchableOpacity>
          {error && <Text style={styles.error}>{error}</Text>}

          {weatherData && (
            <View style={styles.dataCard}>
              <Text style={styles.dataTitle}>{weatherData.city}</Text>
              <Text style={styles.countryTitle}>{weatherData.country}</Text>

              <View style={styles.descriptionItems}>
              <Image 
                  source={{ uri: weatherImages[weatherData.description] || "https://images.vexels.com/media/users/3/240741/isolated/preview/ff782943c053c74207e8c3f0befca27e-weather-icons-silhouette.png" }} 
                  style={styles.weatherIcon} 
                />
                <Text style={styles.descriptionItems}>{weatherData.description}</Text>
              <Text style={styles.bigTemperature}>{weatherData.current_temp}°C</Text>
              <Text style={styles.feelsLike}>Feels Like: {weatherData.feels_like}°C</Text>

              <View style={styles.tempRow}>
                <Text style={styles.minMaxTemp}>Min🔻{weatherData.temp_min}°C</Text>
                <Text style={styles.minMaxTemp}>Max🔺{weatherData.temp_max}°C</Text>
              </View>
              </View>

              <View style={styles.gridContainer}>
                <View style={styles.box}>
                  <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzUrYeV_QLEb3p-DFGYMi0tnLXRyYJKEwMA&s" }} style={styles.icon} />
                  <Text style={styles.dataText1}>Humidity</Text>
                  <Text style={styles.dataText}> {weatherData.humidity}%</Text>
                </View>
                <View style={styles.box}>
                  <Image source={{ uri: "https://www.clipartmax.com/png/middle/363-3638728_wind-icon-png-free-stock-blue-wind-icon.png" }} style={styles.icon} />
                  <Text style={styles.dataText1}>Wind Speed</Text>
                  <Text style={styles.dataText}> {weatherData.WindGustSpeed} ms⁻¹</Text>
                </View>
                <View style={styles.box}>
                  <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQELu3dKYlxTN7lwz64CwvEydIVcW8p0m5ZFg&s" }} style={styles.icon} />
                  <Text style={styles.dataText1}>Wind Direction</Text>
                  <Text style={styles.dataText}> {weatherData.wind_direction}°</Text>
                </View>
                <View style={styles.box}>
                  <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVebimDY-DYelj-0SOjL6mGPEpKP7zhruHF5lqJ_JDnRNs6kVzH59B6mGBf8zZGihDa1I&usqp=CAU" }} style={styles.icon} />
                  <Text style={styles.dataText1}>Pressure</Text>
                  <Text style={styles.dataText}> {weatherData.pressure} hPa</Text>
                </View>
              </View>
              
              <View style={styles.raincontainer}>
              <Text style={styles.dataText1}>Precipitation </Text>
              <Image 
                  source={{ uri: rainimages[weatherData.will_rain] || "https://images.vexels.com/media/users/3/240741/isolated/preview/ff782943c053c74207e8c3f0befca27e-weather-icons-silhouette.png" }} 
                  style={styles.weatherIcon} 
                />
              <Text style={styles.raintext1}> {weatherData.rain_probability}%</Text>
              <Text style={styles.raintext}> {weatherData.will_rain}</Text>
              </View>

              {weatherData.future_forecast?.times?.length ? (
                <>
                  <Text style={styles.forecastTitle}> Hourly Forecast</Text>
                  <View>
                    {weatherData.future_forecast.times.map((time, index) => (
                      <View key={index} style={styles.forecastItem}>
                        <Text style={styles.forecastTime}>{time}</Text>
                        <View style={styles.forecastBottomRow}>
                          <Text style={styles.forecastLeftText}>Temp: {weatherData.future_forecast.temperature[index]}°C</Text>
                          <Text style={styles.forecastRightText}>Humidity: {weatherData.future_forecast.humidity[index]}%</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                <Text style={styles.noForecast}>No hourly forecast available.</Text>
              )}
            </View>
          )}
          <Toast />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  scrollContainer: { flexGrow: 1, paddingVertical: 20 },
  innerContainer: { alignItems: "center", padding: 20 },
  title1: { fontSize: 20, fontWeight: "bold", color: "black", marginBottom: 15 },
  countryTitle:{fontSize:15,textAlign:"center"},
  input: { width: "90%", padding: 12, borderRadius: 20, backgroundColor: "rgba(191, 252, 191, 0.9)", fontSize: 16, marginBottom: 12, color: "#333", textAlign: "center" },
  button: { backgroundColor: "rgba(15, 192, 15, 0.74)", padding: 14, borderRadius: 20, width: "90%", alignItems: "center" },
  buttonDisabled: { backgroundColor: "rgba(191, 252, 191, 0.35)" },
  buttonText: { color: "black", fontSize: 18, fontWeight: "bold" },
  error: { color: "red", marginTop: 10, fontSize: 16 },
  dataCard: { marginTop: 20, padding: 20, backgroundColor: "rgba(17, 213, 86, 0.28)", borderRadius: 20, width: "90%" },
  dataTitle: { fontSize: 22, fontWeight: "bold", color: "black", textAlign: "center" },
  bigTemperature: { fontSize: 50, fontWeight: "bold", color: "black", textAlign: "center" },
  tempRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginVertical: 10 },
  minMaxTemp: { fontSize: 18, color: "black", marginHorizontal: 10 },
  dataText: { fontSize: 18, color: "black", marginVertical: 4 },
  dataText1: { fontSize: 18, color: "black", marginVertical: 10, textAlign: "center", fontWeight:"bold" },
  forecastItem: { padding: 12, backgroundColor: "rgba(255, 255, 255, 0.8)", marginVertical: 10, borderRadius: 20 },
  raincontainer: { padding: 12, backgroundColor: "rgba(255, 255, 255, 0.8)", marginVertical: 10, borderRadius: 20,alignItems: "center", },
  raintext: { fontSize: 15, fontWeight: "bold", color: "black", textAlign: "center" },
  raintext1: { fontSize: 20, fontWeight: "bold", color: "black", textAlign: "center" },
  descriptionItems: { 
    backgroundColor: "white", 
    marginVertical: 10, 
    borderRadius: 20, 
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "right",
    fontSize: 16, 
    fontWeight: "bold", 
    padding: 10,
  },
  noForecast: { textAlign: "center", fontSize: 16, color: "#eee", marginTop: 10 },
  forecastTitle: { fontSize: 20, fontWeight: "bold", color: "black", marginTop: 15, textAlign: "center" },
  forecastBottomRow: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 5 },
  forecastLeftText: { fontSize: 16,  color: "black" },
  forecastRightText: { fontSize: 16,  color: "black" },
  forecastTime: { fontSize: 16, fontWeight: "bold", color: "black", textAlign:"center" },
  gridContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 20 },
  box: { width: "48%", padding: 10, backgroundColor: "white", borderRadius: 10, alignItems: "center", marginBottom: 10 },
  icon: { width: 40, height: 40, marginBottom: 5 },
  feelsLike: { 
    fontSize: 14, 
    color: "black", 
    textAlign: "center", 
    fontWeight:"bold" 
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode:"contain",
  },
});

export default WeatherApp;