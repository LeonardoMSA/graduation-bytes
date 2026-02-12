import { motion, AnimatePresence } from 'framer-motion';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import Scene3D from './Scene3D';
import Timeline from './Timeline';
import MapSection from './MapSection';
import { useEffect, useState, useRef, useCallback } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

// ==================== TYPES ====================

interface BubbleData {
  id: number;
  emoji: string;
  msg: string;
  color: string;
  popped: boolean;
}

interface ExplosionParticle {
  id: string;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  distance: number;
}

interface PlacedSticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotation: number;
}

// ==================== CONSTANTS ====================

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

const STICKER_EMOJIS = ['⭐', '🎉', '💜', '🔥', '🚀'];

const PIXEL_COLORS = [
  '#c8ff00', '#ff2d7b', '#00e5ff', '#a855f7',
  '#f59e0b', '#10b981', '#ef4444', '#ffffff',
];

const MARQUEE_ITEMS = [
  'FORMATURA', 'CIÊNCIA DA COMPUTAÇÃO', 'ANIVERSÁRIO', '2026', 'LUIZA OMENA',
];

const TOTAL_EGGS = 10;

// ==================== HELPERS ====================

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ==================== CONFETTI ====================

function ConfettiOverlay() {
  const pieces = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 8 + 4}px`,
      height: `${Math.random() * 8 + 4}px`,
      background: ['#c8ff00', '#ff2d7b', '#00e5ff', '#a855f7', '#f59e0b', '#10b981'][i % 6],
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      animationDuration: `${Math.random() * 2 + 2}s`,
      animationDelay: `${Math.random() * 0.5}s`,
    }))
  ).current;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {pieces.map((style, i) => (
        <div
          key={i}
          className="absolute animate-confetti-fall"
          style={{
            left: style.left,
            width: style.width,
            height: style.height,
            background: style.background,
            borderRadius: style.borderRadius,
            animationDuration: style.animationDuration,
            animationDelay: style.animationDelay,
          }}
        />
      ))}
    </div>
  );
}

// ==================== RSVP SECTION ====================

function RsvpSection({ onConfirm }: { onConfirm: () => void }) {
  const [name, setName] = useState('');
  const [bringingGuest, setBringingGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const canSubmit = name.trim().length > 0;

  const handleConfirm = () => {
    if (!canSubmit) return;
    setConfirmed(true);
    onConfirm();
    setTimeout(() => setConfirmed(false), 4000);
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-lg mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#c8ff00] mb-4">
          Confirme presença
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-8 leading-tight">
          Vem <span className="text-[#c8ff00]">comemorar</span>?
        </h2>

        <div className="glass rounded-3xl p-8 sm:p-12">
          <p className="opacity-50 mb-8 leading-relaxed">
            Confirme sua presença e faça parte dessa celebração!
            A Luiza adoraria ter você lá. 💜
          </p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome *"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-6 text-sm font-mono placeholder:opacity-30 focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
          />

          <div className="mb-8">
            <AnimatePresence mode="wait">
              {!bringingGuest ? (
                <motion.button
                  key="add-guest-btn"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setBringingGuest(true)}
                  className="px-5 py-2.5 rounded-xl glass font-mono text-sm cursor-pointer hover:border-[#c8ff00] transition-all"
                >
                  Vou levar alguém +1
                </motion.button>
              ) : (
                <motion.div
                  key="guest-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Nome do acompanhante"
                    autoFocus
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono placeholder:opacity-30 focus:outline-none focus:border-[#c8ff00]/50 transition-colors"
                  />
                  <button
                    onClick={() => {
                      setBringingGuest(false);
                      setGuestName('');
                    }}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-lg hover:border-[#ff2d7b] transition-colors cursor-pointer shrink-0"
                    title="Remover acompanhante"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={canSubmit ? { scale: 1.05 } : undefined}
            whileTap={canSubmit ? { scale: 0.95 } : undefined}
            onClick={handleConfirm}
            disabled={!canSubmit}
            className={`px-10 py-4 rounded-full font-modern font-bold text-base tracking-wider transition-all duration-300 ${
              confirmed
                ? 'bg-emerald-500 text-white cursor-default'
                : canSubmit
                  ? 'bg-[#c8ff00] text-black hover:shadow-[0_0_40px_rgba(200,255,0,0.3)] cursor-pointer'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            {confirmed ? '✅ Presença Confirmada!' : 'Confirmar Presença 🎉'}
          </motion.button>

          <p className="font-mono text-xs opacity-30 mt-4">
            Ou mande uma msg no WhatsApp 📱
          </p>
        </div>
      </div>
    </section>
  );
}

