/**
 * SchoolSyntaxERP — Main JavaScript
 * ES6+ vanilla JS — no jQuery
 */

'use strict';

/* ─── Init ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initBackToTop();
  initCounters();
  initAccordions();
  initTabs();
  initPricingToggle();
  initCookieBanner();
  initVideoModal();
  initFormValidation();
  initModuleFilter();
  initSmoothScroll();
  initSearchOverlay();
});

/* ─── AOS Initialization ─────────────────────────────────────── */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 0,
    });
  }
}

/* ─── Navbar ─────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.ss-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Active link detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.ss-nav-link, .ss-mobile-nav-link');

  navLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').split('/').pop();
    if (href === currentPath) {
      link.classList.add('active');
    }
  });
}

/* ─── Mobile Menu ────────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.querySelector('.ss-hamburger');
  const mobileMenu = document.querySelector('.ss-mobile-menu');
  const body = document.body;

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on backdrop click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      body.style.overflow = '';
    }
  });

  // Mobile sub-menu toggles
  const subToggles = mobileMenu.querySelectorAll('[data-toggle-sub]');
  subToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(toggle.dataset.toggleSub);
      if (target) {
        const isOpen = target.style.display === 'flex';
        target.style.display = isOpen ? 'none' : 'flex';
        const icon = toggle.querySelector('.chevron');
        if (icon) icon.style.transform = isOpen ? '' : 'rotate(180deg)';
      }
    });
  });
}

/* ─── Scroll Progress Bar ────────────────────────────────────── */
function initScrollProgress() {
  const bar = document.querySelector('.ss-scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(progress, 100)}%`;
  }, { passive: true });
}

/* ─── Back To Top ────────────────────────────────────────────── */
function initBackToTop() {
  const btn = document.querySelector('.ss-back-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─── Animated Counters ──────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = parseInt(el.dataset.duration || '2000');
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = target * easeOut(progress);

      el.textContent = prefix + value.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

/* ─── FAQ Accordions ─────────────────────────────────────────── */
function initAccordions() {
  const accordions = document.querySelectorAll('.ss-accordion-item');

  accordions.forEach(item => {
    const header = item.querySelector('.ss-accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all siblings in same container
      const siblings = item.closest('.ss-accordion')?.querySelectorAll('.ss-accordion-item');
      siblings?.forEach(sib => sib.classList.remove('open'));

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });
}

/* ─── Tabs ───────────────────────────────────────────────────── */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(container => {
    const tabId = container.dataset.tabs;
    const buttons = document.querySelectorAll(`[data-tab-target="${tabId}"]`);
    const panes = document.querySelectorAll(`[data-tab-pane="${tabId}"]`);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tabValue;

        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.querySelector(
          `[data-tab-pane="${tabId}"][data-tab-value="${target}"]`
        );
        if (targetPane) targetPane.classList.add('active');
      });
    });
  });

  // Also handle simple .ss-tab-btn pattern
  document.querySelectorAll('.ss-tabs').forEach(tabGroup => {
    const buttons = tabGroup.querySelectorAll('.ss-tab-btn');
    const paneGroup = tabGroup.closest('section, .tab-section')?.querySelector('.tab-panes');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.dataset.target;
        if (target) {
          document.querySelectorAll('.ss-tab-pane').forEach(p => p.classList.remove('active'));
          const pane = document.querySelector(target);
          if (pane) pane.classList.add('active');
        }
      });
    });
  });
}

/* ─── Pricing Toggle ─────────────────────────────────────────── */
function initPricingToggle() {
  const toggle = document.getElementById('pricing-toggle');
  if (!toggle) return;

  const monthlyPrices = document.querySelectorAll('[data-monthly]');
  const annualPrices = document.querySelectorAll('[data-annual]');
  const monthlyLabel = document.querySelector('.pricing-label-monthly');
  const annualLabel = document.querySelector('.pricing-label-annual');

  const update = () => {
    const isAnnual = toggle.checked;

    monthlyPrices.forEach(el => {
      el.style.display = isAnnual ? 'none' : '';
    });

    annualPrices.forEach(el => {
      el.style.display = isAnnual ? '' : 'none';
    });

    if (monthlyLabel) monthlyLabel.classList.toggle('active', !isAnnual);
    if (annualLabel) annualLabel.classList.toggle('active', isAnnual);
  };

  toggle.addEventListener('change', update);
  update();
}

/* ─── Cookie Consent ─────────────────────────────────────────── */
function initCookieBanner() {
  const banner = document.querySelector('.ss-cookie-banner');
  if (!banner) return;

  const accepted = localStorage.getItem('ss_cookies_accepted');
  if (accepted) return;

  setTimeout(() => banner.classList.add('visible'), 1500);

  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');

  const dismiss = () => {
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  };

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      localStorage.setItem('ss_cookies_accepted', 'true');
      dismiss();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      localStorage.setItem('ss_cookies_accepted', 'rejected');
      dismiss();
    });
  }
}

