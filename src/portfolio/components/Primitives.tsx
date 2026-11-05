import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';

export const EASE_CUSTOM = [0.22, 1, 0.36, 1] as const;

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-primary"
      style={{ scaleX }}
    />
  );
};

export const TextReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}> = ({ text, className, delay = 0, as = 'h2' }) => {
  const Component = motion[as] as any;
  return (
    <Component
      className={className}
      initial={useReducedMotion() ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: 0 },
            }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.06,
              ease: EASE_CUSTOM,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};

export const MagneticButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className, strength = 0.3 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      className={clsx('inline-block', className)}
      style={{ x, y }}
      onMouseMove={(e) => {
        if (isTouch || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * strength);
        y.set((e.clientY - rect.top - rect.height / 2) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });

  return (
    <motion.div
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={(e) => {
        if (isTouch) return;
        const rect = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
        rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 8);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
};

export const ParallaxImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], isTouch ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale: 1.18 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
};

export const staggerVariants = {
  container: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EASE_CUSTOM,
      },
    },
  },
};