// ==================== MARQUEE ====================

function MarqueeStrip() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="overflow-hidden py-6 border-y border-white/[0.08]">
      <div className="flex gap-12 animate-marquee hover:[animation-play-state:paused] w-max">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-modern text-xl sm:text-2xl font-bold whitespace-nowrap opacity-30 hover:opacity-100 hover:text-[#c8ff00] transition-all duration-300 cursor-default">
              {item}
            </span>
            <span className="text-[#c8ff00] opacity-30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ==================== 3D CARD ====================

function Card3D() {
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

// ==================== BUBBLE SECTION ====================

function BubbleSection({ onAllPopped }: { onAllPopped: () => void }) {
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

    // Create explosion particles from the bubble's position
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

      {/* Explosion particles - fixed overlay */}
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

// ==================== SECRET CONSOLE ====================

function SecretConsole({
  onEasterEgg,
}: {
  onEasterEgg: (id: string, name: string, desc: string) => void;
}) {
  const [lines, setLines] = useState<string[]>([
    '<span style="opacity:0.4;font-style:italic">// Bem-vindo ao terminal secreto da Luiza!</span>',
    '<span style="opacity:0.4;font-style:italic">// Digite "help" para ver os comandos disponíveis</span>',
    '<span style="color:#c8ff00">$</span> <span style="color:#00e5ff">echo</span> <span style="color:#ff2d7b">"Olá, visitante! 👋"</span>',
    'Olá, visitante! 👋',
  ]);
  const [input, setInput] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);

  const addLine = useCallback(
    (html: string) => setLines((prev) => [...prev, html]),
    []
  );

  const handleCommand = useCallback(
    (cmd: string) => {
      addLine(
        `<span style="color:#c8ff00">$</span> ${escapeHtml(cmd)}`
      );

      const commands: Record<string, () => string | null> = {
        help: () =>
          [
            '<span style="color:#00e5ff">Comandos disponíveis:</span>',
            '<span style="color:#c8ff00">help</span>     — Mostra este menu',
            '<span style="color:#c8ff00">whoami</span>   — Quem é você?',
            '<span style="color:#c8ff00">luiza</span>    — Sobre a formanda',
            '<span style="color:#c8ff00">party</span>    — 🎉🎉🎉',
            '<span style="color:#c8ff00">matrix</span>   — Pílula vermelha?',
            '<span style="color:#c8ff00">sudo</span>     — Tente se atrever...',
            '<span style="color:#c8ff00">coffee</span>   — Essencial',
            '<span style="color:#c8ff00">42</span>       — A resposta',
            '<span style="color:#c8ff00">clear</span>    — Limpar terminal',
            '<span style="color:#c8ff00">ls</span>       — Listar arquivos',
          ].join('<br/>'),

        whoami: () => {
          onEasterEgg('whoami', '🔍 Whoami', 'Rodou whoami no terminal!');
          return '<span style="color:#ff2d7b">visitante@formatura-luiza</span> (convidado VIP)';
        },

        luiza: () =>
          [
            '<span style="color:#ff2d7b">Luiza Omena</span> — Futura Bacharela em CC 🎓',
            'Apaixonada por código, café e resolver problemas impossíveis.',
            '<span style="opacity:0.4;font-style:italic">// she codes, she conquers</span>',
          ].join('<br/>'),

        party: () => {
          onEasterEgg('party', '🎉 Party Mode', 'Ativou o party mode!');
          return '🎉🎊🥳 PARTY MODE ACTIVATED 🥳🎊🎉';
        },

        matrix: () => {
          onEasterEgg('matrix', '💊 The Matrix', 'Escolheu a pílula vermelha!');
          return [
            '<span style="color:#00e5ff">Wake up, Neo...</span>',
            '<span style="color:#ff2d7b">The Matrix has you...</span>',
            '<span style="opacity:0.4;font-style:italic">Follow the white rabbit. 🐇</span>',
          ].join('<br/>');
        },

        sudo: () =>
          [
            '<span style="color:#ff2d7b">[sudo] senha para visitante:</span> ********',
            '<span style="color:#ff5f57">Acesso negado!</span> Bom try, hacker 😏',
          ].join('<br/>'),

        coffee: () => {
          onEasterEgg('coffee', '☕ Coffee Lover', 'Pediu café no terminal!');
          return [
            'Preparando café... ☕',
            '████████████████████ 100%',
            '<span style="color:#ff2d7b">Café pronto!</span> Agora sim, podemos codar! 💻',
          ].join('<br/>');
        },

        '42': () => {
          onEasterEgg('42', '🌌 Hitchhiker', 'Encontrou a resposta!');
          return [
            '<span style="color:#00e5ff">42</span> — A Resposta para a Vida, o Universo e Tudo Mais.',
            "<span style=\"opacity:0.4;font-style:italic\">// \"Don't Panic\" — Douglas Adams</span>",
          ].join('<br/>');
        },

        clear: () => {
          setLines([]);
          return null;
        },

        hack: () =>
          [
            '<span style="color:#ff5f57">⚠️ ALERTA DE SEGURANÇA ⚠️</span>',
            'Just kidding 😂 Isso aqui é um convite, não o Pentagon.',
            '<span style="opacity:0.4;font-style:italic">// mas legal que você tentou</span>',
          ].join('<br/>'),

        ls: () =>
          [
            '<span style="color:#c8ff00">drwxr-xr-x</span>  formatura/',
            '<span style="color:#c8ff00">drwxr-xr-x</span>  aniversario/',
            '-rw-r--r--  <span style="color:#ff2d7b">convite.html</span>',
            '-rw-r--r--  <span style="color:#ff2d7b">segredo.txt</span> <span style="opacity:0.4">← 🤔</span>',
            '-rwx------  <span style="color:#ff2d7b">.hidden_easter_egg</span>',
          ].join('<br/>'),

        'cat segredo.txt': () => {
          onEasterEgg('cat-segredo', '📄 Cat Master', 'Leu o arquivo secreto!');
          return [
            '<span style="color:#ff2d7b">Conteúdo de segredo.txt:</span>',
            '',
            '"Todo grande programador já foi um iniciante que não desistiu."',
            '',
            '<span style="opacity:0.4;font-style:italic">// — Luiza, provavelmente às 3h da manhã</span>',
          ].join('<br/>');
        },

        'cat .hidden_easter_egg': () => {
          onEasterEgg('hidden-egg', '🥚 Hidden Egg', 'Encontrou o arquivo oculto!');
          return [
            '<span style="color:#00e5ff">🏆 CONQUISTA DESBLOQUEADA!</span>',
            'Você encontrou o arquivo secreto!',
            '<span style="color:#ff2d7b">"A curiosidade é o motor da inovação."</span>',
          ].join('<br/>');
        },

        easter: () =>
          '🥚 Easter eggs: veja o contador no topo da tela!<br/><span style="opacity:0.4;font-style:italic">// Continue explorando...</span>',
      };

      const handler = commands[cmd];
      if (handler) {
        const result = handler();
        if (result) addLine(result);
      } else {
        addLine(
          `<span style="color:#ff5f57">comando não encontrado:</span> ${escapeHtml(cmd)}<br/><span style="opacity:0.4">Tente "help"</span>`
        );
      }
    },
    [addLine, onEasterEgg]
  );

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  return (
    <section
      className="py-24 px-6"
      style={{ background: 'hsl(250,30%,10%)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#c8ff00] mb-4">
          Para devs 🤓
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-2 leading-tight">
          Terminal <span className="text-[#c8ff00]">secreto</span>
        </h2>
        <p className="opacity-50 text-sm mb-8">
          Digite comandos para descobrir Easter Eggs! Tente:{' '}
          <code className="text-[#c8ff00]">help</code>
        </p>

        <div className="max-w-[700px] mx-auto rounded-2xl overflow-hidden border border-white/[0.08] bg-black/60 text-left">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="flex-1 text-center font-mono text-[11px] opacity-30">
              luiza@formatura:~
            </span>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            className="p-5 font-mono text-[13px] leading-[1.8] opacity-70 min-h-[200px] max-h-[300px] overflow-y-auto"
          >
            {lines.map((line, i) => (
              <div
                key={i}
                className="mb-1"
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>

          {/* Input */}
          <div className="px-5 py-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="text-purple-500 font-bold font-mono">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    handleCommand(input.trim().toLowerCase());
                    setInput('');
                  }
                }}
                placeholder="Digite um comando..."
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] text-[#c8ff00] placeholder:opacity-30"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== PIXEL ART ====================

function PixelArt({
  onMilestone,
}: {
  onMilestone: () => void;
}) {
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

        {/* Color palette */}
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

        {/* Grid */}
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

// ==================== STICKER TRAY ====================

function StickerTray() {
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

    const handleMouseUp = (e: globalThis.MouseEvent) => {
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
      {/* Tray */}
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

      {/* Dragging ghost */}
      {dragging && (
        <div
          className="fixed z-[99997] text-5xl pointer-events-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          style={{ left: dragging.x - 24, top: dragging.y - 24 }}
        >
          {dragging.emoji}
        </div>
      )}

      {/* Placed stickers - click to remove */}
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

// ==================== ACHIEVEMENT POPUP ====================

function AchievementPopup({
  icon,
  name,
  visible,
}: {
  icon: string;
  name: string;
  visible: boolean;
}) {
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

// ==================== MAIN COMPONENT ====================

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

        // Show achievement popup
        const icon = name.split(' ')[0];
        const label = `${name.split(' ').slice(1).join(' ')}: ${desc}`;
        setAchievement({ icon, name: label });
        clearTimeout(achievementTimerRef.current);
        achievementTimerRef.current = setTimeout(
          () => setAchievement(null),
          3500
        );

        // All eggs found
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

  // Konami code handler
  useEffect(() => {
    if (konamiActive) {
      findEgg('konami', '🎮 Konami Code', '↑↑↓↓←→←→BA');
      launchConfetti();
    }
  }, [konamiActive, findEgg, launchConfetti]);

  // Idle easter egg (30s of no activity)
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

  // Select-all easter egg
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

  // Console.log easter egg hint
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

      {/* Easter Egg Counter */}
      <div className="fixed top-5 right-5 z-[9000] font-mono text-xs text-[#c8ff00] px-4 py-2 rounded-xl glass flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        🥚 <span className="font-bold text-base">{eggsFound.size}</span>/
        {TOTAL_EGGS}
      </div>

      {/* Sticker Tray */}
      <StickerTray />

      {/* Achievement Popup */}
      <AchievementPopup
        icon={achievement?.icon || ''}
        name={achievement?.name || ''}
        visible={!!achievement}
      />

      {/* Konami Easter Egg Banner */}
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

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
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
              📅 14 de março de 2026 &nbsp;·&nbsp; 🕐 16h &nbsp;·&nbsp; 🎂
              Formatura + Aniversário
            </p>
          </div>

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

      {/* ========== RSVP (top, right after hero) ========== */}
      <RsvpSection onConfirm={launchConfetti} />

      {/* ========== MARQUEE ========== */}
      <MarqueeStrip />

      {/* ========== 3D CARD ========== */}
      <Card3D />

      {/* ========== TIMELINE ========== */}
      <Timeline />

      {/* ========== BUBBLE POP ========== */}
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

      {/* ========== SECRET CONSOLE ========== */}
      <SecretConsole onEasterEgg={findEgg} />

      {/* ========== PIXEL ART ========== */}
      <PixelArt
        onMilestone={() =>
          findEgg('pixel-artist', '🎨 Pixel Artist', 'Pintou 50+ pixels!')
        }
      />

      {/* ========== MAP ========== */}
      <MapSection />

      {/* ========== FOOTER ========== */}
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
            findEgg(
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
    </motion.div>
  );
}
