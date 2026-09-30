import React from 'react';
import { Play, Flame, Sparkles, ChefHat, Clock, Volume2 } from 'lucide-react';
import { Recipe } from '../types';
import { speak } from '../utils/audio';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (recipe: Recipe) => void;
  onWatchVideo: (recipe: Recipe) => void;
  voiceSpeed: number;
  isHighContrastDark?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectRecipe,
  onWatchVideo,
  voiceSpeed,
  isHighContrastDark = false
}) => {
  const handleReadCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${recipe.title}. ${recipe.shortDescription}. Takes about ${recipe.totalTimeMinutes} minutes. ${recipe.steps.length} simple steps.`;
    speak(text, voiceSpeed);
  };

  const getHeatBadge = () => {
    switch (recipe.heatLevel) {
      case 'no-heat':
        return {
          label: 'Safe: No Heat',
          bg: 'bg-emerald-500 text-black border-emerald-700',
          icon: '🟢',
        };
      case 'microwave':
        return {
          label: 'Microwave Safe',
          bg: 'bg-amber-400 text-black border-amber-600',
          icon: '🟡',
        };
      case 'stovetop':
        return {
          label: 'Stovetop Warm Pan',
          bg: 'bg-orange-500 text-white border-orange-700',
          icon: '🟠',
        };
    }
  };

  const heat = getHeatBadge();

  return (
    <div
      className={`rounded-3xl border-4 overflow-hidden shadow-lg transition-transform hover:-translate-y-1 flex flex-col justify-between ${
        isHighContrastDark
          ? 'bg-slate-950 border-yellow-400 text-yellow-300'
          : 'bg-white border-slate-900 text-slate-950'
      }`}
    >
      <div>
        {/* Photo and Top Badges */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Emoji in floating bubble */}
          <div className="absolute top-3 left-3 w-12 h-12 rounded-2xl bg-white border-2 border-black flex items-center justify-center text-2xl shadow-md">
            {recipe.emoji}
          </div>

          {/* Heat safety tag */}
          <div
            className={`absolute top-3 right-3 px-3 py-1.5 rounded-xl font-black text-xs border-2 shadow-md flex items-center gap-1.5 ${heat.bg}`}
          >
            <span>{heat.icon}</span>
            <span>{heat.label}</span>
          </div>

          {/* Quick stats on image bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-black">
            <span className="flex items-center gap-1 bg-black/75 px-3 py-1.5 rounded-lg border border-white/40">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Takes {recipe.totalTimeMinutes} min</span>
            </span>
            <span className="flex items-center gap-1 bg-black/75 px-3 py-1.5 rounded-lg border border-white/40">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{recipe.steps.length} Steps</span>
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl sm:text-2xl font-black leading-tight">
              {recipe.title}
            </h3>

            {/* Read aloud button */}
            <button
              onClick={handleReadCard}
              type="button"
              className="p-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black shadow active:scale-95 transition cursor-pointer shrink-0"
              title="Read recipe summary aloud"
              aria-label={`Read summary of ${recipe.title}`}
            >
              <Volume2 className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          <p className="text-sm sm:text-base font-semibold opacity-90 mt-2 line-clamp-2">
            {recipe.shortDescription}
          </p>

          {/* Ingredients highlight */}
          <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-bold opacity-80">
            {recipe.ingredients.slice(0, 3).map((ing) => (
              <span
                key={ing.id}
                className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800"
              >
                {ing.emoji} {ing.name}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800">
                +{recipe.ingredients.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Big Action Buttons */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0 flex flex-col gap-2.5">
        {/* Watch Video Tutorial Button */}
        <button
          onClick={() => onWatchVideo(recipe)}
          type="button"
          className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base shadow flex items-center justify-center gap-2 border-2 border-black active:scale-98 transition cursor-pointer"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>WATCH VIDEO FIRST</span>
        </button>

        {/* Start Cooking Big Green Button */}
        <button
          onClick={() => onSelectRecipe(recipe)}
          type="button"
          className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl shadow-lg flex items-center justify-center gap-2 border-3 border-black active:scale-98 transition cursor-pointer"
        >
          <ChefHat className="w-6 h-6" />
          <span>START COOKING ➔</span>
        </button>
      </div>
    </div>
  );
};
