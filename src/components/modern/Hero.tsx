import { motion } from "framer-motion";

const BALLOON_SRC = "/assets/22_balloon.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background balloon icons - decorative, semi-transparent, responsive */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <img
          src={BALLOON_SRC}
          alt=""
          className="absolute opacity-[0.18] w-20 h-auto sm:w-28 md:w-32 lg:w-36 top-[8%] left-[4%] sm:top-[10%] sm:left-[6%] max-w-[120px]"
        />
        <img
          src={BALLOON_SRC}
          alt=""
          className="absolute opacity-[0.14] w-16 h-auto sm:w-24 md:w-28 top-[12%] right-[2%] sm:right-[5%] max-w-[100px] rotate-12"
        />
        <img
          src={BALLOON_SRC}
          alt=""
          className="absolute opacity-[0.16] w-20 h-auto sm:w-24 md:w-28 bottom-[18%] left-[2%] sm:left-[4%] max-w-[110px] -rotate-6"
        />
        <img
          src={BALLOON_SRC}
          alt=""
          className="absolute opacity-[0.12] w-20 h-auto sm:w-28 md:w-32 bottom-[12%] right-[6%] sm:right-[8%] max-w-[115px] rotate-[-8deg]"
        />
        <img
          src={BALLOON_SRC}
          alt=""
          className="absolute opacity-[0.1] w-14 h-auto sm:w-20 left-[12%] top-1/2 -translate-y-1/2 max-w-[80px] -rotate-12 hidden sm:block"
        />
        <img
          src={BALLOON_SRC}
          alt=""
          className="absolute opacity-[0.1] w-14 h-auto sm:w-20 right-[10%] top-1/2 -translate-y-1/2 max-w-[80px] rotate-[6deg] hidden sm:block"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6">
          <motion.img
            src="/assets/chapeu_festa.png"
            alt="Chapéu de festa"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
          />
          <motion.img
            src="/assets/chapeu_formatura.png"
            alt="Chapéu de formatura"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-16 h-16 sm:w-24 sm:h-24 object-contain mt-8 sm:mt-16"
          />

        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-modern mb-4 leading-tight">
          <span
            className="bg-clip-text text-transparent hero-title-glow"
            style={{
              backgroundImage: 'linear-gradient(to right, #CB8CC2, #3794CF, #077BC6)',
              textShadow: `
        0 0 6px rgba(255,255,255,0.25),
        0 0 28px rgba(55,148,207,0.18)
      `
            }}
          >
            Luiza Omena
          </span>
        </h1>


        <div className="mt-6 flex justify-center">
          <motion.img
            src="/assets/info_festa.png"
            alt="14 de março de 2026, início às 16h. Rua Antônio Virtruvio, 49. Formatura + Aniversário."
            className="max-w-[340px] sm:max-w-[420px] w-full h-auto object-contain drop-shadow-lg ml-2 sm:ml-4"
          />
        </div>

        <motion.div
          className="mt-16 opacity-40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="font-modern text-xs mb-2">Confirma aqui embaixo!</p>
          <span className="text-2xl">↓</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
