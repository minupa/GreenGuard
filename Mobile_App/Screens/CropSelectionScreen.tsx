import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the routes in the stack navigator
type RootStackParamList = {
  CropSelection: undefined;
  Detection: { crop: string }; // 'crop' parameter that will be passed to Detection screen
};

// Type the navigation prop
type CropSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CropSelection"
>;

const CropSelectionScreen = () => {
  const navigation = useNavigation<CropSelectionScreenNavigationProp>();

  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);

  const handleCropSelect = (crop: string) => {
    setSelectedCrop(crop);
  };

  const handleSelectButton = () => {
    if (selectedCrop) {
      navigation.navigate("Detection", { crop: selectedCrop });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerTime}></Text>
      <Text style={styles.title}>Disease Detection</Text>

      {/* Selection Box */}
      <View style={styles.selectionBox}>
        <Text style={styles.selectionTitle}>Select Your Export Crop</Text>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleCropSelect("pepper")}
        >
          <View
            style={
              selectedCrop === "pepper"
                ? styles.radioIndicatorSelected
                : styles.radioIndicatorUnselected
            }
          />
          <Text
            style={
              selectedCrop === "pepper"
                ? styles.radioTextSelected
                : styles.radioText
            }
          >
            Black Pepper
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleCropSelect("cinnamon")}
        >
          <View
            style={
              selectedCrop === "cinnamon"
                ? styles.radioIndicatorSelected
                : styles.radioIndicatorUnselected
            }
          />
          <Text
            style={
              selectedCrop === "cinnamon"
                ? styles.radioTextSelected
                : styles.radioText
            }
          >
            Cinnamon
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleCropSelect("tea")}
        >
          <View
            style={
              selectedCrop === "tea"
                ? styles.radioIndicatorSelected
                : styles.radioIndicatorUnselected
            }
          />
          <Text
            style={
              selectedCrop === "tea"
                ? styles.radioTextSelected
                : styles.radioText
            }
          >
            Tea
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleCropSelect("coconut")}
        >
          <View
            style={
              selectedCrop === "coconut"
                ? styles.radioIndicatorSelected
                : styles.radioIndicatorUnselected
            }
          />
          <Text
            style={
              selectedCrop === "coconut"
                ? styles.radioTextSelected
                : styles.radioText
            }
          >
            Coconut
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleCropSelect("rice")}
        >
          <View
            style={
              selectedCrop === "rice"
                ? styles.radioIndicatorSelected
                : styles.radioIndicatorUnselected
            }
          />
          <Text
            style={
              selectedCrop === "rice"
                ? styles.radioTextSelected
                : styles.radioText
            }
          >
            Rice
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioOption}
          onPress={() => handleCropSelect("rubber")}
        >
          <View
            style={
              selectedCrop === "rubber"
                ? styles.radioIndicatorSelected
                : styles.radioIndicatorUnselected
            }
          />
          <Text
            style={
              selectedCrop === "rubber"
                ? styles.radioTextSelected
                : styles.radioText
            }
          >
            Rubber
          </Text>
        </TouchableOpacity>
      </View>

      {/* Select Button */}
      <TouchableOpacity style={styles.selectButton} onPress={handleSelectButton}>
        <Text style={styles.selectButtonText}>Select</Text>
      </TouchableOpacity>

      {/* Bottom Curve */}
      <View style={styles.bottomCurve}></View>
    </View>
  );
};

// Define styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    padding: 10,
  },
  backArrow: {
    fontSize: 18,
    color: "#000000",
  },
  headerTime: {
    position: "absolute",
    top: 40,
    right: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#001A54",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 80,
    color: "#000000",
  },
  selectionBox: {
    backgroundColor: "#E3E3E3",
    width: "90%",
    borderRadius: 10,
    marginTop: 40,
    padding: 20,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioIndicatorSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#000000",
    marginRight: 10,
  },
  radioIndicatorUnselected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#B3B3B3",
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
    color: "#6A6A6A",
  },
  radioTextSelected: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  selectButton: {
    marginTop: 30,
    width: "90%",
    backgroundColor: "#BFFCBF",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  bottomCurve: {
    position: "static",
    width: Dimensions.get("window").width,
    height: 200, // Adjusted size
    backgroundColor: "#4CAF50",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    bottom: 30,
    marginTop: 50, // Positioned closer to the "Select" button
  },
});

export default CropSelectionScreen;