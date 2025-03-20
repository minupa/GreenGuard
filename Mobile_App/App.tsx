import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from './contexts/ThemeContext';
import CropSelectionScreen from "./Screens/CropSelectionScreen";
import DetectionScreen from "./Screens/DetectionScreen";
import SolutionScreen from "./Screens/SolutionScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from './Screens/HomeScreen';
import DailyRatesScreen from './Screens/DailyRatesScreen';
import UserProfileScreen from './Screens/UserProfileScreen';
import EditProfileScreen from './Screens/EditProfileScreen';
import CommunityScreen from './Screens/CommunityScreen';
import CommentsScreen from './Screens/CommentsScreen';
import CreatePostScreen from './Screens/CreatePostScreen';
import DashboardScreen from "./Screens/DashboardScreen";
import WeatherScreen from './Screens/WeatherScreen';
import SettingsScreen from './Screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="CreatePost" component={CreatePostScreen}options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MainHome" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CropSelection" component={CropSelectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Detection" component={DetectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Solution" component={SolutionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DailyRates" component={DailyRatesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Comments" component={CommentsScreen} options={{ headerShown: false }} />
          <Stack.Screen 
            name="SecondLogin" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="UserSignup" 
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="CropSelectionDetails" 
            component={CropSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DetectionResults" 
            component={DetectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="SolutionDetails" 
            component={SolutionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="DailyRatesDetails" 
            component={DailyRatesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="UserProfileEdit" 
            component={UserProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Weather" 
            component={WeatherScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;