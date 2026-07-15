#!/usr/bin/env node

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const harmonicIntervalTargets = [
  { id: "min2", label: "m2", semitone: 1, ratio: 16 / 15, musicalConsonance: 0.04, acousticConsonance: 0.08 },
  { id: "maj2", label: "M2", semitone: 2, ratio: 9 / 8, musicalConsonance: 0.2, acousticConsonance: 0.28 },
  { id: "min3", label: "m3", semitone: 3, ratio: 6 / 5, musicalConsonance: 0.58, acousticConsonance: 0.52 },
  { id: "maj3", label: "M3", semitone: 4, ratio: 5 / 4, musicalConsonance: 0.66, acousticConsonance: 0.62 },
  { id: "fourth", label: "P4", semitone: 5, ratio: 4 / 3, musicalConsonance: 0.78, acousticConsonance: 0.78 },
  { id: "tritone", label: "TT", semitone: 6, ratio: Math.SQRT2, musicalConsonance: 0.08, acousticConsonance: 0.18 },
  { id: "fifth", label: "P5", semitone: 7, ratio: 3 / 2, musicalConsonance: 0.93, acousticConsonance: 0.91 },
  { id: "min6", label: "m6", semitone: 8, ratio: 8 / 5, musicalConsonance: 0.52, acousticConsonance: 0.52 },
  { id: "maj6", label: "M6", semitone: 9, ratio: 5 / 3, musicalConsonance: 0.7, acousticConsonance: 0.62 },
  { id: "min7", label: "m7", semitone: 10, ratio: 16 / 9, musicalConsonance: 0.24, acousticConsonance: 0.34 },
  { id: "maj7", label: "M7", semitone: 11, ratio: 15 / 8, musicalConsonance: 0.1, acousticConsonance: 0.2 },
  { id: "octave", label: "Oct", semitone: 12, ratio: 2, musicalConsonance: 1, acousticConsonance: 1 }
];

function nearestHarmonicInterval(ratio) {
  if (!Number.isFinite(ratio) || ratio <= 0) return null;
  const totalCents = 1200 * Math.log2(ratio);
  let octaveCents = totalCents % 1200;
  if (octaveCents < 0) octaveCents += 1200;
  if (octaveCents < 50 || octaveCents > 1150) octaveCents = 1200;
  let best = null;
  for (const target of harmonicIntervalTargets) {
    const cents = Math.abs(octaveCents - target.semitone * 100);
    const tolerance = target.id === "tritone" ? 72 : target.id === "octave" ? 52 : 82;
    const closeness = clamp(1 - cents / tolerance, 0, 1);
    if (!best || closeness > best.closeness) best = { ...target, cents, closeness };
  }
  return best;
}

function harmonicRoughnessForPair(f1, f2, a1, a2) {
  const minFreq = Math.min(f1, f2);
  const maxFreq = Math.max(f1, f2);
  const s = 0.24 / (0.021 * minFreq + 19);
  const x = (maxFreq - minFreq) * s;
  const plomp = Math.exp(-3.5 * x) - Math.exp(-5.75 * x);
  return Math.max(0, a1 * a2 * plomp * 4.8);
}

