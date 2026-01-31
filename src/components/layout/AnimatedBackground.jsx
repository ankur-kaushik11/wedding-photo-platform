import { useTheme } from '../../hooks/useTheme';
import { useContext } from 'react';
import { AnimationContext } from '../../context/AnimationContext';
import FloatingPetals from '../animations/FloatingPetals';
import SwingingLights from '../animations/SwingingLights';
import RotatingMandala from '../animations/RotatingMandala';

const AnimatedBackground = ({ children }) => {
  const { currentTheme } = useTheme();
  const { shouldAnimate } = useContext(AnimationContext);

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: currentTheme.colors.background,
      }}
    >
      {/* Background animations */}
      {shouldAnimate && (
        <>
          <SwingingLights />
          <RotatingMandala />
          <FloatingPetals />
        </>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBackground;
