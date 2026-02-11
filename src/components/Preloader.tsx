import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 15 + 3;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{
        background: '#3A6EA5',
        fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
      }}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🪟</div>
        <h1 className="text-white text-lg font-bold" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Carregando Convite.exe...
        </h1>
      </div>

      {/* XP-style progress bar */}
      <div style={{
        width: '300px',
        maxWidth: '80%',
        height: '20px',
        background: '#fff',
        border: '1px solid #808080',
        borderRadius: '2px',
        overflow: 'hidden',
        padding: '2px',
      }}>
        <div
          style={{
            height: '100%',
            width: `${Math.min(progress, 100)}%`,
            background: 'linear-gradient(180deg, #56C456 0%, #3EA03E 50%, #2D802D 100%)',
            borderRadius: '1px',
            transition: 'width 0.2s ease',
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.2) 8px, rgba(255,255,255,0.2) 10px)',
          }}
        />
      </div>

      <p className="text-white/70 text-xs mt-3">
        {progress < 30 ? 'Inicializando sistema...' :
         progress < 60 ? 'Carregando componentes...' :
         progress < 90 ? 'Preparando convite...' : 'Pronto!'}
      </p>
    </motion.div>
  );
}
