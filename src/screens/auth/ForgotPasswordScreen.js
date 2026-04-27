// src/screens/auth/ForgotPasswordScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS, SPACING } from '../../utils/theme';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { resetPassword } = useAuth();

  const handleReset = async () => {
    if (!email.trim()) { Alert.alert('Error', 'Please enter your email'); return; }
    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err) {
      const msgs = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/invalid-email': 'Invalid email address.',
      };
      Alert.alert('Error', msgs[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626', '#151D35']} style={styles.bg}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
          </TouchableOpacity>

          {sent ? (
            <View style={styles.sentBox}>
              <Text style={styles.sentEmoji}>📧</Text>
              <Text style={styles.sentTitle}>Email Sent!</Text>
              <Text style={styles.sentDesc}>
                Check your inbox at{'\n'}
                <Text style={{ color: COLORS.teal }}>{email}</Text>
                {'\n\n'}Follow the link to reset your password.
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.85}>
                <LinearGradient colors={['#00D4AA', '#0099CC']} style={styles.btn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.btnText}>Back to Login</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.icon}>🔑</Text>
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter your registered email and we'll send you a reset link.
              </Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputRow}>
                  <Ionicons name="mail-outline" size={20} color={COLORS.textMuted} style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    placeholderTextColor={COLORS.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="done"
                    onSubmitEditing={handleReset}
                  />
                </View>
              </View>

              <TouchableOpacity onPress={handleReset} disabled={loading} activeOpacity={0.85}>
                <LinearGradient colors={['#00D4AA', '#0099CC']} style={styles.btn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Send Reset Link</Text>}
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, padding: SPACING.lg, paddingTop: 55, justifyContent: 'flex-start' },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.xl,
    padding: SPACING.xl, borderWidth: 1, borderColor: '#1C2640',
  },
  icon: { fontSize: 44, textAlign: 'center', marginBottom: SPACING.md },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: SPACING.xl },
  inputGroup: { marginBottom: SPACING.lg },
  label: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '600', marginBottom: 6 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg2, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: '#1C2640', paddingHorizontal: SPACING.md,
  },
  input: { flex: 1, color: COLORS.textPrimary, fontSize: 15, paddingVertical: 14 },
  btn: { borderRadius: RADIUS.lg, paddingVertical: 16, alignItems: 'center', marginBottom: SPACING.md },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  cancelBtn: { alignItems: 'center', paddingVertical: 8 },
  cancelText: { color: COLORS.textMuted, fontSize: 14 },
  sentBox: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  sentEmoji: { fontSize: 64 },
  sentTitle: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
  sentDesc: { fontSize: 15, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22 },
});
