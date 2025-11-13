import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ConcentricWave from './ConcentricWave';

type AgentState = 'idle' | 'listening' | 'speaking' | 'thinking';

interface ChromeSphereProps {
  state: AgentState;
  size?: number; // Diameter in pixels
}

const SPHERE_SIZE = 320;

const ChromeSphere: React.FC<ChromeSphereProps> = ({ state, size = SPHERE_SIZE }) => {
  
  // Framer Motion variants for the sphere's core (now controlling the image)
  const sphereVariants = {
    idle: {
      scale: 1,
      transition: { duration: 0.5 },
    },
    listening: {
      scale: 0.95, // Contrai levemente
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
    speaking: {
      scale: 1.05, // Brilho central intenso
      transition: { duration: 0.1, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const },
    },
    thinking: {
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      
      {/* Concentric Waves (Only visible when speaking) */}
      {state === 'speaking' && <ConcentricWave size={size} />}

      {/* Image Sphere Core (Receives Neon Pulse) */}
      <motion.div
        className="relative"
        style={{ width: size, height: size }}
        variants={sphereVariants}
        animate={state}
      >
        <motion.img
          src="/renus-chrome-sphere.png"
          alt="RENUS AI Core Sphere"
          className={cn(
            "w-full h-full object-contain",
            "animate-neon-pulse" // Apply dynamic neon pulse
          )}
          style={{ willChange: 'transform, filter' }}
        />
      </motion.div>
    </div>
  );
};

export default ChromeSphere;