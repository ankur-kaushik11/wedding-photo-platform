import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props 
}) => {
  const { currentTheme } = useTheme();

  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed gpu-accelerated';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm min-h-[44px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[44px]',
  };

  const variantStyles = {
    primary: {
      backgroundColor: currentTheme.colors.primary,
      color: 'white',
    },
    secondary: {
      backgroundColor: currentTheme.colors.secondary,
      color: currentTheme.colors.text,
    },
    outline: {
      backgroundColor: 'transparent',
      color: currentTheme.colors.primary,
      border: `2px solid ${currentTheme.colors.primary}`,
    },
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${className}`}
      style={variantStyles[variant]}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        boxShadow: disabled ? 'none' : `0 10px 25px rgba(0, 0, 0, 0.2)`,
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
