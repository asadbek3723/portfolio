import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const Uses: React.FC = () => {
  const { usesData } = useSiteData();
  const { l } = useLanguage();
  const groups = [...new Set(usesData.map((item) => item.group))];

  return (
    <>
      <PageHeader
        eyebrow="uses"
        title={l({ uz: 'Asboblarim', en: 'Uses', ru: 'Инструменты' })}
        subtitle={l({
          uz: 'Har kuni ishlatadigan jihozlar va dasturlarim.',
          en: 'The gear and software I use every day.',
          ru: 'Техника и программы, которыми пользуюсь.',
        })}
      />
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          {groups.map((group, gIdx) => (
            <div key={group}>
              <FadeIn>
                <h2 className="mb-6 font-mono text-sm uppercase tracking-[0.3em] text-primary">
                  0{gIdx + 1} — {group}
                </h2>
              </FadeIn>
              <div className="divide-y divide-border rounded-3xl border border-border bg-card">
                {usesData
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <FadeIn key={item.id} delay={0.05}>
                      <div className="flex items-center justify-between gap-4 p-6">
                        <span className="font-display text-lg font-bold">{item.name}</span>
                        <span className="font-mono text-sm text-muted-foreground">
                          {l(item.note)}
                        </span>
                      </div>
                    </FadeIn>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
};
