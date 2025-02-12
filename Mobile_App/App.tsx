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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;