import { myBlogPosts } from './myBlogPosts';
import { latestBlogPosts } from './latestBlogPosts';
import type {
  ProfileSettings,
  Project,
  Skill,
  Service,
  Certificate,
  Achievement,
  EventItem,
  GalleryItem,
  BlogPost,
  Testimonial,
  FAQItem,
  TimelineItem,
  UsesItem
} from '../types';

export const profileData: ProfileSettings = {
  "name": "Asadbek Jumanazarov",
  "role": {
    "uz": "Full-Stack Developer · TRICORP hammuassisi",
    "en": "Full-Stack Developer · Co-Founder at TRICORP",
    "ru": "Full-Stack разработчик · сооснователь TRICORP"
  },
  "bio": {
    "uz": "TRICORP hammuassisi va Full-Stack dasturchiman. Masshtablanadigan dasturiy yechimlar quraman va biznes talablarini ishonchli texnologiyaga aylantiraman.",
    "en": "Full-Stack Developer and Co-Founder at TRICORP. I build scalable software, design efficient systems and turn business requirements into reliable technology.",
    "ru": "Full-Stack разработчик и сооснователь TRICORP. Создаю масштабируемое программное обеспечение и превращаю бизнес-требования в надёжные технологии."
  },
  "email": "asadbek@jumanazarov.uz",
  "phone": "+998 91 999 37 23",
  "location": {
    "uz": "Shovot, Xorazm, O'zbekiston",
    "en": "Shovot, Khorezm, Uzbekistan",
    "ru": "Шават, Хорезм, Узбекистан"
  },
  "portrait": "/assets/asadbek-jumanazarov-software-developer.jpg",
  "socials": [
    {
      "label": "GitHub",
      "url": "https://github.com/asadbek3723"
    },
    {
      "label": "LinkedIn",
      "url": "https://uz.linkedin.com/in/jumanazarovasadbek"
    },
    {
      "label": "Telegram",
      "url": "https://t.me/jumanazarov3723"
    },
    {
      "label": "Instagram",
      "url": "https://instagram.com/jumanazarov3723"
    },
    {
      "label": "YouTube",
      "url": "https://www.youtube.com/@Asadbek_dev"
    }
  ],
  "cvUrl": "https://odckcrbdompiaqvfdxlb.supabase.co/storage/v1/object/public/media/cv/Asadbek_Jumanazarov_CV.pdf?download=Asadbek_Jumanazarov_CV.pdf",
  "available": true
};

