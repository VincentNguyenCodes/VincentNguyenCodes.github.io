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

function render(carousel) {
  const id = carousel.id;
  const track = carousel.querySelector('.carousel-track');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const total = track.querySelectorAll('img').length;

  carousel.classList.toggle('is-empty', total === 0);
  carousel.classList.toggle('has-controls', total > 1);

  if (state[id] >= total) state[id] = Math.max(0, total - 1);
  track.style.transform = `translateX(-${state[id] * 100}%)`;

  dotsWrap.innerHTML = '';
  if (total < 2) return;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('span');
    dot.className = i === state[id] ? 'dot active' : 'dot';
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Go to image ${i + 1}`);
    dot.addEventListener('click', () => goTo(id, i));
    dotsWrap.appendChild(dot);
  }
}

function slide(id, dir) {
  const carousel = document.getElementById(id);
  const total = carousel.querySelectorAll('.carousel-track img').length;
  if (!total) return;
  state[id] = (state[id] + dir + total) % total;
  render(carousel);
}

function goTo(id, index) {
  state[id] = index;
  render(document.getElementById(id));
}

document.querySelectorAll('.carousel').forEach(carousel => {
  state[carousel.id] = 0;

  carousel.querySelectorAll('.carousel-track img').forEach(img => {
    img.addEventListener('error', () => {
      img.remove();
      render(carousel);
    });
  });

  carousel.querySelector('.carousel-btn.prev')
    .addEventListener('click', () => slide(carousel.id, -1));
  carousel.querySelector('.carousel-btn.next')
    .addEventListener('click', () => slide(carousel.id, 1));

  render(carousel);
});
