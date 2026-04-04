let menuOpen = false;
  function toggleMenu() {
    menuOpen = !menuOpen;
    document.getElementById('mobile-menu').classList.toggle('open', menuOpen);
    document.getElementById('ham1').style.transform = menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    document.getElementById('ham2').style.opacity = menuOpen ? '0' : '1';
    document.getElementById('ham3').style.transform = menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    document.getElementById('ham3').style.width = menuOpen ? '1.5rem' : '1rem';
  }
  function closeMenu() {
    menuOpen = false;
    document.getElementById('mobile-menu').classList.remove('open');
    document.getElementById('ham1').style.transform = '';
    document.getElementById('ham2').style.opacity = '1';
    document.getElementById('ham3').style.transform = '';
    document.getElementById('ham3').style.width = '1rem';
  }

// Show/hide scroll-to-top
const fabTop = document.getElementById('fab-top');
const fabWa = document.querySelector('.fab-wa');
window.addEventListener('scroll', () => {
  const shouldShow = window.scrollY > window.innerHeight;
  fabTop.classList.toggle('show', shouldShow);
  if (fabWa) fabWa.classList.toggle('scroll-up', shouldShow);
});

// DATA BARBER (untuk dropdown form booking)
const barbers = [
  // OUTLET #1 - LIDAH KULON
  { nama: "Rizal", outlet: "Lidah Kulon", spec: "Fade Expert" },
  { nama: "Andi", outlet: "Lidah Kulon", spec: "Classic Cut" },
  { nama: "Budi", outlet: "Lidah Kulon", spec: "Coloring" },
  { nama: "Dika", outlet: "Lidah Kulon", spec: "Modern Cut" },
  { nama: "Erik", outlet: "Lidah Kulon", spec: "Senior Barber" },
  { nama: "Fajar", outlet: "Lidah Kulon", spec: "Taper Expert" },
  // OUTLET #2 - MERR
  { nama: "Gani", outlet: "MERR", spec: "Pompadour" },
  { nama: "Hadi", outlet: "MERR", spec: "Hair Tattoo" },
  { nama: "Irfan", outlet: "MERR", spec: "Shaving Pro" },
  { nama: "Tukiyem", outlet: "MERR", spec: "Styling" },
  { nama: "Kevin", outlet: "MERR", spec: "Buzz Cut" },
  { nama: "Lutfi", outlet: "MERR", spec: "All Rounder" }
];

function updateBarberSelect() {
  const outletSelect = document.getElementById('b-outlet');
  const barberSelect = document.getElementById('b-barber');
  const selectedOutlet = outletSelect.value;
  const filterTarget = selectedOutlet === "" ? "Lidah Kulon" : selectedOutlet;
  barberSelect.innerHTML = '<option value="">-- Pilih Barber --</option>';
  barbers.filter(b => b.outlet === filterTarget).forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.nama;
    opt.textContent = `${b.nama} (${b.spec})`;
    barberSelect.appendChild(opt);
  });
}

// INIT & EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  // Set default outlet & isi dropdown barber
  document.getElementById('b-outlet').value = "Lidah Kulon";
  updateBarberSelect();
  document.getElementById('b-outlet').addEventListener('change', updateBarberSelect);

  // Toggle Services
// Toggle Services
const toggleBtn = document.getElementById('toggleBtn');
let servicesVisible = false;

toggleBtn.addEventListener('click', () => {
    const hiddenServices = document.querySelectorAll('.hidden-service');
    servicesVisible = !servicesVisible;

    hiddenServices.forEach((item, index) => {
        if(servicesVisible) {
            item.style.display = 'block';
            setTimeout(() => item.classList.add('show'), index * 50);
        } else {
            item.classList.remove('show');
            setTimeout(() => item.style.display = 'none', 500);
        }
    });

    document.getElementById('toggleText').textContent =
        servicesVisible ? "Tampilkan Lebih Sedikit" : "Lihat Lebih Banyak";

    document.getElementById('toggleIcon').style.transform =
        servicesVisible ? "rotate(180deg)" : "rotate(0deg)";

    // ✅ TAMBAHAN PENTING
    if (!servicesVisible) {
        document.getElementById('layanan').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

  // Min Date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('b-tanggal').min = today;
});

// 5. NAVBAR SCROLL & MENU
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});



// 6. FORM HANDLER
function handleBooking(e) {
  e.preventDefault();
  const data = {
      nama: document.getElementById('b-nama').value,
      outlet: document.getElementById('b-outlet').value,
      barber: document.getElementById('b-barber').value,
      layanan: document.getElementById('b-layanan').value,
      tanggal: document.getElementById('b-tanggal').value,
      jam: document.getElementById('b-jam').value
  };

  let waAdmin = data.outlet === "MERR" ? "6285385858626" : "6282225328882";
  const text = `Halo The Mafia 💈\nBooking Reservasi:\n👤 Nama: ${data.nama}\n📍 Outlet: ${data.outlet}\n💇 Barber: ${data.barber}\n✂️ Layanan: ${data.layanan}\n📅 Tanggal: ${data.tanggal}\n⏰ Jam: ${data.jam} WIB`;

  document.getElementById('booking-success').classList.remove('hidden');
  setTimeout(() => {
      window.open(`https://wa.me/${waAdmin}?text=${encodeURIComponent(text)}`, '_blank');
      e.target.reset();
      document.getElementById('booking-success').classList.add('hidden');
  }, 1000);
}

// FIX 1: IntersectionObserver untuk animasi .reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── COUNT-UP ANIMATION ──
function animateCountUp(el) {
  const raw = el.getAttribute('data-count');
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const target = parseFloat(raw);
  const isFloat = raw.includes('.');
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutExpo
    const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = target * ease;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      animateCountUp(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));