import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const Testimonials: React.FC = () => {
  const { testimonialsData } = useSiteData();
  const { t, l } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t('testimonials')} title={t('testimonials')} />
      <Section>
        {!testimonialsData.length && <p className="py-16 text-center text-muted-foreground">{l({ uz: 'Tez orada.', en: 'Coming soon.', ru: 'Скоро.' })}</p>}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsData.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.1} className="glass rounded-3xl p-8">
              <p className="text-lg leading-relaxed font-display">"{l(item.quote)}"</p>
              <p className="mt-6 text-sm text-muted-foreground">
                — {item.name}, {item.role}
              </p>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
};
