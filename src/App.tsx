/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChefHat, Search, Volume2, Sparkles, Filter, Play } from 'lucide-react';
import { Recipe, AccessibilitySettings, EarnedBadge, HeatLevel } from './types';
import { RECIPES } from './data/recipes';
import { Header } from './components/Header';
import { RecipeCard } from './components/RecipeCard';
import { PrepChecklist } from './components/PrepChecklist';
import { CookingMode } from './components/CookingMode';
import { CelebrationScreen } from './components/CelebrationScreen';
import { VideoTutorialModal } from './components/VideoTutorialModal';
import { QuickTimerModal } from './components/QuickTimerModal';
import { EmergencyHelpModal } from './components/EmergencyHelpModal';
import { SettingsModal } from './components/SettingsModal';
import { BadgesModal } from './components/BadgesModal';
import { speak, stopSpeaking } from './utils/audio';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  theme: 'high-contrast-light',
  textSize: 'large',
  voiceSpeed: 0.8, // slow & clear default
  autoReadSteps: true,
  soundEffects: true,
  hapticFeedback: true,
  caregiverName: 'Caregiver / Helper',
  caregiverPhone: '',
};

type ViewState = 'recipe-list' | 'prep-checklist' | 'cooking-mode' | 'celebration';

export default function App() {
  // Accessibility settings state
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('cookeasy_settings');
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Earned badges state
  const [badges, setBadges] = useState<EarnedBadge[]>(() => {
    try {
      const saved = localStorage.getItem('cookeasy_badges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation & Active state
  const [view, setView] = useState<ViewState>('recipe-list');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Modals state
  const [activeVideoRecipe, setActiveVideoRecipe] = useState<Recipe | null>(null);
  const [isQuickTimerOpen, setIsQuickTimerOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

  // Filtering on recipe list
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHeat, setSelectedHeat] = useState<'all' | HeatLevel>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Synchronize body classes with theme & text size
  useEffect(() => {
    document.body.className = `theme-${settings.theme} font-${settings.textSize}`;
    try {
      localStorage.setItem('cookeasy_settings', JSON.stringify(settings));
    } catch {
      // Ignore
    }
  }, [settings]);

  // Synchronize badges to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cookeasy_badges', JSON.stringify(badges));
    } catch {
      // Ignore
    }
  }, [badges]);

  const handleUpdateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setView('prep-checklist');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartCooking = () => {
    setView('cooking-mode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishCooking = () => {
    if (selectedRecipe) {
      // Award badge if not already awarded today
      const alreadyEarned = badges.some((b) => b.recipeId === selectedRecipe.id);
      if (!alreadyEarned) {
        const newBadge: EarnedBadge = {
          id: `badge-${Date.now()}`,
          recipeId: selectedRecipe.id,
          recipeTitle: selectedRecipe.title,
          dateEarned: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
          badgeEmoji: selectedRecipe.emoji,
          badgeTitle: `${selectedRecipe.title} Master`,
        };
        setBadges((prev) => [newBadge, ...prev]);
      }
    }
    setView('celebration');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    stopSpeaking();
    setView('recipe-list');
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadWelcome = () => {
    const text =
      'Welcome to CookEasy! Choose any recipe below. We have simple step-by-step video lessons, timers, and voice guidance to help you make delicious meals safely!';
    speak(text, settings.voiceSpeed);
  };

  // Filter recipes
  const filteredRecipes = RECIPES.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesHeat = selectedHeat === 'all' || r.heatLevel === selectedHeat;
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;

    return matchesSearch && matchesHeat && matchesCategory;
  });

  const isDark = settings.theme === 'yellow-black';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors ${
        isDark
          ? 'bg-black text-yellow-300'
          : settings.theme === 'soft-calm'
          ? 'bg-amber-50 text-stone-900'
          : 'bg-slate-100 text-slate-950'
      }`}
    >
      {/* Top Accessible Navigation */}
      <Header
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenTimer={() => setIsQuickTimerOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        badgeCount={badges.length}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {view === 'recipe-list' && (
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
            {/* Friendly High-Contrast Welcome Hero */}
            <div
              className={`p-6 sm:p-8 rounded-3xl border-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
                isDark
                  ? 'bg-slate-950 border-yellow-400 text-yellow-300'
                  : 'bg-white border-slate-900 text-slate-950'
              }`}
            >
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 rounded-xl bg-amber-400 text-black font-black text-xs uppercase border border-black">
                    EASY COOKING FOR EVERYONE
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  What would you like to cook today?
                </h1>
                <p className="text-lg sm:text-xl font-bold opacity-90 max-w-2xl">
                  Each recipe has video tutorials, built-in timers, and reads every step aloud!
                </p>
              </div>

              {/* Big Read Welcome Speech Button */}
              <button
                onClick={handleReadWelcome}
                type="button"
                className="w-full md:w-auto px-6 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg border-3 border-black shadow-lg flex items-center justify-center gap-3 active:scale-95 transition cursor-pointer shrink-0"
              >
                <Volume2 className="w-7 h-7 stroke-[3]" />
                <span>READ TO ME</span>
              </button>
            </div>

            {/* Quick 3-Step Visual Help Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-2xl border-3 flex items-center gap-3 ${
                  isDark
                    ? 'bg-slate-900 border-yellow-400'
                    : 'bg-white border-slate-900 shadow'
                }`}
              >
                <span className="w-10 h-10 rounded-full bg-blue-500 text-white font-black text-lg flex items-center justify-center shrink-0 border border-black">
                  1
                </span>
                <div>
                  <h2 className="font-black text-base">Pick a Recipe</h2>
                  <p className="text-xs font-semibold opacity-80">Choose any yummy food below</p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border-3 flex items-center gap-3 ${
                  isDark
                    ? 'bg-slate-900 border-yellow-400'
                    : 'bg-white border-slate-900 shadow'
                }`}
              >
                <span className="w-10 h-10 rounded-full bg-amber-400 text-black font-black text-lg flex items-center justify-center shrink-0 border border-black">
                  2
                </span>
                <div>
                  <h2 className="font-black text-base">Watch Video & Prep</h2>
                  <p className="text-xs font-semibold opacity-80">See how it's made and check tools</p>
                </div>
              </div>

              <div
                className={`p-4 rounded-2xl border-3 flex items-center gap-3 ${
                  isDark
                    ? 'bg-slate-900 border-yellow-400'
                    : 'bg-white border-slate-900 shadow'
                }`}
              >
                <span className="w-10 h-10 rounded-full bg-emerald-500 text-black font-black text-lg flex items-center justify-center shrink-0 border border-black">
                  3
                </span>
                <div>
                  <h2 className="font-black text-base">Cook One Step at a Time</h2>
                  <p className="text-xs font-semibold opacity-80">Big buttons, voice and timers</p>
                </div>
              </div>
            </div>

            {/* Search and Heat Safety Filter Tabs */}
            <div className="space-y-4">
              {/* Heat Safety Filter Buttons */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-wider opacity-80 flex items-center gap-1">
                  <Filter className="w-4 h-4" />
                  <span>Choose Heat Level:</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'all' as const, label: 'All Recipes', emoji: '🍽️', desc: 'All 8 meals' },
                    { id: 'no-heat' as const, label: 'Safe: No Heat', emoji: '🟢', desc: 'No stove or microwave' },
                    { id: 'microwave' as const, label: 'Microwave Safe', emoji: '🟡', desc: 'Fast & easy' },
                    { id: 'stovetop' as const, label: 'Stovetop Warm', emoji: '🟠', desc: 'With pan or pot' },
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedHeat(filter.id)}
                      type="button"
                      className={`p-3.5 rounded-2xl border-3 font-black text-left transition active:scale-95 cursor-pointer flex flex-col justify-between ${
                        selectedHeat === filter.id
                          ? 'bg-amber-400 text-black border-black shadow-lg ring-4 ring-amber-300'
                          : isDark
                          ? 'bg-slate-900 text-yellow-300 border-yellow-400/50 hover:border-yellow-400'
                          : 'bg-white text-slate-900 border-slate-300 hover:border-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{filter.emoji}</span>
                        <span className="text-sm font-black">{filter.label}</span>
                      </div>
                      <span className="text-[11px] font-semibold opacity-75 mt-1">
                        {filter.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar with large touch area */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search recipes (e.g. egg, cheese, pasta, oats, smoothie)..."
                  className={`w-full pl-13 pr-4 py-4 rounded-2xl border-3 font-bold text-base sm:text-lg transition focus:outline-none ${
                    isDark
                      ? 'bg-slate-900 border-yellow-400 text-yellow-300 placeholder-yellow-300/50 focus:border-yellow-300'
                      : 'bg-white border-slate-900 text-black placeholder-slate-500 focus:border-blue-600'
                  }`}
                  aria-label="Search recipes"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-lg bg-slate-300 text-black font-black text-xs hover:bg-slate-400"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>

            {/* Recipes Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black flex items-center gap-2">
                  <ChefHat className="w-7 h-7 text-amber-500" />
                  <span>Available Recipes ({filteredRecipes.length})</span>
                </h2>
              </div>

              {filteredRecipes.length === 0 ? (
                <div
                  className={`p-12 rounded-3xl border-4 text-center ${
                    isDark ? 'bg-slate-950 border-yellow-400' : 'bg-white border-slate-900'
                  }`}
                >
                  <span className="text-6xl block mb-3">🔍</span>
                  <h3 className="text-2xl font-black">No recipes found</h3>
                  <p className="text-base opacity-80 mt-1">
                    Try clearing your search or switching to "All Recipes"
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedHeat('all');
                      setSelectedCategory('All');
                    }}
                    type="button"
                    className="mt-4 px-6 py-3 rounded-xl bg-amber-400 text-black font-black border-2 border-black active:scale-95 cursor-pointer"
                  >
                    SHOW ALL RECIPES
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onSelectRecipe={handleSelectRecipe}
                      onWatchVideo={(r) => setActiveVideoRecipe(r)}
                      voiceSpeed={settings.voiceSpeed}
                      isHighContrastDark={isDark}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'prep-checklist' && selectedRecipe && (
          <PrepChecklist
            recipe={selectedRecipe}
            onStartCooking={handleStartCooking}
            onBack={handleGoHome}
            onWatchVideo={() => setActiveVideoRecipe(selectedRecipe)}
            voiceSpeed={settings.voiceSpeed}
            isHighContrastDark={isDark}
          />
        )}

        {view === 'cooking-mode' && selectedRecipe && (
          <CookingMode
            recipe={selectedRecipe}
            onFinish={handleFinishCooking}
            onExit={handleGoHome}
            onOpenHelp={() => setIsHelpOpen(true)}
            settings={settings}
          />
        )}

        {view === 'celebration' && selectedRecipe && (
          <CelebrationScreen
            recipe={selectedRecipe}
            onCookAgain={() => setView('cooking-mode')}
            onGoHome={handleGoHome}
            onViewBadges={() => setIsBadgesOpen(true)}
            settings={settings}
          />
        )}
      </main>

      {/* Global Accessible Modals */}
      {activeVideoRecipe && (
        <VideoTutorialModal
          recipe={activeVideoRecipe}
          isOpen={!!activeVideoRecipe}
          onClose={() => setActiveVideoRecipe(null)}
          voiceSpeed={settings.voiceSpeed}
          isHighContrastDark={isDark}
        />
      )}

      <QuickTimerModal
        isOpen={isQuickTimerOpen}
        onClose={() => setIsQuickTimerOpen(false)}
        voiceSpeed={settings.voiceSpeed}
        isHighContrastDark={isDark}
      />

      <EmergencyHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        caregiverName={settings.caregiverName}
        caregiverPhone={settings.caregiverPhone}
        voiceSpeed={settings.voiceSpeed}
        isHighContrastDark={isDark}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        badges={badges}
        isHighContrastDark={isDark}
      />
    </div>
  );
}
