#!/usr/bin/env node

import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("src/app.js", "utf8");

const controlPattern = /<label>\s*([^<\n][\s\S]*?)\s*<(select|input)\s+([^>]*\bid="([^"]+)"[^>]*)[\s\S]*?<\/label>/g;
const directControlPattern = /<(select|input)\s+([^>]*\bid="([^"]+)"[^>]*)/g;
const movePattern = /moveControlById\("([^"]+)",\s*([A-Za-z0-9_]+)\)/g;
const listenerPattern = /([A-Za-z0-9_]+)\??\.addEventListener\("([^"]+)"/g;
const getterPattern = /const\s+([A-Za-z0-9_]+)\s*=\s*document\.getElementById\("([^"]+)"\)/g;

const moduleByMount = {
  spectrumControlsMount: "Spectrum",
  spectralDynamicsControlsMount: "Spectral Dynamics",
  harmonicTensionControlsMount: "Harmonic Tension",
  spectrogramControlsMount: "Spectrogram",
  tunerControlsMount: "Tuner",
  signalCharacterControlsMount: "Signal Character",
  phaseDungeonControlsMount: "Kinetic",
  wavesControlsMount: "Waves Spectrogram",
  oscilloscopeControlsMount: "Oscilloscope",
  waveformShortControlsMount: "Waveform Short",
  waveformMediumControlsMount: "Waveform Medium",
  waveformLongControlsMount: "Waveform Long",
  stereoControlsMount: "Stereometer",
  displayRenderControlsMount: "Display Render",
  patternControlsMount: "Pattern Detector",
  readoutControlsMount: "Readout"
};

const expectedOrder = [
  "mode",
  "source",
  "analysis",
  "resolution",
  "window",
  "display",
  "gain",
  "temporal",
  "output",
  "debug"
];

const moduleOrder = {
  "Signal Character": ["mode", "window", "display", "resolution", "gain", "temporal", "debug"],
  "Waves Spectrogram": ["display", "resolution", "temporal", "gain"]
};

const sectionedOrderModules = new Set(["Display Render"]);

function attrValue(attrs, name) {
  const match = attrs.match(new RegExp(`\\b${name}="([^"]*)"`));
  return match ? match[1] : "";
}

