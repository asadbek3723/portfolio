import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const CursorOrb: React.FC = () => {
  const { l } = useLanguage();
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const orbX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const orbY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const badgeX = useSpring(mouseX, { stiffness: 700, damping: 40 });
  const badgeY = useSpring(mouseY, { stiffness: 700, damping: 40 });

  const [isHoveringView, setIsHoveringView] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    setIsFinePointer(mq.matches);
    const handler = () => setIsFinePointer(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor="view"]');
      setIsHoveringView(!!target);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [mouseX, mouseY, isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orb opacity-20 will-change-transform md:block"
        style={{ x: orbX, y: orbY }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary font-mono text-xs font-semibold uppercase tracking-widest text-primary-foreground md:flex"
        style={{ x: badgeX, y: badgeY }}
        animate={{
          width: isHoveringView ? 88 : 0,
          height: isHoveringView ? 88 : 0,
          opacity: isHoveringView ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {isHoveringView && l({ uz: "Ko'rish", en: 'View', ru: 'Смотреть' })}
      </motion.div>
    </>
  );
};
