// ==========================================
// 1. NAVBAR SCROLL
// ==========================================
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ==========================================
// 2. MOBILE MENU
// ==========================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ==========================================
// 3. LIGHTBOX (Portofolio Fotografer)
// ==========================================
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('img');
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = 0;

  const openLightbox = (i) => {
    currentIndex = i;
    lightboxImg.src = items[currentIndex].dataset.img;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const navigate = (dir) => {
    currentIndex = (currentIndex + dir + items.length) % items.length;
    lightboxImg.src = items[currentIndex].dataset.img;
  };

  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightbox.querySelector('.lightbox-close')
    .addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev')
    .addEventListener('click', () => navigate(-1));
  lightbox.querySelector('.lightbox-next')
    .addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

// ==========================================
// 4. FILTER AKUN (Toko Akun)
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const accountCards = document.querySelectorAll('.account-card');

if (filterBtns.length && accountCards.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      accountCards.forEach(card => {
        const cat = card.dataset.cat;
        const status = card.dataset.status;
        const show =
          filter === 'all' ? true :
          filter === 'sold' ? status === 'sold' :
          cat === filter && status === 'ready';
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

// ==========================================
// 5. MODAL DETAIL AKUN + BELI VIA WHATSAPP
// ==========================================
const modal = document.getElementById('detailModal');

if (modal) {
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPrice = document.getElementById('modalPrice');
  const modalBuy = document.getElementById('modalBuy');

  const openModal = (btn) => {
    modalImg.src = btn.dataset.img;
    modalTitle.textContent = btn.dataset.title;
    modalDesc.textContent = btn.dataset.desc;
    modalPrice.textContent = btn.dataset.price;

    // Pesan WhatsApp otomatis
    const pesan = `Halo Minion's, saya mau beli akun *${btn.dataset.title}* (${btn.dataset.price}). Masih ready?`;
    modalBuy.href = 'https://wa.me/6285815966309?text=' + encodeURIComponent(pesan);
    modalBuy.target = '_blank';
    modalBuy.rel = 'noopener';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.btn-detail').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', () => openModal(btn));
  });

  modal.querySelector('.modal-close').addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

// ==========================================
// 6. TOGGLE GAMER PANEL (index.html)
// ==========================================
const gamerBtn = document.querySelector('.skill-toggle');
const gamePanel = document.getElementById('gamePanel');

if (gamerBtn && gamePanel) {
  gamerBtn.addEventListener('click', () => {
    const isOpen = gamePanel.classList.toggle('open');
    gamerBtn.classList.toggle('active', isOpen);
  });
}