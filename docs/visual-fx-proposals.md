# MET-TR Visual FX Proposals

This document sketches two visual modules intended to sit beside the technical meters without becoming another spectrum display. Both ideas should use the existing MET-TR visual contract: black base, white structure, restrained red/violet/green accents, flat canvas graphics, no decorative UI styles.

## 1. Phase Dungeon / Recurrence Map

### Core Signal Idea

The module builds a navigable-looking map from repeated waveform states. It is inspired by recurrence plots: compare short waveform windows against earlier windows, then draw repeated states as paths, rooms, walls, or cave density.

Inputs:

- `waveformShort`: source buffer for recent time-domain shape.
- Autocorrelation: periodicity and loop confidence.
- `side`: stereo width opens lateral corridors.
- `transientImpact` / `eventDensity`: punches gates, doors, cuts.
- `low`: kick/sub expands walls and room mass.

### Archived Direction: Dungeon Map

Frame: [phase-dungeon-map.svg](./visual-fx/phase-dungeon-map.svg)

Behavior:

- Periodic audio creates clean corridors and repeated rooms.
- Kick/sub expands room outlines outward for a few frames.
- Stereo side widens the map horizontally.
- Transient density opens red gate segments.
- Noise gradually erodes the clean corridors into broken tiles.

Good for:

- Rhythmic music.
- Bass-heavy material.
- A playable-map feeling.

Parameters:

- `Mode`: `Map`
- `Grid Size`: `24`, `32`, `48`
- `Memory`: `Short`, `Medium`, `Long`
- `Symmetry`: `Off`, `Mirror`, `Rotate`
- `Wall Reactivity`
- `Stereo Spread`

### Selected Direction: Cave / Recurrence Fog

Frame: [phase-dungeon-cave.svg](./visual-fx/phase-dungeon-cave.svg)

Behavior:

- Repetition draws cave ribs and contour bands.
- Noise becomes granular fog.
- Periodic tones create concentric or diagonal recurrence veins.
- Kick/sub pushes the cave boundary outward like pressure.

Good for:

- Ambient, drone, noisy material.
- Igorrr/glitch/hyperpop textures.
- More abstract “explore the cave” mood.

Parameters:

- `Mode`: `Cave`
- `Cell Resolution`
- `Fog Amount`
- `Recurrence Threshold`
- `Low Pressure`
- `Decay`

Implementation Notes:

- Compute a small recurrence matrix from downsampled waveform chunks.
- Use diagonal strength as periodicity.
- Use row/column density as wall probability.
- Use cellular automata only as a post-process, not as the core signal detector.

## 2. Vector Laser

### Core Signal Idea

The module is a vector-scope/laser drawing hybrid. It should feel like an oscilloscope, Lissajous figure, and laser projector, but it can use spectral and transient features to modulate shape complexity.

Inputs:

- L/R or M/S waveform.
- Correlation and side.
- `transientImpact`: sharp corners and cuts.
- `centroid` / high ratio: line brightness and point density.
- `low`: scale and pull.
- `spectralCrest`: stable star-like vertices.

### Proposal A: Laser Vector Scope

Frame: [vector-laser-scope.svg](./visual-fx/vector-laser-scope.svg)

Behavior:

- L/R draws a clean vector loop.
- Side opens the loop horizontally.
- Low energy scales the whole drawing.
- Transients create short red edge flashes.
- Tonal material becomes stable geometric loops.
- Noise thickens the trace but should not become unreadable.

Good for:

- Useful-but-visual stereo motion.
- Plugin-like “laser meter” identity.
- Live audio responsiveness.

Parameters:

- `Mode`: `Scope`
- `Input`: `L/R`, `M/S`, `Mid`, `Side`
- `Persistence`
- `Trace Density`
- `Glow`
- `Transient Cuts`

### Proposal B: Laser Circuit / Glyph

Frame: [vector-laser-circuit.svg](./visual-fx/vector-laser-circuit.svg)

Behavior:

- Audio drives a graph of vector nodes.
- Recurring phases lock nodes into circuit traces.
- Transients send red pulses through the circuit.
- Stereo width splits branches laterally.
- High-frequency texture adds small violet/green nodes.

Good for:

- More graphic, less technical mode.
- Reaktor-ish custom display feeling.
- Visual performance mode.

Parameters:

- `Mode`: `Circuit`
- `Node Count`
- `Snap`
- `Pulse Decay`
- `Stereo Branching`
- `Noise Scatter`

Implementation Notes:

- Use a short ring buffer of XY samples.
- Simplify with point decimation and optional Ramer-Douglas-Peucker style reduction.
- Draw lines in canvas with existing palette.
- Keep technical readout optional; this is visual-first.

## Recommendation

Implement `Phase Dungeon` first as a separate visual module because it does not duplicate existing meters and gives MET-TR a unique identity. The selected first version is `Cave / Recurrence Fog`; `Map` is archived as a reference sketch only because it is less illustrative for the current direction.

`Vector Laser` is the second implemented visual module. It starts with `Scope` as the default mode because it reuses stereometer/time-domain logic, and includes `Circuit` as an alternate visual mode for a more graphic glyph display.

## Default Contract For New Visual Modules

- No signal means no fake dot, no fake path, no fake map.
- Every visible animated object must be driven by current or recent audio.
- Use existing palette and typography.
- Expose parameters only when they affect the display meaningfully.
- Start each module with one usable default mode, not all modes at once.
