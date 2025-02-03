import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Video } from "react-native-video"; // For video preview
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const DetectionScreen = ({ route }: any) => {
  const { crop } = route.params; // Get crop parameter from route params
  const navigation = useNavigation(); // Access the navigation object

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<string | null>(null);

  // URLs based on crop selection
  const URLS = {
    tea: "https://us-central1-tea-disease-classification.cloudfunctions.net/predict",
    rice: "https://us-central1-red-abstraction-446513-u9.cloudfunctions.net/predict",
    coconut:
      "https://us-central1-crack-glider-449515-f7.cloudfunctions.net/predict",
    cinnamon:
      "https://us-central1-crack-glider-449515-f7.cloudfunctions.net/predict2",
    pepper:
      "https://us-central1-tea-disease-classification.cloudfunctions.net/predict2",
  };

  const PREDICTION_URL =
    crop === "tea"
      ? URLS.tea
      : crop === "coconut"
      ? URLS.coconut
      : crop === "cinnamon"
      ? URLS.cinnamon
      : crop === "pepper"
      ? URLS.pepper
      : URLS.rice;

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
    const storagePermission = await request(
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );

    if (
      cameraPermission !== RESULTS.GRANTED ||
      storagePermission !== RESULTS.GRANTED
    ) {
      Alert.alert(
        "Permissions Required",
        "Camera and storage permissions are required for the app to function properly."
      );
    }
  };

  const handleUpload = async (file: any) => {
    if (!file) {
      Alert.alert("Error", "No file selected or captured");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    });

    try {
      setLoading(true);
      const response = await axios.post(PREDICTION_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      setPrediction(data.class);
      setConfidence(data.confidence);
    } catch (error) {
      console.error("Error predicting disease:", error);
      Alert.alert(
        "Prediction Error",
        "Failed to get predictions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (mediaType: "photo" | "video") => {
    const options = { mediaType };
    const result = await launchImageLibrary(options);
    if (result.assets && result.assets.length > 0) {
      setSelectedFile(result.assets[0]);
      setPrediction(null);
      setConfidence(null);
    }
  };

  const handleFileCapture = async (mediaType: "photo" | "video") => {
    const options = { mediaType };
    const result = await launchCamera(options);
    if (result.assets && result.assets.length > 0) {
      setSelectedFile(result.assets[0]);
      setPrediction(null);
      setConfidence(null);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPrediction(null);
    setConfidence(null);
    setSolution(null);
  };

  const fetchSolution = async () => {
    if (!prediction) return;

    try {
      const response = await axios.get(`http://localhost:3001/solution/${prediction}`);
      setSolution(response.data.solution);
    } catch (error) {
      console.error("Error fetching solution:", error);
      Alert.alert(
        "Solution Error",
        "Failed to get solution. Please try again."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Top Section: Back Button and Title */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{crop.toUpperCase()} Disease Detection</Text>
        </View>

        {/* Buttons for Capture and Upload */}
        <View style={styles.selectionBox}>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => handleFileCapture("photo")}
          >
            <Text style={styles.radioTextSelected}>Capture Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => handleFileSelect("photo")}
          >
            <Text style={styles.radioTextSelected}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => handleFileCapture("video")}
          >
            <Text style={styles.radioTextSelected}>Capture Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioOption}
            onPress={() => handleFileSelect("video")}
          >
            <Text style={styles.radioTextSelected}>Upload Video</Text>
          </TouchableOpacity>
        </View>

        {/* File Preview */}
        {selectedFile && (
          <View style={styles.preview}>
            {selectedFile.type.startsWith("image/") ? (
              <Image
                source={{ uri: selectedFile.uri }}
                style={styles.imagePreview}
              />
            ) : (
              <Video
                source={{ uri: selectedFile.uri }}
                style={styles.videoPreview}
                controls
                resizeMode="contain"
              />
            )}

            {/* Prediction Button */}
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => handleUpload(selectedFile)}
            >
              <Text style={styles.selectButtonText}>Predict Disease</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Loading Indicator */}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {/* Prediction Results */}
        {prediction && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>Prediction: {prediction}</Text>
            <Text style={styles.resultText}>
              Confidence: {confidence?.toFixed(2)}%
            </Text>
            <TouchableOpacity
              style={styles.solutionButton}
              onPress={fetchSolution}
            >
              <Text style={styles.solutionButtonText}>Get Solution</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Solution */}
        {solution && (
          <View style={styles.solutionBox}>
            <Text style={styles.solutionText}>{solution}</Text>
          </View>
        )}

        {/* Clear Selection */}
        {selectedFile && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearSelection}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topBar: {
    flexDirection: "row", // Align back button and title side-by-side
    alignItems: "center", // Vertically center align
    marginBottom: 20, // Space below the top bar
    width: "90%", // Ensure it aligns with other content
    marginTop: 40, // Adjust vertical margin according to your layout
  },
  backButton: {
    marginRight: 15, // Add spacing between back button and title
    padding: 5, // Slight padding for touchability
  },
  backArrow: {
    fontSize: 20, // Adjust arrow text size
    color: "#000000",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  selectionBox: {
    backgroundColor: "#E3E3E3",
    width: "90%",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  radioOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  radioTextSelected: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  preview: {
    marginTop: 20,
    alignItems: "center",
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  videoPreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: "#BFFCBF",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: "#DFF2EC",
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#38761D",
  },
  solutionButton: {
    marginTop: 10,
    backgroundColor: "#BFFCBF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  solutionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  solutionBox: {
    marginTop: 20,
    backgroundColor: "#E3E3E3",
    padding: 15,
    borderRadius: 10,
    width: "90%",
  },
  solutionText: {
    fontSize: 16,
    color: "#000000",
  },
  clearButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#F8D7DA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#721C24",
  },
});

export default DetectionScreen;