import { useSiteData } from '@/admin/data/store';
import React, { useState } from 'react';
import { Link } from '@/lib/router-compat';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const FAQ: React.FC = () => {
  const { faqData } = useSiteData();
  const { l } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <PageHeader
        eyebrow="faq"
        title={l({ uz: 'Savollar', en: 'FAQ', ru: 'Вопросы' })}
        subtitle={l({
          uz: "Asadbek Jumanazarov kim va qanday ishlaydi? Eng ko'p so'raladigan savollar.",
          en: 'Who is Asadbek Jumanazarov and how does he work? The most asked questions.',
          ru: 'Кто такой Асадбек Джуманазаров и как он работает?',
        })}
      />
      <Section className="max-w-4xl">
        <div className="divide-y divide-border border-y border-border">
          {faqData.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.05}>
              <div>
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="flex w-full items-center justify-between gap-6 py-8 text-left cursor-pointer"
                >
                  <span className="font-display text-xl font-bold md:text-2xl">
                    {l(item.q)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openIndex === idx ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-lg text-muted-foreground leading-relaxed">
                        {l(item.a)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-16 text-center text-muted-foreground">
            {l({
              uz: 'Savolingiz javoblanmadimi? ',
              en: "Didn't find your answer? ",
              ru: 'Не нашли ответ? ',
            })}
            <Link to="/contact" className="text-primary hover:underline">
              {l({ uz: 'Yozing →', en: 'Ask me →', ru: 'Написать →' })}
            </Link>{' '}
            {l({ uz: 'yoki ', en: 'or ', ru: 'или ' })}
            <Link to="/match" className="text-primary hover:underline">
              ✦ {l({ uz: "AI'dan so'rang", en: 'ask the AI', ru: 'спросите AI' })}
            </Link>
          </p>
        </FadeIn>
      </Section>
    </>
  );
};
