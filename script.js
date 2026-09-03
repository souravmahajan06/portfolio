// script.js - Portfolio interactivity

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  // Initialize theme based on localStorage or OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.checked = currentTheme === 'dark';

  themeToggle.addEventListener('change', () => {
    const theme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
    document.querySelector('.nav-links')?.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  });
});

// Mobile navigation and scroll position feedback.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
}

const pageSections = [...document.querySelectorAll('section[id]')];
const sectionLinks = [...document.querySelectorAll('.nav-links a')];
const progressBar = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.back-to-top');

const updateScrollUI = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = `${progress}%`;
  document.querySelector('.navbar')?.classList.toggle('scrolled', window.scrollY > 20);
  backToTop?.classList.toggle('visible', window.scrollY > 500);
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    sectionLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-25% 0px -60% 0px' });
pageSections.forEach((section) => sectionObserver.observe(section));

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Contact form validation and mailto submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.elements['name'].value.trim();
    const email = this.elements['email'].value.trim();
    const message = this.elements['message'].value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    const subject = encodeURIComponent('Portfolio Contact: ' + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:souravmahajan996@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Live Interactive Background
document.addEventListener('mousemove', (e) => {
  // Get percentage of mouse position across the viewport
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  
  // Set custom CSS variables on the root element
  document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// Give project previews a subtle depth response on pointer devices.
document.querySelectorAll('.project-card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    if (window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches) return;
    const bounds = card.getBoundingClientRect();
    const rotateY = ((e.clientX - bounds.left) / bounds.width - 0.5) * 5;
    const rotateX = ((e.clientY - bounds.top) / bounds.height - 0.5) * -5;
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rotate-x', '0deg');
    card.style.setProperty('--rotate-y', '0deg');
  });
});
