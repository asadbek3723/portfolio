import React, { useState, useEffect } from 'react';
import { Link } from '@/lib/router-compat';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '../context/LanguageContext';
import type { Localized, MediaItem, ProjectMetric } from '../types';
import { Counter } from './Counter';
import { staggerVariants, EASE_CUSTOM, TextReveal, ParallaxImage, MagneticButton } from './Primitives';

// ─── Section Nav ──────────────────────────────────────────────────────────────

interface SectionDef {
  id: string;
  label: Localized;
  content: React.ReactNode;
}

const SectionNav: React.FC<{ sections: SectionDef[] }> = ({ sections }) => {
  const { l } = useLanguage();
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [sections]);

  const NavItem = ({ sec }: { sec: SectionDef }) => (
    <a
      href={`#${sec.id}`}
      className={cn(
        'group flex items-center gap-3 whitespace-nowrap font-mono text-xs uppercase tracking-widest transition-colors',
        activeId === sec.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <span
        className={cn(
          'hidden h-px bg-current transition-all duration-500 lg:block',
          activeId === sec.id ? 'w-10' : 'w-4 group-hover:w-6'
        )}
      />
      {l(sec.label)}
    </a>
  );

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav
        aria-label="Sections"
        className="sticky top-28 hidden flex-col gap-5 self-start lg:flex"
      >
        {sections.map((s) => <NavItem key={s.id} sec={s} />)}
      </nav>
      {/* Mobile horizontal scroll */}
      <nav
        aria-label="Sections"
        className="glass sticky top-20 z-30 -mx-6 flex gap-6 overflow-x-auto px-6 py-4 md:-mx-12 md:px-12 lg:hidden [scrollbar-width:none]"
      >
        {sections.map((s) => <NavItem key={s.id} sec={s} />)}
      </nav>
    </>
  );
};

// ─── Metrics Grid ────────────────────────────────────────────────────────────

