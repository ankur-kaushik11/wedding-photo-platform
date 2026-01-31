import { createContext, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePerformance } from '../hooks/usePerformance';

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();
  const performanceMetrics = usePerformance();
  
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  // Determine if animations should be active
  const shouldAnimate = 
    animationsEnabled && 
    !prefersReducedMotion && 
    performanceMetrics.canAnimate;

  // Determine particle count multiplier
  const getParticleCount = (baseCount) => {
    if (!shouldAnimate) return 0;
    return Math.floor(baseCount * performanceMetrics.particleMultiplier);
  };

  return (
    <AnimationContext.Provider 
      value={{ 
        shouldAnimate,
        prefersReducedMotion,
        performanceMetrics,
        animationsEnabled,
        setAnimationsEnabled,
        isScrolling,
        setIsScrolling,
        getParticleCount,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
