import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrbitalStarProps {
  delay: number;
  size: number; // Size of the star icon
  orbitRadius: number; // Radius of the orbit path
  duration: number; // Duration of one full orbit
}

const OrbitalStar: React.FC<OrbitalStarProps> = ({ delay, size, orbitRadius, duration }) => {
  const orbitVariants = {
    animate: {
      // Defines a circular/elliptical path around the center (0, 0)
      x: [0, orbitRadius, 0, -orbitRadius, 0],
      y: [0, 0, orbitRadius, 0, 0],
      rotate: [0, 360],
      opacity: [0.5, 1, 0.5, 0.8, 0.5],
    },
  };

  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 8px #00d8ff)',
        willChange: 'transform, opacity',
      }}
      variants={orbitVariants}
      animate="animate"
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
    >
      <Star 
        className={cn("w-full h-full")} 
        style={{ 
            color: '#00D8FF', 
            fill: 'rgba(30, 144, 255, 0.5)', // Dodger Blue fill
        }} 
      />
    </motion.div>
  );
};

export default OrbitalStar;