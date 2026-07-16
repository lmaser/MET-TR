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

function collapseHarmonicPeaksToTonalPeaks(rawPeaks, maxTonalPeaks = 12) {
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
      for (let harmonic = 2; harmonic <= 32; harmonic += 1) {
        const error = harmonicCentsError(peak.freq, candidate.freq, harmonic);
        if (error < ownerError - 0.001 || (Math.abs(error - ownerError) <= 0.001 && harmonic < ownerHarmonic)) {
          owner = candidate;
          ownerHarmonic = harmonic;
          ownerError = error;
        }
      }
    }
    const tolerance = ownerHarmonic <= 5 ? 48 : ownerHarmonic <= 12 ? 38 : 30;
    const strongEnoughOwner = owner && owner.value >= peak.value * (ownerHarmonic <= 4 ? 0.22 : 0.12);
    const expectedHarmonicValue = owner ? owner.value / Math.pow(ownerHarmonic, 0.46) : 0;
    const tooStrongForHarmonic = ownerHarmonic === 2 && peak.value > expectedHarmonicValue * 1.18;
    if (owner && ownerError <= tolerance && strongEnoughOwner && !tooStrongForHarmonic) {
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
  const scored = tonal
    .map((peak) => ({
      ...peak,
      value: clamp(peak.value * (1 + Math.min(0.28, peak.harmonicSupport * 0.08)), 0, 1),
      score: clamp((peak.score || peak.value) + Math.min(0.28, peak.harmonicSupport * 0.05), 0, 1)
    }));
  const strongestValue = Math.max(0.0001, ...scored.map((peak) => peak.value || 0));
  return scored
    .filter((peak) => {
      const relative = (peak.value || 0) / strongestValue;
      const supported = (peak.harmonicSupport || 0) >= 0.045 || (peak.harmonicCount || 0) >= 2;
      return relative >= 0.16 || supported;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, clamp(Math.round(maxTonalPeaks), 8, 64))
    .sort((a, b) => a.freq - b.freq);
}

function selectMusicalTonalPeaks(peaks, maxPeaks = 6) {
  const cleanPeaks = (peaks || [])
    .filter((peak) => Number.isFinite(peak.freq) && peak.freq > 0 && Number.isFinite(peak.value) && peak.value > 0)
    .map((peak) => ({ ...peak, value: clamp(peak.value, 0, 1), score: clamp(peak.score || peak.value, 0, 1) }));
  if (cleanPeaks.length <= 2) return cleanPeaks.sort((a, b) => a.freq - b.freq);
  const strongestValue = Math.max(0.0001, ...cleanPeaks.map((peak) => peak.value));
  const strongestScore = Math.max(0.0001, ...cleanPeaks.map((peak) => peak.score || peak.value));
  const ranked = cleanPeaks
    .map((peak) => {
      const relativeValue = peak.value / strongestValue;
      const relativeScore = (peak.score || peak.value) / strongestScore;
      const lowAnchorBias = clamp(1 - Math.log2(Math.max(1, peak.freq / 2200)) * 0.18, 0.72, 1.08);
      const support = clamp((peak.harmonicSupport || 0) * 0.65 + (peak.harmonicCount || 0) * 0.035, 0, 0.28);
      const musicalScore = clamp((relativeValue * 0.68 + relativeScore * 0.32) * lowAnchorBias + support, 0, 1.4);
      return { ...peak, musicalScore, relativeValue };
    })
    .sort((a, b) => b.musicalScore - a.musicalScore);
  const selected = [];
  const minimumScore = cleanPeaks.length > 5 ? 0.34 : 0.26;
  for (const peak of ranked) {
    const strong = peak.relativeValue >= 0.3 || peak.musicalScore >= minimumScore;
    const supported = (peak.harmonicSupport || 0) >= 0.08 || (peak.harmonicCount || 0) >= 3;
    if (!strong && !supported && selected.length >= 2) continue;
    const duplicate = selected.some((candidate) => Math.abs(1200 * Math.log2(peak.freq / candidate.freq)) < 42);
    if (duplicate) continue;
    const octaveShadow = selected.some((candidate) => {
      for (let harmonic = 2; harmonic <= 4; harmonic *= 2) {
        const error = harmonicCentsError(peak.freq, candidate.freq, harmonic);
        if (error <= 36 && (selected.length >= 2 || peak.relativeValue < 0.9)) return true;
      }
      return false;
    });
    if (octaveShadow) continue;
    selected.push(peak);
    if (selected.length >= maxPeaks) break;
  }
  if (selected.length < 2) {
    for (const peak of ranked) {
      if (!selected.some((candidate) => Math.abs(1200 * Math.log2(peak.freq / candidate.freq)) < 42)) selected.push(peak);
      if (selected.length >= Math.min(2, ranked.length)) break;
    }
  }
  return selected.sort((a, b) => a.freq - b.freq);
}

function inferMusicalFundamentalsFromHarmonicSieve(rawPeaks, maxPeaks = 6) {
  const cleanPeaks = (rawPeaks || [])
    .filter((peak) => Number.isFinite(peak.freq) && peak.freq >= 45 && peak.freq <= 6200 && Number.isFinite(peak.value) && peak.value > 0)
    .map((peak) => ({
      ...peak,
      value: clamp(peak.value, 0, 1),
      score: clamp(peak.score || peak.value, 0, 1)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 96);
  if (!cleanPeaks.length) return [];
  const strongest = Math.max(0.0001, ...cleanPeaks.map((peak) => peak.value));
  const seeds = [];
  for (const peak of cleanPeaks) {
    if (peak.value < strongest * 0.045 && (peak.score || 0) < 0.08) continue;
    for (let harmonic = 1; harmonic <= 18; harmonic += 1) {
      const fundamental = peak.freq / harmonic;
      if (fundamental < 45 || fundamental > 1800) continue;
      const harmonicBias = harmonic === 1 ? 1.08 : 1 / Math.pow(harmonic, 0.28);
      const vote = peak.value * harmonicBias * (0.72 + clamp((peak.prominence || 2) / 18, 0, 0.38));
      const existing = seeds.find((seed) => Math.abs(1200 * Math.log2(fundamental / seed.freq)) < 24);
      if (existing) {
        existing.freq = (existing.freq * existing.vote + fundamental * vote) / Math.max(0.0001, existing.vote + vote);
        existing.vote += vote;
        existing.seedCount += 1;
      } else {
        seeds.push({ freq: fundamental, vote, seedCount: 1 });
      }
    }
  }
  const candidates = seeds.map((seed) => {
    let support = 0;
    let weightedFreq = 0;
    let weightSum = 0;
    let harmonicCount = 0;
    let directValue = 0;
    let directError = Infinity;
    for (let harmonic = 1; harmonic <= 28; harmonic += 1) {
      const target = seed.freq * harmonic;
      if (target > 6200) break;
      const tolerance = harmonic <= 4 ? 34 : harmonic <= 12 ? 28 : 22;
      let best = null;
      let bestError = Infinity;
      for (const peak of cleanPeaks) {
        const error = Math.abs(1200 * Math.log2(peak.freq / target));
        if (error < bestError) {
          best = peak;
          bestError = error;
        }
      }
      if (!best || bestError > tolerance) continue;
      const closeness = 1 - bestError / tolerance;
      const harmonicWeight = 1 / Math.pow(harmonic, 0.34);
      const contribution = best.value * harmonicWeight * closeness;
      support += contribution;
      weightedFreq += (best.freq / harmonic) * contribution;
      weightSum += contribution;
      harmonicCount += 1;
      if (harmonic === 1) {
        directValue = best.value * closeness;
        directError = bestError;
      }
    }
    const refinedFreq = weightSum > 0 ? weightedFreq / weightSum : seed.freq;
    const harmonicRichness = clamp((harmonicCount - 1) / 7, 0, 1);
    const directBoost = directValue > 0 ? 0.42 + directValue * 0.58 : 0.72;
    const lowBias = clamp(1 - Math.log2(Math.max(1, refinedFreq / 1600)) * 0.12, 0.78, 1.1);
    const confidence = clamp((support * directBoost * lowBias) / 2.2 + harmonicRichness * 0.16, 0, 1.4);
    return {
      freq: refinedFreq,
      value: clamp(confidence, 0, 1),
      score: clamp(confidence, 0, 1),
      harmonicSupport: support,
      harmonicCount,
      directValue,
      directError,
      seedVote: seed.vote
    };
  })
    .filter((candidate) => candidate.directValue >= 0.2 && (candidate.harmonicCount >= 2 || candidate.directValue >= 0.34))
    .sort((a, b) => b.score - a.score);
  const selected = [];
  const topScore = Math.max(0.0001, candidates[0]?.score || 0);
  for (const candidate of candidates) {
    if (candidate.score < topScore * 0.3 && selected.length >= 2) continue;
    const duplicate = selected.some((existing) => Math.abs(1200 * Math.log2(candidate.freq / existing.freq)) < 42);
    if (duplicate) continue;
    const harmonicShadow = selected.some((existing) => {
      for (let harmonic = 2; harmonic <= 8; harmonic += 1) {
        const error = harmonicCentsError(candidate.freq, existing.freq, harmonic);
        const weakerDirectEvidence = (candidate.directValue || 0) <= (existing.directValue || existing.value || 0) * 0.9;
        const weakerHarmonicEvidence = (candidate.harmonicCount || 0) <= (existing.harmonicCount || 0) * 0.78;
        if (error <= 34 && weakerDirectEvidence && weakerHarmonicEvidence) return true;
        if (error <= 34 && selected.length >= 2) return true;
        if (error <= 34 && candidate.score < existing.score * 0.92) return true;
      }
      return false;
    });
    if (harmonicShadow) continue;
    selected.push(candidate);
    if (selected.length >= maxPeaks) break;
  }
  return selected.sort((a, b) => a.freq - b.freq);
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

function fftRadix2(real, imag) {
  const n = real.length;
  let j = 0;
  for (let i = 1; i < n; i += 1) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [real[i], real[j]] = [real[j], real[i]];
      [imag[i], imag[j]] = [imag[j], imag[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const angle = -2 * Math.PI / len;
    const wLenR = Math.cos(angle);
    const wLenI = Math.sin(angle);
    for (let i = 0; i < n; i += len) {
      let wr = 1;
      let wi = 0;
      for (let k = 0; k < len / 2; k += 1) {
        const uR = real[i + k];
        const uI = imag[i + k];
        const vR = real[i + k + len / 2] * wr - imag[i + k + len / 2] * wi;
        const vI = real[i + k + len / 2] * wi + imag[i + k + len / 2] * wr;
        real[i + k] = uR + vR;
        imag[i + k] = uI + vI;
        real[i + k + len / 2] = uR - vR;
        imag[i + k + len / 2] = uI - vI;
        const nextR = wr * wLenR - wi * wLenI;
        wi = wr * wLenI + wi * wLenR;
        wr = nextR;
      }
    }
  }
}

function oscillatorSample(type, phase) {
  const wrapped = phase - Math.floor(phase);
  if (type === "sine") return Math.sin(Math.PI * 2 * wrapped);
  if (type === "square") return wrapped < 0.5 ? 1 : -1;
  return 2 * wrapped - 1;
}

function bandLimitedOscillatorSample(type, freq, t, sampleRate) {
  if (type === "sine") return oscillatorSample("sine", freq * t);
  const nyquist = sampleRate * 0.5;
  const maxHarmonic = Math.max(1, Math.floor(nyquist / Math.max(1, freq)));
  let sum = 0;
  let norm = 0;
  for (let harmonic = 1; harmonic <= maxHarmonic; harmonic += 1) {
    if (type === "square" && harmonic % 2 === 0) continue;
    const amp = 1 / (type === "square" ? harmonic : Math.pow(harmonic, 0.92));
    sum += Math.sin(Math.PI * 2 * freq * harmonic * t) * amp;
    norm += amp;
  }
  return norm > 0 ? sum / norm : 0;
}

function fftPeaksForDualOsc(freqA, freqB, type = "saw", fftSize = 16384, sampleRate = 44100) {
  const real = new Array(fftSize).fill(0);
  const imag = new Array(fftSize).fill(0);
  for (let i = 0; i < fftSize; i += 1) {
    const t = i / sampleRate;
    const hann = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (fftSize - 1));
    real[i] = (bandLimitedOscillatorSample(type, freqA, t, sampleRate) + bandLimitedOscillatorSample(type, freqB, t, sampleRate)) * 0.5 * hann;
  }
  fftRadix2(real, imag);
  const half = fftSize / 2;
  const mags = [];
  let maxMag = 0;
  for (let i = 1; i < half; i += 1) {
    const mag = Math.hypot(real[i], imag[i]);
    mags[i] = mag;
    if (mag > maxMag) maxMag = mag;
  }
  const binHz = sampleRate / fftSize;
  const peaks = [];
  for (let i = 3; i < half - 3; i += 1) {
    if (i * binHz < 55 || i * binHz > 6200) continue;
    const mag = mags[i] || 0;
    if (mag < maxMag * 0.004 || mag < (mags[i - 1] || 0) || mag < (mags[i + 1] || 0)) continue;
    const shoulder = Math.max(mags[i - 5] || 0, mags[i - 3] || 0, mags[i + 3] || 0, mags[i + 5] || 0);
    const prominence = 20 * Math.log10((mag + 1e-12) / (shoulder + 1e-12));
    if (prominence < 0.6 && mag < maxMag * 0.035) continue;
    const left = mags[i - 1] || mag;
    const right = mags[i + 1] || mag;
    const denominator = left - 2 * mag + right;
    const offset = Math.abs(denominator) > 1e-12 ? clamp(0.5 * (left - right) / denominator, -0.5, 0.5) : 0;
    const freq = (i + offset) * binHz;
    const value = clamp(Math.sqrt(mag / maxMag), 0, 1);
    const score = clamp(value * 0.82 + clamp(prominence / 18, 0, 1) * 0.18, 0, 1);
    peaks.push({ freq, value, score, db: -18 + 20 * Math.log10((mag + 1e-12) / (maxMag + 1e-12)), prominence });
  }
  peaks.sort((a, b) => b.score - a.score);
  const deduped = [];
  for (const peak of peaks) {
    if (deduped.some((existing) => Math.abs(1200 * Math.log2(peak.freq / existing.freq)) < 22)) continue;
    deduped.push(peak);
    if (deduped.length >= 512) break;
  }
  return deduped.sort((a, b) => a.freq - b.freq);
}

function leakyHarmonicSeries(freq, type = "saw", harmonics = 16, base = 1) {
  const peaks = [];
  for (let harmonic = 1; harmonic <= harmonics; harmonic += 1) {
    if (type === "square" && harmonic % 2 === 0) continue;
    const value = base / (type === "square" ? harmonic : Math.pow(harmonic, 0.92));
    const center = freq * harmonic;
    peaks.push({ freq: center, value, score: value, db: -18 - 6 * Math.log2(harmonic) });
    if (harmonic > 1) {
      const sideValue = value * (harmonic <= 5 ? 0.34 : 0.22);
      peaks.push({ freq: center * 2 ** ((18 + harmonic * 0.7) / 1200), value: sideValue, score: sideValue, db: -24 - 6 * Math.log2(harmonic) });
      peaks.push({ freq: center * 2 ** (-(15 + harmonic * 0.5) / 1200), value: sideValue * 0.82, score: sideValue * 0.82, db: -25 - 6 * Math.log2(harmonic) });
    }
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
  },
  {
    name: "leaky saw semitone keeps the same musical interval",
    rawPeaks: [...leakyHarmonicSeries(220, "saw", 18), ...leakyHarmonicSeries(220 * 2 ** (1 / 12), "saw", 18, 0.96)],
    expect: (tonal, r) => tonal.length === 2 && r.intervals[0]?.label === "m2" && r.musicalTension >= 0.72
  },
  {
    name: "leaky saw fifth keeps the same musical interval",
    rawPeaks: [...leakyHarmonicSeries(220, "saw", 18), ...leakyHarmonicSeries(330, "saw", 18, 0.96)],
    expect: (tonal, r) => tonal.length === 2 && r.intervals[0]?.label === "P5" && r.musicalConsonance >= 0.72
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

const intervalSweep = harmonicIntervalTargets.map((target) => {
  const base = 220;
  const sine = evaluateHarmonicPeakSet(pair(base, target.ratio));
  const sawPeaks = [...harmonicSeries(base, "saw", 16), ...harmonicSeries(base * target.ratio, "saw", 16, 1)];
  const tonal = collapseHarmonicPeaksToTonalPeaks(sawPeaks, 48);
  const saw = evaluateHarmonicPeakSet(tonal);
  const sineLabel = sine.intervals[0]?.label || "--";
  const sawLabel = saw.intervals[0]?.label || "--";
  const tensionDelta = Math.abs(sine.musicalTension - saw.musicalTension);
  const pass = tonal.length >= 2 && sineLabel === target.label && sawLabel === target.label && tensionDelta <= 0.22;
  return { name: `saw sweep ${target.label}`, pass, target, sine, saw, tonal, tensionDelta };
});

const descendingIntervalSweep = harmonicIntervalTargets.map((target) => {
  const top = 440;
  const lower = top / target.ratio;
  const sine = evaluateHarmonicPeakSet([
    { freq: lower, value: 1 },
    { freq: top, value: 1 }
  ]);
  const sawPeaks = [...harmonicSeries(top, "saw", 16), ...harmonicSeries(lower, "saw", 16, 1)];
  const tonal = collapseHarmonicPeaksToTonalPeaks(sawPeaks, 48);
  const saw = evaluateHarmonicPeakSet(tonal);
  const sineLabel = sine.intervals[0]?.label || "--";
  const sawLabel = saw.intervals[0]?.label || "--";
  const tensionDelta = Math.abs(sine.musicalTension - saw.musicalTension);
  const pass = tonal.length >= 2 && sineLabel === target.label && sawLabel === target.label && tensionDelta <= 0.22;
  return { name: `descending saw sweep ${target.label}`, pass, target, sine, saw, tonal, tensionDelta };
});

const fftSweep = harmonicIntervalTargets.map((target) => {
  const base = 220;
  const sinePeaks = collapseHarmonicPeaksToTonalPeaks(fftPeaksForDualOsc(base, base * target.ratio, "sine"), 16);
  const sawPeaks = inferMusicalFundamentalsFromHarmonicSieve(fftPeaksForDualOsc(base, base * target.ratio, "saw"), 6);
  const sine = evaluateHarmonicPeakSet(sinePeaks);
  const saw = evaluateHarmonicPeakSet(sawPeaks);
  const sineLabel = sine.intervals[0]?.label || "--";
  const sawLabel = saw.intervals[0]?.label || "--";
  const tensionDelta = Math.abs(sine.musicalTension - saw.musicalTension);
  const pass = sineLabel === target.label && sawLabel === target.label && sawPeaks.length <= 4 && tensionDelta <= 0.24;
  return { name: `fft saw sweep ${target.label}`, pass, target, sine, saw, sinePeaks, sawPeaks, tensionDelta };
});

const fftMonophonic = ["sine", "saw", "square"].map((type) => {
  const rawPeaks = fftPeaksForDualOsc(220, 220, type);
  const musicalPeaks = inferMusicalFundamentalsFromHarmonicSieve(rawPeaks, 6);
  const result = evaluateHarmonicPeakSet(musicalPeaks);
  const pass = musicalPeaks.length === 1
    && Math.abs(1200 * Math.log2(musicalPeaks[0].freq / 220)) <= 16
    && result.tension <= 0.08
    && result.consonance >= 0.92;
  return { name: `fft monophonic ${type} filters to fundamental only`, pass, musicalPeaks, result };
});

for (const item of intervalSweep) {
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.name}: tonal=${item.tonal.map((p) => p.freq.toFixed(1)).join(",")} sine=${item.sine.intervals[0]?.label || "--"} saw=${item.saw.intervals[0]?.label || "--"} delta=${item.tensionDelta.toFixed(3)}`);
}

for (const item of descendingIntervalSweep) {
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.name}: tonal=${item.tonal.map((p) => p.freq.toFixed(1)).join(",")} sine=${item.sine.intervals[0]?.label || "--"} saw=${item.saw.intervals[0]?.label || "--"} delta=${item.tensionDelta.toFixed(3)}`);
}

for (const item of fftSweep) {
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.name}: sineTonal=${item.sinePeaks.map((p) => p.freq.toFixed(1)).join(",")} sawTonal=${item.sawPeaks.map((p) => p.freq.toFixed(1)).join(",")} sine=${item.sine.intervals[0]?.label || "--"} saw=${item.saw.intervals[0]?.label || "--"} delta=${item.tensionDelta.toFixed(3)}`);
}

for (const item of fftMonophonic) {
  const r = item.result;
  console.log(`${item.pass ? "PASS" : "FAIL"} ${item.name}: musical=${item.musicalPeaks.map((p) => `${p.freq.toFixed(1)}:${p.value.toFixed(2)}`).join(",") || "--"} tension=${r.tension.toFixed(3)} consonance=${r.consonance.toFixed(3)}`);
}

const failed = [...results, ...collapseResults, ...intervalSweep, ...descendingIntervalSweep, ...fftSweep, ...fftMonophonic].filter((item) => !item.pass);
if (failed.length) {
  console.error(`\n${failed.length} harmonic tension checks failed.`);
  process.exit(1);
}
