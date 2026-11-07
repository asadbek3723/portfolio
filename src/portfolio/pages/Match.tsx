import { useSiteData } from '@/admin/data/store';
import React, { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, Loader2, Sparkles } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import { matchProject } from '@/lib/match.functions';
import type { MatchResult } from '@/lib/match.server';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import type { Localized } from '../types';
import { responsiveImage } from '@/lib/responsive-image';

const T = {
  title: { uz: 'Loyihangizga mos yechim', en: 'Find the right fit', ru: 'Подберём решение' },
  subtitle: {
    uz: "Maqsadlaringizni yozing — AI sizga mos xizmatlar va loyihalarni tavsiya qiladi.",
    en: 'Describe your goals and AI will recommend the services and past projects that fit best.',
    ru: 'Опишите цели — AI порекомендует подходящие услуги и проекты.',
  },
  goals: { uz: 'Loyiha maqsadlari', en: 'Your project goals', ru: 'Цели проекта' },
  placeholder: {
    uz: "Masalan: onlayn do'konim uchun tez ishlaydigan sayt va admin panel kerak...",
    en: 'e.g. I need a fast online store with an admin dashboard and payments...',
    ru: 'Например: нужен быстрый интернет-магазин с админ-панелью...',
  },
  budget: { uz: 'Byudjet', en: 'Budget', ru: 'Бюджет' },
  timeline: { uz: 'Muddat', en: 'Timeline', ru: 'Сроки' },
  any: { uz: 'Farqi yo‘q', en: 'Not sure', ru: 'Не важно' },
  submit: { uz: 'Tavsiya olish', en: 'Get recommendations', ru: 'Получить подбор' },
  loading: { uz: 'Tahlil qilinmoqda…', en: 'Analyzing…', ru: 'Анализируем…' },
  services: { uz: 'Mos xizmatlar', en: 'Recommended services', ru: 'Подходящие услуги' },
  projects: { uz: "O'xshash loyihalar", en: 'Relevant projects', ru: 'Похожие проекты' },
  posts: { uz: 'Foydali maqolalar', en: 'Helpful articles', ru: 'Полезные статьи' },
  cta: { uz: 'Men bilan bog‘laning', en: 'Contact me', ru: 'Связаться со мной' },
  short: {
    uz: 'Iltimos, kamida 10 ta belgi yozing.',
    en: 'Please write at least 10 characters.',
    ru: 'Напишите хотя бы 10 символов.',
  },
  busy: {
    uz: "Hozir so'rovlar ko'p. Bir daqiqadan so'ng qayta urinib ko'ring.",
    en: 'Lots of requests right now. Please try again in a minute.',
    ru: 'Сейчас много запросов. Попробуйте через минуту.',
  },
  credits: {
    uz: "AI tavsiyalari vaqtincha mavjud emas. To'g'ridan-to'g'ri bog'laning.",
    en: 'AI recommendations are temporarily unavailable. Please contact me directly.',
    ru: 'AI-подбор временно недоступен. Свяжитесь со мной напрямую.',
  },
  unavailable: {
    uz: "Nimadir xato ketdi. Keyinroq qayta urinib ko'ring.",
    en: 'Something went wrong. Please try again later.',
    ru: 'Что-то пошло не так. Попробуйте позже.',
  },
  empty: {
    uz: "Aniq moslik topilmadi — batafsilroq yozib ko'ring.",
    en: 'No clear match found — try adding more detail.',
    ru: 'Точного совпадения нет — добавьте подробностей.',
  },
} satisfies Record<string, Localized>;

const BUDGETS = ['< $1k', '$1k – $5k', '$5k – $15k', '$15k+'];
const TIMELINES: Localized[] = [
  { uz: '2 hafta', en: '2 weeks', ru: '2 недели' },
  { uz: '1 oy', en: '1 month', ru: '1 месяц' },
  { uz: '2–3 oy', en: '2–3 months', ru: '2–3 месяца' },
  { uz: '3+ oy', en: '3+ months', ru: '3+ месяца' },
];

