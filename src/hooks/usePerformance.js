import { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '../constants/animations';

/**
 * Hook to detect device performance capabilities
 * Returns object with performance metrics and recommendations
 */
export const usePerformance = () => {
  const [performance, setPerformance] = useState({
    isLowEnd: false,
    ramGB: null,
    cpuCores: null,
    canAnimate: true,
    particleMultiplier: 1,
  });

  useEffect(() => {
    // Detect hardware capabilities
    const detectPerformance = () => {
      const cpuCores = navigator.hardwareConcurrency || 4;
      
      // Check for device memory (if available)
      const ramGB = navigator.deviceMemory || 8; // Default to 8GB if not available
      
      // Determine if device is low-end
      const isLowEnd = 
        ramGB < ANIMATION_CONFIG.PERFORMANCE.LOW_END_RAM ||
        cpuCores < ANIMATION_CONFIG.PERFORMANCE.LOW_END_CPU_CORES;

      // Calculate particle multiplier based on performance
      let particleMultiplier = 1;
      if (isLowEnd) {
        particleMultiplier = 0.5;
      }

      setPerformance({
        isLowEnd,
        ramGB,
        cpuCores,
        canAnimate: !isLowEnd,
        particleMultiplier,
      });
    };

    detectPerformance();
  }, []);

  return performance;
};
