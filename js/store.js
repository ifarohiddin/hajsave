// js/store.js — brauzerda saqlanadigan ma'lumotlar (demo: server yo'q)
//
// Foydalanuvchilar va buyurtmalar localStorage'da saqlanadi, ya'ni faqat shu
// brauzerda ko'rinadi. "Eslab qolish" belgilanmasa, sessiya brauzer yopilganda tugaydi.

const STORAGE_KEYS = {
    users: 'hajsave.users',
    orders: 'hajsave.orders',
    session: 'hajsave.session',
};

// Yo'llanmalar ro'yxati (sahifadagi "Yo'llanmalar" jadvali bilan bir xil)
const PACKAGES = [
    { id: 'alsafa-umra-standart', agency: 'alsafa', name: 'Umra Standart', type: 'umra', days: 10, price: 15500000 },
    { id: 'zamzam-umra-ekonom', agency: 'zamzam', name: 'Umra Ekonom', type: 'umra', days: 7, price: 10200000 },
    { id: 'noor-umra-vip', agency: 'noor', name: 'Umra VIP', type: 'umra', days: 12, price: 28000000 },
    { id: 'madinah-umra-ramazon', agency: 'madinah', name: 'Umra Ramazon', type: 'umra', days: 15, price: 22500000 },
    { id: 'alsafa-haj-2026', agency: 'alsafa', name: 'Haj 2026', type: 'haj', days: 40, price: 72000000 },
    { id: 'zamzam-haj-2026-standart', agency: 'zamzam', name: 'Haj 2026 Standart', type: 'haj', days: 35, price: 65000000 },
    { id: 'hijra-umra-oilaviy', agency: 'hijra', name: 'Umra Oilaviy', type: 'umra', days: 10, price: 14000000 },
    { id: 'barakah-umra-express', agency: 'barakah', name: 'Umra Express', type: 'umra', days: 7, price: 9800000 },
];

const AGENCIES = {
    alsafa: 'Al-Safa Travel',
    zamzam: 'Zamzam Tour',
    noor: 'Noor Tourism',
    madinah: 'Madinah Express',
    hijra: 'Hijra Travel',
    barakah: 'Barakah Tours',
};

function readJSON(storage, key, fallback) {
    try {
        const raw = storage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJSON(storage, key, value) {
    storage.setItem(key, JSON.stringify(value));
}

function normalizeLogin(value) {
    return String(value || '').trim().toLowerCase().replace(/[\s()-]/g, '');
}

async function hashPassword(login, password) {
    const data = `${normalizeLogin(login)}:${password}`;
    // crypto.subtle faqat xavfsiz kontekstda (https yoki localhost) mavjud
    if (window.crypto?.subtle) {
        const bytes = new TextEncoder().encode(data);
        const digest = await crypto.subtle.digest('SHA-256', bytes);
        return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let h = 5381;
    for (let i = 0; i < data.length; i++) h = ((h << 5) + h + data.charCodeAt(i)) >>> 0;
    return `djb2-${h.toString(16)}`;
}

const Store = {
    // ---- foydalanuvchilar
    getUsers() {
        return readJSON(localStorage, STORAGE_KEYS.users, []);
    },

    findUser(login) {
        const key = normalizeLogin(login);
        return this.getUsers().find(u => u.login === key) || null;
    },

    async register({ name, login, password }) {
        const key = normalizeLogin(login);
        if (this.findUser(key)) {
            throw new Error("Bu email yoki telefon bilan hisob allaqachon mavjud");
        }
        const user = {
            id: `U${Date.now().toString(36).toUpperCase()}`,
            name: name.trim(),
            login: key,
            contact: login.trim(),
            passwordHash: await hashPassword(key, password),
            createdAt: new Date().toISOString(),
        };
        writeJSON(localStorage, STORAGE_KEYS.users, [...this.getUsers(), user]);
        return user;
    },

    async verify(login, password) {
        const user = this.findUser(login);
        if (!user) return null;
        return user.passwordHash === await hashPassword(user.login, password) ? user : null;
    },

    // ---- sessiya
    startSession(user, remember) {
        this.endSession();
        writeJSON(remember ? localStorage : sessionStorage, STORAGE_KEYS.session, { userId: user.id });
    },

    endSession() {
        localStorage.removeItem(STORAGE_KEYS.session);
        sessionStorage.removeItem(STORAGE_KEYS.session);
    },

    currentUser() {
        const session = readJSON(sessionStorage, STORAGE_KEYS.session, null)
            || readJSON(localStorage, STORAGE_KEYS.session, null);
        if (!session) return null;
        return this.getUsers().find(u => u.id === session.userId) || null;
    },

    // ---- buyurtmalar
    getOrders(userId) {
        return readJSON(localStorage, STORAGE_KEYS.orders, [])
            .filter(o => o.userId === userId)
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },

    addOrder(order) {
        const all = readJSON(localStorage, STORAGE_KEYS.orders, []);
        const saved = {
            ...order,
            id: `B${Date.now().toString(36).toUpperCase()}`,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        writeJSON(localStorage, STORAGE_KEYS.orders, [...all, saved]);
        return saved;
    },

    cancelOrder(userId, orderId) {
        const all = readJSON(localStorage, STORAGE_KEYS.orders, []);
        const order = all.find(o => o.id === orderId && o.userId === userId);
        if (!order || order.status === 'cancelled') return false;
        order.status = 'cancelled';
        writeJSON(localStorage, STORAGE_KEYS.orders, all);
        return true;
    },
};

function formatSum(value) {
    return `${Number(value).toLocaleString('en-US')} so'm`;
}

window.Store = Store;
window.PACKAGES = PACKAGES;
window.AGENCIES = AGENCIES;
window.formatSum = formatSum;
