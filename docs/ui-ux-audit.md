# MET-TR UI/UX Audit

This document is the working audit contract for MET-TR. It exists because visual consistency cannot depend on memory, taste, or one-off fixes. Any UI change touching controls, graph modules, meters, bars, typography, spacing, colors, or responsive layout must be checked against this file.

Status: active audit, partially compliant.

## Scope

Audited surface:

- Header controls: title, input source, layout selector, readout.
- Module headers: title, gear, maximize/minimize, remove.
- Graph modules: Spectrum, Spectral Dynamics, Spectrogram, Tuner, Signal Character, Waves Spectrogram, Oscilloscope, Waveforms, Stereometer, Loudness, Pattern Detector.
- Meter primitives: labels, values, bars, disabled states, section labels, legends.
- Responsive behavior: desktop, tablet, mobile, narrow mobile.
- Color system: semantic palette and repeated graph colors.

Out of scope for this document:

- DSP correctness, detector thresholds, pitch detection quality, FFT accuracy.
- Artistic direction of visual modules except where it violates UI consistency.

## Required Breakpoints

Every UI audit must check at least:

| Name | Viewport |
|---|---:|
| Narrow mobile | 390 x 700 |
| Small mobile | 420 x 700 |
| Mobile working case | 500 x 600 |
| Mobile/tablet edge | 552 x 612 |
| Desktop stage | 700+ width |

The canvas logical width is `700`. Visual sizes must be evaluated in effective CSS pixels:

```text
css_px = canvas_px * (stage_css_width / 700)
canvas_px = css_px / (stage_css_width / 700)
```

Current measured examples:

| Stage width | Scale | 14 canvas px | 16 canvas px | Canvas needed for 16 CSS px |
|---:|---:|---:|---:|---:|
| 390 | 0.557 | 7.8 CSS px | 8.9 CSS px | 28.72 |
| 420 | 0.600 | 8.4 CSS px | 9.6 CSS px | 26.67 |
| 500 | 0.714 | 10.0 CSS px | 11.4 CSS px | 22.40 |
| 552 | 0.789 | 11.0 CSS px | 12.6 CSS px | 20.29 |
| 700 | 1.000 | 14.0 CSS px | 16.0 CSS px | 16.00 |

Therefore, hardcoded canvas bar heights are not acceptable for mobile readability.

## Visual Primitive Contract

All modules must use the same primitives for comparable UI elements.

### Text

| Primitive | Desktop CSS px | Mobile CSS px |
|---|---:|---:|
| Micro label | 10 | 13 minimum |
| Meter label | 11 | 13 minimum |
| Primary meter label | 12 | 15 minimum |
| Section label | 10-12 | 13-15 |
| Module title | 14 | 15 |

No canvas text below the effective mobile minimum is allowed unless it is purely decorative and nonessential.

### Bars

| Primitive | Desktop CSS px | Mobile CSS px |
|---|---:|---:|
| Thin meter bar | 8 | 14 minimum |
| Primary detector bar | 12 | 16 minimum |
| Event/history spike | 3-4 width | 3-4 width, but height must be legible |

All bars representing comparable values must share:

- Same background fill.
- Same stroke style.
- Same disabled alpha rule.
- Same label/value placement family.
- Same responsive size conversion.

### Spacing

| Relationship | Minimum |
|---|---:|
| Label to bar | 5 CSS px |
| Bar row to next row | 8 CSS px mobile, 5 CSS px desktop |
| Section heading to content | 12 CSS px desktop, 16 CSS px mobile |
| Module header to graph body | Must not overlap, must be audited per breakpoint |
| Nested module header to nested body | 18 CSS px minimum |

No label may sit on top of a bar, history graph, display field, or another label.

### Canvas Text Baseline Safety

Canvas text must not be positioned with raw bottom-edge constants such as `y + h - 8` unless the text renderer has an explicit compatible `textBaseline`.

Required rule:

```text
bottom_text_baseline = module_y + module_h - max(bottom_padding, font_size * 0.42)
top_text_baseline = module_y + max(top_padding, font_size * 0.42) + font_size
```

Implementation primitives:

