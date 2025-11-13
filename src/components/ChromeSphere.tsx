import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ConcentricWave from './ConcentricWave';
import OrbitalStar from './OrbitalStar';

type AgentState = 'idle' | 'listening' | 'speaking' | 'thinking';

interface ChromeSphereProps {
  state: AgentState;
  size?: number; // Diameter in pixels
}

const SPHERE_SIZE = 320;
const ORBIT_RADIUS = SPHERE_SIZE / 2 + 50; // Orbit slightly outside the sphere

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

  // 3D Rotation variant (applied only to the image)
  const rotationVariants = {
    animate: {
      rotateY: 360,
      transition: {
        duration: 60, // Very slow rotation
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size + 200, height: size + 200 }}>
      
      {/* Orbital Stars Container */}
      <div className="absolute" style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}>
        <div className="absolute inset-0 flex items-center justify-center">
            <OrbitalStar delay={0} size={20} orbitRadius={ORBIT_RADIUS} duration={15} />
            <OrbitalStar delay={5} size={15} orbitRadius={ORBIT_RADIUS * 0.8} duration={12} />
            <OrbitalStar delay={10} size={18} orbitRadius={ORBIT_RADIUS * 1.1} duration={18} />
        </div>
      </div>

      {/* Concentric Waves (Only visible when speaking) */}
      {state === 'speaking' && <ConcentricWave size={size} />}

      {/* Image Sphere Core (Receives 3D rotation and Neon Pulse) */}
      <motion.div
        className="relative"
        style={{ width: size, height: size, perspective: 1000 }} // Add perspective for 3D effect
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
          variants={rotationVariants}
          initial={{ rotateY: 0 }}
          animate="animate"
          style={{ willChange: 'transform, filter' }}
        />
      </motion.div>

      {/* Static RENUS Name (Always facing forward) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute bottom-[50px] text-center z-10"
      >
        <h1 className="text-4xl font-extrabold tracking-widest text-primary drop-shadow-[0_0_10px_hsl(var(--primary))]">
          RENUS
        </h1>
      </motion.div>
    </div>
  );
};

export default ChromeSphere;