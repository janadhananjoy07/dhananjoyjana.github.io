/* =====================================================
   DHANANJOY JANA — PORTFOLIO JAVASCRIPT
   ===================================================== */

'use strict';

// ===================== LOADER =====================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 800);
});

// ===================== CUSTOM CURSOR =====================
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice()) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
}

// ===================== PARTICLES =====================
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const colors = ['#4facfe', '#b794f4', '#76e4f7', '#68d391', '#f093fb'];

  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      animation-duration: ${Math.random() * 15 + 8}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

createParticles();

// ===================== TYPED TEXT =====================
const phrases = [
  'DevOps Engineer',
  'Linux Enthusiast',
  'Script Automator',
  'Cloud Learner',
  'Problem Solver',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeText() {
  if (!typedEl) return;

  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeText, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeText, speed);
}

setTimeout(typeText, 1000);

// ===================== NAVBAR =====================
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  updateBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav link based on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset + 120;

  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[data-section="${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ===================== REVEAL ON SCROLL =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===================== THEME TOGGLE =====================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

let currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
  localStorage.setItem('theme', currentTheme);
});

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  if (theme === 'dark') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }
}

// ===================== BACK TO TOP =====================
const backToTop = document.getElementById('back-to-top');

function updateBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================== CONTACT FORM =====================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const submitBtn = document.getElementById('contact-submit');

if (window.emailjs) {
  emailjs.init('5LlSpQOLbRgozUIoa');
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

const name = document.getElementById('contact-name').value.trim();
const email = document.getElementById('contact-email-input').value.trim();
let subject = document.getElementById('contact-subject').value.trim();
const message = document.getElementById('contact-message').value.trim();

if (!name || !email || !message) {
  shakeForm();
  return;
}

// fallback subject
if (!subject) {
  subject = "No Subject";
  document.getElementById('contact-subject').value = subject;
}

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

   emailjs.send('service_6uc5rjl', 'template_svxagfd', {
  from_name: name,
  from_email: email,
  subject: subject,
  message: message
}, '5LlSpQOLbRgozUIoa')
.then(() => {
  formSuccess.classList.add('show');
  contactForm.reset();
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  submitBtn.disabled = false;
  setTimeout(() => formSuccess.classList.remove('show'), 5000);
})
.catch(() => {
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  submitBtn.disabled = false;
  alert('Oops! Something went wrong.');
});
  });
}

function shakeForm() {
  contactForm.style.animation = 'shake 0.4s ease';
  setTimeout(() => contactForm.style.animation = '', 400);
}

// Add shake keyframe
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(shakeStyle);

// ===================== SMOOTH SECTION HIGHLIGHT =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===================== SKILL CARD TILT EFFECT =====================
document.querySelectorAll('.skill-card, .project-card, .ai-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===================== TERMINAL AUTO SCROLL =====================
// Make terminal look alive
const terminalLines = document.querySelectorAll('.terminal-line');
terminalLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.4s ease';
    line.style.opacity = '1';
  }, 1200 + i * 350);
});

// ===================== STATS COUNTER =====================
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 40;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.round(current) + (element.dataset.suffix || '+');
  }, 40);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNums = entry.target.querySelectorAll('.stat-num');
      statNums.forEach(stat => {
        const val = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/\d/g, '');
        stat.dataset.suffix = suffix;
        animateCounter(stat, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===================== PAGE LOADED =====================
console.log('%c✨ Dhananjoy Jana Portfolio', 'color: #4facfe; font-size: 1.5rem; font-weight: bold;');
console.log('%cBuilding skills today for scalable systems tomorrow.', 'color: #b794f4; font-size: 0.9rem;');
