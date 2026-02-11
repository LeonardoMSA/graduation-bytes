import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onEvolve: () => void;
  /** Clicar em "Iniciar" volta pro loader (recomendado passar essa função do pai). */
  onBackToLoader?: () => void;
  /** Link do "Saiba mais" (ex: "/convite") */
  onLearnMore?: () => void;
  /** Se você não passar onLearnMore, usa href */
  learnMoreHref?: string;
}

const THEME = {
  desktop: '#3A6EA5',
  titleBar: '#0A246A',
  titleText: '#FFFFFF',

  winFace: '#D4D0C8',
  winFace2: '#ECE9D8',
  winShadow: '#808080',
  winDkShadow: '#404040',
  winHighlight: '#FFFFFF',
  winLight: '#F5F5F5',

  text: '#000000',
  subText: '#3B3B3B',

  lilac: '#CBBACE',
  plum: '#A86AA8',

  progress1: '#2D78B7',
  progress2: '#0B6FB4',
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

function ClassicTitleBarButton({ label }: { label: string }) {
  return (
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
        opacity: 0.9,
      }}
    >
      <span style={{ transform: 'translateY(-1px)' }}>{label}</span>
    </BevelBox>
  );
}

function StartCapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M6 24L32 12l26 12-26 12L6 24Z" fill="#0B0B0B" opacity="0.9" />
      <path d="M14 28v10c0 2 9 8 18 8s18-6 18-8V28l-18 8-18-8Z" fill={THEME.lilac} />
      <path d="M54 26v16" stroke={THEME.plum} strokeWidth="3" strokeLinecap="round" />
      <circle cx="54" cy="44" r="4" fill={THEME.plum} />
    </svg>
  );
}