- `meterTextBottomBaseline(...)` for graph legends and status labels placed near the lower edge.
- `meterTextTopBaseline(...)` for labels placed near the upper edge.
- `meterTextClampedBaseline(...)` for labels that follow data positions and may approach either edge.

Audit grep:

```text
rg "drawMeterText\\([^\\n]*(y \\+ h -|\\+ h -)" src/app.js
```

Any match must either be migrated to a baseline helper or documented as using a deliberate non-default `ctx.textBaseline`.

## Vertical Rhythm / Empty Space Budget

Every open module must account for vertical space as:

```text
module_height = top_padding + content_height + bottom_padding
module_advance = module_height + inter_module_gap
```

The UI must not use oversized "safety" advances as a substitute for measuring content.

### Padding Targets

| Context | Desktop | Mobile |
|---|---:|---:|
| Module top padding | 12-18 CSS px | 16-22 CSS px |
| Module bottom padding | 12-22 CSS px | 18-28 CSS px |
| Inter-module gap | 14-26 canvas px | 12-24 CSS px effective |
| Nested section top gap | 12-18 CSS px | 16-24 CSS px |

### Empty Space Limits

Unused bottom space is the distance between the last visible content and the next module header, minus the intended inter-module gap.

| Module type | Maximum unused bottom space |
|---|---:|
| Strip graph | 18 CSS px |
| Standard meter | 28 CSS px |
| Dense dashboard | 36 CSS px |
| Large visual/analysis graph | 48 CSS px |

Exceptions must be documented. A module is not allowed to keep hundreds of pixels of empty bottom padding just to avoid collisions.

### Current Mobile Findings

Measured at `390 x 700` after the first mobile rescue pass:

| Transition | Measured gap |
|---|---:|
| Tuner -> Signal Character | 226.6 CSS px |
| Signal Character -> Stereometer | 592.6 CSS px |
| Stereometer -> Loudness | 219.7 CSS px |
| Loudness -> Pattern | 332.5 CSS px |

Interpretation:

- Header gaps alone are not enough to prove failure, because they include graph body height.
- Signal Character had excessive unused bottom space after `Event Density`.
- The previous fix used coarse mobile minimum advances and must be replaced by content-derived advances.

### Root Cause Found: Mobile Default Clipping

Found during the Default layout mobile audit:

- `meterRowMetrics()` did not expose a `height` value.
- `getModuleContentMinHeight()` used `row.height` for Loudness, Pattern Detector, and Signal Character.
- That produced `NaN` in mobile height calculation.
- The stage then fell back to the minimum height, causing the Add Module slot and some graph content to be positioned as if the layout were much shorter than it really was.

Contract:

- Any primitive metric object used by layout code must expose every value consumed by layout code.
- If a layout consumes `row.height`, the row primitive must define it as `labelSize + labelGap + barH + rowGap`.
- Mobile audit must check that `calculateMeteringHeight()` produces a height larger than the full visible module stack and never falls back silently to `minHeight`.

Current fixed validation:

| Viewport | Stage height | Module headers | Meter primitives | Add slot |
|---|---:|---|---|---|
| 390 x 700 | 4147 CSS px | pass | pass | pass |
| 500 x 600 | 4538 CSS px | pass | pass | pass |

### Add Module Slot Contract

The Add Module row is not a footer and is not allowed to float with a special loose gap. It must behave visually like the header of the next module.

Required rule:

```text
natural_add_slot_top = next_module_graph_top - add_slot_height - compact_header_gap
minimum_add_slot_top = previous_visible_graph_bottom + normal_inter_module_gap
add_slot_top = max(natural_add_slot_top, minimum_add_slot_top)
gap_from_previous_graph = add_slot_top - previous_visible_graph_bottom
```

Where:

- `next_module_graph_top` is `getLayoutRows().addY`.
- `previous_visible_graph_bottom` is `last_row.y + getModuleHeight(last_row.module)`, not `last_row.y + last_row.advance`.
- The expected gap is the same gap produced by the normal module-header positioning formula.
- If the normal formula would overlap the previous module, the Add Module row must be pushed down to at least the normal inter-module gap.

The audit must fail when Add Module:

