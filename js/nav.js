/* ════════════════════════════════════════════════════════════════
   📄 nav.js — Lógica da Navbar + Menu Mobile
   ════════════════════════════════════════════════════════════════
   
   Este arquivo contém TODA a lógica JavaScript da navegação:
   
   1. initNav()        → função principal (chamada pelo components-loader)
   2. Scroll effect     → sombra na navbar ao rolar
   3. Tema dark/light  → alterna cores + salva preferência
   4. Idioma PT/EN/ES  → traduz textos da página
   5. Menu mobile      → abre/fecha painel lateral
   6. Cursor           → cursor customizado (opcional)
   
   📌 COMO FUNCIONA COM COMPONENTES:
   
   O components-loader.js carrega o nav.html e depois chama initNav().
   initNav() então procura os elementos no DOM e ativa a lógica.
   
   ⚠️ IMPORTANTE: initNav() só funciona DEPOIS que o HTML da nav
   já foi inserido no DOM. Por isso usamos callback no loadComponent().
   
   ════════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════
   🚀 initNav — FUNÇÃO PRINCIPAL
   ───────────────────────────────────────────────────────────────
   Chamada pelo components-loader depois de carregar nav.html.
   Inicializa todos os sub-módulos.
   ═══════════════════════════════════════════════════════════════ */
function initNav() {
  setupScroll();
  setupTheme();
  setupLang();
  setupCursor();

  console.log('✅ Nav inicializada');
}


/* ═══════════════════════════════════════════════════════════════
   🚀 initMobileMenu — Lógica do menu lateral
   ───────────────────────────────────────────────────────────────
   Chamada pelo components-loader depois de carregar mobile-menu.html.
   Separada do initNav porque o mobile-menu é um componente diferente.
   ═══════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  setupMobileMenu();
  console.log('✅ Menu mobile inicializado');
}


/* ═══════════════════════════════════════════════════════════════
   1️⃣ SCROLL EFFECT — Sombra na navbar ao rolar
   ───────────────────────────────────────────────────────────────
   
   Como funciona:
   - addEventListener('scroll') escuta o evento de rolagem
   - scrollY > 50 → adiciona classe .scrolled → aparece sombra
   - scrollY ≤ 50 → remove classe .scrolled → sombra some
   
   O operador ?? (nullish coalescing) retorna o valor da direita
   se o da esquerda for null ou undefined. Aqui é só segurança
   caso o elemento não exista no DOM.
   ═══════════════════════════════════════════════════════════════ */
function setupScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
  /* { passive: true } → diz ao navegador que não vamos
     chamar preventDefault(). Melhora performance do scroll. */
}


/* ═══════════════════════════════════════════════════════════════
   2️⃣ TEMA DARK/LIGHT
   ───────────────────────────────────────────────────────────────
   
   Como funciona:
   1. Verifica se tem preferência salva no localStorage
   2. Se não tem, usa o tema padrão (dark)
   3. Ao clicar, troca o data-theme no <html>
   4. Salva a preferência no localStorage
   
   localStorage é um "armário" do navegador que guarda dados
   mesmo depois de fechar a página. Perfeito pra salvar tema.
   
   O tema funciona porque:
   - base.css tem [data-theme="dark"] { --bg: #050508; ... }
   - base.css tem [data-theme="light"] { --bg: #FAFAF8; ... }
   - Quando trocamos o atributo, o CSS aplica as novas cores
   ═══════════════════════════════════════════════════════════════ */
function setupTheme() {
  const toggle   = document.getElementById('themeToggle');
  const mobToggle = document.getElementById('mobThemeBtn');
  const html     = document.documentElement;  // <html>

  // Recupera tema salvo ou usa 'dark' como padrão
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);
  updateThemeUI(saved);

  // Função que alterna o tema
  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeUI(next);
  }

  // Atualiza os ícones/textos dos botões de tema
  function updateThemeUI(theme) {
    // Botão da navbar
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    // Label no menu mobile
    const lbl = document.getElementById('mobThemeLbl');
    if (lbl) {
      lbl.textContent = theme === 'dark' ? 'Escuro' : 'Claro';
    }
  }

  // Event listeners
  if (toggle)    toggle.addEventListener('click', toggleTheme);
  if (mobToggle) mobToggle.addEventListener('click', toggleTheme);
}


