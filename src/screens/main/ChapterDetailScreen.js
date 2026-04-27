// src/screens/main/ChapterDetailScreen.js
import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS, SPACING } from '../../utils/theme';
import ProgressBar from '../../components/ProgressBar';

export default function ChapterDetailScreen({ navigation, route }) {
  const { chapter } = route.params;
  const { userProfile } = useAuth();
  const progress = userProfile?.progress || {};

  const getTopicStatus = (topicId) => {
    const p = progress[topicId];
    if (!p) return 'new';
    if (p.completed) return 'done';
    return 'started';
  };

  const completedCount = chapter.topics.filter(t => progress[t.id]?.completed).length;
  const pct = completedCount / chapter.topics.length;

  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
      <StatusBar barStyle="light-content" />

      {/* Hero Header */}
      <LinearGradient
        colors={[chapter.bg, chapter.bg + '00']}
        style={styles.hero}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.heroEmoji}>{chapter.emoji}</Text>
        <Text style={styles.heroTitle}>{chapter.title}</Text>
        <Text style={styles.heroDesc}>{chapter.desc}</Text>
        <View style={styles.heroStats}>
          <View style={[styles.heroChip, { backgroundColor: chapter.color + '22' }]}>
            <Ionicons name="book-outline" size={13} color={chapter.color} />
            <Text style={[styles.heroChipText, { color: chapter.color }]}>
              {chapter.topics.length} Topics
            </Text>
          </View>
          <View style={[styles.heroChip, { backgroundColor: chapter.color + '22' }]}>
            <Ionicons name="help-circle-outline" size={13} color={chapter.color} />
            <Text style={[styles.heroChipText, { color: chapter.color }]}>
              {chapter.topics.reduce((a, t) => a + (t.quiz?.length || 0), 0)} Questions
            </Text>
          </View>
          <View style={[styles.heroChip, { backgroundColor: chapter.color + '22' }]}>
            <Ionicons name="time-outline" size={13} color={chapter.color} />
            <Text style={[styles.heroChipText, { color: chapter.color }]}>
              {chapter.topics.reduce((a, t) => a + t.mins, 0)} min
            </Text>
          </View>
        </View>
        <View style={{ marginTop: SPACING.md }}>
          <View style={styles.progressLabel}>
            <Text style={[styles.progressText, { color: chapter.color }]}>
              {completedCount}/{chapter.topics.length} Completed
            </Text>
            <Text style={styles.progressPct}>{Math.round(pct * 100)}%</Text>
          </View>
          <ProgressBar progress={pct} color={chapter.color} height={8} />
        </View>
      </LinearGradient>

      {/* Topics List */}
      <ScrollView style={styles.topicList} showsVerticalScrollIndicator={false}>
        {chapter.topics.map((topic, idx) => {
          const status = getTopicStatus(topic.id);
          const isLocked = false; // All unlocked
          const score = progress[topic.id]?.score;
          return (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, status === 'done' && styles.topicDone]}
              onPress={() => navigation.navigate('TopicDetail', { topic, chapter })}
              activeOpacity={0.85}
            >
              {/* Index */}
              <View style={[styles.topicIndex, {
                backgroundColor: status === 'done' ? chapter.color + '33' : COLORS.bg3,
              }]}>
                {status === 'done'
                  ? <Ionicons name="checkmark" size={18} color={chapter.color} />
                  : <Text style={[styles.topicIndexNum, { color: status === 'started' ? chapter.color : COLORS.textMuted }]}>
                    {String(idx + 1).padStart(2, '0')}
                  </Text>
                }
              </View>

              {/* Content */}
              <View style={styles.topicContent}>
                <Text style={[styles.topicTitle, status === 'done' && { color: COLORS.textSecondary }]}>
                  {topic.title}
                </Text>
                <View style={styles.topicMeta}>
                  <Ionicons name="time-outline" size={12} color={COLORS.textMuted} />
                  <Text style={styles.topicMetaText}> {topic.mins} min • {topic.pages} pages</Text>
                  {topic.quiz?.length > 0 && (
                    <>
                      <Text style={styles.dot}> · </Text>
                      <Ionicons name="help-circle-outline" size={12} color={COLORS.textMuted} />
                      <Text style={styles.topicMetaText}> {topic.quiz.length} Q</Text>
                    </>
                  )}
                  {score !== undefined && (
                    <>
                      <Text style={styles.dot}> · </Text>
                      <Text style={[styles.scoreText, { color: score >= 70 ? COLORS.success : COLORS.warning }]}>
                        Best: {score}%
                      </Text>
                    </>
                  )}
                </View>
              </View>

              {/* Arrow */}
              <Ionicons
                name="chevron-forward"
                size={16}
                color={status === 'done' ? chapter.color : COLORS.textMuted}
              />
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  hero: { paddingTop: 50, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xl },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  heroEmoji: { fontSize: 48, marginBottom: 8 },
  heroTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 8 },
  heroDesc: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20, marginBottom: SPACING.md },
  heroStats: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  heroChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20,
  },
  heroChipText: { fontSize: 12, fontWeight: '600' },
  progressLabel: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressText: { fontSize: 13, fontWeight: '700' },
  progressPct: { fontSize: 13, color: COLORS.textMuted },
  topicList: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.md },
  topicCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderWidth: 1, borderColor: '#1C2640',
  },
  topicDone: { opacity: 0.8 },
  topicIndex: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    marginRight: SPACING.md,
  },
  topicIndexNum: { fontSize: 14, fontWeight: '800' },
  topicContent: { flex: 1 },
  topicTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  topicMeta: { flexDirection: 'row', alignItems: 'center' },
  topicMetaText: { fontSize: 12, color: COLORS.textMuted },
  dot: { color: COLORS.textMuted, fontSize: 12 },
  scoreText: { fontSize: 12, fontWeight: '700' },
});