- uses the next graph top directly as its top position;
- compares against internal `advance` instead of the visible graph bottom;
- leaves a visibly larger gap than a normal module-to-module transition;
- overlaps the previous module body.

## Current Component Inventory

### Header Controls

Current CSS variables:

| Token | Desktop | Mobile |
|---|---:|---:|
| `--control-height` | 38 | 36 |
| `--control-font` | 13 | 12 |
| `--module-title-height` | 24 | 36 |
| `--module-action-size` | 24 | 30 |
| `--module-icon-stroke` | 2 | 3 |
| `--module-header-font` | 14 | 15 |
| `--module-header-width-ratio` | 1 | 1 |

Measured at viewport `500 x 600`:

| Element | Result |
|---|---:|
| Stage width | 476 CSS px |
| Stage scale | 0.68 |
| Module header width | 436.1 CSS px |
| Module header height | 41.6 CSS px |
| Module icons | 30 x 30 CSS px |

Header controls are mostly coherent after recent changes, but graph-internal meters are not.

### Meter Renderers

Current renderers found in `src/app.js`:

| Renderer | Current status |
|---|---|
| `drawMeterBar` | Low-level shared bar primitive |
| `drawMeterRow` | Shared label/value/bar row primitive |
| `drawDbBar` | Legacy helper; should not be used for new meter rows |
| `drawCorrelationBar` | Legacy helper; should not be used for new meter rows |
| Pattern Detector bars | Migrated to `drawMeterRow` primary density |
| Loudness bars | Migrated to `drawMeterRow` |
| Stereometer correlation bars | Migrated to `drawMeterRow` bipolar mode |
| Signal Character decision bars | Migrated to `drawMeterRow` compact density |
| Signal Character raw footer | Raised to effective text minimum, but still a special compact footer |

This is the main inconsistency.

## Current Failures

### FIXED-007: Mobile Layout Must Use Effective Viewport Width

Previous failure:

- Mobile CSS could be active while JavaScript layout still behaved as desktop during initialization.
- This produced modules whose headers looked mobile-sized while canvas graph allocation was too short.

Current requirement:

- Compact layout detection must use the effective minimum of stage width, viewport width, and document width.
- Responsive scaling must use the same effective width.

### FIXED-008: Canvas Height Must Never Collapse To Zero

Previous failure:

- Invalid height calculations could set `canvas.height` to `0`.
- This made graph controls position against a broken stage.
- `src/app.js` also contained a UTF-8 BOM, which made served source inspection unreliable.

Current requirement:

- `setStageHeight` and `calculateMeteringHeight` must guard against non-finite values.
- JavaScript source files must not contain BOM bytes.

### FIXED-009: Mobile Module Advance Must Respect Content Minimums

Previous failure:

- `Loudness` did not reserve enough vertical space for five readable rows.
- `Pattern Detector` could start before Loudness content visually finished.
- `Signal Character` could start the next module before its own mobile stacked content finished.

Current requirement:

- Mobile advances must include content-derived minimums for dense modules.
- Required minimums currently exist for Signal Character, Loudness, and Pattern Detector.

### FIXED-010: Signal Character Mobile Footer Must Not Overlay The Map

Previous failure:

- The raw descriptor footer overlapped the Character Map in narrow mobile layout.

Current requirement:

- In stacked mobile `map + bars` mode, the raw descriptor footer is hidden.
- Raw descriptors may return later only as a separate row or inspector content.

### FIXED-001: Signal Character Bars Use The Shared Row Primitive

Location: `drawSignalDecisionBar` in `src/app.js`.

Previous failure:

- Labels used `10px` canvas text.
- Bars were hardcoded to `8px` canvas height.
- Row spacing was hardcoded with `27px` offsets.
- On mobile, `8px` canvas could become about `4.5-6px` CSS.

Current requirement:

- Signal Character decision rows must continue to use `drawMeterRow`.
- The raw footer remains a special compact readout and must not drop below effective text minimums.

### FIXED-002: Loudness Bars Use The Shared Row Primitive

Location: `drawLoudnessPanel` in `src/app.js`.

Previous failure:

