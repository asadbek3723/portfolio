import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { Link } from '@/lib/router-compat';
import { Download, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { safeUrl } from '@/lib/safe-url';

export const CV: React.FC = () => {
  const { profileData, timelineData, skillsData } = useSiteData();
  const { l } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow="cv"
        title={l({ uz: 'Rezyume', en: 'Resume', ru: 'Резюме' })}
        subtitle={l({
          uz: "Bitta sahifada — men kim, nima qilganman va nimalarni bilaman.",
          en: "One page — who I am, what I've done and what I know.",
          ru: 'Одна страница — кто я и что умею.',
        })}
      />
      <Section className="max-w-4xl">
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold">{profileData.name}</h2>
              <p className="mt-1 text-muted-foreground">{l(profileData.role)}</p>
              <div className="mt-4 flex flex-wrap gap-4 font-mono text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-primary" />
                  {profileData.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {l(profileData.location)}
                </span>
              </div>
            </div>

            <a
              href={safeUrl(profileData.cvUrl)}
              download
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              {l({ uz: 'PDF yuklab olish', en: 'Download PDF', ru: 'Скачать PDF' })}
            </a>
          </div>
        </FadeIn>

        {/* Experience */}
        <FadeIn delay={0.1}>
          <h2 className="mb-8 mt-16 font-mono text-sm uppercase tracking-[0.3em] text-primary">
            {l({ uz: 'Tajriba', en: 'Experience', ru: 'Опыт' })}
          </h2>
          <div className="space-y-8 border-l border-border pl-8">
            {timelineData.map((item) => (
              <div key={item.id} className="relative">
                <span className="absolute -left-[2.3rem] top-2 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <p className="font-mono text-sm text-primary">
                  {item.year} · {item.place}
                </p>
                <p className="mt-1 font-display text-xl font-bold">{l(item.title)}</p>
                <p className="mt-1 text-muted-foreground leading-relaxed">
                  {l(item.description)}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Technologies */}
        <FadeIn delay={0.15}>
          <h2 className="mb-6 mt-16 font-mono text-sm uppercase tracking-[0.3em] text-primary">
            {l({ uz: 'Texnologiyalar', en: 'Technologies', ru: 'Технологии' })}
          </h2>
          <div className="flex flex-wrap gap-3">
            {skillsData.map((skill) => (
              <span
                key={skill.id}
                className="rounded-full border border-border px-4 py-2 font-mono text-sm text-muted-foreground"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <p className="mt-16 text-center text-muted-foreground">
            <Link to="/contact" className="text-primary hover:underline">
              {l({
                uz: 'Ish taklif qilmoqchimisiz? Yozing →',
                en: 'Want to make an offer? Get in touch →',
                ru: 'Есть предложение? Напишите →',
              })}
            </Link>
          </p>
        </FadeIn>
      </Section>
    </>
  );
};
