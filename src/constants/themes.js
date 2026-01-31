// Wedding Theme Definitions
export const THEMES = {
  HALDI: {
    id: 'haldi',
    name: 'Haldi',
    emoji: '🌼',
    colors: {
      primary: '#FDB913',
      secondary: '#FFD700',
      accent: '#FF6B35',
      background: 'linear-gradient(135deg, #FFF9E6 0%, #FFE082 100%)',
      text: '#8B4513',
    },
    animations: {
      flowers: 'marigold',
      dance: 'bhangra',
      mood: 'playful',
    },
    description: 'Playful, warm, chaotic joy',
  },
  MEHNDI: {
    id: 'mehndi',
    name: 'Mehndi',
    emoji: '🌿',
    colors: {
      primary: '#2D5016',
      secondary: '#8BC34A',
      accent: '#FF9800',
      background: 'linear-gradient(135deg, #E8F5E9 0%, #AED581 100%)',
      text: '#1B5E20',
    },
    animations: {
      patterns: 'mandala',
      dance: 'hand-dance',
      mood: 'graceful',
    },
    description: 'Graceful, intricate, feminine energy',
  },
  WEDDING: {
    id: 'wedding',
    name: 'Wedding',
    emoji: '❤️',
    colors: {
      primary: '#B8001F',
      secondary: '#FFD700',
      accent: '#8B0000',
      background: 'linear-gradient(135deg, #FFE5E5 0%, #FF6B6B 100%)',
      text: '#7D0000',
    },
    animations: {
      patterns: 'grand-mandala',
      dance: 'baraat',
      mood: 'majestic',
    },
    description: 'Grand, majestic, emotional',
  },
  RECEPTION: {
    id: 'reception',
    name: 'Reception',
    emoji: '✨',
    colors: {
      primary: '#1A1A2E',
      secondary: '#E94560',
      accent: '#FFD700',
      background: 'linear-gradient(135deg, #0F0F23 0%, #16213E 100%)',
      text: '#E0E0E0',
    },
    animations: {
      patterns: 'sparkles',
      dance: 'ballroom',
      mood: 'glamorous',
    },
    description: 'Sophisticated, glamorous, celebratory',
  },
};

export const DEFAULT_THEME = THEMES.HALDI;
