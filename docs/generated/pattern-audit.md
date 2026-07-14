# Pattern Detector Audit Report

Generated: 2026-07-14T19:38:13.539Z

This report is produced by `tools/pattern-audit.mjs`. It is a baseline measurement of the current detector, not a tuned result.

## Configuration

- FFT size: 8192
- Hop size: 512
- Frequency byte mapping: -100 dB to -30 dB
- Tested files: `C:\Users\Dev\Downloads\kick.wav`, `snare.wav`, `tom.wav`, `hats.wav`, `cymbal.wav`
- Synthetic cases: kick plus distorted 808 tail, kick plus snare, snare plus hats.
- Pattern reference: `docs/generated/pattern-reference.mid`
- Pattern WAV cases: `docs/generated/default-drums.wav`, `docs/generated/default-prog.wav`
- Pattern tempo contract: 120 BPM; embedded MIDI tempo reads 120.00 BPM and is reported separately for WAV alignment
- Pattern match tolerance: 45 ms

## Primary Classification

| Case                         | Expected | Feature winner | Hit winner | Count winner | Pass | Feature target/residual | Retriggers >250ms |
| ---------------------------- | -------- | -------------- | ---------- | ------------ | ---- | ----------------------- | ----------------- |
| kick                         | kick     | kick           | kick       | kick         | yes  | 3.87                    | none              |
| snare                        | snare    | snare          | kick       | kick         | yes  | 1.23                    | none              |
| tom                          | tom      | tom            | kick       | kick         | yes  | 1.45                    | kick:1            |
| hats                         | hat      | hat            | snare      | hat          | yes  | 1.20                    | none              |
| cymbal                       | cymbal   | cymbal         | hat        | cymbal       | yes  | 1.16                    | cymbal:1          |
| synthetic_kick_plus_808_tail | kick     | kick           | kick       | kick         | yes  | 5.48                    | kick:1            |
| synthetic_kick_plus_snare    | kick     | kick           | kick       | kick         | yes  | 1.21                    | kick:1            |
| synthetic_snare_plus_hats    | snare    | snare          | kick       | kick         | yes  | 1.18                    | none              |

## Peak Hit Values

| Case                         | kick  | tom   | snare | hat   | cymbal |
| ---------------------------- | ----- | ----- | ----- | ----- | ------ |
| kick                         | 1.000 | 0.000 | 0.000 | 1.000 | 0.026  |
| snare                        | 1.000 | 0.000 | 1.000 | 0.062 | 1.000  |
| tom                          | 1.000 | 1.000 | 0.005 | 1.000 | 0.000  |
| hats                         | 0.000 | 0.000 | 1.000 | 1.000 | 0.026  |
| cymbal                       | 0.000 | 0.000 | 0.102 | 1.000 | 1.000  |
| synthetic_kick_plus_808_tail | 1.000 | 0.000 | 0.000 | 1.000 | 0.017  |
| synthetic_kick_plus_snare    | 1.000 | 0.000 | 0.040 | 1.000 | 1.000  |
| synthetic_snare_plus_hats    | 1.000 | 0.000 | 1.000 | 0.073 | 1.000  |

## Hit Counts

| Case                         | kick | tom | snare | hat | cymbal |
| ---------------------------- | ---- | --- | ----- | --- | ------ |
| kick                         | 1    | 0   | 0     | 1   | 0      |
| snare                        | 1    | 0   | 1     | 0   | 1      |
| tom                          | 1    | 1   | 0     | 1   | 0      |
| hats                         | 0    | 0   | 1     | 2   | 0      |
| cymbal                       | 0    | 0   | 0     | 1   | 2      |
| synthetic_kick_plus_808_tail | 2    | 0   | 0     | 1   | 0      |
| synthetic_kick_plus_snare    | 2    | 0   | 0     | 1   | 1      |
| synthetic_snare_plus_hats    | 1    | 0   | 1     | 0   | 1      |

## Peak Raw Class Features

These are the class features before hit-envelope saturation.

| Case                         | kick  | tom   | snare | hat   | cymbal |
| ---------------------------- | ----- | ----- | ----- | ----- | ------ |
| kick                         | 2.190 | 0.043 | 0.074 | 0.566 | 0.336  |
| snare                        | 0.697 | 0.020 | 0.995 | 0.736 | 0.806  |
| tom                          | 1.173 | 1.698 | 0.115 | 0.300 | 0.063  |
| hats                         | 0.000 | 0.176 | 1.221 | 1.469 | 0.546  |
| cymbal                       | 0.022 | 0.022 | 0.799 | 1.005 | 1.164  |
| synthetic_kick_plus_808_tail | 2.443 | 0.039 | 0.069 | 0.445 | 0.177  |
| synthetic_kick_plus_snare    | 1.706 | 0.028 | 0.255 | 1.037 | 1.413  |
| synthetic_snare_plus_hats    | 0.649 | 0.018 | 0.932 | 0.713 | 0.792  |