export const Match: React.FC = () => {
  const { blogData, projectsData, servicesData } = useSiteData();
  const { l, lang } = useLanguage();
  const run = useServerFn(matchProject);
  const [goals, setGoals] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Extract<MatchResult, { ok: true }> | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (goals.trim().length < 10) return setError(l(T.short));
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await run({ data: { goals, budget, timeline, lang } });
      if (res.ok) setResult(res);
      else setError(l(T[res.error === 'invalid' ? 'unavailable' : res.error]));
    } catch {
      setError(l(T.unavailable));
    } finally {
      setLoading(false);
    }
  };

  const chip = (active: boolean) =>
    `min-h-11 rounded-full border px-4 py-2 text-sm transition-colors ${
      active ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:border-primary'
    }`;

  const empty = result && result.services.length === 0 && result.projects.length === 0 && result.posts.length === 0;

  return (
    <>
      <PageHeader eyebrow="AI" title={l(T.title)} subtitle={l(T.subtitle)} />
      <Section>
        <form onSubmit={submit} className="glass mx-auto max-w-3xl rounded-[2rem] p-5 sm:p-8 md:p-10">
          <label htmlFor="goals" className="mb-3 block font-display text-lg font-bold">
            {l(T.goals)}
          </label>
          <textarea
            id="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            maxLength={2000}
            rows={6}
            placeholder={l(T.placeholder)}
            className="w-full resize-y rounded-2xl border border-input bg-card/50 px-5 py-4 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <fieldset>
              <legend className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">{l(T.budget)}</legend>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button type="button" key={b} onClick={() => setBudget(budget === b ? '' : b)} className={chip(budget === b)}>
                    {b}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">{l(T.timeline)}</legend>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map((tl) => (
                  <button type="button" key={tl.en} onClick={() => setTimeline(timeline === tl.en ? '' : tl.en)} className={chip(timeline === tl.en)}>
                    {l(tl)}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-display font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:opacity-70 sm:w-auto"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
            {loading ? l(T.loading) : l(T.submit)}
          </button>
          <p aria-live="polite" className="mt-4 min-h-6 text-sm text-destructive">
            {error}
          </p>
        </form>

        {result && (
          <div aria-live="polite" className="mx-auto mt-12 max-w-5xl space-y-12">
            {empty && <p className="text-center text-muted-foreground">{l(T.empty)}</p>}
            {result.services.length > 0 && (
              <div>
                <h2 className="mb-6 font-display text-2xl font-extrabold md:text-4xl">{l(T.services)}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {result.services.map((m) => {
                    const s = servicesData.find((x) => x.slug === m.slug);
                    if (!s) return null;
                    return (
                      <Link key={m.slug} to={`/services/${m.slug}`} className="glass group rounded-3xl p-6 transition-colors hover:border-primary">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl font-bold group-hover:text-primary">{l(s.title)}</h3>
                          <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:rotate-45" />
                        </div>
                        <p className="mt-3 text-muted-foreground">{m.reason}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {result.projects.length > 0 && (
              <div>
                <h2 className="mb-6 font-display text-2xl font-extrabold md:text-4xl">{l(T.projects)}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {result.projects.map((m) => {
                    const p = projectsData.find((x) => x.slug === m.slug);
                    if (!p) return null;
                    return (
                      <Link key={m.slug} to={`/projects/${m.slug}`} className="glass group overflow-hidden rounded-3xl transition-colors hover:border-primary">
                        <img {...responsiveImage(p.cover, '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw')} alt={l(p.title)} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                        <div className="p-5">
                          <h3 className="font-display text-lg font-bold group-hover:text-primary">{l(p.title)}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{m.reason}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {result.posts.length > 0 && (
              <div>
                <h2 className="mb-6 font-display text-2xl font-extrabold md:text-4xl">{l(T.posts)}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {result.posts.map((m) => {
                    const b = blogData.find((x) => x.slug === m.slug);
                    if (!b) return null;
                    return (
                      <Link key={m.slug} to={`/blog/${m.slug}`} className="glass group rounded-3xl p-6 transition-colors hover:border-primary">
                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          {b.date} · {b.readMin} min
                        </p>
                        <h3 className="mt-2 font-display text-xl font-bold group-hover:text-primary">{l(b.title)}</h3>
                        <p className="mt-3 text-muted-foreground">{m.reason}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="text-center">
              <Link to="/contact" className="inline-flex min-h-12 items-center rounded-full bg-primary px-8 py-4 font-display font-bold text-primary-foreground shadow-glow">
                {l(T.cta)} →
              </Link>
            </div>
          </div>
        )}
      </Section>
    </>
  );
};
