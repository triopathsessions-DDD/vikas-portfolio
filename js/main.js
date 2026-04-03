/* ================================================================
   VIKAS NERUSU PORTFOLIO — main.js
   Multi-page version: separate HTML files per page
   ================================================================ */

'use strict';

/* ——— CANDIDATE DATA ——— */
const CANDIDATE = {
  phone:    '13319981812',
  email:    'saivenkatavikasnerusu@gmail.com',
  location: 'Chicago, IL, USA',
  cvFile:   'assets/Business analyst_Vikas_2+ Years Exp.pdf',
  cvDownloadName: 'Sai_Venkata_Vikas_Nerusu_BA_Resume.pdf',
};

const WA_MESSAGE =
  'Hi, I came across your profile and found your background interesting. ' +
  'We have an opportunity that aligns with your experience. ' +
  'Would you be open to discussing this further?';

const TYPED_ROLES = [
  'Business Analyst',
  'Data Analyst',
  'BI Developer',
  'SQL Expert',
  'Process Optimizer',
];

/* ================================================================
   NAVBAR SCROLL EFFECT
   ================================================================ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ================================================================
   HAMBURGER MENU
   ================================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('navMenu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-container') && menu.classList.contains('open')) {
      menu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ================================================================
   TYPEWRITER EFFECT (Home page only)
   ================================================================ */
function initTypewriter() {
  const el = document.getElementById('typingText');
  if (!el) return;

  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;

  function tick() {
    const current = TYPED_ROLES[roleIdx];
    el.textContent = deleting
      ? current.slice(0, charIdx - 1)
      : current.slice(0, charIdx + 1);

    deleting ? charIdx-- : charIdx++;

    let delay = deleting ? 55 : 95;
    if (!deleting && charIdx === current.length) { delay = 2200; deleting = true; }
    else if (deleting && charIdx === 0)          { deleting = false; roleIdx = (roleIdx + 1) % TYPED_ROLES.length; delay = 380; }

    setTimeout(tick, delay);
  }
  tick();
}

/* ================================================================
   PAGE ENTRANCE ANIMATIONS
   ================================================================ */
function initPageAnimations() {
  const pageId = document.querySelector('.page')?.id?.replace('page-', '');
  if (!pageId) return;

  function stagger(selector, x, y, base, step) {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity   = '0';
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = 'none';
      setTimeout(() => {
        el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'translate(0,0)';
      }, base + i * step);
    });
  }

  switch (pageId) {
    case 'experience': stagger('.tl-item',   -18, 0,  80, 160); break;
    case 'techstack':  stagger('.tech-card',   0, 18, 60,  80); break;
    case 'about':      stagger('.hl-card',     0, 14, 220, 90); break;
    case 'education':
      stagger('.edu-card',  0, 16,  80, 120);
      stagger('.cert-card', 0, 14, 180,  90);
      break;
  }
}

/* ================================================================
   DOWNLOAD CV
   ================================================================ */
function downloadCV() {
  const a    = document.createElement('a');
  a.href     = CANDIDATE.cvFile;
  a.download = CANDIDATE.cvDownloadName;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
window.downloadCV = downloadCV;

/* ================================================================
   COPYRIGHT — dynamic (India → Pvt Ltd, others → LLC)
   ================================================================ */
function setCopyright() {
  const el = document.getElementById('copyrightText');
  if (!el) return;
  const entity = /india/i.test(CANDIDATE.location)
    ? 'Triopath Careers Pvt Ltd'
    : 'Triopath Careers LLC';
  el.innerHTML = `All rights reserved &copy; ${new Date().getFullYear()} ${entity}`;
}

/* ================================================================
   WHATSAPP LINK — built from candidate data
   ================================================================ */
function buildWhatsAppLinks() {
  const url = `https://wa.me/${CANDIDATE.phone}?text=${encodeURIComponent(WA_MESSAGE)}`;
  document.querySelectorAll('.fc-btn.whatsapp, [data-wa]').forEach(el => { el.href = url; });
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHamburger();
  initTypewriter();
  initPageAnimations();
  setCopyright();
  buildWhatsAppLinks();
});