## Continuous Pattern WAV vs MIDI Reference

| WAV           | Tempo        | Matched | Expected | Detected | Precision | Recall | Misses | Extras |
| ------------- | ------------ | ------- | -------- | -------- | --------- | ------ | ------ | ------ |
| default-drums | 120 declared | 13      | 32       | 40       | 0.33      | 0.41   | 19     | 27     |
| default-prog  | 120 declared | 12      | 32       | 34       | 0.35      | 0.38   | 20     | 22     |

## Pattern Match By Class

| WAV           | Tempo        | Class  | Matched | Expected | Detected | Precision | Recall |
| ------------- | ------------ | ------ | ------- | -------- | -------- | --------- | ------ |
| default-drums | 120 declared | kick   | 5       | 9        | 14       | 0.36      | 0.56   |
| default-drums | 120 declared | tom    | 2       | 6        | 5        | 0.40      | 0.33   |
| default-drums | 120 declared | snare  | 3       | 8        | 6        | 0.50      | 0.38   |
| default-drums | 120 declared | hat    | 0       | 6        | 6        | 0.00      | 0.00   |
| default-drums | 120 declared | cymbal | 3       | 3        | 9        | 0.33      | 1.00   |
| default-prog  | 120 declared | kick   | 6       | 9        | 11       | 0.55      | 0.67   |
| default-prog  | 120 declared | tom    | 3       | 6        | 9        | 0.33      | 0.50   |
| default-prog  | 120 declared | snare  | 3       | 8        | 6        | 0.50      | 0.38   |
| default-prog  | 120 declared | hat    | 0       | 6        | 5        | 0.00      | 0.00   |
| default-prog  | 120 declared | cymbal | 0       | 3        | 3        | 0.00      | 0.00   |

## Alignment Diagnostic

This does not change the official score. It asks whether the detector is mostly wrong or mostly late/early.

| WAV           | Best BPM | Detector offset | Matched | Precision | Recall |
| ------------- | -------- | --------------- | ------- | --------- | ------ |
| default-drums | 120      | -5 ms           | 14      | 0.35      | 0.44   |
| default-prog  | 120      | 15 ms           | 14      | 0.41      | 0.44   |

- default-drums: misses kick@0.000s, hat@1.500s, snare@2.500s, snare@3.000s, hat@3.000s, hat@3.500s, tom@4.000s, hat@4.500s, kick@5.000s, tom@5.000s, tom@5.500s, kick@6.250s; extras kick@0.157s, kick@0.466s, hat@0.520s, snare@0.530s, cymbal@1.512s, hat@2.173s, hat@2.258s, hat@2.344s, hat@2.429s, kick@2.685s, kick@2.877s, cymbal@3.016s.
- default-prog: misses kick@0.000s, hat@1.500s, cymbal@2.000s, snare@2.500s, hat@3.000s, hat@3.500s, tom@4.000s, cymbal@4.000s, hat@4.500s, tom@5.000s, tom@5.500s, kick@6.250s; extras kick@0.157s, kick@0.424s, snare@0.541s, cymbal@1.554s, hat@2.152s, hat@2.237s, hat@2.322s, hat@2.408s, kick@2.685s, tom@2.781s, tom@3.005s, snare@3.517s.

## Notes

- kick: peak target kick=1.000, strongest residues hat 1.000, cymbal 0.026, tonal low tail 0.986, high wash 0.147.
- snare: peak target snare=1.000, strongest residues kick 1.000, cymbal 1.000, tonal low tail 0.716, high wash 0.529.
- tom: peak target tom=1.000, strongest residues kick 1.000, hat 1.000, tonal low tail 0.639, high wash 0.053.
- hats: peak target hat=1.000, strongest residues snare 1.000, cymbal 0.026, tonal low tail 0.057, high wash 0.324.
- cymbal: peak target cymbal=1.000, strongest residues hat 1.000, snare 0.102, tonal low tail 0.225, high wash 0.534.
- synthetic_kick_plus_808_tail: peak target kick=1.000, strongest residues hat 1.000, cymbal 0.017, tonal low tail 0.984, high wash 0.104.
- synthetic_kick_plus_snare: peak target kick=1.000, strongest residues hat 1.000, cymbal 1.000, tonal low tail 0.952, high wash 0.464.
- synthetic_snare_plus_hats: peak target snare=1.000, strongest residues kick 1.000, cymbal 1.000, tonal low tail 0.673, high wash 0.490.

## Baseline Interpretation

- A correct detector should make the expected class the dominant raw class feature and event family for isolated samples.
- Non-target residuals should stay materially lower than the target, especially for kick/tom and snare/hat/cymbal families.
- Sustained low-frequency tails should not create repeated kick hits after the first attack.
- Cymbal wash should be represented as presence/body later, not as repeated cymbal onsets unless a new attack occurs.
- If hit peaks saturate to 1.000 across several classes, the display envelope is not diagnostic enough; use raw feature dominance and event counts to tune the backend.

