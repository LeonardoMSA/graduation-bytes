import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { MouseEvent as ReactMouseEvent } from 'react';
import type { BubbleData, ExplosionParticle } from '@/components/shared/types';

const BUBBLES_DATA: Omit<BubbleData, 'popped'>[] = [
  { id: 0, emoji: '🎉', msg: 'Parabéns!', color: 'rgba(168,85,247,0.15)' },
  { id: 1, emoji: '🧠', msg: 'Genial!', color: 'rgba(255,45,123,0.15)' },
  { id: 2, emoji: '💜', msg: 'Orgulho!', color: 'rgba(0,229,255,0.15)' },
  { id: 3, emoji: '🔥', msg: 'Arrasa!', color: 'rgba(200,255,0,0.15)' },
  { id: 4, emoji: '🚀', msg: 'Sucesso!', color: 'rgba(168,85,247,0.15)' },
  { id: 5, emoji: '⭐', msg: 'Top!', color: 'rgba(255,45,123,0.15)' },
  { id: 6, emoji: '☕', msg: 'Café!', color: 'rgba(0,229,255,0.15)' },
  { id: 7, emoji: '💻', msg: 'Código!', color: 'rgba(200,255,0,0.15)' },
  { id: 8, emoji: '🎊', msg: 'Festa!', color: 'rgba(168,85,247,0.15)' },
  { id: 9, emoji: '❤️', msg: 'Love!', color: 'rgba(255,45,123,0.15)' },
];

interface BubbleSectionProps {
  onAllPopped: () => void;
}

export function BubbleSection({ onAllPopped }: BubbleSectionProps) {
  const [bubbles, setBubbles] = useState<BubbleData[]>(
    BUBBLES_DATA.map((b) => ({ ...b, popped: false }))
  );
  const [particles, setParticles] = useState<ExplosionParticle[]>([]);
  const [lastMsg, setLastMsg] = useState('');
  const poppedRef = useRef(0);

  const popBubble = (
    id: number,
    emoji: string,
    msg: string,
    e: ReactMouseEvent<HTMLDivElement>
  ) => {
    const bubble = bubbles.find((b) => b.id === id);
    if (!bubble || bubble.popped) return;

    setBubbles((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
    setLastMsg(msg);
    poppedRef.current++;

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const newParticles: ExplosionParticle[] = Array.from(
      { length: 12 },
      (_, i) => ({
        id: `${id}-${i}-${Date.now()}`,
        emoji,
        x: cx,
        y: cy,
        angle: (i / 12) * 360 + (Math.random() * 30 - 15),
        distance: Math.random() * 100 + 60,
      })
    );
    setParticles((prev) => [...prev, ...newParticles]);

    if (poppedRef.current === BUBBLES_DATA.length) {
      onAllPopped();
    }
  };

  const removeParticle = useCallback((id: string) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#c8ff00] mb-4">
          Interaja!
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-2 leading-tight">
          Estoure as <span className="text-[#ff2d7b]">bolhas</span> 🫧
        </h2>
        <p className="opacity-50 text-sm mb-8">
          Clique para estourar. Estoure todas para uma surpresa!
        </p>

        <div className="flex flex-wrap gap-4 justify-center py-8">
          {bubbles.map((b) => (
            <motion.div
              key={b.id}
              onClick={(e) => popBubble(b.id, b.emoji, b.msg, e)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl cursor-pointer relative"
              style={{ background: b.color }}
              animate={
                b.popped
                  ? { scale: 0, opacity: 0 }
                  : { y: [0, -10, 0] }
              }
              transition={
                b.popped
                  ? { duration: 0.3 }
                  : {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: b.id * 0.2,
                    }
              }
              whileHover={!b.popped ? { scale: 1.2 } : undefined}
            >
              {!b.popped && (
                <div
                  className="absolute -inset-1 rounded-full border-2 opacity-40 animate-spin-slow"
                  style={{
                    borderColor:
                      b.id % 2 === 0 ? '#c8ff00' : '#ff2d7b',
                  }}
                />
              )}
              {!b.popped && b.emoji}
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {lastMsg && (
            <motion.p
              key={lastMsg}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="font-modern text-xl font-bold text-[#ff2d7b] min-h-[40px]"
            >
              {lastMsg}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none z-[9998] text-xl sm:text-2xl"
          initial={{
            left: p.x,
            top: p.y,
            scale: 1,
            opacity: 1,
            x: '-50%',
            y: '-50%',
          }}
          animate={{
            left:
              p.x +
              Math.cos((p.angle * Math.PI) / 180) * p.distance,
            top:
              p.y +
              Math.sin((p.angle * Math.PI) / 180) * p.distance,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onAnimationComplete={() => removeParticle(p.id)}
        >
          {p.emoji}
        </motion.div>
      ))}
    </section>
  );
}
