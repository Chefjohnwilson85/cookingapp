import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface StepVisualizerProps {
  clipType?: 'butter' | 'flip' | 'stir' | 'boil' | 'pour' | 'slice' | 'microwave' | 'blend';
  actionEmoji: string;
  stepTitle: string;
  isHighContrastDark?: boolean;
}

export const StepVisualizer: React.FC<StepVisualizerProps> = ({
  clipType = 'stir',
  actionEmoji,
  stepTitle,
  isHighContrastDark = false
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSlowMo, setIsSlowMo] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleSlowMo = () => setIsSlowMo(!isSlowMo);

  return (
    <div
      className={`relative w-full rounded-2xl border-4 overflow-hidden shadow-lg transition-all ${
        isHighContrastDark
          ? 'bg-black border-yellow-400 text-yellow-300'
          : 'bg-slate-900 border-slate-900 text-white'
      }`}
    >
      {/* Visual Canvas Area */}
      <div className="relative h-56 sm:h-64 flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
        {/* Background glow & kitchen setting */}
        <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-amber-500/30 blur-3xl animate-pulse" />
        </div>

        {/* Dynamic Illustrated Accessible Action Scene */}
        <div className={`relative flex flex-col items-center justify-center p-4 transition-transform ${isSlowMo ? 'duration-1000' : 'duration-500'}`}>
          {clipType === 'butter' && (
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-32 bg-amber-100 border-4 border-amber-800 rounded-xl shadow-inner flex items-center justify-center overflow-hidden">
                <span className="text-5xl">🍞</span>
                {/* Butter spreading motion */}
                <div
                  className={`absolute w-12 h-8 bg-yellow-300 border-2 border-yellow-500 rounded-md shadow-md ${
                    isPlaying ? (isSlowMo ? 'animate-bounce duration-1000' : 'animate-bounce') : ''
                  }`}
                  style={{ top: '35%', left: '35%' }}
                >
                  <span className="text-xs font-bold text-amber-900 flex justify-center items-center h-full">
                    🧈
                  </span>
                </div>
              </div>
              <div className="mt-3 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Spread butter softly on bread</span>
              </div>
            </div>
          )}

          {clipType === 'flip' && (
            <div className="flex flex-col items-center">
              <div className="relative w-44 h-32 flex items-center justify-center">
                {/* Spatula */}
                <div className="absolute -left-6 bottom-2 text-4xl transform -rotate-12">
                  🥄
                </div>
                {/* Sandwich flipping */}
                <div
                  className={`w-28 h-20 bg-amber-200 border-4 border-amber-700 rounded-xl flex items-center justify-center shadow-2xl transition-all ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: isSlowMo ? '4s' : '2s' }}
                >
                  <span className="text-3xl">🥪</span>
                </div>
              </div>
              <div className="mt-3 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Flip over to cook other side</span>
              </div>
            </div>
          )}

          {clipType === 'stir' && (
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36 rounded-full border-4 border-slate-300 bg-amber-50 shadow-inner flex items-center justify-center overflow-hidden">
                <div
                  className={`w-24 h-24 rounded-full border-4 border-dashed border-amber-400 flex items-center justify-center ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: isSlowMo ? '4s' : '1.8s' }}
                >
                  <span className="text-4xl transform -rotate-45">🥄</span>
                </div>
              </div>
              <div className="mt-3 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Stir gently in a circle</span>
              </div>
            </div>
          )}

          {clipType === 'boil' && (
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-28 bg-slate-700 border-4 border-slate-400 rounded-b-3xl shadow-xl flex items-center justify-center overflow-hidden">
                {/* Boiling bubbles */}
                <div className="absolute inset-0 bg-blue-500/40 flex items-center justify-around px-4">
                  <div className={`w-4 h-4 rounded-full bg-white/70 ${isPlaying ? 'animate-ping' : ''}`} />
                  <div className={`w-6 h-6 rounded-full bg-white/60 ${isPlaying ? 'animate-bounce' : ''}`} />
                  <div className={`w-5 h-5 rounded-full bg-white/80 ${isPlaying ? 'animate-ping' : ''}`} />
                </div>
                <span className="text-4xl relative z-10">🍝</span>
              </div>
              {/* Rising steam */}
              <div className="flex gap-4 -mt-32 mb-16 text-2xl text-slate-300 animate-pulse">
                <span>♨️</span>
                <span>♨️</span>
                <span>♨️</span>
              </div>
              <div className="mt-1 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Bubbling boiling water</span>
              </div>
            </div>
          )}

          {clipType === 'pour' && (
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-32 flex items-center justify-center">
                <div className={`text-5xl transform -rotate-45 ${isPlaying ? 'animate-bounce' : ''}`}>
                  🥛
                </div>
                <div className="text-4xl ml-4 mt-6">
                  🥣
                </div>
              </div>
              <div className="mt-3 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Pour slowly into bowl</span>
              </div>
            </div>
          )}

          {clipType === 'slice' && (
            <div className="flex flex-col items-center">
              <div className="relative w-44 h-28 flex items-center justify-center gap-1">
                <div className="text-5xl">🍌</div>
                <div className={`text-4xl transform rotate-45 ${isPlaying ? 'animate-bounce' : ''}`}>
                  🍴
                </div>
              </div>
              <div className="mt-3 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Slice into small bite pieces</span>
              </div>
            </div>
          )}

          {clipType === 'microwave' && (
            <div className="flex flex-col items-center">
              <div className="relative w-44 h-28 bg-slate-800 border-4 border-slate-300 rounded-xl shadow-xl flex items-center justify-between p-2">
                {/* Inside light window */}
                <div className="w-28 h-20 bg-yellow-200/90 rounded-lg border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                  <div className={`text-3xl ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: isSlowMo ? '6s' : '3s' }}>
                    🥣
                  </div>
                </div>
                {/* Dial / Keypad */}
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="w-8 h-4 bg-emerald-400 text-[10px] font-mono font-bold text-black flex items-center justify-center rounded">
                    01:30
                  </div>
                  <div className="w-5 h-5 rounded-full bg-red-500 animate-pulse" />
                </div>
              </div>
              <div className="mt-3 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Microwave warms food safely</span>
              </div>
            </div>
          )}

          {clipType === 'blend' && (
            <div className="flex flex-col items-center">
              <div className="relative w-28 h-32 bg-slate-800 border-4 border-slate-300 rounded-t-2xl shadow-xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-pink-500/40" />
                <div className={`text-4xl ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: isSlowMo ? '2s' : '0.6s' }}>
                  🍓
                </div>
              </div>
              <div className="w-32 h-6 bg-slate-600 rounded-b-lg border-4 border-t-0 border-slate-300" />
              <div className="mt-3 text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>Hold lid tight while blending</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visual Video Controls Bar (High-Contrast, Large Buttons) */}
      <div className="p-3 bg-slate-900 border-t-2 border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm tracking-wide shadow-md active:scale-95 transition cursor-pointer"
            aria-label={isPlaying ? 'Pause animation demonstration' : 'Play animation demonstration'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5 fill-slate-950" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-slate-950" />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={toggleSlowMo}
            type="button"
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-black text-sm tracking-wide shadow-md active:scale-95 transition cursor-pointer ${
              isSlowMo
                ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
            aria-label="Toggle slow motion video"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isSlowMo ? 'SLOW-MO: ON' : 'SLOW-MO (0.7x)'}</span>
          </button>
        </div>

        <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
          <span className="text-xl">{actionEmoji}</span>
          <span className="truncate max-w-[200px]">{stepTitle}</span>
        </div>
      </div>
    </div>
  );
};