export const projectsData: Project[] = [
  {
    "id": "5",
    "slug": "uzex-ai",
    "featured": true,
    "year": 2026,
    "category": "fullstack",
    "title": {
      "uz": "UZEX AI",
      "en": "UZEX AI",
      "ru": "UZEX AI"
    },
    "summary": {
      "uz": "Birja bitimlari reyestri bo'yicha aniq javob beradigan sun'iy intellekt yordamchisi",
      "en": "An AI assistant that gives precise answers from the exchange trade registry",
      "ru": "ИИ-ассистент, дающий точные ответы по реестру биржевых сделок"
    },
    "problem": {
      "uz": "Birja bitimlari ma'lumotlari katta va murakkab jadvallarda bo'lgani uchun oddiy savollarga (eng ko'p sotilgan tovar, eng yirik sotuvchi, o'rtacha narx) javob topish uzoq vaqt olardi.",
      "en": "Exchange trade data lives in large, complex tables, so even simple questions (top-selling goods, biggest seller, average price) took a long time to answer.",
      "ru": "Данные о биржевых сделках лежат в больших сложных таблицах, поэтому даже простые вопросы (самые продаваемые товары, крупнейший продавец, средняя цена) требовали много времени."
    },
    "solution": {
      "uz": "Tabiiy tilda savol berish mumkin bo'lgan chat: tizim reyestrdan aniq javob qaytaradi, jonli bozor narxlarini ko'rsatadi va o'zbek hamda rus tillarida ishlaydi.",
      "en": "A chat where you ask in plain language: the system returns precise answers from the registry, shows live market prices and works in Uzbek and Russian.",
      "ru": "Чат, где можно задавать вопросы обычным языком: система выдаёт точные ответы из реестра, показывает живые рыночные цены и работает на узбекском и русском."
    },
    "stack": [
      "AI",
      "Chat UI",
      "Render"
    ],
    "cover": "/assets/uzex-ai-chat-platform-exchange-trades.jpg",
    "images": [
      "/assets/uzex-ai-chat-platform-exchange-trades.jpg"
    ],
    "liveUrl": "https://uzex-ai.onrender.com/",
    "detail": {
      "role": {
        "uz": "Full-stack dasturchi",
        "en": "Full-stack developer",
        "ru": "Full-stack разработчик"
      },
      "client": "Tricorp Agency",
      "duration": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "team": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "status": {
        "uz": "Ishga tushirilgan",
        "en": "Live",
        "ru": "Запущен"
      },
      "overview": {
        "uz": "UZEX AI — birja bitimlari reyestri bo'yicha aniq javoblar beradigan AI-chat platformasi. Foydalanuvchi o'zbek yoki rus tilida savol beradi, tizim esa bitimlar ma'lumotlari asosida sotuvchilar, tovarlar, aylanma va narxlar bo'yicha tayyor javob qaytaradi. Interfeys jonli bozor ko'rsatkichlari (mis, bug'doy, paxta, shakar, Brent nefti) bilan boyitilgan.",
        "en": "UZEX AI is an AI chat platform that gives precise answers from the exchange trade registry. Users ask in Uzbek or Russian and the system answers about sellers, goods, turnover and prices from the trade data. The interface is enriched with a live ticker of market indicators (copper, wheat, cotton, sugar, Brent oil).",
        "ru": "UZEX AI — AI-чат платформа, дающая точные ответы по реестру биржевых сделок. Пользователь спрашивает на узбекском или русском, а система отвечает по продавцам, товарам, обороту и ценам на основе данных сделок. Интерфейс дополнен живой лентой рыночных показателей (медь, пшеница, хлопок, сахар, нефть Brent)."
      },
      "contributions": [
        {
          "uz": "Chat interfeysini noldan loyihalash va ishlab chiqish: yangi chat, qidiruv va chatlar tarixi.",
          "en": "Designed and built the chat interface from scratch: new chat, search and chat history.",
          "ru": "С нуля спроектировал и разработал интерфейс чата: новый чат, поиск и история чатов."
        },
        {
          "uz": "Savollarni birja bitimlari ma'lumotlari bilan bog'lab, aniq javob qaytaradigan AI oqimini yaratish.",
          "en": "Built the AI flow that connects questions to trade data and returns precise answers.",
          "ru": "Построил AI-сценарий, связывающий вопросы с данными сделок и возвращающий точные ответы."
        },
        {
          "uz": "Jonli bozor narxlari lentasini qo'shish.",
          "en": "Added the live market price ticker.",
          "ru": "Добавил ленту живых рыночных цен."
        },
        {
          "uz": "O'zbek va rus tillarini, ovozli kiritishni va tayyor takliflarni qo'llab-quvvatlash.",
          "en": "Added Uzbek and Russian support, voice input and ready-made suggested questions.",
          "ru": "Реализовал поддержку узбекского и русского языков, голосовой ввод и готовые подсказки."
        }
      ],
      "features": [
        {
          "title": {
            "uz": "Tabiiy tilda savol",
            "en": "Plain-language questions",
            "ru": "Вопросы обычным языком"
          },
          "text": {
            "uz": "\"Eng katta 3 ta sotuvchi kim?\" kabi savollarga STIR raqami bilan javob.",
            "en": "Answers questions like \"Who are the top 3 sellers?\" including their tax ID.",
            "ru": "Отвечает на вопросы вроде «Кто три крупнейших продавца?» с указанием ИНН."
          }
        },
        {
          "title": {
            "uz": "Jonli bozor lentasi",
            "en": "Live market ticker",
            "ru": "Живая лента рынка"
          },
          "text": {
            "uz": "Mis, bug'doy, paxta, shakar va Brent nefti narxlari o'zgarishi bilan.",
            "en": "Copper, wheat, cotton, sugar and Brent prices with daily changes.",
            "ru": "Цены на медь, пшеницу, хлопок, сахар и нефть Brent с изменениями."
          }
        },
        {
          "title": {
            "uz": "Ikki til va ovoz",
            "en": "Two languages and voice",
            "ru": "Два языка и голос"
          },
          "text": {
            "uz": "O'zbekcha va ruscha interfeys, mikrofon orqali kiritish.",
            "en": "Uzbek and Russian interface with microphone input.",
            "ru": "Интерфейс на узбекском и русском, ввод через микрофон."
          }
        },
        {
          "title": {
            "uz": "Ro'yxatdan o'tishsiz",
            "en": "No sign-up needed",
            "ru": "Без регистрации"
          },
          "text": {
            "uz": "Chatlar faqat foydalanuvchi brauzerida saqlanadi.",
            "en": "Chats are stored only in the user's browser.",
            "ru": "Чаты хранятся только в браузере пользователя."
          }
        }
      ],
      "metrics": [],
      "stackGroups": [
        {
          "group": {
            "uz": "Mahsulot",
            "en": "Product",
            "ru": "Продукт"
          },
          "items": [
            "AI chat",
            "Live market data"
          ]
        },
        {
          "group": {
            "uz": "Joylashtirish",
            "en": "Hosting",
            "ru": "Хостинг"
          },
          "items": [
            "Render"
          ]
        }
      ],
      "media": [
        {
          "type": "image",
          "src": "/assets/uzex-ai-chat-platform-exchange-trades.jpg",
          "caption": {
            "uz": "Bosh ekran",
            "en": "Main screen",
            "ru": "Главный экран"
          }
        }
      ]
    }
  },
  {
    "id": "1",
    "slug": "mazzy-express",
    "featured": true,
    "year": 2026,
    "category": "web",
    "title": {
      "uz": "Mazzy Express — avtomobil tashish platformasi",
      "en": "Mazzy Express — Auto Transport Platform",
      "ru": "Mazzy Express — платформа автоперевозок"
    },
    "summary": {
      "uz": "AQShdagi avtomobil tashish brokeri uchun tezkor narx hisoblash va bron qilish platformasi",
      "en": "Nationwide U.S. auto transport brokerage with instant quotes and real-time booking",
      "ru": "Платформа автоброкера по США с мгновенным расчётом стоимости и онлайн-бронированием"
    },
    "problem": {
      "uz": "Mijozlar avtomobil tashish narxini bilish uchun qo'ng'iroq qilib, kutib qolardi va tashuvchi topish qiyin edi.",
      "en": "Customers had to call and wait to learn the price of shipping a car, and finding a reliable carrier was slow.",
      "ru": "Клиентам приходилось звонить и ждать, чтобы узнать цену перевозки, а поиск надёжного перевозчика занимал много времени."
    },
    "solution": {
      "uz": "Bir necha qadamli narx hisoblash vizardi, tashuvchilar tarmog'i bilan real vaqtda bron qilish va ingliz/ispan tillarida to'liq lokalizatsiya.",
      "en": "A step-by-step instant quote wizard, real-time booking through the carrier network and full English/Spanish localization.",
      "ru": "Пошаговый калькулятор стоимости, бронирование через сеть перевозчиков в реальном времени и полная локализация на английский и испанский."
    },
    "stack": [
      "Next.js",
      "Tailwind CSS",
      "i18n (EN/ES)",
      "Vercel"
    ],
    "cover": "/assets/mazzy-express-auto-transport-platform.jpg",
    "images": [
      "/assets/mazzy-express-auto-transport-platform.jpg"
    ],
    "liveUrl": "https://www.mazzyexpress.com",
    "detail": {
      "role": {
        "uz": "Full-stack dasturchi",
        "en": "Full-stack developer",
        "ru": "Full-stack разработчик"
      },
      "client": "Mazzy Express Inc",
      "duration": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "team": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "status": {
        "uz": "Ishga tushirilgan",
        "en": "Live",
        "ru": "Запущен"
      },
      "overview": {
        "uz": "Mazzy Express — AQSh bo'ylab ishlaydigan avtomobil tashish brokerlik kompaniyasi uchun yaratilgan veb-platforma. Sayt tezkor narx olish, tashuvchilar bilan bron qilish va ikki tilli (ingliz/ispan) mijozlar uchun qulay tajribani taqdim etadi.",
        "en": "Mazzy Express is a web platform built for a nationwide U.S. auto transport brokerage. It gives customers instant pricing, booking through a carrier network and a polished bilingual (English/Spanish) experience.",
        "ru": "Mazzy Express — веб-платформа для автотранспортной брокерской компании, работающей по всей территории США. Клиенты получают мгновенный расчёт, бронирование через сеть перевозчиков и удобный двуязычный интерфейс (английский/испанский)."
      },
      "contributions": [
        {
          "uz": "Next.js asosida butun frontendni noldan loyihalash va ishlab chiqish.",
          "en": "Designed and built the entire frontend on Next.js from scratch.",
          "ru": "Спроектировал и с нуля разработал весь фронтенд на Next.js."
        },
        {
          "uz": "Tezkor narx hisoblash vizardini va bron qilish oqimini yaratish.",
          "en": "Built the instant quote wizard and the booking flow.",
          "ru": "Реализовал калькулятор стоимости и сценарий бронирования."
        },
        {
          "uz": "Ingliz va ispan tillarida to'liq lokalizatsiyani joriy qilish.",
          "en": "Implemented full English and Spanish localization.",
          "ru": "Внедрил полную локализацию на английский и испанский."
        },
        {
          "uz": "Tailwind CSS bilan barcha qurilmalarga mos tezkor dizayn.",
          "en": "Delivered a fast, responsive UI with Tailwind CSS.",
          "ru": "Сделал быстрый адаптивный интерфейс на Tailwind CSS."
        }
      ],
      "features": [
        {
          "title": {
            "uz": "Tezkor narx",
            "en": "Instant quote",
            "ru": "Мгновенный расчёт"
          },
          "text": {
            "uz": "Bir necha qadamda avtomobil tashish narxini hisoblash.",
            "en": "Get a car shipping price in a few simple steps.",
            "ru": "Расчёт стоимости перевозки за несколько шагов."
          }
        },
        {
          "title": {
            "uz": "Real vaqtda bron",
            "en": "Real-time booking",
            "ru": "Бронирование онлайн"
          },
          "text": {
            "uz": "Tashuvchilar tarmog'i orqali buyurtmani darhol rasmiylashtirish.",
            "en": "Book directly through the carrier network.",
            "ru": "Оформление заявки через сеть перевозчиков."
          }
        },
        {
          "title": {
            "uz": "Ikki tilli sayt",
            "en": "Bilingual site",
            "ru": "Двуязычный сайт"
          },
          "text": {
            "uz": "Ingliz va ispan tillarida to'liq mazmun.",
            "en": "Complete content in English and Spanish.",
            "ru": "Полный контент на английском и испанском."
          }
        }
      ],
      "metrics": [],
      "stackGroups": [
        {
          "group": {
            "uz": "Frontend",
            "en": "Frontend",
            "ru": "Фронтенд"
          },
          "items": [
            "Next.js",
            "Tailwind CSS"
          ]
        },
        {
          "group": {
            "uz": "Joylashtirish",
            "en": "Hosting",
            "ru": "Хостинг"
          },
          "items": [
            "Vercel"
          ]
        }
      ],
      "media": [
        {
          "type": "image",
          "src": "/assets/mazzy-express-auto-transport-platform.jpg",
          "caption": {
            "uz": "Bosh sahifa",
            "en": "Home page",
            "ru": "Главная страница"
          }
        }
      ]
    }
  },
  {
    "id": "6",
    "slug": "ielts-imperia-mock-exam",
    "featured": true,
    "year": 2026,
    "category": "fullstack",
    "title": {
      "uz": "IELTS Imperia Mock Exam Platform",
      "en": "IELTS Imperia Mock Exam Platform",
      "ru": "IELTS Imperia Mock Exam Platform"
    },
    "summary": {
      "uz": "Haqiqiy imtihon muhitida IELTS mock imtihonlarini o'tkazadigan xavfsiz desktop platforma",
      "en": "A secure desktop platform that runs full-scale IELTS mock exams in a real exam environment",
      "ru": "Защищённая десктоп-платформа для полноформатных пробных экзаменов IELTS в условиях реального экзамена"
    },
    "problem": {
      "uz": "O'quv markazi mock imtihonlarni haqiqiy imtihondek, nazorat ostida va katta guruhlarda o'tkaza olmasdi, natijalarni kuzatish va qoidabuzarliklarni aniqlash qiyin edi.",
      "en": "The learning center could not run mock exams like the real thing, under supervision and with large groups, and tracking results and detecting violations was hard.",
      "ru": "Учебный центр не мог проводить пробные экзамены как настоящие — под контролем и с большими группами, а отслеживать результаты и выявлять нарушения было сложно."
    },
    "solution": {
      "uz": "Windows ilovasi va maxsus imtihon serveri: o'quvchilar noyob test kodi bilan kiradi, vaqt bilan cheklangan bo'limlarni topshiradi, savollar admin boshqaradigan banklardan tasodifiy tanlanadi, qoidabuzarliklar esa real vaqtda kuzatiladi.",
      "en": "A Windows application with a dedicated exam server: students join with a unique test code, complete timed sections with questions drawn at random from an admin-managed bank, and violations are monitored in real time.",
      "ru": "Windows-приложение с отдельным экзаменационным сервером: студенты входят по уникальному коду теста, проходят секции с ограничением по времени, вопросы случайно выбираются из банка под управлением админа, а нарушения отслеживаются в реальном времени."
    },
    "stack": [
      "Electron.js",
      "Desktop",
      "Exam server",
      "Windows"
    ],
    "cover": "/assets/ielts-imperia-mock-exam-platform-student-dashboard.jpg",
    "images": [
      "/assets/ielts-imperia-mock-exam-platform-student-dashboard.jpg",
      "/assets/ielts-imperia-mock-exam-platform-admin-tests.jpg"
    ],
    "detail": {
      "role": {
        "uz": "Full-stack dasturchi",
        "en": "Full-stack developer",
        "ru": "Full-stack разработчик"
      },
      "client": "IELTS Imperia",
      "duration": {
        "uz": "2 oy (2026-yil fevral — mart)",
        "en": "2 months (Feb – Mar 2026)",
        "ru": "2 месяца (февраль — март 2026)"
      },
      "team": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "status": {
        "uz": "Yetkazib berilgan",
        "en": "Delivered",
        "ru": "Сдан"
      },
      "overview": {
        "uz": "IELTS Imperia uchun yaratilgan xavfsiz desktop platforma bo'lib, to'liq hajmli IELTS mock imtihonlarini haqiqiy imtihon muhitida o'tkazish imkonini beradi. O'quvchilar noyob test kodi bilan kiradi va vaqt bilan cheklangan bo'limlarni topshiradi. Har bir o'quvchining shaxsiy akkaunti bor, natijalari saqlanadi va vaqt bo'yicha kuzatiladi, administratorlar esa har bir sessiya ustidan to'liq nazoratga ega.",
        "en": "A secure desktop platform built for IELTS Imperia to run full-scale IELTS mock exams in a real exam environment. Students join with a unique test code and complete timed sections. Each student has a personal account where results are stored and tracked over time, while administrators get full control and visibility over every session.",
        "ru": "Защищённая десктоп-платформа, созданная для IELTS Imperia, для проведения полноформатных пробных экзаменов IELTS в условиях реального экзамена. Студенты входят по уникальному коду теста и проходят секции с ограничением по времени. У каждого студента личный аккаунт, где результаты сохраняются и отслеживаются со временем, а администраторы полностью контролируют каждую сессию."
      },
      "contributions": [
        {
          "uz": "Electron.js asosida Windows ilovasini va imtihon serverini ishlab chiqish.",
          "en": "Built the Windows application on Electron.js together with the dedicated exam server.",
          "ru": "Разработал Windows-приложение на Electron.js и отдельный экзаменационный сервер."
        },
        {
          "uz": "Admin boshqaradigan savollar banki va tasodifiy savol tanlash tizimini yaratish.",
          "en": "Created the admin-managed question bank and random question selection.",
          "ru": "Создал банк вопросов под управлением админа и случайный выбор вопросов."
        },
        {
          "uz": "Real vaqtdagi anti-cheat himoyasi: qoidabuzarlik darhol yoziladi va adminga yuboriladi.",
          "en": "Implemented real-time anti-cheating protection: violations are recorded instantly and sent to the admin.",
          "ru": "Реализовал защиту от списывания в реальном времени: нарушения мгновенно фиксируются и передаются админу."
        },
        {
          "uz": "Shaxsiy akkauntlar, natijalar tarixi va administrator paneli.",
          "en": "Built personal accounts, result history and the administrator panel.",
          "ru": "Сделал личные аккаунты, историю результатов и панель администратора."
        },
        {
          "uz": "Platformani 250 ta kompyuterda bir vaqtda sinovdan o'tkazish.",
          "en": "Stress-tested the platform on 250 computers at the same time.",
          "ru": "Провёл нагрузочное тестирование на 250 компьютерах одновременно."
        }
      ],
      "features": [
        {
          "title": {
            "uz": "Noyob test kodi",
            "en": "Unique test code",
            "ru": "Уникальный код теста"
          },
          "text": {
            "uz": "O'quvchi faqat o'ziga berilgan kod bilan imtihonga kiradi.",
            "en": "Students join the exam only with the code issued for it.",
            "ru": "Студент заходит на экзамен только по выданному коду."
          }
        },
        {
          "title": {
            "uz": "Tasodifiy savollar",
            "en": "Random questions",
            "ru": "Случайные вопросы"
          },
          "text": {
            "uz": "Savollar admin boshqaradigan bankdan tasodifiy tanlanadi.",
            "en": "Questions are drawn at random from an admin-managed bank.",
            "ru": "Вопросы случайно выбираются из банка, которым управляет админ."
          }
        },
        {
          "title": {
            "uz": "Anti-cheat nazorati",
            "en": "Anti-cheat monitoring",
            "ru": "Защита от списывания"
          },
          "text": {
            "uz": "Qoidabuzarlik real vaqtda yoziladi; admin ogohlantiradi yoki o'quvchini testdan chiqaradi.",
            "en": "Violations are recorded in real time; the admin can warn or remove the student from the test.",
            "ru": "Нарушения фиксируются в реальном времени; админ может предупредить или удалить студента с теста."
          }
        },
        {
          "title": {
            "uz": "Natijalar tarixi",
            "en": "Result history",
            "ru": "История результатов"
          },
          "text": {
            "uz": "Har bir o'quvchi natijalarini vaqt bo'yicha kuzatadi.",
            "en": "Each student tracks results over time.",
            "ru": "Каждый студент отслеживает результаты со временем."
          }
        },
        {
          "title": {
            "uz": "Admin boshqaruvi",
            "en": "Admin control",
            "ru": "Управление админа"
          },
          "text": {
            "uz": "Testlar, o'quvchilar, natijalar va sessiyalar bitta panelda.",
            "en": "Tests, students, results and sessions in one panel.",
            "ru": "Тесты, студенты, результаты и сессии в одной панели."
          }
        }
      ],
      "metrics": [
        {
          "value": 250,
          "label": {
            "uz": "kompyuterda bir vaqtda sinov",
            "en": "computers tested at once",
            "ru": "компьютеров в одновременном тесте"
          }
        },
        {
          "value": 0,
          "label": {
            "uz": "lag yoki ishdan chiqish",
            "en": "lags or crashes",
            "ru": "лагов и сбоев"
          }
        }
      ],
      "stackGroups": [
        {
          "group": {
            "uz": "Ilova",
            "en": "Application",
            "ru": "Приложение"
          },
          "items": [
            "Electron.js",
            "Windows"
          ]
        },
        {
          "group": {
            "uz": "Server",
            "en": "Server",
            "ru": "Сервер"
          },
          "items": [
            "Dedicated exam server"
          ]
        }
      ],
      "media": [
        {
          "type": "image",
          "src": "/assets/ielts-imperia-mock-exam-platform-student-dashboard.jpg",
          "caption": {
            "uz": "O'quvchi paneli",
            "en": "Student dashboard",
            "ru": "Панель студента"
          }
        },
        {
          "type": "image",
          "src": "/assets/ielts-imperia-mock-exam-platform-admin-tests.jpg",
          "caption": {
            "uz": "Admin: testlar ro'yxati",
            "en": "Admin: tests list",
            "ru": "Админ: список тестов"
          }
        }
      ]
    }
  },
  {
    "id": "2",
    "slug": "ielts-imperia",
    "featured": true,
    "year": 2025,
    "category": "fullstack",
    "title": {
      "uz": "IELTS Imperia",
      "en": "IELTS Imperia",
      "ru": "IELTS Imperia"
    },
    "summary": {
      "uz": "Ta'lim jarayonini raqamlashtiruvchi onlayn IELTS tayyorlov platformasi",
      "en": "Online IELTS preparation platform that digitalizes the learning process",
      "ru": "Онлайн-платформа подготовки к IELTS, цифровизирующая учебный процесс"
    },
    "problem": {
      "uz": "O'quv markazida kurslar, o'quvchilar va ro'yxatdan o'tish jarayoni qo'lda yuritilar, bu vaqt olar edi.",
      "en": "A learning center managed courses, students and registrations by hand, which took time and caused errors.",
      "ru": "Учебный центр вёл курсы, учеников и регистрацию вручную, что отнимало время и приводило к ошибкам."
    },
    "solution": {
      "uz": "Kurslar, o'quvchilar nazorati va ro'yxatdan o'tish tizimi bir joyda jamlangan, intuitiv interfeysli platforma.",
      "en": "One platform that unites courses, student management and registration behind an intuitive interface.",
      "ru": "Единая платформа с курсами, управлением учениками и регистрацией и интуитивным интерфейсом."
    },
    "stack": [
      "React",
      "Vite",
      "Supabase",
      "Vercel"
    ],
    "cover": "/assets/ielts-imperia-learning-platform-website.jpg",
    "images": [
      "/assets/ielts-imperia-learning-platform-website.jpg"
    ],
    "liveUrl": "https://ieltsimperia.uz",
    "detail": {
      "role": {
        "uz": "Full-stack dasturchi",
        "en": "Full-stack developer",
        "ru": "Full-stack разработчик"
      },
      "client": "IELTS Imperia",
      "duration": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "team": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "status": {
        "uz": "Ishga tushirilgan",
        "en": "Live",
        "ru": "Запущен"
      },
      "overview": {
        "uz": "IELTS Imperia — ta'lim jarayonini raqamlashtirish uchun yaratilgan onlayn platforma. U kurslar, o'quvchilar nazorati, ro'yxatdan o'tish tizimi va intuitiv foydalanuvchi interfeysini to'liq funksionallik bilan birlashtiradi.",
        "en": "IELTS Imperia is an online platform built to digitalize the learning process, combining courses, student management, a registration system and an intuitive interface.",
        "ru": "IELTS Imperia — онлайн-платформа для цифровизации учебного процесса: курсы, управление учениками, система регистрации и интуитивный интерфейс."
      },
      "contributions": [
        {
          "uz": "Platformaning frontend va backend integratsiyasini ishlab chiqish.",
          "en": "Built the platform's frontend and backend integration.",
          "ru": "Разработал фронтенд платформы и интеграцию с бэкендом."
        },
        {
          "uz": "Ro'yxatdan o'tish va o'quvchilarni boshqarish tizimini yaratish.",
          "en": "Implemented the registration and student management system.",
          "ru": "Реализовал систему регистрации и управления учениками."
        },
        {
          "uz": "Kurslar bo'limi va qulay, tushunarli UI dizayni.",
          "en": "Designed the courses section and a clear, friendly UI.",
          "ru": "Создал раздел курсов и понятный дружелюбный интерфейс."
        }
      ],
      "features": [
        {
          "title": {
            "uz": "Kurslar",
            "en": "Courses",
            "ru": "Курсы"
          },
          "text": {
            "uz": "IELTS tayyorlov kurslari va ularning tuzilmasi.",
            "en": "IELTS preparation courses and their structure.",
            "ru": "Курсы подготовки к IELTS и их структура."
          }
        },
        {
          "title": {
            "uz": "O'quvchilar nazorati",
            "en": "Student management",
            "ru": "Управление учениками"
          },
          "text": {
            "uz": "O'quvchilar ma'lumotlari va jarayonini kuzatish.",
            "en": "Track student data and progress.",
            "ru": "Учёт данных и прогресса учеников."
          }
        },
        {
          "title": {
            "uz": "Ro'yxatdan o'tish",
            "en": "Registration",
            "ru": "Регистрация"
          },
          "text": {
            "uz": "Onlayn ro'yxatdan o'tish tizimi.",
            "en": "Online registration system.",
            "ru": "Система онлайн-регистрации."
          }
        }
      ],
      "metrics": [],
      "stackGroups": [
        {
          "group": {
            "uz": "Frontend",
            "en": "Frontend",
            "ru": "Фронтенд"
          },
          "items": [
            "React",
            "Vite"
          ]
        },
        {
          "group": {
            "uz": "Backend",
            "en": "Backend",
            "ru": "Бэкенд"
          },
          "items": [
            "Supabase"
          ]
        },
        {
          "group": {
            "uz": "Joylashtirish",
            "en": "Hosting",
            "ru": "Хостинг"
          },
          "items": [
            "Vercel"
          ]
        }
      ],
      "media": [
        {
          "type": "image",
          "src": "/assets/ielts-imperia-learning-platform-website.jpg",
          "caption": {
            "uz": "Bosh sahifa",
            "en": "Home page",
            "ru": "Главная страница"
          }
        }
      ]
    }
  },
  {
    "id": "3",
    "slug": "house-mobile",
    "featured": true,
    "year": 2026,
    "category": "fullstack",
    "title": {
      "uz": "House Mobile",
      "en": "House Mobile",
      "ru": "House Mobile"
    },
    "summary": {
      "uz": "Telefon va qurilmalarni sotish hamda sotib olish uchun zamonaviy marketplace",
      "en": "A modern marketplace for buying and selling phones and electronic devices",
      "ru": "Современный маркетплейс для покупки и продажи телефонов и электроники"
    },
    "problem": {
      "uz": "Telefon va qurilmalarni ishonchli sotish yoki sotib olish murakkab va tarqoq edi.",
      "en": "Buying or selling phones and devices reliably was complicated and scattered across channels.",
      "ru": "Покупка и продажа телефонов и устройств были сложными и разрозненными."
    },
    "solution": {
      "uz": "Sotish va sotib olish jarayonini soddalashtiruvchi, React + TypeScript va Supabase asosida qurilgan yuqori unumdor, xavfsiz platforma.",
      "en": "A fast, secure platform built with React, TypeScript and Supabase that simplifies the whole buy-and-sell process.",
      "ru": "Быстрая и безопасная платформа на React, TypeScript и Supabase, упрощающая покупку и продажу."
    },
    "stack": [
      "React",
      "TypeScript",
      "Supabase",
      "Vite",
      "Vercel"
    ],
    "cover": "/assets/house-mobile-phone-marketplace.jpg",
    "images": [
      "/assets/house-mobile-phone-marketplace.jpg"
    ],
    "liveUrl": "https://housemobile.vercel.app/",
    "detail": {
      "role": {
        "uz": "Full-stack dasturchi",
        "en": "Full-stack developer",
        "ru": "Full-stack разработчик"
      },
      "client": "House Mobile",
      "duration": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "team": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "status": {
        "uz": "Ishga tushirilgan",
        "en": "Live",
        "ru": "Запущен"
      },
      "overview": {
        "uz": "House Mobile — telefon va mobil qurilmalarni sotish hamda sotib olish jarayonini soddalashtiruvchi innovatsion platforma. Ilova yuqori unumdorlik, xavfsizlik va qulay foydalanuvchi tajribasi uchun React + TypeScript hamda Supabase asosida qurilgan.",
        "en": "House Mobile is an innovative platform that simplifies buying and selling mobile phones and electronic devices. It is built with React, TypeScript and Supabase for performance, security and a seamless user experience.",
        "ru": "House Mobile — инновационная платформа, упрощающая покупку и продажу мобильных телефонов и электроники. Построена на React, TypeScript и Supabase ради производительности, безопасности и удобства."
      },
      "contributions": [
        {
          "uz": "Butun ilovani React va TypeScript'da noldan yaratish.",
          "en": "Built the entire application with React and TypeScript.",
          "ru": "С нуля разработал приложение на React и TypeScript."
        },
        {
          "uz": "Supabase bilan autentifikatsiya, ma'lumotlar bazasi va xavfsizlik qoidalarini sozlash.",
          "en": "Set up authentication, database and security rules with Supabase.",
          "ru": "Настроил аутентификацию, базу данных и правила безопасности в Supabase."
        },
        {
          "uz": "E'lonlar va qidiruv uchun tez, qulay interfeys.",
          "en": "Designed a fast, easy interface for listings and search.",
          "ru": "Сделал быстрый и удобный интерфейс для объявлений и поиска."
        }
      ],
      "features": [
        {
          "title": {
            "uz": "Sotish va sotib olish",
            "en": "Buy & sell",
            "ru": "Покупка и продажа"
          },
          "text": {
            "uz": "Qurilmalarni bir necha qadamda e'lon qilish va topish.",
            "en": "List and find devices in a few steps.",
            "ru": "Размещение и поиск устройств в несколько шагов."
          }
        },
        {
          "title": {
            "uz": "Xavfsizlik",
            "en": "Security",
            "ru": "Безопасность"
          },
          "text": {
            "uz": "Supabase orqali himoyalangan kirish va ma'lumotlar.",
            "en": "Protected access and data through Supabase.",
            "ru": "Защищённый доступ и данные через Supabase."
          }
        },
        {
          "title": {
            "uz": "Yuqori tezlik",
            "en": "High performance",
            "ru": "Высокая скорость"
          },
          "text": {
            "uz": "Zamonaviy React arxitekturasi tufayli tez ishlaydi.",
            "en": "Fast thanks to a modern React architecture.",
            "ru": "Высокая скорость благодаря современной архитектуре React."
          }
        }
      ],
      "metrics": [],
      "stackGroups": [
        {
          "group": {
            "uz": "Frontend",
            "en": "Frontend",
            "ru": "Фронтенд"
          },
          "items": [
            "React",
            "TypeScript",
            "Vite"
          ]
        },
        {
          "group": {
            "uz": "Backend",
            "en": "Backend",
            "ru": "Бэкенд"
          },
          "items": [
            "Supabase"
          ]
        },
        {
          "group": {
            "uz": "Joylashtirish",
            "en": "Hosting",
            "ru": "Хостинг"
          },
          "items": [
            "Vercel"
          ]
        }
      ],
      "media": [
        {
          "type": "image",
          "src": "/assets/house-mobile-phone-marketplace.jpg",
          "caption": {
            "uz": "Bosh sahifa",
            "en": "Home page",
            "ru": "Главная страница"
          }
        }
      ]
    }
  },
  {
    "id": "4",
    "slug": "doner-food",
    "featured": false,
    "year": 2025,
    "category": "web",
    "title": {
      "uz": "Döner Food",
      "en": "Döner Food",
      "ru": "Döner Food"
    },
    "summary": {
      "uz": "Menyu va buyurtma tizimiga ega fast-food restorani veb-sayti",
      "en": "Fast-food restaurant website with a menu and online ordering",
      "ru": "Сайт fast-food ресторана с меню и онлайн-заказом"
    },
    "problem": {
      "uz": "Restoran menyusini ko'rsatish va buyurtma qabul qilishning qulay onlayn usuli yo'q edi.",
      "en": "The restaurant had no convenient online way to show its menu and take orders.",
      "ru": "У ресторана не было удобного способа показать меню и принимать заказы онлайн."
    },
    "solution": {
      "uz": "Aniq menyu, buyurtma berish tizimi va barcha qurilmalarga mos responsive dizayn.",
      "en": "A clear menu, an ordering system and a responsive design that works on every device.",
      "ru": "Понятное меню, система заказа и адаптивный дизайн для любых устройств."
    },
    "stack": [
      "React",
      "Responsive UI"
    ],
    "cover": "/assets/doner-food-fast-food-website.jpg",
    "images": [
      "/assets/doner-food-fast-food-website.jpg"
    ],
    "liveUrl": "https://donerfood.uz",
    "detail": {
      "role": {
        "uz": "Full-stack dasturchi",
        "en": "Full-stack developer",
        "ru": "Full-stack разработчик"
      },
      "client": "Döner Food",
      "duration": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "team": {
        "uz": "",
        "en": "",
        "ru": ""
      },
      "status": {
        "uz": "Ishga tushirilgan",
        "en": "Live",
        "ru": "Запущен"
      },
      "overview": {
        "uz": "Döner Food — menyu, buyurtma tizimi va responsive dizayn bilan yaratilgan fast-food veb-sayti.",
        "en": "Döner Food is a fast-food website created with a menu, an ordering system and a responsive design.",
        "ru": "Döner Food — сайт fast-food ресторана с меню, системой заказа и адаптивным дизайном."
      },
      "contributions": [
        {
          "uz": "Sayt dizayni va frontend dasturlash.",
          "en": "Designed and developed the website frontend.",
          "ru": "Разработал дизайн и фронтенд сайта."
        },
        {
          "uz": "Menyu va buyurtma berish oqimini yaratish.",
          "en": "Built the menu and the ordering flow.",
          "ru": "Реализовал меню и сценарий оформления заказа."
        },
        {
          "uz": "Telefon va kompyuterga mos responsive dizayn.",
          "en": "Made the layout fully responsive for phones and desktops.",
          "ru": "Сделал адаптивную вёрстку для телефонов и компьютеров."
        }
      ],
      "features": [
        {
          "title": {
            "uz": "Menyu",
            "en": "Menu",
            "ru": "Меню"
          },
          "text": {
            "uz": "Taomlar ro'yxati va narxlari qulay ko'rinishda.",
            "en": "Dishes and prices in a clear layout.",
            "ru": "Блюда и цены в удобном виде."
          }
        },
        {
          "title": {
            "uz": "Buyurtma",
            "en": "Ordering",
            "ru": "Заказ"
          },
          "text": {
            "uz": "Onlayn buyurtma berish tizimi.",
            "en": "Online order placement.",
            "ru": "Оформление заказа онлайн."
          }
        },
        {
          "title": {
            "uz": "Responsive dizayn",
            "en": "Responsive design",
            "ru": "Адаптивный дизайн"
          },
          "text": {
            "uz": "Har qanday ekranda qulay ko'rinish.",
            "en": "Looks great on any screen.",
            "ru": "Отлично выглядит на любом экране."
          }
        }
      ],
      "metrics": [],
      "stackGroups": [
        {
          "group": {
            "uz": "Frontend",
            "en": "Frontend",
            "ru": "Фронтенд"
          },
          "items": [
            "React",
            "Responsive UI"
          ]
        }
      ],
      "media": [
        {
          "type": "image",
          "src": "/assets/doner-food-fast-food-website.jpg",
          "caption": {
            "uz": "Bosh sahifa",
            "en": "Home page",
            "ru": "Главная страница"
          }
        }
      ]
    }
  }
];

