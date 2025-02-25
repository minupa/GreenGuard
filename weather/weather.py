import requests
import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from datetime import datetime, timedelta
import pytz
import matplotlib.pyplot as plt
from opencage.geocoder import OpenCageGeocode
import geocoder

# API Keys
OpenWeather_API_Key = 'f936f8e8a5231a6b7e6da388e54cfc1e'
OpenCage_API_Key = 'd64b7b7f7dbd48e48904d0c7743e42ae'
Base_URL = 'https://api.openweathermap.org/data/2.5/'

# Get accurate location using OpenCage (reverse geocoding implemented)
def get_current_location():
    g = geocoder.ip('me')
    lat, lng = g.latlng
    geocoder_oc = OpenCageGeocode(OpenCage_API_Key)
    result = geocoder_oc.reverse_geocode(lat, lng)
    if result:
        components = result[0]['components']
        city = components.get('city', components.get('town', components.get('village', 'N/A')))
        country = components.get('country', 'N/A')
        print(f"\n📍 Detected Country: {country}")
        return city
    else:
        print("Unable to detect location.")
        return None

# Get current weather data
def get_current_weather(city):
    url = f"{Base_URL}weather?q={city}&appid={OpenWeather_API_Key}&units=metric"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        weather_icons = {
            "clear sky": "☀️",
            "few clouds": "🌤️",
            "scattered clouds": "⛅",
            "broken clouds": "🌥️",
            "shower rain": "🌦️",
            "rain": "🌧️",
            "thunderstorm": "⛈️",
            "snow": "❄️",
            "mist": "🌫️"
        }

        description = data['weather'][0]['description']
        icon = weather_icons.get(description.lower(), "🌈")

        return {
            'city': data['name'],
            'current_temp': round(data['main']['temp']),
            'feels_like': round(data['main']['feels_like']),
            'temp_min': round(data['main']['temp_min']),
            'temp_max': round(data['main']['temp_max']),
            'humidity': round(data['main']['humidity']),
            'description': f"{description.capitalize()} {icon}",
            'country': data['sys']['country'],
            'wind_gust_dir': data['wind']['deg'],
            'pressure': data['main']['pressure'],
            'WindGustSpeed': data['wind']['speed']
        }
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        return None
    except KeyError:
        print("City not found. Please check the name and try again.")
        return None

# 📊 Data processing and model training
def read_historical_data(filename):
    df = pd.read_csv(filename)
    df = df.dropna().drop_duplicates()
    return df

def prepare_data(data):
    le = LabelEncoder()
    data['WindGustDir'] = le.fit_transform(data['WindGustDir'])
    data['RainTomorrow'] = le.fit_transform(data['RainTomorrow'])
    x = data[['MinTemp', 'MaxTemp', 'WindGustDir', 'WindGustSpeed', 'Humidity', 'Pressure', 'Temp']]
    y = data[['RainTomorrow']]
    return x, y, le

def train_rain_model(x, y):
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(x_train, y_train.values.ravel())
    y_pred = model.predict(x_test)
    print(' Mean squared error for Rain model:', mean_squared_error(y_test, y_pred))
    return model

def prepare_regression_data(data, feature):
    x, y = [], []
    for i in range(len(data)-1):
        x.append(data[feature].iloc[i])
        y.append(data[feature].iloc[i+1])
    return np.array(x).reshape(-1, 1), np.array(y)

def train_regression_model(x, y):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(x, y)
    return model

def predict_future(model, current_value):
    predictions = [current_value]
    for _ in range(5):
        next_value = model.predict(np.array([[predictions[-1]]]))
        predictions.append(next_value[0])
    return predictions[1:]

#  Visualization
def visualize_predictions(times, temps, humidities):
    fig, ax1 = plt.subplots()
    ax2 = ax1.twinx()
    ax1.plot(times, temps, 'g-', label='Temperature (°C)')
    ax2.plot(times, humidities, 'b-', label='Humidity (%)')
    ax1.set_xlabel('Time (hours)')
    ax1.set_ylabel('Temperature (°C)', color='g')
    ax2.set_ylabel('Humidity (%)', color='b')
    fig.suptitle('Future Temperature and Humidity Predictions')
    plt.show()

