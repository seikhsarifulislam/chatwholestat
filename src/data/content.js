// src/data/content.js
// Full Statistics Learning Content — 10 Chapters, 31 Topics

export const CHAPTERS = [
  {
    id: 'ch01', emoji: '📐', title: 'Foundations of Statistics', level: 'Beginner',
    color: '#00D4AA', bg: '#00D4AA18',
    desc: 'Core concepts, data types, sampling, experimental design, and visualization.',
    topics: [
      {
        id: 't001', title: 'What is Statistics?', mins: 10, pages: 4,
        content: `Statistics is the science of collecting, organizing, analyzing, interpreting, and presenting data to make decisions under uncertainty.

▌ TWO MAIN BRANCHES

① Descriptive Statistics
Summarizes and describes observed data without making conclusions beyond it.
• Computing averages, medians, frequencies
• Drawing histograms, bar charts, pie charts
• Reporting min, max, range, standard deviation

② Inferential Statistics
Uses sample data to make inferences about a larger population.
• Hypothesis testing
• Confidence intervals
• Regression and prediction

▌ THE PPDAC CYCLE

Problem → Plan → Data → Analysis → Conclusion

▌ KEY TERMINOLOGY

Population (N): Every member of the group you want to study.
Sample (n): A subset of the population selected for study.
Parameter: A numerical fact about the population (often unknown).
Statistic: A numerical fact computed from a sample.

▌ REAL-WORLD EXAMPLE

You want to know the average height of all 1.4 billion Indians.
• Population = all 1.4 billion people
• Sample = measure 10,000 people randomly
• Statistic = average height of your 10,000 (e.g., 164 cm)
• Parameter = the true average of all 1.4 billion (unknown, estimated)

▌ WHY STATISTICS MATTERS

Medicine → Clinical trials determine if drugs work
Business → Market research guides product decisions
Government → Census informs policy
AI/ML → Model training and evaluation
Sports → Player performance analytics
Finance → Risk modeling and portfolio theory`,
        quiz: [
          { q: 'What branch uses sample data to draw conclusions about a population?', opts: ['Descriptive', 'Computational', 'Inferential', 'Exploratory'], ans: 2 },
          { q: 'A numerical fact about a population is called a:', opts: ['Statistic', 'Variable', 'Parameter', 'Sample'], ans: 2 },
          { q: 'The PPDAC cycle stands for:', opts: ['Plan-Process-Data-Apply-Check', 'Problem-Plan-Data-Analysis-Conclusion', 'Prepare-Plan-Describe-Analyze-Confirm', 'Process-Predict-Data-Apply-Conclude'], ans: 1 },
          { q: 'A subset of a population selected for study is:', opts: ['Parameter', 'Census', 'Sample', 'Variable'], ans: 2 },
        ]
      },
      {
        id: 't002', title: 'Types of Data & Measurement Scales', mins: 12, pages: 5,
        content: `Understanding data types determines which statistical methods are valid.

▌ QUALITATIVE (CATEGORICAL) DATA

① Nominal Scale — Categories with NO natural order
Examples: Blood type (A/B/AB/O), Gender, Country, Eye color
Operations: Count, frequency, mode, chi-square

② Ordinal Scale — Categories WITH order, but gaps are NOT equal
Examples: Education level, Satisfaction rating, Military rank
Operations: Median, percentile, Spearman correlation

▌ QUANTITATIVE (NUMERICAL) DATA

③ Interval Scale — Equal intervals, NO TRUE ZERO (zero is arbitrary)
Examples: Temperature in °C, Calendar years, IQ scores
"30°C is 10° warmer than 20°C" ✓
"30°C is twice as hot as 15°C" ✗

④ Ratio Scale — Equal intervals AND TRUE ZERO (zero = absence)
Examples: Height, Weight, Distance, Age, Income, Speed
"80kg is twice 40kg" ✓ All arithmetic valid!

▌ DISCRETE vs CONTINUOUS

Discrete: Countable whole numbers (number of children: 0, 1, 2...)
Continuous: Any value in a range (height = 171.3 cm, 171.31 cm...)

▌ QUICK REFERENCE TABLE

Scale    | Order? | Equal gaps? | True zero? | Example
---------|--------|-------------|------------|--------
Nominal  |  No    |    No       |    No      | Blood type
Ordinal  |  Yes   |    No       |    No      | Star rating
Interval |  Yes   |    Yes      |    No      | Temperature °C
Ratio    |  Yes   |    Yes      |    Yes     | Height in cm`,
        quiz: [
          { q: 'Temperature in Celsius is measured on which scale?', opts: ['Nominal', 'Ordinal', 'Interval', 'Ratio'], ans: 2 },
          { q: 'Customer satisfaction rated 1-5 stars is:', opts: ['Nominal', 'Ordinal', 'Interval', 'Ratio'], ans: 1 },
          { q: 'Height in centimeters is:', opts: ['Discrete interval', 'Continuous ratio', 'Discrete ordinal', 'Continuous nominal'], ans: 1 },
          { q: 'Number of cars in a parking lot is:', opts: ['Continuous ratio', 'Discrete ratio', 'Continuous interval', 'Discrete nominal'], ans: 1 },
          { q: 'Which scale has a TRUE zero point?', opts: ['Nominal', 'Ordinal', 'Interval', 'Ratio'], ans: 3 },
        ]
      },
      {
        id: 't003', title: 'Sampling Methods', mins: 14, pages: 6,
        content: `A sample is our window into the population. Sample quality determines conclusion validity.

▌ PROBABILITY SAMPLING

① Simple Random Sampling (SRS)
Every individual has equal chance of selection.
Method: Random number generator from complete list.

② Systematic Sampling
Select every k-th element. k = N/n
Example: N=5000, n=100 → k=50. Pick random start, then every 50th.

③ Stratified Sampling
Divide into homogeneous subgroups (strata). Sample proportionally.
Guarantees all subgroups are represented!

④ Cluster Sampling
Randomly select ENTIRE groups. Study all members in chosen groups.
Cost-effective for geographically spread populations.

⑤ Multi-Stage Sampling
Multiple probability stages. Used in national surveys (India Census, NFHS).

▌ NON-PROBABILITY SAMPLING (Avoid for inference!)

Convenience: Survey whoever is nearby → Selection bias
Voluntary: People who choose to respond → Opinion extremes
Snowball: Participants recruit others → Network bias

▌ MARGIN OF ERROR

MOE = z* × √(p(1-p)/n)
For 95% CI with p=0.5: n ≥ (1.96/MOE)² × 0.25
To get MOE ≤ 3%: n ≥ 1,068 people`,
        quiz: [
          { q: 'In systematic sampling with N=2000, n=40, k=', opts: ['20', '40', '50', '80'], ans: 2 },
          { q: 'Which method guarantees every subgroup is represented?', opts: ['Simple Random', 'Systematic', 'Stratified', 'Convenience'], ans: 2 },
          { q: 'Cluster sampling selects:', opts: ['Random individuals', 'Entire randomly selected groups', 'Every k-th person', 'Volunteers'], ans: 1 },
          { q: 'Sampling error can be reduced by:', opts: ['Better wording', 'Increasing sample size', 'Cluster sampling', 'Removing outliers'], ans: 1 },
          { q: 'Convenience sampling suffers from:', opts: ['Low cost', 'Selection bias', 'High accuracy', 'Random error only'], ans: 1 },
        ]
      },
      {
        id: 't004', title: 'Experimental Design', mins: 12, pages: 5,
        content: `A well-designed experiment is the only way to establish CAUSATION.

▌ OBSERVATIONAL STUDY vs EXPERIMENT

Observational Study: Observer but does NOT control/assign treatments.
→ Can find correlations but NOT causation.

Experiment: Researcher CONTROLS and ASSIGNS treatments.
→ Can establish causation!

▌ THREE PRINCIPLES

① CONTROL: Hold all variables constant EXCEPT the treatment.
② RANDOMIZATION: Randomly assign units to treatments — balances ALL confounders!
③ REPLICATION: Multiple units per group reduces random variation.

▌ BLINDING

Single-blind: Participants don't know their treatment → eliminates placebo effect.
Double-blind: BOTH participants AND measurers don't know → GOLD STANDARD.

▌ EXPERIMENTAL DESIGNS

CRD (Completely Randomized): All units randomly assigned. Simplest.
RBD (Randomized Block): Block similar units first, then randomize within blocks.
Factorial: Tests MULTIPLE factors × all combinations. Detects INTERACTIONS.
Crossover: Each subject receives ALL treatments. Own control. Very powerful.

▌ CONFOUNDING

A variable related to BOTH treatment AND outcome → causes spurious associations.
Ice cream sales correlated with drowning? Confounder = Temperature!
Solution: RANDOMIZATION eliminates confounding in experiments.`,
        quiz: [
          { q: 'What distinguishes experiment from observational study?', opts: ['Sample size', 'Researcher assigns treatments', 'Use of statistics', 'Random sampling'], ans: 1 },
          { q: 'Double-blind means:', opts: ['Two groups', 'Both participants and measurers are blinded', 'Two treatments', 'Two replications'], ans: 1 },
          { q: 'Main purpose of randomization:', opts: ['Increase sample size', 'Balance confounding variables', 'Reduce cost', 'Simplify analysis'], ans: 1 },
          { q: 'Randomized Block Design controls for:', opts: ['Multiple factors', 'A known nuisance variable', 'Treatment effects', 'Measurement error'], ans: 1 },
          { q: 'Which design tests multiple factors AND interactions?', opts: ['CRD', 'Crossover', 'Factorial', 'Block'], ans: 2 },
        ]
      },
      {
        id: 't005', title: 'Data Visualization', mins: 14, pages: 6,
        content: `"A picture is worth a thousand data points." — Visualization reveals what numbers hide.

▌ CHARTS FOR CATEGORICAL DATA

Bar Chart: Separated bars; compare counts across categories.
Pie Chart: Parts of whole; best with ≤6 categories.
Pareto Chart: Sorted bars + cumulative % line; 80/20 rule.

▌ CHARTS FOR QUANTITATIVE DATA

Histogram: Bars TOUCH; continuous data; shape reveals distribution.
Box Plot: Shows Min, Q1, Median, Q3, Max + outliers. Compare groups!
Scatter Plot: Two quant. variables; reveals direction, strength, form.
Line Graph: Time on x-axis; trends, cycles, seasonal patterns.

▌ DISTRIBUTION SHAPES

Symmetric: Mean = Median = Mode (bell shape)
Right-skewed (+): Long tail RIGHT; Mean > Median. (Income, house prices)
Left-skewed (−): Long tail LEFT; Mean < Median. (Age at death, easy exams)
Bimodal: Two peaks → often two subgroups mixed.
Uniform: Flat; all values equally likely.

▌ TUFTE'S PRINCIPLES

1. Maximize data-ink ratio — show data, not decoration
2. Avoid chartjunk — no 3D effects, unnecessary gridlines
3. Label clearly — axes, units, title
4. Appropriate scale — never truncate y-axis to exaggerate!
5. Color purposefully — use colorblind-friendly palettes`,
        quiz: [
          { q: 'Which chart uses bars that TOUCH to show continuous data?', opts: ['Bar chart', 'Pareto chart', 'Histogram', 'Dot plot'], ans: 2 },
          { q: 'A right-skewed distribution has:', opts: ['Mean=Median', 'Mean<Median', 'Mean>Median', 'No relationship'], ans: 2 },
          { q: 'Box plots are especially useful for:', opts: ['Showing exact values', 'Comparing distributions across groups', 'Time series', 'Pie proportions'], ans: 1 },
          { q: "Tufte's data-ink ratio principle means:", opts: ['Use colorful ink', 'Maximize informative ink; minimize decoration', 'Print more data', 'Add gridlines'], ans: 1 },
          { q: 'A bimodal distribution has:', opts: ['One peak', 'Two peaks', 'No peaks', 'A flat shape'], ans: 1 },
        ]
      },
    ]
  },
  {
    id: 'ch02', emoji: '📊', title: 'Descriptive Statistics', level: 'Beginner',
    color: '#4F9DFF', bg: '#4F9DFF18',
    desc: 'Summarize data using measures of center, spread, position, and shape.',
    topics: [
      {
        id: 't006', title: 'Mean, Median & Mode', mins: 18, pages: 8,
        content: `The three measures of central tendency describe the "center" of data.

▌ ARITHMETIC MEAN

Formula: x̄ = Σxᵢ / n
Population: μ (mu) | Sample: x̄ (x-bar)

Example: {4,8,6,5,3,9,2,1} → Sum=38, n=8 → Mean=4.75

Properties:
• Uses EVERY data value
• Balance point of the distribution
• SENSITIVE to outliers (non-resistant)

Outlier effect: {10,12,11,13,14} → Mean=12
With outlier:   {10,12,11,13,200} → Mean=49.2 ← MISLEADING!

▌ WEIGHTED MEAN

Formula: x̄_w = Σ(wᵢxᵢ)/Σwᵢ
Example — GPA: Math(4cr,85) + English(3cr,90) + PE(1cr,70)
= (4×85+3×90+1×70)/(4+3+1) = 680/8 = 85

▌ GEOMETRIC MEAN

Formula: GM = ⁿ√(x₁×x₂×...×xₙ)
Use for: Growth rates, investment returns!
If returns are +10%, +20%, −5%:
GM = ∛(1.10×1.20×0.95) = 1.0782 → 7.82% avg growth

▌ HARMONIC MEAN

Formula: HM = n/Σ(1/xᵢ)
Use for: Rates, speeds.
Car: 60 km/h for half distance, 40 km/h for other half
HM = 2/(1/60+1/40) = 48 km/h (NOT the arithmetic mean 50!)

▌ MEDIAN

Middle value of SORTED data. RESISTANT to outliers!
Odd n: middle value. Even n: average of two middle values.
{3,1,7,5,2} → sorted: {1,2,3,5,7} → Median = 3

▌ MODE

Most frequently occurring value(s).
{3,7,7,5,3,7,2} → Mode = 7
Only valid measure for NOMINAL data!

▌ WHEN TO USE WHICH

Mean: Symmetric data, no outliers, further calculations
Median: Skewed data, outliers present (income, house prices!)
Mode: Categorical data, most common value
Geometric: Growth rates, investment returns
Harmonic: Rates, speeds

India income: Mean ≈ ₹3.2L, Median ≈ ₹1.8L
The gap shows right skew — wealthy pull mean up!`,
        quiz: [
          { q: 'Mean of {2,4,4,4,5,5,7,9} is:', opts: ['4', '4.5', '5', '5.5'], ans: 2 },
          { q: 'For income data with extreme earners, use:', opts: ['Mean', 'Mode', 'Median', 'Geometric mean'], ans: 2 },
          { q: 'In right-skewed data:', opts: ['Mean=Median=Mode', 'Mean<Median<Mode', 'Mode<Median<Mean', 'Mode=Median'], ans: 2 },
          { q: 'Geometric mean is best for:', opts: ['Average speed', 'Growth rates', 'Categorical data', 'Ranked data'], ans: 1 },
          { q: 'Median of {3,1,7,5,2} is:', opts: ['3', '4', '5', '3.6'], ans: 0 },
          { q: 'Weighted mean is used when:', opts: ['Data is symmetric', 'Values have different weights', 'All values are equal', 'n is large'], ans: 1 },
          { q: 'Mode is the ONLY valid measure for:', opts: ['Continuous data', 'Ratio data', 'Nominal data', 'Interval data'], ans: 2 },
        ]
      },
      {
        id: 't007', title: 'Measures of Spread', mins: 20, pages: 8,
        content: `Two datasets can have identical means but completely different variability.

▌ WHY SPREAD MATTERS

Dataset A: {50,50,50,50,50} → Mean=50, Spread=0
Dataset B: {10,30,50,70,90} → Mean=50, Spread=large
Identical means, completely different datasets!

▌ RANGE

Formula: Range = Max − Min
Quick but uses only 2 values; very sensitive to outliers.

▌ INTERQUARTILE RANGE (IQR)

Formula: IQR = Q3 − Q1 (range of middle 50%)
RESISTANT to outliers! Q1 and Q3 are in the middle.

Outlier detection (Tukey's fences):
Lower fence = Q1 − 1.5 × IQR
Upper fence = Q3 + 1.5 × IQR
Values beyond fences = outliers!

▌ VARIANCE

Population: σ² = Σ(xᵢ−μ)² / N
Sample:     s² = Σ(xᵢ−x̄)² / (n-1)

Why n-1? Bessel's Correction — dividing by n-1 gives UNBIASED estimate of σ².

Example: {2,4,4,4,5,5,7,9}, x̄=5
Squared deviations: {9,1,1,1,0,0,4,16} → Sum=32
s² = 32/7 = 4.57

▌ STANDARD DEVIATION

s = √s² (same units as original data!)
s = √4.57 ≈ 2.14

Interpretation: Values are typically about 2.14 units from the mean.

Empirical Rule (Normal distributions):
• Mean ± 1s: ~68% of data
• Mean ± 2s: ~95% of data
• Mean ± 3s: ~99.7% of data

▌ COEFFICIENT OF VARIATION (CV)

CV = (s/x̄) × 100% — unit-free relative measure!
Compare variability across different scales:
Heights: mean=170cm, SD=10cm → CV=5.9%
Weights: mean=70kg, SD=8kg → CV=11.4% → Weights MORE variable!

▌ Z-SCORE

z = (x − x̄) / s
Tells you how many SDs a value is from the mean.
|z| > 3 → potential outlier`,
        quiz: [
          { q: 'IQR is preferred over range because it is:', opts: ['Easier to compute', 'Resistant to outliers', 'Always larger', 'Used with normal data'], ans: 1 },
          { q: 'Why does sample variance use n-1?', opts: ['Larger result', 'Gives unbiased estimate of population variance', 'Faster computation', 'Convention only'], ans: 1 },
          { q: 'CV is used to:', opts: ['Replace SD', 'Compare variability across different scales', 'Calculate percentiles', 'Test normality'], ans: 1 },
          { q: "Tukey's outlier rule: beyond", opts: ['Mean±2SD', 'Mean±3SD', 'Q1-1.5×IQR and Q3+1.5×IQR', 'Q1-2×IQR and Q3+2×IQR'], ans: 2 },
          { q: 'z = -2.5 means:', opts: ['2.5 units below mean', '2.5 SDs above mean', '2.5 SDs below mean', 'Impossible'], ans: 2 },
          { q: 'SE = s/√n represents:', opts: ['Typical distance from mean', 'Typical variation of sample means', 'Population SD', 'Range / n'], ans: 1 },
        ]
      },
      {
        id: 't008', title: 'Percentiles & Box Plots', mins: 14, pages: 5,
        content: `Percentiles divide data into 100 equal parts. Foundation of box plots.

▌ PERCENTILES

P₂₅ = Q1: 25% of data falls below
P₅₀ = Median: 50% below (second quartile)
P₇₅ = Q3: 75% below (third quartile)

Computing P₃₀ for {2,4,5,7,8,11,14,18,20,23} (n=10):
L = (30/100)×10 = 3 → average 3rd and 4th values
P₃₀ = (5+7)/2 = 6

▌ FIVE-NUMBER SUMMARY

Min | Q1 | Median | Q3 | Max

Example: {3,7,8,14,18,19,25,31,34,42}
Min=3, Q1=11, Median=18.5, Q3=28, Max=42
→ Five-number summary: 3 | 11 | 18.5 | 28 | 42

▌ BOX PLOT CONSTRUCTION

Step 1: Draw box from Q1 to Q3
Step 2: Line inside box at Median
Step 3: Compute fences:
         Lower = Q1 − 1.5×IQR
         Upper = Q3 + 1.5×IQR
Step 4: Whiskers extend to extreme non-outlier values
Step 5: Dots beyond fences = outliers

▌ READING A BOX PLOT

Box width = IQR (middle 50%)
Median position → left side = right skew; right side = left skew
Long right whisker = right-skewed tail
Dots = potential outliers

▌ COMPARING WITH BOX PLOTS

Class A: Box 70-85, Median 78 → consistent, moderate
Class B: Box 55-90, Median 72 → highly variable
Class C: Box 80-92, Median 87 → high performing, consistent
→ Class C best; Class B most inconsistent — at a glance!`,
        quiz: [
          { q: 'The 75th percentile equals:', opts: ['Q1', 'Q2', 'Q3', 'Mean'], ans: 2 },
          { q: 'In a box plot, the box spans from:', opts: ['Min to Max', 'Q1 to Q3', 'Mean-SD to Mean+SD', '5th to 95th percentile'], ans: 1 },
          { q: 'A value is an outlier in a box plot if beyond:', opts: ['Mean±2SD', 'Q1-1.5×IQR or Q3+1.5×IQR', 'The whiskers always', '±3SD'], ans: 1 },
          { q: 'Five-number summary includes:', opts: ['Mean,SD,Min,Max,n', 'Min,Q1,Median,Q3,Max', 'Mean,Q1,Q2,Q3,Max', 'P10,P25,P50,P75,P90'], ans: 1 },
          { q: 'If Q1=20 and Q3=40, IQR is:', opts: ['20', '30', '40', '60'], ans: 0 },
        ]
      },
      {
        id: 't009', title: 'Skewness & Kurtosis', mins: 12, pages: 5,
        content: `The SHAPE of a distribution provides crucial information beyond center and spread.

▌ SKEWNESS — Measuring Asymmetry

SYMMETRIC (≈0): Mean = Median = Mode. Bell-shaped.
Examples: IQ, heights, measurement errors.

RIGHT-SKEWED (+): Long tail to the RIGHT.
Mode < Median < Mean (mean pulled rightward by outliers).
Examples: Income, wealth, house prices, insurance claims.

LEFT-SKEWED (−): Long tail to the LEFT.
Mean < Median < Mode (mean pulled leftward).
Examples: Age at death, easy exam scores.

▌ MEASURING SKEWNESS

Pearson's: Skewness ≈ 3(Mean−Median)/SD
Fisher's g₁ = [Σ(xᵢ−x̄)³/n] / s³

|g₁| < 0.5 → Approximately symmetric
0.5 ≤ |g₁| < 1 → Moderately skewed
|g₁| ≥ 1 → Highly skewed

▌ KURTOSIS — Measuring Tail Weight

Excess kurtosis g₂ = [Σ(xᵢ−x̄)⁴/n]/s⁴ − 3

Normal distribution: g₂ = 0 (mesokurtic — benchmark)

LEPTOKURTIC (g₂ > 0): Heavy tails; more outliers than normal.
Examples: Financial returns. Critical in risk management!
"Fat tails" = more crashes than normal models predict.

PLATYKURTIC (g₂ < 0): Light tails; fewer outliers than normal.
Examples: Uniform distribution.

▌ TRANSFORMATIONS FOR SKEWED DATA

Right skew → Apply log(x), √x, or 1/x
Left skew → Apply x², x³, or eˣ
Both → Box-Cox power transformation

▌ TESTING NORMALITY

Shapiro-Wilk (best for n<50)
Q-Q plot: Points on diagonal line → normally distributed`,
        quiz: [
          { q: 'In right-skewed data:', opts: ['Mean=Median=Mode', 'Mean<Median<Mode', 'Mode<Median<Mean', 'Mode=Median'], ans: 2 },
          { q: 'Leptokurtic distributions have:', opts: ['Lighter tails than normal', 'Zero skewness', 'Heavier tails and more outliers', 'Negative kurtosis'], ans: 2 },
          { q: 'Income data is typically:', opts: ['Left-skewed', 'Symmetric', 'Right-skewed', 'Platykurtic'], ans: 2 },
          { q: 'To normalize right-skewed data, apply:', opts: ['x²', 'eˣ', 'log(x)', 'x³'], ans: 2 },
          { q: 'Normal distribution has excess kurtosis =', opts: ['3', '1', '0', '-3'], ans: 2 },
        ]
      },
      {
        id: 't010', title: 'Exploratory Data Analysis', mins: 16, pages: 6,
        content: `EDA is the detective work you do BEFORE formal statistical modeling.

▌ WHAT IS EDA?

Coined by John Tukey (1977). Uses visual and numerical methods to:
• Understand the structure of your data
• Detect anomalies, outliers, and patterns
• Test assumptions of planned statistical methods
• Generate hypotheses for further investigation

▌ ANSCOMBE'S QUARTET — Most Important Lesson

Four datasets with IDENTICAL summary statistics:
• Mean of x ≈ 9, Mean of y ≈ 7.5
• Variance of x ≈ 11, Variance of y ≈ 4.12
• Correlation ≈ 0.816

But scatter plots look COMPLETELY DIFFERENT:
Dataset I:   Perfect linear relationship ✓
Dataset II:  Perfect parabola — wrong model!
Dataset III: Linear + ONE massive outlier
Dataset IV:  Vertical cluster + one outlier

THE LESSON: ALWAYS VISUALIZE DATA FIRST!

▌ Q-Q PLOT

Purpose: Check if data follows Normal distribution.
Points on diagonal → normally distributed ✓
Curve bending up at right → right skew
S-shape → skewed both directions

▌ HANDLING MISSING DATA

Types:
• MCAR: Missing Completely At Random (no pattern)
• MAR: Related to other observed variables
• MNAR: Related to the missing value itself (hardest!)

Options:
• Complete case analysis (only if MCAR)
• Mean/median imputation
• Multiple Imputation (MI) — gold standard
• Maximum likelihood methods

▌ OUTLIER STRATEGIES

Step 1: Investigate — error or genuine extreme value?
Step 2: Decide:
• Keep: Genuine value; removing loses information
• Remove: Documented error; impossible value
• Winsorize: Cap at 5th/95th percentile

Never remove outliers just because they're inconvenient!`,
        quiz: [
          { q: 'EDA stands for:', opts: ['Extended Data Analysis', 'Exploratory Data Analysis', 'Experimental Design Analysis', 'Empirical Data Assessment'], ans: 1 },
          { q: "Anscombe's Quartet proves:", opts: ['Summary stats are sufficient', 'Datasets with identical stats can look completely different', 'Large samples are always needed', 'Correlation proves causation'], ans: 1 },
          { q: 'A Q-Q plot is used to:', opts: ['Plot two variables', 'Assess if data follows a distribution', 'Show frequency table', 'Compare two datasets'], ans: 1 },
          { q: 'MNAR means missing data is:', opts: ['Completely random', 'Related to other observed variables', 'Related to the missing value itself', 'An entry error'], ans: 2 },
          { q: 'Winsorizing means:', opts: ['Removing all outliers', 'Capping values at extreme percentiles', 'Transforming to log scale', 'Replacing with mean'], ans: 1 },
        ]
      },
    ]
  },
  {
    id: 'ch03', emoji: '🎲', title: 'Probability Theory', level: 'Beginner→Intermediate',
    color: '#845EF7', bg: '#845EF718',
    desc: 'From basic probability rules to Bayes theorem and random variables.',
    topics: [
      {
        id: 't011', title: 'Probability Fundamentals', mins: 16, pages: 7,
        content: `Probability is the mathematical language of uncertainty.

▌ WHAT IS PROBABILITY?

Scale: 0 (impossible) to 1 (certain)
P(A) = 0 → Event A never occurs
P(A) = 0.5 → Event A occurs half the time
P(A) = 1 → Event A always occurs

▌ THREE INTERPRETATIONS

① Classical: P(A) = favorable outcomes / total outcomes
② Frequentist: Long-run frequency as trials → ∞
③ Subjective: Personal degree of belief

▌ KOLMOGOROV'S AXIOMS

1. Non-negativity: P(A) ≥ 0
2. Certainty: P(S) = 1
3. Additivity: If A∩B=∅, P(A∪B) = P(A)+P(B)

All probability rules derive from these three axioms!

▌ TYPES OF EVENTS

Complementary: P(A') = 1 − P(A)
Mutually Exclusive: P(A∩B) = 0; cannot both occur
Independent: P(A∩B) = P(A)×P(B); knowing A gives no info about B
Exhaustive: Union = entire sample space

▌ ADDITION RULE

General: P(A∪B) = P(A)+P(B)−P(A∩B)
(Subtract intersection to avoid double-counting!)

Example — Draw a card. A=King, B=Heart:
P(King∪Heart) = 4/52 + 13/52 − 1/52 = 16/52 ≈ 0.308

▌ MULTIPLICATION RULE

Independent: P(A∩B) = P(A)×P(B)
Dependent:   P(A∩B) = P(A)×P(B|A)

▌ COUNTING

Permutations (ORDER matters): P(n,r) = n!/(n-r)!
Combinations (ORDER doesn't matter): C(n,r) = n!/[r!(n-r)!]
C(10,3) = 120 ways to choose 3 from 10`,
        quiz: [
          { q: "P(A') when P(A)=0.35 equals:", opts: ['0.35', '0.65', '0.035', '1.35'], ans: 1 },
          { q: 'For mutually exclusive events: P(A∪B) =', opts: ['P(A)×P(B)', 'P(A)+P(B)-P(A∩B)', 'P(A)+P(B)', 'P(A|B)'], ans: 2 },
          { q: 'P(A)=0.4, P(B)=0.3, P(A∩B)=0.12 → A and B are:', opts: ['Mutually exclusive', 'Independent', 'Dependent', 'Complementary'], ans: 1 },
          { q: 'C(6,2) =', opts: ['12', '15', '30', '36'], ans: 1 },
          { q: 'P(A)=0.4, P(B)=0.5, P(A∪B)=0.7, then P(A∩B)=', opts: ['0.2', '0.3', '0.5', '0.9'], ans: 0 },
        ]
      },
      {
        id: 't012', title: 'Conditional Probability & Bayes', mins: 20, pages: 8,
        content: `Conditional probability is the engine of learning from evidence.

▌ CONDITIONAL PROBABILITY

P(A|B) = "Probability of A GIVEN B occurred"
Formula: P(A|B) = P(A∩B) / P(B)

Example: Roll a die. P(even | result > 3)?
B={4,5,6}, P(B)=3/6; A∩B={4,6}, P(A∩B)=2/6
P(A|B) = (2/6)/(3/6) = 2/3 ✓

▌ LAW OF TOTAL PROBABILITY

P(A) = Σ P(A|Bᵢ)×P(Bᵢ)   (where Bᵢ are mutually exclusive & exhaustive)

Factory with 3 machines (30%, 45%, 25% of output):
Defect rates: M1=2%, M2=3%, M3=5%
P(defective) = 0.02×0.30 + 0.03×0.45 + 0.05×0.25
             = 0.006 + 0.0135 + 0.0125 = 0.032 (3.2%)

▌ BAYES' THEOREM

P(Bᵢ|A) = [P(A|Bᵢ)×P(Bᵢ)] / Σ[P(A|Bⱼ)×P(Bⱼ)]

Prior × Likelihood → Posterior (updated belief after evidence)

▌ CLASSIC MEDICAL TEST EXAMPLE

Disease prevalence: 1% (P(D)=0.01)
Test sensitivity: 99% (P(Pos|D)=0.99)
False positive rate: 5% (P(Pos|no D)=0.05)

You test POSITIVE. P(D|Pos) = ?

P(Pos) = 0.99×0.01 + 0.05×0.99 = 0.0099+0.0495 = 0.0594
P(D|Pos) = 0.0099/0.0594 ≈ 16.7%

😱 Despite 99% accurate test, only 17% chance you have the disease!
This is the BASE RATE FALLACY — the disease is very RARE!

▌ APPLICATIONS

Spam filters, Medical diagnostics, Self-driving cars (sensor fusion),
Search and rescue, Forensic DNA evidence, Machine learning!`,
        quiz: [
          { q: 'P(A|B) is read as:', opts: ['A and B', 'A or B', 'A given B', 'A complement of B'], ans: 2 },
          { q: 'P(A∩B)=0.15, P(B)=0.5. P(A|B) =', opts: ['0.075', '0.3', '0.65', '0.5'], ans: 1 },
          { q: 'The Base Rate Fallacy refers to:', opts: ['Using wrong test', 'Ignoring prior probability', 'Small sample error', 'Accepting H₀ too easily'], ans: 1 },
          { q: "In Bayes' theorem, P(θ|data) is called:", opts: ['The likelihood', 'The prior', 'The posterior', 'The marginal'], ans: 2 },
          { q: 'If P(A|B)=P(A), then A and B are:', opts: ['Mutually exclusive', 'Independent', 'Dependent', 'Complementary'], ans: 1 },
        ]
      },
      {
        id: 't013', title: 'Random Variables & Expected Value', mins: 18, pages: 7,
        content: `Random variables bridge probability and statistics.

▌ RANDOM VARIABLE

Assigns a NUMERICAL VALUE to each outcome in a sample space.
X = number of heads in 5 coin flips: {0,1,2,3,4,5}

Discrete RV: Countable values (count of defects, goals scored)
Continuous RV: Any value in a range (height, weight, time)

▌ PROBABILITY DISTRIBUTIONS

PMF (Discrete): P(X=x); must have ΣP(X=x) = 1
PDF (Continuous): f(x); P(a≤X≤b) = area under curve
CDF: F(x) = P(X≤x); non-decreasing from 0 to 1

▌ EXPECTED VALUE

Discrete: E(X) = Σ x×P(X=x)

Fair die: E(X) = 1(1/6)+2(1/6)+...+6(1/6) = 3.5
Long-run: you average about 3.5 per roll!

▌ PROPERTIES OF E(X)

E(c) = c
E(aX+b) = a×E(X)+b
E(X+Y) = E(X)+E(Y) — ALWAYS true!
E(XY) = E(X)×E(Y) — only if INDEPENDENT!

▌ VARIANCE OF A RV

Var(X) = E[(X−μ)²] = E(X²)−[E(X)]²

Var(c) = 0
Var(aX) = a²×Var(X)
If independent: Var(X+Y) = Var(X)+Var(Y)

▌ CORRELATION

ρ(X,Y) = Cov(X,Y)/(σₓ×σᵧ) ∈ [−1,+1]
ρ=0: No LINEAR relationship (may still have nonlinear!)

▌ APPLICATIONS

Insurance: E(payout) = Σ(amount×probability)
Casino: E(winnings) < 0 for most games — house always wins!`,
        quiz: [
          { q: 'A random variable assigns ___ to outcomes.', opts: ['Random text', 'Numerical values', 'Probabilities', 'Ranks'], ans: 1 },
          { q: 'For discrete RV, ΣP(X=x) must equal:', opts: ['0', '0.5', '1', 'n'], ans: 2 },
          { q: 'E(3X+5) when E(X)=4 equals:', opts: ['12', '17', '20', '27'], ans: 1 },
          { q: 'Var(2X) when Var(X)=9 equals:', opts: ['18', '36', '4.5', '81'], ans: 1 },
          { q: 'For a fair die, E(X) =', opts: ['3', '3.5', '4', '2.5'], ans: 1 },
        ]
      },
    ]
  },
  {
    id: 'ch04', emoji: '📈', title: 'Probability Distributions', level: 'Intermediate',
    color: '#FF6B6B', bg: '#FF6B6B18',
    desc: 'Binomial, Poisson, Normal, t, chi-square, F distributions and more.',
    topics: [
      {
        id: 't014', title: 'Binomial Distribution', mins: 18, pages: 7,
        content: `The binomial distribution models fixed trials with binary outcomes.

▌ BINS ACRONYM — When to use Binomial

B — Binary outcome (success/failure)
I — Independent trials
N — Number of trials fixed (n)
S — Same probability p per trial

If ALL four hold → X ~ B(n,p)

▌ PMF

P(X=k) = C(n,k) × pᵏ × (1-p)^(n-k)

Mean: μ = np
Variance: σ² = np(1-p)
SD: σ = √(np(1-p))

▌ WORKED EXAMPLE

10 MCQ questions, 4 choices each. Guess ALL.
X ~ B(10, 0.25)
E(X) = 10×0.25 = 2.5 (expect 2.5 right)
P(exactly 3) = C(10,3)×(0.25)³×(0.75)⁷ = 120×0.01563×0.1335 ≈ 25%

▌ DISTRIBUTION SHAPE

p=0.5: Perfectly symmetric
p<0.5: Right-skewed
p>0.5: Left-skewed
Large n: Approaches Normal (CLT)

▌ NORMAL APPROXIMATION

Condition: np ≥ 5 AND n(1-p) ≥ 5
Use continuity correction: P(X≤k) → P(Z≤(k+0.5−np)/√npq)

▌ REAL-WORLD APPLICATIONS

Free throw shooting (n=20, p=0.85)
Drug trial response (n=200, p=0.60)
Quality sampling (n=50, p=0.02)
Email click-through (n=1000, p=0.03)`,
        quiz: [
          { q: 'For X~B(n=8,p=0.3), E(X) =', opts: ['2', '2.4', '1.68', '3'], ans: 1 },
          { q: 'Which is NOT required for binomial?', opts: ['Fixed n', 'Binary outcome', 'Continuous data', 'Constant p'], ans: 2 },
          { q: 'Var(X) for B(10,0.5) =', opts: ['5', '2.5', '2.236', '1'], ans: 1 },
          { q: 'P(X=0) for B(5,0.1) =', opts: ['0.9⁵', '0.1⁵', '5×0.1', '0.5'], ans: 0 },
          { q: 'Normal approx to binomial valid when:', opts: ['n>30', 'np≥5 AND n(1-p)≥5', 'p<0.1', 'p=0.5'], ans: 1 },
        ]
      },
      {
        id: 't015', title: 'Poisson Distribution', mins: 16, pages: 6,
        content: `Poisson models the count of rare events in a fixed interval.

▌ CONDITIONS

1. Events occur INDEPENDENTLY
2. Events cannot occur simultaneously
3. Average rate λ is CONSTANT throughout the interval
4. Rate is proportional to interval length

X ~ Poisson(λ)

▌ PMF

P(X=k) = e^(-λ) × λᵏ / k!   (e ≈ 2.71828)

▌ UNIQUE PROPERTY: Mean = Variance = λ!

E(X) = Var(X) = λ
SD(X) = √λ

If sample variance >> sample mean → Poisson violated (overdispersion)
→ Use Negative Binomial instead!

▌ WORKED EXAMPLE

Hospital: 4 emergencies/hour. X ~ Poisson(4).
P(exactly 2) = e^(-4)×4²/2! = 0.0183×16/2 = 14.65%
P(zero) = e^(-4) ≈ 1.83%

Scaling: λ=4/hr → For 30 min: λ'=2; For 2 hrs: λ'=8

▌ POISSON APPROXIMATION TO BINOMIAL

Use when: n>50 AND p<0.1
Poisson(λ=np) ≈ Binomial(n,p)

Example: 2000 items, p=0.001 defect rate
B(2000,0.001) ≈ Poisson(2) — much simpler!

▌ REAL-WORLD APPLICATIONS

Hospital ER (4/hr), Website requests (100/min),
Typos per page (2/page), Traffic accidents (1.5/day),
Mutations in DNA, Meteorite impacts`,
        quiz: [
          { q: 'For X~Poisson(λ=5), E(X) =', opts: ['5', '√5', '25', '2.5'], ans: 0 },
          { q: 'Unique property of Poisson:', opts: ['Mean>Variance', 'Mean=Variance', 'Mean<Variance', 'Always symmetric'], ans: 1 },
          { q: 'P(X=0) for Poisson(λ=2) ≈', opts: ['0.135', '0.270', '0.5', '0.368'], ans: 0 },
          { q: 'If λ=6 events/hr, for 90 minutes the rate is:', opts: ['6', '9', '3', '12'], ans: 1 },
          { q: 'Poisson approximates Binomial when:', opts: ['n small, p large', 'n large, p small', 'n=p', 'Any case'], ans: 1 },
        ]
      },
      {
        id: 't016', title: 'Normal Distribution', mins: 22, pages: 9,
        content: `The Normal distribution is the most important distribution in all of statistics.

▌ WHY NORMAL IS EVERYWHERE

Heights, weights, IQ scores, measurement errors, exam scores...
The Central Limit Theorem explains why averages are always approximately normal!

▌ PDF

f(x) = (1/(σ√2π)) × e^(-(x-μ)²/(2σ²))
Notation: X ~ N(μ, σ²)

▌ PROPERTIES

1. Symmetric about μ
2. Unimodal — single peak at μ
3. Mean = Median = Mode = μ
4. Asymptotic tails (never touches x-axis)
5. Inflection points at μ ± σ

▌ EMPIRICAL RULE (68-95-99.7)

• μ ± 1σ: 68.27% of data
• μ ± 2σ: 95.45% of data
• μ ± 3σ: 99.73% of data

Example: Heights ~ N(170cm, 7²)
• 68%: 163-177 cm
• 95%: 156-184 cm

▌ STANDARDIZATION

Z = (X − μ) / σ → Z ~ N(0,1)

Key z-values:
z = ±1.645 → 90% of data
z = ±1.960 → 95% of data
z = ±2.576 → 99% of data

▌ CENTRAL LIMIT THEOREM (CLT)

THE MOST IMPORTANT THEOREM IN STATISTICS!

"If X₁,X₂,...,Xₙ are i.i.d. with mean μ and variance σ²,
then X̄ → Normal(μ, σ²/n) as n → ∞"

• Works for ANY distribution!
• Rule of thumb: n ≥ 30
• Foundation of ALL confidence intervals and hypothesis tests`,
        quiz: [
          { q: 'For X~N(50,100), the standard deviation is:', opts: ['100', '10', '50', '√50'], ans: 1 },
          { q: 'P(Z < 1.96) ≈', opts: ['0.95', '0.975', '0.025', '0.9772'], ans: 1 },
          { q: 'For X~N(70,5²), 95% of data is between:', opts: ['65-75', '60-80', '55-85', '68-72'], ans: 1 },
          { q: 'CLT says sample means are approximately normal when:', opts: ['Data is always normal', 'n is large (≥30)', 'Population is uniform', 'Variance = mean'], ans: 1 },
          { q: 'Inflection points of the normal curve occur at:', opts: ['μ±σ/2', 'μ±σ', 'μ±2σ', '0 and 1'], ans: 1 },
        ]
      },
      {
        id: 't017', title: 't, Chi-Square & F Distributions', mins: 18, pages: 7,
        content: `These three distributions are the workhorses of inferential statistics.

▌ t-DISTRIBUTION (Student's t)

Use when: Population SD is unknown AND sample is small.
Origin: William Gosset ("Student", 1908) at Guinness brewery!

t = (x̄ − μ) / (s/√n),  df = n−1

Properties:
• Symmetric around 0 (like Z)
• HEAVIER tails than normal → more extreme values possible
• As df → ∞, t → Z (approaches standard normal)

Critical values (two-tail 5%):
df=5: t*=2.571, df=10: t*=2.228, df=30: t*=2.042, df=∞: z*=1.960

WHY t not z?
Estimating σ with s introduces extra uncertainty.
t-distribution accounts for this with wider tails.

▌ CHI-SQUARED DISTRIBUTION (χ²)

Definition: χ²(k) = Z₁²+Z₂²+...+Zₖ² (sum of squared normal variables)

Properties: Only non-negative; right-skewed; E(χ²)=k; Var(χ²)=2k
Uses: Goodness-of-fit, test of independence, variance intervals

Test statistic: χ² = Σ[(O−E)²/E]

▌ F-DISTRIBUTION

F(d₁,d₂) = (χ²_d₁/d₁) / (χ²_d₂/d₂)  (ratio of chi-squares)

Properties: Non-negative; right-skewed
Uses: ANOVA (comparing 3+ means), variance comparison, regression F-test

F = MS_between / MS_within
Large F → group means differ more than chance!

▌ RELATIONSHIPS

Normal → Z (σ known)  →  t (σ unknown, use s)
Normal² → χ² (variance tests, goodness-of-fit)
χ²/χ² → F (ANOVA, variance ratios)`,
        quiz: [
          { q: 't-distribution is used when:', opts: ['n>100', 'Population SD is unknown', 'Data is categorical', 'Variance is known'], ans: 1 },
          { q: 'As df increases, t-distribution:', opts: ['More skewed', 'Approaches chi-squared', 'Approaches standard normal', 'Heavier tails'], ans: 2 },
          { q: 'χ² distribution is always:', opts: ['Symmetric', 'Non-negative', 'Negative', 'Between 0 and 1'], ans: 1 },
          { q: 'F-distribution is used in:', opts: ['Single mean tests', 'Proportion tests', 'ANOVA and variance comparison', 'Normality testing'], ans: 2 },
          { q: 'E(χ²(k)) =', opts: ['1', 'k/2', 'k', '2k'], ans: 2 },
        ]
      },
    ]
  },
  {
    id: 'ch05', emoji: '🔬', title: 'Statistical Inference', level: 'Intermediate',
    color: '#FFA94D', bg: '#FFA94D18',
    desc: 'Estimation, confidence intervals, and hypothesis testing frameworks.',
    topics: [
      {
        id: 't018', title: 'Confidence Intervals', mins: 20, pages: 8,
        content: `A confidence interval gives a RANGE of plausible values for an unknown parameter.

▌ WHAT IS A 95% CI?

"If we repeated the sampling procedure many times, ~95% of those intervals
would contain the true population parameter."

⚠️ WRONG: "95% chance the true mean is in [L,U]"
⚠️ RIGHT: "95% of such intervals contain the true parameter"

▌ CI FOR MEAN (σ KNOWN)

Formula: x̄ ± z* × σ/√n

z* values: 90%→1.645, 95%→1.960, 99%→2.576

Example: n=36, x̄=84.5, σ=12, 95% CI:
CI = 84.5 ± 1.96×12/√36 = 84.5 ± 3.92 = (80.58, 88.42)

▌ CI FOR MEAN (σ UNKNOWN)

Use t-distribution! Formula: x̄ ± t* × s/√n, df=n-1

Example: n=16, x̄=25.3, s=4.8, 99% CI:
t*(df=15)=2.947; CI=25.3±2.947×4.8/4=25.3±3.54=(21.76, 28.84)

▌ CI FOR PROPORTION

Formula: p̂ ± z* × √(p̂(1-p̂)/n)
Validity: np̂≥10 AND n(1-p̂)≥10

Example: 480 of 800 approve (p̂=0.60), 95% CI:
SE=√(0.60×0.40/800)=0.0173
CI=0.60±1.96×0.0173=(0.566, 0.634)

▌ FACTORS AFFECTING CI WIDTH

MOE ↑ when: confidence level↑, variability σ↑, sample size n↓
To HALVE the MOE: QUADRUPLE the sample size!
(MOE ∝ 1/√n)

▌ REQUIRED SAMPLE SIZE

For mean: n = (z*×σ/MOE)²
For proportion (conservative): n = z*²×0.25/MOE²
For 95% CI within ±3%: n ≈ 1,068`,
        quiz: [
          { q: 'Correct interpretation of 95% CI:', opts: ['95% chance parameter is in interval', '95% of data falls in range', '95% of such intervals contain the true parameter', 'Parameter is at the center'], ans: 2 },
          { q: 'n=25, x̄=50, s=10: the 95% CI uses:', opts: ['z*=1.96', 't* with df=24', 'z*=2.576', 't* with df=25'], ans: 1 },
          { q: 'To HALVE the margin of error, sample size must be:', opts: ['Doubled', 'Halved', 'Quadrupled', 'Increased by 50%'], ans: 2 },
          { q: 'Proportion CI validity: need', opts: ['n>30', 'np̂≥10 and n(1-p̂)≥10', 'Normal population', 'σ known'], ans: 1 },
          { q: 'CI for mean difference excluding 0 means:', opts: ['Means are equal', 'Evidence of significant difference', 'Inconclusive', 'Need larger sample'], ans: 1 },
        ]
      },
      {
        id: 't019', title: 'Hypothesis Testing Framework', mins: 22, pages: 9,
        content: `Hypothesis testing formally evaluates claims about populations using data.

▌ THE CORE LOGIC

1. Assume H₀ is true (status quo, no effect)
2. Measure how unusual the data would be under H₀
3. Very unusual data → evidence against H₀ → reject it!

Burden of proof is on H₁ (the research hypothesis).

▌ STEP-BY-STEP FRAMEWORK

Step 1: State Hypotheses
H₀ (Null): Default assumption; contains =, ≤, or ≥
H₁ (Alternative): What we're trying to show; contains <, >, or ≠

Two-tailed: H₁: μ ≠ μ₀
Left-tailed: H₁: μ < μ₀
Right-tailed: H₁: μ > μ₀

Step 2: Choose Significance Level α (usually 0.05)
Step 3: Compute test statistic (Z, t, χ², F)
Step 4: Find p-value or compare to critical value
Step 5: Decision — if p ≤ α → REJECT H₀
Step 6: Conclusion in real-world context!

▌ DECISION MATRIX — TYPE I & TYPE II ERRORS

                  | H₀ True      | H₀ False
Reject H₀         | TYPE I ERROR  | CORRECT (Power)
Fail to Reject H₀  | CORRECT       | TYPE II ERROR

Type I (α): False alarm — reject TRUE H₀
Type II (β): Missed detection — fail to reject FALSE H₀
Power = 1-β = correctly rejecting false H₀

▌ P-VALUE MISCONCEPTIONS!

❌ "p=0.03 means H₀ is 3% likely to be true"
✓ "If H₀ were true, only 3% chance of data this extreme"

❌ "p>0.05 PROVES H₀"
✓ "Insufficient evidence to reject H₀"

▌ STATISTICAL vs PRACTICAL SIGNIFICANCE

With n=1,000,000, trivially small effects become statistically significant!
Always report effect size: Cohen's d (small:0.2, medium:0.5, large:0.8)`,
        quiz: [
          { q: 'Type I error is:', opts: ['Failing to reject false H₀', 'Rejecting true H₀', 'Low power', 'High β'], ans: 1 },
          { q: 'For H₁: μ<50, the test is:', opts: ['Two-tailed', 'Right-tailed', 'Left-tailed', 'Non-directional'], ans: 2 },
          { q: 'p-value=0.03 with α=0.05:', opts: ['Fail to reject H₀', 'Reject H₀', 'Cannot conclude', 'Need more data'], ans: 1 },
          { q: 'Power of a test equals:', opts: ['α', 'β', '1-β', '1-α'], ans: 2 },
          { q: 'Which does NOT increase power?', opts: ['Larger n', 'Larger effect', 'Lower population variability', 'Lower α (stricter)'], ans: 3 },
          { q: 'p>0.05 means:', opts: ['H₀ is proven true', 'H₁ is true', 'Insufficient evidence to reject H₀', 'Experiment failed'], ans: 2 },
        ]
      },
      {
        id: 't020', title: 't-Tests: One Sample, Two Sample, Paired', mins: 22, pages: 9,
        content: `The t-test family is the most commonly used set of statistical tests.

▌ WHEN TO USE t-TESTS

• Comparing means (1 or 2 groups)
• σ is UNKNOWN (use sample s)
• Data approximately normal (or n≥30 by CLT)

▌ ONE-SAMPLE t-TEST

H₀: μ = μ₀
t = (x̄ − μ₀) / (s/√n),  df = n−1

Example: Batteries claim 100 hrs. Sample: n=20, x̄=97.8, s=5.1
H₁: μ<100 (left-tailed)
t = (97.8−100)/(5.1/√20) = -1.93
t_crit = -1.729 (df=19) → -1.93 < -1.729 → REJECT H₀!

▌ TWO-SAMPLE t-TEST

Case A: Equal variances — Pooled t
sp² = [(n₁-1)s₁²+(n₂-1)s₂²]/(n₁+n₂-2)
t = (x̄₁−x̄₂)/(sp×√(1/n₁+1/n₂)),  df=n₁+n₂-2

Case B: Unequal variances — Welch's t (SAFER DEFAULT!)
t = (x̄₁−x̄₂)/√(s₁²/n₁+s₂²/n₂)

Modern recommendation: Always use Welch's by default.

▌ PAIRED t-TEST

Use when observations are MATCHED or measured twice!
1. Compute differences: dᵢ = x₁ᵢ − x₂ᵢ
2. Run one-sample t-test on the differences
t = d̄ / (s_d/√n),  df = n−1 (n = number of PAIRS)

WHY PAIRED IS MORE POWERFUL:
Removes between-subject variability → clearer signal!

Example: BP before/after medication (n=8):
d̄=6.75, s_d=1.392
t = 6.75/(1.392/√8) = 13.72 — EXTREMELY significant!

▌ CHOOSING THE RIGHT t-TEST

One group vs known value → One-sample t
Two independent groups, σ₁=σ₂ → Pooled t
Two independent groups, σ₁≠σ₂ → Welch's t
Same subjects measured twice → Paired t`,
        quiz: [
          { q: 'Paired t-test is used when:', opts: ['Two independent groups', 'Observations are matched', 'Variances are unequal', 'n>100'], ans: 1 },
          { q: "Welch's t-test preferred over pooled when:", opts: ['n₁=n₂', 'Variances may be unequal', 'Both groups are normal', 'Effect size is large'], ans: 1 },
          { q: 'One-sample t-test df =', opts: ['n', 'n-1', 'n-2', '2n-2'], ans: 1 },
          { q: 'Paired t-test analyzes:', opts: ['x̄₁ and x̄₂ separately', 'Differences dᵢ=x₁ᵢ-x₂ᵢ', 'Pooled variance', 'Ratio of variances'], ans: 1 },
          { q: 'Paired design increases power by:', opts: ['Increasing sample size', 'Removing between-subject variability', 'Using a more powerful test', 'Reducing α'], ans: 1 },
        ]
      },
    ]
  },
  {
    id: 'ch06', emoji: '🧪', title: 'Advanced Inference', level: 'Intermediate',
    color: '#51CF66', bg: '#51CF6618',
    desc: 'ANOVA, chi-square tests, and non-parametric methods.',
    topics: [
      {
        id: 't021', title: 'One-Way ANOVA', mins: 20, pages: 8,
        content: `ANOVA tests whether 3+ group means differ without inflating the error rate.

▌ WHY NOT MULTIPLE t-TESTS?

k=5 groups → C(5,2)=10 comparisons at α=0.05
Family-wise error: 1-(0.95)^10 ≈ 40% false positive chance!
ANOVA controls this at α for ALL comparisons simultaneously.

▌ HYPOTHESES

H₀: μ₁ = μ₂ = μ₃ = ... = μₖ (ALL means equal)
H₁: At least ONE mean differs (doesn't say which!)

▌ THE CORE IDEA: PARTITIONING VARIANCE

SS_Total = SS_Between + SS_Within

SS_Between = Signal: How much do group means vary?
SS_Within = Noise: How much do individuals vary within groups?

F = Signal/Noise = MS_Between/MS_Within

Large F → means vary more than chance → reject H₀!

▌ ANOVA TABLE

Source   | SS   | df    | MS         | F
---------|------|-------|------------|---
Between  | SS_B | k-1   | SS_B/(k-1) | MS_B/MS_W
Within   | SS_W | N-k   | SS_W/(N-k) |
Total    | SS_T | N-1   |            |

▌ ASSUMPTIONS

1. Independence
2. Normality per group
3. Homogeneity of variance (σ₁²=σ₂²=...=σₖ²)
   Test with Levene's or Bartlett's test.

▌ POST-HOC TESTS

ANOVA says THAT means differ, not WHICH ones.
Tukey's HSD: Most common for balanced designs
Bonferroni: Divide α by # comparisons (simple, conservative)
Games-Howell: For unequal variances

▌ EFFECT SIZE: η²

η² = SS_Between/SS_Total
Small: 0.01, Medium: 0.06, Large: 0.14`,
        quiz: [
          { q: 'One-Way ANOVA tests:', opts: ['Equality of variances', 'Whether ≥1 group mean differs', 'Normality', 'Independence'], ans: 1 },
          { q: 'F-statistic is:', opts: ['SS_B/SS_W', 'MS_B/MS_W', 'SS_T/(N-1)', 'df_B/df_W'], ans: 1 },
          { q: 'For k=4 groups, N=40, df_Within =', opts: ['36', '3', '39', '37'], ans: 0 },
          { q: 'Post-hoc tests run after ANOVA to:', opts: ['Check normality', 'Identify which specific means differ', 'Compute effect size', 'Test variance equality'], ans: 1 },
          { q: "η²=0.12 indicates:", opts: ['Small effect', 'Medium effect', 'Large effect', 'No effect'], ans: 1 },
        ]
      },
      {
        id: 't022', title: 'Chi-Square Tests', mins: 18, pages: 7,
        content: `Chi-square tests analyze categorical data comparing observed and expected frequencies.

▌ GOODNESS-OF-FIT TEST

H₀: Observed frequencies match expected distribution
χ² = Σ[(Oᵢ−Eᵢ)²/Eᵢ],  df = k−1

Example: Is a die fair? Rolled 120 times.
Expected: 20 each. Observed: 25,17,15,23,24,16
χ² = 5 < χ²_crit(5,0.05)=11.07 → Cannot reject fair die.

▌ TEST OF INDEPENDENCE

H₀: Two categorical variables are INDEPENDENT
Setup: Contingency table; E_ij = (Row_i × Col_j)/Grand total
χ² = Σ[(O_ij−E_ij)²/E_ij],  df = (rows-1)(cols-1)

Example: Gender × Sport preference (200 people)
χ²=21.43 >> 5.991 (df=2, α=0.05)
→ Strong evidence gender and sport preference ARE associated!

▌ EFFECT SIZE: CRAMÉR'S V

V = √(χ²/(n×min(r-1,c-1)))
V∈[0,1]: 0.1=Weak, 0.3=Moderate, 0.5=Strong

▌ WHEN EXPECTED FREQUENCIES < 5

• Combine adjacent categories
• Use Fisher's Exact Test (2×2 tables)
• Use Yates' continuity correction

▌ ASSUMPTIONS

1. Random sampling
2. Independence of observations (one person, one cell)
3. Expected frequencies ≥ 5 in 80%+ of cells`,
        quiz: [
          { q: 'Chi-square independence test with 3 rows, 4 cols: df =', opts: ['5', '6', '11', '12'], ans: 1 },
          { q: 'Expected frequency E_ij =', opts: ['O_ij/n', '(Row total × Col total)/Grand total', 'n/(r×c)', 'Grand total/k'], ans: 1 },
          { q: 'Chi-square tests require expected frequencies:', opts: ['≥1', '≥5', '≥10', '≥30'], ans: 1 },
          { q: "Cramér's V measures:", opts: ['P-value', 'Effect size for chi-square', 'Expected minus observed', 'Degrees of freedom'], ans: 1 },
          { q: 'When E_ij < 5 in 2×2 table, use:', opts: ['Standard chi-square', "Fisher's Exact Test", 'Bonferroni', 'Paired t-test'], ans: 1 },
        ]
      },
      {
        id: 't023', title: 'Non-Parametric Tests', mins: 18, pages: 7,
        content: `Non-parametric tests make no assumptions about population distributions.

▌ WHEN TO USE

• Data is ORDINAL
• Small sample; normality can't be assumed
• Data clearly non-normal (heavy skew or outliers)
• Outliers would distort means

Trade-off: Less powerful when assumptions hold, but more appropriate when they don't!

▌ MANN-WHITNEY U TEST

Equivalent: Independent t-test
1. Rank all observations (1=smallest)
2. Sum ranks per group: W₁, W₂
3. U = min(U₁,U₂); compare to critical value
H₀: Two populations have the same distribution

▌ WILCOXON SIGNED-RANK TEST

Equivalent: Paired t-test
1. Compute differences dᵢ; remove zeros
2. Rank |dᵢ|; assign signs
3. W = min(W⁺, W⁻)
Includes direction (sign) info — more informative than Mann-Whitney!

▌ KRUSKAL-WALLIS TEST

Equivalent: One-Way ANOVA (3+ independent groups)
H ~ χ²(k-1) under H₀
Post-hoc: Dunn's test with Bonferroni correction.

▌ FRIEDMAN TEST

Equivalent: Repeated-measures ANOVA (3+ related groups)

▌ SPEARMAN RANK CORRELATION (ρ)

ρ = 1 − [6Σdᵢ²]/[n(n²-1)]  where dᵢ = rank(xᵢ)−rank(yᵢ)
Measures MONOTONIC (not just linear) relationship. Resistant to outliers!

▌ SUMMARY

Parametric     | Non-Parametric Equivalent
One-sample t   | Wilcoxon signed-rank
Independent t  | Mann-Whitney U
Paired t       | Wilcoxon signed-rank
One-way ANOVA  | Kruskal-Wallis
Pearson r      | Spearman ρ`,
        quiz: [
          { q: 'Mann-Whitney U is the non-parametric version of:', opts: ['Paired t-test', 'Independent t-test', 'One-sample t-test', 'ANOVA'], ans: 1 },
          { q: 'Non-parametric tests preferred when:', opts: ['n>100', 'Data is clearly normal', 'Data is ordinal or non-normal', 'Variances are equal'], ans: 2 },
          { q: 'Spearman correlation measures:', opts: ['Linear relationship only', 'Monotonic relationship', 'Causation', 'Partial correlation'], ans: 1 },
          { q: 'Kruskal-Wallis compares:', opts: ['2 independent groups', '3+ independent groups', '3+ related groups', 'Paired observations'], ans: 1 },
          { q: 'Main trade-off of non-parametric tests:', opts: ['Need more data', 'Less powerful when parametric assumptions hold', 'Always lower p-values', "Can't use continuous data"], ans: 1 },
        ]
      },
    ]
  },
  {
    id: 'ch07', emoji: '📉', title: 'Regression Analysis', level: 'Advanced',
    color: '#20C997', bg: '#20C99718',
    desc: 'Simple, multiple, and logistic regression — the most-used tools in data science.',
    topics: [
      {
        id: 't024', title: 'Simple Linear Regression', mins: 24, pages: 10,
        content: `Simple linear regression models the linear relationship between X and Y.

▌ THE MODEL

Y = β₀ + β₁X + ε

β₀ = intercept (Y when X=0)
β₁ = slope (change in Y per 1-unit increase in X)
ε = error term ~ N(0,σ²)

Estimated: Ŷ = β̂₀ + β̂₁X
Residual: eᵢ = yᵢ − ŷᵢ

▌ INTERPRETING SLOPE

β̂₁ = 2.5: Each extra year of education → ₹2.5L more salary on average
β̂₁ = -0.3: Each km farther from city → ₹0.3L lower property price
β̂₁ = 0: X provides NO linear information about Y

▌ OLS ESTIMATION

Minimizes: SSE = Σ(yᵢ−ŷᵢ)²

β̂₁ = Σ(xᵢ-x̄)(yᵢ-ȳ)/Σ(xᵢ-x̄)² = Sxy/Sxx
β̂₀ = ȳ − β̂₁×x̄

KEY FACT: The line ALWAYS passes through (x̄, ȳ)!

▌ R² — COEFFICIENT OF DETERMINATION

R² = SS_Regression/SS_Total ∈ [0,1]
R²=0.75: X explains 75% of variance in Y!
In SLR: R² = r² (Pearson correlation squared)

▌ ASSUMPTIONS (LINE)

L — Linearity
I — Independence of residuals
N — Normality of residuals
E — Equal variance (homoscedasticity)

Check with residual plots!

▌ PREDICTION vs CONFIDENCE INTERVALS

CI for mean response at x₀ (narrower):
ŷ₀ ± t*×sₑ×√(1/n+(x₀-x̄)²/Sxx)

PI for individual response at x₀ (wider):
ŷ₀ ± t*×sₑ×√(1+1/n+(x₀-x̄)²/Sxx)

Both WIDEN as x₀ moves away from x̄ (extrapolation gets risky!)

⚠️ NEVER extrapolate beyond your data range!`,
        quiz: [
          { q: 'OLS minimizes:', opts: ['Sum of absolute residuals', 'Sum of squared residuals', 'Maximum residual', 'R-squared'], ans: 1 },
          { q: 'Regression line always passes through:', opts: ['(0,0)', '(x̄,ȳ)', '(0,β₀) only', 'The origin'], ans: 1 },
          { q: 'R²=0.82 means:', opts: ['Correlation is 0.82', '82% of Y variance explained by X', 'Slope is 0.82', 'Residuals are 18%'], ans: 1 },
          { q: 'In SLR, t-test for slope uses df =', opts: ['n-1', 'n-2', 'n', '2'], ans: 1 },
          { q: 'Prediction interval is ___ than CI for mean response:', opts: ['Narrower', 'Same width', 'Wider', 'Depends on x₀'], ans: 2 },
        ]
      },
      {
        id: 't025', title: 'Multiple Regression & Model Selection', mins: 25, pages: 10,
        content: `Multiple regression models Y with multiple predictors simultaneously.

▌ THE MODEL

Y = β₀ + β₁X₁ + β₂X₂ + ... + βₖXₖ + ε

β̂ⱼ = "Change in Y per 1-unit increase in Xⱼ, ALL OTHER PREDICTORS HELD CONSTANT"
This is the PARTIAL effect — controls for other variables!

▌ ADJUSTED R²

R²: Adding ANY predictor always increases R² → misleading!
R²_adj = 1−(1-R²)(n-1)/(n-k-1)
R²_adj penalizes unnecessary predictors → use for model comparison.

▌ MULTICOLLINEARITY

When predictor variables are HIGHLY CORRELATED:
→ Unstable coefficients (high SEs)
→ Signs may flip from theory predictions!

VIF (Variance Inflation Factor):
VIF_j = 1/(1−R²_j)
VIF=1: Fine, VIF=5-10: Concern, VIF>10: SEVERE!

Solutions: Remove one correlated predictor, combine into index, Ridge/LASSO.

▌ MODEL SELECTION

Information Criteria (smaller = better):
AIC = n×ln(SS_E/n)+2(k+1)
BIC = n×ln(SS_E/n)+(k+1)×ln(n)
BIC penalizes complexity MORE → prefers simpler models.

▌ DUMMY VARIABLES

Categorical with c categories → c-1 dummy variables!
Region (N,S,E,W) → 3 dummies: D_S, D_E, D_W (North = reference)
β₁ = difference in Y between South and North, controlling for others.

▌ REGULARIZATION

Ridge (L2): Minimize Σ(y-ŷ)² + λΣβ²_j
→ Shrinks all coefficients; keeps all predictors.

LASSO (L1): Minimize Σ(y-ŷ)² + λΣ|β_j|
→ Some coefficients → exactly 0 = automatic variable selection!

Elastic Net: Combines Ridge + LASSO.`,
        quiz: [
          { q: 'In MLR, β̂ⱼ represents effect of Xⱼ holding:', opts: ['All X at zero', 'All other predictors constant', 'Only X₁ constant', 'Nothing constant'], ans: 1 },
          { q: 'Adjusted R² preferred for comparing models with:', opts: ['Simple regression only', 'Different numbers of predictors', 'All cases', 'Non-normal data'], ans: 1 },
          { q: 'VIF > 10 indicates:', opts: ['High R²', 'Severe multicollinearity', 'High predictive power', 'Non-normality'], ans: 1 },
          { q: 'Categorical variable with 5 categories needs ___ dummies:', opts: ['5', '4', '3', '6'], ans: 1 },
          { q: 'LASSO is unique because it:', opts: ['Shrinks large coefficients most', 'Sets some coefficients to exactly zero', 'Requires normal errors', "Can't handle interactions"], ans: 1 },
        ]
      },
      {
        id: 't026', title: 'Logistic Regression', mins: 20, pages: 8,
        content: `Logistic regression models a binary (yes/no) outcome variable.

▌ WHY NOT LINEAR REGRESSION?

Linear regression can predict probabilities outside [0,1] — nonsensical!
Relationship between X and P(Y=1) is S-shaped, not linear.
Solution: Use the logistic (sigmoid) function.

▌ THE LOGISTIC FUNCTION

P(Y=1|X) = 1/(1+e^-(β₀+β₁X))  always in (0,1) ✓

▌ ODDS AND LOG-ODDS

Odds = P(success)/P(failure) = π/(1-π)
Log-odds (logit) = log(π/(1-π)) = β₀+β₁X  ← linear in X!

▌ ODDS RATIO INTERPRETATION

β₁ → OR = e^β₁
1-unit increase in X multiplies odds of Y=1 by e^β₁.

Example: β₁=0.5 (years of education → employment)
OR = e^0.5 = 1.65 → 65% INCREASE in odds per year of education!

▌ CONFUSION MATRIX

              | Predicted +  | Predicted -
Actual +      | TP           | FN
Actual -      | FP           | TN

Sensitivity = TP/(TP+FN) ← catches true positives
Specificity = TN/(TN+FP) ← avoids false alarms
Precision = TP/(TP+FP)
F1 = 2×(Precision×Recall)/(Precision+Recall)

ACCURACY IS MISLEADING for imbalanced classes!
95% negative → predict always "negative" = 95% accuracy but useless!

▌ ROC CURVE & AUC

AUC=0.5: Random (coin flip)
AUC=0.7-0.8: Acceptable
AUC=0.8-0.9: Excellent
AUC=1.0: Perfect (likely overfitting!)

▌ CREDIT SCORING EXAMPLE

log-odds = 5.2 − 0.008×CreditScore
At Score=750: logit=-0.8 → P(default)=1/(1+e^0.8)=31%
OR per 100 points: e^(-0.8)≈0.449 → each 100pts reduces default odds by 55%!`,
        quiz: [
          { q: 'Logistic function ensures predictions are always:', opts: ['Normally distributed', 'Between 0 and 1', 'Linear in X', 'Integers'], ans: 1 },
          { q: 'Odds Ratio e^β=2.5 means:', opts: ['Probability +2.5', 'Log-odds +2.5', 'Odds ×2.5 per unit X', 'R²=0.625'], ans: 2 },
          { q: 'Logistic regression estimated using:', opts: ['OLS', 'Maximum Likelihood', 'Method of Moments', 'Ridge'], ans: 1 },
          { q: 'AUC=0.9 indicates:', opts: ['Poor classification', 'Random guessing', 'Excellent discrimination', 'Perfect (overfit)'], ans: 2 },
          { q: 'Sensitivity = TP/(TP+FN) measures:', opts: ['True negative rate', 'True positive rate', 'Precision', 'Accuracy'], ans: 1 },
        ]
      },
    ]
  },
  {
    id: 'ch08', emoji: '🌊', title: 'Bayesian Statistics', level: 'Advanced',
    color: '#9775FA', bg: '#9775FA18',
    desc: 'Prior beliefs, likelihoods, posteriors, and the Bayesian worldview.',
    topics: [
      {
        id: 't027', title: 'Bayesian Framework', mins: 20, pages: 8,
        content: `Bayesian statistics is a complete alternative framework where probability represents degree of belief.

▌ FREQUENTIST vs BAYESIAN

Frequentist: Probability = long-run frequency. Parameters are FIXED.
Bayesian: Probability = degree of belief. Parameters are RANDOM VARIABLES!

▌ BAYES' THEOREM FOR PARAMETERS

P(θ|data) ∝ P(data|θ) × P(θ)
POSTERIOR ∝ LIKELIHOOD × PRIOR

P(θ|data): Posterior — Updated belief after data
P(data|θ): Likelihood — Probability of data given θ
P(θ):      Prior — Initial belief before data

▌ COIN FAIRNESS EXAMPLE

10 flips, 7 heads. Prior: θ~Beta(2,2) (slight fairness belief)
Posterior: θ|X=7 ~ Beta(2+7, 2+3) = Beta(9,5)

Prior mean: 0.50
MLE: 7/10 = 0.70
Posterior mean: 9/14 = 0.643 ← COMPROMISE (shrinkage)!

As n grows, data dominates and shrinkage disappears.

▌ CREDIBLE INTERVALS vs CONFIDENCE INTERVALS

95% CREDIBLE: P(θ in [a,b]|data) = 95%
✓ "There is a 95% probability that θ lies in [a,b]"

95% CONFIDENCE: 95% of such intervals contain θ
(NOT: "95% chance this specific interval contains θ")

Credible intervals have the interpretation people actually WANT!

▌ BAYES FACTOR

BF₁₀ = P(data|H₁)/P(data|H₀)

BF < 3: Barely worth mentioning
BF 3-10: Substantial evidence for H₁
BF 10-30: Strong evidence
BF > 100: Decisive

KEY: Bayes factors can provide evidence FOR H₀!
(p-values cannot — they can only fail to reject H₀)

▌ WHEN TO USE BAYESIAN

✓ Prior information is available and valuable
✓ Small samples (prior regularizes)
✓ Need direct probability statements about parameters
✓ Sequential data collection (clinical monitoring)
✓ Hierarchical/multilevel data`,
        quiz: [
          { q: 'Posterior is proportional to:', opts: ['Prior only', 'Likelihood only', 'Likelihood × Prior', 'Prior / Likelihood'], ans: 2 },
          { q: '95% Bayesian credible interval means:', opts: ['95% of such intervals contain θ', 'P(θ in interval|data)=95%', '95% accurate data', 'Prior has 95% probability'], ans: 1 },
          { q: 'Conjugate prior produces posterior:', opts: ['Equal to prior', 'From same distribution family', 'Always uniform', 'Ignoring likelihood'], ans: 1 },
          { q: 'Bayes Factor of 25 provides ___ evidence for H₁:', opts: ['Barely worth mentioning', 'Substantial', 'Strong', 'Decisive'], ans: 2 },
          { q: 'Bayesian shrinkage toward prior:', opts: ['Disappears as n grows', 'Increases with n', 'Is always harmful', 'Only with uniform priors'], ans: 0 },
        ]
      },
    ]
  },
  {
    id: 'ch09', emoji: '📅', title: 'Time Series Analysis', level: 'Advanced',
    color: '#FF8C42', bg: '#FF8C4218',
    desc: 'Trends, seasonality, ARIMA models, and forecasting techniques.',
    topics: [
      {
        id: 't028', title: 'Time Series Fundamentals', mins: 18, pages: 7,
        content: `A time series is a sequence of observations indexed by time.

▌ COMPONENTS

① TREND (T): Long-term movement. Linear, exponential, or none.
   Examples: GDP growth, declining newspaper circulation.

② SEASONALITY (S): Regular periodic patterns with FIXED known period.
   Annual (December retail peak), Weekly (restaurant traffic), Daily.

③ CYCLICAL (C): Longer oscillations WITHOUT fixed period (2-10 years).
   Business cycles. Harder to predict than seasonality.

④ IRREGULAR (I): Random, unpredictable fluctuations. Residual noise.

▌ DECOMPOSITION MODELS

Additive: y_t = T_t + S_t + C_t + I_t
Use when seasonal variation is CONSTANT in size.

Multiplicative: y_t = T_t × S_t × C_t × I_t
Use when seasonal variation GROWS with the series level.

▌ STATIONARITY

Weakly stationary: Constant mean, constant variance, Cov depends only on lag k.
Most methods REQUIRE stationarity!

Making stationary:
First difference: Δy_t = y_t − y_{t-1} (removes trend)
Seasonal difference: y_t − y_{t-s} (removes seasonality)
Log transform: Stabilizes variance

▌ AUTOCORRELATION FUNCTION (ACF)

r_k = Cov(y_t, y_{t-k})/Var(y_t)
Measures correlation between y_t and its own past value k periods ago.
ACF plot reveals significant autocorrelations (outside ±1.96/√n bounds).

▌ SMOOTHING

Simple Moving Average: SMA_t = (y_t+y_{t-1}+...+y_{t-m+1})/m
Exponential Smoothing: S_t = α×y_t+(1-α)×S_{t-1}
α≈1: Responsive; α≈0: Smooth and slow.

Holt's: Handles trend.
Holt-Winters: Handles trend + seasonality.

▌ UNIT ROOT TEST

ADF (Augmented Dickey-Fuller):
H₀: Non-stationary (unit root exists)
Reject H₀ if p<0.05 → stationary.`,
        quiz: [
          { q: 'Which component repeats with fixed annual frequency?', opts: ['Trend', 'Cyclical', 'Seasonal', 'Irregular'], ans: 2 },
          { q: 'Stationary series has:', opts: ['Upward trend', 'Fixed seasonality', 'Constant mean and variance', 'Exponential growth'], ans: 2 },
          { q: 'First differencing removes:', opts: ['Seasonality', 'Trend', 'Irregular variation', 'Cyclical patterns'], ans: 1 },
          { q: 'In SES, α close to 1 means:', opts: ['Smooth slow-adapting', 'Heavy weight on recent data', 'No smoothing', 'Seasonal adjustment'], ans: 1 },
          { q: 'ADF test null hypothesis is:', opts: ['Series is stationary', 'Unit root exists (non-stationary)', 'No autocorrelation', 'ARMA is correct'], ans: 1 },
        ]
      },
      {
        id: 't029', title: 'ARIMA Models & Forecasting', mins: 22, pages: 9,
        content: `ARIMA models are the gold standard for univariate time series forecasting.

▌ AR(p) — Autoregressive

y_t = c + φ₁y_{t-1}+...+φₚy_{t-p} + ε_t
Current = weighted sum of p past values + noise.
PACF: Sharp cutoff after lag p.

▌ MA(q) — Moving Average

y_t = c + ε_t + θ₁ε_{t-1}+...+θqε_{t-q}
Current = current error + weighted past errors.
Always stationary. ACF: Sharp cutoff after lag q.

▌ ARIMA(p,d,q) — Combined with Differencing

p = AR order | d = differences for stationarity | q = MA order

ARIMA(0,1,0): Random walk
ARIMA(1,1,1): Combined with one differencing

▌ ACF/PACF IDENTIFICATION

Model    | ACF               | PACF
---------|-------------------|-------------------
AR(p)    | Decays gradually  | Sharp cutoff at p
MA(q)    | Sharp cutoff at q | Decays gradually
ARMA     | Decays after q    | Decays after p

▌ MODEL FITTING PROCEDURE

1. Plot series; check trend and seasonality
2. ADF test for stationarity; difference if needed
3. Plot ACF and PACF; identify p, q
4. Fit by MLE; compare AIC/BIC
5. Diagnose residuals: must be WHITE NOISE
   Ljung-Box test: p>0.05 → no remaining autocorrelation ✓
6. Forecast with prediction intervals

▌ FORECAST ACCURACY METRICS

MAE = (1/n)Σ|y_t−ŷ_t|
RMSE = √[(1/n)Σ(y_t−ŷ_t)²]
MAPE = (100/n)Σ|y_t−ŷ_t|/|y_t|
MASE < 1 beats naive forecast`,
        quiz: [
          { q: "In ARIMA(p,d,q), 'd' represents:", opts: ['AR order', 'Degree of differencing', 'MA order', 'Seasonal period'], ans: 1 },
          { q: 'AR(p) PACF signature:', opts: ['Gradual decay', 'Sharp cutoff after lag p', 'No pattern', 'Alternating signs'], ans: 1 },
          { q: 'Random walk is ARIMA:', opts: ['(1,0,0)', '(0,0,1)', '(0,1,0)', '(1,1,1)'], ans: 2 },
          { q: 'Ljung-Box p>0.05 on residuals means:', opts: ['Autocorrelation remains', 'Residuals are white noise', 'Wrong ARIMA order', 'Re-estimate model'], ans: 1 },
          { q: 'Forecast uncertainty ___ with horizon:', opts: ['Decreases', 'Stays constant', 'Increases', 'Oscillates'], ans: 2 },
        ]
      },
    ]
  },
  {
    id: 'ch10', emoji: '🤖', title: 'Statistics in Machine Learning', level: 'Advanced',
    color: '#F06595', bg: '#F0659518',
    desc: 'Bias-variance tradeoff, cross-validation, regularization, and PCA.',
    topics: [
      {
        id: 't030', title: 'Bias-Variance Tradeoff', mins: 18, pages: 7,
        content: `The bias-variance tradeoff is the fundamental challenge of machine learning.

▌ PREDICTION ERROR DECOMPOSITION

Expected MSE = Bias² + Variance + Irreducible Error

Irreducible Error (σ²): Noise that cannot be reduced by any model.

BIAS: Error from wrong assumptions (too simple model).
High bias → UNDERFITTING: bad on training AND test.
Example: Fitting a straight line to curved data.

VARIANCE: Sensitivity to training data fluctuations (too complex model).
High variance → OVERFITTING: great on training, poor on new data.
Example: High-degree polynomial memorizing noise.

▌ THE TRADEOFF

Simple (underfit): High bias, low variance → misses true pattern
Complex (overfit): Low bias, high variance → memorizes noise
GOAL: Find sweet spot with balanced bias and variance!

▌ DETECTING BIAS vs VARIANCE

HIGH BIAS:
• Training error is high
• Test error ≈ Training error (both high)
Solution: More complex model, better features.

HIGH VARIANCE:
• Training error very low
• Test error >> Training error (large gap!)
Solution: More data, regularization, simpler model.

▌ CROSS-VALIDATION (k-Fold)

1. Divide data into k equal folds (k=5 or 10 typical)
2. For each fold i: train on k-1 folds, validate on fold i
3. Average the k validation scores

ALL data used for both training and validation!
Standard for hyperparameter tuning and model comparison.

▌ REGULARIZATION λ

Large λ → strong penalty → more shrinkage → higher bias, lower variance
Small λ → weak penalty → less shrinkage → lower bias, higher variance
Optimal λ chosen by cross-validation!

▌ KEY RULES

More data ALWAYS reduces variance.
Better features can reduce bias.
Never evaluate on data used to SELECT the model! (data leakage)`,
        quiz: [
          { q: 'High bias indicates:', opts: ['Overfitting', 'Complex model', 'Underfitting', 'Large train error, even larger test'], ans: 2 },
          { q: 'Expected MSE = Bias² + Variance + ___', opts: ['n', 'Mean', 'Irreducible error', 'R²'], ans: 2 },
          { q: 'Overfitting: Training error is ___, test error is ___', opts: ['High, high', 'Low, high', 'High, low', 'Equal'], ans: 1 },
          { q: 'In k-fold cross-validation, each fold serves as:', opts: ['Training set once', 'Validation set once', 'Both', 'Test set permanently'], ans: 1 },
          { q: 'Large regularization λ leads to:', opts: ['Lower bias, higher variance', 'Higher bias, lower variance', 'Lower bias, lower variance', 'No effect'], ans: 1 },
        ]
      },
      {
        id: 't031', title: 'Principal Component Analysis (PCA)', mins: 20, pages: 8,
        content: `PCA reduces high-dimensional data to fewer dimensions while preserving maximum variance.

▌ THE PROBLEM PCA SOLVES

50 correlated variables → curse of dimensionality, visualization impossible, multicollinearity.
PCA transforms p correlated variables into k < p UNCORRELATED components!

▌ THE MATHEMATICS

1. Standardize (mean=0, SD=1) — CRITICAL if different units!
2. Compute covariance matrix Σ
3. Eigendecomposition: Σ = PΛPᵀ
   P = eigenvectors (directions), Λ = eigenvalues (variances)
4. PC₁ = direction of MAXIMUM variance
   PC₂ = max remaining variance, orthogonal to PC₁
5. Project: Z = XP (scores on each PC)

▌ HOW MANY COMPONENTS?

1. SCREE PLOT: Look for "elbow" — where adding components gives little.
2. VARIANCE THRESHOLD: Keep PCs until 80-90% of variance explained.
3. KAISER'S RULE: Keep PCs with eigenvalue > 1.

▌ LOADINGS

Loading = correlation between original variable and PC.
High |loading| → variable contributes strongly to that PC.

Example: 4 body measurements (height, weight, arm, leg):
PC1 (+all) = "overall body size" (60% variance)
PC2 (+legs, -weight) = "body shape/proportion" (20% variance)
Reduced from 4 to 2 dimensions (80% variance retained)!

▌ LIMITATIONS

• Components can be hard to interpret
• Assumes LINEAR relationships
• Sensitive to outliers (use Robust PCA if needed)
• Must STANDARDIZE when variables have different scales

▌ APPLICATIONS

Dimensionality reduction: 1000 genes → 10 PCs before classification
Visualization: 50D data plotted in 2D PC space
Noise reduction: Top PCs = signal; rest = noise
Multicollinearity: Use PC scores as uncorrelated regression predictors
Image compression: Reconstruct images with fewer components
Finance: Factor models from stock returns`,
        quiz: [
          { q: 'First principal component captures:', opts: ['Minimum variance direction', 'Maximum variance direction', 'Equal variance as all others', 'Direction correlated with Y'], ans: 1 },
          { q: "Kaiser's rule keeps components with eigenvalue:", opts: ['<1', '>0', '>1', '≥0.5'], ans: 2 },
          { q: 'Why standardize before PCA?', opts: ['Makes data normal', 'Prevents high-variance variables from dominating', 'Removes outliers', 'Increases components'], ans: 1 },
          { q: 'Scree plot helps determine:', opts: ['P-values', 'How many components to retain', 'Normality', 'Outliers'], ans: 1 },
          { q: 'PCA differs from Factor Analysis:', opts: ['PCA is always better', 'PCA is mathematical decomposition; FA models latent structure', 'PCA uses fewer variables', 'FA requires eigenvalues'], ans: 1 },
        ]
      },
    ]
  },
];

