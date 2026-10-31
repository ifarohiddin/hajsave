// js/main.js
const app = { currentPage: 'home' };

// Faqat hisobga kirgan foydalanuvchiga ochiladigan sahifalar
const PROTECTED_PAGES = ['account'];

// Navigate
function navigateTo(pageId) {
    if (!document.getElementById(pageId)) pageId = 'home';
    if (PROTECTED_PAGES.includes(pageId) && !requireLogin(pageId)) return;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    app.currentPage = pageId;
    // Manzil satrida sahifani saqlaymiz: yangilaganda shu sahifa ochiladi
    if (location.hash !== `#${pageId}`) history.replaceState(null, '', `#${pageId}`);

    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('onclick')?.includes(pageId)) l.classList.add('active');
    });

    const navLinks = document.getElementById('navLinks');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    navLinks?.classList.remove('active');
    mobileBtn?.classList.remove('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    initPage(pageId);
}

// Mobile menu
function toggleMobileMenu() {
    document.getElementById('navLinks').classList.toggle('active');
    document.getElementById('mobileMenuBtn').classList.toggle('active');
}

// Counters
function animateCounter(el, target) {
    let current = 0;
    const inc = target / 100;
    const timer = setInterval(() => {
        current += inc;
        if (current >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

// Scroll effects
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// Notification
function showNotification(msg, type = 'info') {
    const n = document.createElement('div');
    n.className = `notification notification-${type}`;
    n.textContent = msg;
    n.style.cssText = `position:fixed;top:100px;right:20px;padding:16px 24px;background:${type==='success'?'#10b981':type==='error'?'#ef4444':'#00d4aa'};color:white;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:10000;animation:slideInRight .3s ease`;
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'slideOutRight .3s ease';
        setTimeout(() => n.remove(), 300);
    }, 3000);
}

// Init page
function initPage(pageId) {
    if (pageId === 'home') initCounters();
    if (pageId === 'booking') initBooking();
    if (pageId === 'account') renderAccount();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    updateAuthUI();
    navigateTo(location.hash.slice(1) || 'home');
});

// Brauzerdagi "orqaga" tugmasi va qo'lda yozilgan #manzil uchun
window.addEventListener('hashchange', () => {
    const pageId = location.hash.slice(1) || 'home';
    if (pageId !== app.currentPage) navigateTo(pageId);
});

function initCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, +entry.target.dataset.count);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(el);
    });
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes slideOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100px); opacity: 0; } }
    `;
    document.head.appendChild(style);
}

window.navigateTo = navigateTo;
window.toggleMobileMenu = toggleMobileMenu;
window.showNotification = showNotification;