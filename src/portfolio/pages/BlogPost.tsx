import { useSiteData } from '@/admin/data/store';
import React from 'react';
import { useParams, Link } from '@/lib/router-compat';
import { NotFoundView } from '../components/NotFoundView';
import { ArrowLeft, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Section } from '../components/Section';
import { FadeIn } from '../components/FadeIn';

export const BlogPost: React.FC = () => {
  const { blogData } = useSiteData();
  const { slug } = useParams<{ slug: string }>();
  const { l } = useLanguage();

  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    return <NotFoundView backTo="/blog" backLabel={l({ uz: 'Blogga qaytish', en: 'Back to blog', ru: 'Назад к блогу' })} />;
  }

  const paragraphs = l(post.body).split('\n\n');

  return (
    <>
      <header className="relative overflow-hidden px-6 pb-16 pt-40 md:px-12">
        <div className="grid-lines pointer-events-none absolute inset-0" />
        <div className="bg-orb animate-orb pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-40 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {l({ uz: 'Blogga qaytish', en: 'Back to blog', ru: 'Назад в блог' })}
          </Link>
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
          <h1 className="mt-6 break-words font-display text-[1.6rem] font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            {l(post.title)}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-xl">
            {l(post.excerpt)}
          </p>
        </div>
      </header>

      <Section className="max-w-3xl">
        <FadeIn>
          <article className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {paragraphs.map((p, idx) => {
              if (p.startsWith('## ')) {
                return <h2 key={idx} className="pt-4 font-display text-2xl font-bold text-foreground md:text-3xl">{p.slice(3)}</h2>;
              }
              if (p.startsWith('~~~')) {
                const code = p.replace(/^~~~[^\n]*\n?/, '').replace(/\n?~~~$/, '');
                return <pre key={idx} className="overflow-x-auto rounded-2xl border border-border bg-card p-5 font-mono text-sm leading-relaxed text-foreground"><code>{code}</code></pre>;
              }
              const lines = p.split('\n');
              if (lines.every((line) => line.startsWith('- '))) {
                return (
                  <ul key={idx} className="list-disc space-y-2 pl-6">
                    {lines.map((line, i) => <li key={i}>{line.slice(2)}</li>)}
                  </ul>
                );
              }
              return <p key={idx}>{p}</p>;
            })}
          </article>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-16 rounded-3xl border border-border bg-card p-8 text-center">
            <p className="font-display text-xl font-bold">
              {l({ uz: 'Bu mavzu yoqdimi?', en: 'Enjoyed this?', ru: 'Понравилось?' })}
            </p>
            <Link
              to="/blog"
              className="mt-4 inline-block font-mono text-sm text-primary hover:underline"
            >
              {l({
                uz: 'Boshqa maqolalar →',
                en: 'More articles →',
                ru: 'Другие статьи →',
              })}
            </Link>
          </div>
        </FadeIn>
      </Section>
    </>
  );
};
