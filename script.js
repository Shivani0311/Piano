document.querySelectorAll('.key, .black-key').forEach(key => {
  key.addEventListener('mousedown', () => {
    const note = key.dataset.note;
    playSound(note);
  });

  key.addEventListener('mouseup', () => {
    stopSound();
  });

  key.addEventListener('mouseleave', () => {
    stopSound();
  });
});

let oscillator = null;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(note) {
  const frequency = getFrequency(note);
  oscillator = audioContext.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
}

function stopSound() {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }
}

function getFrequency(note) {
  const frequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'E#': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
  };
  return frequencies[note];
}