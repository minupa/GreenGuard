import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

export default function PestDetection() {
  const navigation = useNavigation();
  const [mode, setMode] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);

  const handleMediaPick = (type) => {
    launchImageLibrary({ mediaType: type }, (response) => {
      if (response.didCancel) {
        Alert.alert("Cancelled", "Selection cancelled.");
      } else if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
      } else {
        setFile(response.assets[0]);
      }
    });
  };

  const handleMediaCapture = (type) => {
    launchCamera({ mediaType: type }, (response) => {
      if (response.didCancel) {
        Alert.alert("Cancelled", "Capture cancelled.");
      } else if (response.errorMessage) {
        Alert.alert("Error", response.errorMessage);
      } else {
        setFile(response.assets[0]);
      }
    });
  };

  const handleUpload = async () => {
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
      const response = await axios.post("https://adithyakithmina-pest.hf.space/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      setPrediction(data.class);
      setConfidence(data.confidence);
    } catch (error) {
      console.error("Error predicting pest:", error);

      if (error.code === "ECONNABORTED") {
        Alert.alert("Connection Timeout", "The request took too long to complete. Please check your internet connection and try again.");
      } else if (error.code === "ERR_NETWORK") {
        Alert.alert("Network Error", "Unable to connect to the prediction service. Please check your internet connection.");
      } else if (error.response) {
        switch (error.response.status) {
          case 400:
            Alert.alert("Invalid Image", "The selected image could not be processed. Please try with a different image.");
            break;
          case 413:
            Alert.alert("Image Too Large", "The selected image is too large. Please choose a smaller image.");
            break;
          case 500:
            Alert.alert("Server Error", "The prediction service is currently experiencing issues. Please try again later.");
            break;
          default:
            Alert.alert("Prediction Error", "An error occurred while processing your image. Please try again.");
        }
      } else {
        Alert.alert("Prediction Error", "Failed to get predictions. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Pest Detection</Text>
      {!mode ? (
        <View>
          <TouchableOpacity style={styles.button} onPress={() => setMode("image")}>
            <Icon name="photo" size={24} color="white" />
            <Text style={styles.buttonText}>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setMode("video")}>
            <Icon name="videocam" size={24} color="white" />
            <Text style={styles.buttonText}>Video</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity style={styles.button} onPress={() => handleMediaPick(mode)}>
            <Icon name="folder" size={24} color="white" />
            <Text style={styles.buttonText}>Select {mode}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleMediaCapture(mode)}>
            <Icon name="camera" size={24} color="white" />
            <Text style={styles.buttonText}>Capture {mode}</Text>
          </TouchableOpacity>
        </View>
      )}
      {file && (
        <>
          <Image source={{ uri: file.uri }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.button} onPress={handleUpload} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Detecting..." : "Detect Pest"}</Text>
          </TouchableOpacity>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {prediction && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Prediction: {prediction}</Text>
              <Text style={styles.resultText}>Confidence: {confidence?.toFixed(2)}%</Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
  resultBox: {
    marginTop: 20,
    backgroundColor: "rgba(223, 242, 236, 0.9)",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#38761D",
  },
});