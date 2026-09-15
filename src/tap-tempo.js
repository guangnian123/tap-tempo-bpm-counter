export class TapTempo {
  constructor({ resetAfterMs = 2500, maxTaps = 12 } = {}) {
    this.resetAfterMs = resetAfterMs;
    this.maxTaps = maxTaps;
    this.timestamps = [];
  }

  reset() {
    this.timestamps = [];
  }

  tap(timestamp = performance.now()) {
    const last = this.timestamps.at(-1);
    if (last !== undefined && timestamp - last > this.resetAfterMs) {
      this.reset();
    }

    this.timestamps.push(timestamp);
    if (this.timestamps.length > this.maxTaps) this.timestamps.shift();

    return {
      bpm: this.getBpm(),
      tapCount: this.timestamps.length,
      ready: this.timestamps.length >= 2,
    };
  }

  getBpm() {
    if (this.timestamps.length < 2) return null;

    const intervals = [];
    for (let i = 1; i < this.timestamps.length; i += 1) {
      intervals.push(this.timestamps[i] - this.timestamps[i - 1]);
    }

    const sorted = [...intervals].sort((a, b) => a - b);
    const median = sorted.length % 2
      ? sorted[(sorted.length - 1) / 2]
      : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;

    const filtered = intervals.filter(
      (interval) => interval >= median * 0.65 && interval <= median * 1.35,
    );
    const samples = filtered.length ? filtered : intervals;
    const average = samples.reduce((sum, value) => sum + value, 0) / samples.length;

    return Math.round(60000 / average);
  }
}
