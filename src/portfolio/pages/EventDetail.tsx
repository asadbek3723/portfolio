import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useParams } from '@/lib/router-compat';
import { useLanguage } from '../context/LanguageContext';
import { DetailLayout, LeadText, BulletList, MetricsGrid, MediaGallery, DetailNotFound } from '../components/DetailLayout';
import type { Localized } from '../types';

const L = (uz: string, en: string, ru: string): Localized => ({ uz, en, ru });

export const EventDetail: React.FC = () => {
  const { eventsData } = useSiteData();
  const { slug } = useParams<{ slug: string }>();
  const { l } = useLanguage();
  const event = eventsData.find((e) => e.slug === slug);

  if (!event || !event.detail) return <DetailNotFound backHref="/events" />;

  const d = event.detail;
  const nextEvent = eventsData[(eventsData.indexOf(event) + 1) % eventsData.length];

  const sections = [
    {
      id: 'story',
      label: L('Hikoya', 'Story', 'История'),
      content: <LeadText>{l(d.story)}</LeadText>,
    },
    {
      id: 'highlights',
      label: L('Lahzalar', 'Highlights', 'Моменты'),
      content: <BulletList items={d.highlights} />,
    },
    ...(d.outcomes.length > 0
      ? [{ id: 'results', label: L('Natijalar', 'Results', 'Результаты'), content: <MetricsGrid metrics={d.outcomes} /> }]
      : []),
    ...(d.media.length > 0
      ? [{ id: 'gallery', label: L('Galereya', 'Gallery', 'Галерея'), content: <MediaGallery media={d.media} title={event.title} /> }]
      : []),
  ];

  return (
    <DetailLayout
      backHref="/events"
      backLabel={l(L('Barcha tadbirlar', 'All events', 'Все события'))}
      eyebrow={event.date}
      title={event.title}
      subtitle={l(event.description)}
      cover={d.cover}
      facts={[
        { label: l(L('Rol', 'Role', 'Роль')), value: l(event.role) },
        { label: l(L('Joy', 'Location', 'Место')), value: event.location },
        { label: l(L('Sana', 'Date', 'Дата')), value: event.date },
      ]}
      actions={
        d.links.length > 0 ? (
          <>
            {d.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium transition-all hover:border-primary hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </>
        ) : undefined
      }
      sections={sections}
      next={{
        href: `/events/${nextEvent!.slug}`,
        title: nextEvent!.title,
        cover: nextEvent!.cover,
        label: l(L('Keyingi tadbir', 'Next event', 'Следующее событие')),
      }}
    />
  );
};
