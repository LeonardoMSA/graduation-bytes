import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineItemProps {
  item: {
    year: string;
    title: string;
    description: string;
    emoji: string;
  };
  index: number;
}

export function TimelineItem({ item, index }: TimelineItemProps) {
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

      <div className="hidden sm:flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/30" />
      </div>

      <div className="flex-1 hidden sm:block" />
    </motion.div>
  );
}
