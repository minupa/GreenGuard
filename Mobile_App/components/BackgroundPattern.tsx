import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BackgroundPatternProps {
  numberOfElements?: number;
  opacity?: number;
  icon?: string;
}

const BackgroundPattern = ({ 
  numberOfElements = 20,
  opacity = 0.4,
  icon = '🌿'
}: BackgroundPatternProps) => {
  return (
    <View style={[styles.backgroundPattern, { opacity }]}>
      {[...Array(numberOfElements)].map((_, index) => (
        <Text key={index} style={[
          styles.icon,
          {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: opacity,
            transform: [{ rotate: `${Math.random() * 360}deg` }]
          }
        ]}>
          {icon}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  icon: {
    position: 'absolute',
    fontSize: 24,
  },
});

export default BackgroundPattern; 