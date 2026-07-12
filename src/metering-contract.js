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
    oscilloscope: { height: 70, advance: 100 },
    waveformShort: { height: 54, advance: 82 },
    waveformMedium: { height: 58, advance: 86 },
    waveformLong: { height: 58, advance: 102 },
    stereo: { height: 202, compactHeight: 150 },
    loudness: { height: 202, compactHeight: 150 },
    dualMetersAdvance: 238,
    compactMeterAdvance: 186,
    pattern: { height: 560, advance: 596 },
    compactBreakpoint: 640
  },
  algorithms: {
    base: {
      id: "METERING BASE",
      label: "Base reference",
      modules: [
        "spectrum",
        "oscilloscope",
        "waveformShort",
        "waveformMedium",
        "waveformLong",
        "stereo",
        "loudness"
      ]
    },
    nmstr: {
      id: "METERING V1b",
      label: "Editable branch",
      extends: "base",
      modules: [
        "pattern"
      ]
    }
  },
  modules: [
    { id: "spectrum", renderer: "drawSpectrumPanel", rect: "spectrum", flow: "full" },
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
    { type: "dual", ids: ["stereo", "loudness"] },
    { type: "module", id: "pattern" }
  ]
};
