// Animation configuration constants
export const ANIMATION_CONFIG = {
  PERFORMANCE: {
    LOW_END_RAM: 4, // GB
    LOW_END_CPU_CORES: 4,
    FPS_TARGET: 60,
    DEBOUNCE_DELAY: 150,
  },
  
  PARTICLES: {
    PETALS: {
      count: {
        desktop: 50,
        tablet: 30,
        mobile: 15,
      },
      speed: {
        min: 1,
        max: 3,
      },
    },
    CONFETTI: {
      count: 100,
      spread: 60,
      duration: 3000,
    },
  },

  TRANSITIONS: {
    THEME_CHANGE: 1, // seconds
    PAGE_TRANSITION: 0.5, // seconds
    HOVER: 0.3, // seconds
  },

  EASING: {
    SMOOTH: [0.4, 0.0, 0.2, 1],
    BOUNCE: [0.68, -0.55, 0.265, 1.55],
    EASE_OUT: [0.0, 0.0, 0.2, 1],
  },
};

// Framer Motion variants for common animations
export const MOTION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  },
  
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  },

  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
  },

  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};
