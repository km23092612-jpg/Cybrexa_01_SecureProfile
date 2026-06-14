/**
 * SecureProfile · script.js
 * Matrix canvas · Nav scroll · Skill bars · Scroll reveal · Contact form
 * XSS Prevention: All user-facing output uses textContent / DOMPurify pattern
 */

/* ── SECURITY: sanitize helper ───────────────────────────── */
function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/* ── MATRIX RAIN ──────────────────────────────────────────── */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = 'アイウエオカキクケコ01アBCDEF</>{}[];\\|=+*#@!$%^&SECURE';
  const fontSize = 13;
  let columns, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops   = new Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(7,13,26,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FFD1';
    ctx.font      = `${fontSize}px JetBrains Mono, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  resize();
  window.addEventListener('resize', resize);
  setInterval(draw, 50);
})();


/* ── NAV: scroll effect + hamburger ─────────────────────── */
(function initNav() {
  const nav       = document.getElementById('nav');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav__links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu on link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', false);
    });
  });
})();


/* ── SKILL BARS: animate on scroll ──────────────────────── */
(function initSkillBars() {
  const bars = document.querySelectorAll('.bar__fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const width = el.dataset.width || '0';
        el.style.width = `${width}%`;
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
})();


/* ── SCROLL REVEAL ───────────────────────────────────────── */
(function initReveal() {
  // Mark elements for reveal
  const targets = [
    '.hero__eyebrow',
    '.hero__name',
    '.hero__title',
    '.hero__bio',
    '.hero__cta',
    '.hero__badges',
    '.about__text',
    '.about__roadmap',
    '.skill-card',
    '.project-card',
    '.contact__info',
    '.contact__form',
    '.section__title',
    '.section__eyebrow',
  ];

  document.querySelectorAll(targets.join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ── CONTACT FORM: validate + submit ─────────────────────── */
(function initContactForm() {
  const form        = document.getElementById('contactForm');
  const nameInput   = document.getElementById('name');
  const emailInput  = document.getElementById('email');
  const msgInput    = document.getElementById('message');
  const nameError   = document.getElementById('nameError');
  const emailError  = document.getElementById('emailError');
  const msgError    = document.getElementById('messageError');
  const successBox  = document.getElementById('formSuccess');

  if (!form) return;

  function setError(input, errorEl, msg) {
    errorEl.textContent = msg;   // textContent is XSS-safe
    if (msg) input.classList.add('error');
    else     input.classList.remove('error');
  }

  function validateEmail(value) {
    // RFC 5322-ish simple check
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
  }

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, nameError, 'Name is required.');
      valid = false;
    } else {
      setError(nameInput, nameError, '');
    }

    if (!emailInput.value.trim()) {
      setError(emailInput, emailError, 'Email is required.');
      valid = false;
    } else if (!validateEmail(emailInput.value)) {
      setError(emailInput, emailError, 'Enter a valid email address.');
      valid = false;
    } else {
      setError(emailInput, emailError, '');
    }

    if (!msgInput.value.trim()) {
      setError(msgInput, msgError, 'Message cannot be empty.');
      valid = false;
    } else if (msgInput.value.trim().length < 10) {
      setError(msgInput, msgError, 'Message should be at least 10 characters.');
      valid = false;
    } else {
      setError(msgInput, msgError, '');
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;

    // Simulate send (replace with Formspree/EmailJS/backend endpoint)
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      successBox.removeAttribute('hidden');
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled = false;
      setTimeout(() => successBox.setAttribute('hidden', ''), 5000);
    }, 1200);
  });

  // Clear errors on input
  [nameInput, emailInput, msgInput].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorId = input.id + 'Error';
      const errEl = document.getElementById(errorId);
      if (errEl) errEl.textContent = '';
    });
  });
})();


/* ── ACTIVE NAV LINK on scroll ───────────────────────────── */
(function initActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}` ? '#00FFD1' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();
