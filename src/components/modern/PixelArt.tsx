import { useState, useRef } from 'react';
import { PIXEL_COLORS } from '@/components/shared/constants';

interface PixelArtProps {
  onMilestone: () => void;
}

export function PixelArt({ onMilestone }: PixelArtProps) {
  const [currentColor, setCurrentColor] = useState(PIXEL_COLORS[0]);
  const [pixels, setPixels] = useState<(string | null)[]>(
    Array(256).fill(null)
  );
  const [isDrawing, setIsDrawing] = useState(false);
  const milestoneRef = useRef(false);

  const paintPixel = (index: number) => {
    setPixels((prev) => {
      const next = [...prev];
      next[index] = currentColor;
      const painted = next.filter(Boolean).length;
      if (painted >= 50 && !milestoneRef.current) {
        milestoneRef.current = true;
        onMilestone();
      }
      return next;
    });
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#c8ff00] mb-4">
          Crie!
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-2 leading-tight">
          Pixel <span className="text-purple-500">Art</span> 🎨
        </h2>
        <p className="opacity-50 text-sm mb-4">
          Pinte um presente para a Luiza! Clique nos pixels para colorir.
        </p>

        <div className="flex gap-2 justify-center flex-wrap mb-4">
          {PIXEL_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setCurrentColor(c)}
              className="w-8 h-8 rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background: c,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: c === currentColor ? '#fff' : 'transparent',
              }}
            />
          ))}
        </div>

        <div
          className="grid gap-[2px] max-w-[400px] mx-auto p-4 bg-black/40 rounded-2xl border border-white/[0.08] select-none"
          style={{ gridTemplateColumns: 'repeat(16, 1fr)' }}
          onMouseLeave={() => setIsDrawing(false)}
        >
          {pixels.map((color, i) => (
            <div
              key={i}
              className="aspect-square rounded-[2px] cursor-pointer transition-all duration-150 hover:scale-125 hover:z-10"
              style={{ background: color || 'rgba(255,255,255,0.04)' }}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDrawing(true);
                paintPixel(i);
              }}
              onMouseEnter={() => {
                if (isDrawing) paintPixel(i);
              }}
              onMouseUp={() => setIsDrawing(false)}
            />
          ))}
        </div>

        <button
          onClick={() => {
            setPixels(Array(256).fill(null));
            milestoneRef.current = false;
          }}
          className="mt-4 px-5 py-2 rounded-full glass font-mono text-xs cursor-pointer opacity-50 hover:opacity-100 hover:border-[#ff2d7b] transition-all"
        >
          Limpar 🗑️
        </button>
      </div>
    </section>
  );
}
