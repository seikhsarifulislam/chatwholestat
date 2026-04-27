// src/screens/auth/RegisterScreen.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS, SPACING } from '../../utils/theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields'); return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters'); return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match'); return;
    }
    setLoading(true);
    try {
      await register(email.trim(), password, name.trim());
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use': 'Email already registered. Please log in.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/weak-password': 'Password too weak. Use at least 6 characters.',
      };
      Alert.alert('Registration Failed', msgs[err.code] || err.message);
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, icon, value, onChange, placeholder, secure, keyboard, returnKey, onSubmit }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <Ionicons name={icon} size={20} color={COLORS.textMuted} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChange}
          secureTextEntry={secure === 'pwd' ? !showPwd : !!secure}
          autoCapitalize={keyboard === 'email-address' ? 'none' : 'words'}
          keyboardType={keyboard || 'default'}
          returnKeyType={returnKey || 'next'}
          onSubmitEditing={onSubmit}
        />
        {secure === 'pwd' && (
          <TouchableOpacity onPress={() => setShowPwd(v => !v)}>
            <Ionicons name={showPwd ? 'eye-off-outline' : 'eye-outline'} size={20} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626', '#151D35']} style={styles.bg}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.logoEmoji}>📐</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your statistics journey today</Text>
          </View>

          <View style={styles.card}>
            <Field label="Full Name" icon="person-outline" value={name} onChange={setName} placeholder="John Doe" />
            <Field label="Email" icon="mail-outline" value={email} onChange={setEmail} placeholder="you@example.com" keyboard="email-address" />
            <Field label="Password" icon="lock-closed-outline" value={password} onChange={setPassword} placeholder="Min. 6 characters" secure="pwd" />
            <Field label="Confirm Password" icon="shield-checkmark-outline" value={confirm} onChange={setConfirm} placeholder="Repeat password" secure returnKey="done" onSubmit={handleRegister} />

            {/* Password strength */}
            {password.length > 0 && (
              <View style={styles.strengthRow}>
                {[1, 2, 3, 4].map(i => (
                  <View key={i} style={[styles.strengthBar, {
                    backgroundColor: password.length >= i * 3
                      ? i <= 1 ? '#FF6B6B' : i <= 2 ? '#FFA94D' : i <= 3 ? '#51CF66' : '#00D4AA'
                      : COLORS.bg3
                  }]} />
                ))}
                <Text style={styles.strengthText}>
                  {password.length < 4 ? 'Weak' : password.length < 7 ? 'Fair' : password.length < 10 ? 'Good' : 'Strong'}
                </Text>
              </View>
            )}

            <TouchableOpacity onPress={handleRegister} disabled={loading} activeOpacity={0.85} style={{ marginTop: 8 }}>
              <LinearGradient colors={['#00D4AA', '#0099CC']} style={styles.btn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Create Account</Text>}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.benefits}>
            {['Track your progress across 31 topics', 'Earn XP and level up', 'Quiz yourself with 150+ questions', 'Access formula sheet & glossary'].map((b, i) => (
              <View key={i} style={styles.benefitItem}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.teal} />
                <Text style={styles.benefitText}>{b}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flexGrow: 1, padding: SPACING.lg, paddingTop: 50 },
  backBtn: { marginBottom: SPACING.md },
  header: { alignItems: 'center', marginBottom: SPACING.xl },
  logoEmoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
  subtitle: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.xl,
    padding: SPACING.xl, borderWidth: 1, borderColor: '#1C2640',
    marginBottom: SPACING.xl,
  },
  inputGroup: { marginBottom: SPACING.md },
  label: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 6, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg2, borderRadius: RADIUS.md,
    borderWidth: 1, borderColor: '#1C2640', paddingHorizontal: SPACING.md,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: COLORS.textPrimary, fontSize: 15, paddingVertical: 14 },
  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: SPACING.md },
  strengthBar: { flex: 1, height: 4, borderRadius: 2 },
  strengthText: { fontSize: 11, color: COLORS.textMuted, marginLeft: 4 },
  btn: { borderRadius: RADIUS.lg, paddingVertical: 16, alignItems: 'center', marginBottom: SPACING.lg },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { color: COLORS.textSecondary, fontSize: 14 },
  loginLink: { color: COLORS.teal, fontSize: 14, fontWeight: '700' },
  benefits: { gap: 8 },
  benefitItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  benefitText: { color: COLORS.textSecondary, fontSize: 13 },
});
