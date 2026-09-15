# Tap Tempo BPM Counter

A small, dependency-free JavaScript module that estimates tempo from a series of taps. The repository includes a browser demo, a formula-derived interval-to-BPM reference table, tests, and a manual browser QA checklist.

## What is included

- `src/tap-tempo.js` — reusable `TapTempo` class
- `demo/` — responsive mouse, touch, and Space-bar demo
- `data/interval-to-bpm.csv` — reference values calculated with `BPM = 60,000 / interval in milliseconds`
- `test/` — deterministic tests using fixed timestamps
- `docs/manual-test-checklist.md` — browser and mobile checks

## Use the module

```js
import { TapTempo } from './src/tap-tempo.js';

const tempo = new TapTempo();
const result = tempo.tap(performance.now());
console.log(result.bpm, result.tapCount);
```

The default engine keeps the 12 most recent timestamps, starts a new series after a 2.5-second pause, removes interval samples that fall outside 65%–135% of the median interval, and converts the remaining average interval with `BPM = 60,000 / milliseconds`.

## Run the demo

Serve the repository root with any static web server, then open `/demo/`.

## Test

```sh
npm test
```

## Limits

Tap tempo is an estimate. It depends on consistent input and may settle on half-time or double-time when the beat is ambiguous. The module does not inspect or upload audio.

Live browser tool: [Quick BPM Finder](https://quickbpmfinder.com/tap-tempo)

## License

MIT
