import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useContactInfo, useProjects, useServices, useAboutSection } from '../hooks/useSupabaseData';
import { generateAllStructuredData } from '../utils/structuredData';

export default function SEOHead() {
    const { i18n } = useTranslation();
    const { contactInfo } = useContactInfo();
    const { projects } = useProjects();
    const { services } = useServices();
    const { aboutData } = useAboutSection();

    const currentLanguage = i18n.language || 'uz';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jumanazarov.uz';

    // Generate structured data
    const structuredData = generateAllStructuredData(
        contactInfo,
        projects,
        services,
        aboutData,
        currentLanguage
    );

    // Generate meta keywords from projects and services
    const projectNames = projects?.map(p => {
        const titleKey = `title_${currentLanguage}` as keyof typeof p;
        return p[titleKey] || p.title_uz;
    }).filter(Boolean).join(', ') || '';

    const serviceNames = services?.map(s => {
        const titleKey = `title_${currentLanguage}` as keyof typeof s;
        return s[titleKey] || s.title_uz;
    }).filter(Boolean).join(', ') || '';

    const phone = contactInfo?.phone || '+998200093723';
    const email = contactInfo?.email || 'asadbekjumanazarov@gmail.com';

    // Comprehensive keywords - Local SEO + Tech SEO
    // Comprehensive keywords - Local SEO + Tech SEO
    const localKeywords = [
        'shovot', 'xorazm', 'urganch', 'uzbekistan', 'xorazim viloyati', 'shovot tumani',
        'shovotlik dasturchi', 'xorazmlik dasturchi', 'uzbekistonlik dasturchi',
        'shovot it', 'shovot dasturlash', 'shovot texnopark', 'shovotliklar',
        'шовот', 'хоразм', 'урганч', 'узбекистан', 'хоразим вилояти', 'шовот тумани',
        'шовотлик дастурчи', 'хоразмлик дастурчи', 'узбекистонлик дастурчи',
        'shovot developer', 'khorezm developer', 'uzbekistan developer', 'shovot city',
        'shovot dasturchilar', 'shovotda it o\'rganish', 'shovot it maktabi'
    ];

    const techKeywords = [
        'full stack developer', 'react developer', 'typescript developer', 'node.js developer',
        'web developer', 'frontend developer', 'backend developer', 'javascript developer',
        'next.js developer', 'supabase developer', 'postgresql expert', 'tailwind css',
        'api development', 'rest api', 'graphql', 'mongodb', 'software engineer',
        'website developer', 'telegram bot developer', 'crm developer', 'e-commerce developer',
        'landing page creator', 'business website', 'it services', 'coding', 'programming',
        'дастурчи', 'веб дастурчи', 'сайт яратиш', 'сайт қуриш', 'тг бот яратиш', 'it хизматлари',
        'программист', 'веб разработчик', 'создание сайтов', 'разработка ботов'
    ];

    const personalKeywords = [
        'Asadbek Jumanazarov', 'Asadbek', 'Jumanazarov', 'Asadbek Jumanazarov portfolio',
        'kursant77', 'kursant410', 'asadbekjumanazarov', 'asadbek dev', 'asadbek programmer',
        phone, phone.replace(/\s/g, ''),
        email, email.split('@')[0]
    ];

    const keywords = [
        ...personalKeywords,
        ...localKeywords,
        ...techKeywords,
        projectNames,
        serviceNames,
        'Portfolio',
        'CV',
        'Work with me'
    ].filter(Boolean).join(', ');

    const description = `Asadbek Jumanazarov - Professional Full Stack Developer specializing in React, TypeScript, Node.js, and modern IT solutions. High-quality web development services in Uzbekistan. Contact: ${phone} | ${email}. Projects: ${projectNames.substring(0, 150)}. Site Sitelinks: Experience, Projects, Skills, Services, Contact.`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>Asadbek Jumanazarov Azamat o'g'li - Full Stack Developer</title>
            <meta name="title" content={`Asadbek Jumanazarov Azamat o'g'li - Full Stack Developer | Portfolio`} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Asadbek Jumanazarov Azamat o'g'li" />
            <meta name="contact" content={email} />
            <meta name="phone" content={phone} />

            {/* Geo Tags */}
            <meta name="geo.region" content="UZ" />
            <meta name="geo.placename" content="Uzbekistan" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={baseUrl} />
            <meta property="og:title" content="Asadbek Jumanazarov Azamat o'g'li - Full Stack Developer" />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${baseUrl}/photos/asadbek-jumanazarov-portfolio-photos.png`} />
            <meta property="og:locale" content={`${currentLanguage}_${currentLanguage === 'uz' ? 'UZ' : currentLanguage === 'ru' ? 'RU' : 'US'}`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={baseUrl} />
            <meta property="twitter:title" content="Asadbek Jumanazarov Azamat o'g'li - Full Stack Developer" />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${baseUrl}/photos/asadbek-jumanazarov-portfolio-photos.png`} />

            {/* Canonical URL */}
            <link rel="canonical" href={baseUrl} />

            {/* Alternate Languages - Fixed hrefLang */}
            <link rel="alternate" hrefLang="uz" href={`${baseUrl}?lang=uz`} />
            <link rel="alternate" hrefLang="en" href={`${baseUrl}?lang=en`} />
            <link rel="alternate" hrefLang="ru" href={`${baseUrl}?lang=ru`} />
            <link rel="alternate" hrefLang="x-default" href={baseUrl} />

            {/* Structured Data (JSON-LD) */}
            {structuredData.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
}
