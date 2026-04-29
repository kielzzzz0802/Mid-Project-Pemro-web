/* Main JavaScript for site interaction */

const DOM = {
  navToggle: document.querySelector('.toggle-menu'),
  navLinks: document.querySelector('.nav-links'),
  navAnchors: document.querySelectorAll('.nav-links a'),
  lightbox: document.querySelector('.lightbox'),
  lightboxClose: document.querySelector('.lightbox-close'),
  blogContainer: document.querySelector('#blog-posts'),
  contactForm: document.querySelector('#contact-form'),
  contactResult: document.querySelector('#contact-result'),
  currentYear: document.querySelector('#current-year'),
};

function setActiveNav() {
  const path = window.location.pathname.toLowerCase();
  const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  DOM.navAnchors.forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href && href.toLowerCase() === page) {
      anchor.classList.add('active');
    } else {
      anchor.classList.remove('active');
    }
  });
}

function setupMobileNav() {
  if (!DOM.navToggle) return;
  DOM.navToggle.addEventListener('click', () => {
    DOM.navLinks.classList.toggle('open');
  });

  DOM.navAnchors.forEach((link) => {
    link.addEventListener('click', () => {
      DOM.navLinks.classList.remove('open');
    });
  });
}

function initLightbox() {
  const imageElements = document.querySelectorAll('.photo');
  if (!DOM.lightbox) return;

  imageElements.forEach((photo) => {
    photo.addEventListener('click', () => {
      const src = photo.dataset.src;
      const caption = photo.dataset.caption || '';
      const mediaContainer = DOM.lightbox.querySelector('.lightbox-media');
      const captionEl = mediaContainer.querySelector('.caption');

      // Clear previous media
      mediaContainer.innerHTML = '';

      if (src.endsWith('.mp4')) {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        mediaContainer.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = src;
        img.alt = caption;
        mediaContainer.appendChild(img);
      }

      captionEl.textContent = caption;
      DOM.lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    DOM.lightbox.classList.remove('open');
    document.body.style.overflow = '';
    const mediaContainer = DOM.lightbox.querySelector('.lightbox-media');
    if (mediaContainer) mediaContainer.innerHTML = '';
  };

  DOM.lightboxClose?.addEventListener('click', closeLightbox);
  DOM.lightbox?.addEventListener('click', (event) => {
    if (event.target === DOM.lightbox) {
      closeLightbox();
    }
  });
}

function renderBlogPosts() {
  if (!DOM.blogContainer) return;

  const posts = [
    {
      title: 'Prestasi Catur SMP: Belajar Berpikir Strategis',
      slug: 'catur',
      date: '2026-04-26',
      image: 'image/Catur.jpg',
      summary: 'Perjalanan prestasi saya dimulai sejak bangku SMP. Saat itu, saya mengikuti perlombaan catur dan berhasil masuk ke dalam 10 besar.'
    },
    {
      title: 'Lomba Desain Grafis SMP: Mengembangkan Kreativitas',
      slug: 'desain',
      date: '2026-04-26',
      image: 'image/SuroCupp.jpeg',
      summary: 'Selain catur, sewaktu SMP saya juga mengikuti lomba desain grafis.'
    },
    {
      title: 'Hobi Bermain Alat Musik: Ekspresi Diri melalui Nada',
      slug: 'musik',
      date: '2026-04-26',
      image: 'image/jazz.jpeg',
      summary: 'Selain prestasi akademik dan teknologi, saya memiliki hobi bermain alat musik yang menjadi cara favorit saya untuk melepas penat dan mengekspresikan diri.'
    },
    {
      title: 'Juara SURO CUP SMA: Kemenangan di Bidang Robotika',
      slug: 'robotika',
      date: '2026-04-26',
      image: 'image/SuroCup.jpeg',
      summary: 'Salah satu prestasi terbesar semasa SMA adalah mengikuti ajang robotika SURO CUP oleh UKM Robotika Universitas Sam Ratulangi.'
    }
  ];

  DOM.blogContainer.innerHTML = '';

  posts.forEach((post) => {
    const wrapper = document.createElement('article');
    wrapper.className = 'card post';

    const header = document.createElement('div');
    header.className = 'post-header';

    const title = document.createElement('h3');
    title.textContent = post.title;

    const meta = document.createElement('small');
    meta.textContent = new Date(post.date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Add image if available
    if (post.image) {
      const img = document.createElement('img');
      img.src = post.image;
      img.alt = post.title;
      img.className = 'post-img';
      header.appendChild(img);
    }
    header.append(title, meta);

    const body = document.createElement('div');
    body.className = 'post-body';

    const excerpt = document.createElement('p');
    excerpt.textContent = post.summary;

    const fullText = document.createElement('p');
    fullText.textContent = post.content;
    fullText.style.display = 'none';

    const readMoreLink = document.createElement('a');
    readMoreLink.href = post.slug + '.html';
    readMoreLink.className = 'read-more-link';
    readMoreLink.textContent = 'Baca selengkapnya';

    body.append(excerpt, readMoreLink);

    wrapper.append(header, body);
    DOM.blogContainer.appendChild(wrapper);
  });
}

function initContactForm() {
  if (!DOM.contactForm) return;

  DOM.contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(DOM.contactForm);
    const entry = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
      time: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem('contactEntries') || '[]');
    stored.push(entry);
    localStorage.setItem('contactEntries', JSON.stringify(stored));

    DOM.contactResult.textContent = `Terima kasih, ${entry.name || 'teman'}. Pesan Anda telah disimpan.`;
    DOM.contactResult.style.opacity = '1';
    setTimeout(() => {
      DOM.contactResult.style.opacity = '0';
    }, 4000);

    DOM.contactForm.reset();
  });
}

function setCurrentYear() {
  if (DOM.currentYear) {
    DOM.currentYear.textContent = new Date().getFullYear();
  }
}
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-bg';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.speedY = Math.random() * 0.8 - 0.4;
      this.color = `rgba(95, 205, 228, ${Math.random() * 0.4 + 0.1})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 70; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(95, 205, 228, ${0.15 - dist/800})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .card, .post');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.15
  });

  reveals.forEach(reveal => {
    reveal.classList.add('reveal');
    revealObserver.observe(reveal);
  });
}

function init() {
  setActiveNav();
  setupMobileNav();
  initLightbox();
  renderBlogPosts();
  initContactForm();
  setCurrentYear();
  initScrollReveal();
  initParticles();
}

document.addEventListener('DOMContentLoaded', init);
