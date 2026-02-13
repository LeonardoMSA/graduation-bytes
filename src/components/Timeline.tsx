import { motion } from 'framer-motion';
import { TimelineItem } from './sections/TimelineItem';

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

export default function Timeline() {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center mb-16 font-modern bg-clip-text text-transparent"
        style={{ backgroundImage: 'linear-gradient(to right, #CB8CC2, #3794CF, #077BC6)' }}
      >
        Minha Trajetória
      </motion.h2>

      <div className="relative">
        <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#CB8CC2]/50 via-[#7BB1D9]/30 to-transparent" />
        {milestones.map((item, i) => (
          <TimelineItem key={item.year} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
