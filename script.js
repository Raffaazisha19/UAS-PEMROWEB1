(function () {
  'use strict';


  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }


  const slider  = document.getElementById('verdicts-slider');
  const btnPrev = document.getElementById('btn-prev-verdict');
  const btnNext = document.getElementById('btn-next-verdict');

  if (slider && btnPrev && btnNext) {
    const cards = Array.from(slider.querySelectorAll('.verdict-card'));
    let activeIndex = 0;

    function showGroup(idx) {
      const total = cards.length;
      const isMobile = window.innerWidth < 700;
      if (isMobile) {
        cards.forEach((c, i) => {
          c.style.display = i === idx ? 'block' : 'none';
        });
      } else {
        cards.forEach(c => { c.style.display = 'block'; });
      }
    }

    btnNext.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % cards.length;
      showGroup(activeIndex);
    });

    btnPrev.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + cards.length) % cards.length;
      showGroup(activeIndex);
    });



    showGroup(activeIndex);
    window.addEventListener('resize', () => showGroup(activeIndex));
  }

  const bookingForm   = document.getElementById('booking-form');
  const modalOverlay  = document.getElementById('modal-overlay');
  const btnModalClose = document.getElementById('btn-modal-close');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name  = document.getElementById('full-name');
      const date  = document.getElementById('booking-date');
      const time  = document.getElementById('booking-time');
      const court = document.getElementById('court-type');

      let valid = true;
      [name, date, time, court].forEach(field => {
        if (!field) return;
        if (!field.value.trim()) {
          field.style.borderBottomColor = '#ff4444';
          valid = false;
        } else {
          field.style.borderBottomColor = '';
        }
      });

      if (valid && modalOverlay) {
        modalOverlay.style.display = 'flex';
        bookingForm.reset();
      }
    });
  }

  if (btnModalClose && modalOverlay) {
    btnModalClose.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
      }
    });
  }

  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const actionItems   = document.querySelectorAll('.action-item:not(.submit-media-card), .facility-main, .facility-sm');

  if (lightbox && lightboxImg) {
    actionItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  (function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  })();

})();
