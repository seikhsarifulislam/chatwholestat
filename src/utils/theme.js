// src/utils/theme.js
export const COLORS = {
  // Background layers
  bg0: '#0A0E1A',      // deepest background
  bg1: '#0F1626',      // card background
  bg2: '#151D35',      // elevated card
  bg3: '#1C2640',      // surface element

  // Accents
  teal:    '#00D4AA',
  blue:    '#4F9DFF',
  purple:  '#845EF7',
  red:     '#FF6B6B',
  orange:  '#FFA94D',
  green:   '#51CF66',
  cyan:    '#20C997',
  magenta: '#F06595',
  violet:  '#9775FA',

  // Text
  textPrimary:   '#FFFFFF',
  textSecondary: '#A0AABF',
  textMuted:     '#5A6780',

  // Status
  success: '#51CF66',
  warning: '#FFA94D',
  error:   '#FF6B6B',

  // Overlay
  overlay: 'rgba(0,0,0,0.7)',
};

export const CHAPTER_COLORS = [
  '#00D4AA', // ch01 - Teal
  '#4F9DFF', // ch02 - Blue
  '#845EF7', // ch03 - Purple
  '#FF6B6B', // ch04 - Red
  '#FFA94D', // ch05 - Orange
  '#51CF66', // ch06 - Green
  '#20C997', // ch07 - Cyan
  '#9775FA', // ch08 - Violet
  '#FF8C42', // ch09 - Deep orange
  '#F06595', // ch10 - Pink
];

export const FONTS = {
  regular: 'System',
  bold: 'System',
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SHADOWS = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: (color) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  }),
};
