import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function GlitchTransition({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(onComplete, 3400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Glitch layers */}
      {phase < 2 && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #235EDC 0%, #56B0F0 30%, #3A8BC2 100%)',
              animation: 'glitch-1 0.3s infinite steps(1)',
              opacity: phase === 0 ? 1 : 0.5,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #235EDC 0%, #56B0F0 30%, #3A8BC2 100%)',
              animation: 'glitch-1 0.2s 0.1s infinite steps(1) reverse',
              mixBlendMode: 'difference',
              opacity: 0.7,
            }}
          />
        </>
      )}

      {/* Scanline */}
      <div
        className="absolute left-0 right-0 h-1 pointer-events-none"
        style={{
          background: 'rgba(255,255,255,0.15)',
          animation: 'scanline 1.5s linear infinite',
          boxShadow: '0 0 20px 5px rgba(255,255,255,0.05)',
        }}
      />

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          animate={{
            opacity: [0, 1, 0.3, 1],
            scale: phase >= 2 ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          {phase < 2 && (
            <p className="font-pixel text-2xl sm:text-4xl" style={{ color: '#00ff00' }}>
              {'> Atualizando sistema...'}
            </p>
          )}
          {phase === 2 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-pixel text-2xl sm:text-4xl"
              style={{ color: '#a78bfa' }}
            >
              {'> Upgrade completo ✓'}
            </motion.p>
          )}
          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-modern"
            >
              <p className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Bem-vindo ao futuro
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Particles during phase 2+ */}
      {phase >= 2 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                y: [null, Math.random() * -200],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.03,
                ease: 'easeOut',
              }}
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                background: ['#8b5cf6', '#ec4899', '#22d3ee', '#a78bfa'][i % 4],
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