export const skillsData: Skill[] = [
  {
    "id": "0",
    "name": "React",
    "category": "frontend",
    "level": 95
  },
  {
    "id": "1",
    "name": "TypeScript",
    "category": "frontend",
    "level": 92
  },
  {
    "id": "2",
    "name": "Next.js",
    "category": "frontend",
    "level": 88
  },
  {
    "id": "3",
    "name": "Tailwind CSS",
    "category": "frontend",
    "level": 94
  },
  {
    "id": "4",
    "name": "Framer Motion",
    "category": "frontend",
    "level": 85
  },
  {
    "id": "5",
    "name": "Node.js",
    "category": "backend",
    "level": 86
  },
  {
    "id": "6",
    "name": "PostgreSQL",
    "category": "backend",
    "level": 80
  },
  {
    "id": "7",
    "name": "Supabase",
    "category": "backend",
    "level": 84
  },
  {
    "id": "8",
    "name": "REST / GraphQL",
    "category": "backend",
    "level": 82
  },
  {
    "id": "9",
    "name": "Git",
    "category": "tools",
    "level": 92
  },
  {
    "id": "10",
    "name": "Figma",
    "category": "tools",
    "level": 78
  },
  {
    "id": "11",
    "name": "Docker",
    "category": "tools",
    "level": 70
  }
];

