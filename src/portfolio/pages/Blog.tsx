import { MatchCta } from '../components/MatchCta';
import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { Link } from '@/lib/router-compat';
import { Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageHeader } from '../components/PageHeader';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const Blog: React.FC = () => {
  const { blogData } = useSiteData();
  const { l } = useLanguage();

  return (
    <>
      <PageHeader
        eyebrow="blog"
        title={l({ uz: 'Blog', en: 'Blog', ru: 'Блог' })}
        subtitle={l({
          uz: 'Bilganlarimni ulashaman — katta va kichik kashfiyotlar.',
          en: 'Sharing what I learn — big and small discoveries.',
          ru: 'Делюсь тем, что узнаю.',
        })}
      />
      <Section>
        <div className="grid gap-5 md:gap-8 md:grid-cols-2">
          {blogData.map((post, idx) => (
            <FadeIn key={post.id} delay={(idx % 2) * 0.1}>
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full rounded-3xl border border-border bg-card p-5 md:p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 hover:shadow-glow"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                  <span className="text-primary">{post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readMin} min
                  </span>
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border px-3 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-3 md:mt-5 font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary md:text-3xl">
                  {l(post.title)}
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {l(post.excerpt)}
                </p>
                <p className="mt-4 md:mt-6 font-mono text-sm text-primary">
                  {l({ uz: "O'qish →", en: 'Read →', ru: 'Читать →' })}
                </p>
              </Link>
            </FadeIn>
          ))}
        </div>
        <MatchCta text={{ uz: "Loyihangizni yozing — AI sizga mos maqolalar, xizmatlar va ishlarni tanlaydi.", en: 'Describe your project — AI will pick relevant articles, services and work.', ru: 'Опишите проект — AI подберёт статьи, услуги и работы.' }} />
      </Section>
    </>
  );
};