/* ═══════════════════════════════════════════════════════════════
   3️⃣ SELETOR DE IDIOMA (PT / EN / ES)
   ───────────────────────────────────────────────────────────────
   
   Como funciona:
   1. Clique no botão → abre/fecha dropdown
   2. Clique numa opção → troca o idioma
   3. A troca percorre TODOS os elementos com data-pt, data-en, data-es
      e substitui o textContent pelo texto do idioma escolhido
   
   data-pt="Galeria" data-en="Gallery" data-es="Galería"
   → Se idioma = 'en', o texto vira "Gallery"
   
   querySelectorAll('[data-pt]') → encontra todos os elementos
   que têm o atributo data-pt (que são os textos traduzíveis)
   ═══════════════════════════════════════════════════════════════ */
function setupLang() {
  const sel     = document.getElementById('langSel');
  const trigger = document.getElementById('langTrigger');
  const drop    = document.getElementById('langDrop');

  if (!sel || !trigger) return;

  // Recupera idioma salvo ou usa 'pt'
  const saved = localStorage.getItem('lang') || 'pt';
  applyLang(saved);

  // Abre/fecha dropdown
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();     // impede que o clique propague pro document
    sel.classList.toggle('open');
    trigger.setAttribute('aria-expanded',
      sel.classList.contains('open') ? 'true' : 'false'
    );
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!sel.contains(e.target)) {
      sel.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Clique em cada opção de idioma
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;   // 'pt', 'en', ou 'es'
      applyLang(lang);
      localStorage.setItem('lang', lang);

      // Fecha dropdown
      sel.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });
  });
}


/**
 * Aplica o idioma em toda a página.
 * 
 * Percorre todos os elementos com data-pt e troca o texto
 * pelo valor do atributo do idioma escolhido.
 * 
 * @param {string} lang — 'pt', 'en', ou 'es'
 */
function applyLang(lang) {
  // Mapeamento bandeira + código
  const flags = { pt: '🇧🇷', en: '🇺🇸', es: '🇪🇸' };
  const codes = { pt: 'PT',  en: 'EN',  es: 'ES' };

  // Atualiza o botão da navbar
  const flagEl = document.getElementById('langFlag');
  const codeEl = document.getElementById('langCode');
  if (flagEl) flagEl.textContent = flags[lang];
  if (codeEl) codeEl.textContent = codes[lang];

  // Atualiza aria-selected nas opções
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.setAttribute('aria-selected',
      opt.dataset.lang === lang ? 'true' : 'false'
    );
  });

  // Atualiza o atributo lang do HTML (acessibilidade/SEO)
  const htmlLangs = { pt: 'pt-BR', en: 'en', es: 'es' };
  document.documentElement.lang = htmlLangs[lang] || 'pt-BR';

  // ── TRADUÇÃO: percorre todos os elementos traduzíveis ──
  // Seleciona todo elemento que tenha data-pt (todos os traduzíveis têm)
  document.querySelectorAll('[data-pt]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.textContent = text;
    }
  });
}


/* ═══════════════════════════════════════════════════════════════
   4️⃣ MENU MOBILE — Abrir / Fechar
   ───────────────────────────────────────────────────────────────
   
   Fluxo:
   1. Clique no hamburger ou MENU → abre
   2. Clique no X, overlay, ou link interno → fecha
   3. Tecla Escape → fecha
   4. Body recebe overflow: hidden pra impedir scroll por baixo
   
   ⚠️ Acessibilidade:
   - aria-expanded → informa se o menu está aberto ou fechado
   - hidden → esconde o menu pra leitores de tela quando fechado
   - Ao abrir, o foco vai pro botão fechar (focus trap básico)
   ═══════════════════════════════════════════════════════════════ */