export const servicesData: Service[] = [
  {
    "id": "1",
    "icon": "Globe",
    "title": {
      "uz": "Veb-sayt yaratish",
      "en": "Website development",
      "ru": "Создание сайтов"
    },
    "description": {
      "uz": "Tez, SEO-ga mos, animatsiyali saytlar.",
      "en": "Fast, SEO-ready, animated websites.",
      "ru": "Быстрые, SEO-готовые сайты."
    },
    "price": {
      "uz": "$500 dan",
      "en": "from $500",
      "ru": "от $500"
    },
    "slug": "website-development",
    "tagline": {
      "uz": "Sotadigan saytlar",
      "en": "Websites that sell",
      "ru": "Сайты, которые продают"
    },
    "cover": "/assets/project-1-12kiAwqA.jpg",
    "timeline": {
      "uz": "2–4 hafta",
      "en": "2–4 weeks",
      "ru": "2–4 недели"
    },
    "detail": {
      "slug": "website-development",
      "cover": "/assets/project-1-12kiAwqA.jpg",
      "tagline": {
        "uz": "Sotadigan saytlar",
        "en": "Websites that sell",
        "ru": "Сайты, которые продают"
      },
      "overview": {
        "uz": "Brendingizga mos, tez yuklanadigan va qidiruvda yuqori turadigan zamonaviy veb-sayt.",
        "en": "A modern website that fits your brand, loads fast and ranks well in search.",
        "ru": "Современный сайт под ваш бренд: быстрый и заметный в поиске."
      },
      "included": [
        {
          "uz": "Moslashuvchan dizayn",
          "en": "Responsive design",
          "ru": "Адаптивный дизайн"
        },
        {
          "uz": "SEO sozlash",
          "en": "SEO setup",
          "ru": "SEO-настройка"
        },
        {
          "uz": "Animatsiyalar",
          "en": "Animations",
          "ru": "Анимации"
        },
        {
          "uz": "Kontakt forma",
          "en": "Contact form",
          "ru": "Форма связи"
        }
      ],
      "process": [
        {
          "title": {
            "uz": "Tanishuv",
            "en": "Discovery",
            "ru": "Знакомство"
          },
          "text": {
            "uz": "Maqsad va auditoriyani o'rganamiz.",
            "en": "We learn your goals and audience.",
            "ru": "Изучаем цели и аудиторию."
          }
        },
        {
          "title": {
            "uz": "Dizayn",
            "en": "Design",
            "ru": "Дизайн"
          },
          "text": {
            "uz": "Figma prototipi va tasdiqlash.",
            "en": "Figma prototype and sign-off.",
            "ru": "Прототип в Figma и согласование."
          }
        },
        {
          "title": {
            "uz": "Ishlab chiqish",
            "en": "Build",
            "ru": "Разработка"
          },
          "text": {
            "uz": "Har hafta demo bilan.",
            "en": "With a demo every week.",
            "ru": "С демо каждую неделю."
          }
        },
        {
          "title": {
            "uz": "Ishga tushirish",
            "en": "Launch",
            "ru": "Запуск"
          },
          "text": {
            "uz": "Test, ishga tushirish va 30 kun qo'llab-quvvatlash.",
            "en": "Testing, launch and 30 days of support.",
            "ru": "Тесты, запуск и 30 дней поддержки."
          }
        }
      ],
      "deliverables": [
        {
          "uz": "Tayyor sayt",
          "en": "Live website",
          "ru": "Готовый сайт"
        },
        {
          "uz": "Manba kodi",
          "en": "Source code",
          "ru": "Исходный код"
        },
        {
          "uz": "Qo'llanma",
          "en": "Handover guide",
          "ru": "Инструкция"
        }
      ],
      "timeline": {
        "uz": "2–4 hafta",
        "en": "2–4 weeks",
        "ru": "2–4 недели"
      },
      "packages": [
        {
          "name": {
            "uz": "Start",
            "en": "Starter",
            "ru": "Старт"
          },
          "price": {
            "uz": "$500",
            "en": "$500",
            "ru": "$500"
          },
          "features": [
            {
              "uz": "5 sahifa",
              "en": "5 pages",
              "ru": "5 страниц"
            },
            {
              "uz": "Asosiy SEO",
              "en": "Basic SEO",
              "ru": "Базовое SEO"
            }
          ],
          "highlighted": false
        },
        {
          "name": {
            "uz": "Biznes",
            "en": "Business",
            "ru": "Бизнес"
          },
          "price": {
            "uz": "$1200",
            "en": "$1200",
            "ru": "$1200"
          },
          "features": [
            {
              "uz": "12 sahifa",
              "en": "12 pages",
              "ru": "12 страниц"
            },
            {
              "uz": "CMS",
              "en": "CMS",
              "ru": "CMS"
            },
            {
              "uz": "Premium animatsiya",
              "en": "Premium motion",
              "ru": "Премиум-анимация"
            }
          ],
          "highlighted": true
        },
        {
          "name": {
            "uz": "Premium",
            "en": "Premium",
            "ru": "Премиум"
          },
          "price": {
            "uz": "Kelishiladi",
            "en": "Custom",
            "ru": "Договорная"
          },
          "features": [
            {
              "uz": "Cheksiz sahifa",
              "en": "Unlimited pages",
              "ru": "Без лимита страниц"
            },
            {
              "uz": "3 til",
              "en": "3 languages",
              "ru": "3 языка"
            }
          ],
          "highlighted": false
        }
      ],
      "relatedProjects": [
        "house-mobile",
        "mazzy-express"
      ],
      "faq": [
        {
          "q": {
            "uz": "To'lov qanday?",
            "en": "How does payment work?",
            "ru": "Как происходит оплата?"
          },
          "a": {
            "uz": "50% oldindan, 50% topshirilganda.",
            "en": "50% upfront, 50% on delivery.",
            "ru": "50% предоплата, 50% по сдаче."
          }
        },
        {
          "q": {
            "uz": "O'zgartirish kiritsa bo'ladimi?",
            "en": "Can I request changes?",
            "ru": "Можно ли вносить правки?"
          },
          "a": {
            "uz": "Ha, 2 bosqich tuzatish narxga kiradi.",
            "en": "Yes, two rounds of revisions are included.",
            "ru": "Да, два круга правок включены."
          }
        }
      ]
    }
  },
  {
    "id": "2",
    "icon": "LayoutDashboard",
    "title": {
      "uz": "Veb-ilovalar",
      "en": "Web applications",
      "ru": "Веб-приложения"
    },
    "description": {
      "uz": "Admin panellar, SaaS, dashboardlar.",
      "en": "Admin panels, SaaS, dashboards.",
      "ru": "Админки, SaaS, дашборды."
    },
    "price": {
      "uz": "$1500 dan",
      "en": "from $1500",
      "ru": "от $1500"
    },
    "slug": "web-applications",
    "tagline": {
      "uz": "G'oyadan SaaS gacha",
      "en": "From idea to SaaS",
      "ru": "От идеи до SaaS"
    },
    "cover": "/assets/project-2-BH0LItVn.jpg",
    "timeline": {
      "uz": "1–3 oy",
      "en": "1–3 months",
      "ru": "1–3 месяца"
    },
    "detail": {
      "slug": "web-applications",
      "cover": "/assets/project-2-BH0LItVn.jpg",
      "tagline": {
        "uz": "G'oyadan SaaS gacha",
        "en": "From idea to SaaS",
        "ru": "От идеи до SaaS"
      },
      "overview": {
        "uz": "Admin panellar, SaaS va dashboardlar — xavfsiz, kengaytiriladigan va qulay.",
        "en": "Admin panels, SaaS and dashboards — secure, scalable and pleasant to use.",
        "ru": "Админки, SaaS и дашборды — безопасно, масштабируемо и удобно."
      },
      "included": [
        {
          "uz": "Avtorizatsiya",
          "en": "Authentication",
          "ru": "Авторизация"
        },
        {
          "uz": "Ma'lumotlar bazasi",
          "en": "Database",
          "ru": "База данных"
        },
        {
          "uz": "Rollar",
          "en": "Roles",
          "ru": "Роли"
        },
        {
          "uz": "To'lovlar",
          "en": "Payments",
          "ru": "Платежи"
        }
      ],
      "process": [
        {
          "title": {
            "uz": "Tanishuv",
            "en": "Discovery",
            "ru": "Знакомство"
          },
          "text": {
            "uz": "Maqsad va auditoriyani o'rganamiz.",
            "en": "We learn your goals and audience.",
            "ru": "Изучаем цели и аудиторию."
          }
        },
        {
          "title": {
            "uz": "Dizayn",
            "en": "Design",
            "ru": "Дизайн"
          },
          "text": {
            "uz": "Figma prototipi va tasdiqlash.",
            "en": "Figma prototype and sign-off.",
            "ru": "Прототип в Figma и согласование."
          }
        },
        {
          "title": {
            "uz": "Ishlab chiqish",
            "en": "Build",
            "ru": "Разработка"
          },
          "text": {
            "uz": "Har hafta demo bilan.",
            "en": "With a demo every week.",
            "ru": "С демо каждую неделю."
          }
        },
        {
          "title": {
            "uz": "Ishga tushirish",
            "en": "Launch",
            "ru": "Запуск"
          },
          "text": {
            "uz": "Test, ishga tushirish va 30 kun qo'llab-quvvatlash.",
            "en": "Testing, launch and 30 days of support.",
            "ru": "Тесты, запуск и 30 дней поддержки."
          }
        }
      ],
      "deliverables": [
        {
          "uz": "Veb-ilova",
          "en": "Web app",
          "ru": "Веб-приложение"
        },
        {
          "uz": "API hujjatlari",
          "en": "API docs",
          "ru": "Документация API"
        }
      ],
      "timeline": {
        "uz": "1–3 oy",
        "en": "1–3 months",
        "ru": "1–3 месяца"
      },
      "packages": [
        {
          "name": {
            "uz": "MVP",
            "en": "MVP",
            "ru": "MVP"
          },
          "price": {
            "uz": "$1500",
            "en": "$1500",
            "ru": "$1500"
          },
          "features": [
            {
              "uz": "Asosiy funksiyalar",
              "en": "Core features",
              "ru": "Основной функционал"
            }
          ],
          "highlighted": false
        },
        {
          "name": {
            "uz": "Pro",
            "en": "Pro",
            "ru": "Pro"
          },
          "price": {
            "uz": "$4000",
            "en": "$4000",
            "ru": "$4000"
          },
          "features": [
            {
              "uz": "To'liq SaaS",
              "en": "Full SaaS",
              "ru": "Полный SaaS"
            },
            {
              "uz": "To'lovlar",
              "en": "Payments",
              "ru": "Платежи"
            }
          ],
          "highlighted": true
        }
      ],
      "relatedProjects": [
        "mazzy-express"
      ],
      "faq": [
        {
          "q": {
            "uz": "To'lov qanday?",
            "en": "How does payment work?",
            "ru": "Как происходит оплата?"
          },
          "a": {
            "uz": "50% oldindan, 50% topshirilganda.",
            "en": "50% upfront, 50% on delivery.",
            "ru": "50% предоплата, 50% по сдаче."
          }
        },
        {
          "q": {
            "uz": "O'zgartirish kiritsa bo'ladimi?",
            "en": "Can I request changes?",
            "ru": "Можно ли вносить правки?"
          },
          "a": {
            "uz": "Ha, 2 bosqich tuzatish narxga kiradi.",
            "en": "Yes, two rounds of revisions are included.",
            "ru": "Да, два круга правок включены."
          }
        }
      ]
    }
  },
  {
    "id": "3",
    "icon": "Palette",
    "title": {
      "uz": "UI/UX dizayn",
      "en": "UI/UX design",
      "ru": "UI/UX дизайн"
    },
    "description": {
      "uz": "Figma'da zamonaviy interfeyslar.",
      "en": "Modern interfaces in Figma.",
      "ru": "Современные интерфейсы в Figma."
    },
    "price": {
      "uz": "$300 dan",
      "en": "from $300",
      "ru": "от $300"
    },
    "slug": "ui-ux-design",
    "tagline": {
      "uz": "Sevib qoladigan interfeyslar",
      "en": "Interfaces people love",
      "ru": "Интерфейсы, которые любят"
    },
    "cover": "/assets/project-2-BH0LItVn.jpg",
    "timeline": {
      "uz": "1–2 hafta",
      "en": "1–2 weeks",
      "ru": "1–2 недели"
    },
    "detail": {
      "slug": "ui-ux-design",
      "cover": "/assets/project-2-BH0LItVn.jpg",
      "tagline": {
        "uz": "Sevib qoladigan interfeyslar",
        "en": "Interfaces people love",
        "ru": "Интерфейсы, которые любят"
      },
      "overview": {
        "uz": "Figmada zamonaviy, tushunarli va chiroyli interfeyslar.",
        "en": "Modern, clear and beautiful interfaces in Figma.",
        "ru": "Современные, понятные и красивые интерфейсы в Figma."
      },
      "included": [
        {
          "uz": "Wireframe",
          "en": "Wireframes",
          "ru": "Вайрфреймы"
        },
        {
          "uz": "UI kit",
          "en": "UI kit",
          "ru": "UI-кит"
        },
        {
          "uz": "Prototip",
          "en": "Prototype",
          "ru": "Прототип"
        }
      ],
      "process": [
        {
          "title": {
            "uz": "Tanishuv",
            "en": "Discovery",
            "ru": "Знакомство"
          },
          "text": {
            "uz": "Maqsad va auditoriyani o'rganamiz.",
            "en": "We learn your goals and audience.",
            "ru": "Изучаем цели и аудиторию."
          }
        },
        {
          "title": {
            "uz": "Dizayn",
            "en": "Design",
            "ru": "Дизайн"
          },
          "text": {
            "uz": "Figma prototipi va tasdiqlash.",
            "en": "Figma prototype and sign-off.",
            "ru": "Прототип в Figma и согласование."
          }
        },
        {
          "title": {
            "uz": "Ishlab chiqish",
            "en": "Build",
            "ru": "Разработка"
          },
          "text": {
            "uz": "Har hafta demo bilan.",
            "en": "With a demo every week.",
            "ru": "С демо каждую неделю."
          }
        },
        {
          "title": {
            "uz": "Ishga tushirish",
            "en": "Launch",
            "ru": "Запуск"
          },
          "text": {
            "uz": "Test, ishga tushirish va 30 kun qo'llab-quvvatlash.",
            "en": "Testing, launch and 30 days of support.",
            "ru": "Тесты, запуск и 30 дней поддержки."
          }
        }
      ],
      "deliverables": [
        {
          "uz": "Figma fayl",
          "en": "Figma file",
          "ru": "Файл Figma"
        }
      ],
      "timeline": {
        "uz": "1–2 hafta",
        "en": "1–2 weeks",
        "ru": "1–2 недели"
      },
      "packages": [
        {
          "name": {
            "uz": "Dizayn",
            "en": "Design",
            "ru": "Дизайн"
          },
          "price": {
            "uz": "$300 dan",
            "en": "from $300",
            "ru": "от $300"
          },
          "features": [
            {
              "uz": "5 ekran",
              "en": "5 screens",
              "ru": "5 экранов"
            }
          ],
          "highlighted": true
        }
      ],
      "relatedProjects": [
        "doner-food"
      ],
      "faq": [
        {
          "q": {
            "uz": "To'lov qanday?",
            "en": "How does payment work?",
            "ru": "Как происходит оплата?"
          },
          "a": {
            "uz": "50% oldindan, 50% topshirilganda.",
            "en": "50% upfront, 50% on delivery.",
            "ru": "50% предоплата, 50% по сдаче."
          }
        },
        {
          "q": {
            "uz": "O'zgartirish kiritsa bo'ladimi?",
            "en": "Can I request changes?",
            "ru": "Можно ли вносить правки?"
          },
          "a": {
            "uz": "Ha, 2 bosqich tuzatish narxga kiradi.",
            "en": "Yes, two rounds of revisions are included.",
            "ru": "Да, два круга правок включены."
          }
        }
      ]
    }
  },
  {
    "id": "4",
    "icon": "Server",
    "title": {
      "uz": "Backend & API",
      "en": "Backend & API",
      "ru": "Backend и API"
    },
    "description": {
      "uz": "Xavfsiz ma'lumotlar bazasi va API.",
      "en": "Secure databases and APIs.",
      "ru": "Надёжные базы данных и API."
    },
    "price": {
      "uz": "$800 dan",
      "en": "from $800",
      "ru": "от $800"
    },
    "slug": "backend-api",
    "tagline": {
      "uz": "Ishonchli poydevor",
      "en": "A solid foundation",
      "ru": "Надёжный фундамент"
    },
    "cover": "/assets/project-1-12kiAwqA.jpg",
    "timeline": {
      "uz": "2–6 hafta",
      "en": "2–6 weeks",
      "ru": "2–6 недель"
    },
    "detail": {
      "slug": "backend-api",
      "cover": "/assets/project-1-12kiAwqA.jpg",
      "tagline": {
        "uz": "Ishonchli poydevor",
        "en": "A solid foundation",
        "ru": "Надёжный фундамент"
      },
      "overview": {
        "uz": "Xavfsiz ma'lumotlar bazalari va tez API'lar.",
        "en": "Secure databases and fast APIs.",
        "ru": "Безопасные базы данных и быстрые API."
      },
      "included": [
        {
          "uz": "REST / GraphQL",
          "en": "REST / GraphQL",
          "ru": "REST / GraphQL"
        },
        {
          "uz": "Testlar",
          "en": "Tests",
          "ru": "Тесты"
        },
        {
          "uz": "Monitoring",
          "en": "Monitoring",
          "ru": "Мониторинг"
        }
      ],
      "process": [
        {
          "title": {
            "uz": "Tanishuv",
            "en": "Discovery",
            "ru": "Знакомство"
          },
          "text": {
            "uz": "Maqsad va auditoriyani o'rganamiz.",
            "en": "We learn your goals and audience.",
            "ru": "Изучаем цели и аудиторию."
          }
        },
        {
          "title": {
            "uz": "Dizayn",
            "en": "Design",
            "ru": "Дизайн"
          },
          "text": {
            "uz": "Figma prototipi va tasdiqlash.",
            "en": "Figma prototype and sign-off.",
            "ru": "Прототип в Figma и согласование."
          }
        },
        {
          "title": {
            "uz": "Ishlab chiqish",
            "en": "Build",
            "ru": "Разработка"
          },
          "text": {
            "uz": "Har hafta demo bilan.",
            "en": "With a demo every week.",
            "ru": "С демо каждую неделю."
          }
        },
        {
          "title": {
            "uz": "Ishga tushirish",
            "en": "Launch",
            "ru": "Запуск"
          },
          "text": {
            "uz": "Test, ishga tushirish va 30 kun qo'llab-quvvatlash.",
            "en": "Testing, launch and 30 days of support.",
            "ru": "Тесты, запуск и 30 дней поддержки."
          }
        }
      ],
      "deliverables": [
        {
          "uz": "API",
          "en": "API",
          "ru": "API"
        },
        {
          "uz": "Hujjatlar",
          "en": "Docs",
          "ru": "Документация"
        }
      ],
      "timeline": {
        "uz": "2–6 hafta",
        "en": "2–6 weeks",
        "ru": "2–6 недель"
      },
      "packages": [
        {
          "name": {
            "uz": "API",
            "en": "API",
            "ru": "API"
          },
          "price": {
            "uz": "$800 dan",
            "en": "from $800",
            "ru": "от $800"
          },
          "features": [
            {
              "uz": "10 endpoint",
              "en": "10 endpoints",
              "ru": "10 эндпоинтов"
            }
          ],
          "highlighted": true
        }
      ],
      "relatedProjects": [
        "mazzy-express",
        "ielts-imperia"
      ],
      "faq": [
        {
          "q": {
            "uz": "To'lov qanday?",
            "en": "How does payment work?",
            "ru": "Как происходит оплата?"
          },
          "a": {
            "uz": "50% oldindan, 50% topshirilganda.",
            "en": "50% upfront, 50% on delivery.",
            "ru": "50% предоплата, 50% по сдаче."
          }
        },
        {
          "q": {
            "uz": "O'zgartirish kiritsa bo'ladimi?",
            "en": "Can I request changes?",
            "ru": "Можно ли вносить правки?"
          },
          "a": {
            "uz": "Ha, 2 bosqich tuzatish narxga kiradi.",
            "en": "Yes, two rounds of revisions are included.",
            "ru": "Да, два круга правок включены."
          }
        }
      ]
    }
  },
  {
    "id": "5",
    "icon": "Gauge",
    "title": {
      "uz": "Tezlikni oshirish",
      "en": "Performance tuning",
      "ru": "Оптимизация"
    },
    "description": {
      "uz": "Saytingizni 2-3 barobar tezlashtiraman.",
      "en": "Make your site 2-3x faster.",
      "ru": "Ускорю сайт в 2-3 раза."
    },
    "price": {
      "uz": "$200 dan",
      "en": "from $200",
      "ru": "от $200"
    },
    "slug": "performance-tuning",
    "tagline": {
      "uz": "2–3 barobar tezroq",
      "en": "2–3x faster",
      "ru": "В 2–3 раза быстрее"
    },
    "cover": "/assets/project-1-12kiAwqA.jpg",
    "timeline": {
      "uz": "3–7 kun",
      "en": "3–7 days",
      "ru": "3–7 дней"
    },
    "detail": {
      "slug": "performance-tuning",
      "cover": "/assets/project-1-12kiAwqA.jpg",
      "tagline": {
        "uz": "2–3 barobar tezroq",
        "en": "2–3x faster",
        "ru": "В 2–3 раза быстрее"
      },
      "overview": {
        "uz": "Saytingizni tahlil qilib, yuklanish tezligini oshiraman.",
        "en": "I audit your site and make it load much faster.",
        "ru": "Провожу аудит и ускоряю загрузку сайта."
      },
      "included": [
        {
          "uz": "Audit",
          "en": "Audit",
          "ru": "Аудит"
        },
        {
          "uz": "Rasm optimizatsiyasi",
          "en": "Image optimisation",
          "ru": "Оптимизация изображений"
        },
        {
          "uz": "Kesh",
          "en": "Caching",
          "ru": "Кэширование"
        }
      ],
      "process": [
        {
          "title": {
            "uz": "Tanishuv",
            "en": "Discovery",
            "ru": "Знакомство"
          },
          "text": {
            "uz": "Maqsad va auditoriyani o'rganamiz.",
            "en": "We learn your goals and audience.",
            "ru": "Изучаем цели и аудиторию."
          }
        },
        {
          "title": {
            "uz": "Ishlab chiqish",
            "en": "Build",
            "ru": "Разработка"
          },
          "text": {
            "uz": "Har hafta demo bilan.",
            "en": "With a demo every week.",
            "ru": "С демо каждую неделю."
          }
        },
        {
          "title": {
            "uz": "Ishga tushirish",
            "en": "Launch",
            "ru": "Запуск"
          },
          "text": {
            "uz": "Test, ishga tushirish va 30 kun qo'llab-quvvatlash.",
            "en": "Testing, launch and 30 days of support.",
            "ru": "Тесты, запуск и 30 дней поддержки."
          }
        }
      ],
      "deliverables": [
        {
          "uz": "Audit hisoboti",
          "en": "Audit report",
          "ru": "Отчёт аудита"
        }
      ],
      "timeline": {
        "uz": "3–7 kun",
        "en": "3–7 days",
        "ru": "3–7 дней"
      },
      "packages": [
        {
          "name": {
            "uz": "Audit",
            "en": "Audit",
            "ru": "Аудит"
          },
          "price": {
            "uz": "$200",
            "en": "$200",
            "ru": "$200"
          },
          "features": [
            {
              "uz": "To'liq hisobot",
              "en": "Full report",
              "ru": "Полный отчёт"
            }
          ],
          "highlighted": true
        }
      ],
      "relatedProjects": [
        "house-mobile"
      ],
      "faq": [
        {
          "q": {
            "uz": "To'lov qanday?",
            "en": "How does payment work?",
            "ru": "Как происходит оплата?"
          },
          "a": {
            "uz": "50% oldindan, 50% topshirilganda.",
            "en": "50% upfront, 50% on delivery.",
            "ru": "50% предоплата, 50% по сдаче."
          }
        },
        {
          "q": {
            "uz": "O'zgartirish kiritsa bo'ladimi?",
            "en": "Can I request changes?",
            "ru": "Можно ли вносить правки?"
          },
          "a": {
            "uz": "Ha, 2 bosqich tuzatish narxga kiradi.",
            "en": "Yes, two rounds of revisions are included.",
            "ru": "Да, два круга правок включены."
          }
        }
      ]
    }
  },
  {
    "id": "6",
    "icon": "GraduationCap",
    "title": {
      "uz": "Mentorlik",
      "en": "Mentoring",
      "ru": "Менторство"
    },
    "description": {
      "uz": "Yosh dasturchilarga yo'l ko'rsatish.",
      "en": "Guiding junior developers.",
      "ru": "Помощь начинающим."
    },
    "price": {
      "uz": "$30 / soat",
      "en": "$30 / hour",
      "ru": "$30 / час"
    },
    "slug": "mentoring",
    "tagline": {
      "uz": "Tezroq o'sing",
      "en": "Grow faster",
      "ru": "Растите быстрее"
    },
    "cover": "/assets/portrait-BWOgCAro.jpg",
    "timeline": {
      "uz": "Moslashuvchan",
      "en": "Flexible",
      "ru": "Гибко"
    },
    "detail": {
      "slug": "mentoring",
      "cover": "/assets/portrait-BWOgCAro.jpg",
      "tagline": {
        "uz": "Tezroq o'sing",
        "en": "Grow faster",
        "ru": "Растите быстрее"
      },
      "overview": {
        "uz": "Junior dasturchilar uchun shaxsiy mentorlik: kod review, karyera maslahatlari.",
        "en": "One-to-one mentoring for junior developers: code review and career advice.",
        "ru": "Личное менторство для джунов: код-ревью и советы по карьере."
      },
      "included": [
        {
          "uz": "Haftalik uchrashuv",
          "en": "Weekly call",
          "ru": "Еженедельный созвон"
        },
        {
          "uz": "Kod review",
          "en": "Code review",
          "ru": "Код-ревью"
        }
      ],
      "process": [
        {
          "title": {
            "uz": "Tanishuv",
            "en": "Discovery",
            "ru": "Знакомство"
          },
          "text": {
            "uz": "Maqsad va auditoriyani o'rganamiz.",
            "en": "We learn your goals and audience.",
            "ru": "Изучаем цели и аудиторию."
          }
        }
      ],
      "deliverables": [
        {
          "uz": "Shaxsiy reja",
          "en": "Personal roadmap",
          "ru": "Личный план"
        }
      ],
      "timeline": {
        "uz": "Moslashuvchan",
        "en": "Flexible",
        "ru": "Гибко"
      },
      "packages": [
        {
          "name": {
            "uz": "Soatbay",
            "en": "Hourly",
            "ru": "Почасово"
          },
          "price": {
            "uz": "$30 / soat",
            "en": "$30 / hour",
            "ru": "$30 / час"
          },
          "features": [
            {
              "uz": "1:1 sessiya",
              "en": "1:1 session",
              "ru": "Сессия 1:1"
            }
          ],
          "highlighted": true
        }
      ],
      "relatedProjects": [],
      "faq": [
        {
          "q": {
            "uz": "To'lov qanday?",
            "en": "How does payment work?",
            "ru": "Как происходит оплата?"
          },
          "a": {
            "uz": "50% oldindan, 50% topshirilganda.",
            "en": "50% upfront, 50% on delivery.",
            "ru": "50% предоплата, 50% по сдаче."
          }
        },
        {
          "q": {
            "uz": "O'zgartirish kiritsa bo'ladimi?",
            "en": "Can I request changes?",
            "ru": "Можно ли вносить правки?"
          },
          "a": {
            "uz": "Ha, 2 bosqich tuzatish narxga kiradi.",
            "en": "Yes, two rounds of revisions are included.",
            "ru": "Да, два круга правок включены."
          }
        }
      ]
    }
  }
];

