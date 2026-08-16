/* ========== MADE WITH FEELINGS — script.js ========== */

const WA_NUMBER = '917029611358'; // India country code + number

/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
});

function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const SYMBOLS = ['♡', '✦', '✧', '·'];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    size: Math.random() * 10 + 8,
    opacity: Math.random() * 0.25 + 0.05,
    vx: (Math.random() - 0.5) * 0.3,
    vy: -Math.random() * 0.4 - 0.1,
    life: 0,
    maxLife: Math.random() * 300 + 200,
  };
}

for (let i = 0; i < 30; i++) {
  const p = createParticle();
  p.life = Math.random() * p.maxLife;
  particles.push(p);
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    const progress = p.life / p.maxLife;
    const fade = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1;
    ctx.globalAlpha = p.opacity * fade;
    ctx.font = `${p.size}px serif`;
    ctx.fillStyle = '#c8506a';
    ctx.fillText(p.symbol, p.x, p.y);
    p.x += p.vx;
    p.y += p.vy;
    p.life++;
    if (p.life >= p.maxLife) particles[i] = createParticle();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===== TITLE SWAP ===== */
const swapEl = document.getElementById('titleSwap');
const swapWords = [
  'text message.',
  'last-minute wish.',
  'generic caption.',
  'voice note.',
  'simple "happy birthday".',
];
let swapIdx = 0;
setInterval(() => {
  swapEl.style.opacity = '0';
  swapEl.style.transform = 'translateY(-8px)';
  setTimeout(() => {
    swapIdx = (swapIdx + 1) % swapWords.length;
    swapEl.textContent = swapWords[swapIdx];
    swapEl.style.opacity = '1';
    swapEl.style.transform = 'translateY(0)';
  }, 300);
}, 2800);
swapEl.style.transition = 'opacity .3s, transform .3s';

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObs.observe(el));

// Trigger hero immediately
document.querySelectorAll('.hero .reveal').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 150 + i * 130);
});

/* ===== CARD MAGNETIC HOVER ===== */
document.querySelectorAll('.demo-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    card.style.transform = `translateY(-5px) rotateX(${-y}deg) rotateY(${x}deg)`;
    card.style.transformOrigin = 'center center';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== MODAL ===== */
const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTierDisplay = document.getElementById('modalTierDisplay');
let currentTier = '';
let currentPrice = '';

function openOrder(tier, price) {
  currentTier = tier;
  currentPrice = price;
  modalTierDisplay.textContent = `Selected: ${tier} plan — ${price}`;
  modalTierDisplay.style.display = 'block';
  overlay.classList.add('open');
  overlay.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  document.getElementById('m-name').focus();
}

function closeModal() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  clearErrors();
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function clearErrors() {
  ['name','person','occasion'].forEach(f => {
    document.getElementById(`err-${f}`).textContent = '';
    const el = document.getElementById(`m-${f}`);
    if (el) el.classList.remove('error');
  });
}

/* ===== WHATSAPP ORDER ===== */
function sendToWhatsapp() {
  clearErrors();
  const name = document.getElementById('m-name').value.trim();
  const person = document.getElementById('m-person').value.trim();
  const occasion = document.getElementById('m-occasion').value;
  const details = document.getElementById('m-details').value.trim();

  let valid = true;
  if (!name) {
    document.getElementById('err-name').textContent = 'Please enter your name';
    document.getElementById('m-name').classList.add('error');
    valid = false;
  }
  if (!person) {
    document.getElementById('err-person').textContent = 'Please enter their name';
    document.getElementById('m-person').classList.add('error');
    valid = false;
  }
  if (!occasion) {
    document.getElementById('err-occasion').textContent = 'Please choose an occasion';
    document.getElementById('m-occasion').classList.add('error');
    valid = false;
  }
  if (!valid) return;

  const message =
`Hey! I want to place an order on Made With Feelings 💌

*Name:* ${name}
*For:* ${person}
*Occasion:* ${occasion}
*Plan:* ${currentTier} — ${currentPrice}${details ? `\n*Details:* ${details}` : ''}

Looking forward to it! ♡`;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encoded}`;
  window.open(waUrl, '_blank');
  closeModal();
}

/* ===== PRICING CARD CLICK (whole card opens modal) ===== */
document.querySelectorAll('.pricing-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform .3s, box-shadow .3s';
  });
});

/* ===== SMOOTH NAV LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
