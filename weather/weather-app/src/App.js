import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { 
  Search, Loader2, CloudRain, Thermometer, 
  Droplets, Wind, Compass, Gauge, AlertCircle,
  ArrowDown, ArrowUp, Clock, MapPin
} from "lucide-react";


const Index = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async (cityName = "") => {
    const url = cityName ? `http://localhost:3000/weather/${cityName}` : "http://localhost:3000/weather";

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setWeatherData(null);
        toast({ title: "Error", description: data.error, variant: "destructive" });
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (err) {
      setError("Error fetching weather data.");
      toast({ title: "Error", description: "Error fetching weather data.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  return (
    <div className="app-container">
      <div className="header fade-in">
        <div className="logo-container">
          <CloudRain className="logo" size={36} color="#00e600" />
          <h1>Weather App</h1>
        </div>
        <p>Get accurate weather forecasts for any location</p>
      </div>

      <div className="search-container fade-in">
        <form onSubmit={handleSubmit}>
          <div className="search-input">
            <span>{loading ? <Loader2 className="pulse" size={20} /> : <Search size={20} />}</span>
            <input type="text" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} disabled={loading} />
            <button type="submit" className="search-button" disabled={loading || !city.trim()}>Search</button>
          </div>
        </form>
      </div>

      <div className="content-container">
        {loading ? (
          <div className="loading slide-up">
            <Loader2 className="loading-icon pulse" size={48} />
            <p>Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="error slide-up">
            <AlertCircle size={32} />
            <h3>Unable to fetch weather data</h3>
            <p>{error}</p>
            <button onClick={() => fetchWeather()}>Try Again</button>
          </div>
        ) : weatherData ? (
          <div className="weather-card slide-up">
            <div className="weather-header">
              <div>
                <div className="location">
                  <MapPin size={20} />
                  <h2>{weatherData.city}, {weatherData.country}</h2>
                </div>
                <p className="description">{weatherData.description}</p>
              </div>
            </div>
            <div className="main-info">
              <div className="temperature-section">
                <div className="icon-text">
                  <Thermometer size={24} />
                  <div>
                    <div className="temperature-display">{weatherData.current_temp}°C</div>
                    <p className="temperature-feels">Feels like {weatherData.feels_like}°C</p>
                  </div>
                </div>
                <div className="min-max">
                  <div className="icon-text">
                    <ArrowDown size={20} color="#88ccff" />
                    <div>
                      <p>Min</p>
                      <p className="temp-value">{weatherData.temp_min}°C</p>
                    </div>
                  </div>
                  <div className="icon-text">
                    <ArrowUp size={20} color="#ff8888" />
                    <div>
                      <p>Max</p>
                      <p className="temp-value">{weatherData.temp_max}°C</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid-container">
                <div className="grid-item"><Droplets size={24} /><p>Humidity</p><p className="value">{weatherData.humidity}%</p></div>
                <div className="grid-item"><Wind size={24} /><p>Wind</p><p className="value">{weatherData.WindGustSpeed} m/s</p></div>
                <div className="grid-item"><Compass size={24} /><p>Direction</p><p className="value">{weatherData.wind_direction} ({weatherData.wind_gust_dir}°)</p></div>
                <div className="grid-item"><Gauge size={24} /><p>Pressure</p><p className="value">{weatherData.pressure} hPa</p></div>
              </div>
              <div className="rain-info">
                <h3><CloudRain size={28} /> Rain Information</h3>
                <p className="rain-probability">Rain Probability: <strong>{weatherData.rain_probability}%</strong></p>
                <p className="rain-status">{weatherData.will_rain}</p>
                </div>

              <div className="forecast-container slide-up">
                <h3 className="forecast-title"><Clock size={20} /><span>Hourly Forecast</span></h3>
                <div className="grid-container">
                  {weatherData.future_forecast.times.map((time, index) => (
                    <div key={index} className="forecast-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="forecast-header">
                        <span className="time">{time}</span>
                        <div className="humidity"><Droplets size={16} /><span>{weatherData.future_forecast.humidity[index]}%</span></div>
                      </div>
                      <div className="forecast-temp"><Thermometer size={20} /><span className="temperature">{weatherData.future_forecast.temperature[index]}°C</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Index;