function setupMobileMenu() {
  const hamburger     = document.getElementById('hamburger');
  const btnMenuDesk   = document.getElementById('btnMenuDesktop');
  const mobMenu       = document.getElementById('mobMenu');
  const mobClose      = document.getElementById('mobClose');
  const overlay       = document.getElementById('mobile-overlay');

  if (!mobMenu) return;

  // ── ABRIR ──
  function openMenu() {
    mobMenu.classList.add('active');
    mobMenu.removeAttribute('hidden');
    if (overlay) overlay.classList.add('active');
    if (hamburger) hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';  // trava scroll

    // Atualiza aria
    if (hamburger)   hamburger.setAttribute('aria-expanded', 'true');
    if (btnMenuDesk) btnMenuDesk.setAttribute('aria-expanded', 'true');

    // Move foco pro botão fechar (acessibilidade)
    if (mobClose) mobClose.focus();
  }

  // ── FECHAR ──
  function closeMenu() {
    mobMenu.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    document.body.style.overflow = '';  // libera scroll

    // Atualiza aria
    if (hamburger)   hamburger.setAttribute('aria-expanded', 'false');
    if (btnMenuDesk) btnMenuDesk.setAttribute('aria-expanded', 'false');

    // Esconde depois da animação de saída (0.4s = duração do slide)
    setTimeout(() => {
      if (!mobMenu.classList.contains('active')) {
        mobMenu.setAttribute('hidden', '');
      }
    }, 400);
  }

  // ── EVENT LISTENERS ──
  if (hamburger)   hamburger.addEventListener('click', openMenu);
  if (btnMenuDesk) btnMenuDesk.addEventListener('click', openMenu);
  if (mobClose)    mobClose.addEventListener('click', closeMenu);
  if (overlay)     overlay.addEventListener('click', closeMenu);

  // Fecha ao clicar em links internos (âncoras #)
  mobMenu.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}


/* ═══════════════════════════════════════════════════════════════
   5️⃣ CURSOR CUSTOMIZADO
   ───────────────────────────────────────────────────────────────
   
   Ponto (dot) + anel (ring) que seguem o mouse.
   
   O ponto segue instantaneamente (style.left/top direto).
   O anel tem transition CSS, então "arrasta" atrás — cria profundidade.
   
   Quando o mouse passa sobre links/botões, o anel expande
   (via classe .cursor-hover no body).
   
   ⚠️ Só funciona em dispositivos com mouse (pointer: fine).
   Em celular/tablet, o cursor nativo continua.
   ═══════════════════════════════════════════════════════════════ */
function setupCursor() {
  // Só ativa se o dispositivo tem mouse
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  // Move os elementos com o mouse
  document.addEventListener('mousemove', (e) => {
    // Mostra na primeira vez
    dot.classList.add('visible');
    ring.classList.add('visible');

    // Ponto: segue instantaneamente
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';

    // Anel: segue com delay (transition CSS faz o efeito)
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });

  // Expande anel sobre elementos interativos
  const interactives = 'a, button, [role="button"], input, select, textarea';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      document.body.classList.remove('cursor-hover');
    }
  });
}


/* ═══════════════════════════════════════════════════════════════
   📐 SCROLL REVEAL — Animação de entrada
   ───────────────────────────────────────────────────────────────
   
   IntersectionObserver "vigia" quando elementos entram na tela.
   Quando um [data-reveal] aparece (threshold 12%), adiciona .in.
   
   unobserve() → para de vigiar depois da primeira vez
   (o elemento não some de novo ao rolar pra cima).
   
   ⚠️ Esta função é global — usada por TODAS as seções.
   Por isso fica aqui e é chamada depois de carregar os componentes.
   ═══════════════════════════════════════════════════════════════ */
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}
