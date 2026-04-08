/* ─────────────────────────────────────────
   DG Company · main.js v2
   Sectores dinámicos + URL params + Form
───────────────────────────────────────── */

// ── NAV SCROLL ──────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── NAV MOBILE ──────────────────────────
function toggleMenu() {
  document.getElementById('navMobile').classList.toggle('open');
}

// ── SMOOTH SCROLL ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
      document.getElementById('navMobile').classList.remove('open');
    }
  });
});

// ── SECTOR TABS ─────────────────────────
const SECTORES = ['inmobiliarias','retail','salud','restaurantes','educacion','finanzas'];

function switchSector(sector) {
  if (!SECTORES.includes(sector)) sector = 'inmobiliarias';

  // actualiza tabs
  document.querySelectorAll('.stab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sector === sector);
  });

  // muestra/oculta paneles
  SECTORES.forEach(s => {
    const panel = document.getElementById('panel-' + s);
    if (!panel) return;
    panel.classList.toggle('hidden', s !== sector);
    panel.classList.remove('highlighted');
  });

  // actualiza URL sin recargar
  const url = new URL(window.location);
  url.searchParams.set('sector', sector);
  history.replaceState(null, '', url);
}

// ── URL PARAM → highlight sector ────────
function initFromURL() {
  const params = new URLSearchParams(window.location.search);
  const sector  = params.get('sector');
  const utm     = params.get('utm_source') || '';
  const campaign= params.get('utm_campaign') || '';

  // rellena campos ocultos del formulario
  const fs = document.getElementById('f_utm_source');
  const fc = document.getElementById('f_utm_campaign');
  const fse= document.getElementById('f_utm_sector');
  if (fs) fs.value = utm;
  if (fc) fc.value = campaign;
  if (fse) fse.value = sector || '';

  if (sector && SECTORES.includes(sector)) {
    switchSector(sector);

    // pequeño delay para que el DOM esté listo y luego scroll + highlight
    setTimeout(() => {
      const sectoresEl = document.getElementById('sectores');
      if (sectoresEl) {
        const top = sectoresEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      const panel = document.getElementById('panel-' + sector);
      if (panel) {
        panel.classList.add('highlighted');
        // quita el highlight después de 3s
        setTimeout(() => panel.classList.remove('highlighted'), 3000);
      }
    }, 400);
  } else {
    // activa el primer sector por defecto
    switchSector('inmobiliarias');
  }
}

// ── PRE-SELECT SECTOR EN FORMULARIO ─────
function preselectSector(sector) {
  const select = document.getElementById('sectorSelect');
  if (select) {
    select.value = sector;
    // scroll al formulario
    setTimeout(() => {
      const form = document.getElementById('contacto');
      if (form) {
        const top = form.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);
  }
}

// ── FAQ ACORDEÓN ────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── FORMULARIO WEBHOOK ──────────────────
const form      = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled    = true;

    const data = new FormData(form);
    data.append('timestamp',   new Date().toISOString());
    data.append('page_url',    window.location.href);
    data.append('page_sector', new URLSearchParams(window.location.search).get('sector') || '');

    try {
      const res = await fetch(form.action, { method: 'POST', body: data });
      if (res.ok || res.status === 200 || res.status === 201) {
        submitBtn.textContent = '✓ Cotización enviada — te contactamos pronto';
        submitBtn.classList.add('success');
        form.reset();
        submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // GA4
        if (typeof gtag === 'function') {
          gtag('event', 'lead_form_submit', { event_category: 'leads', event_label: 'landing_multisector' });
        }
      } else throw new Error('server');
    } catch {
      submitBtn.textContent = 'Error — escríbenos por WhatsApp';
      submitBtn.classList.add('error');
      submitBtn.disabled = false;
    }
  });
}

// ── ANIMACIONES DE ENTRADA ───────────────
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.serv-card, .process-step, .stat-item, .contact-info, .contact-form')
    .forEach((el, i) => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.transition = `opacity .45s ease ${i * .06}s, transform .45s ease ${i * .06}s`;
      observer.observe(el);
    });
}

// ── INIT ─────────────────────────────────
document.addEventListener('DOMContentLoaded', initFromURL);
