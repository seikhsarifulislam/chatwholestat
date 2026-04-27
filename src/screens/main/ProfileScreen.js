// src/screens/main/ProfileScreen.js
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Alert, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { CHAPTERS, TOTAL_TOPICS } from '../../data/content';
import { COLORS, RADIUS, SPACING } from '../../utils/theme';
import ProgressBar from '../../components/ProgressBar';

export default function ProfileScreen({ navigation }) {
  const { user, userProfile, logout } = useAuth();

  const stats = useMemo(() => {
    const progress = userProfile?.progress || {};
    const completed = Object.values(progress).filter(p => p.completed).length;
    const xp = userProfile?.xp || 0;
    const level = Math.floor(xp / 500) + 1;
    const xpProgress = (xp % 500) / 500;
    const quizzes = userProfile?.quizHistory || [];
    const avgScore = quizzes.length
      ? Math.round(quizzes.reduce((a, q) => a + q.percentage, 0) / quizzes.length)
      : 0;
    return { completed, xp, level, xpProgress, quizzes, avgScore };
  }, [userProfile]);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: logout },
    ]);
  };

  const chapterProgress = CHAPTERS.map(ch => {
    const progress = userProfile?.progress || {};
    const done = ch.topics.filter(t => progress[t.id]?.completed).length;
    return { ...ch, done, total: ch.topics.length, pct: ch.topics.length ? done / ch.topics.length : 0 };
  });

  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Profile Header */}
        <LinearGradient colors={['#151D35', '#0F1626']} style={styles.profileHeader}>
          <View style={styles.headerTop}>
            <Text style={styles.screenTitle}>Profile</Text>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={22} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>

          {/* Avatar & Name */}
          <View style={styles.avatarSection}>
            <LinearGradient colors={['#00D4AA', '#0099CC']} style={styles.avatar}>
              <Text style={styles.avatarText}>{(user?.displayName || 'U')[0].toUpperCase()}</Text>
            </LinearGradient>
            <Text style={styles.userName}>{user?.displayName || 'Learner'}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>Level {stats.level} · {stats.xp} XP</Text>
            </View>
          </View>

          {/* XP Progress */}
          <View style={styles.xpCard}>
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>Progress to Level {stats.level + 1}</Text>
              <Text style={styles.xpText}>{500 - (stats.xp % 500)} XP to go</Text>
            </View>
            <ProgressBar progress={stats.xpProgress} color={COLORS.teal} height={10} />
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          {[
            { icon: '📚', value: stats.completed, max: TOTAL_TOPICS, label: 'Topics Done', color: COLORS.teal },
            { icon: '⭐', value: stats.xp, label: 'Total XP', color: '#FFA94D' },
            { icon: '📝', value: stats.quizzes.length, label: 'Quizzes Done', color: COLORS.blue },
            { icon: '🎯', value: `${stats.avgScore}%`, label: 'Avg Quiz Score', color: COLORS.purple },
          ].map((s, i) => (
            <View key={i} style={styles.statCard}>
              <Text style={styles.statEmoji}>{s.icon}</Text>
              <Text style={[styles.statValue, { color: s.color }]}>
                {s.max ? `${s.value}/${s.max}` : s.value}
              </Text>
              <Text style={styles.statLabel}>{s.label}</Text>
              {s.max && <ProgressBar progress={s.value / s.max} color={s.color} height={3} style={{ marginTop: 6 }} />}
            </View>
          ))}
        </View>

        {/* Chapter Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chapter Progress</Text>
          {chapterProgress.map(ch => (
            <TouchableOpacity
              key={ch.id}
              style={styles.chRow}
              onPress={() => navigation.navigate('ChapterDetail', { chapter: ch })}
            >
              <Text style={styles.chEmoji}>{ch.emoji}</Text>
              <View style={styles.chContent}>
                <View style={styles.chTitleRow}>
                  <Text style={styles.chTitle} numberOfLines={1}>{ch.title}</Text>
                  <Text style={[styles.chPct, { color: ch.color }]}>{ch.done}/{ch.total}</Text>
                </View>
                <ProgressBar progress={ch.pct} color={ch.color} height={4} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Quiz Activity */}
        {stats.quizzes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Quizzes</Text>
            {stats.quizzes.slice(0, 8).map((q, i) => {
              const chapter = CHAPTERS.find(ch => ch.topics.some(t => t.id === q.topicId));
              const topic = chapter?.topics.find(t => t.id === q.topicId);
              const passed = q.percentage >= 60;
              return (
                <View key={i} style={styles.quizRow}>
                  <View style={[styles.quizDot, { backgroundColor: passed ? COLORS.success : COLORS.warning }]} />
                  <View style={styles.quizInfo}>
                    <Text style={styles.quizTopic} numberOfLines={1}>{topic?.title || q.topicId}</Text>
                    <Text style={styles.quizDate}>{new Date(q.date).toLocaleDateString()}</Text>
                  </View>
                  <Text style={[styles.quizScore, { color: passed ? COLORS.success : COLORS.warning }]}>
                    {q.percentage}%
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Bookmarks */}
        {(userProfile?.bookmarks || []).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bookmarked Topics</Text>
            {(userProfile?.bookmarks || []).map(topicId => {
              const chapter = CHAPTERS.find(ch => ch.topics.some(t => t.id === topicId));
              const topic = chapter?.topics.find(t => t.id === topicId);
              if (!topic) return null;
              return (
                <TouchableOpacity
                  key={topicId}
                  style={styles.bookmarkRow}
                  onPress={() => navigation.navigate('TopicDetail', { topic, chapter })}
                >
                  <Ionicons name="bookmark" size={16} color={chapter.color} />
                  <View style={styles.bookmarkInfo}>
                    <Text style={styles.bookmarkTitle}>{topic.title}</Text>
                    <Text style={styles.bookmarkChapter}>{chapter.emoji} {chapter.title}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={15} color={COLORS.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.error + '22' }]}>
              <Ionicons name="log-out-outline" size={18} color={COLORS.error} />
            </View>
            <Text style={[styles.menuText, { color: COLORS.error }]}>Log Out</Text>
            <Ionicons name="chevron-forward" size={15} color={COLORS.error} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  profileHeader: { paddingTop: 50, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl },
  screenTitle: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary },
  logoutBtn: { padding: 4 },
  avatarSection: { alignItems: 'center', marginBottom: SPACING.xl },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 32 },
  userName: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  userEmail: { fontSize: 13, color: COLORS.textMuted, marginTop: 4 },
  levelBadge: {
    marginTop: 10, paddingHorizontal: 14, paddingVertical: 5,
    backgroundColor: COLORS.teal + '22', borderRadius: 20,
  },
  levelBadgeText: { color: COLORS.teal, fontSize: 13, fontWeight: '700' },
  xpCard: { backgroundColor: COLORS.bg2, borderRadius: RADIUS.lg, padding: SPACING.md },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  xpLabel: { fontSize: 13, color: COLORS.textSecondary },
  xpText: { fontSize: 13, color: COLORS.textMuted },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg, gap: 12, marginTop: SPACING.xl,
  },
  statCard: {
    width: '47%', backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    padding: SPACING.md, alignItems: 'center',
    borderWidth: 1, borderColor: '#1C2640',
  },
  statEmoji: { fontSize: 24, marginBottom: 8 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 4, textAlign: 'center' },
  section: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginBottom: SPACING.md },
  chRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderWidth: 1, borderColor: '#1C2640', gap: SPACING.sm,
  },
  chEmoji: { fontSize: 22 },
  chContent: { flex: 1 },
  chTitleRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  chTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary, flex: 1 },
  chPct: { fontSize: 12, fontWeight: '700' },
  quizRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.md,
    padding: SPACING.md, marginBottom: SPACING.xs,
    borderWidth: 1, borderColor: '#1C2640', gap: 10,
  },
  quizDot: { width: 10, height: 10, borderRadius: 5 },
  quizInfo: { flex: 1 },
  quizTopic: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  quizDate: { fontSize: 11, color: COLORS.textMuted },
  quizScore: { fontSize: 14, fontWeight: '800' },
  bookmarkRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.md,
    padding: SPACING.md, marginBottom: SPACING.xs,
    borderWidth: 1, borderColor: '#1C2640', gap: 10,
  },
  bookmarkInfo: { flex: 1 },
  bookmarkTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  bookmarkChapter: { fontSize: 11, color: COLORS.textMuted },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    padding: SPACING.md, gap: 12,
    borderWidth: 1, borderColor: '#1C2640',
  },
  menuIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  menuText: { flex: 1, fontSize: 15, fontWeight: '600' },
});
