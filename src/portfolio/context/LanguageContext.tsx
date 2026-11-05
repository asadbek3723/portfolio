import React, { createContext, useContext, useState, useEffect } from 'react';
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
  l: (obj) => (obj?.uz as any) ?? '',
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>('uz');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved && ['uz', 'en', 'ru'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key: TranslationKey): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.uz || '';
  };

  const l = <T,>(obj: Localized<T> | undefined): T => {
    if (!obj) return '' as unknown as T;
    return obj[lang] ?? obj.uz ?? obj.en ?? ('' as unknown as T);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, l }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
