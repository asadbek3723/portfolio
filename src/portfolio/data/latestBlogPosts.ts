import type { BlogPost } from '../types';

// Newest articles. Paragraphs are separated by a blank line ("\n\n").
// Supported blocks: "## " heading, "- " bullet list (every line), "~~~" fenced code (no blank lines inside).
export const latestBlogPosts: BlogPost[] = [
  {
    id: 'a8',
    slug: 'web-security-mistakes-checklist',
    date: '2026-11-04',
    readMin: 8,
    tags: ['Security', 'Web'],
    title: {
      uz: "Veb-ilovalarda eng ko'p uchraydigan 7 ta xavfsizlik xatosi va ularni tuzatish",
      en: 'The 7 most common web application security mistakes and how to fix them',
      ru: '7 самых частых ошибок безопасности веб-приложений и как их исправить',
    },
    excerpt: {
      uz: "Hujumlarning aksariyati murakkab emas: ular oddiy, takrorlanuvchi xatolardan foydalanadi. OWASP tajribasiga tayangan amaliy tekshiruv ro'yxati.",
      en: 'Most attacks are not sophisticated; they exploit simple, repeating mistakes. A practical checklist based on OWASP guidance.',
      ru: 'Большинство атак несложны: они используют простые повторяющиеся ошибки. Практический чек-лист на основе рекомендаций OWASP.',
    },
    body: {
      uz: `Xavfsizlik haqida gap ketganda ko'pchilik filmlardagi kabi murakkab hujumlarni tasavvur qiladi. Amalda esa hodisalarning katta qismi bir xil, yaxshi ma'lum xatolardan kelib chiqadi. OWASP Top 10 ro'yxati ham aynan shu tajribani jamlaydi, va uning boshida ko'p yillardan beri buzilgan kirish nazorati (Broken Access Control) turadi.

Quyida har bir loyihada tekshirishga arziydigan yetti nuqta.

## 1. Kirish nazorati faqat interfeysda

Tugmani yashirish — xavfsizlik emas. Agar server "bu foydalanuvchi shu yozuvni ko'rishga haqlimi?" deb tekshirmasa, kimdir manzildagi raqamni o'zgartirib (/orders/101 → /orders/102) begonaning ma'lumotini oladi. Har bir so'rovda ruxsat serverda tekshirilishi shart.

## 2. In'eksiyalar

Foydalanuvchi kiritgan matnni SQL so'rovga to'g'ridan-to'g'ri qo'shish eski, lekin hamon uchraydigan xato. Yechim oddiy: parametrlangan so'rovlar yoki ORM ishlating.

~~~
// Xavfli
db.query("SELECT * FROM users WHERE email = '" + email + "'")
// To'g'ri
db.query("SELECT * FROM users WHERE email = $1", [email])
~~~

## 3. Sirlar noto'g'ri joyda

API kalitlari, ma'lumotlar bazasi paroli, service-role tokenlari kod omboriga, brauzer kodiga yoki skrinshotga tushib qolmasligi kerak. Sirlarni muhit o'zgaruvchilarida saqlang, ularni davriy almashtiring va tasodifan e'lon qilingan kalitni darhol bekor qiling.

## 4. Zaif autentifikatsiya

Cheksiz parol urinishlari, qisqa parollar va ikki bosqichli tasdiqlashning yo'qligi hisob buzilishiga olib keladi. Urinishlar sonini cheklang, parolni xavfsiz algoritm bilan xeshlang va muhim hisoblar uchun MFA yoki passkey taklif qiling.

## 5. XSS: ishonchsiz matnni sahifaga chiqarish

Foydalanuvchi matni HTML sifatida talqin qilinsa, hujumchi sahifada o'z skriptini ishga tushiradi. Zamonaviy freymvorklar (React kabi) matnni avtomatik himoyalaydi, lekin dangerouslySetInnerHTML kabi yo'llar bu himoyani o'chiradi. Ishonchsiz HTML'ni faqat tozalagandan keyin chiqaring va Content-Security-Policy sarlavhasini qo'shing.

## 6. Noto'g'ri sozlamalar

Hamma manbaga ochiq CORS, ishlab chiqarishda yoqilgan debug rejimi, ochiq saqlash xonalari va standart parollar — bular kod xatosi emas, sozlama xatosi. Minimal huquq tamoyiliga amal qiling: har bir xizmat faqat kerakli narsaga kira olsin.

## 7. Eskirgan bog'liqliklar

Loyihangizdagi kutubxonalardan birida ma'lum zaiflik bo'lishi mumkin. npm audit yoki Dependabot kabi vositalarni yoqing va yangilanishlarni muntazam qo'llang.

## Qayerdan boshlash kerak

Hammasini bir kunda hal qilish shart emas. Avval 1-darajali xavflarni yoping: kirish nazorati, sirlar va autentifikatsiya. Keyin avtomatik tekshiruvlarni (bog'liqliklar, statik tahlil) CI'ga qo'shing. Xavfsizlik bir martalik loyiha emas, doimiy odat.`,
      en: `When people think of security, they imagine movie-style attacks. In practice most incidents come from the same well-known mistakes. The OWASP Top 10 captures that experience, and for years Broken Access Control has been at the top of it.

Here are seven points worth checking in every project.

## 1. Access control only in the UI

Hiding a button is not security. If the server does not check "is this user allowed to see this record?", anyone can change a number in the URL (/orders/101 → /orders/102) and read someone else's data. Authorization must be enforced on the server for every request.

## 2. Injection

Concatenating user input into a SQL query is an old mistake that still appears. The fix is simple: use parameterized queries or an ORM.

~~~
// Unsafe
db.query("SELECT * FROM users WHERE email = '" + email + "'")
// Safe
db.query("SELECT * FROM users WHERE email = $1", [email])
~~~

## 3. Secrets in the wrong place

API keys, database passwords and service-role tokens must never end up in the repository, browser code or a screenshot. Keep secrets in environment variables, rotate them periodically and revoke an exposed key immediately.

## 4. Weak authentication

Unlimited password attempts, short passwords and no second factor lead to account takeover. Rate-limit attempts, hash passwords with a modern algorithm and offer MFA or passkeys for important accounts.

## 5. XSS: rendering untrusted text

If user text is interpreted as HTML, an attacker runs their own script on your page. Modern frameworks such as React escape text automatically, but paths like dangerouslySetInnerHTML switch that protection off. Render untrusted HTML only after sanitizing it, and add a Content-Security-Policy header.

## 6. Misconfiguration

CORS open to every origin, debug mode in production, public storage buckets and default passwords are configuration mistakes, not code bugs. Follow least privilege: each service should reach only what it needs.

## 7. Outdated dependencies

One of your libraries may have a known vulnerability. Enable tools such as npm audit or Dependabot and apply updates regularly.

## Where to start

You do not have to fix everything in one day. Close the top risks first: access control, secrets and authentication. Then add automated checks (dependencies, static analysis) to CI. Security is not a one-off project, it is a habit.`,
      ru: `Говоря о безопасности, многие представляют кинематографичные атаки. На практике большинство инцидентов вызвано одними и теми же известными ошибками. Список OWASP Top 10 обобщает этот опыт, и уже несколько лет его возглавляет Broken Access Control — нарушенный контроль доступа.

Вот семь пунктов, которые стоит проверить в каждом проекте.

## 1. Контроль доступа только в интерфейсе

Скрытая кнопка — это не безопасность. Если сервер не проверяет «имеет ли этот пользователь право видеть запись?», любой может изменить число в адресе (/orders/101 → /orders/102) и прочитать чужие данные. Авторизация должна проверяться на сервере при каждом запросе.

## 2. Инъекции

Подстановка пользовательского ввода прямо в SQL-запрос — старая, но всё ещё встречающаяся ошибка. Решение простое: параметризованные запросы или ORM.

~~~
// Небезопасно
db.query("SELECT * FROM users WHERE email = '" + email + "'")
// Безопасно
db.query("SELECT * FROM users WHERE email = $1", [email])
~~~

## 3. Секреты не на своём месте

API-ключи, пароли баз данных и service-role токены не должны попадать в репозиторий, браузерный код или скриншот. Храните секреты в переменных окружения, периодически меняйте их и немедленно отзывайте случайно опубликованный ключ.

## 4. Слабая аутентификация

Неограниченные попытки ввода пароля, короткие пароли и отсутствие второго фактора приводят к взлому аккаунтов. Ограничивайте число попыток, хешируйте пароли современным алгоритмом и предлагайте MFA или passkey для важных аккаунтов.

## 5. XSS: вывод недоверенного текста

Если пользовательский текст интерпретируется как HTML, атакующий запускает свой скрипт на вашей странице. Современные фреймворки вроде React экранируют текст автоматически, но такие пути, как dangerouslySetInnerHTML, отключают эту защиту. Выводите недоверенный HTML только после очистки и добавьте заголовок Content-Security-Policy.

## 6. Ошибки конфигурации

CORS, открытый для всех источников, режим отладки в продакшене, публичные хранилища и пароли по умолчанию — это не ошибки кода, а ошибки настройки. Следуйте принципу минимальных привилегий: каждый сервис должен иметь доступ только к необходимому.

## 7. Устаревшие зависимости

В одной из ваших библиотек может быть известная уязвимость. Включите инструменты вроде npm audit или Dependabot и регулярно применяйте обновления.

## С чего начать

Исправлять всё за один день не нужно. Сначала закройте главные риски: контроль доступа, секреты и аутентификацию. Затем добавьте автоматические проверки (зависимости, статический анализ) в CI. Безопасность — не разовый проект, а привычка.`,
    },
  },
  {
    id: 'a7',
    slug: 'modular-monolith-first',
    date: '2026-11-02',
    readMin: 7,
    tags: ['Architecture', 'Startup'],
    title: {
      uz: "Avval monolit: startap uchun arxitektura qarorlari",
      en: 'Monolith first: architecture decisions for an early-stage product',
      ru: 'Сначала монолит: архитектурные решения для раннего продукта',
    },
    excerpt: {
      uz: "Mikroservislar — kuchli vosita, lekin ko'pincha erta. Modulli monolit nima, u nega tezroq natija beradi va qachon bo'laklarga ajratish vaqti keladi.",
      en: 'Microservices are powerful but usually premature. What a modular monolith is, why it ships faster and when it is time to split.',
      ru: 'Микросервисы — мощный инструмент, но чаще всего преждевременный. Что такое модульный монолит, почему он даёт результат быстрее и когда пора делить.',
    },
    body: {
      uz: `Yangi mahsulot boshlanayotganda jamoa ko'pincha eng "zamonaviy" arxitekturani tanlashga intiladi: mikroservislar, xabarlar navbati, alohida ma'lumotlar bazalari. Ammo mahsulot hali o'z foydalanuvchisini topmagan bosqichda eng qimmat narsa — bu tezlik va o'zgarishga tayyorlik.

## Mikroservislar nimani qimmatlashtiradi

Har bir qo'shimcha xizmat yangi muammolar olib keladi: tarmoq xatolari, versiyalar mosligi, taqsimlangan tranzaksiyalar, alohida deploy va monitoring. Bu narxni katta jamoalar va aniq masshtab ehtiyoji bor kompaniyalar to'laydi va oqlaydi. Kichik jamoada esa u ko'pincha mahsulot ishlab chiqarish vaqtini yeb qo'yadi.

## Modulli monolit nima

Bu bitta deploy qilinadigan ilova, lekin ichida aniq chegaralangan modullar: masalan, buyurtmalar, to'lovlar, foydalanuvchilar. Har modulning o'z mas'uliyati bor va boshqa modullar bilan faqat belgilangan interfeys orqali gaplashadi. Natija: kod tartibli, o'zgarishlar tez, deploy esa bitta.

~~~
src/
  modules/
    orders/      # biznes qoidalari, ma'lumotlarga kirish
    payments/
    users/
  shared/        # umumiy yordamchilar
~~~

Asosiy qoida: modul boshqa modulning ichki jadvallariga to'g'ridan-to'g'ri murojaat qilmaydi. Shu intizom bo'lsa, keyin modulni alohida xizmatga ajratish ancha oson bo'ladi.

## Nimaga e'tibor berish kerak

- Ma'lumotlar bazasi sxemasini o'ylab loyihalang: indekslar, aniq bog'lanishlar va migratsiyalar. Ko'p muammo kodda emas, sxemada yashiringan.
- Kuzatuvchanlikni boshidan qo'shing: tuzilgan loglar, xatolar monitoringi va asosiy ko'rsatkichlar.
- Og'ir ishlarni (email, hisobot) navbatga chiqaring, lekin buning uchun alohida infratuzilma shart emas, bazadagi oddiy navbat ham boshlanishiga yetadi.
- Avtomatik testlar va CI: arxitektura qanchalik oddiy bo'lmasin, ishonchli o'zgarish uchun ular kerak.

## Qachon ajratish kerak

Bo'laklarga ajratish uchun aniq sabab bo'lsin: bitta modul boshqalardan ancha ko'proq resurs talab qilsa, turli jamoalar bir-biriga halaqit bersa yoki modul boshqa texnologiyani talab qilsa. "Hamma shunday qiladi" sabab emas.

## Xulosa

Yaxshi arxitektura — eng murakkab emas, balki o'zgarishga eng tayyor arxitektura. Oddiy boshlang, chegaralarni toza saqlang va masshtab ehtiyoji haqiqatan paydo bo'lganda ajrating. Shunda siz oldindan to'laydigan murakkablik narxidan qutulasiz.`,
      en: `When a new product starts, teams are tempted to choose the most "modern" architecture: microservices, message queues, separate databases. But at the stage where the product has not found its users yet, the most expensive thing is lost speed and the inability to change course.

## What microservices make expensive

Every extra service brings new problems: network failures, version compatibility, distributed transactions, separate deploys and monitoring. Large teams with a clear scaling need pay that price and it pays off. For a small team it often eats the time needed to build the product.

## What a modular monolith is

It is one deployable application with clearly bounded modules inside: for example orders, payments, users. Each module has its own responsibility and talks to others only through a defined interface. The result: tidy code, fast changes and a single deploy.

~~~
src/
  modules/
    orders/      # business rules, data access
    payments/
    users/
  shared/        # common helpers
~~~

The key rule: a module never reaches into another module's internal tables directly. With that discipline, extracting a module into its own service later becomes much easier.

## What to get right early

- Design the database schema carefully: indexes, clear relations and migrations. Many problems hide in the schema, not the code.
- Add observability from the start: structured logs, error monitoring and key metrics.
- Move heavy work (email, reports) into a queue, but you do not need separate infrastructure for it; a simple database-backed queue is enough to begin with.
- Automated tests and CI: however simple the architecture, you need them for confident change.

## When to split

There should be a concrete reason: one module needs far more resources than the rest, different teams block each other, or a module needs a different technology. "Everyone does it" is not a reason.

## Bottom line

A good architecture is not the most complex one, it is the one most ready for change. Start simple, keep boundaries clean and split when a scaling need really appears. That way you avoid paying the price of complexity in advance.`,
      ru: `Когда начинается новый продукт, команда часто тянется к самой «современной» архитектуре: микросервисы, очереди сообщений, отдельные базы данных. Но на этапе, когда продукт ещё не нашёл своих пользователей, дороже всего обходятся потерянная скорость и невозможность быстро сменить курс.

## Что удорожают микросервисы

Каждый дополнительный сервис приносит новые проблемы: сетевые сбои, совместимость версий, распределённые транзакции, отдельные деплои и мониторинг. Крупные команды с явной потребностью в масштабе платят эту цену и она окупается. Для небольшой команды она часто съедает время, нужное для создания продукта.

## Что такое модульный монолит

Это одно развёртываемое приложение с чётко ограниченными модулями внутри: например, заказы, платежи, пользователи. У каждого модуля своя ответственность, и с другими он общается только через определённый интерфейс. Результат: аккуратный код, быстрые изменения и один деплой.

~~~
src/
  modules/
    orders/      # бизнес-правила, доступ к данным
    payments/
    users/
  shared/        # общие помощники
~~~

Главное правило: модуль не обращается напрямую к внутренним таблицам другого модуля. При такой дисциплине позже выделить модуль в отдельный сервис будет гораздо проще.

## О чём позаботиться рано

- Продумайте схему базы данных: индексы, чёткие связи и миграции. Многие проблемы скрыты в схеме, а не в коде.
- Добавьте наблюдаемость с самого начала: структурированные логи, мониторинг ошибок и ключевые метрики.
- Тяжёлую работу (письма, отчёты) выносите в очередь, но отдельная инфраструктура для этого не нужна: для старта хватит простой очереди на базе БД.
- Автотесты и CI: какой бы простой ни была архитектура, они нужны для уверенных изменений.

## Когда делить

Должна быть конкретная причина: один модуль требует намного больше ресурсов, чем остальные, разные команды мешают друг другу или модулю нужна другая технология. «Так делают все» — не причина.

## Итог

Хорошая архитектура — не самая сложная, а самая готовая к изменениям. Начинайте просто, держите границы чистыми и делите, когда потребность в масштабе действительно появится. Так вы не заплатите за сложность заранее.`,
    },
  },
  {
    id: 'a6',
    slug: 'supabase-row-level-security',
    date: '2026-10-30',
    readMin: 8,
    tags: ['Supabase', 'Security'],
    title: {
      uz: "Supabase'da Row Level Security: ma'lumotlarni to'g'ri himoyalash",
      en: 'Row Level Security in Supabase: protecting your data the right way',
      ru: 'Row Level Security в Supabase: как правильно защищать данные',
    },
    excerpt: {
      uz: "Supabase kaliti brauzerda ochiq turadi va bu normal. Xavfsizlikni aslida RLS ta'minlaydi. Siyosatlarni qanday yozish va qaysi xatolardan qochish kerak.",
      en: "A Supabase key sits in the browser and that is normal. RLS is what actually keeps data safe. How to write policies and which mistakes to avoid.",
      ru: 'Ключ Supabase лежит в браузере, и это нормально. Данные на деле защищает RLS. Как писать политики и каких ошибок избегать.',
    },
    body: {
      uz: `Supabase bilan ishlaganda ko'pchilik birinchi marta bir narsadan cho'chiydi: ma'lumotlar bazasiga murojaat qiladigan kalit brauzer kodida ko'rinib turadi. Bu xato emas, shunday mo'ljallangan. Savol shu: u holda bazani kim himoya qiladi?

Javob: Row Level Security (RLS) — PostgreSQL'ning yozuv darajasidagi himoyasi. Kalit faqat "kim so'rayapti"ni aniqlaydi, nimaga ruxsat borligini esa siyosatlar hal qiladi.

## Asosiy tamoyil

Publishable (anon) kalit ochiq bo'lishi mumkin, chunki RLS yoqilgan jadvalda siyosat ruxsat bermagan hech narsa ishlamaydi. Aksincha, service_role kaliti RLS'ni chetlab o'tadi, shuning uchun u hech qachon brauzerga, ochiq omborga yoki mijoz kodiga tushmasligi kerak. Uni faqat serverda ishlating.

## Oddiy misol: shaxsiy yozuvlar

Faraz qiling, har bir foydalanuvchi faqat o'z topshiriqlarini ko'rishi va o'zgartirishi kerak.

~~~
alter table public.todos enable row level security;

create policy "Own todos: read" on public.todos
  for select to authenticated
  using (auth.uid() = user_id);

create policy "Own todos: write" on public.todos
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
~~~

Bu yerda using — mavjud qatorlarni ko'rish/o'zgartirish sharti, with check esa yangi yoki o'zgargan qator qoidaga mos kelishini tekshiradi. Ikkalasini ham yozish insert va update orqali boshqa odamning nomiga yozuv yaratishning oldini oladi.

## Rollar: admin misoli

Admin huquqini jadvaldan o'qib tekshirish yaxshi usul. Buning uchun xavfsiz yordamchi funksiya yoziladi va siyosatlarda ishlatiladi.

~~~
create function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer
set search_path = public
as $$ select exists (
  select 1 from public.user_roles
  where user_id = _user_id and role = _role) $$;
~~~

Muhim detal: rolni foydalanuvchi o'zi o'zgartira oladigan joyda (masalan, tahrirlanadigan profil maydonida) saqlamang. Rollar faqat serverdan yoki admin tomonidan boshqarilsin.

## Eng ko'p uchraydigan xatolar

- Jadval yaratib, RLS'ni yoqishni unutish. Bunda jadval ruxsat berilgan rollar uchun to'liq ochiq bo'lishi mumkin.
- Siyosatni juda keng yozish, masalan using (true), va uni vaqtinchalik deb unutish.
- View'lar va security definer funksiyalarni e'tiborsiz qoldirish: ular egasining huquqi bilan ishlab, RLS'ni chetlab o'tishi mumkin.
- Storage bucket'lar uchun siyosat yozishni unutish, chunki fayllarning ham o'z qoidalari bor.

## Sinab ko'rish

Siyosatni yozish bilan ish tugamaydi. Uni anonim, oddiy foydalanuvchi va admin sifatida alohida sinang: har bir rol nimani o'qiy oladi, nimani yoza oladi? Eng yaxshi usul — bu tekshiruvlarni avtomatik testga aylantirish.

## Xulosa

Supabase'da xavfsizlik kalitni yashirishda emas, to'g'ri siyosatlarda. Har bir jadvalda RLS yoqing, minimal huquq bering, service_role'ni serverda saqlang va har bir rolni sinab ko'ring.`,
      en: `The first time people work with Supabase, one thing makes them nervous: the key used to reach the database is visible in browser code. That is not a bug, it is by design. So the question is: who protects the database?

The answer: Row Level Security (RLS), PostgreSQL's row-level protection. The key only identifies who is asking; policies decide what they may do.

## The core principle

The publishable (anon) key can be public because on a table with RLS enabled, anything a policy does not allow simply does not work. By contrast, the service_role key bypasses RLS, so it must never reach the browser, a public repository or client code. Use it on the server only.

## A simple example: personal records

Say each user should see and change only their own todos.

~~~
alter table public.todos enable row level security;

create policy "Own todos: read" on public.todos
  for select to authenticated
  using (auth.uid() = user_id);

create policy "Own todos: write" on public.todos
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
~~~

Here using is the condition for viewing or changing existing rows, while with check verifies that a new or updated row matches the rule. Writing both prevents someone from inserting or updating a row in another person's name.

## Roles: an admin example

A good way to handle admin rights is to read them from a table. For that, write a safe helper function and use it in policies.

~~~
create function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer
set search_path = public
as $$ select exists (
  select 1 from public.user_roles
  where user_id = _user_id and role = _role) $$;
~~~

An important detail: never store the role somewhere the user can edit it themselves, such as an editable profile field. Roles should be managed only from the server or by an admin.

## The most common mistakes

- Creating a table and forgetting to enable RLS. The table may then be fully open to the roles that have grants.
- Writing a policy too broadly, such as using (true), and forgetting it was temporary.
- Ignoring views and security definer functions: they run with the owner's rights and can bypass RLS.
- Forgetting policies for Storage buckets; files have their own rules too.

## Testing

Writing a policy is not the end. Test it separately as anonymous, as a regular user and as an admin: what can each role read and write? The best approach is to turn those checks into automated tests.

## Bottom line

In Supabase, security is not about hiding the key, it is about correct policies. Enable RLS on every table, grant minimal rights, keep service_role on the server and test every role.`,
      ru: `Когда человек впервые работает с Supabase, его настораживает одно: ключ для обращения к базе данных виден в браузерном коде. Это не ошибка, так задумано. Вопрос в другом: кто тогда защищает базу?

Ответ: Row Level Security (RLS) — защита PostgreSQL на уровне строк. Ключ лишь определяет, кто запрашивает, а что разрешено, решают политики.

## Основной принцип

Publishable (anon) ключ может быть публичным, потому что в таблице с включённым RLS не работает всё, что не разрешено политикой. А вот ключ service_role обходит RLS, поэтому он ни в коем случае не должен попасть в браузер, публичный репозиторий или клиентский код. Используйте его только на сервере.

## Простой пример: личные записи

Допустим, каждый пользователь должен видеть и менять только свои задачи.

~~~
alter table public.todos enable row level security;

create policy "Own todos: read" on public.todos
  for select to authenticated
  using (auth.uid() = user_id);

create policy "Own todos: write" on public.todos
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
~~~

Здесь using — условие для просмотра или изменения существующих строк, а with check проверяет, что новая или изменённая строка соответствует правилу. Если указать оба, нельзя вставить или обновить строку от имени другого человека.

## Роли: пример с админом

Хороший способ — хранить права администратора в таблице. Для этого пишется безопасная вспомогательная функция, которая используется в политиках.

~~~
create function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer
set search_path = public
as $$ select exists (
  select 1 from public.user_roles
  where user_id = _user_id and role = _role) $$;
~~~

Важная деталь: не храните роль там, где пользователь может сам её изменить, например в редактируемом поле профиля. Роли должны управляться только с сервера или администратором.

## Самые частые ошибки

- Создать таблицу и забыть включить RLS. Тогда таблица может быть полностью открыта для ролей, у которых есть права.
- Написать политику слишком широко, например using (true), и забыть, что она была временной.
- Не учесть представления и функции security definer: они работают с правами владельца и могут обойти RLS.
- Забыть про политики для Storage: у файлов тоже свои правила.

## Проверка

Написать политику — ещё не всё. Проверьте её отдельно как аноним, обычный пользователь и админ: что может читать и записывать каждая роль? Лучше всего превратить эти проверки в автоматические тесты.

## Итог

В Supabase безопасность — не в сокрытии ключа, а в правильных политиках. Включайте RLS на каждой таблице, выдавайте минимальные права, держите service_role на сервере и проверяйте каждую роль.`,
    },
  },
  {
    id: 'a5',
    slug: 'coding-with-ai-assistants',
    date: '2026-10-27',
    readMin: 7,
    tags: ['AI', 'Engineering'],
    title: {
      uz: "AI bilan dasturlash: tezlik va sifat o'rtasidagi muvozanat",
      en: 'Coding with AI: balancing speed and quality',
      ru: 'Программирование с ИИ: баланс скорости и качества',
    },
    excerpt: {
      uz: "AI kod yozishni tezlashtiradi, lekin mas'uliyatni olib tashlamaydi. Jamoada ishlaydigan, tekshiriladigan va xavfsiz jarayon qanday quriladi.",
      en: 'AI speeds up writing code but does not remove responsibility. How to build a process that is reviewable, safe and works for a team.',
      ru: 'ИИ ускоряет написание кода, но не снимает ответственность. Как построить процесс, который можно проверять, безопасный и работающий в команде.',
    },
    body: {
      uz: `AI yordamchilari dasturchining kundalik ishiga kirib keldi: ular funksiya yozadi, xatoni tushuntiradi, testlar taklif qiladi. Tezlik haqiqatan oshadi. Lekin tezlik tekshirilmagan kod bilan birga kelsa, u tezroq texnik qarzga aylanadi.

Asosiy fikr: AI muallif emas, juda tez ishlaydigan stajyor. Uning ishini kim qabul qilsa, mas'uliyat o'sha odamda qoladi.

## AI qayerda foyda beradi

- Standart kod, konfiguratsiya va bir formatdan boshqasiga o'tkazish.
- Test qoralamalari va chekka holatlar ro'yxati.
- Noma'lum kutubxona yoki xato xabarini tushuntirish.
- Kodni o'qib, qisqa xulosa va refaktoring variantlarini taklif qilish.

## Qayerda ehtiyot bo'lish kerak

AI sizning biznes qoidalaringizni bilmaydi va ba'zan mavjud bo'lmagan API'ni ishonch bilan taklif qiladi. Xavfsizlik, ruxsatlar, to'lovlar va ma'lumotlarni o'chirish kabi joylarda "ishlayotgandek ko'rinadi" yetarli emas.

## Ishchi jarayon

Birinchi qadam — vazifani aniq qo'yish. Texnologiya, kutilgan xatti-harakat, cheklovlar va mavjud kod uslubini yozing. Noaniq so'rov noaniq natija beradi.

Ikkinchi qadam — kichik qismlarda ishlash. Bitta funksiya yoki bitta komponent so'rang. Kichik o'zgarishni ko'rib chiqish oson, katta blokdagi nozik xatoni topish deyarli imkonsiz.

Uchinchi qadam — tekshirish. Kodni o'qing, ishga tushiring va testlar bilan sinang. Eng yaxshi odat: avval test, keyin yechim.

~~~
1. Vazifa va cheklovlarni yozish
2. AI'dan kichik o'zgarish so'rash
3. Kodni o'qish va tushunish
4. Testlarni ishga tushirish
5. Code review va commit
~~~

To'rtinchi qadam — odam tomonidan ko'rib chiqish. AI yozgan kod ham oddiy code review'dan o'tishi kerak. "AI yozgan" degan izoh tekshiruvni bekor qilmaydi.

## Xavfsizlik va maxfiylik

So'rovlarga API kalitlari, parollar, shaxsiy ma'lumotlar va mijozning maxfiy kodini qo'shmang. Kompaniya ichida qaysi vositalar ruxsat etilgani va qanday ma'lumot yuborilishi mumkinligi haqida aniq qoida bo'lishi kerak. Litsenziya masalasini ham unutmang: yaratilgan kod tarqatiladigan loyihada qanday ishlatilishini tekshiring.

## Yangi boshlovchilar uchun

AI asoslarni o'rganishni almashtirmaydi. Avval o'zingiz yozib ko'ring, keyin natijani AI bilan solishtiring va "nega bunday?" deb so'rang. Shunda AI o'qituvchiga aylanadi va bilim tezroq o'sadi.

## Xulosa

Kelajakda ustunlik AI'ni rad qilganda ham, unga ko'r-ko'rona ishonganda ham emas. U muammoni aniq qo'ya oladigan, natijani tanqidiy baholaydigan va sifat jarayonini saqlaydigan mutaxassisga tegadi.`,
      en: `AI assistants have entered a developer's daily work: they write functions, explain errors and suggest tests. Speed really does go up. But if speed arrives with unchecked code, it turns into technical debt faster.

The core idea: AI is not the author, it is a very fast intern. Whoever accepts its work keeps the responsibility.

## Where AI helps

- Boilerplate, configuration and converting between formats.
- Test drafts and lists of edge cases.
- Explaining an unfamiliar library or an error message.
- Reading code and proposing a short summary and refactoring options.

## Where to be careful

AI does not know your business rules and sometimes confidently suggests an API that does not exist. For security, permissions, payments and data deletion, "it seems to work" is not enough.

## A working process

Step one is to state the task clearly. Include the technology, the expected behavior, constraints and the existing code style. A vague request gives a vague result.

Step two is to work in small pieces. Ask for one function or one component. A small change is easy to review; a subtle bug inside a large block is nearly impossible to find.

Step three is to verify. Read the code, run it and test it. The best habit is test first, solution second.

~~~
1. Write the task and constraints
2. Ask AI for a small change
3. Read and understand the code
4. Run the tests
5. Code review and commit
~~~

Step four is human review. AI-written code must go through normal code review. A note saying "written by AI" does not cancel the check.

## Security and privacy

Keep API keys, passwords, personal data and a client's confidential code out of prompts. A company needs a clear rule on which tools are allowed and what data may be sent. Do not forget licensing either: check how generated code may be used in a project you distribute.

## For newcomers

AI does not replace learning the fundamentals. Write it yourself first, then compare with AI and ask "why this way?". That turns AI into a teacher and your knowledge grows faster.

## Bottom line

The advantage will not go to those who reject AI, nor to those who trust it blindly. It goes to the engineer who frames problems precisely, evaluates results critically and keeps the quality process intact.`,
      ru: `ИИ-ассистенты вошли в ежедневную работу разработчика: они пишут функции, объясняют ошибки, предлагают тесты. Скорость действительно растёт. Но если вместе со скоростью приходит непроверенный код, он быстрее превращается в технический долг.

Главная мысль: ИИ — не автор, а очень быстрый стажёр. Кто принимает его работу, тот и несёт ответственность.

## Где ИИ полезен

- Шаблонный код, конфигурация и перевод из одного формата в другой.
- Черновики тестов и списки крайних случаев.
- Объяснение незнакомой библиотеки или сообщения об ошибке.
- Чтение кода, краткое резюме и варианты рефакторинга.

## Где нужна осторожность

ИИ не знает ваших бизнес-правил и иногда уверенно предлагает несуществующий API. Для безопасности, прав доступа, платежей и удаления данных «вроде работает» недостаточно.

## Рабочий процесс

Шаг первый — чётко поставить задачу. Укажите технологию, ожидаемое поведение, ограничения и стиль существующего кода. Расплывчатый запрос даёт расплывчатый результат.

Шаг второй — работать небольшими частями. Просите одну функцию или один компонент. Небольшое изменение легко проверить, а тонкую ошибку в большом блоке найти почти невозможно.

Шаг третий — проверка. Прочитайте код, запустите и проверьте тестами. Лучшая привычка: сначала тест, потом решение.

~~~
1. Описать задачу и ограничения
2. Попросить ИИ о небольшом изменении
3. Прочитать и понять код
4. Запустить тесты
5. Code review и коммит
~~~

Шаг четвёртый — ревью человеком. Код, написанный ИИ, должен проходить обычное code review. Пометка «написано ИИ» не отменяет проверку.

## Безопасность и конфиденциальность

Не помещайте в запросы API-ключи, пароли, персональные данные и конфиденциальный код клиента. В компании должно быть чёткое правило, какие инструменты разрешены и какие данные можно отправлять. Не забывайте и о лицензиях: проверьте, как сгенерированный код можно использовать в распространяемом проекте.

## Для начинающих

ИИ не заменяет изучение основ. Сначала напишите сами, затем сравните с ИИ и спросите «почему так?». Так ИИ становится учителем, а знания растут быстрее.

## Итог

Преимущество получат не те, кто отвергает ИИ, и не те, кто слепо ему доверяет, а инженер, который точно ставит задачи, критически оценивает результат и сохраняет процесс качества.`,
    },
  },
];
