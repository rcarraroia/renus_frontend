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
  
  // Framer Motion variants for the sphere's core
  const sphereVariants = {
    idle: {
      scale: 1,
      boxShadow: `0 0 40px rgba(0, 216, 255, 0.5), inset 0 0 20px rgba(0, 216, 255, 0.25)`,
      transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const },
    },
    listening: {
      scale: 0.95, // Contrai levemente
      boxShadow: `0 0 50px rgba(30, 144, 255, 0.8), inset 0 0 30px rgba(30, 144, 255, 0.5)`,
      transition: { duration: 0.3, ease: 'easeOut' as const },
    },
    speaking: {
      scale: 1.05, // Brilho central intenso
      boxShadow: `0 0 60px #00D8FF, inset 0 0 40px #00D8FF`,
      transition: { duration: 0.1, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const },
    },
    thinking: {
      scale: 1,
      boxShadow: `0 0 40px rgba(147, 51, 234, 0.8), inset 0 0 20px rgba(147, 51, 234, 0.5)`, // Luz roxa
      transition: { duration: 3, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' as const },
    },
  };

  // CSS for the chrome reflection effect (using the provided gradient reference)
  const chromeStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'linear-gradient(180deg, #d9d9d9 0%, #ffffff 40%, #bcbcbc 60%, #4f4f4f 80%, #101010 100%)',
    position: 'relative',
    overflow: 'hidden',
    willChange: 'transform, box-shadow',
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size + 200, height: size + 200 }}>
      
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

      {/* Chrome Sphere Core */}
      <motion.div
        style={chromeStyle}
        variants={sphereVariants}
        animate={state}
        className={cn(
            "flex items-center justify-center",
            // Add a subtle border for definition
            "border border-white/10" 
        )}
      >
        {/* Inner Glow/Effect Layer */}
        <motion.div
            className="absolute inset-0 rounded-full"
            style={{
                // Simulate the inner light source
                background: 'radial-gradient(circle at center, rgba(0, 216, 255, 0.5) 0%, rgba(0, 0, 0, 0) 70%)',
                mixBlendMode: 'overlay',
            }}
            animate={{ opacity: state === 'speaking' ? 1 : state === 'listening' ? 0.8 : 0.5 }}
            transition={{ duration: 0.5 }}
        />
        
        {/* Placeholder for the image texture (if needed, but relying on CSS gradient for chrome look) */}
        <div className="text-2xl font-bold text-black/80 z-10">RENUS</div>
      </motion.div>
    </div>
  );
};

export default ChromeSphere;