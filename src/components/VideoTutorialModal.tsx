import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, X, CheckCircle, Clock } from 'lucide-react';
import { Recipe } from '../types';
import { speak, stopSpeaking } from '../utils/audio';

interface VideoTutorialModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  voiceSpeed: number;
  isHighContrastDark?: boolean;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  recipe,
  isOpen,
  onClose,
  voiceSpeed,
  isHighContrastDark = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlowMo, setIsSlowMo] = useState(false);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setCurrentCaptionIndex(0);
      setVideoError(false);
    } else {
      stopSpeaking();
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(true);
      });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleSpeed = () => {
    if (!videoRef.current) return;
    const newSlowMo = !isSlowMo;
    setIsSlowMo(newSlowMo);
    videoRef.current.playbackRate = newSlowMo ? 0.7 : 1.0;
  };

  const restartVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    setCurrentCaptionIndex(0);
  };

  const handleReadCaption = (text: string) => {
    speak(text, voiceSpeed);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className={`w-full max-w-4xl rounded-3xl border-4 shadow-2xl overflow-hidden flex flex-col my-auto transition-all ${
          isHighContrastDark
            ? 'bg-black border-yellow-400 text-yellow-300'
            : 'bg-slate-900 border-yellow-400 text-white'
        }`}
      >
        {/* Header with big title and giant Close button */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b-4 border-yellow-400 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{recipe.emoji}</span>
            <div>
              <span className="text-xs uppercase font-black tracking-widest text-amber-400 block">
                VIDEO LESSON
              </span>
              <h2 id="video-modal-title" className="text-xl sm:text-2xl font-black text-white">
                {recipe.videoTutorialTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-base sm:text-lg shadow-lg active:scale-95 transition cursor-pointer shrink-0 border-2 border-white"
            aria-label="Close video tutorial"
          >
            <X className="w-6 h-6 stroke-[3]" />
            <span>CLOSE</span>
          </button>
        </div>

        {/* Video Screen Area */}
        <div className="relative bg-black aspect-video w-full flex items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              ref={videoRef}
              src={recipe.videoTutorialUrl}
              playsInline
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setVideoError(true)}
              onTimeUpdate={() => {
                if (videoRef.current && recipe.videoCaptions.length > 0) {
                  const duration = videoRef.current.duration || 60;
                  const cur = videoRef.current.currentTime;
                  const idx = Math.min(
                    Math.floor((cur / duration) * recipe.videoCaptions.length),
                    recipe.videoCaptions.length - 1
                  );
                  setCurrentCaptionIndex(idx);
                }
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-white">
              <span className="text-6xl mb-4">📺</span>
              <p className="text-xl font-bold text-yellow-300">
                Visual Tutorial Ready Below
              </p>
              <p className="text-slate-300 text-base max-w-md mt-2">
                Use our interactive Step Demonstrator below with full audio narration!
              </p>
            </div>
          )}

          {/* Big Center Play Overlay Button if paused */}
          {!isPlaying && !videoError && (
            <button
              onClick={togglePlay}
              type="button"
              className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-amber-400/95 hover:bg-amber-300 text-slate-950 flex items-center justify-center shadow-2xl transition transform hover:scale-105 active:scale-95 border-4 border-black cursor-pointer"
              aria-label="Play video tutorial"
            >
              <Play className="w-12 h-12 sm:w-14 sm:h-14 fill-slate-950 ml-1" />
            </button>
          )}

          {/* On-screen High-Contrast Subtitle Banner */}
          {recipe.videoCaptions.length > 0 && (
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-black/90 border-2 border-yellow-400 rounded-xl p-3 sm:p-4 text-center shadow-2xl">
              <div className="flex items-center justify-center gap-3">
                <p className="text-lg sm:text-2xl font-black text-yellow-300 tracking-wide">
                  {recipe.videoCaptions[currentCaptionIndex]}
                </p>
                <button
                  onClick={() => handleReadCaption(recipe.videoCaptions[currentCaptionIndex])}
                  type="button"
                  className="p-2 rounded-lg bg-yellow-400 text-slate-950 font-bold hover:bg-yellow-300 active:scale-95 shrink-0"
                  title="Read subtitle aloud"
                >
                  <Volume2 className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Big Easy Control Buttons */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t-4 border-yellow-400 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Play/Pause giant button */}
            <button
              onClick={togglePlay}
              type="button"
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg sm:text-xl shadow-lg active:scale-95 transition cursor-pointer border-2 border-white"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-7 h-7 fill-slate-950" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-7 h-7 fill-slate-950" />
                  <span>PLAY VIDEO</span>
                </>
              )}
            </button>

            {/* Restart button */}
            <button
              onClick={restartVideo}
              type="button"
              className="flex items-center gap-2 px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-base sm:text-lg border-2 border-slate-600 shadow-md active:scale-95 transition cursor-pointer"
            >
              <RotateCcw className="w-6 h-6" />
              <span>REPLAY</span>
            </button>

            {/* Slow Motion button */}
            <button
              onClick={toggleSpeed}
              type="button"
              className={`flex items-center gap-2 px-5 py-4 rounded-2xl font-black text-base sm:text-lg border-2 shadow-md active:scale-95 transition cursor-pointer ${
                isSlowMo
                  ? 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-600'
              }`}
            >
              <Clock className="w-6 h-6" />
              <span>{isSlowMo ? 'SLOW-MO (0.7x): ON' : 'SLOW-MO (0.7x)'}</span>
            </button>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-amber-300 block">
              Watch as many times as you like!
            </span>
          </div>
        </div>

        {/* Step-by-Step Video Guide Jumper */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t-2 border-slate-800">
          <h3 className="text-base sm:text-lg font-black text-yellow-300 mb-3 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Recipe Steps Overview (Tap to read)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
            {recipe.steps.map((step, idx) => (
              <button
                key={step.stepNumber}
                onClick={() => {
                  if (videoRef.current && recipe.videoCaptions.length > 0) {
                    const duration = videoRef.current.duration || 60;
                    videoRef.current.currentTime = (idx / recipe.steps.length) * duration;
                    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                  }
                  handleReadCaption(`Step ${step.stepNumber}: ${step.title}. ${step.instruction}`);
                }}
                type="button"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 text-left transition cursor-pointer active:scale-98"
              >
                <span className="w-8 h-8 rounded-full bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-sm shrink-0">
                  {step.stepNumber}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{step.title}</p>
                  <p className="text-slate-300 text-xs truncate">{step.instruction}</p>
                </div>
                <span className="text-xl shrink-0">{step.actionEmoji}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
