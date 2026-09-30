import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, X, Plus, Minus, Bell, BellOff } from 'lucide-react';
import { startTimerAlarm, stopTimerAlarm, speak, stopSpeaking } from '../utils/audio';

interface QuickTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  voiceSpeed: number;
  isHighContrastDark?: boolean;
}

export const QuickTimerModal: React.FC<QuickTimerModalProps> = ({
  isOpen,
  onClose,
  voiceSpeed,
  isHighContrastDark = false
}) => {
  const [totalSeconds, setTotalSeconds] = useState(180); // default 3 min
  const [remainingSeconds, setRemainingSeconds] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [isAlarmActive, setIsAlarmActive] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning && remainingSeconds > 0) {
      interval = window.setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            // Timer complete!
            setIsRunning(false);
            setIsAlarmActive(true);
            startTimerAlarm();
            speak('Time is up! Your kitchen timer has finished! Check your food now.', voiceSpeed);
            return 0;
          }
          if (prev === 60) {
            speak('One minute remaining.', voiceSpeed);
          } else if (prev === 10) {
            speak('Ten seconds remaining.', voiceSpeed);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remainingSeconds, voiceSpeed]);

  const handleClose = () => {
    stopTimerAlarm();
    stopSpeaking();
    setIsAlarmActive(false);
    onClose();
  };

  const handleStart = () => {
    if (remainingSeconds === 0) {
      setRemainingSeconds(totalSeconds || 60);
    }
    setIsAlarmActive(false);
    stopTimerAlarm();
    setIsRunning(true);
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    const msg = mins > 0 ? `Timer started for ${mins} minutes ${secs > 0 ? `${secs} seconds` : ''}` : `Timer started for ${secs} seconds`;
    speak(msg, voiceSpeed);
  };

  const handlePause = () => {
    setIsRunning(false);
    speak('Timer paused.', voiceSpeed);
  };

  const handleReset = () => {
    setIsRunning(false);
    stopTimerAlarm();
    stopSpeaking();
    setIsAlarmActive(false);
    setRemainingSeconds(totalSeconds);
    speak('Timer reset.', voiceSpeed);
  };

  const handleSetPreset = (secs: number, label: string) => {
    stopTimerAlarm();
    setIsAlarmActive(false);
    setIsRunning(false);
    setTotalSeconds(secs);
    setRemainingSeconds(secs);
    speak(`${label} timer set.`, voiceSpeed);
  };

  const adjustSeconds = (delta: number) => {
    const next = Math.max(10, remainingSeconds + delta);
    setRemainingSeconds(next);
    setTotalSeconds(next);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-timer-title"
    >
      <div
        className={`w-full max-w-xl rounded-3xl border-4 shadow-2xl overflow-hidden my-auto transition-all ${
          isHighContrastDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-slate-900 border-yellow-400 text-white'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b-4 border-yellow-400 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">⏱️</span>
            <div>
              <h2 id="quick-timer-title" className="text-2xl sm:text-3xl font-black text-white">
                Kitchen Timer
              </h2>
              <p className="text-sm font-bold text-amber-300">
                Large, loud, and easy to use
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-lg border-2 border-white shadow-lg active:scale-95 transition cursor-pointer"
            aria-label="Close timer"
          >
            <X className="w-6 h-6 stroke-[3]" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Alarm Banner if ringing */}
        {isAlarmActive && (
          <div className="bg-red-600 border-b-4 border-yellow-300 p-6 text-center animate-bounce">
            <div className="flex items-center justify-center gap-3 text-white mb-3">
              <Bell className="w-10 h-10 animate-spin" />
              <span className="text-3xl font-black">TIME IS UP! DING DING!</span>
            </div>
            <button
              onClick={() => {
                stopTimerAlarm();
                stopSpeaking();
                setIsAlarmActive(false);
              }}
              type="button"
              className="px-8 py-4 rounded-2xl bg-yellow-300 hover:bg-yellow-200 text-black font-black text-2xl shadow-2xl active:scale-95 cursor-pointer border-4 border-black"
            >
              <BellOff className="w-7 h-7 inline mr-2" />
              STOP ALARM
            </button>
          </div>
        )}

        {/* Giant Timer Display */}
        <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-slate-950">
          <div
            className={`w-full py-6 rounded-3xl border-4 flex flex-col items-center justify-center shadow-inner transition-colors ${
              isAlarmActive
                ? 'bg-red-950 border-red-500 text-red-300'
                : isRunning
                ? 'bg-emerald-950/70 border-emerald-400 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-yellow-300'
            }`}
          >
            <span className="text-7xl sm:text-8xl font-mono font-black tracking-tight select-none">
              {formatTime(remainingSeconds)}
            </span>
            <span className="text-base sm:text-lg font-bold text-slate-300 mt-2">
              {isRunning ? '⏳ Counting down...' : remainingSeconds === 0 ? '🔔 Finished!' : 'Ready to start'}
            </span>
          </div>

          {/* Quick Adjust Buttons (+30s, +1m, -30s) */}
          <div className="flex items-center gap-3 mt-4 w-full justify-center">
            <button
              onClick={() => adjustSeconds(-30)}
              disabled={isRunning}
              type="button"
              className="flex items-center gap-1 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border-2 border-slate-600 disabled:opacity-40 cursor-pointer active:scale-95"
            >
              <Minus className="w-5 h-5" />
              <span>30 sec</span>
            </button>

            <button
              onClick={() => adjustSeconds(30)}
              disabled={isRunning}
              type="button"
              className="flex items-center gap-1 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border-2 border-slate-600 disabled:opacity-40 cursor-pointer active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>30 sec</span>
            </button>

            <button
              onClick={() => adjustSeconds(60)}
              disabled={isRunning}
              type="button"
              className="flex items-center gap-1 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-base border-2 border-slate-600 disabled:opacity-40 cursor-pointer active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>1 min</span>
            </button>
          </div>
        </div>

        {/* Big Action Buttons (START / PAUSE / RESET) */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t-4 border-slate-800 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-4">
            {!isRunning ? (
              <button
                onClick={handleStart}
                type="button"
                className="col-span-2 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-2xl sm:text-3xl shadow-xl flex items-center justify-center gap-3 border-4 border-white active:scale-95 transition cursor-pointer"
              >
                <Play className="w-8 h-8 fill-slate-950" />
                <span>START TIMER</span>
              </button>
            ) : (
              <button
                onClick={handlePause}
                type="button"
                className="col-span-2 py-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-2xl sm:text-3xl shadow-xl flex items-center justify-center gap-3 border-4 border-black active:scale-95 transition cursor-pointer"
              >
                <Pause className="w-8 h-8 fill-slate-950" />
                <span>PAUSE TIMER</span>
              </button>
            )}

            <button
              onClick={handleReset}
              type="button"
              className="col-span-2 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-lg border-2 border-slate-600 shadow flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
            >
              <RotateCcw className="w-6 h-6" />
              <span>RESET TIMER</span>
            </button>
          </div>

          {/* Quick Presets Grid */}
          <div className="mt-2">
            <span className="text-xs uppercase font-black tracking-widest text-slate-400 block mb-2">
              One-Tap Presets
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: '30s', secs: 30, text: '30 seconds' },
                { label: '1m', secs: 60, text: '1 minute' },
                { label: '2m', secs: 120, text: '2 minutes' },
                { label: '3m', secs: 180, text: '3 minutes' },
                { label: '5m', secs: 300, text: '5 minutes' },
                { label: '8m', secs: 480, text: '8 minutes' },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handleSetPreset(preset.secs, preset.text)}
                  type="button"
                  className={`py-3 px-2 rounded-xl text-center font-black text-base border-2 transition active:scale-95 cursor-pointer ${
                    totalSeconds === preset.secs
                      ? 'bg-yellow-400 text-black border-yellow-300 shadow-md'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border-slate-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
