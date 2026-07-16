# Parameter Controls Audit

Last updated: 2026-07-16

This document is the fixed contract for MET-TR parameter panels. It is backed by `tools/parameter-controls-audit.mjs`; do not rely on memory or local visual impressions when adding/removing controls.

## Scope

The audit covers controls inside module gear panels and their relationship to:

- HTML source controls in `index.html`.
- Control mounting via `moveControlById(...)` or equivalent dynamic module movement.
- Event handling and live-read controls in `src/app.js`.
- Module-local ordering and naming consistency.
- Removed/forbidden controls.

## Control Families

Controls must be ordered by semantic family, not by when they were added.

| Order | Family | Meaning | Examples |
| --- | --- | --- | --- |
| 1 | Mode | Changes analysis model or conceptual behaviour | Musical/Clinical, Hybrid/Acoustic/Musical |
| 2 | Source | Input/channel/reference choice | Mid/Side, Follow Pitch, Reference A4 |
| 3 | Analysis | Analysis strategy or threshold class | Range, Separation, Boundaries |
| 4 | Resolution | FFT/detail/band count | FFT, Resolution, Detail |
| 5 | Window | Time/history/loop window | Window, Memory, History Window, Loop |
| 6 | Display | Layout/render/overlay/scale/color | Display, Projection, Scale, Overlay, Bars |
| 7 | Gain | Tilt/sensitivity/threshold/amount-style gain | Tilt, Sensitivity, Low Cut |
| 8 | Temporal | Smooth/speed/persistence | Smooth, Smoothing, Speed, Persistence |
| 9 | Output | Explicit output renderer controls | Flash Amount, Flash Smooth |
| 10 | Debug | Debug-only controls | Particles, Constraints |

Debug controls must be last. If a control is disabled temporarily, remove it from the UI instead of leaving it as a no-op.

## Current Inventory

Run:

```sh
node tools/parameter-controls-audit.mjs
```

Current count: 82 controls.

Important modules and issues found by the first real audit:

- **Harmonic Tension**
  - `Harmonic Tension View` has been removed.
  - Contract: radar only. No `Radar + Curve`, no `Curve`, no `drawHarmonicCurve` path.
  - Remaining order should be: Mode, Resolution/FFT, Low Cut/Sensitivity, Smooth.

- **Signal Character**
  - Shader selector has been removed.
  - Contract: flat map for now.
  - Shader/material controls are invalid while flat-only and have been removed:
    - `Character Depth`
    - `Character Glow Viscosity`
    - `Character Color Depth`
    - `Character Iridescence`
  - Backend controls are valid:
    - `Signal FFT Weight`
    - `Signal Noise Sensitivity`
    - `Signal Transient Sensitivity`
    - `Signal Smoothing`
  - Debug must appear last.

- **Spectrogram**
  - Normalized order:
    - Mode
    - FFT/Detail
    - History Window/Loop
    - Scale/Orientation/Overlays
    - Tilt
    - Speed

- **Spectral Dynamics**
  - Normalized order:
    - Range
    - FFT
    - Window
    - Display
    - Tilt

- **Stereometer**
  - `Layout` and `Render` are correctly separated.
  - Layer toggles are live-read and classified as display/layers, not generic analysis.

- **Pattern Detector**
  - `Rhythm Window` and `Min Hit Separation` are live-read controls. They do not need direct listeners unless a reset/clear is required.
  - Normalized order:
    - Rhythm Window
    - Min Hit Separation
    - Detection Sensitivity
    - Hit Threshold

- **Display Render**
  - This panel is sectioned into `Elements Out` and `Spectral Out`.
  - The audit intentionally skips linear order regression here because the repeated flash amount/smooth pairs are grouped by output section.

- **Waves Spectrogram**
  - `Projection` and `Frequency Scale` are display controls.
  - `Surface Detail` is resolution.
  - `History Depth` is temporal.
  - `Input Gain` is gain.
  - Documented module order exception:
    - Display
    - Resolution
    - Temporal
    - Gain
  - Rationale: Projection/Scale are the primary conceptual controls for this visual module, so they are intentionally first.

## Forbidden Controls

The audit fails if these return:

- `harmonicTensionViewSelect`
- `radarCurve`
- `signalCharacterShaderSelect`
- `Character Map Shader`

## Live-Read Controls

Some controls are intentionally read every frame or by analysis code and do not require direct listeners:

- `spectrumBarsSelect`
- `scopeFollowSelect`
- `waveformChannelSelect`
- `waveformColorSelect`
- `waveformPeakSelect`
- `waveformSpeedSelect`
- `waveformLoopSelect`
- `patternWindowSelect`
- `patternSeparationSelect`
- stereo layer toggles

The audit allows these as live-read controls.

## Current Pass Criteria

The audit must report `Issues: none` before this layer is considered clean.

Validation command:

```sh
node tools/parameter-controls-audit.mjs
```

Current verified output:

- `Parameter controls: 82`
- `Issues: none`

## Follow-up Cleanup

1. Add this audit to the regular pre-commit or pre-push verification path when the project has a formal script runner.
2. Extend the audit with viewport screenshots for gear prompt clipping and module spacing; this file only covers parameter control structure.
3. Add a second audit for meter bar styling tokens, because parameter order and visual bar consistency are separate contracts.
