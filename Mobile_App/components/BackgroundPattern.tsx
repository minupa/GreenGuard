import React, { useMemo } from 'react';
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
  // Generate pattern positions once when component mounts
  const patternElements = useMemo(() => {
    return [...Array(numberOfElements)].map((_, index) => ({
      id: index,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      rotation: `${Math.random() * 360}deg`
    }));
  }, [numberOfElements]); // Only regenerate if numberOfElements changes

  return (
    <View style={[styles.backgroundPattern, { opacity }]}>
      {patternElements.map((element) => (
        <Text
          key={element.id}
          style={[
            styles.icon,
            {
              top: element.top,
              left: element.left,
              opacity: opacity,
              transform: [{ rotate: element.rotation }]
            }
          ]}
        >
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