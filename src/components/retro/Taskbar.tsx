import { StartCapIcon } from '@/components/icons/StartCapIcon';

interface TaskbarProps {
  onStartClick: () => void;
  time: Date;
}

export function Taskbar({ onStartClick, time }: TaskbarProps) {
  const fmtClock = (d: Date) =>
    d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const fmtDate = (d: Date) =>
    d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

  return (
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
        onClick={onStartClick}
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
  );
}
