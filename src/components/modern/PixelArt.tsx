import { useState } from "react";

// Toothless color palette — Night Fury
const COLORS: Record<number, { hex: string; label: string }> = {
  0: { hex: "transparent", label: "" },
  1: { hex: "#0a0a14", label: "Contorno" },
  2: { hex: "#1e1e32", label: "Corpo escuro" },
  3: { hex: "#373750", label: "Corpo" },
  4: { hex: "#50506c", label: "Barriga" },
  5: { hex: "#73c81e", label: "Olhos" },
  6: { hex: "#05050c", label: "Pupilas" },
  7: { hex: "#121220", label: "Narinas" },
  8: { hex: "#ffffff", label: "Brilho" },
  9: { hex: "#2a2a3e", label: "Asas" },
};

const GRID_COLS = 27;
const GRID_ROWS = 24;
const TOTAL_CELLS = GRID_COLS * GRID_ROWS;

// 27x24 Chibi Toothless — front-facing Night Fury
// prettier-ignore
const TOOTHLESS_GRID: number[] = [
  // Row 0 — ear tips
  0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,
  // Row 1
  0,1,2,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,2,1,0,
  // Row 2
  0,1,3,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,3,1,0,
  // Row 3
  1,2,3,2,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,2,3,2,1,
  // Row 4 — ears wider
  1,3,3,3,2,3,2,1,0,0,0,0,0,0,0,0,0,0,0,1,2,3,2,3,3,3,1,
  // Row 5 — ears meet skull
  1,2,3,3,3,3,3,2,1,1,1,1,1,1,1,1,1,1,1,2,3,3,3,3,3,2,1,
  // Row 6 — top of head
  0,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,1,0,
  // Row 7 — forehead bumps
  0,0,1,2,3,3,3,2,3,2,2,3,3,3,3,3,2,2,3,2,3,3,3,2,1,0,0,
  // Row 8 — brow
  0,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,0,0,
  // Row 9 — eye top outline
  0,0,1,2,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,2,1,0,0,
  // Row 10 — eye: highlight inner-upper
  0,0,1,2,1,5,5,8,8,1,3,3,3,3,3,3,3,1,8,8,5,5,1,2,1,0,0,
  // Row 11 — eye: pupil inner
  0,0,1,2,1,5,5,6,6,1,3,3,3,3,3,3,3,1,6,6,5,5,1,2,1,0,0,
  // Row 12 — eye: pupil inner
  0,0,1,2,1,5,5,6,6,1,3,3,3,3,3,3,3,1,6,6,5,5,1,2,1,0,0,
  // Row 13 — eye: all green
  0,0,1,2,1,5,5,5,5,1,3,3,3,3,3,3,3,1,5,5,5,5,1,2,1,0,0,
  // Row 14 — eye bottom outline
  0,0,1,2,1,1,1,1,1,1,3,3,3,3,3,3,3,1,1,1,1,1,1,2,1,0,0,
  // Row 15 — cheeks
  0,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,0,0,
  // Row 16 — nostrils
  0,0,0,1,2,3,3,3,3,3,7,7,3,3,3,7,7,3,3,3,3,3,2,1,0,0,0,
  // Row 17 — lower face
  0,0,0,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,0,0,0,
  // Row 18 — neck
  0,0,0,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,1,0,0,0,
  // Row 19 — lower body
  0,0,1,1,1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,1,1,1,0,0,
  // Row 20 — paw tops
  0,0,0,1,2,2,1,1,3,3,3,3,3,3,3,3,3,3,3,1,1,2,2,1,0,0,0,
  // Row 21 — paws
  0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,0,0,0,0,
  // Row 22 — feet
  0,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,
  // Row 23
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
];

