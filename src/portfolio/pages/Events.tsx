import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { Link } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { staggerVariants } from '../components/Primitives';

export const Events: React.FC = () => {
  const { eventsData } = useSiteData();
  const { l } = useLanguage();
  return (
    <>
      <PageHeader
        eyebrow="events"
        title={l({ uz: 'Tadbirlar', en: 'Events', ru: 'События' })}
        subtitle={l({ uz: 'Hackathonlar, konferensiyalar va jamoa bilan bo\'lgan kunlar.', en: 'Hackathons, conferences and days spent with the community.', ru: 'Хакатоны, конференции и дни вместе с сообществом.' })}
      />
      <Section>
        {!eventsData.length && <p className="py-16 text-center text-muted-foreground">{l({ uz: 'Tez orada.', en: 'Coming soon.', ru: 'Скоро.' })}</p>}
        <motion.div
          variants={staggerVariants.container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {eventsData.map((event) => (
            <motion.div key={event.id} variants={staggerVariants.item}>
              <Link
                to={`/events/${event.slug}`}
                data-cursor="view"
                className="group block h-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={event.cover}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute right-4 top-4 flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-100">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">{l(event.role)}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold transition-colors group-hover:text-primary">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{l(event.description)}</p>
                  <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
};
