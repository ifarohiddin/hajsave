// js/booking.js — online buyurtma formasi

const TYPE_LABELS = { umra: 'Umra', haj: 'Haj' };

function bookingForm() {
    return document.getElementById('bookingForm');
}

function selectedPackage() {
    const id = bookingForm()?.elements.package.value;
    return PACKAGES.find(p => p.id === id) || null;
}

function fillPackageOptions(keepId) {
    const form = bookingForm();
    const { type, agency, package: packageSelect } = form.elements;
    const options = PACKAGES.filter(p => (!type.value || p.type === type.value) && (!agency.value || p.agency === agency.value));

    if (!agency.value) {
        packageSelect.innerHTML = '<option value="">Avval agentlik tanlang</option>';
    } else if (!options.length) {
        packageSelect.innerHTML = '<option value="">Bu agentlikda mos paket yo\'q</option>';
    } else {
        packageSelect.innerHTML = '<option value="">Tanlang...</option>' + options
            .map(p => `<option value="${p.id}">${p.name} — ${p.days} kun — ${formatSum(p.price)}</option>`)
            .join('');
    }
    if (keepId && options.some(p => p.id === keepId)) packageSelect.value = keepId;
    updateSummary();
}

function updateSummary() {
    const form = bookingForm();
    const pkg = selectedPackage();
    const set = (id, text) => { document.getElementById(id).textContent = text; };
    set('summaryType', TYPE_LABELS[form.elements.type.value] || 'Tanlanmagan');
    set('summaryAgency', AGENCIES[form.elements.agency.value] || 'Tanlanmagan');
    set('summaryPackage', pkg ? pkg.name : 'Tanlanmagan');
    set('summaryDuration', pkg ? `${pkg.days} kun` : '-');
    set('summaryTotal', formatSum(pkg ? pkg.price : 0));
    document.getElementById('summaryNote').textContent = pkg
        ? "To'lov agentlik ofisida yoki shartnoma asosida amalga oshiriladi"
        : "Narx yo'llanma tanlanganidan keyin ko'rsatiladi";
}

function preselectPackage(packageId) {
    const pkg = PACKAGES.find(p => p.id === packageId);
    const form = bookingForm();
    if (!pkg || !form) return;
    form.elements.type.value = pkg.type;
    form.elements.agency.value = pkg.agency;
    fillPackageOptions(pkg.id);
}

function bookPackage(packageId) {
    navigateTo('booking');
    preselectPackage(packageId);
}

function initBooking() {
    const form = bookingForm();
    const user = Store.currentUser();
    // Telefon raqamini hisobdan to'ldiramiz (agar telefon bilan ro'yxatdan o'tgan bo'lsa)
    if (user && /^\+?\d+$/.test(user.login) && !form.elements.phone.value) form.elements.phone.value = user.contact;
    const today = new Date().toISOString().split('T')[0];
    form.elements.departure.min = today;
    form.elements.birthDate.max = today;
    updateSummary();
}

function maskPassport(value) {
    const clean = value.replace(/\s+/g, '').toUpperCase();
    return clean.length > 4 ? `${clean.slice(0, 2)}•••${clean.slice(-3)}` : clean;
}

function setupBookingForm() {
    const form = bookingForm();
    if (!form) return;

    form.elements.type.addEventListener('change', () => fillPackageOptions(form.elements.package.value));
    form.elements.agency.addEventListener('change', () => fillPackageOptions(form.elements.package.value));
    form.elements.package.addEventListener('change', updateSummary);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const errorBox = form.querySelector('.form-error');
        const fail = msg => { errorBox.textContent = msg; errorBox.hidden = false; errorBox.scrollIntoView({ block: 'center' }); };

        if (!requireLogin('booking')) return;
        const user = Store.currentUser();
        const f = form.elements;
        const pkg = selectedPackage();

        if (!pkg) return fail("Paketni tanlang");
        if (!/^[A-Z]{2}\d{7}$/.test(f.passport.value.replace(/\s+/g, '').toUpperCase())) {
            return fail("Passport raqami AA1234567 formatida bo'lishi kerak");
        }
        if (!/^\+?\d{9,15}$/.test(f.phone.value.replace(/[\s()-]/g, ''))) return fail("Telefon raqamini to'g'ri kiriting");
        if (f.departure.value && f.departure.value < new Date().toISOString().split('T')[0]) {
            return fail("Jo'nash sanasi bugundan oldin bo'lishi mumkin emas");
        }

        errorBox.hidden = true;
        const order = Store.addOrder({
            userId: user.id,
            packageId: pkg.id,
            packageName: pkg.name,
            agency: AGENCIES[pkg.agency],
            type: pkg.type,
            days: pkg.days,
            price: pkg.price,
            departure: f.departure.value,
            traveler: `${f.lastName.value.trim()} ${f.firstName.value.trim()} ${f.middleName.value.trim()}`.trim(),
            passport: maskPassport(f.passport.value),
            phone: f.phone.value.trim(),
            guide: f.guide.options[f.guide.selectedIndex].text,
            voucher: f.voucher.options[f.voucher.selectedIndex].text,
        });
        form.reset();
        fillPackageOptions();
        showNotification(`Buyurtma qabul qilindi: ${order.id}`, 'success');
        navigateTo('account');
    });

    // Jadval va kartochkalardagi "Buyurtma" tugmalari tanlangan paketni oldindan belgilaydi
    document.querySelectorAll('.packages-table tbody tr').forEach(row => {
        const cells = row.querySelectorAll('td');
        const pkg = PACKAGES.find(p => AGENCIES[p.agency] === cells[0]?.textContent.trim() && p.name === cells[1]?.textContent.trim());
        const button = row.querySelector('button');
        if (pkg && button) button.onclick = () => bookPackage(pkg.id);
    });
    document.querySelectorAll('.package-name').forEach(title => {
        const card = title.closest('.package-card') || title.parentElement.closest('div');
        const agency = card?.querySelector('.package-agency')?.textContent.trim();
        const pkg = PACKAGES.find(p => p.name === title.textContent.trim() && AGENCIES[p.agency] === agency);
        const button = card?.querySelector('button');
        if (pkg && button) button.onclick = () => bookPackage(pkg.id);
    });
}

document.addEventListener('DOMContentLoaded', setupBookingForm);

window.initBooking = initBooking;
window.bookPackage = bookPackage;
