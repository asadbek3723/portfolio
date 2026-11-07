import React from 'react';
import { Link } from '@/lib/router-compat';
import { useLanguage } from '../context/LanguageContext';

/** Shared 404 content: shown for unknown URLs and for missing detail pages (no silent redirects). */
export const NotFoundView: React.FC<{ backTo?: string; backLabel?: string }> = ({ backTo = '/', backLabel }) => {
  const { l } = useLanguage();
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 pt-32 pb-20 text-center">
      <div className="max-w-md">
        <p className="font-mono text-sm uppercase tracking-wider text-muted-foreground">404</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold md:text-5xl">
          {l({ uz: 'Sahifa topilmadi', en: 'Page not found', ru: 'Страница не найдена' })}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {l({
            uz: 'Qidirayotgan sahifangiz mavjud emas yoki ko‘chirilgan.',
            en: 'The page you are looking for does not exist or has been moved.',
            ru: 'Страница, которую вы ищете, не существует или была перемещена.',
          })}
        </p>
        <Link
          to={backTo}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 font-display font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105"
        >
          {backLabel ?? l({ uz: 'Bosh sahifaga', en: 'Go home', ru: 'На главную' })}
        </Link>
      </div>
    </section>
  );
};