export const MetricsGrid: React.FC<{ metrics: ProjectMetric[] }> = ({ metrics }) => {
  const { l } = useLanguage();
  return (
    <motion.div
      variants={staggerVariants.container}
      initial={useReducedMotion() ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          variants={staggerVariants.item}
          className="glass rounded-3xl p-6 md:p-8"
        >
          <p className="text-fluid-metric font-display font-extrabold text-primary">
            <Counter to={m.value} suffix={m.suffix} />
          </p>
          <p className="mt-2 text-muted-foreground">{l(m.label)}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ─── Contribution / Highlight List ───────────────────────────────────────────

export const BulletList: React.FC<{ items: Localized[]; numbered?: boolean }> = ({
  items,
  numbered,
}) => {
  const { l } = useLanguage();
  return (
    <motion.ul
      variants={staggerVariants.container}
      initial={useReducedMotion() ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className="divide-y divide-border border-y border-border"
    >
      {items.map((item, i) => (
        <motion.li
          key={i}
          variants={staggerVariants.item}
          className="flex gap-5 py-5 text-lg leading-relaxed"
        >
          <span className="pt-1.5 font-mono text-sm text-primary">
            {numbered ? String(i + 1).padStart(2, '0') : '✦'}
          </span>
          <span>{l(item)}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

// ─── Media Gallery ────────────────────────────────────────────────────────────

const MediaGallery: React.FC<{ media: MediaItem[]; title: string }> = ({ media, title }) => {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {media.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative overflow-hidden rounded-2xl border border-border cursor-pointer"
          >
            {item.type === 'video' ? (
              <video
                src={item.src}
                poster={item.poster}
                className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={item.src}
                alt={title}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && media[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.4, ease: EASE_CUSTOM }}
              className="max-h-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {media[active].type === 'video' ? (
                <video
                  src={media[active].src}
                  poster={media[active].poster}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-full rounded-2xl border border-border"
                />
              ) : (
                <img
                  src={media[active].src}
                  alt={title}
                  className="max-h-[80vh] w-full rounded-2xl border border-border object-contain"
                />
              )}
            </motion.div>
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-6 top-6 rounded-full border border-border bg-card p-3 hover:border-primary cursor-pointer transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── Stack Badges ─────────────────────────────────────────────────────────────

export const StackBadges: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <span
        key={item}
        className="rounded-full border border-border px-4 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        {item}
      </span>
    ))}
  </div>
);

// ─── Action Button ────────────────────────────────────────────────────────────

export const ActionButton: React.FC<{
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
  className?: string;
}> = ({ href, children, primary, external }) => {
  const cls = cn(
    'inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all',
    primary
      ? 'bg-primary text-primary-foreground shadow-glow hover:brightness-110'
      : 'border border-border hover:border-primary hover:text-primary'
  );
  return (
    <MagneticButton>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={cls}>
          {children}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      ) : (
        <Link to={href} className={cls}>
          {children}
        </Link>
      )}
    </MagneticButton>
  );
};

// ─── Lead Paragraph ───────────────────────────────────────────────────────────

export const LeadText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-fluid-lead max-w-3xl leading-relaxed text-foreground/85">{children}</p>
);

// ─── Not Found Sub-page ───────────────────────────────────────────────────────

export const DetailNotFound: React.FC<{ backHref: string }> = ({ backHref }) => {
  const { l } = useLanguage();
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="text-fluid-display font-display font-extrabold text-gradient">404</p>
      <p className="mt-4 text-muted-foreground">
        {l({ uz: 'Bu sahifa topilmadi.', en: 'This page could not be found.', ru: 'Страница не найдена.' })}
      </p>
      <Link
        to={backHref}
        className="mt-8 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground"
      >
        {l({ uz: 'Orqaga', en: 'Go back', ru: 'Назад' })}
      </Link>
    </div>
  );
};

// ─── Detail Layout ────────────────────────────────────────────────────────────

interface DetailLayoutProps {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string | undefined;
  cover?: string | undefined;
  facts: { label: string; value: string }[];
  actions?: React.ReactNode | undefined;
  sections: SectionDef[];
  next?: {
    href: string;
    title: string;
    label: string;
    cover?: string | undefined;
  };
}

export const DetailLayout: React.FC<DetailLayoutProps> = ({
  backHref,
  backLabel,
  eyebrow,
  title,
  subtitle,
  cover,
  facts,
  actions,
  sections,
  next,
}) => {
  const { l } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden px-6 pb-12 pt-32 md:px-12 md:pt-40">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="bg-orb animate-orb pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to={backHref}
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              {backLabel}
            </Link>
          </motion.div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-primary">
            / {eyebrow}
          </p>

          <TextReveal
            text={title}
            as="h1"
            className="mt-5 font-display text-fluid-display font-extrabold leading-[0.95] tracking-tight"
          />

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-6 max-w-2xl text-fluid-lead text-muted-foreground"
            >
              {subtitle}
            </motion.p>
          )}

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {actions}
            </motion.div>
          )}
        </div>
      </header>

      {/* Cover image */}
      {cover && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_CUSTOM }}
          className="mx-auto max-w-7xl px-4 md:px-12"
        >
          <ParallaxImage
            src={cover}
            alt={title}
            className="aspect-[4/3] max-h-[80vh] w-full rounded-[2rem] border border-border sm:aspect-[16/9] lg:aspect-[21/9]"
          />
        </motion.div>
      )}

      {/* Facts bar */}
      {facts.length > 0 && (
        <motion.dl
          variants={staggerVariants.container}
          initial={reducedMotion ? false : "hidden"}
          animate="show"
          className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-6 md:grid-cols-3 md:px-12 lg:grid-cols-5"
        >
          {facts.map((fact, i) => (
            <motion.div
              key={i}
              variants={staggerVariants.item}
              className="border-t border-border py-5 pr-4"
            >
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="mt-2 font-display text-lg font-bold">{fact.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      )}

      {/* Content + TOC */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:px-12 lg:grid-cols-[200px_1fr] lg:gap-16 lg:py-24">
        <SectionNav sections={sections} />
        <div className="min-w-0 space-y-24 md:space-y-32">
          {sections.map((sec, i) => (
            <section key={sec.id} id={sec.id} className="scroll-mt-40">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-primary">
                {String(i + 1).padStart(2, '0')} / {l(sec.label)}
              </p>
              {sec.content}
            </section>
          ))}
        </div>
      </div>

      {/* Next item */}
      {next && (
        <div className="mx-auto max-w-7xl px-6 pb-24 md:px-12">
          <Link
            to={next.href}
            data-cursor="view"
            className="group relative block overflow-hidden rounded-[2rem] border border-border p-6 md:p-14"
          >
            {next.cover && (
              <img
                src={next.cover}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-25"
              />
            )}
            <div className="relative flex items-end justify-between gap-6">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {next.label}
                </p>
                <p className="mt-3 line-clamp-3 break-words font-display text-[1.35rem] font-extrabold leading-tight transition-colors group-hover:text-primary sm:text-fluid-h2 md:mt-4">
                  {next.title}
                </p>
              </div>
              <MagneticButton>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-45 sm:h-16 sm:w-16 md:h-20 md:w-20">
                  <ArrowUpRight className="h-7 w-7" />
                </span>
              </MagneticButton>
            </div>
          </Link>
        </div>
      )}
    </article>
  );
};

export { MediaGallery };
