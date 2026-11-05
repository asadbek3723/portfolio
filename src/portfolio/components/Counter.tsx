import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface CounterProps {
  to: number;
  suffix?: string | undefined;
}

export const Counter: React.FC<CounterProps> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};
