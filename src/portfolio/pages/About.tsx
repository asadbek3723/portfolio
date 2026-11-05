import { defaultStats } from '../data/homePresentation';
import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';
import { Counter } from '../components/Counter';

export const About: React.FC = () => {
  const { profileData, timelineData } = useSiteData();
  const { l } = useLanguage();

  const stats = profileData.stats?.length ? profileData.stats : defaultStats;

  return (
    <>
      <PageHeader
        eyebrow="about"
        title={l({ uz: 'Men haqimda', en: 'About me', ru: 'Обо мне' })}
        subtitle={l({
          uz: "Dasturlash menga karyera emas, san'at. Har bir piksel va har bir satr kod muhim.",
          en: "Coding isn't just a career for me — it's a craft. Every pixel and every line matters.",
          ru: 'Код для меня не просто карьера, а ремесло. Важен каждый пиксель и каждая строка.',
        })}
      />

      {/* Main Bio Grid */}
      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-orb opacity-40 blur-2xl" />
              <img
                src={profileData.portrait || '/assets/asadbek-portrait.jpg'}
                alt={profileData.name}
                width={1024}
                height={1280}
                className="relative aspect-[4/5] w-full rounded-[2rem] border border-border object-cover"
              />
            </div>
          </FadeIn>

          <div>
            <FadeIn>
              <p className="text-2xl font-medium leading-relaxed md:text-3xl font-display">
                {l(profileData.bio)}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  {l({
                    uz: "Men Toshkentda tug'ilgan va o'sganman. 2022-yildan buyon veb-dasturlash bilan shug'ullanaman — avval freelance, keyin startuplar va xalqaro mijozlar bilan. Eng ko'p quvonadigan narsam — foydalanuvchi mening yaratgan mahsulotimni ochib, \"voh, zo'r!\" degan payt.",
                    en: "I was born and raised in Tashkent. Since 2022 I've been building for the web — first freelance, then startups and international clients. Nothing beats the moment a user opens something I built and goes \"wow.\"",
                    ru: 'Я родился и вырос в Ташкенте. С 2022 года занимаюсь веб-разработкой — сначала фриланс, потом стартапы и международные клиенты.',
                  })}
                </p>
                <p>
                  {l({
                    uz: "Bugunga qadar 50+ loyiha yetkazib berdim, hackathonlarda g'olib chiqdim va IT Park rezidentiga aylandim. Lekin eng katta yutuğim — o'rganishni hech qachon to'xtatmaslik.",
                    en: "So far I've delivered 50+ projects, won hackathons and become an IT Park resident. But my biggest achievement is never stopping learning.",
                    ru: 'Я сдал более 100 проектов, побеждал в хакатонах и стал резидентом IT Park.',
                  })}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {l(profileData.location)}
                </span>
                <span className="rounded-full border border-border px-4 py-2">
                  {profileData.email}
                </span>
              </div>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
                >
                  <span>
                    {l({
                      uz: 'Birga ishlaylik',
                      en: "Let's work together",
                      ru: 'Поработаем вместе',
                    })}
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Stats Counter Section */}
      <Section>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="bg-background p-8">
              <p className="font-display text-5xl font-extrabold md:text-6xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{l(stat.label)}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* Journey Timeline */}
      <Section>
        <h2 className="mb-16 text-4xl font-extrabold md:text-6xl font-display">
          {l({ uz: "Yo'lim", en: 'My journey', ru: 'Мой путь' })}
        </h2>
        <div className="relative ml-3 border-l border-border pl-10">
          {timelineData.map((item, idx) => (
            <FadeIn key={item.id} delay={idx * 0.1} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[3.35rem] top-2 h-4 w-4 rounded-full border-2 border-primary bg-background" />
              <p className="font-mono text-sm text-primary">
                {item.year} · {item.place}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold">{l(item.title)}</h3>
              <p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
                {l(item.description)}
              </p>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
};
