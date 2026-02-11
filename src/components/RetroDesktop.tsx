import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onEvolve: () => void;
}

export default function RetroDesktop({ onEvolve }: Props) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [hasGuest, setHasGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(new Date());
  const [clickCount, setClickCount] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTitleClick = useCallback(() => {
    setClickCount(prev => {
      const next = prev + 1;
      if (next >= 3) {
        setShowTerminal(true);
        return 0;
      }
      return next;
    });
    setTimeout(() => setClickCount(0), 600);
  }, []);

  const handleConfirm = () => {
    if (name && attendance) setShowModal(true);
  };

  const fmt = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const xpBtn = {
    padding: '3px 20px',
    background: 'linear-gradient(180deg, #fff 0%, #ECE9D8 100%)',
    border: '2px outset #D4D0C8',
    fontFamily: 'Tahoma, sans-serif',
    fontSize: '11px',
    cursor: 'pointer' as const,
  };

  const xpInput = {
    width: '100%',
    padding: '2px 4px',
    border: '2px inset #D4D0C8',
    fontFamily: 'Tahoma, sans-serif',
    fontSize: '12px',
    background: '#fff',
    outline: 'none',
  };

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
        paddingBottom: '30px',
      }}
    >
      {/* Desktop Icons */}
      <div className="p-3 flex flex-col gap-3 absolute top-0 left-0">
        {[
          { icon: '💻', label: 'Meu Computador' },
          { icon: '📁', label: 'Meus Docs' },
          { icon: '🗑️', label: 'Lixeira' },
        ].map(item => (
          <div key={item.label} className="flex flex-col items-center w-16 cursor-default group select-none">
            <span className="text-2xl drop-shadow">{item.icon}</span>
            <span className="text-white text-center text-[10px] mt-0.5 drop-shadow-sm">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Main Window - centered */}
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-[480px]" style={{ boxShadow: '3px 3px 12px rgba(0,0,0,0.5)' }}>
          {/* Title Bar */}
          <div style={{
            background: 'linear-gradient(180deg, #0997FF 0%, #0054E3 8%, #0066FF 40%, #0054E3 88%, #003BC9 100%)',
            borderRadius: '8px 8px 0 0',
            padding: '3px 4px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">📨</span>
              <span className="text-white font-bold text-xs" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
                Convite.exe
              </span>
            </div>
            <div className="flex gap-0.5">
              {['─', '□', '✕'].map((btn, i) => (
                <button key={i} className="flex items-center justify-center" style={{
                  width: '21px', height: '21px',
                  background: 'linear-gradient(180deg, #fff 0%, #D4D0C8 100%)',
                  border: '1px solid #0054E3', borderRadius: '3px', fontSize: '10px',
                }}>{btn}</button>
              ))}
            </div>
          </div>

          {/* Menu Bar */}
          <div style={{ background: '#ECE9D8', borderBottom: '1px solid #ACA899', padding: '1px 6px', fontSize: '11px' }}>
            <span className="mr-3 hover:underline cursor-pointer">Arquivo</span>
            <span className="mr-3 hover:underline cursor-pointer">Editar</span>
            <span className="hover:underline cursor-pointer">Ajuda</span>
          </div>

          {/* Window Body */}
          <div style={{ background: '#ECE9D8', padding: '14px 16px 16px' }}>
            {/* Event Info */}
            <div className="text-center mb-3">
              <h1
                className="text-base font-bold mb-1 cursor-pointer select-none"
                onClick={handleTitleClick}
              >
                🎓🎂 Formatura + Aniversário
              </h1>
              <h2 className="font-bold mb-2" style={{ color: '#0054E3', fontSize: '14px' }}>Luiza Omena</h2>
              <div style={{
                border: '1px solid #808080', borderRight: '1px solid #fff', borderBottom: '1px solid #fff',
                padding: '8px', background: '#fff', marginBottom: '10px', textAlign: 'left',
              }}>
                <p className="mb-0.5">📅 <strong>Data:</strong> 14 de março de 2026</p>
                <p className="mb-0.5">🕐 <strong>Horário:</strong> 16h</p>
                <p>📍 <strong>Local:</strong> A definir</p>
              </div>
            </div>

            {/* RSVP Form */}
            <fieldset style={{ border: '2px groove #D4D0C8', padding: '10px 12px', marginBottom: '10px' }}>
              <legend className="font-bold px-1 text-xs">Confirmação de Presença</legend>

              <div className="mb-2.5">
                <label className="block mb-0.5 text-xs">Nome:</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} style={xpInput} />
              </div>

              <div className="mb-2.5">
                <label className="block mb-0.5 text-xs">Confirmar presença:</label>
                <div className="flex gap-4">
                  {[['yes', 'Sim ✅'], ['no', 'Não ❌']].map(([val, lbl]) => (
                    <label key={val} className="flex items-center gap-1 text-xs cursor-pointer">
                      <input type="radio" name="att" value={val} onChange={e => setAttendance(e.target.value)} />
                      {lbl}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-2.5">
                <label className="flex items-center gap-1 text-xs cursor-pointer">
                  <input type="checkbox" checked={hasGuest} onChange={e => setHasGuest(e.target.checked)} />
                  Levar acompanhante
                </label>
                {hasGuest && (
                  <div className="mt-1.5">
                    <label className="block mb-0.5 text-xs">Nome do acompanhante:</label>
                    <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} style={xpInput} />
                  </div>
                )}
              </div>

              <button
                onClick={handleConfirm}
                disabled={!name || !attendance}
                style={{ ...xpBtn, opacity: name && attendance ? 1 : 0.5 }}
              >
                Confirmar ✔
              </button>
            </fieldset>

            {/* Evolve Button */}
            <div className="text-center">
              <button
                onClick={onEvolve}
                style={{
                  ...xpBtn,
                  background: 'linear-gradient(180deg, #E8FFE8 0%, #90EE90 100%)',
                  border: '2px outset #90EE90',
                  fontWeight: 'bold',
                }}
              >
                ⚡ Evoluir Interface ⚡
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div style={{ width: '300px', maxWidth: '90%', boxShadow: '3px 3px 12px rgba(0,0,0,0.5)' }}>
            <div style={{
              background: 'linear-gradient(180deg, #0997FF 0%, #0054E3 100%)',
              borderRadius: '8px 8px 0 0',
              padding: '3px 8px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span className="text-white text-xs font-bold">✅ Confirmação</span>
              <button onClick={() => setShowModal(false)} style={{
                width: '21px', height: '21px',
                background: 'linear-gradient(180deg, #fff 0%, #D4D0C8 100%)',
                border: '1px solid #0054E3', borderRadius: '3px', fontSize: '10px',
              }}>✕</button>
            </div>
            <div style={{ background: '#ECE9D8', padding: '20px', textAlign: 'center' }}>
              <div className="text-3xl mb-2">{attendance === 'yes' ? '🎉' : '😢'}</div>
              <p className="text-xs mb-2">
                {attendance === 'yes'
                  ? `Obrigada, ${name}! Sua presença foi confirmada!`
                  : `Que pena, ${name}! Sentiremos sua falta...`}
              </p>
              {hasGuest && guestName && attendance === 'yes' && (
                <p className="text-xs mb-2">Acompanhante: {guestName}</p>
              )}
              <button onClick={() => setShowModal(false)} style={xpBtn}>OK</button>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Easter Egg */}
      {showTerminal && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setShowTerminal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-mono text-sm max-w-md w-[90%] p-5"
            style={{ background: '#0C0C0C', border: '1px solid #00ff00', color: '#00ff00' }}
          >
            <p>{'>'} luiza@grad:~$ cat segredo.txt</p>
            <p className="mt-2">🥚 Easter egg encontrado!</p>
            <p>Luiza é uma dev de respeito 💻</p>
            <p>Bacharela em Ciência da Computação ✅</p>
            <p>E hoje completa mais um ano! 🎂</p>
            <p className="mt-2 animate-pulse">{'>'} _</p>
            <p className="text-[10px] mt-4 opacity-40">(clique para fechar)</p>
          </motion.div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 z-40" style={{
        background: 'linear-gradient(180deg, #3168D5 0%, #2456B8 3%, #1941A0 50%, #1941A0 100%)',
        height: '30px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2px', borderTop: '1px solid #5B9FFF',
      }}>
        <button style={{
          background: 'linear-gradient(180deg, #3C9C3C 0%, #2D7E2D 50%, #1B601B 100%)',
          border: 'none', borderRadius: '0 8px 8px 0',
          padding: '2px 10px 2px 6px', color: '#fff',
          fontWeight: 'bold', fontSize: '11px',
          fontFamily: 'Tahoma, sans-serif',
          height: '24px', display: 'flex', alignItems: 'center', gap: '4px',
          textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
        }}>
          🪟 Iniciar
        </button>
        <div style={{
          background: 'linear-gradient(180deg, #0F8AEE 0%, #0060C0 100%)',
          padding: '0 8px', height: '24px',
          display: 'flex', alignItems: 'center', gap: '6px',
          borderLeft: '1px solid #1561A0',
          fontSize: '11px', color: '#fff',
        }}>
          <span>🎓</span>
          <span>{fmt(time)}</span>
        </div>
      </div>
    </motion.div>
  );
}
