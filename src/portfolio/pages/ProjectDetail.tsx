import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useParams } from '@/lib/router-compat';
import { useLanguage } from '../context/LanguageContext';
import { DetailLayout, LeadText, MetricsGrid, BulletList, ActionButton, StackBadges, MediaGallery, DetailNotFound } from '../components/DetailLayout';
import type { Localized } from '../types';

const L = (uz: string, en: string, ru: string): Localized => ({ uz, en, ru });

export const ProjectDetail: React.FC = () => {
  const { projectsData } = useSiteData();
  const { slug } = useParams<{ slug: string }>();
  const { l } = useLanguage();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project || !project.detail) {
    return <DetailNotFound backHref="/projects" />;
  }

  const d = project.detail;
  const nextProject = projectsData[(projectsData.indexOf(project) + 1) % projectsData.length];

  const sections = [
    {
      id: 'overview',
      label: L('Loyiha haqida', 'Overview', 'Обзор'),
      content: <LeadText>{l(d.overview)}</LeadText>,
    },
    {
      id: 'contributions',
      label: L('Mening hissam', 'My contributions', 'Мой вклад'),
      content: <BulletList items={d.contributions} />,
    },
    {
      id: 'features',
      label: L('Xususiyatlar', 'Features', 'Функции'),
      content: (
        <div className="space-y-8">
          {d.features.map((f, i) => (
            <div key={i}>
              <h4 className="font-display text-xl font-bold">{l(f.title)}</h4>
              <p className="mt-2 leading-relaxed text-muted-foreground">{l(f.text)}</p>
            </div>
          ))}
        </div>
      ),
    },
    ...(d.metrics.length > 0
      ? [{ id: 'results', label: L('Natijalar', 'Results', 'Результаты'), content: <MetricsGrid metrics={d.metrics} /> }]
      : []),
    ...(d.stackGroups.length > 0
      ? [
          {
            id: 'stack',
            label: L('Texnologiyalar', 'Tech stack', 'Технологии'),
            content: (
              <div className="space-y-8">
                {d.stackGroups.map((sg, i) => (
                  <div key={i}>
                    <h4 className="mb-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                      {l(sg.group)}
                    </h4>
                    <StackBadges items={sg.items} />
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...(d.media.length > 0
      ? [{ id: 'gallery', label: L('Galereya', 'Gallery', 'Галерея'), content: <MediaGallery media={d.media} title={l(project.title)} /> }]
      : []),
  ];

  return (
    <DetailLayout
      backHref="/projects"
      backLabel={l(L('Barcha loyihalar', 'All projects', 'Все проекты'))}
      eyebrow={l(project.title)}
      title={l(project.title)}
      subtitle={l(project.summary)}
      cover={project.cover}
      facts={[
        { label: l(L('Rol', 'Role', 'Роль')), value: l(d.role) },
        { label: l(L('Mijoz', 'Client', 'Клиент')), value: d.client },
        { label: l(L('Muddat', 'Duration', 'Срок')), value: l(d.duration) },
        { label: l(L('Jamoa', 'Team', 'Команда')), value: l(d.team) },
        { label: l(L('Holat', 'Status', 'Статус')), value: l(d.status) },
      ].filter((fact) => fact.value.trim() !== '')}
      actions={
        <>
          {project.liveUrl && (
            <ActionButton href={project.liveUrl} external primary>
              {l(L('Demo', 'Live demo', 'Демо'))}
            </ActionButton>
          )}
          {project.repoUrl && (
            <ActionButton href={project.repoUrl} external>
              {l(L('Manba kodi', 'Source code', 'Исходный код'))}
            </ActionButton>
          )}
        </>
      }
      sections={sections}
      next={{
        href: `/projects/${nextProject!.slug}`,
        title: l(nextProject!.title),
        cover: nextProject!.cover,
        label: l(L('Keyingi loyiha', 'Next project', 'Следующий проект')),
      }}
    />
  );
};