function evaluateHarmonicPeakSet(peaks) {
  const cleanPeaks = peaks
    .filter((peak) => Number.isFinite(peak.freq) && peak.freq > 0 && Number.isFinite(peak.value) && peak.value > 0)
    .map((peak) => ({ ...peak, value: clamp(peak.value, 0, 1) }))
    .sort((a, b) => a.freq - b.freq);
  if (cleanPeaks.length === 1) {
    return { consonance: 1, tension: 0, roughness: 0, harmonicity: 1, intervals: [] };
  }
  if (cleanPeaks.length < 1) {
    return { consonance: 0, tension: 0, roughness: 0, harmonicity: 0, intervals: [] };
  }
  let roughness = 0;
  let intervalDissonance = 0;
  let consonanceWeighted = 0;
  let musicalConsonanceWeighted = 0;
  let weightSum = 0;
  let harmonicity = 0;
  let clusterEnergy = 0;
  const intervals = [];
  for (let i = 0; i < cleanPeaks.length; i += 1) {
    for (let j = i + 1; j < cleanPeaks.length; j += 1) {
      const a = cleanPeaks[i];
      const b = cleanPeaks[j];
      const ratio = b.freq / a.freq;
      if (ratio < 1.008 || ratio > 8) continue;
      const nearest = nearestHarmonicInterval(ratio);
      if (!nearest) continue;
      const baseWeight = Math.sqrt(a.value * b.value);
      const closeness = clamp(nearest.closeness, 0, 1);
      const roughPair = harmonicRoughnessForPair(a.freq, b.freq, a.value, b.value);
      const roughPenalty = clamp((roughPair / Math.max(0.0001, baseWeight)) ** 0.62, 0, 1);
      const acousticConsonance = clamp(nearest.acousticConsonance * closeness * (1 - roughPenalty * 0.58) + 0.04 * (1 - closeness), 0, 1);
      const musicalConsonance = clamp(nearest.musicalConsonance * closeness + 0.04 * (1 - closeness), 0, 1);
      const intervalConsonance = clamp(acousticConsonance * 0.58 + musicalConsonance * 0.42, 0, 1);
      const dissonance = baseWeight * (1 - intervalConsonance) * (0.35 + closeness * 0.45);
      roughness += roughPair;
      intervalDissonance += dissonance;
      consonanceWeighted += acousticConsonance * baseWeight;
      musicalConsonanceWeighted += musicalConsonance * baseWeight;
      weightSum += baseWeight;
      harmonicity += baseWeight * closeness * nearest.acousticConsonance;
      if (nearest.id === "min2" || nearest.id === "maj7") clusterEnergy += baseWeight * closeness;
      intervals.push({ label: nearest.label, consonance: intervalConsonance, roughness: roughPair + dissonance, closeness });
    }
  }
  const pairDenom = Math.max(0.0001, weightSum);
  const roughNorm = clamp(((roughness * 0.82 + intervalDissonance * 0.92) / pairDenom) ** 0.72, 0, 1);
  const harmNorm = clamp(harmonicity / pairDenom, 0, 1);
  const acousticConsonance = clamp(consonanceWeighted / pairDenom, 0, 1);
  const musicalConsonance = clamp(musicalConsonanceWeighted / pairDenom, 0, 1);
  const clusterNorm = clamp(clusterEnergy / pairDenom, 0, 1);
  const acousticTension = clamp(roughNorm * 0.72 + (1 - acousticConsonance) * 0.2 + (1 - harmNorm) * 0.08 + clusterNorm * 0.18, 0, 1);
  const musicalTension = clamp((1 - musicalConsonance) * 0.76 + clusterNorm * 0.16 + (1 - harmNorm) * 0.08, 0, 1);
  const tension = clamp(acousticTension * 0.58 + musicalTension * 0.42, 0, 1);
  const consonance = clamp(acousticConsonance * 0.58 + musicalConsonance * 0.42, 0, 1);
  return { consonance, acousticConsonance, musicalConsonance, tension, acousticTension, musicalTension, roughness: roughNorm, harmonicity: harmNorm, intervals };
}

function harmonicCentsError(freq, fundamental, harmonic) {
  if (!freq || !fundamental || !harmonic) return Infinity;
  return Math.abs(1200 * Math.log2(freq / (fundamental * harmonic)));
}

