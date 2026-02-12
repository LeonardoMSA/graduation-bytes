import { motion } from 'framer-motion';
import { BevelBox } from '@/components/shared/BevelBox';
import { ClassicTitleBarButton } from './ClassicTitleBarButton';
import { THEME } from '@/components/shared/constants';

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  name: string;
  attendance: string;
  hasGuest: boolean;
  guestName: string;
  onConfirm: () => void;
  onEvolve: () => void;
}

export function ConfirmModal({
  show,
  onClose,
  name,
  attendance,
  hasGuest,
  guestName,
  onConfirm,
  onEvolve,
}: ConfirmModalProps) {
  if (!show) return null;

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

  const xpBtnDisabled: React.CSSProperties = {
    ...xpBtn,
    width: '100%',
    opacity: 0.55,
    cursor: 'not-allowed',
    filter: 'grayscale(0.15)',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-3"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose();
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
              onClick={onClose}
              aria-label="Fechar"
              style={{ all: 'unset', cursor: 'pointer' }}
            >
              <ClassicTitleBarButton label="✕" />
            </button>
          </div>

          <div style={{ padding: 'clamp(12px, 3.8vw, 18px)', background: THEME.winFace2 }}>
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
                  onConfirm();
                  onClose();
                }}
                style={{ ...xpBtn, flex: '1 1 140px' }}
              >
                Fechar
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  onClose();
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
  );
}
