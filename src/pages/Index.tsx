import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/Preloader';
import RetroDesktop from '@/components/RetroDesktop';
import GlitchTransition from '@/components/GlitchTransition';
import ModernSection from '@/components/ModernSection';

const Index = () => {
  const [phase, setPhase] = useState<'loading' | 'retro' | 'transition' | 'modern'>('loading');

  useEffect(() => {
    console.log(
      '%c🎓 Ei, dev curioso(a)! A Luiza aprova sua investigação! 💻',
      'font-size:18px; color:#8b5cf6; font-weight:bold;'
    );
    console.log(
      '%c> sudo celebrate --graduation --birthday --luiza',
      'font-family:monospace; color:#22c55e; font-size:14px;'
    );
    console.log(
      '%cDica: tente o Konami Code (↑↑↓↓←→←→BA) na interface moderna 😉',
      'font-size:12px; color:#ec4899;'
    );
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <Preloader key="preloader" onComplete={() => setPhase('retro')} />
        )}
        {phase === 'retro' && (
          <Preloader key="preloader" onComplete={() => setPhase('retro')} />
        )}
        {phase === 'transition' && (
          <GlitchTransition key="transition" onComplete={() => setPhase('modern')} />
        )}
        {phase === 'modern' && (
          <ModernSection key="modern" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
