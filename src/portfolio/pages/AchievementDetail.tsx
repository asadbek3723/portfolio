import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useParams } from '@/lib/router-compat';
import { useLanguage } from '../context/LanguageContext';
import { DetailLayout, LeadText, MediaGallery, DetailNotFound } from '../components/DetailLayout';
import { ProjectCard } from '../components/ProjectCard';
import { Quote } from 'lucide-react';
import type { Localized } from '../types';

const L = (uz: string, en: string, ru: string): Localized => ({ uz, en, ru });

export const AchievementDetail: React.FC = () => {
  const { achievementsData, projectsData } = useSiteData();
  const { slug } = useParams<{ slug: string }>();
  const { l } = useLanguage();
  const achievement = achievementsData.find((a) => a.slug === slug);

  if (!achievement || !achievement.detail) return <DetailNotFound backHref="/achievements" />;

  const d = achievement.detail;
  const nextAchievement = achievementsData[(achievementsData.indexOf(achievement) + 1) % achievementsData.length];
  const relatedProject = d.relatedProject
    ? projectsData.find((p) => p.slug === d.relatedProject)
    : undefined;

  const sections = [
    {
      id: 'story',
      label: L('Hikoya', 'Story', 'История'),
      content: <LeadText>{l(d.story)}</LeadText>,
    },
    {
      id: 'built',
      label: L('Nima yaratildi', 'What was built', 'Что создано'),
      content: <LeadText>{l(d.built)}</LeadText>,
    },
    ...(d.feedback
      ? [
          {
            id: 'feedback',
            label: L('Fikr', 'Feedback', 'Отзыв'),
            content: (
              <figure className="glass rounded-[2rem] p-8 md:p-12">
                <Quote className="h-10 w-10 text-primary" />
                <blockquote className="mt-6 font-display text-fluid-h2 font-bold leading-tight">
                  "{l(d.feedback.quote)}"
                </blockquote>
                <figcaption className="mt-6 font-mono text-sm text-muted-foreground">
                  — {d.feedback.author}
                </figcaption>
              </figure>
            ),
          },
        ]
      : []),
    ...(d.media.length > 0
      ? [{ id: 'gallery', label: L('Galereya', 'Gallery', 'Галерея'), content: <MediaGallery media={d.media} title={l(achievement.title)} /> }]
      : []),
    ...(relatedProject
      ? [
          {
            id: 'project',
            label: L('Loyiha', 'Project', 'Проект'),
            content: (
              <div className="max-w-xl">
                <ProjectCard project={relatedProject} />
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <DetailLayout
      backHref="/achievements"
      backLabel={l(L('Barcha yutuqlar', 'All achievements', 'Все достижения'))}
      eyebrow={achievement.date}
      title={l(achievement.title)}
      subtitle={l(achievement.description)}
      cover={d.cover}
      facts={[
        { label: l(L('Natija', 'Result', 'Итог')), value: l(achievement.place) },
        { label: l(L('Yil', 'Year', 'Год')), value: achievement.date },
        { label: l(L('Jamoa', 'Team', 'Команда')), value: l(d.team) },
      ]}
      sections={sections}
      next={{
        href: `/achievements/${nextAchievement!.slug}`,
        title: l(nextAchievement!.title),
        cover: nextAchievement!.cover,
        label: l(L('Keyingi yutuq', 'Next achievement', 'Следующее')),
      }}
    />
  );
};
