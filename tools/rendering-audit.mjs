#!/usr/bin/env node

import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const app = fs.readFileSync("src/app.js", "utf8");
const core = fs.readFileSync("src/render-core.js", "utf8");

const issues = [];

function fail(id, message) {
  issues.push({ level: "error", id, message });
}

function warn(id, message) {
  issues.push({ level: "warn", id, message });
}

if (!html.includes("./src/render-core.js")) {
  fail("render-core-load", "index.html must load src/render-core.js before src/app.js.");
}

const renderCoreIndex = html.indexOf("./src/render-core.js");
const appIndex = html.indexOf("./src/app.js");
if (renderCoreIndex === -1 || appIndex === -1 || renderCoreIndex > appIndex) {
  fail("render-core-order", "render-core.js must load before app.js.");
}

for (const name of ["METTR_RENDER_CORE", "softLimit", "visibilityLift", "percentile", "dpr"]) {
  if (!core.includes(name)) fail(`render-core-${name}`, `render-core.js must expose ${name}.`);
}

if (!app.includes("window.METTR_RENDER_CORE")) {
  fail("app-render-core", "app.js must read window.METTR_RENDER_CORE.");
}

if (/column\[i\]\s*=\s*clamp\([^;]*column\[i\]\s*\/\s*peak/.test(app) || /column\[i\]\s*\/\s*peak/.test(app)) {
  fail("waves-peak-ceiling", "Waves Spectrogram must not hard-normalize every column by its local peak.");
}

if (/warpedAmp\s*=\s*clamp\([^;]*1\.45/.test(app)) {
  fail("waves-hard-height-ceiling", "Waves projection must not hard-clamp height to a fixed ceiling.");
}

if (!app.includes("softLimitWavesAmplitude")) {
  warn("waves-soft-limit-wrapper", "Waves should keep a named soft-limit wrapper until the module is fully migrated.");
}

const report = {
  generatedAt: new Date().toISOString(),
  checks: {
    renderCoreLoaded: html.includes("./src/render-core.js"),
    renderCoreBeforeApp: renderCoreIndex !== -1 && appIndex !== -1 && renderCoreIndex < appIndex,
    appUsesRenderCore: app.includes("window.METTR_RENDER_CORE"),
    wavesNoPeakCeiling: !/column\[i\]\s*\/\s*peak/.test(app),
    wavesNoFixedProjectionClamp: !/warpedAmp\s*=\s*clamp\([^;]*1\.45/.test(app)
  },
  issues
};

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log("Rendering audit");
  for (const [key, value] of Object.entries(report.checks)) {
    console.log(`  ${key.padEnd(30)} ${value ? "pass" : "fail"}`);
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

if (issues.some((issue) => issue.level === "error")) process.exit(1);
