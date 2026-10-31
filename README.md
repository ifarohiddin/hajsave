# 🕌 Umra&Haj - Online Yo'llanma Platformasi

**Versiya:** 1.0  
**Buyurtmachi:** Abduraxmonov Javoxir  
**Ishlab chiqaruvchi:** Team  
**Sana:** 01.11.2025

---

## 📋 Loyiha Haqida

Ushbu loyiha foydalanuvchilarga barcha umra va haj uchun yo'llanmalar, mehmonxonalar, ellikboshi va yuzboshilarni o'zlarining telefonlari orqali belgilash imkonini beradi.

### Maqsad
- Foydalanuvchilar uchun qulaylik yaratish
- Tur agentliklar uchun raqobatni kuchaytirish
- Shaffof narxlar va onlayn buyurtma imkoniyati

---

## ✨ Asosiy Xususiyatlar

### Foydalanuvchi uchun
- ✅ Ro'yxatdan o'tish va tizimga kirish
- ✅ Barcha yo'llanmalarni ko'rish va taqqoslash
- ✅ Online buyurtma berish
- ✅ Ellikboshi/Yuzboshi tanlash
- ✅ Elektron yoki qog'oz yo'llanma
- ✅ Shaxsiy hisob raqam

### Platforma
- ✅ 50+ ishonchli tur agentlik
- ✅ 200+ turli yo'llanma paketi
- ✅ 100+ tajribali ellikboshi
- ✅ Real-time narxlar
- ✅ 24/7 ishlash

---

## 📁 Sahifalar

### 1. 🏠 Bosh sahifa
- Hero section - platformaning tavsifi
- Statistika - foydalanuvchilar, agentliklar, buyurtmalar
- Xususiyatlar - platformaning afzalliklari
- Qanday ishlaydi - 4 qadamli yo'riqnoma

### 2. 🏢 Tur Agentliklar
- Barcha agentliklar ro'yxati
- Qidiruv va filtrlash
- Agentlik kartasi: reyting, mijozlar soni, narxlar
- Yo'llanmalarni ko'rish tugmasi

### 3. ✈️ Yo'llanmalar Jadvali
- Barcha paketlar jadvali
- Filtrlash: turi, narx, muddat, mehmonxona
- Desktop uchun jadval, mobil uchun kartalar
- Online buyurtma tugmasi

### 4. 👥 Ellikboshilar va Yuzboshilar
- Tajribali rahbarlar ro'yxati
- Safar soni, reyting, tillar
- Qisqacha biografiya
- Bog'lanish tugmasi

### 5. 🎒 Kerakli Buyumlar
- Kategoriyalar: Kiyimlar, Dori, Diniy, Boshqa
- Majburiy va tavsiya etiladigan buyumlar
- Narxlar ko'rsatkichi
- PDF yuklab olish

### 6. 📋 Online Buyurtma
- Shaxsiy ma'lumotlar formasi (passport `AA1234567` formatida tekshiriladi)
- Yo'llanma turi va agentlikka qarab paketlar ro'yxati
- "Yo'llanmalar" jadvalidagi **Buyurtma** tugmasi paketni oldindan tanlaydi
- Ellikboshi va yo'llanma shakli (elektron/qog'oz)
- Narx va muddat bilan jonli buyurtma xulosasi

### 7. 👤 Hisob Raqam
- Profil ma'lumotlari
- Buyurtmalar tarixi (holati bilan), buyurtmani bekor qilish
- Buyurtma ma'lumotnomasini `.txt` fayl qilib yuklab olish

### 8. 🔐 Kirish/Ro'yxatdan o'tish
- Email yoki telefon bilan ro'yxatdan o'tish va kirish
- "Eslab qolish": belgilanmasa, sessiya brauzer yopilganda tugaydi
- Kabinet faqat hisobga kirganda ochiladi

---

## ⚙️ Qanday ishlaydi (demo rejimi)

Sayt hozircha **serversiz** ishlaydi: barcha ma'lumotlar foydalanuvchining brauzerida (`localStorage`) saqlanadi.

- Hisoblar, sessiya va buyurtmalar faqat shu brauzerda ko'rinadi, boshqa qurilmaga o'tmaydi.
- Parol ochiq saqlanmaydi, brauzerda SHA-256 bilan xeshlanadi. Lekin bu haqiqiy server autentifikatsiyasi o'rnini bosmaydi.
- **Haqiqiy to'lov yo'q**: buyurtma "Ko'rib chiqilmoqda" holatida saqlanadi, to'lov agentlik bilan alohida kelishiladi.
- Sahifa manzili (`#booking`, `#account`, ...) saqlanadi, shuning uchun sahifani yangilaganda shu sahifa ochiladi.

