import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function GlitchTransition({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 4300),
      setTimeout(() => setPhase(4), 6000),
      setTimeout(onComplete, 7000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "#0C0C0C" }}
    >
      {phase < 2 && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0668BC 0%, #3794CF 30%, #077BC6 100%)",
              animation: "glitch-1 0.55s infinite steps(1)",
              opacity: phase === 0 ? 0.6 : 0.35,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0668BC 0%, #3794CF 30%, #077BC6 100%)",
              animation: "glitch-1 0.5s 0.1s infinite steps(1) reverse",
              mixBlendMode: "difference",
              opacity: 0.15,
            }}
          />
        </>
      )}

      {/* Scanline */}
      <div
        className="absolute left-0 right-0 h-1 pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.15)",
          animation: "scanline 1.5s linear infinite",
          boxShadow: "0 0 20px 5px rgba(255,255,255,0.05)",
        }}
      />

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="text-center"
          animate={{
            opacity: [0, 1, 0.9, 1],
            scale: phase >= 2 ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          {phase === 0 && (
            <p
              className="font-pixel text-2xl sm:text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
              style={{ color: "#A6CEE8", textShadow: "0 0 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {"> Buscando detalhes da festa..."}
            </p>
          )}
          {phase === 1 && (
            <p
              className="font-pixel text-2xl sm:text-4xl drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
              style={{ color: "#A6CEE8", textShadow: "0 0 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {"> Carregando endereço e horário..."}
            </p>
          )}

          {phase === 2 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-pixel text-2xl sm:text-4xl"
              style={{ color: "#CB8CC2" }}
            >
              {"> Preparando a página do convite..."}
            </motion.p>
          )}
          {phase === 3 && (
            <motion.div
              initial={{ opacity: 0.2, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-modern"
            >
              <p className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #CB8CC2, #CBBACE)' }}>
                Lembrem de confirmar a presença!
              </p>
            </motion.div>
          )}
          {phase === 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-modern"
            >
              <p className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #CB8CC2, #CBBACE)' }}>
                Preparados?
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Particles during phase 2+ */}
      {phase >= 2 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              initial={{
                x:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 800),
                y:
                  Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 600),
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                y: [null, Math.random() * -200],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.03,
                ease: "easeOut",
              }}
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                background: ["#077BC6", "#CB8CC2", "#3794CF", "#CBBACE"][i % 4],
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
