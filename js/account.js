// js/account.js — shaxsiy kabinet: profil va buyurtmalar

const STATUS = {
    pending: { label: "Ko'rib chiqilmoqda", css: 'active', icon: 'loader' },
    cancelled: { label: 'Bekor qilingan', css: 'cancelled', icon: 'x' },
};

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function formatDay(iso) {
    if (!iso) return '-';
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];
    const d = new Date(iso);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function renderAccount() {
    const user = Store.currentUser();
    if (!user) return;
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileId').textContent = `ID: ${user.id}`;
    document.getElementById('profileContact').textContent = user.contact;
    document.getElementById('profileSince').textContent = `A'zo: ${formatDay(user.createdAt)}`;

    const orders = Store.getOrders(user.id);
    const list = document.getElementById('bookingsList');
    if (!orders.length) {
        list.innerHTML = `<p class="empty-state">Hali buyurtma yo'q. <a href="#packages" onclick="navigateTo('packages')">Yo'llanma tanlash</a></p>`;
        return;
    }
    list.innerHTML = orders.map(o => {
        const status = STATUS[o.status] || STATUS.pending;
        return `
        <div class="booking-item ${o.status === 'cancelled' ? 'is-cancelled' : ''}" data-order-id="${escapeHTML(o.id)}">
            <div class="booking-status ${status.css}"><i data-lucide="${status.icon}"></i></div>
            <div class="booking-info">
                <h4>${escapeHTML(o.packageName)} <small>#${escapeHTML(o.id)}</small></h4>
                <p>${escapeHTML(o.agency)} • ${o.departure ? formatDay(o.departure) : 'Sana kelishiladi'} • ${escapeHTML(o.traveler)}</p>
                <p class="booking-meta">${status.label} • Passport ${escapeHTML(o.passport)}</p>
            </div>
            <div class="booking-side">
                <div class="booking-price">${formatSum(o.price)}</div>
                ${o.status === 'pending' ? `<button class="btn btn-sm btn-secondary" onclick="cancelOrder('${escapeHTML(o.id)}')">Bekor qilish</button>` : ''}
            </div>
        </div>`;
    }).join('');
}

function cancelOrder(orderId) {
    const user = Store.currentUser();
    if (!user || !confirm('Buyurtmani bekor qilasizmi?')) return;
    if (Store.cancelOrder(user.id, orderId)) {
        showNotification('Buyurtma bekor qilindi', 'info');
        renderAccount();
    }
}

function downloadVoucher() {
    const user = Store.currentUser();
    const order = user && Store.getOrders(user.id).find(o => o.status === 'pending');
    if (!order) {
        showNotification("Yuklab olish uchun faol buyurtma yo'q", 'error');
        return;
    }
    const lines = [
        'UMRA&HAJ — BUYURTMA MA\'LUMOTNOMASI',
        '',
        `Buyurtma raqami: ${order.id}`,
        `Sana: ${formatDay(order.createdAt)}`,
        `Holati: ${STATUS[order.status].label}`,
        '',
        `Ziyoratchi: ${order.traveler}`,
        `Passport: ${order.passport}`,
        `Telefon: ${order.phone}`,
        '',
        `Yo'llanma: ${order.packageName} (${order.type === 'haj' ? 'Haj' : 'Umra'}, ${order.days} kun)`,
        `Agentlik: ${order.agency}`,
        `Jo'nash sanasi: ${order.departure ? formatDay(order.departure) : 'kelishiladi'}`,
        `Ellikboshi: ${order.guide}`,
        `Yo'llanma shakli: ${order.voucher}`,
        `Narx: ${formatSum(order.price)}`,
        '',
        "Eslatma: bu ma'lumotnoma rasmiy yo'llanma emas. Yakuniy hujjat agentlik tomonidan beriladi.",
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `yollanma-${order.id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

window.renderAccount = renderAccount;
window.cancelOrder = cancelOrder;
window.downloadVoucher = downloadVoucher;
