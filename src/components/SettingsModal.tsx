import React from 'react';
import { X, Volume2, Eye, Type, UserCheck } from 'lucide-react';
import { AccessibilitySettings, ColorTheme, TextSize } from '../types';
import { speak } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const handleTestVoice = (speed: number) => {
    speak('Hello Chef! This is how the voice guidance will sound.', speed);
  };

  const isDark = settings.theme === 'yellow-black';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
    >
      <div
        className={`w-full max-w-xl rounded-3xl border-4 shadow-2xl overflow-hidden my-auto transition-all ${
          isDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-white border-slate-900 text-slate-950'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-6 border-b-4 flex items-center justify-between gap-4 ${
            isDark
              ? 'bg-slate-950 border-yellow-400 text-yellow-300'
              : 'bg-slate-100 border-slate-900 text-slate-950'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            <div>
              <h2 id="settings-title" className="text-2xl font-black">
                Accessibility & Voice
              </h2>
              <p className="text-sm font-bold opacity-80">
                Customize colors, text size, and speech
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-base border-2 border-black active:scale-95 transition cursor-pointer"
            aria-label="Close settings"
          >
            <X className="w-5 h-5 stroke-[3]" />
            <span>SAVE & CLOSE</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Contrast Mode */}
          <div>
            <label className="text-base font-black flex items-center gap-2 mb-3 uppercase tracking-wide">
              <Eye className="w-5 h-5" />
              <span>Color & High Contrast Theme</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'high-contrast-light' as ColorTheme,
                  title: 'Clean Light',
                  desc: 'Crisp white & dark bold text',
                  bg: 'bg-white text-black border-slate-900',
                },
                {
                  id: 'yellow-black' as ColorTheme,
                  title: 'Yellow on Black',
                  desc: 'Maximum low-vision contrast',
                  bg: 'bg-black text-yellow-300 border-yellow-400',
                },
                {
                  id: 'soft-calm' as ColorTheme,
                  title: 'Soft & Calm',
                  desc: 'Warm cream & gentle tones',
                  bg: 'bg-amber-50 text-stone-900 border-amber-300',
                },
              ].map((themeOpt) => (
                <button
                  key={themeOpt.id}
                  onClick={() => onUpdateSettings({ theme: themeOpt.id })}
                  type="button"
                  className={`p-4 rounded-2xl border-4 text-left transition flex flex-col justify-between cursor-pointer active:scale-95 ${
                    themeOpt.bg
                  } ${
                    settings.theme === themeOpt.id
                      ? 'ring-4 ring-emerald-500 ring-offset-2 font-black shadow-lg'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <span className="text-base font-black">{themeOpt.title}</span>
                  <span className="text-xs font-semibold mt-1 opacity-90">
                    {themeOpt.desc}
                  </span>
                  {settings.theme === themeOpt.id && (
                    <span className="mt-2 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">
                      ✓ Active
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Text Size */}
          <div>
            <label className="text-base font-black flex items-center gap-2 mb-3 uppercase tracking-wide">
              <Type className="w-5 h-5" />
              <span>Text Size</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onUpdateSettings({ textSize: 'large' })}
                type="button"
                className={`py-4 px-5 rounded-2xl border-4 text-center font-black transition cursor-pointer active:scale-95 ${
                  settings.textSize === 'large'
                    ? 'bg-amber-400 text-black border-black shadow-md ring-4 ring-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300'
                }`}
              >
                <span className="text-xl block">Large (Default)</span>
                <span className="text-xs opacity-75">Clear & comfortable</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ textSize: 'extra-large' })}
                type="button"
                className={`py-4 px-5 rounded-2xl border-4 text-center font-black transition cursor-pointer active:scale-95 ${
                  settings.textSize === 'extra-large'
                    ? 'bg-amber-400 text-black border-black shadow-md ring-4 ring-amber-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300'
                }`}
              >
                <span className="text-2xl block">Giant (Extra Big)</span>
                <span className="text-xs opacity-75">Maximum size</span>
              </button>
            </div>
          </div>

          {/* Voice Guidance Settings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-base font-black flex items-center gap-2 uppercase tracking-wide">
                <Volume2 className="w-5 h-5" />
                <span>Voice Guidance Speed</span>
              </label>
              <button
                onClick={() => handleTestVoice(settings.voiceSpeed)}
                type="button"
                className="px-3 py-1.5 rounded-lg bg-yellow-400 text-black font-bold text-xs hover:bg-yellow-300 active:scale-95 cursor-pointer border border-black"
              >
                🔊 Test Voice
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onUpdateSettings({ voiceSpeed: 0.75 });
                  handleTestVoice(0.75);
                }}
                type="button"
                className={`p-4 rounded-2xl border-4 text-left font-black transition cursor-pointer active:scale-95 ${
                  settings.voiceSpeed < 0.9
                    ? 'bg-emerald-400 text-black border-black shadow-md ring-4 ring-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300'
                }`}
              >
                <span className="text-lg block">🐢 Slow & Clear</span>
                <span className="text-xs opacity-80">0.75x (Best for listening)</span>
              </button>

              <button
                onClick={() => {
                  onUpdateSettings({ voiceSpeed: 1.0 });
                  handleTestVoice(1.0);
                }}
                type="button"
                className={`p-4 rounded-2xl border-4 text-left font-black transition cursor-pointer active:scale-95 ${
                  settings.voiceSpeed >= 0.9
                    ? 'bg-emerald-400 text-black border-black shadow-md ring-4 ring-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300'
                }`}
              >
                <span className="text-lg block">🐇 Normal Speed</span>
                <span className="text-xs opacity-80">1.0x (Regular speech)</span>
              </button>
            </div>

            {/* Auto Read Steps Toggle */}
            <div className="mt-4 p-4 rounded-2xl border-2 border-slate-300 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="font-black text-base">Automatically read each new step</p>
                <p className="text-xs opacity-75">Speaks instructions immediately when you tap Next</p>
              </div>
              <button
                onClick={() => onUpdateSettings({ autoReadSteps: !settings.autoReadSteps })}
                type="button"
                className={`w-16 h-9 rounded-full transition-colors flex items-center p-1 border-2 border-black cursor-pointer ${
                  settings.autoReadSteps ? 'bg-emerald-500 justify-end' : 'bg-slate-400 justify-start'
                }`}
                aria-label="Toggle auto-read steps"
              >
                <div className="w-6 h-6 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>

          {/* Caregiver Emergency Contact */}
          <div className="p-4 rounded-2xl border-2 border-amber-400 bg-amber-50/50 dark:bg-amber-950/20">
            <label className="text-base font-black flex items-center gap-2 mb-2 uppercase tracking-wide text-amber-900 dark:text-amber-300">
              <UserCheck className="w-5 h-5" />
              <span>Helper / Caregiver Contact</span>
            </label>
            <p className="text-xs opacity-80 mb-3">
              This person can be called with 1 tap from the "Need Help?" button.
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold block mb-1">Caregiver Name</span>
                <input
                  type="text"
                  value={settings.caregiverName}
                  onChange={(e) => onUpdateSettings({ caregiverName: e.target.value })}
                  placeholder="e.g., Mom, Dad, Coach Alex"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-400 bg-white text-black font-bold text-base focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <span className="text-xs font-bold block mb-1">Phone Number (Optional)</span>
                <input
                  type="tel"
                  value={settings.caregiverPhone}
                  onChange={(e) => onUpdateSettings({ caregiverPhone: e.target.value })}
                  placeholder="e.g., 555-123-4567"
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-400 bg-white text-black font-bold text-base focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 sm:p-6 border-t-4 flex justify-end ${
            isDark
              ? 'bg-slate-950 border-yellow-400'
              : 'bg-slate-100 border-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl shadow-lg border-2 border-black active:scale-95 transition cursor-pointer"
          >
            ✓ DONE
          </button>
        </div>
      </div>
    </div>
  );
};
