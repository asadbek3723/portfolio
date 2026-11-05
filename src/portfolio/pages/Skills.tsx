import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const Skills: React.FC = () => {
  const { skillsData } = useSiteData();
  const { l } = useLanguage();

  const categories = [
    { key: 'frontend', label: { uz: 'Frontend', en: 'Frontend', ru: 'Фронтенд' } },
    { key: 'backend', label: { uz: 'Backend', en: 'Backend', ru: 'Бэкенд' } },
    { key: 'tools', label: { uz: 'Asboblar', en: 'Tools', ru: 'Инструменты' } },
  ];

  return (
    <>
      <PageHeader
        eyebrow="skills"
        title={l({ uz: "Ko'nikmalar", en: 'Skills', ru: 'Навыки' })}
        subtitle={l({
          uz: "Har kuni chuqurroq o'rganaman — bu ro'yxat har oy yangilanadi.",
          en: 'I learn deeper every day — this list gets updated monthly.',
          ru: 'Каждый день узнаю что-то новое — список обновляется.',
        })}
      />
      <Section>
        <div className="space-y-16">
          {categories.map((cat, catIdx) => (
            <div key={cat.key}>
              <FadeIn>
                <h2 className="mb-8 font-mono text-sm uppercase tracking-[0.3em] text-primary">
                  0{catIdx + 1} — {l(cat.label)}
                </h2>
              </FadeIn>
              <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
                {skillsData
                  .filter((skill) => skill.category === cat.key)
                  .map((skill, skillIdx) => (
                    <FadeIn key={skill.id} delay={skillIdx * 0.05}>
                      <div className="flex items-baseline justify-between">
                        <span className="font-display text-xl font-bold">
                          {skill.name}
                        </span>
                        <span className="font-mono text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
                        <motion.div
                          className="h-full rounded-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: skillIdx * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
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
