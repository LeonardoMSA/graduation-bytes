import { useState, useEffect, useCallback } from 'react';

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

export function useKonamiCode() {
  const [activated, setActivated] = useState(false);
  const [index, setIndex] = useState(0);

  const handleKey = useCallback((e: KeyboardEvent) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === KONAMI[index]) {
      const next = index + 1;
      if (next === KONAMI.length) {
        setActivated(true);
        setIndex(0);
        setTimeout(() => setActivated(false), 5000);
      } else {
        setIndex(next);
      }
    } else {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return activated;
}
