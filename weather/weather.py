import requests
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import labelEncoder
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.metrics import mean_squared_error
from datetime import datetime, timedelta

API_Key='c431a7f80901e40e07836d4298f554fb' #API key
Base_URL='https://api.openweathermap.org/data/2.5/' #Base URL for make API requests

def get_current_weather(city):
    url=f"{Base_URL}waether?q={city}&appid={API_Key}&units=metric" #making the API request URL
    response=requests.get(url) #send the get request to API
    data=response.json()
    return{
        'city':data['name'],
        'current_temp':round(data['main']['temp']),
        'feels_like':round(data['main']['feels_like']),
        'temp_min':round(data['main']['temp_min']),
        'temp_max':round(data['main']['temp_max']),
        'humidity':round(data['main']['humidity']),
        'description':data['weather'][0]['description'],
        'country':data['sys']['country'],
    }

get_current_weather()