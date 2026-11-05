import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className, id }) => {
  return (
    <section id={id} className={cn('mx-auto max-w-7xl px-5 py-10 md:px-12 md:py-16', className)}>
      {children}
    </section>
  );
};
