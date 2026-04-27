// src/navigation/AppNavigator.js
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { useAuth } from '../context/AuthContext';
import { COLORS } from '../utils/theme';

// Auth screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main screens
import HomeScreen from '../screens/main/HomeScreen';
import ChapterDetailScreen from '../screens/main/ChapterDetailScreen';
import TopicDetailScreen from '../screens/main/TopicDetailScreen';
import FormulaScreen from '../screens/main/FormulaScreen';
import PracticeQuizScreen from '../screens/main/PracticeQuizScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab   = createBottomTabNavigator();

/* ── Bottom Tabs ──────────────────────────────────────────────── */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0F1626',
          borderTopColor: '#1C2640',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.teal,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Home:     focused ? 'home'            : 'home-outline',
            Quiz:     focused ? 'help-circle'     : 'help-circle-outline',
            Formulas: focused ? 'calculator'      : 'calculator-outline',
            Profile:  focused ? 'person-circle'   : 'person-circle-outline',
          };
          return <Ionicons name={icons[route.name] || 'ellipse'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"     component={HomeScreen} />
      <Tab.Screen name="Quiz"     component={PracticeQuizScreen} />
      <Tab.Screen name="Formulas" component={FormulaScreen} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/* ── Auth Stack ───────────────────────────────────────────────── */
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Login"          component={LoginScreen} />
      <Stack.Screen name="Register"       component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

/* ── Authenticated Stack ──────────────────────────────────────── */
function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="MainTabs"      component={MainTabs} />
      <Stack.Screen name="ChapterDetail" component={ChapterDetailScreen} />
      <Stack.Screen name="TopicDetail"   component={TopicDetailScreen} />
    </Stack.Navigator>
  );
}

/* ── Root Navigator ───────────────────────────────────────────── */
export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text style={styles.loaderEmoji}>📊</Text>
        <Text style={styles.loaderTitle}>StatsMaster</Text>
        <ActivityIndicator color={COLORS.teal} style={{ marginTop: 24 }} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: '#0A0E1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderEmoji: { fontSize: 60, marginBottom: 12 },
  loaderTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
});
