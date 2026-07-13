window.METTR_CONTRACT = {
  canvas: {
    width: 700,
    height: 1320
  },
  layout: {
    canvasWidth: 700,
    minHeight: 420,
    left: 28,
    right: 28,
    top: 48,
    bottom: 24,
    titleOffset: 24,
    stackedTitleOffset: 20,
    collapsedAdvance: 22,
    stackedCollapsedAdvance: 28,
    rowGap: 26,
    fullWidth: 644,
    halfWidth: 314,
    rightColumnX: 358,
    spectrum: { height: 118, advance: 150 },
    spectralDynamics: { height: 142, advance: 176 },
    spectrogram: { height: 292, advance: 328 },
    tuner: { height: 178, advance: 212 },
    signalCharacter: { height: 190, advance: 224 },
    oscilloscope: { height: 70, advance: 100 },
    waveformShort: { height: 70, advance: 100 },
    waveformMedium: { height: 70, advance: 100 },
    waveformLong: { height: 70, advance: 114 },
    stereo: { height: 292, compactHeight: 206 },
    loudness: { height: 202, compactHeight: 150 },
    dualMetersAdvance: 328,
    compactMeterAdvance: 238,
    pattern: { height: 560, advance: 596 },
    compactBreakpoint: 640
  },
  responsive: {
    compactMinWidth: 360,
    compactMaxWidth: 840,
    compactTop: 82,
    maxHeightBoost: 2.4,
    modules: {
      spectrum: { compactScale: 3.2 },
      spectralDynamics: { compactScale: 2.8 },
      spectrogram: { compactScale: 1.75 },
      tuner: { compactScale: 2.1 },
      signalCharacter: { compactScale: 2.35 },
      oscilloscope: { compactScale: 3.05 },
      waveformShort: { compactScale: 2.75 },
      waveformMedium: { compactScale: 2.55 },
      waveformLong: { compactScale: 2.55 },
      stereo: { compactScale: 1.75 },
      loudness: { compactScale: 1.75 },
      pattern: { compactScale: 2.55 }
    },
    patternDisplay: {
      compactScale: 2.55
    }
  },
  ui: {
    moduleHeader: {
      desktopHeightPx: 34,
      mobileHeightPx: 42,
      desktopActionSizePx: 24,
      mobileActionSizePx: 30,
      desktopIconStrokePx: 2,
      mobileIconStrokePx: 3,
      desktopTitleLineHeightPx: 24,
      mobileTitleLineHeightPx: 30,
      desktopWidthRatio: 1,
      mobileWidthRatio: 0.5,
      desktopFontSizePx: 14,
      mobileFontSizePx: 15,
      iconStartRatio: 0.56,
      iconColor: "#f5f5f5",
      iconCenterTolerancePx: 2,
      maxRightSlackPx: 10,
      nestedBodyGapPx: 18,
      addSlotGapTolerancePx: 3
    },
    waveformDisplay: {
      labelReservePx: 12,
      short: { targetPeak: 0.72, maxGain: 2.6, fill: 0.5 },
      medium: { targetPeak: 0.68, maxGain: 2.0, fill: 0.49 },
      long: { targetPeak: 0.56, maxGain: 1.35, fill: 0.47 }
    }
  },
  legacyAlgorithms: window.METTR_LEGACY_ALGORITHMS || {},
  activeAlgorithm: {
    id: "METERING V1",
    label: "Metering with pattern detector",
    modules: [
      "spectrum",
      "spectralDynamics",
      "spectrogram",
      "tuner",
      "signalCharacter",
      "oscilloscope",
      "waveformShort",
      "waveformMedium",
      "waveformLong",
      "stereo",
      "loudness",
      "pattern"
    ]
  },
  layouts: {
    maxModules: 12,
    default: {
      id: "Default",
      modules: [
        "spectrum",
        "oscilloscope",
        "waveformShort",
        "waveformMedium",
        "waveformLong",
        "spectralDynamics",
        "spectrogram",
        "tuner",
        "signalCharacter",
        "stereo",
        "loudness",
        "pattern"
      ]
    },
    min: {
      id: "Min",
      modules: [
        "spectrum",
        "oscilloscope",
        "waveformMedium",
        "stereo",
        "loudness"
      ]
    },
    spectral: {
      id: "Spectral",
      modules: [
        "spectrum",
        "spectralDynamics",
        "spectrogram",
        "tuner",
        "signalCharacter"
      ]
    },
    blank: {
      id: "Blank",
      modules: []
    }
  },
  modules: [
    { id: "spectrum", renderer: "drawSpectrumPanel", rect: "spectrum", flow: "full" },
    { id: "spectralDynamics", renderer: "drawSpectralDynamicsPanel", rect: "spectralDynamics", flow: "full" },
    { id: "spectrogram", renderer: "drawSpectrogramPanel", rect: "spectrogram", flow: "full" },
    { id: "tuner", renderer: "drawTunerPanel", rect: "tuner", flow: "full" },
    { id: "signalCharacter", renderer: "drawSignalCharacterPanel", rect: "signalCharacter", flow: "full" },
    { id: "oscilloscope", renderer: "drawOscilloscopePanel", rect: "oscilloscope", flow: "full" },
    { id: "waveformShort", renderer: "drawWaveformShortPanel", rect: "waveformShort", flow: "full", beforeGap: true },
    { id: "waveformMedium", renderer: "drawWaveformMediumPanel", rect: "waveformMedium", flow: "full", beforeGap: true },
    { id: "waveformLong", renderer: "drawWaveformPanel", rect: "waveformLong", flow: "full", beforeGap: true },
    { id: "stereo", renderer: "drawStereoPanel", rect: "stereo", flow: "dual", column: "left" },
    { id: "loudness", renderer: "drawLoudnessPanel", rect: "loudness", flow: "dual", column: "right" },
    { id: "pattern", renderer: "drawPatternPanel", rect: "pattern", flow: "full" }
  ],
  flow: [
    { type: "module", id: "spectrum" },
    { type: "module", id: "oscilloscope" },
    { type: "module", id: "waveformShort", beforeGap: true },
    { type: "module", id: "waveformMedium", beforeGap: true },
    { type: "module", id: "waveformLong", beforeGap: true },
    { type: "module", id: "spectralDynamics" },
    { type: "module", id: "spectrogram" },
    { type: "module", id: "tuner" },
    { type: "module", id: "signalCharacter" },
    { type: "dual", ids: ["stereo", "loudness"] },
    { type: "module", id: "pattern" }
  ]
};
