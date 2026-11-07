import { defaultStats, experienceYears } from '../data/homePresentation';
import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { Link } from '@/lib/router-compat';
import { ArrowUpRight, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Counter } from '../components/Counter';
import { Marquee } from '../components/Marquee';
import { ProjectCard } from '../components/ProjectCard';
import { responsiveImage } from '@/lib/responsive-image';

export const Home: React.FC = () => {
  const { profileData, projectsData, skillsData, servicesData, testimonialsData } = useSiteData();
  const { t, l } = useLanguage();
  const reducedMotion = useReducedMotion();

  const stats = profileData.stats?.length ? profileData.stats : defaultStats;

  return (
    <>
      {/* Hero Section */}
      <section className="home-hero relative overflow-hidden px-5 pt-20 pb-2 md:px-12 md:pt-28 md:pb-8">
        <div className="grid-lines pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-6 md:grid-cols-[1.2fr_1fr] md:gap-8 lg:gap-12">
          <div className="hero-copy min-w-0">
            <h1 className="font-display text-fluid-hero font-extrabold leading-[0.92] tracking-tight">
              {profileData.name.split(' ').map((word, n) => (
                <span key={n} className="block overflow-hidden pb-[0.06em]">
                  <span className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-xl"
            >
              {l(profileData.bio)}
            </motion.p>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <Link
                to="/contact"
                className="rounded-full bg-primary px-6 py-3 text-center font-display font-bold text-primary-foreground transition-transform hover:scale-105"
              >
                {t('hire')}
              </Link>
              <Link
                to="/projects"
                className="rounded-full border border-border px-6 py-3 text-center font-display font-bold text-foreground transition-all hover:border-primary hover:bg-surface"
              >
                {t('viewProject')}
              </Link>
              <Link
                to="/match"
                className="rounded-full border border-primary/40 px-6 py-3 text-center font-display font-bold text-primary transition-all hover:bg-surface"
              >
                ✦ {t('match')}
              </Link>
            </motion.div>
          </div>

          {/* Hero Portrait Image */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative mx-auto w-full max-w-sm md:max-w-none"
          >
            <img
              {...responsiveImage(profileData.portrait || '/assets/asadbek-jumanazarov-software-developer.jpg', '(min-width: 768px) 40vw, 384px')}
              alt={profileData.name}
              width={768}
              height={960}
              fetchPriority="high"
              className="home-portrait relative aspect-[4/5] w-full rounded-lg object-cover"
            />
            <div className="glass absolute bottom-4 left-4 rounded-lg px-4 py-3">
              <p className="font-display text-3xl font-bold text-primary">
                {experienceYears}+
              </p>
              <p className="text-xs text-muted-foreground">
                {l({ uz: 'yil tajriba', en: 'years of experience', ru: 'лет опыта' })}
              </p>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Marquee Banner */}
      <Marquee items={skillsData.slice(0, 8).map((s) => s.name)} />

      {/* Statistics Section */}
      <Section>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((stat, idx) => (
<FadeIn key={idx} delay={idx * 0.1} className="bg-background p-5 md:p-8">
              <p className="font-display text-4xl font-extrabold md:text-6xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{l(stat.label)}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Selected Work (Featured Projects) */}
      <Section>
<div className="mb-6 md:mb-12 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <h2 className="min-w-0 text-3xl font-extrabold md:text-6xl font-display">
            {l({ uz: 'Tanlangan ishlar', en: 'Selected work', ru: 'Избранные работы' })}
          </h2>
          <Link to="/projects" className="shrink-0 font-mono text-sm text-primary hover:underline">
            {t('viewAll')} →
          </Link>
        </div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {projectsData
            .filter((p) => p.featured)
            .map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
        </div>
      </Section>

      {/* Services Preview */}
      <Section>
<h2 className="mb-6 md:mb-12 text-3xl font-extrabold md:text-6xl font-display">
          {t('services')}
        </h2>
        <div className="divide-y divide-border border-y border-border">
          {servicesData.slice(0, 4).map((service, idx) => (
            <FadeIn key={service.id} delay={idx * 0.05}>
              <Link
                to="/services"
className="group flex items-center justify-between gap-4 py-4 transition-all md:gap-6 md:py-8 md:hover:px-4"
              >
                <span className="shrink-0 font-mono text-sm text-muted-foreground">
                  0{idx + 1}
                </span>
                <span className="min-w-0 flex-1 font-display text-xl font-bold transition-colors group-hover:text-primary md:text-4xl">
                  {l(service.title)}
                </span>
                <span className="hidden text-muted-foreground md:block">
                  {l(service.description)}
                </span>
                <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:rotate-45 group-hover:text-primary" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Featured Testimonial */}
      {testimonialsData[0] && (
        <Section>
          <FadeIn>
<div className="glass relative overflow-hidden rounded-[2rem] p-6 md:p-16">
              <Quote className="mb-4 md:mb-6 h-8 w-8 text-primary" />
              <p className="font-display text-xl font-bold leading-snug md:text-4xl">
                "{l(testimonialsData[0].quote)}"
              </p>
              <p className="mt-6 text-muted-foreground">
                — {testimonialsData[0].name}, {testimonialsData[0].role}
              </p>
              <Link
                to="/testimonials"
                className="mt-5 md:mt-8 inline-block font-mono text-sm text-primary hover:underline"
              >
                {t('viewAll')} →
              </Link>
            </div>
          </FadeIn>
        </Section>
      )}
    </>
  );
};
