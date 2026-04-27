// src/screens/main/FormulaScreen.js
import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  TextInput, StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FORMULAS, GLOSSARY } from '../../data/content';
import { COLORS, RADIUS, SPACING } from '../../utils/theme';

const FORMULA_CATS = ['All', ...new Set(FORMULAS.map(f => f.cat))];

export default function FormulaScreen() {
  const [activeTab, setActiveTab] = useState('formulas');
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filteredFormulas = useMemo(() => {
    let list = activeCat === 'All' ? FORMULAS : FORMULAS.filter(f => f.cat === activeCat);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q) ||
        f.use.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCat, search]);

  const filteredGlossary = useMemo(() => {
    if (!search.trim()) return GLOSSARY;
    const q = search.toLowerCase();
    return GLOSSARY.filter(g =>
      g.term.toLowerCase().includes(q) ||
      g.def.toLowerCase().includes(q)
    );
  }, [search]);

  const CAT_COLORS = {
    'Central Tendency': '#00D4AA',
    'Dispersion': '#4F9DFF',
    'Probability': '#845EF7',
    'Distributions': '#FF6B6B',
    'Inference': '#FFA94D',
    'Regression': '#51CF66',
  };

  return (
    <LinearGradient colors={['#0A0E1A', '#0F1626']} style={styles.bg}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Reference</Text>
        <Text style={styles.headerSub}>{FORMULAS.length} formulas • {GLOSSARY.length} terms</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color={COLORS.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search formulas or terms..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[['formulas', 'calculator-outline', 'Formulas'], ['glossary', 'text-outline', 'Glossary']].map(([tab, icon, label]) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Ionicons name={icon} size={15} color={activeTab === tab ? COLORS.teal : COLORS.textMuted} />
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'formulas' ? (
        <>
          {/* Category Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catRow}>
            {FORMULA_CATS.map(cat => {
              const color = CAT_COLORS[cat] || COLORS.teal;
              const isActive = activeCat === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catChip, isActive && { backgroundColor: color + '33', borderColor: color }]}
                  onPress={() => setActiveCat(cat)}
                >
                  <Text style={[styles.catChipText, isActive && { color }]}>{cat}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
            {filteredFormulas.map((f, i) => {
              const color = CAT_COLORS[f.cat] || COLORS.teal;
              return (
                <View key={i} style={[styles.formulaCard, { borderLeftColor: color }]}>
                  <View style={styles.formulaHeader}>
                    <Text style={styles.formulaName}>{f.name}</Text>
                    <View style={[styles.catTag, { backgroundColor: color + '22' }]}>
                      <Text style={[styles.catTagText, { color }]}>{f.cat}</Text>
                    </View>
                  </View>
                  <View style={[styles.formulaBox, { backgroundColor: color + '11' }]}>
                    <Text style={[styles.formulaStr, { color }]}>{f.formula}</Text>
                  </View>
                  <Text style={styles.formulaUse}>{f.use}</Text>
                </View>
              );
            })}
            {filteredFormulas.length === 0 && (
              <View style={styles.empty}>
                <Text style={styles.emptyText}>No formulas found for "{search}"</Text>
              </View>
            )}
            <View style={{ height: 80 }} />
          </ScrollView>
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
          {filteredGlossary.map((g, i) => (
            <View key={i} style={styles.glossaryCard}>
              <Text style={styles.glossaryTerm}>{g.term}</Text>
              <Text style={styles.glossaryDef}>{g.def}</Text>
            </View>
          ))}
          {filteredGlossary.length === 0 && (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No terms found for "{search}"</Text>
            </View>
          )}
          <View style={{ height: 80 }} />
        </ScrollView>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  header: { paddingTop: 50, paddingHorizontal: SPACING.lg, paddingBottom: SPACING.sm },
  headerTitle: { fontSize: 26, fontWeight: '800', color: COLORS.textPrimary },
  headerSub: { fontSize: 13, color: COLORS.textMuted, marginTop: 2 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg, marginVertical: SPACING.sm,
    paddingHorizontal: SPACING.md, borderWidth: 1, borderColor: '#1C2640',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: COLORS.textPrimary, fontSize: 14, paddingVertical: 12 },
  tabs: { flexDirection: 'row', paddingHorizontal: SPACING.lg, borderBottomWidth: 1, borderBottomColor: '#1C2640' },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: SPACING.sm, paddingRight: SPACING.xl,
    borderBottomWidth: 2, borderBottomColor: 'transparent', marginBottom: -1,
  },
  tabActive: { borderBottomColor: COLORS.teal },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.textMuted },
  tabTextActive: { color: COLORS.teal },
  catScroll: { maxHeight: 50 },
  catRow: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, gap: 8, flexDirection: 'row' },
  catChip: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: '#1C2640',
    backgroundColor: COLORS.bg2,
  },
  catChipText: { fontSize: 12, color: COLORS.textMuted, fontWeight: '600' },
  list: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  formulaCard: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderLeftWidth: 3, borderWidth: 1, borderColor: '#1C2640',
  },
  formulaHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  formulaName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, flex: 1 },
  catTag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  catTagText: { fontSize: 10, fontWeight: '700' },
  formulaBox: { borderRadius: RADIUS.sm, padding: 10, marginBottom: 8 },
  formulaStr: { fontSize: 15, fontFamily: 'monospace', fontWeight: '700' },
  formulaUse: { fontSize: 12, color: COLORS.textMuted },
  glossaryCard: {
    backgroundColor: COLORS.bg1, borderRadius: RADIUS.lg,
    padding: SPACING.md, marginBottom: SPACING.sm,
    borderWidth: 1, borderColor: '#1C2640',
  },
  glossaryTerm: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 6 },
  glossaryDef: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },
  empty: { paddingVertical: SPACING.xl, alignItems: 'center' },
  emptyText: { color: COLORS.textMuted, fontSize: 14 },
});
