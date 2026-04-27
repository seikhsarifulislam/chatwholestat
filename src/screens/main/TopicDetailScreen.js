// src/screens/main/TopicDetailScreen.js
import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, Animated, Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS, SPACING } from '../../utils/theme';

const { width } = Dimensions.get('window');

export default function TopicDetailScreen({ navigation, route }) {
  const { topic, chapter } = route.params;
  const { userProfile, updateTopicProgress, toggleBookmark } = useAuth();
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'quiz'
  const scrollY = useRef(new Animated.Value(0)).current;

  const progress = userProfile?.progress || {};
  const topicProgress = progress[topic.id];
  const isBookmarked = (userProfile?.bookmarks || []).includes(topic.id);

  const handleMarkComplete = async () => {
    await updateTopicProgress(topic.id, {
      completed: true,
      score: topicProgress?.score || 0,
      attempts: (topicProgress?.attempts || 0) + 1,
    });
  };

  // Parse content blocks
  const parseContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('▌ ')) {
        return <Text key={i} style={styles.sectionHeader}>{line.slice(2)}</Text>;
      }
      if (line.startsWith('• ')) {
        return (
          <View key={i} style={styles.bulletRow}>
            <Text style={[styles.bullet, { color: chapter.color }]}>•</Text>
            <Text style={styles.bulletText}>{line.slice(2)}</Text>
          </View>
        );
      }
      if (line.startsWith('① ') || line.startsWith('② ') || line.startsWith('③ ') ||
          line.startsWith('④ ') || line.startsWith('⑤ ')) {
        return <Text key={i} style={[styles.numbered, { color: chapter.color }]}>{line}</Text>;
      }
      if (line.includes('✓') || line.includes('✗') || line.includes('⚠️')) {
        return <Text key={i} style={styles.noteLine}>{line}</Text>;
      }
      if (line.startsWith('Formula:') || line.startsWith('E(X)') || line.startsWith('P(X') ||
          line.includes(' = ') && line.length < 80 && !line.startsWith(' ')) {
        return (
          <View key={i} style={[styles.formulaBox, { borderLeftColor: chapter.color }]}>
            <Text style={[styles.formulaText, { color: chapter.color }]}>{line}</Text>
          </View>
        );
      }
      if (line.trim() === '') return <View key={i} style={{ height: 8 }} />;
      return <Text key={i} style={styles.bodyText}>{line}</Text>;
    });
  };

  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <Animated.View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>{topic.title}</Text>
        <TouchableOpacity onPress={() => toggleBookmark(topic.id)} style={styles.bookmarkBtn}>
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={isBookmarked ? chapter.color : COLORS.textMuted}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Meta Row */}
      <View style={[styles.metaRow, { backgroundColor: chapter.bg }]}>
        <View style={styles.metaChip}>
          <Ionicons name="time-outline" size={13} color={chapter.color} />
          <Text style={[styles.metaText, { color: chapter.color }]}>{topic.mins} min</Text>
        </View>
        <View style={styles.metaChip}>
          <Ionicons name="document-text-outline" size={13} color={chapter.color} />
          <Text style={[styles.metaText, { color: chapter.color }]}>{topic.pages} pages</Text>
        </View>
        {topic.quiz?.length > 0 && (
          <View style={styles.metaChip}>
            <Ionicons name="help-circle-outline" size={13} color={chapter.color} />
            <Text style={[styles.metaText, { color: chapter.color }]}>{topic.quiz.length} quiz Q</Text>
          </View>
        )}
        {topicProgress?.completed && (
          <View style={[styles.metaChip, { backgroundColor: COLORS.success + '22' }]}>
            <Ionicons name="checkmark-circle" size={13} color={COLORS.success} />
            <Text style={[styles.metaText, { color: COLORS.success }]}>Completed</Text>
          </View>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['content', 'quiz'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && [styles.tabActive, { borderBottomColor: chapter.color }]]}
            onPress={() => setActiveTab(tab)}
          >
            <Ionicons
              name={tab === 'content' ? 'book-outline' : 'help-circle-outline'}
              size={15}
              color={activeTab === tab ? chapter.color : COLORS.textMuted}
            />
            <Text style={[styles.tabText, activeTab === tab && { color: chapter.color }]}>
              {tab === 'content' ? 'Content' : `Quiz (${topic.quiz?.length || 0})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'content' ? (
        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {/* Title Banner */}
          <LinearGradient
            colors={[chapter.color + '22', 'transparent']}
            style={styles.titleBanner}
          >
            <Text style={styles.topicTitle}>{chapter.emoji} {topic.title}</Text>
          </LinearGradient>

          <View style={styles.contentBody}>
            {parseContent(topic.content)}
          </View>

          {/* Complete Button */}
          {!topicProgress?.completed && (
            <TouchableOpacity onPress={handleMarkComplete} style={styles.completeBtn} activeOpacity={0.85}>
              <LinearGradient
                colors={[chapter.color, chapter.color + 'BB']}
                style={styles.completeBtnInner}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
                <Text style={styles.completeBtnText}>Mark as Complete</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {topicProgress?.completed && (
            <View style={styles.completedBanner}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.completedText}>You've completed this topic!</Text>
            </View>
          )}

          {/* Take Quiz button */}
          {topic.quiz?.length > 0 && (
            <TouchableOpacity
              onPress={() => setActiveTab('quiz')}
              style={styles.quizCta}
              activeOpacity={0.85}
            >
              <Ionicons name="help-circle-outline" size={18} color={chapter.color} />
              <Text style={[styles.quizCtaText, { color: chapter.color }]}>
                Take Quiz ({topic.quiz.length} questions)
              </Text>
              <Ionicons name="arrow-forward" size={15} color={chapter.color} />
            </TouchableOpacity>
          )}

          <View style={{ height: 80 }} />
        </ScrollView>
      ) : (
        <QuizView topic={topic} chapter={chapter} navigation={navigation} />
      )}
    </LinearGradient>
  );
}

function QuizView({ topic, chapter, navigation }) {
  const { saveQuizResult, updateTopicProgress, userProfile } = useAuth();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  if (!topic.quiz || topic.quiz.length === 0) {
    return (
      <View style={styles.noQuiz}>
        <Text style={styles.noQuizText}>No quiz questions for this topic yet.</Text>
      </View>
    );
  }

  const q = topic.quiz[current];
  const total = topic.quiz.length;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.ans;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { question: q.q, selected: idx, correct, correctAns: q.ans }]);
  };

  const handleNext = () => {
    if (current < total - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const pct = Math.round((score / total) * 100);
    await saveQuizResult(topic.id, pct, 100);
    await updateTopicProgress(topic.id, {
      completed: pct >= 60,
      score: pct,
      attempts: (userProfile?.progress?.[topic.id]?.attempts || 0) + 1,
    });
    setFinished(true);
  };

  const restartQuiz = () => {
    setCurrent(0); setSelected(null); setAnswered(false);
    setScore(0); setFinished(false); setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 60;
    return (
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <View style={[styles.resultCard, { borderColor: passed ? COLORS.success : COLORS.warning }]}>
          <Text style={styles.resultEmoji}>{passed ? '🎉' : '📖'}</Text>
          <Text style={styles.resultTitle}>{passed ? 'Quiz Passed!' : 'Keep Studying!'}</Text>
          <View style={[styles.scoreCircle, { borderColor: passed ? COLORS.success : COLORS.warning }]}>
            <Text style={[styles.scoreNum, { color: passed ? COLORS.success : COLORS.warning }]}>{pct}%</Text>
            <Text style={styles.scoreLabel}>{score}/{total} correct</Text>
          </View>
          <Text style={styles.resultSubtitle}>
            {passed ? 'Great job! Topic marked as complete.' : 'Review the content and try again.'}
          </Text>

          {/* Answer Review */}
          <View style={styles.reviewList}>
            {answers.map((a, i) => (
              <View key={i} style={[styles.reviewItem, { borderLeftColor: a.correct ? COLORS.success : COLORS.error }]}>
                <Text style={styles.reviewQ} numberOfLines={2}>{i + 1}. {a.question}</Text>
                <Text style={[styles.reviewA, { color: a.correct ? COLORS.success : COLORS.error }]}>
                  {a.correct ? '✓ ' : '✗ '}{topic.quiz[i].opts[a.selected]}
                </Text>
                {!a.correct && (
                  <Text style={styles.reviewCorrect}>✓ {topic.quiz[i].opts[a.correctAns]}</Text>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={restartQuiz} style={styles.restartBtn}>
            <Text style={styles.restartBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.quizContainer}>
      {/* Progress */}
      <View style={styles.quizProgressRow}>
        <Text style={styles.quizProgress}>{current + 1} / {total}</Text>
        <View style={styles.quizProgressBar}>
          <View style={[styles.quizProgressFill, { width: `${((current) / total) * 100}%`, backgroundColor: chapter.color }]} />
        </View>
        <Text style={[styles.quizScore, { color: chapter.color }]}>{score} pts</Text>
      </View>

      {/* Question */}
      <View style={[styles.questionCard, { borderTopColor: chapter.color }]}>
        <Text style={styles.questionText}>{q.q}</Text>
      </View>

      {/* Options */}
      {q.opts.map((opt, idx) => {
        let bg = COLORS.bg2;
        let border = '#1C2640';
        let textColor = COLORS.textPrimary;
        if (answered) {
          if (idx === q.ans) { bg = COLORS.success + '22'; border = COLORS.success; textColor = COLORS.success; }
          else if (idx === selected) { bg = COLORS.error + '22'; border = COLORS.error; textColor = COLORS.error; }
        } else if (selected === idx) {
          bg = chapter.color + '22'; border = chapter.color;
        }
        return (
          <TouchableOpacity
            key={idx}
            style={[styles.optionBtn, { backgroundColor: bg, borderColor: border }]}
            onPress={() => handleSelect(idx)}
            activeOpacity={answered ? 1 : 0.7}
          >
            <View style={[styles.optionLetter, { backgroundColor: border + '33', borderColor: border }]}>
              <Text style={[styles.optionLetterText, { color: border === '#1C2640' ? COLORS.textMuted : border }]}>
                {['A', 'B', 'C', 'D'][idx]}
              </Text>
            </View>
            <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
            {answered && idx === q.ans && <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />}
            {answered && idx === selected && idx !== q.ans && <Ionicons name="close-circle" size={18} color={COLORS.error} />}
          </TouchableOpacity>
        );
      })}

      {/* Explanation hint */}
      {answered && (
        <View style={[styles.explanationBox, { borderColor: selected === q.ans ? COLORS.success : COLORS.error }]}>
          <Text style={[styles.explanationText, { color: selected === q.ans ? COLORS.success : COLORS.textSecondary }]}>
            {selected === q.ans
              ? '✓ Correct! Great job!'
              : `✗ Correct answer: ${q.opts[q.ans]}`
            }
          </Text>
        </View>
      )}

      {/* Next Button */}
      {answered && (
        <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
          <LinearGradient
            colors={[chapter.color, chapter.color + 'BB']}
            style={styles.nextBtn}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextBtnText}>
              {current < total - 1 ? 'Next Question' : 'Finish Quiz'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      )}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 50, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center', justifyContent: 'center',
    marginRight: SPACING.md,
  },
  topBarTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  bookmarkBtn: { padding: 4 },
  metaRow: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, gap: 8,
  },
  metaChip: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(255,255,255,0.07)', paddingHorizontal: 8, paddingVertical: 4,
    borderRadius: 12,
  },
  metaText: { fontSize: 12, fontWeight: '600' },
  tabs: {
    flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#1C2640',
    paddingHorizontal: SPACING.lg,
  },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: SPACING.sm, paddingRight: SPACING.xl,
    borderBottomWidth: 2, borderBottomColor: 'transparent', marginBottom: -1,
  },
  tabActive: { borderBottomWidth: 2 },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted },
  contentScroll: { flex: 1 },
  titleBanner: { padding: SPACING.lg, paddingBottom: SPACING.md },
  topicTitle: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary },
  contentBody: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg },
  sectionHeader: {
    fontSize: 15, fontWeight: '800', color: COLORS.textPrimary,
    marginTop: SPACING.lg, marginBottom: SPACING.sm,
    letterSpacing: 0.5,
  },
  bulletRow: { flexDirection: 'row', marginBottom: 6, paddingLeft: 8 },
  bullet: { fontSize: 16, marginRight: 8, lineHeight: 22 },
  bulletText: { flex: 1, fontSize: 14, color: COLORS.textSecondary, lineHeight: 22 },
  numbered: { fontSize: 14, fontWeight: '700', marginVertical: 4, lineHeight: 22 },
  noteLine: { fontSize: 14, color: COLORS.textSecondary, marginVertical: 3, fontStyle: 'italic' },
  formulaBox: {
    backgroundColor: COLORS.bg2, borderRadius: RADIUS.md,
    borderLeftWidth: 3, padding: SPACING.md,
    marginVertical: 6,
  },
  formulaText: { fontSize: 14, fontFamily: 'monospace', fontWeight: '700' },
  bodyText: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 22, marginVertical: 2 },
  completeBtn: { marginHorizontal: SPACING.lg, marginVertical: SPACING.md },
  completeBtnInner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: RADIUS.lg, paddingVertical: 14,
  },
  completeBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  completedBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 12, margin: SPACING.lg,
    backgroundColor: COLORS.success + '11', borderRadius: RADIUS.lg,
  },
  completedText: { color: COLORS.success, fontWeight: '700', fontSize: 15 },
  quizCta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginHorizontal: SPACING.lg, marginBottom: SPACING.md,
    paddingVertical: 12, borderRadius: RADIUS.lg, borderWidth: 1, borderColor: '#1C2640',
  },
  quizCtaText: { fontWeight: '700', fontSize: 14 },
  // Quiz styles
  noQuiz: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  noQuizText: { color: COLORS.textMuted },
  quizContainer: { padding: SPACING.lg },
  quizProgressRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md, gap: 8 },
  quizProgress: { fontSize: 13, color: COLORS.textMuted, minWidth: 40 },
  quizProgressBar: { flex: 1, height: 6, backgroundColor: COLORS.bg3, borderRadius: 3 },
  quizProgressFill: { height: '100%', borderRadius: 3 },
  quizScore: { fontSize: 13, fontWeight: '700', minWidth: 36, textAlign: 'right' },
  questionCard: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.xl,
    padding: SPACING.lg, marginBottom: SPACING.md,
    borderTopWidth: 3, borderWidth: 1, borderColor: '#1C2640',
  },
  questionText: { fontSize: 16, color: COLORS.textPrimary, lineHeight: 24, fontWeight: '600' },
  optionBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: RADIUS.lg, padding: SPACING.md,
    marginBottom: SPACING.sm, borderWidth: 1.5,
  },
  optionLetter: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1.5,
  },
  optionLetterText: { fontSize: 13, fontWeight: '800' },
  optionText: { flex: 1, fontSize: 14, lineHeight: 20 },
  explanationBox: {
    borderRadius: RADIUS.md, padding: SPACING.md,
    marginVertical: SPACING.sm, borderWidth: 1,
    backgroundColor: COLORS.bg2,
  },
  explanationText: { fontSize: 14, fontWeight: '600' },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: RADIUS.lg, paddingVertical: 16,
    marginTop: SPACING.sm,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  // Result screen
  resultContainer: { padding: SPACING.lg, alignItems: 'center' },
  resultCard: {
    width: '100%', backgroundColor: COLORS.bg1,
    borderRadius: RADIUS.xl, padding: SPACING.xl,
    alignItems: 'center', borderWidth: 2,
  },
  resultEmoji: { fontSize: 52, marginBottom: 8 },
  resultTitle: { fontSize: 24, fontWeight: '800', color: COLORS.textPrimary, marginBottom: SPACING.lg },
  scoreCircle: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 4,
    alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg,
  },
  scoreNum: { fontSize: 32, fontWeight: '800' },
  scoreLabel: { fontSize: 13, color: COLORS.textMuted },
  resultSubtitle: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.xl },
  reviewList: { width: '100%', marginBottom: SPACING.xl },
  reviewItem: {
    backgroundColor: COLORS.bg2, borderRadius: RADIUS.md,
    padding: SPACING.md, marginBottom: SPACING.sm, borderLeftWidth: 3,
  },
  reviewQ: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 },
  reviewA: { fontSize: 13, fontWeight: '600' },
  reviewCorrect: { fontSize: 12, color: COLORS.success, marginTop: 2 },
  restartBtn: {
    backgroundColor: COLORS.bg3, borderRadius: RADIUS.lg,
    paddingVertical: 12, paddingHorizontal: SPACING.xl,
  },
  restartBtnText: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
});
