import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStoredRsvp, saveRsvp } from '@/lib/rsvpStorage';
import type { RsvpStorage } from '@/components/shared/constants';

interface RsvpSectionProps {
  onConfirm: () => void;
}

export function RsvpSection({ onConfirm }: RsvpSectionProps) {
  const [name, setName] = useState('');
  const [bringingGuest, setBringingGuest] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [alreadyConfirmed, setAlreadyConfirmed] = useState<RsvpStorage | null>(null);

  useEffect(() => {
    setAlreadyConfirmed(getStoredRsvp());
  }, []);

  const canSubmit = name.trim().length > 0 && !alreadyConfirmed;

  const handleConfirm = () => {
    if (!canSubmit) return;
    saveRsvp({
      confirmed: true,
      name: name.trim(),
      hasGuest: bringingGuest,
      guestName: guestName.trim() || undefined,
    });
    setConfirmed(true);
    setAlreadyConfirmed(getStoredRsvp());
    onConfirm();
    setTimeout(() => setConfirmed(false), 4000);
  };

  if (alreadyConfirmed) {
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
            <p className="text-[#c8ff00] font-modern font-bold mb-4">
              ✅ Você só precisa confirmar uma vez. Sua presença já está confirmada!
            </p>
            <p className="opacity-70 mb-6 leading-relaxed">
              Se precisar alterar algo (nome, acompanhante, etc.), entre em contato comigo pelo WhatsApp.
            </p>
            <p className="font-mono text-xs opacity-50">
              Ou mande uma msg no WhatsApp 📱
            </p>
          </div>
        </div>
      </section>
    );
  }

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
