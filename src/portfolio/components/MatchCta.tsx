import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import { useLanguage } from '../context/LanguageContext';
import type { Localized } from '../types';

const DEFAULT_TEXT: Localized = {
  uz: "Qaysi biri sizga mosligini bilmaysizmi? Loyihangizni yozing — AI tavsiya qiladi.",
  en: 'Not sure which one fits you? Describe your project and AI will recommend.',
  ru: 'Не знаете, что подходит? Опишите проект — AI подскажет.',
};

/** Card linking to the AI match page; place at the end of listing pages. */
export const MatchCta: React.FC<{ text?: Localized }> = ({ text = DEFAULT_TEXT }) => {
  const { l, t } = useLanguage();
  return (
    <Link
      to="/match"
      className="glass group mx-auto mt-10 md:mt-16 flex max-w-3xl flex-col items-start gap-4 rounded-2xl p-5 md:rounded-3xl transition-colors hover:border-primary sm:flex-row sm:items-center sm:justify-between sm:p-8"
    >
      <span className="flex items-start gap-4">
        <Sparkles className="mt-1 h-6 w-6 shrink-0 text-primary" />
        <span className="text-lg leading-relaxed">{l(text)}</span>
      </span>
      <span className="min-h-11 shrink-0 rounded-full bg-primary px-6 py-3 font-display font-bold text-primary-foreground transition-transform group-hover:scale-105">
        {t('match')} →
      </span>
    </Link>
  );
};
