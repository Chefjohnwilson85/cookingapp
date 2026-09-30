import { Recipe } from '../types';

export const RECIPES: Recipe[] = [
  {
    id: 'grilled-cheese',
    title: 'Golden Grilled Cheese',
    shortDescription: 'Crispy warm bread with melted gooey cheese inside.',
    emoji: '🥪',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 3,
    cookTimeMinutes: 6,
    totalTimeMinutes: 9,
    servings: 1,
    heatLevel: 'stovetop',
    heatLabel: 'Stovetop (Warm Pan)',
    category: 'Lunch & Dinner',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    videoTutorialTitle: 'Full Video: How to Make a Grilled Cheese Sandwich',
    videoCaptions: [
      'Welcome! First, place your bread on a clean plate.',
      'Butter one side of each bread slice.',
      'Put cheese between the unbuttered sides.',
      'Cook in the pan until golden yellow, about 3 minutes per side.',
      'Let cool for 1 minute, then enjoy!'
    ],
    safetyRules: [
      'The stove pan gets HOT. Always touch only the handle.',
      'Ask a helper or caregiver if you are unsure about turning on the stove.',
      'Always turn the stove knob completely to OFF when you are done.'
    ],
    ingredients: [
      { id: 'gc-1', name: 'Bread Slices', amount: '2 slices', emoji: '🍞', note: 'White or wheat bread' },
      { id: 'gc-2', name: 'Cheese Slices', amount: '1 or 2 slices', emoji: '🧀', note: 'Cheddar or American cheese' },
      { id: 'gc-3', name: 'Butter', amount: '1 small spoon', emoji: '🧈', note: 'Soft butter spreads easier' }
    ],
    tools: [
      { id: 'tool-pan', name: 'Frying Pan', emoji: '🍳' },
      { id: 'tool-spatula', name: 'Spatula (Turner)', emoji: '🥄' },
      { id: 'tool-plate', name: 'Clean Plate', emoji: '🍽️' },
      { id: 'tool-butter-knife', name: 'Dull Butter Knife', emoji: '🍴' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Get your bread ready',
        instruction: 'Put 2 slices of bread flat on your clean plate.',
        tip: 'Make sure your hands are washed with warm water and soap first!',
        actionEmoji: '🍞',
        videoClipType: 'butter'
      },
      {
        stepNumber: 2,
        title: 'Spread the butter',
        instruction: 'Use your butter knife to spread butter on ONE side of each bread slice.',
        tip: 'The buttered side will touch the pan and make it golden and crunchy.',
        actionEmoji: '🧈',
        videoClipType: 'butter'
      },
      {
        stepNumber: 3,
        title: 'Put cheese in the middle',
        instruction: 'Flip one slice so the dry side is up. Put your cheese on it. Put the other slice on top with butter facing UP.',
        tip: 'Both buttered sides should be on the outside now!',
        actionEmoji: '🧀',
        videoClipType: 'flip'
      },
      {
        stepNumber: 4,
        title: 'Cook the first side',
        instruction: 'Turn stove to MEDIUM heat (number 4 or 5). Put sandwich in pan. Cook for 3 minutes.',
        safetyWarning: 'CAUTION: The pan is hot! Do not touch the metal pan with your bare hands.',
        safetyType: 'hot-surface',
        timerSeconds: 180,
        timerLabel: 'Cook First Side (3 min)',
        actionEmoji: '🍳',
        videoClipType: 'stir'
      },
      {
        stepNumber: 5,
        title: 'Flip and cook other side',
        instruction: 'Slide your spatula under the sandwich and gently flip it over. Cook for 2 more minutes until cheese melts.',
        safetyWarning: 'CAUTION: Keep hands away from the warm surface. Use the spatula handle.',
        safetyType: 'hot-surface',
        timerSeconds: 120,
        timerLabel: 'Cook Other Side (2 min)',
        actionEmoji: '🥪',
        videoClipType: 'flip'
      },
      {
        stepNumber: 6,
        title: 'Turn OFF stove and serve',
        instruction: 'Turn the stove knob all the way to OFF. Slide sandwich onto your plate. Let cool for 1 minute before eating.',
        safetyWarning: 'IMPORTANT: Check that the stove burner is OFF!',
        safetyType: 'hot-surface',
        timerSeconds: 60,
        timerLabel: 'Cool Down (1 min)',
        actionEmoji: '🍽️',
        videoClipType: 'pour'
      }
    ]
  },
  {
    id: 'scrambled-eggs',
    title: 'Fluffy Scrambled Eggs',
    shortDescription: 'Soft, yummy eggs cooked quickly in a pan.',
    emoji: '🍳',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 2,
    cookTimeMinutes: 3,
    totalTimeMinutes: 5,
    servings: 1,
    heatLevel: 'stovetop',
    heatLabel: 'Stovetop (Low Heat)',
    category: 'Breakfast',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    videoTutorialTitle: 'Full Video: How to Make Easy Scrambled Eggs',
    videoCaptions: [
      'Crack 2 eggs into a bowl.',
      'Add a splash of milk or water.',
      'Whisk with a fork until the yellow and white mix together.',
      'Pour into a warm buttered pan on low heat.',
      'Gently stir with spatula until soft and fluffy.'
    ],
    safetyRules: [
      'Wash your hands after touching raw egg shells.',
      'Keep heat on LOW so the eggs do not burn.',
      'Turn OFF stove as soon as eggs are not runny.'
    ],
    ingredients: [
      { id: 'se-1', name: 'Eggs', amount: '2 eggs', emoji: '🥚', note: 'Fresh large eggs' },
      { id: 'se-2', name: 'Butter', amount: '1 small slice', emoji: '🧈', note: 'To grease the pan' },
      { id: 'se-3', name: 'Milk or Water', amount: '1 big spoon', emoji: '🥛', note: 'Makes eggs soft & fluffy' },
      { id: 'se-4', name: 'Salt & Pepper', amount: '1 pinch', emoji: '🧂', note: 'Just a tiny shake' }
    ],
    tools: [
      { id: 'tool-bowl', name: 'Small Bowl', emoji: '🥣' },
      { id: 'tool-fork', name: 'Fork', emoji: '🍴' },
      { id: 'tool-pan-2', name: 'Non-stick Pan', emoji: '🍳' },
      { id: 'tool-spatula-2', name: 'Spatula', emoji: '🥄' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Crack eggs into the bowl',
        instruction: 'Gently tap an egg on the counter until it cracks. Open it over the bowl. Repeat for second egg.',
        tip: 'If a little shell falls in, use a clean spoon or large shell piece to scoop it out!',
        actionEmoji: '🥚',
        videoClipType: 'pour'
      },
      {
        stepNumber: 2,
        title: 'Add milk and whisk',
        instruction: 'Add 1 spoonful of milk and a pinch of salt. Beat rapidly with your fork until all yellow.',
        tip: 'Count to 30 while whisking with your fork!',
        timerSeconds: 30,
        timerLabel: 'Whisking Time (30 sec)',
        actionEmoji: '🥣',
        videoClipType: 'stir'
      },
      {
        stepNumber: 3,
        title: 'Warm the butter in pan',
        instruction: 'Put pan on stove at LOW-MEDIUM heat (number 3). Drop butter in and let it melt.',
        safetyWarning: 'CAUTION: Stove is getting warm. Do not touch inside the pan.',
        safetyType: 'hot-surface',
        timerSeconds: 30,
        timerLabel: 'Melt Butter (30 sec)',
        actionEmoji: '🧈',
        videoClipType: 'butter'
      },
      {
        stepNumber: 4,
        title: 'Pour eggs and stir gently',
        instruction: 'Pour eggs into the pan. Use your spatula to push eggs from the edge toward the center slowly.',
        safetyWarning: 'Hold the pan handle tightly with one hand, stir with the other.',
        safetyType: 'hot-surface',
        timerSeconds: 90,
        timerLabel: 'Cook Eggs (1 min 30 sec)',
        actionEmoji: '🍳',
        videoClipType: 'stir'
      },
      {
        stepNumber: 5,
        title: 'Turn OFF heat and serve',
        instruction: 'Turn stove knob to OFF! Slide warm fluffy eggs onto your plate. Great job, Chef!',
        safetyWarning: 'REMINDER: Check that the stove knob is completely OFF.',
        safetyType: 'hot-surface',
        actionEmoji: '🍽️',
        videoClipType: 'pour'
      }
    ]
  },
  {
    id: 'banana-honey-oatmeal',
    title: 'Warm Banana & Honey Oatmeal',
    shortDescription: 'Sweet, creamy breakfast made safely in the microwave.',
    emoji: '🥣',
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 2,
    cookTimeMinutes: 2,
    totalTimeMinutes: 4,
    servings: 1,
    heatLevel: 'microwave',
    heatLabel: 'Microwave Safe',
    category: 'Breakfast',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    videoTutorialTitle: 'Full Video: Microwave Oatmeal Tutorial',
    videoCaptions: [
      'Measure 1/2 cup of rolled oats into a microwave-safe bowl.',
      'Pour in 1 cup of water or milk.',
      'Microwave on high for 90 seconds.',
      'Use a potholder or oven mitt to take bowl out.',
      'Slice banana and drizzle honey on top.'
    ],
    safetyRules: [
      'Always use a microwave-safe ceramic or glass bowl (never metal or foil!).',
      'The bowl can become very hot on the bottom. Use oven mitts or a towel to carry it.',
      'Let steam clear before putting your face over the bowl.'
    ],
    ingredients: [
      { id: 'om-1', name: 'Quick Oats', amount: '1/2 cup', emoji: '🌾', note: 'Rolled or quick oats' },
      { id: 'om-2', name: 'Milk or Water', amount: '1 cup', emoji: '🥛', note: 'Any milk or water' },
      { id: 'om-3', name: 'Ripe Banana', amount: '1 banana', emoji: '🍌', note: 'Peeled and sliced' },
      { id: 'om-4', name: 'Honey or Maple', amount: '1 small squeeze', emoji: '🍯', note: 'For sweetness' }
    ],
    tools: [
      { id: 'tool-mbowl', name: 'Microwave Bowl', emoji: '🥣' },
      { id: 'tool-mitt', name: 'Oven Mitts / Towel', emoji: '🧤' },
      { id: 'tool-bknife', name: 'Butter Knife', emoji: '🍴' },
      { id: 'tool-spoon', name: 'Eating Spoon', emoji: '🥄' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Add oats to bowl',
        instruction: 'Pour 1/2 cup of oats into your microwave-safe bowl.',
        tip: 'Use a wide, deep bowl so it does not spill over when bubbling.',
        actionEmoji: '🌾',
        videoClipType: 'pour'
      },
      {
        stepNumber: 2,
        title: 'Pour milk or water',
        instruction: 'Pour 1 cup of milk or water over the oats. Stir once with a spoon.',
        tip: 'Make sure all oats are wet underneath the liquid.',
        actionEmoji: '🥛',
        videoClipType: 'stir'
      },
      {
        stepNumber: 3,
        title: 'Microwave for 90 seconds',
        instruction: 'Put bowl in microwave. Close door. Press 1 - 3 - 0, then press START.',
        safetyWarning: 'The bowl will be HOT when done! Do not rush.',
        safetyType: 'microwave-hot',
        timerSeconds: 90,
        timerLabel: 'Microwave Cooking (1 min 30 sec)',
        actionEmoji: '⏲️',
        videoClipType: 'microwave'
      },
      {
        stepNumber: 4,
        title: 'Carefully take bowl out',
        instruction: 'Put on oven mitts or use a dry folded cloth. Carry bowl carefully to table.',
        safetyWarning: 'CAUTION: Use oven mitts. Bowl is warm and steam is hot.',
        safetyType: 'microwave-hot',
        actionEmoji: '🧤',
        videoClipType: 'pour'
      },
      {
        stepNumber: 5,
        title: 'Slice banana & drizzle honey',
        instruction: 'Peel banana. Use a dull butter knife to slice into rounds. Top oatmeal with banana and honey.',
        tip: 'Stir gently and let cool for 1 minute before first bite. Delicious!',
        timerSeconds: 60,
        timerLabel: 'Cool Down (1 min)',
        actionEmoji: '🍌',
        videoClipType: 'slice'
      }
    ]
  },
  {
    id: 'cheesy-quesadilla',
    title: 'Crispy Cheesy Quesadilla',
    shortDescription: 'Folded tortilla packed with warm melted cheese.',
    emoji: '🌮',
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 2,
    cookTimeMinutes: 4,
    totalTimeMinutes: 6,
    servings: 1,
    heatLevel: 'stovetop',
    heatLabel: 'Stovetop (Warm Pan)',
    category: 'Lunch & Dinner',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    videoTutorialTitle: 'Full Video: Simple Quesadilla Tutorial',
    videoCaptions: [
      'Lay 1 flour tortilla flat on your plate.',
      'Cover half of the circle with shredded cheese.',
      'Fold the empty half over the cheese to make a half-moon.',
      'Warm in a pan for 2 minutes on each side until melted.'
    ],
    safetyRules: [
      'The pan gets hot. Keep hands on the spatula handle.',
      'Ask helper to assist with flipping if needed.',
      'Turn the stove knob to OFF when melted.'
    ],
    ingredients: [
      { id: 'qd-1', name: 'Flour Tortilla', amount: '1 large tortilla', emoji: '🫓', note: 'Soft flour tortilla' },
      { id: 'qd-2', name: 'Shredded Cheese', amount: '1/2 cup', emoji: '🧀', note: 'Cheddar or Mexican blend' },
      { id: 'qd-3', name: 'Cooking Spray / Butter', amount: '1 tiny spray', emoji: '🧈', note: 'Keeps it crisp' }
    ],
    tools: [
      { id: 'tool-qpan', name: 'Skillet Pan', emoji: '🍳' },
      { id: 'tool-qspatula', name: 'Wide Spatula', emoji: '🥄' },
      { id: 'tool-qplate', name: 'Plate', emoji: '🍽️' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Lay tortilla flat',
        instruction: 'Place your tortilla on the clean plate.',
        actionEmoji: '🫓',
        videoClipType: 'pour'
      },
      {
        stepNumber: 2,
        title: 'Add cheese to half',
        instruction: 'Sprinkle shredded cheese across ONLY ONE HALF of the tortilla.',
        tip: 'Leaving one half empty makes it easy to fold!',
        actionEmoji: '🧀',
        videoClipType: 'pour'
      },
      {
        stepNumber: 3,
        title: 'Fold in half',
        instruction: 'Take the empty side of the tortilla and fold it over the cheese. Press down gently.',
        actionEmoji: '🌮',
        videoClipType: 'flip'
      },
      {
        stepNumber: 4,
        title: 'Cook first side in pan',
        instruction: 'Place quesadilla in warm pan on MEDIUM heat (number 4). Cook for 2 minutes.',
        safetyWarning: 'CAUTION: Do not touch the hot pan.',
        safetyType: 'hot-surface',
        timerSeconds: 120,
        timerLabel: 'Cook Side 1 (2 min)',
        actionEmoji: '🍳',
        videoClipType: 'stir'
      },
      {
        stepNumber: 5,
        title: 'Flip and cook side two',
        instruction: 'Use your spatula to flip it over. Cook for 2 minutes until cheese is melted and crust is golden brown.',
        safetyWarning: 'Flip carefully so cheese does not spill.',
        safetyType: 'hot-surface',
        timerSeconds: 120,
        timerLabel: 'Cook Side 2 (2 min)',
        actionEmoji: '🌮',
        videoClipType: 'flip'
      },
      {
        stepNumber: 6,
        title: 'Turn OFF heat and enjoy',
        instruction: 'Turn stove knob to OFF! Slide onto your plate and let cool for 2 minutes before eating.',
        safetyWarning: 'Check that stove is OFF.',
        safetyType: 'hot-surface',
        timerSeconds: 120,
        timerLabel: 'Cool Down (2 min)',
        actionEmoji: '🍽️',
        videoClipType: 'pour'
      }
    ]
  },
  {
    id: 'berry-smoothie',
    title: 'Berry Sunshine Smoothie',
    shortDescription: 'Refreshing, sweet fruit drink made in a blender without heat!',
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 3,
    cookTimeMinutes: 1,
    totalTimeMinutes: 4,
    servings: 1,
    heatLevel: 'no-heat',
    heatLabel: 'No Heat (Safe Blender)',
    category: 'No-Cook',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    videoTutorialTitle: 'Full Video: Berry Smoothie Step-by-Step',
    videoCaptions: [
      'Add 1 peeled banana into blender cup.',
      'Add 1 cup of frozen berries.',
      'Add 1/2 cup of yogurt.',
      'Pour 1 cup of milk or juice.',
      'Lock blender lid tightly before pressing blend!'
    ],
    safetyRules: [
      'NEVER put your fingers or utensils inside the blender when it is plugged in.',
      'Always push the lid on tight and hold a hand on the lid while blending.',
      'Blender blades are sharp at the bottom.'
    ],
    ingredients: [
      { id: 'sm-1', name: 'Banana', amount: '1 peeled banana', emoji: '🍌', note: 'Break into 3 pieces' },
      { id: 'sm-2', name: 'Frozen Berries', amount: '1 cup', emoji: '🍓', note: 'Strawberries or blueberries' },
      { id: 'sm-3', name: 'Yogurt', amount: '1/2 cup', emoji: '🥛', note: 'Vanilla or plain yogurt' },
      { id: 'sm-4', name: 'Milk or Apple Juice', amount: '1 cup', emoji: '🧃', note: 'Helps everything blend smooth' }
    ],
    tools: [
      { id: 'tool-blender', name: 'Blender & Lid', emoji: '🌪️' },
      { id: 'tool-cup', name: 'Tall Glass', emoji: '🥛' },
      { id: 'tool-straw', name: 'Straw (Optional)', emoji: '🥤' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Break banana into blender',
        instruction: 'Peel banana. Break it into 3 chunks with your fingers and drop into blender.',
        actionEmoji: '🍌',
        videoClipType: 'pour'
      },
      {
        stepNumber: 2,
        title: 'Add berries and yogurt',
        instruction: 'Add 1 cup of frozen berries and 1/2 cup of yogurt into the blender.',
        actionEmoji: '🍓',
        videoClipType: 'pour'
      },
      {
        stepNumber: 3,
        title: 'Pour liquid',
        instruction: 'Pour 1 cup of milk or juice into the blender over the fruit.',
        tip: 'Liquid helps the blender spin smoothly without getting stuck.',
        actionEmoji: '🥛',
        videoClipType: 'pour'
      },
      {
        stepNumber: 4,
        title: 'LID ON TIGHT!',
        instruction: 'Press the blender lid down firmly until sealed. Put one hand flat on top of the lid.',
        safetyWarning: 'SAFETY: Never start blender without lid locked tightly!',
        safetyType: 'blender-blade',
        actionEmoji: '🔒',
        videoClipType: 'blend'
      },
      {
        stepNumber: 5,
        title: 'Blend for 30 seconds',
        instruction: 'Hold lid with one hand. Press BLEND or HIGH with other hand. Count to 30.',
        timerSeconds: 30,
        timerLabel: 'Blending Time (30 sec)',
        actionEmoji: '🌪️',
        videoClipType: 'blend'
      },
      {
        stepNumber: 6,
        title: 'Pour and enjoy',
        instruction: 'Turn blender off. Pour into your tall cup. Sip through a straw. So refreshing!',
        actionEmoji: '🥤',
        videoClipType: 'pour'
      }
    ]
  },
  {
    id: 'microwave-mug-cake',
    title: 'Chocolate Microwave Mug Cake',
    shortDescription: 'Warm, gooey chocolate cake ready in 1 minute in a mug!',
    emoji: '🧁',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 3,
    cookTimeMinutes: 1,
    totalTimeMinutes: 4,
    servings: 1,
    heatLevel: 'microwave',
    heatLabel: 'Microwave Safe',
    category: 'Snacks & Treats',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    videoTutorialTitle: 'Full Video: 1-Minute Microwave Mug Cake',
    videoCaptions: [
      'In a microwave mug, mix flour, sugar, and cocoa powder.',
      'Add milk, melted butter, and chocolate chips.',
      'Stir with a fork until smooth batter forms.',
      'Microwave on high for 70 seconds.',
      'Let cool 2 minutes before eating!'
    ],
    safetyRules: [
      'Use a ceramic microwave coffee mug (no gold or silver rims!).',
      'The mug handle can be hot. Use a kitchen towel or mitt.',
      'Wait 2 minutes before eating because the cake center is hot.'
    ],
    ingredients: [
      { id: 'mc-1', name: 'Flour', amount: '3 big spoons', emoji: '🌾', note: 'All-purpose flour' },
      { id: 'mc-2', name: 'Sugar', amount: '2 big spoons', emoji: '🍬', note: 'White granulated sugar' },
      { id: 'mc-3', name: 'Cocoa Powder', amount: '1 big spoon', emoji: '🍫', note: 'For chocolate taste' },
      { id: 'mc-4', name: 'Milk', amount: '3 big spoons', emoji: '🥛', note: 'Any milk' },
      { id: 'mc-5', name: 'Butter / Oil', amount: '1 big spoon', emoji: '🧈', note: 'Melted butter or vegetable oil' },
      { id: 'mc-6', name: 'Chocolate Chips', amount: '1 handful', emoji: '🍪', note: 'Makes it gooey!' }
    ],
    tools: [
      { id: 'tool-mug', name: 'Ceramic Mug', emoji: '☕' },
      { id: 'tool-mfork', name: 'Fork to stir', emoji: '🍴' },
      { id: 'tool-spoon2', name: 'Eating Spoon', emoji: '🥄' },
      { id: 'tool-mitt2', name: 'Oven Mitt', emoji: '🧤' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Add dry powders to mug',
        instruction: 'Add 3 spoons flour, 2 spoons sugar, and 1 spoon cocoa powder into your mug.',
        actionEmoji: '🍫',
        videoClipType: 'pour'
      },
      {
        stepNumber: 2,
        title: 'Add milk and butter',
        instruction: 'Add 3 spoons milk and 1 spoon melted butter or oil into the mug.',
        actionEmoji: '🥛',
        videoClipType: 'pour'
      },
      {
        stepNumber: 3,
        title: 'Mix until smooth',
        instruction: 'Stir vigorously with your fork until there are no dry spots. Drop chocolate chips on top!',
        tip: 'Scrape the bottom corners of the mug so all powder mixes in.',
        actionEmoji: '🍴',
        videoClipType: 'stir'
      },
      {
        stepNumber: 4,
        title: 'Microwave for 70 seconds',
        instruction: 'Put mug in microwave center. Heat on HIGH for 1 minute and 10 seconds (press 1 - 1 - 0, then START).',
        safetyWarning: 'Watch it puff up through the window! The mug will be hot.',
        safetyType: 'microwave-hot',
        timerSeconds: 70,
        timerLabel: 'Bake in Microwave (70 sec)',
        actionEmoji: '⏲️',
        videoClipType: 'microwave'
      },
      {
        stepNumber: 5,
        title: 'Cool down and enjoy!',
        instruction: 'Use oven mitt to take mug out. Let cool for 2 minutes. Eat warm with a spoon!',
        safetyWarning: 'CAUTION: Center of cake is very hot. Blow before eating.',
        safetyType: 'microwave-hot',
        timerSeconds: 120,
        timerLabel: 'Cool Down (2 min)',
        actionEmoji: '🧁',
        videoClipType: 'pour'
      }
    ]
  },
  {
    id: 'crunchy-tuna-pita',
    title: 'Crunchy Tuna & Veggie Pita',
    shortDescription: 'Tasty tuna salad pocket with ZERO stove or oven required!',
    emoji: '🥙',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 5,
    cookTimeMinutes: 0,
    totalTimeMinutes: 5,
    servings: 1,
    heatLevel: 'no-heat',
    heatLabel: 'No Heat (100% Safe)',
    category: 'No-Cook',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    videoTutorialTitle: 'Full Video: Easy Tuna Pita Pocket',
    videoCaptions: [
      'Open a can of tuna (ask helper to drain water).',
      'Mix tuna with 2 spoons of mayo in a bowl.',
      'Cut pita bread in half to make pockets.',
      'Spoon tuna inside pita with crunchy lettuce.'
    ],
    safetyRules: [
      'Canned tuna lid edges can be sharp. Ask a helper or use a pull-tab can carefully.',
      'Use a dull butter knife to cut the pita bread in half.',
      'Keep tuna refrigerated if not eating right away.'
    ],
    ingredients: [
      { id: 'tp-1', name: 'Canned Tuna (Drained)', amount: '1 can', emoji: '🐟', note: 'In water' },
      { id: 'tp-2', name: 'Mayonnaise', amount: '2 big spoons', emoji: '🥣', note: 'Or Greek yogurt' },
      { id: 'tp-3', name: 'Pita Bread', amount: '1 round pita', emoji: '🫓', note: 'White or whole wheat' },
      { id: 'tp-4', name: 'Crisp Lettuce', amount: '1 leaf', emoji: '🥬', note: 'Washed and torn' }
    ],
    tools: [
      { id: 'tool-tbowl', name: 'Bowl', emoji: '🥣' },
      { id: 'tool-tspoon', name: 'Spoon', emoji: '🥄' },
      { id: 'tool-tbknife', name: 'Butter Knife', emoji: '🍴' },
      { id: 'tool-tplate', name: 'Plate', emoji: '🍽️' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Flake tuna into bowl',
        instruction: 'Dump drained tuna into your bowl. Use fork to break large chunks apart.',
        actionEmoji: '🐟',
        videoClipType: 'stir'
      },
      {
        stepNumber: 2,
        title: 'Add mayo & mix',
        instruction: 'Add 2 big spoons of mayonnaise. Mix with spoon until creamy.',
        actionEmoji: '🥣',
        videoClipType: 'stir'
      },
      {
        stepNumber: 3,
        title: 'Cut pita in half',
        instruction: 'Use butter knife to cut pita round in half. Gently pry open each half into a pocket.',
        tip: 'Be gentle so the back seam doesn’t rip!',
        actionEmoji: '🫓',
        videoClipType: 'slice'
      },
      {
        stepNumber: 4,
        title: 'Stuff pockets and enjoy',
        instruction: 'Put a piece of lettuce into each pocket, then spoon tuna salad inside. Ready to eat!',
        actionEmoji: '🥙',
        videoClipType: 'pour'
      }
    ]
  },
  {
    id: 'butter-parmesan-pasta',
    title: 'Warm Butter & Cheese Pasta',
    shortDescription: 'Classic comfort noodles with melted butter and salty cheese.',
    emoji: '🍝',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281729?w=800&auto=format&fit=crop&q=80',
    prepTimeMinutes: 2,
    cookTimeMinutes: 10,
    totalTimeMinutes: 12,
    servings: 1,
    heatLevel: 'stovetop',
    heatLabel: 'Stovetop (Boiling Water)',
    category: 'Lunch & Dinner',
    videoTutorialUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    videoTutorialTitle: 'Full Video: Cooking Pasta Safely',
    videoCaptions: [
      'Fill a medium pot halfway with water.',
      'Bring water to a boil on high heat.',
      'Gently add pasta noodles.',
      'Set timer for 8 minutes and stir occasionally.',
      'Carefully drain water with helper, then stir in butter and cheese.'
    ],
    safetyRules: [
      'BOILING WATER IS VERY HOT. Always ask an adult or caregiver to help drain the hot water.',
      'Use oven mitts when touching the pot handles.',
      'Never run in the kitchen while hot water is boiling.'
    ],
    ingredients: [
      { id: 'bp-1', name: 'Short Pasta (Penne/Macaroni)', amount: '1 cup', emoji: '🌾', note: 'Easy to scoop' },
      { id: 'bp-2', name: 'Water', amount: '4 cups', emoji: '💧', note: 'To fill pot halfway' },
      { id: 'bp-3', name: 'Butter', amount: '1 big spoon', emoji: '🧈', note: 'Melted richness' },
      { id: 'bp-4', name: 'Parmesan Cheese', amount: '2 big spoons', emoji: '🧀', note: 'Grated cheese' }
    ],
    tools: [
      { id: 'tool-pot', name: 'Medium Pot with Lid', emoji: '🍲' },
      { id: 'tool-colander', name: 'Strainer / Colander', emoji: '🥣' },
      { id: 'tool-wspoon', name: 'Wooden Spoon', emoji: '🥄' },
      { id: 'tool-pmitt', name: 'Oven Mitts', emoji: '🧤' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Put water in pot',
        instruction: 'Fill pot halfway with cool tap water. Put pot on stove burner.',
        actionEmoji: '💧',
        videoClipType: 'pour'
      },
      {
        stepNumber: 2,
        title: 'Bring water to boil',
        instruction: 'Turn stove to HIGH heat. Put lid on. Wait for water to bubble rapidly.',
        safetyWarning: 'SAFETY: Steam is very hot! Keep face away from pot lid.',
        safetyType: 'boiling-water',
        timerSeconds: 300,
        timerLabel: 'Boil Water (5 min)',
        actionEmoji: '🍲',
        videoClipType: 'boil'
      },
      {
        stepNumber: 3,
        title: 'Add pasta & start timer',
        instruction: 'Carefully slide 1 cup pasta into boiling water. Stir once so noodles don’t stick. Boil for 8 minutes.',
        safetyWarning: 'Do not drop pasta from high or hot water will splash.',
        safetyType: 'boiling-water',
        timerSeconds: 480,
        timerLabel: 'Boil Pasta (8 min)',
        actionEmoji: '🍝',
        videoClipType: 'boil'
      },
      {
        stepNumber: 4,
        title: 'Drain water with helper',
        instruction: 'Turn stove OFF! Put on oven mitts. Ask helper to help pour water through colander in the sink.',
        safetyWarning: 'CRITICAL: Boiling water can burn. Pour slowly into sink colander.',
        safetyType: 'boiling-water',
        actionEmoji: '🧤',
        videoClipType: 'pour'
      },
      {
        stepNumber: 5,
        title: 'Add butter and cheese',
        instruction: 'Put warm drained pasta in bowl. Add 1 spoon butter and 2 spoons cheese. Stir until creamy and melted!',
        tip: 'Smells amazing! Let cool for 2 minutes before eating.',
        timerSeconds: 120,
        timerLabel: 'Cool Down (2 min)',
        actionEmoji: '🧀',
        videoClipType: 'stir'
      }
    ]
  }
];
