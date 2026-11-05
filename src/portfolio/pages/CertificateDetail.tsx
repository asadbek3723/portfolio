import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useParams } from '@/lib/router-compat';
import { useLanguage } from '../context/LanguageContext';
import { DetailLayout, LeadText, StackBadges, ActionButton, MediaGallery, DetailNotFound } from '../components/DetailLayout';
import type { Localized } from '../types';

const L = (uz: string, en: string, ru: string): Localized => ({ uz, en, ru });

export const CertificateDetail: React.FC = () => {
  const { certificatesData } = useSiteData();
  const { slug } = useParams<{ slug: string }>();
  const { l } = useLanguage();
  const cert = certificatesData.find((c) => c.slug === slug);

  if (!cert || !cert.detail) return <DetailNotFound backHref="/certificates" />;

  const d = cert.detail;
  const nextCert = certificatesData[(certificatesData.indexOf(cert) + 1) % certificatesData.length];

  const sections = [
    {
      id: 'about',
      label: L('Sertifikat haqida', 'About', 'О сертификате'),
      content: <LeadText>{l(d.description)}</LeadText>,
    },
    {
      id: 'skills',
      label: L("Ko'nikmalar", 'Skills gained', 'Навыки'),
      content: <StackBadges items={d.skills} />,
    },
    {
      id: 'certificate',
      label: L('Sertifikat', 'Certificate', 'Сертификат'),
      content: <MediaGallery media={[{ type: 'image', src: d.image }]} title={cert.title} />,
    },
  ];

  return (
    <DetailLayout
      backHref="/certificates"
      backLabel={l(L('Barcha sertifikatlar', 'All certificates', 'Все сертификаты'))}
      eyebrow={cert.issuer}
      title={cert.title}
      cover={undefined}
      facts={[
        { label: l(L('Beruvchi', 'Issuer', 'Выдан')), value: cert.issuer },
        { label: l(L('Sana', 'Date', 'Дата')), value: cert.date },
        { label: 'ID', value: d.credentialId },
        ...(d.hours ? [{ label: l(L('Soat', 'Hours', 'Часы')), value: `${d.hours}h` }] : []),
      ]}
      actions={
        d.verifyUrl ? (
          <ActionButton href={d.verifyUrl} external primary>
            {l(L('Tasdiqlash', 'Verify credential', 'Проверить'))}
          </ActionButton>
        ) : undefined
      }
      sections={sections}
      next={{
        href: `/certificates/${nextCert!.slug}`,
        title: nextCert!.title,
        label: l(L('Keyingi sertifikat', 'Next certificate', 'Следующий')),
      }}
    />
  );
};
