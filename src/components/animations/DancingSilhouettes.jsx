import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AnimationContext } from '../../context/AnimationContext';
import { useTheme } from '../../hooks/useTheme';

const DancingSilhouettes = ({ position = 'left' }) => {
  const { shouldAnimate } = useContext(AnimationContext);
  const { currentTheme } = useTheme();

  if (!shouldAnimate) return null;

  const dancers = [
    { id: 1, delay: 0, scale: 1 },
    { id: 2, delay: 0.3, scale: 0.9 },
    { id: 3, delay: 0.6, scale: 0.8 },
  ];

  return (
    <div className={`fixed ${position === 'left' ? 'left-0' : 'right-0'} bottom-0 z-0 pointer-events-none`}>
      <div className="flex items-end space-x-2 p-4">
        {dancers.map(dancer => (
          <motion.div
            key={dancer.id}
            className="relative"
            animate={{
              y: [0, -20, 0],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 2,
              delay: dancer.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transform: `scale(${dancer.scale})` }}
          >
            {/* Simple dancing silhouette using SVG */}
            <svg
              width="60"
              height="120"
              viewBox="0 0 60 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
            >
              {/* Head */}
              <circle cx="30" cy="15" r="10" fill={currentTheme.colors.primary} opacity="0.8" />
              
              {/* Body */}
              <rect x="20" y="25" width="20" height="40" rx="5" fill={currentTheme.colors.primary} opacity="0.8" />
              
              {/* Arms */}
              <motion.rect
                x="10"
                y="30"
                width="8"
                height="25"
                rx="4"
                fill={currentTheme.colors.secondary}
                opacity="0.8"
                animate={{
                  rotate: [-30, 30, -30],
                }}
                transition={{
                  duration: 1.5,
                  delay: dancer.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: '14px 30px' }}
              />
              <motion.rect
                x="42"
                y="30"
                width="8"
                height="25"
                rx="4"
                fill={currentTheme.colors.secondary}
                opacity="0.8"
                animate={{
                  rotate: [30, -30, 30],
                }}
                transition={{
                  duration: 1.5,
                  delay: dancer.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: '46px 30px' }}
              />
              
              {/* Legs */}
              <motion.rect
                x="22"
                y="65"
                width="7"
                height="40"
                rx="3"
                fill={currentTheme.colors.primary}
                opacity="0.8"
                animate={{
                  rotate: [10, -10, 10],
                }}
                transition={{
                  duration: 1,
                  delay: dancer.delay + 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: '25px 65px' }}
              />
              <motion.rect
                x="31"
                y="65"
                width="7"
                height="40"
                rx="3"
                fill={currentTheme.colors.primary}
                opacity="0.8"
                animate={{
                  rotate: [-10, 10, -10],
                }}
                transition={{
                  duration: 1,
                  delay: dancer.delay + 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ transformOrigin: '34px 65px' }}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DancingSilhouettes;
