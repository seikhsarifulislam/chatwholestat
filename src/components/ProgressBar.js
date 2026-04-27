// src/components/ProgressBar.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../utils/theme';

export default function ProgressBar({ progress = 0, color = COLORS.teal, height = 6, style }) {
  const pct = Math.min(Math.max(progress, 0), 1);
  return (
    <View style={[styles.track, { height }, style]}>
      <View
        style={[
          styles.fill,
          { width: `${pct * 100}%`, height, backgroundColor: color },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    backgroundColor: '#1C2640',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 99,
  },
});
