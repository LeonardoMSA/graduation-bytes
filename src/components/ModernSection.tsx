import { motion } from 'framer-motion';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import Scene3D from './Scene3D';
import Timeline from './Timeline';
import MapSection from './MapSection';
import { useEffect, useState } from 'react';

function ConfettiOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: ['#8b5cf6', '#ec4899', '#22d3ee', '#f59e0b', '#10b981', '#ef4444'][i % 6],
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confetti-fall ${Math.random() * 2 + 2}s ${Math.random() * 1}s linear forwards`,
          }}
        />
      ))}
    </div>
  );
}

export default function ModernSection() {
  const konamiActive = useKonamiCode();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (konamiActive) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [konamiActive]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative dark"
      style={{
        background: 'linear-gradient(180deg, hsl(230,25%,7%) 0%, hsl(250,30%,10%) 50%, hsl(230,25%,7%) 100%)',
        color: 'hsl(210,40%,98%)',
      }}
    >
      <Scene3D />
      {showConfetti && <ConfettiOverlay />}

      {/* Konami Easter Egg Banner */}
      {konamiActive && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 text-center py-3 font-modern font-bold text-lg"
          style={{ background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #22d3ee)' }}
        >
          🎮 KONAMI CODE ATIVADO! Você é um(a) verdadeiro(a) gamer! 🕹️
        </motion.div>
      )}

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="text-6xl sm:text-7xl mb-6"
          >
            🎓
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-modern mb-4 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Luiza Omena
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-modern opacity-70 mb-2">
            Bacharela em Ciência da Computação
          </p>

          <div className="glass rounded-2xl inline-block px-6 sm:px-8 py-4 mt-6">
            <p className="font-modern text-sm sm:text-base opacity-80">
              📅 14 de março de 2026 &nbsp;·&nbsp; 🕐 16h
            </p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 opacity-40"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="font-modern text-xs mb-2">Scroll para explorar</p>
            <span className="text-2xl">↓</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* Map */}
      <MapSection />

      {/* Footer */}
      <footer className="py-12 text-center font-modern opacity-40 text-sm">
        <p>Feito com 💜 e muito código</p>
        <p className="text-xs mt-1">© 2026 Luiza Omena</p>
      </footer>
    </motion.div>
  );
}
