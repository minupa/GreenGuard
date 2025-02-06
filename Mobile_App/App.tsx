// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CropSelectionScreen from "./Screens/CropSelectionScreen";
import DetectionScreen from "./Screens/DetectionScreen";
import SolutionScreen from "./Screens/SolutionScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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