Server qismi qo'shilganda `js/store.js` dagi `Store` obyektini API chaqiruvlari bilan almashtirish kifoya: qolgan kod undan foydalanadi.

---

## 🛠️ Texnologiyalar

### Frontend (Hozirgi)
- **HTML5** - Semantik markup
- **CSS3** - Zamonaviy stillar, animatsiyalar
- **JavaScript** - Vanilla JS
- **Lucide Icons** - SVG ikon kutubxonasi
- **Google Fonts** - Inter font

### Backend (Kelajakda)
- **Python** - Django Framework
- **SQLite** → PostgreSQL
- **Nginx** - Server
- **JWT** - Autentifikatsiya

---

## 🚀 Ishga Tushirish

### Local Development

```bash
# Python server
cd hajsave
python -m http.server 8000

# Brauzerda ochish
http://localhost:8000
```

### Netlify Deploy

1. [netlify.com](https://netlify.com) ga kiring
2. "Add new site" → "Deploy manually"
3. `hajsave` papkasini drag & drop qiling
4. Tayyor!

---

## 📊 Fayl Strukturasi

```
hajsave/
├── index.html              # Barcha sahifalar (SPA)
├── css/
│   ├── style.css           # Asosiy stillar
│   └── responsive.css      # Responsive dizayn
├── js/
│   ├── store.js            # Ma'lumotlar: foydalanuvchi, sessiya, buyurtmalar (localStorage), paketlar ro'yxati
│   ├── main.js             # Sahifalar orasida o'tish (hash-routing), umumiy funksiyalar
│   ├── auth.js             # Kirish, ro'yxatdan o'tish, chiqish
│   ├── booking.js          # Buyurtma formasi va xulosa
│   └── account.js          # Shaxsiy kabinet
├── assets/
│   └── images/             # Rasmlar
│       ├── kaaba.jpg
│       ├── pattern.jpg
│       └── ...
├── netlify.toml            # Netlify config
├── _redirects              # SPA routing
├── package.json            # Metadata
└── README.md               # Hujjat
```

---

## 🎨 Dizayn Tizimi

### Ranglar
- **Primary:** `#00d4aa` - Yashil (asosiy)
- **Secondary:** `#0084ff` - Ko'k
- **Gold:** `#ffd700` - Oltin
- **Dark:** `#0a0e27` - Fon
- **Success:** `#10b981` - Muvaffaqiyat
- **Danger:** `#ef4444` - Xato

### Komponentlar
- Agency Card - Agentlik kartasi
- Package Table - Yo'llanmalar jadvali
- Guide Card - Ellikboshi kartasi
- Item Card - Buyum kartasi
- Booking Form - Buyurtma formasi

---

## 📅 Ish Reja (Timeline)

| Bosqich | Ish tavsifi | Muddat |
|---------|-------------|--------|
| 1-hafta | Loyiha tahlili va dizayn | 24.10.2025 – 30.12.2025 |
| 2-hafta | Backend logikasi (Django) | 03.01.2026 – 07.03.2026 |
| 3-hafta | Frontend integratsiya | 08.03.2026 – 15.04.2026 |
| 4-hafta | Sinov va yakunlash | 16.05.2026 – 30.05.2026 |

---

## 🎯 Yakuniy Natija

- ✅ To'liq ishlaydigan Umra&Haj online tizimi
- ✅ Admin paneli orqali boshqarish
- ✅ Texnik hujjatlar va foydalanuvchi qo'llanmasi
- ✅ Tizim sinovdan o'tgan va ishga tushishga tayyor

---

## 📱 Responsive Dizayn

- **Desktop:** > 1024px - To'liq funksionallik
- **Tablet:** 768px - 1024px - Moslashtirilgan
- **Mobile:** < 768px - Mobil kartalar

---

## 🔧 Kelajak Rejalar

### Backend Integratsiya
- [ ] Django REST API
- [ ] PostgreSQL database
- [ ] JWT autentifikatsiya
- [ ] Admin panel

### To'lov Tizimlari
- [ ] Payme integratsiya
- [ ] Click integratsiya
- [ ] Uzum Bank

### Qo'shimcha
- [ ] Mobile ilova (React Native)
- [ ] Ko'p tillilik (O'zbek, Rus, Arab)
- [ ] Email/SMS bildirishnomalar
- [ ] PDF yo'llanma generatsiya

---

## 📞 Bog'lanish

- **Telefon:** +998 90 123 45 67
- **Email:** info@umrahaj.uz
- **Telegram:** @UmraHajUz

---

## 📄 Litsenziya

© 2025 Umra&Haj. Barcha huquqlar himoyalangan.

---

**Buyurtmachi:** Abduraxmonov Javoxir  
**Ishlab chiqaruvchi:** Team  
**Versiya:** 1.0  
**Sana:** 2025-11-20
