# 🚀 Netlify Deploy Qo'llanmasi

## 3 ta Oson Usul

---

## 🌐 1-USUL: Drag & Drop (Eng Oson)

### Bosqichlar:

1. **Netlify.com ga kiring**
   - Brauzerda [https://netlify.com](https://netlify.com) ni oching
   - "Sign up" yoki "Log in" qiling (GitHub/Email orqali)

2. **Sayt qo'shish**
   - "Add new site" tugmasini bosing
   - "Deploy manually" ni tanlang

3. **Papkani yuklash**
   - `hajsave` papkasini drag & drop qiling
   - Yoki "Browse to upload" orqali tanlang

4. **Kutish**
   - 30-60 soniya kutamiz
   - Deploying... → Published! ✅

5. **Tayyor!**
   - Sizning URL: `https://random-name-123.netlify.app`
   - Site settings → Change site name orqali nomni o'zgartiring

---

## 💻 2-USUL: Netlify CLI (Advanced)

### 1. CLI o'rnatish:

```bash
npm install -g netlify-cli
```

### 2. Login qilish:

```bash
netlify login
```

Brauzerda avtorizatsiya oynasi ochiladi → "Authorize" ni bosing

### 3. Deploy qilish:

```bash
cd hajsave
netlify deploy
```

Savollar:
- "Create & configure a new site" → Yes
- "Team" → O'z teamingizni tanlang
- "Site name" → Nom kiriting (masalan: hajsave-app)
- "Publish directory" → `.` (nuqta) yozing

### 4. Test deploy ko'rish:

Deploy muvaffaqiyatli bo'lsa, draft URL beriladi:
```
https://draft-hajsave-app.netlify.app
```

Test qiling va agar hammasi to'g'ri bo'lsa...

### 5. Production deploy:

```bash
netlify deploy --prod
```

Tayyor! Saytingiz jonli:
```
https://hajsave-app.netlify.app
```

---

## 🔗 3-USUL: Git orqali (Auto Deploy)

### 1. GitHub'ga yuklash:

```bash
# Hajsave papkasiga boring
cd hajsave

# Git boshlash
git init

# Barcha fayllarni qo'shish
git add .

# Commit
git commit -m "Initial commit: HajSave v2.0 - Netlify Ready"

# GitHub repository yarating (GitHub.com da)
# Keyin remote qo'shing:
git remote add origin https://github.com/username/hajsave.git

# Push qiling
git branch -M main
git push -u origin main
```

### 2. Netlify'da GitHub bog'lash:

1. Netlify dashboard → "Add new site" → "Import from Git"
2. "GitHub" ni tanlang
3. Repository'ni tanlang (hajsave)
4. Build settings:
   - **Build command:** `echo 'No build required'`
   - **Publish directory:** `.`
5. "Deploy site" tugmasini bosing

### 3. Auto Deploy faol!

Endi har safar GitHub'ga push qilganingizda:
```bash
git add .
git commit -m "Yangilanish"
git push
```

Netlify avtomatik deploy qiladi! 🎉

---

## ⚙️ Deploy Sozlamalari

### Netlify Dashboard'da:

1. **Site Settings** → **Build & Deploy**
   - Build command: `echo 'No build required'`
   - Publish directory: `.`

2. **Site Settings** → **Domain Management**
   - Custom domain qo'shish mumkin
   - HTTPS avtomatik (Let's Encrypt)

3. **Site Settings** → **Environment Variables**
   - Kerak bo'lsa API key'lar qo'shing

---

## ✅ Deploy Tekshirish

Deploy tugagach, tekshiring:

- [ ] Asosiy sahifa (index.html) ochildi
- [ ] Barcha ikonlar ko'rinyapti
- [ ] Rasmlar yuklandi (Kaaba, Pattern, va boshqalar)
- [ ] Navigatsiya ishlayapti
- [ ] Mobil responsive to'g'ri
- [ ] Console'da xato yo'q (F12)

---

## 🔍 Diagnostika

Agar muammo bo'lsa:

1. **Netlify Deploy Logs tekshiring:**
   - Deploy details → Deploy log
   - Xatolarni o'qing

2. **Browser Console tekshiring:**
   - F12 → Console tab
   - Qizil xatolarni qidiring

3. **Diagnostics sahifani oching:**
   - URL: `https://your-site.netlify.app/diagnostics.html`
   - Barcha muammolarni ko'rsatadi

---

## 🐛 Keng Tarqalgan Muammolar

### ❌ "Page Not Found" xatosi
**Yechim:** 
- `_redirects` fayli mavjudligini tekshiring
- Yoki `netlify.toml` da redirects sozlamalari borligini

### ❌ Ikonlar ko'rinmayapti
**Yechim:**
- CDN bloklangan bo'lishi mumkin
- Browser console'da network xatolarni tekshiring

### ❌ 404 - Rasmlar yuklanmayapti
**Yechim:**
- `assets/images/` papkasi deploy qilinganligini tekshiring
- Fayl nomlari to'g'ri yozilganligini (kichik harflar)

---

## 📱 Mobil Preview

Netlify'da mobil preview:

1. Site Overview → "Preview"
2. QR code orqali telefondan test qiling

---

## 🎯 Production Checklist

Deploy qilishdan oldin:

- [ ] Local serverda test qildingizmi? (`python -m http.server 8000`)
- [ ] Barcha sahifalar ishlayaptimi?
- [ ] Rasmlar to'liq yuklandimi?
- [ ] Console xatolar yo'qmi?
- [ ] Mobil responsive testdanmi?
- [ ] `.gitignore` to'g'rimi?
- [ ] `netlify.toml` mavjudmi?
- [ ] `README.md` to'ldirildimi?

---

## 🎊 Deploy Muvaffaqiyatli!

Saytingiz jonli: `https://your-site.netlify.app`

### Keyingi Qadamlar:

1. **Custom Domain:**
   - Site Settings → Domain Management
   - "Add custom domain" → domeningizni kiriting

2. **SSL Certificate:**
   - Avtomatik Let's Encrypt (HTTPS)
   - 0-2 soat ichida faollashadi

3. **Analytics:**
   - Netlify Analytics yoqish (optional, paid)

4. **Forms (Kelajakda):**
   - Netlify Forms HTML formalar uchun

---

**Yordam kerakmi?**
- 📧 Email: support@hajsave.uz
- 💬 Telegram: @HajSaveSupport
- 🌐 Website: https://your-site.netlify.app

---

**Muallif:** MiniMax Agent  
**Sana:** 2025-11-19  
**Versiya:** 2.0.0  
**Platform:** Netlify ✅
