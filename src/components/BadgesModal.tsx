import React from 'react';
import { X, Award, Sparkles } from 'lucide-react';
import { EarnedBadge } from '../types';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: EarnedBadge[];
  isHighContrastDark?: boolean;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  badges,
  isHighContrastDark = false
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="badges-title"
    >
      <div
        className={`w-full max-w-xl rounded-3xl border-4 shadow-2xl overflow-hidden my-auto transition-all ${
          isHighContrastDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-6 border-b-4 flex items-center justify-between gap-4 ${
            isHighContrastDark
              ? 'bg-slate-950 border-yellow-400 text-yellow-300'
              : 'bg-amber-100 border-slate-900 text-slate-950'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-4xl">🏆</span>
            <div>
              <h2 id="badges-title" className="text-2xl font-black">
                My Chef Trophies
              </h2>
              <p className="text-sm font-bold opacity-80">
                {badges.length} recipe{badges.length === 1 ? '' : 's'} mastered!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-base border-2 border-black active:scale-95 transition cursor-pointer"
            aria-label="Close trophies"
          >
            <X className="w-5 h-5 stroke-[3]" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Badges List */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {badges.length === 0 ? (
            <div className="text-center py-12 px-4">
              <span className="text-6xl block mb-3">👨‍🍳</span>
              <p className="text-xl font-black">No Chef Badges Yet!</p>
              <p className="text-base opacity-75 mt-1 max-w-xs mx-auto">
                Pick any delicious recipe and finish all steps to earn your first golden badge!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-2xl border-4 border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-black dark:text-yellow-200 flex items-center gap-3 shadow-md"
                >
                  <span className="text-4xl">{b.badgeEmoji}</span>
                  <div>
                    <div className="flex items-center gap-1 text-xs uppercase font-black text-amber-800 dark:text-amber-400">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Certified Chef</span>
                    </div>
                    <h3 className="font-black text-lg leading-tight mt-0.5">{b.recipeTitle}</h3>
                    <p className="text-xs opacity-75 mt-1">{b.dateEarned}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`p-4 sm:p-6 border-t-4 flex justify-center ${
            isHighContrastDark
              ? 'bg-slate-950 border-yellow-400'
              : 'bg-slate-100 border-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-black text-lg shadow-md border-2 border-black active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <Award className="w-6 h-6" />
            <span>KEEP COOKING</span>
          </button>
        </div>
      </div>
    </div>
  );
};
