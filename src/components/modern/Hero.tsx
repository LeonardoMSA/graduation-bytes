import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-6xl sm:text-7xl mb-6"
        >
          🎓
        </motion.div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-modern mb-4 leading-tight">
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #CB8CC2, #3794CF, #077BC6)', textShadow: '0 0 40px rgba(55,148,207,0.25)' }}>
            Luiza Omena
          </span>
        </h1>

        <p className="text-lg sm:text-xl font-modern opacity-70 mb-2">
          Bacharela em Ciência da Computação
        </p>

        <div className="glass rounded-2xl inline-block px-6 sm:px-8 py-4 mt-6">
          <p className="font-modern text-sm sm:text-base opacity-80">
            📅 14 de março de 2026 &nbsp;·&nbsp; 🕐 16h &nbsp;·&nbsp; 🎂
            Formatura + Aniversário
          </p>
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