export default function RetroDesktop({
  onEvolve,
  onBackToLoader,
  onLearnMore,
  learnMoreHref = '/convite',
}: Props) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [hasGuest, setHasGuest] = useState(false);
  const [guestName, setGuestName] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const [time, setTime] = useState(new Date());
  const [clickCount, setClickCount] = useState(0);

  const windowWidth = useMemo(() => 'min(520px, 100%)', []);
  const bodyPad = useMemo(() => 'clamp(12px, 3.8vw, 18px)', []);
  const innerPad = useMemo(() => 'clamp(12px, 4vw, 16px)', []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTitleClick = useCallback(() => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 3) return 0;
      return next;
    });
    setTimeout(() => setClickCount(0), 600);
  }, []);

  const handleConfirm = () => {
    if (name && attendance) setShowModal(true);
  };

  const fmtClock = (d: Date) =>
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const fmtDate = (d: Date) =>
    d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  const xpBtn: React.CSSProperties = {
    padding: '7px 16px',
    background: `linear-gradient(180deg, ${THEME.winHighlight} 0%, ${THEME.winFace2} 100%)`,
    borderTop: `2px solid ${THEME.winHighlight}`,
    borderLeft: `2px solid ${THEME.winHighlight}`,
    borderRight: `2px solid ${THEME.winShadow}`,
    borderBottom: `2px solid ${THEME.winShadow}`,
    fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
    fontSize: '11px',
    cursor: 'pointer',
    width: 'auto',
  };

  const xpBtnFull: React.CSSProperties = {
    ...xpBtn,
    width: '100%',
  };

  const xpBtnDisabled: React.CSSProperties = {
    ...xpBtnFull,
    opacity: 0.55,
    cursor: 'not-allowed',
    filter: 'grayscale(0.15)',
  };

  const xpInput: React.CSSProperties = {
    width: '100%',
    padding: '6px 8px',
    borderTop: `2px solid ${THEME.winShadow}`,
    borderLeft: `2px solid ${THEME.winShadow}`,
    borderRight: `2px solid ${THEME.winHighlight}`,
    borderBottom: `2px solid ${THEME.winHighlight}`,
    fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
    fontSize: '12px',
    background: '#fff',
    outline: 'none',
  };

  function handleStartClick() {
    if (onBackToLoader) {
      onBackToLoader();
      return;
    }
    window.location.reload();
  }

  const canOpenConfirmModal = Boolean(name && attendance);
  const canEvolve = isConfirmed;

  function handleLearnMoreClick(e: React.MouseEvent) {
    if (!onLearnMore) return; // deixa o link navegar
    e.preventDefault();
    onLearnMore();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #235EDC 0%, #56B0F0 30%, #3A8BC2 100%)',
        fontFamily: 'Tahoma, "MS Sans Serif", Geneva, sans-serif',
        fontSize: '12px',
        paddingBottom: '36px',
      }}
    >
      <style>{`
        .retro-wrap { width: min(520px, 100%); }
        .top-icons {
          position: absolute;
          top: 10px; left: 10px; right: 10px;
          z-index: 20;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          overflow-x: auto;
          padding-bottom: 6px;
          -webkit-overflow-scrolling: touch;
        }
        .top-icons::-webkit-scrollbar { height: 8px; }
        .top-icons::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.35); border-radius: 10px; }
        .top-icon {
          flex: 0 0 auto;
          width: 76px;
          display: flex;
          flex-direction: column;
          align-items: center;
          user-select: none;
          cursor: pointer;
        }
        .top-icon .lbl {
          color: #fff;
          font-size: 10px;
          margin-top: 2px;
          text-align: center;
          text-shadow: 0 1px 2px rgba(0,0,0,0.35);
          line-height: 1.1;
        }
        .learn-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: ${THEME.progress2};
          text-decoration: underline;
          cursor: pointer;
          user-select: none;
        }
        .learn-more:hover { filter: brightness(0.95); }

        @media (max-width: 420px) {
          .retro-menu { display: none; }
          .top-icon { width: 64px; }
        }
      `}</style>

      {/* Desktop Icons */}
      <div className="top-icons" aria-label="Ícones da área de trabalho">
        {[
          { icon: '💻', label: 'Meu Computador' },
          { icon: '📁', label: 'Meus Docs' },
          { icon: '🗑️', label: 'Lixeira' },
        ].map(item => (
          <button
            key={item.label}
            type="button"
            className="top-icon"
            onClick={() => {
              // placeholder: plugar easter eggs depois
            }}
            style={{
              all: 'unset',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: item.label.length > 10 ? 76 : 70,
            }}
          >
            <span className="text-2xl drop-shadow">{item.icon}</span>
            <span className="lbl">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Window */}
      <div className="flex items-center justify-center min-h-screen px-3 py-10">
        <div
          className="retro-wrap"
          style={{
            width: windowWidth,
            boxShadow: '3px 3px 12px rgba(0,0,0,0.5)',
            marginTop: 32,
          }}
        >
          {/* Title Bar */}
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
              userSelect: 'none',
              borderRadius: '8px 8px 0 0',
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

            <div style={{ display: 'flex', gap: 6 }}>
              <ClassicTitleBarButton label="_" />
              <ClassicTitleBarButton label="□" />
              <ClassicTitleBarButton label="✕" />
            </div>
          </div>

          {/* Menu Bar */}
          <div
            className="retro-menu"
            style={{
              background: THEME.winFace2,
              borderBottom: '1px solid #ACA899',
              padding: '2px 8px',
              fontSize: '11px',
            }}
          >
            <span className="mr-3 hover:underline cursor-pointer">Arquivo</span>
            <span className="mr-3 hover:underline cursor-pointer">Editar</span>
            <span className="hover:underline cursor-pointer">Ajuda</span>
          </div>

          {/* Body */}
          <div style={{ background: THEME.winFace2, padding: innerPad }}>
            {/* Event Info */}
            <div className="text-center mb-3">
              <h1
                className="font-bold mb-1 cursor-pointer select-none"
                onClick={handleTitleClick}
                style={{ fontSize: 'clamp(14px, 4.2vw, 16px)' }}
              >
                🎓🎂 Formatura + Aniversário
              </h1>

              <h2
                className="font-bold mb-2"
                style={{ color: THEME.progress2, fontSize: 'clamp(13px, 4vw, 14px)' }}
              >
                Luiza Omena
              </h2>

              <div
                style={{
                  borderTop: `1px solid ${THEME.winShadow}`,
                  borderLeft: `1px solid ${THEME.winShadow}`,
                  borderRight: `1px solid ${THEME.winHighlight}`,
                  borderBottom: `1px solid ${THEME.winHighlight}`,
                  padding: '8px',
                  background: '#fff',
                  marginBottom: '10px',
                  textAlign: 'left',
                  fontSize: '12px',
                }}
              >
                <p className="mb-0.5">
                  📅 <strong>Data:</strong> 14 de março de 2026
                </p>
                <p className="mb-0.5">
                  🕐 <strong>Horário:</strong> 16h
                </p>
                <p className="mb-0.5">
                  📍 <strong>Local:</strong> A definir
                </p>

                {/* ✅ Saiba mais abaixo do local */}
                <a
                  href={learnMoreHref}
                  onClick={handleLearnMoreClick}
                  className="learn-more"
                  aria-label="Saiba mais sobre o convite"
                >
                  Saiba mais <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* RSVP Form */}
            <fieldset
              style={{
                borderTop: `2px solid ${THEME.winHighlight}`,
                borderLeft: `2px solid ${THEME.winHighlight}`,
                borderRight: `2px solid ${THEME.winShadow}`,
                borderBottom: `2px solid ${THEME.winShadow}`,
                padding: bodyPad,
                marginBottom: '10px',
                background: THEME.winFace,
              }}
            >
              <legend className="font-bold px-1 text-xs">Confirmação de Presença</legend>

              <div className="mb-2.5">
                <label className="block mb-1 text-xs">Nome:</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    setIsConfirmed(false);
                  }}
                  style={xpInput}
                />
              </div>

              <div className="mb-2.5">
                <label className="block mb-1 text-xs">Confirmar presença:</label>

                <div className="flex gap-4" style={{ flexWrap: 'wrap', rowGap: 8 }}>
                  {[
                    ['yes', 'Sim ✅'],
                    ['no', 'Não ❌'],
                  ].map(([val, lbl]) => (
                    <label key={val} className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="att"
                        value={val}
                        checked={attendance === val}
                        onChange={e => {
                          setAttendance(e.target.value);
                          setIsConfirmed(false);
                        }}
                      />
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2.5">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasGuest}
                    onChange={e => {
                      setHasGuest(e.target.checked);
                      setIsConfirmed(false);
                    }}
                  />
                  Levar acompanhante
                </label>

                {hasGuest && (
                  <div className="mt-2">
                    <label className="block mb-1 text-xs">Nome do acompanhante:</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={e => {
                        setGuestName(e.target.value);
                        setIsConfirmed(false);
                      }}
                      style={xpInput}
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleConfirm}
                disabled={!canOpenConfirmModal}
                style={{
                  ...xpBtnFull,
                  opacity: canOpenConfirmModal ? 1 : 0.55,
                }}
              >
                Confirmar ✔
              </button>
            </fieldset>

            {/* Evolve Button (locked until confirmed) */}
            <div className="text-center">
              <button
                onClick={() => {
                  if (!canEvolve) return;
                  onEvolve();
                }}
                disabled={!canEvolve}
                title={!canEvolve ? 'Confirme a presença primeiro' : 'Ajustar a interface'}
                style={
                  canEvolve
                    ? {
                        ...xpBtnFull,
                        background: `linear-gradient(180deg, ${THEME.lilac} 0%, ${THEME.winFace2} 100%)`,
                        fontWeight: 'bold',
                      }
                    : {
                        ...xpBtnDisabled,
                        background: `linear-gradient(180deg, ${THEME.winFace} 0%, ${THEME.winFace2} 100%)`,
                        fontWeight: 'bold',
                      }
                }
              >
                {canEvolve ? 'Ajustar Interface' : 'Ajustar Interface (bloqueado)'}
              </button>

              {!canEvolve && (
                <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(0,0,0,0.55)' }}>
                  (primeiro confirma a presença ali em cima)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal mais simples */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-3"
          style={{ background: 'rgba(0,0,0,0.55)' }}
          onMouseDown={e => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ width: 'min(420px, 100%)', maxWidth: '100%' }}
          >
            <BevelBox radius={8} style={{ width: '100%', overflow: 'hidden' }}>
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
                  Confirmação
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  aria-label="Fechar"
                  style={{ all: 'unset', cursor: 'pointer' }}
                >
                  <ClassicTitleBarButton label="✕" />
                </button>
              </div>

              <div style={{ padding: bodyPad, background: THEME.winFace2 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: THEME.text }}>
                  {attendance === 'yes'
                    ? `Obrigada, ${name}! Presença confirmada ✅`
                    : `Obrigada, ${name}! Tá anotado aqui.`}
                </div>

                {hasGuest && guestName && attendance === 'yes' && (
                  <div style={{ marginTop: 8, fontSize: 12, color: THEME.subText }}>
                    Acompanhante: <strong>{guestName}</strong>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setIsConfirmed(true);
                      setShowModal(false);
                    }}
                    style={{ ...xpBtn, flex: '1 1 140px' }}
                  >
                    Fechar
                  </button>

                  <button
                    onClick={() => {
                      setIsConfirmed(true);
                      setShowModal(false);
                      onEvolve();
                    }}
                    disabled={attendance !== 'yes'}
                    title={
                      attendance === 'yes'
                        ? 'Ajustar a interface'
                        : 'Só libera ajustar quando confirmar presença (Sim)'
                    }
                    style={{
                      ...(attendance === 'yes'
                        ? {
                            ...xpBtn,
                            flex: '1 1 180px',
                            background: `linear-gradient(180deg, ${THEME.lilac} 0%, ${THEME.winFace2} 100%)`,
                            fontWeight: 'bold',
                          }
                        : {
                            ...xpBtnDisabled,
                            flex: '1 1 180px',
                            fontWeight: 'bold',
                          }),
                    }}
                  >
                    Ajustar interface
                  </button>
                </div>
              </div>
            </BevelBox>
          </motion.div>
        </div>
      )}

      {/* Taskbar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{
          background:
            'linear-gradient(180deg, #3168D5 0%, #2456B8 3%, #1941A0 50%, #1941A0 100%)',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 4px',
          borderTop: '1px solid #5B9FFF',
        }}
      >
        <button
          onClick={handleStartClick}
          title="Iniciar (voltar pro loader)"
          style={{
            background: 'linear-gradient(180deg, #3C9C3C 0%, #2D7E2D 50%, #1B601B 100%)',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            padding: '2px 10px 2px 8px',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: '11px',
            fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
            cursor: 'pointer',
          }}
        >
          <StartCapIcon />
          Reiniciar
        </button>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0 8px',
            minWidth: 0,
          }}
        >
          <div
            title="Convite.exe"
            style={{
              height: 26,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '0 10px',
              borderRadius: 6,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(0,0,0,0.08) 100%)',
              borderTop: '1px solid rgba(255,255,255,0.35)',
              borderLeft: '1px solid rgba(255,255,255,0.25)',
              borderRight: '1px solid rgba(0,0,0,0.25)',
              borderBottom: '1px solid rgba(0,0,0,0.25)',
              color: '#fff',
              fontSize: 11,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span aria-hidden="true">📨</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Convite.exe</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 8px',
            height: 26,
            borderLeft: '1px solid rgba(0,0,0,0.25)',
            color: '#fff',
            fontSize: 11,
          }}
          title="Relógio do sistema"
        >
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, alignItems: 'flex-end' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{fmtClock(time)}</span>
            <span style={{ fontSize: 10, opacity: 0.85 }}>{fmtDate(time)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
