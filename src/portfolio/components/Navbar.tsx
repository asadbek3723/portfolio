import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from '@/lib/router-compat';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEmptySections } from '@/admin/data/store';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../types';
import type { TranslationKey } from '../data/translations';

const TOP_LINKS: TranslationKey[] = ['about', 'projects', 'services', 'match', 'contact'];

const ALL_LINKS: TranslationKey[] = [
  'home',
  'about',
  'projects',
  'skills',
  'services',
  'match',
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

const isActivePath = (current: string, path: string): boolean => {
  const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  const c = norm(current);
  return path === '/' ? c === '/' : c === path || c.startsWith(`${path}/`);
};

const getRoutePath = (key: TranslationKey): string => {
  return key === 'home' ? '/' : `/${key}`;
};

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const languages: Language[] = ['uz', 'en', 'ru'];

  return (
    <div className="flex rounded-full border border-border p-1 font-mono text-xs">
      {languages.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            'min-h-9 min-w-9 rounded-full px-2.5 py-1 uppercase transition-colors',
            lang === l
              ? 'bg-primary text-primary-foreground font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

export const Navbar: React.FC = () => {
  const { t, l } = useLanguage();
  const emptySections = useEmptySections();
  const links = ALL_LINKS.filter((k) => !emptySections.includes(k));
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openMenu = (e: React.MouseEvent<HTMLElement>) => {
    openerRef.current = e.currentTarget;
    setIsOpen(true);
  };

  // Dialog behaviour: Escape closes, Tab stays inside, focus moves in on open and back to the opener on close.
  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    overlay?.querySelector<HTMLElement>('button[aria-label="Close"]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsOpen(false); return; }
      if (e.key !== 'Tab' || !overlay) return;
      const items = overlay.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const opener = openerRef.current;
    return () => { document.removeEventListener('keydown', onKey); opener?.focus(); };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when overlay menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:font-bold focus:text-primary-foreground"
      >
        {l({ uz: 'Asosiy kontentga o‘tish', en: 'Skip to content', ru: 'Перейти к содержимому' })}
      </a>
      <nav
        aria-label="Main"
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          isScrolled ? 'py-3' : 'py-6'
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all',
            isScrolled && 'glass mx-4 md:mx-auto shadow-sm'
          )}
        >
          <Link to="/" className="font-display text-xl font-extrabold tracking-tight">
            AJ<span className="text-primary">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-7 lg:flex">
            {TOP_LINKS.map((key) => {
              const path = getRoutePath(key);
              const isActive = isActivePath(location.pathname, path);
              return (
                <Link
                  key={key}
                  to={path}
                  className={cn(
                    'text-sm transition-colors hover:text-foreground',
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  )}
                >
                  {t(key)}
                </Link>
              );
            })}
            <button
              onClick={openMenu}
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              {t('more')} +
            </button>
          </div>

          {/* Right items: Language switcher + Mobile menu button */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <button
              aria-label="Menu"
              aria-expanded={isOpen}
              aria-haspopup="dialog"
              onClick={openMenu}
              className="rounded-full border border-border p-2 lg:hidden cursor-pointer hover:bg-surface transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] overflow-y-auto bg-background"
            initial={{ clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
              <LanguageSwitcher />
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-border p-3 cursor-pointer hover:bg-surface transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mx-auto grid max-w-7xl gap-x-12 px-6 pb-16 md:grid-cols-3">
              {links.map((key, idx) => {
                const path = getRoutePath(key);
                const isActive = isActivePath(location.pathname, path);
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.03 }}
                  >
                    <Link
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'group flex items-baseline gap-4 border-b border-border py-4 font-display text-3xl font-bold transition-colors hover:text-primary md:text-4xl',
                        isActive && 'text-primary'
                      )}
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {t(key)}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
