/* ─────────────────────────────────────────
   DG Company · main.js
   Formulario + Nav + FAQ + Webhook
───────────────────────────────────────── */

// ── NAV: scroll effect ──────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── NAV: hamburger mobile ───────────────
function toggleMenu() {
  const mobile = document.getElementById('navMobile');
  mobile.classList.toggle('open');
}

// ── SMOOTH SCROLL ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // altura nav
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // cierra menú mobile si está abierto
      document.getElementById('navMobile').classList.remove('open');
    }
  });
});

// ── FAQ: acordeón ───────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // cierra todos
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    // abre el actual si no estaba abierto
    if (!isOpen) item.classList.add('open');
  });
});

// ── FORMULARIO: submit con webhook ──────
const form     = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.textContent = 'Enviando...';
    submitBtn.classList.add('sending');
    submitBtn.disabled = true;

    const data = new FormData(form);
    // Agrega timestamp y página origen
    data.append('timestamp',   new Date().toISOString());
    data.append('page_origin', window.location.href);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body:   data
      });

      if (res.ok || res.status === 200 || res.status === 201) {
        submitBtn.textContent = '✓ Cotización enviada — te contactamos pronto';
        submitBtn.classList.remove('sending');
        submitBtn.classList.add('success');
        form.reset();

        // Scroll suave al botón
        submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // GA4 event (si está instalado)
        if (typeof gtag === 'function') {
          gtag('event', 'lead_form_submit', {
            event_category: 'leads',
            event_label:    'landing_inmobiliaria'
          });
        }
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      submitBtn.textContent = 'Error — escríbenos por WhatsApp';
      submitBtn.classList.remove('sending');
      submitBtn.classList.add('error');
      submitBtn.disabled = false;
      console.error('Form error:', err);
    }
  });
}

// ── ANIMACIÓN DE ENTRADA (Intersection Observer) ──
const fadeTargets = document.querySelectorAll(
  '.product-card, .process-step, .stat-item, .contact-info, .contact-form'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeTargets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
    observer.observe(el);
  });
}
