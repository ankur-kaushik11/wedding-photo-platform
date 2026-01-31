import { motion } from 'framer-motion';
import { useState } from 'react';

const PhotoGrid = ({ photos = [], onPhotoClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">No photos found yet!</p>
        <p className="mt-2">Upload your selfie to discover your moments</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {photos.map((photo, index) => (
        <motion.div
          key={photo.id || index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1,
          }}
          whileHover={{ 
            scale: 1.05,
            zIndex: 10,
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg gpu-accelerated"
          onClick={() => onPhotoClick && onPhotoClick(photo)}
        >
          <img
            src={photo.url || photo.thumbnail || '/placeholder.jpg'}
            alt={photo.alt || `Photo ${index + 1}`}
            className="w-full h-64 object-cover"
          />
          {hoveredIndex === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4"
            >
              <div className="text-white">
                <p className="font-semibold">Download</p>
                <p className="text-sm opacity-90">Click to view full size</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default PhotoGrid;
