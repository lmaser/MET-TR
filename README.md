# MET-TR

Prototype Web Audio metering interface.

## Current algorithms

- `METERING BASE V1 MIN`: stable baseline layout.
- `METERING V1b`: working branch with the local Pattern Detector module.

## Run locally

```sh
python -m http.server 8771 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8771/index.html
```

Use `System audio` or `Microphone` from the Global Parameters panel to start analysis.
