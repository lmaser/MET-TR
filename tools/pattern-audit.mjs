#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const downloads = path.join(process.env.USERPROFILE || "C:\\Users\\Dev", "Downloads");
const outDir = path.join(repoRoot, "docs", "generated");

const FFT_SIZE = 8192;
const HOP_SIZE = 512;
const OFFLINE_EVENT_TIME_BIAS_SECONDS = 0.035;
const MIN_DB = -100;
const MAX_DB = -30;
const DEFAULT_THRESHOLD = 1;
const DEFAULT_SENSITIVITY = 1;
const DEFAULT_MIN_SEPARATION = 0.08;
const RHYTHM_WINDOW_SECONDS = 4;
const DECISION_LATENCY_SECONDS = 0.012;

const PROFILE = {
  kick: { sensitivity: 1.1, threshold: 0.92, gain: 3.05, envAttack: 0.04, envRelease: 0.16, hold: 0.68 },
  tom: { sensitivity: 0.82, threshold: 0.96, gain: 2.1, envAttack: 0.045, envRelease: 0.22, hold: 0.46 },
  snare: { sensitivity: 1.08, threshold: 0.9, gain: 3.1, envAttack: 0.04, envRelease: 0.16, hold: 0.68 },
  hat: { sensitivity: 1.25, threshold: 0.74, gain: 2.65, envAttack: 0.018, envRelease: 0.26, hold: 0.55 },
  cymbal: { sensitivity: 1.1, threshold: 0.82, gain: 2.45, envAttack: 0.018, envRelease: 0.34, hold: 0.7 },
  global: { sensitivity: 1, threshold: 1, gain: 2.8, envAttack: 0.04, envRelease: 0.16, hold: 0.68 }
};

const REFERENCE_FILES = [
  { expected: "kick", file: "kick.wav" },
  { expected: "snare", file: "snare.wav" },
  { expected: "tom", file: "tom.wav" },
  { expected: "hat", file: "hats.wav" },
  { expected: "cymbal", file: "cymbal.wav" }
];

const LABELS = ["kick", "tom", "snare", "hat", "cymbal"];
const MIDI_DRUM_NOTES = {
  kick: 36,
  snare: 38,
  tom: 45,
  hat: 42,
  cymbal: 49
};
const MIDI_NOTE_TO_DRUM = Object.fromEntries(Object.entries(MIDI_DRUM_NOTES).map(([key, value]) => [value, key]));
const MIDI_TICKS_PER_QUARTER = 480;
const MIDI_BPM = 120;
const MIDI_TICKS_PER_SECOND = MIDI_TICKS_PER_QUARTER * MIDI_BPM / 60;
const COMPETITION = {
  kick: { close: 0.72, floor: 0.14, decay: 0.42 },
  tom: { close: 0.82, floor: 0.1, decay: 0.32 },
  snare: { close: 0.62, floor: 0.2, decay: 0.44 },
  hat: { close: 0.62, floor: 0.18, decay: 0.5 },
  cymbal: { close: 0.68, floor: 0.16, decay: 0.54 },
  global: { close: 0, floor: 1, decay: 1 }
};
const CLASS_TIMING = {
  kick: { lock: 0.18, minSeparation: 0.18 },
  tom: { lock: 0.045, minSeparation: 0.22 },
  snare: { lock: 0.3, minSeparation: 0.13 },
  hat: { lock: 0.07, minSeparation: 0.045 },
  cymbal: { lock: 0.28, minSeparation: 0.2 },
  global: { lock: 0, minSeparation: 0.08 }
};
const CLASS_FAMILY = {
  kick: "low",
  tom: "low",
  snare: "midHigh",
  hat: "midHigh",
  cymbal: "midHigh"
};

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / Math.max(1e-9, edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function readString(buffer, offset, length) {
  return buffer.toString("ascii", offset, offset + length);
}

function decodeWav(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (readString(buffer, 0, 4) !== "RIFF" || readString(buffer, 8, 4) !== "WAVE") {
    throw new Error(`${filePath} is not a RIFF/WAVE file`);
  }

  let offset = 12;
  let fmt = null;
  let dataOffset = -1;
  let dataSize = 0;

  while (offset + 8 <= buffer.length) {
    const id = readString(buffer, offset, 4);
    const size = buffer.readUInt32LE(offset + 4);
    const body = offset + 8;
    if (id === "fmt ") {
      fmt = {
        audioFormat: buffer.readUInt16LE(body),
        channels: buffer.readUInt16LE(body + 2),
        sampleRate: buffer.readUInt32LE(body + 4),
        bitsPerSample: buffer.readUInt16LE(body + 14)
      };
    } else if (id === "data") {
      dataOffset = body;
      dataSize = size;
    }
    offset = body + size + (size % 2);
  }

  if (!fmt || dataOffset < 0) throw new Error(`${filePath} is missing fmt/data chunks`);
  if (![1, 3].includes(fmt.audioFormat)) {
    throw new Error(`${filePath} uses unsupported WAV format ${fmt.audioFormat}`);
  }

  const frames = Math.floor(dataSize / (fmt.channels * fmt.bitsPerSample / 8));
  const mono = new Float32Array(frames);
  const bytesPerSample = fmt.bitsPerSample / 8;

  for (let frame = 0; frame < frames; frame += 1) {
    let sum = 0;
    for (let ch = 0; ch < fmt.channels; ch += 1) {
      const pos = dataOffset + (frame * fmt.channels + ch) * bytesPerSample;
      let value = 0;
      if (fmt.audioFormat === 3 && fmt.bitsPerSample === 32) {
        value = buffer.readFloatLE(pos);
      } else if (fmt.bitsPerSample === 16) {
        value = buffer.readInt16LE(pos) / 32768;
      } else if (fmt.bitsPerSample === 24) {
        let raw = buffer.readUIntLE(pos, 3);
        if (raw & 0x800000) raw |= 0xff000000;
        value = raw / 8388608;
      } else if (fmt.bitsPerSample === 32) {
        value = buffer.readInt32LE(pos) / 2147483648;
      } else if (fmt.bitsPerSample === 8) {
        value = (buffer.readUInt8(pos) - 128) / 128;
      } else {
        throw new Error(`${filePath} uses unsupported bit depth ${fmt.bitsPerSample}`);
      }
      sum += value;
    }
    mono[frame] = clamp(sum / fmt.channels, -1, 1);
  }

  return { samples: mono, sampleRate: fmt.sampleRate, channels: fmt.channels, bitsPerSample: fmt.bitsPerSample };
}

function hann(size) {
  const window = new Float32Array(size);
  for (let i = 0; i < size; i += 1) {
    window[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (size - 1));
  }
  return window;
}

function fftRadix2(real, imag) {
  const n = real.length;
  let j = 0;
  for (let i = 1; i < n - 1; i += 1) {
    let bit = n >> 1;
    while (j & bit) {
      j ^= bit;
      bit >>= 1;
    }
    j ^= bit;
    if (i < j) {
      const tr = real[i];
      const ti = imag[i];
      real[i] = real[j];
      imag[i] = imag[j];
      real[j] = tr;
      imag[j] = ti;
    }
  }

  for (let len = 2; len <= n; len <<= 1) {
    const angle = -2 * Math.PI / len;
    const wlenR = Math.cos(angle);
    const wlenI = Math.sin(angle);
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
        const nextWr = wr * wlenR - wi * wlenI;
        wi = wr * wlenI + wi * wlenR;
        wr = nextWr;
      }
    }
  }
}

