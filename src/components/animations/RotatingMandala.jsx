import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AnimationContext } from '../../context/AnimationContext';
import { useTheme } from '../../hooks/useTheme';

const RotatingMandala = ({ size = 200 }) => {
  const { shouldAnimate } = useContext(AnimationContext);
  const { currentTheme } = useTheme();

  if (!shouldAnimate) return null;

  return (
    <div className="fixed top-10 right-10 z-0 pointer-events-none opacity-20">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <circle cx="100" cy="100" r="95" stroke={currentTheme.colors.primary} strokeWidth="2" />
          
          {/* Inner patterns */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 100 100)`}>
              <path
                d="M 100 100 Q 100 50 120 30"
                stroke={currentTheme.colors.secondary}
                strokeWidth="2"
                fill="none"
              />
              <circle cx="120" cy="30" r="8" fill={currentTheme.colors.accent} />
            </g>
          ))}
          
          {/* Center flower */}
          <circle cx="100" cy="100" r="25" fill={currentTheme.colors.primary} />
          <circle cx="100" cy="100" r="15" fill={currentTheme.colors.secondary} />
          <circle cx="100" cy="100" r="8" fill={currentTheme.colors.accent} />
        </svg>
      </motion.div>
    </div>
  );
};

export default RotatingMandala;
