import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
  const { currentTheme } = useTheme();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="relative z-20 mt-auto py-6"
      style={{
        background: currentTheme.colors.background,
        borderTop: `2px solid ${currentTheme.colors.primary}`,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <p style={{ color: currentTheme.colors.text }} className="text-sm">
          Made with ❤️ for celebrating special moments
        </p>
        <p style={{ color: currentTheme.colors.text }} className="text-xs mt-2 opacity-70">
          © 2024 Wedding Photo Platform. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