export const achievementsData: Achievement[] = [
  {
    "id": "1",
    "slug": "national-ai-hackathon-1st-place",
    "date": "2026-09",
    "title": {
      "uz": "National AI Hackathon: 1-o'rin",
      "en": "1st place at the National AI Hackathon",
      "ru": "1 место на National AI Hackathon"
    },
    "description": {
      "uz": "Xorazm bosqichida jamoamiz bilan CarVision loyihasini taqdim etib, 1-o'rinni egalladik.",
      "en": "Our team presented CarVision at the Khorezm round and took 1st place.",
      "ru": "Наша команда представила CarVision на хорезмском этапе и заняла 1 место."
    },
    "place": {
      "uz": "1-o'rin",
      "en": "1st place",
      "ru": "1 место"
    },
    "cover": "/assets/national-ai-hackathon-khorezm-2026-winners-podium.jpg",
    "detail": {
      "slug": "national-ai-hackathon-1st-place",
      "cover": "/assets/national-ai-hackathon-khorezm-2026-winners-podium.jpg",
      "story": {
        "uz": "National AI Hackathon: Khorezm 2026-yil 17–20 sentabr kunlari bo'lib o'tdi. Biz jamoa bilan loyihani noldan yaratdik, hakamlar hay'ati oldida taqdim etdik va 1-o'rinni egalladik. Sovrin — MacBook Air M5. Eng qadrlisi esa bu natijaga jamoa bo'lib erishganimiz edi.",
        "en": "National AI Hackathon: Khorezm took place on 17–20 September 2026. Together with my team we built the project from scratch, presented it to the jury and took 1st place, winning a MacBook Air M5. The best part was getting there as a team.",
        "ru": "National AI Hackathon: Khorezm прошёл 17–20 сентября 2026 года. Вместе с командой мы с нуля создали проект, представили его жюри и заняли 1 место, получив MacBook Air M5. Самым ценным было то, что мы добились этого командой."
      },
      "built": {
        "uz": "CarVision — mijoz tuning va avtomobil detallarini sotib olishdan oldin o'z mashinasida qanday ko'rinishini tasavvur qilishi, mos mahsulotni topishi va biznesga raqamli vitrina berishga yo'naltirilgan loyiha. Taqdimotda to'rtta muammoga e'tibor qaratdik: tasavvur qilish qiyinligi, mos mahsulotni topish, tanlov va xarid o'rtasidagi uzilish hamda bizneslar uchun raqamli vitrina yo'qligi.",
        "en": "CarVision is a project that lets a customer picture how tuning and car parts will look on their own vehicle before buying, find compatible products and gives businesses a digital showcase. Our pitch focused on four problems: hard to visualize, hard to find the right product, the gap between choosing and buying, and the lack of a digital showcase for businesses.",
        "ru": "CarVision — проект, который помогает клиенту представить, как тюнинг и детали будут выглядеть на его автомобиле до покупки, найти совместимый товар и даёт бизнесу цифровую витрину. В питче мы сосредоточились на четырёх проблемах: сложно представить результат, сложно найти подходящий товар, разрыв между выбором и покупкой и отсутствие цифровой витрины для бизнеса."
      },
      "team": {
        "uz": "Asadbek Jumanazarov, Mirkomil Atakhanov va Amirbek Nodirbekov",
        "en": "Asadbek Jumanazarov, Mirkomil Atakhanov and Amirbek Nodirbekov",
        "ru": "Асадбек Жуманазаров, Миркомил Атаханов и Амирбек Нодирбеков"
      },
      "media": [
        {
          "type": "image",
          "src": "/assets/national-ai-hackathon-khorezm-2026-winners-podium.jpg"
        },
        {
          "type": "image",
          "src": "/assets/carvision-pitch-national-ai-hackathon-2026-asadbek-jumanazarov.jpg"
        },
        {
          "type": "image",
          "src": "/assets/asadbek-jumanazarov-presenting-carvision-hackathon-stage.jpg"
        },
        {
          "type": "image",
          "src": "/assets/national-ai-hackathon-khorezm-2026-team-banner.jpg"
        },
        {
          "type": "image",
          "src": "/assets/national-ai-hackathon-khorezm-2026-team-carvision.jpg"
        }
      ]
    }
  }
];

