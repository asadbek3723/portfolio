import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { Language, Localized } from '../types';
import { translations, type TranslationKey } from '../data/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  l: <T>(obj: Localized<T> | undefined) => T;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'uz',
  setLang: () => {},
  t: (key) => translations[key]?.uz ?? '',
  l: (obj) => (obj?.uz as never) ?? ('' as never),
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('uz');

  useEffect(() => {
    let saved: Language | null = null;
    try { saved = localStorage.getItem('lang') as Language | null; } catch { /* storage unavailable */ }
    if (saved && ['uz', 'en', 'ru'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  // Keep <html lang> in sync so screen readers and translation tools use the right language.
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try { localStorage.setItem('lang', newLang); } catch { /* storage unavailable */ }
  }, []);

  const t = useCallback((key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.uz || '';
  }, [lang]);

  const l = useCallback(<T,>(obj: Localized<T> | undefined): T => {
    if (!obj) return '' as unknown as T;
    return obj[lang] ?? obj.uz ?? obj.en ?? ('' as unknown as T);
  }, [lang]);

  // Stable value: consumers only re-render when the language actually changes.
  const value = useMemo(() => ({ lang, setLang, t, l }), [lang, setLang, t, l]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
