import { ContactInfo, Project, Service, AboutSection } from '../types/database';

export interface PersonSchema {
    '@context': string;
    '@type': string;
    name: string;
    jobTitle: string;
    description?: string;
    url: string;
    email?: string;
    telephone?: string;
    image?: string;
    sameAs?: string[];
    knowsAbout?: string[];
    address?: {
        '@type': string;
        addressCountry: string;
    };
}

export interface ContactPointSchema {
    '@context': string;
    '@type': string;
    contactType: string;
    telephone?: string;
    email?: string;
    availableLanguage: string[];
}

export interface CreativeWorkSchema {
    '@context': string;
    '@type': string;
    name: string;
    description: string;
    url: string;
    image?: string;
    author: {
        '@type': string;
        name: string;
    };
    dateCreated?: string;
}

export interface ServiceSchema {
    '@context': string;
    '@type': string;
    serviceType: string;
    provider: {
        '@type': string;
        name: string;
    };
    description?: string;
}

export interface ItemListSchema {
    '@context': string;
    '@type': string;
    itemListElement: Array<{
        '@type': string;
        position: number;
        item: CreativeWorkSchema | { '@type': string; name: string; item: string };
    }>;
}

export interface BreadcrumbListSchema {
    '@context': string;
    '@type': string;
    itemListElement: Array<{
        '@type': string;
        position: number;
        name: string;
        item: string;
    }>;
}

export interface SiteNavigationElementSchema {
    '@context': string;
    '@type': string;
    hasPart: Array<{
        '@type': string;
        name: string;
        url: string;
    }>;
}

export interface WebSiteSchema {
    '@context': string;
    '@type': string;
    url: string;
    name: string;
    publisher: {
        '@type': string;
        name: string;
    };
}

export interface FAQPageSchema {
    '@context': string;
    '@type': string;
    mainEntity: Array<{
        '@type': string;
        name: string;
        acceptedAnswer: {
            '@type': string;
            text: string;
        };
    }>;
}

export function generatePersonSchema(
    contactInfo?: ContactInfo | null,
    aboutData?: AboutSection | null,
    currentLanguage: string = 'uz'
): PersonSchema {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jumanazarov.uz';
    const contentKey = `content_${currentLanguage}` as keyof AboutSection;
    const defaultDesc = 'Professional Full Stack Developer specializing in React, TypeScript, Node.js, and modern web technologies. Experienced in building scalable web applications and e-commerce platforms.';

    return {
        '@type': 'Person',
        name: 'Asadbek Jumanazarov Azamatovich',
        jobTitle: 'Senior Full Stack Developer',
        description: aboutData?.[contentKey] || defaultDesc,
        url: baseUrl,
        email: contactInfo?.email || 'kursant410@gmail.com',
        telephone: contactInfo?.phone || '+998200093723',
        image: `${baseUrl}/photos/asadbek-jumanazarov-portfolio-photos.png`,
        sameAs: [
            contactInfo?.github_url || 'https://github.com/asadbek3723',
            contactInfo?.linkedin_url || 'https://linkedin.com/in/asadbek',
            contactInfo?.telegram_url || 'https://t.me/jumanazarov3723'
        ].filter(Boolean),
        knowsAbout: [
            'React',
            'TypeScript',
            'JavaScript',
            'Node.js',
            'Full Stack Development',
            'Web Development',
            'Tailwind CSS'
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'UZ'
        }
    };
}

export function generateContactPointSchema(
    contactInfo?: ContactInfo | null
): ContactPointSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: contactInfo?.phone || '+998900033723',
        email: contactInfo?.email || 'kursant410@gmail.com',
        availableLanguage: ['Uzbek', 'English', 'Russian']
    };
}

export function generateProjectSchema(
    project: Project,
    currentLanguage: string = 'uz'
): CreativeWorkSchema {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jumanazarov.uz';

    const titleKey = `title_${currentLanguage}` as keyof Project;
    const descKey = `description_${currentLanguage}` as keyof Project;

    return {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: (project[titleKey] as string) || project.title_uz || '',
        description: (project[descKey] as string) || project.description_uz || '',
        url: project.demo_url,
        image: project.image,
        author: {
            '@type': 'Person',
            name: 'Asadbek Jumanazarov'
        },
        dateCreated: project.created_at
    };
}

export function generateServiceSchema(
    service: Service,
    currentLanguage: string = 'uz'
): ServiceSchema {
    const titleKey = `title_${currentLanguage}` as keyof Service;

    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: (service[titleKey] as string) || service.title_uz || '',
        provider: {
            '@type': 'Person',
            name: 'Asadbek Jumanazarov'
        }
    };
}

export function generateItemListSchema(
    projects: Project[],
    currentLanguage: string = 'uz'
): ItemListSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: generateProjectSchema(project, currentLanguage)
        }))
    };
}