export const certificatesData: Certificate[] = [
  {
    "id": "1",
    "slug": "meta-front-end-developer",
    "title": "Meta Front-End Developer",
    "issuer": "Coursera · Meta",
    "date": "2025",
    "skills": ["React", "JavaScript", "UX", "Git"],
    "credentialId": "META-FE-8842",
    "hours": 120,
    "verifyUrl": "",
    "image": "/assets/project-2-BH0LItVn.jpg",
    "detail": {
      "slug": "meta-front-end-developer",
      "credentialId": "META-FE-8842",
      "hours": 120,
      "skills": ["React", "JavaScript", "UX", "Git"],
      "description": { "uz": "Meta tomonidan 9 kursdan iborat professional dastur.", "en": "A nine-course professional programme by Meta.", "ru": "Профессиональная программа Meta из 9 курсов." },
      "image": "/assets/project-2-BH0LItVn.jpg",
      "verifyUrl": ""
    }
  },
  {
    "id": "2",
    "slug": "javascript-algorithms",
    "title": "JavaScript Algorithms & Data Structures",
    "issuer": "freeCodeCamp",
    "date": "2025",
    "skills": ["JavaScript", "Algorithms", "Data structures"],
    "credentialId": "FCC-JS-2291",
    "hours": 300,
    "verifyUrl": "",
    "image": "/assets/project-2-BH0LItVn.jpg",
    "detail": {
      "slug": "javascript-algorithms",
      "credentialId": "FCC-JS-2291",
      "hours": 300,
      "skills": ["JavaScript", "Algorithms", "Data structures"],
      "description": { "uz": "Algoritmlar va ma'lumotlar tuzilmalari.", "en": "Algorithms and data structures.", "ru": "Алгоритмы и структуры данных." },
      "image": "/assets/project-2-BH0LItVn.jpg",
      "verifyUrl": ""
    }
  },
  {
    "id": "3",
    "slug": "aws-cloud-practitioner",
    "title": "AWS Cloud Practitioner",
    "issuer": "Amazon Web Services",
    "date": "2024",
    "skills": ["AWS", "Cloud", "Security"],
    "credentialId": "AWS-CP-55120",
    "hours": 40,
    "verifyUrl": "",
    "image": "/assets/project-2-BH0LItVn.jpg",
    "detail": {
      "slug": "aws-cloud-practitioner",
      "credentialId": "AWS-CP-55120",
      "hours": 40,
      "skills": ["AWS", "Cloud", "Security"],
      "description": { "uz": "AWS bulut asoslari.", "en": "AWS cloud fundamentals.", "ru": "Основы облака AWS." },
      "image": "/assets/project-2-BH0LItVn.jpg",
      "verifyUrl": ""
    }
  },
  {
    "id": "4",
    "slug": "ielts",
    "title": "IELTS 7.5",
    "issuer": "British Council",
    "date": "2024",
    "skills": ["English"],
    "credentialId": "IELTS-75-001",
    "hours": 0,
    "verifyUrl": "",
    "image": "/assets/project-2-BH0LItVn.jpg",
    "detail": {
      "slug": "ielts",
      "credentialId": "IELTS-75-001",
      "hours": 0,
      "skills": ["English"],
      "description": { "uz": "Ingliz tili — 7.5 ball.", "en": "English proficiency — band 7.5.", "ru": "Английский — 7.5 баллов." },
      "image": "/assets/project-2-BH0LItVn.jpg",
      "verifyUrl": ""
    }
  },
  {
    "id": "5",
    "slug": "react-complete-guide",
    "title": "React — The Complete Guide",
    "issuer": "Udemy",
    "date": "2024",
    "skills": ["React", "Redux", "Hooks"],
    "credentialId": "UC-REACT-7734",
    "hours": 68,
    "verifyUrl": "",
    "image": "/assets/project-2-BH0LItVn.jpg",
    "detail": {
      "slug": "react-complete-guide",
      "credentialId": "UC-REACT-7734",
      "hours": 68,
      "skills": ["React", "Redux", "Hooks"],
      "description": { "uz": "React bo'yicha to'liq kurs.", "en": "A complete React course.", "ru": "Полный курс по React." },
      "image": "/assets/project-2-BH0LItVn.jpg",
      "verifyUrl": ""
    }
  },
  {
    "id": "6",
    "slug": "ui-ux-design",
    "title": "UI/UX Design Specialization",
    "issuer": "CalArts",
    "date": "2024",
    "skills": ["Figma", "UI", "UX research"],
    "credentialId": "CALARTS-UX-410",
    "hours": 80,
    "verifyUrl": "",
    "image": "/assets/project-2-BH0LItVn.jpg",
    "detail": {
      "slug": "ui-ux-design",
      "credentialId": "CALARTS-UX-410",
      "hours": 80,
      "skills": ["Figma", "UI", "UX research"],
      "description": { "uz": "UI/UX dizayn mutaxassisligi.", "en": "UI/UX design specialisation.", "ru": "Специализация UI/UX." },
      "image": "/assets/project-2-BH0LItVn.jpg",
      "verifyUrl": ""
    }
  }
];