- Compact mode used custom `fillRect` bars.
- Full mode used a different helper with different label/value offsets.

Current requirement:

- Loudness rows must continue to use `drawMeterRow`.
- DB mapping can remain module-specific, but row rendering cannot.

### FIXED-003: Stereometer Bars Use The Shared Row Primitive

Location: `drawStereoPanel` and `drawCorrelationBar`.

Previous failure:

- Stereometer used local row spacing, label position, and value offset.
- Label/value placement differed from Pattern and Loudness.

Current requirement:

- Stereometer rows must continue to use the same meter-row primitive with bipolar mode.
- Disabled states must remain visible but subdued.

### FIXED-004: Pattern Detector Main Bars Use The Shared Row Primitive

Location: `drawPatternPanel`.

Previous failure:

- Main bars used a side-label layout while Loudness used label-over-bar.

Current requirement:

- Main element bars must become the reference meter row style.
- Event history can remain custom, but must document it as an event graph, not a meter bar.

### FAIL-005: Colors Are Not Centralized

Current state:

- There are many hardcoded `#hex` and `rgba(...)` values across `src/app.js` and `src/styles.css`.
- Module colors are repeated directly in rendering code.

Required:

- Introduce a semantic palette in `METTR_CONTRACT.ui.palette`.
- Meters must refer to semantic tokens: `white`, `red`, `green`, `blue`, `violet`, `orange`, `yellow`, `muted`, `line`, `panel`, `barBg`.

### FAIL-006: Existing Audit Hook Is Not Reliable Enough

Current state:

- `window.METTR_AUDIT` is assigned in `src/app.js`.
- In browser validation through the current automation surface, the app executes but `window.METTR_AUDIT` is not observable.
- This means the current audit hook cannot be treated as a passed test.

Required:

- Either expose audit results through a stable DOM/debug node or build an external audit script.
- The audit must return pass/fail with measured values for every required breakpoint.

## Required Refactor

### Phase 1: Shared Meter Row Primitive

Create one primitive for all horizontal meter rows:

```js
drawMeterRow({
  label,
  valueText,
  value,
  x,
  y,
  w,
  color,
  mode: "unipolar" | "bipolar" | "db",
  enabled,
  density: "normal" | "compact" | "primary"
})
```

This primitive owns:

- Label font size.
- Value font size.
- Bar height.
- Bar gap.
- Disabled state.
- Label/value alignment.
- Effective CSS pixel conversion.

Modules must not hand-roll equivalent meter rows.

### Phase 2: Migrate Existing Meters

Migration order:

1. Signal Character decision bars.
2. Loudness compact and full bars.
3. Stereometer correlation bars.
4. Pattern Detector main bars.
5. Any future meter-like rows.

Pattern Detector should become the visual reference for primary detector rows.

### Phase 3: Palette Contract

Add:

```js
ui: {
  palette: {
    bg,
    panel,
    line,
    text,
    muted,
    white,
    red,
    green,
    blue,
    violet,
    orange,
    yellow,
    barBg,
    disabledOverlay
  }
}
```

### Phase 4: Real Audit Script

The audit must output a table like:

| Breakpoint | Module | Element | Expected | Actual | Pass |
|---|---|---|---:|---:|---|

Required checks:

- Module header height and icon size.
- Module header width.
- Meter label CSS px.
- Meter bar CSS px.
- Meter row gap.
- Section label gap.
- Overlap between module header and graph body.
- Add-module slot gap.

## Definition Of Done

A UI/UX change is done only when:

- The document has been updated if the contract changed.
- All comparable bars use the same primitive or have a documented exception.
- Mobile effective sizes are measured in CSS px, not canvas px.
- The audit checks every required breakpoint.
- Screenshots or measured DOM/canvas-derived values are reported.
- No module introduces one-off meter styling without adding it to this document.

## Current Verdict

Current UI state is not compliant.

Recent fixes improved Pattern Detector and Stereometer sizing mechanics, but the overall system remains inconsistent because Signal Character, Loudness, Stereometer, and Pattern still use different row systems, spacing rules, and text sizing logic.

Next required code task: centralize the color palette and make the audit executable through a reliable script or stable DOM debug surface.
