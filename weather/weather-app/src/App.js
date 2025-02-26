//UI
import React, { useState, useEffect } from "react";

function App() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWeather(); // Fetch automatic location weather on page load
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
            } else {
                setWeatherData(data);
                setError(null);
            }
        } catch (err) {
            setError("Error fetching weather data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center", margin: "20px" }}>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: "5px", marginRight: "10px" }}
            />
            <button onClick={() => fetchWeather(city)} style={{ padding: "5px 10px" }}>
                Search
            </button>

            <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", display: "inline-block", textAlign: "left" }}>
                {loading ? (
                    <p>Loading weather data...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : weatherData ? (
                    <div>
                        <h2>Weather in {weatherData.city}, {weatherData.country}</h2>
                        <p><strong>Temperature:</strong> {weatherData.current_temp}°C (Feels like {weatherData.feels_like}°C)</p>
                        <p><strong>Min/Max Temp:</strong> {weatherData.temp_min}°C / {weatherData.temp_max}°C</p>
                        <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
                        <p><strong>Condition:</strong> {weatherData.description}</p>
                        <p><strong>Wind Speed:</strong> {weatherData.WindGustSpeed} m/s</p>
                        <p><strong>Wind Direction:</strong> {weatherData.wind_direction} ({weatherData.wind_gust_dir}°)</p>
                        <p><strong>Pressure:</strong> {weatherData.pressure} hPa</p>
                        <p><strong>Rain Probability:</strong> {weatherData.rain_probability}%</p>
                        <p><strong>Will it rain?</strong> {weatherData.will_rain}</p>

                        <h3>Future Forecast</h3>
                        <ul>
                            {weatherData.future_forecast.times.map((time, index) => (
                                <li key={index}>
                                    <strong>{time}:</strong> {weatherData.future_forecast.temperature[index]}°C, Humidity: {weatherData.future_forecast.humidity[index]}%
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;