function collapseHarmonicPeaksToTonalPeaks(rawPeaks) {
  const sorted = rawPeaks
    .filter((peak) => Number.isFinite(peak.freq) && peak.freq > 0 && Number.isFinite(peak.value) && peak.value > 0)
    .map((peak) => ({ ...peak, value: clamp(peak.value, 0, 1), harmonicSupport: 0, harmonicCount: 0 }))
    .sort((a, b) => a.freq - b.freq);
  const tonal = [];
  for (const peak of sorted) {
    let owner = null;
    let ownerHarmonic = 1;
    let ownerError = Infinity;
    for (const candidate of tonal) {
      for (let harmonic = 2; harmonic <= 12; harmonic += 1) {
        const error = harmonicCentsError(peak.freq, candidate.freq, harmonic);
        if (error < ownerError) {
          owner = candidate;
          ownerHarmonic = harmonic;
          ownerError = error;
        }
      }
    }
    const tolerance = ownerHarmonic <= 5 ? 34 : 24;
    const strongEnoughOwner = owner && owner.value >= peak.value * (ownerHarmonic <= 4 ? 0.22 : 0.12);
    if (owner && ownerError <= tolerance && strongEnoughOwner) {
      const contribution = peak.value / Math.pow(ownerHarmonic, 0.86);
      owner.harmonicSupport += contribution;
      owner.harmonicCount += 1;
      owner.value = clamp(owner.value + contribution * 0.18, 0, 1);
      owner.db = Math.max(owner.db ?? -120, peak.db ?? -120);
      continue;
    }
    const duplicate = tonal.find((candidate) => Math.abs(1200 * Math.log2(peak.freq / candidate.freq)) < 38);
    if (duplicate) {
      duplicate.value = clamp(Math.max(duplicate.value, peak.value) + Math.min(duplicate.value, peak.value) * 0.12, 0, 1);
      duplicate.db = Math.max(duplicate.db ?? -120, peak.db ?? -120);
      continue;
    }
    tonal.push({ ...peak });
  }
  return tonal
    .map((peak) => ({
      ...peak,
      value: clamp(peak.value * (1 + Math.min(0.28, peak.harmonicSupport * 0.08)), 0, 1),
      score: clamp((peak.score || peak.value) + Math.min(0.28, peak.harmonicSupport * 0.05), 0, 1)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .sort((a, b) => a.freq - b.freq);
}

function pair(freqA, ratio) {
  return [
    { freq: freqA, value: 1 },
    { freq: freqA * ratio, value: 1 }
  ];
}

function harmonicSeries(freq, type = "saw", harmonics = 10, base = 1) {
  const peaks = [];
  for (let harmonic = 1; harmonic <= harmonics; harmonic += 1) {
    if (type === "square" && harmonic % 2 === 0) continue;
    const value = base / (type === "square" ? harmonic : Math.pow(harmonic, 0.92));
    peaks.push({ freq: freq * harmonic, value, score: value, db: -18 - 6 * Math.log2(harmonic) });
  }
  return peaks;
}

const cases = [
  { name: "minor second", peaks: pair(440, 16 / 15), label: "m2", expect: (r) => r.musicalTension >= 0.8 && r.musicalConsonance <= 0.12 },
  { name: "major second", peaks: pair(440, 9 / 8), label: "M2", expect: (r) => r.musicalTension >= 0.62 && r.musicalConsonance <= 0.28 },
  { name: "minor third", peaks: pair(440, 6 / 5), label: "m3", expect: (r) => r.musicalTension <= 0.58 && r.musicalConsonance >= 0.4 },
  { name: "major third", peaks: pair(440, 5 / 4), label: "M3", expect: (r) => r.musicalTension <= 0.52 && r.musicalConsonance >= 0.48 },
  { name: "perfect fourth", peaks: pair(440, 4 / 3), label: "P4", expect: (r) => r.musicalTension <= 0.3 && r.musicalConsonance >= 0.7 },
  { name: "tritone", peaks: pair(440, Math.SQRT2), label: "TT", expect: (r) => r.musicalTension >= 0.76 && r.musicalConsonance <= 0.16 },
  { name: "perfect fifth", peaks: pair(440, 3 / 2), label: "P5", expect: (r) => r.musicalTension <= 0.24 && r.musicalConsonance >= 0.84 },
  { name: "minor sixth", peaks: pair(440, 8 / 5), label: "m6", expect: (r) => r.musicalTension <= 0.58 && r.musicalConsonance >= 0.38 },
  { name: "major sixth", peaks: pair(440, 5 / 3), label: "M6", expect: (r) => r.musicalTension <= 0.48 && r.musicalConsonance >= 0.52 },
  { name: "minor seventh", peaks: pair(440, 16 / 9), label: "m7", expect: (r) => r.musicalTension >= 0.58 && r.musicalConsonance <= 0.32 },
  { name: "major seventh", peaks: pair(440, 15 / 8), label: "M7", expect: (r) => r.musicalTension >= 0.76 && r.musicalConsonance <= 0.18 },
  { name: "octave", peaks: pair(220, 2), label: "Oct", expect: (r) => r.tension <= 0.25 && r.consonance >= 0.82 && r.harmonicity >= 0.82 }
];

const collapseCases = [
  {
    name: "saw single note collapses to one tonal peak",
    rawPeaks: harmonicSeries(440, "saw", 10),
    expect: (tonal, r) => tonal.length === 1 && r.tension <= 0.05 && r.consonance >= 0.95
  },
  {
    name: "square single note collapses to one tonal peak",
    rawPeaks: harmonicSeries(220, "square", 11),
    expect: (tonal, r) => tonal.length === 1 && r.tension <= 0.05 && r.consonance >= 0.95
  },
  {
    name: "two saw semitone notes remain dissonant after harmonic collapse",
    rawPeaks: [...harmonicSeries(440, "saw", 9), ...harmonicSeries(440 * 2 ** (1 / 12), "saw", 9, 0.94)],
    expect: (tonal, r) => tonal.length === 2 && r.tension >= 0.72 && r.consonance <= 0.16
  },
  {
    name: "two saw fifth notes stay consonant after harmonic collapse",
    rawPeaks: [...harmonicSeries(220, "saw", 10), ...harmonicSeries(330, "saw", 8, 0.9)],
    expect: (tonal, r) => tonal.length === 2 && r.tension <= 0.38 && r.consonance >= 0.72
  }
];

const results = cases.map((test) => {
  const result = evaluateHarmonicPeakSet(test.peaks);
  return { name: test.name, pass: test.expect(result) && result.intervals[0]?.label === test.label, result };
});

for (const item of results) {
  const r = item.result;
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.name}: tension=${r.tension.toFixed(3)} consonance=${r.consonance.toFixed(3)} harmonicity=${r.harmonicity.toFixed(3)} roughness=${r.roughness.toFixed(3)} interval=${r.intervals[0]?.label || "--"}`);
}

const collapseResults = collapseCases.map((test) => {
  const tonal = collapseHarmonicPeaksToTonalPeaks(test.rawPeaks);
  const result = evaluateHarmonicPeakSet(tonal);
  return { name: test.name, pass: test.expect(tonal, result), result, tonal };
});

for (const item of collapseResults) {
  const r = item.result;
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.name}: tonal=${item.tonal.length} raw=${item.tonal.length ? item.tonal.map((p) => p.freq.toFixed(1)).join(",") : "--"} tension=${r.tension.toFixed(3)} consonance=${r.consonance.toFixed(3)} harmonicity=${r.harmonicity.toFixed(3)} interval=${r.intervals[0]?.label || "--"}`);
}

const failed = [...results, ...collapseResults].filter((item) => !item.pass);
if (failed.length) {
  console.error(`\n${failed.length} harmonic tension checks failed.`);
  process.exit(1);
}
