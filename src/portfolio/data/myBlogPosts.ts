import type { BlogPost } from '../types';

// Articles written for Asadbek's blog. Paragraphs are separated by a blank line ("\n\n").
export const myBlogPosts: BlogPost[] = [
  {
    id: 'a1',
    slug: 'fast-website-that-sells',
    date: '2026-10-20',
    readMin: 7,
    tags: ['Performance', 'Business'],
    title: {
      uz: 'Sotadigan sayt: nega tezlik — eng yaxshi marketing',
      en: 'A website that sells: why speed is your best marketing',
      ru: 'Сайт, который продаёт: почему скорость — лучший маркетинг',
    },
    excerpt: {
      uz: "Har bir qo'shimcha soniya mijozni yo'qotish demak. Tez sayt qanday quriladi va bu biznesga qanday foyda beradi.",
      en: 'Every extra second costs you customers. How to build a fast site and what it really does for your business.',
      ru: 'Каждая лишняя секунда стоит клиентов. Как сделать быстрый сайт и что это даёт бизнесу.',
    },
    body: {
      uz: `Ko'pchilik sayt buyurtma qilganda dizayn haqida o'ylaydi: ranglar, shriftlar, chiroyli rasmlar. Bular muhim, lekin foydalanuvchi dizaynni ko'rishidan oldin bitta narsani his qiladi — sahifa qanchalik tez ochilayotganini. Agar sahifa uch soniyadan ko'proq yuklansa, mobil foydalanuvchilarning katta qismi uni yopib ketadi.

Tezlik — bu shunchaki texnik ko'rsatkich emas. U to'g'ridan-to'g'ri sotuvga ta'sir qiladi. Tez sayt Google qidiruvida yuqoriroq chiqadi, reklama uchun to'lanadigan har bir klik ko'proq natija beradi va mijoz xaridni oxirigacha yetkazish ehtimoli oshadi.

Men loyihalarda uchta asosiy qoidaga amal qilaman. Birinchisi: rasmlar. Ular odatda sahifa hajmining 70% ini tashkil qiladi, shuning uchun men har bir rasmni kerakli o'lchamda va zamonaviy formatda (WebP yoki AVIF) beraman, ko'rinmaydigan rasmlarni esa kechiktirib yuklayman.

Ikkinchisi: kod hajmi. Har bir kutubxona va plagin foydalanuvchi qurilmasiga yuklanadi. Men faqat kerakli narsani qo'shaman, kodni sahifalarga bo'lib yuklayman va server tomonida oldindan tayyorlangan HTML beraman — shunda foydalanuvchi kontentni darhol ko'radi.

Uchinchisi: o'lchash. "Tez ishlayapti shekilli" degan his yetarli emas. Men Lighthouse va real foydalanuvchi ma'lumotlari (Core Web Vitals) orqali LCP, INP va CLS ko'rsatkichlarini kuzataman va har bir o'zgarishdan keyin tekshiraman.

Agar saytingiz sekin ishlayotganini his qilsangiz, avval o'lchang. Ko'pincha eng katta muammo bir-ikkita og'ir rasm yoki keraksiz skriptda bo'ladi va uni bir necha kun ichida tuzatish mumkin.`,
      en: `When people order a website, they usually think about design first: colours, fonts, beautiful images. Those matter, but before a visitor sees any design, they feel one thing — how fast the page opens. If a page takes longer than three seconds to load, a large share of mobile visitors simply leave.

Speed is not just a technical metric. It directly affects sales. A fast site ranks higher in Google, every paid ad click converts better, and customers are far more likely to finish checkout.

I follow three core rules on every project. First: images. They usually make up about 70% of a page's weight, so I serve every image at the right size in a modern format (WebP or AVIF) and lazy-load anything below the fold.

Second: code size. Every library and plugin gets downloaded to the visitor's device. I only ship what is needed, split code per page, and render HTML on the server so visitors see content instantly.

Third: measurement. "It feels fast" is not enough. I track LCP, INP and CLS with Lighthouse and real-user data (Core Web Vitals) and re-check after every change.

If your website feels slow, measure it first. Very often the biggest problem is one or two heavy images or an unnecessary script, and it can be fixed in a few days.`,
      ru: `Заказывая сайт, большинство думает в первую очередь о дизайне: цвета, шрифты, красивые картинки. Это важно, но прежде чем увидеть дизайн, посетитель чувствует одно — как быстро открывается страница. Если загрузка длится дольше трёх секунд, значительная часть мобильных пользователей просто уходит.

Скорость — не просто технический показатель. Она напрямую влияет на продажи. Быстрый сайт выше в Google, каждый оплаченный клик по рекламе приносит больше, а клиент чаще доходит до оформления заказа.

В каждом проекте я соблюдаю три правила. Первое: изображения. Обычно они занимают около 70% веса страницы, поэтому я отдаю каждое изображение нужного размера в современном формате (WebP или AVIF), а всё, что ниже первого экрана, загружаю отложенно.

Второе: объём кода. Каждая библиотека и плагин загружаются на устройство посетителя. Я подключаю только необходимое, разбиваю код по страницам и рендерю HTML на сервере — так пользователь видит контент сразу.

Третье: измерения. Ощущения «вроде быстро» недостаточно. Я отслеживаю LCP, INP и CLS через Lighthouse и данные реальных пользователей (Core Web Vitals) и проверяю после каждого изменения.

Если ваш сайт кажется медленным, начните с измерений. Часто главная проблема — одна-две тяжёлые картинки или лишний скрипт, и это можно исправить за несколько дней.`,
    },
  },
  {
    id: 'a2',
    slug: 'mvp-in-6-weeks',
    date: '2026-09-28',
    readMin: 8,
    tags: ['Startup', 'Process'],
    title: {
      uz: "6 haftada MVP: g'oyadan ishlaydigan mahsulotgacha",
      en: 'An MVP in 6 weeks: from idea to working product',
      ru: 'MVP за 6 недель: от идеи до работающего продукта',
    },
    excerpt: {
      uz: "Startaplar uchun eng katta xavf — hech kimga kerak bo'lmagan narsani uzoq qurish. Men MVP'ni qanday rejalashtiraman.",
      en: "The biggest startup risk is spending months building something nobody needs. Here's how I plan an MVP.",
      ru: 'Главный риск стартапа — месяцами строить то, что никому не нужно. Как я планирую MVP.',
    },
    body: {
      uz: `Ko'p asoschilar menga katta ro'yxat bilan kelishadi: mobil ilova, admin panel, to'lovlar, chat, bildirishnomalar, analitika. Hammasi kerakdek tuyuladi. Lekin birinchi versiyaning maqsadi — hamma narsani qilish emas, balki eng muhim savolga javob olish: odamlar bu mahsulotdan foydalanadimi va buning uchun pul to'laydimi?

1-hafta: muammo va asosiy jarayon. Biz birgalikda bitta asosiy foydalanuvchi yo'lini aniqlaymiz — masalan, "mijoz xizmatni topadi, vaqt tanlaydi va to'laydi". Qolgan hamma narsa keyingi ro'yxatga o'tadi. Shu haftada oddiy prototip chizamiz va 3–5 ta haqiqiy foydalanuvchiga ko'rsatamiz.

2–4-haftalar: qurish. Men tayyor va ishonchli vositalardan foydalanaman: autentifikatsiya, ma'lumotlar bazasi va to'lovlar uchun noldan narsa yozmayman. Bu vaqtni tejaydi va xavfsizlikni oshiradi. Har hafta oxirida siz ishlaydigan versiyani havola orqali ko'rasiz.

5-hafta: sinov va sayqal. Haqiqiy foydalanuvchilar mahsulotni sinab ko'radi. Biz xatolarni tuzatamiz, matnlarni aniqlashtiramiz va mobil qurilmalarda qulaylikni tekshiramiz. Shu bosqichda ko'pincha bitta kichik o'zgarish konversiyani ikki baravar oshiradi.

6-hafta: ishga tushirish va o'lchash. Mahsulot o'z domeningizda ishga tushadi, analitika ulanadi va biz qaysi qadamlarda foydalanuvchilar to'xtab qolayotganini kuzata boshlaymiz. Endi qarorlar taxminga emas, ma'lumotga asoslanadi.

Bu yondashuvning eng katta foydasi — pul va vaqtni tejash. Olti oy yashirincha qurib, keyin bozorga mos kelmasligini bilishdan ko'ra, olti haftada haqiqiy fikr-mulohaza olish ancha arzon.

Agar sizda g'oya bo'lsa va qayerdan boshlashni bilmasangiz, eng avval bitta jumla yozing: "Mening mahsulotim [kim]ga [qanday muammo]ni hal qilishga yordam beradi". Agar shu jumla aniq bo'lsa, MVP'ning yarmi tayyor.`,
      en: `Many founders come to me with a long list: mobile app, admin panel, payments, chat, notifications, analytics. Everything feels essential. But the goal of a first version is not to do everything — it's to answer the most important question: will people use this, and will they pay for it?

Week 1: the problem and the core flow. Together we define a single main user journey — for example, "a customer finds a service, picks a time and pays". Everything else goes on the later list. That same week we sketch a simple prototype and show it to 3–5 real users.

Weeks 2–4: build. I use proven, reliable tools: I don't write authentication, databases or payments from scratch. That saves time and improves security. At the end of every week you get a working version you can open from a link.

Week 5: testing and polish. Real users try the product. We fix bugs, sharpen the copy and check the mobile experience. At this stage a single small change often doubles conversion.

Week 6: launch and measure. The product goes live on your own domain, analytics are connected and we start watching where users drop off. From now on, decisions are based on data, not guesses.

The biggest benefit of this approach is saving money and time. Getting real feedback in six weeks is far cheaper than building in secret for six months and then discovering the market doesn't want it.

If you have an idea and don't know where to start, first write one sentence: "My product helps [who] solve [what problem]." If that sentence is clear, half of your MVP is already done.`,
      ru: `Многие основатели приходят ко мне с длинным списком: мобильное приложение, админка, платежи, чат, уведомления, аналитика. Всё кажется необходимым. Но цель первой версии — не сделать всё, а ответить на главный вопрос: будут ли люди этим пользоваться и платить?

Неделя 1: проблема и основной сценарий. Вместе мы определяем один главный путь пользователя — например, «клиент находит услугу, выбирает время и оплачивает». Всё остальное — в список на потом. В ту же неделю делаем простой прототип и показываем его 3–5 реальным пользователям.

Недели 2–4: разработка. Я использую проверенные инструменты: не пишу авторизацию, базы данных и платежи с нуля. Это экономит время и повышает безопасность. В конце каждой недели вы получаете рабочую версию по ссылке.

Неделя 5: тестирование и шлифовка. Реальные пользователи пробуют продукт. Мы исправляем ошибки, уточняем тексты и проверяем удобство на мобильных. На этом этапе одно маленькое изменение нередко удваивает конверсию.

Неделя 6: запуск и измерения. Продукт запускается на вашем домене, подключается аналитика, и мы смотрим, на каких шагах пользователи уходят. Теперь решения принимаются на основе данных, а не догадок.

Главное преимущество подхода — экономия денег и времени. Получить реальную обратную связь за шесть недель гораздо дешевле, чем полгода строить втайне и потом узнать, что рынку это не нужно.

Если у вас есть идея и вы не знаете, с чего начать, напишите одно предложение: «Мой продукт помогает [кому] решить [какую проблему]». Если это предложение ясно — половина MVP уже готова.`,
    },
  },
  {
    id: 'a3',
    slug: 'design-system-small-teams',
    date: '2026-09-05',
    readMin: 6,
    tags: ['UI/UX', 'Design system'],
    title: {
      uz: 'Kichik jamoalar uchun dizayn tizimi: tartib va tezlik',
      en: 'A design system for small teams: order and speed',
      ru: 'Дизайн-система для небольших команд: порядок и скорость',
    },
    excerpt: {
      uz: "Dizayn tizimi faqat yirik kompaniyalar uchun emas. U kichik loyihada ham vaqtni tejaydi va brendni mustahkamlaydi.",
      en: "Design systems aren't only for big companies. Even small projects save time and look more consistent with one.",
      ru: 'Дизайн-система — не только для крупных компаний. Даже небольшой проект с ней экономит время и выглядит цельнее.',
    },
    body: {
      uz: `Har bir sahifada tugmalar biroz boshqacha, ranglar bir-biridan farq qiladi, bo'shliqlar esa tasodifiy — bu ko'plab saytlarning tanish muammosi. Foydalanuvchi buni so'z bilan ifodalay olmaydi, lekin his qiladi: mahsulot "arzon" va ishonchsiz ko'rinadi.

Dizayn tizimi — bu yagona qoidalar to'plami: ranglar, shriftlar, o'lchamlar, bo'shliqlar va tayyor komponentlar. Uni yaratish uchun katta jamoa kerak emas. Men kichik loyihalarda ham bir necha kun ichida asosiy tizimni quraman.

Birinchi qadam — tokenlar. Har bir rang, shrift o'lchami va radius alohida nom oladi: "asosiy rang", "fon", "muted matn". Komponentlarda hech qachon to'g'ridan-to'g'ri rang kodi yozilmaydi. Shunda brend rangini o'zgartirish bitta qatorda amalga oshadi.

Ikkinchi qadam — bir nechta asosiy komponent: tugma, kiritish maydoni, karta, modal oyna. Har birining holatlari oldindan o'ylanadi: sichqoncha ustida, faol, o'chirilgan, xato. Bu kelajakda yangi sahifa qo'shishni juda tezlashtiradi.

Uchinchi qadam — Figma va kod o'rtasida bir xillik. Dizaynerdagi komponent nomi koddagi nom bilan bir xil bo'lishi kerak. Shunda "bu tugma qaysi?" degan savollar yo'qoladi va ish tezlashadi.

Kirish imkoniyati (accessibility) ham tizimning bir qismi. Matn va fon kontrasti yetarli bo'lishi, tugmalar telefonda bosish uchun kamida 44 piksel bo'lishi va harakatni kamaytirishni tanlagan foydalanuvchilar uchun animatsiyalar o'chishi kerak.

Natijada siz nafaqat chiroyli, balki izchil mahsulotga ega bo'lasiz. Har bir yangi funksiya avvalgilari bilan bir xil ko'rinadi va jamoa vaqtni mayda detallarni qayta muhokama qilishga sarflamaydi.`,
      en: `Buttons look slightly different on every page, colours don't quite match, spacing feels random — a familiar problem on many websites. Users can't put it into words, but they feel it: the product looks "cheap" and less trustworthy.

A design system is a single set of rules: colours, fonts, sizes, spacing and ready-made components. You don't need a big team to create one. Even on small projects I set up the core system in a few days.

Step one is tokens. Every colour, font size and radius gets its own name: "primary", "background", "muted text". Components never contain raw colour codes. That way changing your brand colour is a one-line edit.

Step two is a handful of core components: button, input, card, modal. Each one's states are designed up front: hover, active, disabled, error. This makes adding new pages much faster later on.

Step three is consistency between Figma and code. A component's name in the design file should match its name in code. Questions like "which button is this?" disappear and work speeds up.

Accessibility is part of the system too. Text needs enough contrast against its background, buttons should be at least 44 pixels to tap comfortably on a phone, and animations should switch off for users who prefer reduced motion.

The result is a product that's not only beautiful but consistent. Every new feature looks like it belongs, and the team stops spending time re-debating small details.`,
      ru: `На каждой странице кнопки чуть отличаются, цвета не совпадают, отступы случайные — знакомая проблема многих сайтов. Пользователь не сформулирует это словами, но почувствует: продукт выглядит «дёшево» и вызывает меньше доверия.

Дизайн-система — это единый набор правил: цвета, шрифты, размеры, отступы и готовые компоненты. Для её создания не нужна большая команда. Даже в небольших проектах я собираю базовую систему за несколько дней.

Шаг первый — токены. Каждый цвет, размер шрифта и радиус получает имя: «основной», «фон», «приглушённый текст». В компонентах никогда не пишутся прямые коды цветов. Так смена фирменного цвета — это правка одной строки.

Шаг второй — несколько базовых компонентов: кнопка, поле ввода, карточка, модальное окно. Состояния каждого продумываются заранее: наведение, активное, отключённое, ошибка. Это сильно ускоряет добавление новых страниц.

Шаг третий — единство Figma и кода. Название компонента в макете должно совпадать с названием в коде. Вопросы «а это какая кнопка?» исчезают, работа идёт быстрее.

Доступность — тоже часть системы. Контраст текста и фона должен быть достаточным, кнопки на телефоне — не меньше 44 пикселей, а анимации — отключаться у пользователей, выбравших уменьшение движения.

В итоге вы получаете не просто красивый, а цельный продукт. Каждая новая функция выглядит органично, а команда не тратит время на повторные споры о мелочах.`,
    },
  },
  {
    id: 'a4',
    slug: 'ai-features-that-help',
    date: '2026-08-30',
    readMin: 7,
    tags: ['AI', 'Product'],
    title: {
      uz: "Saytingizga AI qo'shish: haqiqatan foydali funksiyalar",
      en: 'Adding AI to your website: features that actually help',
      ru: 'AI на вашем сайте: функции, которые действительно помогают',
    },
    excerpt: {
      uz: "AI moda uchun emas, mijozga vaqt tejash uchun kerak. Qaysi funksiyalar natija beradi va ularni qanday xavfsiz qurish mumkin.",
      en: "AI should save your customers time, not just follow a trend. Which features pay off and how to build them safely.",
      ru: 'AI нужен не ради моды, а чтобы экономить время клиентов. Какие функции окупаются и как сделать их безопасно.',
    },
    body: {
      uz: `Bugun deyarli har bir mijoz "saytga AI qo'shsak bo'ladimi?" deb so'raydi. Javobim: ha, lekin faqat u aniq muammoni hal qilsa. Shunchaki "AI bor" deyish uchun qo'shilgan chatbot ko'pincha foydalanuvchini chalg'itadi va ishonchni pasaytiradi.

Eng foydali funksiyalardan biri — aqlli tavsiya. Masalan, ushbu portfoliodagi "AI tanlov" sahifasi: mijoz loyihasini o'z so'zlari bilan yozadi, AI esa unga mos xizmatlar, o'xshash ishlar va foydali maqolalarni tanlab beradi. Mijoz o'nlab sahifalarni varaqlab chiqmaydi — kerakli narsani bir daqiqada topadi.

Ikkinchi foydali yo'nalish — matn bilan ishlash: uzun hujjatlarni qisqartirish, mahsulot tavsiflarini bir nechta tilga tarjima qilish, qo'llab-quvvatlash xatlarini tartiblash. Bular xodimlarning soatlab vaqtini tejaydi.

Lekin AI'ni to'g'ri qurish muhim. Birinchi qoida: modelga faqat sizning haqiqiy ma'lumotlaringiz asosida javob berishga ruxsat bering. "AI tanlov"da model faqat mavjud xizmat va loyihalar ro'yxatidan tanlaydi, server esa har bir javobni tekshiradi — o'ylab topilgan narsa foydalanuvchiga hech qachon chiqmaydi.

Ikkinchi qoida: maxfiy kalitlar va so'rovlar faqat serverda qoladi. Brauzerda hech qachon API kaliti bo'lmasligi kerak. Uchinchi qoida: xatolarga tayyor bo'ling — so'rovlar ko'payganda yoki xizmat vaqtincha ishlamaganda foydalanuvchi tushunarli xabar ko'rishi kerak, bo'sh ekran emas.

Narx ham muhim. Har bir AI so'rovi pul turadi, shuning uchun men qisqa va aniq ko'rsatmalar yozaman, faqat kerakli ma'lumotni yuboraman va mos modelni tanlayman. Ko'p hollarda yaxshi yozilgan ko'rsatma qimmatroq modeldan ko'ra yaxshiroq natija beradi.

Agar biznesingizda takrorlanadigan, ko'p vaqt oladigan vazifa bo'lsa — mijozlarga bir xil savollarga javob berish, so'rovlarni saralash, kontent tayyorlash — aynan shu yerdan AI bilan boshlash eng to'g'ri qaror.`,
      en: `Almost every client today asks, "Can we add AI to the site?" My answer: yes, but only if it solves a specific problem. A chatbot added just to say "we have AI" often confuses users and lowers trust.

One of the most useful features is smart recommendation. Take the "AI match" page in this portfolio: a client describes their project in their own words, and the AI picks the right services, similar past work and helpful articles. Instead of browsing dozens of pages, they find what they need in a minute.

The second useful area is working with text: summarising long documents, translating product descriptions into several languages, sorting support emails. These save staff hours of work.

But building AI correctly matters. Rule one: only let the model answer from your real data. In "AI match" the model can only choose from the existing list of services and projects, and the server checks every answer — nothing invented ever reaches the user.

Rule two: secret keys and prompts stay on the server. There should never be an API key in the browser. Rule three: plan for errors — when traffic spikes or a service is temporarily down, users should see a clear message, not a blank screen.

Cost matters too. Every AI request costs money, so I write short, precise instructions, send only the data that's needed and choose the right model. In many cases a well-written prompt beats a more expensive model.

If your business has a repetitive, time-consuming task — answering the same customer questions, triaging requests, preparing content — that's exactly the right place to start with AI.`,
      ru: `Сегодня почти каждый клиент спрашивает: «А можно добавить на сайт AI?» Мой ответ: да, но только если он решает конкретную задачу. Чат-бот, добавленный ради фразы «у нас есть AI», часто путает пользователей и снижает доверие.

Одна из самых полезных функций — умные рекомендации. Например, страница «AI подбор» в этом портфолио: клиент описывает проект своими словами, а AI подбирает подходящие услуги, похожие работы и полезные статьи. Вместо того чтобы листать десятки страниц, человек находит нужное за минуту.

Второе полезное направление — работа с текстом: сокращение длинных документов, перевод описаний товаров на несколько языков, сортировка писем поддержки. Это экономит сотрудникам часы работы.

Но важно правильно построить AI. Правило первое: модель отвечает только на основе ваших реальных данных. В «AI подборе» модель выбирает только из существующего списка услуг и проектов, а сервер проверяет каждый ответ — ничего выдуманного пользователь не увидит.

Правило второе: секретные ключи и запросы остаются на сервере. В браузере никогда не должно быть API-ключа. Правило третье: готовьтесь к ошибкам — при всплеске запросов или временной недоступности сервиса пользователь должен видеть понятное сообщение, а не пустой экран.

Важна и стоимость. Каждый запрос к AI стоит денег, поэтому я пишу короткие и точные инструкции, отправляю только нужные данные и выбираю подходящую модель. Часто хорошо написанная инструкция даёт результат лучше, чем более дорогая модель.

Если в вашем бизнесе есть повторяющаяся, отнимающая время задача — ответы на одинаковые вопросы клиентов, сортировка заявок, подготовка контента — именно с неё и стоит начать внедрение AI.`,
    },
  },
];
