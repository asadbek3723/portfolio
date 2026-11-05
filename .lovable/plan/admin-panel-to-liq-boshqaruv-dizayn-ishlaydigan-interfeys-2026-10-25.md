# Admin panel — to'liq boshqaruv (dizayn + ishlaydigan interfeys)

## Maqsad
`/admin` manzilida professional, har qanday ekranda (320px telefondan 2560px monitorgacha) mukammal ishlaydigan boshqaruv paneli. Saytdagi BARCHA kontent shu yerdan qo'shiladi, tahrirlanadi, o'chiriladi. Hozircha o'zgarishlar brauzerda saqlanadi va saytning o'zida darhol ko'rinadi; keyin haqiqiy bazaga ulash uchun hammasi tayyor turadi.

## Kirish
- `/admin/login` — email + parol sahifasi (hozircha namuna: bitta demo hisob, keyin haqiqiy kirishga almashtiriladi).
- Kirmagan foydalanuvchi `/admin` ga kirsa, login sahifasiga qaytariladi. Chiqish tugmasi.

## Panel tuzilishi
```text
+-----------+----------------------------------------------+
| Logo      |  Qidiruv (Ctrl+K)   Til: UZ EN RU   Profil   |
| Dashboard +----------------------------------------------+
| Kontent v |                                              |
|  Loyihalar|   Sahifa sarlavhasi       [+ Yangi] [Eksport] |
|  Xizmatlar|   Filtr / qidiruv / saralash                 |
|  Blog     |   Jadval yoki kartochkalar                   |
|  ...      |                                              |
| Media     |                                              |
| Xabarlar  |                                              |
| SEO       |                                              |
| Sozlamalar|                                              |
+-----------+----------------------------------------------+
```
- Desktop: yig'iladigan chap menyu. Planshet: ikonka menyu. Telefon: pastki navigatsiya + yon panel tugmasi; jadvallar kartochkalarga aylanadi.
- Sayt dizayni bilan uyg'un qorong'i uslub (lime aksent), qo'shimcha och rejim almashtirgichi.

## Bo'limlar
1. **Dashboard** — tashriflar, xabarlar, eng ko'p ko'rilgan sahifalar, AI tanlov so'rovlari grafiklari (namuna ma'lumot), oxirgi o'zgarishlar ro'yxati, tezkor tugmalar.
2. **Kontent boshqaruvi** (har biri: ro'yxat, qidiruv, filtr, qo'shish, tahrir, nusxa olish, o'chirish, ko'p tanlab o'chirish, tartibni sudrab o'zgartirish, qoralama/chop etilgan holati):
   - Profil (ism, kasb, bio, aloqa, ijtimoiy tarmoqlar, CV fayli, "ishga tayyor" holati)
   - Loyihalar (batafsil sahifa, raqamlar, texnologiyalar, galereya)
   - Xizmatlar (narx paketlari, jarayon, savollar)
   - Blog maqolalari (paragraf muharriri, teglar, o'qish vaqti avtomatik)
   - Ko'nikmalar, Sertifikatlar, Yutuqlar, Tadbirlar, Galereya, Fikrlar, Savollar (FAQ), Tajriba tarixi, Asboblar (Uses)
3. **Media kutubxonasi** — rasm yuklash (sudrab tashlash), ko'rish, qidirish, nusxa havola, o'chirish; tahrir oynalarida rasm tanlash shu yerdan.
4. **Xabarlar qutisi** — kontakt formadan kelgan xabarlar: o'qilgan/o'qilmagan, yulduzcha, arxiv, o'chirish, email orqali javob.
5. **SEO** — har sahifa va har element uchun ulashish sarlavhasi, tavsif, rasm; Google va Telegram ko'rinishi oldindan ko'rsatiladi.
6. **Sozlamalar** — sayt nomi, menyudagi bo'limlarni yoqish/o'chirish va tartiblash, standart til, ma'lumotni zaxira faylga yuklab olish / fayldan tiklash, hammasini asl holiga qaytarish.

## AI tarjima tugmasi
- Har bir tahrir oynasida va har bir matn maydoni yonida "AI tarjima" tugmasi.
- Istalgan tilda yozasiz (til avtomatik aniqlanadi), tugma bosilganda butun element o'zbek, ingliz va rus tillariga qayta yoziladi — mavjud tarjimalar ham yangilanadi.
- Natija maydonlarga joylanadi, saqlashdan oldin ko'rib, tahrirlashingiz mumkin. "Bekor qilish" tugmasi oldingi holatni qaytaradi.
- Ro'yxatda bir nechta elementni tanlab, ommaviy tarjima qilish ham mumkin.

## Qo'shimcha professional imkoniyatlar
- Ctrl+K buyruqlar paneli (istalgan element yoki bo'limga tez o'tish)
- Saqlanmagan o'zgarishlar haqida ogohlantirish, avtomatik qoralama saqlash
- O'chirishdan oldin tasdiqlash va 5 soniya ichida "Qaytarish"
- O'zgarishlar tarixi (kim, qachon, nima)
- Tahrir paytida sayt ko'rinishini yonma-yon oldindan ko'rish
- Har bir elementda tarjima to'liqligi belgisi (UZ / EN / RU qaysi biri bo'sh)
- Klaviatura bilan to'liq boshqarish, ekran o'quvchilar uchun moslik

