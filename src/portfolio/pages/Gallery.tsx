import { useSiteData } from '@/admin/data/store';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { EASE_CUSTOM } from '../components/Primitives';

export const Gallery: React.FC = () => {
  const { galleryData } = useSiteData();
  const { l } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="gallery"
        title={l({ uz: 'Galereya', en: 'Gallery', ru: 'Галерея' })}
        subtitle={l({ uz: 'Lavhalar, sahna va kod orasidagi qisqalar.', en: 'Moments between stages, screens and code.', ru: 'Моменты между сценой и кодом.' })}
      />
      <Section>
        {!galleryData.length && <p className="py-16 text-center text-muted-foreground">{l({ uz: 'Tez orada.', en: 'Coming soon.', ru: 'Скоро.' })}</p>}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {galleryData.map((item, idx) => (
            <FadeIn key={item.id} delay={(idx % 3) * 0.08} className="break-inside-avoid">
              <button
                onClick={() => setActive(idx)}
                className="group relative block w-full overflow-hidden rounded-3xl border border-border cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={l(item.caption)}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="p-6 font-mono text-sm text-foreground">{l(item.caption)}</p>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>

        <AnimatePresence>
          {active !== null && galleryData[active] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-xl"
            >
              <motion.figure
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ duration: 0.4, ease: EASE_CUSTOM }}
                className="max-h-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryData[active].src}
                  alt={l(galleryData[active].caption)}
                  className="max-h-[80vh] w-full rounded-2xl border border-border object-contain"
                />
                <figcaption className="mt-4 text-center font-mono text-sm text-muted-foreground">
                  {l(galleryData[active].caption)}
                </figcaption>
              </motion.figure>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-6 top-6 rounded-full border border-border bg-card p-3 hover:border-primary cursor-pointer transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
};
