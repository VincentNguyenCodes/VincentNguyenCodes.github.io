// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Scroll reveal
const revealEls = document.querySelectorAll(
  '.project-row, .stat-card, .skill-group, .about-text, .contact-item'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealEls.forEach(el => observer.observe(el));

// Carousel
const state = {};

function slide(id, dir) {
  const carousel = document.getElementById(id);
  const track = carousel.querySelector('.carousel-track');
  const imgs = track.querySelectorAll('img');
  if (!state[id]) state[id] = 0;
  state[id] = (state[id] + dir + imgs.length) % imgs.length;
  track.style.transform = `translateX(-${state[id] * 100}%)`;
  updateDots(id, imgs.length);
}

function goTo(id, index) {
  const carousel = document.getElementById(id);
  const track = carousel.querySelector('.carousel-track');
  const imgs = track.querySelectorAll('img');
  state[id] = index;
  track.style.transform = `translateX(-${index * 100}%)`;
  updateDots(id, imgs.length);
}

function updateDots(id, total) {
  const dots = document.querySelectorAll(`#dots-${id} .dot`);
  dots.forEach((d, i) => d.classList.toggle('active', i === state[id]));
}
