import React from 'react';
import { Timer, LifeBuoy, Award, Settings, Volume2, VolumeX, Eye } from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { stopSpeaking } from '../utils/audio';

interface HeaderProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  onOpenTimer: () => void;
  onOpenHelp: () => void;
  onOpenBadges: () => void;
  onOpenSettings: () => void;
  badgeCount: number;
  onGoHome?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  onUpdateSettings,
  onOpenTimer,
  onOpenHelp,
  onOpenBadges,
  onOpenSettings,
  badgeCount,
  onGoHome
}) => {
  const isDark = settings.theme === 'yellow-black';

  const toggleSound = () => {
    if (settings.soundEffects) {
      stopSpeaking();
    }
    onUpdateSettings({ soundEffects: !settings.soundEffects });
  };

  const cycleContrast = () => {
    const order = ['high-contrast-light', 'yellow-black', 'soft-calm'] as const;
    const nextIdx = (order.indexOf(settings.theme) + 1) % order.length;
    onUpdateSettings({ theme: order[nextIdx] });
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b-4 shadow-md transition-colors ${
        isDark
          ? 'bg-black border-yellow-400 text-yellow-300'
          : settings.theme === 'soft-calm'
          ? 'bg-amber-100 border-stone-800 text-stone-900'
          : 'bg-white border-slate-900 text-slate-950'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Brand / Logo */}
        <button
          onClick={onGoHome}
          type="button"
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 rounded-xl p-1"
          aria-label="CookEasy Home"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 border-3 border-black flex items-center justify-center text-3xl sm:text-4xl shadow-md group-hover:scale-105 transition">
            🍳
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none block">
              CookEasy
            </span>
            <span className="text-xs sm:text-sm font-bold opacity-80 block tracking-wide">
              Step-by-Step Cooking
            </span>
          </div>
        </button>

        {/* Action Controls - Large, High Contrast Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Quick Contrast Cycle Button */}
          <button
            onClick={cycleContrast}
            type="button"
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition active:scale-95 cursor-pointer ${
              isDark
                ? 'bg-yellow-400 text-black border-yellow-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border-slate-900'
            }`}
            title="Switch color contrast mode"
            aria-label="Switch color contrast theme"
          >
            <Eye className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden md:inline">Contrast</span>
          </button>

          {/* Voice Sound Toggle */}
          <button
            onClick={toggleSound}
            type="button"
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm border-2 transition active:scale-95 cursor-pointer ${
              settings.soundEffects
                ? 'bg-emerald-500 text-black border-slate-950 font-black'
                : 'bg-red-200 text-red-950 border-red-800'
            }`}
            title={settings.soundEffects ? 'Sound is ON' : 'Sound is MUTED'}
            aria-label={settings.soundEffects ? 'Mute voice and sounds' : 'Enable voice and sounds'}
          >
            {settings.soundEffects ? (
              <>
                <Volume2 className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Voice ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">Muted</span>
              </>
            )}
          </button>

          {/* Quick Timer Button */}
          <button
            onClick={onOpenTimer}
            type="button"
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm border-2 border-slate-950 shadow-md active:scale-95 transition cursor-pointer"
            aria-label="Open Kitchen Timer"
          >
            <Timer className="w-5 h-5 stroke-[2.5]" />
            <span>TIMER</span>
          </button>

          {/* Trophies Button */}
          <button
            onClick={onOpenBadges}
            type="button"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm border-2 border-slate-950 shadow-md active:scale-95 transition cursor-pointer"
            aria-label="View Chef Badges"
          >
            <Award className="w-5 h-5 stroke-[2.5]" />
            <span className="hidden sm:inline">BADGES</span>
            {badgeCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-white text-[11px] font-black">
                {badgeCount}
              </span>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            type="button"
            className="p-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-yellow-300 border-2 border-slate-900 dark:border-yellow-400 shadow-md active:scale-95 transition cursor-pointer"
            aria-label="Open Settings"
          >
            <Settings className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* EMERGENCY NEED HELP BUTTON - Always noticeable! */}
          <button
            onClick={onOpenHelp}
            type="button"
            className="flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-base border-3 border-yellow-300 shadow-lg active:scale-95 transition cursor-pointer animate-pulse"
            aria-label="Need Help? Open Safety Assistant"
          >
            <LifeBuoy className="w-5 h-5 stroke-[3]" />
            <span>NEED HELP?</span>
          </button>
        </div>
      </div>
    </header>
  );
};