function byteSpectrum(samples, start, window, sampleRate) {
  const size = window.length;
  const real = new Float32Array(size);
  const imag = new Float32Array(size);
  let sumSq = 0;
  let peak = 0;
  for (let i = 0; i < size; i += 1) {
    const sample = samples[start + i] || 0;
    real[i] = sample * window[i];
    sumSq += sample * sample;
    peak = Math.max(peak, Math.abs(sample));
  }
  fftRadix2(real, imag);
  const bins = size / 2;
  const freq = new Uint8Array(bins);
  for (let i = 0; i < bins; i += 1) {
    const mag = Math.hypot(real[i], imag[i]) / (size * 0.5);
    const db = 20 * Math.log10(mag + 1e-12);
    freq[i] = Math.round(clamp((db - MIN_DB) / (MAX_DB - MIN_DB), 0, 1) * 255);
  }
  return {
    freq,
    metrics: {
      rms: Math.sqrt(sumSq / FFT_SIZE),
      peak,
      sampleRate
    }
  };
}

function bandAverageHz(freq, sampleRate, minHz, maxHz) {
  const nyquist = sampleRate * 0.5;
  const start = clamp(Math.floor(minHz / nyquist * freq.length), 0, freq.length - 1);
  const end = clamp(Math.ceil(maxHz / nyquist * freq.length), start + 1, freq.length);
  let sum = 0;
  let count = 0;
  for (let i = start; i < end; i += 1) {
    sum += freq[i] / 255;
    count += 1;
  }
  return count ? sum / count : 0;
}

function bandPositiveFluxHz(freq, previous, sampleRate, minHz, maxHz, weightPower = 0) {
  const nyquist = sampleRate * 0.5;
  const start = clamp(Math.floor(minHz / nyquist * freq.length), 0, freq.length - 1);
  const end = clamp(Math.ceil(maxHz / nyquist * freq.length), start + 1, freq.length);
  let sum = 0;
  let weightSum = 0;
  for (let i = start; i < end; i += 1) {
    const current = freq[i] / 255;
    const last = previous[i] / 255;
    const binHz = (i + 0.5) / freq.length * nyquist;
    const norm = clamp((binHz - minHz) / Math.max(1, maxHz - minHz), 0, 1);
    const weight = weightPower ? Math.pow(0.35 + norm, weightPower) : 1;
    sum += Math.max(0, current - last) * weight;
    weightSum += weight;
  }
  return weightSum ? sum / weightSum : 0;
}

function bandHfcHz(freq, sampleRate, minHz, maxHz, weightPower = 1) {
  const nyquist = sampleRate * 0.5;
  const start = clamp(Math.floor(minHz / nyquist * freq.length), 0, freq.length - 1);
  const end = clamp(Math.ceil(maxHz / nyquist * freq.length), start + 1, freq.length);
  let sum = 0;
  let weightSum = 0;
  for (let i = start; i < end; i += 1) {
    const mag = freq[i] / 255;
    const binHz = (i + 0.5) / freq.length * nyquist;
    const norm = clamp((binHz - minHz) / Math.max(1, maxHz - minHz), 0, 1);
    const weight = Math.pow(0.3 + norm, weightPower);
    sum += mag * mag * weight;
    weightSum += weight;
  }
  return weightSum ? Math.sqrt(sum / weightSum) : 0;
}

function spectralFlux(freq, previous) {
  let sum = 0;
  for (let i = 0; i < freq.length; i += 1) {
    sum += Math.max(0, freq[i] / 255 - previous[i] / 255);
  }
  return clamp(sum / freq.length * 9, 0, 1);
}

