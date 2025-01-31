// App.tsx
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CropSelectionScreen from "./Screens/CropSelectionScreen";
import DetectionScreen from "./Screens/DetectionScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CropSelection" component={CropSelectionScreen} options={{ title: "Select Crop" }} />
        <Stack.Screen name="Detection" component={DetectionScreen} options={{ title: "Disease Detection" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