export const eventsData: EventItem[] = [
  {
    "id": "1",
    "slug": "national-ai-hackathon-khorezm",
    "title": "National AI Hackathon: Khorezm",
    "location": "Xorazm, O'zbekiston",
    "date": "2026-09-17",
    "role": {
      "uz": "Ishtirokchi · 1-o'rin g'olibi",
      "en": "Participant · 1st place winner",
      "ru": "Участник · победитель (1 место)"
    },
    "description": {
      "uz": "Sun'iy intellekt bo'yicha milliy hakaton: 4 kunlik musobaqada CarVision loyihasi bilan g'olib bo'ldik.",
      "en": "A national AI hackathon: a four-day competition where we won with CarVision.",
      "ru": "Национальный хакатон по ИИ: четырёхдневное соревнование, в котором мы победили с проектом CarVision."
    },
    "cover": "/assets/national-ai-hackathon-khorezm-2026-winners-podium.jpg",
    "detail": {
      "slug": "national-ai-hackathon-khorezm",
      "cover": "/assets/national-ai-hackathon-khorezm-2026-winners-podium.jpg",
      "story": {
        "uz": "National AI Hackathon: Khorezm 2026-yil 17–20 sentabr kunlari bo'lib o'tdi. Jamoamiz — Asadbek Jumanazarov, Mirkomil Atakhanov va Amirbek Nodirbekov — CarVision loyihasini yaratib, hakamlarga taqdim etdi va 1-o'rinni qo'lga kiritdi.",
        "en": "National AI Hackathon: Khorezm ran on 17–20 September 2026. Our team — Asadbek Jumanazarov, Mirkomil Atakhanov and Amirbek Nodirbekov — built CarVision, pitched it to the jury and won 1st place.",
        "ru": "National AI Hackathon: Khorezm прошёл 17–20 сентября 2026 года. Наша команда — Асадбек Жуманазаров, Миркомил Атаханов и Амирбек Нодирбеков — создала CarVision, представила его жюри и заняла 1 место."
      },
      "highlights": [
        {
          "uz": "4 kun davomida jamoa bilan loyihani noldan yaratdik.",
          "en": "Built the project from scratch with the team over four days.",
          "ru": "За четыре дня с нуля создали проект командой."
        },
        {
          "uz": "CarVision loyihasini hakamlar hay'ati oldida taqdim etdik.",
          "en": "Pitched CarVision in front of the jury.",
          "ru": "Представили CarVision перед жюри."
        },
        {
          "uz": "1-o'rin va MacBook Air M5 sovrinini yutdik.",
          "en": "Took 1st place and won a MacBook Air M5.",
          "ru": "Заняли 1 место и выиграли MacBook Air M5."
        }
      ],
      "outcomes": [
        {
          "value": 1,
          "suffix": "-o'rin",
          "label": {
            "uz": "Umumiy natija",
            "en": "Overall result",
            "ru": "Итоговый результат"
          }
        },
        {
          "value": 3,
          "label": {
            "uz": "Jamoa a'zosi",
            "en": "Team members",
            "ru": "Участника в команде"
          }
        },
        {
          "value": 4,
          "label": {
            "uz": "Kunlik hakaton",
            "en": "Days of hackathon",
            "ru": "Дня хакатона"
          }
        }
      ],
      "media": [
        {
          "type": "image",
          "src": "/assets/national-ai-hackathon-khorezm-2026-winners-podium.jpg"
        },
        {
          "type": "image",
          "src": "/assets/carvision-pitch-national-ai-hackathon-2026-asadbek-jumanazarov.jpg"
        },
        {
          "type": "image",
          "src": "/assets/asadbek-jumanazarov-presenting-carvision-hackathon-stage.jpg"
        },
        {
          "type": "image",
          "src": "/assets/national-ai-hackathon-khorezm-2026-team-banner.jpg"
        },
        {
          "type": "image",
          "src": "/assets/national-ai-hackathon-khorezm-2026-team-carvision.jpg"
        }
      ],
      "links": []
    }
  }
];

export const galleryData: GalleryItem[] = [
  {
    "id": "2",
    "src": "/assets/national-ai-hackathon-khorezm-2026-winners-podium.jpg",
    "caption": {
      "uz": "National AI Hackathon: Khorezm 2026 g'oliblari podiumda — Asadbek Jumanazarov jamoasi 1-o'rin sovrinlari bilan",
      "en": "National AI Hackathon: Khorezm 2026 winners on the podium — Asadbek Jumanazarov's team with the 1st place prizes",
      "ru": "Победители National AI Hackathon: Khorezm 2026 на подиуме — команда Асадбека Жуманазарова с призами за 1 место"
    }
  },
  {
    "id": "3",
    "src": "/assets/carvision-pitch-national-ai-hackathon-2026-asadbek-jumanazarov.jpg",
    "caption": {
      "uz": "Asadbek Jumanazarov CarVision loyihasini taqdim etmoqda — \"Muammo nimada?\" slayidi, National AI Hackathon 2026",
      "en": "Asadbek Jumanazarov pitching the CarVision project — \"What is the problem?\" slide, National AI Hackathon 2026",
      "ru": "Асадбек Жуманазаров представляет проект CarVision — слайд «В чём проблема?», National AI Hackathon 2026"
    }
  },
  {
    "id": "4",
    "src": "/assets/asadbek-jumanazarov-presenting-carvision-hackathon-stage.jpg",
    "caption": {
      "uz": "Asadbek Jumanazarov National AI Hackathon sahnasida CarVision taqdimotini o'tkazmoqda",
      "en": "Asadbek Jumanazarov presenting CarVision on the National AI Hackathon stage",
      "ru": "Асадбек Жуманазаров на сцене National AI Hackathon с презентацией CarVision"
    }
  },
  {
    "id": "5",
    "src": "/assets/national-ai-hackathon-khorezm-2026-team-banner.jpg",
    "caption": {
      "uz": "National AI Hackathon: Khorezm 2026 — CarVision jamoasi tashkilotchilar bannerida",
      "en": "National AI Hackathon: Khorezm 2026 — the CarVision team in front of the organizers' banner",
      "ru": "National AI Hackathon: Khorezm 2026 — команда CarVision на фоне баннера организаторов"
    }
  },
  {
    "id": "6",
    "src": "/assets/national-ai-hackathon-khorezm-2026-team-carvision.jpg",
    "caption": {
      "uz": "National AI Hackathon: Khorezm 2026 — CarVision jamoasi hackathon maydonida",
      "en": "National AI Hackathon: Khorezm 2026 — the CarVision team at the hackathon venue",
      "ru": "National AI Hackathon: Khorezm 2026 — команда CarVision на площадке хакатона"
    }
  },
  {
    "id": "1",
    "src": "/assets/asadbek-jumanazarov-formal-portrait.jpg",
    "caption": {
      "uz": "Asadbek Jumanazarov — Software Developer, TriCorp hammuassisi (rasmiy portret)",
      "en": "Asadbek Jumanazarov — Software Developer and Co-Founder of TriCorp (formal portrait)",
      "ru": "Асадбек Жуманазаров — Software Developer, сооснователь TriCorp (официальный портрет)"
    }
  }
];

export const blogData: BlogPost[] = [
  ...latestBlogPosts,
  ...myBlogPosts
];

export const testimonialsData: Testimonial[] = [];