function computeFrameFeatures(freq, previous, metrics, state, sampleRate) {
  metrics.flux = spectralFlux(freq, previous);

  const deepSub = bandAverageHz(freq, sampleRate, 28, 60);
  const kickFundamental = bandAverageHz(freq, sampleRate, 32, 70);
  const kickPunch = bandAverageHz(freq, sampleRate, 70, 115);
  const tomCore = bandAverageHz(freq, sampleRate, 70, 125);
  const tomRing = bandAverageHz(freq, sampleRate, 90, 180);
  const tomUpper = bandAverageHz(freq, sampleRate, 125, 260);
  const snareShell = bandAverageHz(freq, sampleRate, 120, 260);
  const snareBody = bandAverageHz(freq, sampleRate, 170, 1800);
  const snareCrack = bandAverageHz(freq, sampleRate, 1800, 7000);
  const clapNoise = bandAverageHz(freq, sampleRate, 1500, 6500);
  const hatCore = bandAverageHz(freq, sampleRate, 3800, 8200);
  const hatAir = bandAverageHz(freq, sampleRate, 8200, 12500);
  const hatTick = bandHfcHz(freq, sampleRate, 3600, 9200, 1.05);
  const cymbalBody = bandAverageHz(freq, sampleRate, 4800, 9000);
  const cymbalAir = bandAverageHz(freq, sampleRate, 8500, 18000);
  const cymbalWash = bandHfcHz(freq, sampleRate, 5200, 18000, 1.2);
  const lowMid = bandAverageHz(freq, sampleRate, 250, 900);
  const boxMid = bandAverageHz(freq, sampleRate, 260, 900);
  const highBand = bandAverageHz(freq, sampleRate, 8000, 20000);
  const kickFlux = bandPositiveFluxHz(freq, previous, sampleRate, 32, 118, 0);
  const tomFlux = bandPositiveFluxHz(freq, previous, sampleRate, 70, 260, 0.1);
  const snareFlux = bandPositiveFluxHz(freq, previous, sampleRate, 900, 7600, 0.45);
  const hatFlux = bandPositiveFluxHz(freq, previous, sampleRate, 3600, 9200, 1.05);
  const cymbalFlux = bandPositiveFluxHz(freq, previous, sampleRate, 5200, 18000, 1.1);

  const globalEnergy = metrics.rms * 0.4 + metrics.flux * 0.45 + metrics.peak * 0.15;
  const kickLowMass = kickFundamental * 0.9 + deepSub * 0.46 + kickPunch * 0.24;
  const snareNoiseMass = snareCrack * 0.5 + clapNoise * 0.3 + snareShell * 0.3;
  const kickDominance = clamp((kickLowMass - snareNoiseMass * 0.45 - boxMid * 0.16 - hatCore * 0.12 + 0.05) * 2.35, 0, 1);
  const snareDominance = clamp((snareNoiseMass + snareShell * 0.24 - kickLowMass * 0.5 + 0.03) * 1.85, 0, 1);
  const tomDominance = clamp((tomCore * 0.95 + tomRing * 0.45 - deepSub * 0.62 - snareCrack * 0.16 - hatCore * 0.08 + 0.02) * 2, 0, 1);
  const hatDominance = clamp((hatCore * 0.9 + hatTick * 0.32 - cymbalAir * 0.44 - snareShell * 0.1 + 0.01) * 1.8, 0, 1);
  const cymbalDominance = clamp((cymbalAir * 0.92 + cymbalWash * 0.5 + highBand * 0.24 - hatCore * 0.12 + 0.01) * 1.6, 0, 1);
  const tomRatio = tomCore / Math.max(0.001, deepSub + kickFundamental * 0.28);
  const snareBodyGate = smoothstep(0.08, 0.42, snareShell + snareBody * 0.28);
  const highToBodyRatio = (hatCore + hatAir * 0.5 + hatTick * 0.35) / Math.max(0.001, snareShell + snareBody * 0.35);
  const hatSpectralGate = smoothstep(0.9, 1.95, highToBodyRatio);
  const hatOnlyGate = smoothstep(0.08, 0.34, hatCore + hatTick * 0.4) * (1 - smoothstep(0.1, 0.5, snareShell + snareBody * 0.2));
  const tomCandidate = smoothstep(0.16, 0.5, tomCore + tomRing * 0.85 + tomUpper * 0.34)
    * smoothstep(0.58, 1.42, tomRatio)
    * (1 - smoothstep(0.42, 0.92, snareCrack + clapNoise * 0.35));
  const tomGate = smoothstep(0.26, 0.78, tomDominance + tomFlux * 2 + tomRing * 0.5) * (0.24 + tomCandidate * 0.82);
  const kickTransientGate = smoothstep(0.002, 0.018, kickFlux + Math.max(0, kickFundamental - state.envelope.kick) * 0.14 + metrics.bassHit * 0.035);
  const kickCandidate = smoothstep(0.14, 0.58, kickFundamental + deepSub * 0.55 + kickPunch * 0.28)
    * (1 - smoothstep(0.22, 0.78, snareNoiseMass + hatCore * 0.25) * (1 - kickDominance * 0.45))
    * (1 - tomCandidate * smoothstep(0.18, 0.64, tomCore + tomRing));
  const snareCandidate = smoothstep(0.14, 0.72, snareNoiseMass + snareBody * 0.18)
    * (0.3 + snareBodyGate * 0.84)
    * (1 - smoothstep(0.4, 0.9, kickLowMass) * (1 - snareDominance * 0.5));
  const hatCandidate = smoothstep(0.11, 0.48, hatCore + hatTick * 0.35 + hatAir * 0.12)
    * (0.46 + Math.max(hatOnlyGate, hatSpectralGate) * 0.76)
    * (1 - smoothstep(0.32, 0.82, snareNoiseMass + cymbalAir * 0.25) * 0.34);
  const cymbalCandidate = smoothstep(0.1, 0.46, cymbalAir + cymbalWash * 0.32 + highBand * 0.12)
    * (1 - smoothstep(0.18, 0.54, hatCore - cymbalAir * 0.32) * 0.28);
  const highTail = Math.max(state.envelope.hat * 0.5, state.envelope.cymbal * 0.4);
  const hatTransient = Math.max(0, hatFlux * 3 + hatTick * 0.26 - highTail * 0.16);
  const cymbalTransient = Math.max(0, cymbalFlux * 2.6 + cymbalWash * 0.28 - state.envelope.cymbal * 0.1);

  const features = {
    kick: Math.max(0, (kickFundamental * 0.94 + deepSub * 0.44 + kickPunch * 0.28 + kickFlux * 1.35 + Math.max(0, kickLowMass - snareShell) * 0.24 - tomCore * 0.18 - snareShell * 0.2 - snareCrack * 0.3 - clapNoise * 0.18 - hatCore * 0.12 - boxMid * 0.1) * (0.72 + kickDominance * 0.64) * (0.18 + kickTransientGate * 0.82) * (0.18 + kickCandidate * 0.82)),
    tom: Math.max(0, (tomCore * 0.72 + tomRing * 0.78 + tomUpper * 0.2 + Math.max(0, tomCore - deepSub * 0.52) * 0.52 + tomFlux * 0.86 + lowMid * 0.03 - kickFundamental * 0.1 - deepSub * 0.2 - snareCrack * 0.14 - hatCore * 0.08) * (0.24 + tomDominance * 0.58) * tomGate),
    snare: Math.max(0, (snareShell * 0.7 + snareBody * 0.26 + snareCrack * 0.42 + clapNoise * 0.16 + snareFlux * 0.92 + metrics.flux * 0.04 - kickFundamental * 0.18 - kickPunch * 0.08 - hatCore * 0.24 - hatAir * 0.12) * (0.62 + snareDominance * 0.58) * (0.28 + snareCandidate * 0.84)),
    hat: Math.max(0, (hatCore * 0.72 + hatTick * 0.42 + hatAir * 0.14 + hatTransient * 0.48 + highBand * 0.08 - kickFundamental * 0.04 - kickPunch * 0.02 - cymbalAir * 0.16 - snareShell * 0.1) * (0.68 + hatDominance * 0.42) * (0.42 + hatCandidate * 0.84)),
    cymbal: Math.max(0, (cymbalBody * 0.24 + cymbalAir * 0.56 + cymbalWash * 0.36 + cymbalTransient * 0.42 + highBand * 0.14 - kickFundamental * 0.04) * (0.72 + cymbalDominance * 0.42) * (0.44 + cymbalCandidate * 0.76)),
    global: globalEnergy
  };

  if (features.kick > features.tom * 0.72 || kickDominance > tomDominance + 0.08) {
    features.tom *= 0.04 + tomGate * 0.1;
  } else if (features.tom > features.kick * 1.25 && tomGate > 0.55) {
    features.kick *= 0.5 + kickDominance * 0.12;
  }

  if (features.snare > features.kick * 0.92 && snareDominance > kickDominance) {
    features.kick *= 0.42 + kickDominance * 0.36;
  } else if (features.kick > features.snare * 0.82 && kickDominance > snareDominance && snareDominance < 0.42) {
    features.snare *= 0.54 + snareDominance * 0.24;
  }
  if (snareCandidate > 0.42 && snareBodyGate > 0.26 && kickDominance < 0.72) {
    features.kick *= 0.48 + kickDominance * 0.28;
  }
  if (snareCandidate > 0.34 && snareCrack + snareShell * 0.36 > (kickFundamental + deepSub * 0.5) * 0.42) {
    features.kick *= 0.38 + kickDominance * 0.24;
  }

  if (snareBodyGate > 0.46 && snareCandidate > 0.42) {
    features.cymbal *= 0.28 + cymbalCandidate * 0.3;
    features.hat *= 0.52 + hatCandidate * 0.22;
  }
  if (Math.max(hatOnlyGate, hatSpectralGate) > 0.34 && snareBodyGate < 0.58) {
    features.snare *= 0.2 + snareBodyGate * 0.42;
    features.hat *= 1.14 + Math.max(hatOnlyGate, hatSpectralGate) * 0.32;
  }
  if (cymbalCandidate > 0.62 && cymbalAir > hatCore * 0.92 && snareBodyGate < 0.52) {
    features.hat *= 0.58 + hatCandidate * 0.28;
    features.snare *= 0.62 + snareCandidate * 0.18;
  }
  if (cymbalCandidate > 0.42 && cymbalWash + cymbalAir * 0.42 > hatTick + hatCore * 0.22) {
    features.cymbal *= 1.14 + cymbalCandidate * 0.22;
    features.hat *= 0.46 + hatCandidate * 0.24;
  }
  if (cymbalCandidate > 0.5 && cymbalAir > snareShell + snareBody * 0.28 && snareBodyGate < 0.62) {
    features.snare *= 0.5 + snareBodyGate * 0.28;
  }

  return {
    features,
    diagnostics: {
      kickFlux,
      tomFlux,
      snareFlux,
      hatFlux,
      cymbalFlux,
      kickDominance,
      tomDominance,
      snareDominance,
      hatDominance,
      cymbalDominance,
      tomGate,
      kickTransientGate,
      tonalLowTail: clamp((kickFundamental + deepSub) * 0.5 - kickFlux * 4, 0, 1),
      highWash: clamp(cymbalAir * 0.55 + cymbalWash * 0.45 - cymbalFlux * 2, 0, 1)
    }
  };
}

