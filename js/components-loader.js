/* ════════════════════════════════════════════════════════════════
   📦 components-loader.js — Carregador de Componentes HTML
   ════════════════════════════════════════════════════════════════
   
   Este arquivo é o "motor" que permite reutilizar partes do site
   (navbar, footer, menu mobile) em qualquer página.
   
   ════════════════════════════════════════════════════════════════
   
   📌 COMO FUNCIONA:
   
   1. No HTML, você cria um <div> vazio onde o componente vai aparecer:
      <div id="nav-container"></div>
   
   2. No final da página, chama a função:
      loadComponent('nav-container', './components/nav.html', initNav);
   
   3. O JS usa fetch() pra buscar o arquivo nav.html no servidor
   
   4. Insere o conteúdo dentro do <div id="nav-container">
   
   5. Depois de inserir, executa a função callback (ex: initNav)
      pra ativar a lógica do componente (menu, tema, etc)
   
   ════════════════════════════════════════════════════════════════
   
   ⚠️ IMPORTANTE — fetch() precisa de servidor
   
   Se você abrir o index.html direto no navegador (file://),
   o fetch() vai dar erro de CORS. Você precisa usar um servidor:
   
   Opção 1: Extensão "Live Server" no VS Code (mais fácil)
   Opção 2: Terminal → npx serve . (precisa Node.js)
   Opção 3: Terminal → python3 -m http.server 8000
   
   ════════════════════════════════════════════════════════════════ */


/**
 * Carrega um componente HTML dentro de um container.
 * 
 * @param {string}   containerId  — ID do div onde o HTML vai ser inserido
 * @param {string}   filePath     — Caminho do arquivo HTML do componente
 * @param {function} [callback]   — Função opcional executada DEPOIS de carregar
 * 
 * @example
 * // Carrega a navbar e depois inicializa a lógica dela
 * loadComponent('nav-container', './components/nav.html', initNav);
 * 
 * // Carrega o footer sem callback (não precisa de JS extra)
 * loadComponent('footer-container', './components/footer.html');
 */
async function loadComponent(containerId, filePath, callback) {
  
  // 1. Encontra o container na página
  const container = document.getElementById(containerId);
  
  // Se o container não existir, para aqui (evita erros)
  if (!container) {
    console.warn(`⚠️ Container #${containerId} não encontrado na página.`);
    return;
  }

  try {
    // 2. Busca o arquivo HTML do componente
    const response = await fetch(filePath);
    
    // Verifica se o arquivo foi encontrado
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${filePath} não encontrado`);
    }
    
    // 3. Converte a resposta em texto (HTML)
    const html = await response.text();
    
    // 4. Insere o HTML dentro do container
    container.innerHTML = html;
    
    // 5. Se tem callback, executa (ex: ativar menu, tema, etc)
    if (typeof callback === 'function') {
      callback();
    }

  } catch (error) {
    console.error(`❌ Erro ao carregar componente ${filePath}:`, error);
    // Mostra mensagem amigável no container (pra debug)
    container.innerHTML = `
      <div style="padding:1rem; color:#E50914; font-size:0.8rem; text-align:center;">
        ⚠️ Erro ao carregar componente. Verifique o console.
      </div>
    `;
  }
}


/**
 * Carrega múltiplos componentes de uma vez.
 * Útil quando a página tem navbar + footer + menu mobile.
 * 
 * @param {Array} components — Lista de objetos {id, path, callback}
 * 
 * @example
 * loadComponents([
 *   { id: 'nav-container',    path: './components/nav.html',         callback: initNav },
 *   { id: 'mobile-menu',      path: './components/mobile-menu.html', callback: initMobileMenu },
 *   { id: 'footer-container', path: './components/footer.html' }
 * ]);
 */
async function loadComponents(components) {
  // Promise.all carrega todos ao mesmo tempo (mais rápido)
  await Promise.all(
    components.map(comp => loadComponent(comp.id, comp.path, comp.callback))
  );
}
