import React, { useEffect } from 'react';
import { ShieldAlert, Phone, CheckCircle, X, Volume2 } from 'lucide-react';
import { speak, stopSpeaking } from '../utils/audio';

interface EmergencyHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  caregiverName: string;
  caregiverPhone: string;
  voiceSpeed: number;
  isHighContrastDark?: boolean;
}

export const EmergencyHelpModal: React.FC<EmergencyHelpModalProps> = ({
  isOpen,
  onClose,
  caregiverName,
  caregiverPhone,
  voiceSpeed,
  isHighContrastDark = false
}) => {
  useEffect(() => {
    if (isOpen) {
      speak(
        'Take a deep breath. You are safe. If your stove or microwave is on, turn it off. It is always okay to ask your helper for assistance.',
        voiceSpeed
      );
    } else {
      stopSpeaking();
    }
  }, [isOpen, voiceSpeed]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-modal-title"
    >
      <div
        className={`w-full max-w-xl rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden my-auto transition-all ${
          isHighContrastDark
            ? 'bg-black text-yellow-300'
            : 'bg-slate-950 text-white'
        }`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-amber-500 text-slate-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-10 h-10 stroke-[2.5]" />
            <div>
              <h2 id="emergency-modal-title" className="text-2xl sm:text-3xl font-black">
                Kitchen Helper & Safety
              </h2>
              <p className="text-sm font-bold text-slate-900">
                Take your time. You are safe!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-black text-base shadow active:scale-95 transition cursor-pointer"
            aria-label="I'm okay, close help"
          >
            <X className="w-6 h-6" />
            <span>I'M OKAY</span>
          </button>
        </div>

        {/* Calm message banner */}
        <div className="p-4 sm:p-6 bg-slate-900 border-b-2 border-slate-800">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💙</span>
            <div>
              <h3 className="text-xl font-black text-yellow-300">
                Don't worry. Stop and take a breath.
              </h3>
              <p className="text-slate-200 text-base mt-1">
                If anything feels too hot, confusing, or scary, follow these three simple steps:
              </p>
            </div>
          </div>
        </div>

        {/* 3 Step Safety Guide */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border-2 border-red-500">
            <div className="w-12 h-12 rounded-full bg-red-600 text-white font-black text-xl flex items-center justify-center shrink-0 border-2 border-white">
              1
            </div>
            <div>
              <p className="text-lg font-black text-white">TURN OFF THE STOVE OR MICROWAVE</p>
              <p className="text-slate-300 text-sm">Turn knobs all the way to OFF or press CANCEL.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border-2 border-amber-500">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-black font-black text-xl flex items-center justify-center shrink-0 border-2 border-black">
              2
            </div>
            <div>
              <p className="text-lg font-black text-white">STEP BACK FROM HOT SURFACES</p>
              <p className="text-slate-300 text-sm">Do not touch hot pans. Take 2 steps backwards.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border-2 border-emerald-500">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-black font-black text-xl flex items-center justify-center shrink-0 border-2 border-black">
              3
            </div>
            <div>
              <p className="text-lg font-black text-white">ASK YOUR HELPER OR CAREGIVER</p>
              <p className="text-slate-300 text-sm">Show them your screen and ask for a helping hand.</p>
            </div>
          </div>

          {/* Caregiver call button */}
          <div className="pt-2">
            <a
              href={caregiverPhone ? `tel:${caregiverPhone}` : '#'}
              onClick={(e) => {
                if (!caregiverPhone) {
                  e.preventDefault();
                  speak(
                    `Please call your helper: ${caregiverName || 'Parent or Caregiver'}.`,
                    voiceSpeed
                  );
                }
              }}
              className="w-full py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xl sm:text-2xl shadow-xl flex items-center justify-center gap-3 border-4 border-white active:scale-95 transition cursor-pointer text-center"
            >
              <Phone className="w-7 h-7 fill-slate-950" />
              <span>CALL {caregiverName ? caregiverName.toUpperCase() : 'CAREGIVER / HELPER'}</span>
            </a>
            {caregiverPhone && (
              <p className="text-center text-sm font-bold text-slate-400 mt-2">
                Phone: {caregiverPhone}
              </p>
            )}
          </div>
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t-2 border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() =>
              speak(
                'Take a deep breath. Turn off the stove. Step back from the hot counter. Call your helper if you need assistance.',
                voiceSpeed
              )
            }
            type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base cursor-pointer active:scale-95"
          >
            <Volume2 className="w-5 h-5 stroke-[2.5]" />
            <span>READ INSTRUCTIONS</span>
          </button>

          <button
            onClick={onClose}
            type="button"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-base border-2 border-slate-600 cursor-pointer active:scale-95"
          >
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>RESUME COOKING</span>
          </button>
        </div>
      </div>
    </div>
  );
};