function createPatternState() {
  const state = {
    previous: { kick: 0, tom: 0, snare: 0, hat: 0, cymbal: 0, global: 0 },
    envelope: { kick: 0, tom: 0, snare: 0, hat: 0, cymbal: 0, global: 0 },
    hits: { kick: 0, tom: 0, snare: 0, hat: 0, cymbal: 0, global: 0 },
    lastHit: { kick: -99, tom: -99, snare: -99, hat: -99, cymbal: -99, global: -99 },
    classLock: { type: null, until: -99 },
    pendingHits: [],
    events: []
  };
  return state;
}

function releasePendingHits(state, time, threshold, minSeparation) {
  const released = Object.fromEntries([...LABELS, "global"].map((label) => [label, 0]));
  const due = [];
  const waiting = [];
  for (const pending of state.pendingHits) {
    if (pending.releaseAt <= time) due.push(pending);
    else waiting.push(pending);
  }
  state.pendingHits = waiting;
  if (!due.length) return released;

  const familyWinners = {};
  for (const candidate of due) {
    const family = CLASS_FAMILY[candidate.key];
    if (!family) continue;
    if (!familyWinners[family] || candidate.score > familyWinners[family].score) {
      familyWinners[family] = candidate;
    }
  }

  for (const candidate of due) {
    const key = candidate.key;
    const profile = PROFILE[key] || PROFILE.global;
    const competition = COMPETITION[key] || COMPETITION.global;
    let hit = candidate.hit;
    const family = CLASS_FAMILY[key];
    const familyWinner = family ? familyWinners[family] : null;
    if (familyWinner && key !== familyWinner.key && key !== "global") {
      const ratio = candidate.score / Math.max(0.001, familyWinner.score);
      const gate = competition.floor + smoothstep(competition.close, 1.04, ratio) * (1 - competition.floor);
      hit *= gate;
    }
    state.hits[key] = Math.max(state.hits[key], hit);
    const timing = CLASS_TIMING[key] || CLASS_TIMING.global;
    const effectiveMinSeparation = Math.max(minSeparation, timing.minSeparation);
    if (hit > threshold * profile.threshold && time - state.lastHit[key] > effectiveMinSeparation) {
      released[key] = Math.max(released[key] || 0, hit);
      state.lastHit[key] = time;
      if (key !== "global") {
        state.classLock = { type: key, family: CLASS_FAMILY[key], until: time + timing.lock };
      }
      state.events.push({ time, type: key, strength: hit });
    }
  }

  return released;
}

function updateDetectorState(state, frame, time) {
  const rankedFeatures = LABELS
    .map((label) => ({ label, value: clamp(frame.features[label], 0, 1) }))
    .sort((a, b) => b.value - a.value);
  const familyTop = {};
  for (const item of rankedFeatures) {
    const family = CLASS_FAMILY[item.label];
    if (family && !familyTop[family]) familyTop[family] = item;
  }
  for (const key of Object.keys(frame.features)) {
    const profile = PROFILE[key] || PROFILE.global;
    const competition = COMPETITION[key] || COMPETITION.global;
    const value = clamp(frame.features[key], 0, 1);
    const env = state.envelope[key];
    const rise = Math.max(0, value - state.previous[key]);
    const relativeNovelty = Math.max(0, value - env) / Math.max(0.045, env * 0.7 + 0.035);
    const novelty = Math.max(0, value - env) + rise * 0.8 + relativeNovelty * 0.045;
    const localThreshold = DEFAULT_THRESHOLD * 0.34 * profile.threshold;
    const rawHit = clamp((novelty * DEFAULT_SENSITIVITY * profile.sensitivity - localThreshold) * profile.gain, 0, 1);
    const family = CLASS_FAMILY[key];
    const topFeature = family ? familyTop[family] : null;
    const featureRatio = key === "global" || !topFeature ? 1 : value / Math.max(0.001, topFeature.value);
    const rankGate = key === "global" || !topFeature || key === topFeature.label
      ? 1
      : competition.floor + smoothstep(competition.close, 1.04, featureRatio) * (1 - competition.floor);
    let hit = rawHit * rankGate;
    if (state.classLock.type && time < state.classLock.until && key !== state.classLock.type && key !== "global" && state.classLock.family === family) {
      const lockedFeature = clamp(frame.features[state.classLock.type] || 0, 0, 1);
      const escapeGate = smoothstep(1.12, 1.8, value / Math.max(0.001, lockedFeature));
      hit *= 0.18 + escapeGate * 0.82;
    }
    const strongestOther = Math.max(...Object.entries(frame.features)
      .filter(([other]) => other !== key && other !== "global")
      .map(([, otherValue]) => clamp(otherValue, 0, 1)));
    const dominantHold = value >= strongestOther * 0.85 ? profile.hold : Math.min(profile.hold, 0.46);
    state.hits[key] *= dominantHold * competition.decay;
    state.envelope[key] = lerp(env, value, value > env ? profile.envAttack : profile.envRelease);
    state.previous[key] = value;
    if (hit > 0.001) {
      state.pendingHits.push({
        key,
        hit,
        value,
        score: hit * (0.45 + value * 0.55),
        time,
        releaseAt: time + DECISION_LATENCY_SECONDS
      });
    }
  }
  return releasePendingHits(state, time, DEFAULT_THRESHOLD, DEFAULT_MIN_SEPARATION);
}

