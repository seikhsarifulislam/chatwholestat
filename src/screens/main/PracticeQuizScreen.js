// src/screens/main/PracticeQuizScreen.js
import React, { useState, useMemo, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CHAPTERS, ALL_QUIZ_QUESTIONS } from '../../data/content';
import { useAuth } from '../../context/AuthContext';
import { COLORS, RADIUS, SPACING } from '../../utils/theme';
import ProgressBar from '../../components/ProgressBar';

const MODES = [
  { id: 'all',      label: 'All Topics',    icon: '🎯', desc: '10 random questions from everything', count: 10 },
  { id: 'chapter',  label: 'By Chapter',    icon: '📚', desc: 'Pick a chapter to focus on',          count: null },
  { id: 'quick',    label: 'Quick Fire',    icon: '⚡', desc: '5 questions — fast pace!',             count: 5 },
  { id: 'marathon', label: 'Marathon',      icon: '🏃', desc: '20 questions — full challenge',        count: 20 },
];

export default function PracticeQuizScreen({ navigation }) {
  const [mode, setMode] = useState(null);          // selected MODES entry
  const [selChapter, setSelChapter] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { saveQuizResult } = useAuth();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  /* ─── build question set ─────────────────────────────────────── */
  const buildQuestions = (m, ch) => {
    let pool = [];
    if (m.id === 'chapter' && ch) {
      const chObj = CHAPTERS.find(c => c.id === ch);
      pool = ALL_QUIZ_QUESTIONS.filter(q => q.chId === ch);
    } else {
      pool = [...ALL_QUIZ_QUESTIONS];
    }
    // shuffle
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const count = m.count || Math.min(10, shuffled.length);
    setQuestions(shuffled.slice(0, count));
    setStarted(true);
    resetState();
  };

  const resetState = () => {
    setCurrent(0); setSelected(null); setAnswered(false);
    setScore(0); setFinished(false); setAnswers([]);
  };

  const handleRestart = () => {
    setMode(null); setSelChapter(null);
    setStarted(false); resetState();
  };

  /* ─── quiz logic ─────────────────────────────────────────────── */
  const q = questions[current];
  const chapterOf = q ? CHAPTERS.find(ch => ch.id === q.chId) : null;

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.ans) setScore(s => s + 1);
    setAnswers(prev => [...prev, {
      question: q.q, opts: q.opts,
      selected: idx, correct: idx === q.ans, correctAns: q.ans,
      chapterColor: chapterOf?.color || COLORS.teal,
      chapterTitle: chapterOf?.title || '',
    }]);
  };

  const handleNext = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const pct = Math.round((score / questions.length) * 100);
      saveQuizResult('practice', pct, 100);
      setFinished(true);
    }
  };

  /* ─── MODE SELECT ─────────────────────────────────────────────── */
  if (!started) {
    return (
      <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
        <StatusBar barStyle="light-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modeHeader}>
            <Text style={styles.modeTitle}>🧠 Practice Quiz</Text>
            <Text style={styles.modeSub}>Test your statistics knowledge</Text>
          </View>

          {/* Mode Cards */}
          <View style={styles.modeSection}>
            <Text style={styles.modeSectionLabel}>Choose Mode</Text>
            {MODES.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[styles.modeCard, mode?.id === m.id && styles.modeCardActive]}
                onPress={() => { setMode(m); setSelChapter(null); }}
                activeOpacity={0.8}
              >
                <Text style={styles.modeCardIcon}>{m.icon}</Text>
                <View style={styles.modeCardInfo}>
                  <Text style={styles.modeCardLabel}>{m.label}</Text>
                  <Text style={styles.modeCardDesc}>{m.desc}</Text>
                </View>
                {mode?.id === m.id && (
                  <Ionicons name="checkmark-circle" size={22} color={COLORS.teal} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Chapter Picker */}
          {mode?.id === 'chapter' && (
            <View style={styles.modeSection}>
              <Text style={styles.modeSectionLabel}>Select Chapter</Text>
              {CHAPTERS.map(ch => {
                const qCount = ALL_QUIZ_QUESTIONS.filter(q => q.chId === ch.id).length;
                return (
                  <TouchableOpacity
                    key={ch.id}
                    style={[styles.chapterPick, selChapter === ch.id && { borderColor: ch.color, backgroundColor: ch.bg }]}
                    onPress={() => setSelChapter(ch.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.chPickEmoji}>{ch.emoji}</Text>
                    <View style={styles.chPickInfo}>
                      <Text style={styles.chPickTitle}>{ch.title}</Text>
                      <Text style={styles.chPickCount}>{qCount} questions available</Text>
                    </View>
                    {selChapter === ch.id && (
                      <Ionicons name="checkmark-circle" size={18} color={ch.color} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Start Button */}
          {mode && (mode.id !== 'chapter' || selChapter) && (
            <View style={styles.startBtnWrap}>
              <TouchableOpacity onPress={() => buildQuestions(mode, selChapter)} activeOpacity={0.85}>
                <LinearGradient
                  colors={['#00D4AA', '#0099CC']}
                  style={styles.startBtn}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="play" size={20} color="#fff" />
                  <Text style={styles.startBtnText}>Start Quiz</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      </LinearGradient>
    );
  }

  /* ─── FINISHED SCREEN ────────────────────────────────────────── */
  if (finished) {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 60;
    return (
      <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.resultWrap}>
          <View style={[styles.resultCard, { borderColor: passed ? COLORS.success : COLORS.warning }]}>
            <Text style={styles.resultEmoji}>{pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : pct >= 50 ? '📖' : '💪'}</Text>
            <Text style={styles.resultTitle}>
              {pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Great Job!' : pct >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
            </Text>

            <View style={[styles.scoreCircle, { borderColor: passed ? COLORS.success : COLORS.warning }]}>
              <Text style={[styles.scoreNum, { color: passed ? COLORS.success : COLORS.warning }]}>{pct}%</Text>
              <Text style={styles.scoreLabel}>{score}/{total} correct</Text>
            </View>

            {/* Stats Row */}
            <View style={styles.resultStats}>
              {[
                { label: 'Correct', value: score, color: COLORS.success },
                { label: 'Wrong', value: total - score, color: COLORS.error },
                { label: 'Accuracy', value: `${pct}%`, color: COLORS.teal },
              ].map((s, i) => (
                <View key={i} style={styles.resultStat}>
                  <Text style={[styles.resultStatVal, { color: s.color }]}>{s.value}</Text>
                  <Text style={styles.resultStatLabel}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Answer Review */}
            <Text style={styles.reviewTitle}>Answer Review</Text>
            {answers.map((a, i) => (
              <View key={i} style={[styles.reviewItem, { borderLeftColor: a.correct ? COLORS.success : COLORS.error }]}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewQNum}>Q{i + 1}</Text>
                  <Text style={[styles.reviewBadge, {
                    backgroundColor: (a.correct ? COLORS.success : COLORS.error) + '22',
                    color: a.correct ? COLORS.success : COLORS.error,
                  }]}>
                    {a.correct ? '✓ Correct' : '✗ Wrong'}
                  </Text>
                </View>
                <Text style={styles.reviewQ} numberOfLines={3}>{a.question}</Text>
                {!a.correct && (
                  <Text style={styles.reviewAnswer}>
                    Your answer: <Text style={{ color: COLORS.error }}>{a.opts[a.selected]}</Text>
                    {'\n'}Correct: <Text style={{ color: COLORS.success }}>{a.opts[a.correctAns]}</Text>
                  </Text>
                )}
              </View>
            ))}

            {/* Buttons */}
            <View style={styles.resultBtns}>
              <TouchableOpacity onPress={handleRestart} style={styles.tryAgainBtn}>
                <Ionicons name="refresh" size={16} color={COLORS.teal} />
                <Text style={styles.tryAgainText}>New Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => buildQuestions(mode, selChapter)} style={styles.sameBtn}>
                <Ionicons name="repeat" size={16} color={COLORS.textPrimary} />
                <Text style={styles.sameBtnText}>Retry Same</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 80 }} />
        </ScrollView>
      </LinearGradient>
    );
  }

  /* ─── ACTIVE QUIZ ────────────────────────────────────────────── */
  const color = chapterOf?.color || COLORS.teal;
  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
      <StatusBar barStyle="light-content" />

      {/* Top Bar */}
      <View style={styles.quizTopBar}>
        <TouchableOpacity onPress={handleRestart} style={styles.quitBtn}>
          <Ionicons name="close" size={20} color={COLORS.textMuted} />
        </TouchableOpacity>
        <View style={styles.quizProgressWrap}>
          <ProgressBar progress={(current) / questions.length} color={color} height={6} />
        </View>
        <View style={[styles.scorePill, { backgroundColor: color + '22' }]}>
          <Text style={[styles.scorePillText, { color }]}>{score} pts</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.quizBody} showsVerticalScrollIndicator={false}>
        {/* Chapter + Progress Label */}
        <View style={styles.qMeta}>
          <Text style={[styles.qChapter, { color }]}>
            {chapterOf?.emoji} {chapterOf?.title}
          </Text>
          <Text style={styles.qCounter}>{current + 1} / {questions.length}</Text>
        </View>

        {/* Question Card */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={[styles.questionCard, { borderTopColor: color }]}>
            <Text style={styles.questionText}>{q.q}</Text>
          </View>

          {/* Options */}
          {q.opts.map((opt, idx) => {
            let bg = COLORS.bg2;
            let border = '#1C2640';
            let textColor = COLORS.textPrimary;
            let icon = null;
            if (answered) {
              if (idx === q.ans) {
                bg = COLORS.success + '1A'; border = COLORS.success; textColor = COLORS.success;
                icon = <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />;
              } else if (idx === selected) {
                bg = COLORS.error + '1A'; border = COLORS.error; textColor = COLORS.error;
                icon = <Ionicons name="close-circle" size={18} color={COLORS.error} />;
              }
            } else if (selected === idx) {
              bg = color + '1A'; border = color;
            }

            return (
              <TouchableOpacity
                key={idx}
                style={[styles.optBtn, { backgroundColor: bg, borderColor: border }]}
                onPress={() => handleSelect(idx)}
                activeOpacity={answered ? 1 : 0.75}
              >
                <View style={[styles.optLetter, { backgroundColor: border + '33', borderColor: border }]}>
                  <Text style={[styles.optLetterText, { color: border === '#1C2640' ? COLORS.textMuted : border }]}>
                    {['A', 'B', 'C', 'D'][idx]}
                  </Text>
                </View>
                <Text style={[styles.optText, { color: textColor }]}>{opt}</Text>
                {icon}
              </TouchableOpacity>
            );
          })}

          {/* Feedback */}
          {answered && (
            <View style={[styles.feedbackBox, {
              backgroundColor: (selected === q.ans ? COLORS.success : COLORS.error) + '11',
              borderColor: selected === q.ans ? COLORS.success : COLORS.error,
            }]}>
              <Ionicons
                name={selected === q.ans ? 'checkmark-circle' : 'information-circle'}
                size={18}
                color={selected === q.ans ? COLORS.success : COLORS.error}
              />
              <Text style={[styles.feedbackText, {
                color: selected === q.ans ? COLORS.success : COLORS.textSecondary,
              }]}>
                {selected === q.ans
                  ? 'Correct! Well done.'
                  : `Correct answer: ${q.opts[q.ans]}`
                }
              </Text>
            </View>
          )}

          {/* Next Button */}
          {answered && (
            <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
              <LinearGradient
                colors={[color, color + 'BB']}
                style={styles.nextBtn}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextBtnText}>
                  {current < questions.length - 1 ? 'Next Question' : 'View Results'}
                </Text>
                <Ionicons name="arrow-forward" size={18} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },

  /* Mode select */
  modeHeader: { paddingTop: 55, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md },
  modeTitle: { fontSize: 28, fontWeight: '800', color: COLORS.textPrimary },
  modeSub: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
  modeSection: { paddingHorizontal: SPACING.lg, marginTop: SPACING.lg },
  modeSectionLabel: { fontSize: 13, color: COLORS.textMuted, fontWeight: '700', marginBottom: SPACING.sm, textTransform: 'uppercase', letterSpacing: 1 },
  modeCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.xl,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderWidth: 1.5, borderColor: '#1C2640', gap: SPACING.md,
  },
  modeCardActive: { borderColor: COLORS.teal, backgroundColor: '#00D4AA08' },
  modeCardIcon: { fontSize: 28 },
  modeCardInfo: { flex: 1 },
  modeCardLabel: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  modeCardDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  chapterPick: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderWidth: 1.5, borderColor: '#1C2640', gap: SPACING.sm,
  },
  chPickEmoji: { fontSize: 22 },
  chPickInfo: { flex: 1 },
  chPickTitle: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary },
  chPickCount: { fontSize: 11, color: COLORS.textMuted },
  startBtnWrap: { paddingHorizontal: SPACING.lg, marginTop: SPACING.xl },
  startBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, borderRadius: RADIUS.lg, paddingVertical: 16,
  },
  startBtnText: { color: '#fff', fontSize: 17, fontWeight: '800' },

  /* Active quiz */
  quizTopBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 52, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.md,
    gap: SPACING.md,
  },
  quitBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: COLORS.bg2, alignItems: 'center', justifyContent: 'center',
  },
  quizProgressWrap: { flex: 1 },
  scorePill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  scorePillText: { fontSize: 13, fontWeight: '800' },
  quizBody: { paddingHorizontal: SPACING.lg, paddingBottom: 80 },
  qMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  qChapter: { fontSize: 12, fontWeight: '700' },
  qCounter: { fontSize: 12, color: COLORS.textMuted },
  questionCard: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.xl,
    padding: SPACING.lg, marginBottom: SPACING.md,
    borderTopWidth: 3, borderWidth: 1, borderColor: '#1C2640',
  },
  questionText: { fontSize: 17, fontWeight: '700', color: COLORS.textPrimary, lineHeight: 26 },
  optBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: RADIUS.lg, padding: SPACING.md,
    marginBottom: SPACING.sm, borderWidth: 1.5,
  },
  optLetter: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', borderWidth: 1.5,
  },
  optLetterText: { fontSize: 13, fontWeight: '800' },
  optText: { flex: 1, fontSize: 14, lineHeight: 20 },
  feedbackBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    borderRadius: RADIUS.md, padding: SPACING.md,
    marginVertical: SPACING.sm, borderWidth: 1,
  },
  feedbackText: { flex: 1, fontSize: 13, lineHeight: 20 },
  nextBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: RADIUS.lg, paddingVertical: 16, marginTop: 4,
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },

  /* Results */
  resultWrap: { padding: SPACING.lg, alignItems: 'center', paddingTop: 50 },
  resultCard: {
    width: '100%', backgroundColor: COLORS.bg1,
    borderRadius: RADIUS.xl, padding: SPACING.xl,
    alignItems: 'center', borderWidth: 2,
  },
  resultEmoji: { fontSize: 56, marginBottom: 8 },
  resultTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary, marginBottom: SPACING.lg },
  scoreCircle: {
    width: 120, height: 120, borderRadius: 60, borderWidth: 4,
    alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.lg,
  },
  scoreNum: { fontSize: 32, fontWeight: '800' },
  scoreLabel: { fontSize: 13, color: COLORS.textMuted },
  resultStats: {
    flexDirection: 'row', justifyContent: 'space-around',
    width: '100%', marginBottom: SPACING.xl,
    backgroundColor: COLORS.bg2, borderRadius: RADIUS.lg, paddingVertical: SPACING.md,
  },
  resultStat: { alignItems: 'center' },
  resultStatVal: { fontSize: 22, fontWeight: '800' },
  resultStatLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  reviewTitle: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary, alignSelf: 'flex-start', marginBottom: SPACING.sm },
  reviewItem: {
    width: '100%', backgroundColor: COLORS.bg2, borderRadius: RADIUS.md,
    padding: SPACING.md, marginBottom: SPACING.sm, borderLeftWidth: 3,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  reviewQNum: { fontSize: 11, color: COLORS.textMuted, fontWeight: '700' },
  reviewBadge: { fontSize: 10, fontWeight: '800', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  reviewQ: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 4 },
  reviewAnswer: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  resultBtns: { flexDirection: 'row', gap: 12, marginTop: SPACING.lg, width: '100%' },
  tryAgainBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: RADIUS.lg, paddingVertical: 13,
    borderWidth: 1.5, borderColor: COLORS.teal,
  },
  tryAgainText: { color: COLORS.teal, fontWeight: '700', fontSize: 14 },
  sameBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, borderRadius: RADIUS.lg, paddingVertical: 13,
    backgroundColor: COLORS.bg3,
  },
  sameBtnText: { color: COLORS.textPrimary, fontWeight: '700', fontSize: 14 },
});
