import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight, Volume2, ShieldAlert, CheckCircle, Bell, BellOff, HelpCircle } from 'lucide-react';
import { Recipe, CookingStep, AccessibilitySettings } from '../types';
import { StepVisualizer } from './StepVisualizer';
import { speak, stopSpeaking, playChime, playWarning, startTimerAlarm, stopTimerAlarm } from '../utils/audio';

interface CookingModeProps {
  recipe: Recipe;
  onFinish: () => void;
  onExit: () => void;
  onOpenHelp: () => void;
  settings: AccessibilitySettings;
}

export const CookingMode: React.FC<CookingModeProps> = ({
  recipe,
  onFinish,
  onExit,
  onOpenHelp,
  settings
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep: CookingStep = recipe.steps[currentStepIndex];

  // Timer state for current step
  const [timerSeconds, setTimerSeconds] = useState(currentStep.timerSeconds || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);

  // When step changes, setup timer and speak if autoRead is true
  useEffect(() => {
    stopTimerAlarm();
    setIsAlarmRinging(false);
    setIsTimerRunning(false);

    if (currentStep.timerSeconds) {
      setTimerSeconds(currentStep.timerSeconds);
    } else {
      setTimerSeconds(0);
    }

    if (settings.autoReadSteps && settings.soundEffects) {
      const fullText = `Step ${currentStep.stepNumber}. ${currentStep.title}. ${currentStep.instruction}. ${
        currentStep.safetyWarning ? `Warning: ${currentStep.safetyWarning}` : ''
      }`;
      speak(fullText, settings.voiceSpeed);
    } else {
      stopSpeaking();
    }

    if (currentStep.safetyWarning && settings.soundEffects) {
      playWarning();
    }
  }, [currentStepIndex, currentStep, settings.autoReadSteps, settings.soundEffects, settings.voiceSpeed]);

  // Step Timer Countdown Interval
  useEffect(() => {
    let interval: number | null = null;

    if (isTimerRunning && timerSeconds > 0) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            // Timer expired!
            setIsTimerRunning(false);
            setIsAlarmRinging(true);
            if (settings.soundEffects) {
              startTimerAlarm();
              speak('Ding ding ding! Timer is finished! Check your food now.', settings.voiceSpeed);
            }
            return 0;
          }
          if (prev === 60 && settings.soundEffects) {
            speak('One minute left on the timer.', settings.voiceSpeed);
          } else if (prev === 10 && settings.soundEffects) {
            speak('Ten seconds left.', settings.voiceSpeed);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, settings.soundEffects, settings.voiceSpeed]);

  const handleNextStep = () => {
    stopTimerAlarm();
    stopSpeaking();
    if (settings.soundEffects) {
      playChime();
    }

    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFinish();
    }
  };

  const handlePrevStep = () => {
    stopTimerAlarm();
    stopSpeaking();
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onExit();
    }
  };

  const handleReadStep = () => {
    const text = `Step ${currentStep.stepNumber}. ${currentStep.title}. ${currentStep.instruction}. ${
      currentStep.tip ? `Helpful tip: ${currentStep.tip}` : ''
    } ${currentStep.safetyWarning ? `Caution: ${currentStep.safetyWarning}` : ''}`;
    speak(text, settings.voiceSpeed);
  };

  const handleStartTimer = () => {
    if (timerSeconds === 0 && currentStep.timerSeconds) {
      setTimerSeconds(currentStep.timerSeconds);
    }
    stopTimerAlarm();
    setIsAlarmRinging(false);
    setIsTimerRunning(true);
    if (settings.soundEffects) {
      speak('Timer started.', settings.voiceSpeed);
    }
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
    if (settings.soundEffects) {
      speak('Timer paused.', settings.voiceSpeed);
    }
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    stopTimerAlarm();
    setIsAlarmRinging(false);
    if (currentStep.timerSeconds) {
      setTimerSeconds(currentStep.timerSeconds);
    }
    if (settings.soundEffects) {
      speak('Timer reset.', settings.voiceSpeed);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isDark = settings.theme === 'yellow-black';
  const progressPercent = ((currentStepIndex + 1) / recipe.steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 pb-28 space-y-6">
      {/* Top Header Bar: Progress & Step Info */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border-4 shadow-xl ${
          isDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{recipe.emoji}</span>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-amber-500 block">
                {recipe.title}
              </span>
              <span className="text-xl sm:text-2xl font-black">
                Step {currentStep.stepNumber} of {recipe.steps.length}
              </span>
            </div>
          </div>

          <button
            onClick={onOpenHelp}
            type="button"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm border-2 border-white shadow active:scale-95 transition cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 stroke-[2.5]" />
            <span>NEED HELP?</span>
          </button>
        </div>

        {/* Visual Progress Bar (Very thick, high contrast) */}
        <div className="w-full h-4 sm:h-5 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-900 dark:border-yellow-400 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Visual Action Demonstrator Animation / Video */}
      <StepVisualizer
        clipType={currentStep.videoClipType}
        actionEmoji={currentStep.actionEmoji}
        stepTitle={currentStep.title}
        isHighContrastDark={isDark}
      />

      {/* Safety Warning Banner if step requires caution */}
      {currentStep.safetyWarning && (
        <div className="p-4 sm:p-5 rounded-3xl border-4 border-red-600 bg-red-100 dark:bg-red-950/80 text-red-950 dark:text-red-200 shadow-xl flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 border-2 border-white text-2xl font-black">
            ⚠️
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-black text-red-700 dark:text-red-400">
              SAFETY CAUTION:
            </h3>
            <p className="text-base sm:text-lg font-extrabold mt-0.5">
              {currentStep.safetyWarning}
            </p>
          </div>
          <button
            onClick={() => speak(`Safety warning: ${currentStep.safetyWarning}`, settings.voiceSpeed)}
            type="button"
            className="p-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black shrink-0 active:scale-95 shadow cursor-pointer border border-white"
            title="Read warning aloud"
          >
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* Main Step Instructions Box (Large, High Contrast, Clean) */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border-4 shadow-xl ${
          isDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-yellow-400 text-black border-3 border-black font-black text-2xl flex items-center justify-center shrink-0 shadow">
              {currentStep.stepNumber}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {currentStep.title}
            </h2>
          </div>

          {/* Dedicated Read To Me Button */}
          <button
            onClick={handleReadStep}
            type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-base sm:text-lg border-3 border-black shadow-lg active:scale-95 transition cursor-pointer shrink-0"
            aria-label="Read this step aloud"
          >
            <Volume2 className="w-6 h-6 stroke-[3]" />
            <span className="hidden sm:inline">READ TO ME</span>
          </button>
        </div>

        {/* Step Instruction text with custom size */}
        <p
          className={`font-black mt-6 leading-relaxed ${
            settings.textSize === 'extra-large'
              ? 'text-2xl sm:text-3xl'
              : 'text-xl sm:text-2xl'
          }`}
        >
          {currentStep.instruction}
        </p>

        {/* Helpful Tip if present */}
        {currentStep.tip && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-500/40 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <span className="text-xs font-black uppercase text-amber-800 dark:text-amber-400 block">
                Good to know:
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-amber-100">
                {currentStep.tip}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* BUILT-IN STEP TIMER (If step has a timer) */}
      {currentStep.timerSeconds && (
        <div className="rounded-3xl border-4 border-blue-500 bg-blue-950 text-white shadow-2xl overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">⏱️</span>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-blue-300">
                  {currentStep.timerLabel || 'Step Cooking Timer'}
                </h3>
                <p className="text-sm font-bold text-slate-300">
                  Tap START TIMER when you begin this step
                </p>
              </div>
            </div>

            {/* Read timer button */}
            <button
              onClick={() =>
                speak(
                  `Timer for ${currentStep.timerLabel}. ${Math.floor(
                    timerSeconds / 60
                  )} minutes remaining.`,
                  settings.voiceSpeed
                )
              }
              type="button"
              className="p-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold cursor-pointer active:scale-95"
              title="Speak timer info"
            >
              <Volume2 className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Alarm Ringing Banner */}
          {isAlarmRinging && (
            <div className="bg-red-600 border-4 border-yellow-300 rounded-2xl p-4 sm:p-6 mb-6 text-center animate-bounce shadow-2xl">
              <div className="flex items-center justify-center gap-3 text-white mb-3">
                <Bell className="w-10 h-10 animate-spin" />
                <span className="text-2xl sm:text-3xl font-black">
                  TIMER IS DONE! DING DING!
                </span>
              </div>
              <button
                onClick={() => {
                  stopTimerAlarm();
                  setIsAlarmRinging(false);
                }}
                type="button"
                className="px-8 py-4 rounded-2xl bg-yellow-300 text-black font-black text-xl sm:text-2xl border-4 border-black shadow-xl active:scale-95 cursor-pointer"
              >
                <BellOff className="w-6 h-6 inline mr-2" />
                STOP ALARM SOUND
              </button>
            </div>
          )}

          {/* Big Digital Timer Face */}
          <div className="py-6 px-4 rounded-3xl bg-slate-900 border-4 border-blue-400 flex flex-col items-center justify-center shadow-inner">
            <span className="text-7xl sm:text-8xl font-mono font-black tracking-tight text-yellow-300">
              {formatTime(timerSeconds)}
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-300 mt-2">
              {isTimerRunning
                ? '⏳ Food is cooking...'
                : timerSeconds === 0
                ? '✅ Finished!'
                : 'Tap green button to start'}
            </span>
          </div>

          {/* Large Timer Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {!isTimerRunning ? (
              <button
                onClick={handleStartTimer}
                type="button"
                className="py-5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-2xl shadow-xl flex items-center justify-center gap-3 border-4 border-white active:scale-95 transition cursor-pointer"
              >
                <Play className="w-7 h-7 fill-slate-950" />
                <span>START TIMER</span>
              </button>
            ) : (
              <button
                onClick={handlePauseTimer}
                type="button"
                className="py-5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-2xl shadow-xl flex items-center justify-center gap-3 border-4 border-black active:scale-95 transition cursor-pointer"
              >
                <Pause className="w-7 h-7 fill-slate-950" />
                <span>PAUSE TIMER</span>
              </button>
            )}

            <button
              onClick={handleResetTimer}
              type="button"
              className="py-5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xl border-3 border-slate-600 shadow flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
            >
              <RotateCcw className="w-6 h-6" />
              <span>RESET TIMER</span>
            </button>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM NAVIGATION BAR - EXTRA LARGE, EASY-TO-TAP BUTTONS */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t-4 border-slate-800 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Previous Step (Blue) */}
          <button
            onClick={handlePrevStep}
            type="button"
            className="flex-1 py-4 sm:py-5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg sm:text-xl border-3 border-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer min-h-[68px]"
          >
            <ArrowLeft className="w-6 h-6 stroke-[3]" />
            <span>{currentStepIndex === 0 ? 'PREP' : 'BACK'}</span>
          </button>

          {/* I DID THIS! NEXT STEP (GIANT GREEN) */}
          <button
            onClick={handleNextStep}
            type="button"
            className="flex-2 py-4 sm:py-5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl sm:text-2xl border-4 border-white shadow-2xl flex items-center justify-center gap-3 active:scale-98 transition cursor-pointer min-h-[68px]"
          >
            <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 text-emerald-400" />
            <span>
              {currentStepIndex === recipe.steps.length - 1
                ? 'FINISH RECIPE! 🎉'
                : 'I DID THIS! NEXT ➔'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
