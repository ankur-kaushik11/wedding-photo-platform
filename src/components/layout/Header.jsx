import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import ThemeSelector from '../ui/ThemeSelector';

const Header = ({ showThemeSelector = false }) => {
  const { currentTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20"
      style={{
        background: currentTheme.colors.background,
        borderBottom: `3px solid ${currentTheme.colors.primary}`,
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-4xl">{currentTheme.emoji}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold" style={{ color: currentTheme.colors.primary }}>
                Wedding Photo Platform
              </h1>
              <p className="text-sm opacity-80" style={{ color: currentTheme.colors.text }}>
                {currentTheme.description}
              </p>
            </div>
          </motion.div>
          
          {showThemeSelector && <ThemeSelector />}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
