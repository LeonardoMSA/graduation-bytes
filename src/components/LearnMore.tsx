import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  /** Voltar pra tela retro */
  onBack?: () => void;
}

export default function LearnMore({ onBack }: Props) {
  const THEME = {
    navy: '#0A246A',
    deep: '#06122A',
    lilac: '#CBBACE',
    plum: '#A86AA8',
    paper: '#ECE9D8',
    ink: '#101114',
  };

  const EVENT = {
    name: 'Luiza Omena',
    title: 'Formatura e Aniversário',
    date: '14 de março de 2026',
    time: '16h',
    placeTitle: 'Local do Evento',
    place: 'Rua Antônio Vitrúvio, número 49, Poço da panela, Recife - PE.',
    rsvpTitle: 'Confirmação de presença',
    rsvpText: 'Gentileza confirmar presença para melhor organização do evento.',
    rsvpNote: '(a confirmação é realizada na primeira tela)',
    mapsHref: 'https://maps.google.com',
    mapEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.641387635871!2d-34.927826824703295!3d-8.03585879199102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7ab190a56d46115%3A0x4752e50a206efaf0!2sR.%20Ant%C3%B4nio%20Vitr%C3%BAvio%20-%20Po%C3%A7o%20da%20Panela%2C%20Recife%20-%20PE%2C%2052061-210!5e0!3m2!1sen!2sbr!4v1770832595877!5m2!1sen!2sbr',
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `
          radial-gradient(900px 600px at 20% 10%, rgba(203,186,206,0.28), rgba(0,0,0,0) 55%),
          radial-gradient(900px 600px at 80% 18%, rgba(168,106,168,0.20), rgba(0,0,0,0) 55%),
          linear-gradient(180deg, ${THEME.navy} 0%, #071A3A 55%, ${THEME.deep} 100%)
        `,
      }}
    >
      <style>{`
        .shell{
          max-width: 900px;
          margin: 0 auto;
          padding: 14px 16px 28px;
        }

        /* ===== Card principal ===== */
        .card{
          position: relative;
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(236,233,216,0.985), rgba(236,233,216,0.94));
          box-shadow: 0 28px 80px rgba(0,0,0,0.38);
          overflow: hidden;
        }

        .card::before{
          content:"";
          position:absolute;
          inset: 12px;
          border-radius: 18px;
          border: 1px solid rgba(10,36,106,0.22);
          pointer-events:none;
        }

        .corner{
          position:absolute;
          width: 86px;
          height: 86px;
          opacity: 0.33;
          pointer-events:none;
          background:
            radial-gradient(circle at 30% 30%, ${THEME.lilac} 0%, rgba(0,0,0,0) 55%),
            radial-gradient(circle at 70% 70%, ${THEME.plum} 0%, rgba(0,0,0,0) 55%);
        }
        .c1{ top:-18px; left:-18px; border-bottom-right-radius: 90px; }
        .c2{ top:-18px; right:-18px; border-bottom-left-radius: 90px; }
        .c3{ bottom:-18px; left:-18px; border-top-right-radius: 90px; }
        .c4{ bottom:-18px; right:-18px; border-top-left-radius: 90px; }

        .rule{
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(10,36,106,0) 0%,
            rgba(10,36,106,0.20) 18%,
            rgba(168,106,168,0.32) 50%,
            rgba(10,36,106,0.20) 82%,
            rgba(10,36,106,0) 100%
          );
        }

        /* tipografia */
        .serif{ font-family: ui-serif, Georgia, "Times New Roman", Times, serif; }
        .sans{ font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; }

        /* voltar discreto */
        .btn-back{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:10px 14px;
          border-radius:14px;
          font-weight:600;
          font-size:14px;
          color: rgba(255,255,255,0.92);
          border:1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.08);
          transition: transform 180ms ease, filter 180ms ease;
          user-select:none;
        }
        .btn-back:hover{ transform: translateY(-1px); filter: brightness(0.98); }

        /* ===== Detalhes (data/hora/local) ===== */
        .detailsWrap{
          border-radius: 18px;
          padding: 14px;
          background: linear-gradient(180deg, rgba(255,255,255,0.58) 0%, rgba(255,255,255,0.40) 100%);
          border: 1px solid rgba(10,36,106,0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55);
        }

        .detailsGrid{
          display:grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .detailItem{
          padding: 12px;
          border-radius: 14px;
          background: rgba(255,255,255,0.35);
          border: 1px solid rgba(10,36,106,0.12);
        }

        .detailRow{
          display:flex;
          align-items:center;
          gap: 12px;
        }

        .label{
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.10em;
          color: rgba(10,36,106,0.70);
        }

        .value{
          font-size: 14px;
          font-weight: 700;
          color: rgba(0,0,0,0.78);
          line-height: 1.15;
          word-break: break-word;
        }

        .pillHint{
          display:inline-block;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(10,36,106,0.14);
          background: rgba(255,255,255,0.40);
          color: rgba(10,36,106,0.70);
          font-size: 12px;
        }

        .sep{
          display:none;
        }

        @media (min-width: 640px){
          .detailsGrid{
            grid-template-columns: 1fr auto 1fr auto 1fr;
            gap: 0;
            align-items: stretch;
          }
          .detailItem{
            border-radius: 14px;
          }
          .sep{
            display:grid;
            place-items:center;
            padding: 0 8px;
          }
          .sepLine{
            width:1px;
            height: 64%;
            background: linear-gradient(
              180deg,
              rgba(10,36,106,0) 0%,
              rgba(10,36,106,0.18) 35%,
              rgba(168,106,168,0.22) 65%,
              rgba(10,36,106,0) 100%
            );
          }
        }

        /* ===== Mapa integrado ===== */
        .mapWrap{
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(10,36,106,0.18);
          background: linear-gradient(180deg, rgba(255,255,255,0.56), rgba(255,255,255,0.38));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.55);
        }

        .mapHeader{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          padding: 12px 14px;
        }

        .mapTitle{
          display:flex;
          align-items:center;
          gap: 10px;
          min-width:0;
        }

        .mapTitleText{
          font-weight: 700;
          font-size: 13px;
          color: rgba(10,36,106,0.92);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mapLink{
          font-size: 12px;
          font-weight: 700;
          color: ${THEME.plum};
          text-decoration: none;
          white-space: nowrap;
        }
        .mapLink:hover{ text-decoration: underline; }

        .mapFrame{
          width: 100%;
          height: 260px;
          border: 0;
          display:block;
          filter: invert(0.92) hue-rotate(190deg) saturate(0.55) brightness(0.82) contrast(0.95);
        }

        @media (min-width: 640px){
          .mapFrame{ height: 320px; }
        }

        /* respira no mobile */
        @media (max-width: 520px){
          .shell{ padding-top: 12px; }
        }
      `}</style>

      <div className="shell">
        <div className="flex items-center justify-end mb-4">
          {onBack ? (
            <button type="button" onClick={onBack} className="btn-back sans">
              ← voltar
            </button>
          ) : null}
        </div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="corner c1" />
          <div className="corner c2" />
          <div className="corner c3" />
          <div className="corner c4" />

          <div className="px-5 sm:px-10 py-8 sm:py-10">
            {/* Centro bonito */}
            <div className="text-center">
              <div className="serif text-3xl sm:text-5xl font-semibold" style={{ color: THEME.ink }}>
                {EVENT.title}
              </div>

              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="rule w-16 sm:w-24" />
                <span
                  className="sans text-xs sm:text-sm font-semibold"
                  style={{
                    color: THEME.navy,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                  }}
                >
                  {EVENT.name}
                </span>
                <span className="rule w-16 sm:w-24" />
              </div>

              <p className="mt-4 sans text-sm sm:text-base text-black/70 leading-relaxed max-w-[56ch] mx-auto">
                {EVENT.name} tem a satisfação de convidar para a celebração de sua formatura e aniversário.
              </p>
            </div>

            <div className="mt-7 rule" />

            {/* Detalhes integrados */}
            <div className="mt-8 detailsWrap">
              <div className="detailsGrid">
                {/* Data */}
                <div className="detailItem">
                  <div className="detailRow">
                    <StampIcon kind="calendar" />
                    <div>
                      <div className="label sans">Data</div>
                      <div className="value sans" style={{ marginTop: 2 }}>
                        {EVENT.date}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sep">
                  <div className="sepLine" />
                </div>

                {/* Horário */}
                <div className="detailItem">
                  <div className="detailRow">
                    <StampIcon kind="clock" />
                    <div>
                      <div className="label sans">Horário</div>
                      <div className="value sans" style={{ marginTop: 2 }}>
                        {EVENT.time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="sep">
                  <div className="sepLine" />
                </div>

                {/* Local */}
                <div className="detailItem">
                  <div className="detailRow">
                    <StampIcon kind="pin" />
                    <div className="min-w-0">
                      <div className="label sans">{EVENT.placeTitle}</div>
                      <div className="value sans" style={{ marginTop: 2 }}>
                        {EVENT.place}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa (alinhado e no mesmo “tom”) */}
            <div className="mt-6 mapWrap">
              <div className="mapHeader">
                <div className="mapTitle">
                  <MiniPinIcon />
                  <div className="mapTitleText sans">{EVENT.placeTitle}</div>
                </div>

                <a
                  href={EVENT.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mapLink sans"
                >
                  Abrir no Google Maps →
                </a>
              </div>

              <div className="rule" />

              <iframe
                src={EVENT.mapEmbedSrc}
                className="mapFrame"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do evento"
              />
            </div>

            <div className="mt-7 rule" />

            {/* RSVP elegante */}
            <div className="mt-6 text-center">
              <div className="sans font-semibold" style={{ color: THEME.navy }}>
                {EVENT.rsvpTitle}
              </div>
              <div className="mt-1 sans text-sm text-black/70">{EVENT.rsvpText}</div>
              <div className="mt-2 sans text-xs text-black/55">{EVENT.rsvpNote}</div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

/** Ícones desenhados (sem emoji) */
function StampIcon({ kind }: { kind: 'calendar' | 'clock' | 'pin' }) {
  const stroke = 'rgba(10,36,106,0.78)';
  const fill = 'rgba(168,106,168,0.10)';

  const common = {
    width: 34,
    height: 34,
    viewBox: '0 0 48 48',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  };

  return (
    <div
      aria-hidden="true"
      style={{
        width: 44,
        height: 44,
        borderRadius: 14,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(255,255,255,0.45)',
        border: '1px solid rgba(10,36,106,0.14)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
        flex: '0 0 auto',
      }}
    >
      {kind === 'calendar' && (
        <svg {...common}>
          <rect x="10" y="14" width="28" height="22" rx="5" stroke={stroke} strokeWidth="2" fill={fill} />
          <path d="M14 12v6M34 12v6" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <path d="M10 20h28" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
          <path d="M16 26h7" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
          <path d="M16 31h11" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.9" />
        </svg>
      )}

      {kind === 'clock' && (
        <svg {...common}>
          <circle cx="24" cy="24" r="14" stroke={stroke} strokeWidth="2" fill={fill} />
          <path d="M24 16v9l6 3" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 10v3" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </svg>
      )}

      {kind === 'pin' && (
        <svg {...common}>
          <path
            d="M24 41s10-9.2 10-17.2C34 16.7 29.5 12 24 12s-10 4.7-10 11.8C14 31.8 24 41 24 41Z"
            stroke={stroke}
            strokeWidth="2"
            fill={fill}
          />
          <circle cx="24" cy="24" r="4.2" stroke={stroke} strokeWidth="2" fill="rgba(255,255,255,0.35)" />
        </svg>
      )}
    </div>
  );
}

/** Pinzinho menor pro header do mapa */
function MiniPinIcon() {
  const stroke = 'rgba(10,36,106,0.78)';
  const fill = 'rgba(203,186,206,0.22)';

  return (
    <div
      aria-hidden="true"
      style={{
        width: 30,
        height: 30,
        borderRadius: 12,
        display: 'grid',
        placeItems: 'center',
        background: 'rgba(255,255,255,0.45)',
        border: '1px solid rgba(10,36,106,0.14)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.55)',
        flex: '0 0 auto',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 41s10-9.2 10-17.2C34 16.7 29.5 12 24 12s-10 4.7-10 11.8C14 31.8 24 41 24 41Z"
          stroke={stroke}
          strokeWidth="2.2"
          fill={fill}
        />
        <circle cx="24" cy="24" r="4.2" stroke={stroke} strokeWidth="2.2" fill="rgba(255,255,255,0.35)" />
      </svg>
    </div>
  );
}
