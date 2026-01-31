import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { currentTheme } = useTheme();

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
          {label}
        </label>
      )}
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none min-h-[44px]"
        style={{
          borderColor: error 
            ? '#EF4444' 
            : isFocused 
              ? currentTheme.colors.primary 
              : '#E5E7EB',
          boxShadow: isFocused ? `0 0 0 3px ${currentTheme.colors.primary}20` : 'none',
        }}
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;
