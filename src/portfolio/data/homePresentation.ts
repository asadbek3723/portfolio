import type { Localized } from '../types';
export const experienceYears = 3;
export type Stat = { value: number; suffix?: string; label: Localized };
export const defaultStats: Stat[] = [
  { value: 50, suffix: '+', label: { uz: 'Loyiha', en: 'Projects', ru: 'Проектов' } },
  { value: 30, suffix: '+', label: { uz: 'Mijoz', en: 'Clients', ru: 'Клиентов' } },
  { value: 16, suffix: '', label: { uz: 'Sertifikat', en: 'Certificates', ru: 'Сертификатов' } },
  { value: 3, suffix: '', label: { uz: 'Mukofot', en: 'Awards', ru: 'Наград' } },
];
