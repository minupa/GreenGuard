import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, Alert, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Video } from "react-native-video"; // Import Video component for video preview

const DetectionScreen = ({ route }: any) => {
  const { crop } = route.params;
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // URLs based on crop selection
  const URLS = {
    tea: "https://us-central1-tea-disease-classification.cloudfunctions.net/predict",
    rice: "https://us-central1-red-abstraction-446513-u9.cloudfunctions.net/predict",
    coconut: "https://us-central1-crack-glider-449515-f7.cloudfunctions.net/predict",
    cinnamon: "https://us-central1-crack-glider-449515-f7.cloudfunctions.net/predict2",
  };

  const PREDICTION_URL = crop === "tea" ? URLS.tea : crop === "coconut" ? URLS.coconut :crop === "cinnamon" ? URLS.cinnamon : URLS.rice;

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const cameraPermission = await request(PERMISSIONS.ANDROID.CAMERA);
    const storagePermission = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    const writePermission = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

    if (cameraPermission !== RESULTS.GRANTED || storagePermission !== RESULTS.GRANTED || writePermission !== RESULTS.GRANTED) {
      Alert.alert("Permissions Required", "Camera and storage permissions are required for the app to function properly.");
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
      Alert.alert("Prediction Error", "Failed to get predictions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCapture = async (mediaType: "photo" | "video") => {
    const options = {
      mediaType,
    };
    const result = await launchCamera(options);
    if (result.assets && result.assets.length > 0) {
      setSelectedFile(result.assets[0]);
      setPrediction(null);
    }
  };

  const handleSelect = async (mediaType: "photo" | "video") => {
    const options = {
      mediaType,
    };
    const result = await launchImageLibrary(options);
    if (result.assets && result.assets.length > 0) {
      setSelectedFile(result.assets[0]);
      setPrediction(null);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPrediction(null);
    setConfidence(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{crop.toUpperCase()} Disease Detection</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleCapture("photo")}>
            <Text style={styles.buttonText}>Capture Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleSelect("photo")}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleCapture("video")}>
            <Text style={styles.buttonText}>Capture Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleSelect("video")}>
            <Text style={styles.buttonText}>Upload Video</Text>
          </TouchableOpacity>
        </View>

        {selectedFile && (
          <View style={styles.preview}>
            {selectedFile.type.startsWith("image/") ? (
              <Image source={{ uri: selectedFile.uri }} style={styles.image} />
            ) : (
              <Video
                source={{ uri: selectedFile.uri }}
                style={styles.video}
                resizeMode="contain"
                controls={true}
              />
            )}
            <TouchableOpacity style={styles.predictButton} onPress={() => handleUpload(selectedFile)}>
              <Text style={styles.buttonText}>Predict Disease</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {prediction && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Prediction: {prediction}</Text>
            <Text style={styles.resultText}>Confidence: {confidence}%</Text>
          </View>
        )}

        {selectedFile && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSelection}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  scrollContainer: { flexGrow: 1 },
  title: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  buttonContainer: { flexDirection: "column", alignItems: "center", justifyContent: "center" }, // Changed to column
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 8, // Added margin for spacing between buttons
    width: 200, // Adjusted width
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  predictButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  preview: { alignItems: "center", marginTop: 20 },
  image: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
  video: { width: 200, height: 200, borderRadius: 10, marginBottom: 10 },
  resultContainer: { marginTop: 20, padding: 10, backgroundColor: "#d4edda", borderRadius: 10 },
  resultText: { fontSize: 16, fontWeight: "bold", color: "#155724" },
  clearButton: { marginTop: 20, backgroundColor: "#f8d7da", padding: 10, borderRadius: 5, alignItems: "center" },
  clearButtonText: { fontSize: 16, color: "#721c24", fontWeight: "bold" },
});

export default DetectionScreen;
