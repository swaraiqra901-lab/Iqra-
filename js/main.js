/* ============================================
   IQRA WEB STUDIO — Main JS
   ============================================ */
(function () {
  'use strict';

  const WA_NUMBER = '923294228301';
  const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

  /* ---------- 12 Demo feedback cards ---------- */
  const testimonials = [
    { text: 'The website design looks very modern and professional. I really liked the clean layout and mobile experience.', author: 'Sample Client' },
    { text: 'I wanted a simple but professional website for my business, and the final design looked excellent.', author: 'Sample Business Client' },
    { text: 'The website is beautiful, easy to navigate and looks great on my phone.', author: 'Sample Client' },
    { text: 'The overall design was clean and attractive. I especially liked the professional presentation of the services.', author: 'Sample Client' },
    { text: 'The website gave my business a much more professional online presence.', author: 'Sample Business Client' },
    { text: 'I loved the modern design and smooth layout. Everything feels organized and easy to understand.', author: 'Sample Client' },
    { text: 'The mobile version looks fantastic. The website is easy to use and the information is presented clearly.', author: 'Sample Client' },
    { text: 'The design was customized nicely for the business. It looks professional without feeling complicated.', author: 'Sample Business Client' },
    { text: 'I really liked the portfolio and service sections. The website gives a strong first impression.', author: 'Sample Client' },
    { text: 'The website has a premium look and the overall layout is very clean and modern.', author: 'Sample Business Client' },
    { text: 'The design process was simple and the final website looked polished and professional.', author: 'Sample Client' },
    { text: 'A beautiful and responsive website design with a professional feel. I especially liked how well it works on mobile.', author: 'Sample Client' }
  ];

  const starsHTML = '★★★★★';
  const grid = document.getElementById('feedbackGrid');
  if (grid) {
    grid.innerHTML = testimonials.map((t, i) => {
      const initials = t.author.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      return `
        <article class="feedback-card glass reveal" style="transition-delay:${(i % 3) * 80}ms">
          <div class="feedback-stars" aria-label="5 out of 5 stars">${starsHTML}</div>
          <p class="feedback-text">“${t.text}”</p>
          <div class="feedback-author">
            <span class="avatar" aria-hidden="true">${initials}</span>
            <div>
              <strong>${t.author}</strong>
              <span>Sample feedback</span>
            </div>
          </div>
        </article>`;
    }).join('');
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const toggleMenu = (force) => {
    const open = force !== undefined ? force : !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', open);
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  };
  hamburger.addEventListener('click', () => toggleMenu());
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') toggleMenu(false); });

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"], [data-scroll]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetSel = this.getAttribute('data-scroll') || this.getAttribute('href');
      if (!targetSel || targetSel === '#' || targetSel.charAt(0) !== '#') return;
      const target = document.querySelector(targetSel);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ---------- Portfolio filter ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      projects.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  /* ---------- Contact form -> WhatsApp ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const whatsapp = (data.get('whatsapp') || '').toString().trim();
      const details = (data.get('details') || '').toString().trim();

      formNote.classList.remove('success', 'error');

      if (!name || !whatsapp || !details) {
        formNote.textContent = 'Please fill in your name, WhatsApp number and project details.';
        formNote.classList.add('error');
        return;
      }

      const business = (data.get('business') || '').toString().trim();
      const type = (data.get('type') || '').toString().trim();
      const pages = (data.get('pages') || '').toString().trim();
      const budget = (data.get('budget') || '').toString().trim();

      let msg = `Hello Iqra Web Studio, I would like to request a website project.\n\n`;
      msg += `• Full Name: ${name}\n`;
      if (business) msg += `• Business Name: ${business}\n`;
      msg += `• WhatsApp Number: ${whatsapp}\n`;
      if (type) msg += `• Website Type: ${type}\n`;
      if (pages) msg += `• Required Pages: ${pages}\n`;
      if (budget) msg += `• Budget: ${budget}\n`;
      msg += `• Project Details: ${details}`;

      formNote.textContent = 'Opening WhatsApp...';
      formNote.classList.add('success');
      window.open(waLink(msg), '_blank', 'noopener');
    });
  }
})();
