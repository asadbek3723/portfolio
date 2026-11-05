import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, subtitle }) => {
  const words = title.split(' ');

  return (
    <header className="relative overflow-hidden px-5 pb-6 pt-24 md:px-12 md:pb-16 md:pt-40">
      <div className="grid-lines pointer-events-none absolute inset-0" />
      <div className="bg-orb animate-orb pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <p className="mb-3 md:mb-6 font-mono text-xs uppercase tracking-[0.3em] text-primary">
          / {eyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom mr-3">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-4 md:mt-8 max-w-2xl text-base md:text-lg text-muted-foreground md:text-xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </header>
  );
};
