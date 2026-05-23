/* nav.js — injects shared navigation + footer and handles UI behavior */

(function () {
  const NAV_ITEMS = [
    { href: 'index.html',   label: 'Главная' },
    { href: 'rules.html',   label: 'Правила' },
    { href: 'lore.html',    label: 'Архив' },
    { href: 'updates.html', label: 'Девблог' },
    { href: 'donate.html',  label: 'Донат' },
  ];

  function currentPage() {
    const path = location.pathname.split('/').pop() || 'index.html';
    return path.toLowerCase();
  }

  function inDocsFolder() {
    return /\/docs\//.test(location.pathname) || /\/updates\//.test(location.pathname);
  }

  function buildNav() {
    const prefix = inDocsFolder() ? '../' : '';
    const current = currentPage();

    const links = NAV_ITEMS.map(item => {
      const active = (current === item.href) ? ' class="is-active"' : '';
      return `<li><a href="${prefix}${item.href}"${active}>${item.label}</a></li>`;
    }).join('');

    const nav = `
      <nav class="nav">
        <div class="nav__inner">
          <a class="nav__brand" href="${prefix}index.html">
            <span class="mark">P</span>
            <span>
              Paranoia <span class="gold">//</span> SCP-RP
              <small>secure · contain · protect</small>
            </span>
          </a>
          <button class="nav__toggle" aria-label="menu" id="navToggle">≡ MENU</button>
          <ul class="nav__links" id="navLinks">${links}</ul>
        </div>
      </nav>
    `;

    const mount = document.getElementById('site-nav');
    if (mount) {
      mount.outerHTML = nav;
    } else {
      document.body.insertAdjacentHTML('afterbegin', nav);
    }

    const toggle = document.getElementById('navToggle');
    const linksEl = document.getElementById('navLinks');
    if (toggle && linksEl) {
      toggle.addEventListener('click', () => {
        linksEl.classList.toggle('is-open');
      });
    }
  }

  const REPO = 'BansheeGIT/paranoia-scp';
  const BRANCH = 'main';
  const PAGES_PREFIX = '/paranoia-scp/';

  function currentFilePath() {
    let p = location.pathname;
    if (p.startsWith(PAGES_PREFIX)) p = p.slice(PAGES_PREFIX.length - 1);
    if (p.endsWith('/')) p += 'index.html';
    if (p.startsWith('/')) p = p.slice(1);
    if (!p) p = 'index.html';
    return p;
  }

  function editUrl() {
    return `https://github.com/${REPO}/edit/${BRANCH}/${currentFilePath()}`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    const isHttp = location.protocol.startsWith('http');
    const editLink = isHttp
      ? `<a href="${editUrl()}" target="_blank" rel="noopener" class="footer__edit" title="Открыть файл в редакторе GitHub">✎ редактировать на GitHub</a>`
      : '';

    const footer = `
      <footer class="footer">
        <div class="footer__inner">
          <div>
            <span class="gold">Paranoia</span> · Garry's Mod SCP-RP · &copy; ${year}
          </div>
          <div class="footer__right">
            ${editLink}
            <span class="faint">доступ только для авторизованного персонала</span>
          </div>
        </div>
      </footer>
    `;

    const mount = document.getElementById('site-footer');
    if (mount) {
      mount.outerHTML = footer;
    } else {
      document.body.insertAdjacentHTML('beforeend', footer);
    }
  }

  function setupReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }

  function setupTerminalTyping() {
    const targets = document.querySelectorAll('[data-typewriter]');
    targets.forEach(node => {
      const text = node.getAttribute('data-typewriter') || node.textContent;
      const speed = parseInt(node.getAttribute('data-speed') || '22', 10);
      node.textContent = '';
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          node.textContent += text.charAt(i++);
          setTimeout(tick, speed);
        }
      };
      tick();
    });
  }

  function setupLightbox() {
    const photos = document.querySelectorAll('.photo img');
    if (!photos.length) return;

    const box = document.createElement('div');
    box.className = 'lightbox';
    box.innerHTML = `
      <button class="lightbox__close" type="button">[ закрыть ]</button>
      <img alt="" />
    `;
    document.body.appendChild(box);

    const img = box.querySelector('img');
    const closeBtn = box.querySelector('.lightbox__close');

    const open = (src, alt) => {
      img.src = src;
      img.alt = alt || '';
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      img.src = '';
    };

    photos.forEach(p => p.addEventListener('click', () => open(p.src, p.alt)));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && box.classList.contains('is-open')) close();
    });
  }

  function setupCounters() {
    const els = document.querySelectorAll('[data-count-to]');
    els.forEach(el => {
      const target = parseInt(el.getAttribute('data-count-to'), 10);
      if (isNaN(target)) return;
      const duration = 1100;
      const start = performance.now();
      const from = 0;
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(from + (target - from) * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    buildFooter();
    setupReveal();
    setupTerminalTyping();
    setupCounters();
    setupLightbox();
  });
})();
