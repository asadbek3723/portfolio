import React from 'react';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-6 md:py-12 border-y border-border">
      <div className="animate-marquee flex w-max gap-12">
        {repeated.map((item, idx) => (
          <span
            key={idx}
            className="flex items-center gap-12 font-display text-3xl font-bold text-muted-foreground md:text-6xl whitespace-nowrap"
          >
            {item}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
