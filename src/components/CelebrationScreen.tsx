import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Sparkles, CheckCircle2, RotateCcw, Home, Volume2 } from 'lucide-react';
import { Recipe, AccessibilitySettings } from '../types';
import { playFanfare, speak, stopSpeaking } from '../utils/audio';

interface CelebrationScreenProps {
  recipe: Recipe;
  onCookAgain: () => void;
  onGoHome: () => void;
  onViewBadges: () => void;
  settings: AccessibilitySettings;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  recipe,
  onCookAgain,
  onGoHome,
  onViewBadges,
  settings
}) => {
  useEffect(() => {
    // Fire confetti bursts
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 400);
    } catch {
      // Ignore if confetti fails
    }

    if (settings.soundEffects) {
      playFanfare();
      speak(
        `Awesome job! You successfully made ${recipe.title}! You are a certified chef. Make sure your stove is off and enjoy your food!`,
        settings.voiceSpeed
      );
    }

    return () => {
      stopSpeaking();
    };
  }, [recipe.title, settings.soundEffects, settings.voiceSpeed]);

  const isDark = settings.theme === 'yellow-black';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Trophy Card */}
      <div
        className={`p-6 sm:p-10 rounded-3xl border-4 shadow-2xl text-center flex flex-col items-center justify-center ${
          isDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-amber-400 border-4 border-black flex items-center justify-center text-6xl sm:text-7xl shadow-xl animate-bounce mb-4">
          🏆
        </div>

        <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-black font-black text-xs uppercase tracking-widest border border-black mb-2">
          <Sparkles className="w-4 h-4 fill-black" />
          <span>RECIPE COMPLETED!</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
          YOU DID IT, CHEF!
        </h1>

        <p className="text-xl sm:text-2xl font-bold opacity-90 mt-2 max-w-lg">
          You made delicious <span className="underline decoration-amber-400">{recipe.title}</span>!
        </p>

        {/* Recipe Photo & Badge */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-3 border-amber-400 flex items-center gap-4 max-w-md w-full text-left">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-20 h-20 rounded-xl object-cover border-2 border-black shrink-0"
          />
          <div>
            <div className="flex items-center gap-1 text-xs font-black text-amber-700 dark:text-amber-400">
              <Award className="w-4 h-4" />
              <span>NEW TROPHY EARNED</span>
            </div>
            <h3 className="text-xl font-black mt-0.5">{recipe.title} Master</h3>
            <p className="text-xs font-bold opacity-75">Added to your Chef Trophies</p>
          </div>
        </div>

        {/* Kitchen Safety Final Check */}
        <div className="mt-6 w-full max-w-md p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 border-3 border-emerald-600 text-left">
          <h4 className="text-base font-black text-emerald-950 dark:text-emerald-300 flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Final Kitchen Safety Check:</span>
          </h4>
          <ul className="text-sm font-bold text-slate-800 dark:text-emerald-100 space-y-1">
            <li>✓ Stove or microwave is turned OFF</li>
            <li>✓ Hot pans are on safe heat-proof mats</li>
            <li>✓ Hands are clean before eating!</li>
          </ul>
        </div>

        {/* Read aloud button */}
        <button
          onClick={() =>
            speak(
              `Awesome job! You successfully made ${recipe.title}. You are a certified chef. Make sure your stove is off and enjoy your delicious food!`,
              settings.voiceSpeed
            )
          }
          type="button"
          className="mt-4 px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm border-2 border-black flex items-center gap-2 active:scale-95 cursor-pointer"
        >
          <Volume2 className="w-5 h-5 stroke-[2.5]" />
          <span>READ CELEBRATION</span>
        </button>
      </div>

      {/* Big Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onViewBadges}
          type="button"
          className="flex-1 py-5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xl border-3 border-black shadow-lg flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
        >
          <Award className="w-6 h-6" />
          <span>VIEW MY TROPHIES</span>
        </button>

        <button
          onClick={onGoHome}
          type="button"
          className="flex-1 py-5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl border-4 border-white shadow-xl flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
        >
          <Home className="w-6 h-6" />
          <span>CHOOSE ANOTHER RECIPE ➔</span>
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={onCookAgain}
          type="button"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-200 font-bold text-base border-2 border-slate-400 cursor-pointer active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Cook this recipe again</span>
        </button>
      </div>
    </div>
  );
};
