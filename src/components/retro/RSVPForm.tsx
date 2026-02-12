import { useState } from 'react';
import { THEME } from '@/components/shared/constants';

interface RSVPFormProps {
  name: string;
  setName: (name: string) => void;
  attendance: string;
  setAttendance: (attendance: string) => void;
  hasGuest: boolean;
  setHasGuest: (has: boolean) => void;
  guestName: string;
  setGuestName: (name: string) => void;
  onConfirm: () => void;
  setIsConfirmed: (confirmed: boolean) => void;
}

export function RSVPForm({
  name,
  setName,
  attendance,
  setAttendance,
  hasGuest,
  setHasGuest,
  guestName,
  setGuestName,
  onConfirm,
  setIsConfirmed,
}: RSVPFormProps) {
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

  const canOpenConfirmModal = Boolean(name && attendance);

  return (
    <fieldset
      style={{
        borderTop: `2px solid ${THEME.winHighlight}`,
        borderLeft: `2px solid ${THEME.winHighlight}`,
        borderRight: `2px solid ${THEME.winShadow}`,
        borderBottom: `2px solid ${THEME.winShadow}`,
        padding: 'clamp(12px, 3.8vw, 18px)',
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
        onClick={onConfirm}
        disabled={!canOpenConfirmModal}
        style={{
          padding: '7px 16px',
          background: `linear-gradient(180deg, ${THEME.winHighlight} 0%, ${THEME.winFace2} 100%)`,
          borderTop: `2px solid ${THEME.winHighlight}`,
          borderLeft: `2px solid ${THEME.winHighlight}`,
          borderRight: `2px solid ${THEME.winShadow}`,
          borderBottom: `2px solid ${THEME.winShadow}`,
          fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
          fontSize: '11px',
          cursor: canOpenConfirmModal ? 'pointer' : 'not-allowed',
          width: '100%',
          opacity: canOpenConfirmModal ? 1 : 0.55,
        }}
      >
        Confirmar ✔
      </button>
    </fieldset>
  );
}