export const FORMULAS = [
  { cat: 'Central Tendency', name: 'Arithmetic Mean', formula: 'x̄ = Σxᵢ / n', use: 'Average of data values' },
  { cat: 'Central Tendency', name: 'Weighted Mean', formula: 'x̄_w = Σ(wᵢxᵢ)/Σwᵢ', use: 'Average with different weights' },
  { cat: 'Central Tendency', name: 'Geometric Mean', formula: 'GM = ⁿ√(x₁·x₂·...·xₙ)', use: 'Growth rates, ratios' },
  { cat: 'Central Tendency', name: 'Harmonic Mean', formula: 'HM = n/Σ(1/xᵢ)', use: 'Average rates/speeds' },
  { cat: 'Dispersion', name: 'Sample Variance', formula: 's² = Σ(xᵢ-x̄)²/(n-1)', use: 'Spread of sample data' },
  { cat: 'Dispersion', name: 'Standard Deviation', formula: 's = √s²', use: 'Typical deviation from mean' },
  { cat: 'Dispersion', name: 'Coefficient of Variation', formula: 'CV = (s/x̄)×100%', use: 'Relative variability comparison' },
  { cat: 'Dispersion', name: 'Z-Score', formula: 'z = (x - x̄)/s', use: 'Standard deviations from mean' },
  { cat: 'Dispersion', name: 'IQR', formula: 'IQR = Q3 - Q1', use: 'Spread of middle 50%' },
  { cat: 'Probability', name: 'Classical Probability', formula: 'P(A) = favorable/total', use: 'Equally likely outcomes' },
  { cat: 'Probability', name: 'Complement Rule', formula: "P(A') = 1 - P(A)", use: 'Probability of not A' },
  { cat: 'Probability', name: 'Addition Rule', formula: 'P(A∪B) = P(A)+P(B)-P(A∩B)', use: 'A or B (general)' },
  { cat: 'Probability', name: 'Conditional Probability', formula: 'P(A|B) = P(A∩B)/P(B)', use: 'A given B occurred' },
  { cat: 'Probability', name: "Bayes' Theorem", formula: 'P(B|A) = P(A|B)P(B)/P(A)', use: 'Update beliefs with evidence' },
  { cat: 'Distributions', name: 'Binomial PMF', formula: 'P(X=k)=C(n,k)pᵏ(1-p)ⁿ⁻ᵏ', use: 'Count successes in n trials' },
  { cat: 'Distributions', name: 'Binomial Mean/Var', formula: 'μ=np, σ²=np(1-p)', use: 'Binomial parameters' },
  { cat: 'Distributions', name: 'Poisson PMF', formula: 'P(X=k) = e⁻λλᵏ/k!', use: 'Count rare events' },
  { cat: 'Distributions', name: 'Poisson Mean/Var', formula: 'μ = σ² = λ', use: 'Unique Poisson property' },
  { cat: 'Distributions', name: 'Standardization', formula: 'Z = (X-μ)/σ', use: 'Convert to standard normal' },
  { cat: 'Inference', name: 'Confidence Interval', formula: 'x̄ ± z* · σ/√n', use: 'Range for population mean' },
  { cat: 'Inference', name: 't-statistic', formula: 't = (x̄-μ₀)/(s/√n)', use: 'Test mean, σ unknown' },
  { cat: 'Inference', name: 'Proportion CI', formula: 'p̂ ± z*√(p̂(1-p̂)/n)', use: 'Range for proportion' },
  { cat: 'Inference', name: 'Standard Error', formula: 'SE = s/√n', use: 'Precision of sample mean' },
  { cat: 'Inference', name: 'Chi-Square Stat', formula: 'χ² = Σ(O-E)²/E', use: 'Categorical data tests' },
  { cat: 'Inference', name: 'F-statistic (ANOVA)', formula: 'F = MS_Between/MS_Within', use: 'Compare group means' },
  { cat: 'Regression', name: 'OLS Slope', formula: 'β̂₁ = Sxy/Sxx', use: 'Simple regression slope' },
  { cat: 'Regression', name: 'OLS Intercept', formula: 'β̂₀ = ȳ - β̂₁x̄', use: 'Simple regression intercept' },
  { cat: 'Regression', name: 'R-Squared', formula: 'R² = SS_Reg/SS_Total', use: 'Proportion of variance explained' },
  { cat: 'Regression', name: 'Logistic Function', formula: 'P(Y=1)=1/(1+e^-(β₀+β₁X))', use: 'Binary outcome probability' },
  { cat: 'Regression', name: 'Odds Ratio', formula: 'OR = e^β', use: 'Effect size in logistic regression' },
];