#  Main weather view function
def weather_view():
    while True:

        city = get_current_location()
        if city is None:
            city = input('Enter any city name: ').strip()
            if not city:
                print("City name cannot be empty.")
                return

        current_weather = get_current_weather(city)
        if current_weather is None:
            return

        base_path = os.path.dirname(os.path.abspath(__file__))
        csv_path = os.path.join(base_path, 'weather.csv')

        historical_data = read_historical_data(csv_path)
        x, y, le = prepare_data(historical_data)
        rain_model = train_rain_model(x, y)

        wind_deg=current_weather['wind_gust_dir']%360
        compass_points=[
            ("N",0,11.25),("NNE",11.25, 33.75), ("NE", 33.75, 56.25),("ENE", 56.25, 78.75),
            ("E", 78.75, 101.25), ("ESE", 101.25, 123.75), ("SE", 123.75, 146.25), ("SSE",146.25, 168.75),
            ("S", 168.75, 191.25), ("SSW", 191.25, 213.75), ("SW", 213.75, 236.25), ("WSW", 236.25, 258.75),
            ("W", 258.75, 281.25), ("WNW", 281.25, 303.75), ("NW", 303.75, 326.25), ("NNW", 326.25, 348.75)
        ]

        compass_direction=next(point for point, start, end in compass_points if start<= wind_deg<end)

        compass_direction_encoded=le.transform([compass_direction])[0] if compass_direction in le.classes_ else -1



        current_df = pd.DataFrame([{
            'MinTemp': current_weather['temp_min'],
            'MaxTemp': current_weather['temp_max'],
            'WindGustDir': compass_direction_encoded,
            'WindGustSpeed': current_weather['WindGustSpeed'],
            'Humidity': current_weather['humidity'],
            'Pressure': current_weather['pressure'],
            'Temp': current_weather['current_temp'],
        }])

        rain_prediction = rain_model.predict(current_df)[0]
        x_temp, y_temp = prepare_regression_data(historical_data, 'Temp')
        x_hum, y_hum = prepare_regression_data(historical_data, 'Humidity')
        temp_model, hum_model = train_regression_model(x_temp, y_temp), train_regression_model(x_hum, y_hum)

        future_temp = predict_future(temp_model, current_weather['temp_min'])
        future_humidity = predict_future(hum_model, current_weather['humidity'])

        timezone = pytz.timezone('Asia/Colombo')
        now = datetime.now(timezone)
        next_hour = now + timedelta(hours=1)
        next_hour = next_hour.replace(minute=0, second=0, microsecond=0)
        future_times = [(next_hour + timedelta(hours=i)).strftime("%H:00") for i in range(5)]

        print("\n==============================")
        print(f"Data retrieved at: {now.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"Location: {current_weather['city']}, {current_weather['country']}")
        print(f"Current Temperature: {current_weather['current_temp']} °C")
        print(f"Feels Like: {current_weather['feels_like']} °C")
        print(f"Min Temperature: {current_weather['temp_min']} °C")
        print(f"Max Temperature: {current_weather['temp_max']} °C")
        print(f"Humidity: {current_weather['humidity']} %")
        print(f"Weather Description: {current_weather['description']}")
        print(f"Wind Speed: {current_weather['WindGustSpeed']} m/s")
        print(f"Wind Direction: {compass_direction} {current_weather['wind_gust_dir']}°")
        print(f"Pressure: {current_weather['pressure']} hPa")
        print("==============================\n")

        print('\n Future Temperature Predictions:')
        for time, temp in zip(future_times, future_temp):
            print(f"{time}: {round(temp, 1)} °C")

        print("\n Future Humidity Predictions:")
        for time, humidity in zip(future_times, future_humidity):
            print(f"{time}: {round(humidity, 1)} %")

        show_chart = input("Do you want to see the weather prediction chart? (yes/no): ").strip().lower()

        if show_chart == 'yes':
            visualize_predictions(future_times, future_temp, future_humidity)
        else:
            print("Skipping visualization. Continuing with the program...")


        another_city = input("Do you want to check another city's weather? (yes/no): ").strip().lower()
        if another_city != 'yes':
            print("Exiting weather search. Stay safe!")
            break

        city = input("Enter another city name: ").strip()


if __name__ == "__main__":
    weather_view()