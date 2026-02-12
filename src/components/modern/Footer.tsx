interface FooterProps {
  onEasterEgg: (id: string, name: string, desc: string) => void;
}

export function Footer({ onEasterEgg }: FooterProps) {
  return (
    <footer className="py-20 text-center border-t border-white/[0.08]">
      <div
        className="font-modern font-black leading-tight mb-6 bg-clip-text"
        style={{
          fontSize: 'clamp(2rem, 6vw, 5rem)',
          letterSpacing: '-2px',
          background:
            'linear-gradient(135deg, #c8ff00, #00e5ff, #ff2d7b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        14.03.26
      </div>
      <p className="font-mono text-[11px] tracking-[3px] uppercase opacity-30">
        Feito com 💜 e muito código · © 2026 Luiza Omena
      </p>
      <p
        className="font-mono text-[10px] opacity-15 mt-4 cursor-pointer hover:opacity-100 hover:text-[#ff2d7b] transition-all"
        onClick={(e) => {
          onEasterEgg(
            'footer-secret',
            '🕵️ Footer Spy',
            'Descobriu o texto escondido!'
          );
          const el = e.currentTarget;
          el.textContent =
            '💜 "Obrigada por estar aqui. Você é especial." — Luiza';
        }}
        title="Será que tem algo aqui?"
      >
        ██████████████████
      </p>
    </footer>
  );
}
