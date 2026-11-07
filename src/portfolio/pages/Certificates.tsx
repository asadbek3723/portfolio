import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { Link } from '@/lib/router-compat';
import { Award, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const Certificates: React.FC = () => {
  const { certificatesData } = useSiteData();
  const { l } = useLanguage();
  return (
    <>
      <PageHeader
        eyebrow="certificates"
        title={l({ uz: 'Sertifikatlar', en: 'Certificates', ru: 'Сертификаты' })}
        subtitle={l({ uz: 'Doimiy o\'rganish — mening eng kuchli odatlarimdan biri.', en: 'Constant learning is one of my strongest habits.', ru: 'Постоянное обучение — одна из моих привычек.' })}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificatesData.map((cert, idx) => (
            <FadeIn key={cert.id} delay={(idx % 3) * 0.1}>
              <Link
                to={`/certificates/${cert.slug}`}
                data-cursor="view"
                className="group relative block h-full rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Award className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{cert.date}</span>
                </div>
                <h2 className="mt-6 font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                  {cert.title}
                </h2>
                <p className="mt-2 font-mono text-sm text-muted-foreground">{cert.issuer}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground">
                      {skill}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="absolute bottom-8 right-8 h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-primary" />
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-16 text-center text-muted-foreground">
            {l({ uz: 'Keyingi maqsad: ', en: 'Next goal: ', ru: 'Следующая цель: ' })}
            <Link to="/achievements" className="text-primary hover:underline">
              {l({ uz: 'yutuqlarni ko\'rish →', en: 'see achievements →', ru: 'достижения →' })}
            </Link>
          </p>
        </FadeIn>
      </Section>
    </>
  );
};
