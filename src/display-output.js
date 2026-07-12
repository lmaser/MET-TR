window.METTR_DISPLAY_OUTPUT = (() => {
  function getPatternFlashColor(levels, clamp) {
    const general = clamp(levels.general || 0, 0, 1);
    const kick = clamp(levels.kick || 0, 0, 1);
    const tom = clamp(levels.tom || 0, 0, 1);
    const snare = clamp(levels.snare || 0, 0, 1);
    const hat = clamp(levels.hat || 0, 0, 1);
    const cymbal = clamp(levels.cymbal || 0, 0, 1);
    const r = clamp(general * 255 + kick * 255 + tom * 255 + cymbal * 160, 0, 255);
    const g = clamp(general * 255 + snare * 255 + tom * 130 + hat * 210, 0, 255);
    const b = clamp(general * 255 + hat * 255 + cymbal * 255, 0, 255);
    return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
  }

  function spectralHueColor(position, api) {
    const { clamp, lerp, smoothstep } = api;
    const stops = [
      [0.0, [255, 28, 0]],
      [0.22, [255, 82, 0]],
      [0.4, [255, 0, 92]],
      [0.62, [188, 48, 236]],
      [0.82, [116, 70, 255]],
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
    const { audioContext, floatFreqData, smoothed, spectralOutState, spectralTiltDb = 0 } = input;
    const nyquist = audioContext ? audioContext.sampleRate / 2 : 24000;
    const minHz = 20;
    const maxHz = Math.min(20000, nyquist);
    let weightedPosition = 0;
    let weightedFreq = 0;
    let powerSum = 0;
    let maxPower = 0;

    if (floatFreqData.length && audioContext) {
      const bins = 96;
      for (let i = 0; i < bins; i += 1) {
        const p = i / Math.max(1, bins - 1);
        const freq = minHz * Math.pow(maxHz / minHz, p);
        const index = freq / nyquist * (floatFreqData.length - 1);
        const tiltDb = spectralTiltDb * (p - 0.5);
        const db = interpolateFloatSpectrum(index) + tiltDb;
        const power = Math.pow(10, db / 10);
        weightedPosition += p * power;
        weightedFreq += freq * power;
        powerSum += power;
        maxPower = Math.max(maxPower, power);
      }
    }

    const hasSpectrum = powerSum > 1e-10;
    const dominantPosition = hasSpectrum ? weightedPosition / powerSum : clamp(smoothed.centroid, 0, 1);
    const dominantHz = hasSpectrum ? weightedFreq / powerSum : 0;
    const hue = spectralHueColor(dominantPosition, api);
    const brightness = clamp(Math.pow(smoothed.peak * 0.72 + smoothed.rms * 0.42 + Math.sqrt(maxPower) * 1.8, 0.62), 0, 1);
    const flatness = clamp(smoothed.density, 0, 1);
    const tonalFocus = hasSpectrum ? clamp(maxPower / Math.max(powerSum, 1e-12) * 9, 0, 1) : 0;
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
    const follow = brightness > spectralOutState.brightness ? 0.58 : 0.24;
    spectralOutState.r = lerp(spectralOutState.r, target.r, follow);
    spectralOutState.g = lerp(spectralOutState.g, target.g, follow);
    spectralOutState.b = lerp(spectralOutState.b, target.b, follow);
    spectralOutState.brightness = lerp(spectralOutState.brightness, target.brightness, follow);
    spectralOutState.saturation = lerp(spectralOutState.saturation, target.saturation, 0.28);
    spectralOutState.dominantHz = lerp(spectralOutState.dominantHz, target.dominantHz, 0.24);
    return spectralOutState;
  }

  return {
    getPatternFlashColor,
    computeSpectralOutColor
  };
})();
