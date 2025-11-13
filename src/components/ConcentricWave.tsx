import React from 'react';
import { motion } from 'framer-motion';

interface ConcentricWaveProps {
  size: number; // Diameter of the sphere
}

const ConcentricWave: React.FC<ConcentricWaveProps> = ({ size }) => {
  const waveCount = 3;
  const baseDuration = 1.8; // Duration of expansion

  const waveVariants = {
    start: {
      scale: 1,
      opacity: 1,
    },
    end: {
      scale: 3, // Expand up to 3 times the sphere size
      opacity: 0,
    },
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(waveCount)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border border-primary/50"
          style={{
            width: size,
            height: size,
            boxShadow: '0 0 10px rgba(0, 216, 255, 0.5)',
            backgroundColor: 'rgba(0, 216, 255, 0.05)',
          }}
          variants={waveVariants}
          initial="start"
          animate="end"
          transition={{
            duration: baseDuration,
            repeat: Infinity,
            delay: index * (baseDuration / waveCount), // Stagger the waves
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default ConcentricWave;