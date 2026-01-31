import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) => {
  const { currentTheme } = useTheme();

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg p-6 gpu-accelerated ${className}`}
      style={{
        borderTop: `4px solid ${currentTheme.colors.primary}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { 
        y: -5,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
