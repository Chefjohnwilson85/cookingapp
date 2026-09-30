import React, { useState } from 'react';
import { ArrowLeft, Play, CheckCircle2, Circle, ShieldAlert, Sparkles, Volume2 } from 'lucide-react';
import { Recipe } from '../types';
import { speak, playChime, playClick } from '../utils/audio';

interface PrepChecklistProps {
  recipe: Recipe;
  onStartCooking: () => void;
  onBack: () => void;
  onWatchVideo: () => void;
  voiceSpeed: number;
  isHighContrastDark?: boolean;
}

export const PrepChecklist: React.FC<PrepChecklistProps> = ({
  recipe,
  onStartCooking,
  onBack,
  onWatchVideo,
  voiceSpeed,
  isHighContrastDark = false
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [checkedTools, setCheckedTools] = useState<Record<string, boolean>>({});

  const toggleIngredient = (id: string, name: string) => {
    playClick();
    const isNowChecked = !checkedIngredients[id];
    setCheckedIngredients((prev) => ({ ...prev, [id]: isNowChecked }));
    if (isNowChecked) {
      speak(`Got ${name}!`, voiceSpeed);
    }
  };

  const toggleTool = (id: string, name: string) => {
    playClick();
    const isNowChecked = !checkedTools[id];
    setCheckedTools((prev) => ({ ...prev, [id]: isNowChecked }));
    if (isNowChecked) {
      speak(`Got ${name}!`, voiceSpeed);
    }
  };

  const handleReadSafety = () => {
    const text = `Kitchen Safety Rules for ${recipe.title}: ${recipe.safetyRules.join('. ')}`;
    speak(text, voiceSpeed);
  };

  const handleReadIngredients = () => {
    const list = recipe.ingredients.map(i => `${i.amount} of ${i.name}`).join(', ');
    speak(`You will need: ${list}.`, voiceSpeed);
  };

  const allIngredientsChecked = recipe.ingredients.every(i => checkedIngredients[i.id]);
  const allToolsChecked = recipe.tools.every(t => checkedTools[t.id]);

  const handleBegin = () => {
    playChime();
    onStartCooking();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-base border-3 border-black shadow-md active:scale-95 transition cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[3]" />
          <span>BACK TO ALL RECIPES</span>
        </button>

        <button
          onClick={onWatchVideo}
          type="button"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base border-3 border-black shadow-md active:scale-95 transition cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>WATCH VIDEO TUTORIAL</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border-4 shadow-xl flex flex-col sm:flex-row items-center gap-6 ${
          isHighContrastDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-slate-900 shadow-md shrink-0"
        />

        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            <span className="text-4xl">{recipe.emoji}</span>
            <span className="px-3 py-1 rounded-xl bg-amber-300 text-slate-950 font-black text-xs uppercase border border-black">
              Step 0: Getting Ready
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">{recipe.title}</h1>
          <p className="text-base sm:text-lg opacity-90 mt-2">
            {recipe.shortDescription}
          </p>
          <p className="text-sm font-bold opacity-80 mt-1">
            ⏱️ Takes {recipe.totalTimeMinutes} minutes · 📝 {recipe.steps.length} easy steps
          </p>
        </div>
      </div>

      {/* Safety Rules First */}
      <div className="p-6 rounded-3xl border-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-slate-950 dark:text-amber-200 shadow-lg">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-amber-600 dark:text-amber-400 shrink-0" />
            <h2 className="text-2xl font-black">Kitchen Safety Checklist</h2>
          </div>
          <button
            onClick={handleReadSafety}
            type="button"
            className="p-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-black flex items-center gap-2 shadow cursor-pointer active:scale-95"
            aria-label="Read safety rules aloud"
          >
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
            <span className="hidden sm:inline">READ SAFETY</span>
          </button>
        </div>

        <ul className="space-y-3">
          {recipe.safetyRules.map((rule, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/80 dark:bg-black/50 border-2 border-amber-300"
            >
              <span className="w-7 h-7 rounded-full bg-amber-400 text-black font-black flex items-center justify-center text-sm shrink-0 border border-black">
                {idx + 1}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-amber-100">
                {rule}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ingredients Checklist */}
      <div
        className={`p-6 rounded-3xl border-4 shadow-xl ${
          isHighContrastDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-black flex items-center gap-2">
              <span>🥫</span>
              <span>Ingredients You Need</span>
            </h2>
            <p className="text-sm opacity-80 font-bold">
              Tap each ingredient when you place it on your counter
            </p>
          </div>

          <button
            onClick={handleReadIngredients}
            type="button"
            className="p-3 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-black flex items-center gap-2 shadow cursor-pointer active:scale-95"
          >
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
            <span className="hidden sm:inline">READ ALL</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recipe.ingredients.map((ing) => {
            const isChecked = !!checkedIngredients[ing.id];
            return (
              <button
                key={ing.id}
                onClick={() => toggleIngredient(ing.id, ing.name)}
                type="button"
                className={`p-4 rounded-2xl border-3 flex items-center justify-between text-left transition cursor-pointer active:scale-98 ${
                  isChecked
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-600 text-emerald-950 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{ing.emoji}</span>
                  <div>
                    <span className="text-lg font-black block">{ing.name}</span>
                    <span className="text-sm font-bold opacity-80">{ing.amount}</span>
                  </div>
                </div>

                <div className="shrink-0 ml-3">
                  {isChecked ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 fill-emerald-100" />
                  ) : (
                    <Circle className="w-8 h-8 text-slate-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Checklist */}
      <div
        className={`p-6 rounded-3xl border-4 shadow-xl ${
          isHighContrastDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        <h2 className="text-2xl font-black flex items-center gap-2 mb-2">
          <span>🥄</span>
          <span>Kitchen Tools Needed</span>
        </h2>
        <p className="text-sm opacity-80 font-bold mb-4">
          Tap each tool when it is clean and ready on your kitchen table
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recipe.tools.map((tool) => {
            const isChecked = !!checkedTools[tool.id];
            return (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id, tool.name)}
                type="button"
                className={`p-4 rounded-2xl border-3 flex items-center justify-between text-left transition cursor-pointer active:scale-98 ${
                  isChecked
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-600 text-emerald-950 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{tool.emoji}</span>
                  <span className="text-lg font-black">{tool.name}</span>
                </div>

                <div className="shrink-0 ml-3">
                  {isChecked ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 fill-emerald-100" />
                  ) : (
                    <Circle className="w-8 h-8 text-slate-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* GIANT START BUTTON */}
      <div className="p-4 bg-slate-900 rounded-3xl border-4 border-emerald-400 shadow-2xl flex flex-col items-center justify-center text-center">
        <p className="text-amber-300 font-bold text-base mb-2">
          {allIngredientsChecked && allToolsChecked
            ? '🎉 Great job! Everything is checked and ready.'
            : 'You can begin whenever you feel ready!'}
        </p>

        <button
          onClick={handleBegin}
          type="button"
          className="w-full py-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-2xl sm:text-3xl shadow-2xl border-4 border-white active:scale-98 transition cursor-pointer flex items-center justify-center gap-3"
        >
          <Sparkles className="w-8 h-8" />
          <span>I'M READY! START STEP 1 ➔</span>
        </button>
      </div>
    </div>
  );
};
