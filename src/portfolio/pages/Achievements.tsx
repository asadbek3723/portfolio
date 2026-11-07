import { useSiteData } from '@/admin/data/store';
import React, { useState } from 'react';
import { Link } from '@/lib/router-compat';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const Achievements: React.FC = () => {
  const { achievementsData } = useSiteData();
  const { l } = useLanguage();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="achievements"
        title={l({ uz: 'Yutuqlar', en: 'Achievements', ru: 'Достижения' })}
        subtitle={l({ uz: 'Kichik g\'alabalar katta natijalarga yo\'l ochadi.', en: 'Small wins open the road to big results.', ru: 'Малые победы открывают путь к большим результатам.' })}
      />
      <Section>
        {!achievementsData.length && <p className="py-16 text-center text-muted-foreground">{l({ uz: 'Tez orada.', en: 'Coming soon.', ru: 'Скоро.' })}</p>}
        <div
          className="relative divide-y divide-border border-y border-border"
          onMouseLeave={() => setHovered(null)}
        >
          {achievementsData.map((a, idx) => (
            <FadeIn key={a.id} delay={idx * 0.05}>
              <Link
                to={`/achievements/${a.slug}`}
                onMouseEnter={() => setHovered(idx)}
                className="group relative flex flex-col gap-4 py-8 transition-all duration-500 md:flex-row md:items-center md:gap-10 md:py-10 md:hover:px-6"
              >
                <span className="min-w-[60px] font-mono text-sm text-muted-foreground">{a.date}</span>
                <div className="flex-1">
                  <h2 className="font-display text-2xl font-bold transition-colors group-hover:text-primary md:text-4xl">
                    {l(a.title)}
                  </h2>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">{l(a.description)}</p>
                </div>
                <div className="flex items-center gap-4 self-start md:self-auto">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-sm text-primary">
                    <Trophy className="h-4 w-4" />
                    {l(a.place)}
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-primary" />
                </div>
              </Link>
            </FadeIn>
          ))}

          {/* Floating thumbnail */}
          <AnimatePresence>
            {hovered !== null && achievementsData[hovered]?.cover && (
              <motion.img
                key={hovered}
                src={achievementsData[hovered].cover}
                alt=""
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute right-48 z-10 hidden h-44 w-64 rounded-2xl border border-border object-cover shadow-2xl xl:block"
                style={{ top: `${(hovered / achievementsData.length) * 100}%` }}
              />
            )}
          </AnimatePresence>
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-16 text-center text-muted-foreground">
            <Link to="/events" className="text-primary hover:underline">
              {l({ uz: 'Tadbirlarimni ko\'rish →', en: 'See the events behind them →', ru: 'События →' })}
            </Link>
          </p>
        </FadeIn>
      </Section>
    </>
  );
};
