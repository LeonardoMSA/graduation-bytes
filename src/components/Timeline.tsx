import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    year: '2022',
    title: 'Início da Jornada',
    description: 'Primeiro contato com a Ciência da Computação. Tudo começou com um "Hello, World!"',
    emoji: '🚀',
  },
  {
    year: '2023',
    title: 'Primeiros Projetos',
    description: 'Aprendendo algoritmos, estruturas de dados e descobrindo a paixão pelo código.',
    emoji: '💡',
  },
  {
    year: '2024',
    title: 'Evolução',
    description: 'Projetos mais complexos, hackathons, e a descoberta de novas áreas da computação.',
    emoji: '📈',
  },
  {
    year: '2025',
    title: 'Últimos Semestres',
    description: 'TCC, estágios, amizades para a vida toda e muuuito café ☕',
    emoji: '🎯',
  },
  {
    year: '2026',
    title: 'Formatura + Aniversário!',
    description: 'O grande dia chegou! Hora de celebrar tudo isso e mais um ano de vida 🎂',
    emoji: '🎓',
  },
];

function TimelineItem({ item, index }: { item: typeof milestones[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-4 sm:gap-8 mb-12 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-col sm:flex-row`}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className={`flex-1 ${isLeft ? 'sm:text-right' : 'sm:text-left'} text-center`}>
        <div className="glass rounded-2xl p-5 sm:p-6 inline-block">
          <span className="text-3xl mb-2 block">{item.emoji}</span>
          <span className="text-xs font-mono opacity-60 block mb-1">{item.year}</span>
          <h3 className="text-lg font-bold font-modern mb-1">{item.title}</h3>
          <p className="text-sm opacity-70 font-modern">{item.description}</p>
        </div>
      </div>

      {/* Center dot */}
      <div className="hidden sm:flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30" />
      </div>

      <div className="flex-1 hidden sm:block" />
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center mb-16 font-modern bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Minha Trajetória
      </motion.h2>

      {/* Timeline line */}
      <div className="relative">
        <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-transparent" />
        {milestones.map((item, i) => (
          <TimelineItem key={item.year} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