function analyzeSamples(name, samples, sampleRate, expected) {
  const padded = new Float32Array(samples.length + FFT_SIZE);
  padded.set(samples, 0);
  const window = hann(FFT_SIZE);
  const previous = new Uint8Array(FFT_SIZE / 2);
  const state = createPatternState();
  const peaks = Object.fromEntries(LABELS.map((label) => [label, 0]));
  const averages = Object.fromEntries(LABELS.map((label) => [label, 0]));
  const peakFeatures = Object.fromEntries(LABELS.map((label) => [label, 0]));
  const hitCounts = Object.fromEntries(LABELS.map((label) => [label, 0]));
  const firstHit = Object.fromEntries(LABELS.map((label) => [label, null]));
  const retriggersAfter250ms = Object.fromEntries(LABELS.map((label) => [label, 0]));
  const diagnostics = {
    tonalLowTailMax: 0,
    highWashMax: 0,
    kickTransientGateMax: 0,
    tomGateMax: 0,
    fluxMax: 0
  };
  const metricEnvelope = { low: 0, mid: 0, rms: 0, smoothedPeak: 0 };
  let frameCount = 0;
  let sumRms = 0;
  let sumPeak = 0;

  for (let start = 0; start + FFT_SIZE <= padded.length; start += HOP_SIZE) {
    const time = Math.max(0, (start + FFT_SIZE) / sampleRate - OFFLINE_EVENT_TIME_BIAS_SECONDS);
    const spectrum = byteSpectrum(padded, start, window, sampleRate);
    spectrum.metrics.low = bandAverageHz(spectrum.freq, sampleRate, 0.01 * sampleRate * 0.5, 0.09 * sampleRate * 0.5);
    spectrum.metrics.mid = bandAverageHz(spectrum.freq, sampleRate, 0.09 * sampleRate * 0.5, 0.34 * sampleRate * 0.5);
    const bassTransient = Math.max(0, spectrum.metrics.low - metricEnvelope.low);
    const midTransient = Math.max(0, spectrum.metrics.mid - metricEnvelope.mid);
    const rmsTransient = Math.max(0, spectrum.metrics.rms - metricEnvelope.rms);
    spectrum.metrics.flux = spectralFlux(spectrum.freq, previous);
    spectrum.metrics.bassHit = clamp(
      bassTransient * 13
        + rmsTransient * 6.5
        + Math.max(0, spectrum.metrics.peak - metricEnvelope.smoothedPeak) * 2.2
        + spectrum.metrics.flux * 0.45,
      0,
      1
    );
    spectrum.metrics.midHit = clamp(midTransient * 14 + spectrum.metrics.flux * 0.55 + rmsTransient * 2.4, 0, 1);
    metricEnvelope.low = lerp(metricEnvelope.low, spectrum.metrics.low, spectrum.metrics.low > metricEnvelope.low ? 0.025 : 0.12);
    metricEnvelope.mid = lerp(metricEnvelope.mid, spectrum.metrics.mid, spectrum.metrics.mid > metricEnvelope.mid ? 0.03 : 0.16);
    metricEnvelope.rms = lerp(metricEnvelope.rms, spectrum.metrics.rms, spectrum.metrics.rms > metricEnvelope.rms ? 0.03 : 0.14);
    metricEnvelope.smoothedPeak = lerp(metricEnvelope.smoothedPeak, spectrum.metrics.peak, spectrum.metrics.peak > metricEnvelope.smoothedPeak ? 0.62 : 0.34);
    const frame = computeFrameFeatures(spectrum.freq, previous, spectrum.metrics, state, sampleRate);
    const hits = updateDetectorState(state, frame, time);
    for (const label of LABELS) {
      peaks[label] = Math.max(peaks[label], state.hits[label]);
      averages[label] += state.hits[label];
      peakFeatures[label] = Math.max(peakFeatures[label], frame.features[label]);
      if (hits[label] > PROFILE[label].threshold) {
        hitCounts[label] += 1;
        if (firstHit[label] === null) firstHit[label] = time;
        if (time > 0.25) retriggersAfter250ms[label] += 1;
      }
    }
    diagnostics.tonalLowTailMax = Math.max(diagnostics.tonalLowTailMax, frame.diagnostics.tonalLowTail);
    diagnostics.highWashMax = Math.max(diagnostics.highWashMax, frame.diagnostics.highWash);
    diagnostics.kickTransientGateMax = Math.max(diagnostics.kickTransientGateMax, frame.diagnostics.kickTransientGate);
    diagnostics.tomGateMax = Math.max(diagnostics.tomGateMax, frame.diagnostics.tomGate);
    diagnostics.fluxMax = Math.max(diagnostics.fluxMax, spectrum.metrics.flux || 0);
    sumRms += spectrum.metrics.rms;
    sumPeak += spectrum.metrics.peak;
    previous.set(spectrum.freq);
    frameCount += 1;
  }

  for (const label of LABELS) averages[label] /= Math.max(1, frameCount);

  const sortedPeaks = LABELS
    .map((label) => ({ label, value: peaks[label] }))
    .sort((a, b) => b.value - a.value);
  const sortedFeatures = LABELS
    .map((label) => ({ label, value: peakFeatures[label] }))
    .sort((a, b) => b.value - a.value);
  const sortedCounts = LABELS
    .map((label) => ({ label, value: hitCounts[label] }))
    .sort((a, b) => b.value - a.value);
  const predicted = sortedPeaks[0]?.label || "none";
  const predictedFeature = sortedFeatures[0]?.label || "none";
  const predictedCount = sortedCounts[0]?.label || "none";
  const expectedPeak = expected ? peaks[expected] : 0;
  const maxResidual = Math.max(...LABELS.filter((label) => label !== expected).map((label) => peaks[label]));
  const targetDominance = expectedPeak / Math.max(0.001, maxResidual);
  const expectedFeature = expected ? peakFeatures[expected] : 0;
  const maxFeatureResidual = Math.max(...LABELS.filter((label) => label !== expected).map((label) => peakFeatures[label]));
  const featureDominance = expectedFeature / Math.max(0.001, maxFeatureResidual);

  return {
    name,
    expected,
    predicted,
    predictedFeature,
    predictedCount,
    pass: expected ? predictedFeature === expected : null,
    duration: samples.length / sampleRate,
    sampleRate,
    frameCount,
    rmsAvg: sumRms / Math.max(1, frameCount),
    peakAvg: sumPeak / Math.max(1, frameCount),
    peaks,
    peakFeatures,
    averages,
    hitCounts,
    firstHit,
    retriggersAfter250ms,
    targetDominance,
    featureDominance,
    diagnostics,
    events: state.events.filter((event) => event.type !== "global")
  };
}

function normalize(samples, targetPeak = 0.95) {
  let peak = 0;
  for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
  if (peak <= 1e-6) return samples;
  const gain = targetPeak / peak;
  const out = new Float32Array(samples.length);
  for (let i = 0; i < samples.length; i += 1) out[i] = clamp(samples[i] * gain, -1, 1);
  return out;
}

function synthSineTail(sampleRate, seconds, hz = 46, amp = 0.8) {
  const n = Math.floor(seconds * sampleRate);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i += 1) {
    const t = i / sampleRate;
    const env = Math.exp(-t / Math.max(0.001, seconds * 0.75));
    const distortion = Math.tanh(Math.sin(2 * Math.PI * hz * t) * 2.4);
    out[i] = distortion * env * amp;
  }
  return out;
}

function mix(...tracks) {
  const length = Math.max(...tracks.map((track) => track.length));
  const out = new Float32Array(length);
  for (const track of tracks) {
    for (let i = 0; i < track.length; i += 1) out[i] += track[i];
  }
  return normalize(out, 0.95);
}

function offset(samples, offsetSamples, totalLength) {
  const out = new Float32Array(totalLength || samples.length + offsetSamples);
  out.set(samples.slice(0, Math.max(0, out.length - offsetSamples)), offsetSamples);
  return out;
}

function shortName(filePath) {
  return path.basename(filePath).replace(/\.[^.]+$/, "");
}

function formatNumber(value, digits = 3) {
  return Number.isFinite(value) ? value.toFixed(digits) : "n/a";
}

function table(rows) {
  if (!rows.length) return "";
  const widths = rows[0].map((_, col) => Math.max(...rows.map((row) => String(row[col]).length)));
  return rows.map((row, index) => {
    const line = `| ${row.map((cell, col) => String(cell).padEnd(widths[col], " ")).join(" | ")} |`;
    if (index === 0) {
      return `${line}\n| ${widths.map((width) => "-".repeat(width)).join(" | ")} |`;
    }
    return line;
  }).join("\n");
}

function variableLength(value) {
  let buffer = value & 0x7f;
  const bytes = [];
  while ((value >>= 7)) {
    buffer <<= 8;
    buffer |= ((value & 0x7f) | 0x80);
  }
  while (true) {
    bytes.push(buffer & 0xff);
    if (buffer & 0x80) buffer >>= 8;
    else break;
  }
  return bytes;
}

function asciiBytes(text) {
  return Array.from(Buffer.from(text, "ascii"));
}

function writeUInt16(value) {
  return [(value >> 8) & 0xff, value & 0xff];
}

