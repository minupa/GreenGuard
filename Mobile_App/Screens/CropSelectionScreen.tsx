import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the routes in the stack navigator
type RootStackParamList = {
  CropSelection: undefined;
  Detection: { crop: string }; // 'crop' parameter that will be passed to Detection screen
};

// Type the navigation prop with the correct types for navigation and params
type CropSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CropSelection"
>;

const CropSelectionScreen = () => {
  const navigation = useNavigation<CropSelectionScreenNavigationProp>();

  const handleCropSelect = (crop: string) => {
    navigation.navigate("Detection", { crop });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Crop</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleCropSelect("tea")}>
        <Text style={styles.buttonText}>Tea</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleCropSelect("rice")}>
        <Text style={styles.buttonText}>Rice</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleCropSelect("coconut")}>
        <Text style={styles.buttonText}>Coconut</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => handleCropSelect("cinnamon")}>
        <Text style={styles.buttonText}>Cinnamon</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CropSelectionScreen;
