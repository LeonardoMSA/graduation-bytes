import { motion, AnimatePresence } from 'framer-motion';

interface AchievementPopupProps {
  icon: string;
  name: string;
  visible: boolean;
}

export function AchievementPopup({ icon, name, visible }: AchievementPopupProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: 100, x: '-50%', opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="fixed bottom-8 left-1/2 z-[99996] rounded-2xl px-6 py-4 flex items-center gap-3 font-mono text-sm whitespace-nowrap border border-[#c8ff00] backdrop-blur-2xl"
          style={{ background: 'rgba(10,10,15,0.95)' }}
        >
          <span className="text-2xl">{icon}</span>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] tracking-widest uppercase text-[#c8ff00]">
              Easter Egg Encontrado!
            </span>
            <span className="font-bold">{name}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
