import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

interface CounterProps {
  to: number;
  suffix?: string | undefined;
}

export const Counter: React.FC<CounterProps> = ({ to, suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduce) { setValue(to); return; }
    const controls = animate(0, to, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, to, reduce]);

  return (
    <span ref={ref}>
      {/* The animated number is decorative; assistive tech and text extraction get the final value. */}
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
};
