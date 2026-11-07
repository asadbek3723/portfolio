import { useSiteData, addMessage } from '@/admin/data/store';
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { Link } from '@/lib/router-compat';
import { safeUrl } from '@/lib/safe-url';

export const Contact: React.FC = () => {
  const { profileData } = useSiteData();
  const { t, l } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      await addMessage({ name: String(fd.get('name') ?? ''), email: String(fd.get('email') ?? ''), subject: String(fd.get('subject') ?? ''), body: String(fd.get('body') ?? ''), website: String(fd.get('website') ?? '') });
    } catch (err) {
      setLoading(false);
      const busy = err instanceof Error && err.message === 'busy';
      setError(busy
        ? l({ uz: 'Juda ko‘p urinish. Birozdan so‘ng qayta urinib ko‘ring.', en: 'Too many attempts. Please try again in a few minutes.', ru: 'Слишком много попыток. Повторите через несколько минут.' })
        : l({ uz: 'Xabar yuborilmadi. Qayta urinib ko‘ring.', en: 'Message not sent. Please try again.', ru: 'Сообщение не отправлено. Попробуйте ещё раз.' }));
      return;
    }
    setLoading(false);
    setSubmitted(true);
    form.reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const inputClass =
    'w-full rounded-2xl border border-input bg-card/50 px-5 py-4 outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground';

  return (
    <>
      <PageHeader
        eyebrow={t('contact')}
        title={t('hire')}
        subtitle={l(profileData.location)}
      />
      <Section>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-12">
          {/* Direct contact info */}
          <div className="min-w-0 space-y-6">
            <div>
              <a
                href={`mailto:${profileData.email}`}
                className="block break-all font-display text-xl font-bold text-primary hover:underline sm:text-2xl md:text-3xl"
              >
                {profileData.email}
              </a>
              <p className="mt-2 text-lg text-muted-foreground">{profileData.phone}</p>
            </div>

            <Link
              to="/match"
              className="glass block rounded-2xl p-5 transition-colors hover:border-primary"
            >
              <span className="font-display font-bold text-primary">✦ {t('match')}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {l({ uz: "Qaysi xizmat kerakligini bilmaysizmi? AI tavsiya qiladi.", en: "Not sure what you need? Let AI recommend it.", ru: "Не знаете, что нужно? AI подскажет." })}
              </span>
            </Link>

            <div className="pt-6 border-t border-border space-y-3">
              {profileData.socials.map((social) => (
                <a
                  key={social.label}
                  href={safeUrl(social.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <div className="min-w-0">
            {error && <p role="alert" className="mb-6 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}
            {submitted && (
              <div role="status" className="mb-6 flex items-center gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-4 text-primary font-mono text-sm">
                <Check className="h-5 w-5" />
                <span>
                  {l({
                    uz: 'Xabaringiz muvaffaqiyatli yuborildi!',
                    en: 'Your message has been sent successfully!',
                    ru: 'Ваше сообщение успешно отправлено!',
                  })}
                </span>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <input
                name="name"
                required
                maxLength={200}
                autoComplete="name"
                aria-label={l({ uz: 'Ismingiz', en: 'Name', ru: 'Ваше имя' })}
                placeholder={l({ uz: 'Ismingiz', en: 'Name', ru: 'Ваше имя' })}
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                required
                maxLength={320}
                autoComplete="email"
                aria-label="Email"
                placeholder={l({ uz: 'Email manzilingiz', en: 'Email', ru: 'Email' })}
                className={inputClass}
              />
              <input
                name="subject"
                maxLength={300}
                aria-label={l({ uz: 'Mavzu', en: 'Subject', ru: 'Тема' })}
                placeholder={l({ uz: 'Mavzu', en: 'Subject', ru: 'Тема' })}
                className={inputClass}
              />
              <textarea
                name="body"
                required
                maxLength={5000}
                aria-label={l({ uz: 'Xabar matni', en: 'Message', ru: 'Сообщение' })}
                rows={6}
                placeholder={l({ uz: 'Xabar matni', en: 'Message', ru: 'Сообщение' })}
                className={inputClass}
              />
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer rounded-full bg-primary px-8 py-4 font-display font-bold text-primary-foreground shadow-glow transition-transform hover:scale-105 disabled:opacity-50"
              >
                {loading
                  ? l({ uz: 'Yuborilmoqda...', en: 'Sending...', ru: 'Отправка...' })
                  : t('send')}
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
};