export const faqData: FAQItem[] = [
  {
    "id": "1",
    "q": {
      "uz": "Siz kimsiz va nima bilan shug'ullanasiz?",
      "en": "Who are you and what do you do?",
      "ru": "Кто вы и чем занимаетесь?"
    },
    "a": {
      "uz": "Men Asadbek Jumanazarov — Full-Stack dasturchi va TRICORP agentligining hammuassisiman. Veb-platformalar, admin panellar va biznes tizimlarini noldan quraman, shuningdek ilovalar xavfsizligini tekshiraman (penetratsion test).",
      "en": "I am Asadbek Jumanazarov, a Full-Stack developer and co-founder of TRICORP agency. I build web platforms, admin panels and business systems from scratch, and I test application security (penetration testing).",
      "ru": "Я Асадбек Жуманазаров, Full-Stack разработчик и сооснователь агентства TRICORP. Создаю веб-платформы, админ-панели и бизнес-системы с нуля, а также проверяю безопасность приложений (пентест)."
    }
  },
  {
    "id": "2",
    "q": {
      "uz": "Qanday loyihalarni qabul qilasiz?",
      "en": "What kinds of projects do you take?",
      "ru": "Какие проекты вы берёте?"
    },
    "a": {
      "uz": "Korporativ saytlar va landing sahifalar, onlayn do'konlar, buyurtma va boshqaruv tizimlari, admin panellar, AI integratsiyali web-ilovalar hamda maxsus desktop yechimlar. Aniq ro'yxatdan chiqib ketadigan g'oya bo'lsa ham, albatta muhokama qilamiz.",
      "en": "Company websites and landing pages, online stores, order and management systems, admin dashboards, web apps with AI features and custom desktop solutions. If your idea does not fit the list, we can still discuss it.",
      "ru": "Корпоративные сайты и лендинги, интернет-магазины, системы заказов и управления, админ-панели, веб-приложения с ИИ и индивидуальные десктоп-решения. Если ваша идея не вписывается в список — всё равно обсудим."
    }
  },
  {
    "id": "3",
    "q": {
      "uz": "Loyiha qancha vaqt oladi?",
      "en": "How long does a project take?",
      "ru": "Сколько времени занимает проект?"
    },
    "a": {
      "uz": "Bu hajmga bog'liq. Oddiy landing sahifa odatda bir-ikki haftada tayyor bo'ladi, biznes platforma yoki admin paneli bilan tizim esa bir necha hafta. Aniq muddatni talablarni ko'rib chiqqach, ish boshlanishidan oldin aytaman.",
      "en": "It depends on scope. A simple landing page is usually ready in one or two weeks, while a business platform or a system with an admin panel takes several weeks. I give an exact timeline after reviewing the requirements, before work starts.",
      "ru": "Зависит от объёма. Простой лендинг обычно готов за одну-две недели, а бизнес-платформа или система с админ-панелью — за несколько недель. Точный срок называю после изучения требований, до начала работы."
    }
  },
  {
    "id": "4",
    "q": {
      "uz": "Narx qanday belgilanadi?",
      "en": "How is the price decided?",
      "ru": "Как формируется цена?"
    },
    "a": {
      "uz": "Narx loyiha hajmi, murakkabligi va muddatiga qarab belgilanadi. Ish boshlanishidan oldin aniq hajm va narx yozma ravishda kelishiladi, shuning uchun kutilmagan qo'shimcha xarajatlar bo'lmaydi.",
      "en": "The price depends on the scope, complexity and deadline. Before work begins, the exact scope and price are agreed in writing, so there are no surprise costs.",
      "ru": "Цена зависит от объёма, сложности и сроков. До начала работы точный объём и стоимость согласуются письменно, поэтому неожиданных расходов не будет."
    }
  },
  {
    "id": "5",
    "q": {
      "uz": "Ish jarayoni qanday kechadi?",
      "en": "What does the work process look like?",
      "ru": "Как проходит работа?"
    },
    "a": {
      "uz": "Avval talablarni birga aniqlaymiz, keyin reja va dizaynni kelishamiz. So'ng ishlab chiqish bosqichma-bosqich boradi va har bosqichda natijani ko'rib, fikr bildirasiz. Yakunda sinov, ishga tushirish va topshirish bo'ladi.",
      "en": "First we define the requirements together, then agree on a plan and design. Development goes step by step and you review and comment at each stage. It ends with testing, launch and handover.",
      "ru": "Сначала вместе определяем требования, затем согласуем план и дизайн. Разработка идёт поэтапно, на каждом этапе вы смотрите результат и даёте обратную связь. В конце — тестирование, запуск и передача."
    }
  },
  {
    "id": "6",
    "q": {
      "uz": "Qaysi texnologiyalardan foydalanasiz?",
      "en": "Which technologies do you use?",
      "ru": "Какие технологии вы используете?"
    },
    "a": {
      "uz": "Asosan React, TypeScript, JavaScript, Node.js, Python, PostgreSQL va Supabase. Loyiha uchun eng mos texnologiyani tanlayman: Next.js, Electron yoki boshqa vositalar ham ishlataman.",
      "en": "Mainly React, TypeScript, JavaScript, Node.js, Python, PostgreSQL and Supabase. I pick what fits the project best, including Next.js, Electron and other tools.",
      "ru": "В основном React, TypeScript, JavaScript, Node.js, Python, PostgreSQL и Supabase. Выбираю то, что лучше подходит проекту, включая Next.js, Electron и другие инструменты."
    }
  },
  {
    "id": "7",
    "q": {
      "uz": "Xavfsizlikka qanday e'tibor berasiz?",
      "en": "How do you handle security?",
      "ru": "Как вы относитесь к безопасности?"
    },
    "a": {
      "uz": "Xavfsizlik men uchun asosiy yo'nalish. Kirish nazorati, ma'lumotlarni himoyalash (masalan, Supabase'da Row Level Security), sirlarni to'g'ri saqlash va ishga tushirishdan oldin penetratsion test — bularning hammasi loyiha jarayonining bir qismi.",
      "en": "Security is a core focus for me. Access control, data protection (for example Row Level Security in Supabase), proper secret handling and penetration testing before launch are all part of the process.",
      "ru": "Безопасность — одно из моих основных направлений. Контроль доступа, защита данных (например, Row Level Security в Supabase), правильное хранение секретов и пентест перед запуском — всё это часть процесса."
    }
  },
  {
    "id": "8",
    "q": {
      "uz": "Masofadan ishlaysizmi? Xorijiy mijozlar bilan-chi?",
      "en": "Do you work remotely? What about international clients?",
      "ru": "Вы работаете удалённо? А с зарубежными клиентами?"
    },
    "a": {
      "uz": "Ha, masofadan ishlayman va jamoa bilan ham, yakka mijozlar bilan ham ishlashga tayyorman. Ingliz tilini B2 darajasida bilaman, shuning uchun xorijiy mijozlar bilan muloqot muammo emas.",
      "en": "Yes, I work remotely, both with teams and individual clients. My English is at B2 level, so communicating with international clients is not a problem.",
      "ru": "Да, я работаю удалённо — и с командами, и с отдельными клиентами. Мой английский на уровне B2, поэтому общение с зарубежными клиентами не проблема."
    }
  },
  {
    "id": "9",
    "q": {
      "uz": "Sayt tayyor bo'lgach yordam berasizmi?",
      "en": "Do you provide support after launch?",
      "ru": "Есть ли поддержка после запуска?"
    },
    "a": {
      "uz": "Ha. Ishga tushirgandan keyin xatolarni tuzataman, savollarga javob beraman va kerak bo'lsa yangi imkoniyatlar qo'shaman. Qo'llab-quvvatlash shartlari loyiha boshida kelishiladi.",
      "en": "Yes. After launch I fix issues, answer questions and add new features when needed. Support terms are agreed at the start of the project.",
      "ru": "Да. После запуска я исправляю ошибки, отвечаю на вопросы и при необходимости добавляю новые функции. Условия поддержки согласуются в начале проекта."
    }
  },
  {
    "id": "10",
    "q": {
      "uz": "Mavjud saytni yoki tizimni yangilab bera olasizmi?",
      "en": "Can you improve or fix an existing site or system?",
      "ru": "Можете ли вы доработать существующий сайт или систему?"
    },
    "a": {
      "uz": "Ha. Mavjud loyihani tahlil qilib, xatolarni tuzataman, tezligi va xavfsizligini yaxshilayman yoki yangi imkoniyat qo'shaman. Avval kodni ko'rib chiqib, nima qilish kerakligini aytaman.",
      "en": "Yes. I analyze the existing project, fix bugs, improve speed and security or add features. I review the code first and tell you what needs to be done.",
      "ru": "Да. Анализирую существующий проект, исправляю ошибки, улучшаю скорость и безопасность или добавляю функции. Сначала изучаю код и говорю, что нужно сделать."
    }
  },
  {
    "id": "11",
    "q": {
      "uz": "Loyihani qanday boshlayman?",
      "en": "How do I start a project with you?",
      "ru": "Как начать проект с вами?"
    },
    "a": {
      "uz": "\"Aloqa\" sahifasida yozing yoki \"AI tanlov\" sahifasida maqsadingizni tasvirlang, u sizga mos xizmat va loyihalarni ko'rsatadi. Qisqa muhokamadan keyin takliflarimni yuboraman.",
      "en": "Write to me on the Contact page, or describe your goal on the AI match page and it will show the services and projects that fit. After a short discussion I send my proposal.",
      "ru": "Напишите мне на странице «Контакты» или опишите цель на странице «ИИ-подбор» — она покажет подходящие услуги и проекты. После короткого обсуждения я отправлю предложение."
    }
  },
  {
    "id": "12",
    "q": {
      "uz": "Mening g'oyam hali aniq emas. Baribir murojaat qilsam bo'ladimi?",
      "en": "My idea is not clear yet. Can I still reach out?",
      "ru": "Моя идея пока не оформлена. Можно ли всё равно обратиться?"
    },
    "a": {
      "uz": "Albatta. G'oya bosqichida ham yordam beraman: maqsadni aniqlash, kerakli imkoniyatlarni tanlash va eng sodda ishga tushirish yo'lini (MVP) rejalashtirish.",
      "en": "Of course. I can help at the idea stage: clarifying the goal, choosing the essential features and planning the simplest launch path (MVP).",
      "ru": "Конечно. Помогу уже на стадии идеи: уточнить цель, выбрать нужные функции и спланировать самый простой путь запуска (MVP)."
    }
  }
];

export const timelineData: TimelineItem[] = [
  {
    "id": "1",
    "year": "2025+",
    "title": {
      "uz": "Full-Stack dasturchi · hammuassis",
      "en": "Full-Stack Developer · Co-Founder",
      "ru": "Full-Stack разработчик · сооснователь"
    },
    "place": "TRICORP Agency · Remote",
    "description": {
      "uz": "Zamonaviy veb-platformalar, ilovalar va masshtablanadigan raqamli yechimlar yaratish. Agentlikning asosiy quruvchilaridan biri sifatida ishlab chiqish va tizim arxitekturasi bilan shug'ullanaman. Biznes platformalar, admin panellar va maxsus veb-yechimlarni yarataman, shuningdek penetratsion testlar o'tkazib, ilovalar xavfsizligini mustahkamlayman.",
      "en": "Building modern web platforms, applications and scalable digital solutions. As one of the agency's core builders I work on both development and system architecture. I create business platforms, admin dashboards and custom web solutions, and run penetration testing to harden application security.",
      "ru": "Создание современных веб-платформ, приложений и масштабируемых цифровых решений. Как один из ключевых разработчиков агентства занимаюсь разработкой и архитектурой систем. Делаю бизнес-платформы, админ-панели и индивидуальные веб-решения, а также провожу пентесты и усиливаю безопасность приложений."
    }
  },
  {
    "id": "2",
    "year": "2026",
    "title": {
      "uz": "Avto-transport broker · logistika koordinatori",
      "en": "Auto Transport Broker · Logistics Coordinator",
      "ru": "Автотранспортный брокер · координатор логистики"
    },
    "place": "Mazzy Express Inc · Urgench",
    "description": {
      "uz": "AQSh bo'ylab avtomobil tashish brokerlik kompaniyasi operatsion jamoasida ishladim: CRM orqali mijozlar so'rovlari va narx hisoblash, avtomobillarni diler, auksion va portlardan olib ketishni muvofiqlashtirish, shartnoma va to'lovlar bilan ishlash, tashuvchilar bilan dispetcherlik.",
      "en": "Worked on the operations team of a car hauling brokerage serving the United States: managed leads and quotes in a CRM, coordinated pickups from dealerships, auctions and ports, handled contracts and payments, and dispatched carriers.",
      "ru": "Работал в операционной команде брокера автоперевозок по США: вёл заявки и расчёты в CRM, координировал забор авто с дилерских центров, аукционов и портов, оформлял договоры и платежи, диспетчеризировал перевозчиков."
    }
  },
  {
    "id": "3",
    "year": "2026",
    "title": {
      "uz": "Dispetcher va xaridor stajyori",
      "en": "Dispatch & Buyer Trainee",
      "ru": "Стажёр диспетчера и байера"
    },
    "place": "NRG Transportation · Urgench",
    "description": {
      "uz": "Xorazm IT Park Urganch filialida logistika va avtomobil tashish bo'yicha trening: dispetcherlik, yuklarni muvofiqlashtirish, tashuvchilar bilan muloqot va muzokaralar.",
      "en": "Logistics and car hauling training at the Urgench branch of Xorazm IT Park: dispatching, shipment coordination, carrier communication and negotiation.",
      "ru": "Обучение логистике и автоперевозкам в Ургенчском филиале Xorazm IT Park: диспетчеризация, координация отправок, общение с перевозчиками и переговоры."
    }
  },
  {
    "id": "4",
    "year": "2024–2025",
    "title": {
      "uz": "Frontend dasturlash o'qituvchisi",
      "en": "Frontend Development Instructor",
      "ru": "Преподаватель frontend-разработки"
    },
    "place": "IT Park · Shovot",
    "description": {
      "uz": "Talabalarga HTML, CSS, JavaScript va React'dan dars berdim, boshlovchilar uchun amaliy loyihalar tayyorladim, kodlarini ko'rib chiqdim va birinchi junior ish uchun portfolio loyihalarini tayyorlashga yordam berdim.",
      "en": "Taught students HTML, CSS, JavaScript and React, designed hands-on projects for beginners, reviewed their code and helped them prepare portfolio projects for their first junior roles.",
      "ru": "Преподавал студентам HTML, CSS, JavaScript и React, готовил практические проекты для новичков, проверял их код и помогал собрать портфолио для первой работы junior-разработчиком."
    }
  }
];

export const usesData: UsesItem[] = [
  {
    "id": "1",
    "group": "Hardware",
    "name": "MacBook Pro M3",
    "note": {
      "uz": "Asosiy ish quroli",
      "en": "Main machine",
      "ru": "Основная машина"
    }
  },
  {
    "id": "2",
    "group": "Editor",
    "name": "VS Code + Vim",
    "note": {
      "uz": "Tema: Noir",
      "en": "Theme: Noir",
      "ru": "Тема: Noir"
    }
  },
  {
    "id": "3",
    "group": "Design",
    "name": "Figma",
    "note": {
      "uz": "Barcha maketlar",
      "en": "All mockups",
      "ru": "Все макеты"
    }
  },
  {
    "id": "4",
    "group": "Terminal",
    "name": "Warp + zsh",
    "note": {
      "uz": "Tezkor ish",
      "en": "Fast workflow",
      "ru": "Быстрая работа"
    }
  }
];
