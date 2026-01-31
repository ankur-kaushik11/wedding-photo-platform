import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AnimationContext } from '../../context/AnimationContext';
import { useTheme } from '../../hooks/useTheme';

const SwingingLights = () => {
  const { shouldAnimate } = useContext(AnimationContext);
  const { currentTheme } = useTheme();

  if (!shouldAnimate) return null;

  const lights = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="fixed top-0 left-0 right-0 z-0 pointer-events-none">
      <div className="flex justify-around items-start">
        {lights.map((light, index) => (
          <motion.div
            key={light}
            className="relative"
            animate={{
              rotate: [-3, 3, -3],
            }}
            transition={{
              duration: 2,
              delay: index * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transformOrigin: 'top center',
            }}
          >
            {/* String */}
            <div 
              className="w-0.5 h-16 mx-auto"
              style={{ backgroundColor: currentTheme.colors.primary }}
            />
            
            {/* Bulb */}
            <motion.div
              className="w-6 h-8 rounded-full shadow-lg"
              style={{
                backgroundColor: currentTheme.colors.secondary,
                boxShadow: `0 0 20px ${currentTheme.colors.secondary}`,
              }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2,
                delay: index * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SwingingLights;