export const GLOSSARY = [
  { term: 'Alpha (α)', def: 'Significance level; probability of Type I error (false positive)' },
  { term: 'Alternative Hypothesis', def: 'The claim we seek evidence for; denoted H₁ or Hₐ' },
  { term: 'ANOVA', def: 'Analysis of Variance; tests equality of 3+ group means using F-statistic' },
  { term: 'AUC', def: 'Area Under ROC Curve; measures classifier discrimination (0.5=random, 1=perfect)' },
  { term: 'Bayes Factor', def: 'Ratio of marginal likelihoods; quantifies evidence for H₁ vs H₀' },
  { term: 'Bayesian Inference', def: 'Framework treating parameters as random variables; updates beliefs with data' },
  { term: 'Beta (β)', def: 'Probability of Type II error (false negative); 1-β = power' },
  { term: 'Binomial Distribution', def: 'Probability distribution for successes in n independent binary trials' },
  { term: 'Box Plot', def: 'Graphical display of five-number summary with outliers marked as dots' },
  { term: 'Central Limit Theorem', def: 'Sample means approach normal distribution as n increases, regardless of population shape' },
  { term: 'Confidence Interval', def: 'Range of plausible values; 95% CI means 95% of such intervals contain the true parameter' },
  { term: 'Confounding Variable', def: 'Variable related to both predictor and outcome; can cause spurious associations' },
  { term: 'Correlation (Pearson r)', def: 'Measures linear association between two quantitative variables; ranges from -1 to +1' },
  { term: 'Credible Interval', def: 'Bayesian interval: P(parameter in interval|data) = 95%' },
  { term: 'Cross-Validation', def: 'Resampling method to estimate generalization performance; k-fold divides data into k subsets' },
  { term: 'Degrees of Freedom', def: 'Number of independent pieces of information; n-1 for sample variance' },
  { term: 'Effect Size', def: "Magnitude of difference or relationship; Cohen's d, η², Cramér's V" },
  { term: 'Empirical Rule', def: 'For normal: 68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ' },
  { term: 'Expected Value', def: 'Long-run average of a random variable; E(X)=Σx·P(X=x) for discrete' },
  { term: 'F-Distribution', def: 'Ratio of two chi-squared distributions; used in ANOVA and variance tests' },
  { term: 'Geometric Mean', def: 'nth root of product of n values; used for growth rates and ratios' },
  { term: 'Heteroscedasticity', def: 'Non-constant residual variance; violates regression assumption' },
  { term: 'Histogram', def: 'Frequency chart for continuous data; bars touch to show intervals' },
  { term: 'IQR', def: 'Interquartile Range = Q3-Q1; range of middle 50%; resistant to outliers' },
  { term: 'Kurtosis', def: 'Tail heaviness; excess kurtosis=0 for normal, >0 leptokurtic (fat tails)' },
  { term: 'LASSO', def: 'L1-penalized regression; variable selection by shrinking some coefficients to zero' },
  { term: 'Logistic Regression', def: 'Models probability of binary outcome using logistic (sigmoid) function' },
  { term: 'Mann-Whitney U', def: 'Non-parametric test comparing two independent groups; alternative to t-test' },
  { term: 'Median', def: 'Middle value of sorted data; resistant to outliers; use for skewed data' },
  { term: 'Mode', def: 'Most frequently occurring value(s); only valid measure for nominal data' },
  { term: 'Multicollinearity', def: 'High correlation among predictors; causes unstable regression coefficients' },
  { term: 'Normal Distribution', def: 'Bell-shaped symmetric distribution N(μ,σ²); ubiquitous in statistics' },
  { term: 'Null Hypothesis H₀', def: 'Default assumption of no effect or no difference' },
  { term: 'Odds Ratio', def: 'eᵝ in logistic regression; ratio of odds for unit increase in predictor' },
  { term: 'OLS', def: 'Ordinary Least Squares; regression method minimizing sum of squared residuals' },
  { term: 'Outlier', def: 'Value far from rest; beyond Q1-1.5×IQR or Q3+1.5×IQR by Tukey rule' },
  { term: 'p-value', def: 'Probability of getting results as extreme as observed, assuming H₀ is true' },
  { term: 'Parameter', def: 'Numerical characteristic of a population (μ, σ, p); usually unknown' },
  { term: 'Percentile', def: 'Value below which p% of observations fall' },
  { term: 'Poisson Distribution', def: 'Models count of rare events in fixed interval; E(X)=Var(X)=λ' },
  { term: 'Population', def: 'Complete set of all individuals of interest' },
  { term: 'Posterior Distribution', def: 'Updated parameter distribution after observing data in Bayesian analysis' },
  { term: 'Power (1-β)', def: 'Probability of correctly rejecting a false null hypothesis' },
  { term: 'Prior Distribution', def: 'Parameter distribution encoding beliefs before observing data in Bayesian analysis' },
  { term: 'R² (R-squared)', def: 'Proportion of Y variance explained by the regression model; 0 to 1' },
  { term: 'Random Variable', def: 'Variable whose value is determined by random experiment; assigns numbers to outcomes' },
  { term: 'Residual', def: 'Observed minus predicted value in regression: e = y - ŷ' },
  { term: 'Ridge Regression', def: 'L2-penalized regression; shrinks coefficients toward zero without eliminating them' },
  { term: 'Sample', def: 'Subset of population selected for study' },
  { term: 'Skewness', def: 'Asymmetry of distribution; positive=right tail, negative=left tail' },
  { term: 'Spearman Correlation', def: 'Non-parametric correlation measuring monotonic relationship using ranks' },
  { term: 'Standard Deviation', def: 'Square root of variance; typical distance from mean in original units' },
  { term: 'Standard Error', def: 'SE=s/√n; typical variation of sample means across different samples' },
  { term: 'Statistic', def: 'Numerical characteristic computed from a sample (x̄, s, p̂)' },
  { term: 'Student\'s t-distribution', def: 'Heavy-tailed symmetric distribution; approaches normal as df increases' },
  { term: 't-Test', def: 'Hypothesis test comparing means; uses t-distribution when σ is unknown' },
  { term: 'Type I Error', def: 'Rejecting true null hypothesis (false positive); probability = α' },
  { term: 'Type II Error', def: 'Failing to reject false null hypothesis (false negative); probability = β' },
  { term: 'Variance', def: 'Average squared deviation from mean; σ²=Σ(xᵢ-μ)²/N or s²=Σ(xᵢ-x̄)²/(n-1)' },
  { term: 'VIF', def: 'Variance Inflation Factor; measures multicollinearity; VIF>10 = severe problem' },
  { term: 'Z-Score', def: 'z=(x-μ)/σ; number of standard deviations above or below the mean' },
];

export const TOTAL_TOPICS = CHAPTERS.reduce((a, c) => a + c.topics.length, 0);
export const ALL_QUIZ_QUESTIONS = CHAPTERS.flatMap(ch =>
  ch.topics.flatMap(t =>
    (t.quiz || []).map((q, i) => ({ ...q, topicId: t.id, chId: ch.id, idx: i }))
  )
);
