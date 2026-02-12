import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import Scene3D from './Scene3D';
import Timeline from './Timeline';
import MapSection from './MapSection';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ConfettiOverlay } from './modern/ConfettiOverlay';
import { RsvpSection } from './modern/RsvpSection';
import { MarqueeStrip } from './modern/MarqueeStrip';
import { Card3D } from './modern/Card3D';
import { BubbleSection } from './modern/BubbleSection';
import { SecretConsole } from './modern/SecretConsole';
import { PixelArt } from './modern/PixelArt';
import { StickerTray } from './modern/StickerTray';
import { AchievementPopup } from './modern/AchievementPopup';
import { Hero } from './modern/Hero';
import { Footer } from './modern/Footer';
import { TOTAL_EGGS } from './shared/constants';

export default function ModernSection() {
  const konamiActive = useKonamiCode();
  const [showConfetti, setShowConfetti] = useState(false);
  const [eggsFound, setEggsFound] = useState<Set<string>>(new Set());
  const [achievement, setAchievement] = useState<{
    icon: string;
    name: string;
  } | null>(null);
  const achievementTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const launchConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4500);
  }, []);

  const findEgg = useCallback(
    (id: string, name: string, desc: string) => {
      setEggsFound((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);

        const icon = name.split(' ')[0];
        const label = `${name.split(' ').slice(1).join(' ')}: ${desc}`;
        setAchievement({ icon, name: label });
        clearTimeout(achievementTimerRef.current);
        achievementTimerRef.current = setTimeout(
          () => setAchievement(null),
          3500
        );

        if (next.size === TOTAL_EGGS) {
          setTimeout(() => {
            setAchievement({
              icon: '🏆',
              name: 'COMPLETIONIST: Encontrou TODOS os Easter Eggs!',
            });
            setTimeout(() => setAchievement(null), 5000);
          }, 2000);
        }

        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (konamiActive) {
      findEgg('konami', '🎮 Konami Code', '↑↑↓↓←→←→BA');
      launchConfetti();
    }
  }, [konamiActive, findEgg, launchConfetti]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const resetIdle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        findEgg('idle', '😴 AFK Master', 'Ficou parado por 30 segundos!');
      }, 30000);
    };

    document.addEventListener('mousemove', resetIdle);
    document.addEventListener('keydown', resetIdle);
    resetIdle();

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', resetIdle);
      document.removeEventListener('keydown', resetIdle);
    };
  }, [findEgg]);

  useEffect(() => {
    const handler = () => {
      setTimeout(() => {
        const sel = window.getSelection();
        if (sel && sel.toString().length > 200) {
          findEgg(
            'select-all',
            '📋 Ctrl+A Master',
            'Selecionou muito texto!'
          );
        }
      }, 100);
    };
    document.addEventListener('selectstart', handler);
    return () => document.removeEventListener('selectstart', handler);
  }, [findEgg]);

  useEffect(() => {
    console.log(
      '%c🎓 Parabéns por abrir o console! Você é dev mesmo!',
      'font-size:20px;color:#c8ff00;font-weight:bold;'
    );
    console.log(
      '%cDigite window.secretEgg() para um Easter Egg secreto!',
      'font-size:14px;color:#ff2d7b;'
    );
    (window as unknown as Record<string, unknown>).secretEgg = () => {
      findEgg('dev-console', '👩‍💻 True Dev', 'Usou o console do navegador!');
      console.log(
        '%c🥚 Easter Egg desbloqueado! Parabéns, dev!',
        'font-size:18px;color:#00e5ff;font-weight:bold;'
      );
      return '🏆 Achievement Unlocked: True Developer!';
    };
    return () => {
      delete (window as unknown as Record<string, unknown>).secretEgg;
    };
  }, [findEgg]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen relative dark"
      style={{
        background:
          'linear-gradient(180deg, hsl(230,25%,7%) 0%, hsl(250,30%,10%) 50%, hsl(230,25%,7%) 100%)',
        color: 'hsl(210,40%,98%)',
      }}
    >
      <Scene3D />
      {showConfetti && <ConfettiOverlay />}

      <div className="fixed top-5 right-5 z-[9000] font-mono text-xs text-[#c8ff00] px-4 py-2 rounded-xl glass flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        🥚 <span className="font-bold text-base">{eggsFound.size}</span>/
        {TOTAL_EGGS}
      </div>

      <StickerTray />

      <AchievementPopup
        icon={achievement?.icon || ''}
        name={achievement?.name || ''}
        visible={!!achievement}
      />

      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 text-center py-3 font-modern font-bold text-lg text-black"
            style={{
              background:
                'linear-gradient(90deg, #a855f7, #ff2d7b, #00e5ff, #c8ff00)',
            }}
          >
            🎮 KONAMI CODE ATIVADO! Você é um(a) verdadeiro(a) gamer! 🕹️
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />

      <RsvpSection onConfirm={launchConfetti} />

      <MarqueeStrip />

      <Card3D />

      <Timeline />

      <BubbleSection
        onAllPopped={() => {
          findEgg(
            'bubble-master',
            '🫧 Bubble Master',
            'Estourou todas as bolhas!'
          );
          launchConfetti();
        }}
      />

      <SecretConsole onEasterEgg={findEgg} />

      <PixelArt
        onMilestone={() =>
          findEgg('pixel-artist', '🎨 Pixel Artist', 'Pintou 50+ pixels!')
        }
      />

      <MapSection />

      <Footer onEasterEgg={findEgg} />
    </motion.div>
  );
}
