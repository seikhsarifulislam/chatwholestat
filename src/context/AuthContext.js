// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser]               = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading]         = useState(true);

  // Create Firestore user document on first sign-up
  const createUserDocument = async (uid, data) => {
    try {
      const userRef = doc(db, 'users', uid);
      const snap    = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          ...data,
          createdAt:       serverTimestamp(),
          progress:        {},
          quizHistory:     [],
          streak:          0,
          lastStudied:     null,
          totalMinutes:    0,
          xp:              0,
          level:           1,
          completedTopics: [],
          bookmarks:       [],
        });
      }
      return userRef;
    } catch (e) {
      console.warn('createUserDocument error (Firebase not configured?):', e.message);
    }
  };

  // Load user profile from Firestore
  const loadUserProfile = async (uid) => {
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) setUserProfile(snap.data());
    } catch (e) {
      console.warn('loadUserProfile error:', e.message);
    }
  };

  // Register
  const register = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    await createUserDocument(cred.user.uid, { email, displayName, photoURL: null });
    return cred;
  };

  // Login
  const login = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logout = async () => {
    setUserProfile(null);
    return signOut(auth);
  };

  // Reset password
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // Update progress for a topic
  const updateTopicProgress = async (topicId, data) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`progress.${topicId}`]: {
          completed:   data.completed || false,
          score:       data.score     || 0,
          attempts:    data.attempts  || 1,
          lastAttempt: new Date().toISOString(),
        },
        lastStudied: serverTimestamp(),
      });
      setUserProfile(prev => ({
        ...prev,
        progress: { ...(prev?.progress || {}), [topicId]: { ...data } },
      }));
    } catch (e) {
      console.warn('updateTopicProgress error:', e.message);
    }
  };

  // Save quiz result
  const saveQuizResult = async (topicId, score, total) => {
    if (!user) return 0;
    try {
      const userRef  = doc(db, 'users', user.uid);
      const xpGained = Math.round((score / total) * 50);
      const entry    = {
        topicId,
        score,
        total,
        percentage: Math.round((score / total) * 100),
        date:       new Date().toISOString(),
      };
      const current = userProfile || {};
      const history = current.quizHistory || [];
      await updateDoc(userRef, {
        quizHistory: [entry, ...history].slice(0, 50),
        xp:          (current.xp || 0) + xpGained,
      });
      setUserProfile(prev => ({
        ...prev,
        quizHistory: [entry, ...(prev?.quizHistory || [])].slice(0, 50),
        xp:          (prev?.xp || 0) + xpGained,
      }));
      return xpGained;
    } catch (e) {
      console.warn('saveQuizResult error:', e.message);
      return 0;
    }
  };

  // Toggle bookmark
  const toggleBookmark = async (topicId) => {
    if (!user) return;
    try {
      const bookmarks    = userProfile?.bookmarks || [];
      const newBookmarks = bookmarks.includes(topicId)
        ? bookmarks.filter(id => id !== topicId)
        : [...bookmarks, topicId];
      await updateDoc(doc(db, 'users', user.uid), { bookmarks: newBookmarks });
      setUserProfile(prev => ({ ...prev, bookmarks: newBookmarks }));
    } catch (e) {
      console.warn('toggleBookmark error:', e.message);
    }
  };

  // Auth state listener
  useEffect(() => {
    let unsub;
    try {
      unsub = onAuthStateChanged(auth, async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          await loadUserProfile(firebaseUser.uid);
        }
        setLoading(false);
      });
    } catch (e) {
      console.warn('onAuthStateChanged error:', e.message);
      setLoading(false);
    }
    return () => { if (unsub) unsub(); };
  }, []);

  const value = {
    user,
    userProfile,
    loading,
    register,
    login,
    logout,
    resetPassword,
    updateTopicProgress,
    saveQuizResult,
    toggleBookmark,
    loadUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
