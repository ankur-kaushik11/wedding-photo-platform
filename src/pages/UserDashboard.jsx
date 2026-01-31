import { useState, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AnimatedBackground from '../components/layout/AnimatedBackground';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PhotoGrid from '../components/ui/PhotoGrid';
import ConfettiBurst from '../components/animations/ConfettiBurst';

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { currentTheme } = useTheme();
  const [selfie, setSelfie] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [photos, setPhotos] = useState({
    haldi: [],
    mehndi: [],
    wedding: [],
    reception: [],
  });
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfie(reader.result);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFindPhotos = () => {
    setIsSearching(true);
    setShowConfetti(true);

    // Simulate API call
    setTimeout(() => {
      // Mock data - in real app, this would come from API
      const mockPhotos = {
        haldi: Array.from({ length: 8 }, (_, i) => ({
          id: `haldi-${i}`,
          url: `https://picsum.photos/400/300?random=${i}`,
          thumbnail: `https://picsum.photos/200/150?random=${i}`,
          alt: `Haldi photo ${i + 1}`,
        })),
        mehndi: Array.from({ length: 6 }, (_, i) => ({
          id: `mehndi-${i}`,
          url: `https://picsum.photos/400/300?random=${i + 10}`,
          thumbnail: `https://picsum.photos/200/150?random=${i + 10}`,
          alt: `Mehndi photo ${i + 1}`,
        })),
        wedding: Array.from({ length: 10 }, (_, i) => ({
          id: `wedding-${i}`,
          url: `https://picsum.photos/400/300?random=${i + 20}`,
          thumbnail: `https://picsum.photos/200/150?random=${i + 20}`,
          alt: `Wedding photo ${i + 1}`,
        })),
        reception: Array.from({ length: 5 }, (_, i) => ({
          id: `reception-${i}`,
          url: `https://picsum.photos/400/300?random=${i + 30}`,
          thumbnail: `https://picsum.photos/200/150?random=${i + 30}`,
          alt: `Reception photo ${i + 1}`,
        })),
      };

      setPhotos(mockPhotos);
      setIsSearching(false);
      setTimeout(() => setShowConfetti(false), 3000);
    }, 2000);
  };

  const handlePhotoClick = (photo) => {
    // Open photo in new tab or modal
    window.open(photo.url, '_blank');
  };

  const totalPhotos = Object.values(photos).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <AnimatedBackground>
      <div className="min-h-screen flex flex-col">
        <Header showThemeSelector={true} />
        
        <ConfettiBurst trigger={showConfetti} />

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
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              🎉 Welcome, {user?.name}! 🎉
            </motion.h1>
            <p className="text-xl" style={{ color: currentTheme.colors.text }}>
              Let's find your amazing moments from the celebration!
            </p>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="mt-4"
            >
              Logout
            </Button>
          </motion.div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-6xl mb-4"
                >
                  📸
                </motion.div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: currentTheme.colors.primary }}>
                  Upload Your Selfie
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload a clear photo of yourself to find all your moments from the wedding!
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {!selfie ? (
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    size="lg"
                  >
                    📷 Choose Selfie
                  </Button>
                ) : (
                  <div>
                    <motion.img
                      src={selfie}
                      alt="Your selfie"
                      className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4"
                      style={{ borderColor: currentTheme.colors.primary }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      size="sm"
                    >
                      Change Photo
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Find Photos CTA */}
          {selfie && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Button
                  onClick={handleFindPhotos}
                  size="lg"
                  disabled={isSearching}
                  className="text-2xl py-6 px-12"
                >
                  {isSearching ? '🔍 Searching...' : '🎊 DHOOM MACHAO - FIND MY PHOTOS 🎊'}
                </Button>
              </motion.div>
            </motion.div>
          )}

          {/* Results Section */}
          {totalPhotos > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-8" style={{ color: currentTheme.colors.primary }}>
                📸 Your Photos ({totalPhotos} found!)
              </h2>

              {/* Haldi Photos */}
              {photos.haldi.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🌼</span>
                    <h3 className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                      Haldi - {photos.haldi.length} photos
                    </h3>
                  </div>
                  <PhotoGrid photos={photos.haldi} onPhotoClick={handlePhotoClick} />
                </motion.div>
              )}

              {/* Mehndi Photos */}
              {photos.mehndi.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">🌿</span>
                    <h3 className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                      Mehndi - {photos.mehndi.length} photos
                    </h3>
                  </div>
                  <PhotoGrid photos={photos.mehndi} onPhotoClick={handlePhotoClick} />
                </motion.div>
              )}

              {/* Wedding Photos */}
              {photos.wedding.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">❤️</span>
                    <h3 className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                      Wedding - {photos.wedding.length} photos
                    </h3>
                  </div>
                  <PhotoGrid photos={photos.wedding} onPhotoClick={handlePhotoClick} />
                </motion.div>
              )}

              {/* Reception Photos */}
              {photos.reception.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">✨</span>
                    <h3 className="text-2xl font-bold" style={{ color: currentTheme.colors.primary }}>
                      Reception - {photos.reception.length} photos
                    </h3>
                  </div>
                  <PhotoGrid photos={photos.reception} onPhotoClick={handlePhotoClick} />
                </motion.div>
              )}
            </motion.div>
          )}
        </main>

        <Footer />
      </div>
    </AnimatedBackground>
  );
};

export default UserDashboard;
