import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackgroundPattern from '../components/BackgroundPattern';
import * as authService from '../services/authService';

const DashboardScreen = ({ navigation }) => {
  const [totalScans, setTotalScans] = useState(0);
  const [recentScans, setRecentScans] = useState([]);
  const [userActivity, setUserActivity] = useState({
    activeUsers: 0,
    scansPerUser: 0,
    userEngagement: 0,
  });
  const [diseaseTrends, setDiseaseTrends] = useState([]);
  const [pestActivity, setPestActivity] = useState([]);
  const [communityEngagement, setCommunityEngagement] = useState([]);
  const [exportReadiness, setExportReadiness] = useState([]);
  const [loading, setLoading] = useState(true);