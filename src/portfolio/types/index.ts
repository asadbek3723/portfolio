export type Language = 'uz' | 'en' | 'ru';

export interface Localized<T = string> {
  uz: T;
  en: T;
  ru: T;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ProfileSettings {
  name: string;
  role: Localized;
  bio: Localized;
  stats?: { value: number; suffix?: string; label: Localized }[];
  email: string;
  phone: string;
  location: Localized;
  socials: SocialLink[];
  cvUrl: string;
  /** Profile photo (Supabase Storage URL or site path). */
  portrait?: string;
  available: boolean;
}

export interface ProjectMetric {
  value: number;
  suffix?: string;
  label: Localized;
}

export interface ProjectStackGroup {
  group: Localized;
  items: string[];
}

export interface ProjectFeature {
  title: Localized;
  text: Localized;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  caption?: Localized;
}

export interface ProjectDetail {
  role: Localized;
  client: string;
  duration: Localized;
  team: Localized;
  status: Localized;
  overview: Localized;
  contributions: Localized[];
  features: ProjectFeature[];
  metrics: ProjectMetric[];
  stackGroups: ProjectStackGroup[];
  media: MediaItem[];
}

export interface Project {
  id: string;
  slug: string;
  featured: boolean;
  year: number;
  category: 'fullstack' | 'mobile' | 'web' | 'open-source';
  title: Localized;
  summary: Localized;
  problem: Localized;
  solution: Localized;
  stack: string[];
  cover: string;
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
  detail?: ProjectDetail;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  level: number;
}

export interface ProcessStep {
  title: Localized;
  text: Localized;
}

export interface PricingPackage {
  name: Localized;
  price: Localized;
  features: Localized[];
  highlighted?: boolean;
}

export interface ServiceDetail {
  slug: string;
  cover: string;
  tagline: Localized;
  overview: Localized;
  included: Localized[];
  process: ProcessStep[];
  deliverables: Localized[];
  timeline: Localized;
  packages: PricingPackage[];
  relatedProjects: string[];
  faq: { q: Localized; a: Localized }[];
}

export interface Service {
  id: string;
  slug: string;
  icon: string;
  title: Localized;
  description: Localized;
  tagline?: Localized;
  price: Localized;
  timeline?: Localized;
  cover?: string;
  detail?: ServiceDetail;
}

export interface EventOutcome {
  value: number;
  suffix?: string;
  label: Localized;
}

export interface EventDetail {
  slug: string;
  cover: string;
  story: Localized;
  highlights: Localized[];
  outcomes: EventOutcome[];
  media: MediaItem[];
  links: { label: string; url: string }[];
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  date: string;
  role: Localized;
  description: Localized;
  cover: string;
  detail?: EventDetail;
}

export interface AchievementDetail {
  slug: string;
  cover: string;
  story: Localized;
  built: Localized;
  team: Localized;
  feedback?: { quote: Localized; author: string };
  media: { type: 'image'; src: string }[];
  relatedProject?: string;
}

export interface Achievement {
  id: string;
  slug: string;
  date: string;
  title: Localized;
  description: Localized;
  place: Localized;
  cover?: string;
  detail?: AchievementDetail;
}

export interface CertificateDetail {
  slug: string;
  credentialId: string;
  hours: number;
  skills: string[];
  description: Localized;
  image: string;
  verifyUrl: string;
}

export interface Certificate {
  id: string;
  slug: string;
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialId?: string;
  hours?: number;
  verifyUrl?: string;
  image?: string;
  detail?: CertificateDetail;
}

export interface GalleryItem {
  id: string;
  src: string;
  caption: Localized;
  tall?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  date: string;
  readMin: number;
  tags: string[];
  title: Localized;
  excerpt: Localized;
  body: Localized;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: Localized;
}

export interface FAQItem {
  id: string;
  q: Localized;
  a: Localized;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: Localized;
  place: string;
  description: Localized;
}

export interface UsesItem {
  id: string;
  group: string;
  name: string;
  note: Localized;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}
