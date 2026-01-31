import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ThemeSelector = () => {
  const { currentTheme, changeTheme, themes } = useTheme();

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center p-4">
      {Object.values(themes).map((theme) => (
        <motion.button
          key={theme.id}
          onClick={() => changeTheme(theme.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all min-h-[44px]"
          style={{
            backgroundColor: currentTheme.id === theme.id ? theme.colors.primary : 'white',
            color: currentTheme.id === theme.id ? 'white' : theme.colors.primary,
            border: `2px solid ${theme.colors.primary}`,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">{theme.emoji}</span>
          <span>{theme.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ThemeSelector;
