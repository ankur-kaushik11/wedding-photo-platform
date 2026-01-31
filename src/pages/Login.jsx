import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import DancingSilhouettes from '../components/animations/DancingSilhouettes';
import FloatingPetals from '../components/animations/FloatingPetals';
import ConfettiBurst from '../components/animations/ConfettiBurst';

const Login = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [showConfetti, setShowConfetti] = useState(false);
  const { login } = useContext(AuthContext);
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setShowConfetti(true);
    
    setTimeout(() => {
      const userData = {
        name: name.trim(),
        role: role,
        id: Date.now(),
      };
      
      login(userData);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: currentTheme.colors.background }}
    >
      {/* Background animations */}
      <FloatingPetals />
      <DancingSilhouettes position="left" />
      <DancingSilhouettes position="right" />
      <ConfettiBurst trigger={showConfetti} />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full max-w-md mx-4"
      >
        <motion.div
          className="text-center mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: currentTheme.colors.primary }}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💐 Welcome to the Shaadi! 💐
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-semibold"
            style={{ color: currentTheme.colors.text }}
          >
            Find Your Beautiful Moments
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            borderTop: `6px solid ${currentTheme.colors.primary}`,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Input
              label="Your Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
                I am a...
              </label>
              <div className="flex gap-4">
                <motion.button
                  type="button"
                  onClick={() => setRole('user')}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all min-h-[44px]"
                  style={{
                    backgroundColor: role === 'user' ? currentTheme.colors.primary : 'white',
                    color: role === 'user' ? 'white' : currentTheme.colors.primary,
                    border: `2px solid ${currentTheme.colors.primary}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  👤 Guest
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setRole('admin')}
                  className="flex-1 py-3 px-4 rounded-lg font-medium transition-all min-h-[44px]"
                  style={{
                    backgroundColor: role === 'admin' ? currentTheme.colors.primary : 'white',
                    color: role === 'admin' ? 'white' : currentTheme.colors.primary,
                    border: `2px solid ${currentTheme.colors.primary}`,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  👑 Admin
                </motion.button>
              </div>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full text-xl"
              >
                🎊 ENTER THE SHAADI 🎊
              </Button>
            </motion.div>
          </form>
        </motion.div>

        <motion.p
          className="text-center mt-6 text-sm opacity-80"
          style={{ color: currentTheme.colors.text }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Get ready for a celebration like never before! 🎉
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
