import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import type { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { responsiveImage } from '@/lib/responsive-image';

interface ProjectCardProps {
  project: Project;
  index?: number;
  headingLevel?: 2 | 3;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0, headingLevel = 3 }) => {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const { l } = useLanguage();
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.15 }}
      className={index % 2 ? 'md:mt-24' : ''}
    >
      <Link to={`/projects/${project.slug}`} data-cursor="view" className="group block">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <img
            {...responsiveImage(project.cover, '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw')}
            alt={l(project.title)}
            loading="lazy"
            width={1280}
            height={800}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute right-5 top-5 flex h-14 w-14 scale-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:scale-100">
            <ArrowUpRight className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <Heading className="font-display text-2xl font-bold transition-colors group-hover:text-primary">
              {l(project.title)}
            </Heading>
            <p className="mt-1 text-muted-foreground">{l(project.summary)}</p>
          </div>
          <span className="font-mono text-sm text-muted-foreground">{project.year}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
};
