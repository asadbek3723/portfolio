import { MatchCta } from '../components/MatchCta';
import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { Link } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { staggerVariants, TiltCard } from '../components/Primitives';

export const Services: React.FC = () => {
  const { servicesData } = useSiteData();
  const { t, l } = useLanguage();
  return (
    <>
      <PageHeader
        eyebrow={t('services')}
        title={t('services')}
        subtitle={l({ uz: "G'oyangizni mukammal mahsulotga aylantiraman.", en: "I turn your idea into a polished product.", ru: "Превращаю идею в отточенный продукт." })}
      />
      <Section>
        <motion.div
          variants={staggerVariants.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {servicesData.map((service, idx) => (
            <motion.div key={service.id} variants={staggerVariants.item}>
              <TiltCard className="h-full">
                <Link
                  to={`/services/${service.slug}`}
                  data-cursor="view"
                  className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-5 md:rounded-3xl md:p-8 transition-colors duration-500 hover:border-primary/60"
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orb opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60" />
                  <div className="relative flex items-start justify-between">
                    <span className="font-mono text-sm text-primary">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                  {service.tagline && (
                    <p className="relative mt-5 md:mt-10 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {l(service.tagline)}
                    </p>
                  )}
                  <h2 className="relative mt-2 font-display text-xl font-bold transition-colors group-hover:text-primary md:text-3xl">
                    {l(service.title)}
                  </h2>
                  <p className="relative mt-3 flex-1 leading-relaxed text-muted-foreground">
                    {l(service.description)}
                  </p>
                  <div className="relative mt-5 md:mt-8 flex items-center justify-between border-t border-border pt-4 md:pt-5 font-mono text-sm">
                    <span className="text-primary">{l(service.price)}</span>
                    {service.timeline && (
                      <span className="text-muted-foreground">{l(service.timeline)}</span>
                    )}
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
        <MatchCta />
      </Section>
    </>
  );
};
