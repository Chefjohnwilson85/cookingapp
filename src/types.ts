export type HeatLevel = 'no-heat' | 'microwave' | 'stovetop';

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  emoji: string;
  image?: string;
  note?: string;
}

export interface KitchenTool {
  id: string;
  name: string;
  emoji: string;
  image?: string;
}

export interface CookingStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
  timerSeconds?: number;
  timerLabel?: string;
  safetyWarning?: string;
  safetyType?: 'hot-surface' | 'sharp-knife' | 'boiling-water' | 'blender-blade' | 'microwave-hot';
  actionEmoji: string;
  videoUrl?: string; // HTML5 video or accessible preview clip
  videoPoster?: string;
  videoClipType?: 'butter' | 'flip' | 'stir' | 'boil' | 'pour' | 'slice' | 'microwave' | 'blend';
}

export interface Recipe {
  id: string;
  title: string;
  shortDescription: string;
  emoji: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  heatLevel: HeatLevel;
  heatLabel: string;
  category: 'Breakfast' | 'Lunch & Dinner' | 'Snacks & Treats' | 'No-Cook';
  videoTutorialUrl: string;
  videoTutorialTitle: string;
  videoCaptions: string[];
  safetyRules: string[];
  ingredients: Ingredient[];
  tools: KitchenTool[];
  steps: CookingStep[];
}

export type ColorTheme = 'high-contrast-light' | 'yellow-black' | 'soft-calm';
export type TextSize = 'normal' | 'large' | 'extra-large';

export interface AccessibilitySettings {
  theme: ColorTheme;
  textSize: TextSize;
  voiceSpeed: number; // 0.75 (slow) to 1.0 (normal)
  autoReadSteps: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
  caregiverName: string;
  caregiverPhone: string;
}

export interface EarnedBadge {
  id: string;
  recipeId: string;
  recipeTitle: string;
  dateEarned: string;
  badgeEmoji: string;
  badgeTitle: string;
}
