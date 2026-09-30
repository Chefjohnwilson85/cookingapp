/**
 * Audio synthesis utility for voice guidance and sound effects.
 * Uses Web Speech API for TTS and Web Audio API for offline, reliable sound effects.
 */

let audioCtx: AudioContext | null = null;
let currentAlarmInterval: number | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ---------------- Speech Synthesis (Voice Guidance) ----------------

export function speak(text: string, rate: number = 0.85, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip emoji characters or special symbols that speech synthesizers stutter on
  const cleanText = text
    .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
    .replace(/[⚠️✅⬅️➔🔊⏱️🍽️🧀🍞🍳🥛🍌🍫🍲🥪]/gu, '')
    .trim();

  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = Math.max(0.6, Math.min(1.2, rate));
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  // Try to pick an English voice that sounds natural
  const voices = window.speechSynthesis.getVoices();
  const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
  if (naturalVoice) {
    utterance.voice = naturalVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeaking(): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
}

// ---------------- Web Audio SFX ----------------

/**
 * Play a friendly positive click/pop
 */
export function playClick(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Audio context may be restricted before first gesture
  }
}

/**
 * Play an affirmative chime for next step
 */
export function playChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch {
    // Ignore audio error
  }
}

/**
 * Play a gentle caution tone for safety warnings
 */
export function playWarning(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [440, 370]; // A4, F#4
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.15;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch {
    // Ignore
  }
}

/**
 * Play repeating clear timer alarm (Ding-Dong Ding-Dong)
 */
export function startTimerAlarm(): void {
  stopTimerAlarm(); // ensure no duplicates

  const ringOnce = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const now = ctx.currentTime;

      // Ding (High Bell)
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(880, now); // A5
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.4);

      // Dong (Warm chime)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      const secondTime = now + 0.22;
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, secondTime); // E5
      gain2.gain.setValueAtTime(0, secondTime);
      gain2.gain.linearRampToValueAtTime(0.35, secondTime + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, secondTime + 0.6);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(secondTime);
      osc2.stop(secondTime + 0.6);
    } catch {
      // Ignore
    }
  };

  ringOnce();
  currentAlarmInterval = window.setInterval(ringOnce, 1200);
}

export function stopTimerAlarm(): void {
  if (currentAlarmInterval !== null) {
    clearInterval(currentAlarmInterval);
    currentAlarmInterval = null;
  }
}

/**
 * Joyful celebratory fanfare when finishing recipe!
 */
export function playFanfare(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // C5, E5, G5, High C6 held
    const notes = [
      { freq: 523.25, duration: 0.15 },
      { freq: 659.25, duration: 0.15 },
      { freq: 783.99, duration: 0.15 },
      { freq: 1046.50, duration: 0.8 },
    ];

    let timeOffset = 0;
    notes.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + timeOffset;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + note.duration);

      timeOffset += (note.duration === 0.8 ? 0.3 : 0.14);
    });
  } catch {
    // Ignore
  }
}

/**
 * Vibrate phone if supported
 */
export function triggerHaptic(durationMs: number = 100): void {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(durationMs);
    } catch {
      // vibrate might not be permitted
    }
  }
}
