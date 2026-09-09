(function () {
  document.documentElement.classList.add('js');
  function readPreference(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (error) { return fallback; }
  }
  function writePreference(key, value) {
    try { localStorage.setItem(key, value); } catch (error) { return; }
  }
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mx - 4 + 'px';
      cursorDot.style.top = my - 4 + 'px';
    }
  });

  function animRing() {
    rx += (mx - rx) * 0.2;
    ry += (my - ry) * 0.2;
    if (cursorRing) {
      cursorRing.style.left = rx - 20 + 'px';
      cursorRing.style.top = ry - 20 + 'px';
    }
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('a,button,.btn,.service-panel,.tech-card,.faq-item summary,input,textarea,select').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hover'));
  });

  document.querySelectorAll('.service-panel, .tech-card, .mission-card, .why-item, .faq-item, .contact-info-item').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });

  const supportsMatchMedia = typeof window.matchMedia === 'function';
  const reduceMotion = supportsMatchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = !supportsMatchMedia || window.matchMedia('(pointer: fine)').matches;
  if (!reduceMotion && finePointer) {
    document.querySelectorAll('.service-panel, .tech-card, .mission-card, .why-item').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty('--tilt-x', `${(-vertical * 1.5).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(horizontal * 1.5).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });

    document.querySelectorAll('.btn-primary, .btn-outline, .btn-more').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
        button.style.setProperty('--magnet-x', `${(horizontal * 2).toFixed(2)}px`);
        button.style.setProperty('--magnet-y', `${(vertical * 2).toFixed(2)}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--magnet-x', '0px');
        button.style.setProperty('--magnet-y', '0px');
      });
    });

    const heroSurface = document.querySelector('.hero');
    if (heroSurface) {
      heroSurface.addEventListener('pointermove', (event) => {
        const bounds = heroSurface.getBoundingClientRect();
        heroSurface.style.setProperty('--hero-x', `${((event.clientX - bounds.left) / bounds.width * 100).toFixed(1)}%`);
        heroSurface.style.setProperty('--hero-y', `${((event.clientY - bounds.top) / bounds.height * 100).toFixed(1)}%`);
      });
    }
  }

  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 80));
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
  });
  navLinks.querySelectorAll('a').forEach((l) => l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const pct = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = pct > 0 ? (window.scrollY / pct) * 100 + '%' : '0%';
  });

  const translations = {
    es: {
      navInicio: 'Inicio',
      navAbout: 'Nosotros',
      navServices: 'Servicios',
      navSecurity: 'Seguridad',
      navTech: 'Tecnología',
      navMission: 'Misión',
      navFaq: 'FAQ',
      navContact: 'Contacto',
      heroBadge: '🚀 Tecnología de Clase Mundial',
      heroTitleBrand: 'Vértice',
      heroTitleLocation: 'Costa Rica',
      heroSubtitle: 'Creamos páginas web profesionales, rápidas y memorables para marcas, negocios y personas que quieren conectar con el mundo.',
      heroCtaPrimary: 'Solicitar diagnóstico',
      heroCtaSecondary: 'Ver servicios',
      aboutLabel: 'Sobre Nosotros',
      aboutTitle: 'Quiénes <span class="highlight">Somos</span>',
      aboutText: 'Somos Vértice Costa Rica, un estudio web que crea experiencias digitales profesionales para empresas, emprendimientos y proyectos de todo el mundo.',
      stat1: 'Páginas web creadas',
      stat2: 'Satisfacción de clientes',
      stat3: 'Tecnologías dominadas',
      stat4: 'Soporte y monitoreo',
      servicesLabel: 'Lo que Ofrecemos',
      servicesTitle: 'Páginas web <span class="highlight">que conectan</span>',
      securityLabel: 'Ciberseguridad y Adaptabilidad',
      securityTitle: 'Protegemos tu negocio y lo hacemos funcionar en cualquier <span class="highlight">dispositivo</span>',
      securityCard1Title: 'Seguridad desde el código',
      securityCard1Text: 'Aplicamos HTTPS, validación de entradas, control de acceso, gestión segura de formularios y prácticas inspiradas en OWASP desde la primera línea de código.',
      securityCard2Title: 'Protección y compatibilidad',
      securityCard2Text: 'Probamos interfaces en móviles, tablets y escritorio, con degradación progresiva para navegadores antiguos y una experiencia accesible con teclado.',
      securityCard3Title: 'Continuidad y rendimiento',
      securityCard3Text: 'Optimizamos carga, imágenes, estructura y recursos para que el sitio sea rápido, mantenible y preparado para crecer sin perder estabilidad.',
      techLabel: 'Nuestro Stack',
      techTitle: 'Tecnología de <span class="highlight">Punta</span>',
      missionLabel: 'Nuestro Propósito',
      missionTitle: 'Misión & <span class="highlight">Visión</span>',
      missionItemTitle: 'Misión',
      missionItemText: 'Brindar soluciones digitales innovadoras que optimicen procesos y fortalezcan la competitividad de nuestros clientes.',
      visionItemTitle: 'Visión',
      visionItemText: 'Ser el estudio web referente para marcas y negocios que quieren destacar en internet con experiencias digitales memorables.',
      whyLabel: 'Diferenciadores',
      whyTitle: '¿Por qué <span class="highlight">elegirnos</span>?',
      faqLabel: 'Resolvemos tus dudas',
      faqTitle: 'Preguntas <span class="highlight">Frecuentes</span>',
      contactLabel: 'Conversemos',
      contactTitle: 'Contacto <span class="highlight">directo</span>',
      contactNamePlaceholder: 'Nombre completo *',
      contactEmailPlaceholder: 'Correo electrónico *',
      contactMessagePlaceholder: 'Mensaje *',
      contactSubmit: 'Enviar Mensaje',
      toastSending: '⏳ Enviando mensaje...',
      toastSendError: '⚠️ No se pudo enviar. Escríbenos a pereztei79@gmail.com',
      footerNote: '© 2026 Vértice Costa Rica. Todos los derechos reservados.',
      searchPlaceholder: 'Buscar en Vértice Costa Rica...',
      toastRequired: '⚠️ Complete todos los campos.',
      toastInvalidEmail: '⚠️ Correo inválido.',
      toastSuccess: '✅ ¡Mensaje enviado! Nos pondremos en contacto pronto.',
    },
    en: {
      navInicio: 'Home',
      navAbout: 'About',
      navServices: 'Services',
      navSecurity: 'Security',
      navTech: 'Technology',
      navMission: 'Mission',
      navFaq: 'FAQ',
      navContact: 'Contact',
      heroBadge: '🚀 World-Class Technology',
      heroTitleBrand: 'Vértice',
      heroTitleLocation: 'Costa Rica',
      heroSubtitle: 'We create professional, fast and memorable websites for brands, businesses and people ready to connect with the world.',
      heroCtaPrimary: 'Request a Consultation',
      heroCtaSecondary: 'Explore Services',
      aboutLabel: 'About Us',
      aboutTitle: 'Who <span class="highlight">We Are</span>',
      aboutText: 'We are Vértice Costa Rica, a web studio creating professional digital experiences for businesses, entrepreneurs and projects around the world.',
      stat1: 'Websites created',
      stat2: 'Client satisfaction',
      stat3: 'Technologies mastered',
      stat4: 'Support & monitoring',
      servicesLabel: 'What We Offer',
      servicesTitle: 'Websites <span class="highlight">that connect</span>',
      securityLabel: 'Cybersecurity and Adaptability',
      securityTitle: 'We protect your business and make it work flawlessly on any <span class="highlight">device</span>',
      securityCard1Title: 'Security from the code up',
      securityCard1Text: 'We apply HTTPS, input validation, access control, secure forms and OWASP-inspired practices from the first line of code.',
      securityCard2Title: 'Protection and compatibility',
      securityCard2Text: 'We test mobile, tablet and desktop interfaces with progressive enhancement for older browsers and keyboard accessibility.',
      securityCard3Title: 'Continuity and performance',
      securityCard3Text: 'We optimize loading, images, structure and assets so the site stays fast, maintainable and ready to grow reliably.',
      techLabel: 'Our Stack',
      techTitle: 'Cutting-Edge <span class="highlight">Technology</span>',
      missionLabel: 'Our Purpose',
      missionTitle: 'Mission & <span class="highlight">Vision</span>',
      missionItemTitle: 'Mission',
      missionItemText: 'Deliver innovative digital solutions that optimize processes and strengthen the competitiveness of our clients.',
      visionItemTitle: 'Vision',
      visionItemText: 'Be the go-to web studio for brands and businesses that want to stand out online with memorable digital experiences.',
      whyLabel: 'Differentiators',
      whyTitle: 'Why <span class="highlight">Choose Us</span>?',
      faqLabel: 'We answer your questions',
      faqTitle: 'Frequently Asked <span class="highlight">Questions</span>',
      contactLabel: 'Let’s talk',
      contactTitle: 'Direct <span class="highlight">Contact</span>',
      contactNamePlaceholder: 'Full name *',
      contactEmailPlaceholder: 'Email *',
      contactMessagePlaceholder: 'Message *',
      contactSubmit: 'Send Message',
      toastSending: '⏳ Sending message...',
      toastSendError: '⚠️ Could not send. Write us at pereztei79@gmail.com',
      footerNote: '© 2026 Vértice Costa Rica. All rights reserved.',
      searchPlaceholder: 'Search Vértice Costa Rica...',
      toastRequired: '⚠️ Please complete all fields.',
      toastInvalidEmail: '⚠️ Invalid email.',
      toastSuccess: '✅ Message sent! We will contact you soon.',
    }
  };

  let currentLanguage = readPreference('lang', 'es');

  function applyTranslations(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        if (el.classList.contains('section-title') || el.classList.contains('i18n-html')) {
          el.innerHTML = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
    });
    const footerNoteEl = document.getElementById('footerNote');
    if (footerNoteEl) footerNoteEl.textContent = translations[lang].footerNote.replace('2026', String(new Date().getFullYear()));
    document.getElementById('searchInput').setAttribute('placeholder', translations[lang].searchPlaceholder);
    document.getElementById('langToggle').textContent = lang === 'en' ? 'ES' : 'EN';
    document.getElementById('langToggle').setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    document.getElementById('langToggle').setAttribute('title', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    document.getElementById('searchTrigger').setAttribute('aria-label', lang === 'en' ? 'Search' : 'Buscar');
    document.getElementById('hamburger').setAttribute('aria-label', lang === 'en' ? 'Menu' : 'Menú');
    writePreference('lang', lang);
  }

  document.getElementById('langToggle').addEventListener('click', () => {
    applyTranslations(currentLanguage === 'es' ? 'en' : 'es');
  });
  applyTranslations(currentLanguage);

  const toast = document.getElementById('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  const canvas = document.getElementById('heroCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          sx: (Math.random() - 0.5) * 0.5,
          sy: (Math.random() - 0.5) * 0.5,
          o: Math.random() * 0.6 + 0.2,
          p: Math.random() * Math.PI * 2
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.sx;
        p.y += p.sy;
        p.p += 0.02;
        const a = p.o + Math.sin(p.p) * 0.2;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${Math.max(0.05, Math.min(0.7, a))})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59,130,246,${0.08 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

      resizeCanvas();
      initParticles();
      draw();
      window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
      });
    }
  }

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  document.querySelectorAll('.btn-ripple').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => backToTop.classList.toggle('visible', window.scrollY > 600));
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const contactForm = document.getElementById('contactForm');
  const FORM_ENDPOINT = '';
  const CONTACT_EMAIL = 'pereztei79@gmail.com';
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const hp = document.getElementById('hpField');
    if (hp && hp.value) return;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return showToast(translations[currentLanguage].toastRequired);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return showToast(translations[currentLanguage].toastInvalidEmail);

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent('Consulto web — ' + name);
      const body = encodeURIComponent(message + '\n\n—\n' + name + '\n' + email);
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
      showToast(translations[currentLanguage].toastSuccess);
      contactForm.reset();
      return;
    }

    submitBtn.disabled = true;
    showToast(translations[currentLanguage].toastSending);
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, email, mensaje: message, _replyto: email })
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      showToast(translations[currentLanguage].toastSuccess);
      contactForm.reset();
    } catch (err) {
      showToast(translations[currentLanguage].toastSendError);
    } finally {
      submitBtn.disabled = false;
    }
  });

  const searchTrigger = document.getElementById('searchTrigger');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchIndex = {
    es: [
      { title: 'Inicio', url: '#inicio' },
      { title: 'Nosotros', url: '#nosotros' },
      { title: 'Servicios', url: '#servicios' },
      { title: 'Seguridad', url: '#seguridad' },
      { title: 'Tecnología', url: '#tecnologia' },
      { title: 'Misión y Visión', url: '#mision' },
      { title: 'FAQ', url: '#faq' },
      { title: 'Contacto', url: '#contacto' }
    ],
    en: [
      { title: 'Home', url: '#inicio' },
      { title: 'About', url: '#nosotros' },
      { title: 'Services', url: '#servicios' },
      { title: 'Security', url: '#seguridad' },
      { title: 'Technology', url: '#tecnologia' },
      { title: 'Mission & Vision', url: '#mision' },
      { title: 'FAQ', url: '#faq' },
      { title: 'Contact', url: '#contacto' }
    ]
  };

  searchTrigger.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchInput.focus();
  });
  closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
    searchResults.classList.remove('show');
    searchInput.value = '';
  });
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove('active');
      searchResults.classList.remove('show');
      searchInput.value = '';
    }
  });
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    if (q.length < 2) {
      searchResults.classList.remove('show');
      return;
    }
    const filtered = searchIndex[currentLanguage].filter((item) => item.title.toLowerCase().includes(q));
    searchResults.replaceChildren();
    if (filtered.length) {
      filtered.forEach((item) => {
        const link = document.createElement('a');
        link.href = item.url;
        link.textContent = item.title;
        link.addEventListener('click', () => {
          searchOverlay.classList.remove('active');
          searchResults.classList.remove('show');
          searchInput.value = '';
        });
        searchResults.appendChild(link);
      });
    } else {
      const empty = document.createElement('p');
      empty.textContent = currentLanguage === 'en' ? 'No results' : 'Sin resultados';
      empty.style.cssText = 'color:#888;padding:0.8rem;';
      searchResults.appendChild(empty);
    }
    searchResults.classList.add('show');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      searchOverlay.classList.remove('active');
      searchResults.classList.remove('show');
      searchInput.value = '';
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchOverlay.classList.add('active');
      searchInput.focus();
    }
  });

  const statNumbers = document.querySelectorAll('.stat-number');
  function animateStat(element) {
    const target = parseInt(element.getAttribute('data-count'), 10);
    const suffix = element.getAttribute('data-suffix') || '+';
    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 60));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current + suffix;
    }, 25);
  }
  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach((element) => statObserver.observe(element));
  } else {
    statNumbers.forEach(animateStat);
  }

  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const canvasElement = document.getElementById('heroCanvas');
    if (hero && canvasElement && window.scrollY < hero.offsetHeight) {
      canvasElement.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
  });

  console.log('%c🚀 Vértice Costa Rica %c| Plataforma Empresarial', 'color:#2563eb;font-size:1.4em;font-weight:bold;', 'color:#94a3b8;');
})();
