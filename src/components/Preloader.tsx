import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

/** Windows 2000-ish tokens + small lilac accent from your palette */
const THEME = {
  desktop: '#3A6EA5',
  titleBar: '#0A246A',
  titleText: '#FFFFFF',

  // classic UI grays
  winFace: '#D4D0C8',
  winFace2: '#ECE9D8',
  winShadow: '#808080',
  winDkShadow: '#404040',
  winHighlight: '#FFFFFF',
  winLight: '#F5F5F5',

  text: '#000000',
  subText: '#3B3B3B',

  // subtle personality accent (use little!)
  lilac: '#CBBACE',
  plum: '#A86AA8',

  // progress fill (Win2000 blue)
  progress1: '#2D78B7',
  progress2: '#0B6FB4',
};

const LOADER = {
  intervalMs: 180,
  completeDelayMs: 450,
};

// ===== Easter egg config =====
// Coloque suas fotos no /public/photos/... e use paths tipo "/photos/1.jpg"
const PHOTO_SOURCES = [
  '/photos/me_01.PNG',
  '/photos/me_02.jpeg',
];

const EASTER_EGG = {
  enabled: true,
  count: 28, // quantas fotos caindo
  durationMs: 1500, // quanto tempo dura antes de chamar onComplete
};

function BevelBox({
  children,
  radius = 10,
  style,
}: {
  children: React.ReactNode;
  radius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        borderRadius: radius,
        background: THEME.winFace,
        borderTop: `2px solid ${THEME.winHighlight}`,
        borderLeft: `2px solid ${THEME.winHighlight}`,
        borderRight: `2px solid ${THEME.winShadow}`,
        borderBottom: `2px solid ${THEME.winShadow}`,
        boxShadow: `inset 1px 1px 0 ${THEME.winLight}, inset -1px -1px 0 ${THEME.winDkShadow}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M6 24L32 12l26 12-26 12L6 24Z" fill={THEME.winDkShadow} />
      <path d="M14 28v10c0 2 9 8 18 8s18-6 18-8V28l-18 8-18-8Z" fill={THEME.lilac} />
      <path d="M54 26v16" stroke={THEME.plum} strokeWidth="3" strokeLinecap="round" />
      <circle cx="54" cy="44" r="4" fill={THEME.plum} />
    </svg>
  );
}

function BalloonIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <ellipse cx="32" cy="26" rx="16" ry="20" fill={THEME.plum} />
      <ellipse cx="26" cy="20" rx="6" ry="8" fill="white" opacity="0.35" />
      <path d="M28 46h8l-4 7-4-7Z" fill={THEME.lilac} />
      <path d="M32 53v9" stroke={THEME.winDkShadow} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function getStatusText(progress: number) {
  if (progress < 18) return 'Conectando...';
  if (progress < 45) return 'Buscando detalhes da festa...';
  if (progress < 72) return 'Carregando endereço e horário...';
  if (progress < 92) return 'Preparando a página do convite...';
  if (progress < 100) return 'Finalizando...';
  return 'Pronto!';
}

type RainItem = {
  id: string;
  src: string;
  leftVw: number; // 0..100
  size: number; // px
  rotate: number; // deg
  delay: number; // s
  duration: number; // s
  drift: number; // px
  blur: number; // px
  opacity: number;
};

function PhotoRain({
  show,
  items,
}: {
  show: boolean;
  items: RainItem[];
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="rain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 60,
            pointerEvents: 'none',
          }}
        >
          {items.map(it => (
            <motion.img
              key={it.id}
              src={it.src}
              alt=""
              aria-hidden="true"
              initial={{
                y: -120,
                x: 0,
                rotate: it.rotate,
                opacity: 0,
              }}
              animate={{
                y: '110vh',
                x: it.drift,
                rotate: it.rotate + (Math.random() > 0.5 ? 40 : -40),
                opacity: it.opacity,
              }}
              transition={{
                duration: it.duration,
                delay: it.delay,
                ease: 'easeIn',
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: `${it.leftVw}vw`,
                width: it.size,
                height: it.size,
                objectFit: 'cover',
                borderRadius: 10,
                filter: `blur(${it.blur}px)`,
                boxShadow:
                  '0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
                borderTop: `2px solid ${THEME.winHighlight}`,
                borderLeft: `2px solid ${THEME.winHighlight}`,
                borderRight: `2px solid ${THEME.winShadow}`,
                borderBottom: `2px solid ${THEME.winShadow}`,
                background: THEME.winFace2,
              }}
            />
          ))}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function Preloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [showRain, setShowRain] = useState(false);

  const statusText = useMemo(() => getStatusText(progress), [progress]);

  // Seeds fixos (pra não "pular" no re-render)
  const rainItems = useMemo<RainItem[]>(() => {
    const safePhotos = PHOTO_SOURCES.length ? PHOTO_SOURCES : ['/favicon.ico'];

    return Array.from({ length: EASTER_EGG.count }).map((_, i) => {
      const src = safePhotos[i % safePhotos.length];
      const leftVw = Math.random() * 100;
      const size = 54 + Math.random() * 56; // 54..110
      const rotate = -18 + Math.random() * 36;
      const delay = Math.random() * 0.25; // 0..0.25s (começa quase instant)
      const duration = 0.9 + Math.random() * 0.9; // 0.9..1.8s
      const drift = -40 + Math.random() * 80; // -40..40
      const blur = Math.random() * 0.6; // leve
      const opacity = 0.85 + Math.random() * 0.15;

      return {
        id: `rain-${i}-${Math.random().toString(16).slice(2)}`,
        src,
        leftVw,
        size,
        rotate,
        delay,
        duration,
        drift,
        blur,
        opacity,
      };
    });
  }, []);

  useEffect(() => {
    let finished = false;

    // se já tá fechando (por clique no X), para de mexer no progresso
    if (isClosing) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (finished) return 100;

        let step: number;

        if (prev < 45) {
          step = Math.random() * 10 + 7;
        } else if (prev < 72) {
          step = Math.random() * 3 + 1;
        } else if (prev < 92) {
          step = Math.random() * 6 + 3;
        } else {
          step = Math.random() * 5 + 2;
        }

        const next = prev + step;

        if (next >= 100) {
          finished = true;
          clearInterval(interval);
          setTimeout(onComplete, LOADER.completeDelayMs);
          return 100;
        }

        return next;
      });
    }, LOADER.intervalMs);

    return () => clearInterval(interval);
  }, [onComplete, isClosing]);

  const safeProgress = Math.min(progress, 100);
  const progressLabel = `${Math.round(safeProgress)}%`;

  function triggerCloseWithEasterEgg() {
    if (isClosing) return;

    setIsClosing(true);

    if (EASTER_EGG.enabled && PHOTO_SOURCES.length > 0) {
      setShowRain(true);
      window.setTimeout(() => {
        onComplete();
      }, EASTER_EGG.durationMs);
      return;
    }

    // fallback: só fecha normal
    onComplete();
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
        background: THEME.desktop,
      }}
    >
      {/* Easter egg overlay */}
      <PhotoRain show={showRain} items={rainItems} />

      {/* “Window” */}
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={{
          scale: isClosing ? 0.96 : 1,
          opacity: isClosing ? 0.0 : 1,
          y: isClosing ? 6 : 0,
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{ width: 520, maxWidth: '100%' }}
      >
        <BevelBox radius={8} style={{ width: '100%', maxWidth: '100%' }}>
          {/* Title bar */}
          <div
            style={{
              background: THEME.titleBar,
              color: THEME.titleText,
              padding: '8px 10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 0.1,
              userSelect: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  background: THEME.winFace2,
                  borderTop: `1px solid ${THEME.winHighlight}`,
                  borderLeft: `1px solid ${THEME.winHighlight}`,
                  borderRight: `1px solid ${THEME.winShadow}`,
                  borderBottom: `1px solid ${THEME.winShadow}`,
                }}
              />
              Convite.exe
            </div>

            {/* Classic buttons */}
            <div style={{ display: 'flex', gap: 6 }}>
              {['_', '□'].map(label => (
                <BevelBox
                  key={label}
                  radius={3}
                  style={{
                    width: 22,
                    height: 18,
                    display: 'grid',
                    placeItems: 'center',
                    background: THEME.winFace,
                    fontSize: 12,
                    lineHeight: 1,
                    padding: 0,
                    opacity: 0.9,
                  }}
                >
                  <span style={{ transform: 'translateY(-1px)' }}>{label}</span>
                </BevelBox>
              ))}

              {/* ✕ clicável */}
              <button
                type="button"
                onClick={triggerCloseWithEasterEgg}
                aria-label="Fechar"
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                }}
              >
                <BevelBox
                  radius={3}
                  style={{
                    width: 22,
                    height: 18,
                    display: 'grid',
                    placeItems: 'center',
                    background: THEME.winFace,
                    fontSize: 12,
                    lineHeight: 1,
                    padding: 0,
                  }}
                >
                  <span style={{ transform: 'translateY(-1px)' }}>✕</span>
                </BevelBox>
              </button>
            </div>
          </div>

          {/* Content area */}
          <div style={{ padding: 18 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  <GraduationCapIcon />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                >
                  <BalloonIcon />
                </motion.div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: THEME.text }}>
                  Abrindo o convite…
                </div>
                <div style={{ fontSize: 12, color: THEME.subText, marginTop: 4 }}>
                  {statusText}
                </div>

                {/* Progress group (classic) */}
                <div style={{ marginTop: 12 }}>
                  <div
                    style={{
                      height: 18,
                      background: '#FFFFFF',
                      borderTop: `1px solid ${THEME.winShadow}`,
                      borderLeft: `1px solid ${THEME.winShadow}`,
                      borderRight: `1px solid ${THEME.winHighlight}`,
                      borderBottom: `1px solid ${THEME.winHighlight}`,
                      padding: 2,
                    }}
                  >
                    <div
                      style={{
                        width: `${safeProgress}%`,
                        height: '100%',
                        minWidth: safeProgress > 0 ? 6 : 0,
                        transition: 'width 0.18s ease',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
                        background: `
                          repeating-linear-gradient(
                            90deg,
                            rgba(255,255,255,0.00) 0px,
                            rgba(255,255,255,0.00) 10px,
                            rgba(255,255,255,0.18) 10px,
                            rgba(255,255,255,0.18) 12px
                          ),
                          linear-gradient(
                            180deg,
                            ${THEME.progress2} 0%,
                            ${THEME.progress1} 100%
                          )
                        `,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: 6,
                      fontSize: 11,
                      color: THEME.subText,
                    }}
                  >
                    <span>Carregamento</span>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{progressLabel}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: classic “status bar” line */}
            <div
              style={{
                marginTop: 16,
                paddingTop: 10,
                borderTop: `1px solid ${THEME.winHighlight}`,
              }}
            >
              <div style={{ fontSize: 11, color: THEME.subText }}>
                Pode explorar a interface que tem algumas surpresas.
                <br />Só lembra de confirmar a presença, por favor. 🥹 🫶
              </div>
            </div>
          </div>
        </BevelBox>
      </motion.div>
    </motion.div>
  );
}
