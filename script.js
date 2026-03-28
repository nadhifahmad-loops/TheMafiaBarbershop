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
window.addEventListener('scroll', () => {
  fabTop.classList.toggle('show', window.scrollY > window.innerHeight);
});

// 1. DATA MASTER BARBER (12 Personel)
const barbers = [
  // OUTLET #1 - LIDAH KULON
  { nama: "Rizal", outlet: "Lidah Kulon", exp: "5 Thn", spec: "Fade Expert", img: "https://images.unsplash.com/photo-1521119989659-a83eee488004" },
  { nama: "Andi", outlet: "Lidah Kulon", exp: "4 Thn", spec: "Classic Cut", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" },
  { nama: "Budi", outlet: "Lidah Kulon", exp: "3 Thn", spec: "Coloring", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
  { nama: "Dika", outlet: "Lidah Kulon", exp: "2 Thn", spec: "Modern Cut", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" },
  { nama: "Erik", outlet: "Lidah Kulon", exp: "6 Thn", spec: "Senior Barber", img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce" },
  { nama: "Fajar", outlet: "Lidah Kulon", exp: "4 Thn", spec: "Taper Expert", img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6" },

  // OUTLET #2 - MERR
  { nama: "Gani", outlet: "MERR", exp: "5 Thn", spec: "Pompadour", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" },
  { nama: "Hadi", outlet: "MERR", exp: "3 Thn", spec: "Hair Tattoo", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d" },
  { nama: "Irfan", outlet: "MERR", exp: "4 Thn", spec: "Shaving Pro", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a" },
  { nama: "Tukiyem", outlet: "MERR", exp: "5 Thn", spec: "Styling", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04" },
  { nama: "Kevin", outlet: "MERR", exp: "2 Thn", spec: "Buzz Cut", img: "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1" },
  { nama: "Lutfi", outlet: "MERR", exp: "6 Thn", spec: "All Rounder", img: "https://images.unsplash.com/photo-1504257432389-52343af06ae3" }
];

// 2. RENDER BARBER KE GRID
let barberLimit = 5; // Tampilkan 5 awal
let barberExpanded = false;

function renderBarberGrid() {
  const grid = document.getElementById('barber-grid');
  grid.innerHTML = '';

  const itemsToShow = barberExpanded ? barbers : barbers.slice(0, barberLimit);

  itemsToShow.forEach((b, i) => {
    const card = document.createElement('div');
    card.className = 'barber-card reveal visible';
    card.innerHTML = `
      <img src="${b.img}" alt="${b.nama}" class="barber-img" loading="lazy">
      <div class="barber-overlay">
        <div class="text-[10px] bg-crimson inline-block px-2 py-0.5 rounded-sm mb-1">${b.outlet}</div>
        <h3 class="font-display font-bold text-cream text-lg mb-0">${b.nama}</h3>
        <p class="text-crimson text-[10px] tracking-widest uppercase mb-1">${b.exp} Experience</p>
        <p class="text-cream/50 text-[0.65rem] italic">${b.spec}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

// 3. FILTER BARBER BERDASARKAN OUTLET DI FORM
function updateBarberSelect() {
  const outletSelect = document.getElementById('b-outlet');
  const barberSelect = document.getElementById('b-barber');
  const selectedOutlet = outletSelect.value;

  // Default Lidah Kulon jika kosong
  const filterTarget = selectedOutlet === "" ? "Lidah Kulon" : selectedOutlet;

  barberSelect.innerHTML = '<option value="">-- Pilih Barber --</option>';

  const filteredBarbers = barbers.filter(b => b.outlet === filterTarget);

  filteredBarbers.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.nama;
    opt.textContent = `${b.nama} (${b.spec})`;
    barberSelect.appendChild(opt);
  });
}

// 4. INIT & EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
  // Set default outlet ke Lidah Kulon
  document.getElementById('b-outlet').value = "Lidah Kulon";
  updateBarberSelect();
  renderBarberGrid();

  // Listener change outlet
  document.getElementById('b-outlet').addEventListener('change', updateBarberSelect);

  // Toggle Barber List
  const toggleBarberBtn = document.getElementById('toggleBarberBtn');
  toggleBarberBtn.addEventListener('click', () => {
      barberExpanded = !barberExpanded;
      renderBarberGrid();
      document.getElementById('barberBtnText').textContent = barberExpanded ? "Tampilkan Sedikit" : "Lihat Semua Barber";
      document.getElementById('barberBtnIcon').style.transform = barberExpanded ? "rotate(180deg)" : "rotate(0deg)";
      if(barberExpanded) {
           document.getElementById('barber-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  });

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
      document.getElementById('toggleText').textContent = servicesVisible ? "Tampilkan Lebih Sedikit" : "Lihat Lebih Banyak";
      document.getElementById('toggleIcon').style.transform = servicesVisible ? "rotate(180deg)" : "rotate(0deg)";
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

