const navToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');
const heroMedia = document.querySelector('.hero-image');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Smoothly offset scrolling for sticky header when jumping to sections.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight + 2;

    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});

const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealElements.forEach((el) => observer.observe(el));

window.addEventListener('scroll', () => {
  if (!heroMedia) return;
  const offset = window.scrollY * 0.12;
  heroMedia.style.transform = `scale(1.04) translateY(${Math.min(offset, 36)}px)`;
});

document.querySelectorAll('.ripple').forEach((button) => {
  button.addEventListener('click', (event) => {
    const bounds = button.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;

    button.style.setProperty('--ripple-x', `${x}px`);
    button.style.setProperty('--ripple-y', `${y}px`);
    button.style.setProperty('--ripple-size', `${Math.max(bounds.width, bounds.height)}px`);

    button.classList.remove('is-rippling');
    void button.offsetWidth;
    button.classList.add('is-rippling');
  });
});
