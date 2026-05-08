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

function initCursorParticles() {
  // Enable only for fine pointer devices and when cursor is available
  const finePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!finePointer) return;

  // Avoid duplicate canvases if script is executed multiple times
  if (document.getElementById('cursor-effects-canvas')) return;

  // Canvas overlay
  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-effects-canvas';
  const ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);

  // Optional custom cursor (dot)
  if (!document.getElementById('cursor-dot')) {
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);
  }

  let w = 0;
  let h = 0;
  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Mode control (rotate through modes). Can be changed to a fixed mode.
  // 1 = glow halo, 2 = custom dot + soft particles, 3 = ripple grid lines
  const MODES = [1, 2, 3];
  let modeIndex = 0;
  let mode = MODES[modeIndex];
  let lastModeSwitch = performance.now();
  const MODE_DURATION_MS = 5500;

  // Cursor state
  let mouseX = w / 2;
  let mouseY = h / 2;
  let lastX = mouseX;
  let lastY = mouseY;

  // Halo / dot parameters
  const halo = {
    x: mouseX,
    y: mouseY,
    targetX: mouseX,
    targetY: mouseY,
    radius: 42,
  };

  // Soft particles
  const particles = [];
  const MAX_PARTICLES = 140;

  // Ripples
  const ripples = [];
  const MAX_RIPPLES = 24;

  const COLOR_A = { r: 95, g: 205, b: 228 };
  const COLOR_B = { r: 162, g: 119, b: 255 };

  const rgba = (c, a) => `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`;

  const spawnParticles = (x, y, intensity = 1) => {
    if (particles.length >= MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES + 1);

    const count = Math.max(1, Math.floor(3 + intensity));
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const color = t < 0.55 ? COLOR_A : COLOR_B;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.6,
        vy: (Math.random() - 0.5) * 2.6,
        r: Math.random() * 2.4 + 0.9,
        life: 1,
        decay: Math.random() * 0.028 + 0.012,
        color,
      });
    }
  };

  const spawnRipple = (x, y, speed = 1) => {
    if (ripples.length >= MAX_RIPPLES) ripples.splice(0, ripples.length - MAX_RIPPLES + 1);
    ripples.push({
      x,
      y,
      r: 0,
      life: 1,
      speed: 2.2 * speed,
    });
  };

  window.addEventListener(
    'mousemove',
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 1) {
        // keep dot in sync
        halo.targetX = mouseX;
        halo.targetY = mouseY;

        if (mode === 2) {
          spawnParticles(mouseX, mouseY, dist / 14);
        }
        if (mode === 3) {
          // spawn ripple occasionally based on distance
          if (dist > 6) spawnRipple(mouseX, mouseY, dist / 10);
        }

        lastX = mouseX;
        lastY = mouseY;
      }
    },
    { passive: true }
  );

  const tick = () => {
    requestAnimationFrame(tick);

    if (document.visibilityState === 'hidden') return;

    const now = performance.now();
    if (now - lastModeSwitch > MODE_DURATION_MS) {
      modeIndex = (modeIndex + 1) % MODES.length;
      mode = MODES[modeIndex];
      lastModeSwitch = now;

      // Clear previous visuals when switching modes
      particles.length = 0;
      ripples.length = 0;
    }

    ctx.clearRect(0, 0, w, h);

    // Smooth halo follow
    halo.x += (halo.targetX - halo.x) * 0.18;
    halo.y += (halo.targetY - halo.y) * 0.18;

    // Custom cursor dot position
    const dot = document.getElementById('cursor-dot');
    if (dot) {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    if (mode === 1) {
      // Glow halo only
      const t = (Math.sin(now / 220) + 1) / 2; // 0..1
      const a1 = 0.45 + t * 0.25;
      const a2 = 0.18 + t * 0.12;

      ctx.beginPath();
      ctx.fillStyle = rgba(COLOR_A, a1);
      ctx.arc(halo.x, halo.y, halo.radius * 0.55, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = rgba(COLOR_B, a2);
      ctx.arc(halo.x, halo.y, halo.radius * (0.55 + 0.35 * t), 0, Math.PI * 2);
      ctx.fill();

      // small core dot
      ctx.beginPath();
      ctx.fillStyle = rgba(COLOR_A, 0.85);
      ctx.arc(halo.x, halo.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    } else if (mode === 2) {
      // Dot + soft particles
      spawnParticles(halo.x, halo.y, 0.15); // gentle continuous spawn

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.max(0, Math.min(1, p.life));
        ctx.beginPath();
        ctx.fillStyle = rgba(p.color, alpha * 0.55);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Halo around dot
      const haloAlpha = 0.3;
      ctx.beginPath();
      ctx.fillStyle = rgba(COLOR_B, haloAlpha);
      ctx.arc(halo.x, halo.y, 36, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Mode 3: Ripple grid lines
      const gridSize = 48; // spacing
      const maxR = Math.hypot(w, h);

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += r.speed;
        r.life -= 0.018;
        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        const intensity = Math.max(0, r.life);

        // Draw concentric ring + grid-like distortion
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(COLOR_A, intensity * 0.22);
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.stroke();

        // Light grid ripple lines
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';

        // vertical lines
        const startX = Math.floor((r.x - maxR) / gridSize) * gridSize;
        const endX = Math.ceil((r.x + maxR) / gridSize) * gridSize;
        for (let gx = startX; gx <= endX; gx += gridSize) {
          const dx = gx - r.x;
          const dist = Math.abs(Math.hypot(dx, 0) - r.r);
          const a = Math.max(0, 1 - dist / 18) * intensity * 0.35;
          if (a <= 0.001) continue;

          ctx.strokeStyle = rgba(COLOR_B, a);
          ctx.beginPath();
          ctx.moveTo(gx, 0);
          ctx.lineTo(gx, h);
          ctx.stroke();
        }

        // horizontal lines
        const startY = Math.floor((r.y - maxR) / gridSize) * gridSize;
        const endY = Math.ceil((r.y + maxR) / gridSize) * gridSize;
        for (let gy = startY; gy <= endY; gy += gridSize) {
          const dy = gy - r.y;
          const dist = Math.abs(Math.hypot(0, dy) - r.r);
          const a = Math.max(0, 1 - dist / 18) * intensity * 0.35;
          if (a <= 0.001) continue;

          ctx.strokeStyle = rgba(COLOR_A, a);
          ctx.beginPath();
          ctx.moveTo(0, gy);
          ctx.lineTo(w, gy);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Small core
      ctx.beginPath();
      ctx.fillStyle = rgba(COLOR_A, 0.7);
      ctx.arc(halo.x, halo.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  tick();
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
  initCursorParticles();
}


document.addEventListener('DOMContentLoaded', init);
