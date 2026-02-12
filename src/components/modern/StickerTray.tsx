import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STICKER_EMOJIS } from '@/components/shared/constants';
import type { PlacedSticker } from '@/components/shared/types';

export function StickerTray() {
  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([]);
  const [dragging, setDragging] = useState<{
    emoji: string;
    x: number;
    y: number;
  } | null>(null);
  const stickerIdRef = useRef(0);

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setDragging((prev) =>
        prev ? { ...prev, x: e.clientX, y: e.clientY } : null
      );
    };

    const handleMouseUp = () => {
      const id = stickerIdRef.current++;
      setPlacedStickers((prev) => [
        ...prev,
        {
          id,
          emoji: dragging.emoji,
          x: e.clientX,
          y: e.clientY,
          rotation: Math.random() * 30 - 15,
        },
      ]);
      setDragging(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const removeSticker = (id: number) => {
    setPlacedStickers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <>
      <div className="fixed bottom-5 left-5 z-[9000] flex flex-col gap-2 opacity-50 hover:opacity-100 transition-opacity">
        {STICKER_EMOJIS.map((emoji) => (
          <div
            key={emoji}
            onMouseDown={(e) => {
              e.preventDefault();
              setDragging({ emoji, x: e.clientX, y: e.clientY });
            }}
            className="w-12 h-12 rounded-xl glass flex items-center justify-center text-2xl cursor-grab hover:scale-110 hover:border-[#c8ff00] transition-all active:cursor-grabbing active:scale-95"
            title="Arraste-me!"
          >
            {emoji}
          </div>
        ))}
      </div>

      {dragging && (
        <div
          className="fixed z-[99997] text-5xl pointer-events-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          style={{ left: dragging.x - 24, top: dragging.y - 24 }}
        >
          {dragging.emoji}
        </div>
      )}

      <AnimatePresence>
        {placedStickers.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: s.rotation }}
            exit={{ scale: 0, opacity: 0, rotate: s.rotation + 180 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[9001] text-4xl cursor-pointer hover:scale-125 transition-transform drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            style={{ left: s.x - 18, top: s.y - 18 }}
            onClick={() => removeSticker(s.id)}
            title="Clique para remover"
          >
            {s.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}
