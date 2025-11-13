import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Loader, Volume2 } from 'lucide-react';
import ChromeSphere from '@/components/ChromeSphere';
import useSpeech from '@/hooks/use-speech';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ChromeSpherePage: React.FC = () => {
  const { agentState, subtitles, startListening, isMicrophoneActive } = useSpeech();
  const SPHERE_SIZE = 320;

  const getMicIcon = () => {
    switch (agentState) {
      case 'listening':
        return <Mic className="h-6 w-6 animate-pulse text-red-500" />;
      case 'speaking':
      case 'idle':
        return <Volume2 className="h-6 w-6 text-primary" />;
      case 'thinking':
        return <Loader className="h-6 w-6 animate-spin text-purple-400" />;
      default:
        return <Mic className="h-6 w-6 text-foreground" />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* 1. ChromeSphere Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center"
      >
        <ChromeSphere state={agentState} size={SPHERE_SIZE} />
      </motion.div>

      {/* 2. Subtitles/Transcript Area */}
      <div className="absolute bottom-40 w-full max-w-3xl text-center px-4">
        <motion.p
          key={subtitles}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: subtitles ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "text-lg font-medium tracking-wide",
            agentState === 'listening' ? 'text-red-400' : 'text-foreground/80'
          )}
        >
          {subtitles}
        </motion.p>
      </div>

      {/* 3. Microphone Button (Centered Bottom) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 2 }}
        className="fixed bottom-8 z-30"
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-16 w-16 rounded-full shadow-2xl transition-all duration-300",
            "bg-secondary/50 hover:bg-secondary/80 backdrop-blur-sm border border-primary/20",
            isMicrophoneActive ? "ring-4 ring-red-500/50" : "ring-0"
          )}
          onClick={startListening}
          disabled={agentState === 'speaking' || agentState === 'thinking'}
        >
          {getMicIcon()}
        </Button>
      </motion.div>
    </div>
  );
};

export default ChromeSpherePage;