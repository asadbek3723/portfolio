import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useParams } from '@/lib/router-compat';
import { useLanguage } from '../context/LanguageContext';
import { DetailLayout, LeadText, BulletList, ActionButton, DetailNotFound } from '../components/DetailLayout';
import { ProjectCard } from '../components/ProjectCard';
import type { Localized } from '../types';

const L = (uz: string, en: string, ru: string): Localized => ({ uz, en, ru });

export const ServiceDetail: React.FC = () => {
  const { servicesData, projectsData } = useSiteData();
  const { slug } = useParams<{ slug: string }>();
  const { l } = useLanguage();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service || !service.detail) return <DetailNotFound backHref="/services" />;

  const d = service.detail;
  const nextService = servicesData[(servicesData.indexOf(service) + 1) % servicesData.length];

  const sections = [
    {
      id: 'overview',
      label: L('Xizmat haqida', 'Overview', 'Обзор'),
      content: <LeadText>{l(d.overview)}</LeadText>,
    },
    {
      id: 'includes',
      label: L('Nima kiradi', "What's included", 'Что включено'),
      content: <BulletList items={d.included} />,
    },
    {
      id: 'process',
      label: L('Jarayon', 'Process', 'Процесс'),
      content: (
        <div className="space-y-8">
          {d.process.map((step, i) => (
            <div key={i} className="flex gap-6">
              <span className="mt-1 shrink-0 font-mono text-sm text-primary">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{l(step.title)}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{l(step.text)}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'packages',
      label: L('Narxlar', 'Packages', 'Пакеты'),
      content: (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.packages.map((pkg, i) => (
            <div
              key={i}
              className={`glass rounded-3xl p-8 ${pkg.highlighted ? 'border-primary/60 ring-1 ring-primary/30' : ''}`}
            >
              <p className="font-display text-2xl font-bold">{l(pkg.name)}</p>
              <p className="mt-2 text-3xl font-extrabold font-display text-primary">{l(pkg.price)}</p>
              <ul className="mt-6 space-y-3">
                {pkg.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-2 text-muted-foreground">
                    <span className="mt-1 text-primary">✦</span>
                    {l(feat)}
                  </li>
                ))}
              </ul>
              <ActionButton href="/contact" primary className="mt-8 w-full justify-center">
                {l(L("Buyurtma qilish", "Get started", "Заказать"))}
              </ActionButton>
            </div>
          ))}
        </div>
      ),
    },
    ...(d.faq.length > 0
      ? [
          {
            id: 'faq',
            label: L('Savollar', 'FAQ', 'Вопросы'),
            content: (
              <div className="divide-y divide-border border-y border-border">
                {d.faq.map((item, i) => (
                  <details key={i} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold">
                      {l(item.q)}
                      <span className="text-primary transition-transform duration-300 group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-muted-foreground">{l(item.a)}</p>
                  </details>
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...(d.relatedProjects.length > 0
      ? [
          {
            id: 'projects',
            label: L('Loyihalar', 'Related projects', 'Проекты'),
            content: (
              <div className="grid gap-8 md:grid-cols-2">
                {d.relatedProjects
                  .map((slug) => projectsData.find((p) => p.slug === slug))
                  .filter(Boolean)
                  .map((p, i) => (
                    <ProjectCard key={p!.id} project={p!} index={i} />
                  ))}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <DetailLayout
      backHref="/services"
      backLabel={l(L('Barcha xizmatlar', 'All services', 'Все услуги'))}
      eyebrow={l(d.tagline)}
      title={l(service.title)}
      subtitle={l(d.overview)}
      cover={d.cover}
      facts={[
        { label: l(L('Narx', 'Price', 'Цена')), value: l(service.price) },
        { label: l(L('Muddat', 'Timeline', 'Срок')), value: l(d.timeline) },
        { label: l(L('Bosqichlar', 'Steps', 'Этапы')), value: String(d.process.length) },
      ]}
      actions={
        <ActionButton href="/contact" primary>
          {l(L('Loyihani muhokama qilish', 'Discuss your project', 'Обсудить проект'))}
        </ActionButton>
      }
      sections={sections}
      next={{
        href: `/services/${nextService!.slug}`,
        title: l(nextService!.title),
        cover: nextService!.cover,
        label: l(L('Keyingi xizmat', 'Next service', 'Следующая услуга')),
      }}
    />
  );
};
