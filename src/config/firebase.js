// src/config/firebase.js
// ─────────────────────────────────────────────────────────────
// FIREBASE SETUP
// Replace placeholder values below with your actual Firebase config.
// From: Firebase Console → Project Settings → Your Apps → Web App
// ─────────────────────────────────────────────────────────────

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── REPLACE THESE WITH YOUR FIREBASE CONFIG ──────────────────
const firebaseConfig = {
  apiKey: "AIzaSyB5czayezYL5emgjMseWp43BWUGQzU5rlQ",
  authDomain: "chatwhole-statistics-learning.firebaseapp.com",
  projectId: "chatwhole-statistics-learning",
  storageBucket: "chatwhole-statistics-learning.firebasestorage.app",
  messagingSenderId: "378076426489",
  appId: "1:378076426489:web:e1648e7cf99e6052d1b228",
  measurementId: "G-4K1QBH3B6L"
};

// ─────────────────────────────────────────────────────────────

// Prevent duplicate app initialization (hot-reload safe)
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

// Auth — use AsyncStorage persistence; fall back to default if
// already initialized (hot-reload guard).
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

// Firestore database
export const db = getFirestore(app);
export { auth };
export default app;
