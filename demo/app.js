import { TapTempo } from '../src/tap-tempo.js';

const tempo = new TapTempo();
const bpm = document.querySelector('#bpm');
const count = document.querySelector('#count');
const tapButton = document.querySelector('#tap');
const resetButton = document.querySelector('#reset');

function render(result) {
  bpm.textContent = result.bpm ?? '—';
  count.textContent = `${result.tapCount} ${result.tapCount === 1 ? 'tap' : 'taps'}`;
}

function tap() {
  render(tempo.tap());
}

function reset() {
  tempo.reset();
  render({ bpm: null, tapCount: 0 });
}

tapButton.addEventListener('click', tap);
resetButton.addEventListener('click', reset);
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && !event.repeat) {
    event.preventDefault();
    tap();
  }
});
