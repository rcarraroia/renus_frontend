import React, { useState, useEffect, useCallback } from 'react';
import { showSuccess, showError } from '@/utils/toast';

// --- Type Declarations for Web Speech API (Fixes TS2304, TS2552) ---
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onend: () => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
  }
  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }
  var SpeechRecognition: {
    prototype: SpeechRecognition;
    new (): SpeechRecognition;
  };
}
// -------------------------------------------------------------------


type AgentState = 'idle' | 'listening' | 'speaking' | 'thinking';

interface SpeechResult {
  transcript: string;
  isFinal: boolean;
}

const useSpeech = () => {
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [transcript, setTranscript] = useState('');
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [subtitles, setSubtitles] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false); // Novo estado para controlar a saudação

  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const synthRef = React.useRef<SpeechSynthesis | null>(null);

  // --- TTS Function ---
  const speak = useCallback((text: string) => {
    if (!synthRef.current) return;

    setAgentState('speaking');
    setSubtitles(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    
    // Find a suitable Brazilian Portuguese voice if available
    const voices = synthRef.current.getVoices();
    const ptBrVoice = voices.find(voice => voice.lang === 'pt-BR' && voice.name.includes('Brazil'));
    if (ptBrVoice) {
        utterance.voice = ptBrVoice;
    }

    utterance.onend = () => {
      setAgentState('idle');
      setSubtitles('');
    };

    synthRef.current.speak(utterance);
  }, []);


  // --- Initialization & Recognition Setup ---
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        setTranscript(finalTranscript);
        setSubtitles(finalTranscript || interimTranscript);
      };

      recognitionRef.current.onend = () => {
        setIsMicrophoneActive(false);
        if (agentState === 'listening') {
          setAgentState('thinking');
          // Simulate processing time
          setTimeout(() => {
            if (transcript.trim()) {
              speak(`Você disse: ${transcript}. Processando sua solicitação...`);
            } else {
              setAgentState('idle');
            }
          }, 1500);
        }
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech Recognition Error:', event.error);
        setIsMicrophoneActive(false);
        setAgentState('idle');
        if (event.error !== 'no-speech') {
            showError("Erro no reconhecimento de voz. Tente novamente.");
        }
      };
    } else {
      console.warn("Web Speech API not supported in this browser.");
    }
  // Dependências ajustadas para evitar loop desnecessário
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentState, speak, transcript]); 

  // --- STT Function ---
  const startListening = useCallback(() => {
    if (recognitionRef.current && agentState !== 'listening') {
      setTranscript('');
      setSubtitles('Ouvindo...');
      setAgentState('listening');
      setIsMicrophoneActive(true);
      recognitionRef.current.start();
    }
  }, [agentState]);

  // --- Initial Greeting (Runs only once) ---
  useEffect(() => {
    if (!hasGreeted) {
        speak("Olá, eu sou o assistente RENUS. Estou aqui para conversar com você sobre ideias e possibilidades. Vamos começar?");
        setHasGreeted(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasGreeted, speak]);


  return {
    agentState,
    transcript,
    subtitles,
    isMicrophoneActive,
    speak,
    startListening,
    setAgentState,
  };
};

export default useSpeech;