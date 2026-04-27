// src/screens/main/HomeScreen.js
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  FlatList, Dimensions, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { CHAPTERS, TOTAL_TOPICS } from '../../data/content';
import { COLORS, RADIUS, SPACING, SHADOWS } from '../../utils/theme';
import ProgressBar from '../../components/ProgressBar';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user, userProfile } = useAuth();

  const stats = useMemo(() => {
    const progress = userProfile?.progress || {};
    const completed = Object.values(progress).filter(p => p.completed).length;
    const xp = userProfile?.xp || 0;
    const level = Math.floor(xp / 500) + 1;
    const xpProgress = (xp % 500) / 500;
    return { completed, xp, level, xpProgress };
  }, [userProfile]);

  const getChapterProgress = (ch) => {
    const progress = userProfile?.progress || {};
    const done = ch.topics.filter(t => progress[t.id]?.completed).length;
    return { done, total: ch.topics.length, pct: ch.topics.length ? done / ch.topics.length : 0 };
  };

  const continueTopic = useMemo(() => {
    const progress = userProfile?.progress || {};
    for (const ch of CHAPTERS) {
      for (const t of ch.topics) {
        if (!progress[t.id]?.completed) return { topic: t, chapter: ch };
      }
    }
    return null;
  }, [userProfile]);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <LinearGradient colors={['#0F1626', '#151D35']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{greeting()}, {user?.displayName?.split(' ')[0] || 'Learner'} 👋</Text>
              <Text style={styles.subGreeting}>Continue your statistics journey</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.avatarBtn}>
              <LinearGradient colors={['#00D4AA', '#0099CC']} style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {(user?.displayName || 'U')[0].toUpperCase()}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* XP Bar */}
          <View style={styles.xpCard}>
            <View style={styles.xpRow}>
              <View style={styles.xpLeft}>
                <Text style={styles.levelBadge}>Level {stats.level}</Text>
                <Text style={styles.xpText}>{stats.xp} XP</Text>
              </View>
              <View style={styles.xpRight}>
                <Text style={styles.xpMeta}>{stats.completed}/{TOTAL_TOPICS} Topics</Text>
                <Text style={styles.xpMeta}>{500 - (stats.xp % 500)} XP to next level</Text>
              </View>
            </View>
            <ProgressBar progress={stats.xpProgress} color={COLORS.teal} height={8} />
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          {[
            { icon: '🎯', value: stats.completed, label: 'Completed' },
            { icon: '⭐', value: stats.xp, label: 'Total XP' },
            { icon: '🔥', value: userProfile?.streak || 0, label: 'Day Streak' },
            { icon: '📝', value: (userProfile?.quizHistory || []).length, label: 'Quizzes' },
          ].map((s, i) => (
            <View key={i} style={styles.quickStat}>
              <Text style={styles.qsEmoji}>{s.icon}</Text>
              <Text style={styles.qsValue}>{s.value}</Text>
              <Text style={styles.qsLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Continue Learning */}
        {continueTopic && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity
              style={[styles.continueCard, { borderLeftColor: continueTopic.chapter.color }]}
              onPress={() => navigation.navigate('TopicDetail', {
                topic: continueTopic.topic,
                chapter: continueTopic.chapter,
              })}
              activeOpacity={0.85}
            >
              <View>
                <Text style={styles.continueChapter}>{continueTopic.chapter.emoji} {continueTopic.chapter.title}</Text>
                <Text style={styles.continueTopic}>{continueTopic.topic.title}</Text>
                <View style={styles.continueMetaRow}>
                  <Ionicons name="time-outline" size={13} color={COLORS.textMuted} />
                  <Text style={styles.continueMeta}> {continueTopic.topic.mins} min • {continueTopic.topic.pages} pages</Text>
                </View>
              </View>
              <View style={[styles.continueArrow, { backgroundColor: continueTopic.chapter.color + '22' }]}>
                <Ionicons name="play" size={18} color={continueTopic.chapter.color} />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Chapters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Chapters</Text>
          {CHAPTERS.map((ch, idx) => {
            const cp = getChapterProgress(ch);
            return (
              <TouchableOpacity
                key={ch.id}
                style={styles.chapterCard}
                onPress={() => navigation.navigate('ChapterDetail', { chapter: ch })}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={[ch.bg, 'transparent']}
                  style={styles.chapterGrad}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                  {/* Number & Emoji */}
                  <View style={[styles.chNumBox, { backgroundColor: ch.color + '22' }]}>
                    <Text style={[styles.chNum, { color: ch.color }]}>
                      {String(idx + 1).padStart(2, '0')}
                    </Text>
                    <Text style={styles.chEmoji}>{ch.emoji}</Text>
                  </View>

                  {/* Content */}
                  <View style={styles.chContent}>
                    <View style={styles.chTitleRow}>
                      <Text style={styles.chTitle} numberOfLines={1}>{ch.title}</Text>
                      <View style={[styles.levelPill, { backgroundColor: ch.color + '22' }]}>
                        <Text style={[styles.levelPillText, { color: ch.color }]}>{ch.level}</Text>
                      </View>
                    </View>
                    <Text style={styles.chDesc} numberOfLines={2}>{ch.desc}</Text>
                    <View style={styles.chFooter}>
                      <ProgressBar progress={cp.pct} color={ch.color} height={5} style={{ flex: 1 }} />
                      <Text style={[styles.chProgress, { color: ch.color }]}>
                        {cp.done}/{cp.total}
                      </Text>
                    </View>
                  </View>

                  {/* Arrow */}
                  <Ionicons name="chevron-forward" size={18} color={ch.color} style={{ opacity: 0.7 }} />
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  header: { paddingTop: 50, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  greeting: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  subGreeting: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  avatarBtn: {},
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 18 },
  xpCard: { backgroundColor: COLORS.bg2, borderRadius: RADIUS.lg, padding: SPACING.md },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  xpLeft: {},
  levelBadge: {
    backgroundColor: COLORS.teal + '22', color: COLORS.teal,
    fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 20, alignSelf: 'flex-start', marginBottom: 4,
  },
  xpText: { fontSize: 22, fontWeight: '800', color: COLORS.textPrimary },
  xpRight: { alignItems: 'flex-end' },
  xpMeta: { fontSize: 12, color: COLORS.textMuted },
  quickStats: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md,
    backgroundColor: COLORS.bg1, marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg, marginTop: SPACING.lg,
    borderWidth: 1, borderColor: '#1C2640',
  },
  quickStat: { alignItems: 'center' },
  qsEmoji: { fontSize: 22, marginBottom: 4 },
  qsValue: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
  qsLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  section: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginBottom: SPACING.md },
  continueCard: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg, padding: SPACING.md,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderLeftWidth: 4, borderWidth: 1, borderColor: '#1C2640',
  },
  continueChapter: { fontSize: 12, color: COLORS.textMuted, marginBottom: 4 },
  continueTopic: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 6 },
  continueMetaRow: { flexDirection: 'row', alignItems: 'center' },
  continueMeta: { fontSize: 12, color: COLORS.textMuted },
  continueArrow: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  chapterCard: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.xl,
    marginBottom: SPACING.sm, borderWidth: 1, borderColor: '#1C2640',
    overflow: 'hidden',
  },
  chapterGrad: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, gap: SPACING.md },
  chNumBox: {
    width: 52, height: 52, borderRadius: RADIUS.md,
    alignItems: 'center', justifyContent: 'center',
  },
  chNum: { fontSize: 11, fontWeight: '800', marginBottom: 2 },
  chEmoji: { fontSize: 22 },
  chContent: { flex: 1 },
  chTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  chTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, flex: 1, marginRight: 8 },
  levelPill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  levelPillText: { fontSize: 9, fontWeight: '700' },
  chDesc: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8, lineHeight: 17 },
  chFooter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chProgress: { fontSize: 11, fontWeight: '700' },
});
