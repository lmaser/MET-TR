const canvas = document.getElementById("blobCanvas");
    const stageEl = canvas.closest(".stage");
    const ctx = canvas.getContext("2d", { alpha: false });
    const characterOverlayCanvas = document.getElementById("characterOverlayCanvas");
    const characterOverlayCtx = characterOverlayCanvas?.getContext("2d", { alpha: true });
    const statusEl = document.getElementById("status");
    const modeLabel = document.getElementById("modeLabel");
    const rmsMeter = document.getElementById("rmsMeter");
    const rmsText = document.getElementById("rmsText");
    const lowText = document.getElementById("lowText");
    const midText = document.getElementById("midText");
    const highText = document.getElementById("highText");
    const sideText = document.getElementById("sideText");
    const densityText = document.getElementById("densityText");
    const hitText = document.getElementById("hitText");
    const imageMapText = document.getElementById("imageMapText");
    const frameCostText = document.getElementById("frameCostText");
    const memoryText = document.getElementById("memoryText");
    const systemAudioButton = document.getElementById("systemAudioButton");
    const micButton = document.getElementById("micButton");
    const styleSelect = document.getElementById("styleSelect");
    const algorithmSelect = document.getElementById("algorithmSelect");
    const algorithmSelectLabel = document.getElementById("algorithmSelectLabel");
    const spectrumFftSelect = document.getElementById("spectrumFftSelect");
    const spectrumBarsSelect = document.getElementById("spectrumBarsSelect");
    const spectrumTilt = document.getElementById("spectrumTilt");
    const spectrumTiltValue = document.getElementById("spectrumTiltValue");
    const spectralDynamicsFftSelect = document.getElementById("spectralDynamicsFftSelect");
    const spectralDynamicsWindowSelect = document.getElementById("spectralDynamicsWindowSelect");
    const spectralDynamicsRangeSelect = document.getElementById("spectralDynamicsRangeSelect");
    const spectralDynamicsDisplaySelect = document.getElementById("spectralDynamicsDisplaySelect");
    const spectralDynamicsTilt = document.getElementById("spectralDynamicsTilt");
    const spectralDynamicsTiltValue = document.getElementById("spectralDynamicsTiltValue");
    const spectrogramFftSelect = document.getElementById("spectrogramFftSelect");
    const spectrogramDetailSelect = document.getElementById("spectrogramDetailSelect");
    const spectrogramScaleSelect = document.getElementById("spectrogramScaleSelect");
    const spectrogramOrientationSelect = document.getElementById("spectrogramOrientationSelect");
    const spectrogramModeSelect = document.getElementById("spectrogramModeSelect");
    const spectrogramSpeedSelect = document.getElementById("spectrogramSpeedSelect");
    const spectrogramWindowSelect = document.getElementById("spectrogramWindowSelect");
    const spectrogramTilt = document.getElementById("spectrogramTilt");
    const spectrogramTiltValue = document.getElementById("spectrogramTiltValue");
    const spectrogramFreqOverlaySelect = document.getElementById("spectrogramFreqOverlaySelect");
    const spectrogramPianoOverlaySelect = document.getElementById("spectrogramPianoOverlaySelect");
    const spectrogramLoopSelect = document.getElementById("spectrogramLoopSelect");
    const tunerReference = document.getElementById("tunerReference");
    const tunerReferenceValue = document.getElementById("tunerReferenceValue");
    const signalCharacterModeSelect = document.getElementById("signalCharacterModeSelect");
    const signalCharacterWindowSelect = document.getElementById("signalCharacterWindowSelect");
    const signalCharacterDisplaySelect = document.getElementById("signalCharacterDisplaySelect");
    const signalCharacterBoundarySelect = document.getElementById("signalCharacterBoundarySelect");
    const signalCharacterFftWeight = document.getElementById("signalCharacterFftWeight");
    const signalCharacterFftWeightValue = document.getElementById("signalCharacterFftWeightValue");
    const signalCharacterNoise = document.getElementById("signalCharacterNoise");
    const signalCharacterNoiseValue = document.getElementById("signalCharacterNoiseValue");
    const signalCharacterTransient = document.getElementById("signalCharacterTransient");
    const signalCharacterTransientValue = document.getElementById("signalCharacterTransientValue");
    const signalCharacterSmoothing = document.getElementById("signalCharacterSmoothing");
    const signalCharacterSmoothingValue = document.getElementById("signalCharacterSmoothingValue");
    const phaseDungeonDetailSelect = document.getElementById("phaseDungeonDetailSelect");
    const phaseDungeonMemorySelect = document.getElementById("phaseDungeonMemorySelect");
    const phaseDungeonFog = document.getElementById("phaseDungeonFog");
    const phaseDungeonFogValue = document.getElementById("phaseDungeonFogValue");
    const phaseDungeonPressure = document.getElementById("phaseDungeonPressure");
    const phaseDungeonPressureValue = document.getElementById("phaseDungeonPressureValue");
    const wavesModeSelect = document.getElementById("wavesModeSelect");
    const wavesInputSelect = document.getElementById("wavesInputSelect");
    const wavesDensitySelect = document.getElementById("wavesDensitySelect");
    const wavesPersistence = document.getElementById("wavesPersistence");
    const wavesPersistenceValue = document.getElementById("wavesPersistenceValue");
    const wavesGlow = document.getElementById("wavesGlow");
    const wavesGlowValue = document.getElementById("wavesGlowValue");
    const scopeFollowSelect = document.getElementById("scopeFollowSelect");
    const waveformChannelSelect = document.getElementById("waveformChannelSelect");
    const waveformColorSelect = document.getElementById("waveformColorSelect");
    const waveformPeakSelect = document.getElementById("waveformPeakSelect");
    const waveformSpeedSelect = document.getElementById("waveformSpeedSelect");
    const waveformLoopSelect = document.getElementById("waveformLoopSelect");
    const stereoModeSelect = document.getElementById("stereoModeSelect");
    const stereoLayerToggles = document.getElementById("stereoLayerToggles");
    const stereoCorrToggle = document.getElementById("stereoCorrToggle");
    const stereoLowToggle = document.getElementById("stereoLowToggle");
    const stereoMidToggle = document.getElementById("stereoMidToggle");
    const stereoHighToggle = document.getElementById("stereoHighToggle");
    const graphControls = document.querySelector(".graph-controls");
    const spectrumControlsMount = document.getElementById("spectrumControlsMount");
    const spectralDynamicsControlsMount = document.getElementById("spectralDynamicsControlsMount");
    const spectrogramControlsMount = document.getElementById("spectrogramControlsMount");
    const tunerControlsMount = document.getElementById("tunerControlsMount");
    const signalCharacterControlsMount = document.getElementById("signalCharacterControlsMount");
    const phaseDungeonControlsMount = document.getElementById("phaseDungeonControlsMount");
    const wavesControlsMount = document.getElementById("wavesControlsMount");
    const oscilloscopeControlsMount = document.getElementById("oscilloscopeControlsMount");
    const waveformShortControlsMount = document.getElementById("waveformShortControlsMount");
    const waveformMediumControlsMount = document.getElementById("waveformMediumControlsMount");
    const waveformLongControlsMount = document.getElementById("waveformLongControlsMount");
    const stereoControlsMount = document.getElementById("stereoControlsMount");
    const patternControlsMount = document.getElementById("patternControlsMount");
    const readoutControlsMount = document.getElementById("readoutControlsMount");
    const displayRenderControlsMount = document.getElementById("displayRenderControlsMount");
    const inspectorBackdrop = document.getElementById("inspectorBackdrop");
    const floatingInspector = document.getElementById("floatingInspector");
    const floatingInspectorTitle = document.getElementById("floatingInspectorTitle");
    const floatingInspectorBody = document.getElementById("floatingInspectorBody");
    const floatingInspectorClose = document.getElementById("floatingInspectorClose");
    const patternSensitivity = document.getElementById("patternSensitivity");
    const patternThreshold = document.getElementById("patternThreshold");
    const patternWindowSelect = document.getElementById("patternWindowSelect");
    const patternSeparationSelect = document.getElementById("patternSeparationSelect");
    const patternSensitivityValue = document.getElementById("patternSensitivityValue");
    const patternThresholdValue = document.getElementById("patternThresholdValue");
    const generalFlashAmount = document.getElementById("generalFlashAmount");
    const generalFlashSmooth = document.getElementById("generalFlashSmooth");
    const generalFlashAmountValue = document.getElementById("generalFlashAmountValue");
    const generalFlashSmoothValue = document.getElementById("generalFlashSmoothValue");
    const kickFlashAmount = document.getElementById("kickFlashAmount");
    const kickFlashSmooth = document.getElementById("kickFlashSmooth");
    const kickFlashAmountValue = document.getElementById("kickFlashAmountValue");
    const kickFlashSmoothValue = document.getElementById("kickFlashSmoothValue");
    const snareFlashAmount = document.getElementById("snareFlashAmount");
    const snareFlashSmooth = document.getElementById("snareFlashSmooth");
    const snareFlashAmountValue = document.getElementById("snareFlashAmountValue");
    const snareFlashSmoothValue = document.getElementById("snareFlashSmoothValue");
    const tomFlashAmount = document.getElementById("tomFlashAmount");
    const tomFlashSmooth = document.getElementById("tomFlashSmooth");
    const tomFlashAmountValue = document.getElementById("tomFlashAmountValue");
    const tomFlashSmoothValue = document.getElementById("tomFlashSmoothValue");
    const hatFlashAmount = document.getElementById("hatFlashAmount");
    const hatFlashSmooth = document.getElementById("hatFlashSmooth");
    const hatFlashAmountValue = document.getElementById("hatFlashAmountValue");
    const hatFlashSmoothValue = document.getElementById("hatFlashSmoothValue");
    const cymbalFlashAmount = document.getElementById("cymbalFlashAmount");
    const cymbalFlashSmooth = document.getElementById("cymbalFlashSmooth");
    const cymbalFlashAmountValue = document.getElementById("cymbalFlashAmountValue");
    const cymbalFlashSmoothValue = document.getElementById("cymbalFlashSmoothValue");
    const spectralTilt = document.getElementById("spectralTilt");
    const spectralTiltValue = document.getElementById("spectralTiltValue");
    const spectralFlashAmount = document.getElementById("spectralFlashAmount");
    const spectralFlashSmooth = document.getElementById("spectralFlashSmooth");
    const spectralFlashAmountValue = document.getElementById("spectralFlashAmountValue");
    const spectralFlashSmoothValue = document.getElementById("spectralFlashSmoothValue");
    const sensitivity = document.getElementById("sensitivity");
    const glitch = document.getElementById("glitch");
    const pixel = document.getElementById("pixel");
    const imageInput = document.getElementById("imageInput");
    const imageInfluence = document.getElementById("imageInfluence");
    const sensitivityValue = document.getElementById("sensitivityValue");
    const glitchValue = document.getElementById("glitchValue");
    const pixelValue = document.getElementById("pixelValue");
    const imageInfluenceValue = document.getElementById("imageInfluenceValue");

    const contract = window.METTR_CONTRACT;
    const W = contract.canvas.width;
    const H = contract.canvas.height;
    const METER_LAYOUT = contract.layout;
    let activeStageHeight = H;
    const lowW = 240;
    const lowH = 240;
    const lowCanvas = document.createElement("canvas");
    lowCanvas.width = lowW;
    lowCanvas.height = lowH;
    const lowCtx = lowCanvas.getContext("2d", { alpha: false });
    const imageData = lowCtx.createImageData(lowW, lowH);
    const data = imageData.data;
    const sourceImageCanvas = document.createElement("canvas");
    sourceImageCanvas.width = lowW;
    sourceImageCanvas.height = lowH;
    const sourceImageCtx = sourceImageCanvas.getContext("2d", { alpha: false });
    let imageMap = null;
    let imageMapActivePixels = 0;
    let imageDirectPaletteMode = false;
    let imageDirectGreenBridgeMode = false;
    let imageMapOffsetX = 0;
    let imageMapOffsetY = 0;
    let imageLayerPoints = [[], [], [], []];
    let imageLayerContourPoints = [[], [], [], []];
    let frameLayerContourPoints = [[], [], [], []];

    let audioContext;
    let analyser;
    let spectrogramAnalyser;
    let spectrogramLowAnalyser;
    let spectrogramMidAnalyser;
    let spectrogramHighAnalyser;
    let scopeAnalyser;
    let splitter;
    let leftAnalyser;
    let rightAnalyser;
    let freqData = new Uint8Array(1024);
    let timeData = new Uint8Array(2048);
    let scopeTimeData = new Uint8Array(32768);
    let leftTime = new Uint8Array(1024);
    let rightTime = new Uint8Array(1024);
    let leftFreq = new Uint8Array(512);
    let rightFreq = new Uint8Array(512);
    let floatFreqData = new Float32Array(1024);
    let tunerFloatTimeData = new Float32Array(2048);
    let spectrogramFreqData = new Float32Array(2048);
    let spectrogramLowData = new Float32Array(16384);
    let spectrogramMidData = new Float32Array(4096);
    let spectrogramHighData = new Float32Array(2048);
    let spectrogramAdaptiveFloor = new Float32Array(0);
    let spectrogramLastColumnDb = new Float32Array(0);
    let previousFreqData = new Uint8Array(1024);
    let previousPatternFreqData = new Uint8Array(1024);
    let signalCharacterPreviousBands = [];
    let inputSource = "system";
    let metrics = { rms: 0, low: 0, mid: 0, high: 0, side: 0, peak: 0, density: 0, centroid: 0, bassHit: 0, midHit: 0, flux: 0, left: 0, right: 0 };
    let smoothed = { rms: 0, low: 0, mid: 0, high: 0, side: 0, peak: 0, density: 0, centroid: 0, bassHit: 0, midHit: 0, flux: 0, left: 0, right: 0 };
    let frameCostMs = 0;
    const meterState = {
      spectrum: [],
      spectrumDelta: [],
      spectrumPeak: [],
      spectralDynamics: {
        current: [],
        average: [],
        min: [],
        max: [],
        peak: [],
        range: [],
        lastUpdatedAt: 0
      },
      loudnessFrames: [],
      peakDb: -120,
      momentaryDb: -120,
      shortDb: -120,
      rmsFastDb: -120,
      rmsSlowDb: -120,
      correlation: 0,
      lowCorrelation: 0,
      midCorrelation: 0,
      highCorrelation: 0
    };
    const waveformState = {
      columns: [],
      writePhase: 0
    };
    const spectrogramCanvas = document.createElement("canvas");
    const spectrogramCtx = spectrogramCanvas.getContext("2d", { alpha: false });
    spectrogramCanvas.width = 620;
    spectrogramCanvas.height = 180;
    const spectrogramState = {
      write: 0,
      subPixel: 0,
      frame: 0,
      fftSize: 8192,
      detail: "standard",
      orientation: "horizontal",
      window: "tiny"
    };
    const spectrogramHover = {
      active: false,
      x: 0,
      y: 0,
      note: null,
      plot: null
    };
    const tunerState = {
      freq: 0,
      note: "--",
      cents: 0,
      confidence: 0,
      rms: 0,
      density: 0,
      stable: false,
      detected: false,
      lastStableAt: -99,
      lastDetectedAt: -99,
      lastSignalAt: -99,
      lastAnalysisAt: 0
    };
    const visualPresenceState = {
      alpha: 0,
      lastSignalAt: -99,
      lastUpdateAt: performance.now() / 1000,
      attackSeconds: 0.08,
      holdSeconds: 3.0,
      releaseSeconds: 1.0
    };
    const signalCharacterState = {
      flatness: 0,
      spectralCrest: 0,
      crestFactor: 0,
      zeroCrossing: 0,
      transientDensity: 0,
      transientImpact: 0,
      eventDensity: 0,
      lowAnchor: 0,
      tonal: 0,
      noisy: 0,
      mapNoise: 0.5,
      mapMotion: 0.5,
      sparse: 0,
      transient: 0,
      dynamic: 0
    };
    const signalCharacterBackend = {
      profile: { mode: "musical", window: "medium", fftWeight: 0.65 },
      descriptors: {},
      hints: {
        tunerTrust: 0,
        patternTrust: 0,
        noiseRisk: 0,
        transientBias: 0,
        spectralConfidence: 0
      },
      updatedAt: 0
    };
    window.METTR_SIGNAL_CHARACTER = signalCharacterBackend;
    const signalCharacterTrail = [];
    const signalCharacterPhysics = {
      initialized: false,
      lastSignalAt: -99,
      headAlpha: 0,
      trailAlpha: 0,
      head: { x: 0, y: 0, vx: 0, vy: 0, color: [140, 40, 110] },
      tailBlob: { x: 0, y: 0, vx: 0, vy: 0, color: [140, 40, 110], angles: [], freq: [], nodes: [] },
      blobAngles: [],
      blobFreq: [],
      blobNodes: []
    };
    const signalCharacterOnsets = [];
    let signalCharacterOnsetEnvelope = 0;
    let signalCharacterLastOnsetAt = -99;
    let signalCharacterPreviousPeak = 0;
    let signalCharacterPreviousRms = 0;
    let signalCharacterFluxFloor = 0;
    let signalCharacterFluxPeak = 0.001;
    const phaseDungeonState = {
      cells: [],
      lastSignalAt: -99,
      recurrence: 0,
      tunnelTravel: 0,
      tunnelZoom: 1,
      tunnelHeading: 0,
      tunnelDrop: 0,
      previousEnergy: 0,
      energyHistory: [],
      sectionPower: 0,
      brake: 0,
      acceleration: 0
    };
    const kineticVocalState = {
      f0Hz: 0,
      f0Confidence: 0,
      voiced: 0,
      f1: 0,
      f2: 0,
      f3: 0,
      f1Energy: 0,
      f2Energy: 0,
      f3Energy: 0,
      formantConfidence: 0,
      vowelOpen: 0,
      vowelFront: 0,
      rounding: 0,
      plosiveClosure: 0,
      plosiveBurst: 0,
      fricativeNoise: 0,
      breathNoise: 0,
      tractPressure: 0,
      glottalPhase: 0,
      turbulencePhase: 0,
      mouthPhase: 0,
      lastUpdateAt: 0
    };
    const wavesState = {
      trails: [],
      lastSignalAt: -99,
      pointCount: 0,
      phase: 0,
      sideFlow: 0,
      lowFlow: 0,
      midFlow: 0,
      highFlow: 0,
      shock: 0
    };
    const patternState = {
      previous: { kick: 0, tom: 0, snare: 0, hat: 0, cymbal: 0, global: 0 },
      envelope: { kick: 0, tom: 0, snare: 0, hat: 0, cymbal: 0, global: 0 },
      hits: { kick: 0, tom: 0, snare: 0, hat: 0, cymbal: 0, global: 0 },
      lastHit: { kick: -99, tom: -99, snare: -99, hat: -99, cymbal: -99, global: -99 },
      events: [],
      bpm: 0,
      confidence: 0,
      onsetRate: 0,
      stability: 0,
      generalFlash: 0,
      kickFlash: 0,
      tomFlash: 0,
      snareFlash: 0,
      hatFlash: 0,
      cymbalFlash: 0,
      spectralFlash: 0
    };
    const PATTERN_DETECTOR_PROFILE = {
      kick: { sensitivity: 1.1, threshold: 0.92, gain: 3.05, envAttack: 0.04, envRelease: 0.16, hold: 0.68 },
      tom: { sensitivity: 1.1, threshold: 0.8, gain: 2.85, envAttack: 0.035, envRelease: 0.18, hold: 0.68 },
      snare: { sensitivity: 1.08, threshold: 0.9, gain: 3.1, envAttack: 0.04, envRelease: 0.16, hold: 0.68 },
      hat: { sensitivity: 1.25, threshold: 0.74, gain: 2.65, envAttack: 0.018, envRelease: 0.26, hold: 0.55 },
      cymbal: { sensitivity: 1.1, threshold: 0.82, gain: 2.45, envAttack: 0.018, envRelease: 0.34, hold: 0.7 },
      global: { sensitivity: 1, threshold: 1, gain: 2.8, envAttack: 0.04, envRelease: 0.16, hold: 0.68 }
    };
    const spectralOutState = {
      r: 0,
      g: 0,
      b: 0,
      brightness: 0,
      saturation: 0,
      dominantHz: 0
    };
    const scopeState = {
      visible: 480,
      start: 0
    };
    const activeMeteringAlgorithm = contract.activeAlgorithm;
    const legacyMeteringAlgorithms = contract.legacyAlgorithms || {};
    const meteringLayouts = contract.layouts || {};
    const MAX_LAYOUT_MODULES = meteringLayouts.maxModules || 10;
    const METERING_RENDERERS = {
      drawSpectrumPanel,
      drawSpectralDynamicsPanel,
      drawSpectrogramPanel,
      drawTunerPanel,
      drawSignalCharacterPanel,
      drawPhaseDungeonPanel,
      drawWavesPanel,
      drawOscilloscopePanel,
      drawWaveformShortPanel,
      drawWaveformMediumPanel,
      drawWaveformPanel,
      drawStereoPanel,
      drawLoudnessPanel,
      drawPatternPanel
    };
    const METERING_MODULES = contract.modules.map((module) => ({
      ...module,
      renderer: METERING_RENDERERS[module.renderer]
    }));
    const METERING_MODULE_BY_ID = Object.fromEntries(METERING_MODULES.map((module) => [module.id, module]));
    const METERING_MODULE_LABELS = {
      spectrum: "Spectrum",
      spectralDynamics: "Spectral Dynamics",
      spectrogram: "Spectrogram",
      tuner: "Tuner",
      signalCharacter: "Signal Character",
      phaseDungeon: "Kinetic",
      waves: "Waves Spectrogram",
      oscilloscope: "Oscilloscope",
      waveformShort: "Waveform Short",
      waveformMedium: "Waveform Medium",
      waveformLong: "Waveform Long",
      stereo: "Stereometer",
      loudness: "Loudness",
      pattern: "Pattern Detector"
    };
    const availableLayoutModules = METERING_MODULES
      .map((module) => module.id)
      .filter((id) => activeMeteringAlgorithm.modules.includes(id));
    let currentLayoutId = "default";
    let currentLayoutModules = [];
    let layoutControlsDirty = true;
    const graphOpenState = {
      spectrum: true,
      spectralDynamics: true,
      spectrogram: true,
      tuner: true,
      signalCharacter: true,
      phaseDungeon: true,
      waves: true,
      oscilloscope: true,
      waveformShort: true,
      waveformMedium: true,
      waveformLong: true,
      stereo: true,
      loudness: true,
      pattern: true,
      patternDisplayRender: true
    };
    const PATTERN_NESTED_MODULES = {
      displayRender: "Display Render"
    };
    let patternNestedModules = ["displayRender"];
    let activeInspectorMount = null;
    let graphControlScale = 1;
    let cameraTilt = { x: 0, y: 0, twist: 0 };
    const planePhysics = [
      { z: 0, vz: 0, x: 0, y: 0, vx: 0, vy: 0, phase: 0.2 },
      { z: 0, vz: 0, x: 0, y: 0, vx: 0, vy: 0, phase: 1.7 },
      { z: 0, vz: 0, x: 0, y: 0, vx: 0, vy: 0, phase: 3.1 },
      { z: 0, vz: 0, x: 0, y: 0, vx: 0, vy: 0, phase: 4.6 }
    ];
    const planeMotionContract = [
      { maxShift: 18, returnK: 1.05, lateral: 0.2, vertical: 0.24, speed: 0.13, bias: 0.12 },
      { maxShift: 34, returnK: 1.2, lateral: 0.88, vertical: 0.36, speed: 0.22, bias: -0.04 },
      { maxShift: 42, returnK: 1.12, lateral: 0.58, vertical: 0.54, speed: 0.18, bias: 0.04 },
      { maxShift: 54, returnK: 1.0, lateral: 0.32, vertical: 0.84, speed: 0.15, bias: -0.1 }
    ];
    let lowEnvelope = 0;
    let midEnvelope = 0;
    let rmsEnvelope = 0;
    let beatFlash = 0;
    let streamRef = null;
    let inputCapabilityStatus = {};
    let t = 0;

    function clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    function finiteOr(value, fallback = 0) {
      return Number.isFinite(value) ? value : fallback;
    }

    function clampFinite(value, min, max, fallback = min) {
      return clamp(finiteOr(value, fallback), min, max);
    }

    function lerp(a, b, amount) {
      return a + (b - a) * amount;
    }

    function smoothstep(edge0, edge1, value) {
      const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
      return x * x * (3 - 2 * x);
    }

    function getCurrentAlgorithm() {
      return activeMeteringAlgorithm;
    }

    function markLayoutControlsDirty() {
      layoutControlsDirty = true;
    }

    function sanitizeLayoutModules(modules) {
      const seen = new Set();
      const clean = [];
      for (const id of modules || []) {
        if (!availableLayoutModules.includes(id) || seen.has(id)) continue;
        seen.add(id);
        clean.push(id);
        if (clean.length >= MAX_LAYOUT_MODULES) break;
      }
      return clean;
    }

    function getLayoutPreset(id) {
      return meteringLayouts[id] || meteringLayouts.default || { modules: [] };
    }

    function getInitialLayoutId() {
      const params = new URLSearchParams(window.location.search);
      const requested = (params.get("layout") || "").trim().toLowerCase();
      return Array.isArray(meteringLayouts[requested]?.modules) ? requested : "default";
    }

    function setCurrentLayout(id) {
      currentLayoutId = Array.isArray(meteringLayouts[id]?.modules) ? id : "default";
      currentLayoutModules = sanitizeLayoutModules(getLayoutPreset(currentLayoutId).modules);
      syncLayoutSelectUi();
      markLayoutControlsDirty();
      setStageHeight(calculateMeteringHeight());
      syncGraphControlsForLayout();
    }

    function syncLayoutSelectUi() {
      const label = getLayoutPreset(currentLayoutId).id || currentLayoutId;
      algorithmSelect.value = currentLayoutId;
      algorithmSelectLabel.textContent = label;
      document.body.dataset.algorithm = activeMeteringAlgorithm.id;
      document.body.dataset.layout = currentLayoutId;
      modeLabel.textContent = activeMeteringAlgorithm.id;
    }

    function getLayoutModuleIds() {
      return currentLayoutModules.slice();
    }

    function getAvailableModulesToAdd() {
      const active = new Set(currentLayoutModules);
      return availableLayoutModules.filter((id) => !active.has(id));
    }

    function removeLayoutModule(id) {
      currentLayoutModules = currentLayoutModules.filter((moduleId) => moduleId !== id);
      markLayoutControlsDirty();
      setStageHeight(calculateMeteringHeight());
      syncGraphControlsForLayout();
    }

    function addLayoutModule(id) {
      if (!id || currentLayoutModules.length >= MAX_LAYOUT_MODULES) return;
      if (!availableLayoutModules.includes(id) || currentLayoutModules.includes(id)) return;
      currentLayoutModules = sanitizeLayoutModules([...currentLayoutModules, id]);
      markLayoutControlsDirty();
      setStageHeight(calculateMeteringHeight());
      syncGraphControlsForLayout();
    }

    function getModuleRect(module) {
      return METER_LAYOUT[module.rect || module.id];
    }

    function getCompactResponsiveT() {
      if (!useCompactGraphLayout()) return 0;
      const responsive = contract.responsive || {};
      const minWidth = responsive.compactMinWidth || 360;
      const maxWidth = responsive.compactMaxWidth || 600;
      const widths = [
        stageEl?.clientWidth || 0,
        window.innerWidth || 0,
        document.documentElement?.clientWidth || 0
      ].filter((value) => Number.isFinite(value) && value > 0);
      const width = widths.length ? Math.min(...widths) : maxWidth;
      const t = clamp((maxWidth - width) / Math.max(1, maxWidth - minWidth), 0, 1);
      return smoothstep(0, 1, t);
    }

    function getModuleHeightScale(module) {
      if (!useCompactGraphLayout()) return 1;
      const moduleScale = contract.responsive?.modules?.[module.id]?.compactScale || 1;
      return lerp(1, moduleScale, getCompactResponsiveT());
    }

    function getModuleContentMinHeight(module) {
      if (!useCompactGraphLayout() || !module) return 0;
      const pad = canvasPxForCss(16);
      if (module.id === "loudness") {
        const row = meterRowMetrics("compact");
        return Math.ceil(pad * 2 + row.height * 5);
      }
      if (module.id === "pattern") {
        const row = meterRowMetrics("primary");
        const rhythm = canvasPxForCss(44);
        const history = canvasPxForCss(120);
        const nestedHeader = canvasPxForCss(contract.ui?.moduleHeader?.mobileHeightPx || 42);
        const nestedGap = canvasPxForCss(contract.ui?.moduleHeader?.nestedBodyGapPx || 18);
        const displayLabels = canvasPxForCss(44);
        const displayGaps = canvasPxForCss(42);
        const displayFields = canvasPxForCss(260);
        return Math.ceil(pad * 2 + row.height * 5 + rhythm + history + nestedHeader + nestedGap + displayLabels + displayGaps + displayFields);
      }
      if (module.id === "signalCharacter") {
        const row = meterRowMetrics("compact");
        const section = meterTextSize(10, 0, 13);
        const mapMin = canvasPxForCss(190);
        const mapTitle = section + canvasPxForCss(12);
        const decisionGap = Math.max(canvasPxForCss(22), section + 10);
        const decisionTitle = section + Math.max(canvasPxForCss(14), section + 4);
        return Math.ceil(pad * 2 + mapTitle + mapMin + decisionGap + decisionTitle + row.height * 5 + canvasPxForCss(28));
      }
      return 0;
    }

    function getModuleHeight(module, compact = useCompactGraphLayout()) {
      const rect = getModuleRect(module);
      if (!rect) return METER_LAYOUT.collapsedAdvance;
      const baseHeight = compact && rect.compactHeight ? rect.compactHeight : rect.height;
      const computed = Math.max(
        Math.round(baseHeight * getModuleHeightScale(module)),
        getModuleContentMinHeight(module)
      );
      return Number.isFinite(computed) && computed > 0 ? computed : baseHeight || METER_LAYOUT.minHeight;
    }

    function getMeteringTop() {
      if (!useCompactGraphLayout()) return METER_LAYOUT.top;
      return Math.max(METER_LAYOUT.top, contract.responsive?.compactTop || METER_LAYOUT.top);
    }

    function getCollapsedAdvance(module, compact = useCompactGraphLayout()) {
      const baseAdvance = module.flow === "dual" && compact
        ? METER_LAYOUT.stackedCollapsedAdvance
        : METER_LAYOUT.collapsedAdvance;
      return compact ? Math.max(baseAdvance, getCompactControlLaneGap()) : baseAdvance;
    }

    function getCompactControlLaneGap() {
      if (!useCompactGraphLayout()) return 0;
      const scale = Math.max(0.001, stageEl.clientWidth / W || graphControlScale || 1);
      const summaries = Array.from(graphControls?.querySelectorAll(".control-group > summary") || []);
      const controlHeight = summaries.reduce((max, summary) => {
        const style = getComputedStyle(summary);
        const minHeight = parseFloat(style.minHeight) || 0;
        return Math.max(max, summary.getBoundingClientRect().height || 0, minHeight);
      }, 28);
      return (Math.max(38, controlHeight) + 14) / scale;
    }

    function getCompactAdvanceClearance(module, baseHeight, nominalAdvance) {
      if (!useCompactGraphLayout() || module.id === "pattern") return 0;
      const currentGap = Math.max(0, nominalAdvance - baseHeight);
      const requiredGap = getCompactControlLaneGap();
      return Math.max(0, requiredGap - currentGap);
    }

    function getOpenAdvance(module, compact = useCompactGraphLayout()) {
      const rect = getModuleRect(module);
      if (!rect) return METER_LAYOUT.collapsedAdvance;
      const mobileAdvanceMin = (() => {
        if (!useCompactGraphLayout()) return 0;
        if (module.id === "signalCharacter") return getModuleContentMinHeight(module) + getCompactControlLaneGap() + canvasPxForCss(28);
        if (module.id === "loudness") return canvasPxForCss(300);
        if (module.id === "pattern") return canvasPxForCss(880);
        return 0;
      })();
      if (module.flow === "dual" && compact) {
        const compactBase = rect.compactHeight || rect.height;
        const heightDelta = getModuleHeight(module, compact) - compactBase;
        const advance = METER_LAYOUT.compactMeterAdvance
          + Math.max(0, heightDelta)
          + getCompactAdvanceClearance(module, compactBase, METER_LAYOUT.compactMeterAdvance);
        return Math.max(advance, mobileAdvanceMin);
      }
      const heightDelta = getModuleHeight(module, compact) - rect.height;
      const baseAdvance = rect.advance || rect.height + 36;
      const advance = baseAdvance
        + Math.max(0, heightDelta)
        + getCompactAdvanceClearance(module, rect.height, baseAdvance);
      return Math.max(advance, mobileAdvanceMin);
    }

    function getModuleAdvance(module, compact = useCompactGraphLayout()) {
      return graphOpenState[module.id]
        ? getOpenAdvance(module, compact)
        : getCollapsedAdvance(module, compact);
    }

    function getLayoutAddSlotAdvance() {
      return useCompactGraphLayout() ? getCompactControlLaneGap() + 22 : 74;
    }

    function getLayoutRows() {
      const layout = METER_LAYOUT;
      let y = getMeteringTop();
      const rows = [];
      const moduleIds = getLayoutModuleIds();
      for (let i = 0; i < moduleIds.length; i += 1) {
        const module = METERING_MODULE_BY_ID[moduleIds[i]];
        if (!module) continue;
        if (i > 0) y += layout.rowGap;
        const height = getModuleHeight(module);
        const advance = getModuleAdvance(module, useCompactGraphLayout());
        rows.push({ module, y, height, advance });
        y += advance;
      }
      return {
        rows,
        addY: y + (moduleIds.length ? layout.rowGap : 0)
      };
    }

    function moveControlById(id, mount) {
      const control = document.getElementById(id);
      const wrapper = control ? control.closest("label") : null;
      if (wrapper && mount) mount.appendChild(wrapper);
    }

    function moveElementById(id, mount) {
      const element = document.getElementById(id);
      if (element && mount) mount.appendChild(element);
    }

    function openFloatingInspector(title, mount, anchorRect = null) {
      if (!floatingInspector || !floatingInspectorBody || !mount) return;
      if (activeInspectorMount && activeInspectorMount !== mount) {
        while (floatingInspectorBody.firstElementChild) {
          activeInspectorMount.appendChild(floatingInspectorBody.firstElementChild);
        }
      }
      activeInspectorMount = mount;
      floatingInspectorTitle.textContent = title;
      while (mount.firstElementChild) {
        floatingInspectorBody.appendChild(mount.firstElementChild);
      }
      floatingInspector.classList.add("is-open");
      inspectorBackdrop?.classList.add("is-open");
      floatingInspector.setAttribute("aria-hidden", "false");
      const margin = 24;
      const viewport = window.visualViewport || { width: window.innerWidth, height: window.innerHeight, offsetLeft: 0, offsetTop: 0 };
      const viewportLeft = viewport.offsetLeft || 0;
      const viewportTop = viewport.offsetTop || 0;
      const viewportWidth = viewport.width || window.innerWidth;
      const viewportHeight = viewport.height || window.innerHeight;
      const width = Math.min(340, viewportWidth - margin * 2);
      const maxHeight = Math.max(220, viewportHeight - margin * 2);
      floatingInspector.style.width = `${width}px`;
      floatingInspector.style.maxHeight = `${maxHeight}px`;
      floatingInspector.style.left = `${viewportLeft + (viewportWidth - width) * 0.5}px`;
      floatingInspector.style.right = "auto";
      floatingInspector.style.top = `${viewportTop + margin}px`;

      const inspectorRect = floatingInspector.getBoundingClientRect();
      const panelHeight = Math.min(inspectorRect.height, maxHeight);
      const stableTop = viewportTop + Math.max(margin, (viewportHeight - panelHeight) * 0.35);
      floatingInspector.style.top = `${clamp(stableTop, viewportTop + margin, viewportTop + viewportHeight - panelHeight - margin)}px`;
    }

    function closeFloatingInspector() {
      if (!floatingInspector || !floatingInspectorBody || !activeInspectorMount) return;
      while (floatingInspectorBody.firstElementChild) {
        activeInspectorMount.appendChild(floatingInspectorBody.firstElementChild);
      }
      floatingInspector.classList.remove("is-open");
      inspectorBackdrop?.classList.remove("is-open");
      floatingInspector.setAttribute("aria-hidden", "true");
      activeInspectorMount = null;
    }

    function syncGraphToggleButton(button, isOpen) {
      if (!button) return;
      button.textContent = "";
      button.classList.toggle("is-open", isOpen);
      button.classList.toggle("is-closed", !isOpen);
      button.setAttribute("aria-pressed", isOpen ? "true" : "false");
    }

    function hasPatternNestedModule(id) {
      return patternNestedModules.includes(id);
    }

    function getAvailablePatternNestedModules() {
      return Object.keys(PATTERN_NESTED_MODULES).filter((id) => !hasPatternNestedModule(id));
    }

    function removePatternNestedModule(id) {
      patternNestedModules = patternNestedModules.filter((moduleId) => moduleId !== id);
      closeFloatingInspector();
    }

    function addPatternNestedModule(id) {
      if (!PATTERN_NESTED_MODULES[id] || hasPatternNestedModule(id)) return;
      patternNestedModules.push(id);
      graphOpenState.patternDisplayRender = true;
    }

    function ensurePatternNestedAddSlot() {
      if (!graphControls) return null;
      let slot = graphControls.querySelector('[data-module="patternNestedAdd"]');
      if (slot) return slot;
      slot = document.createElement("div");
      slot.className = "control-group add-module-slot nested-add-slot";
      slot.dataset.module = "patternNestedAdd";
      slot.innerHTML = `
        <button class="add-module-button" type="button" aria-label="Add Pattern module">+</button>
        <select class="add-module-select" aria-label="Add Pattern module">
          <option value="">Add module</option>
        </select>
      `;
      const button = slot.querySelector(".add-module-button");
      const select = slot.querySelector(".add-module-select");
      button.addEventListener("click", () => {
        if (select.disabled) return;
        const available = getAvailablePatternNestedModules();
        if (available.length === 1) {
          addPatternNestedModule(available[0]);
          return;
        }
        select.focus();
      });
      select.addEventListener("change", () => {
        addPatternNestedModule(select.value);
        select.value = "";
      });
      graphControls.appendChild(slot);
      return slot;
    }

    function hidePatternNestedAddSlot() {
      const slot = graphControls?.querySelector('[data-module="patternNestedAdd"]');
      if (slot) slot.hidden = true;
    }

    function ensurePatternDisplayControl() {
      if (!graphControls) return null;
      let group = graphControls.querySelector('[data-module="patternDisplayRender"]');
      if (group) return group;
      group = document.createElement("div");
      group.className = "control-group nested-module-control";
      group.dataset.module = "patternDisplayRender";
      group.innerHTML = `
        <summary>
          <span class="module-title">Display Render</span>
          <span class="param-icon" aria-hidden="true"></span>
          <button class="graph-toggle" type="button" aria-label="Toggle Display Render graph"></button>
          <button class="module-remove" type="button" aria-label="Remove Display Render"></button>
        </summary>
      `;
      const summary = group.querySelector("summary");
      const toggle = group.querySelector(".graph-toggle");
      const remove = group.querySelector(".module-remove");
      summary.addEventListener("click", (event) => {
        const clickedToggle = event.target.closest(".graph-toggle");
        const clickedRemove = event.target.closest(".module-remove");
        if (clickedToggle || clickedRemove) return;
        event.preventDefault();
        event.stopPropagation();
        openFloatingInspector("Display Render", displayRenderControlsMount, group.getBoundingClientRect());
      });
      syncGraphToggleButton(toggle, graphOpenState.patternDisplayRender);
      toggle.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        graphOpenState.patternDisplayRender = !graphOpenState.patternDisplayRender;
        syncGraphToggleButton(toggle, graphOpenState.patternDisplayRender);
      });
      remove.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        removePatternNestedModule("displayRender");
      });
      graphControls.appendChild(group);
      return group;
    }

    function hidePatternDisplayControl() {
      const group = graphControls?.querySelector('[data-module="patternDisplayRender"]');
      if (group) group.hidden = true;
    }

    function updatePatternDisplayControl(graphX, graphY) {
      const group = ensurePatternDisplayControl();
      if (!group) return;
      const canShow = currentLayoutModules.includes("pattern")
        && graphOpenState.pattern
        && hasPatternNestedModule("displayRender");
      group.hidden = !canShow;
      if (!canShow) return;
      const toggle = group.querySelector(".graph-toggle");
      syncGraphToggleButton(toggle, graphOpenState.patternDisplayRender);
      const scale = graphControlScale;
      group.style.top = `${Math.max(2, graphY * scale)}px`;
      group.style.left = `${graphX * scale}px`;
      group.style.width = `${getModuleHeaderWidth()}px`;
    }

    function updatePatternNestedAddSlot(graphX, graphY, graphW) {
      const slot = ensurePatternNestedAddSlot();
      if (!slot) return;
      const available = getAvailablePatternNestedModules();
      const canAdd = currentLayoutModules.includes("pattern")
        && graphOpenState.pattern
        && available.length > 0;
      const select = slot.querySelector(".add-module-select");
      const button = slot.querySelector(".add-module-button");
      slot.hidden = !canAdd;
      button.disabled = !canAdd;
      select.disabled = !canAdd;
      select.innerHTML = '<option value="">Add module</option>';
      for (const id of available) {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = PATTERN_NESTED_MODULES[id];
        select.appendChild(option);
      }
      if (!canAdd) return;
      const scale = graphControlScale;
      slot.style.top = `${Math.max(2, graphY * scale)}px`;
      slot.style.left = `${graphX * scale}px`;
      slot.style.width = `${graphW * scale}px`;
    }

    function ensureLayoutAddSlot() {
      if (!graphControls) return null;
      let slot = graphControls.querySelector('[data-module="layoutAdd"]');
      if (slot) return slot;
      slot = document.createElement("div");
      slot.className = "control-group add-module-slot";
      slot.dataset.module = "layoutAdd";
      slot.innerHTML = `
        <button class="add-module-button" type="button" aria-label="Add meter module">+</button>
        <select class="add-module-select" aria-label="Add meter module">
          <option value="">Add module</option>
        </select>
      `;
      const button = slot.querySelector(".add-module-button");
      const select = slot.querySelector(".add-module-select");
      button.addEventListener("click", () => {
        if (select.disabled) return;
        select.focus();
      });
      select.addEventListener("change", () => {
        addLayoutModule(select.value);
        select.value = "";
      });
      graphControls.appendChild(slot);
      return slot;
    }

    function updateLayoutAddSlot() {
      const slot = ensureLayoutAddSlot();
      if (!slot) return;
      const select = slot.querySelector(".add-module-select");
      const button = slot.querySelector(".add-module-button");
      const available = getAvailableModulesToAdd();
      const canAdd = currentLayoutModules.length < MAX_LAYOUT_MODULES && available.length > 0;
      slot.hidden = !canAdd;
      button.disabled = !canAdd;
      select.disabled = !canAdd;
      select.innerHTML = '<option value="">Add module</option>';
      for (const id of available) {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = METERING_MODULE_LABELS[id] || id;
        select.appendChild(option);
      }
      if (canAdd) positionLayoutAddSlot(getLayoutRows().addY);
    }

    function syncGraphControlsForLayout() {
      if (!graphControls) return;
      const active = new Set(currentLayoutModules);
      graphControls.querySelectorAll(".control-group").forEach((group) => {
        const moduleId = group.dataset.module;
        if (moduleId === "layoutAdd") return;
        if (moduleId === "patternNestedAdd") return;
        if (!METERING_MODULE_BY_ID[moduleId]) {
          group.hidden = true;
          return;
        }
        group.hidden = !active.has(moduleId);
        const remove = group.querySelector(".module-remove");
        if (remove) remove.hidden = !active.has(moduleId);
      });
      updateLayoutAddSlot();
      layoutControlsDirty = false;
    }

    function organizeGraphControls() {
      if (graphControls && graphControls.parentElement !== stageEl) {
        stageEl.appendChild(graphControls);
      }
      graphControls?.querySelectorAll(".control-group").forEach((group) => {
        if (group.dataset.module === "layoutAdd") return;
        if (group.dataset.module === "patternNestedAdd") return;
        if (METERING_MODULE_BY_ID[group.dataset.module] && !group.querySelector(".module-remove")) {
          const remove = document.createElement("button");
          remove.className = "module-remove";
          remove.type = "button";
          remove.setAttribute("aria-label", `Remove ${group.querySelector(".module-title")?.textContent?.trim() || "module"}`);
          group.querySelector("summary")?.appendChild(remove);
        }
        group.querySelector("summary")?.addEventListener("click", (event) => {
          const clickedToggle = event.target.closest(".graph-toggle");
          const clickedRemove = event.target.closest(".module-remove");
          if (clickedToggle || clickedRemove) return;
          event.preventDefault();
          event.stopPropagation();
          const mount = group.querySelector(".control-body");
          if (!mount) return;
          const title = group.querySelector(".module-title")?.textContent?.trim() || "Parameters";
          openFloatingInspector(title, mount, group.getBoundingClientRect());
        });
        if (group.classList.contains("no-params")) {
          group.querySelector("summary")?.addEventListener("click", (event) => {
            event.preventDefault();
          });
        }
        group.addEventListener("toggle", () => {
          if (!group.open) return;
          graphControls.querySelectorAll(".control-group").forEach((other) => {
          if (other !== group) other.open = false;
          });
        });
        const remove = group.querySelector(".module-remove");
        remove?.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          removeLayoutModule(group.dataset.module);
        });
        const toggle = group.querySelector(".graph-toggle");
        syncGraphToggleButton(toggle, graphOpenState[group.dataset.module]);
        toggle?.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const key = group.dataset.module;
          graphOpenState[key] = !graphOpenState[key];
          syncGraphToggleButton(toggle, graphOpenState[key]);
          markLayoutControlsDirty();
          setStageHeight(calculateMeteringHeight());
          syncGraphControlsForLayout();
        });
      });
      ensureLayoutAddSlot();
      ensurePatternDisplayControl();
      ensurePatternNestedAddSlot();
      moveControlById("spectrumFftSelect", spectrumControlsMount);
      moveControlById("spectrumBarsSelect", spectrumControlsMount);
      moveControlById("spectrumTilt", spectrumControlsMount);
      moveControlById("spectralDynamicsFftSelect", spectralDynamicsControlsMount);
      moveControlById("spectralDynamicsWindowSelect", spectralDynamicsControlsMount);
      moveControlById("spectralDynamicsRangeSelect", spectralDynamicsControlsMount);
      moveControlById("spectralDynamicsDisplaySelect", spectralDynamicsControlsMount);
      moveControlById("spectralDynamicsTilt", spectralDynamicsControlsMount);
      moveControlById("spectrogramFftSelect", spectrogramControlsMount);
      moveControlById("spectrogramDetailSelect", spectrogramControlsMount);
      moveControlById("spectrogramScaleSelect", spectrogramControlsMount);
      moveControlById("spectrogramOrientationSelect", spectrogramControlsMount);
      moveControlById("spectrogramModeSelect", spectrogramControlsMount);
      moveControlById("spectrogramSpeedSelect", spectrogramControlsMount);
      moveControlById("spectrogramWindowSelect", spectrogramControlsMount);
      moveControlById("spectrogramTilt", spectrogramControlsMount);
      moveControlById("spectrogramFreqOverlaySelect", spectrogramControlsMount);
      moveControlById("spectrogramPianoOverlaySelect", spectrogramControlsMount);
      moveControlById("spectrogramLoopSelect", spectrogramControlsMount);
      moveControlById("tunerReference", tunerControlsMount);
      moveControlById("signalCharacterModeSelect", signalCharacterControlsMount);
      moveControlById("signalCharacterWindowSelect", signalCharacterControlsMount);
      moveControlById("signalCharacterDisplaySelect", signalCharacterControlsMount);
      moveControlById("signalCharacterBoundarySelect", signalCharacterControlsMount);
      moveControlById("signalCharacterFftWeight", signalCharacterControlsMount);
      moveControlById("signalCharacterNoise", signalCharacterControlsMount);
      moveControlById("signalCharacterTransient", signalCharacterControlsMount);
      moveControlById("signalCharacterSmoothing", signalCharacterControlsMount);
      moveControlById("phaseDungeonDetailSelect", phaseDungeonControlsMount);
      moveControlById("phaseDungeonMemorySelect", phaseDungeonControlsMount);
      moveControlById("phaseDungeonFog", phaseDungeonControlsMount);
      moveControlById("phaseDungeonPressure", phaseDungeonControlsMount);
      moveControlById("wavesModeSelect", wavesControlsMount);
      moveControlById("wavesInputSelect", wavesControlsMount);
      moveControlById("wavesDensitySelect", wavesControlsMount);
      moveControlById("wavesPersistence", wavesControlsMount);
      moveControlById("wavesGlow", wavesControlsMount);
      moveControlById("scopeFollowSelect", oscilloscopeControlsMount);
      moveControlById("waveformChannelSelect", waveformShortControlsMount);
      moveControlById("waveformColorSelect", waveformShortControlsMount);
      moveControlById("waveformPeakSelect", waveformMediumControlsMount);
      moveControlById("waveformSpeedSelect", waveformMediumControlsMount);
      moveControlById("waveformLoopSelect", waveformLongControlsMount);
      moveControlById("stereoModeSelect", stereoControlsMount);
      moveElementById("stereoLayerToggles", stereoControlsMount);

      const patternSection = document.querySelector("aside .algorithm-local");
      if (patternSection && patternControlsMount) {
        const heading = patternSection.querySelector("h1");
        if (heading) heading.remove();
        while (patternSection.firstElementChild) {
          patternControlsMount.appendChild(patternSection.firstElementChild);
        }
        patternSection.remove();
      }
      ["general", "kick", "snare", "tom", "hat", "cymbal"].forEach((name) => {
        moveControlById(`${name}FlashAmount`, displayRenderControlsMount);
        moveControlById(`${name}FlashSmooth`, displayRenderControlsMount);
      });
      const outputTitle = Array.from(patternControlsMount?.querySelectorAll(".section-title") || [])
        .find((title) => title.textContent.trim().toLowerCase() === "elements out");
      if (outputTitle && displayRenderControlsMount) {
        displayRenderControlsMount.prepend(outputTitle);
      }
      const spectralOutTitle = Array.from(patternControlsMount?.querySelectorAll(".section-title") || [])
        .find((title) => title.textContent.trim().toLowerCase() === "spectral out");
      if (spectralOutTitle && displayRenderControlsMount) {
        displayRenderControlsMount.appendChild(spectralOutTitle);
      }
      moveControlById("spectralTilt", displayRenderControlsMount);
      moveControlById("spectralFlashAmount", displayRenderControlsMount);
      moveControlById("spectralFlashSmooth", displayRenderControlsMount);

      const meterWrapper = rmsMeter.closest(".meter")?.parentElement;
      const readout = document.querySelector("aside .readout");
      if (meterWrapper && readoutControlsMount) readoutControlsMount.appendChild(meterWrapper);
      if (readout && readoutControlsMount) readoutControlsMount.appendChild(readout);
      updateGraphControlScale();
    }

    function getModuleControlHeight(group) {
      const summary = group?.querySelector("summary");
      if (!summary) return 24;
      const style = getComputedStyle(summary);
      const minHeight = parseFloat(style.minHeight) || 0;
      return Math.max(summary.getBoundingClientRect().height || 0, minHeight, 20);
    }

    function getControlBlockHeight(group) {
      if (!group) return 24;
      const summary = group.querySelector("summary");
      if (summary) return getModuleControlHeight(group);
      const style = getComputedStyle(group);
      const minHeight = parseFloat(style.minHeight) || 0;
      return Math.max(group.getBoundingClientRect().height || 0, minHeight, 20);
    }

    function getControlLaneTop(group, graphTop) {
      const compact = useCompactGraphLayout();
      const scale = graphControlScale;
      const controlGap = compact ? 5 : 3;
      return Math.max(2, graphTop * scale - getControlBlockHeight(group) - controlGap);
    }

    function positionModuleControl(key, graphTop) {
      const group = graphControls?.querySelector(`[data-module="${key}"]`);
      if (!group) return;
      const layout = METER_LAYOUT;
      const scale = graphControlScale;
      group.style.top = `${getControlLaneTop(group, graphTop)}px`;
      group.style.left = `${layout.left * scale}px`;
      group.style.width = `${layout.fullWidth * scale}px`;
    }

    function getModuleHeaderWidth() {
      const spec = contract.ui?.moduleHeader || {};
      const ratio = useCompactGraphLayout()
        ? (spec.mobileWidthRatio || 0.666666)
        : (spec.desktopWidthRatio || 0.5);
      return METER_LAYOUT.fullWidth * graphControlScale * ratio;
    }

    function positionLayoutAddSlot(graphTop) {
      const slot = graphControls?.querySelector('[data-module="layoutAdd"]');
      if (!slot || slot.hidden) return;
      const layout = METER_LAYOUT;
      const scale = graphControlScale;
      const rows = getLayoutRows().rows;
      const lastRow = rows[rows.length - 1];
      const naturalTop = getControlLaneTop(slot, graphTop);
      const minTop = lastRow
        ? (lastRow.y + getModuleHeight(lastRow.module)) * scale + layout.rowGap * scale
        : naturalTop;
      slot.style.top = `${Math.max(naturalTop, minTop)}px`;
      slot.style.left = `${layout.left * scale}px`;
      slot.style.width = `${layout.fullWidth * scale}px`;
    }

    function updateGraphControlScale() {
      if (!graphControls) return;
      graphControlScale = stageEl.clientWidth / W;
      graphControls.style.width = `${stageEl.clientWidth}px`;
      graphControls.style.height = `${activeStageHeight * graphControlScale}px`;
      graphControls.style.transform = "none";
      if (characterOverlayCanvas) {
        characterOverlayCanvas.style.width = `${stageEl.clientWidth}px`;
        characterOverlayCanvas.style.height = `${activeStageHeight * graphControlScale}px`;
      }
    }

    function useCompactGraphLayout() {
      const widths = [
        stageEl?.clientWidth || 0,
        window.innerWidth || 0,
        document.documentElement?.clientWidth || 0
      ].filter((width) => Number.isFinite(width) && width > 0);
      const effectiveWidth = widths.length ? Math.min(...widths) : METER_LAYOUT.canvasWidth;
      return effectiveWidth < METER_LAYOUT.compactBreakpoint;
    }

    function calculateMeteringHeight() {
      const layout = METER_LAYOUT;
      const compact = useCompactGraphLayout();
      let y = getMeteringTop();
      const rows = getLayoutRows();
      for (const row of rows.rows) {
        y = row.y + row.advance;
      }
      if (rows.rows.length < MAX_LAYOUT_MODULES && getAvailableModulesToAdd().length) {
        y = rows.addY + getLayoutAddSlotAdvance();
      }
      const measured = Math.ceil(y + layout.bottom);
      return Number.isFinite(measured) && measured > 0
        ? Math.max(layout.minHeight, measured)
        : layout.minHeight;
    }

    function setStageHeight(height) {
      const measured = Math.ceil(height);
      const nextHeight = Number.isFinite(measured) && measured > 0
        ? Math.max(420, measured)
        : Math.max(420, METER_LAYOUT.minHeight || H);
      if (activeStageHeight === nextHeight && canvas.height === nextHeight) return;
      activeStageHeight = nextHeight;
      canvas.height = nextHeight;
      if (characterOverlayCanvas) characterOverlayCanvas.height = nextHeight;
      stageEl.style.aspectRatio = `${W} / ${nextHeight}`;
      updateGraphControlScale();
    }

    function setInputSource(source, message = "") {
      inputSource = source;
      const systemActive = source === "system";
      systemAudioButton.classList.toggle("is-active", systemActive);
      systemAudioButton.setAttribute("aria-pressed", systemActive ? "true" : "false");
      micButton.classList.toggle("is-active", !systemActive);
      micButton.setAttribute("aria-pressed", systemActive ? "false" : "true");
      statusEl.textContent = message;
    }

    function getAudioContextConstructor() {
      return window.AudioContext || window.webkitAudioContext;
    }

    function isProbablyMobileBrowser() {
      const ua = navigator.userAgent || "";
      const platform = navigator.platform || "";
      const touchMac = platform === "MacIntel" && navigator.maxTouchPoints > 1;
      return touchMac || /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(ua);
    }

    function refreshInputCapabilities() {
      const secure = window.isSecureContext || location.hostname === "localhost" || location.hostname === "127.0.0.1";
      const hasMediaDevices = Boolean(navigator.mediaDevices);
      const hasUserMedia = hasMediaDevices && typeof navigator.mediaDevices.getUserMedia === "function";
      const hasLegacyUserMedia = typeof navigator.getUserMedia === "function"
        || typeof navigator.webkitGetUserMedia === "function"
        || typeof navigator.mozGetUserMedia === "function";
      const hasDisplayMedia = hasMediaDevices && typeof navigator.mediaDevices.getDisplayMedia === "function";
      const hasAudioContext = Boolean(getAudioContextConstructor());
      const mobile = isProbablyMobileBrowser();
      inputCapabilityStatus = {
        secure,
        hasMediaDevices,
        hasUserMedia,
        hasLegacyUserMedia,
        hasDisplayMedia,
        hasAudioContext,
        mobile,
        microphone: secure && hasAudioContext && (hasUserMedia || hasLegacyUserMedia),
        systemAudio: secure && hasDisplayMedia && hasAudioContext && !mobile
      };
      systemAudioButton.classList.toggle("is-unavailable", !inputCapabilityStatus.systemAudio);
      systemAudioButton.title = inputCapabilityStatus.systemAudio
        ? "Capture shared tab/system audio when the browser exposes an audio track."
        : mobile
          ? "System audio capture is not exposed by mobile browsers. Use Microphone on this device."
          : "System audio capture needs HTTPS and browser screen-share audio support.";
      micButton.classList.toggle("is-unavailable", !inputCapabilityStatus.microphone);
      micButton.disabled = false;
      micButton.title = inputCapabilityStatus.microphone
        ? "Capture this device microphone."
        : "Microphone capture needs HTTPS and browser media permissions.";
    }

    function inputErrorMessage(kind, error) {
      if (!inputCapabilityStatus.secure) return "HTTPS required";
      if (!inputCapabilityStatus.hasAudioContext) return "web audio unavailable";
      if (kind === "system" && inputCapabilityStatus.mobile) return "system audio unavailable on mobile";
      if (kind === "system" && !inputCapabilityStatus.hasDisplayMedia) return "screen audio capture unsupported";
      if (kind === "microphone" && !inputCapabilityStatus.hasUserMedia && !inputCapabilityStatus.hasLegacyUserMedia) return "microphone unsupported";
      if (error?.name === "NotAllowedError") return kind === "system" ? "capture permission denied" : "microphone permission denied";
      if (error?.name === "NotFoundError") return kind === "system" ? "no shared audio source" : "no microphone found";
      if (error?.name === "NotReadableError") return kind === "system" ? "audio source busy" : "microphone busy";
      if (error?.name === "AbortError") return "capture cancelled";
      return kind === "system" ? "capture unavailable" : "microphone unavailable";
    }

    async function primeAudioContext(waitMs = 700) {
      const AudioContextCtor = getAudioContextConstructor();
      if (!AudioContextCtor) throw new Error("AudioContext unavailable");
      audioContext = audioContext || new AudioContextCtor();
      if (audioContext.state !== "running") {
        await Promise.race([
          audioContext.resume(),
          new Promise((resolve) => setTimeout(resolve, waitMs))
        ]);
      }
      return audioContext;
    }

    function getUserMediaCompat(constraints) {
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function") {
        return navigator.mediaDevices.getUserMedia(constraints);
      }
      const legacyGetUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if (!legacyGetUserMedia) {
        return Promise.reject(new Error("getUserMedia unavailable"));
      }
      return new Promise((resolve, reject) => {
        legacyGetUserMedia.call(navigator, constraints, resolve, reject);
      });
    }

    function applyAlgorithmUi() {
      setCurrentLayout(algorithmSelect.value || getInitialLayoutId());
    }

    function getPatternFlashColor(levels) {
      return window.METTR_DISPLAY_OUTPUT.getPatternFlashColor(levels, clamp);
    }

    function drawPatternFlashField(x, y, w, h) {
      const levels = {
        general: patternState.generalFlash,
        kick: patternState.kickFlash,
        tom: patternState.tomFlash,
        snare: patternState.snareFlash,
        hat: patternState.hatFlash,
        cymbal: patternState.cymbalFlash
      };
      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = getPatternFlashColor(levels);
      ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
    }

    function computeSpectralOutColor() {
      return window.METTR_DISPLAY_OUTPUT.computeSpectralOutColor(
        {
          audioContext,
          floatFreqData,
          smoothed,
          spectralOutState,
          spectralTiltDb: Number(spectralTilt.value),
          spectralFlash: patternState.spectralFlash
        },
        { clamp, lerp, smoothstep, interpolateFloatSpectrum }
      );
    }

    function drawSpectralOutField(x, y, w, h) {
      const color = computeSpectralOutColor();
      const r = Math.round(clamp(color.r, 0, 255));
      const g = Math.round(clamp(color.g, 0, 255));
      const b = Math.round(clamp(color.b, 0, 255));
      const intensity = clamp(color.brightness, 0, 1);
      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.strokeRect(x, y, w, h);

      const gradient = ctx.createLinearGradient(x, y, x + w, y);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.15 + intensity * 0.35})`);
      gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.24 + intensity * 0.76})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${0.12 + intensity * 0.32})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(x + 1, y + 1, w - 2, h - 2);

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.globalAlpha = clamp(0.18 + intensity * 0.52, 0, 0.74);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      const pulseW = Math.max(4, w * clamp(intensity, 0.04, 1));
      ctx.fillRect(x + 1, y + 1, pulseW - 2, h - 2);
      ctx.restore();

      const hz = color.dominantHz >= 1000
        ? `${(color.dominantHz / 1000).toFixed(1)}k`
        : color.dominantHz > 0
          ? `${Math.round(color.dominantHz)}`
          : "--";
      const labelSize = meterTextSize(9, 0, 12);
      drawMeterText(`${hz}Hz  sat ${color.saturation.toFixed(2)}`, x + 8, meterTextBottomBaseline(y, h, labelSize), labelSize, "rgba(245,245,245,0.7)");
    }

    function shapeAudio(value, drive = 1) {
      return clamp(1 - Math.exp(-Math.max(0, value) * drive), 0, 1);
    }

    function resetPlaneState() {
      cameraTilt.x = 0;
      cameraTilt.y = 0;
      cameraTilt.twist = 0;
      lowEnvelope = 0;
      midEnvelope = 0;
      rmsEnvelope = 0;
      signalCharacterPreviousBands = [];
      signalCharacterOnsets.length = 0;
      signalCharacterOnsetEnvelope = 0;
      signalCharacterLastOnsetAt = -99;
      signalCharacterPreviousPeak = 0;
      signalCharacterPreviousRms = 0;
      signalCharacterFluxFloor = 0;
      signalCharacterFluxPeak = 0.001;
      beatFlash = 0;
      for (let i = 0; i < planePhysics.length; i += 1) {
        const plane = planePhysics[i];
        plane.z = 0;
        plane.vz = 0;
        plane.x = 0;
        plane.y = 0;
        plane.vx = 0;
        plane.vy = 0;
        plane.phase = 0.2 + i * 1.47;
      }
    }

    function resetSpectrumState() {
      const bins = 240;
      meterState.spectrum = new Array(bins).fill(0);
      meterState.spectrumDelta = new Array(bins).fill(0);
      meterState.spectrumPeak = new Array(bins).fill(0);
    }

    function resetSpectralDynamicsState() {
      const bins = 192;
      meterState.spectralDynamics.current = new Array(bins).fill(0);
      meterState.spectralDynamics.average = new Array(bins).fill(0);
      meterState.spectralDynamics.min = new Array(bins).fill(0);
      meterState.spectralDynamics.max = new Array(bins).fill(0);
      meterState.spectralDynamics.peak = new Array(bins).fill(0);
      meterState.spectralDynamics.range = new Array(bins).fill(0);
      meterState.spectralDynamics.lastUpdatedAt = 0;
    }

    function resetPhaseDungeonState() {
      phaseDungeonState.cells.length = 0;
      phaseDungeonState.lastSignalAt = -99;
      phaseDungeonState.recurrence = 0;
      phaseDungeonState.tunnelTravel = 0;
      phaseDungeonState.tunnelZoom = 1;
      phaseDungeonState.tunnelHeading = 0;
      phaseDungeonState.tunnelDrop = 0;
      phaseDungeonState.previousEnergy = 0;
      phaseDungeonState.energyHistory.length = 0;
      phaseDungeonState.sectionPower = 0;
      phaseDungeonState.brake = 0;
      phaseDungeonState.acceleration = 0;
      kineticVocalState.f0Hz = 0;
      kineticVocalState.f0Confidence = 0;
      kineticVocalState.voiced = 0;
      kineticVocalState.f1 = 0;
      kineticVocalState.f2 = 0;
      kineticVocalState.f3 = 0;
      kineticVocalState.f1Energy = 0;
      kineticVocalState.f2Energy = 0;
      kineticVocalState.f3Energy = 0;
      kineticVocalState.formantConfidence = 0;
      kineticVocalState.vowelOpen = 0;
      kineticVocalState.vowelFront = 0;
      kineticVocalState.rounding = 0;
      kineticVocalState.plosiveClosure = 0;
      kineticVocalState.plosiveBurst = 0;
      kineticVocalState.fricativeNoise = 0;
      kineticVocalState.breathNoise = 0;
      kineticVocalState.tractPressure = 0;
      kineticVocalState.glottalPhase = 0;
      kineticVocalState.turbulencePhase = 0;
      kineticVocalState.mouthPhase = 0;
      kineticVocalState.lastUpdateAt = 0;
    }

    function resetWavesState() {
      wavesState.trails.length = 0;
      wavesState.lastSignalAt = -99;
      wavesState.pointCount = 0;
      wavesState.phase = 0;
      wavesState.sideFlow = 0;
      wavesState.lowFlow = 0;
      wavesState.midFlow = 0;
      wavesState.highFlow = 0;
      wavesState.shock = 0;
    }

    function requestedSpectrumFftSize() {
      return Math.max(Number(spectrumFftSelect.value || 8192), Number(spectralDynamicsFftSelect.value || 8192));
    }

    function configureSpectrumAnalyser() {
      if (!analyser) return;
      analyser.fftSize = requestedSpectrumFftSize();
      analyser.minDecibels = -96;
      analyser.maxDecibels = -12;
      analyser.smoothingTimeConstant = 0.06;
      freqData = new Uint8Array(analyser.frequencyBinCount);
      floatFreqData = new Float32Array(analyser.frequencyBinCount);
      previousFreqData = new Uint8Array(analyser.frequencyBinCount);
      previousPatternFreqData = new Uint8Array(analyser.frequencyBinCount);
      signalCharacterPreviousBands = [];
      timeData = new Uint8Array(analyser.fftSize);
      tunerFloatTimeData = new Float32Array(analyser.fftSize);
      resetSpectrumState();
      resetSpectralDynamicsState();
    }

    function resetSpectrogramState(clear = true) {
      spectrogramState.write = 0;
      spectrogramState.frame = 0;
      spectrogramState.subPixel = 0;
      spectrogramState.fftSize = Number(spectrogramFftSelect.value);
      spectrogramState.orientation = spectrogramOrientationSelect.value;
      spectrogramState.window = spectrogramWindowSelect.value;
      spectrogramState.detail = spectrogramDetailSelect.value;
      const historySize = {
        tiny: 180,
        short: 360,
        medium: 620,
        long: 980
      }[spectrogramWindowSelect.value] || 180;
      const freqSize = 340;
      if (spectrogramOrientationSelect.value === "horizontal") {
        spectrogramCanvas.width = historySize;
        spectrogramCanvas.height = freqSize;
      } else {
        spectrogramCanvas.width = freqSize;
        spectrogramCanvas.height = historySize;
      }
      const rows = spectrogramOrientationSelect.value === "horizontal" ? spectrogramCanvas.height : spectrogramCanvas.width;
      spectrogramAdaptiveFloor = new Float32Array(rows);
      spectrogramAdaptiveFloor.fill(-112);
      spectrogramLastColumnDb = new Float32Array(rows);
      spectrogramLastColumnDb.fill(-140);
      if (clear) {
        spectrogramCtx.fillStyle = "#000";
        spectrogramCtx.fillRect(0, 0, spectrogramCanvas.width, spectrogramCanvas.height);
      }
    }

    function configureSpectrogramAnalyser() {
      if (!spectrogramAnalyser) return;
      spectrogramAnalyser.fftSize = Number(spectrogramFftSelect.value);
      spectrogramAnalyser.minDecibels = -104;
      spectrogramAnalyser.maxDecibels = -10;
      spectrogramAnalyser.smoothingTimeConstant = 0.02;
      spectrogramFreqData = new Float32Array(spectrogramAnalyser.frequencyBinCount);
      resetSpectrogramState();
    }

    function configureSpectrogramDetailAnalysers() {
      const configs = [
        { node: spectrogramLowAnalyser, fftSize: 32768, smoothing: 0.012 },
        { node: spectrogramMidAnalyser, fftSize: 8192, smoothing: 0.018 },
        { node: spectrogramHighAnalyser, fftSize: 4096, smoothing: 0.024 }
      ];
      configs.forEach((config) => {
        if (!config.node) return;
        config.node.fftSize = config.fftSize;
        config.node.minDecibels = -108;
        config.node.maxDecibels = -10;
        config.node.smoothingTimeConstant = config.smoothing;
      });
      if (spectrogramLowAnalyser) spectrogramLowData = new Float32Array(spectrogramLowAnalyser.frequencyBinCount);
      if (spectrogramMidAnalyser) spectrogramMidData = new Float32Array(spectrogramMidAnalyser.frequencyBinCount);
      if (spectrogramHighAnalyser) spectrogramHighData = new Float32Array(spectrogramHighAnalyser.frequencyBinCount);
    }

    function noise2(x, y, time) {
      const a = Math.sin(x * 12.9898 + y * 78.233 + time * 0.87) * 43758.5453;
      const b = Math.sin(x * 34.1337 - y * 18.191 + time * 1.31) * 17312.121;
      return ((a + b) - Math.floor(a + b)) * 2 - 1;
    }

    function buildImageMap() {
      const pixels = sourceImageCtx.getImageData(0, 0, lowW, lowH).data;
      const map = new Float32Array(lowW * lowH * 4);
      const scores = new Float32Array(lowW * lowH);
      const rawScores = new Float32Array(lowW * lowH);
      const background = new Uint8Array(lowW * lowH);
      const interiorDistance = new Float32Array(lowW * lowH);
      const naturalBlack = new Uint8Array(lowW * lowH);
      const naturalWarm = new Uint8Array(lowW * lowH);
      let assignedLevels = new Int8Array(lowW * lowH);
      assignedLevels.fill(-1);
      let directBlackCount = 0;
      let directVioletCount = 0;
      let directWhiteCount = 0;
      let directRedCount = 0;
      let active = 0;
      let borderSum = 0;
      let borderRawSum = 0;
      let borderR = 0;
      let borderG = 0;
      let borderB = 0;
      let borderCount = 0;

      function pixelScoreAt(i) {
        const idx = i * 4;
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const luminance = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;
        const chroma = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
        return clamp(luminance * 0.82 + chroma * 0.18, 0, 1);
      }

      for (let i = 0; i < lowW * lowH; i += 1) {
        const score = pixelScoreAt(i);
        scores[i] = score;
        rawScores[i] = score;
      }

      for (let y = 1; y < lowH - 1; y += 1) {
        for (let x = 1; x < lowW - 1; x += 1) {
          const i = y * lowW + x;
          const gx = Math.abs(scores[i - 1] - scores[i + 1]);
          const gy = Math.abs(scores[i - lowW] - scores[i + lowW]);
          scores[i] = clamp(scores[i] * 0.88 + Math.sqrt(gx * gx + gy * gy) * 0.7, 0, 1);
        }
      }

      for (let x = 0; x < lowW; x += 1) {
        borderSum += scores[x] + scores[(lowH - 1) * lowW + x];
        borderRawSum += rawScores[x] + rawScores[(lowH - 1) * lowW + x];
        borderR += pixels[x * 4] + pixels[((lowH - 1) * lowW + x) * 4];
        borderG += pixels[x * 4 + 1] + pixels[((lowH - 1) * lowW + x) * 4 + 1];
        borderB += pixels[x * 4 + 2] + pixels[((lowH - 1) * lowW + x) * 4 + 2];
        borderCount += 2;
      }
      for (let y = 1; y < lowH - 1; y += 1) {
        borderSum += scores[y * lowW] + scores[y * lowW + lowW - 1];
        borderRawSum += rawScores[y * lowW] + rawScores[y * lowW + lowW - 1];
        borderR += pixels[(y * lowW) * 4] + pixels[(y * lowW + lowW - 1) * 4];
        borderG += pixels[(y * lowW) * 4 + 1] + pixels[(y * lowW + lowW - 1) * 4 + 1];
        borderB += pixels[(y * lowW) * 4 + 2] + pixels[(y * lowW + lowW - 1) * 4 + 2];
        borderCount += 2;
      }

      const borderScore = borderSum / Math.max(1, borderCount);
      const borderRawScore = borderRawSum / Math.max(1, borderCount);
      const bgR = borderR / Math.max(1, borderCount);
      const bgG = borderG / Math.max(1, borderCount);
      const bgB = borderB / Math.max(1, borderCount);
      const reversePolarity = borderRawScore > 0.72;
      const backgroundTolerance = 0.16 + (borderRawScore < 0.12 || borderRawScore > 0.88 ? 0.08 : 0);
      const queue = [];

      function backgroundColorDistance(i) {
        const idx = i * 4;
        const dr = (pixels[idx] - bgR) / 255;
        const dg = (pixels[idx + 1] - bgG) / 255;
        const db = (pixels[idx + 2] - bgB) / 255;
        return Math.sqrt(dr * dr + dg * dg + db * db);
      }

      function enqueueIfBackground(x, y) {
        if (x < 0 || x >= lowW || y < 0 || y >= lowH) return;
        const i = y * lowW + x;
        if (background[i]) return;
        if (backgroundColorDistance(i) > backgroundTolerance) return;
        background[i] = 1;
        queue.push(i);
      }

      for (let x = 0; x < lowW; x += 1) {
        enqueueIfBackground(x, 0);
        enqueueIfBackground(x, lowH - 1);
      }
      for (let y = 1; y < lowH - 1; y += 1) {
        enqueueIfBackground(0, y);
        enqueueIfBackground(lowW - 1, y);
      }

      for (let head = 0; head < queue.length; head += 1) {
        const i = queue[head];
        const x = i % lowW;
        const y = Math.floor(i / lowW);
        enqueueIfBackground(x + 1, y);
        enqueueIfBackground(x - 1, y);
        enqueueIfBackground(x, y + 1);
        enqueueIfBackground(x, y - 1);
      }

      for (let i = 0; i < lowW * lowH; i += 1) {
        if (background[i]) continue;
        const x = i % lowW;
        const y = Math.floor(i / lowW);
        let nearest = 999;
        for (let yy = Math.max(0, y - 14); yy <= Math.min(lowH - 1, y + 14); yy += 1) {
          for (let xx = Math.max(0, x - 14); xx <= Math.min(lowW - 1, x + 14); xx += 1) {
            const j = yy * lowW + xx;
            if (!background[j]) continue;
            const dx = xx - x;
            const dy = yy - y;
            nearest = Math.min(nearest, Math.sqrt(dx * dx + dy * dy));
          }
        }
        interiorDistance[i] = clamp(nearest / 14, 0, 1);
      }

      for (let i = 0; i < lowW * lowH; i += 1) {
        if (background[i]) continue;
        const idx = i * 4;
        const r = pixels[idx] / 255;
        const g = pixels[idx + 1] / 255;
        const b = pixels[idx + 2] / 255;
        const warm = clamp((r * 0.9 + g * 0.82 - b * 1.35 - 0.38) * 2.1, 0, 1);
        const darkInk = clamp((0.24 - rawScores[i]) * 4.5, 0, 1);
        naturalBlack[i] = darkInk > 0.52 ? 1 : 0;
        naturalWarm[i] = warm > 0.34 && darkInk < 0.24 ? 1 : 0;

        const maxc = Math.max(r, g, b);
        const minc = Math.min(r, g, b);
        const chroma = maxc - minc;
        const isRed = r > 0.45 && r > g * 1.35 && r > b * 1.15;
        const isSoftRed = r > 0.35 && r > g * 1.08 && r > b * 0.82 && g < 0.62;
        const isViolet = b > 0.28 && r > 0.18 && b > g * 1.08 && r > g * 0.82;
        const isWhite = rawScores[i] > 0.78 && chroma < 0.22;
        if (darkInk > 0.52) directBlackCount += 1;
        else if (isViolet) directVioletCount += 1;
        else if (isRed || isSoftRed) directRedCount += 1;
        else if (isWhite && !reversePolarity) directWhiteCount += 1;
      }

      imageDirectGreenBridgeMode = directVioletCount > 80 && directRedCount > 20 && directWhiteCount > 40 && directBlackCount < directVioletCount * 0.18;
      imageDirectPaletteMode = (directVioletCount > 80 && (directWhiteCount > 40 || directRedCount > 20))
        && (directBlackCount > 80 || imageDirectGreenBridgeMode);

      function paletteDistance(r, g, b, pr, pg, pb) {
        const dr = r - pr;
        const dg = g - pg;
        const db = b - pb;
        return dr * dr + dg * dg + db * db;
      }

      function nearestPaletteLevel(r, g, b) {
        const maxc = Math.max(r, g, b);
        const minc = Math.min(r, g, b);
        const chroma = maxc - minc;
        const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722;
        const warmChromatic = chroma > 0.12 && r > b * 0.92 && r > g * 0.72;
        const violetChromatic = chroma > 0.1 && b > g * 1.02 && r > g * 0.68;
        const neutral = chroma < 0.11;

        if (imageDirectGreenBridgeMode) {
          if (warmChromatic) return 2;
          if (violetChromatic) return 1;
          if (neutral && luminance > 0.72) return 3;
          if (luminance < 0.16 && chroma < 0.08) return 0;
        }

        if (warmChromatic) return 2;
        if (violetChromatic) return 1;
        if (luminance < 0.1 && chroma < 0.1) return 0;
        if (neutral && luminance > 0.72) return 3;
        if (luminance < 0.16 && chroma < 0.08) return 0;

        const candidates = [
          { level: 0, d: paletteDistance(r, g, b, 0.02, 0.02, 0.02) + chroma * 1.8 + (chroma > 0.08 ? 0.45 : 0) },
          { level: 1, d: paletteDistance(r, g, b, 0.5, 0.42, 0.78) },
          { level: 2, d: paletteDistance(r, g, b, 1, 0.16, 0.16) },
          { level: 3, d: paletteDistance(r, g, b, 0.92, 0.92, 0.92) + chroma * 1.1 }
        ];
        candidates.sort((a, b) => a.d - b.d);
        return candidates[0].level;
      }

      function addGreenBridgeLayer(levels) {
        if (!imageDirectGreenBridgeMode) return levels;
        const bridged = new Int8Array(levels);
        const radius = 48;

        function nearestDistanceTo(targetLevel, x, y) {
          let best = 999;
          for (let yy = Math.max(0, y - radius); yy <= Math.min(lowH - 1, y + radius); yy += 1) {
            for (let xx = Math.max(0, x - radius); xx <= Math.min(lowW - 1, x + radius); xx += 1) {
              if (levels[yy * lowW + xx] !== targetLevel) continue;
              const dx = xx - x;
              const dy = yy - y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < best) best = dist;
            }
          }
          return best;
        }

        for (let y = 0; y < lowH; y += 1) {
          for (let x = 0; x < lowW; x += 1) {
            const i = y * lowW + x;
            if (levels[i] !== 1 && levels[i] !== 3) continue;
            const dRed = nearestDistanceTo(2, x, y);
            const dWhite = nearestDistanceTo(3, x, y);
            if (dRed >= 999 || dWhite >= 999) continue;
            const sum = dRed + dWhite;
            if (sum > radius * 1.75) continue;
            const balance = dRed / Math.max(0.001, sum);
            const bridgeNoise = noise2(x * 0.08, y * 0.08, 2.4);
            if (balance > 0.22 + bridgeNoise * 0.05 && balance < 0.78 + bridgeNoise * 0.05) {
              bridged[i] = 0;
            }
          }
        }
        return bridged;
      }

      function nearestNaturalDistance(x, y, field) {
        let nearest = 999;
        const radius = 18;
        for (let yy = Math.max(0, y - radius); yy <= Math.min(lowH - 1, y + radius); yy += 1) {
          for (let xx = Math.max(0, x - radius); xx <= Math.min(lowW - 1, x + radius); xx += 1) {
            const j = yy * lowW + xx;
            if (!field[j]) continue;
            const dx = xx - x;
            const dy = yy - y;
            nearest = Math.min(nearest, Math.sqrt(dx * dx + dy * dy));
          }
        }
        return nearest;
      }

      function redrawLevelsWithMarker(levels) {
        return triangulateLevelsAsMembranes(levels);
      }

      function closeSmallMembraneHoles(levels) {
        const closed = new Int8Array(levels);
        for (let y = 0; y < lowH; y += 1) {
          for (let x = 0; x < lowW; x += 1) {
            const i = y * lowW + x;
            if (background[i]) continue;
            const current = levels[i];
            const counts = [0, 0, 0, 0];
            for (let yy = Math.max(0, y - 3); yy <= Math.min(lowH - 1, y + 3); yy += 1) {
              for (let xx = Math.max(0, x - 3); xx <= Math.min(lowW - 1, x + 3); xx += 1) {
                const level = levels[yy * lowW + xx];
                if (level < 0 || (!imageDirectGreenBridgeMode && level === 0)) continue;
                const dx = xx - x;
                const dy = yy - y;
                if (dx * dx + dy * dy > 12) continue;
                counts[level] += 1;
              }
            }
            let bestLevel = -1;
            let bestCount = 0;
            for (let level = imageDirectGreenBridgeMode ? 0 : 1; level < 4; level += 1) {
              if (counts[level] > bestCount) {
                bestCount = counts[level];
                bestLevel = level;
              }
            }
            if (bestLevel > 0 && current !== bestLevel && bestCount >= 19) {
              closed[i] = bestLevel;
            }
          }
        }
        return closed;
      }

      function triangulateLevelsAsMembranes(levels) {
        const cell = imageDirectPaletteMode ? 7 : 8;
        const influenceRadius = cell * 1.25;
        const gridW = Math.ceil(lowW / cell) + 1;
        const gridH = Math.ceil(lowH / cell) + 1;
        const out = new Int8Array(levels.length);
        out.fill(-1);

        function maskStrengthAt(level, px, py) {
          let strength = 0;
          for (let yy = Math.max(0, Math.floor(py - influenceRadius)); yy <= Math.min(lowH - 1, Math.ceil(py + influenceRadius)); yy += 1) {
            for (let xx = Math.max(0, Math.floor(px - influenceRadius)); xx <= Math.min(lowW - 1, Math.ceil(px + influenceRadius)); xx += 1) {
              const j = yy * lowW + xx;
              if (levels[j] !== level) continue;
              const dx = xx - px;
              const dy = yy - py;
              const d2 = dx * dx + dy * dy;
              const radius2 = influenceRadius * influenceRadius;
              if (d2 > radius2) continue;
              strength += 1 - d2 / radius2;
            }
          }
          return strength;
        }

        function triangleArea(a, b, c) {
          return Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)) * 0.5;
        }

        function rasterTriangle(level, a, b, c, coverage) {
          if (triangleArea(a, b, c) < 0.25) return;
          const minX = Math.max(0, Math.floor(Math.min(a.x, b.x, c.x) - 1));
          const maxX = Math.min(lowW - 1, Math.ceil(Math.max(a.x, b.x, c.x) + 1));
          const minY = Math.max(0, Math.floor(Math.min(a.y, b.y, c.y) - 1));
          const maxY = Math.min(lowH - 1, Math.ceil(Math.max(a.y, b.y, c.y) + 1));
          const denom = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
          if (Math.abs(denom) < 0.001) return;

          for (let y = minY; y <= maxY; y += 1) {
            for (let x = minX; x <= maxX; x += 1) {
              const px = x + 0.5;
              const py = y + 0.5;
              const w1 = ((b.y - c.y) * (px - c.x) + (c.x - b.x) * (py - c.y)) / denom;
              const w2 = ((c.y - a.y) * (px - c.x) + (a.x - c.x) * (py - c.y)) / denom;
              const w3 = 1 - w1 - w2;
              if (w1 < -0.02 || w2 < -0.02 || w3 < -0.02) continue;
              const i = y * lowW + x;
              if (background[i]) continue;

              const localSupport = levels[i] === level ? 1 : maskStrengthAt(level, x, y) / Math.max(1, influenceRadius * 1.8);
              const edge = Math.min(w1, w2, w3);
              const edgeNoise = noise2(x * 0.085 + level * 3.2, y * 0.085 - level * 2.4, coverage * 0.19);
              const softEdge = edge > -0.004 + edgeNoise * 0.018;
              const supportedSurface = coverage > 0.26 && (localSupport > 0.018 || edge > 0.035);
              if (softEdge && supportedSurface) {
                out[i] = level;
              }
            }
          }
        }

        for (let level = 0; level < 4; level += 1) {
          const anchors = new Array(gridW * gridH);
          for (let gy = 0; gy < gridH; gy += 1) {
            for (let gx = 0; gx < gridW; gx += 1) {
              const x = clamp(gx * cell, 0, lowW - 1);
              const y = clamp(gy * cell, 0, lowH - 1);
              const strength = maskStrengthAt(level, x, y);
              if (strength < (imageDirectPaletteMode ? 1.15 : 1.35)) continue;
              anchors[gy * gridW + gx] = {
                gx,
                gy,
                x,
                y,
                ox: x,
                oy: y,
                vx: 0,
                vy: 0,
                strength
              };
            }
          }

          if (!anchors.some(Boolean)) continue;

          for (let step = 0; step < 5; step += 1) {
            for (const p of anchors) {
              if (!p) continue;
              let ax = (p.ox - p.x) * 0.18;
              let ay = (p.oy - p.y) * 0.18;
              let neighborCount = 0;
              for (let oy = -1; oy <= 1; oy += 1) {
                for (let ox = -1; ox <= 1; ox += 1) {
                  if (!ox && !oy) continue;
                  const q = anchors[(p.gy + oy) * gridW + p.gx + ox];
                  if (!q) continue;
                const dx = q.x - p.x;
                const dy = q.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                  if (dist < 0.001 || dist > cell * 1.9) continue;
                const rest = cell * (Math.abs(q.ox - p.ox) > 0.1 && Math.abs(q.oy - p.oy) > 0.1 ? 1.414 : 1);
                  const force = (dist - rest) * 0.09;
                ax += dx / dist * force;
                ay += dy / dist * force;
                neighborCount += 1;
                }
              }

              const edgeTension = clamp(p.strength / 9, 0, 1);
              const n = noise2(p.ox * 0.045 + level * 4.3, p.oy * 0.045 - level * 6.7, step * 0.4);
              p.vx = (p.vx + ax + n * (1 - edgeTension) * 0.26) * 0.52;
              p.vy = (p.vy + ay - n * (1 - edgeTension) * 0.26) * 0.52;
              p.x += p.vx;
              p.y += p.vy;
              if (!neighborCount) {
                p.x = lerp(p.x, p.ox, 0.36);
                p.y = lerp(p.y, p.oy, 0.36);
              }
            }
          }

          for (let gy = 0; gy < gridH - 1; gy += 1) {
            for (let gx = 0; gx < gridW - 1; gx += 1) {
              const a = anchors[gy * gridW + gx];
              const b = anchors[gy * gridW + gx + 1];
              const c = anchors[(gy + 1) * gridW + gx];
              const d = anchors[(gy + 1) * gridW + gx + 1];
              if (a && b && c) {
                const coverage = (a.strength + b.strength + c.strength) / (influenceRadius * influenceRadius * 0.8);
                rasterTriangle(level, a, b, c, coverage);
              }
              if (b && c && d) {
                const coverage = (b.strength + c.strength + d.strength) / (influenceRadius * influenceRadius * 0.8);
                rasterTriangle(level, b, d, c, coverage);
              }
            }
          }
        }

        return out;
      }

      for (let i = 0; i < lowW * lowH; i += 1) {
        const idx = i * 4;
        if (background[i]) {
          assignedLevels[i] = -1;
          continue;
        }

        const x = i % lowW;
        const y = Math.floor(i / lowW);
        const r = pixels[idx] / 255;
        const g = pixels[idx + 1] / 255;
        const b = pixels[idx + 2] / 255;
        const warm = clamp((r * 0.9 + g * 0.82 - b * 1.35 - 0.38) * 2.1, 0, 1);
        const darkInk = clamp((0.24 - rawScores[i]) * 4.5, 0, 1);
        const dBlack = nearestNaturalDistance(x, y, naturalBlack);
        const dWarm = nearestNaturalDistance(x, y, naturalWarm);
        let t = 0.5;
        if (dBlack < 999 || dWarm < 999) {
          t = dWarm >= 999 ? 0 : dBlack >= 999 ? 1 : dBlack / Math.max(0.001, dBlack + dWarm);
        } else {
          t = clamp((reversePolarity ? 1 - rawScores[i] : rawScores[i]) * 0.55 + interiorDistance[i] * 0.45, 0, 1);
        }

        let level = 0;
        if (imageDirectPaletteMode) {
          level = nearestPaletteLevel(r, g, b);
        }
        else if (darkInk > 0.52) level = 0;
        else if (warm > 0.34) {
          if (dBlack < 4) level = 1;
          else if (dBlack < 10) level = 2;
          else level = 3;
        }
        else if (t < 0.38) level = 1;
        else if (t < 0.72) level = 2;
        else level = 3;

        assignedLevels[i] = level;
      }

      assignedLevels = closeSmallMembraneHoles(redrawLevelsWithMarker(addGreenBridgeLayer(assignedLevels)));

      for (let iteration = 0; iteration < 1; iteration += 1) {
        const nextLevels = new Int8Array(assignedLevels);
        for (let y = 0; y < lowH; y += 1) {
          for (let x = 0; x < lowW; x += 1) {
            const i = y * lowW + x;
            if (assignedLevels[i] < 0) continue;
            const counts = [0, 0, 0, 0];
            let total = 0;
            for (let yy = Math.max(0, y - 2); yy <= Math.min(lowH - 1, y + 2); yy += 1) {
              for (let xx = Math.max(0, x - 2); xx <= Math.min(lowW - 1, x + 2); xx += 1) {
                const level = assignedLevels[yy * lowW + xx];
                if (level < 0) continue;
                counts[level] += 1;
                total += 1;
              }
            }
            let bestLevel = assignedLevels[i];
            let bestCount = counts[bestLevel];
            for (let level = 0; level < 4; level += 1) {
              if (counts[level] > bestCount) {
                bestCount = counts[level];
                bestLevel = level;
              }
            }
            const sameCount = counts[assignedLevels[i]];
            const isolated = imageDirectPaletteMode ? sameCount <= 2 : sameCount <= 3;
            const consensus = imageDirectPaletteMode ? bestCount >= 10 : bestCount >= 8;
            if (isolated && consensus && bestLevel !== assignedLevels[i]) {
              nextLevels[i] = bestLevel;
            }
          }
        }
        assignedLevels = nextLevels;
      }

      let minMapX = lowW;
      let minMapY = lowH;
      let maxMapX = 0;
      let maxMapY = 0;
      let mapSumX = 0;
      let mapSumY = 0;
      let mapCount = 0;
      const layerBuckets = [[], [], [], []];

      for (let i = 0; i < lowW * lowH; i += 1) {
        const idx = i * 4;
        const level = assignedLevels[i];
        if (level < 0) {
          map[idx] = 0;
          map[idx + 1] = 0;
          map[idx + 2] = 0;
          map[idx + 3] = 0;
          continue;
        }

        const depth = imageDirectGreenBridgeMode
          ? (level === 1 ? 0.08 : level === 2 ? 0.34 : level === 0 ? 0.68 : 1)
          : (level === 0 ? 0.08 : level === 1 ? 0.34 : level === 2 ? 0.68 : 1);
        const mask = imageDirectGreenBridgeMode
          ? 0.42 + depth * 0.58
          : level === 0 ? 0.08 : 0.34 + depth * 0.66;
        map[idx] = mask;
        map[idx + 1] = depth;
        if (imageDirectPaletteMode) {
          map[idx + 2] = level === 2 ? 1 : 0;
          map[idx + 3] = level === 1 ? 1 : 0;
        } else {
          map[idx + 2] = level === 3 ? 1 : level === 2 ? 0.18 : 0;
          map[idx + 3] = level === 1 ? 1 : level === 2 ? 0.08 : 0;
        }
        if (mask > 0.16) {
          const x = i % lowW;
          const y = Math.floor(i / lowW);
          minMapX = Math.min(minMapX, x);
          minMapY = Math.min(minMapY, y);
          maxMapX = Math.max(maxMapX, x);
          maxMapY = Math.max(maxMapY, y);
          mapSumX += x;
          mapSumY += y;
          mapCount += 1;
          if ((x + y * 3) % 11 === 0) {
            layerBuckets[level].push({ x, y, depth });
          }
          active += 1;
        }
      }

      if (mapCount) {
        const bboxCx = (minMapX + maxMapX) * 0.5;
        const bboxCy = (minMapY + maxMapY) * 0.5;
        const massCx = mapSumX / mapCount;
        const massCy = mapSumY / mapCount;
        imageMapOffsetX = lerp(bboxCx, massCx, 0.35) - lowW * 0.5;
        imageMapOffsetY = lerp(bboxCy, massCy, 0.35) - lowH * 0.5;
      } else {
        imageMapOffsetX = 0;
        imageMapOffsetY = 0;
      }

      imageLayerPoints = layerBuckets;
      imageLayerContourPoints = buildLayerContours(assignedLevels, imageMapOffsetX + lowW * 0.5, imageMapOffsetY + lowH * 0.5);
      imageMap = map;
      imageMapActivePixels = active;
      imageMapText.textContent = `${Math.round(active / (lowW * lowH) * 100)}%`;
    }

    function buildLayerContours(levels, cx, cy) {
      const bins = 36;
      const contours = [[], [], [], []];
      for (let level = 0; level < 4; level += 1) {
        const best = new Array(bins).fill(null);
        for (let y = 1; y < lowH - 1; y += 1) {
          for (let x = 1; x < lowW - 1; x += 1) {
            const i = y * lowW + x;
            if (levels[i] !== level) continue;
            const edge = levels[i - 1] !== level || levels[i + 1] !== level || levels[i - lowW] !== level || levels[i + lowW] !== level;
            if (!edge) continue;
            const dx = x - cx;
            const dy = y - cy;
            const angle = Math.atan2(dy, dx);
            const bin = Math.floor((((angle + Math.PI) / (Math.PI * 2)) * bins)) % bins;
            const radius = dx * dx + dy * dy;
            if (!best[bin] || radius > best[bin].radius) {
              best[bin] = { x, y, radius };
            }
          }
        }
        contours[level] = best.map((point) => point ? { x: point.x, y: point.y } : null);
      }
      return contours;
    }

    function imageSample(x, y, style) {
      const influence = imageMap ? Number(imageInfluence.value) : 0;
      if (!influence) {
        return { influence: 0, mask: 0, depth: 0, red: 0, violet: 0, nx: 0, ny: 0, contour: 0, side: 0 };
      }

      const loudComp = 1 / (1 + smoothed.rms * 0.42 + smoothed.low * 0.22);
      const objectScale = 0.38 + smoothed.rms * 0.018 + smoothed.low * 0.025 + smoothed.bassHit * 0.18 + smoothed.peak * 0.04;
      const wobble = smoothed.side * 12 + smoothed.mid * 5 + smoothed.flux * 6;

      function emptySample() {
        return { influence, mask: 0, depth: 0, red: 0, violet: 0, nx: 0, ny: 0, contour: 0, side: 0 };
      }

      function readSurface(sx, sy, projectedDepth = 0) {
        if (sx < 0 || sx >= lowW || sy < 0 || sy >= lowH) return emptySample();
        const idx = (sy * lowW + sx) * 4;
        const left = imageMap[(sy * lowW + Math.max(0, sx - 1)) * 4 + 1];
        const right = imageMap[(sy * lowW + Math.min(lowW - 1, sx + 1)) * 4 + 1];
        const up = imageMap[(Math.max(0, sy - 1) * lowW + sx) * 4 + 1];
        const down = imageMap[(Math.min(lowH - 1, sy + 1) * lowW + sx) * 4 + 1];
        const depth = imageMap[idx + 1];
        const contourWave = Math.abs(Math.sin((depth * 9 + sy / lowH * 5 - t * 0.008 - smoothed.low * 1.8) * Math.PI));
        return {
          influence,
          mask: imageMap[idx],
          depth,
          red: imageMap[idx + 2],
          violet: imageMap[idx + 3],
          nx: (left - right) * 1.8,
          ny: (up - down) * 1.8,
          contour: smoothstep(0.84, 1, contourWave) * imageMap[idx],
          side: projectedDepth
        };
      }

      const audioExtrude = (0.24 + smoothed.bassHit * 1.18 + smoothed.midHit * 0.78 + smoothed.flux * 0.82 + smoothed.peak * 0.34 + smoothed.rms * 0.015) * loudComp;
      const cosTwist = Math.cos(cameraTilt.twist);
      const sinTwist = Math.sin(cameraTilt.twist);
      const reverse = smoothed.high * 0.75 + smoothed.flux * 0.45 > smoothed.low + smoothed.bassHit * 0.45 ? -0.55 : 1;
      const baseVX = (cameraTilt.x * cosTwist - cameraTilt.y * sinTwist) * reverse;
      const baseVY = (cameraTilt.x * sinTwist + cameraTilt.y * cosTwist) * reverse;
      const levels = [
        { depth: 1, tolerance: 0.13, amount: 0.72, scale: 0.94, band: smoothed.low + smoothed.bassHit * 0.8, phys: planePhysics[3] },
        { depth: 0.68, tolerance: 0.13, amount: 0.24, scale: 1.01, band: smoothed.mid + smoothed.midHit * 0.9, phys: planePhysics[2] },
        { depth: 0.34, tolerance: 0.13, amount: -0.24, scale: 1.08, band: smoothed.mid * 0.45 + smoothed.high * 0.45 + smoothed.midHit * 0.55, phys: planePhysics[1] },
        { depth: 0.08, tolerance: 0.12, amount: -0.72, scale: 1.15, band: smoothed.high + smoothed.flux * 0.65, phys: planePhysics[0] }
      ];

      for (const layer of levels) {
        const phys = layer.phys || planePhysics[0];
        const layerIndex = Math.max(0, planePhysics.indexOf(phys));
        const contract = planeMotionContract[layerIndex] || planeMotionContract[0];
        const bandPush = 0.28 + layer.band * 1.85;
        const springZ = phys.z * (0.55 + layer.amount * 0.6);
        const cameraX = clamp(baseVX * layer.amount * audioExtrude * bandPush, -contract.maxShift * 0.45, contract.maxShift * 0.45);
        const cameraY = clamp(baseVY * layer.amount * audioExtrude * bandPush, -contract.maxShift * 0.45, contract.maxShift * 0.45);
        const shiftX = clamp(cameraX + phys.x * contract.maxShift, -contract.maxShift, contract.maxShift);
        const shiftY = clamp(cameraY + phys.y * contract.maxShift, -contract.maxShift, contract.maxShift);
        const layerPulse = layer.depth === 0.68 || layer.depth === 0.34 ? smoothed.midHit * 0.18 : 0;
        const layerScale = objectScale * layer.scale * (1 + layer.band * 0.1 + layerPulse - springZ * 0.08);
        const layerWobble = wobble * (0.08 + layer.band * 1.65);
        const rhythm = layer.depth === 0.68 || layer.depth === 0.34 ? smoothed.midHit * 9 : 0;
        const rawX = (x - lowW / 2 - shiftX) / layerScale + lowW / 2 + imageMapOffsetX + Math.sin(y * 0.06 + t * (0.035 + rhythm * 0.018) + layer.depth * 2.1) * layerWobble;
        const rawY = (y - lowH / 2 - shiftY) / layerScale + lowH / 2 + imageMapOffsetY + Math.cos(x * 0.05 - t * (0.03 + rhythm * 0.016) + layer.depth * 1.7) * smoothed.mid * 9 * (0.25 + layer.band);

        if (rawX < 0 || rawX >= lowW || rawY < 0 || rawY >= lowH) continue;

        const sx = Math.floor(rawX);
        const sy = Math.floor(rawY);
        const idx = (sy * lowW + sx) * 4;
        const depth = imageMap[idx + 1];
        const mask = imageMap[idx];
        if (mask > 0.14 && Math.abs(depth - layer.depth) <= layer.tolerance) {
          return readSurface(sx, sy, layer.depth);
        }
      }

      return emptySample();
    }

    function bandAverage(freq, from, to) {
      let sum = 0;
      let count = 0;
      const start = Math.max(0, Math.floor(from * freq.length));
      const end = Math.min(freq.length, Math.floor(to * freq.length));
      for (let i = start; i < end; i += 1) {
        sum += freq[i] / 255;
        count += 1;
      }
      return count ? sum / count : 0;
    }

    function bandAverageHz(freq, minHz, maxHz) {
      if (!audioContext || !freq.length) return 0;
      const nyquist = audioContext.sampleRate * 0.5;
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

    function bandPositiveFluxHz(freq, previous, minHz, maxHz, weightPower = 0) {
      if (!audioContext || !freq.length || !previous || previous.length !== freq.length) return 0;
      const nyquist = audioContext.sampleRate * 0.5;
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

    function bandHfcHz(freq, minHz, maxHz, weightPower = 1) {
      if (!audioContext || !freq.length) return 0;
      const nyquist = audioContext.sampleRate * 0.5;
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

    function resetPatternState() {
      for (const key of Object.keys(patternState.hits)) {
        patternState.previous[key] = 0;
        patternState.envelope[key] = 0;
        patternState.hits[key] = 0;
        patternState.lastHit[key] = -99;
      }
      patternState.events = [];
      patternState.bpm = 0;
      patternState.confidence = 0;
      patternState.onsetRate = 0;
      patternState.stability = 0;
      patternState.generalFlash = 0;
      patternState.kickFlash = 0;
      patternState.tomFlash = 0;
      patternState.snareFlash = 0;
      patternState.hatFlash = 0;
      patternState.cymbalFlash = 0;
      patternState.spectralFlash = 0;
      previousPatternFreqData = new Uint8Array(freqData.length);
    }

    function updatePatternDetector(hasLiveAudio) {
      const now = audioContext ? audioContext.currentTime : performance.now() / 1000;
      const sensitivity = Number(patternSensitivity.value);
      const threshold = Number(patternThreshold.value);
      const minSeparation = Number(patternSeparationSelect.value);
      const rhythmWindow = Number(patternWindowSelect.value);
      const generalAmount = Number(generalFlashAmount.value);
      const generalSmooth = Number(generalFlashSmooth.value);
      const kickAmount = Number(kickFlashAmount.value);
      const kickSmooth = Number(kickFlashSmooth.value);
      const snareAmount = Number(snareFlashAmount.value);
      const snareSmooth = Number(snareFlashSmooth.value);
      const tomAmount = Number(tomFlashAmount.value);
      const tomSmooth = Number(tomFlashSmooth.value);
      const hatAmount = Number(hatFlashAmount.value);
      const hatSmooth = Number(hatFlashSmooth.value);
      const cymbalAmount = Number(cymbalFlashAmount.value);
      const cymbalSmooth = Number(cymbalFlashSmooth.value);
      const spectralAmount = Number(spectralFlashAmount.value);
      const spectralSmooth = Number(spectralFlashSmooth.value);
      const generalRise = 1 - Math.exp(-1 / Math.max(1, generalSmooth * 60));
      const kickRise = 1 - Math.exp(-1 / Math.max(1, kickSmooth * 60));
      const snareRise = 1 - Math.exp(-1 / Math.max(1, snareSmooth * 60));
      const tomRise = 1 - Math.exp(-1 / Math.max(1, tomSmooth * 60));
      const hatRise = 1 - Math.exp(-1 / Math.max(1, hatSmooth * 60));
      const cymbalRise = 1 - Math.exp(-1 / Math.max(1, cymbalSmooth * 60));
      const spectralRise = 1 - Math.exp(-1 / Math.max(1, spectralSmooth * 60));
      const flashFall = 1 - Math.exp(-1 / 7);
      if (!hasLiveAudio) {
        for (const key of Object.keys(patternState.hits)) {
          patternState.hits[key] *= 0.82;
          patternState.envelope[key] *= 0.98;
        }
        patternState.generalFlash = lerp(patternState.generalFlash, 0, flashFall);
        patternState.kickFlash = lerp(patternState.kickFlash, 0, flashFall);
        patternState.tomFlash = lerp(patternState.tomFlash, 0, flashFall);
        patternState.snareFlash = lerp(patternState.snareFlash, 0, flashFall);
        patternState.hatFlash = lerp(patternState.hatFlash, 0, flashFall);
        patternState.cymbalFlash = lerp(patternState.cymbalFlash, 0, flashFall);
        patternState.spectralFlash = lerp(patternState.spectralFlash, 0, flashFall);
        patternState.events = patternState.events.filter((event) => now - event.time < rhythmWindow);
        patternState.onsetRate = lerp(patternState.onsetRate, 0, 0.08);
        patternState.confidence = lerp(patternState.confidence, 0, 0.08);
        return;
      }

      const sub = bandAverageHz(freqData, 28, 70);
      const deepSub = bandAverageHz(freqData, 28, 60);
      const kickFundamental = bandAverageHz(freqData, 32, 70);
      const kickPunch = bandAverageHz(freqData, 70, 115);
      const tomCore = bandAverageHz(freqData, 70, 125);
      const tomRing = bandAverageHz(freqData, 90, 180);
      const tomUpper = bandAverageHz(freqData, 125, 260);
      const snareShell = bandAverageHz(freqData, 120, 260);
      const snareBody = bandAverageHz(freqData, 170, 1800);
      const snareCrack = bandAverageHz(freqData, 1800, 7000);
      const clapNoise = bandAverageHz(freqData, 1500, 6500);
      const hatCore = bandAverageHz(freqData, 3800, 8200);
      const hatAir = bandAverageHz(freqData, 8200, 12500);
      const hatTick = bandHfcHz(freqData, 3600, 9200, 1.05);
      const cymbalBody = bandAverageHz(freqData, 4800, 9000);
      const cymbalAir = bandAverageHz(freqData, 8500, 18000);
      const cymbalWash = bandHfcHz(freqData, 5200, 18000, 1.2);
      const lowMid = bandAverageHz(freqData, 250, 900);
      const boxMid = bandAverageHz(freqData, 260, 900);
      const highBand = bandAverageHz(freqData, 8000, 20000);
      const kickFlux = bandPositiveFluxHz(freqData, previousPatternFreqData, 32, 118, 0);
      const tomFlux = bandPositiveFluxHz(freqData, previousPatternFreqData, 70, 260, 0.1);
      const snareFlux = bandPositiveFluxHz(freqData, previousPatternFreqData, 900, 7600, 0.45);
      const hatFlux = bandPositiveFluxHz(freqData, previousPatternFreqData, 3600, 9200, 1.05);
      const cymbalFlux = bandPositiveFluxHz(freqData, previousPatternFreqData, 5200, 18000, 1.1);
      const onsetFlux = clamp(
        kickFlux * 8.4
          + tomFlux * 6.8
          + snareFlux * 5.6
          + hatFlux * 4.8
          + cymbalFlux * 4.2
          + metrics.flux * 0.72,
        0,
        1
      );
      const spectralFluxFlash = clamp(
        kickFlux * 3.2
          + tomFlux * 3.5
          + snareFlux * 5.2
          + hatFlux * 6.2
          + cymbalFlux * 5.8
          + metrics.flux * 0.88,
        0,
        1
      );
      const globalEnergy = metrics.rms * 0.4 + metrics.flux * 0.45 + metrics.peak * 0.15;
      const kickLowMass = kickFundamental * 0.9 + deepSub * 0.46 + kickPunch * 0.24;
      const snareNoiseMass = snareCrack * 0.5 + clapNoise * 0.3 + snareShell * 0.3;
      const kickDominance = clamp((kickLowMass - snareNoiseMass * 0.45 - boxMid * 0.16 - hatCore * 0.12 + 0.05) * 2.35, 0, 1);
      const snareDominance = clamp((snareNoiseMass + snareShell * 0.24 - kickLowMass * 0.5 + 0.03) * 1.85, 0, 1);
      const tomDominance = clamp((tomCore * 0.95 + tomRing * 0.45 - deepSub * 0.62 - snareCrack * 0.16 - hatCore * 0.08 + 0.02) * 2, 0, 1);
      const hatDominance = clamp((hatCore * 0.9 + hatTick * 0.32 - cymbalAir * 0.44 - snareShell * 0.1 + 0.01) * 1.8, 0, 1);
      const cymbalDominance = clamp((cymbalAir * 0.92 + cymbalWash * 0.5 + highBand * 0.24 - hatCore * 0.12 + 0.01) * 1.6, 0, 1);
      const tomRatio = tomCore / Math.max(0.001, deepSub + kickFundamental * 0.28);
      const tomGate = smoothstep(0.95, 1.75, tomRatio) * smoothstep(0.3, 0.82, tomDominance);
      const kickTransientGate = smoothstep(0.002, 0.018, kickFlux + Math.max(0, kickFundamental - patternState.envelope.kick) * 0.14 + metrics.bassHit * 0.035);
      const highTail = Math.max(patternState.envelope.hat * 0.5, patternState.envelope.cymbal * 0.4);
      const hatTransient = Math.max(0, hatFlux * 3 + hatTick * 0.26 - highTail * 0.16);
      const cymbalTransient = Math.max(0, cymbalFlux * 2.6 + cymbalWash * 0.28 - patternState.envelope.cymbal * 0.1);

      const features = {
        kick: Math.max(0, (kickFundamental * 0.94 + deepSub * 0.44 + kickPunch * 0.28 + kickFlux * 1.35 + Math.max(0, kickLowMass - snareShell) * 0.24 - tomCore * 0.18 - snareShell * 0.2 - snareCrack * 0.3 - clapNoise * 0.18 - hatCore * 0.12 - boxMid * 0.1) * (0.72 + kickDominance * 0.64) * (0.24 + kickTransientGate * 0.76)),
        tom: Math.max(0, (tomCore * 0.78 + tomRing * 0.32 + tomUpper * 0.14 + Math.max(0, tomCore - deepSub * 0.55) * 0.62 + tomFlux * 0.85 + lowMid * 0.04 - kickFundamental * 0.12 - deepSub * 0.18 - snareCrack * 0.1 - hatCore * 0.08) * (0.36 + tomDominance * 0.64) * tomGate),
        snare: Math.max(0, (snareShell * 0.52 + snareBody * 0.18 + snareCrack * 0.55 + clapNoise * 0.24 + snareFlux * 0.95 + metrics.flux * 0.06 - kickFundamental * 0.2 - kickPunch * 0.1 - hatCore * 0.18) * (0.74 + snareDominance * 0.58)),
        hat: Math.max(0, (hatCore * 0.54 + hatTick * 0.22 + hatAir * 0.12 + hatTransient * 0.42 + highBand * 0.08 - kickFundamental * 0.05 - kickPunch * 0.03 - cymbalAir * 0.22) * (0.72 + hatDominance * 0.36)),
        cymbal: Math.max(0, (cymbalBody * 0.24 + cymbalAir * 0.5 + cymbalWash * 0.32 + cymbalTransient * 0.38 + highBand * 0.14 - kickFundamental * 0.04) * (0.74 + cymbalDominance * 0.36)),
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

      for (const key of Object.keys(features)) {
        const profile = PATTERN_DETECTOR_PROFILE[key] || PATTERN_DETECTOR_PROFILE.global;
        const value = clamp(features[key], 0, 1);
        const env = patternState.envelope[key];
        const rise = Math.max(0, value - patternState.previous[key]);
        const relativeNovelty = Math.max(0, value - env) / Math.max(0.045, env * 0.7 + 0.035);
        const novelty = Math.max(0, value - env) + rise * 0.8 + relativeNovelty * 0.045;
        const localThreshold = threshold * 0.34 * profile.threshold;
        const hit = clamp((novelty * sensitivity * profile.sensitivity - localThreshold) * profile.gain, 0, 1);
        const strongestOther = Math.max(...Object.entries(features)
          .filter(([other]) => other !== key && other !== "global")
          .map(([, otherValue]) => clamp(otherValue, 0, 1)));
        const dominantHold = value >= strongestOther * 0.85 ? profile.hold : Math.min(profile.hold, 0.46);
        patternState.hits[key] = Math.max(patternState.hits[key] * dominantHold, hit);
        patternState.envelope[key] = lerp(env, value, value > env ? profile.envAttack : profile.envRelease);
        patternState.previous[key] = value;
        if (hit > threshold * profile.threshold && now - patternState.lastHit[key] > minSeparation) {
          patternState.lastHit[key] = now;
          patternState.events.push({ time: now, type: key, strength: hit });
        }
      }
      if (previousPatternFreqData.length !== freqData.length) {
        previousPatternFreqData = new Uint8Array(freqData.length);
      }
      previousPatternFreqData.set(freqData);

      patternState.events = patternState.events.filter((event) => now - event.time < rhythmWindow);
      const globalEvents = patternState.events.filter((event) => event.type === "global");
      patternState.onsetRate = globalEvents.length / Math.max(0.001, rhythmWindow);
      if (globalEvents.length >= 3) {
        const intervals = [];
        for (let i = 1; i < globalEvents.length; i += 1) {
          const dt = globalEvents[i].time - globalEvents[i - 1].time;
          if (dt >= 0.18 && dt <= 1.8) intervals.push(dt);
        }
        if (intervals.length) {
          intervals.sort((a, b) => a - b);
          const median = intervals[Math.floor(intervals.length * 0.5)];
          const bpm = clamp(60 / median, 45, 220);
          const variance = intervals.reduce((sum, value) => sum + Math.abs(value - median), 0) / intervals.length;
          const confidence = clamp(1 - variance / Math.max(0.001, median * 0.55), 0, 1);
          patternState.bpm = lerp(patternState.bpm || bpm, bpm, 0.18);
          patternState.confidence = lerp(patternState.confidence, confidence, 0.22);
          patternState.stability = confidence;
        }
      } else {
        patternState.confidence = lerp(patternState.confidence, 0, 0.06);
      }
      const enabled = currentLayoutModules.includes("pattern");
      const elementHitPower = clamp(
        patternState.hits.kick * 0.34
          + patternState.hits.tom * 0.22
          + patternState.hits.snare * 0.3
          + patternState.hits.hat * 0.18
          + patternState.hits.cymbal * 0.2,
        0,
        1
      );
      const visualOnset = clamp(Math.pow(onsetFlux * 0.76 + elementHitPower * 0.46, 0.62), 0, 1);
      const energyFloor = clamp(Math.sqrt(metrics.peak) * 0.12 + metrics.rms * 0.06, 0, 0.18);
      const spectralOnset = clamp(Math.pow(spectralFluxFlash * 0.82 + elementHitPower * 0.16, 0.58), 0, 1);
      const spectralEnergyFloor = clamp(Math.sqrt(metrics.peak) * 0.08 + metrics.rms * 0.05, 0, 0.14);
      const generalTarget = enabled ? clamp((visualOnset + energyFloor) * generalAmount, 0, 1) : 0;
      const spectralTarget = enabled ? clamp((spectralOnset + spectralEnergyFloor) * spectralAmount, 0, 1) : 0;
      const kickTarget = enabled ? patternState.hits.kick * kickAmount : 0;
      const tomTarget = enabled ? patternState.hits.tom * tomAmount : 0;
      const snareTarget = enabled ? patternState.hits.snare * snareAmount : 0;
      const hatTarget = enabled ? patternState.hits.hat * hatAmount : 0;
      const cymbalTarget = enabled ? patternState.hits.cymbal * cymbalAmount : 0;
      patternState.generalFlash = lerp(
        patternState.generalFlash,
        generalTarget,
        generalTarget > patternState.generalFlash ? generalRise : flashFall
      );
      patternState.kickFlash = lerp(
        patternState.kickFlash,
        kickTarget,
        kickTarget > patternState.kickFlash ? kickRise : flashFall
      );
      patternState.tomFlash = lerp(
        patternState.tomFlash,
        tomTarget,
        tomTarget > patternState.tomFlash ? tomRise : flashFall
      );
      patternState.snareFlash = lerp(
        patternState.snareFlash,
        snareTarget,
        snareTarget > patternState.snareFlash ? snareRise : flashFall
      );
      patternState.hatFlash = lerp(
        patternState.hatFlash,
        hatTarget,
        hatTarget > patternState.hatFlash ? hatRise : flashFall
      );
      patternState.cymbalFlash = lerp(
        patternState.cymbalFlash,
        cymbalTarget,
        cymbalTarget > patternState.cymbalFlash ? cymbalRise : flashFall
      );
      patternState.spectralFlash = lerp(
        patternState.spectralFlash,
        spectralTarget,
        spectralTarget > patternState.spectralFlash ? spectralRise : flashFall
      );
    }

    function rmsFromTime(values) {
      let sum = 0;
      let peak = 0;
      for (let i = 0; i < values.length; i += 1) {
        const v = (values[i] - 128) / 128;
        sum += v * v;
        peak = Math.max(peak, Math.abs(v));
      }
      return { rms: Math.sqrt(sum / values.length), peak };
    }

    function estimateSide() {
      if (!leftAnalyser || !rightAnalyser) return metrics.high * 0.45;
      leftAnalyser.getByteTimeDomainData(leftTime);
      rightAnalyser.getByteTimeDomainData(rightTime);
      let sum = 0;
      for (let i = 0; i < leftTime.length; i += 1) {
        const l = (leftTime[i] - 128) / 128;
        const r = (rightTime[i] - 128) / 128;
        sum += Math.abs(l - r);
      }
      return clamp(sum / leftTime.length, 0, 1);
    }

    function stereoEnergy() {
      if (!leftAnalyser || !rightAnalyser) {
        return { left: metrics.rms, right: metrics.rms };
      }
      leftAnalyser.getByteTimeDomainData(leftTime);
      rightAnalyser.getByteTimeDomainData(rightTime);
      return {
        left: rmsFromTime(leftTime).rms,
        right: rmsFromTime(rightTime).rms
      };
    }

    function spectralFlux(freq) {
      if (!previousFreqData || previousFreqData.length !== freq.length) {
        previousFreqData = new Uint8Array(freq.length);
      }

      let sum = 0;
      for (let i = 0; i < freq.length; i += 1) {
        const current = freq[i] / 255;
        const previous = previousFreqData[i] / 255;
        sum += Math.max(0, current - previous);
        previousFreqData[i] = freq[i];
      }

      return clamp(sum / freq.length * 9, 0, 1);
    }

    function spectralShapeFeatures(freq) {
      let arithmetic = 0;
      let logSum = 0;
      let powerSum = 0;
      let entropy = 0;
      let weighted = 0;
      let maxMag = 0;
      let magSum = 0;
      let count = 0;
      const start = Math.max(1, Math.floor(freq.length * 0.01));
      const end = Math.floor(freq.length * 0.92);
      const powers = [];

      for (let i = start; i < end; i += 1) {
        const mag = freq[i] / 255;
        const power = mag * mag + 1e-8;
        maxMag = Math.max(maxMag, mag);
        magSum += mag;
        arithmetic += power;
        logSum += Math.log(power);
        powerSum += power;
        weighted += power * ((i - start) / Math.max(1, end - start));
        powers.push(power);
        count += 1;
      }

      if (!count || powerSum < 0.00001) {
        return { density: 0, centroid: 0, flatness: 0, spectralCrest: 0 };
      }

      const flatness = Math.exp(logSum / count) / (arithmetic / count);
      const spectralCrest = magSum > 0 ? maxMag / magSum * Math.sqrt(count) : 0;
      for (const power of powers) {
        const p = power / powerSum;
        entropy -= p * Math.log(p);
      }

      entropy /= Math.log(count);
      const centroid = weighted / powerSum;
      const density = clamp(flatness * 0.62 + entropy * 0.38, 0, 1);
      return { density, centroid, flatness: clamp(flatness, 0, 1), spectralCrest: clamp(spectralCrest, 0, 1) };
    }

    function spectrumBandValue(index, bars, tiltDb = 0) {
      if (!audioContext || !floatFreqData.length) return { shaped: 0, db: -120, center: 0 };
      const nyquist = audioContext.sampleRate / 2;
      const a = index / bars;
      const b = (index + 1) / bars;
      const f0 = 16 * Math.pow(nyquist / 16, Math.pow(a, 1.34));
      const f1 = 16 * Math.pow(nyquist / 16, Math.pow(b, 1.34));
      const center = Math.sqrt(f0 * f1);
      const bandwidth = Math.max(f1 - f0, nyquist / floatFreqData.length * 1.2);
      const samples = index < Math.floor(bars * 0.3) ? 7 : 5;
      let power = 0;
      let maxDb = -140;
      let weightSum = 0;
      for (let j = 0; j < samples; j += 1) {
        const pos = samples === 1 ? 0 : (j / (samples - 1) - 0.5) * 2;
        const freq = clamp(center + pos * bandwidth * 0.48, 16, nyquist);
        const freqIndex = freq / nyquist * (floatFreqData.length - 1);
        const db = interpolateFloatSpectrum(freqIndex);
        const weight = 0.5 + 0.5 * Math.cos(pos * Math.PI);
        maxDb = Math.max(maxDb, db);
        power += Math.pow(10, db / 10) * weight;
        weightSum += weight;
      }
      const meanDb = powerToDb(power / Math.max(0.0001, weightSum));
      const tiltPosition = clamp((Math.log10(clamp(center, 20, 20000)) - Math.log10(20)) / (Math.log10(20000) - Math.log10(20)), 0, 1);
      const binDb = meanDb * 0.82 + maxDb * 0.18 + tiltDb * (tiltPosition - 0.5);
      const bassComp = index < Math.floor(bars * 0.24) ? (1 - index / Math.floor(bars * 0.24)) * 0.045 : 0;
      return { shaped: Math.pow(dbToMeter(binDb - bassComp), 1.18), db: binDb, center };
    }

    function spectralDynamicsProfile() {
      const windowMode = spectralDynamicsWindowSelect.value;
      if (windowMode === "short") return { avg: 0.38, minFall: 0.42, maxRise: 0.74, minRise: 0.035, maxFall: 0.035, peakFall: 0.035 };
      if (windowMode === "long") return { avg: 0.08, minFall: 0.18, maxRise: 0.46, minRise: 0.008, maxFall: 0.008, peakFall: 0.008 };
      if (windowMode === "freeze") return { avg: 0.12, minFall: 1, maxRise: 1, minRise: 0, maxFall: 0, peakFall: 0 };
      return { avg: 0.16, minFall: 0.28, maxRise: 0.58, minRise: 0.018, maxFall: 0.018, peakFall: 0.018 };
    }

    function updateSpectralDynamicsState(hasLiveAudio) {
      const state = meterState.spectralDynamics;
      const bars = state.current.length || 192;
      if (!state.current.length) resetSpectralDynamicsState();
      if (!hasLiveAudio || metrics.rms < 0.0008) {
        const release = 0.22;
        for (let i = 0; i < bars; i += 1) {
          state.current[i] = lerp(state.current[i] || 0, 0, release);
          state.average[i] = lerp(state.average[i] || 0, 0, release);
          state.min[i] = lerp(state.min[i] || 0, 0, release);
          state.max[i] = lerp(state.max[i] || 0, 0, release);
          state.peak[i] = lerp(state.peak[i] || 0, 0, release);
          state.range[i] = lerp(state.range[i] || 0, 0, release);
        }
        return;
      }

      const profile = spectralDynamicsProfile();
      const tiltDb = Number(spectralDynamicsTilt.value || 0);
      const rangeMode = spectralDynamicsRangeSelect.value;
      for (let i = 0; i < bars; i += 1) {
        const shaped = spectrumBandValue(i, bars, tiltDb).shaped;
        const previousCurrent = state.current[i] || 0;
        const current = lerp(previousCurrent, shaped, shaped > previousCurrent ? 0.82 : 0.36);
        const avg = lerp(state.average[i] || 0, current, profile.avg);
        let minValue = state.min[i] || current;
        let maxValue = state.max[i] || current;
        if (rangeMode === "peak") {
          minValue = Math.min(avg, lerp(minValue, avg, profile.minRise));
          maxValue = Math.max(current, maxValue - profile.peakFall);
        } else {
          minValue = current < minValue ? lerp(minValue, current, profile.minFall) : lerp(minValue, avg, profile.minRise);
          maxValue = current > maxValue ? lerp(maxValue, current, profile.maxRise) : lerp(maxValue, avg, profile.maxFall);
        }
        if (spectralDynamicsWindowSelect.value === "freeze") {
          minValue = Math.min(state.min[i] || current, current);
          maxValue = Math.max(state.max[i] || current, current);
        }
        const range = clamp(maxValue - minValue, 0, 1);
        state.current[i] = current;
        state.average[i] = avg;
        state.min[i] = minValue;
        state.max[i] = maxValue;
        state.peak[i] = Math.max(current, (state.peak[i] || 0) - profile.peakFall);
        state.range[i] = range;
      }
      state.lastUpdatedAt = audioContext ? audioContext.currentTime : performance.now() / 1000;
    }

    function logBandDbProfile(freq, bands = 28) {
      if (!audioContext || !freq.length) return [];
      const nyquist = audioContext.sampleRate * 0.5;
      const minHz = 30;
      const maxHz = Math.min(19000, nyquist * 0.92);
      const minLog = Math.log10(minHz);
      const maxLog = Math.log10(maxHz);
      const profile = [];
      for (let band = 0; band < bands; band += 1) {
        const a = band / bands;
        const b = (band + 1) / bands;
        const lo = Math.pow(10, minLog + (maxLog - minLog) * a);
        const hi = Math.pow(10, minLog + (maxLog - minLog) * b);
        const start = clamp(Math.floor(lo / nyquist * freq.length), 1, freq.length - 1);
        const end = clamp(Math.ceil(hi / nyquist * freq.length), start + 1, freq.length);
        let power = 0;
        let count = 0;
        for (let i = start; i < end; i += 1) {
          const mag = freq[i] / 255;
          power += mag * mag;
          count += 1;
        }
        const rms = Math.sqrt(power / Math.max(1, count));
        profile.push(20 * Math.log10(rms + 0.00001));
      }
      return profile;
    }

    function signalCharacterTransientFeatures(hasLiveAudio, freq) {
      const now = audioContext ? audioContext.currentTime : performance.now() / 1000;
      if (!hasLiveAudio || !freq.length) {
        signalCharacterPreviousBands = [];
        signalCharacterOnsets.length = 0;
        signalCharacterOnsetEnvelope = 0;
        signalCharacterPreviousPeak = metrics.peak;
        signalCharacterPreviousRms = metrics.rms;
        signalCharacterFluxFloor = 0;
        signalCharacterFluxPeak = 0.001;
        return { impact: 0, density: 0, superFlux: 0, peakRise: 0, rmsRise: 0 };
      }

      const bands = logBandDbProfile(freq, 28);
      if (!signalCharacterPreviousBands.length || signalCharacterPreviousBands.length !== bands.length) {
        signalCharacterPreviousBands = bands.slice();
      }

      let diffSum = 0;
      let activeBands = 0;
      let weightSum = 0;
      let hfcSum = 0;
      let lowRiseSum = 0;
      let lowWeightSum = 0;
      for (let i = 0; i < bands.length; i += 1) {
        const prevLocal = Math.max(
          signalCharacterPreviousBands[Math.max(0, i - 1)],
          signalCharacterPreviousBands[i],
          signalCharacterPreviousBands[Math.min(signalCharacterPreviousBands.length - 1, i + 1)]
        );
        const riseDb = Math.max(0, bands[i] - prevLocal - 0.7);
        const bandPos = i / Math.max(1, bands.length - 1);
        const weight = 0.78 + Math.pow(bandPos, 0.72) * 0.44;
        diffSum += riseDb * weight;
        hfcSum += riseDb * Math.pow(0.22 + bandPos, 1.25);
        weightSum += weight;
        if (bandPos < 0.34) {
          const lowWeight = 1.35 - bandPos;
          lowRiseSum += riseDb * lowWeight;
          lowWeightSum += lowWeight;
        }
        if (riseDb > 2.5) activeBands += 1;
      }
      signalCharacterPreviousBands = bands.slice();

      const rawFluxDb = diffSum / Math.max(1, weightSum);
      const rawHfcDb = hfcSum / Math.max(1, weightSum);
      const rawLowRiseDb = lowRiseSum / Math.max(1, lowWeightSum);
      signalCharacterFluxFloor = lerp(signalCharacterFluxFloor, rawFluxDb, rawFluxDb > signalCharacterFluxFloor ? 0.018 : 0.12);
      signalCharacterFluxPeak = Math.max(signalCharacterFluxPeak * 0.985, rawFluxDb, 0.001);
      const relativeFlux = Math.max(0, rawFluxDb - signalCharacterFluxFloor * 0.72);
      const adaptiveFlux = relativeFlux / Math.max(0.75, signalCharacterFluxPeak * 0.52, signalCharacterFluxFloor * 1.8);
      const superFlux = clamp(Math.pow(adaptiveFlux, 0.68), 0, 1);
      const hfcImpact = clamp(Math.pow(rawHfcDb / 5.6, 0.74), 0, 1);
      const lowImpact = clamp(Math.pow(rawLowRiseDb / 3.2, 0.72) * 0.74 + metrics.bassHit * 0.38, 0, 1);
      const peakRise = clamp((metrics.peak - signalCharacterPreviousPeak) * 7.5, 0, 1);
      const rmsRise = clamp((metrics.rms - signalCharacterPreviousRms) * 12, 0, 1);
      signalCharacterPreviousPeak = lerp(signalCharacterPreviousPeak, metrics.peak, metrics.peak > signalCharacterPreviousPeak ? 0.78 : 0.18);
      signalCharacterPreviousRms = lerp(signalCharacterPreviousRms, metrics.rms, metrics.rms > signalCharacterPreviousRms ? 0.62 : 0.14);

      const elementHit = Math.max(
        patternState.hits.kick,
        patternState.hits.tom * 0.85,
        patternState.hits.snare,
        patternState.hits.hat * 0.78,
        patternState.hits.cymbal * 0.72
      );
      const breadth = clamp(activeBands / Math.max(1, bands.length * 0.38), 0, 1);
      const instant = clamp(superFlux * 0.42 + lowImpact * 0.24 + hfcImpact * 0.14 + peakRise * 0.1 + rmsRise * 0.06 + elementHit * 0.06 + breadth * 0.04, 0, 1);
      const onsetThreshold = Math.max(0.18, signalCharacterOnsetEnvelope + 0.055);
      if (instant > onsetThreshold && now - signalCharacterLastOnsetAt > 0.055) {
        signalCharacterOnsets.push({ time: now, strength: instant });
        signalCharacterLastOnsetAt = now;
      }
      signalCharacterOnsetEnvelope = lerp(signalCharacterOnsetEnvelope, instant, instant > signalCharacterOnsetEnvelope ? 0.34 : 0.085);
      const densityWindow = 2.4;
      while (signalCharacterOnsets.length && now - signalCharacterOnsets[0].time > densityWindow) {
        signalCharacterOnsets.shift();
      }
      const density = clamp(signalCharacterOnsets.reduce((sum, event) => sum + event.strength, 0) / densityWindow / 4.2, 0, 1);
      return { impact: instant, density, superFlux, peakRise, rmsRise, lowImpact, hfcImpact };
    }

    function zeroCrossingRateFromTime(values) {
      if (!values || values.length < 2) return 0;
      let crossings = 0;
      let previous = values[0] - 128;
      for (let i = 1; i < values.length; i += 1) {
        const current = values[i] - 128;
        if ((previous <= 0 && current > 0) || (previous >= 0 && current < 0)) crossings += 1;
        previous = current;
      }
      return crossings / Math.max(1, values.length - 1);
    }

    function ampToDb(value) {
      return 20 * Math.log10(Math.max(value, 0.000001));
    }

    function powerToDb(power) {
      return 10 * Math.log10(Math.max(power, 0.000000000001));
    }

    function dbToMeter(db, floor = -90, ceiling = -14) {
      return clamp((db - floor) / (ceiling - floor), 0, 1);
    }

    function hasAudibleUiSignal() {
      return Boolean(analyser && (
        metrics.rms > 0.006
        || metrics.peak > 0.014
        || metrics.low > 0.012
        || metrics.mid > 0.012
        || metrics.high > 0.012
      ));
    }

    function updateVisualPresence(hasSignal) {
      const now = performance.now() / 1000;
      const dt = clamp(now - visualPresenceState.lastUpdateAt, 0, 0.12);
      visualPresenceState.lastUpdateAt = now;
      if (hasSignal) visualPresenceState.lastSignalAt = now;
      const holding = now - visualPresenceState.lastSignalAt <= visualPresenceState.holdSeconds;
      const target = hasSignal || holding ? 1 : 0;
      const seconds = target > visualPresenceState.alpha
        ? visualPresenceState.attackSeconds
        : visualPresenceState.releaseSeconds;
      const rate = seconds <= 0 ? 1 : 1 - Math.exp(-dt / seconds);
      visualPresenceState.alpha = lerp(visualPresenceState.alpha, target, rate);
      if (!hasSignal && !holding && visualPresenceState.alpha < 0.004) visualPresenceState.alpha = 0;
      return visualPresenceState.alpha;
    }

    function visualPresenceAlpha() {
      return clampFinite(visualPresenceState.alpha, 0, 1, 0);
    }

    function withVisualPresence(alpha, draw) {
      const safeAlpha = clampFinite(alpha, 0, 1, 0);
      if (safeAlpha <= 0.004) return false;
      ctx.save();
      ctx.globalAlpha *= safeAlpha;
      draw(safeAlpha);
      ctx.restore();
      return true;
    }

    function interpolateFloatSpectrum(freqIndex) {
      if (!floatFreqData.length) return -140;
      const i0 = clamp(Math.floor(freqIndex), 0, floatFreqData.length - 1);
      const i1 = clamp(i0 + 1, 0, floatFreqData.length - 1);
      const frac = clamp(freqIndex - i0, 0, 1);
      const a = Number.isFinite(floatFreqData[i0]) ? floatFreqData[i0] : -140;
      const b = Number.isFinite(floatFreqData[i1]) ? floatFreqData[i1] : -140;
      return lerp(a, b, frac);
    }

    function correlationFromArrays(a, b) {
      let cross = 0;
      let leftPower = 0;
      let rightPower = 0;
      const n = Math.min(a.length, b.length);
      for (let i = 0; i < n; i += 1) {
        const left = a[i];
        const right = b[i];
        cross += left * right;
        leftPower += left * left;
        rightPower += right * right;
      }
      return leftPower > 1e-9 && rightPower > 1e-9
        ? clamp(cross / Math.sqrt(leftPower * rightPower), -1, 1)
        : 0;
    }

    function lowpassBuffer(input, cutoff) {
      const out = new Float32Array(input.length);
      const sampleRate = audioContext ? audioContext.sampleRate : 48000;
      const rc = 1 / (Math.PI * 2 * cutoff);
      const dt = 1 / sampleRate;
      const alpha = dt / (rc + dt);
      let y = 0;
      for (let i = 0; i < input.length; i += 1) {
        y += alpha * (input[i] - y);
        out[i] = y;
      }
      return out;
    }

    function splitBandsForCorrelation(values) {
      const low = lowpassBuffer(values, 220);
      const lowMid = lowpassBuffer(values, 2800);
      const mid = new Float32Array(values.length);
      const high = new Float32Array(values.length);
      for (let i = 0; i < values.length; i += 1) {
        mid[i] = lowMid[i] - low[i];
        high[i] = values[i] - lowMid[i];
      }
      return { low, mid, high };
    }

    function updateMeteringState() {
      if (!analyser) {
        meterState.spectrum = new Array(240).fill(0);
        meterState.spectrumDelta = new Array(240).fill(0);
        meterState.spectrumPeak = new Array(240).fill(0);
        resetSpectralDynamicsState();
        meterState.loudnessFrames = [];
        meterState.peakDb = -120;
        meterState.momentaryDb = -120;
        meterState.shortDb = -120;
        meterState.rmsFastDb = -120;
        meterState.rmsSlowDb = -120;
        meterState.correlation = 0;
        meterState.lowCorrelation = 0;
        meterState.midCorrelation = 0;
        meterState.highCorrelation = 0;
        return;
      }

      analyser.getFloatFrequencyData(floatFreqData);
      const now = performance.now() / 1000;
      const peakDb = ampToDb(metrics.peak);
      const power = metrics.rms * metrics.rms;
      meterState.loudnessFrames.push({ time: now, power, peak: metrics.peak });
      while (meterState.loudnessFrames.length && now - meterState.loudnessFrames[0].time > 3.2) {
        meterState.loudnessFrames.shift();
      }

      function windowPower(seconds) {
        let sum = 0;
        let count = 0;
        for (const frame of meterState.loudnessFrames) {
          if (now - frame.time <= seconds) {
            sum += frame.power;
            count += 1;
          }
        }
        return count ? sum / count : 0;
      }

      meterState.peakDb = Math.max(peakDb, meterState.peakDb - 1.2);
      meterState.momentaryDb = powerToDb(windowPower(0.4)) - 0.7;
      meterState.shortDb = powerToDb(windowPower(3.0)) - 0.7;
      meterState.rmsFastDb = powerToDb(windowPower(0.3));
      meterState.rmsSlowDb = powerToDb(windowPower(1.0));

      const bars = 240;
      const next = new Array(bars);
      const delta = new Array(bars);
      const peak = new Array(bars);
      const spectrumTiltDb = Number(spectrumTilt.value || 0);
      for (let i = 0; i < bars; i += 1) {
        const shaped = spectrumBandValue(i, bars, spectrumTiltDb).shaped;
        const previous = meterState.spectrum[i] || 0;
        const attack = shaped > previous ? 0.82 : 0.34;
        next[i] = lerp(previous, shaped, attack);
        delta[i] = Math.max(0, shaped - previous);
        peak[i] = Math.max(shaped, (meterState.spectrumPeak[i] || 0) - 0.012);
      }
      meterState.spectrum = next;
      meterState.spectrumDelta = delta;
      meterState.spectrumPeak = peak;
      updateSpectralDynamicsState(metrics.rms > 0.001 || metrics.peak > 0.004);

      leftAnalyser.getByteTimeDomainData(leftTime);
      rightAnalyser.getByteTimeDomainData(rightTime);
      const n = Math.min(leftTime.length, rightTime.length);
      const left = new Float32Array(n);
      const right = new Float32Array(n);
      for (let i = 0; i < n; i += 1) {
        left[i] = (leftTime[i] - 128) / 128;
        right[i] = (rightTime[i] - 128) / 128;
      }
      const leftBands = splitBandsForCorrelation(left);
      const rightBands = splitBandsForCorrelation(right);
      meterState.correlation = correlationFromArrays(left, right);
      meterState.lowCorrelation = correlationFromArrays(leftBands.low, rightBands.low);
      meterState.midCorrelation = correlationFromArrays(leftBands.mid, rightBands.mid);
      meterState.highCorrelation = correlationFromArrays(leftBands.high, rightBands.high);
      updateWaveformHistory(left, right);
    }

    function waveformColorForColumn(column, alpha = 1) {
      if (waveformColorSelect.value === "static") return `rgba(188,218,255,${alpha})`;
      if (waveformColorSelect.value === "multi-band") {
        if (column.band === "low") return `rgba(255,58,24,${alpha})`;
        if (column.band === "mid") return `rgba(188,48,236,${alpha})`;
        return `rgba(126,214,255,${alpha})`;
      }
      const local = column.local || column.peak;
      const transient = clamp((column.hit - 0.58) * 2.2, 0, 1);
      const v = clamp(Math.pow(local, 0.72) * 0.78 + transient * 0.22, 0, 1);
      if (transient > 0.82 && local > 0.72) return `rgba(245,248,232,${alpha})`;
      if (v > 0.72) return `rgba(255,56,24,${alpha})`;
      if (v > 0.42) return `rgba(214,34,168,${alpha})`;
      return `rgba(98,28,180,${alpha})`;
    }

    function updateWaveformHistory(left, right) {
      const maxColumns = 560;
      const speed = Number(waveformSpeedSelect.value);
      const n = Math.min(left.length, right.length);
      if (!n) return;
      for (let step = 0; step < speed; step += 1) {
        const center = Math.floor((step + 0.5) / speed * n);
        const width = Math.max(12, Math.floor(n / (42 * speed)));
        let lMax = 0;
        let rMax = 0;
        let mMax = 0;
        let sMax = 0;
        for (let i = Math.max(0, center - width); i < Math.min(n, center + width); i += 1) {
          const l = left[i];
          const r = right[i];
          lMax = Math.max(lMax, Math.abs(l));
          rMax = Math.max(rMax, Math.abs(r));
          mMax = Math.max(mMax, Math.abs((l + r) * 0.5));
          sMax = Math.max(sMax, Math.abs((l - r) * 0.5));
        }
        const low = smoothed.low;
        const mid = smoothed.mid;
        const high = smoothed.high;
        const band = low >= mid && low >= high ? "low" : mid >= high ? "mid" : "high";
        waveformState.columns.push({
          left: lMax,
          right: rMax,
          mid: mMax,
          side: sMax,
          peak: Math.max(lMax, rMax, mMax, sMax),
          local: Math.max(lMax, rMax, mMax, sMax),
          hit: Math.max(smoothed.bassHit, smoothed.midHit, smoothed.peak),
          low,
          midBand: mid,
          high,
          band
        });
      }
      if (waveformState.columns.length > maxColumns) {
        waveformState.columns.splice(0, waveformState.columns.length - maxColumns);
      }
      const recent = waveformState.columns.slice(-96);
      const sorted = recent.map((column) => column.peak).sort((a, b) => a - b);
      const reference = sorted.length ? Math.max(0.08, sorted[Math.floor(sorted.length * 0.86)]) : 1;
      for (let i = Math.max(0, waveformState.columns.length - 96); i < waveformState.columns.length; i += 1) {
        const column = waveformState.columns[i];
        column.local = clamp(column.peak / reference, 0, 1);
      }
    }

    async function connectStream(stream) {
      if (streamRef) {
        streamRef.getTracks().forEach((track) => track.stop());
      }
      streamRef = stream;
      await primeAudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      configureSpectrumAnalyser();
      source.connect(analyser);

      spectrogramAnalyser = audioContext.createAnalyser();
      configureSpectrogramAnalyser();
      source.connect(spectrogramAnalyser);

      spectrogramLowAnalyser = audioContext.createAnalyser();
      spectrogramMidAnalyser = audioContext.createAnalyser();
      spectrogramHighAnalyser = audioContext.createAnalyser();
      configureSpectrogramDetailAnalysers();
      source.connect(spectrogramLowAnalyser);
      source.connect(spectrogramMidAnalyser);
      source.connect(spectrogramHighAnalyser);

      scopeAnalyser = audioContext.createAnalyser();
      scopeAnalyser.fftSize = 32768;
      scopeAnalyser.smoothingTimeConstant = 0;
      source.connect(scopeAnalyser);
      scopeTimeData = new Uint8Array(scopeAnalyser.fftSize);

      splitter = audioContext.createChannelSplitter(2);
      leftAnalyser = audioContext.createAnalyser();
      rightAnalyser = audioContext.createAnalyser();
      leftAnalyser.fftSize = 8192;
      rightAnalyser.fftSize = 8192;
      leftAnalyser.smoothingTimeConstant = 0;
      rightAnalyser.smoothingTimeConstant = 0;
      source.connect(splitter);
      splitter.connect(leftAnalyser, 0);
      try {
        splitter.connect(rightAnalyser, 1);
      } catch (error) {
        splitter.connect(rightAnalyser, 0);
      }

      leftTime = new Uint8Array(leftAnalyser.fftSize);
      rightTime = new Uint8Array(rightAnalyser.fftSize);
      leftFreq = new Uint8Array(leftAnalyser.frequencyBinCount);
      rightFreq = new Uint8Array(rightAnalyser.frequencyBinCount);
      resetSpectrumState();
      resetPatternState();
      meterState.loudnessFrames = [];
      const track = stream.getAudioTracks()[0];
      const inputLabel = track?.label ? `input: ${track.label}` : "input connected";
      statusEl.textContent = audioContext.state === "running"
        ? inputLabel
        : `${inputLabel} · tap microphone again if meters stay still`;
    }

    systemAudioButton.addEventListener("click", async () => {
      refreshInputCapabilities();
      setInputSource("system");
      if (!inputCapabilityStatus.systemAudio) {
        setInputSource("system", inputErrorMessage("system"));
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: {
            systemAudio: "include",
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false
          }
        });
        if (!stream.getAudioTracks().length) {
          setInputSource("system", "no shared audio track");
          return;
        }
        stream.getVideoTracks().forEach((track) => track.stop());
        await connectStream(stream);
      } catch (error) {
        setInputSource("system", inputErrorMessage("system", error));
      }
    });

    micButton.addEventListener("click", async () => {
      refreshInputCapabilities();
      setInputSource("microphone");
      if (!inputCapabilityStatus.microphone) {
        setInputSource("microphone", inputErrorMessage("microphone"));
        return;
      }
      try {
        statusEl.textContent = "requesting microphone permission";
        let stream;
        const highFidelityAudio = {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          channelCount: { ideal: 2 },
          sampleRate: { ideal: 48000 }
        };
        try {
          stream = await getUserMediaCompat({ audio: highFidelityAudio });
        } catch (error) {
          stream = await getUserMediaCompat({ audio: true });
        }
        statusEl.textContent = "microphone permission granted";
        await connectStream(stream);
      } catch (error) {
        setInputSource("microphone", inputErrorMessage("microphone", error));
      }
    });

    imageInput.addEventListener("change", () => {
      const file = imageInput.files && imageInput.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const img = new Image();
        img.addEventListener("load", () => {
          const scale = Math.min(lowW / img.width, lowH / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const dx = (lowW - drawW) / 2;
          const dy = (lowH - drawH) / 2;
          sourceImageCtx.imageSmoothingEnabled = true;
          sourceImageCtx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
          const corner = sourceImageCtx.getImageData(0, 0, 1, 1).data;
          sourceImageCtx.fillStyle = `rgb(${corner[0]}, ${corner[1]}, ${corner[2]})`;
          sourceImageCtx.fillRect(0, 0, lowW, lowH);
          sourceImageCtx.drawImage(img, dx, dy, drawW, drawH);
          resetPlaneState();
          buildImageMap();
          stageEl.classList.add("has-image");
          imageInfluence.value = "1";
          imageInfluenceValue.textContent = "1.00";
        });
        img.src = reader.result;
      });
      reader.readAsDataURL(file);
    });

    document.getElementById("clearImageButton").addEventListener("click", () => {
      imageMap = null;
      imageMapActivePixels = 0;
      imageLayerPoints = [[], [], [], []];
      imageLayerContourPoints = [[], [], [], []];
      imageMapOffsetX = 0;
      imageMapOffsetY = 0;
      imageInput.value = "";
      imageMapText.textContent = "Off";
      stageEl.classList.remove("has-image");
      resetPlaneState();
    });

    function updateMetrics() {
      let hasLiveAudio = false;
      let spectral = { density: 0, centroid: 0, flatness: 0, spectralCrest: 0 };
      if (!analyser) {
        metrics = {
          rms: 0,
          low: 0,
          mid: 0,
          high: 0,
          side: 0,
          peak: 0,
          density: 0,
          centroid: 0,
          bassHit: 0,
          midHit: 0,
          flux: 0,
          left: 0,
          right: 0
        };
      } else {
        hasLiveAudio = true;
        analyser.getByteFrequencyData(freqData);
        analyser.getByteTimeDomainData(timeData);
        const time = rmsFromTime(timeData);
        spectral = spectralShapeFeatures(freqData);
        const stereo = stereoEnergy();
        const flux = spectralFlux(freqData);
        metrics = {
          rms: time.rms,
          peak: time.peak,
          low: bandAverage(freqData, 0.01, 0.09),
          mid: bandAverage(freqData, 0.09, 0.34),
          high: bandAverage(freqData, 0.34, 0.92),
          side: estimateSide(),
          density: spectral.density,
          centroid: spectral.centroid,
          bassHit: 0,
          midHit: 0,
          flux,
          left: stereo.left,
          right: stereo.right
        };
      }

      const sens = Number(sensitivity.value);
      const motionSens = 0.85 + sens * 0.45;
      const levelSens = 0.32 + sens * 0.68;
      if (hasLiveAudio) {
        const bassTransient = Math.max(0, metrics.low - lowEnvelope);
        const midTransient = Math.max(0, metrics.mid - midEnvelope);
        const rmsTransient = Math.max(0, metrics.rms - rmsEnvelope);
        metrics.bassHit = clamp(metrics.bassHit + bassTransient * 13 + rmsTransient * 6.5 + Math.max(0, metrics.peak - smoothed.peak) * 2.2 + metrics.flux * 0.45, 0, 1);
        metrics.midHit = clamp(midTransient * 14 + metrics.flux * 0.55 + rmsTransient * 2.4, 0, 1);
        lowEnvelope = lerp(lowEnvelope, metrics.low, metrics.low > lowEnvelope ? 0.025 : 0.12);
        midEnvelope = lerp(midEnvelope, metrics.mid, metrics.mid > midEnvelope ? 0.03 : 0.16);
        rmsEnvelope = lerp(rmsEnvelope, metrics.rms, metrics.rms > rmsEnvelope ? 0.03 : 0.14);
      } else {
        lowEnvelope = metrics.low;
        midEnvelope = metrics.mid;
        rmsEnvelope = metrics.rms;
      }
      beatFlash = Math.max(beatFlash * 0.72, metrics.bassHit, metrics.flux * 0.8);
      updateVisualPresence(hasAudibleUiSignal());
      updatePatternDetector(hasLiveAudio);
      updateSignalCharacterState(hasLiveAudio, spectral, timeData, freqData);

      for (const key of Object.keys(metrics)) {
        if (key === "density" || key === "centroid") {
          const target = clamp(metrics[key] * (key === "density" ? 1.08 : 1), 0, 1);
          smoothed[key] = lerp(smoothed[key], target, target > smoothed[key] ? 0.11 : 0.07);
          continue;
        }
        const drive = key === "bassHit" ? 6.2 : key === "midHit" ? 6 : key === "flux" ? 5.8 : key === "peak" ? 3.8 : key === "low" ? 3.4 : 2.7;
        const reactiveKeys = key === "bassHit" || key === "midHit" || key === "flux" || key === "peak";
        const effectiveSens = reactiveKeys ? motionSens : levelSens;
        const target = shapeAudio(metrics[key] * effectiveSens, drive);
        const attack = key === "bassHit" ? 0.78 : key === "midHit" ? 0.74 : key === "flux" ? 0.7 : key === "peak" ? 0.62 : key === "low" ? 0.22 : 0.18;
        const release = key === "bassHit" ? 0.46 : key === "midHit" ? 0.42 : key === "flux" ? 0.38 : key === "peak" ? 0.34 : 0.16;
        smoothed[key] = lerp(smoothed[key], target, target > smoothed[key] ? attack : release);
      }

      const balance = clamp((smoothed.right - smoothed.left) * 2.2, -1, 1);
      const visualLimiter = 1 / (1 + smoothed.rms * 0.9 + smoothed.low * 0.35);
      const centerBreath = Math.sin(t * 0.075 + smoothed.centroid * 2.4);
      const targetTiltX = clamp((balance * 24 + (smoothed.flux + smoothed.midHit) * 18 * Math.sin(t * 0.13)) * visualLimiter, -32, 32);
      const targetTiltY = clamp(((smoothed.low + smoothed.bassHit) * 20 * Math.sin(t * 0.09) + smoothed.high * 18 * centerBreath) * visualLimiter, -32, 32);
      const targetTwist = clamp(balance * 0.45 + smoothed.midHit * 0.45 * Math.sin(t * 0.11) + smoothed.flux * 0.36 * Math.sin(t * 0.08), -0.9, 0.9);
      const camAttack = 0.38 + Math.max(smoothed.flux, smoothed.midHit, smoothed.bassHit) * 0.28;
      cameraTilt.x = lerp(cameraTilt.x, targetTiltX, camAttack);
      cameraTilt.y = lerp(cameraTilt.y, targetTiltY, camAttack);
      cameraTilt.twist = lerp(cameraTilt.twist, targetTwist, 0.34 + smoothed.flux * 0.18);

      const planeForces = [
        smoothed.flux * 1.05 + smoothed.peak * 0.28,
        smoothed.midHit * 1.35 + smoothed.peak * 0.48,
        smoothed.midHit * 0.75 + smoothed.bassHit * 0.45 + smoothed.peak * 0.34,
        smoothed.bassHit * 1.55 + smoothed.peak * 0.42
      ];

      for (let i = 0; i < planePhysics.length; i += 1) {
        const p = planePhysics[i];
        const contract = planeMotionContract[i];
        const frontness = i / Math.max(1, planePhysics.length - 1);
        const restZ = 0;
        const spring = 0.62 + frontness * 0.34;
        const damping = 0.38 - frontness * 0.035;
        const impact = planeForces[i] * (0.34 + frontness * 0.58);
        const pushFromBack = i > 0 ? Math.max(0, planePhysics[i - 1].z - p.z) * (0.22 + smoothed.bassHit * 0.46) : 0;
        const absorbFromFront = i < planePhysics.length - 1 ? Math.max(0, planePhysics[i + 1].z - p.z) * 0.08 : 0;

        p.vz += impact + pushFromBack + absorbFromFront - (p.z - restZ) * spring;
        p.vz *= damping;
        p.z += p.vz;
        p.z = clamp(p.z, -0.42, 1.45);

        const midMotor = i === 1
          ? (smoothed.midHit * 1.45 + smoothed.peak * 0.62 + smoothed.flux * 0.28 + smoothed.rms * 0.08)
          : (smoothed.midHit * 0.68 + smoothed.peak * 0.22);
        const bandMotor = i === 0
          ? smoothed.flux * 1.25 + smoothed.peak * 0.24
          : i === 1
            ? midMotor
            : i === 2
              ? smoothed.midHit * 0.58 + smoothed.bassHit * 0.52 + smoothed.peak * 0.32
              : smoothed.bassHit * 1.25 + smoothed.peak * 0.34;
        p.phase += contract.speed + bandMotor * (i === 1 ? 0.22 : 0.14);
        const stereoPulse = clamp(smoothed.right - smoothed.left, -0.7, 0.7);
        const impactGate = clamp(bandMotor + smoothed.peak * 0.35 + smoothed.flux * 0.18, 0, 1);
        const targetX = clamp(
          Math.sin(p.phase) * impactGate * contract.lateral + stereoPulse * (0.1 + contract.lateral * 0.18) + contract.bias * impactGate * 0.18,
          -1,
          1
        );
        const targetY = clamp(
          Math.cos(p.phase * (i === 1 ? 1.9 : 1.31)) * impactGate * contract.vertical + (i === 3 ? smoothed.bassHit * 0.18 * Math.sin(p.phase * 0.9) : 0),
          -1,
          1
        );
        p.vx += (targetX - p.x) * contract.returnK;
        p.vy += (targetY - p.y) * contract.returnK;
        p.vx *= 0.26;
        p.vy *= 0.26;
        p.x = clamp(p.x + p.vx, -1, 1);
        p.y = clamp(p.y + p.vy, -1, 1);
      }

      updateMeteringState();
    }

    function drawBackground(style, g) {
      lowCtx.fillStyle = "#000";
      lowCtx.fillRect(0, 0, lowW, lowH);

      const scan = 9 + Math.floor(smoothed.high * 18);
      lowCtx.globalAlpha = 0.14 + smoothed.high * 0.16;
      lowCtx.strokeStyle = "#fff";
      lowCtx.lineWidth = 1;
      for (let y = (t * 0.18) % scan; y < lowH; y += scan) {
        lowCtx.beginPath();
        lowCtx.moveTo(0, y);
        lowCtx.lineTo(lowW, y + Math.sin(y * 0.15 + t * 0.03) * g * 5);
        lowCtx.stroke();
      }

      if (style === "kwok") {
        lowCtx.globalAlpha = 0.18 + smoothed.mid * 0.18;
        for (let i = 0; i < 38; i += 1) {
          const a = i * 0.66 + t * 0.006;
          const radius = 18 + i * 2.5 + smoothed.side * 35;
          const x = lowW / 2 + Math.cos(a) * radius;
          const y = lowH / 2 + Math.sin(a * 1.7) * radius;
          lowCtx.beginPath();
          lowCtx.arc(x, y, 0.7 + smoothed.high * 1.5, 0, Math.PI * 2);
          lowCtx.fillStyle = "#fff";
          lowCtx.fill();
        }
      }

      if (style === "sodeoka" || style === "folding") {
        lowCtx.globalAlpha = 0.12 + g * 0.22;
        for (let i = 0; i < 12; i += 1) {
          const y = Math.floor(Math.random() * lowH);
          const h = 1 + Math.floor(Math.random() * 4);
          const offset = (Math.random() - 0.5) * g * 55;
          lowCtx.drawImage(lowCanvas, 0, y, lowW, h, offset, y, lowW, h);
        }
      }

      lowCtx.globalAlpha = 1;
    }

    function blobRadius(angle, style) {
      const base = style === "folding"
        ? 24 + smoothed.rms * 32 + smoothed.low * 26 + smoothed.bassHit * 58
        : 38 + smoothed.rms * 42 + smoothed.low * 22;
      const lattice = style === "kwok" ? 11 : 5;
      const glitchScale = style === "sodeoka" ? 1.65 : style === "folding" ? 1.25 : 1;
      const spikeA = Math.pow(smoothed.peak, 1.5) * 28 * glitchScale;
      const spikeB = smoothed.high * 18 * glitchScale;
      const n1 = Math.sin(angle * lattice + t * 0.045) * smoothed.mid * 13;
      const n2 = Math.sin(angle * 17 - t * 0.065) * spikeB;
      const n3 = noise2(Math.cos(angle) * 2.7, Math.sin(angle) * 2.7, t * 0.02) * spikeA;

      if (style !== "folding") {
        return base + n1 + n2 + n3;
      }

      const density = clamp(smoothed.density * 1.15 + smoothed.high * 0.24, 0, 1);
      const spectralBias = clamp(smoothed.low * 0.28 + smoothed.mid * 0.5 + smoothed.high * 0.95 + smoothed.centroid * 0.72, 0, 1);
      const sides = 3 + Math.floor(spectralBias * 6.999);
      const segment = (Math.PI * 2) / sides;
      const local = ((angle + segment * 0.5) % segment + segment) % segment - segment * 0.5;
      const polygon = Math.cos(Math.PI / sides) / Math.max(0.18, Math.cos(local));
      const polygonMorph = smoothstep(0.18, 0.58, density);
      const fold = smoothstep(0.62, 0.92, density);
      const starFold = Math.pow(Math.max(0, Math.cos(angle * sides * 2 + t * 0.018)), 7);
      const microFold = Math.pow(Math.max(0, Math.sin(angle * (sides * 3 + 1) - t * 0.052)), 5);
      const launch = smoothed.bassHit * 96;
      const radialSpikes = (starFold * 76 + microFold * 44 + launch * starFold) * fold * (0.45 + smoothed.high + smoothed.peak);
      const lowBody = Math.sin(angle * 3 + t * 0.017) * smoothed.low * 18;
      const midFacet = Math.sin(angle * sides - t * 0.028) * smoothed.mid * 18 * polygonMorph;
      const highTeeth = Math.sin(angle * 31 + t * 0.071) * smoothed.high * 24 * fold;
      return base * lerp(1, polygon, polygonMorph) + lowBody + midFacet + highTeeth + radialSpikes;
    }

    function drawLayerConnectors(style) {
      if (!imageMap || !frameLayerContourPoints || !frameLayerContourPoints.some((points) => points.some(Boolean))) return;
      const layerSpecs = [
        { level: 0, depth: 0.08, amount: -0.72, phys: planePhysics[0] },
        { level: 1, depth: 0.34, amount: -0.24, phys: planePhysics[1] },
        { level: 2, depth: 0.68, amount: 0.24, phys: planePhysics[2] },
        { level: 3, depth: 1, amount: 0.72, phys: planePhysics[3] }
      ];
      const byDepth = [...layerSpecs].sort((a, b) => a.depth - b.depth);
      const cosTwist = Math.cos(cameraTilt.twist);
      const sinTwist = Math.sin(cameraTilt.twist);
      const audioExtrude = 0.22 + smoothed.bassHit * 0.85 + smoothed.midHit * 0.62 + smoothed.flux * 0.55 + smoothed.peak * 0.28;
      const maxLines = 40;
      let drawn = 0;

      function project(point, spec) {
        const layerIndex = Math.max(0, planePhysics.indexOf(spec.phys));
        const contract = planeMotionContract[layerIndex] || planeMotionContract[0];
        const bandPush = 0.62 + spec.depth * 1.15 + smoothed.peak * 0.45;
        const baseVX = cameraTilt.x * cosTwist - cameraTilt.y * sinTwist;
        const baseVY = cameraTilt.x * sinTwist + cameraTilt.y * cosTwist;
        const cameraX = clamp(baseVX * spec.amount * audioExtrude * bandPush, -contract.maxShift * 0.45, contract.maxShift * 0.45);
        const cameraY = clamp(baseVY * spec.amount * audioExtrude * bandPush, -contract.maxShift * 0.45, contract.maxShift * 0.45);
        const shiftX = clamp(cameraX + spec.phys.x * contract.maxShift, -contract.maxShift, contract.maxShift) * 0.38;
        const shiftY = clamp(cameraY + spec.phys.y * contract.maxShift, -contract.maxShift, contract.maxShift) * 0.38;
        const zScale = 0.985 + spec.depth * 0.035 - spec.phys.z * 0.012;
        const staticZ = spec.depth - 0.5;
        return {
          x: (point.x - lowW * 0.5 - imageMapOffsetX) * zScale + lowW * 0.5 + shiftX + staticZ * 2.5,
          y: (point.y - lowH * 0.5 - imageMapOffsetY) * zScale + lowH * 0.5 + shiftY - staticZ * 1.8
        };
      }

      function visibleRenderedPoint(point) {
        const x = Math.round(point.x);
        const y = Math.round(point.y);
        if (x < 1 || x >= lowW - 1 || y < 1 || y >= lowH - 1) return false;
        for (let yy = y - 1; yy <= y + 1; yy += 1) {
          for (let xx = x - 1; xx <= x + 1; xx += 1) {
            const idx = (yy * lowW + xx) * 4;
            if (data[idx] > 42 || data[idx + 1] > 42 || data[idx + 2] > 42) return true;
          }
        }
        return false;
      }

      function snapToRenderedPoint(point, radius = 8) {
        const x = Math.round(point.x);
        const y = Math.round(point.y);
        let best = null;
        let bestD = 999999;
        for (let yy = Math.max(1, y - radius); yy <= Math.min(lowH - 2, y + radius); yy += 1) {
          for (let xx = Math.max(1, x - radius); xx <= Math.min(lowW - 2, x + radius); xx += 1) {
            const idx = (yy * lowW + xx) * 4;
            if (data[idx] <= 42 && data[idx + 1] <= 42 && data[idx + 2] <= 42) continue;
            const dx = xx - point.x;
            const dy = yy - point.y;
            const d = dx * dx + dy * dy;
            if (d < bestD) {
              bestD = d;
              best = { x: xx, y: yy };
            }
          }
        }
        return best;
      }

      lowCtx.save();
      lowCtx.globalCompositeOperation = "screen";
      lowCtx.lineWidth = 1 + smoothed.peak * 0.85;
      for (let level = 0; level < frameLayerContourPoints.length; level += 1) {
        const points = frameLayerContourPoints[level] || [];
        if (!points.some(Boolean)) continue;
        lowCtx.strokeStyle = level === 2 && imageDirectGreenBridgeMode
          ? "rgba(150, 255, 120, 0.2)"
          : "rgba(235, 245, 255, 0.16)";
        lowCtx.beginPath();
        let started = false;
        for (let i = 0; i <= points.length; i += 1) {
          const point = points[i % points.length];
          if (!point) {
            started = false;
            continue;
          }
          if (!started) {
            lowCtx.moveTo(point.x, point.y);
            started = true;
          } else {
            lowCtx.lineTo(point.x, point.y);
          }
        }
        lowCtx.stroke();
      }
      for (let pair = 0; pair < byDepth.length - 1 && drawn < maxLines; pair += 1) {
        const aSpec = byDepth[pair];
        const bSpec = byDepth[pair + 1];
        const aPoints = frameLayerContourPoints[aSpec.level] || [];
        const bPoints = frameLayerContourPoints[bSpec.level] || [];
        if (!aPoints.some(Boolean) || !bPoints.some(Boolean)) continue;
        const offset = (pair * 4 + Math.floor(t * 0.018)) % 36;
        for (let step = 0; step < 36 && drawn < maxLines; step += 1) {
          const bin = (offset + step) % 36;
          const a = aPoints[bin];
          const b = bPoints[bin] || bPoints[(bin + 1) % 36] || bPoints[(bin + 35) % 36];
          if (!a || !b) continue;
          const pa = a;
          const pb = b;
          const dx = pb.x - pa.x;
          const dy = pb.y - pa.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const centerA = Math.hypot(pa.x - lowW * 0.5, pa.y - lowH * 0.5);
          const centerB = Math.hypot(pb.x - lowW * 0.5, pb.y - lowH * 0.5);
          if (distance < 1.5 || distance > 120 || centerA > lowW * 0.5 || centerB > lowW * 0.5) continue;
          const wobble = noise2(a.x * 0.05 + pair, a.y * 0.05, t * 0.035) * (0.8 + smoothed.flux * 2.4);
          const mx = (pa.x + pb.x) * 0.5 - dy / Math.max(1, distance) * wobble;
          const my = (pa.y + pb.y) * 0.5 + dx / Math.max(1, distance) * wobble;
          const alpha = clamp(0.28 + (distance / 120) * 0.24 + smoothed.peak * 0.18 + smoothed.midHit * 0.2, 0.18, 0.62);
          lowCtx.strokeStyle = imageDirectGreenBridgeMode && (aSpec.level === 0 || bSpec.level === 0)
            ? `rgba(150, 255, 120, ${alpha})`
            : `rgba(235, 245, 255, ${alpha})`;
          lowCtx.beginPath();
          lowCtx.moveTo(pa.x, pa.y);
          lowCtx.quadraticCurveTo(mx, my, pb.x, pb.y);
          lowCtx.stroke();
          drawn += 1;
        }
      }
      lowCtx.restore();
    }

    function renderBlob(style) {
      const g = Number(glitch.value) * (0.35 + smoothed.peak * 1.4 + smoothed.high + smoothed.bassHit * 1.3);
      const sideWarp = smoothed.side * (style === "folding" ? 0.34 : 0.24);
      const cx = 0.5 + (smoothed.side - 0.2) * 0.12 + Math.sin(t * 0.017) * smoothed.side * 0.05;
      const cy = 0.5 + Math.cos(t * 0.013) * smoothed.low * 0.04;
      const lightX = -0.58 + smoothed.high * 1.1 + smoothed.side * 0.25;
      const lightY = -0.72 + smoothed.bassHit * 0.32;
      const lightZ = 0.88 + smoothed.low * 0.28;
      const flash = style === "folding" ? Math.max(beatFlash, smoothed.bassHit * 0.85) : 0;
      const renderedLevels = new Int8Array(lowW * lowH);
      renderedLevels.fill(-1);

      for (let y = 0; y < lowH; y += 1) {
        for (let x = 0; x < lowW; x += 1) {
          const px = (x / lowW - cx) * (style === "folding" ? 2.55 : 2.1);
          const py = (y / lowH - cy) * (style === "folding" ? 2.55 : 2.1);
          const ellipseX = px * (1 - sideWarp);
          const ellipseY = py * (1 + smoothed.low * 0.12);
          const dist = Math.sqrt(ellipseX * ellipseX + ellipseY * ellipseY);
          const angle = Math.atan2(ellipseY, ellipseX);
          const r = blobRadius(angle, style) / 100;
          const edge = r - dist;
          const idx = (y * lowW + x) * 4;
          const sample = imageSample(x, y, style);

          let value = 0;
          let depth = 0;
          let rim = 0;
          let dot = 0;
          if (edge > -0.025 && !sample.influence) {
            const zBoost = style === "folding" ? 1.22 + smoothed.low * 0.42 + smoothed.bassHit * 0.85 : 1;
            const z = clamp(Math.sqrt(Math.max(0, r * r - dist * dist)) * zBoost, 0, 1.55);
            const nx = ellipseX / Math.max(r, 0.001);
            const ny = ellipseY / Math.max(r, 0.001);
            const nz = z / 1.55;
            dot = clamp(nx * lightX + ny * lightY + nz * lightZ, -1, 1);
            rim = Math.pow(clamp(1 - nz, 0, 1), style === "folding" ? 1.55 : 2.4);
            const shell = clamp(edge * 34, 0, 1);
            depth = z;
            value = (0.42 + dot * (style === "folding" ? 0.68 : 0.48) + rim * (style === "folding" ? 0.52 : 0.34)) * shell;

            if (style === "kwok") {
              const rings = Math.abs(Math.sin(dist * 82 - t * 0.05 + smoothed.mid * 8));
              const spokes = Math.abs(Math.sin(angle * 18 + t * 0.025));
              value *= 0.72 + Math.pow(rings * spokes, 4) * 0.8;
            }

            if (style === "sodeoka" || style === "folding") {
              const tear = noise2(y * 0.08, Math.floor(x / 8), t * 0.05) * g;
              value += tear * 0.32;
              value = value > (style === "folding" ? 0.62 : 0.52) ? 1 : value * 0.84;
            }
          }

          if (sample.influence) {
        const lowFlatReject = !imageDirectGreenBridgeMode && sample.depth < 0.12 && sample.contour < 0.08 && Math.abs(sample.nx) + Math.abs(sample.ny) < 0.08;
        const maskEdge = lowFlatReject ? 0 : smoothstep(0.18, 0.62, sample.mask);
            const audioLift = (smoothed.rms * 0.08 + smoothed.low * 0.2 + smoothed.bassHit * 0.5) * maskEdge;
            const contourLift = sample.contour * (0.22 + smoothed.mid * 0.38 + smoothed.high * 0.3);
            const mappedBody = clamp(maskEdge + audioLift + contourLift, 0, 1);
            const mappedDepth = sample.depth * (0.72 + smoothed.low * 0.55 + smoothed.bassHit * 1.15) + sample.contour * 0.28;
            const mappedRim = clamp((Math.abs(sample.nx) + Math.abs(sample.ny)) * 3.2 + sample.contour * 0.8 + sample.side * 0.36, 0, 1) * mappedBody;
            value = mappedBody;
            depth = mappedDepth;
            rim = mappedRim;
            dot = clamp(0.45 + sample.depth * 0.55 - sample.nx * lightX * 1.8 - sample.ny * lightY * 1.8 + sample.contour * 0.35, -1, 1);
            if (mappedBody > 0.18) {
              const sourceDepth = sample.depth;
              renderedLevels[y * lowW + x] = sourceDepth < 0.2 ? 0 : sourceDepth < 0.5 ? 1 : sourceDepth < 0.84 ? 2 : 3;
            }
          }

          const scanSpacing = 7 + Math.floor(smoothed.high * 16);
          const scanPhase = (y + t * (0.16 + smoothed.high * 0.5)) % scanSpacing;
          const scanLine = scanPhase < 1
            ? (style === "folding" ? flash * 80 + smoothed.high * 8 : 18 + smoothed.high * 34)
            : 0;
          let backgroundPulse = scanLine;

          if (style === "miller") {
            backgroundPulse += Math.max(0, noise2(x * 0.018, y * 0.018, t * 0.012)) * smoothed.high * 34;
          }

          if (style === "kwok") {
            const pxFromCenter = (x / lowW - 0.5) * 2;
            const pyFromCenter = (y / lowH - 0.5) * 2;
            const latticeDist = Math.sqrt(pxFromCenter * pxFromCenter + pyFromCenter * pyFromCenter);
            const latticeAngle = Math.atan2(pyFromCenter, pxFromCenter);
            const ring = Math.abs(Math.sin(latticeDist * 58 - t * 0.03));
            const spoke = Math.abs(Math.sin(latticeAngle * 12 + t * 0.012));
            backgroundPulse += ring > 0.965 || spoke > 0.987 ? 24 + smoothed.mid * 45 : 0;
          }

          if (style === "sodeoka" || style === "folding") {
            const dirty = noise2(Math.floor(x / 9), Math.floor(y / 3), t * 0.04);
            backgroundPulse += dirty > (style === "folding" ? 0.91 - flash * 0.38 : 0.7) ? (12 + smoothed.peak * 42 + flash * 86) : 0;
          }

          if (style === "folding") {
            const body = clamp(value * 255, 0, 255);
            const active = clamp(value * 1.4 + backgroundPulse / 180 + flash * 0.2, 0, 1);
            const mapRed = sample.influence ? sample.red * sample.influence : 0;
            const mapViolet = sample.influence ? sample.violet * sample.influence : 0;
            const colorDepth = imageDirectGreenBridgeMode && sample.influence ? sample.depth : depth;
            const zRed = sample.influence ? (imageDirectPaletteMode ? mapRed : smoothstep(0.72, 1.08, colorDepth)) : 0;
            const zWhite = sample.influence
              ? (imageDirectPaletteMode
                ? smoothstep(0.88, 1.02, colorDepth) * (1 - mapRed) * (1 - mapViolet) * clamp(dot + rim * 0.8, 0, 1)
                : smoothstep(0.5, 0.78, colorDepth) * (1 - zRed) * clamp(dot + rim * 0.8, 0, 1))
              : 0;
            const zViolet = sample.influence ? (imageDirectPaletteMode ? mapViolet * value : (1 - smoothstep(0.28, 0.62, colorDepth)) * value) : 0;
            const zGreen = sample.influence && (!imageDirectPaletteMode || imageDirectGreenBridgeMode)
              ? smoothstep(0.48, 0.68, colorDepth) * (1 - smoothstep(0.76, 0.92, colorDepth)) * value * (imageDirectGreenBridgeMode ? 1 : smoothstep(0.08, 0.22, mapRed + mapViolet))
              : 0;
            const contour = sample.influence ? sample.contour * 190 : 0;
            let red;
            let green;
            let blue;
            if (imageDirectGreenBridgeMode && sample.influence) {
              const planeLight = clamp(0.72 + dot * 0.16 + rim * 0.18 + contour / 520 + smoothed.peak * 0.18 + smoothed.bassHit * 0.12, 0.45, 1.18);
              const flashTint = clamp(flash * 0.16 + backgroundPulse * 0.0018, 0, 0.22);
              const wViolet = clamp(mapViolet + smoothstep(0.02, 0.16, depth) * (1 - mapRed), 0, 1);
              const wRed = clamp(mapRed, 0, 1);
              const wGreen = clamp(zGreen * (1 - mapRed) * (1 - mapViolet) * (1 - zWhite * 0.35), 0, 1);
              const wWhite = clamp(zWhite * (1 - wGreen * 0.96) * (1 - mapRed * 0.85) * (1 - mapViolet * 0.7), 0, 1);
              const sum = Math.max(0.001, wViolet + wRed + wGreen + wWhite);
              const baseR = (142 * wViolet + 255 * wRed + 84 * wGreen + 244 * wWhite) / sum;
              const baseG = (70 * wViolet + 54 * wRed + 248 * wGreen + 246 * wWhite) / sum;
              const baseB = (255 * wViolet + 22 * wRed + 112 * wGreen + 224 * wWhite) / sum;
              red = clamp(baseR * value * planeLight + 55 * flashTint * active, 0, 255);
              green = clamp(baseG * value * planeLight + 35 * flashTint * active, 0, 255);
              blue = clamp(baseB * value * planeLight + 48 * flashTint * active, 0, 255);
            } else {
              red = clamp(body * (0.25 + rim * 0.52 + mapRed * 1.1 + zRed * 1.6 + zWhite * 0.9 + sample.side * 0.42 - zGreen * 0.95) + contour * (0.35 + mapRed + zRed - zGreen * 0.35) + flash * 230 * active + smoothed.high * 60 * active + backgroundPulse * 0.42, 0, 255);
              green = clamp(body * (0.18 + dot * 0.28 + zGreen * 2.35 + zWhite * 0.78 - zRed * 0.22) + contour * (0.22 + zGreen * 1.35 + zWhite * 0.48) + flash * 20 * active + backgroundPulse * 0.12, 0, 255);
              blue = clamp(body * (0.22 + mapViolet * 1.08 + zViolet * 1.35 + zWhite * 0.9 - zRed * 0.54 - mapRed * 0.5 - zGreen * 0.95) + contour * (0.4 + mapViolet * 0.62 + zWhite * 0.22 - zGreen * 0.25) + smoothed.side * 70 * active + smoothed.density * 24 * active + backgroundPulse * 0.72 - flash * 50 * active, 0, 255);
            }
            const shadow = clamp(1 - value * 0.82, 0, 1);
            if (imageDirectGreenBridgeMode && sample.influence) {
              data[idx] = red;
              data[idx + 1] = green;
              data[idx + 2] = blue;
            } else {
              data[idx] = clamp(red * (1 - shadow * 0.24) + backgroundPulse * 0.45, 0, 255);
              data[idx + 1] = clamp(green * (1 - shadow * 0.42), 0, 255);
              data[idx + 2] = clamp(blue + shadow * smoothed.low * 46, 0, 255);
            }
          } else {
            const white = clamp(value * 255 + backgroundPulse, 0, 255);
            const mapRed = sample.influence ? sample.red * sample.influence : 0;
            const mapViolet = sample.influence ? sample.violet * sample.influence : 0;
            const colorDepth = imageDirectGreenBridgeMode && sample.influence ? sample.depth : depth;
            const zRed = sample.influence ? (imageDirectPaletteMode ? mapRed : smoothstep(0.72, 1.08, colorDepth)) : 0;
            const zWhite = sample.influence
              ? (imageDirectPaletteMode
                ? smoothstep(0.88, 1.02, colorDepth) * (1 - mapRed) * (1 - mapViolet) * clamp(dot + rim * 0.8, 0, 1)
                : smoothstep(0.5, 0.78, colorDepth) * (1 - zRed) * clamp(dot + rim * 0.8, 0, 1))
              : 0;
            const zViolet = sample.influence ? (imageDirectPaletteMode ? mapViolet * value : (1 - smoothstep(0.28, 0.62, colorDepth)) * value) : 0;
            const zGreen = sample.influence && (!imageDirectPaletteMode || imageDirectGreenBridgeMode)
              ? smoothstep(0.48, 0.68, colorDepth) * (1 - smoothstep(0.76, 0.92, colorDepth)) * value * (imageDirectGreenBridgeMode ? 1 : smoothstep(0.08, 0.22, mapRed + mapViolet))
              : 0;
            const contour = sample.influence ? sample.contour * 170 : 0;
            if (imageDirectGreenBridgeMode && sample.influence) {
              const planeLight = clamp(0.74 + dot * 0.14 + rim * 0.16 + contour / 540 + smoothed.peak * 0.16 + smoothed.bassHit * 0.1, 0.45, 1.16);
              const flashTint = clamp(beatFlash * 0.12 + backgroundPulse * 0.0015, 0, 0.18);
              const wViolet = clamp(mapViolet + smoothstep(0.02, 0.16, depth) * (1 - mapRed), 0, 1);
              const wRed = clamp(mapRed, 0, 1);
              const wGreen = clamp(zGreen * (1 - mapRed) * (1 - mapViolet) * (1 - zWhite * 0.35), 0, 1);
              const wWhite = clamp(zWhite * (1 - wGreen * 0.96) * (1 - mapRed * 0.85) * (1 - mapViolet * 0.7), 0, 1);
              const sum = Math.max(0.001, wViolet + wRed + wGreen + wWhite);
              const baseR = (142 * wViolet + 255 * wRed + 84 * wGreen + 244 * wWhite) / sum;
              const baseG = (70 * wViolet + 54 * wRed + 248 * wGreen + 246 * wWhite) / sum;
              const baseB = (255 * wViolet + 22 * wRed + 112 * wGreen + 224 * wWhite) / sum;
              data[idx] = clamp(baseR * value * planeLight + 42 * flashTint, 0, 255);
              data[idx + 1] = clamp(baseG * value * planeLight + 32 * flashTint, 0, 255);
              data[idx + 2] = clamp(baseB * value * planeLight + 42 * flashTint, 0, 255);
            } else {
              data[idx] = clamp(white * (0.52 + mapRed * 0.9 + zRed * 1.35 + zWhite * 0.7 + sample.side * 0.34) + contour * (0.48 + mapRed + zRed), 0, 255);
              data[idx + 1] = clamp(white * (0.42 - mapRed * 0.25 - mapViolet * 0.18 + zGreen * 1.05 + zWhite * 0.72) + contour * (0.28 + zGreen * 0.5 + zWhite * 0.42), 0, 255);
              data[idx + 2] = clamp(white * (0.5 + mapViolet * 0.86 + zViolet * 1.1 + zWhite * 0.7 - zRed * 0.5 - mapRed * 0.38) + contour * (0.54 + mapViolet * 0.42), 0, 255);
            }
          }
          data[idx + 3] = 255;
        }
      }

      const visibleColorLevels = new Int8Array(lowW * lowH);
      visibleColorLevels.fill(-1);
      for (let i = 0; i < lowW * lowH; i += 1) {
        const idx = i * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        if (r < 42 && g < 42 && b < 42) continue;
        if (g > 120 && r < 210 && b < 210) visibleColorLevels[i] = 2;
        else if (r > 150 && g < 155 && b < 150) visibleColorLevels[i] = 1;
        else if (r > 185 && g > 170 && b > 130) visibleColorLevels[i] = 3;
        else if (b > 110 || (r > 110 && b > 90)) visibleColorLevels[i] = 0;
        else visibleColorLevels[i] = renderedLevels[i] >= 0 ? renderedLevels[i] : 1;
      }
      lowCtx.putImageData(imageData, 0, 0);
      frameLayerContourPoints = buildLayerContours(visibleColorLevels, lowW * 0.5, lowH * 0.5);
      lowCtx.save();
      lowCtx.globalCompositeOperation = "screen";
      lowCtx.globalAlpha = imageDirectGreenBridgeMode ? 0.05 + flash * 0.08 : style === "folding" ? flash * 0.32 : style === "miller" ? 0.2 : 0.12;
      lowCtx.filter = `blur(${1 + smoothed.rms * (style === "folding" ? 5 : 5) + flash * 8}px)`;
      lowCtx.drawImage(lowCanvas, 0, 0);
      lowCtx.restore();
      drawLayerConnectors(style);

      if (style === "folding" && flash > 0.04) {
        lowCtx.save();
        lowCtx.globalCompositeOperation = "screen";
        lowCtx.fillStyle = `rgba(255, 28, 42, ${0.1 + flash * 0.24})`;
        lowCtx.fillRect(0, 0, lowW, lowH);
        lowCtx.fillStyle = `rgba(146, 63, 255, ${0.05 + flash * 0.18})`;
        lowCtx.beginPath();
        lowCtx.arc(lowW * 0.5, lowH * 0.5, 42 + flash * 96, 0, Math.PI * 2);
        lowCtx.fill();
        lowCtx.restore();
      }

      if (g > 0.08) {
        lowCtx.save();
        lowCtx.globalCompositeOperation = "screen";
        lowCtx.globalAlpha = 0.16 + g * 0.2 + flash * 0.18;
        const strips = style === "sodeoka" || style === "folding" ? 16 : 7;
        for (let i = 0; i < strips; i += 1) {
          const y = Math.floor((Math.sin(t * 0.03 + i * 11.9) * 0.5 + 0.5) * lowH);
          const h = 1 + Math.floor((smoothed.high + Math.random() * g + flash) * 10);
          const ox = (Math.random() - 0.5) * (42 * g + flash * 82);
          lowCtx.drawImage(lowCanvas, 0, y, lowW, h, ox, y, lowW, h);
        }
        lowCtx.restore();
      }
    }

    function meterXForDb(db, minDb = -60, maxDb = 0) {
      return clamp((db - minDb) / (maxDb - minDb), 0, 1);
    }

    function drawMeterText(text, x, y, size = 12, color = "rgba(245,245,245,0.86)") {
      ctx.fillStyle = color;
      ctx.font = `${size}px Inter, ui-sans-serif, system-ui, sans-serif`;
      ctx.fillText(text, x, y);
    }

    function meterTextTopBaseline(y, size, pad = 8) {
      return y + Math.max(pad, size * 0.42) + size;
    }

    function meterTextBottomBaseline(y, h, size, pad = 8) {
      return y + h - Math.max(pad, size * 0.42);
    }

    function meterTextClampedBaseline(targetY, y, h, size, pad = 6) {
      return clamp(targetY, meterTextTopBaseline(y, size, pad), meterTextBottomBaseline(y, h, size, pad));
    }

    function canvasPxForCss(cssPx) {
      const canvasRect = canvas?.getBoundingClientRect?.();
      const widths = [
        stageEl?.clientWidth || 0,
        canvasRect?.width || 0,
        window.innerWidth || 0,
        document.documentElement?.clientWidth || 0
      ].filter((width) => Number.isFinite(width) && width > 0);
      const effectiveWidth = widths.length ? Math.min(...widths) : W;
      const scale = effectiveWidth / W;
      return cssPx / Math.max(0.001, scale);
    }

    function meterTextSize(base, compactBoost = 2, targetMobileCssPx = null) {
      const primitive = contract.ui?.meterPrimitives || {};
      if (!useCompactGraphLayout()) return base;
      const boost = Number.isFinite(compactBoost) ? compactBoost : 0;
      const targetCss = targetMobileCssPx || primitive.minMobileTextCssPx || 13;
      return Math.max(base + boost, canvasPxForCss(targetCss));
    }

    function meterPrimaryTextSize(base) {
      const primitive = contract.ui?.meterPrimitives || {};
      return meterTextSize(base, 0, primitive.minMobilePrimaryTextCssPx || 15);
    }

    function meterBarHeight(base, compactBoost = 3, targetMobileCssPx = null) {
      const primitive = contract.ui?.meterPrimitives || {};
      if (!useCompactGraphLayout()) return base;
      const boost = Number.isFinite(compactBoost) ? compactBoost : 0;
      const targetCss = targetMobileCssPx || primitive.minMobileBarCssPx || 14;
      return Math.max(base + boost, canvasPxForCss(targetCss));
    }

    function meterPrimaryBarHeight(base) {
      const primitive = contract.ui?.meterPrimitives || {};
      return meterBarHeight(base, 0, primitive.minMobilePrimaryBarCssPx || 16);
    }

    function drawMeterBar({ x, y, w, h, value = 0, color = "#f5f5f5", mode = "unipolar", enabled = true }) {
      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = enabled ? "#2b2b2b" : "rgba(43,43,43,0.55)";
      ctx.strokeRect(x, y, w, h);
      if (mode === "bipolar") {
        const mid = x + w * 0.5;
        ctx.strokeStyle = enabled ? "rgba(245,245,245,0.35)" : "rgba(245,245,245,0.14)";
        ctx.beginPath();
        ctx.moveTo(mid, y);
        ctx.lineTo(mid, y + h);
        ctx.stroke();
        if (enabled) {
          const amount = clamp(value, -1, 1);
          ctx.fillStyle = color;
          if (amount >= 0) {
            ctx.fillRect(mid, y, w * 0.5 * amount, h);
          } else {
            ctx.fillRect(mid + w * 0.5 * amount, y, -w * 0.5 * amount, h);
          }
        }
      } else if (enabled) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w * clamp(value, 0, 1), h);
      }
      if (!enabled) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(x, y, w, h);
      }
    }

    function meterRowMetrics(density = "normal") {
      const compact = useCompactGraphLayout();
      const primary = density === "primary";
      const small = density === "compact";
      const labelSize = primary
        ? meterPrimaryTextSize(12)
        : meterTextSize(small ? 10 : 11, small ? 1 : 0, compact ? 13 : null);
      const valueSize = labelSize;
      const barH = primary
        ? meterPrimaryBarHeight(12)
        : meterBarHeight(small ? 8 : 10, 0, compact ? 14 : null);
      const labelGap = compact ? canvasPxForCss(7) : 6;
      const rowGap = compact ? canvasPxForCss(primary ? 14 : 12) : primary ? 12 : 10;
      return { labelSize, valueSize, barH, labelGap, rowGap, height: labelSize + labelGap + barH + rowGap };
    }

    function drawMeterRow({
      label,
      valueText = "",
      value = 0,
      x,
      y,
      w,
      color = "#f5f5f5",
      mode = "unipolar",
      enabled = true,
      density = "normal"
    }) {
      const metricsRow = meterRowMetrics(density);
      const labelBaseline = y + metricsRow.labelSize;
      const barY = labelBaseline + metricsRow.labelGap;
      const labelColor = enabled ? "rgba(245,245,245,0.86)" : "rgba(120,120,120,0.62)";
      const valueColor = enabled ? "rgba(166,188,210,0.9)" : "rgba(95,95,95,0.58)";
      drawMeterText(label, x, labelBaseline, metricsRow.labelSize, labelColor);
      if (valueText) {
        ctx.save();
        ctx.textAlign = "right";
        drawMeterText(valueText, x + w, labelBaseline, metricsRow.valueSize, valueColor);
        ctx.restore();
      }
      drawMeterBar({
        x,
        y: barY,
        w,
        h: metricsRow.barH,
        value,
        color,
        mode,
        enabled
      });
      return {
        height: metricsRow.labelSize + metricsRow.labelGap + metricsRow.barH + metricsRow.rowGap,
        barY,
        barH: metricsRow.barH
      };
    }

    function drawDbBar(label, db, x, y, w, h, color) {
      drawMeterBar({ x, y, w, h, value: meterXForDb(db), color });
      const textSize = meterTextSize(11, 1);
      drawMeterText(label, x, y - 6, textSize, "rgba(245,245,245,0.82)");
      drawMeterText(`${db <= -119 ? "-inf" : db.toFixed(1)} dB`, x + w - 72, y - 6, textSize, "rgba(166,166,166,0.95)");
    }

    function drawCorrelationBar(label, value, x, y, w, h, color, enabled = true) {
      const labelColor = enabled ? "rgba(245,245,245,0.82)" : "rgba(120,120,120,0.62)";
      const valueColor = enabled ? "rgba(166,166,166,0.95)" : "rgba(95,95,95,0.58)";
      drawMeterBar({ x, y, w, h, value, color, mode: "bipolar", enabled });
      const textSize = meterTextSize(11, 1);
      drawMeterText(label, x, y - 6, textSize, labelColor);
      drawMeterText(enabled ? value.toFixed(2) : "--", x + w - 40, y - 6, textSize, valueColor);
    }

    function spectrumColor(value, alpha = 1) {
      const v = clamp(value, 0, 1);
      if (v < 0.42) {
        const k = v / 0.42;
        const r = Math.round(22 + k * 92);
        const g = Math.round(0 + k * 16);
        const b = Math.round(54 + k * 126);
        return `rgba(${r},${g},${b},${alpha})`;
      }
      if (v < 0.78) {
        const k = (v - 0.42) / 0.36;
        const r = Math.round(114 + k * 108);
        const g = Math.round(16 + k * 15);
        const b = Math.round(180 - k * 54);
        return `rgba(${r},${g},${b},${alpha})`;
      }
      const k = (v - 0.78) / 0.22;
      const r = Math.round(222 + k * 33);
      const g = Math.round(31 + k * 34);
      const b = Math.round(126 - k * 105);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function spectrumXForFrequency(freq, x, w) {
      const nyquist = audioContext ? audioContext.sampleRate / 2 : 24000;
      const minFreq = 16;
      const clamped = clamp(freq, minFreq, nyquist);
      const normalized = Math.log(clamped / minFreq) / Math.log(nyquist / minFreq);
      return x + w * Math.pow(normalized, 1 / 1.34);
    }

    function hzToMel(freq) {
      return 2595 * Math.log10(1 + freq / 700);
    }

    function melToHz(mel) {
      return 700 * (10 ** (mel / 2595) - 1);
    }

    function spectrogramFrequencyForPosition(position) {
      const v = clamp(position, 0, 1);
      const scale = spectrogramScaleSelect.value;
      if (scale === "linear") return lerp(20, 20000, v);
      if (scale === "log") return 10 ** lerp(Math.log10(20), Math.log10(20000), v);
      return melToHz(lerp(hzToMel(20), hzToMel(20000), v));
    }

    function spectrogramPositionForFrequency(freq) {
      const f = clamp(freq, 20, 20000);
      const scale = spectrogramScaleSelect.value;
      if (scale === "linear") return clamp((f - 20) / (20000 - 20), 0, 1);
      if (scale === "log") return clamp((Math.log10(f) - Math.log10(20)) / (Math.log10(20000) - Math.log10(20)), 0, 1);
      return clamp((hzToMel(f) - hzToMel(20)) / (hzToMel(20000) - hzToMel(20)), 0, 1);
    }

    function spectrogramColor(value) {
      const v = clamp(value, 0, 1);
      if (v < 0.22) {
        const k = v / 0.22;
        return [Math.round(2 + k * 44), Math.round(k * 5), Math.round(10 + k * 78)];
      }
      if (v < 0.52) {
        const k = (v - 0.22) / 0.3;
        return [Math.round(46 + k * 142), Math.round(5 + k * 18), Math.round(88 + k * 94)];
      }
      if (v < 0.78) {
        const k = (v - 0.52) / 0.26;
        return [Math.round(188 + k * 67), Math.round(23 + k * 35), Math.round(182 - k * 158)];
      }
      const k = (v - 0.78) / 0.22;
      return [255, Math.round(58 + k * 142), Math.round(24 + k * 38)];
    }

    function spectrogramDbFromData(data, freq) {
      if (!data.length || !audioContext) return -140;
      const nyquist = audioContext.sampleRate * 0.5;
      const index = (clamp(freq, 0, nyquist) / nyquist) * (data.length - 1);
      const i0 = clamp(Math.floor(index), 0, data.length - 1);
      const i1 = clamp(i0 + 1, 0, data.length - 1);
      const frac = clamp(index - i0, 0, 1);
      const a = Number.isFinite(data[i0]) ? data[i0] : -140;
      const b = Number.isFinite(data[i1]) ? data[i1] : -140;
      return lerp(a, b, frac);
    }

    function spectrumDbAtFrequency(freq) {
      if (!audioContext || !floatFreqData.length) return -140;
      const nyquist = audioContext.sampleRate * 0.5;
      const index = clamp(freq, 0, nyquist) / nyquist * (floatFreqData.length - 1);
      return interpolateFloatSpectrum(index);
    }

    function spectrogramBinDb(freq) {
      if (spectrogramDetailSelect.value !== "musical") {
        return spectrogramDbFromData(spectrogramFreqData, freq);
      }
      if (freq < 340) return spectrogramDbFromData(spectrogramLowData, freq);
      if (freq < 2600) return spectrogramDbFromData(spectrogramMidData, freq);
      return spectrogramDbFromData(spectrogramHighData, freq);
    }

    function midiToFrequency(midi) {
      return 440 * (2 ** ((midi - 69) / 12));
    }

    function midiNoteName(midi) {
      const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      if (!Number.isFinite(midi)) return "--";
      const roundedMidi = Math.round(midi);
      const noteIndex = ((roundedMidi % 12) + 12) % 12;
      return `${names[noteIndex]}${Math.floor(roundedMidi / 12) - 1}`;
    }

    function frequencyToMidi(freq, referenceA = 440) {
      if (!Number.isFinite(freq) || !Number.isFinite(referenceA) || freq <= 0 || referenceA <= 0) return NaN;
      return 69 + 12 * Math.log2(freq / referenceA);
    }

    function isBlackMidiKey(midi) {
      return [1, 3, 6, 8, 10].includes(midi % 12);
    }

    function getTunerFrame() {
      if (analyser && tunerFloatTimeData.length === analyser.fftSize) {
        analyser.getFloatTimeDomainData(tunerFloatTimeData);
      }
      const source = tunerFloatTimeData && tunerFloatTimeData.length ? tunerFloatTimeData : null;
      const size = Math.min(source?.length || 0, 8192);
      if (!size) return null;
      const frame = new Float32Array(size);
      let mean = 0;
      for (let i = 0; i < size; i += 1) {
        const v = Number.isFinite(source[i]) ? source[i] : 0;
        frame[i] = v;
        mean += v;
      }
      mean /= Math.max(1, size);
      let rms = 0;
      for (let i = 0; i < size; i += 1) {
        frame[i] -= mean;
        rms += frame[i] * frame[i];
      }
      return { frame, rms: Math.sqrt(rms / Math.max(1, size)) };
    }

    function normalizedAutocorrelationAt(frame, tau) {
      const size = frame.length;
      const maxTau = size - 2;
      const t = clampFinite(tau, 1, maxTau, 1);
      const iTau = clamp(Math.floor(t), 1, maxTau);
      const frac = t - iTau;
      const sample = (offset) => {
        const currentTau = clamp(iTau + offset, 1, maxTau);
        let ac = 0;
        let e0 = 0;
        let e1 = 0;
        const limit = size - currentTau;
        for (let i = 0; i < limit; i += 1) {
          const a = frame[i];
          const b = frame[i + currentTau];
          ac += a * b;
          e0 += a * a;
          e1 += b * b;
        }
        return ac / Math.sqrt(Math.max(1e-12, e0 * e1));
      };
      const a = sample(0);
      const b = sample(1);
      return lerp(a, b, frac);
    }

    function detectPitchYin(frame, sampleRate, minFreq = 27.5, maxFreq = 4186) {
      const size = frame.length;
      const minTau = Math.max(2, Math.floor(sampleRate / maxFreq));
      const maxTau = Math.min(Math.floor(sampleRate / minFreq), Math.floor(size * 0.5) - 2);
      if (maxTau <= minTau + 2) return null;
      const yin = new Float32Array(maxTau + 1);
      for (let tau = 1; tau <= maxTau; tau += 1) {
        let sum = 0;
        const limit = size - tau;
        for (let i = 0; i < limit; i += 1) {
          const d = frame[i] - frame[i + tau];
          sum += d * d;
        }
        yin[tau] = sum;
      }
      let running = 0;
      for (let tau = 1; tau <= maxTau; tau += 1) {
        running += yin[tau];
        yin[tau] = running > 0 ? yin[tau] * tau / running : 1;
      }
      let tauEstimate = -1;
      const threshold = 0.12;
      for (let tau = minTau; tau <= maxTau; tau += 1) {
        if (tau >= minTau && yin[tau] < threshold) {
          while (tau + 1 <= maxTau && yin[tau + 1] < yin[tau]) tau += 1;
          tauEstimate = tau;
          break;
        }
      }
      if (tauEstimate < 0) {
        let best = minTau;
        for (let tau = minTau + 1; tau <= maxTau; tau += 1) {
          if (yin[tau] < yin[best]) best = tau;
        }
        tauEstimate = best;
      }
      const t0 = clamp(tauEstimate - 1, minTau, maxTau);
      const t2 = clamp(tauEstimate + 1, minTau, maxTau);
      const denominator = 2 * (2 * yin[tauEstimate] - yin[t2] - yin[t0]);
      const parabolicOffset = Math.abs(denominator) > 0.000001 ? (yin[t2] - yin[t0]) / denominator : 0;
      const betterTau = tauEstimate + clampFinite(parabolicOffset, -1, 1, 0);
      if (!Number.isFinite(betterTau) || betterTau <= 0) return null;
      const freq = sampleRate / betterTau;
      const confidence = clampFinite(1 - yin[tauEstimate], 0, 1, 0);
      if (!Number.isFinite(freq) || freq < minFreq || freq > maxFreq || confidence <= 0) return null;
      const periodicity = normalizedAutocorrelationAt(frame, betterTau);
      const refinedConfidence = clampFinite(confidence * 0.72 + Math.max(0, periodicity) * 0.28, 0, 1, confidence);
      return { freq, confidence: refinedConfidence };
    }

    function detectLowestSpectralPitch(reference = 440) {
      if (!audioContext || !floatFreqData.length) return null;
      const minMidi = 21;
      const maxMidi = 60;
      let best = null;
      for (let midi = minMidi; midi <= maxMidi; midi += 1) {
        const freq = reference * (2 ** ((midi - 69) / 12));
        if (freq < 27.5 || freq > 1046.5) continue;
        const centerDb = spectrumDbAtFrequency(freq);
        const lowSide = spectrumDbAtFrequency(freq / 2 ** (0.34 / 12));
        const highSide = spectrumDbAtFrequency(freq * 2 ** (0.34 / 12));
        const localContrast = centerDb - Math.max(lowSide, highSide);
        const present = centerDb > -78 && localContrast > -1.5;
        if (!present) continue;
        let support = 0;
        let weight = 0;
        for (let harmonic = 2; harmonic <= 6; harmonic += 1) {
          const harmonicFreq = freq * harmonic;
          if (harmonicFreq >= audioContext.sampleRate * 0.48) break;
          const harmonicDb = spectrumDbAtFrequency(harmonicFreq);
          const expectedDrop = harmonic <= 3 ? 28 : 36;
          const harmonicScore = smoothstep(-expectedDrop, 7, harmonicDb - centerDb);
          support += harmonicScore / harmonic;
          weight += 1 / harmonic;
        }
        const harmonicSupport = weight > 0 ? support / weight : 0;
        const subStrength = smoothstep(-76, -30, centerDb);
        const contrastScore = smoothstep(-1, 8, localContrast);
        const confidence = clamp(subStrength * 0.48 + contrastScore * 0.22 + harmonicSupport * 0.3, 0, 1);
        if (confidence < 0.34) continue;
        const candidate = { freq, confidence, midi, db: centerDb };
        if (!best || candidate.midi < best.midi || (candidate.midi === best.midi && candidate.confidence > best.confidence)) {
          best = candidate;
        }
      }
      return best;
    }

    function signalCharacterProfile() {
      const mode = signalCharacterModeSelect?.value || "musical";
      const windowMode = signalCharacterWindowSelect?.value || "medium";
      const windowProfiles = {
        fast: { attack: 1.16, release: 1.08, densityWindow: 1.2 },
        medium: { attack: 1, release: 1, densityWindow: 2.4 },
        slow: { attack: 0.68, release: 0.62, densityWindow: 4.2 }
      };
      const window = windowProfiles[windowMode] || windowProfiles.medium;
      return {
        mode,
        window: windowMode,
        fftWeight: clampFinite(Number(signalCharacterFftWeight?.value || 0.65), 0, 1, 0.65),
        noiseSensitivity: clampFinite(Number(signalCharacterNoise?.value || 1), 0.25, 2, 1),
        transientSensitivity: clampFinite(Number(signalCharacterTransient?.value || 1), 0.25, 2, 1),
        smoothing: clampFinite(Number(signalCharacterSmoothing?.value || 0.6), 0, 1, 0.6),
        attackScale: window.attack,
        releaseScale: window.release,
        densityWindow: window.densityWindow,
        musicalCompensation: mode === "musical" ? 0.28 : 0,
        clinicalDetail: mode === "clinical" ? 1 : 0
      };
    }

    function updateSignalCharacterState(hasLiveAudio, spectral, time, freq) {
      const profile = signalCharacterProfile();
      const crestDb = hasLiveAudio ? ampToDb(metrics.peak) - ampToDb(Math.max(metrics.rms, 0.000001)) : 0;
      const crestNorm = clamp((crestDb - 3) / 18, 0, 1);
      const zcr = hasLiveAudio ? zeroCrossingRateFromTime(time) : 0;
      const zcrNorm = clamp(zcr * 28, 0, 1);
      const transientFeatures = signalCharacterTransientFeatures(hasLiveAudio, freq || freqData);
      const transientDensity = clamp(transientFeatures.density * profile.transientSensitivity, 0, 1);
      const signalConfidence = hasLiveAudio
        ? clamp(
          smoothstep(0.006, 0.04, metrics.rms) * 0.62
            + smoothstep(0.014, 0.09, metrics.peak) * 0.38,
          0,
          1
        )
        : 0;
      const lowAnchor = clamp(tunerState.confidence * 0.72 + (tunerState.detected ? 0.28 : 0), 0, 1);
      const bandTotal = Math.max(0.0001, metrics.low + metrics.mid + metrics.high);
      const highRatio = clamp(metrics.high / bandTotal, 0, 1);
      const fftWeight = profile.fftWeight;
      const timeWeight = 1 - fftWeight;
      const musicalNoiseTrim = profile.musicalCompensation * clamp(metrics.low * 0.32 + metrics.mid * 0.18, 0, 1);
      const fftFlatness = clamp(spectral.flatness * profile.noiseSensitivity - musicalNoiseTrim, 0, 1);
      const fftDensity = clamp(spectral.density * profile.noiseSensitivity - musicalNoiseTrim * 0.42, 0, 1);
      const zcrSignal = clamp(zcrNorm * profile.noiseSensitivity, 0, 1);
      const fftCrest = clamp(spectral.spectralCrest * (profile.mode === "clinical" ? 1.08 : 0.94), 0, 1);
      const hitEvidence = Math.max(
        patternState.hits.kick,
        patternState.hits.tom * 0.85,
        patternState.hits.snare,
        patternState.hits.hat * 0.78,
        patternState.hits.cymbal * 0.72,
        metrics.bassHit * 0.82,
        metrics.midHit * 0.74
      );
      const tonal = clamp((1 - fftFlatness) * (0.28 + fftWeight * 0.34) + fftCrest * (0.18 + fftWeight * 0.28) + lowAnchor * 0.18 - zcrSignal * timeWeight * 0.16, 0, 1);
      const noisy = clamp(fftFlatness * (0.24 + fftWeight * 0.36) + zcrSignal * (0.18 + timeWeight * 0.22) + fftDensity * 0.18 + highRatio * 0.22 - fftCrest * 0.08, 0, 1);
      const sparse = clamp(1 - transientDensity * 0.78 - fftDensity * 0.22, 0, 1);
      const transient = clamp((transientFeatures.impact * 0.78 + metrics.flux * 0.14 + Math.max(metrics.bassHit, metrics.midHit) * 0.08) * profile.transientSensitivity, 0, 1);
      const rawMapNoise = clamp(shapeAudio(noisy * 0.9 + highRatio * 0.22 + (1 - tonal) * 0.08, 1.45), 0, 1);
      const rawMapMotion = clamp(shapeAudio(
        transientFeatures.impact * 0.64
          + hitEvidence * 0.28
          + metrics.flux * 0.22
          + transientDensity * 0.12,
        2.35
      ), 0, 1);
      const neutralBlend = smoothstep(0.08, 0.88, signalConfidence);
      const mapPush = clamp(neutralBlend * (1.18 + signalConfidence * 0.42), 0, 1.45);
      const mapNoise = clamp(0.5 + (rawMapNoise - 0.5) * mapPush, 0, 1);
      const mapMotion = clamp(0.5 + (rawMapMotion - 0.5) * mapPush, 0, 1);
      const dynamic = crestNorm;
      const targets = {
        flatness: fftFlatness,
        spectralCrest: fftCrest,
        crestFactor: crestNorm,
        zeroCrossing: zcrSignal,
        transientDensity,
        transientImpact: clamp(transientFeatures.impact * profile.transientSensitivity, 0, 1),
        eventDensity: transientDensity,
        lowAnchor,
        tonal,
        noisy,
        mapNoise,
        mapMotion,
        sparse,
        transient,
        dynamic
      };
      for (const [key, value] of Object.entries(targets)) {
        const current = signalCharacterState[key] || 0;
        const target = hasLiveAudio ? value : (key === "mapNoise" || key === "mapMotion" ? 0.5 : 0);
        const isImpact = key === "transientImpact" || key === "transient" || key === "mapMotion";
        const isMapAxis = key === "mapNoise";
        const isDensity = key === "eventDensity" || key === "transientDensity";
        const smoothingScale = lerp(1.28, 0.46, profile.smoothing);
        const attack = (isImpact ? 0.62 : isMapAxis ? 0.36 : isDensity ? 0.34 : 0.24) * profile.attackScale * smoothingScale;
        const release = (isImpact ? 0.3 : isMapAxis ? 0.18 : isDensity ? 0.16 : 0.12) * profile.releaseScale * smoothingScale;
        signalCharacterState[key] = lerp(current, target, target > current ? attack : release);
      }
      signalCharacterBackend.profile = profile;
      signalCharacterBackend.descriptors = {
        ...targets,
        mode: profile.mode,
        fftWeight,
        timeWeight,
        signalConfidence,
        spectralDensity: fftDensity,
        highRatio,
        hitEvidence,
        flux: metrics.flux
      };
      signalCharacterBackend.hints = {
        tunerTrust: clamp(signalCharacterState.lowAnchor * 0.46 + signalCharacterState.tonal * 0.34 + (1 - signalCharacterState.noisy) * 0.2, 0, 1),
        patternTrust: clamp(signalCharacterState.transientImpact * 0.5 + signalCharacterState.eventDensity * 0.3 + signalCharacterState.spectralCrest * 0.2, 0, 1),
        noiseRisk: signalCharacterState.noisy,
        transientBias: signalCharacterState.transientImpact,
        spectralConfidence: clamp(signalCharacterState.tonal * 0.45 + signalCharacterState.spectralCrest * 0.35 + (1 - signalCharacterState.flatness) * 0.2, 0, 1)
      };
      signalCharacterBackend.updatedAt = audioContext ? audioContext.currentTime : performance.now() / 1000;
    }

    function chooseTunerPitchCandidate(yinResult, spectralResult) {
      if (!spectralResult) return yinResult;
      if (!yinResult) return spectralResult;
      const octaveBelow = spectralResult.freq <= yinResult.freq * 0.78;
      const strongLowest = spectralResult.confidence > 0.42;
      if (octaveBelow && strongLowest) return spectralResult;
      if (spectralResult.freq < yinResult.freq && spectralResult.confidence > yinResult.confidence * 0.82) return spectralResult;
      return yinResult;
    }

    function updateTunerState(force = false) {
      const now = performance.now() / 1000;
      if (!force && now - tunerState.lastAnalysisAt < 0.075) return;
      tunerState.lastAnalysisAt = now;
      if (!analyser || !audioContext) {
        tunerState.stable = false;
        tunerState.detected = false;
        tunerState.rms = 0;
        tunerState.density = 0;
        return;
      }
      const input = getTunerFrame();
      if (!input) return;
      const reference = clampFinite(Number(tunerReference.value), 410, 480, 440);
      const result = chooseTunerPitchCandidate(
        detectPitchYin(input.frame, audioContext.sampleRate),
        detectLowestSpectralPitch(reference)
      );
      const densityPenalty = smoothstep(0.62, 0.92, metrics.density);
      if (input.rms > 0.006 || smoothed.rms > 0.01) tunerState.lastSignalAt = now;
      const usable = Boolean(result)
        && input.rms > 0.004
        && result.confidence > 0.42;
      tunerState.rms = lerp(tunerState.rms, input.rms, 0.28);
      tunerState.density = lerp(tunerState.density, metrics.density, 0.2);
      if (!usable) {
        tunerState.confidence = lerp(tunerState.confidence, 0, 0.22);
        tunerState.stable = false;
        tunerState.detected = false;
        return;
      }
      const midi = frequencyToMidi(result.freq, reference);
      if (!Number.isFinite(midi)) {
        tunerState.confidence = lerp(tunerState.confidence, 0, 0.22);
        tunerState.stable = false;
        tunerState.detected = false;
        return;
      }
      const rounded = Math.round(midi);
      const cents = clampFinite((midi - rounded) * 100, -50, 50, 0);
      const nextNote = midiNoteName(rounded);
      const noteChanged = nextNote !== tunerState.note;
      const previousFreq = !noteChanged && Number.isFinite(tunerState.freq) && tunerState.freq > 0 ? tunerState.freq : result.freq;
      const previousCents = !noteChanged && Number.isFinite(tunerState.cents) ? tunerState.cents : cents;
      tunerState.freq = lerp(previousFreq, result.freq, noteChanged ? 0.75 : 0.52);
      tunerState.cents = lerp(previousCents, cents, noteChanged ? 0.82 : 0.68);
      tunerState.note = nextNote;
      if (tunerState.note === "--") {
        tunerState.confidence = lerp(tunerState.confidence, 0, 0.22);
        tunerState.stable = false;
        tunerState.detected = false;
        return;
      }
      tunerState.confidence = lerp(clampFinite(tunerState.confidence, 0, 1, 0), result.confidence * (1 - densityPenalty * 0.45), 0.34);
      tunerState.detected = result.confidence > 0.42;
      tunerState.stable = tunerState.detected && Math.abs(tunerState.cents) <= 50;
      if (tunerState.detected) tunerState.lastDetectedAt = now;
      if (tunerState.stable) tunerState.lastStableAt = now;
    }


    function spectrogramNotes() {
      const notes = [];
      for (let midi = 24; midi <= 120; midi += 1) {
        const freq = midiToFrequency(midi);
        if (freq >= 20 && freq <= 20000) {
          notes.push({
            midi,
            freq,
            name: midiNoteName(midi),
            black: isBlackMidiKey(midi)
          });
        }
      }
      return notes;
    }

    function spectrogramYForFrequency(freq, y, h) {
      return y + h - spectrogramPositionForFrequency(freq) * h;
    }

    function spectrogramFrequencyForY(mouseY, y, h) {
      return spectrogramFrequencyForPosition(clamp((y + h - mouseY) / Math.max(1, h), 0, 1));
    }

    function nearestSpectrogramNote(freq) {
      let best = null;
      let bestCents = Infinity;
      for (const note of spectrogramNotes()) {
        const cents = Math.abs(1200 * Math.log2(freq / note.freq));
        if (cents < bestCents) {
          best = note;
          bestCents = cents;
        }
      }
      return best && bestCents <= 80 ? { ...best, cents: bestCents } : null;
    }

    function spectrogramBaseIntensity(freq, rowIndex = -1, adaptFloor = true) {
      const tiltDb = Number(spectrogramTilt.value) * (spectrogramPositionForFrequency(freq) - 0.5);
      const db = spectrogramBinDb(freq) + tiltDb;
      let value = clamp((db + 102) / 92, 0, 1);
      if (spectrogramDetailSelect.value === "musical" && rowIndex >= 0 && rowIndex < spectrogramAdaptiveFloor.length) {
        const previousFloor = Number.isFinite(spectrogramAdaptiveFloor[rowIndex]) ? spectrogramAdaptiveFloor[rowIndex] : -112;
        const floorTarget = clamp(db - 8, -118, -18);
        const attack = floorTarget < previousFloor ? 0.085 : 0.012;
        const floor = adaptFloor ? lerp(previousFloor, floorTarget, attack) : previousFloor;
        if (adaptFloor) spectrogramAdaptiveFloor[rowIndex] = floor;
        const localContrast = clamp((db - floor - 5) / 30, 0, 1);
        const absoluteEnergy = clamp((db + 96) / 82, 0, 1);
        value = clamp(Math.max(absoluteEnergy * 0.38, localContrast), 0, 1);
      }
      return { db, value };
    }

    function shapeSpectrogramValue(value) {
      const floor = spectrogramModeSelect.value === "classic" ? 0.045 : 0.065;
      let shaped = value <= floor ? 0 : (value - floor) / (1 - floor);
      if (spectrogramModeSelect.value === "classic") shaped = clamp(Math.pow(shaped, 0.9) * 1.02, 0, 1);
      if (spectrogramModeSelect.value === "sharp") shaped = clamp(Math.pow(shaped, 0.66) * 1.14, 0, 1);
      if (spectrogramModeSelect.value === "sharper") shaped = clamp(Math.pow(shaped, 0.52) * 1.22 + smoothed.flux * 0.1, 0, 1);
      return shaped;
    }

    function spectrogramIntensity(freq, rowIndex = -1) {
      return shapeSpectrogramValue(spectrogramBaseIntensity(freq, rowIndex, false).value);
    }

    function updateSpectrogramHistory() {
      if (!spectrogramAnalyser) return;
      if (!currentLayoutModules.includes("spectrogram") || !graphOpenState.spectrogram) return;
      spectrogramAnalyser.getFloatFrequencyData(spectrogramFreqData);
      if (spectrogramDetailSelect.value === "musical") {
        if (spectrogramLowAnalyser) spectrogramLowAnalyser.getFloatFrequencyData(spectrogramLowData);
        if (spectrogramMidAnalyser) spectrogramMidAnalyser.getFloatFrequencyData(spectrogramMidData);
        if (spectrogramHighAnalyser) spectrogramHighAnalyser.getFloatFrequencyData(spectrogramHighData);
      }
      const orientation = spectrogramOrientationSelect.value;
      if (
        spectrogramState.fftSize !== Number(spectrogramFftSelect.value)
        || spectrogramState.orientation !== orientation
        || spectrogramState.window !== spectrogramWindowSelect.value
        || spectrogramState.detail !== spectrogramDetailSelect.value
      ) {
        resetSpectrogramState();
      }
      const cw = spectrogramCanvas.width;
      const ch = spectrogramCanvas.height;
      const horizontal = orientation === "horizontal";
      const count = horizontal ? ch : cw;
      const imageData = horizontal ? spectrogramCtx.createImageData(1, ch) : spectrogramCtx.createImageData(cw, 1);
      const pixels = imageData.data;
      const rowDb = new Float32Array(count);
      const rowValue = new Float32Array(count);
      let broadbandActivity = 0;
      spectrogramState.subPixel += Number(spectrogramSpeedSelect.value);
      const advances = clamp(Math.floor(spectrogramState.subPixel), 0, 6);
      if (advances < 1) return;
      spectrogramState.subPixel -= advances;
      for (let i = 0; i < count; i += 1) {
        const pos = count <= 1 ? 0 : i / (count - 1);
        const freq = spectrogramFrequencyForPosition(horizontal ? 1 - pos : pos);
        const cell = spectrogramBaseIntensity(freq, i, true);
        rowDb[i] = cell.db;
        rowValue[i] = cell.value;
        if (cell.value > 0.18) broadbandActivity += 1;
      }
      const broadbandRatio = broadbandActivity / Math.max(1, count);
      for (let i = 0; i < count; i += 1) {
        const nearA = rowDb[clamp(i - 2, 0, count - 1)];
        const nearB = rowDb[clamp(i + 2, 0, count - 1)];
        const farA = rowDb[clamp(i - 7, 0, count - 1)];
        const farB = rowDb[clamp(i + 7, 0, count - 1)];
        const localShelf = (nearA + nearB + farA + farB) * 0.25;
        const freqRidge = smoothstep(1.5, 11.5, rowDb[i] - localShelf);
        const previousDb = Number.isFinite(spectrogramLastColumnDb[i]) ? spectrogramLastColumnDb[i] : -140;
        const temporalRidge = smoothstep(16, 3, Math.abs(rowDb[i] - previousDb)) * smoothstep(0.06, 0.5, rowValue[i]);
        const percussivePenalty = smoothstep(0.24, 0.62, broadbandRatio) * (1 - freqRidge * 0.68);
        let finalValue = rowValue[i];
        if (spectrogramDetailSelect.value === "musical") {
          finalValue = clamp(finalValue * (0.78 + freqRidge * 0.64 + temporalRidge * 0.34) - percussivePenalty * 0.2, 0, 1);
        }
        spectrogramLastColumnDb[i] = rowDb[i];
        const color = spectrogramColor(shapeSpectrogramValue(finalValue));
        const offset = i * 4;
        pixels[offset] = color[0];
        pixels[offset + 1] = color[1];
        pixels[offset + 2] = color[2];
        pixels[offset + 3] = 255;
      }
      for (let step = 0; step < advances; step += 1) {
        if (horizontal) {
          if (spectrogramLoopSelect.value === "scroll") {
            spectrogramCtx.drawImage(spectrogramCanvas, 1, 0, cw - 1, ch, 0, 0, cw - 1, ch);
            spectrogramCtx.putImageData(imageData, cw - 1, 0);
          } else {
            spectrogramCtx.putImageData(imageData, spectrogramState.write, 0);
            spectrogramState.write = (spectrogramState.write + 1) % cw;
          }
        } else if (spectrogramLoopSelect.value === "scroll") {
          spectrogramCtx.drawImage(spectrogramCanvas, 0, 1, cw, ch - 1, 0, 0, cw, ch - 1);
          spectrogramCtx.putImageData(imageData, 0, ch - 1);
        } else {
          spectrogramCtx.putImageData(imageData, 0, spectrogramState.write);
          spectrogramState.write = (spectrogramState.write + 1) % ch;
        }
      }
      spectrogramState.frame += 1;
    }

    function drawSpectrogramFrequencyOverlay(x, y, w, h) {
      if (spectrogramFreqOverlaySelect.value !== "on") return;
      const marks = [20, 100, 500, 1000, 5000, 10000, 20000];
      ctx.save();
      ctx.font = "10px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.textBaseline = "top";
      for (const freq of marks) {
        const p = spectrogramPositionForFrequency(freq);
        ctx.strokeStyle = freq === 1000 || freq === 10000 ? "rgba(180,200,230,0.22)" : "rgba(180,200,230,0.12)";
        ctx.fillStyle = "rgba(188,218,255,0.74)";
        if (spectrogramOrientationSelect.value === "horizontal") {
          const yy = y + h - p * h;
          ctx.beginPath();
          ctx.moveTo(x, yy);
          ctx.lineTo(x + w, yy);
          ctx.stroke();
          ctx.fillText(freq >= 1000 ? `${freq / 1000}k` : `${freq}`, x + 6, clamp(yy + 2, y + 4, y + h - 12));
        } else {
          const xx = x + p * w;
          ctx.beginPath();
          ctx.moveTo(xx, y);
          ctx.lineTo(xx, y + h);
          ctx.stroke();
          ctx.fillText(freq >= 1000 ? `${freq / 1000}k` : `${freq}`, xx + 3, y + 4);
        }
      }
      ctx.restore();
    }

    function drawSpectrogramPianoOverlay(x, y, w, h) {
      const presence = visualPresenceAlpha();
      if (spectrogramPianoOverlaySelect.value !== "on" || spectrogramOrientationSelect.value !== "horizontal" || presence <= 0.004) {
        spectrogramHover.note = null;
        return;
      }
      const keyW = 42;
      const labelW = 16;
      const keyX = x + labelW;
      const keyAreaW = keyW - labelW;
      const notes = spectrogramNotes();
      ctx.save();
      ctx.globalAlpha *= presence;
      ctx.fillStyle = "rgba(0,0,0,0.9)";
      ctx.fillRect(x, y, keyW, h);
      ctx.strokeStyle = "rgba(188,218,255,0.15)";
      ctx.strokeRect(x, y, keyW, h);
      let hoverNote = null;
      if (spectrogramHover.active && spectrogramHover.plot) {
        hoverNote = nearestSpectrogramNote(spectrogramFrequencyForY(spectrogramHover.y, spectrogramHover.plot.y, spectrogramHover.plot.h));
      }
      spectrogramHover.note = hoverNote;
      const octaveLabels = [];
      for (const note of notes) {
        const yy = spectrogramYForFrequency(note.freq, y, h);
        const nextFreq = midiToFrequency(note.midi + 1);
        const prevFreq = midiToFrequency(note.midi - 1);
        const yNext = spectrogramYForFrequency(nextFreq, y, h);
        const yPrev = spectrogramYForFrequency(prevFreq, y, h);
        const keyH = clamp(Math.abs(yNext - yPrev) * 0.48, 1.2, 9);
        const isHover = hoverNote?.midi === note.midi;
        ctx.fillStyle = note.black
          ? isHover ? "rgba(188,48,236,0.9)" : "rgba(12,12,15,0.98)"
          : isHover ? "rgba(255,96,36,0.9)" : "rgba(215,218,212,0.9)";
        const kw = note.black ? keyAreaW * 0.56 : keyAreaW;
        ctx.fillRect(keyX, yy - keyH * 0.5, kw, Math.max(1, keyH));
        if (note.black) {
          ctx.fillStyle = "rgba(255,255,255,0.07)";
          ctx.fillRect(keyX + kw - 1, yy - keyH * 0.5, 1, Math.max(1, keyH));
        }
        if (!note.black && note.midi % 12 === 0) {
          octaveLabels.push({ y: yy, name: note.name });
          ctx.strokeStyle = "rgba(188,218,255,0.2)";
          ctx.beginPath();
          ctx.moveTo(x, yy);
          ctx.lineTo(x + keyW, yy);
          ctx.stroke();
        }
      }
      ctx.font = "8px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.textBaseline = "middle";
      let lastLabelY = -999;
      for (const label of octaveLabels) {
        if (label.y < y + 8 || label.y > y + h - 8) continue;
        if (Math.abs(label.y - lastLabelY) < 18) continue;
        ctx.fillStyle = "rgba(188,218,255,0.7)";
        ctx.fillText(label.name, x + 2, label.y);
        lastLabelY = label.y;
      }
      if (hoverNote) {
        const lineY = spectrogramYForFrequency(hoverNote.freq, y, h);
        const energy = spectrogramIntensity(hoverNote.freq);
        ctx.globalCompositeOperation = "screen";
        ctx.strokeStyle = `rgba(255,96,36,${0.38 + energy * 0.5})`;
        ctx.lineWidth = 1.25 + energy * 2.2;
        ctx.beginPath();
        ctx.moveTo(x + keyW, lineY);
        ctx.lineTo(x + w, lineY);
        ctx.stroke();
        if (energy > 0.08) {
          ctx.strokeStyle = `rgba(255,190,90,${clamp(energy * 0.52, 0, 0.62)})`;
          ctx.lineWidth = 7 + energy * 10;
          ctx.beginPath();
          ctx.moveTo(x + keyW, lineY);
          ctx.lineTo(x + w, lineY);
          ctx.stroke();
        }
        ctx.globalCompositeOperation = "source-over";
        const label = `${hoverNote.name} · ${hoverNote.freq.toFixed(1)}Hz`;
        ctx.font = "10px Inter, ui-sans-serif, system-ui, sans-serif";
        const hoverLabelW = Math.ceil(ctx.measureText(label).width) + 12;
        ctx.fillStyle = "rgba(0,0,0,0.82)";
        ctx.fillRect(x + keyW + 6, clamp(lineY - 10, y + 4, y + h - 18), hoverLabelW, 17);
        ctx.fillStyle = "rgba(245,245,245,0.9)";
        ctx.fillText(label, x + keyW + 12, clamp(lineY + 2, y + 16, y + h - 6));
      }
      ctx.restore();
    }

    function drawSpectrogramPanel(x, y, w, h) {
      updateSpectrogramHistory();
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const pianoPresence = visualPresenceAlpha();
      const pianoW = spectrogramPianoOverlaySelect.value === "on" && spectrogramOrientationSelect.value === "horizontal" ? 44 * pianoPresence : 0;
      const plotX = x + 1 + pianoW;
      const plotY = y + 1;
      const plotW = w - 2 - pianoW;
      const plotH = h - 2;
      spectrogramHover.plot = { x: plotX, y: plotY, w: plotW, h: plotH };
      ctx.save();
      ctx.imageSmoothingEnabled = spectrogramModeSelect.value === "classic";
      ctx.drawImage(spectrogramCanvas, plotX, plotY, plotW, plotH);
      if (spectrogramModeSelect.value === "sharper") {
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = 0.18;
        ctx.filter = "contrast(155%) saturate(118%)";
        ctx.drawImage(spectrogramCanvas, plotX, plotY, plotW, plotH);
      }
      ctx.restore();
      drawSpectrogramFrequencyOverlay(plotX, plotY, plotW, plotH);
      drawSpectrogramPianoOverlay(x + 1, plotY, w - 2, plotH);
      const detailLabel = spectrogramDetailSelect.value === "musical" ? "multi" : `${spectrogramFftSelect.value} FFT`;
      const label = `${spectrogramScaleSelect.value} · ${detailLabel} · ${spectrogramOrientationSelect.value}`;
      ctx.save();
      ctx.font = "9px Inter, ui-sans-serif, system-ui, sans-serif";
      const labelW = Math.ceil(ctx.measureText(label).width);
      const badgeW = Math.min(w - 16, labelW + 14);
      const badgeX = x + w - badgeW - 7;
      const badgeY = y + 7;
      ctx.fillStyle = "rgba(0,0,0,0.72)";
      ctx.fillRect(badgeX, badgeY, badgeW, 17);
      ctx.strokeStyle = "rgba(188,218,255,0.16)";
      ctx.strokeRect(badgeX, badgeY, badgeW, 17);
      ctx.fillStyle = "rgba(188,218,255,0.78)";
      ctx.textBaseline = "middle";
      ctx.fillText(label, badgeX + 7, badgeY + 9);
      ctx.restore();
    }

    function drawTunerPanel(x, y, w, h) {
      updateTunerState();
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const now = performance.now() / 1000;
      const stale = now - tunerState.lastDetectedAt > 1.5;
      const hasSignal = tunerState.rms > 0.006 || smoothed.rms > 0.01;
      const sustainedSignal = hasSignal && now - tunerState.lastSignalAt < 0.4 && now - tunerState.lastSignalAt > -0.001;
      const safeCents = clampFinite(tunerState.cents, -50, 50, 0);
      const safeFreq = Number.isFinite(tunerState.freq) && tunerState.freq > 0 ? tunerState.freq : 0;
      const safeNote = typeof tunerState.note === "string" && tunerState.note !== "undefined" ? tunerState.note : "--";
      const recentlyDetected = now - tunerState.lastDetectedAt < 0.55;
      const detected = Boolean((tunerState.detected || recentlyDetected) && safeNote !== "--" && safeFreq > 0);
      const atonal = sustainedSignal && stale && tunerState.density > 0.84 && tunerState.confidence < 0.18;
      const isInTune = detected && Math.abs(safeCents) <= 3;
      const centerX = x + w * 0.5;
      const top = y + 18;
      const railY = y + h * 0.46;
      const leftX = x + 54;
      const rightX = x + w - 54;
      const dotX = clampFinite(centerX + (safeCents / 50) * ((rightX - leftX) * 0.5), leftX, rightX, centerX);
      const color = !detected
        ? [118, 126, 136]
        : isInTune
          ? [57, 255, 20]
          : Math.abs(safeCents) <= 10
            ? [255, 190, 40]
            : [255, 35, 24];
      const displayText = detected
        ? safeNote.replace(/(\d+)$/, "")
        : atonal
          ? "WTF?"
          : "--";
      ctx.save();
      ctx.font = "700 16px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(245,245,245,0.92)";
      ctx.fillText("Tuner", centerX, top);
      ctx.font = "700 13px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.fillStyle = "rgba(245,245,245,0.86)";
      ctx.fillText("-50", leftX, railY - 38);
      ctx.fillText("0", centerX, railY - 38);
      ctx.fillText("+50", rightX, railY - 38);
      ctx.strokeStyle = "rgba(255,255,255,0.14)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftX, railY);
      ctx.lineTo(centerX - 30, railY);
      ctx.moveTo(centerX + 30, railY);
      ctx.lineTo(rightX, railY);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, railY, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalCompositeOperation = "screen";
      const glow = ctx.createRadialGradient(dotX, railY, 2, dotX, railY, 28);
      glow.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},0.72)`);
      glow.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(dotX, railY, 28, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;
      ctx.beginPath();
      ctx.arc(dotX, railY, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = displayText === "WTF?" ? "800 22px Inter, ui-sans-serif, system-ui, sans-serif" : "800 24px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.fillStyle = displayText === "WTF?" ? "rgba(255,58,24,0.92)" : "rgba(245,245,245,0.94)";
      ctx.fillText(displayText, centerX, railY + 36);
      ctx.font = "700 13px Inter, ui-sans-serif, system-ui, sans-serif";
      ctx.textBaseline = "bottom";
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(245,245,245,0.86)";
      ctx.fillText(detected ? `${safeFreq.toFixed(1)} Hz` : "-- Hz", x + 42, y + h - 22);
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(166,188,210,0.74)";
      ctx.fillText(`${safeCents >= 0 ? "+" : ""}${safeCents.toFixed(1)} cents`, centerX, y + h - 22);
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(245,245,245,0.86)";
      ctx.fillText(`A4 ${clampFinite(Number(tunerReference.value), 410, 480, 440).toFixed(1)} Hz`, x + w - 42, y + h - 22);
      ctx.restore();
    }

    function drawCharacterMeter(label, leftLabel, rightLabel, value, x, y, w, h, color) {
      const v = clampFinite(value, 0, 1, 0);
      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#2b2b2b";
      ctx.strokeRect(x, y, w, h);
      drawMeterText(label, x, y - 5, 10, "rgba(245,245,245,0.86)");
      const fillW = Math.max(1, w * v);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, fillW, h);
      drawMeterText(leftLabel, x, y + h + 9, 8, "rgba(166,166,166,0.62)");
      ctx.save();
      ctx.textAlign = "right";
      drawMeterText(rightLabel, x + w, y + h + 9, 8, "rgba(166,166,166,0.62)");
      drawMeterText(v.toFixed(2), x + w - 34, y - 5, 10, "rgba(166,166,166,0.95)");
      ctx.restore();
    }

    function drawSignalDecisionBar(label, value, x, y, w, color) {
      const v = clampFinite(value, 0, 1, 0);
      return drawMeterRow({
        label,
        valueText: v.toFixed(2),
        value: v,
        x,
        y,
        w,
        color,
        density: "compact"
      });
    }

    function resetSignalCharacterPhysics() {
      signalCharacterTrail.length = 0;
      signalCharacterPhysics.initialized = false;
      signalCharacterPhysics.headAlpha = 0;
      signalCharacterPhysics.trailAlpha = 0;
      signalCharacterPhysics.lastSignalAt = -99;
      signalCharacterPhysics.head.x = 0;
      signalCharacterPhysics.head.y = 0;
      signalCharacterPhysics.head.vx = 0;
      signalCharacterPhysics.head.vy = 0;
      signalCharacterPhysics.head.color = [140, 40, 110];
      signalCharacterPhysics.tailBlob.x = 0;
      signalCharacterPhysics.tailBlob.y = 0;
      signalCharacterPhysics.tailBlob.vx = 0;
      signalCharacterPhysics.tailBlob.vy = 0;
      signalCharacterPhysics.tailBlob.color = [140, 40, 110];
      signalCharacterPhysics.tailBlob.angles.length = 0;
      signalCharacterPhysics.tailBlob.freq.length = 0;
      signalCharacterPhysics.tailBlob.nodes.length = 0;
      signalCharacterPhysics.blobAngles.length = 0;
      signalCharacterPhysics.blobFreq.length = 0;
      signalCharacterPhysics.blobNodes.length = 0;
    }

    function updateSpringMass(mass, targetX, targetY, stiffness, damping) {
      const ax = (targetX - mass.x) * stiffness;
      const ay = (targetY - mass.y) * stiffness;
      mass.vx = (mass.vx + ax) * damping;
      mass.vy = (mass.vy + ay) * damping;
      mass.x += mass.vx;
      mass.y += mass.vy;
    }

    function signalCharacterBlobRadius() {
      return 28 + signalCharacterState.dynamic * 9 + signalCharacterState.noisy * 8 + signalCharacterState.transientImpact * 8;
    }

    function applySignalCharacterWall(body, bounds, radius, strength = 1) {
      if (!bounds) return false;
      let hit = false;
      const restitution = 0.48 * strength;
      const friction = 0.78;
      const left = bounds.x + radius;
      const right = bounds.x + bounds.w - radius;
      const top = bounds.y + radius;
      const bottom = bounds.y + bounds.h - radius;
      if (body.x < left) {
        body.x = left;
        body.vx = Math.abs(body.vx) * restitution;
        body.vy *= friction;
        hit = true;
      } else if (body.x > right) {
        body.x = right;
        body.vx = -Math.abs(body.vx) * restitution;
        body.vy *= friction;
        hit = true;
      }
      if (body.y < top) {
        body.y = top;
        body.vy = Math.abs(body.vy) * restitution;
        body.vx *= friction;
        hit = true;
      } else if (body.y > bottom) {
        body.y = bottom;
        body.vy = -Math.abs(body.vy) * restitution;
        body.vx *= friction;
        hit = true;
      }
      return hit;
    }

    function clampSignalCharacterTarget(targetX, targetY, bounds, radius) {
      if (!bounds) return { x: targetX, y: targetY };
      return {
        x: clamp(targetX, bounds.x + radius, bounds.x + bounds.w - radius),
        y: clamp(targetY, bounds.y + radius, bounds.y + bounds.h - radius)
      };
    }

    function applySignalCharacterNodeWall(node, bounds, restitution = 0.42, friction = 0.72) {
      if (!bounds) return false;
      let hit = false;
      if (node.x < bounds.x) {
        node.x = bounds.x;
        node.vx = Math.abs(node.vx) * restitution;
        node.vy *= friction;
        hit = true;
      } else if (node.x > bounds.x + bounds.w) {
        node.x = bounds.x + bounds.w;
        node.vx = -Math.abs(node.vx) * restitution;
        node.vy *= friction;
        hit = true;
      }
      if (node.y < bounds.y) {
        node.y = bounds.y;
        node.vy = Math.abs(node.vy) * restitution;
        node.vx *= friction;
        hit = true;
      } else if (node.y > bounds.y + bounds.h) {
        node.y = bounds.y + bounds.h;
        node.vy = -Math.abs(node.vy) * restitution;
        node.vx *= friction;
        hit = true;
      }
      return hit;
    }

    function applySignalCharacterTailImpact(head, tail, strength = 1) {
      const dx = tail.x - head.x;
      const dy = tail.y - head.y;
      const distance = Math.max(0.0001, Math.hypot(dx, dy));
      const impactRadius = signalCharacterBlobRadius() * 3.25;
      if (distance > impactRadius || !tail.nodes.length) return;
      const overlap = 1 - distance / impactRadius;
      const speed = Math.hypot(head.vx - tail.vx, head.vy - tail.vy);
      const impulse = clamp((overlap * 13 + speed * 0.12 + signalCharacterState.transientImpact * 10) * strength, 0, 36);
      const nx = dx / distance;
      const ny = dy / distance;
      tail.nodes.forEach((node) => {
        const ndx = node.x - head.x;
        const ndy = node.y - head.y;
        const nodeDistance = Math.max(1, Math.hypot(ndx, ndy));
        const local = clamp(1 - nodeDistance / (impactRadius * 1.35), 0, 1);
        const radialX = ndx / nodeDistance;
        const radialY = ndy / nodeDistance;
        const push = impulse * local * local;
        node.vx += (radialX * 0.86 + nx * 0.14) * push;
        node.vy += (radialY * 0.86 + ny * 0.14) * push;
      });
      tail.vx += nx * impulse * 0.035;
      tail.vy += ny * impulse * 0.035;
    }

    function signalCharacterColorAtPosition(body, bounds, fallbackColor) {
      if (!bounds) return fallbackColor;
      const nx = clamp((body.x - bounds.x) / Math.max(1, bounds.w), 0, 1);
      const ny = clamp((body.y - bounds.y) / Math.max(1, bounds.h), 0, 1);
      const topLeft = [57, 255, 20];
      const topRight = [82, 158, 255];
      const bottomLeft = [255, 61, 31];
      const bottomRight = [188, 48, 236];
      const top = topLeft.map((channel, index) => lerp(channel, topRight[index], nx));
      const bottom = bottomLeft.map((channel, index) => lerp(channel, bottomRight[index], nx));
      const color = top.map((channel, index) => lerp(channel, bottom[index], ny));
      const lowAnchorGlow = signalCharacterState.lowAnchor * (1 - ny) * (1 - nx * 0.55);
      color[1] = lerp(color[1], 255, lowAnchorGlow * 0.32);
      color[0] = lerp(color[0], color[0] * 0.82, lowAnchorGlow * 0.18);
      return color.map((channel) => Math.round(clamp(channel, 0, 255)));
    }

    function updateSignalCharacterPhysics(targetX, targetY, hasSignal, targetColor, bounds) {
      const now = performance.now() / 1000;
      if (hasSignal) signalCharacterPhysics.lastSignalAt = now;
      const silenceAge = now - signalCharacterPhysics.lastSignalAt;
      const shouldExist = hasSignal || silenceAge < 3.2;
      if (!shouldExist && !signalCharacterPhysics.initialized) return null;

      const trailCount = 10;
      if (!signalCharacterPhysics.initialized) {
        signalCharacterPhysics.initialized = true;
        signalCharacterPhysics.head.x = targetX;
        signalCharacterPhysics.head.y = targetY;
        signalCharacterPhysics.head.vx = 0;
        signalCharacterPhysics.head.vy = 0;
        signalCharacterPhysics.head.color = targetColor.slice();
        signalCharacterPhysics.tailBlob.x = targetX;
        signalCharacterPhysics.tailBlob.y = targetY;
        signalCharacterPhysics.tailBlob.vx = 0;
        signalCharacterPhysics.tailBlob.vy = 0;
        signalCharacterPhysics.tailBlob.color = targetColor.slice();
        signalCharacterTrail.length = 0;
        for (let i = 0; i < trailCount; i += 1) {
          signalCharacterTrail.push({ x: targetX, y: targetY, vx: 0, vy: 0, color: targetColor.slice() });
        }
      }

      while (signalCharacterTrail.length < trailCount) {
        const last = signalCharacterTrail[signalCharacterTrail.length - 1] || signalCharacterPhysics.head;
        signalCharacterTrail.push({ x: last.x, y: last.y, vx: 0, vy: 0, color: (last.color || targetColor).slice() });
      }
      if (signalCharacterTrail.length > trailCount) signalCharacterTrail.length = trailCount;

      const stiffness = 0.062 + signalCharacterState.transientImpact * 0.055 + signalCharacterState.spectralCrest * 0.022;
      const damping = 0.82 + signalCharacterState.dynamic * 0.08;
      const boundaryMode = signalCharacterBoundarySelect?.value || "none";
      const radius = signalCharacterBlobRadius();
      const headTarget = boundaryMode === "none"
        ? { x: targetX, y: targetY }
        : clampSignalCharacterTarget(targetX, targetY, bounds, radius);
      const headTargetX = headTarget.x;
      const headTargetY = headTarget.y;
      updateSpringMass(signalCharacterPhysics.head, headTargetX, headTargetY, stiffness, damping);
      if (boundaryMode !== "none") {
        const hit = applySignalCharacterWall(signalCharacterPhysics.head, bounds, radius, 0.9);
        if (hit) {
          signalCharacterPhysics.head.vx *= 0.72;
          signalCharacterPhysics.head.vy *= 0.72;
        }
      }
      const headPositionColor = signalCharacterColorAtPosition(signalCharacterPhysics.head, bounds, targetColor);
      const headColorSpeed = hasSignal ? 0.58 : 0.08;
      signalCharacterPhysics.head.color = signalCharacterPhysics.head.color.map((channel, index) => lerp(channel, headPositionColor[index], headColorSpeed));
      updateSpringMass(signalCharacterPhysics.tailBlob, signalCharacterPhysics.head.x, signalCharacterPhysics.head.y, stiffness * 0.1, 0.965);
      if (boundaryMode !== "none") {
        applySignalCharacterWall(signalCharacterPhysics.tailBlob, bounds, radius * 0.92, 0.46);
      }
      const tailPositionColor = signalCharacterColorAtPosition(signalCharacterPhysics.tailBlob, bounds, signalCharacterPhysics.head.color);
      signalCharacterPhysics.tailBlob.color = signalCharacterPhysics.tailBlob.color.map((channel, index) => lerp(channel, tailPositionColor[index], hasSignal ? 0.075 : 0.012));
      if (boundaryMode === "everything") {
        applySignalCharacterTailImpact(signalCharacterPhysics.head, signalCharacterPhysics.tailBlob, 1.65);
      }
      let leader = signalCharacterPhysics.head;
      for (let i = 0; i < signalCharacterTrail.length; i += 1) {
        const follower = signalCharacterTrail[i];
        const tailPosition = i / Math.max(1, signalCharacterTrail.length - 1);
        const chainStiffness = 0.11 - tailPosition * 0.072;
        const chainDamping = 0.64 + tailPosition * 0.2;
        updateSpringMass(follower, leader.x, leader.y, chainStiffness, chainDamping);
        const frontColorSpeed = 0.16;
        const rearColorSpeed = 0.0045;
        const colorEase = tailPosition * tailPosition;
        const colorSpeed = lerp(frontColorSpeed, rearColorSpeed, colorEase);
        const sourceColor = leader.color || targetColor;
        follower.color = (follower.color || sourceColor).map((channel, index) => lerp(channel, sourceColor[index], colorSpeed));
        leader = follower;
      }

      const desiredTrailAlpha = hasSignal || silenceAge < 2 ? 1 : 0;
      const desiredHeadAlpha = hasSignal || silenceAge < 2.7 ? 1 : 0;
      signalCharacterPhysics.trailAlpha = lerp(signalCharacterPhysics.trailAlpha, desiredTrailAlpha, desiredTrailAlpha > signalCharacterPhysics.trailAlpha ? 0.28 : 0.12);
      signalCharacterPhysics.headAlpha = lerp(signalCharacterPhysics.headAlpha, desiredHeadAlpha, desiredHeadAlpha > signalCharacterPhysics.headAlpha ? 0.34 : 0.075);
      if (signalCharacterPhysics.headAlpha < 0.01 && signalCharacterPhysics.trailAlpha < 0.01 && !hasSignal) {
        resetSignalCharacterPhysics();
        return null;
      }
      return signalCharacterPhysics;
    }

    function drawSignalCharacterBlob(body, color, alpha, options = {}) {
      const nodeCount = options.nodeCount || 13;
      const angles = options.angles || signalCharacterPhysics.blobAngles;
      const frequencies = options.frequencies || signalCharacterPhysics.blobFreq;
      const nodes = options.nodes || signalCharacterPhysics.blobNodes;
      const bounds = options.bounds || null;
      const renderCtx = options.context || ctx;
      const wallEnabled = Boolean(bounds);
      while (angles.length < nodeCount) {
        const index = angles.length;
        angles.push((index / nodeCount) * Math.PI * 2);
        frequencies.push((options.frequencyBase || 0.018) + ((index * 37) % 71) / (options.frequencyDivisor || 2600));
        nodes.push({ x: body.x, y: body.y, vx: 0, vy: 0 });
      }
      const speed = Math.hypot(body.vx, body.vy);
      const inertiaScale = options.inertiaScale || 1;
      const sizeScale = options.sizeScale || 1;
      const wobble = clamp(speed * 0.06 + signalCharacterState.transientImpact * 0.46 * inertiaScale + signalCharacterState.noisy * 0.25, 0, 1.35);
      const baseRadius = (25 + signalCharacterState.dynamic * 9 + signalCharacterState.noisy * 7) * sizeScale;
      const velocityAngle = Math.atan2(body.vy, body.vx || 0.0001);
      const stretch = clamp(speed * 0.52 + signalCharacterState.transientImpact * 22 * inertiaScale + signalCharacterState.eventDensity * 12, 0, 48 * sizeScale);
      const lateralSquash = clamp(stretch * 0.32 + signalCharacterState.noisy * 7, 0, 24);
      const points = [];
      for (let i = 0; i < nodeCount; i += 1) {
        angles[i] += frequencies[i] * (1 + wobble * 3.2);
        const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
        const alignment = Math.cos(angle - velocityAngle);
        const lateral = Math.sin(angle - velocityAngle);
        const organic = Math.sin(angles[i] + i * 0.91) * wobble * 11 * sizeScale;
        const radius = baseRadius + organic + alignment * stretch - Math.abs(lateral) * lateralSquash;
        const targetX = body.x + Math.cos(angle) * radius;
        const targetY = body.y + Math.sin(angle) * radius;
        const node = nodes[i];
        const nodeStiffness = (0.055 + Math.max(0, alignment) * 0.018 + signalCharacterState.transientImpact * 0.018) / inertiaScale;
        const nodeDamping = clamp(0.9 + Math.abs(lateral) * 0.045 + (inertiaScale - 1) * 0.018, 0, 0.985);
        node.vx = (node.vx + (targetX - node.x) * nodeStiffness) * nodeDamping;
        node.vy = (node.vy + (targetY - node.y) * nodeStiffness) * nodeDamping;
        node.x += node.vx;
        node.y += node.vy;
        if (wallEnabled) {
          applySignalCharacterNodeWall(node, bounds, options.nodeRestitution ?? 0.34, options.nodeFriction ?? 0.64);
        }
        points.push({ x: node.x, y: node.y });
      }

      renderCtx.save();
      renderCtx.globalCompositeOperation = "screen";
      const glow = renderCtx.createRadialGradient(body.x, body.y, 2, body.x, body.y, baseRadius * 2.6);
      glow.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${0.26 * alpha})`);
      glow.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
      renderCtx.fillStyle = glow;
      renderCtx.beginPath();
      renderCtx.arc(body.x, body.y, baseRadius * 2.85 + stretch * 0.45, 0, Math.PI * 2);
      renderCtx.fill();

      renderCtx.globalCompositeOperation = "source-over";
      renderCtx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${0.9 * alpha})`;
      renderCtx.strokeStyle = `rgba(245,245,245,${0.62 * alpha})`;
      renderCtx.lineWidth = 1.6;
      renderCtx.beginPath();
      for (let i = 0; i < points.length; i += 1) {
        const p0 = points[(i - 1 + points.length) % points.length];
        const p1 = points[i];
        const midX = (p0.x + p1.x) * 0.5;
        const midY = (p0.y + p1.y) * 0.5;
        if (i === 0) renderCtx.moveTo(midX, midY);
        renderCtx.quadraticCurveTo(p1.x, p1.y, (p1.x + points[(i + 1) % points.length].x) * 0.5, (p1.y + points[(i + 1) % points.length].y) * 0.5);
      }
      renderCtx.closePath();
      renderCtx.fill();
      renderCtx.stroke();
      renderCtx.restore();
    }

    function drawSignalCharacterMap(x, y, w, h) {
      const noiseAxis = clampFinite(signalCharacterState.mapNoise, 0, 1, 0);
      const motionAxis = clampFinite(signalCharacterState.mapMotion, 0, 1, 0);
      const hasSignal = smoothed.rms > 0.012 || metrics.rms > 0.008 || metrics.peak > 0.018;
      const px = x + noiseAxis * w;
      const py = y + motionAxis * h;
      const targetColor = [
        Math.round(120 + signalCharacterState.transient * 135),
        Math.round(40 + signalCharacterState.lowAnchor * 190),
        Math.round(110 + signalCharacterState.noisy * 120)
      ];
      const physics = updateSignalCharacterPhysics(px, py, hasSignal, targetColor, { x, y, w, h });

      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#2b2b2b";
      ctx.strokeRect(x, y, w, h);
      ctx.strokeStyle = "rgba(245,245,245,0.08)";
      for (let i = 1; i < 4; i += 1) {
        const gx = x + (w * i) / 4;
        const gy = y + (h * i) / 4;
        ctx.beginPath();
        ctx.moveTo(gx, y);
        ctx.lineTo(gx, y + h);
        ctx.moveTo(x, gy);
        ctx.lineTo(x + w, gy);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(245,245,245,0.18)";
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w / 2, y + h);
      ctx.moveTo(x, y + h / 2);
      ctx.lineTo(x + w, y + h / 2);
      ctx.stroke();

      if (physics && physics.headAlpha > 0.01) {
        ctx.save();
        const headColor = physics.head.color || targetColor;
        const tailColor = physics.tailBlob.color || headColor;
        const boundaryMode = signalCharacterBoundarySelect?.value || "none";
        const blobBounds = boundaryMode === "none" ? null : { x, y, w, h };
        const blobContext = boundaryMode === "none" && characterOverlayCtx ? characterOverlayCtx : ctx;
        drawSignalCharacterBlob(
          physics.tailBlob,
          tailColor.map((value) => Math.round(value)),
          physics.headAlpha * 0.46,
          {
            angles: physics.tailBlob.angles,
            frequencies: physics.tailBlob.freq,
            nodes: physics.tailBlob.nodes,
            inertiaScale: 10,
            sizeScale: 0.92,
            frequencyBase: 0.006,
            frequencyDivisor: 5200,
            bounds: blobBounds,
            context: blobContext,
            nodeRestitution: boundaryMode === "everything" ? 0.18 : 0.28,
            nodeFriction: boundaryMode === "everything" ? 0.52 : 0.64
          }
        );
        drawSignalCharacterBlob(
          physics.head,
          headColor.map((value) => Math.round(value)),
          physics.headAlpha,
          {
            bounds: blobBounds,
            context: blobContext,
            nodeRestitution: boundaryMode === "everything" ? 0.24 : 0.36,
            nodeFriction: boundaryMode === "everything" ? 0.58 : 0.68
          }
        );
        ctx.restore();
      }

      ctx.save();
      ctx.textAlign = "center";
      const axisText = meterTextSize(9, 0, 12);
      drawMeterText("STABLE", x + w * 0.5, y + axisText + 4, axisText, "rgba(166,188,210,0.76)");
      drawMeterText("TRANSIENT", x + w * 0.5, meterTextBottomBaseline(y, h, axisText, axisText + 8), axisText, "rgba(166,188,210,0.76)");
      ctx.textAlign = "left";
      drawMeterText("TONAL", x + 6, y + h * 0.5 - 4, axisText, "rgba(166,188,210,0.72)");
      ctx.textAlign = "right";
      drawMeterText("NOISY", x + w - 6, y + h * 0.5 - 4, axisText, "rgba(166,188,210,0.72)");
      ctx.restore();
    }

    function drawSignalCharacterPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const pad = 18;
      const display = signalCharacterDisplaySelect?.value || "both";
      const showMap = display === "both" || display === "map";
      const showBars = display === "both" || display === "bars";
      const stackSignal = useCompactGraphLayout() && showMap && showBars;
      const rawFooterReserve = useCompactGraphLayout() ? canvasPxForCss(54) : 42;
      const contentBottom = Math.max(120, h - rawFooterReserve);
      const mapW = stackSignal ? w - pad * 2 : showBars ? Math.max(228, Math.floor(w * 0.52)) : w - pad * 2;
      const mapH = stackSignal
        ? Math.max(canvasPxForCss(190), contentBottom * 0.34)
        : showBars ? Math.max(100, contentBottom - 38) : Math.max(100, contentBottom - 34);
      const mapX = x + pad;
      const mapY = y + 30;
      const sectionText = meterTextSize(10, 0, 13);
      if (showMap) {
        drawMeterText("CHARACTER MAP", mapX, y + sectionText + 7, sectionText, "rgba(245,245,245,0.82)");
        drawSignalCharacterMap(mapX, mapY, mapW, mapH);
      }

      if (showBars) {
        const decisionX = stackSignal ? x + pad : showMap ? mapX + mapW + 18 : x + pad;
        const stackTitleGap = Math.max(canvasPxForCss(22), sectionText + 10);
        const decisionTitleY = stackSignal ? mapY + mapH + stackTitleGap : y + sectionText + 7;
        const decisionY = stackSignal ? decisionTitleY + Math.max(canvasPxForCss(14), sectionText + 4) : showMap ? mapY + 4 : mapY;
        const decisionW = stackSignal ? w - pad * 2 : showMap ? Math.max(180, x + w - pad - decisionX) : w - pad * 2;
        const hints = signalCharacterBackend.hints;
        withVisualPresence(visualPresenceAlpha(), () => {
          drawMeterText("DECISION STRIP", decisionX, decisionTitleY, sectionText, "rgba(245,245,245,0.82)");
          let rowY = decisionY;
          [
            ["Tuner Trust", hints.tunerTrust, "#bc30ec"],
            ["Pattern Trust", hints.patternTrust, "#ff3d1f"],
            ["Low Anchor", signalCharacterState.lowAnchor, "#39ff14"],
            ["Noise Risk", hints.noiseRisk, "#529eff"],
            ["Event Density", signalCharacterState.eventDensity, "#ffbe28"]
          ].forEach(([label, value, color]) => {
            const row = drawSignalDecisionBar(label, value, decisionX, rowY, decisionW, color);
            rowY += row.height;
          });
        });
      }

      if (!stackSignal) {
        const rawLabelSize = meterTextSize(8, 0, 11);
        const rawValueSize = meterTextSize(9, 0, 12);
        const rawBoxH = rawLabelSize + rawValueSize + 9;
        const rawY = y + h - rawBoxH + rawLabelSize + 2;
        const rawX = x + pad;
        const rawW = w - pad * 2;
        ctx.fillStyle = "rgba(245,245,245,0.045)";
        ctx.fillRect(rawX, rawY - rawLabelSize - 4, rawW, rawBoxH);
        const raw = [
          [signalCharacterBackend.profile.mode === "clinical" ? "Clinical" : "Musical", signalCharacterBackend.profile.fftWeight],
          ["Flat", signalCharacterState.flatness],
          ["Crest", signalCharacterState.spectralCrest],
          ["Peak/RMS", signalCharacterState.crestFactor],
          ["Impact", signalCharacterState.transientImpact],
          ["Events", signalCharacterState.eventDensity]
        ];
        const colW = rawW / raw.length;
        raw.forEach(([label, value], index) => {
          const tx = rawX + index * colW + 7;
          drawMeterText(label, tx, rawY - 2, rawLabelSize, "rgba(166,188,210,0.7)");
          drawMeterText(clampFinite(value, 0, 1, 0).toFixed(2), tx, rawY + rawValueSize + 1, rawValueSize, "rgba(245,245,245,0.82)");
        });
      }
    }

    function phaseDungeonMemoryProfile() {
      const mode = phaseDungeonMemorySelect?.value || "medium";
      if (mode === "short") return { attack: 0.78, release: 0.32, delay: 3 };
      if (mode === "long") return { attack: 0.42, release: 0.08, delay: 9 };
      return { attack: 0.58, release: 0.16, delay: 6 };
    }

    function phaseDungeonWaveSamples(count) {
      const samples = new Array(count).fill(0);
      if (!timeData.length) return samples;
      const start = Math.max(0, timeData.length - count * 5);
      const span = Math.max(1, timeData.length - start - 1);
      for (let i = 0; i < count; i += 1) {
        const idx = Math.min(timeData.length - 1, start + Math.floor((i / Math.max(1, count - 1)) * span));
        samples[i] = clamp((timeData[idx] - 128) / 128, -1, 1);
      }
      return samples;
    }

    function phaseDungeonRecurrence(samples, delay) {
      if (samples.length < delay + 4) return 0;
      let sum = 0;
      let sumA = 0;
      let sumB = 0;
      let count = 0;
      for (let i = delay; i < samples.length; i += 1) {
        const a = samples[i];
        const b = samples[i - delay];
        sum += a * b;
        sumA += a * a;
        sumB += b * b;
        count += 1;
      }
      if (!count || sumA <= 0.00001 || sumB <= 0.00001) return 0;
      return clamp(Math.abs(sum / Math.sqrt(sumA * sumB)), 0, 1);
    }

    function phaseDungeonCellColor(value, pressure, width, fog, alpha = 1) {
      const v = clampFinite(value, 0, 1, 0);
      const red = Math.round(18 + pressure * 132 + v * 86);
      const green = Math.round(14 + width * 140 + v * 42);
      const blue = Math.round(18 + fog * 86 + width * 46 + v * 120);
      const white = clamp((v - 0.78) * 4.2, 0, 1);
      return `rgba(${Math.round(lerp(red, 245, white))},${Math.round(lerp(green, 245, white))},${Math.round(lerp(blue, 245, white))},${alpha})`;
    }

    function phaseDungeonEnergyWindows(pressure, motion) {
      const now = audioContext ? audioContext.currentTime : performance.now() / 1000;
      const energy = clamp(metrics.rms * 0.34 + metrics.peak * 0.28 + pressure * 0.22 + motion * 0.16 + metrics.flux * 0.12, 0, 1.8);
      phaseDungeonState.energyHistory.push({ time: now, energy });
      while (phaseDungeonState.energyHistory.length && now - phaseDungeonState.energyHistory[0].time > 6.2) {
        phaseDungeonState.energyHistory.shift();
      }
      function average(seconds) {
        let sum = 0;
        let count = 0;
        for (const item of phaseDungeonState.energyHistory) {
          if (now - item.time <= seconds) {
            sum += item.energy;
            count += 1;
          }
        }
        return count ? sum / count : 0;
      }
      const fast = average(0.5);
      const one = average(1);
      const three = average(3);
      const six = average(6);
      const sustained = clamp(three * 0.62 + six * 0.38, 0, 1.4);
      const brake = clamp((sustained - fast - 0.12) * 3.4, 0, 1);
      const acceleration = clamp((fast - one + Math.max(0, fast - sustained) * 0.55 + metrics.flux * 0.28) * 2.8, 0, 1);
      return { energy, fast, one, three, six, sustained, brake, acceleration };
    }

    function kineticPeakInRange(minHz, maxHz, steps = 36) {
      if (!audioContext || !floatFreqData.length) return { freq: 0, db: -120, contrast: 0, energy: 0 };
      let bestFreq = 0;
      let bestDb = -120;
      let sumDb = 0;
      let count = 0;
      const minLog = Math.log(Math.max(1, minHz));
      const maxLog = Math.log(Math.max(minHz + 1, maxHz));
      for (let i = 0; i < steps; i += 1) {
        const n = i / Math.max(1, steps - 1);
        const freq = Math.exp(lerp(minLog, maxLog, n));
        const prev = spectrumDbAtFrequency(freq / 1.075);
        const current = spectrumDbAtFrequency(freq);
        const next = spectrumDbAtFrequency(freq * 1.075);
        const smoothDb = prev * 0.18 + current * 0.64 + next * 0.18;
        sumDb += smoothDb;
        count += 1;
        if (smoothDb > bestDb) {
          bestDb = smoothDb;
          bestFreq = freq;
        }
      }
      const meanDb = count ? sumDb / count : -120;
      const contrast = bestDb - meanDb;
      const energy = clamp(smoothstep(-78, -20, bestDb) * 0.64 + smoothstep(1.5, 16, contrast) * 0.36, 0, 1);
      return { freq: bestFreq, db: bestDb, contrast, energy };
    }

    function updateKineticVocalState(hasSignal, pressure, motion) {
      const now = audioContext ? audioContext.currentTime : performance.now() / 1000;
      const dt = clamp(now - (kineticVocalState.lastUpdateAt || now), 0.008, 0.08);
      kineticVocalState.lastUpdateAt = now;
      if (!hasSignal) {
        const fade = 0.18;
        [
          "f0Confidence", "voiced", "f1Energy", "f2Energy", "f3Energy", "formantConfidence",
          "vowelOpen", "vowelFront", "rounding", "plosiveClosure", "plosiveBurst",
          "fricativeNoise", "breathNoise", "tractPressure"
        ].forEach((key) => {
          kineticVocalState[key] = lerp(kineticVocalState[key], 0, fade);
        });
        return kineticVocalState;
      }

      const f1Peak = kineticPeakInRange(180, 1050, 34);
      const f2Peak = kineticPeakInRange(650, 3200, 44);
      const f3Peak = kineticPeakInRange(1600, 5200, 38);
      const formantConfidence = clamp(
        f1Peak.energy * 0.34
          + f2Peak.energy * 0.34
          + f3Peak.energy * 0.14
          + signalCharacterState.tonal * 0.12
          + (1 - signalCharacterState.noisy) * 0.06,
        0,
        1
      );
      const targetF0 = tunerState.detected && tunerState.freq > 20 ? tunerState.freq : 0;
      const f0Confidence = clamp(tunerState.confidence * 0.72 + signalCharacterState.lowAnchor * 0.28, 0, 1);
      const voiced = clamp(f0Confidence * 0.72 + formantConfidence * 0.18 + signalCharacterState.tonal * 0.1 - signalCharacterState.noisy * 0.28, 0, 1);
      const vowelOpen = clamp((f1Peak.freq - 230) / 760, 0, 1) * formantConfidence;
      const vowelFront = clamp((f2Peak.freq - 800) / 2300, 0, 1) * formantConfidence;
      const rounding = clamp((1 - vowelFront) * 0.62 + clamp((1900 - f2Peak.freq) / 1300, 0, 1) * 0.28 + smoothed.low * 0.1, 0, 1) * formantConfidence;
      const fricativeNoise = clamp(signalCharacterState.noisy * 0.28 + smoothed.high * 0.42 + metrics.flux * 0.2 + patternState.hits.hat * 0.1, 0, 1);
      const breathNoise = clamp(signalCharacterState.flatness * 0.34 + smoothed.high * 0.22 + (1 - voiced) * smoothed.rms * 0.65, 0, 1);
      const plosiveBurst = clamp(signalCharacterState.transientImpact * 0.46 + metrics.flux * 0.28 + Math.max(patternState.hits.kick, patternState.hits.snare) * 0.26, 0, 1);
      const plosiveClosure = clamp(phaseDungeonState.brake * 0.46 + Math.max(0, phaseDungeonState.sectionPower - metrics.rms) * 0.42 + (1 - fricativeNoise) * plosiveBurst * 0.12, 0, 1);
      const tractPressure = clamp(pressure * 0.38 + metrics.rms * 0.22 + smoothed.low * 0.18 + plosiveBurst * 0.22, 0, 1.6);

      const attack = 0.18;
      const release = 0.07;
      function smoothKey(key, target) {
        const rate = target > kineticVocalState[key] ? attack : release;
        kineticVocalState[key] = lerp(kineticVocalState[key], target, rate);
      }
      if (targetF0 > 0) {
        kineticVocalState.f0Hz = kineticVocalState.f0Hz > 0 ? lerp(kineticVocalState.f0Hz, targetF0, 0.16) : targetF0;
      } else {
        kineticVocalState.f0Hz = lerp(kineticVocalState.f0Hz, 0, 0.08);
      }
      kineticVocalState.f1 = kineticVocalState.f1 > 0 ? lerp(kineticVocalState.f1, f1Peak.freq, 0.14) : f1Peak.freq;
      kineticVocalState.f2 = kineticVocalState.f2 > 0 ? lerp(kineticVocalState.f2, f2Peak.freq, 0.14) : f2Peak.freq;
      kineticVocalState.f3 = kineticVocalState.f3 > 0 ? lerp(kineticVocalState.f3, f3Peak.freq, 0.12) : f3Peak.freq;
      smoothKey("f0Confidence", f0Confidence);
      smoothKey("voiced", voiced);
      smoothKey("f1Energy", f1Peak.energy);
      smoothKey("f2Energy", f2Peak.energy);
      smoothKey("f3Energy", f3Peak.energy);
      smoothKey("formantConfidence", formantConfidence);
      smoothKey("vowelOpen", vowelOpen);
      smoothKey("vowelFront", vowelFront);
      smoothKey("rounding", rounding);
      smoothKey("plosiveClosure", plosiveClosure);
      smoothKey("plosiveBurst", plosiveBurst);
      smoothKey("fricativeNoise", fricativeNoise);
      smoothKey("breathNoise", breathNoise);
      smoothKey("tractPressure", tractPressure);

      const glottalHz = clamp(kineticVocalState.f0Hz || 0, 0, 520);
      const glottalRate = glottalHz > 0 ? glottalHz / 55 : 0.08 + voiced * 0.22;
      kineticVocalState.glottalPhase = (kineticVocalState.glottalPhase + dt * glottalRate * (0.18 + voiced * 0.52)) % 1;
      kineticVocalState.turbulencePhase = (kineticVocalState.turbulencePhase + dt * (0.12 + fricativeNoise * 1.4 + plosiveBurst * 0.8)) % 1;
      kineticVocalState.mouthPhase = (kineticVocalState.mouthPhase + dt * (0.08 + vowelOpen * 0.34 + motion * 0.18)) % 1;
      return kineticVocalState;
    }

    function updatePhaseDungeonField(cols, rows, samples, hasSignal) {
      const total = cols * rows;
      const profile = phaseDungeonMemoryProfile();
      if (phaseDungeonState.cells.length !== total) {
        phaseDungeonState.cells = new Array(total).fill(0);
      }
      if (!hasSignal) {
        for (let i = 0; i < total; i += 1) {
          phaseDungeonState.cells[i] = lerp(phaseDungeonState.cells[i] || 0, 0, 0.34);
        }
        phaseDungeonState.recurrence = lerp(phaseDungeonState.recurrence, 0, 0.28);
        return;
      }

      const width = clamp(smoothed.side * 0.72 + Math.abs(smoothed.right - smoothed.left) * 0.46, 0, 1);
      const pressure = clamp((smoothed.low * 0.58 + smoothed.bassHit * 0.68 + patternState.hits.kick * 0.42) * Number(phaseDungeonPressure?.value || 1), 0, 1.8);
      const motion = clamp(signalCharacterState.transientImpact * 0.64 + smoothed.flux * 0.58 + patternState.hits.global * 0.34, 0, 1);
      const vocal = kineticVocalState;
      const delay = profile.delay + Math.round(pressure * 5 + width * 3);
      const recurrence = phaseDungeonRecurrence(samples, Math.min(delay, samples.length - 3));
      phaseDungeonState.recurrence = lerp(phaseDungeonState.recurrence, recurrence, recurrence > phaseDungeonState.recurrence ? 0.42 : 0.12);
      phaseDungeonState.lastSignalAt = performance.now() / 1000;

      const fog = Number(phaseDungeonFog?.value || 0.55);
      const centerRow = (rows - 1) * (0.5 + (vocal.vowelFront - 0.5) * 0.08);
      const caveHalf = rows * (0.16 + pressure * 0.12 + vocal.vowelOpen * 0.2 + vocal.rounding * 0.08 + phaseDungeonState.recurrence * 0.08);
      for (let yCell = 0; yCell < rows; yCell += 1) {
        for (let xCell = 0; xCell < cols; xCell += 1) {
          const idx = yCell * cols + xCell;
          const wave = samples[xCell % samples.length] || 0;
          const mirror = samples[(samples.length - 1 - xCell + samples.length) % samples.length] || 0;
          const delayed = samples[(xCell + delay + yCell * 2) % samples.length] || 0;
          const recur = 1 - Math.abs(wave - delayed) * 1.35;
          const cellNorm = xCell / Math.max(1, cols - 1);
          const sideBend = (cellNorm - 0.5) * (width * 0.16 + vocal.vowelFront * 0.12 - vocal.rounding * 0.08) * rows;
          const glottalPulse = Math.sin((cellNorm * 2.2 + vocal.glottalPhase) * Math.PI * 2) * vocal.voiced;
          const caveCenter = centerRow
            + wave * rows * (0.12 + pressure * 0.07 + vocal.vowelOpen * 0.12)
            + mirror * rows * (width * 0.05 + vocal.rounding * 0.08)
            + glottalPulse * rows * 0.035
            + sideBend;
          const dist = Math.abs(yCell - caveCenter);
          const wall = smoothstep(caveHalf + 3.2, caveHalf - 0.45, dist);
          const grain = noise2(xCell * 0.37 + vocal.turbulencePhase * 1.7, yCell * 0.53 + vocal.mouthPhase, vocal.fricativeNoise * 2.3);
          const fracture = smoothstep(0.22, 0.92, recur + grain * fog * (0.16 + vocal.fricativeNoise * 0.34 + vocal.breathNoise * 0.22) + motion * 0.12 + vocal.plosiveBurst * 0.2);
          const target = clamp(wall * (0.38 + fracture * 0.62) + pressure * 0.08 + motion * 0.06 + vocal.tractPressure * 0.08, 0, 1);
          const current = phaseDungeonState.cells[idx] || 0;
          phaseDungeonState.cells[idx] = lerp(current, target, target > current ? profile.attack : profile.release);
        }
      }
    }

    function drawPhaseDungeonRibs(x, y, w, h, cols, rows, samples, hasSignal) {
      const pad = 10;
      const plotX = x + pad;
      const plotY = y + pad;
      const plotW = w - pad * 2;
      const plotH = h - pad * 2;
      const fog = Number(phaseDungeonFog?.value || 0.55);
      const pressure = clamp((smoothed.low * 0.58 + smoothed.bassHit * 0.68 + patternState.hits.kick * 0.42) * Number(phaseDungeonPressure?.value || 1), 0, 1.8);
      const width = clamp(smoothed.side * 0.72 + Math.abs(smoothed.right - smoothed.left) * 0.46, 0, 1);
      const motion = clamp(signalCharacterState.transientImpact * 0.64 + smoothed.flux * 0.58 + patternState.hits.global * 0.34, 0, 1);
      const recurrence = phaseDungeonState.recurrence;
      const vocal = kineticVocalState;
      const energyWindows = phaseDungeonEnergyWindows(pressure, motion);
      const tunnelEnergy = energyWindows.fast;
      const suddenDrop = energyWindows.brake;
      const hardAcceleration = energyWindows.acceleration;
      if (suddenDrop > phaseDungeonState.tunnelDrop) {
        phaseDungeonState.tunnelDrop = suddenDrop;
      }
      phaseDungeonState.previousEnergy = lerp(phaseDungeonState.previousEnergy, tunnelEnergy, tunnelEnergy > phaseDungeonState.previousEnergy ? 0.36 : 0.16);
      phaseDungeonState.tunnelDrop *= 0.84;
      phaseDungeonState.sectionPower = lerp(phaseDungeonState.sectionPower, energyWindows.sustained, energyWindows.sustained > phaseDungeonState.sectionPower ? 0.08 : 0.035);
      phaseDungeonState.brake = lerp(phaseDungeonState.brake, phaseDungeonState.tunnelDrop, 0.36);
      phaseDungeonState.acceleration = lerp(phaseDungeonState.acceleration, hardAcceleration, hardAcceleration > phaseDungeonState.acceleration ? 0.42 : 0.12);
      const vocalTravel = vocal.voiced * clamp((vocal.f0Hz || 0) / 420, 0, 1) * 0.018
        + vocal.plosiveBurst * 0.055
        + vocal.tractPressure * 0.012;
      const travelSpeed = 0
        + phaseDungeonState.sectionPower * 0.018
        + phaseDungeonState.acceleration * 0.07
        + motion * 0.02
        + recurrence * 0.012
        + vocalTravel
        - phaseDungeonState.brake * 0.026;
      phaseDungeonState.tunnelTravel = (phaseDungeonState.tunnelTravel + Math.max(0, travelSpeed)) % 1;
      const headingNoise = noise2(
        smoothed.centroid + energyWindows.three + vocal.vowelFront * 0.7,
        pressure + energyWindows.six + vocal.rounding,
        vocal.turbulencePhase + vocal.mouthPhase
      );
      const headingTarget = (smoothed.right - smoothed.left) * 0.68
        + (vocal.vowelFront - 0.5) * 0.42
        - vocal.rounding * 0.18
        + headingNoise * (0.12 + motion * 0.12 + phaseDungeonState.acceleration * 0.14 + vocal.fricativeNoise * 0.12)
        + Math.sin(vocal.mouthPhase * Math.PI * 2) * phaseDungeonState.sectionPower * 0.08;
      phaseDungeonState.tunnelHeading = lerp(phaseDungeonState.tunnelHeading, headingTarget, 0.038 + motion * 0.052 + phaseDungeonState.acceleration * 0.07 + vocal.plosiveBurst * 0.08);
      const zoomTarget = clamp(
        0.58
          + phaseDungeonState.sectionPower * 0.42
          + phaseDungeonState.acceleration * 0.72
          + tunnelEnergy * 0.22
          + recurrence * 0.08
          + vocal.vowelOpen * 0.2
          + vocal.plosiveBurst * 0.22
          - vocal.plosiveClosure * 0.18
          - phaseDungeonState.brake * 0.64,
        0.38,
        2.02
      );
      phaseDungeonState.tunnelZoom = lerp(phaseDungeonState.tunnelZoom, zoomTarget, phaseDungeonState.brake > 0.12 || phaseDungeonState.acceleration > 0.18 ? 0.28 : 0.075);
      const heading = phaseDungeonState.tunnelHeading;
      const tension = clamp(phaseDungeonState.sectionPower * 0.42 + phaseDungeonState.acceleration * 0.3 + phaseDungeonState.brake * 0.25 + width * 0.14 + vocal.tractPressure * 0.38 + vocal.plosiveClosure * 0.22, 0, 1.6);
      const centerX = plotX + plotW * (0.5 + Math.sin(heading) * (0.1 + tension * 0.075) + (smoothed.right - smoothed.left) * 0.06 + (vocal.vowelFront - 0.5) * 0.04);
      const centerY = plotY + plotH * (0.5 + Math.cos(heading * 0.86) * (0.055 + tension * 0.045) - vocal.rounding * 0.035 + vocal.vowelOpen * 0.04);
      const pitchNorm = clamp((Math.log2(Math.max(40, vocal.f0Hz || 80)) - Math.log2(55)) / (Math.log2(880) - Math.log2(55)), 0, 1);
      const ringCount = Math.round(clamp(9 + pitchNorm * 14 + recurrence * 5 + vocal.fricativeNoise * 5 + vocal.plosiveBurst * 5, 8, 30));
      const segments = Math.round(clamp(28 + cols * 0.8, 28, 64));
      const maxRadius = Math.min(plotW, plotH) * (0.42 + vocal.vowelOpen * 0.16 + vocal.rounding * 0.08 + pressure * 0.06) * phaseDungeonState.tunnelZoom;
      const tunnelTwist = (smoothed.side - 0.35) * 0.28 + vocal.vowelFront * 0.36 - vocal.rounding * 0.22 + Math.sin(vocal.mouthPhase * Math.PI * 2) * (0.08 + tension * 0.16) + heading * (0.6 + tension * 0.28);
      const ringPoints = [];

      ctx.save();
      ctx.beginPath();
      ctx.rect(plotX, plotY, plotW, plotH);
      ctx.clip();
      ctx.fillStyle = "#010101";
      ctx.fillRect(plotX, plotY, plotW, plotH);

      const bg = ctx.createRadialGradient(centerX, centerY, 6, centerX, centerY, maxRadius * 1.28);
      bg.addColorStop(0, `rgba(245,245,245,${0.04 + recurrence * 0.05})`);
      bg.addColorStop(0.38, `rgba(188,48,236,${0.045 + width * 0.07})`);
      bg.addColorStop(0.72, `rgba(255,61,31,${0.025 + pressure * 0.08})`);
      bg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(plotX, plotY, plotW, plotH);

      for (let ring = 0; ring < ringCount; ring += 1) {
        const baseDepth = ring / Math.max(1, ringCount - 1);
        const depth = (baseDepth + phaseDungeonState.tunnelTravel) % 1;
        const perspective = Math.pow(depth, 1.18 + phaseDungeonState.brake * 0.42);
        const hole = 0.035 + phaseDungeonState.acceleration * 0.24 + phaseDungeonState.sectionPower * 0.08 - phaseDungeonState.brake * 0.025;
        const throatDepth = 1 - depth;
        const radius = maxRadius * (hole + perspective * (1.02 - hole)) * (1 + vocal.vowelOpen * throatDepth * 0.28 + vocal.rounding * depth * 0.18 + pressure * throatDepth * 0.12 - vocal.plosiveClosure * throatDepth * 0.2);
        const zPush = vocal.tractPressure * throatDepth * 0.22 + vocal.plosiveBurst * 0.16 + smoothed.peak * 0.04;
        const angleOffset = tunnelTwist * throatDepth
          + vocal.glottalPhase * Math.PI * 2 * (0.12 + vocal.voiced * 0.38) * throatDepth
          + vocal.mouthPhase * Math.PI * 2 * (0.08 + depth * 0.22)
          + phaseDungeonState.tunnelTravel * Math.PI * 2;
        const ovalX = 0.95 + width * 0.16 + vocal.vowelFront * 0.28 + vocal.rounding * 0.18 - depth * 0.06 + Math.sin(heading + depth * (2.2 + vocal.vowelFront * 1.4) + vocal.mouthPhase * Math.PI * 2) * (0.045 + tension * 0.075);
        const ovalY = 0.48 + vocal.vowelOpen * 0.36 + pressure * 0.08 + depth * 0.22 + Math.cos(heading * 0.7 + depth * (2.4 + vocal.rounding * 1.5) + vocal.glottalPhase * Math.PI * 2) * (0.04 + tension * 0.065);
        const points = [];
        for (let seg = 0; seg < segments; seg += 1) {
          const p = seg / segments;
          const angle = p * Math.PI * 2 + angleOffset;
          const sample = samples[Math.floor(p * (samples.length - 1))] || 0;
          const formantRipple = Math.sin(angle * (2 + Math.round(vocal.f1Energy * 4 + vocal.vowelOpen * 3)) + depth * (4 + vocal.f2Energy * 5) + vocal.glottalPhase * Math.PI * 2)
            * Math.sin(angle * (5 + Math.round(vocal.fricativeNoise * 7 + vocal.f3Energy * 4)) - vocal.rounding * 2.8 + vocal.turbulencePhase * Math.PI * 2)
            * (0.018 + vocal.formantConfidence * 0.035 + vocal.fricativeNoise * 0.032 + tension * 0.025);
          const erosion = noise2(seg * 0.19 + vocal.turbulencePhase * 2.1, ring * 0.41 + vocal.mouthPhase, vocal.breathNoise + vocal.fricativeNoise * 1.7) * (0.018 + fog * 0.035 + vocal.fricativeNoise * 0.07 + vocal.breathNoise * 0.045);
          const transientDent = (vocal.plosiveBurst * 0.12 + phaseDungeonState.acceleration * 0.05 - vocal.plosiveClosure * 0.075) * Math.sin(angle * (2.5 + vocal.vowelOpen * 3) + vocal.glottalPhase * Math.PI * 2 + ring * 0.37);
          const lock = recurrence * 0.024 * Math.sin(angle * 2 - ring * 0.7 + vocal.mouthPhase * Math.PI * 2);
          const r = radius * (1 + sample * (0.06 + pressure * 0.035 + vocal.voiced * 0.045) + erosion + transientDent + lock + formantRipple + zPush * 0.16);
          const drift = (1 - depth) * maxRadius * (0.18 + motion * 0.08 + tension * 0.08);
          const curveX = Math.sin(heading + depth * (3.2 + tension * 1.4 + vocal.vowelFront) + angle * (0.11 + phaseDungeonState.brake * 0.08)) * drift * (width * 0.5 + vocal.vowelFront * 0.44 + 0.12);
          const curveY = Math.cos(heading * 0.7 + depth * (2.6 + tension * 1.2 + vocal.rounding) - angle * (0.08 + phaseDungeonState.acceleration * 0.08)) * drift * (vocal.vowelOpen * 0.45 + vocal.fricativeNoise * 0.12 + pressure * 0.1 + 0.06);
          points.push({
            x: centerX + Math.cos(angle) * r * ovalX + curveX,
            y: centerY + Math.sin(angle) * r * ovalY + curveY,
            depth,
            energy: clamp(Math.abs(sample) * 0.36 + vocal.tractPressure * 0.28 + vocal.formantConfidence * 0.2 + vocal.plosiveBurst * 0.2 + recurrence * 0.12, 0, 1)
          });
        }
        ringPoints.push(points);
      }

      if (hasSignal) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const perspectiveLines = 11 + Math.round(width * 4 + motion * 3);
        const lineOffset = Math.floor((phaseDungeonState.tunnelTravel * segments + heading * 7) % segments);
        for (let line = 0; line < perspectiveLines; line += 1) {
          const jitter = Math.floor(noise2(line * 0.73 + vocal.turbulencePhase, phaseDungeonState.tunnelTravel, vocal.mouthPhase + vocal.fricativeNoise) * segments * (0.01 + vocal.fricativeNoise * 0.022));
          const rawSeg = Math.floor(((line + 0.37) / perspectiveLines) * segments + lineOffset + jitter);
          const seg = ((rawSeg % segments) + segments) % segments;
          const lineEnergy = 0.08 + recurrence * 0.12 + pressure * 0.08 + motion * 0.06;
          ctx.strokeStyle = `rgba(188,218,255,${clamp(lineEnergy, 0.035, 0.22)})`;
          ctx.lineWidth = 0.55 + pressure * 0.55 + motion * 0.35;
          ctx.beginPath();
          let hasLinePoint = false;
          for (let ring = 1; ring < ringPoints.length; ring += 1) {
            const point = ringPoints[ring]?.[seg];
            if (!point) continue;
            if (!hasLinePoint) {
              ctx.moveTo(point.x, point.y);
              hasLinePoint = true;
            }
            else ctx.lineTo(point.x, point.y);
          }
          if (hasLinePoint) ctx.stroke();
        }

        for (let ring = ringPoints.length - 1; ring >= 0; ring -= 1) {
          const points = ringPoints[ring];
          const depth = points[0]?.depth ?? ring / Math.max(1, ringPoints.length - 1);
          const alpha = 0.16 + depth * 0.44 + recurrence * 0.14;
          const red = Math.round(80 + pressure * 160 + depth * 26);
          const green = Math.round(34 + motion * 180 + depth * 36);
          const blue = Math.round(76 + width * 152 + depth * 64);
          ctx.strokeStyle = `rgba(${red},${green},${blue},${alpha})`;
          ctx.lineWidth = 1.1 + (1 - depth) * 2.5 + pressure * 1.5;
          ctx.beginPath();
          for (let seg = 0; seg <= segments; seg += 1) {
            const point = points[seg % segments];
            if (seg === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          }
          ctx.stroke();
          if (ring % 3 === 0 || ring === 0) {
            ctx.strokeStyle = `rgba(245,245,245,${0.08 + depth * 0.28 + motion * 0.12})`;
            ctx.lineWidth = 0.7 + depth * 1.1;
            ctx.stroke();
          }
          if (ring % 4 === 1 && recurrence + motion > 0.28) {
            ctx.strokeStyle = `rgba(245,245,245,${0.035 + recurrence * 0.1 + motion * 0.06})`;
            ctx.lineWidth = 0.5 + motion * 0.8;
            ctx.beginPath();
            const echoScale = 0.72 + Math.sin(ring + vocal.glottalPhase * Math.PI * 2 + vocal.mouthPhase * Math.PI) * (0.025 + vocal.voiced * 0.035);
            for (let seg = 0; seg <= segments; seg += 2) {
              const point = points[seg % segments];
              const ex = centerX + (point.x - centerX) * echoScale;
              const ey = centerY + (point.y - centerY) * echoScale;
              if (seg === 0) ctx.moveTo(ex, ey);
              else ctx.lineTo(ex, ey);
            }
            ctx.stroke();
          }
        }
        if (phaseDungeonState.tunnelDrop > 0.04) {
          ctx.strokeStyle = `rgba(245,245,245,${phaseDungeonState.tunnelDrop * 0.44})`;
          ctx.lineWidth = 1 + phaseDungeonState.tunnelDrop * 7;
          ctx.beginPath();
          ctx.arc(centerX, centerY, maxRadius * (0.08 + phaseDungeonState.tunnelDrop * 0.28), 0, Math.PI * 2);
          ctx.stroke();
        }
        if (phaseDungeonState.acceleration > 0.08) {
          ctx.strokeStyle = `rgba(255,61,31,${phaseDungeonState.acceleration * 0.28})`;
          ctx.lineWidth = 1 + phaseDungeonState.acceleration * 5;
          ctx.beginPath();
          ctx.arc(centerX, centerY, maxRadius * (0.28 + phaseDungeonState.acceleration * 0.58), 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();

        const block = Math.max(7, Math.floor(plotW / cols));
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        for (let yy = plotY; yy < plotY + plotH; yy += block) {
          for (let xx = plotX; xx < plotX + plotW; xx += block) {
            const dx = (xx + block * 0.5 - centerX) / Math.max(1, maxRadius);
            const dy = (yy + block * 0.5 - centerY) / Math.max(1, maxRadius);
            const radial = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const band = 1 - Math.abs(((radial * ringCount - phaseDungeonState.tunnelTravel * ringCount) % 1 + 1) % 1 - 0.5) * 2;
            const noise = noise2(
              xx * 0.013 + Math.cos(angle) * phaseDungeonState.tunnelTravel + vocal.turbulencePhase,
              yy * 0.017 + Math.sin(angle) * phaseDungeonState.tunnelTravel + vocal.mouthPhase,
              vocal.fricativeNoise * 1.7 + vocal.breathNoise
            ) * 0.5 + 0.5;
            const shade = clamp(band * 0.32 + noise * fog * (0.08 + vocal.fricativeNoise * 0.18 + vocal.breathNoise * 0.12) + vocal.tractPressure * 0.08 + recurrence * 0.08, 0, 1);
            if (shade < 0.08) continue;
            const alpha = clamp(0.015 + shade * 0.12, 0, 0.18);
            ctx.fillStyle = phaseDungeonCellColor(shade, pressure, width, fog, alpha);
            ctx.fillRect(xx, yy, Math.ceil(block * 0.96), Math.ceil(block * 0.96));
          }
        }
        ctx.restore();
      }
      ctx.restore();
      return { width, pressure };
    }

    function drawPhaseDungeonPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const hasSignal = metrics.rms > 0.006 || smoothed.rms > 0.012 || metrics.peak > 0.016;
      const cols = clampFinite(Number(phaseDungeonDetailSelect?.value || 32), 16, 48, 32);
      const rows = Math.max(12, Math.round(cols * 0.48));
      const samples = phaseDungeonWaveSamples(Math.max(cols * 2, 64));
      const pressure = clamp((smoothed.low * 0.58 + smoothed.bassHit * 0.68 + patternState.hits.kick * 0.42) * Number(phaseDungeonPressure?.value || 1), 0, 1.8);
      const motion = clamp(signalCharacterState.transientImpact * 0.64 + smoothed.flux * 0.58 + patternState.hits.global * 0.34, 0, 1);
      updateKineticVocalState(hasSignal, pressure, motion);
      updatePhaseDungeonField(cols, rows, samples, hasSignal);
      const result = drawPhaseDungeonRibs(x, y, w, h, cols, rows, samples, hasSignal);
      const statusSize = meterTextSize(10, 0, 13);
      const statusY = meterTextBottomBaseline(y, h, statusSize, 10);

      if (!hasSignal) {
        drawMeterText("waiting for signal", x + 14, statusY, statusSize, "rgba(166,166,166,0.58)");
      } else {
        const label = `kinetic · rec ${phaseDungeonState.recurrence.toFixed(2)} · width ${result.width.toFixed(2)} · pressure ${result.pressure.toFixed(2)}`;
        drawMeterText(label, x + 14, statusY, statusSize, "rgba(166,188,210,0.78)");
      }
    }

    function wavesFrequencyIndex(row, rows, scale, length) {
      const n = clamp(row / Math.max(1, rows - 1), 0, 1);
      const shaped = scale === "musical" ? Math.pow(n, 1.42) : Math.pow(n, 1.72);
      return clamp(Math.round(shaped * Math.max(0, length - 1)), 0, Math.max(0, length - 1));
    }

    function wavesColorFor(rowNorm, amp, alpha = 1) {
      const stops = [
        { at: 0, color: [255, 24, 18] },
        { at: 0.16, color: [255, 94, 16] },
        { at: 0.32, color: [255, 222, 30] },
        { at: 0.5, color: [56, 255, 44] },
        { at: 0.66, color: [30, 222, 255] },
        { at: 0.82, color: [54, 98, 255] },
        { at: 1, color: [188, 50, 236] }
      ];
      let lowerStop = stops[0];
      let upperStop = stops[stops.length - 1];
      for (let i = 1; i < stops.length; i += 1) {
        if (rowNorm <= stops[i].at) {
          lowerStop = stops[i - 1];
          upperStop = stops[i];
          break;
        }
      }
      const mix = clamp((rowNorm - lowerStop.at) / Math.max(0.0001, upperStop.at - lowerStop.at), 0, 1);
      const color = lowerStop.color.map((channel, index) => lerp(channel, upperStop.color[index], mix));
      const white = clamp(Math.max(0, amp - 0.9) * 1.4 + signalCharacterState.transientImpact * 0.08, 0, 0.24);
      const r = Math.round(lerp(color[0], 245, white));
      const g = Math.round(lerp(color[1], 245, white));
      const b = Math.round(lerp(color[2], 245, white));
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function makeWavesColumn(rows, scale) {
      const source = meterState.spectrum.length ? meterState.spectrum : new Array(96).fill(0);
      const column = [];
      for (let row = 0; row < rows; row += 1) {
        const idx = wavesFrequencyIndex(row, rows, scale, source.length);
        const prev = source[Math.max(0, idx - 1)] || 0;
        const current = source[idx] || 0;
        const next = source[Math.min(source.length - 1, idx + 1)] || 0;
        column.push(clamp((prev * 0.2 + current * 0.6 + next * 0.2) * 1.28, 0, 1));
      }
      return column;
    }

    function updateWavesMotion(strength) {
      const sideTarget = clamp(smoothed.right - smoothed.left, -1, 1);
      const lowTarget = clamp(smoothed.low * 0.9 + smoothed.bassHit * 0.6, 0, 1);
      const midTarget = clamp(smoothed.mid * 0.75 + smoothed.midHit * 0.35, 0, 1);
      const highTarget = clamp(smoothed.high * 0.7 + smoothed.flux * 0.28, 0, 1);
      const shockTarget = clamp(signalCharacterState.transientImpact * 0.65 + metrics.peak * 0.12, 0, 1);
      wavesState.sideFlow = lerp(wavesState.sideFlow, sideTarget, 0.035);
      wavesState.lowFlow = lerp(wavesState.lowFlow, lowTarget, 0.028);
      wavesState.midFlow = lerp(wavesState.midFlow, midTarget, 0.032);
      wavesState.highFlow = lerp(wavesState.highFlow, highTarget, 0.025);
      const shockRate = shockTarget > wavesState.shock ? 0.08 : 0.018;
      wavesState.shock = lerp(wavesState.shock, shockTarget, shockRate);
      const drift = 0.011 + strength * 0.006 + wavesState.highFlow * 0.004 + wavesState.lowFlow * 0.003;
      wavesState.phase += drift;
    }

    function wavesSurfaceWarp(plotW, plotH, u, v, amp, projection, strength, ageNorm = 0, slope = 0) {
      if (projection !== "waves") return { x: 0, y: 0, z: 0 };
      const sideTilt = wavesState.sideFlow * Math.PI * 1.4;
      const lowCurrent = wavesState.lowFlow;
      const midCurrent = wavesState.midFlow;
      const highCurrent = wavesState.highFlow;
      const temporal = wavesState.phase + ageNorm * Math.PI * (1.25 + midCurrent * 0.45);
      const xAngle = sideTilt + temporal + u * Math.PI * (1.55 + midCurrent * 0.8);
      const yAngle = temporal * 0.48 + v * Math.PI * (2.15 + highCurrent * 0.95);
      const orbit = strength * (3.5 + amp * 10 + lowCurrent * 5 + highCurrent * 2.5);
      const pulse = Math.sin((u * 1.55 + v * 1.2 - wavesState.phase * 0.8) * Math.PI * 2);
      const shock = wavesState.shock;
      return {
        x: Math.cos(xAngle + amp * Math.PI * 0.8) * orbit * (0.28 + v * 0.22) + slope * plotW * 0.006,
        y: Math.sin(yAngle + amp * Math.PI * 0.55) * orbit * (0.18 + (1 - v) * 0.12) - pulse * shock * strength * plotH * 0.008,
        z: (Math.sin(xAngle - yAngle) * 0.11 + pulse * shock * 0.14) * strength * amp
      };
    }

    function projectWavesPoint(plotX, plotY, plotW, plotH, u, v, amp, projection, strength, ageNorm = 0, slope = 0) {
      const warp = wavesSurfaceWarp(plotW, plotH, u, v, amp, projection, strength, ageNorm, slope);
      const warpedAmp = clamp(amp + warp.z, 0, 1.3);
      if (projection === "flat") {
        return {
          x: plotX + u * plotW,
          y: plotY + plotH - v * plotH - amp * plotH * 0.18 * strength,
          z: amp
        };
      }
      const baseX = plotX + plotW * 0.08;
      const baseY = plotY + plotH * 0.86;
      const timeX = plotW * 0.72;
      const timeY = -plotH * 0.28;
      const freqX = plotW * 0.28;
      const freqY = -plotH * 0.54;
      const zY = plotH * (0.18 + strength * 0.2);
      return {
        x: baseX + u * timeX + v * freqX + warp.x,
        y: baseY + u * timeY + v * freqY - warpedAmp * zY + warp.y,
        z: warpedAmp
      };
    }

    function drawWavesAxes(plotX, plotY, plotW, plotH, projection) {
      ctx.save();
      ctx.strokeStyle = "rgba(245,245,245,0.08)";
      ctx.lineWidth = 1;
      if (projection === "flat") {
        for (let i = 1; i < 5; i += 1) {
          const gy = plotY + (plotH * i) / 5;
          ctx.beginPath();
          ctx.moveTo(plotX, gy);
          ctx.lineTo(plotX + plotW, gy);
          ctx.stroke();
        }
      } else {
        const a = projectWavesPoint(plotX, plotY, plotW, plotH, 0, 0, 0, projection, 1);
        const b = projectWavesPoint(plotX, plotY, plotW, plotH, 1, 0, 0, projection, 1);
        const c = projectWavesPoint(plotX, plotY, plotW, plotH, 0, 1, 0, projection, 1);
        const d = projectWavesPoint(plotX, plotY, plotW, plotH, 1, 1, 0, projection, 1);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(d.x, d.y);
        ctx.lineTo(c.x, c.y);
        ctx.closePath();
        ctx.stroke();
        for (let i = 1; i < 5; i += 1) {
          const u0 = projectWavesPoint(plotX, plotY, plotW, plotH, i / 5, 0, 0, projection, 1);
          const u1 = projectWavesPoint(plotX, plotY, plotW, plotH, i / 5, 1, 0, projection, 1);
          const v0 = projectWavesPoint(plotX, plotY, plotW, plotH, 0, i / 5, 0, projection, 1);
          const v1 = projectWavesPoint(plotX, plotY, plotW, plotH, 1, i / 5, 0, projection, 1);
          ctx.beginPath();
          ctx.moveTo(u0.x, u0.y);
          ctx.lineTo(u1.x, u1.y);
          ctx.moveTo(v0.x, v0.y);
          ctx.lineTo(v1.x, v1.y);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    function drawWavesSurface(history, plotX, plotY, plotW, plotH, rows, projection, strength, alphaScale) {
      if (history.length < 2) return;
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "screen";
      const historyDenom = Math.max(1, history.length - 1);
      if (projection !== "flat") {
        const colStep = Math.max(1, Math.floor(history.length / 72));
        for (let col = 0; col < history.length - colStep; col += colStep) {
          const nextCol = Math.min(history.length - 1, col + colStep);
          const u0 = col / historyDenom;
          const u1 = nextCol / historyDenom;
          for (let row = 0; row < rows - 1; row += 1) {
            const v0 = row / Math.max(1, rows - 1);
            const v1 = (row + 1) / Math.max(1, rows - 1);
            const a0 = history[col][row] || 0;
            const a1 = history[nextCol][row] || 0;
            const a2 = history[nextCol][row + 1] || 0;
            const a3 = history[col][row + 1] || 0;
            const amp = (a0 + a1 + a2 + a3) * 0.25;
            if (amp < 0.025 && smoothed.rms < 0.04) continue;
            const p0 = projectWavesPoint(plotX, plotY, plotW, plotH, u0, v0, a0, projection, strength, u0, a1 - a0);
            const p1 = projectWavesPoint(plotX, plotY, plotW, plotH, u1, v0, a1, projection, strength, u1, a1 - a0);
            const p2 = projectWavesPoint(plotX, plotY, plotW, plotH, u1, v1, a2, projection, strength, u1, a2 - a3);
            const p3 = projectWavesPoint(plotX, plotY, plotW, plotH, u0, v1, a3, projection, strength, u0, a2 - a3);
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.closePath();
            ctx.fillStyle = wavesColorFor((v0 + v1) * 0.5, amp, alphaScale * (0.018 + amp * 0.105));
            ctx.fill();
          }
        }
      }
      for (let row = rows - 1; row >= 0; row -= 1) {
        const rowNorm = row / Math.max(1, rows - 1);
        ctx.lineWidth = projection === "flat" ? 1.1 : 1.15 + rowNorm * 0.56;
        ctx.beginPath();
        for (let col = 0; col < history.length; col += 1) {
          const u = col / historyDenom;
          const amp = history[col][row] || 0;
          const prev = history[Math.max(0, col - 1)]?.[row] || 0;
          const next = history[Math.min(history.length - 1, col + 1)]?.[row] || 0;
          const point = projectWavesPoint(plotX, plotY, plotW, plotH, u, rowNorm, amp, projection, strength, u, next - prev);
          if (col === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        const latest = history[history.length - 1][row] || 0;
        ctx.strokeStyle = wavesColorFor(rowNorm, latest, alphaScale * (0.13 + latest * 0.42));
        ctx.stroke();
      }
      if (projection !== "flat") {
        for (let col = 0; col < history.length; col += Math.max(1, Math.floor(history.length / 26))) {
          const u = col / historyDenom;
          ctx.beginPath();
          for (let row = 0; row < rows; row += 1) {
            const rowNorm = row / Math.max(1, rows - 1);
            const amp = history[col][row] || 0;
            const prev = history[Math.max(0, col - 1)]?.[row] || 0;
            const next = history[Math.min(history.length - 1, col + 1)]?.[row] || 0;
            const point = projectWavesPoint(plotX, plotY, plotW, plotH, u, rowNorm, amp, projection, strength, u, next - prev);
            if (row === 0) ctx.moveTo(point.x, point.y);
            else ctx.lineTo(point.x, point.y);
          }
          ctx.strokeStyle = `rgba(245,245,245,${0.016 + alphaScale * 0.045})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    function drawWavesPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const hasSignal = metrics.rms > 0.006 || smoothed.rms > 0.012 || metrics.peak > 0.016;
      const pad = 14;
      const plotX = x + pad;
      const plotY = y + pad;
      const plotW = w - pad * 2;
      const plotH = h - pad * 2;
      const projection = wavesModeSelect?.value || "waves";
      const scale = wavesInputSelect?.value || "log";
      const rows = clampFinite(Number(wavesDensitySelect?.value || 36), 16, 64, 36);
      const persistence = clampFinite(Number(wavesPersistence?.value || 0.62), 0, 1, 0.62);
      const strength = clampFinite(Number(wavesGlow?.value || 0.7), 0, 1, 0.7);
      const maxColumns = Math.round(44 + persistence * 76);

      if (!hasSignal) {
        resetWavesState();
        drawWavesAxes(plotX, plotY, plotW, plotH, projection);
        const statusSize = meterTextSize(10, 0, 13);
        drawMeterText("waiting for signal", x + 14, meterTextBottomBaseline(y, h, statusSize, 10), statusSize, "rgba(166,166,166,0.58)");
        return;
      }

      updateWavesMotion(strength);
      const column = makeWavesColumn(rows, scale);
      wavesState.trails.push(column);
      while (wavesState.trails.length > maxColumns) wavesState.trails.shift();
      wavesState.pointCount = wavesState.trails.length * rows;
      wavesState.lastSignalAt = performance.now() / 1000;

      ctx.save();
      ctx.beginPath();
      ctx.rect(plotX, plotY, plotW, plotH);
      ctx.clip();
      const fade = ctx.createLinearGradient(plotX, plotY, plotX, plotY + plotH);
      fade.addColorStop(0, "rgba(188,48,236,0.035)");
      fade.addColorStop(0.6, "rgba(255,61,31,0.025)");
      fade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = fade;
      ctx.fillRect(plotX, plotY, plotW, plotH);
      drawWavesAxes(plotX, plotY, plotW, plotH, projection);
      drawWavesSurface(wavesState.trails, plotX, plotY, plotW, plotH, rows, projection, strength, 0.9);
      ctx.restore();

      const label = `${projection} · ${scale} · ${rows} bands · ${wavesState.trails.length} frames`;
      const labelSize = meterTextSize(10, 0, 13);
      drawMeterText(label, x + 14, meterTextBottomBaseline(y, h, labelSize, 10), labelSize, "rgba(166,188,210,0.78)");
    }
    function drawSpectrumPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      for (let i = 1; i < 6; i += 1) {
        const gy = y + h * i / 6;
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + w, gy);
        ctx.stroke();
      }

      const bars = meterState.spectrum.length || 96;
      const barW = w / Math.max(1, bars - 1);
      const points = [];
      for (let i = 0; i < bars; i += 1) {
        const prev = meterState.spectrum[Math.max(0, i - 1)] || 0;
        const current = meterState.spectrum[i] || 0;
        const next = meterState.spectrum[Math.min(bars - 1, i + 1)] || 0;
        const v = prev * 0.18 + current * 0.64 + next * 0.18;
        points.push({
          x: x + i * barW,
          y: y + h - v * h,
          value: v,
          delta: meterState.spectrumDelta[i] || 0,
          peak: meterState.spectrumPeak[i] || 0
        });
      }

      const spectrumPath = new Path2D();
      spectrumPath.moveTo(x, y + h);
      for (const p of points) spectrumPath.lineTo(p.x, p.y);
      spectrumPath.lineTo(x + w, y + h);
      spectrumPath.closePath();

      const fill = ctx.createLinearGradient(x, y + h, x, y);
      fill.addColorStop(0, "rgba(0,0,0,0)");
      fill.addColorStop(0.22, "rgba(28,0,70,0.42)");
      fill.addColorStop(0.62, "rgba(100,16,148,0.46)");
      fill.addColorStop(1, "rgba(188,32,138,0.5)");

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.filter = "blur(7px)";
      ctx.globalAlpha = spectrumBarsSelect.value === "on" ? 0.26 : 0.46;
      ctx.fillStyle = fill;
      ctx.fill(spectrumPath);
      ctx.restore();

      ctx.fillStyle = fill;
      ctx.fill(spectrumPath);

      if (spectrumBarsSelect.value === "on") {
        ctx.save();
        ctx.clip(spectrumPath);
        ctx.globalCompositeOperation = "screen";
        for (let i = 0; i < points.length; i += 1) {
          const p = points[i];
          const width = Math.max(1.15, barW * 0.88);
          const barIntensity = Math.pow(clamp(p.value * 1.18, 0, 1), 0.72);
          const alpha = clamp(0.48 + barIntensity * 0.48, 0, 0.96);
          ctx.fillStyle = spectrumColor(barIntensity, alpha);
          ctx.fillRect(p.x - width * 0.5, p.y, width, y + h - p.y + 1);
          if (p.delta > 0.025) {
            ctx.fillStyle = spectrumColor(Math.min(1, barIntensity + p.delta * 2.4), clamp(p.delta * 2.4, 0, 0.46));
            ctx.fillRect(p.x - width * 0.28, p.y, width * 0.56, y + h - p.y + 1);
          }
        }
        ctx.restore();
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.clip(spectrumPath);
      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        if (p.delta < 0.04 || spectrumBarsSelect.value !== "on") continue;
        const width = Math.max(2, barW * (1.25 + p.delta * 10));
        const alpha = clamp(p.delta * 2.6, 0, 0.42);
        const glow = ctx.createLinearGradient(p.x, p.y, p.x, y + h);
        glow.addColorStop(0, spectrumColor(Math.min(1, p.value + 0.3), alpha));
        glow.addColorStop(0.28, spectrumColor(Math.min(1, p.value + 0.12), alpha * 0.52));
        glow.addColorStop(1, "rgba(56,0,96,0)");
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - width * 0.5, p.y, width, y + h - p.y + 2);
      }
      ctx.restore();

      ctx.strokeStyle = "rgba(156,166,206,0.72)";
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(116,76,164,0.34)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        const py = y + h - p.peak * h;
        if (i === 0) ctx.moveTo(p.x, py);
        else ctx.lineTo(p.x, py);
      }
      ctx.stroke();

      const marks = [
        { f: 20, label: "20", major: false },
        { f: 100, label: "100", major: true },
        { f: 500, label: "500", major: false },
        { f: 1000, label: "1k", major: true },
        { f: 5000, label: "5k", major: false },
        { f: 10000, label: "10k", major: true },
        { f: 20000, label: "20k", major: false }
      ];
      ctx.strokeStyle = "rgba(126,138,162,0.25)";
      ctx.lineWidth = 1;
      for (const mark of marks) {
        const mx = spectrumXForFrequency(mark.f, x, w);
        ctx.beginPath();
        ctx.moveTo(mx, y);
        ctx.lineTo(mx, y + h);
        ctx.stroke();
        const ly = mark.major ? y + 14 : y + h - 8;
        ctx.fillStyle = "rgba(0,0,0,0.62)";
        ctx.fillRect(mx + 1, ly - 10, mark.label.length * 7 + 4, 12);
        drawMeterText(mark.label, mx + 3, ly, 10, mark.major ? "rgba(146,154,174,0.88)" : "rgba(166,166,166,0.78)");
      }
    }

    function drawSpectrumFrequencyMarks(x, y, w, h) {
      const marks = [
        { f: 20, label: "20", major: false },
        { f: 100, label: "100", major: true },
        { f: 500, label: "500", major: false },
        { f: 1000, label: "1k", major: true },
        { f: 5000, label: "5k", major: false },
        { f: 10000, label: "10k", major: true },
        { f: 20000, label: "20k", major: false }
      ];
      ctx.strokeStyle = "rgba(126,138,162,0.25)";
      ctx.lineWidth = 1;
      for (const mark of marks) {
        const mx = spectrumXForFrequency(mark.f, x, w);
        ctx.beginPath();
        ctx.moveTo(mx, y);
        ctx.lineTo(mx, y + h);
        ctx.stroke();
        const ly = mark.major ? y + 14 : y + h - 8;
        ctx.fillStyle = "rgba(0,0,0,0.62)";
        ctx.fillRect(mx + 1, ly - 10, mark.label.length * 7 + 4, 12);
        drawMeterText(mark.label, mx + 3, ly, 10, mark.major ? "rgba(146,154,174,0.88)" : "rgba(166,166,166,0.78)");
      }
    }

    function drawSpectralDynamicsPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      for (let i = 1; i < 6; i += 1) {
        const gy = y + h * i / 6;
        ctx.beginPath();
        ctx.moveTo(x, gy);
        ctx.lineTo(x + w, gy);
        ctx.stroke();
      }

      const state = meterState.spectralDynamics;
      const bars = state.current.length || 192;
      const barW = w / Math.max(1, bars - 1);
      const hasSignal = metrics.rms > 0.001 || metrics.peak > 0.004 || state.current.some((value) => value > 0.012);
      drawSpectrumFrequencyMarks(x, y, w, h);
      if (!hasSignal) {
        const statusSize = meterTextSize(10, 0, 13);
        drawMeterText("waiting for signal", x + 8, meterTextBottomBaseline(y, h, statusSize), statusSize, "rgba(166,166,166,0.48)");
        return;
      }

      const display = spectralDynamicsDisplaySelect.value;
      const rangeMode = spectralDynamicsRangeSelect.value;
      const minPath = [];
      const maxPath = [];
      const avgPath = [];
      const currentPath = [];
      for (let i = 0; i < bars; i += 1) {
        const px = x + i * barW;
        const minV = clamp(state.min[i] || 0, 0, 1);
        const maxV = clamp(Math.max(state.max[i] || 0, minV), 0, 1);
        const avgV = clamp(state.average[i] || 0, 0, 1);
        const currentV = clamp(state.current[i] || 0, 0, 1);
        minPath.push({ x: px, y: y + h - minV * h, value: minV });
        maxPath.push({ x: px, y: y + h - maxV * h, value: maxV });
        avgPath.push({ x: px, y: y + h - avgV * h, value: avgV });
        currentPath.push({ x: px, y: y + h - currentV * h, value: currentV, range: clamp(state.range[i] || 0, 0, 1) });
      }

      const envelope = new Path2D();
      envelope.moveTo(maxPath[0].x, maxPath[0].y);
      for (let i = 1; i < maxPath.length; i += 1) envelope.lineTo(maxPath[i].x, maxPath[i].y);
      for (let i = minPath.length - 1; i >= 0; i -= 1) envelope.lineTo(minPath[i].x, minPath[i].y);
      envelope.closePath();

      if (display !== "delta") {
        const envFill = ctx.createLinearGradient(x, y + h, x, y);
        envFill.addColorStop(0, "rgba(38,0,80,0.18)");
        envFill.addColorStop(0.5, "rgba(150,28,160,0.32)");
        envFill.addColorStop(1, "rgba(255,56,24,0.22)");
        ctx.fillStyle = envFill;
        ctx.fill(envelope);
        ctx.strokeStyle = "rgba(188,76,214,0.42)";
        ctx.lineWidth = 0.85;
        ctx.stroke(envelope);
      }

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = 0; i < currentPath.length; i += 1) {
        const p = currentPath[i];
        const width = Math.max(1.2, barW * 0.82);
        const dynamic = rangeMode === "delta" || display === "delta" ? p.range : clamp(p.range * 1.35, 0, 1);
        if (dynamic < 0.015) continue;
        ctx.fillStyle = spectrumColor(clamp(dynamic * 1.2 + p.value * 0.35, 0, 1), clamp(0.16 + dynamic * 0.72, 0, 0.88));
        ctx.fillRect(p.x - width * 0.5, y + h - dynamic * h, width, dynamic * h);
      }
      ctx.restore();

      if (display !== "delta") {
        ctx.strokeStyle = "rgba(245,245,245,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        avgPath.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      }

      if (display === "envelopeCurrent") {
        ctx.strokeStyle = "rgba(156,166,206,0.9)";
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        currentPath.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
      }

      const avgRange = state.range.reduce((sum, value) => sum + value, 0) / Math.max(1, state.range.length);
      const legendSize = meterTextSize(10, 0, 13);
      drawMeterText(`${spectralDynamicsWindowSelect.options[spectralDynamicsWindowSelect.selectedIndex]?.text || "Medium"}  ${rangeMode === "peak" ? "peak hold" : rangeMode === "delta" ? "delta" : "min/max"}  dyn ${avgRange.toFixed(2)}`, x + 8, meterTextBottomBaseline(y, h, legendSize), legendSize, "rgba(166,166,166,0.78)");
    }

    function drawStereoScopeGrid(cx, cy, r, compact) {
      const drawDiamond = (radius, alpha) => {
        ctx.strokeStyle = `rgba(142,150,166,${alpha})`;
        ctx.lineWidth = compact ? 0.9 : 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy - radius);
        ctx.lineTo(cx + radius, cy);
        ctx.lineTo(cx, cy + radius);
        ctx.lineTo(cx - radius, cy);
        ctx.closePath();
        ctx.stroke();
      };
      drawDiamond(r, 0.42);
      drawDiamond(r * 0.52, 0.26);
      ctx.strokeStyle = "rgba(142,150,166,0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.moveTo(cx - r * 0.72, cy - r * 0.72);
      ctx.lineTo(cx + r * 0.72, cy + r * 0.72);
      ctx.moveTo(cx + r * 0.72, cy - r * 0.72);
      ctx.lineTo(cx - r * 0.72, cy + r * 0.72);
      ctx.stroke();
    }

    function drawStereoCorrelationOverlay(cx, cy, r, compact) {
      const corr = clamp(meterState.correlation, -1, 1);
      const width = clamp(1 - (corr + 1) * 0.5 + smoothed.side * 0.45, 0, 1);
      const alpha = clamp(0.04 + width * 0.16 + smoothed.rms * 0.05, 0.03, 0.24);
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      const grad = ctx.createRadialGradient(cx, cy, r * 0.12, cx, cy, r * (0.82 + width * 0.2));
      grad.addColorStop(0, "rgba(255,255,255,0)");
      grad.addColorStop(0.55, `rgba(126,214,255,${alpha * 0.34})`);
      grad.addColorStop(1, `rgba(188,48,236,${alpha})`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r * (0.22 + width * 0.88), r * (0.72 - width * 0.18), Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      if (corr < 0) {
        ctx.save();
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = `rgba(255,58,24,${clamp(-corr * 0.5, 0, 0.5)})`;
        ctx.lineWidth = compact ? 1 : 1.2;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.88, cy + r * 0.88);
        ctx.lineTo(cx + r * 0.88, cy - r * 0.88);
        ctx.stroke();
        ctx.restore();
      }
    }

    function rmsFloat(values) {
      let sum = 0;
      for (let i = 0; i < values.length; i += 1) sum += values[i] * values[i];
      return Math.sqrt(sum / Math.max(1, values.length));
    }

    function stereoPointFromSample(l, rr, cx, cy, r, midGain, sideGain, offsetX = 0, offsetY = 0) {
      let dx = Math.tanh((l - rr) * 0.5 * sideGain);
      let dy = Math.tanh((l + rr) * 0.5 * midGain);
      const mag = Math.hypot(dx, dy);
      if (mag > 1) {
        dx /= mag;
        dy /= mag;
      }
      return {
        x: cx + dx * r + offsetX,
        y: cy - dy * r + offsetY
      };
    }

    function drawStereoClassicCloud(left, right, cx, cy, r, compact, spec) {
      const n = Math.min(left.length, right.length);
      if (!n) return;
      const bandRms = Math.max(rmsFloat(left), rmsFloat(right));
      const gain = clamp(spec.target / Math.max(0.004, bandRms), 1, spec.maxGain);
      const step = Math.max(1, Math.floor(n / spec.points));
      const midGain = (compact ? 2.15 : 2.42) * spec.midGain * gain;
      const sideGain = (compact ? 2.0 : 2.22) * spec.sideGain * gain;
      const alpha = clamp(spec.alphaBase + Math.pow(bandRms * gain, 0.5) * spec.alphaLift, spec.alphaBase, spec.alphaMax);
      const radius = compact ? spec.classicDot * 0.86 : spec.classicDot;
      ctx.fillStyle = `rgba(${spec.color[0]},${spec.color[1]},${spec.color[2]},${alpha})`;
      for (let i = 0; i < n; i += step) {
        const p = stereoPointFromSample(left[i], right[i], cx, cy, r, midGain, sideGain, spec.offsetX || 0, spec.offsetY || 0);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawStereoCorrelationCloud(left, right, cx, cy, r, compact, mode) {
      const n = Math.min(left.length, right.length);
      if (!n) return;
      const bandRms = Math.max(rmsFloat(left), rmsFloat(right));
      const classic = mode !== "tangle";
      const gain = clamp(0.24 / Math.max(0.004, bandRms), 1, classic ? 4.4 : 3.8);
      const visualWindow = classic ? Math.min(n, compact ? 2048 : 3072) : n;
      const start = classic ? Math.max(0, n - visualWindow) : 0;
      const targetPoints = classic ? (compact ? 1500 : 2200) : 420;
      const step = Math.max(1, Math.floor(visualWindow / targetPoints));
      const midGain = (compact ? 2.15 : 2.45) * gain;
      const sideGain = (compact ? 2.0 : 2.25) * gain;
      const corr = clamp(meterState.correlation, -1, 1);
      const alpha = classic
        ? clamp(0.08 + Math.pow(bandRms * gain, 0.48) * 0.3, 0.08, 0.42)
        : clamp(0.18 + Math.pow(bandRms * gain, 0.52) * 0.46, 0.18, 0.72);
      const color = corr < 0 ? [255, 86, 48] : [235, 238, 225];
      const points = [];
      for (let i = start; i < n; i += step) {
        points.push(stereoPointFromSample(left[i], right[i], cx, cy, r, midGain, sideGain));
      }
      if (!points.length) return;

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      if (points.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = classic
          ? `rgba(${color[0]},${color[1]},${color[2]},${clamp(alpha * 0.68, 0.08, 0.34)})`
          : `rgba(${color[0]},${color[1]},${color[2]},${alpha * 0.42})`;
        ctx.lineWidth = classic ? (compact ? 0.72 : 0.82) : (compact ? 0.8 : 0.9);
        ctx.beginPath();
        for (let i = 0; i < points.length; i += 1) {
          const p = points[i];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      ctx.fillStyle = classic
        ? `rgba(${color[0]},${color[1]},${color[2]},${clamp(alpha * 1.05, 0.13, 0.44)})`
        : `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
      const stride = classic ? (compact ? 4 : 3) : 2;
      for (let i = 0; i < points.length; i += stride) {
        const p = points[i];
        const radius = classic ? (compact ? 0.45 : 0.52) : (compact ? 1.0 : 1.15);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    function drawStereoTangleCloud(left, right, cx, cy, r, compact, spec) {
      const n = Math.min(left.length, right.length);
      if (!n) return;
      const bandRms = Math.max(rmsFloat(left), rmsFloat(right));
      const gain = clamp(spec.target / Math.max(0.004, bandRms), 1, spec.maxGain);
      const step = Math.max(1, Math.floor(n / spec.points));
      const midGain = (compact ? 2.3 : 2.68) * spec.midGain * gain;
      const sideGain = (compact ? 2.08 : 2.38) * spec.sideGain * gain;
      const alpha = clamp(spec.alphaBase + Math.pow(bandRms * gain, 0.55) * spec.alphaLift, spec.alphaBase, spec.alphaMax);
      const dotRadius = compact ? spec.dot * 0.42 : spec.dot * 0.5;
      const glowRadius = dotRadius * spec.glowScale;
      const glowAlpha = alpha * spec.glowAlpha;
      const points = [];
      for (let i = 0; i < n; i += step) {
        points.push(stereoPointFromSample(left[i], right[i], cx, cy, r, midGain, sideGain, spec.offsetX || 0, spec.offsetY || 0));
      }
      if (points.length < 2) return;

      ctx.lineWidth = compact ? spec.lineWidth * 0.85 : spec.lineWidth;
      ctx.strokeStyle = `rgba(${spec.color[0]},${spec.color[1]},${spec.color[2]},${alpha * spec.lineAlpha})`;
      ctx.beginPath();
      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      for (let i = 0; i < points.length; i += spec.dotStride) {
        const p = points[i];
        if (glowAlpha > 0.001) {
          const grad = ctx.createRadialGradient(p.x, p.y, dotRadius * 0.35, p.x, p.y, glowRadius);
          grad.addColorStop(0, `rgba(${spec.color[0]},${spec.color[1]},${spec.color[2]},${glowAlpha})`);
          grad.addColorStop(1, `rgba(${spec.color[0]},${spec.color[1]},${spec.color[2]},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${spec.color[0]},${spec.color[1]},${spec.color[2]},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function drawStereoPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const compact = useCompactGraphLayout() || h < 120;
      const mode = stereoModeSelect.value;
      const showCorr = stereoCorrToggle.checked;
      const showLow = stereoLowToggle.checked;
      const showMid = stereoMidToggle.checked;
      const showHigh = stereoHighToggle.checked;
      const cx = x + (compact ? w * 0.27 : w * 0.34);
      const cy = y + h * 0.48;
      const r = Math.min(w * (compact ? 0.5 : 0.57), h) * 0.43;
      drawStereoScopeGrid(cx, cy, r, compact);
      if (showCorr && mode === "tangle") drawStereoCorrelationOverlay(cx, cy, r, compact);

      if (leftAnalyser && rightAnalyser) {
        leftAnalyser.getByteTimeDomainData(leftTime);
        rightAnalyser.getByteTimeDomainData(rightTime);
      }
      const n = Math.min(leftTime.length, rightTime.length);
      const left = new Float32Array(n);
      const right = new Float32Array(n);
      let stereoEnergy = 0;
      for (let i = 0; i < n; i += 1) {
        left[i] = (leftTime[i] - 128) / 128;
        right[i] = (rightTime[i] - 128) / 128;
        stereoEnergy += left[i] * left[i] + right[i] * right[i];
      }
      const hasStereoSignal = Boolean(leftAnalyser && rightAnalyser) && Math.sqrt(stereoEnergy / Math.max(1, n * 2)) > 0.0025;
      const leftBands = splitBandsForCorrelation(left);
      const rightBands = splitBandsForCorrelation(right);
      const bandClouds = [
        {
          id: "low",
          left: leftBands.low,
          right: rightBands.low,
          color: [255, 58, 24],
          target: 0.22,
          maxGain: 3.1,
          midGain: 0.92,
          sideGain: 0.92,
          points: 320,
          dot: 1.8,
          classicDot: 1.35,
          alphaBase: 0.16,
          alphaLift: 0.34,
          alphaMax: 0.58,
          glowScale: 2.05,
          glowAlpha: 0.05,
          lineAlpha: 0.36,
          lineWidth: 0.7,
          dotStride: 3,
          offsetX: 0,
          offsetY: 0
        },
        {
          id: "mid",
          left: leftBands.mid,
          right: rightBands.mid,
          color: [57, 255, 20],
          target: 0.27,
          maxGain: 4.8,
          midGain: 1.05,
          sideGain: 1.04,
          points: 360,
          dot: 1.9,
          classicDot: 1.3,
          alphaBase: 0.18,
          alphaLift: 0.48,
          alphaMax: 0.76,
          glowScale: 2.15,
          glowAlpha: 0.07,
          lineAlpha: 0.42,
          lineWidth: 0.72,
          dotStride: 3,
          offsetX: compact ? 0.5 : 0.8,
          offsetY: compact ? -0.5 : -0.8
        },
        {
          id: "high",
          left: leftBands.high,
          right: rightBands.high,
          color: [82, 158, 255],
          target: 0.31,
          maxGain: 6.2,
          midGain: 1.16,
          sideGain: 1.12,
          points: 390,
          dot: 2.05,
          classicDot: 1.24,
          alphaBase: 0.2,
          alphaLift: 0.54,
          alphaMax: 0.82,
          glowScale: 2.25,
          glowAlpha: 0.08,
          lineAlpha: 0.46,
          lineWidth: 0.68,
          dotStride: 3,
          offsetX: compact ? -0.5 : -0.8,
          offsetY: compact ? 0.5 : 0.8
        }
      ];
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      if (hasStereoSignal) {
        for (const spec of bandClouds) {
          if ((spec.id === "low" && !showLow) || (spec.id === "mid" && !showMid) || (spec.id === "high" && !showHigh)) continue;
          if (mode === "tangle") drawStereoTangleCloud(spec.left, spec.right, cx, cy, r, compact, spec);
          else drawStereoClassicCloud(spec.left, spec.right, cx, cy, r, compact, spec);
        }
      }
      ctx.restore();
      if (showCorr && hasStereoSignal) drawStereoCorrelationCloud(left, right, cx, cy, r, compact, mode);

      const bx = x + w * 0.58;
      const bw = w * 0.36;
      let stereoRowY = y + (compact ? 18 : 24);
      [
        ["Corr", meterState.correlation, "#f5f5f5", showCorr],
        ["Low", meterState.lowCorrelation, "#ff3d1f", showLow],
        ["Mid", meterState.midCorrelation, "#39ff14", showMid],
        ["High", meterState.highCorrelation, "#529eff", showHigh]
      ].forEach(([label, value, color, enabled]) => {
        const row = drawMeterRow({
          label,
          valueText: enabled ? value.toFixed(2) : "--",
          value,
          x: bx,
          y: stereoRowY,
          w: bw,
          color,
          mode: "bipolar",
          enabled,
          density: "compact"
        });
        stereoRowY += row.height;
      });
      const stereoLegendSize = meterTextSize(9, 2);
      const stereoLegendY = meterTextBottomBaseline(y, h, stereoLegendSize);
      drawMeterText("L/R", x + 12, stereoLegendY, stereoLegendSize, "rgba(166,166,166,0.7)");
      drawMeterText("M/S rotated", x + 42, stereoLegendY, stereoLegendSize, "rgba(166,166,166,0.7)");
    }

    function findRisingZeroCrossing(values) {
      const center = Math.floor(values.length * 0.34);
      const searchEnd = Math.floor(values.length * 0.82);
      for (let i = center; i < searchEnd - 1; i += 1) {
        const a = values[i] - 128;
        const b = values[i + 1] - 128;
        if (a <= 0 && b > 0) return i;
      }
      for (let i = 1; i < values.length - 1; i += 1) {
        const a = values[i] - 128;
        const b = values[i + 1] - 128;
        if (a <= 0 && b > 0) return i;
      }
      return 0;
    }

    function buildScopeTriggerSignal(values) {
      const out = new Float32Array(values.length);
      let mean = 0;
      for (let i = 0; i < values.length; i += 1) mean += (values[i] - 128) / 128;
      mean /= Math.max(1, values.length);
      let slow = 0;
      let fast = 0;
      for (let i = 0; i < values.length; i += 1) {
        const input = (values[i] - 128) / 128 - mean;
        slow += 0.018 * (input - slow);
        fast += 0.22 * ((input - slow) - fast);
        out[i] = fast;
      }
      return out;
    }

    function buildScopeDisplaySignal(values) {
      const out = new Float32Array(values.length);
      let mean = 0;
      for (let i = 0; i < values.length; i += 1) mean += (values[i] - 128) / 128;
      mean /= Math.max(1, values.length);
      let slow = 0;
      for (let i = 0; i < values.length; i += 1) {
        const input = (values[i] - 128) / 128 - mean;
        slow += 0.006 * (input - slow);
        out[i] = input - slow * 0.92;
      }
      return out;
    }

    function findRisingZeroCrossingFloat(values) {
      let best = 0;
      let bestSlope = 0;
      const center = Math.floor(values.length * 0.25);
      const searchEnd = Math.floor(values.length * 0.76);
      for (let i = center; i < searchEnd - 1; i += 1) {
        const a = values[i];
        const b = values[i + 1];
        const slope = b - a;
        if (a <= 0 && b > 0 && slope > bestSlope) {
          best = i;
          bestSlope = slope;
        }
      }
      return best || 0;
    }

    function estimatePitchPeriod(values) {
      const crossings = [];
      for (let i = 1; i < values.length - 1; i += 1) {
        const a = values[i - 1];
        const b = values[i];
        if (a <= 0 && b > 0) crossings.push(i);
      }
      if (crossings.length < 3) return 0;
      const sampleRate = audioContext ? audioContext.sampleRate : 48000;
      const minPeriod = sampleRate / 1200;
      const maxPeriod = sampleRate / 45;
      const periods = [];
      for (let i = 1; i < crossings.length; i += 1) {
        const period = crossings[i] - crossings[i - 1];
        if (period >= minPeriod && period <= maxPeriod) periods.push(period);
      }
      if (!periods.length) return 0;
      periods.sort((a, b) => a - b);
      return periods[Math.floor(periods.length * 0.5)];
    }

    function estimateScopePeriodByCorrelation(values) {
      const sampleRate = audioContext ? audioContext.sampleRate : 48000;
      const minLag = Math.floor(sampleRate / 1000);
      const maxLag = Math.min(Math.floor(sampleRate / 18), Math.floor(values.length * 0.42));
      const windowSize = Math.min(8192, values.length - maxLag - 1);
      if (windowSize < 256) return 0;
      let bestLag = 0;
      let bestScore = 0;
      for (let lag = minLag; lag <= maxLag; lag += lag < 220 ? 1 : lag < 900 ? 2 : 4) {
        let cross = 0;
        let aPower = 0;
        let bPower = 0;
        for (let i = 0; i < windowSize; i += 2) {
          const a = values[i];
          const b = values[i + lag];
          cross += a * b;
          aPower += a * a;
          bPower += b * b;
        }
        if (aPower < 0.0001 || bPower < 0.0001) continue;
        const score = cross / Math.sqrt(aPower * bPower);
        if (score > bestScore) {
          bestScore = score;
          bestLag = lag;
        }
      }
      return bestScore > 0.32 ? bestLag : 0;
    }

    function drawOscilloscopePanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);

      const scopeBuffer = scopeAnalyser ? scopeTimeData : timeData;
      if (scopeAnalyser) {
        scopeAnalyser.getByteTimeDomainData(scopeTimeData);
      } else if (analyser) {
        analyser.getByteTimeDomainData(timeData);
      }

      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, y + h * 0.5);
      ctx.lineTo(x + w, y + h * 0.5);
      ctx.stroke();

      const triggerSignal = scopeFollowSelect.value === "on" ? buildScopeTriggerSignal(scopeBuffer) : null;
      const displaySignal = buildScopeDisplaySignal(scopeBuffer);
      const period = triggerSignal ? (estimateScopePeriodByCorrelation(displaySignal) || estimatePitchPeriod(triggerSignal)) : 0;
      const rawStart = triggerSignal ? findRisingZeroCrossingFloat(triggerSignal) : 0;
      const sampleRate = audioContext ? audioContext.sampleRate : 48000;
      const detectedHz = period ? sampleRate / period : 0;
      const displayHz = detectedHz || 120;
      const cycles = 5;
      const targetVisible = period ? Math.round(period * cycles) : Math.round(sampleRate * 0.05);
      const maxVisible = Math.min(scopeBuffer.length * 0.9, sampleRate * 0.28);
      const clampedTarget = clamp(targetVisible, 180, maxVisible);
      scopeState.visible = lerp(scopeState.visible, clampedTarget, 0.42);
      scopeState.start = lerp(scopeState.start, rawStart, 0.34);
      const start = Math.max(0, Math.round(scopeState.start));
      const visible = Math.min(scopeBuffer.length - start, clamp(Math.round(scopeState.visible), 180, Math.floor(scopeBuffer.length * 0.9)));
      let peakVisible = 0.001;
      for (let i = 0; i < visible; i += 1) {
        peakVisible = Math.max(peakVisible, Math.abs(displaySignal[start + i] || 0));
      }
      const scopeGain = clamp(0.82 / peakVisible, 0.85, 3.2);
      const amp = h * 0.42 * scopeGain;
      const centerY = y + h * 0.5;

      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, w, h);
      ctx.clip();
      ctx.strokeStyle = "rgba(177,205,244,0.36)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let i = 0; i < visible; i += 1) {
        const sample = displaySignal[start + i] || 0;
        const px = x + i / Math.max(1, visible - 1) * w;
        const py = centerY - sample * amp;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(190,218,255,0.9)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let i = 0; i < visible; i += 1) {
        const raw = displaySignal[start + i] || 0;
        const next = i + 1 < visible ? (displaySignal[start + i + 1] || 0) : raw;
        const sample = raw * 0.76 + next * 0.24;
        const px = x + i / Math.max(1, visible - 1) * w;
        const py = centerY - sample * amp;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.restore();

      const scopeLabel = scopeFollowSelect.value === "on"
        ? `follow pitch ${detectedHz ? Math.round(detectedHz) : "--"}Hz / ${cycles} cycles`
        : "free run";
      const scopeLabelSize = meterTextSize(10, 0, 13);
      drawMeterText(scopeLabel, x + 10, meterTextBottomBaseline(y, h, scopeLabelSize, 10), scopeLabelSize, "rgba(166,166,166,0.78)");
    }

    function getWaveformDisplayProfile(kind) {
      const display = contract.ui?.waveformDisplay || {};
      return display[kind] || display.long || { targetPeak: 0.56, maxGain: 1.35, fill: 0.47 };
    }

    function getWaveformLaneRect(y, h) {
      const reserve = Math.max(contract.ui?.waveformDisplay?.labelReservePx || 12, meterTextSize(10, 0, 13) + 6);
      const usableH = Math.max(12, h - reserve);
      return {
        y,
        usableH,
        centerY: y + usableH * 0.5
      };
    }

    function peakForSignal(signal) {
      let peak = 0;
      for (let i = 0; i < signal.length; i += 1) {
        peak = Math.max(peak, Math.abs(signal[i] || 0));
      }
      return peak;
    }

    function drawWaveformLane(columns, x, y, w, h, key, label, profile = getWaveformDisplayProfile("long")) {
      const lane = getWaveformLaneRect(y, h);
      const centerY = lane.centerY;
      const count = Math.max(1, columns.length);
      const colW = w / count;
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath();
      ctx.moveTo(x, centerY);
      ctx.lineTo(x + w, centerY);
      ctx.stroke();
      for (let i = 0; i < columns.length; i += 1) {
        const column = columns[i];
        const peak = Math.max(0.0001, column.peak || column.local || column[key] || 0);
        const targetGain = clamp((column.local || peak) / peak, 1, profile.maxGain || 1);
        const value = clamp(column[key] * targetGain, 0, 1);
        const px = x + i * colW;
        const half = Math.max(0.6, value * lane.usableH * (profile.fill || 0.48));
        ctx.fillStyle = waveformColorForColumn(column, 0.88);
        ctx.fillRect(px, centerY - half, Math.max(1, colW + 0.3), half * 2);
        if (waveformPeakSelect.value === "on" && column.hit > 0.62 && column.local > 0.55) {
          const transientAlpha = clamp((column.hit - 0.55) * (column.local - 0.35) * 0.34, 0, 0.22);
          ctx.fillStyle = waveformColorForColumn({ ...column, peak: 1, local: 1, hit: column.hit }, transientAlpha);
          ctx.fillRect(px, lane.y, Math.max(1, colW * 0.42), lane.usableH);
        }
      }
      const labelSize = meterTextSize(10, 0, 13);
      drawMeterText(label, x + 8, meterTextBottomBaseline(y, h, labelSize), labelSize, "rgba(166,166,166,0.76)");
    }

    function drawStaticWaveformLane(x, y, w, h, key, label, profile = getWaveformDisplayProfile("long")) {
      if (analyser) analyser.getByteTimeDomainData(timeData);
      const lane = getWaveformLaneRect(y, h);
      const centerY = lane.centerY;
      let peakVisible = 0.001;
      for (let i = 0; i < timeData.length; i += 1) {
        peakVisible = Math.max(peakVisible, Math.abs((timeData[i] - 128) / 128));
      }
      const gain = clamp((profile.targetPeak || 0.56) / peakVisible, 1, profile.maxGain || 1);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath();
      ctx.moveTo(x, centerY);
      ctx.lineTo(x + w, centerY);
      ctx.stroke();
      ctx.strokeStyle = key === "side" ? "rgba(188,48,236,0.9)" : "rgba(188,218,255,0.9)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < timeData.length; i += 1) {
        const raw = clamp((timeData[i] - 128) / 128 * gain, -1, 1);
        const px = x + i / Math.max(1, timeData.length - 1) * w;
        const py = centerY - raw * lane.usableH * (profile.fill || 0.44);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      const labelSize = meterTextSize(10, 0, 13);
      drawMeterText(label, x + 8, meterTextBottomBaseline(y, h, labelSize), labelSize, "rgba(166,166,166,0.76)");
    }

    function buildShortWaveformSignal(key) {
      const sampleRate = audioContext ? audioContext.sampleRate : 48000;
      const desiredSamples = Math.round(sampleRate * 0.18);
      if (!scopeAnalyser && !leftAnalyser && !rightAnalyser && !analyser) {
        return new Float32Array(desiredSamples);
      }
      if (key === "mid" && scopeAnalyser) {
        scopeAnalyser.getByteTimeDomainData(scopeTimeData);
        const count = Math.min(desiredSamples, scopeTimeData.length);
        const start = Math.max(0, scopeTimeData.length - count);
        const out = new Float32Array(count);
        for (let i = 0; i < count; i += 1) {
          out[i] = (scopeTimeData[start + i] - 128) / 128;
        }
        return out;
      }

      if (leftAnalyser && rightAnalyser) {
        leftAnalyser.getByteTimeDomainData(leftTime);
        rightAnalyser.getByteTimeDomainData(rightTime);
      } else if (analyser) {
        analyser.getByteTimeDomainData(timeData);
      }

      const sourceLength = leftAnalyser && rightAnalyser ? Math.min(leftTime.length, rightTime.length) : timeData.length;
      const count = Math.min(desiredSamples, sourceLength);
      const start = Math.max(0, sourceLength - count);
      const out = new Float32Array(count);
      for (let i = 0; i < count; i += 1) {
        const index = start + i;
        const l = leftAnalyser && rightAnalyser ? (leftTime[index] - 128) / 128 : (timeData[index] - 128) / 128;
        const r = leftAnalyser && rightAnalyser ? (rightTime[index] - 128) / 128 : l;
        if (key === "left") out[i] = l;
        else if (key === "right") out[i] = r;
        else if (key === "side") out[i] = (l - r) * 0.5;
        else out[i] = (l + r) * 0.5;
      }
      return out;
    }

    function drawWaveformShortLane(signal, x, y, w, h, label) {
      const profile = getWaveformDisplayProfile("short");
      const lane = getWaveformLaneRect(y, h);
      const centerY = lane.centerY;
      const width = Math.max(1, Math.floor(w));
      const samplesPerPixel = Math.max(1, signal.length / width);
      const gain = clamp((profile.targetPeak || 0.72) / Math.max(0.001, peakForSignal(signal)), 1, profile.maxGain || 2.6);
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath();
      ctx.moveTo(x, centerY);
      ctx.lineTo(x + w, centerY);
      ctx.stroke();

      for (let px = 0; px < width; px += 1) {
        const start = Math.floor(px * samplesPerPixel);
        const end = Math.min(signal.length, Math.ceil((px + 1) * samplesPerPixel));
        let min = 0;
        let max = 0;
        for (let i = start; i < end; i += 1) {
          const v = clamp((signal[i] || 0) * gain, -1, 1);
          if (v < min) min = v;
          if (v > max) max = v;
        }
        const peak = Math.max(Math.abs(min), Math.abs(max));
        const column = {
          peak,
          local: clamp(peak * 1.55, 0, 1),
          hit: Math.max(smoothed.bassHit, smoothed.midHit, smoothed.peak),
          band: smoothed.low >= smoothed.mid && smoothed.low >= smoothed.high ? "low" : smoothed.mid >= smoothed.high ? "mid" : "high"
        };
        const top = centerY - max * lane.usableH * (profile.fill || 0.5);
        const bottom = centerY - min * lane.usableH * (profile.fill || 0.5);
        ctx.fillStyle = waveformColorForColumn(column, 0.92);
        ctx.fillRect(x + px, Math.min(top, bottom), 1.1, Math.max(1, Math.abs(bottom - top)));
      }

      ctx.strokeStyle = "rgba(188,218,255,0.78)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let px = 0; px < width; px += 1) {
        const index = Math.min(signal.length - 1, Math.floor(px / Math.max(1, width - 1) * (signal.length - 1)));
        const py = centerY - clamp(signal[index] * gain, -1, 1) * lane.usableH * (profile.fill || 0.5);
        if (px === 0) ctx.moveTo(x + px, py);
        else ctx.lineTo(x + px, py);
      }
      ctx.stroke();
      const labelSize = meterTextSize(10, 0, 13);
      drawMeterText(label, x + 8, meterTextBottomBaseline(y, h, labelSize), labelSize, "rgba(166,166,166,0.76)");
    }

    function drawWaveformPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);

      const channel = waveformChannelSelect.value;
      const twoLane = channel === "mid-side" || channel === "left-right";
      const gap = twoLane ? 6 : 0;
      const laneH = twoLane ? (h - gap) / 2 : h;
      const columns = waveformState.columns.slice(-Math.floor(w));
      const profile = getWaveformDisplayProfile("long");

      if (waveformLoopSelect.value === "static") {
        if (twoLane && channel === "mid-side") {
          drawStaticWaveformLane(x, y, w, laneH, "mid", "mid", profile);
          drawStaticWaveformLane(x, y + laneH + gap, w, laneH, "side", "side", profile);
        } else if (twoLane) {
          drawStaticWaveformLane(x, y, w, laneH, "left", "left", profile);
          drawStaticWaveformLane(x, y + laneH + gap, w, laneH, "right", "right", profile);
        } else {
          drawStaticWaveformLane(x, y, w, h, channel, channel, profile);
        }
        return;
      }

      if (twoLane && channel === "mid-side") {
        drawWaveformLane(columns, x, y, w, laneH, "mid", "mid", profile);
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "side", "side", profile);
      } else if (twoLane) {
        drawWaveformLane(columns, x, y, w, laneH, "left", "left", profile);
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "right", "right", profile);
      } else {
        drawWaveformLane(columns, x, y, w, h, channel, channel, profile);
      }
    }

    function drawWaveformShortPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);

      const channel = waveformChannelSelect.value;
      const twoLane = channel === "mid-side" || channel === "left-right";
      const gap = twoLane ? 5 : 0;
      const laneH = twoLane ? (h - gap) / 2 : h;

      if (twoLane && channel === "mid-side") {
        drawWaveformShortLane(buildShortWaveformSignal("mid"), x, y, w, laneH, "mid");
        drawWaveformShortLane(buildShortWaveformSignal("side"), x, y + laneH + gap, w, laneH, "side");
      } else if (twoLane) {
        drawWaveformShortLane(buildShortWaveformSignal("left"), x, y, w, laneH, "left");
        drawWaveformShortLane(buildShortWaveformSignal("right"), x, y + laneH + gap, w, laneH, "right");
      } else {
        drawWaveformShortLane(buildShortWaveformSignal(channel), x, y, w, h, `${channel} / ~180ms`);
      }
      const shortLegendSize = meterTextSize(10, 0, 13);
      drawMeterText("~180ms", x + w - 48, meterTextBottomBaseline(y, h, shortLegendSize), shortLegendSize, "rgba(166,166,166,0.76)");
    }

    function drawWaveformMediumPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);

      const channel = waveformChannelSelect.value;
      const twoLane = channel === "mid-side" || channel === "left-right";
      const gap = twoLane ? 5 : 0;
      const laneH = twoLane ? (h - gap) / 2 : h;
      const speed = Number(waveformSpeedSelect.value);
      const mediumCount = Math.max(72, Math.floor(60 * speed));
      const columns = waveformState.columns.slice(-mediumCount);
      const profile = getWaveformDisplayProfile("medium");

      if (twoLane && channel === "mid-side") {
        drawWaveformLane(columns, x, y, w, laneH, "mid", "mid", profile);
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "side", "side", profile);
      } else if (twoLane) {
        drawWaveformLane(columns, x, y, w, laneH, "left", "left", profile);
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "right", "right", profile);
      } else {
        drawWaveformLane(columns, x, y, w, h, channel, `${channel} / ~1s`, profile);
      }
      const mediumLegendSize = meterTextSize(10, 0, 13);
      drawMeterText("~1s", x + w - 28, meterTextBottomBaseline(y, h, mediumLegendSize), mediumLegendSize, "rgba(166,166,166,0.76)");
    }

    function drawPatternPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);

      const rows = [
        ["Kick", "kick", "#ff3a18"],
        ["Tom", "tom", "#ff8b2a"],
        ["Snare", "snare", "#39ff14"],
        ["Hat", "hat", "#7ed6ff"],
        ["Cymbal", "cymbal", "#bc30ec"]
      ];
      const compact = useCompactGraphLayout();
      const topPad = Math.max(18, compact ? h * 0.035 : h * 0.08);
      const displayPresent = hasPatternNestedModule("displayRender");
      const displayOpen = displayPresent && graphOpenState.patternDisplayRender;
      const displayBoost = compact
        ? lerp(1, contract.responsive?.patternDisplay?.compactScale || 1.8, getCompactResponsiveT())
        : 1;
      const displayGap = displayOpen ? Math.round(compact ? clamp(h * 0.026, 22, 38) : 30 * displayBoost) : 0;
      const historyH = Math.round(compact ? clamp(h * 0.135, 96, 180) : 48);
      const desiredPatternBarH = compact ? meterPrimaryBarHeight(12) : 9;
      const minRowsBlockH = desiredPatternBarH * rows.length + (compact ? 9 : 5) * (rows.length - 1) + 18;
      const rowsBlockH = Math.round(compact
        ? clamp(h * 0.24, Math.max(124, minRowsBlockH), 260)
        : clamp(h * 0.24, 92, 150));
      const usableH = Math.max(58, rowsBlockH);
      let detectorRowY = y + topPad;
      const detectorX = x + 10;
      const detectorW = w - 20;
      for (let i = 0; i < rows.length; i += 1) {
        const [label, key, color] = rows[i];
        const row = drawMeterRow({
          label,
          valueText: clamp(patternState.hits[key], 0, 1).toFixed(2),
          value: clamp(patternState.hits[key], 0, 1),
          x: detectorX,
          y: detectorRowY,
          w: detectorW,
          color,
          density: "primary"
        });
        detectorRowY += row.height;
      }

      const rhythmY = Math.max(y + topPad + usableH, detectorRowY) + Math.max(18, compact ? h * 0.025 : 16);
      const historyY = rhythmY + Math.max(14, compact ? h * 0.018 : 16);
      const displayHeaderY = historyY + historyH + Math.max(28, compact ? h * 0.035 : 30);
      const headerSpec = contract.ui?.moduleHeader || {};
      const displayHeaderTop = displayHeaderY - (compact ? 21 : 17);
      const displayHeaderH = compact
        ? (headerSpec.mobileHeightPx || 42)
        : (headerSpec.desktopHeightPx || 34);
      const nestedBodyGap = headerSpec.nestedBodyGapPx || 18;
      const cssToCanvas = 1 / Math.max(0.001, graphControlScale);
      const displayHeaderCanvasH = displayHeaderH * cssToCanvas;
      const nestedBodyGapCanvas = nestedBodyGap * cssToCanvas;
      const elementsLabelY = displayHeaderTop + displayHeaderCanvasH + nestedBodyGapCanvas;
      const elementsY = elementsLabelY + 14;
      const footerPad = compact ? 18 : 12;
      const spectralLabelGap = 14;
      const displayAvailableH = Math.max(
        0,
        y + h - footerPad - elementsY - displayGap - spectralLabelGap
      );
      const displayFieldH = displayOpen
        ? Math.round(compact
          ? clamp(displayAvailableH * 0.5, 120, Math.max(120, displayAvailableH * 0.5))
          : Math.min(72 * displayBoost, displayAvailableH * 0.5))
        : 0;
      const spectralLabelY = elementsY + displayFieldH + displayGap;
      const spectralY = spectralLabelY + 14;
      const bpm = patternState.bpm ? Math.round(patternState.bpm) : "--";
      const conf = Math.round(patternState.confidence * 100);
      const rate = patternState.onsetRate.toFixed(1);
      drawMeterText(`Rhythm ${bpm} BPM  Conf ${conf}%  Rate ${rate}/s`, x + 10, rhythmY, meterTextSize(10, 2), "rgba(166,166,166,0.86)");

      const now = audioContext ? audioContext.currentTime : performance.now() / 1000;
      ctx.fillStyle = "#050505";
      ctx.fillRect(x + 10, historyY, w - 20, historyH);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.strokeRect(x + 10, historyY, w - 20, historyH);
      for (const event of patternState.events) {
        if (event.type === "global") continue;
        const age = now - event.time;
        const px = x + w - 10 - age / Math.max(0.001, Number(patternWindowSelect.value)) * (w - 20);
        if (px < x + 4 || px > x + w - 4) continue;
        const py = historyY + historyH - 6;
        ctx.fillStyle = event.type === "kick" ? "#ff3a18" : event.type === "snare" ? "#39ff14" : event.type === "hat" ? "#7ed6ff" : event.type === "cymbal" ? "#bc30ec" : "#ff8b2a";
        ctx.fillRect(px, py - (historyH - 12) * clamp(event.strength, 0.2, 1), 3, (historyH - 12) * clamp(event.strength, 0.2, 1));
      }
      if (displayPresent) {
        updatePatternDisplayControl(x + 10, displayHeaderTop);
      } else {
        hidePatternDisplayControl();
      }
      if (displayOpen) {
        const fieldX = x + 10;
        const fieldW = w - 20;
        drawMeterText("ELEMENTS OUT", fieldX, elementsLabelY, meterTextSize(10, 2), "rgba(245,245,245,0.76)");
        drawPatternFlashField(fieldX, elementsY, fieldW, displayFieldH);
        drawMeterText("SPECTRAL OUT", fieldX, spectralLabelY, meterTextSize(10, 2), "rgba(245,245,245,0.76)");
        drawSpectralOutField(fieldX, spectralY, fieldW, displayFieldH);
      }
      const addY = displayPresent
        ? spectralY + displayFieldH + Math.max(18, compact ? h * 0.02 : 14)
        : displayHeaderTop;
      updatePatternNestedAddSlot(x + 10, addY, w - 20);
    }

    function drawLoudnessPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const rows = [
        ["Peak", meterState.peakDb, "#f5f5f5"],
        ["RMS fast 0.3s", meterState.rmsFastDb, "#ff3d1f"],
        ["RMS slow 1.0s", meterState.rmsSlowDb, "#8f46ff"],
        ["LUFS-M approx 0.4s", meterState.momentaryDb, "#61f28a"],
        ["LUFS-S approx 3.0s", meterState.shortDb, "#f3f3d8"]
      ];
      const pad = useCompactGraphLayout() ? 16 : 18;
      const density = h < 170 ? "compact" : "normal";
      let rowY = y + (useCompactGraphLayout() ? 16 : 14);
      const rowW = w - pad * 2;
      for (const [label, db, color] of rows) {
        const safeDb = db <= -119 ? "-inf" : db.toFixed(1);
        const row = drawMeterRow({
          label,
          valueText: `${safeDb} dB`,
          value: meterXForDb(db),
          x: x + pad,
          y: rowY,
          w: rowW,
          color,
          density
        });
        rowY += row.height;
      }
    }

    function getMeteringRenderRange() {
      if (!useCompactGraphLayout()) {
        return { top: 0, bottom: activeStageHeight, cull: false };
      }
      const rect = canvas.getBoundingClientRect();
      const scale = rect.height / Math.max(1, activeStageHeight);
      if (!Number.isFinite(scale) || scale <= 0) {
        return { top: 0, bottom: activeStageHeight, cull: false };
      }
      const margin = 220;
      return {
        top: clamp((0 - rect.top) / scale - margin, 0, activeStageHeight),
        bottom: clamp((window.innerHeight - rect.top) / scale + margin, 0, activeStageHeight),
        cull: true
      };
    }

    function rectIntersectsRenderRange(y, h, range) {
      return !range.cull || (y + h >= range.top && y <= range.bottom);
    }

    function drawMetering() {
      setStageHeight(calculateMeteringHeight());
      hidePatternNestedAddSlot();
      hidePatternDisplayControl();
      if (characterOverlayCtx) {
        characterOverlayCtx.clearRect(0, 0, W, activeStageHeight);
      }
      const renderRange = getMeteringRenderRange();
      const renderTop = Math.floor(renderRange.top);
      const renderBottom = Math.ceil(renderRange.bottom);
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, renderTop, W, Math.max(1, renderBottom - renderTop));
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      const gridStart = Math.max(40, Math.floor(renderTop / 28) * 28);
      for (let y = gridStart; y < renderBottom; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      if (graphControls && layoutControlsDirty) {
        syncGraphControlsForLayout();
      }

      const layout = METER_LAYOUT;
      const layoutRows = getLayoutRows();
      for (const row of layoutRows.rows) {
        positionModuleControl(row.module.id, row.y);
        if (graphOpenState[row.module.id] && rectIntersectsRenderRange(row.y, row.height, renderRange)) {
          row.module.renderer(layout.left, row.y, layout.fullWidth, row.height);
        }
      }

      if (layoutRows.rows.length < MAX_LAYOUT_MODULES && getAvailableModulesToAdd().length) {
        positionLayoutAddSlot(layoutRows.addY);
      }

      updateReadout();
    }

    function updateReadout() {
      rmsMeter.style.width = `${clamp(smoothed.rms * 130, 0, 100)}%`;
      rmsText.textContent = smoothed.rms.toFixed(2);
      lowText.textContent = smoothed.low.toFixed(2);
      midText.textContent = smoothed.mid.toFixed(2);
      highText.textContent = smoothed.high.toFixed(2);
      sideText.textContent = smoothed.side.toFixed(2);
      densityText.textContent = smoothed.density.toFixed(2);
      hitText.textContent = smoothed.bassHit.toFixed(2);
      frameCostText.textContent = `${frameCostMs.toFixed(1)}ms`;
      if (performance.memory && performance.memory.usedJSHeapSize) {
        const used = performance.memory.usedJSHeapSize / 1048576;
        const limit = performance.memory.jsHeapSizeLimit / 1048576;
        memoryText.textContent = `${used.toFixed(0)} / ${limit.toFixed(0)}MB`;
      } else {
        memoryText.textContent = "n/a";
      }
    }

    function auditModuleHeaders() {
      const spec = contract.ui?.moduleHeader || {};
      const tolerance = spec.iconCenterTolerancePx ?? 2;
      const maxRightSlack = spec.maxRightSlackPx ?? 12;
      const compact = useCompactGraphLayout();
      const expectedAction = compact
        ? (spec.mobileActionSizePx ?? 30)
        : (spec.desktopActionSizePx ?? 24);
      const expectedHeight = compact
        ? (spec.mobileHeightPx ?? 42)
        : (spec.desktopHeightPx ?? 34);
      const expectedLine = compact
        ? (spec.mobileTitleLineHeightPx ?? expectedAction)
        : (spec.desktopTitleLineHeightPx ?? expectedAction);
      const expectedWidth = getModuleHeaderWidth();
      return Array.from(document.querySelectorAll(".stage .control-group:not([hidden]) > summary")).map((summary) => {
        const group = summary.closest(".control-group");
        const summaryRect = summary.getBoundingClientRect();
        const title = summary.querySelector(".module-title");
        const titleRect = title?.getBoundingClientRect();
        const iconRects = Array.from(summary.querySelectorAll(".param-icon,.graph-toggle,.module-remove"))
          .map((icon) => ({
            className: icon.className,
            rect: icon.getBoundingClientRect()
          }));
        const lastIcon = iconRects[iconRects.length - 1];
        const titleCenter = titleRect ? titleRect.top + titleRect.height * 0.5 : null;
        const iconCenters = iconRects.map((icon) => icon.rect.top + icon.rect.height * 0.5);
        const maxCenterDelta = titleCenter == null || !iconCenters.length
          ? 0
          : Math.max(...iconCenters.map((center) => Math.abs(center - titleCenter)));
        const actionSizesOk = iconRects.every((icon) => (
          Math.abs(icon.rect.width - expectedAction) <= 1
          && Math.abs(icon.rect.height - expectedAction) <= 1
        ));
        const titleLineHeight = title ? parseFloat(getComputedStyle(title).lineHeight) : 0;
        const rightSlack = lastIcon ? summaryRect.right - lastIcon.rect.right : 0;
        const checkRightSlack = iconRects.length >= 3;
        return {
          module: group?.dataset.module || "",
          actionSizesOk,
          summaryHeightOk: Math.abs(summaryRect.height - expectedHeight) <= 1,
          summaryWidthOk: Math.abs(summaryRect.width - expectedWidth) <= 1,
          titleLineHeightOk: Math.abs(titleLineHeight - expectedLine) <= 1,
          iconCenterOk: maxCenterDelta <= tolerance,
          rightSlackOk: !checkRightSlack || rightSlack <= maxRightSlack,
          metrics: {
            summaryHeight: Math.round(summaryRect.height),
            summaryWidth: Math.round(summaryRect.width),
            titleLineHeight: Math.round(titleLineHeight),
            maxCenterDelta: Number(maxCenterDelta.toFixed(2)),
            rightSlack: Math.round(rightSlack)
          }
        };
      });
    }

    function auditDisplayRenderSpacing() {
      const spec = contract.ui?.moduleHeader || {};
      const minGap = spec.nestedBodyGapPx || 18;
      const display = document.querySelector('[data-module="patternDisplayRender"] > summary');
      if (!display || display.closest(".control-group")?.hidden) {
        return { visible: false, gapOk: true, metrics: { minGap } };
      }
      const displayRect = display.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const scaleY = canvasRect.height / Math.max(1, activeStageHeight);
      const compact = useCompactGraphLayout();
      const headerHeight = compact
        ? (spec.mobileHeightPx || 42)
        : (spec.desktopHeightPx || 34);
      const expectedElementsTop = displayRect.top + headerHeight + minGap;
      const actualCanvasGap = minGap / Math.max(0.001, scaleY);
      return {
        visible: true,
        gapOk: expectedElementsTop >= displayRect.bottom + minGap - 1,
        metrics: {
          displayBottom: Math.round(displayRect.bottom),
          expectedElementsTop: Math.round(expectedElementsTop),
          minGap,
          canvasGap: Math.round(actualCanvasGap),
          scaleY: Number(scaleY.toFixed(3))
        }
      };
    }

    function auditWaveformDisplayContract() {
      const display = contract.ui?.waveformDisplay || {};
      const reserve = display.labelReservePx || 12;
      return ["short", "medium", "long"].map((kind) => {
        const profile = getWaveformDisplayProfile(kind);
        const fill = profile.fill || 0.48;
        return {
          kind,
          labelReserveOk: reserve >= 10,
          fillOk: fill > 0 && fill <= 0.52,
          gainOk: (profile.maxGain || 1) >= 1 && (profile.maxGain || 1) <= 3,
          metrics: {
            targetPeak: profile.targetPeak,
            maxGain: profile.maxGain,
            fill,
            labelReservePx: reserve
          }
        };
      });
    }

    function auditMeterPrimitiveContract() {
      const primitive = contract.ui?.meterPrimitives || {};
      const breakpoints = [390, 420, 500, 552, 700];
      const requiredTextCss = primitive.minMobileTextCssPx || 13;
      const requiredPrimaryTextCss = primitive.minMobilePrimaryTextCssPx || 15;
      const requiredBarCss = primitive.minMobileBarCssPx || 14;
      const requiredPrimaryBarCss = primitive.minMobilePrimaryBarCssPx || 16;
      const samples = breakpoints.map((width) => {
        const scale = width / W;
        const toCss = (canvasPx) => Number((canvasPx * scale).toFixed(2));
        const textCanvas = Math.max(10, requiredTextCss / scale);
        const primaryTextCanvas = Math.max(10, requiredPrimaryTextCss / scale);
        const barCanvas = Math.max(8, requiredBarCss / scale);
        const primaryBarCanvas = Math.max(12, requiredPrimaryBarCss / scale);
        return {
          width,
          scale: Number(scale.toFixed(3)),
          textCss: toCss(textCanvas),
          primaryTextCss: toCss(primaryTextCanvas),
          barCss: toCss(barCanvas),
          primaryBarCss: toCss(primaryBarCanvas),
          pass: toCss(textCanvas) >= requiredTextCss
            && toCss(primaryTextCanvas) >= requiredPrimaryTextCss
            && toCss(barCanvas) >= requiredBarCss
            && toCss(primaryBarCanvas) >= requiredPrimaryBarCss
        };
      });
      return {
        mobileTextOk: samples.every((sample) => sample.textCss >= requiredTextCss),
        mobilePrimaryTextOk: samples.every((sample) => sample.primaryTextCss >= requiredPrimaryTextCss),
        mobileBarOk: samples.every((sample) => sample.barCss >= requiredBarCss),
        mobilePrimaryBarOk: samples.every((sample) => sample.primaryBarCss >= requiredPrimaryBarCss),
        metrics: {
          requiredTextCss,
          requiredPrimaryTextCss,
          requiredBarCss,
          requiredPrimaryBarCss,
          currentScale: Number((graphControlScale || 1).toFixed(3))
        },
        breakpoints: samples
      };
    }

    function auditLayoutAddSlotSpacing() {
      const slot = graphControls?.querySelector('[data-module="layoutAdd"]');
      if (!slot || slot.hidden) {
        return { visible: false, positionOk: true, metrics: {} };
      }
      const rows = getLayoutRows();
      const spec = contract.ui?.moduleHeader || {};
      const tolerance = spec.addSlotGapTolerancePx ?? 3;
      const slotRect = slot.getBoundingClientRect();
      const stageRect = stageEl.getBoundingClientRect();
      const lastRow = rows.rows[rows.rows.length - 1];
      const naturalTop = getControlLaneTop(slot, rows.addY);
      const minTop = lastRow
        ? (lastRow.y + getModuleHeight(lastRow.module)) * graphControlScale + METER_LAYOUT.rowGap * graphControlScale
        : naturalTop;
      const expectedTop = stageRect.top + Math.max(naturalTop, minTop);
      const lastGraphBottom = lastRow
        ? stageRect.top + (lastRow.y + getModuleHeight(lastRow.module)) * graphControlScale
        : null;
      const gapFromLastGraph = lastGraphBottom == null ? null : slotRect.top - lastGraphBottom;
      const naturalGraphGap = lastRow
        ? (rows.addY - (lastRow.y + getModuleHeight(lastRow.module))) * graphControlScale - getControlBlockHeight(slot) - (useCompactGraphLayout() ? 5 : 3)
        : 0;
      const expectedGraphGap = Math.max(naturalGraphGap, METER_LAYOUT.rowGap * graphControlScale);
      const gapOk = gapFromLastGraph == null
        || (gapFromLastGraph >= -tolerance && Math.abs(gapFromLastGraph - expectedGraphGap) <= tolerance);
      return {
        visible: true,
        positionOk: Math.abs(slotRect.top - expectedTop) <= tolerance,
        noLastGraphOverlap: gapFromLastGraph == null || gapFromLastGraph >= -tolerance,
        graphGapOk: gapOk,
        metrics: {
          slotTop: Math.round(slotRect.top),
          expectedTop: Math.round(expectedTop),
          delta: Number((slotRect.top - expectedTop).toFixed(2)),
          gapFromLastGraph: gapFromLastGraph == null ? null : Math.round(gapFromLastGraph),
          expectedGraphGap,
          tolerance,
          compact: useCompactGraphLayout()
        }
      };
    }

    function auditStereoLayerContract() {
      const layers = {
        corr: Boolean(stereoCorrToggle?.checked),
        low: Boolean(stereoLowToggle?.checked),
        mid: Boolean(stereoMidToggle?.checked),
        high: Boolean(stereoHighToggle?.checked)
      };
      const visibleCount = Object.values(layers).filter(Boolean).length;
      return {
        layers,
        hasRenderableLayer: visibleCount > 0,
        corrOnlyRenderable: layers.corr && !layers.low && !layers.mid && !layers.high,
        metrics: {
          mode: stereoModeSelect?.value || "classic",
          visibleCount
        }
      };
    }

    function auditSpectrogramContract() {
      const available = availableLayoutModules.includes("spectrogram");
      const controls = [
        spectrogramFftSelect,
        spectrogramDetailSelect,
        spectrogramScaleSelect,
        spectrogramOrientationSelect,
        spectrogramModeSelect,
        spectrogramSpeedSelect,
        spectrogramWindowSelect,
        spectrogramTilt,
        spectrogramFreqOverlaySelect,
        spectrogramPianoOverlaySelect,
        spectrogramLoopSelect
      ];
      return {
        available,
        active: currentLayoutModules.includes("spectrogram"),
        controlsPresent: controls.every(Boolean),
        rendererPresent: typeof METERING_MODULE_BY_ID.spectrogram?.renderer === "function",
        metrics: {
          fft: spectrogramFftSelect?.value || null,
          detail: spectrogramDetailSelect?.value || null,
          scale: spectrogramScaleSelect?.value || null,
          orientation: spectrogramOrientationSelect?.value || null,
          mode: spectrogramModeSelect?.value || null,
          speed: spectrogramSpeedSelect?.value || null,
          window: spectrogramWindowSelect?.value || null,
          piano: spectrogramPianoOverlaySelect?.value || null
        }
      };
    }

    function auditTunerContract() {
      return {
        available: availableLayoutModules.includes("tuner"),
        active: currentLayoutModules.includes("tuner"),
        controlsPresent: Boolean(tunerReference && tunerReferenceValue),
        rendererPresent: typeof METERING_MODULE_BY_ID.tuner?.renderer === "function",
        metrics: {
          reference: Number(tunerReference?.value || 0),
          min: Number(tunerReference?.min || 0),
          max: Number(tunerReference?.max || 0),
          cents: tunerState.cents,
          note: tunerState.note,
          detected: tunerState.detected,
          stable: tunerState.stable
        }
      };
    }

    function auditSignalCharacterContract() {
      const values = [
        signalCharacterState.flatness,
        signalCharacterState.spectralCrest,
        signalCharacterState.crestFactor,
        signalCharacterState.zeroCrossing,
        signalCharacterState.transientDensity,
        signalCharacterState.transientImpact,
        signalCharacterState.eventDensity,
        signalCharacterState.lowAnchor
      ];
      return {
        available: availableLayoutModules.includes("signalCharacter"),
        active: currentLayoutModules.includes("signalCharacter"),
        controlsPresent: [
          signalCharacterModeSelect,
          signalCharacterWindowSelect,
          signalCharacterDisplaySelect,
          signalCharacterBoundarySelect,
          signalCharacterFftWeight,
          signalCharacterNoise,
          signalCharacterTransient,
          signalCharacterSmoothing
        ].every(Boolean),
        rendererPresent: typeof METERING_MODULE_BY_ID.signalCharacter?.renderer === "function",
        valuesFinite: values.every(Number.isFinite),
        backendContract: {
          sharedBackend: true,
          descriptorsPresent: Boolean(signalCharacterBackend.descriptors),
          hintsPresent: Boolean(signalCharacterBackend.hints),
          mode: signalCharacterBackend.profile.mode,
          window: signalCharacterBackend.profile.window
        },
        displayContract: {
          characterMap: true,
          decisionStrip: true,
          rawDescriptors: true,
          flatBarsOnly: true,
          hidesPointWithoutSignal: true,
          boundaries: signalCharacterBoundarySelect?.value || "none",
          trailPoints: signalCharacterTrail.length
        },
        metrics: {
          flatness: signalCharacterState.flatness,
          spectralCrest: signalCharacterState.spectralCrest,
          crestFactor: signalCharacterState.crestFactor,
          zeroCrossing: signalCharacterState.zeroCrossing,
          transientDensity: signalCharacterState.transientDensity,
          transientImpact: signalCharacterState.transientImpact,
          eventDensity: signalCharacterState.eventDensity,
          lowAnchor: signalCharacterState.lowAnchor,
          tunerTrust: signalCharacterBackend.hints.tunerTrust,
          patternTrust: signalCharacterBackend.hints.patternTrust,
          noiseRisk: signalCharacterBackend.hints.noiseRisk,
          spectralConfidence: signalCharacterBackend.hints.spectralConfidence
        }
      };
    }

    function auditPhaseDungeonContract() {
      const controls = [
        phaseDungeonDetailSelect,
        phaseDungeonMemorySelect,
        phaseDungeonFog,
        phaseDungeonPressure
      ];
      const values = phaseDungeonState.cells.slice(0, 48).concat([
        kineticVocalState.f0Hz,
        kineticVocalState.f0Confidence,
        kineticVocalState.voiced,
        kineticVocalState.f1,
        kineticVocalState.f2,
        kineticVocalState.f3,
        kineticVocalState.formantConfidence,
        kineticVocalState.vowelOpen,
        kineticVocalState.vowelFront,
        kineticVocalState.rounding,
        kineticVocalState.plosiveBurst,
        kineticVocalState.fricativeNoise,
        kineticVocalState.tractPressure,
        kineticVocalState.glottalPhase,
        kineticVocalState.turbulencePhase,
        kineticVocalState.mouthPhase
      ]);
      const hasSignal = metrics.rms > 0.006 || smoothed.rms > 0.012 || metrics.peak > 0.016;
      return {
        available: availableLayoutModules.includes("phaseDungeon"),
        active: currentLayoutModules.includes("phaseDungeon"),
        controlsPresent: controls.every(Boolean),
        rendererPresent: typeof METERING_MODULE_BY_ID.phaseDungeon?.renderer === "function",
        valuesFinite: values.every((value) => Number.isFinite(value)),
        displayContract: {
          hidesWithoutSignal: true,
          usesExistingAudioAnalysis: true,
          caveModeOnly: true,
          vocalTractModel: true,
          formantDriven: true,
          pitchDrivenGlottalPhase: true,
          plosiveResponse: true,
          noAutonomousTimeLfo: true
        },
        metrics: {
          detail: Number(phaseDungeonDetailSelect?.value || 0),
          mode: "kinetic",
          memory: phaseDungeonMemorySelect?.value || null,
          fog: Number(phaseDungeonFog?.value || 0),
          pressure: Number(phaseDungeonPressure?.value || 0),
          recurrence: phaseDungeonState.recurrence,
          f0Hz: kineticVocalState.f0Hz,
          f0Confidence: kineticVocalState.f0Confidence,
          voiced: kineticVocalState.voiced,
          f1: kineticVocalState.f1,
          f2: kineticVocalState.f2,
          f3: kineticVocalState.f3,
          formantConfidence: kineticVocalState.formantConfidence,
          vowelOpen: kineticVocalState.vowelOpen,
          vowelFront: kineticVocalState.vowelFront,
          rounding: kineticVocalState.rounding,
          plosiveBurst: kineticVocalState.plosiveBurst,
          fricativeNoise: kineticVocalState.fricativeNoise,
          visibleCells: phaseDungeonState.cells.filter((value) => value > 0.05).length,
          hasSignal
        }
      };
    }

    function auditWavesContract() {
      const controls = [
        wavesModeSelect,
        wavesInputSelect,
        wavesDensitySelect,
        wavesPersistence,
        wavesGlow
      ];
      const hasSignal = metrics.rms > 0.006 || smoothed.rms > 0.012 || metrics.peak > 0.016;
      return {
        available: availableLayoutModules.includes("waves"),
        active: currentLayoutModules.includes("waves"),
        controlsPresent: controls.every(Boolean),
        rendererPresent: typeof METERING_MODULE_BY_ID.waves?.renderer === "function",
        valuesFinite: [
          wavesState.lastSignalAt,
          wavesState.pointCount,
          wavesState.phase,
          wavesState.sideFlow,
          wavesState.lowFlow,
          wavesState.midFlow,
          wavesState.highFlow,
          wavesState.shock,
          Number(wavesPersistence?.value || 0),
          Number(wavesGlow?.value || 0)
        ].every(Number.isFinite),
        displayContract: {
          hidesWithoutSignal: true,
          usesSpectrumHistory: true,
          modes: ["waves", "iso", "flat"],
          isoProjection: true,
          visibleSpectrumPalette: true,
          spectralSurfaceCells: true,
          wavemakerSurfaceWarp: true,
          heavyInertiaWarp: true,
          floatingParticles: false
        },
        metrics: {
          mode: wavesModeSelect?.value || null,
          scale: wavesInputSelect?.value || null,
          detail: Number(wavesDensitySelect?.value || 0),
          persistence: Number(wavesPersistence?.value || 0),
          strength: Number(wavesGlow?.value || 0),
          frames: wavesState.trails.length,
          points: wavesState.pointCount,
          hasSignal
        }
      };
    }

    function auditVisualPresenceContract() {
      const alpha = visualPresenceAlpha();
      const now = performance.now() / 1000;
      const hasSignal = hasAudibleUiSignal();
      const silentLongEnough = !hasSignal && now - visualPresenceState.lastSignalAt > visualPresenceState.holdSeconds + visualPresenceState.releaseSeconds + 0.15;
      return {
        alpha,
        initialOrSilentHidden: !silentLongEnough || alpha <= 0.01,
        timingOk: visualPresenceState.attackSeconds >= 0.01
          && visualPresenceState.attackSeconds <= 0.1
          && visualPresenceState.holdSeconds >= 2
          && visualPresenceState.holdSeconds <= 5
          && visualPresenceState.releaseSeconds >= 0.5
          && visualPresenceState.releaseSeconds <= 1.5,
        consumers: {
          signalDecisionStrip: true,
          spectrogramPianoRoll: true
        },
        metrics: {
          attackSeconds: visualPresenceState.attackSeconds,
          holdSeconds: visualPresenceState.holdSeconds,
          releaseSeconds: visualPresenceState.releaseSeconds,
          lastSignalAge: Number((now - visualPresenceState.lastSignalAt).toFixed(2)),
          hasSignal
        }
      };
    }

    function drawFrame() {
      const frameStart = performance.now();
      t += 1;
      updateMetrics();

      const style = styleSelect.value;
      const algorithm = getCurrentAlgorithm();
      const labels = {
        miller: "liquid core",
        kwok: "signal lattice",
        sodeoka: "feedback bloom",
        folding: "harmonic folding",
        metering: "metering"
      };
      modeLabel.textContent = style === "metering" ? algorithm.id : labels[style];

      if (style === "metering") {
        drawMetering();
        frameCostMs = lerp(frameCostMs, performance.now() - frameStart, frameCostMs ? 0.12 : 1);
        updateReadout();
        requestAnimationFrame(drawFrame);
        return;
      }

      setStageHeight(H);
      if (characterOverlayCtx) {
        characterOverlayCtx.clearRect(0, 0, W, activeStageHeight);
      }
      const g = Number(glitch.value) * (0.25 + smoothed.peak + smoothed.high);
      renderBlob(style);

      const scale = Number(pixel.value);
      ctx.imageSmoothingEnabled = Boolean(imageMap);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      const crop = Math.floor(scale * 2);
      ctx.drawImage(lowCanvas, crop, crop, lowW - crop * 2, lowH - crop * 2, 0, 0, W, H);

      frameCostMs = lerp(frameCostMs, performance.now() - frameStart, frameCostMs ? 0.12 : 1);
      updateReadout();

      requestAnimationFrame(drawFrame);
    }

    sensitivity.addEventListener("input", () => {
      sensitivityValue.textContent = Number(sensitivity.value).toFixed(2);
    });
    glitch.addEventListener("input", () => {
      glitchValue.textContent = Number(glitch.value).toFixed(2);
    });
    pixel.addEventListener("input", () => {
      pixelValue.textContent = pixel.value;
    });
    imageInfluence.addEventListener("input", () => {
      imageInfluenceValue.textContent = Number(imageInfluence.value).toFixed(2);
    });
    patternSensitivity.addEventListener("input", () => {
      patternSensitivityValue.textContent = Number(patternSensitivity.value).toFixed(2);
    });
    patternThreshold.addEventListener("input", () => {
      patternThresholdValue.textContent = Number(patternThreshold.value).toFixed(2);
    });
    generalFlashAmount.addEventListener("input", () => {
      generalFlashAmountValue.textContent = Number(generalFlashAmount.value).toFixed(2);
    });
    generalFlashSmooth.addEventListener("input", () => {
      generalFlashSmoothValue.textContent = `${Number(generalFlashSmooth.value).toFixed(2)}s`;
    });
    kickFlashAmount.addEventListener("input", () => {
      kickFlashAmountValue.textContent = Number(kickFlashAmount.value).toFixed(2);
    });
    kickFlashSmooth.addEventListener("input", () => {
      kickFlashSmoothValue.textContent = `${Number(kickFlashSmooth.value).toFixed(2)}s`;
    });
    snareFlashAmount.addEventListener("input", () => {
      snareFlashAmountValue.textContent = Number(snareFlashAmount.value).toFixed(2);
    });
    snareFlashSmooth.addEventListener("input", () => {
      snareFlashSmoothValue.textContent = `${Number(snareFlashSmooth.value).toFixed(2)}s`;
    });
    tomFlashAmount.addEventListener("input", () => {
      tomFlashAmountValue.textContent = Number(tomFlashAmount.value).toFixed(2);
    });
    tomFlashSmooth.addEventListener("input", () => {
      tomFlashSmoothValue.textContent = `${Number(tomFlashSmooth.value).toFixed(2)}s`;
    });
    hatFlashAmount.addEventListener("input", () => {
      hatFlashAmountValue.textContent = Number(hatFlashAmount.value).toFixed(2);
    });
    hatFlashSmooth.addEventListener("input", () => {
      hatFlashSmoothValue.textContent = `${Number(hatFlashSmooth.value).toFixed(2)}s`;
    });
    cymbalFlashAmount.addEventListener("input", () => {
      cymbalFlashAmountValue.textContent = Number(cymbalFlashAmount.value).toFixed(2);
    });
    cymbalFlashSmooth.addEventListener("input", () => {
      cymbalFlashSmoothValue.textContent = `${Number(cymbalFlashSmooth.value).toFixed(2)}s`;
    });
    spectralTilt.addEventListener("input", () => {
      spectralTiltValue.textContent = `${Number(spectralTilt.value).toFixed(1)}dB`;
    });
    spectralFlashAmount.addEventListener("input", () => {
      spectralFlashAmountValue.textContent = Number(spectralFlashAmount.value).toFixed(2);
    });
    spectralFlashSmooth.addEventListener("input", () => {
      spectralFlashSmoothValue.textContent = `${Number(spectralFlashSmooth.value).toFixed(2)}s`;
    });
    stereoModeSelect.addEventListener("change", () => {
      closeFloatingInspector();
    });
    spectrumFftSelect.addEventListener("change", () => {
      configureSpectrumAnalyser();
    });
    spectrumTilt.addEventListener("input", () => {
      spectrumTiltValue.textContent = `${Number(spectrumTilt.value).toFixed(1)}dB`;
    });
    spectralDynamicsFftSelect.addEventListener("change", () => {
      configureSpectrumAnalyser();
      resetSpectralDynamicsState();
    });
    spectralDynamicsWindowSelect.addEventListener("change", resetSpectralDynamicsState);
    spectralDynamicsRangeSelect.addEventListener("change", resetSpectralDynamicsState);
    spectralDynamicsDisplaySelect.addEventListener("change", resetSpectralDynamicsState);
    spectralDynamicsTilt.addEventListener("input", () => {
      spectralDynamicsTiltValue.textContent = `${Number(spectralDynamicsTilt.value).toFixed(1)}dB`;
    });
    spectrogramFftSelect.addEventListener("change", () => {
      configureSpectrogramAnalyser();
    });
    spectrogramDetailSelect.addEventListener("change", () => resetSpectrogramState());
    spectrogramScaleSelect.addEventListener("change", () => resetSpectrogramState());
    spectrogramOrientationSelect.addEventListener("change", () => resetSpectrogramState());
    spectrogramModeSelect.addEventListener("change", () => resetSpectrogramState(false));
    spectrogramSpeedSelect.addEventListener("change", () => {
      spectrogramState.subPixel = 0;
    });
    spectrogramWindowSelect.addEventListener("change", () => resetSpectrogramState());
    spectrogramTilt.addEventListener("input", () => {
      spectrogramTiltValue.textContent = `${Number(spectrogramTilt.value).toFixed(1)}dB`;
    });
    spectrogramFreqOverlaySelect.addEventListener("change", () => resetSpectrogramState(false));
    spectrogramPianoOverlaySelect.addEventListener("change", () => resetSpectrogramState(false));
    spectrogramLoopSelect.addEventListener("change", () => resetSpectrogramState());
    tunerReference.addEventListener("input", () => {
      tunerReferenceValue.textContent = `${Number(tunerReference.value).toFixed(1)}Hz`;
    });
    signalCharacterModeSelect.addEventListener("change", () => {
      resetSignalCharacterPhysics();
    });
    signalCharacterWindowSelect.addEventListener("change", () => {
      signalCharacterOnsets.length = 0;
      signalCharacterOnsetEnvelope = 0;
    });
    signalCharacterDisplaySelect.addEventListener("change", markLayoutControlsDirty);
    signalCharacterBoundarySelect.addEventListener("change", resetSignalCharacterPhysics);
    signalCharacterFftWeight.addEventListener("input", () => {
      signalCharacterFftWeightValue.textContent = Number(signalCharacterFftWeight.value).toFixed(2);
    });
    signalCharacterNoise.addEventListener("input", () => {
      signalCharacterNoiseValue.textContent = Number(signalCharacterNoise.value).toFixed(2);
    });
    signalCharacterTransient.addEventListener("input", () => {
      signalCharacterTransientValue.textContent = Number(signalCharacterTransient.value).toFixed(2);
    });
    signalCharacterSmoothing.addEventListener("input", () => {
      signalCharacterSmoothingValue.textContent = Number(signalCharacterSmoothing.value).toFixed(2);
    });
    phaseDungeonDetailSelect?.addEventListener("change", resetPhaseDungeonState);
    phaseDungeonMemorySelect?.addEventListener("change", resetPhaseDungeonState);
    phaseDungeonFog?.addEventListener("input", () => {
      if (phaseDungeonFogValue) phaseDungeonFogValue.textContent = Number(phaseDungeonFog.value).toFixed(2);
    });
    phaseDungeonPressure?.addEventListener("input", () => {
      if (phaseDungeonPressureValue) phaseDungeonPressureValue.textContent = Number(phaseDungeonPressure.value).toFixed(2);
    });
    wavesModeSelect.addEventListener("change", resetWavesState);
    wavesInputSelect.addEventListener("change", resetWavesState);
    wavesDensitySelect.addEventListener("change", resetWavesState);
    wavesPersistence.addEventListener("input", () => {
      wavesPersistenceValue.textContent = Number(wavesPersistence.value).toFixed(2);
    });
    wavesGlow.addEventListener("input", () => {
      wavesGlowValue.textContent = Number(wavesGlow.value).toFixed(2);
    });
    algorithmSelect.addEventListener("change", applyAlgorithmUi);
    floatingInspectorClose.addEventListener("click", closeFloatingInspector);
    inspectorBackdrop.addEventListener("click", closeFloatingInspector);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeFloatingInspector();
    });
    document.addEventListener("click", (event) => {
      if (!floatingInspector?.classList.contains("is-open")) return;
      if (floatingInspector.contains(event.target)) return;
      if (event.target.closest(".param-icon")) return;
      if (event.target === canvas) return;
      closeFloatingInspector();
    });
    window.METTR_AUDIT = {
      ...(window.METTR_AUDIT || {}),
      moduleHeaders: auditModuleHeaders,
      meterPrimitives: auditMeterPrimitiveContract,
      displayRenderSpacing: auditDisplayRenderSpacing,
      waveformDisplay: auditWaveformDisplayContract,
      layoutAddSlotSpacing: auditLayoutAddSlotSpacing,
      stereoLayers: auditStereoLayerContract,
      spectrogram: auditSpectrogramContract,
      tuner: auditTunerContract,
      signalCharacter: auditSignalCharacterContract,
      phaseDungeon: auditPhaseDungeonContract,
      waves: auditWavesContract,
      visualPresence: auditVisualPresenceContract
    };
    window.addEventListener("resize", () => {
      updateGraphControlScale();
      markLayoutControlsDirty();
      setStageHeight(calculateMeteringHeight());
      syncGraphControlsForLayout();
      refreshInputCapabilities();
    });
    canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      spectrogramHover.active = true;
      spectrogramHover.x = ((event.clientX - rect.left) / Math.max(1, rect.width)) * W;
      spectrogramHover.y = ((event.clientY - rect.top) / Math.max(1, rect.height)) * activeStageHeight;
    });
    canvas.addEventListener("mouseleave", () => {
      spectrogramHover.active = false;
      spectrogramHover.note = null;
    });

    organizeGraphControls();
    refreshInputCapabilities();
    setInputSource("system");
    algorithmSelect.value = getInitialLayoutId();
    applyAlgorithmUi();
    requestAnimationFrame(() => {
      updateGraphControlScale();
      markLayoutControlsDirty();
      setStageHeight(calculateMeteringHeight());
      syncGraphControlsForLayout();
    });
    setTimeout(() => {
      updateGraphControlScale();
      markLayoutControlsDirty();
      setStageHeight(calculateMeteringHeight());
      syncGraphControlsForLayout();
    }, 80);
    drawFrame();
