class AudioManager {
  constructor() {
    this.context = null;
    this.masterGain = null;
  }

  getContext() {
    if (this.context) {
      return this.context;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    this.context = new AudioContextClass();
    this.masterGain = this.context.createGain();
    this.masterGain.gain.value = 0.16;
    this.masterGain.connect(this.context.destination);

    return this.context;
  }

  unlock() {
    const context = this.getContext();

    if (!context || context.state === "running") {
      return;
    }

    void context.resume().catch(() => {});
  }

  playTone({
    frequency,
    duration = 0.12,
    volume = 0.2,
    type = "sine",
    attack = 0.005,
    release = 0.08,
    slideTo,
    when = 0,
  }) {
    const context = this.getContext();

    if (!context || !this.masterGain || context.state !== "running") {
      return;
    }

    const startAt = context.currentTime + when;
    const endAt = startAt + duration;
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);

    if (slideTo) {
      oscillator.frequency.exponentialRampToValueAtTime(slideTo, endAt);
    }

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(volume, startAt + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, endAt + release);

    oscillator.connect(gain);
    gain.connect(this.masterGain);

    oscillator.start(startAt);
    oscillator.stop(endAt + release);
  }

  playFlap() {
    this.playTone({
      frequency: 640,
      slideTo: 360,
      duration: 0.08,
      volume: 0.16,
      type: "triangle",
      release: 0.05,
    });
  }

  playScore() {
    this.playTone({
      frequency: 740,
      slideTo: 820,
      duration: 0.07,
      volume: 0.14,
      type: "square",
      release: 0.05,
    });
    this.playTone({
      frequency: 930,
      slideTo: 1120,
      duration: 0.08,
      volume: 0.12,
      type: "triangle",
      when: 0.06,
      release: 0.05,
    });
  }

  playHit() {
    this.playTone({
      frequency: 240,
      slideTo: 90,
      duration: 0.18,
      volume: 0.22,
      type: "sawtooth",
      release: 0.1,
    });
  }

  playSwoosh() {
    this.playTone({
      frequency: 420,
      slideTo: 620,
      duration: 0.1,
      volume: 0.12,
      type: "triangle",
      release: 0.06,
    });
  }
}

const sharedAudioManager = new AudioManager();

export function getAudioManager() {
  return sharedAudioManager;
}
