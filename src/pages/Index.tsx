import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Preloader from '@/components/Preloader';
import RetroDesktop from '@/components/RetroDesktop';
import GlitchTransition from '@/components/GlitchTransition';
import ModernSection from '@/components/ModernSection';
import LearnMore from '@/components/LearnMore';

type Phase = 'loading' | 'retro' | 'learnMore' | 'transition' | 'modern';

const Index = () => {
  const [phase, setPhase] = useState<Phase>('loading');

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
          <RetroDesktop
            key="retro"
            onEvolve={() => setPhase('transition')}
            onBackToLoader={() => setPhase('loading')}
            onLearnMore={() => setPhase('learnMore')}
            learnMoreHref="/convite" // opcional (se você tiver rota)
          />
        )}

        {phase === 'learnMore' && (
          <LearnMore
            key="learnMore"
            onBack={() => setPhase('retro')}
            // opcional: se quiser permitir evoluir direto daqui também
            // onEvolve={() => setPhase('transition')}
          />
        )}

        {phase === 'transition' && (
          <GlitchTransition key="transition" onComplete={() => setPhase('modern')} />
        )}

        {phase === 'modern' && (
          <ModernSection
            key="modern"
            // opcional: se quiser botão de voltar pra retro/learnMore
            // onBack={() => setPhase('retro')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

