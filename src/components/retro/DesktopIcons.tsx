export function DesktopIcons() {
  return (
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
  );
}
