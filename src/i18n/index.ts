import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        services: "Services",
        faq: "FAQ",
        cv: "CV",
        contact: "Contact",
      },
      hero: {
        name: "Asadbek Jumanazarov Azamat o'g'li",
        title: "Full Stack Developer",
        bio: "I am a full stack developer who creates modern and efficient websites.",
        contactMe: "Contact Me",
        viewProjects: "View Projects",
        downloadCV: "Download CV",
      },
      skills: {
        title: "My Skills",
        subtitle: "Technologies I work with",
      },
      projects: {
        title: "My Projects",
        subtitle: "Some of my recent work",
        liveDemo: "Live Demo",
        github: "GitHub",
        insta: {
          title: "insta phisher website",
          description:
            "CThis website helps you steal other people's Instagram accounts and device information through phishing.",
        },
        golf: {
          title: "Golf Club Personal Website",
          description:
            "Personal website for golf club with elegant design and member features.",
        },
        scholar: {
          title: "Gallery Website",
          description:
            "Image gallery website with responsive design and smooth animations.",
        },
        cyberShield: {
          title: "Project Cyber ​​Shield",
          description:
            "The purpose of this site is to ensure the safety of Internet users on the Internet.",
        },
        Codygroup: {
          title: "Cody group's website",
          description:
            "The official website of the business support guru named Cody",
        },
        purplebuzz: {
          title: "Purple Buzz buissnes development",
          description: "Purple buzz business consulting group website",
        },
      },
      services: {
        title: "My Services",
        subtitle: "What I can do for you",
        dynamic: "Dynamic website creation with admin panel",
        writing: "Presentation, article, and essay writing",
        teaching: "Online tutoring",
        hosting: "Hosting solutions",
        api: "API integration",
        update: "Website modernization",
        consulting: "Programming consultation",
      },
      cv: {
        title: "My CV",
        subtitle: "Download or view my curriculum vitae",
        download: "Download PDF",
        view: "View CV",
      },
      contact: {
        title: "Contact Me",
        subtitle: "Get in touch",
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        send: "Send Message",
        phone: "Phone",
        social: "Social Media",
      },
      footer: {
        slogan: "Modern, creative and effective web solutions!",
        home: "Home",
        about: "About",
        services: "Services",
        projects: "Projects",
        contact: "Contact",
        rights: "All rights reserved.",
        resourcesTitle: "Resources",
        faq: "FAQ",
        blog: "Blog (soon)",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
      },
    },
  },
  uz: {
    translation: {
      nav: {
        home: "Asosiy",
        about: "Men haqimda",
        skills: "Ko'nikmalar",
        projects: "Loyihalar",
        services: "Xizmatlar",
        faq: "FAQ",
        cv: "CV",
        contact: "Aloqa",
      },
      hero: {
        name: "Asadbek Jumanazarov Azamat o'g'li",
        title: "Full Stack Dasturchi",
        bio: "Men zamonaviy va samarali websaytlar yaratadigan full stack dasturchiman.",
        contactMe: "Aloqaga chiqish",
        viewProjects: "Loyihalarni ko'rish",
        downloadCV: "CV yuklab olish",
      },
      skills: {
        title: "Mening Ko'nikmalarim",
        subtitle: "Men ishlaydigan texnologiyalar",
      },
      projects: {
        title: "Mening Loyihalarim",
        subtitle: "So'nggi ishlarimdan ba'zilari",
        liveDemo: "Jonli Demo",
        github: "GitHub",
        insta: {
          title: "Insta phisher website",
          description:
            "bu websayt boshqalarning instagram akkaunti va qurilma malumotlarini phishing usulida o'g'irlashga yordam beradi",
        },
        golf: {
          title: "Golf Club Shaxsiy Websayti",
          description:
            "Golf klubi uchun nafis dizayn va a'zo funksiyalari bilan shaxsiy websayt.",
        },
        scholar: {
          title: "Galereya Websayti",
          description:
            "Responsive dizayn va silliq animatsiyalar bilan rasm galereyasi websayti.",
        },
        cyberShield: {
          title: "Cyber Shield loyihasi",
          description:
            "Ushbu saytning maqsadi Internetda Internet foydalanuvchilarining xavfsizligini ta'minlashdir.",
        },
        Codygroup: {
          title: "Cody jamoasinging websayti",
          description:
            "cody nomli biznes borasida yordam beruvchi guruning rasmiy websayti",
        },
        purplebuzz: {
          title: "Purple Buzz biznesni rivojlamtirish",
          description:
            "Purple buzz biznes maslahatlar beruvchi guruhning websayti",
        },
      },
      services: {
        title: "Mening Xizmatlarim",
        subtitle: "Siz uchun qila oladigan ishlarim",
        dynamic: "Admin panelga ega dinamik websayt yaratish",
        writing: "Prezentatsiya, maqola va insho yozish",
        teaching: "Online ustozlik",
        hosting: "Hosting masalalarini hal qilish",
        api: "API bilan ishlash",
        update: "Eski websaytlarni yangilash",
        consulting: "Dasturlash bo'yicha maslahat berish",
      },
      cv: {
        title: "Mening CV",
        subtitle: "Mening rezyumeni yuklab oling yoki ko'ring",
        download: "PDF yuklab olish",
        view: "CV ni ko'rish",
      },
      contact: {
        title: "Aloqa",
        subtitle: "Bog'laning",
        name: "Ismingiz",
        email: "Emailingiz",
        message: "Xabaringiz",
        send: "Xabar yuborish",
        phone: "Telefon",
        social: "Ijtimoiy tarmoqlar",
      },
      footer: {
        slogan: "Zamonaviy, kreativ va samarali web yechimlar!",
        home: "Bosh sahifa",
        about: "Biz haqimizda",
        services: "Xizmatlar",
        projects: "Loyihalar",
        contact: "Bog‘lanish",
        rights: "Barcha huquqlar himoyalangan.",
        resourcesTitle: "Resurslar",
        faq: "Savol-javoblar",
        blog: "Blog (tez orada)",
        privacy: "Maxfiylik siyosati",
        terms: "Foydalanish shartlari",
      },
    },
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        about: "Обо мне",
        skills: "Навыки",
        projects: "Проекты",
        services: "Услуги",
        faq: "FAQ",
        cv: "CV",
        contact: "Контакты",
      },
      hero: {
        name: "Асадбек Жуманазаров Азамат ўғли",
        title: "Full Stack Разработчик",
        bio: "Я full stack разработчик, создающий современные и эффективные веб-сайты.",
        contactMe: "Связаться со мной",
        viewProjects: "Посмотреть проекты",
        downloadCV: "Скачать CV",
      },
      skills: {
        title: "Мои Навыки",
        subtitle: "Технологии, с которыми я работаю",
      },
      projects: {
        title: "Мои Проекты",
        subtitle: "Некоторые из моих недавних работ",
        liveDemo: "Демо",
        github: "GitHub",
        insta: {
          title: "сайт инста-фишера",
          description:
            "Этот веб-сайт помогает вам красть чужие аккаунты Instagram и информацию об устройствах с помощью фишинга.",
        },
        golf: {
          title: "Личный веб-сайт Golf Club",
          description:
            "Персональный веб-сайт для гольф-клуба с элегантным дизайном и функциями для участников.",
        },
        scholar: {
          title: "Веб-сайт галереи",
          description:
            "Веб-сайт галереи изображений с адаптивным дизайном и плавными анимациями.",
        },
        cyberShield: {
          title: "Проект КиберЩит",
          description:
            "Целью данного сайта является обеспечение безопасности интернет-пользователей в сети Интернет.",
        },
        Codygroup: {
          title: "Сайт группы Коди",
          description: "Официальный сайт гуру бизнес-поддержки по имени Коди",
        },
        purplebuzz: {
          title: "Развитие бизнеса Purple Buzz",
          description: "Веб-сайт консалтинговой группы Purple Buzz Business",
        },
      },
      services: {
        title: "Мои Услуги",
        subtitle: "Что я могу для вас сделать",
        dynamic: "Создание динамических веб-сайтов с админ-панелью",
        writing: "Написание презентаций, статей и эссе",
        teaching: "Онлайн репетиторство",
        hosting: "Решение проблем с хостингом",
        api: "Работа с API",
        update: "Модернизация старых веб-сайтов",
        consulting: "Консультации по программированию",
      },
      cv: {
        title: "Мое CV",
        subtitle: "Скачайте или просмотрите мое резюме",
        download: "Скачать PDF",
        view: "Просмотреть CV",
      },
      contact: {
        title: "Связаться со мной",
        subtitle: "Давайте поговорим",
        name: "Ваше имя",
        email: "Ваш email",
        message: "Ваше сообщение",
        send: "Отправить сообщение",
        phone: "Телефон",
        social: "Социальные сети",
      },
      footer: {
        slogan: "Современные, креативные и эффективные веб-решения!",
        home: "Главная",
        about: "Обо мне",
        services: "Услуги",
        projects: "Проекты",
        contact: "Контакты",
        rights: "Все права защищены.",
        resourcesTitle: "Ресурсы",
        faq: "Вопросы и ответы",
        blog: "Блог (скоро)",
        privacy: "Политика конфиденциальности",
        terms: "Условия использования",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
