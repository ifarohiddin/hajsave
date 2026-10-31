// js/auth.js — kirish, ro'yxatdan o'tish va chiqish

// Kirish talab qilingan sahifaga borilganda, kirgandan keyin o'sha sahifaga qaytamiz
let pageAfterLogin = 'account';

function setFormError(form, message) {
    const box = form.querySelector('.form-error');
    if (!box) return;
    box.textContent = message || '';
    box.hidden = !message;
}

function requireLogin(pageId) {
    if (Store.currentUser()) return true;
    pageAfterLogin = pageId;
    showNotification('Davom etish uchun hisobingizga kiring', 'info');
    navigateTo('login');
    return false;
}

function finishLogin(user, remember) {
    Store.startSession(user, remember);
    updateAuthUI();
    showNotification(`Xush kelibsiz, ${user.name.split(' ')[0]}!`, 'success');
    const target = pageAfterLogin;
    pageAfterLogin = 'account';
    navigateTo(target);
}

document.getElementById('loginForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const login = form.elements.login.value.trim();
    const password = form.elements.password.value;
    if (!login || !password) {
        setFormError(form, "Iltimos, barcha maydonlarni to'ldiring");
        return;
    }
    const user = await Store.verify(login, password);
    if (!user) {
        setFormError(form, "Email/telefon yoki parol noto'g'ri");
        return;
    }
    const remember = form.elements.remember.checked;  // reset() dan oldin o'qiymiz
    setFormError(form, '');
    form.reset();
    finishLogin(user, remember);
});

document.getElementById('registerForm')?.addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const login = form.elements.login.value.trim();
    const password = form.elements.password.value;
    const confirm = form.elements.confirm.value;

    if (name.length < 3) return setFormError(form, "Ism va familiyani to'liq kiriting");
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
    const isPhone = /^\+?\d{9,15}$/.test(login.replace(/[\s()-]/g, ''));
    if (!isEmail && !isPhone) return setFormError(form, "To'g'ri email yoki telefon raqamini kiriting");
    if (password.length < 6) return setFormError(form, "Parol kamida 6 belgidan iborat bo'lsin");
    if (password !== confirm) return setFormError(form, 'Parollar bir xil emas');

    try {
        const user = await Store.register({ name, login, password });
        setFormError(form, '');
        form.reset();
        finishLogin(user, true);
    } catch (err) {
        setFormError(form, err.message);
    }
});

function showRegister(e) {
    e?.preventDefault();
    navigateTo('register');
}

function showLogin(e) {
    e?.preventDefault();
    navigateTo('login');
}

function logout() {
    Store.endSession();
    updateAuthUI();
    showNotification('Hisobdan chiqdingiz', 'info');
    navigateTo('home');
}

function updateAuthUI() {
    const button = document.getElementById('authButton');
    if (!button) return;
    const user = Store.currentUser();
    const label = button.querySelector('span');
    if (user) {
        label.textContent = user.name.split(' ')[0];
        button.onclick = () => navigateTo('account');
    } else {
        label.textContent = 'Kirish';
        button.onclick = () => navigateTo('login');
    }
}

window.requireLogin = requireLogin;
window.showRegister = showRegister;
window.showLogin = showLogin;
window.logout = logout;
window.updateAuthUI = updateAuthUI;
