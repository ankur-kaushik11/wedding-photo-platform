import { useState, useContext, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { currentTheme } = useTheme();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [stats, setStats] = useState({
    users: 142,
    photos: 1847,
    matches: 3201,
  });
  const [logs, setLogs] = useState([
    { id: 1, message: 'User Priya uploaded selfie', time: '2m ago' },
    { id: 2, message: '24 matches found for User Rahul', time: '5m ago' },
    { id: 3, message: 'Admin uploaded 50 photos to Haldi album', time: '10m ago' },
    { id: 4, message: 'User Amit downloaded 5 photos', time: '15m ago' },
    { id: 5, message: 'System: Face detection completed for batch 23', time: '20m ago' },
  ]);
  const fileInputRef = useRef(null);

  // Animate stats count-up
  const [displayStats, setDisplayStats] = useState({ users: 0, photos: 0, matches: 0 });

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setDisplayStats({
        users: Math.floor(stats.users * progress),
        photos: Math.floor(stats.photos * progress),
        matches: Math.floor(stats.matches * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayStats(stats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Add new log
          setLogs(prev => [
            {
              id: Date.now(),
              message: `Admin uploaded ${files.length} photos`,
              time: 'just now',
            },
            ...prev,
          ]);

          // Update stats
          setStats(prev => ({
            ...prev,
            photos: prev.photos + files.length,
          }));

          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex flex-col">
        <Header showThemeSelector={true} />

        <main className="flex-grow container mx-auto px-4 py-8">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: currentTheme.colors.primary }}
            >
              👑 Admin Command Center 👑
            </motion.h1>
            <p className="text-xl mb-4" style={{ color: currentTheme.colors.text }}>
              Welcome back, {user?.name}!
            </p>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
            >
              Logout
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="text-center">
                <div className="text-5xl mb-4">👥</div>
                <motion.h2
                  className="text-4xl font-bold mb-2"
                  style={{ color: currentTheme.colors.primary }}
                >
                  {displayStats.users}
                </motion.h2>
                <p className="text-gray-600 font-medium">Total Users</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center">
                <div className="text-5xl mb-4">📸</div>
                <motion.h2
                  className="text-4xl font-bold mb-2"
                  style={{ color: currentTheme.colors.primary }}
                >
                  {displayStats.photos.toLocaleString()}
                </motion.h2>
                <p className="text-gray-600 font-medium">Total Photos</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <motion.h2
                  className="text-4xl font-bold mb-2"
                  style={{ color: currentTheme.colors.primary }}
                >
                  {displayStats.matches.toLocaleString()}
                </motion.h2>
                <p className="text-gray-600 font-medium">Face Matches</p>
              </Card>
            </motion.div>
          </div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <Card>
              <div className="text-center">
                <div className="text-6xl mb-4">📤</div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: currentTheme.colors.primary }}>
                  Upload Photos
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload wedding photos in batch. The system will automatically detect and match faces.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  size="lg"
                  disabled={uploading}
                >
                  {uploading ? '⏳ Uploading...' : '📸 Select Photos'}
                </Button>

                {uploading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ 
                          backgroundColor: currentTheme.colors.primary,
                          width: `${uploadProgress}%`,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{uploadProgress}% complete</p>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Activity Logs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">📜</span>
                <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                  Recent Activity
                </h2>
              </div>

              <div className="space-y-3">
                {logs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentTheme.colors.primary }}
                      />
                      <p className="text-gray-800">{log.message}</p>
                    </div>
                    <span className="text-sm text-gray-500">{log.time}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </main>

        <Footer />
      </div>
    </AnimatedBackground>
  );
};

export default AdminDashboard;
