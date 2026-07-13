const canvas = document.getElementById("blobCanvas");
    const stageEl = canvas.closest(".stage");
    const ctx = canvas.getContext("2d", { alpha: false });
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
    const scopeFollowSelect = document.getElementById("scopeFollowSelect");
    const waveformChannelSelect = document.getElementById("waveformChannelSelect");
    const waveformColorSelect = document.getElementById("waveformColorSelect");
    const waveformPeakSelect = document.getElementById("waveformPeakSelect");
    const waveformSpeedSelect = document.getElementById("waveformSpeedSelect");
    const waveformLoopSelect = document.getElementById("waveformLoopSelect");
    const graphControls = document.querySelector(".graph-controls");
    const spectrumControlsMount = document.getElementById("spectrumControlsMount");
    const oscilloscopeControlsMount = document.getElementById("oscilloscopeControlsMount");
    const waveformShortControlsMount = document.getElementById("waveformShortControlsMount");
    const waveformMediumControlsMount = document.getElementById("waveformMediumControlsMount");
    const waveformLongControlsMount = document.getElementById("waveformLongControlsMount");
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
    let previousFreqData = new Uint8Array(1024);
    let previousPatternFreqData = new Uint8Array(1024);
    let inputSource = "system";
    let metrics = { rms: 0, low: 0, mid: 0, high: 0, side: 0, peak: 0, density: 0, centroid: 0, bassHit: 0, midHit: 0, flux: 0, left: 0, right: 0 };
    let smoothed = { rms: 0, low: 0, mid: 0, high: 0, side: 0, peak: 0, density: 0, centroid: 0, bassHit: 0, midHit: 0, flux: 0, left: 0, right: 0 };
    let frameCostMs = 0;
    const meterState = {
      spectrum: [],
      spectrumDelta: [],
      spectrumPeak: [],
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
      cymbalFlash: 0
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
    const meteringAlgorithms = contract.algorithms;
    const METERING_RENDERERS = {
      drawSpectrumPanel,
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
    const METERING_FLOW = contract.flow;
    const graphOpenState = {
      spectrum: true,
      oscilloscope: true,
      waveformShort: true,
      waveformMedium: true,
      waveformLong: true,
      stereo: true,
      loudness: true,
      pattern: true,
      patternDisplayRender: true
    };
    let patternDisplayToggleRect = null;
    let patternDisplayGearRect = null;
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

    function lerp(a, b, amount) {
      return a + (b - a) * amount;
    }

    function smoothstep(edge0, edge1, value) {
      const x = clamp((value - edge0) / (edge1 - edge0), 0, 1);
      return x * x * (3 - 2 * x);
    }

    function getCurrentAlgorithm() {
      return meteringAlgorithms[algorithmSelect.value] || meteringAlgorithms.nmstr;
    }

    function getAlgorithmModuleIds(algorithm = getCurrentAlgorithm(), seen = new Set()) {
      if (!algorithm || seen.has(algorithm.id)) return [];
      seen.add(algorithm.id);
      const inherited = algorithm.extends
        ? getAlgorithmModuleIds(meteringAlgorithms[algorithm.extends], seen)
        : [];
      return [...new Set([...inherited, ...(algorithm.modules || [])])];
    }

    function getModuleRect(module) {
      return METER_LAYOUT[module.rect || module.id];
    }

    function getCompactResponsiveT() {
      if (!useCompactGraphLayout()) return 0;
      const responsive = contract.responsive || {};
      const minWidth = responsive.compactMinWidth || 360;
      const maxWidth = responsive.compactMaxWidth || 600;
      const width = stageEl.clientWidth || window.innerWidth || maxWidth;
      const t = clamp((maxWidth - width) / Math.max(1, maxWidth - minWidth), 0, 1);
      return smoothstep(0, 1, t);
    }

    function getModuleHeightScale(module) {
      if (!useCompactGraphLayout()) return 1;
      const moduleScale = contract.responsive?.modules?.[module.id]?.compactScale || 1;
      return lerp(1, moduleScale, getCompactResponsiveT());
    }

    function getModuleHeight(module, compact = useCompactGraphLayout()) {
      const rect = getModuleRect(module);
      const baseHeight = compact && rect.compactHeight ? rect.compactHeight : rect.height;
      return Math.round(baseHeight * getModuleHeightScale(module));
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
      if (module.flow === "dual" && compact) {
        const compactBase = rect.compactHeight || rect.height;
        const heightDelta = getModuleHeight(module, compact) - compactBase;
        return METER_LAYOUT.compactMeterAdvance
          + Math.max(0, heightDelta)
          + getCompactAdvanceClearance(module, compactBase, METER_LAYOUT.compactMeterAdvance);
      }
      const heightDelta = getModuleHeight(module, compact) - rect.height;
      return rect.advance
        + Math.max(0, heightDelta)
        + getCompactAdvanceClearance(module, rect.height, rect.advance);
    }

    function getModuleAdvance(module, compact = useCompactGraphLayout()) {
      return graphOpenState[module.id]
        ? getOpenAdvance(module, compact)
        : getCollapsedAdvance(module, compact);
    }

    function moveControlById(id, mount) {
      const control = document.getElementById(id);
      const wrapper = control ? control.closest("label") : null;
      if (wrapper && mount) mount.appendChild(wrapper);
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

    function organizeGraphControls() {
      if (graphControls && graphControls.parentElement !== stageEl) {
        stageEl.appendChild(graphControls);
      }
      graphControls?.querySelectorAll(".control-group").forEach((group) => {
        group.querySelector("summary")?.addEventListener("click", (event) => {
          const clickedToggle = event.target.closest(".graph-toggle");
          if (clickedToggle) return;
          event.preventDefault();
          if (!event.target.closest(".param-icon")) return;
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
        const toggle = group.querySelector(".graph-toggle");
        toggle?.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const key = group.dataset.module;
          graphOpenState[key] = !graphOpenState[key];
          toggle.textContent = graphOpenState[key] ? "-" : "+";
          toggle.setAttribute("aria-pressed", graphOpenState[key] ? "true" : "false");
        });
      });
      moveControlById("spectrumFftSelect", spectrumControlsMount);
      moveControlById("spectrumBarsSelect", spectrumControlsMount);
      moveControlById("scopeFollowSelect", oscilloscopeControlsMount);
      moveControlById("waveformChannelSelect", waveformShortControlsMount);
      moveControlById("waveformColorSelect", waveformShortControlsMount);
      moveControlById("waveformPeakSelect", waveformMediumControlsMount);
      moveControlById("waveformSpeedSelect", waveformMediumControlsMount);
      moveControlById("waveformLoopSelect", waveformLongControlsMount);

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

    function positionModuleControl(key, graphTop) {
      const group = graphControls?.querySelector(`[data-module="${key}"]`);
      if (!group) return;
      const layout = METER_LAYOUT;
      const compact = useCompactGraphLayout();
      const scale = graphControlScale;
      const controlGap = compact ? 5 : 3;
      const controlTop = graphTop * scale - getModuleControlHeight(group) - controlGap;
      group.style.top = `${Math.max(2, controlTop)}px`;
      if (compact && (key === "stereo" || key === "loudness")) {
        group.style.left = `${layout.left * scale}px`;
        group.style.width = `${layout.fullWidth * scale}px`;
      } else if (key === "loudness") {
        group.style.left = `${layout.rightColumnX * scale}px`;
        group.style.width = `${layout.halfWidth * scale}px`;
      } else if (key === "stereo") {
        group.style.left = `${layout.left * scale}px`;
        group.style.width = `${layout.halfWidth * scale}px`;
      } else {
        group.style.left = `${layout.left * scale}px`;
        group.style.width = `${layout.fullWidth * scale}px`;
      }
    }

    function updateGraphControlScale() {
      if (!graphControls) return;
      graphControlScale = stageEl.clientWidth / W;
      graphControls.style.width = `${stageEl.clientWidth}px`;
      graphControls.style.height = `${activeStageHeight * graphControlScale}px`;
      graphControls.style.transform = "none";
    }

    function useCompactGraphLayout() {
      return stageEl.clientWidth < METER_LAYOUT.compactBreakpoint;
    }

    function calculateMeteringHeight() {
      const layout = METER_LAYOUT;
      const compact = useCompactGraphLayout();
      let y = getMeteringTop();
      const moduleIds = getAlgorithmModuleIds();
      for (const item of METERING_FLOW) {
        if (item.type === "module") {
          if (!moduleIds.includes(item.id)) continue;
          const module = METERING_MODULE_BY_ID[item.id];
          if (item.beforeGap || module.beforeGap) y += layout.rowGap;
          y += getModuleAdvance(module, compact);
        } else if (item.type === "dual") {
          const modules = item.ids
            .filter((id) => moduleIds.includes(id))
            .map((id) => METERING_MODULE_BY_ID[id]);
          if (!modules.length) continue;
          if (compact) {
            for (const module of modules) y += getModuleAdvance(module, compact);
          } else {
            y += modules.some((module) => graphOpenState[module.id])
              ? layout.dualMetersAdvance
              : layout.stackedCollapsedAdvance;
          }
        }
      }
      return Math.max(layout.minHeight, Math.ceil(y + layout.bottom));
    }

    function setStageHeight(height) {
      const nextHeight = Math.max(420, Math.ceil(height));
      if (activeStageHeight === nextHeight && canvas.height === nextHeight) return;
      activeStageHeight = nextHeight;
      canvas.height = nextHeight;
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
      const algorithm = getCurrentAlgorithm();
      modeLabel.textContent = algorithm.id;
      algorithmSelectLabel.textContent = algorithmSelect.options[algorithmSelect.selectedIndex]?.textContent || algorithm.id;
      document.body.dataset.algorithm = algorithmSelect.value;
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
      const intensity = Math.max(...Object.values(levels));
      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.strokeRect(x, y, w, h);
      ctx.fillStyle = getPatternFlashColor(levels);
      ctx.globalAlpha = clamp(0.16 + intensity * 0.84, 0, 1);
      ctx.fillRect(x + 1, y + 1, w - 2, h - 2);
      ctx.globalAlpha = 1;
    }

    function computeSpectralOutColor() {
      return window.METTR_DISPLAY_OUTPUT.computeSpectralOutColor(
        { audioContext, floatFreqData, smoothed, spectralOutState, spectralTiltDb: Number(spectralTilt.value) },
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
      drawMeterText(`${hz}Hz  sat ${color.saturation.toFixed(2)}`, x + 8, y + h - 8, 9, "rgba(245,245,245,0.7)");
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

    function configureSpectrumAnalyser() {
      if (!analyser) return;
      analyser.fftSize = Number(spectrumFftSelect.value);
      analyser.minDecibels = -96;
      analyser.maxDecibels = -12;
      analyser.smoothingTimeConstant = 0.06;
      freqData = new Uint8Array(analyser.frequencyBinCount);
      floatFreqData = new Float32Array(analyser.frequencyBinCount);
      previousFreqData = new Uint8Array(analyser.frequencyBinCount);
      previousPatternFreqData = new Uint8Array(analyser.frequencyBinCount);
      timeData = new Uint8Array(analyser.fftSize);
      resetSpectrumState();
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
      const generalRise = 1 - Math.exp(-1 / Math.max(1, generalSmooth * 60));
      const kickRise = 1 - Math.exp(-1 / Math.max(1, kickSmooth * 60));
      const snareRise = 1 - Math.exp(-1 / Math.max(1, snareSmooth * 60));
      const tomRise = 1 - Math.exp(-1 / Math.max(1, tomSmooth * 60));
      const hatRise = 1 - Math.exp(-1 / Math.max(1, hatSmooth * 60));
      const cymbalRise = 1 - Math.exp(-1 / Math.max(1, cymbalSmooth * 60));
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
      const enabled = getCurrentAlgorithm() === meteringAlgorithms.nmstr;
      const generalTarget = enabled ? clamp((metrics.peak * 0.72 + metrics.rms * 0.42) * generalAmount, 0, 1) : 0;
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
      let count = 0;
      const start = Math.max(1, Math.floor(freq.length * 0.01));
      const end = Math.floor(freq.length * 0.92);
      const powers = [];

      for (let i = start; i < end; i += 1) {
        const mag = freq[i] / 255;
        const power = mag * mag + 1e-8;
        arithmetic += power;
        logSum += Math.log(power);
        powerSum += power;
        weighted += power * ((i - start) / Math.max(1, end - start));
        powers.push(power);
        count += 1;
      }

      if (!count || powerSum < 0.00001) {
        return { density: 0, centroid: 0 };
      }

      const flatness = Math.exp(logSum / count) / (arithmetic / count);
      for (const power of powers) {
        const p = power / powerSum;
        entropy -= p * Math.log(p);
      }

      entropy /= Math.log(count);
      const centroid = weighted / powerSum;
      const density = clamp(flatness * 0.62 + entropy * 0.38, 0, 1);
      return { density, centroid };
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
      const nyquist = audioContext.sampleRate / 2;
      for (let i = 0; i < bars; i += 1) {
        const a = i / bars;
        const b = (i + 1) / bars;
        const f0 = 16 * Math.pow(nyquist / 16, Math.pow(a, 1.34));
        const f1 = 16 * Math.pow(nyquist / 16, Math.pow(b, 1.34));
        const center = Math.sqrt(f0 * f1);
        const bandwidth = Math.max(f1 - f0, nyquist / floatFreqData.length * 1.2);
        const samples = i < 72 ? 7 : 5;
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
        const binDb = meanDb * 0.82 + maxDb * 0.18;
        const bassComp = i < 58 ? (1 - i / 58) * 0.045 : 0;
        const shaped = Math.pow(dbToMeter(binDb - bassComp), 1.18);
        const previous = meterState.spectrum[i] || 0;
        const attack = shaped > previous ? 0.82 : 0.34;
        next[i] = lerp(previous, shaped, attack);
        delta[i] = Math.max(0, shaped - previous);
        peak[i] = Math.max(shaped, (meterState.spectrumPeak[i] || 0) - 0.012);
      }
      meterState.spectrum = next;
      meterState.spectrumDelta = delta;
      meterState.spectrumPeak = peak;

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
        const spectral = spectralShapeFeatures(freqData);
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
      updatePatternDetector(hasLiveAudio);

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

    function drawDbBar(label, db, x, y, w, h, color) {
      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#2b2b2b";
      ctx.strokeRect(x, y, w, h);
      const amount = meterXForDb(db);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w * amount, h);
      drawMeterText(label, x, y - 6, 11, "rgba(245,245,245,0.82)");
      drawMeterText(`${db <= -119 ? "-inf" : db.toFixed(1)} dB`, x + w - 68, y - 6, 11, "rgba(166,166,166,0.95)");
    }

    function drawCorrelationBar(label, value, x, y, w, h, color) {
      ctx.fillStyle = "#050505";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#2b2b2b";
      ctx.strokeRect(x, y, w, h);
      const mid = x + w * 0.5;
      ctx.strokeStyle = "rgba(245,245,245,0.35)";
      ctx.beginPath();
      ctx.moveTo(mid, y);
      ctx.lineTo(mid, y + h);
      ctx.stroke();
      const amount = clamp(value, -1, 1);
      ctx.fillStyle = color;
      if (amount >= 0) {
        ctx.fillRect(mid, y, w * 0.5 * amount, h);
      } else {
        ctx.fillRect(mid + w * 0.5 * amount, y, -w * 0.5 * amount, h);
      }
      drawMeterText(label, x, y - 6, 11, "rgba(245,245,245,0.82)");
      drawMeterText(value.toFixed(2), x + w - 34, y - 6, 11, "rgba(166,166,166,0.95)");
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

    function drawStereoRadialField(cx, cy, r, compact) {
      const balance = clamp((smoothed.right - smoothed.left) / Math.max(0.02, smoothed.left + smoothed.right), -1, 1);
      const baseAngle = -Math.PI / 2 + balance * 1.18;
      const globalWidth = clamp(smoothed.side * 0.9 + (1 - clamp(meterState.correlation, -1, 1)) * 0.22, 0, 1);
      const bandSpecs = [
        { value: smoothed.low, corr: meterState.lowCorrelation, color: [255, 58, 24], angle: -0.22 },
        { value: smoothed.mid, corr: meterState.midCorrelation, color: [188, 48, 236], angle: 0 },
        { value: smoothed.high, corr: meterState.highCorrelation, color: [97, 242, 138], angle: 0.22 }
      ];

      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const spec of bandSpecs) {
        const corrWidth = Math.sqrt(clamp(1 - (spec.corr + 1) * 0.5, 0, 1));
        const width = clamp(corrWidth * 0.72 + globalWidth * 0.42, 0, 1);
        const level = clamp(Math.pow(spec.value, 0.68) + smoothed.peak * 0.08, 0, 1);
        const outer = r * (0.34 + width * 0.72 + level * 0.06);
        const inner = r * (0.18 + level * 0.08);
        const span = 0.16 + width * (compact ? 0.72 : 0.88);
        const angle = baseAngle + spec.angle + Math.sin(t * 0.025 + spec.angle * 7) * 0.035 * level;
        const [red, green, blue] = spec.color;
        const alpha = clamp(0.08 + level * 0.34 + width * 0.08, 0.06, 0.48);
        const grad = ctx.createRadialGradient(cx, cy, inner, cx, cy, outer);
        grad.addColorStop(0, `rgba(${red},${green},${blue},0)`);
        grad.addColorStop(0.48, `rgba(${red},${green},${blue},${alpha * 0.58})`);
        grad.addColorStop(1, `rgba(${red},${green},${blue},${alpha})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, outer, angle - span, angle + span);
        ctx.arc(cx, cy, inner, angle + span * 0.58, angle - span * 0.58, true);
        ctx.closePath();
        ctx.fill();
      }

      const corr = clamp(meterState.correlation, -1, 1);
      const corrPositive = clamp((corr + 1) * 0.5, 0, 1);
      const ringR = r * (0.92 + globalWidth * 0.08);
      const ringSpan = 0.28 + corrPositive * Math.PI * 0.94;
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = `rgba(245,245,245,${0.16 + corrPositive * 0.42})`;
      ctx.lineWidth = compact ? 1.2 : 1.4;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, -Math.PI / 2 - ringSpan, -Math.PI / 2 + ringSpan);
      ctx.stroke();
      if (corr < 0) {
        ctx.setLineDash([3, 4]);
        ctx.strokeStyle = `rgba(255,58,24,${clamp(-corr * 0.45, 0, 0.45)})`;
        ctx.beginPath();
        ctx.arc(cx, cy, ringR * 0.96, Math.PI * 0.15, Math.PI * 0.85);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      const needleLen = r * (0.36 + globalWidth * 0.44 + smoothed.rms * 0.08);
      ctx.strokeStyle = `rgba(245,245,245,${0.12 + smoothed.rms * 0.18})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(baseAngle) * needleLen, cy + Math.sin(baseAngle) * needleLen);
      ctx.stroke();
      ctx.restore();
    }

    function drawStereoPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      const compact = h < 120;
      const cx = x + (compact ? w * 0.25 : w * 0.32);
      const cy = y + h * 0.48;
      const r = Math.min(w * (compact ? 0.42 : 0.48), h) * 0.38;
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.moveTo(cx - r, cy);
      ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx, cy + r);
      ctx.stroke();

      drawStereoRadialField(cx, cy, r, compact);

      if (leftAnalyser && rightAnalyser) {
        leftAnalyser.getByteTimeDomainData(leftTime);
        rightAnalyser.getByteTimeDomainData(rightTime);
      }
      ctx.fillStyle = "rgba(245,245,245,0.65)";
      const step = Math.max(1, Math.floor(leftTime.length / 420));
      const midGain = compact ? 2.35 : 2.75;
      const sideGain = compact ? 2.15 : 2.45;
      for (let i = 0; i < leftTime.length; i += step) {
        const l = (leftTime[i] - 128) / 128;
        const rr = (rightTime[i] - 128) / 128;
        let dx = Math.tanh((l - rr) * 0.5 * sideGain);
        let dy = Math.tanh((l + rr) * 0.5 * midGain);
        const mag = Math.hypot(dx, dy);
        if (mag > 1) {
          dx /= mag;
          dy /= mag;
        }
        const sx = cx + dx * r;
        const sy = cy - dy * r;
        ctx.fillRect(sx, sy, 1.6, 1.6);
      }

      const bx = x + (compact ? w * 0.58 : w * 0.58);
      const bw = w * 0.36;
      const by = y + (compact ? 30 : 34);
      const bs = compact ? 23 : Math.max(26, (h - 52) / 3.4);
      drawCorrelationBar("Corr", meterState.correlation, bx, by, bw, compact ? 7 : 9, "#f5f5f5");
      drawCorrelationBar("Low", meterState.lowCorrelation, bx, by + bs, bw, 7, "#ff3d1f");
      drawCorrelationBar("Mid", meterState.midCorrelation, bx, by + bs * 2, bw, 7, "#8f46ff");
      drawCorrelationBar("High", meterState.highCorrelation, bx, by + bs * 3, bw, 7, "#61f28a");
      drawMeterText("L/R", x + 12, y + h - 8, 9, "rgba(166,166,166,0.7)");
      drawMeterText("M/S rotated", x + 38, y + h - 8, 9, "rgba(166,166,166,0.7)");
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
      drawMeterText(scopeLabel, x + 10, y + h - 10, 10, "rgba(166,166,166,0.78)");
    }

    function drawWaveformLane(columns, x, y, w, h, key, label) {
      const centerY = y + h * 0.5;
      const count = Math.max(1, columns.length);
      const colW = w / count;
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath();
      ctx.moveTo(x, centerY);
      ctx.lineTo(x + w, centerY);
      ctx.stroke();
      for (let i = 0; i < columns.length; i += 1) {
        const column = columns[i];
        const value = clamp(column[key] * 1.18, 0, 1);
        const px = x + i * colW;
        const half = Math.max(0.6, value * h * 0.48);
        ctx.fillStyle = waveformColorForColumn(column, 0.88);
        ctx.fillRect(px, centerY - half, Math.max(1, colW + 0.3), half * 2);
        if (waveformPeakSelect.value === "on" && column.hit > 0.62 && column.local > 0.55) {
          const transientAlpha = clamp((column.hit - 0.55) * (column.local - 0.35) * 0.34, 0, 0.22);
          ctx.fillStyle = waveformColorForColumn({ ...column, peak: 1, local: 1, hit: column.hit }, transientAlpha);
          ctx.fillRect(px, y, Math.max(1, colW * 0.42), h);
        }
      }
      drawMeterText(label, x + 8, y + h - 8, 10, "rgba(166,166,166,0.76)");
    }

    function drawStaticWaveformLane(x, y, w, h, key, label) {
      if (analyser) analyser.getByteTimeDomainData(timeData);
      const centerY = y + h * 0.5;
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath();
      ctx.moveTo(x, centerY);
      ctx.lineTo(x + w, centerY);
      ctx.stroke();
      ctx.strokeStyle = key === "side" ? "rgba(188,48,236,0.9)" : "rgba(188,218,255,0.9)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < timeData.length; i += 1) {
        const raw = (timeData[i] - 128) / 128;
        const px = x + i / Math.max(1, timeData.length - 1) * w;
        const py = centerY - raw * h * 0.44;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      drawMeterText(label, x + 8, y + h - 8, 10, "rgba(166,166,166,0.76)");
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
      const centerY = y + h * 0.5;
      const width = Math.max(1, Math.floor(w));
      const samplesPerPixel = Math.max(1, signal.length / width);
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
          const v = signal[i] || 0;
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
        const top = centerY - max * h * 0.47;
        const bottom = centerY - min * h * 0.47;
        ctx.fillStyle = waveformColorForColumn(column, 0.92);
        ctx.fillRect(x + px, Math.min(top, bottom), 1.1, Math.max(1, Math.abs(bottom - top)));
      }

      ctx.strokeStyle = "rgba(188,218,255,0.78)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let px = 0; px < width; px += 1) {
        const index = Math.min(signal.length - 1, Math.floor(px / Math.max(1, width - 1) * (signal.length - 1)));
        const py = centerY - signal[index] * h * 0.47;
        if (px === 0) ctx.moveTo(x + px, py);
        else ctx.lineTo(x + px, py);
      }
      ctx.stroke();
      drawMeterText(label, x + 8, y + h - 8, 10, "rgba(166,166,166,0.76)");
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

      if (waveformLoopSelect.value === "static") {
        if (twoLane && channel === "mid-side") {
          drawStaticWaveformLane(x, y, w, laneH, "mid", "mid");
          drawStaticWaveformLane(x, y + laneH + gap, w, laneH, "side", "side");
        } else if (twoLane) {
          drawStaticWaveformLane(x, y, w, laneH, "left", "left");
          drawStaticWaveformLane(x, y + laneH + gap, w, laneH, "right", "right");
        } else {
          drawStaticWaveformLane(x, y, w, h, channel, channel);
        }
        return;
      }

      if (twoLane && channel === "mid-side") {
        drawWaveformLane(columns, x, y, w, laneH, "mid", "mid");
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "side", "side");
      } else if (twoLane) {
        drawWaveformLane(columns, x, y, w, laneH, "left", "left");
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "right", "right");
      } else {
        drawWaveformLane(columns, x, y, w, h, channel, channel);
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
      drawMeterText("~180ms", x + w - 48, y + h - 8, 10, "rgba(166,166,166,0.76)");
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

      if (twoLane && channel === "mid-side") {
        drawWaveformLane(columns, x, y, w, laneH, "mid", "mid");
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "side", "side");
      } else if (twoLane) {
        drawWaveformLane(columns, x, y, w, laneH, "left", "left");
        drawWaveformLane(columns, x, y + laneH + gap, w, laneH, "right", "right");
      } else {
        drawWaveformLane(columns, x, y, w, h, channel, `${channel} / ~1s`);
      }
      drawMeterText("~1s", x + w - 28, y + h - 8, 10, "rgba(166,166,166,0.76)");
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
      const displayOpen = graphOpenState.patternDisplayRender;
      const displayBoost = compact
        ? lerp(1, contract.responsive?.patternDisplay?.compactScale || 1.8, getCompactResponsiveT())
        : 1;
      const displayGap = displayOpen ? Math.round(compact ? clamp(h * 0.026, 22, 38) : 30 * displayBoost) : 0;
      const historyH = Math.round(compact ? clamp(h * 0.135, 96, 180) : 48);
      const rowsBlockH = Math.round(compact ? clamp(h * 0.24, 124, 220) : clamp(h * 0.24, 92, 150));
      const usableH = Math.max(58, rowsBlockH);
      const rowGap = Math.max(4, Math.min(9, usableH * 0.055));
      const rowH = Math.max(14, (usableH - rowGap * (rows.length - 1)) / rows.length);
      const barH = Math.max(9, Math.min(16, rowH * 0.62));
      const labelY = Math.max(9, Math.min(11, rowH * 0.5));
      const barX = x + 66;
      const barW = w - 88;
      for (let i = 0; i < rows.length; i += 1) {
        const [label, key, color] = rows[i];
        const yy = y + topPad + i * (rowH + rowGap);
        const barY = yy + (rowH - barH) * 0.5;
        drawMeterText(label, x + 10, yy + labelY, 10, "rgba(245,245,245,0.78)");
        ctx.fillStyle = "#050505";
        ctx.fillRect(barX, barY, barW, barH);
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.strokeRect(barX, barY, barW, barH);
        ctx.fillStyle = color;
        ctx.fillRect(barX, barY + 2, barW * clamp(patternState.hits[key], 0, 1), Math.max(3, barH - 4));
      }

      const rhythmY = y + topPad + usableH + Math.max(18, compact ? h * 0.025 : 16);
      const historyY = rhythmY + Math.max(14, compact ? h * 0.018 : 16);
      const displayHeaderY = historyY + historyH + Math.max(28, compact ? h * 0.035 : 30);
      const elementsLabelY = displayHeaderY + 30;
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
      drawMeterText(`Rhythm ${bpm} BPM  Conf ${conf}%  Rate ${rate}/s`, x + 10, rhythmY, 10, "rgba(166,166,166,0.86)");

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
      const displayHeaderW = 154;
      patternDisplayToggleRect = {
        x: x + 10,
        y: displayHeaderY - 12,
        w: displayHeaderW,
        h: 18
      };
      patternDisplayGearRect = {
        x: x + 118,
        y: displayHeaderY - 12,
        w: 20,
        h: 18
      };
      ctx.fillStyle = "#000";
      ctx.fillRect(patternDisplayToggleRect.x, patternDisplayToggleRect.y, patternDisplayToggleRect.w, patternDisplayToggleRect.h);
      ctx.strokeStyle = "#202020";
      ctx.strokeRect(patternDisplayToggleRect.x, patternDisplayToggleRect.y, patternDisplayToggleRect.w, patternDisplayToggleRect.h);
      drawMeterText("Display Render", x + 18, displayHeaderY, 10, "rgba(245,245,245,0.78)");
      drawMeterText("⚙", x + 126, displayHeaderY, 10, "rgba(166,166,166,0.86)");
      drawMeterText(graphOpenState.patternDisplayRender ? "-" : "+", x + 148, displayHeaderY, 11, "rgba(245,245,245,0.92)");
      if (graphOpenState.patternDisplayRender) {
        const fieldX = x + 10;
        const fieldW = w - 20;
        drawMeterText("ELEMENTS OUT", fieldX, elementsLabelY, 10, "rgba(245,245,245,0.76)");
        drawPatternFlashField(fieldX, elementsY, fieldW, displayFieldH);
        drawMeterText("SPECTRAL OUT", fieldX, spectralLabelY, 10, "rgba(245,245,245,0.76)");
        drawSpectralOutField(fieldX, spectralY, fieldW, displayFieldH);
      }
    }

    function drawLoudnessPanel(x, y, w, h) {
      ctx.fillStyle = "#030303";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = "#282828";
      ctx.strokeRect(x, y, w, h);
      if (h < 160) {
        const rows = [
          ["Peak", meterState.peakDb, "#f5f5f5"],
          ["RMS fast", meterState.rmsFastDb, "#ff3d1f"],
          ["RMS slow", meterState.rmsSlowDb, "#8f46ff"],
          ["LUFS-M", meterState.momentaryDb, "#61f28a"],
          ["LUFS-S", meterState.shortDb, "#f3f3d8"]
        ];
        const rowH = (h - 22) / rows.length;
        for (let i = 0; i < rows.length; i += 1) {
          const [label, db, color] = rows[i];
          const yy = y + 18 + i * rowH;
          drawMeterText(label, x + 14, yy, 10, "rgba(245,245,245,0.82)");
          drawMeterText(`${db <= -119 ? "-inf" : db.toFixed(1)}`, x + w - 48, yy, 10, "rgba(166,166,166,0.92)");
          const bx = x + 74;
          const bw = w - 132;
          const by = yy + 4;
          ctx.fillStyle = "#050505";
          ctx.fillRect(bx, by, bw, 7);
          ctx.strokeStyle = "#2b2b2b";
          ctx.strokeRect(bx, by, bw, 7);
          ctx.fillStyle = color;
          ctx.fillRect(bx, by, bw * meterXForDb(db), 7);
        }
        return;
      }
      const barX = x + 18;
      const barW = w - 36;
      const top = y + 30;
      const step = Math.max(16, (h - 42) / 4.4);
      drawDbBar("Peak", meterState.peakDb, barX, top, barW, 10, "#f5f5f5");
      drawDbBar("RMS fast 0.3s", meterState.rmsFastDb, barX, top + step, barW, 10, "#ff3d1f");
      drawDbBar("RMS slow 1.0s", meterState.rmsSlowDb, barX, top + step * 2, barW, 10, "#8f46ff");
      drawDbBar("LUFS-M approx 0.4s", meterState.momentaryDb, barX, top + step * 3, barW, 10, "#61f28a");
      drawDbBar("LUFS-S approx 3.0s", meterState.shortDb, barX, top + step * 4, barW, 10, "#f3f3d8");
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
      const algorithm = getCurrentAlgorithm();
      setStageHeight(calculateMeteringHeight());
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

      if (graphControls) {
        const moduleIds = getAlgorithmModuleIds(algorithm);
        graphControls.querySelectorAll(".control-group").forEach((group) => {
          const moduleId = group.dataset.module;
          if (!METERING_MODULE_BY_ID[moduleId]) return;
          group.hidden = !moduleIds.includes(moduleId);
        });
      }

      const layout = METER_LAYOUT;
      let y = getMeteringTop();
      const moduleIds = getAlgorithmModuleIds(algorithm);
      const drawFullModule = (module) => {
        positionModuleControl(module.id, y);
        const moduleHeight = getModuleHeight(module);
        if (graphOpenState[module.id]) {
          if (rectIntersectsRenderRange(y, moduleHeight, renderRange)) {
            module.renderer(layout.left, y, layout.fullWidth, moduleHeight);
          }
          y += getModuleAdvance(module);
        } else {
          y += getModuleAdvance(module);
        }
      };
      const drawStackedModule = (module) => {
        positionModuleControl(module.id, y);
        const moduleHeight = getModuleHeight(module);
        if (graphOpenState[module.id]) {
          if (rectIntersectsRenderRange(y, moduleHeight, renderRange)) {
            module.renderer(layout.left, y, layout.fullWidth, moduleHeight);
          }
          y += getModuleAdvance(module, true);
        } else {
          y += getModuleAdvance(module, true);
        }
      };

      for (const item of METERING_FLOW) {
        if (item.type === "module") {
          if (!moduleIds.includes(item.id)) continue;
          const module = METERING_MODULE_BY_ID[item.id];
          if (item.beforeGap || module.beforeGap) y += layout.rowGap;
          drawFullModule(module);
        } else if (item.type === "dual") {
          const modules = item.ids
            .filter((id) => moduleIds.includes(id))
            .map((id) => METERING_MODULE_BY_ID[id]);
          if (!modules.length) continue;
          if (useCompactGraphLayout()) {
            modules.forEach(drawStackedModule);
          } else {
            for (const module of modules) positionModuleControl(module.id, y);
            for (const module of modules) {
              if (!graphOpenState[module.id]) continue;
              const rect = getModuleRect(module);
              const x = module.column === "right" ? layout.rightColumnX : layout.left;
              if (rectIntersectsRenderRange(y, rect.height, renderRange)) {
                module.renderer(x, y, layout.halfWidth, rect.height);
              }
            }
            y += modules.some((module) => graphOpenState[module.id])
              ? layout.dualMetersAdvance
              : layout.stackedCollapsedAdvance;
          }
        }
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
    spectrumFftSelect.addEventListener("change", () => {
      configureSpectrumAnalyser();
    });
    algorithmSelect.addEventListener("change", applyAlgorithmUi);
    canvas.addEventListener("click", (event) => {
      if (!patternDisplayToggleRect || getCurrentAlgorithm() !== meteringAlgorithms.nmstr || !graphOpenState.pattern) return;
      const rect = canvas.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width * W;
      const py = (event.clientY - rect.top) / rect.height * activeStageHeight;
      const gear = patternDisplayGearRect;
      if (gear && px >= gear.x && px <= gear.x + gear.w && py >= gear.y && py <= gear.y + gear.h) {
        openFloatingInspector("Display Render", displayRenderControlsMount, {
          left: rect.left + gear.x / W * rect.width,
          right: rect.left + (gear.x + gear.w) / W * rect.width,
          top: rect.top + gear.y / activeStageHeight * rect.height,
          bottom: rect.top + (gear.y + gear.h) / activeStageHeight * rect.height
        });
        return;
      }
      const hit = patternDisplayToggleRect;
      if (px < hit.x || px > hit.x + hit.w || py < hit.y || py > hit.y + hit.h) return;
      graphOpenState.patternDisplayRender = !graphOpenState.patternDisplayRender;
    });
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
    window.addEventListener("resize", () => {
      updateGraphControlScale();
      refreshInputCapabilities();
    });

    organizeGraphControls();
    refreshInputCapabilities();
    setInputSource("system");
    applyAlgorithmUi();
    drawFrame();
