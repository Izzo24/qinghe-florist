/* ===================================================
   青禾花藝 — Main JavaScript
   =================================================== */

(function () {
  'use strict';

  // —— Page Loader ——————————————————————————————————————
  window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 900);
    }
  });

  // —— Smart Nav ——————————————————————————————————————————
  const nav = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (nav) {
      nav.classList.toggle('scrolled', y > 60);
    }
    const btt = document.getElementById('back-to-top');
    if (btt) btt.classList.toggle('visible', y > 400);
  }, { passive: true });

  // —— Back to Top ————————————————————————————————————————
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // —— Mobile Nav ———————————————————————————————————————
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileClose = document.querySelector('.nav-mobile-close');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileNav) {
    mobileClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // —— Scroll Reveal ————————————————————————————————————
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
  }

  // —— Stat Counters ————————————————————————————————————
  function animateCounter(el, target, suffix, duration) {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statSection = document.querySelector('.stats-section');
  if (statSection) {
    let counted = false;
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        document.querySelectorAll('[data-count]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.count, 10), el.dataset.suffix || '', 1800);
        });
      }
    }, { threshold: 0.4 }).observe(statSection);
  }

  // —— Active Nav Link ——————————————————————————————————
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // —— Product Filter Tabs ——————————————————————————————
  const tabs = document.querySelectorAll('.tab-btn');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.flower-card').forEach(card => {
          const cat = card.dataset.category;
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // —— Petal Floating Animation (hero) ——————————————————
  const heroPetals = document.querySelector('.hero-petals');
  if (heroPetals) {
    const petals = ['🌸', '🌹', '🌺', '🌼', '🍃', '🌿'];
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement('span');
      petal.textContent = petals[Math.floor(Math.random() * petals.length)];
      petal.style.cssText = `
        position: absolute;
        font-size: ${0.8 + Math.random() * 1.4}rem;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.15 + Math.random() * 0.2};
        animation: floatPetal ${4 + Math.random() * 5}s ease-in-out ${Math.random() * 3}s infinite;
        pointer-events: none;
      `;
      heroPetals.appendChild(petal);
    }
  }

  // —— Form Submissions —————————————————————————————————
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = orderForm.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '送出中…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ 訂單已收到！';
        btn.style.background = '#3A7D44';
        const msg = document.createElement('div');
        msg.innerHTML = `
          <div style="background:#EBF5ED;border:2px solid #3A7D44;border-radius:14px;padding:22px 28px;margin-top:22px;color:#2A5C31">
            <strong>🌸 感謝您的訂購！</strong><br>
            我們將於 2 小時內以電話或 LINE 確認您的訂單，期待為您打造專屬花藝。
          </div>`;
        orderForm.appendChild(msg);
      }, 1500);
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = '送出中…';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ 訊息已送出';
        btn.style.background = '#3A7D44';
      }, 1200);
    });
  }

  // —— Smooth anchor scroll —————————————————————————————
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // —— Prefers reduced motion ————————————————————————————
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

})();
