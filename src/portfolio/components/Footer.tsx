import { useSiteData, useEmptySections } from '@/admin/data/store';
import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../data/translations';
import { safeUrl } from '@/lib/safe-url';

const ALL_LINKS: TranslationKey[] = [
  'home',
  'about',
  'projects',
  'skills',
  'services',
  'certificates',
  'achievements',
  'events',
  'gallery',
  'blog',
  'testimonials',
  'faq',
  'cv',
  'uses',
  'contact',
];

const getRoutePath = (key: TranslationKey): string => {
  return key === 'home' ? '/' : `/${key}`;
};

export const Footer: React.FC = () => {
  const { profileData } = useSiteData();
  const { t, l } = useLanguage();

  const emptySections = useEmptySections();
  const links = ALL_LINKS.filter((k) => !emptySections.includes(k));
  const col1 = links.slice(0, 5);
  const col2 = links.slice(5, 10);
  const col3 = links.slice(10);

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-border px-5 pt-14 md:mt-24 md:px-12 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          / {t('contact')}
        </p>

        <Link
          to="/contact"
className="group mt-4 inline-flex max-w-full items-center gap-3 font-display text-3xl font-extrabold md:mt-6 md:gap-4 md:text-8xl"
        >
          <span className="text-gradient break-words">{t('hire')}</span>
          <ArrowUpRight className="h-8 w-8 shrink-0 text-primary transition-transform group-hover:rotate-45 md:h-20 md:w-20" />
        </Link>

        <div className="mt-10 grid gap-8 pb-8 md:mt-16 md:grid-cols-4 md:gap-10 md:pb-12">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{l(profileData.bio)}</p>
            <a
              href={`mailto:${profileData.email}`}
              className="mt-3 block break-all text-primary hover:underline"
            >
              {profileData.email}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 md:hidden">
            {links.map((key) => (
              <Link
                key={key}
                to={getRoutePath(key)}
                className="border-b border-border/50 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          {[col1, col2, col3].map((column, colIdx) => (
            <div key={colIdx} className="hidden flex-col gap-2 md:flex">
              {column.map((key) => (
                <Link
                  key={key}
                  to={getRoutePath(key)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(key)}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-6 text-sm text-muted-foreground md:flex-row md:flex-wrap md:items-center md:justify-between md:py-8">
          <span>© {new Date().getFullYear()} {profileData.name}</span>
          <div className="flex flex-wrap gap-x-5 gap-y-2 md:gap-6">
            {profileData.socials.map((social) => (
              <a
                key={social.label}
                href={safeUrl(social.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] font-extrabold leading-none text-muted/60"
      >
        ASADBEK
      </div>
    </footer>
  );
};
