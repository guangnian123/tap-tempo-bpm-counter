import assert from 'node:assert/strict';
import test from 'node:test';
import { TapTempo } from '../src/tap-tempo.js';

test('returns 120 BPM for 500 ms intervals', () => {
  const tempo = new TapTempo();
  [0, 500, 1000, 1500, 2000].forEach((time) => tempo.tap(time));
  assert.equal(tempo.getBpm(), 120);
});

test('ignores a single large interval outlier', () => {
  const tempo = new TapTempo();
  [0, 500, 1000, 2000, 2500, 3000].forEach((time) => tempo.tap(time));
  assert.equal(tempo.getBpm(), 120);
});

test('starts a new series after the reset pause', () => {
  const tempo = new TapTempo({ resetAfterMs: 2500 });
  tempo.tap(0);
  tempo.tap(500);
  const result = tempo.tap(4000);
  assert.equal(result.tapCount, 1);
  assert.equal(result.bpm, null);
});

test('keeps only the configured number of timestamps', () => {
  const tempo = new TapTempo({ maxTaps: 4 });
  [0, 500, 1000, 1500, 2000].forEach((time) => tempo.tap(time));
  assert.equal(tempo.timestamps.length, 4);
});
