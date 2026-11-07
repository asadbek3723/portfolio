import { MatchCta } from '../components/MatchCta';
import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { ProjectCard } from '../components/ProjectCard';

export const Projects: React.FC = () => {
  const { projectsData } = useSiteData();
  const { t } = useLanguage();

  return (
    <>
      <PageHeader eyebrow={t('projects')} title={t('projects')} />
      <Section>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} headingLevel={2} />
          ))}
        </div>
        <MatchCta text={{ uz: "Sizning loyihangizga qaysi ishim o'xshashligini AI aniqlab bersin.", en: 'Let AI find which of my projects is closest to yours.', ru: 'Пусть AI найдёт проект, похожий на ваш.' }} />
      </Section>
    </>
  );
};
