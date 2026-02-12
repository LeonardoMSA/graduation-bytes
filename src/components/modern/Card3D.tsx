import { useRef } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

export function Card3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top = `${e.clientY - rect.top}px`;
    glow.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'rotateY(0) rotateX(0)';
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#c8ff00] mb-4">
          Sobre o evento
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-12 leading-tight">
          Uma noite para<br />
          <span className="text-[#c8ff00]">celebrar</span>
        </h2>

        <div className="max-w-sm mx-auto" style={{ perspective: '1000px' }}>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[3/4] rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-white/[0.08] backdrop-blur-2xl overflow-hidden flex flex-col items-center justify-center text-center p-10 transition-transform duration-100"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              ref={glowRef}
              className="absolute w-72 h-72 rounded-full pointer-events-none opacity-0 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle, rgba(200,255,0,0.15), transparent 70%)',
                transform: 'translate(-50%,-50%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[rgba(200,255,0,0.05)] to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="text-6xl mb-4 drop-shadow-[0_0_20px_rgba(200,255,0,0.3)]">🎓</div>
            <div className="font-modern text-2xl font-bold mb-2">Convite Especial</div>
            <p className="text-sm opacity-50 leading-relaxed">
              Você está convidado(a) para celebrar a formatura em Ciência da
              Computação e o aniversário da Luiza Omena. Uma noite de festa,
              amigos e muita diversão!
            </p>
            <div className="mt-5 font-mono text-[10px] opacity-30 tracking-widest uppercase">
              Passe o mouse para ver o efeito
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