/* ─── Video Modal ────────────────────────────────────────────── */
function initVideoModal() {
  const triggers = document.querySelectorAll('[data-modal="video"]');
  const overlay = document.getElementById('video-modal');
  if (!overlay) return;

  const closeBtn = overlay.querySelector('.ss-modal-close');
  const videoWrap = overlay.querySelector('.ss-video-wrap');

  const open = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (videoWrap) {
      videoWrap.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;color:#9CA3AF;font-size:0.875rem;">
          <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#6366F1,#8B5CF6);display:flex;align-items:center;justify-content:center;font-size:32px;color:#fff;box-shadow:0 0 40px rgba(99,102,241,0.4);">&#9654;</div>
          <p>Product Demo Video</p>
          <p style="font-size:0.75rem;color:#6B7280;">Request a live demo at demo.schoolsyntaxerp.com</p>
        </div>`;
    }
  };

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (videoWrap) videoWrap.innerHTML = '';
  };

  triggers.forEach(t => t.addEventListener('click', (e) => { e.preventDefault(); open(); }));
  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
}

/* ─── Form Validation ────────────────────────────────────────── */
function initFormValidation() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const feedback = field.parentElement.querySelector('.ss-form-feedback');
        const value = field.value.trim();

        field.classList.remove('error', 'success');

        if (!value) {
          field.classList.add('error');
          field.style.borderColor = 'var(--color-error)';
          if (feedback) {
            feedback.textContent = 'This field is required.';
            feedback.className = 'ss-form-feedback error';
          }
          valid = false;
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          field.classList.add('error');
          field.style.borderColor = 'var(--color-error)';
          if (feedback) {
            feedback.textContent = 'Please enter a valid email address.';
            feedback.className = 'ss-form-feedback error';
          }
          valid = false;
        } else {
          field.style.borderColor = 'var(--color-success)';
          if (feedback) {
            feedback.textContent = '';
            feedback.className = 'ss-form-feedback';
          }
        }
      });

      if (valid) {
        const btn = form.querySelector('[type="submit"]');
        const originalText = btn?.innerHTML;

        if (btn) {
          btn.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Sending…';
          btn.disabled = true;
        }

        setTimeout(() => {
          showFormSuccess(form);
          if (btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
          }
          form.reset();
          form.querySelectorAll('[required]').forEach(f => f.style.borderColor = '');
        }, 1800);
      }
    });

    // Real-time validation feedback
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        if (field.value.trim()) {
          field.style.borderColor = 'var(--color-success)';
        } else {
          field.style.borderColor = '';
        }
      });
    });
  });
}

function showFormSuccess(form) {
  let successMsg = form.querySelector('.form-success-msg');
  if (!successMsg) {
    successMsg = document.createElement('div');
    successMsg.className = 'ss-alert ss-alert-success form-success-msg';
    successMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Thank you! We\'ll be in touch shortly.</span>';
    form.appendChild(successMsg);
  }
  successMsg.style.display = 'flex';
  setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
}

/* ─── Module Filter Tabs ─────────────────────────────────────── */
function initModuleFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const items = document.querySelectorAll('[data-category]');

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ─── Smooth Scroll ──────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ─── Search Overlay ─────────────────────────────────────────── */
function initSearchOverlay() {
  const trigger = document.querySelector('[data-action="search"]');
  const overlay = document.getElementById('search-overlay');
  if (!trigger || !overlay) return;

  const closeBtn = overlay.querySelector('[data-action="close-search"]');
  const input = overlay.querySelector('input[type="search"]');

  trigger.addEventListener('click', () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => input?.focus(), 100);
  });

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
}

/* ─── Swiper Init (for testimonials) ────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    const testimonialSwiper = document.querySelector('.ss-testimonials-swiper');
    if (testimonialSwiper) {
      new Swiper('.ss-testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
    }
  }
});

/* ─── Dark / Light Theme Toggle ─────────────────────────────── */
(function initTheme() {
  const html = document.documentElement;

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('ss-theme', theme);
    document.querySelectorAll('.ss-theme-icon').forEach(icon => {
      icon.className = 'ss-theme-icon fa-solid ' + (theme === 'dark' ? 'fa-sun' : 'fa-moon');
    });
    document.querySelectorAll('.ss-theme-toggle').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // Apply saved preference immediately
  const saved = localStorage.getItem('ss-theme') || 'light';
  setTheme(saved);

  document.addEventListener('click', e => {
    if (e.target.closest('.ss-theme-toggle')) {
      const current = html.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    }
  });
})();