export function PixelArt() {
  const [filled, setFilled] = useState<(number | null)[]>(
    Array(TOTAL_CELLS).fill(null),
  );
  const [selectedColor, setSelectedColor] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const paintableColors = Object.entries(COLORS).filter(
    ([key]) => Number(key) !== 0,
  );

  const fillCell = (index: number) => {
    if (TOOTHLESS_GRID[index] === 0) return;
    setFilled((prev) => {
      const next = [...prev];
      next[index] = selectedColor;
      return next;
    });
  };

  const filledCount = filled.filter((v) => v !== null).length;
  const totalPaintable = TOOTHLESS_GRID.filter((v) => v !== 0).length;
  const progress = Math.round((filledCount / totalPaintable) * 100);

  const getCellBackground = (index: number): string => {
    const target = TOOTHLESS_GRID[index];
    if (target === 0) return "transparent";
    if (showAnswer) return COLORS[target].hex;
    const userColor = filled[index];
    if (userColor !== null) return COLORS[userColor].hex;
    return "rgba(255,255,255,0.06)";
  };

  const getCellNumber = (index: number): number | null => {
    const target = TOOTHLESS_GRID[index];
    if (target === 0) return null;
    if (showAnswer) return null;
    if (filled[index] !== null) return null;
    return target;
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-xs tracking-[4px] uppercase text-[#7BB1D9] mb-4">
          Pinte!
        </p>
        <h2 className="font-modern text-3xl sm:text-4xl font-bold mb-2 leading-tight">
          Pinte por{" "}
          <span
            className="text-[#8BC34A]"
            style={{ textShadow: "0 0 20px rgba(139,195,74,0.4)" }}
          >
            Números
          </span>{" "}
          🐉
        </h2>
        <p className="opacity-50 text-sm mb-6">
          Descubra quem está escondido! Use a paleta e preencha cada número com
          a cor correspondente.
        </p>

        {/* Color palette */}
        <div className="flex gap-2 justify-center flex-wrap mb-2">
          {paintableColors.map(([key, { hex }]) => {
            const num = Number(key);
            return (
              <button
                key={num}
                onClick={() => setSelectedColor(num)}
                className="w-9 h-9 rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center font-mono text-xs font-bold"
                style={{
                  background: hex,
                  borderWidth: "2px",
                  borderStyle: "solid",
                  borderColor: num === selectedColor ? "#fff" : "transparent",
                  color:
                    num === 5 || num === 8 ? "#111" : "rgba(255,255,255,0.7)",
                }}
              >
                {num}
              </button>
            );
          })}
        </div>
        <div className="flex gap-3 justify-center flex-wrap mb-5 text-[10px] opacity-40 font-mono">
          {paintableColors.map(([key, { label }]) => (
            <span key={key}>
              {key}={label}
            </span>
          ))}
        </div>

        {/* Progress */}
        <div className="max-w-[540px] mx-auto mb-4">
          <div className="flex justify-between text-xs font-mono opacity-50 mb-1">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #8BC34A, #3794CF)",
              }}
            />
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid max-w-[540px] mx-auto p-3 bg-black/40 rounded-2xl border border-white/[0.08] select-none"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
            gap: 1,
          }}
          onMouseLeave={() => setIsDrawing(false)}
        >
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
            const number = getCellNumber(i);
            const isPaintable = TOOTHLESS_GRID[i] !== 0;

            return (
              <div
                key={i}
                className={`aspect-square rounded-[2px] flex items-center justify-center transition-colors duration-150 ${
                  isPaintable ? "cursor-pointer hover:brightness-125" : ""
                }`}
                style={{
                  background: getCellBackground(i),
                  fontSize: "clamp(4px, 1vw, 7px)",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "monospace",
                  lineHeight: 1,
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDrawing(true);
                  fillCell(i);
                }}
                onMouseEnter={() => {
                  if (isDrawing) fillCell(i);
                }}
                onMouseUp={() => setIsDrawing(false)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  fillCell(i);
                }}
              >
                {number}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={() => {
              setFilled(Array(TOTAL_CELLS).fill(null));
              setShowAnswer(false);
            }}
            className="px-5 py-2 rounded-full glass font-mono text-xs cursor-pointer opacity-50 hover:opacity-100 hover:border-[#CB8CC2] transition-all"
          >
            Limpar 🗑️
          </button>
          <button
            onClick={() => setShowAnswer((prev) => !prev)}
            className="px-5 py-2 rounded-full glass font-mono text-xs cursor-pointer opacity-50 hover:opacity-100 hover:border-[#8BC34A] transition-all"
          >
            {showAnswer ? "Esconder resposta 🙈" : "Ver resposta 👀"}
          </button>
        </div>
      </div>
    </section>
  );
}