export function generateBreadcrumbSchema(baseUrl: string): BreadcrumbListSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Projects',
                item: `${baseUrl}#projects`
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'Skills',
                item: `${baseUrl}#skills`
            },
            {
                '@type': 'ListItem',
                position: 4,
                name: 'Services',
                item: `${baseUrl}#services`
            },
            {
                '@type': 'ListItem',
                position: 5,
                name: 'Contact',
                item: `${baseUrl}#contact`
            }
        ]
    };
}

export function generateWebSiteSchema(baseUrl: string): WebSiteSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        url: baseUrl,
        name: 'Asadbek Jumanazarov - Full Stack Developer',
        publisher: {
            '@type': 'Person',
            name: 'Asadbek Jumanazarov'
        }
    };
}

export function generateNavigationSchema(baseUrl: string): SiteNavigationElementSchema {
    return {
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        hasPart: [
            { '@type': 'WebPage', name: 'Home', url: baseUrl },
            { '@type': 'WebPage', name: 'Skills', url: `${baseUrl}#skills` },
            { '@type': 'WebPage', name: 'Projects', url: `${baseUrl}#projects` },
            { '@type': 'WebPage', name: 'Services', url: `${baseUrl}#services` },
            { '@type': 'WebPage', name: 'CV', url: `${baseUrl}#cv` },
            { '@type': 'WebPage', name: 'Contact', url: `${baseUrl}#contact` }
        ]
    };
}

export function generateFAQSchema(aboutData?: AboutSection | null, currentLanguage: string = 'uz'): FAQPageSchema {
    const contentKey = `content_${currentLanguage}` as keyof AboutSection;
    const aboutContent = aboutData?.[contentKey] || "";

    const faqs = {
        uz: [
            {
                q: "Asadbek Jumanazarov kim?",
                a: aboutContent || "Asadbek Jumanazarov - O'zbekistonning Xorazm viloyati Shovot tumanidan bo'lgan professional Full Stack dasturchi. U React, TypeScript va Node.js texnologiyalari bo'yicha mutaxassis."
            },
            {
                q: "Asadbek Jumanazarov qanday xizmatlarni taklif qiladi?",
                a: "U veb-saytlar yaratish, CRM tizimlarini ishlab chiqish, Telegram botlar yaratish va e-tijorat loyihalarini amalga oshirish xizmatlarini taklif etadi."
            },
            {
                q: "Asadbek Jumanazarov bilan qanday bog'lanish mumkin?",
                a: "U bilan +998 90 003 37 23 telefon raqami yoki kursant410@gmail.com elektron pochtasi orqali bog'lanish mumkin."
            }
        ],
        en: [
            {
                q: "Who is Asadbek Jumanazarov?",
                a: aboutContent || "Asadbek Jumanazarov is a professional Full Stack Developer from Shovot, Khorezm region, Uzbekistan. He specializes in React, TypeScript, and Node.js."
            },
            {
                q: "What services does Asadbek Jumanazarov offer?",
                a: "He offers web development, CRM system development, Telegram bot creation, and e-commerce project implementation."
            }
        ],
        ru: [
            {
                q: "Что такое веб-разработка?",
                a: "Веб-разработка — это процесс создания веб-сайтов и веб-приложений, включающий в себя как фронтенд (пользовательский интерфейс), так и бэкенд (серверную часть)."
            },
            {
                q: "Какие технологии используются в веб-разработке?",
                a: "В веб-разработке используется множество технологий, включая HTML, CSS, JavaScript, React, Node.js, TypeScript, Python, PHP, а также базы данных (например, PostgreSQL, MongoDB)."
            },
            {
                q: "В чем разница между фронтендом и бэкендом?",
                a: "Фронтенд — это часть веб-сайта, с которой пользователь непосредственно взаимодействует (видимая часть). Бэкенд — это часть веб-сайта, включающая сервер, базу данных и логику приложения, которая не видна пользователю."
            }
        ]
    };

    const languageFaqs = faqs[currentLanguage as keyof typeof faqs] || faqs.uz;

    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: languageFaqs.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a
            }
        }))
    };
}

// Combine all schemas for the main page
export function generateAllStructuredData(
    contactInfo?: ContactInfo | null,
    projects?: Project[],
    services?: Service[],
    aboutData?: AboutSection | null,
    currentLanguage: string = 'uz'
): Array<PersonSchema | ContactPointSchema | ItemListSchema | BreadcrumbListSchema | SiteNavigationElementSchema | WebSiteSchema | FAQPageSchema> {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://jumanazarov.uz';

    const schemas: Array<any> = [
        generatePersonSchema(contactInfo, aboutData, currentLanguage),
        generateContactPointSchema(contactInfo),
        generateBreadcrumbSchema(baseUrl),
        generateNavigationSchema(baseUrl),
        generateWebSiteSchema(baseUrl),
        generateFAQSchema(aboutData, currentLanguage)
    ];

    if (projects && projects.length > 0) {
        schemas.push(generateItemListSchema(projects, currentLanguage));
    }

    return schemas;
}
