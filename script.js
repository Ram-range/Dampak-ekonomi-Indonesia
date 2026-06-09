// 1. CHART JS (Grafik harga pangan)
const ctx = document.getElementById('foodPriceChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan 2025', 'Apr 2025', 'Jul 2025', 'Okt 2025', 'Jan 2026', 'Mar 2026', 'Jun 2026'],
        datasets: [
            {
                label: 'Beras (Lokal)',
                data: [100, 105, 108, 112, 118, 122, 125],
                borderColor: '#d97706',
                tension: 0.2,
                fill: false
            },
            {
                label: 'Minyak Goreng (Impor)',
                data: [100, 115, 130, 145, 162, 170, 180],
                borderColor: '#b91c1c',
                tension: 0.2,
                fill: false
            },
            {
                label: 'Kedelai (Tahu/Tempe)',
                data: [100, 108, 118, 130, 148, 155, 165],
                borderColor: '#2b7a3b',
                tension: 0.2,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: { mode: 'index' },
            legend: { position: 'top' }
        }
    }
});

// 2. SIMULASI KONVERTER RUPIAH KE DOLAR (dinamis + perubahan kurs)
let currentKurs = 17800; // Rp per USD
const kursDisplay = document.getElementById('kursDisplay');
const rupiahInput = document.getElementById('rupiahInput');
const convertBtn = document.getElementById('convertBtn');
const konversiHasil = document.getElementById('konversiHasil');

function updateKonversi() {
    let rupiah = parseFloat(rupiahInput.value);
    if (isNaN(rupiah)) rupiah = 0;
    let dollar = (rupiah / currentKurs).toFixed(2);
    konversiHasil.innerHTML = `💵 Hasil: $${dollar} USD (kurs Rp${currentKurs.toLocaleString()}/USD)`;
}

convertBtn.addEventListener('click', updateKonversi);
updateKonversi();

// Efek pelemahan kurs secara simulasi (dinamis tiap 8 detik)
setInterval(() => {
    let perubahan = (Math.random() * 200) - 100; // -100 s/d +100
    let kursBaru = currentKurs + perubahan;
    if (kursBaru > 18500) kursBaru = 18500;
    if (kursBaru < 17000) kursBaru = 17000;
    currentKurs = Math.floor(kursBaru);
    kursDisplay.innerText = `Rp${currentKurs.toLocaleString()}`;
    updateKonversi();
}, 8000);

// 3. DARK MODE TOGGLE
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// 4. NAVIGASI SMOOTH SCROLL + HIGHLIGHT ACTIVE (Home, About, Skills, Projects, Contact)
const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
const sections = {
    home: document.getElementById('mainContent'),
    about: document.getElementById('aboutCard'),
    skills: document.getElementById('skillsCard'),
    projects: document.getElementById('projectsCard'),
    contact: document.getElementById('contactCard')
};

function scrollToElement(element) {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const navValue = link.getAttribute('data-nav');
        // Hapus active class semua
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        if (navValue === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (navValue === 'about') {
            scrollToElement(sections.about);
        } else if (navValue === 'skills') {
            scrollToElement(sections.skills);
        } else if (navValue === 'projects') {
            scrollToElement(sections.projects);
        } else if (navValue === 'contact') {
            scrollToElement(sections.contact);
        }
    });
});

// 5. TAMPILKAN NOTIFIKASI INTERAKTIF SAAT HALAMAN DIMUAT
setTimeout(() => {
    const notif = document.createElement('div');
    notif.innerText = '💡 Tips: Coba konverter rupiah & pantau fluktuasi kurs otomatis!';
    notif.style.position = 'fixed';
    notif.style.bottom = '20px';
    notif.style.right = '20px';
    notif.style.backgroundColor = '#e67e22';
    notif.style.color = 'white';
    notif.style.padding = '10px 20px';
    notif.style.borderRadius = '40px';
    notif.style.fontSize = '0.85rem';
    notif.style.zIndex = '999';
    notif.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    notif.style.cursor = 'pointer';
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transition = 'opacity 0.5s';
        setTimeout(() => notif.remove(), 500);
    }, 4500);
}, 800);

console.log("Website interaktif siap — Analisis Rupiah & Pangan 2026");
