// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CropSelectionScreen from "./Screens/CropSelectionScreen";
import DetectionScreen from "./Screens/DetectionScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Remove the header for the CropSelection screen */}
        <Stack.Screen
          name="CropSelection"
          component={CropSelectionScreen}
          options={{ headerShown: false }} // This disables the header
        />

        {/* Keep the header for the Detection screen */}
        <Stack.Screen
          name="Detection"
          component={DetectionScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;