function writeUInt32(value) {
  return [(value >> 24) & 0xff, (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
}

function writeMidiFile(filePath, timelineEvents, trackName, bpm = MIDI_BPM) {
  const events = [];
  events.push({ tick: 0, bytes: [0xff, 0x03, ...variableLength(trackName.length), ...asciiBytes(trackName)] });
  const tempo = Math.round(60000000 / bpm);
  events.push({ tick: 0, bytes: [0xff, 0x51, 0x03, (tempo >> 16) & 0xff, (tempo >> 8) & 0xff, tempo & 0xff] });

  for (const event of timelineEvents) {
    if (event.type === "marker") {
      const text = event.label.slice(0, 80);
      events.push({ tick: event.tick, bytes: [0xff, 0x06, ...variableLength(text.length), ...asciiBytes(text)] });
      continue;
    }
    const note = MIDI_DRUM_NOTES[event.type];
    if (!note) continue;
    const velocity = clamp(Math.round(34 + (event.strength || 0.8) * 93), 1, 127);
    const duration = Math.max(24, Math.round((event.duration || 0.06) * MIDI_TICKS_PER_SECOND));
    events.push({ tick: event.tick, bytes: [0x99, note, velocity] });
    events.push({ tick: event.tick + duration, bytes: [0x89, note, 0] });
  }
  events.push({ tick: Math.max(1, ...events.map((event) => event.tick)) + MIDI_TICKS_PER_QUARTER, bytes: [0xff, 0x2f, 0] });
  events.sort((a, b) => a.tick - b.tick || a.bytes[0] - b.bytes[0]);

  const track = [];
  let lastTick = 0;
  for (const event of events) {
    const delta = Math.max(0, event.tick - lastTick);
    track.push(...variableLength(delta), ...event.bytes);
    lastTick = event.tick;
  }

  const header = [
    ...asciiBytes("MThd"),
    ...writeUInt32(6),
    ...writeUInt16(0),
    ...writeUInt16(1),
    ...writeUInt16(MIDI_TICKS_PER_QUARTER)
  ];
  const trackChunk = [
    ...asciiBytes("MTrk"),
    ...writeUInt32(track.length),
    ...track
  ];
  fs.writeFileSync(filePath, Buffer.from([...header, ...trackChunk]));
}

function readMidiReference(filePath, forcedBpm = MIDI_BPM) {
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  let offset = 0;
  const readAscii = (length) => {
    const value = buffer.toString("ascii", offset, offset + length);
    offset += length;
    return value;
  };
  const readU16 = () => {
    const value = buffer.readUInt16BE(offset);
    offset += 2;
    return value;
  };
  const readU32 = () => {
    const value = buffer.readUInt32BE(offset);
    offset += 4;
    return value;
  };
  const readVlq = () => {
    let value = 0;
    let byte = 0;
    do {
      byte = buffer[offset++];
      value = (value << 7) | (byte & 0x7f);
    } while (byte & 0x80);
    return value;
  };

  if (readAscii(4) !== "MThd") throw new Error(`${filePath} is not a MIDI file`);
  const headerLength = readU32();
  const format = readU16();
  const tracks = readU16();
  const division = readU16();
  offset += Math.max(0, headerLength - 6);
  if (division & 0x8000) throw new Error("SMPTE MIDI time division is not supported");

  const events = [];
  const tempos = [];
  for (let track = 0; track < tracks && offset < buffer.length; track += 1) {
    const id = readAscii(4);
    const length = readU32();
    const end = offset + length;
    if (id !== "MTrk") {
      offset = end;
      continue;
    }
    let tick = 0;
    let runningStatus = 0;
    while (offset < end) {
      tick += readVlq();
      let status = buffer[offset++];
      if (status < 0x80) {
        offset -= 1;
        status = runningStatus;
      } else {
        runningStatus = status;
      }

      if (status === 0xff) {
        const type = buffer[offset++];
        const length = readVlq();
        const data = buffer.slice(offset, offset + length);
        offset += length;
        if (type === 0x51 && length === 3) {
          const us = (data[0] << 16) | (data[1] << 8) | data[2];
          tempos.push({ tick, bpm: 60000000 / us });
        }
        if (type === 0x2f) break;
      } else if ((status & 0xf0) === 0x90 || (status & 0xf0) === 0x80) {
        const note = buffer[offset++];
        const velocity = buffer[offset++];
        const type = MIDI_NOTE_TO_DRUM[note];
        if (type && (status & 0xf0) === 0x90 && velocity > 0) {
          const beats = tick / division;
          events.push({
            type,
            note,
            tick: Math.round(beats * MIDI_TICKS_PER_QUARTER),
            sourceTick: tick,
            time: beats * 60 / forcedBpm,
            strength: clamp(velocity / 127, 0, 1),
            duration: type === "cymbal" ? 0.18 : type === "hat" ? 0.045 : 0.07
          });
        }
      } else if ((status & 0xf0) === 0xc0 || (status & 0xf0) === 0xd0) {
        offset += 1;
      } else {
        offset += 2;
      }
    }
    offset = end;
  }

  return {
    format,
    tracks,
    division,
    embeddedTempos: tempos,
    forcedBpm,
    events: events.sort((a, b) => a.tick - b.tick || a.note - b.note)
  };
}

function detectedEventsToTimeline(result) {
  return (result.events || [])
    .filter((event) => MIDI_DRUM_NOTES[event.type])
    .map((event) => ({
      type: event.type,
      tick: Math.round(event.time * MIDI_TICKS_PER_SECOND),
      time: event.time,
      strength: event.strength,
      duration: event.type === "cymbal" ? 0.18 : event.type === "hat" ? 0.045 : 0.07
    }));
}

function compareDetectedToReference(detectedEvents, referenceEvents, toleranceSeconds = 0.045) {
  const used = new Set();
  let matched = 0;
  const misses = [];
  const extras = [];
  for (const ref of referenceEvents) {
    let bestIndex = -1;
    let bestDistance = Infinity;
    for (let i = 0; i < detectedEvents.length; i += 1) {
      const event = detectedEvents[i];
      if (used.has(i) || event.type !== ref.type) continue;
      const eventTime = event.time ?? (event.tick / MIDI_TICKS_PER_SECOND);
      const refTime = ref.time ?? (ref.tick / MIDI_TICKS_PER_SECOND);
      const distance = Math.abs(eventTime - refTime);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = i;
      }
    }
    if (bestIndex >= 0 && bestDistance <= toleranceSeconds) {
      used.add(bestIndex);
      matched += 1;
    } else {
      misses.push(ref);
    }
  }
  for (let i = 0; i < detectedEvents.length; i += 1) {
    if (!used.has(i)) extras.push(detectedEvents[i]);
  }
  return {
    matched,
    expected: referenceEvents.length,
    detected: detectedEvents.length,
    misses,
    extras,
    precision: detectedEvents.length ? matched / detectedEvents.length : 0,
    recall: referenceEvents.length ? matched / referenceEvents.length : 0,
    toleranceSeconds
  };
}

function compareByClass(detectedEvents, referenceEvents, toleranceSeconds = 0.045) {
  return Object.fromEntries(LABELS.map((label) => [
    label,
    compareDetectedToReference(
      detectedEvents.filter((event) => event.type === label),
      referenceEvents.filter((event) => event.type === label),
      toleranceSeconds
    )
  ]));
}

function retimeReference(reference, bpm) {
  return reference.events.map((event) => {
    const beats = event.sourceTick / reference.division;
    return {
      ...event,
      time: beats * 60 / bpm,
      tick: Math.round(beats * MIDI_TICKS_PER_QUARTER)
    };
  });
}

function compareWithOffset(detectedEvents, referenceEvents, offsetSeconds, toleranceSeconds = 0.045) {
  const shifted = detectedEvents.map((event) => ({
    ...event,
    time: event.time - offsetSeconds,
    tick: Math.round((event.time - offsetSeconds) * MIDI_TICKS_PER_SECOND)
  }));
  return compareDetectedToReference(shifted, referenceEvents, toleranceSeconds);
}

function findBestAlignment(detectedEvents, reference, bpmOptions = [MIDI_BPM, 120]) {
  let best = null;
  for (const bpm of bpmOptions) {
    const refEvents = retimeReference(reference, bpm);
    for (let offsetMs = -260; offsetMs <= 420; offsetMs += 5) {
      const offsetSeconds = offsetMs / 1000;
      const comparison = compareWithOffset(detectedEvents, refEvents, offsetSeconds, 0.055);
      const score = comparison.recall * 2 + comparison.precision;
      if (!best || score > best.score) {
        best = { bpm, offsetSeconds, score, comparison };
      }
    }
  }
  return best;
}

function formatMidiTime(event) {
  return `${event.type}@${formatNumber(event.time ?? (event.tick / MIDI_TICKS_PER_SECOND), 3)}s`;
}

function buildMidiTimelines(results) {
  const detected = [];
  const expected = [];
  let sectionTick = 0;
  for (const result of results) {
    detected.push({ type: "marker", label: result.name, tick: sectionTick });
    expected.push({ type: "marker", label: result.name, tick: sectionTick });
    for (const event of result.events || []) {
      if (!MIDI_DRUM_NOTES[event.type]) continue;
      detected.push({
        type: event.type,
        tick: sectionTick + Math.round(event.time * MIDI_TICKS_PER_SECOND),
        strength: event.strength,
        duration: event.type === "cymbal" ? 0.18 : event.type === "hat" ? 0.045 : 0.07
      });
    }
    if (MIDI_DRUM_NOTES[result.expected]) {
      expected.push({
        type: result.expected,
        tick: sectionTick,
        strength: 1,
        duration: result.expected === "cymbal" ? 0.18 : result.expected === "hat" ? 0.045 : 0.07
      });
    }
    sectionTick += Math.ceil((result.duration + 0.75) * MIDI_TICKS_PER_SECOND / MIDI_TICKS_PER_QUARTER) * MIDI_TICKS_PER_QUARTER;
  }
  return { detected, expected };
}

function buildMarkdown(results, patternAudits = [], reference = null) {
  const now = new Date().toISOString();
  const primaryRows = [["Case", "Expected", "Feature winner", "Hit winner", "Count winner", "Pass", "Feature target/residual", "Retriggers >250ms"]];
  for (const result of results) {
    const retriggers = LABELS
      .filter((label) => result.retriggersAfter250ms[label] > 0)
      .map((label) => `${label}:${result.retriggersAfter250ms[label]}`)
      .join(", ") || "none";
    primaryRows.push([
      result.name,
      result.expected || "-",
      result.predictedFeature,
      result.predicted,
      result.predictedCount,
      result.pass === null ? "-" : result.pass ? "yes" : "NO",
      formatNumber(result.featureDominance, 2),
      retriggers
    ]);
  }

  const peakRows = [["Case", ...LABELS]];
  for (const result of results) {
    peakRows.push([result.name, ...LABELS.map((label) => formatNumber(result.peaks[label], 3))]);
  }

  const hitRows = [["Case", ...LABELS]];
  for (const result of results) {
    hitRows.push([result.name, ...LABELS.map((label) => result.hitCounts[label])]);
  }

  const featureRows = [["Case", ...LABELS]];
  for (const result of results) {
    featureRows.push([result.name, ...LABELS.map((label) => formatNumber(result.peakFeatures[label], 3))]);
  }

  const patternRows = [["WAV", "Tempo", "Matched", "Expected", "Detected", "Precision", "Recall", "Misses", "Extras"]];
  for (const audit of patternAudits) {
    patternRows.push([
      audit.name,
      `${audit.declaredBpm} declared`,
      audit.comparison.matched,
      audit.comparison.expected,
      audit.comparison.detected,
      formatNumber(audit.comparison.precision, 2),
      formatNumber(audit.comparison.recall, 2),
      audit.comparison.misses.length,
      audit.comparison.extras.length
    ]);
    if (audit.audioTempoComparison) {
      patternRows.push([
        audit.name,
        `${formatNumber(audit.audioTempoBpm, 2)} embedded`,
        audit.audioTempoComparison.matched,
        audit.audioTempoComparison.expected,
        audit.audioTempoComparison.detected,
        formatNumber(audit.audioTempoComparison.precision, 2),
        formatNumber(audit.audioTempoComparison.recall, 2),
        audit.audioTempoComparison.misses.length,
        audit.audioTempoComparison.extras.length
      ]);
    }
  }

  const classRows = [["WAV", "Tempo", "Class", "Matched", "Expected", "Detected", "Precision", "Recall"]];
  for (const audit of patternAudits) {
    for (const label of LABELS) {
      const item = audit.byClass[label];
      classRows.push([
        audit.name,
        `${audit.declaredBpm} declared`,
        label,
        item.matched,
        item.expected,
        item.detected,
        formatNumber(item.precision, 2),
        formatNumber(item.recall, 2)
      ]);
    }
    if (audit.audioTempoByClass) {
      for (const label of LABELS) {
        const item = audit.audioTempoByClass[label];
        classRows.push([
          audit.name,
          `${formatNumber(audit.audioTempoBpm, 2)} embedded`,
          label,
          item.matched,
          item.expected,
          item.detected,
          formatNumber(item.precision, 2),
          formatNumber(item.recall, 2)
        ]);
      }
    }
  }

  const alignmentRows = [["WAV", "Best BPM", "Detector offset", "Matched", "Precision", "Recall"]];
  for (const audit of patternAudits) {
    if (!audit.bestAlignment) continue;
    alignmentRows.push([
      audit.name,
      audit.bestAlignment.bpm,
      `${formatNumber(audit.bestAlignment.offsetSeconds * 1000, 0)} ms`,
      audit.bestAlignment.comparison.matched,
      formatNumber(audit.bestAlignment.comparison.precision, 2),
      formatNumber(audit.bestAlignment.comparison.recall, 2)
    ]);
  }

  const notes = results.map((result) => {
    const residues = LABELS
      .filter((label) => label !== result.expected)
      .map((label) => ({ label, value: result.peaks[label] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 2)
      .map((entry) => `${entry.label} ${formatNumber(entry.value)}`)
      .join(", ");
    return `- ${result.name}: peak target ${result.expected || "n/a"}=${formatNumber(result.expected ? result.peaks[result.expected] : 0)}, strongest residues ${residues || "n/a"}, tonal low tail ${formatNumber(result.diagnostics.tonalLowTailMax)}, high wash ${formatNumber(result.diagnostics.highWashMax)}.`;
  }).join("\n");

  return `# Pattern Detector Audit Report

Generated: ${now}

This report is produced by \`tools/pattern-audit.mjs\`. It is a baseline measurement of the current detector, not a tuned result.

## Configuration

- FFT size: ${FFT_SIZE}
- Hop size: ${HOP_SIZE}
- Frequency byte mapping: ${MIN_DB} dB to ${MAX_DB} dB
- Tested files: \`C:\\Users\\Dev\\Downloads\\kick.wav\`, \`snare.wav\`, \`tom.wav\`, \`hats.wav\`, \`cymbal.wav\`
- Synthetic cases: kick plus distorted 808 tail, kick plus snare, snare plus hats.
- Pattern reference: \`docs/generated/pattern-reference.mid\`
- Pattern WAV cases: \`docs/generated/default-drums.wav\`, \`docs/generated/default-prog.wav\`
- Pattern tempo contract: ${MIDI_BPM} BPM${reference?.embeddedTempos?.length ? `; embedded MIDI tempo reads ${formatNumber(reference.embeddedTempos[0].bpm, 2)} BPM and is reported separately for WAV alignment` : ""}
- Pattern match tolerance: ${patternAudits[0] ? Math.round(patternAudits[0].comparison.toleranceSeconds * 1000) : 45} ms

## Primary Classification

${table(primaryRows)}

## Peak Hit Values

${table(peakRows)}

## Hit Counts

${table(hitRows)}

## Peak Raw Class Features

These are the class features before hit-envelope saturation.

${table(featureRows)}

## Continuous Pattern WAV vs MIDI Reference

${patternAudits.length ? table(patternRows) : "No continuous pattern WAV audit was run."}

## Pattern Match By Class

${patternAudits.length ? table(classRows) : "No continuous pattern WAV audit was run."}

## Alignment Diagnostic

This does not change the official score. It asks whether the detector is mostly wrong or mostly late/early.

${patternAudits.length ? table(alignmentRows) : "No continuous pattern WAV audit was run."}

${patternAudits.map((audit) => {
  const misses = audit.comparison.misses.slice(0, 12).map(formatMidiTime).join(", ") || "none";
  const extras = audit.comparison.extras.slice(0, 12).map(formatMidiTime).join(", ") || "none";
  return `- ${audit.name}: misses ${misses}; extras ${extras}.`;
}).join("\n")}

## Notes

${notes}

## Baseline Interpretation

- A correct detector should make the expected class the dominant raw class feature and event family for isolated samples.
- Non-target residuals should stay materially lower than the target, especially for kick/tom and snare/hat/cymbal families.
- Sustained low-frequency tails should not create repeated kick hits after the first attack.
- Cymbal wash should be represented as presence/body later, not as repeated cymbal onsets unless a new attack occurs.
- If hit peaks saturate to 1.000 across several classes, the display envelope is not diagnostic enough; use raw feature dominance and event counts to tune the backend.

`;
}

function main() {
  const decoded = new Map();
  const results = [];
  const patternAudits = [];

  for (const ref of REFERENCE_FILES) {
    const filePath = path.join(downloads, ref.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Missing ${filePath}, skipping`);
      continue;
    }
    const wav = decodeWav(filePath);
    decoded.set(ref.expected, wav);
    results.push(analyzeSamples(shortName(filePath), normalize(wav.samples), wav.sampleRate, ref.expected));
  }

  const kick = decoded.get("kick");
  const snare = decoded.get("snare");
  const hat = decoded.get("hat");
  if (kick) {
    const tail = synthSineTail(kick.sampleRate, 1.5, 46, 0.8);
    const composite = mix(normalize(kick.samples, 0.72), offset(tail, Math.floor(kick.sampleRate * 0.035), tail.length + Math.floor(kick.sampleRate * 0.035)));
    results.push(analyzeSamples("synthetic_kick_plus_808_tail", composite, kick.sampleRate, "kick"));
  }
  if (kick && snare) {
    const length = Math.max(kick.samples.length, snare.samples.length);
    results.push(analyzeSamples("synthetic_kick_plus_snare", mix(normalize(kick.samples, 0.72), normalize(snare.samples, 0.72).slice(0, length)), kick.sampleRate, "kick"));
  }
  if (snare && hat) {
    const composite = mix(normalize(snare.samples, 0.76), offset(normalize(hat.samples, 0.45), Math.floor(snare.sampleRate * 0.015), snare.samples.length));
    results.push(analyzeSamples("synthetic_snare_plus_hats", composite, snare.sampleRate, "snare"));
  }

  fs.mkdirSync(outDir, { recursive: true });
  const referenceMidiPath = path.join(outDir, "pattern-reference.mid");
  const normalizedReferenceMidiPath = path.join(outDir, "pattern-reference-120.mid");
  const embeddedReferenceMidiPath = path.join(outDir, "pattern-reference-embedded.mid");
  const reference = readMidiReference(referenceMidiPath, MIDI_BPM);
  if (reference) {
    const audioTempoBpm = reference.embeddedTempos[0]?.bpm || MIDI_BPM;
    const audioTempoEvents = retimeReference(reference, audioTempoBpm);
    writeMidiFile(normalizedReferenceMidiPath, reference.events, "MET-TR reference pattern 120 BPM");
    if (Math.abs(audioTempoBpm - MIDI_BPM) > 0.01) {
      writeMidiFile(embeddedReferenceMidiPath, audioTempoEvents, `MET-TR reference pattern ${audioTempoBpm.toFixed(2)} BPM`, audioTempoBpm);
    }
    for (const fileName of ["default-drums.wav", "default-prog.wav"]) {
      const wavPath = path.join(outDir, fileName);
      if (!fs.existsSync(wavPath)) {
        console.warn(`Missing ${wavPath}, skipping continuous pattern audit`);
        continue;
      }
      const wav = decodeWav(wavPath);
      const result = analyzeSamples(shortName(wavPath), normalize(wav.samples), wav.sampleRate, null);
      const detectedTimeline = detectedEventsToTimeline(result);
      const comparison = compareDetectedToReference(detectedTimeline, reference.events);
      const audioTempoComparison = Math.abs(audioTempoBpm - MIDI_BPM) > 0.01
        ? compareDetectedToReference(detectedTimeline, audioTempoEvents)
        : null;
      const byClass = compareByClass(detectedTimeline, reference.events);
      const audioTempoByClass = Math.abs(audioTempoBpm - MIDI_BPM) > 0.01
        ? compareByClass(detectedTimeline, audioTempoEvents)
        : null;
      const bestAlignment = findBestAlignment(detectedTimeline, reference);
      const detectedMidiPath = path.join(outDir, `${shortName(wavPath)}-detected.mid`);
      writeMidiFile(detectedMidiPath, detectedTimeline, `MET-TR detected ${shortName(wavPath)}`);
      patternAudits.push({
        name: shortName(wavPath),
        file: wavPath,
        detectedMidi: detectedMidiPath,
        duration: result.duration,
        sampleRate: result.sampleRate,
        declaredBpm: MIDI_BPM,
        audioTempoBpm,
        comparison,
        audioTempoComparison,
        byClass,
        audioTempoByClass,
        bestAlignment,
        result
      });
    }
  } else {
    console.warn(`Missing ${referenceMidiPath}, skipping continuous pattern audit`);
  }

  const jsonPath = path.join(outDir, "pattern-audit.json");
  const mdPath = path.join(outDir, "pattern-audit.md");
  const detectedMidiPath = path.join(outDir, "pattern-detected.mid");
  const expectedMidiPath = path.join(outDir, "pattern-expected.mid");
  const midi = buildMidiTimelines(results);
  fs.writeFileSync(jsonPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), reference, results, patternAudits }, null, 2)}\n`);
  fs.writeFileSync(mdPath, buildMarkdown(results, patternAudits, reference));
  writeMidiFile(detectedMidiPath, midi.detected, "MET-TR detected pattern audit");
  writeMidiFile(expectedMidiPath, midi.expected, "MET-TR expected pattern audit");

  console.log(`Wrote ${jsonPath}`);
  console.log(`Wrote ${mdPath}`);
  console.log(`Wrote ${detectedMidiPath}`);
  console.log(`Wrote ${expectedMidiPath}`);
  if (reference) {
    console.log(`Wrote ${normalizedReferenceMidiPath}`);
    if (fs.existsSync(embeddedReferenceMidiPath)) console.log(`Wrote ${embeddedReferenceMidiPath}`);
    for (const audit of patternAudits) {
      console.log(`Wrote ${audit.detectedMidi}`);
      console.log(`${audit.name}: ${audit.comparison.matched}/${audit.comparison.expected} matched, precision ${formatNumber(audit.comparison.precision, 2)}, recall ${formatNumber(audit.comparison.recall, 2)}`);
    }
  }
  const failures = results.filter((result) => result.pass === false);
  if (failures.length) {
    console.log(`Baseline failures: ${failures.map((result) => `${result.name}->${result.predictedFeature}`).join(", ")}`);
  } else {
    console.log("Baseline classification failures: none");
  }
}

main();