## Tekshiruv
320, 375, 768, 1024, 1440, 2560px kengliklarda har bo'lim brauzerda ochib tekshiriladi: qo'shish, tahrir, o'chirish, AI tarjima, saytda darhol ko'rinishi.

## Texnik tafsilotlar
- Marshrutlar: `src/routes/admin/login.tsx`, `src/routes/admin/route.tsx` (layout, `ssr: false`, kirish tekshiruvi), `admin/index.tsx`, `admin/$collection/index.tsx`, `admin/$collection/$id.tsx`, `admin/media.tsx`, `admin/messages.tsx`, `admin/seo.tsx`, `admin/settings.tsx`. Admin sahifalarida sayt Navbar/Footer yashiriladi; `noindex`.
- Ma'lumot qatlami: `src/admin/data/repository.ts` interfeysi (`list/get/create/update/remove/reorder`) + `localRepository` (localStorage, boshlang'ich qiymat `portfolioData`dan). Sayt sahifalari ham shu manbadan o'qiydi (`useContent` hook), shuning uchun tahrir darhol saytda ko'rinadi. Keyin `supabaseRepository` bilan almashtiriladi; jadval sxemasi `src/admin/data/schema.sql` sifatida tayyorlab qo'yiladi (ulanmaydi).
- Kolleksiya konfiguratsiyasi: `src/admin/collections.ts` — har bir tur uchun maydonlar ro'yxati (matn, `Localized` matn, raqam, rasm, ro'yxat, ichki obyekt). Yagona umumiy forma generatori va jadval generatori shu konfiguratsiyadan ishlaydi.
- Forma: react-hook-form + zod; UI: shadcn (sidebar, table, dialog, sheet, command, tabs, sonner), grafiklar recharts; tartiblash @dnd-kit.
- Kirish: `src/admin/auth.ts` interfeysi, hozir demo hisob sessionStorage'da; keyin haqiqiy kirishga almashtiriladi. Bu xavfsiz emas — faqat namuna ekanligi kodda va panelda ko'rsatiladi.
- AI tarjima: `src/lib/translate.server.ts` (AI Gateway, mavjud match.server.ts uslubida, strukturali JSON chiqish, uch tilda) + `translate.functions.ts` createServerFn; 429/402 xatolari foydalanuvchiga tushunarli xabar bilan.
- Media: hozircha rasmlar brauzerda saqlanadi (hajm cheklovi ko'rsatiladi), keyin fayl saqlash xizmatiga o'tadi.
- AGENTS.md ga admin ma'lumot qatlami qoidasi qo'shiladi.
