# MET-TR Rendering Architecture Plan

Last updated: 2026-07-16

This document defines the rendering/core direction for MET-TR. The goal is not to import a charting or graphics library. The goal is to build our own small, testable layer inspired by professional browser rendering practice.

## References

Primary browser/platform references:

- MDN Canvas optimization: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
- web.dev HiDPI Canvas: https://web.dev/articles/canvas-hidipi
- web.dev OffscreenCanvas: https://web.dev/articles/offscreen-canvas
- MDN requestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- MDN ResizeObserver: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
- MDN AnalyserNode: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
- MDN AnalyserNode.fftSize: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize
- MDN AnalyserNode.frequencyBinCount: https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount

## Problem

`src/app.js` currently owns too many layers:

- audio input and analyser setup;
- signal analysis;
- temporal smoothing;
- responsive layout;
- canvas drawing primitives;
- module renderers;
- runtime audit hooks.

That makes failures ambiguous. A graph can look wrong because of the data model, visual normalization, graph projection, canvas scale, CSS scale, DPR, layout, or a local one-off renderer.

## Architecture Target

```text
audio input
  -> analysis core
  -> normalized graph models
  -> layout engine
  -> render primitives
  -> module renderers
  -> audits
```

Each layer must have a bounded responsibility.

## Core Rules

1. Analysis modules produce normalized graph models.
2. Renderers do not perform FFT, peak picking, or detector decisions.
3. Renderers may perform visual mapping only: color, geometry, interpolation, projection.
4. No graph should use hard clipping for visual height unless the clipping is part of the meaning of the meter.
5. Any visual limiter must be a named curve, such as `softLimit`, not an inline `clamp`.
6. Canvas text and bars are specified in effective CSS px, then converted to canvas px.
7. Layout determines `plotRect`; modules draw inside it.
8. Every new primitive gets an audit hook before it becomes widely used.

## Phase 1: Shared Render Core

Create `window.METTR_RENDER_CORE`.

Initial scope:

- finite number helpers;
- clamp/lerp/smoothstep;
- soft limit curves;
- percentile helpers;
- DPR helpers;
- rect helpers;
- canvas scale helpers.

This layer is plain JS while the app has no build step.

## Phase 2: Normalizers

Move visual normalizers into the core:

- `softLimit(value, ceiling, knee)`;
- `visibilityLift(peak, min, max)`;
- percentile normalization;
- attack/release smoothing;
- peak hold/decay;
- bipolar mapping.

Targets:

- Waves Spectrogram height mapping.
- Spectrum dynamic display.
- Harmonic Tension strip intensity.
- Signal Character decision strip.

## Phase 3: Render Primitives

Create shared drawing primitives:

- graph frame;
- grid;
- label;
- meter row;
- continuous strip;
- radial/radar graph;
- spectral surface.

Comparable elements must not be hand-drawn module by module.

## Phase 4: Layout Model

The layout engine should produce:

```text
moduleRect
headerRect
plotRect
legendRect
controlRect
```

Module renderers receive rects; they do not infer responsive layout from raw canvas dimensions.

## Phase 5: TypeScript Gradual Path

When ready, add TypeScript only for new/refactored layers:

```text
src/core/*.ts
src/render/*.ts
src/layout/*.ts
src/modules/*.ts
```

Do not migrate the whole prototype at once.

First TS candidates:

1. `types.ts`
2. `math.ts`
3. `scales.ts`
4. `normalizers.ts`
5. `layout.ts`
6. `render-primitives.ts`

## Phase 6: Browser Rendering Robustness

Required browser behaviour:

- `requestAnimationFrame` is the only visual loop.
- Resize uses measured stage dimensions, not assumptions.
- HiDPI uses DPR-aware canvas sizing with a cap for mobile.
- Expensive static elements should be cached.
- OffscreenCanvas is allowed only as progressive enhancement, never as a mandatory dependency.

## Phase 7: Audits

Audit classes:

- static code audit;
- control parameter audit;
- runtime browser console audit;
- viewport layout audit;
- graph model audit.

Minimum breakpoints:

- 390 x 700;
- 420 x 700;
- 500 x 600;
- 552 x 612;
- desktop stage.

## Current First Migration

Waves Spectrogram is the first migration target because it exposed hard visual clipping. The current fix replaces column peak hard-normalization and projection hard-clipping with a shared soft limiter.

