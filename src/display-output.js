window.METTR_DISPLAY_OUTPUT = (() => {
  function getPatternFlashColor(levels, clamp) {
    const general = clamp(levels.general || 0, 0, 1);
    const kick = clamp(levels.kick || 0, 0, 1);
    const tom = clamp(levels.tom || 0, 0, 1);
    const snare = clamp(levels.snare || 0, 0, 1);
    const hat = clamp(levels.hat || 0, 0, 1);
    const cymbal = clamp(levels.cymbal || 0, 0, 1);
    const elementPower = kick + tom + snare + hat + cymbal;
    const colorWeight = elementPower > 0.001 ? 1 / elementPower : 0;
    const elementR = (kick * 255 + tom * 255 + cymbal * 160) * colorWeight;
    const elementG = (snare * 255 + tom * 130 + hat * 210) * colorWeight;
    const elementB = (hat * 255 + cymbal * 255) * colorWeight;
    const onsetBrightness = Math.pow(general, 0.58);
    const elementLift = Math.pow(clamp(elementPower, 0, 1), 0.72);
    const brightness = clamp(0.035 + onsetBrightness * 0.84 + elementLift * 0.12, 0, 1);
    const saturation = clamp(0.82 - onsetBrightness * 0.16 + elementLift * 0.16, 0.58, 0.94);
    const base = 255 * brightness * (1 - saturation);
    const colorScale = brightness * saturation;
    const r = clamp(base + elementR * colorScale, 0, 255);
    const g = clamp(base + elementG * colorScale, 0, 255);
    const b = clamp(base + elementB * colorScale, 0, 255);
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  function spectralHueColor(position, api) {
    const { clamp, lerp, smoothstep } = api;
    const stops = [
      [0.0, [255, 28, 0]],
      [0.2, [255, 72, 0]],
      [0.36, [255, 36, 120]],
      [0.5, [172, 48, 236]],
      [0.62, [38, 224, 118]],
      [0.74, [0, 204, 232]],
      [0.88, [70, 96, 255]],
      [1.0, [188, 48, 236]]
    ];
    const p = clamp(position, 0, 1);
    for (let i = 0; i < stops.length - 1; i += 1) {
      const [aPos, aColor] = stops[i];
      const [bPos, bColor] = stops[i + 1];
      if (p >= aPos && p <= bPos) {
        const t = smoothstep(0, 1, (p - aPos) / Math.max(0.0001, bPos - aPos));
        return [
          lerp(aColor[0], bColor[0], t),
          lerp(aColor[1], bColor[1], t),
          lerp(aColor[2], bColor[2], t)
        ];
      }
    }
    return stops[stops.length - 1][1];
  }

  function computeSpectralOutColor(input, api) {
    const { clamp, lerp, interpolateFloatSpectrum } = api;
    const { audioContext, floatFreqData, smoothed, spectralOutState, spectralTiltDb = 0, spectralFlash = 0 } = input;
    const nyquist = audioContext ? audioContext.sampleRate / 2 : 24000;
    const minHz = 20;
    const maxHz = Math.min(20000, nyquist);
    const centerHz = Math.sqrt(minHz * maxHz);
    const musicCompensationDbPerOctave = 1.45;
    let weightedPosition = 0;
    let weightedFreq = 0;
    let powerSum = 0;
    let relativePowerSum = 0;
    let maxPower = 0;
    let compensatedDbSum = 0;
    const bins = 96;
    const samples = [];

    if (floatFreqData.length && audioContext) {
      for (let i = 0; i < bins; i += 1) {
        const p = i / Math.max(1, bins - 1);
        const freq = minHz * Math.pow(maxHz / minHz, p);
        const index = freq / nyquist * (floatFreqData.length - 1);
        const octaveOffset = Math.log2(freq / centerHz);
        const musicCompensationDb = octaveOffset * musicCompensationDbPerOctave;
        const tiltDb = spectralTiltDb * (p - 0.5);
        const compensatedDb = interpolateFloatSpectrum(index) + musicCompensationDb + tiltDb;
        compensatedDbSum += compensatedDb;
        samples.push({ p, freq, compensatedDb });
        const rawPower = Math.pow(10, interpolateFloatSpectrum(index) / 10);
        powerSum += rawPower;
        maxPower = Math.max(maxPower, rawPower);
      }

      const meanCompensatedDb = compensatedDbSum / Math.max(1, samples.length);
      for (const sample of samples) {
        const relativeDb = clamp(sample.compensatedDb - meanCompensatedDb, -30, 30);
        const relativePower = Math.pow(10, relativeDb / 18);
        weightedPosition += sample.p * relativePower;
        weightedFreq += sample.freq * relativePower;
        relativePowerSum += relativePower;
      }
    }

    const hasSpectrum = powerSum > 1e-10;
    const dominantPosition = hasSpectrum ? weightedPosition / Math.max(relativePowerSum, 1e-12) : clamp(smoothed.centroid, 0, 1);
    const dominantHz = hasSpectrum ? weightedFreq / Math.max(relativePowerSum, 1e-12) : 0;
    const hue = spectralHueColor(dominantPosition, api);
    const transientBrightness = Math.pow(clamp(spectralFlash, 0, 1), 0.56);
    const sustainedFloor = clamp(smoothed.rms * 0.16 + smoothed.peak * 0.07 + Math.sqrt(maxPower) * 0.24, 0, 0.28);
    const brightness = clamp(transientBrightness * 0.88 + sustainedFloor, 0, 1);
    const flatness = clamp(smoothed.density, 0, 1);
    const tonalFocus = hasSpectrum ? clamp(Math.max(0, relativePowerSum / Math.max(1, samples.length) - 0.82) * 0.55, 0, 1) : 0;
    const saturation = hasSpectrum && brightness > 0.015
      ? clamp(0.04 + tonalFocus * 0.76 + (1 - flatness) * 0.52, 0, 1)
      : 0;
    const whiteMix = 1 - saturation;
    const target = {
      r: lerp(hue[0], 255, whiteMix) * brightness,
      g: lerp(hue[1], 255, whiteMix) * brightness,
      b: lerp(hue[2], 255, whiteMix) * brightness,
      brightness,
      saturation,
      dominantHz
    };
    const follow = brightness > spectralOutState.brightness ? 0.72 : 0.38;
    spectralOutState.r = lerp(spectralOutState.r, target.r, follow);
    spectralOutState.g = lerp(spectralOutState.g, target.g, follow);
    spectralOutState.b = lerp(spectralOutState.b, target.b, follow);
    spectralOutState.brightness = lerp(spectralOutState.brightness, target.brightness, follow);
    spectralOutState.saturation = lerp(spectralOutState.saturation, target.saturation, 0.42);
    spectralOutState.dominantHz = lerp(spectralOutState.dominantHz, target.dominantHz, 0.46);
    return spectralOutState;
  }

  return {
    getPatternFlashColor,
    computeSpectralOutColor
  };
})();
