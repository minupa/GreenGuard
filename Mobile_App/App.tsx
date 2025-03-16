// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CropSelectionScreen from "./Screens/CropSelectionScreen";
import DetectionScreen from "./Screens/DetectionScreen";
import SolutionScreen from "./Screens/SolutionScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from './Screens/HomeScreen';
import DailyRatesScreen from './Screens/DailyRatesScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
<<<<<<< Updated upstream
=======
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
        

>>>>>>> Stashed changes
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CropSelection" 
          component={CropSelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Detection" 
          component={DetectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Solution" 
          component={SolutionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="DailyRates" 
          component={DailyRatesScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;