function textLabel(raw) {
  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function optionValues(block) {
  return [...block.matchAll(/<option\s+([^>]*)>([\s\S]*?)<\/option>/g)].map((match) => ({
    value: attrValue(match[1], "value"),
    label: textLabel(match[2]),
    selected: /\bselected\b/.test(match[1])
  }));
}

function classify(id, label, type) {
  const hay = `${id} ${label}`.toLowerCase();
  if (hay.includes("debug")) return "debug";
  if (hay.includes("separation")) return "window";
  if (hay.includes("boundary")) return "display";
  if (/stereo(corr|low|mid|high)toggle/i.test(id)) return "display";
  if (hay.includes("amount") || hay.includes("flash") || hay.includes("output")) return "output";
  if (hay.includes("gain") || hay.includes("tilt") || hay.includes("sensitivity") || hay.includes("threshold") || hay.includes("pressure") || hay.includes("fog")) return "gain";
  if (hay.includes("smooth") || hay.includes("smoothing") || hay.includes("speed") || hay.includes("persistence")) return "temporal";
  if (hay.includes("window") || hay.includes("history") || hay.includes("memory") || hay.includes("loop")) return "window";
  if (hay.includes("fft") || hay.includes("resolution") || hay.includes("detail") || hay.includes("density")) return "resolution";
  if (hay.includes("display") || hay.includes("render") || hay.includes("layout") || hay.includes("orientation") || hay.includes("overlay") || hay.includes("color") || hay.includes("projection") || hay.includes("scale") || hay.includes("bars") || hay.includes("view")) return "display";
  if (hay.includes("mode")) return "mode";
  if (hay.includes("channel") || hay.includes("source") || hay.includes("input") || hay.includes("follow") || hay.includes("reference")) return "source";
  return type === "range" ? "gain" : "analysis";
}

const controls = new Map();
let match;
while ((match = controlPattern.exec(html))) {
  const [, labelRaw, tag, attrs, id] = match;
  const type = tag === "select" ? "select" : attrValue(attrs, "type") || "text";
  const blockEnd = html.indexOf("</label>", match.index);
  const block = html.slice(match.index, blockEnd + 8);
  controls.set(id, {
    id,
    domIndex: match.index,
    label: textLabel(labelRaw),
    tag,
    type,
    value: attrValue(attrs, "value"),
    min: attrValue(attrs, "min"),
    max: attrValue(attrs, "max"),
    step: attrValue(attrs, "step"),
    options: tag === "select" ? optionValues(block) : [],
    category: classify(id, textLabel(labelRaw), type),
    module: null,
    mounted: false,
    listenerEvents: [],
    referenced: false
  });
}

while ((match = directControlPattern.exec(html))) {
  const [, tag, attrs, id] = match;
  if (controls.has(id)) continue;
  const type = tag === "select" ? "select" : attrValue(attrs, "type") || "text";
  controls.set(id, {
    id,
    domIndex: match.index,
    label: attrValue(attrs, "aria-label") || id,
    tag,
    type,
    value: attrValue(attrs, "value"),
    min: attrValue(attrs, "min"),
    max: attrValue(attrs, "max"),
    step: attrValue(attrs, "step"),
    options: [],
    category: classify(id, attrValue(attrs, "aria-label") || id, type),
    module: id === "algorithmSelect" ? "Header" : "Unmounted",
    mounted: false,
    listenerEvents: [],
    referenced: false
  });
}

const variableToId = new Map();
while ((match = getterPattern.exec(app))) {
  variableToId.set(match[1], match[2]);
  const control = controls.get(match[2]);
  if (control) control.referenced = true;
}

while ((match = movePattern.exec(app))) {
  const [, id, mount] = match;
  const control = controls.get(id);
  if (!control) continue;
  control.mounted = true;
  control.module = moduleByMount[mount] || mount;
}

for (const control of controls.values()) {
  if (/^(general|kick|snare|tom|hat|cymbal)Flash/.test(control.id) || ["spectralTilt", "spectralFlashAmount", "spectralFlashSmooth"].includes(control.id)) {
    control.mounted = true;
    control.module = "Display Render";
  }
  if (["patternSensitivity", "patternThreshold", "patternWindowSelect", "patternSeparationSelect"].includes(control.id)) {
    control.mounted = true;
    control.module = "Pattern Detector";
  }
  if (/^stereo(Corr|Low|Mid|High)Toggle$/.test(control.id)) {
    control.mounted = true;
    control.module = "Stereometer";
  }
  if (["styleSelect", "sensitivity", "glitch", "pixel", "imageInput", "imageInfluence"].includes(control.id)) {
    control.module = "Legacy Visual";
  }
}

while ((match = listenerPattern.exec(app))) {
  const [, variable, event] = match;
  const id = variableToId.get(variable);
  if (!id) continue;
  const control = controls.get(id);
  if (control && !control.listenerEvents.includes(event)) control.listenerEvents.push(event);
}

const controlList = [...controls.values()].sort((a, b) => a.domIndex - b.domIndex);
const moduleGroups = new Map();
for (const control of controlList) {
  const module = control.module || "Unmapped";
  if (!moduleGroups.has(module)) moduleGroups.set(module, []);
  moduleGroups.get(module).push(control);
}

const issues = [];
for (const control of controlList) {
  if (!control.referenced && !["styleSelect"].includes(control.id)) issues.push({ level: "warn", id: control.id, message: "HTML control is not referenced by getElementById." });
  if (!control.mounted && !["algorithmSelect", "styleSelect", "imageInput"].includes(control.id) && control.type !== "file" && control.module !== "Legacy Visual") {
    issues.push({ level: "warn", id: control.id, message: "Control is not moved into a module mount." });
  }
  if (control.tag === "select") {
    const selected = control.options.filter((option) => option.selected);
    if (selected.length !== 1 && control.options.length) issues.push({ level: "error", id: control.id, message: `Select should have exactly one selected option, found ${selected.length}.` });
  }
  const liveReadControls = new Set([
    "scopeFollowSelect",
    "waveformChannelSelect",
    "waveformColorSelect",
    "waveformPeakSelect",
    "waveformSpeedSelect",
    "waveformLoopSelect",
    "spectrumBarsSelect",
    "patternWindowSelect",
    "patternSeparationSelect",
    "stereoCorrToggle",
    "stereoLowToggle",
    "stereoMidToggle",
    "stereoHighToggle"
  ]);
  if ((control.tag === "select" || control.type === "range" || control.type === "checkbox") && !control.listenerEvents.length && !["styleSelect"].includes(control.id) && !liveReadControls.has(control.id)) {
    issues.push({ level: "warn", id: control.id, message: "Interactive control has no direct event listener." });
  }
}

for (const [module, moduleControls] of moduleGroups) {
  if (["Legacy Visual", "Unmapped", "Header"].includes(module)) continue;
  if (sectionedOrderModules.has(module)) continue;
  const order = moduleOrder[module] || expectedOrder;
  let lastIndex = -1;
  for (const control of moduleControls) {
    const index = order.indexOf(control.category);
    if (index === -1) continue;
    if (index < lastIndex) {
      issues.push({
        level: "error",
        id: control.id,
        message: `${module} control order regresses from ${order[lastIndex]} to ${control.category}.`
      });
    }
    lastIndex = Math.max(lastIndex, index);
  }
}

const forbidden = [
  ["harmonicTensionViewSelect", "Harmonic Tension must stay radar-only."],
  ["signalCharacterShaderSelect", "Signal Character shader selector is temporarily removed."],
  ["radarCurve", "Harmonic Tension curve view must not be exposed."],
  ["Character Map Shader", "Signal Character shader UI must not be exposed."]
];
for (const [needle, message] of forbidden) {
  if (html.includes(needle) || app.includes(needle)) issues.push({ level: "error", id: needle, message });
}

const report = {
  generatedAt: new Date().toISOString(),
  controls: controlList,
  modules: Object.fromEntries([...moduleGroups.entries()].map(([module, moduleControls]) => [module, moduleControls.map((control) => control.id)])),
  issues
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Parameter controls: ${controlList.length}`);
  for (const [module, moduleControls] of moduleGroups) {
    console.log(`\n${module}`);
    for (const control of moduleControls) {
      const listener = control.listenerEvents.length ? control.listenerEvents.join(",") : "no-listener";
      console.log(`  ${control.id.padEnd(34)} ${control.category.padEnd(10)} ${control.type.padEnd(8)} ${listener}`);
    }
  }
  if (issues.length) {
    console.log("\nIssues");
    for (const issue of issues) {
      console.log(`  ${issue.level.toUpperCase().padEnd(5)} ${issue.id}: ${issue.message}`);
    }
  } else {
    console.log("\nIssues: none");
  }
}

const hasErrors = issues.some((issue) => issue.level === "error");
if (hasErrors) process.exit(1);
