# 📘 MANUAL MESTRE — Site Vanessa Rafaella

> **Este é o seu guia único.** Cada vez que você abrir este arquivo, vai saber em que fase está, o que fazer e como fazer. Sem se perder. Sem decidir nada no meio.

**Última atualização:** Junho/2026
**Versão:** 1.0
**Como usar este documento:** Salve no seu repositório GitHub. Abra sempre que for trabalhar no site. Marque o que já fez. Quando tiver dúvida, volte aqui antes de me chamar.

---

## 🧭 ÍNDICE RÁPIDO

1. [Onde você está agora](#onde-você-está-agora)
2. [Fases do projeto](#fases-do-projeto) (visão geral)
3. [Regras de ouro](#regras-de-ouro) (NUNCA esqueça)
4. [Fase 0 — Preparação](#fase-0--preparação)
5. [Fase 1 — Limpeza segura do servidor](#fase-1--limpeza-segura)
6. [Fase 2 — Estrutura base do código](#fase-2--estrutura-base)
7. [Fase 3 — Componentes (navbar + footer)](#fase-3--componentes)
8. [Fase 4 — Páginas principais](#fase-4--páginas-principais)
9. [Fase 5 — Páginas secundárias](#fase-5--páginas-secundárias)
10. [Fase 6 — Otimização de imagens](#fase-6--otimização-de-imagens)
11. [Fase 7 — Deploy seguro](#fase-7--deploy-seguro)
12. [Fase 8 — Pós-deploy](#fase-8--pós-deploy)
13. [Referência rápida](#referência-rápida)
14. [Quando me chamar](#quando-me-chamar)

---

## 🎯 ONDE VOCÊ ESTÁ AGORA

```
[ ] Fase 0 — Preparação
[ ] Fase 1 — Limpeza segura
[ ] Fase 2 — Estrutura base
[ ] Fase 3 — Componentes (nav + footer)
[ ] Fase 4 — Páginas principais
[ ] Fase 5 — Páginas secundárias
[ ] Fase 6 — Otimização de imagens
[ ] Fase 7 — Deploy seguro
[ ] Fase 8 — Pós-deploy
```

> **Marque o ✅ na fase que você JÁ terminou.** Sempre que abrir esse arquivo, vai saber onde retomar.

---

## 🚀 FASES DO PROJETO (visão geral)

| Fase | Nome | Tempo estimado | Dificuldade |
|---|---|---|---|
| 0 | Preparação | 30 min | Fácil |
| 1 | Limpeza segura do servidor | 1h | Fácil |
| 2 | Estrutura base do código | 2h | Médio |
| 3 | Componentes (navbar+footer) | 2h | Médio |
| 4 | Páginas principais (home, privacy, onlyfans, sobre) | 1 semana | Médio |
| 5 | Páginas secundárias (galeria, fotos, vídeos, telegram) | 1 semana | Médio |
| 6 | Otimização de imagens | 2 dias | Médio |
| 7 | Deploy seguro | 2h | Alto |
| 8 | Pós-deploy (Search Console, sitemap) | 1h | Fácil |

> **Faz uma fase de cada vez.** Não pula. Não tenta fazer duas juntas. Termina, marca ✅, descansa, próxima.

---

## ⚠️ REGRAS DE OURO (NUNCA esqueça)

Antes de começar QUALQUER coisa, leia isso. Toda vez.

### 🛑 NUNCA mexa no site no ar sem backup

Antes de qualquer mudança no servidor, **baixa todos os arquivos atuais** pro seu computador. Cria uma pasta `backup-AAAA-MM-DD` (com a data) e guarda lá. Se algo der errado, você restaura.

### 🛑 NUNCA apaga uma URL sem fazer redirect 301

Se você deletar `homepage.html` sem criar redirect, todo cliente que tá no Google clicando nela vai pegar erro 404. **Sempre redirecione antes de apagar.**

### 🛑 NUNCA testa em produção

Tudo que for novo, primeiro testa em `/public_html/novo/`. Quando funcionar 100%, aí move pra raiz.

### 🛑 NUNCA esquece destes 5 elementos em CADA página:

Vou repetir em cada fase, mas decora isso:

1. ✅ `<title>` único e descritivo
2. ✅ `<meta name="description">` única (140-160 caracteres)
3. ✅ `<link rel="canonical">` apontando pra própria URL
4. ✅ `<meta name="viewport">` pra mobile
5. ✅ `<meta name="rating" content="adult">` (porque é conteúdo adulto)

### 🛑 NUNCA esquece em CADA imagem:

```html
<img 
  src="caminho/arquivo.webp" 
  width="800" 
  height="1200" 
  alt="descrição do que tá na imagem" 
  loading="lazy">
```

- `width` e `height` previnem layout shift (Google penaliza)
- `alt` é obrigatório (acessibilidade + SEO)
- `loading="lazy"` carrega só quando o usuário rola até ela (exceto a primeira imagem da página!)

### 🛑 NUNCA esquece em CADA link externo (OnlyFans, Privacy, Telegram):

```html
<a href="https://onlyfans.com/seu-link" 
   target="_blank" 
   rel="noopener nofollow sponsored">
  Assinar OnlyFans
</a>
```

- `target="_blank"` abre em nova aba
- `rel="noopener"` segurança
- `rel="nofollow sponsored"` diz pro Google que é link de afiliado/promoção

---

## 🏁 FASE 0 — PREPARAÇÃO

**Objetivo:** ter tudo pronto pra começar a trabalhar sem se perder.

### O que você vai precisar ter aberto:

- [ ] cPanel do vicetemple (File Manager)
- [ ] Repositório GitHub privado criado (o que você já mencionou)
- [ ] Editor de código (VS Code recomendado)
- [ ] Google Search Console aberto
- [ ] Este manual

### Passo a passo:

**1. Backup completo do site atual**
- Entra no cPanel → File Manager → `public_html/`
- Seleciona TUDO
- Botão "Comprimir" → cria um `.zip`
- Baixa esse zip pro teu computador
- Guarda numa pasta chamada `backup-2026-06-07` (use a data de hoje)

**2. Estrutura local de pastas**
No teu computador, cria uma pasta `vanessa-site/` com essa estrutura:

```
vanessa-site/
├── index.html
├── components/
├── css/
├── js/
├── assets/
│   ├── img/
│   └── video/
└── legal/
```

**3. Inicia o Git**
Dentro de `vanessa-site/`:
- `git init`
- Conecta com o repositório privado do GitHub que você criou

**4. Confirma que o SSI funciona no vicetemple**
Isso é importante. SSI é o que vai deixar você usar navbar/footer reutilizáveis sem JavaScript.

Faz esse teste:
- Cria um arquivo `teste-ssi.html` no `public_html/` com esse conteúdo:
  ```html
  <!DOCTYPE html>
  <html>
  <body>
    <h1>Teste SSI</h1>
    <!--#include virtual="/teste-componente.html" -->
  </body>
  </html>
  ```
- Cria um `teste-componente.html` com:
  ```html
  <p>Se você está vendo isso, SSI funciona!</p>
  ```
- Sobe o `.htaccess` v2 que eu te enviei
- Acessa `vanessarafaella.com/teste-ssi.html` no navegador

**Se aparecer "Se você está vendo isso, SSI funciona!" = SUCESSO.** Se não aparecer (vai mostrar só o H1), abre ticket com vicetemple pedindo "habilitação de mod_include/SSI" no plano. Não tem custo.

### ✅ Você terminou a Fase 0 quando:

- [ ] Backup zipado e guardado
- [ ] Estrutura de pastas local criada
- [ ] Git inicializado
- [ ] Teste SSI funcionando
- [ ] Marca aqui: Fase 0 completa em ___/___/2026

---

## 🧹 FASE 1 — LIMPEZA SEGURA

**Objetivo:** organizar o servidor sem quebrar nada que está dando tráfego.

### ⚠️ Antes de começar:

Lê de novo as **Regras de Ouro** lá em cima. Especialmente "NUNCA apaga URL sem redirect".

### O que NÃO vamos fazer agora:

- ❌ Não vamos apagar `homepage.html`, `landing.html`, `vipacess.html`, `getintouch.html`
- ❌ Não vamos apagar fotos antigas
- ❌ Não vamos mexer em nada que esteja recebendo tráfego

### O que vamos fazer:

**1. Subir o novo `.htaccess` v2** (arquivo que te entreguei)

Esse arquivo:
- Força HTTPS
- Tira o `www` da URL
- Habilita URLs limpas (sem `.html`)
- Cria redirects das URLs antigas pras novas (que ainda nem existem, mas tudo bem — fica preparado)
- Habilita SSI pra componentes
- Adiciona headers de segurança
- Bloqueia páginas do cPanel da indexação

**Passo a passo:**
- File Manager → `public_html/`
- Renomeia o `.htaccess` atual pra `.htaccess.OLD` (backup)
- Faz upload do novo `.htaccess` (que tem todos os redirects)
- Testa: acessa `vanessarafaella.com/homepage.html` → deve redirecionar pra `vanessarafaella.com/`

**Se der erro 500:** restaura o `.htaccess.OLD` e me avisa.

**2. Subir o novo `robots.txt`**

- File Manager → `public_html/`
- Renomeia `robots.txt` atual pra `robots.txt.OLD`
- Faz upload do novo `robots.txt`

**3. Criar pasta de trabalho separada**

No `public_html/`, cria uma pasta chamada `novo/`. Tudo que a gente for construir vai pra essa pasta primeiro. Só no final, quando estiver tudo pronto, move pra raiz.

### ✅ Você terminou a Fase 1 quando:

- [ ] `.htaccess` v2 funcionando
- [ ] `robots.txt` novo no ar
- [ ] Pasta `/novo/` criada no servidor
- [ ] Redirect testado (homepage.html → /)
- [ ] Marca aqui: Fase 1 completa em ___/___/2026

---

## 🏗️ FASE 2 — ESTRUTURA BASE

**Objetivo:** criar a fundação do código novo no `/novo/`.

### O que vamos criar:

Dentro de `/novo/`, esta estrutura de arquivos:

```
/novo/
├── components/
│   ├── nav.html         (vamos criar na Fase 3)
│   └── footer.html      (vamos criar na Fase 3)
│
├── css/
│   ├── base.css         (variáveis, reset, tipografia)
│   ├── components.css   (nav, footer, botões)
│   ├── sections.css     (hero, grids, cards)
│   └── responsive.css   (mobile, tablet)
│
├── js/
│   ├── theme.js         (dark/light mode)
│   ├── lang.js          (PT/EN switcher)
│   └── age-gate.js      (cookie de idade 18+)
│
├── assets/
│   ├── img/             (todas as imagens)
│   ├── video/           (vídeos)
│   └── icons/           (SVGs)
│
└── legal/
    ├── termos.html
    ├── privacidade.html
    ├── dmca.html
    └── 2257.html
```

### Passo a passo:

**1. Cria todas as pastas vazias** no File Manager OU via FTP.

**2. Cria o `css/base.css` com as variáveis essenciais.**

Cole esse código no arquivo:

```css
/* base.css — fundação do site */

:root {
  /* Cores Fire Edition */
  --color-fire-red: #E50914;
  --color-fire-orange: #FF6B35;
  --color-onlyfans-blue: #00AFF0;
  --color-privacy-orange: #FF8C00;
  --color-telegram-blue: #229ED9;

  /* Backgrounds */
  --bg-primary: #0a0a0a;
  --bg-secondary: #1a1a1a;
  --bg-card: #141414;

  /* Texto */
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --text-muted: #6e6e6e;

  /* Espaçamento */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* Container */
  --container-max: 1200px;
  --container-padding: 1.5rem;

  /* Transições */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
}

/* Reset básico */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  font-family: 'Bricolage Grotesque', system-ui, -apple-system, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

/* Container padrão */
.wrap, .container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

/* Skip link (acessibilidade) */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-fire-red);
  color: white;
  padding: 8px 16px;
  z-index: 100;
  text-decoration: none;
}
.skip-link:focus {
  top: 0;
}

/* Imagens responsivas */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Links padrão */
a {
  color: inherit;
  text-decoration: none;
  transition: color var(--transition-fast);
}
```

**3. Cria os outros arquivos CSS vazios por enquanto** (`components.css`, `sections.css`, `responsive.css`). Vamos preencher depois.

**4. Cria o `js/age-gate.js`** com o sistema de cookie de idade:

```javascript
// age-gate.js — controle de idade 18+

const AGE_COOKIE_NAME = 'age_verified';
const AGE_COOKIE_DAYS = 30;

// Verifica se o usuário já confirmou idade
function hasAgeVerified() {
  return document.cookie.split(';').some(c => 
    c.trim().startsWith(AGE_COOKIE_NAME + '=true')
  );
}

// Salva confirmação de idade
function setAgeVerified() {
  const date = new Date();
  date.setTime(date.getTime() + (AGE_COOKIE_DAYS * 24 * 60 * 60 * 1000));
  document.cookie = `${AGE_COOKIE_NAME}=true; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

// Redireciona pra gateway se não confirmou idade
// IMPORTANTE: usa isso só em páginas com conteúdo explícito
function requireAgeVerification() {
  if (!hasAgeVerified() && window.location.pathname !== '/') {
    const returnUrl = encodeURIComponent(window.location.pathname);
    window.location.href = '/?next=' + returnUrl;
  }
}
```

### ✅ Você terminou a Fase 2 quando:

- [ ] Todas as pastas criadas em `/novo/`
- [ ] `base.css` preenchido
- [ ] Outros CSS criados (vazios)
- [ ] `age-gate.js` criado
- [ ] Marca aqui: Fase 2 completa em ___/___/2026

---

## 🧩 FASE 3 — COMPONENTES (NAV + FOOTER)

**Objetivo:** criar a navbar e footer reutilizáveis usando SSI.

### Por que isso é importante:

A navbar e o footer aparecem em TODAS as páginas. Se você criar uma vez bem feita, edita num lugar só e atualiza em todo lugar. Isso é o que SSI faz por você.

### Passo a passo:

**1. Me manda o código atual da sua navbar e footer**

Quando estiver pronta pra começar a Fase 3, manda no chat:
- O HTML da navbar (você já tem feita pelos screenshots que vi)
- O HTML do footer
- O CSS deles

Eu vou:
- Otimizar a semântica HTML
- Adicionar acessibilidade (ARIA labels)
- Garantir consistência com SSI
- Te devolver o código pronto pra colar em `/novo/components/nav.html` e `/novo/components/footer.html`

**2. Depois que eu te devolver, você:**
- Cria os arquivos em `/novo/components/`
- Testa numa página simples (tipo `/novo/teste.html`)

### Template de página que usa os componentes:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título da Página</title>
  <meta name="description" content="Descrição da página">
  <link rel="canonical" href="https://vanessarafaella.com/url-da-pagina">
  <meta name="rating" content="adult">
  
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/sections.css">
  <link rel="stylesheet" href="/css/responsive.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Pular para o conteúdo</a>

  <!--#include virtual="/components/nav.html" -->

  <main id="main-content">
    <!-- conteúdo da página aqui -->
  </main>

  <!--#include virtual="/components/footer.html" -->

  <script src="/js/theme.js" defer></script>
  <script src="/js/lang.js" defer></script>
</body>
</html>
```

### ✅ Você terminou a Fase 3 quando:

- [ ] `components/nav.html` criado e funcionando
- [ ] `components/footer.html` criado e funcionando
- [ ] Testou em uma página de exemplo
- [ ] Navbar aparece corretamente
- [ ] Footer aparece corretamente
- [ ] Marca aqui: Fase 3 completa em ___/___/2026

---

## 🏠 FASE 4 — PÁGINAS PRINCIPAIS

**Objetivo:** criar as 5 páginas mais importantes do site, na ordem certa.

### A ordem importa:

```
1º) / (index.html — Gateway 18+)
2º) /home (hub roteador)
3º) /privacy (PT-BR)
4º) /onlyfans (EN)
5º) /sobre (SEO máximo)
```

### Por que essa ordem:

- A `/` é o portão. Sem ela, ninguém entra.
- A `/home` é o coração. Ela distribui pra tudo.
- `/privacy` e `/onlyfans` são onde a venda acontece. Prioridade.
- `/sobre` é a vitrine pro Google. Construir com calma.

### Como vamos trabalhar cada uma:

Pra CADA página, repete esse ciclo:

**Etapa 1 — Você prepara o HTML básico**
- Copia o template da Fase 3
- Coloca o conteúdo da página

**Etapa 2 — Me manda no chat**
- O HTML completo
- O CSS específico (se tiver)
- Me diz qualquer dúvida que tiver

**Etapa 3 — Eu reviso e devolvo:**
- HTML otimizado
- Title e meta description corretos
- Open Graph tags
- Schema.org se aplicável
- Anotações do que mudei e por quê

**Etapa 4 — Você cola o código revisado**
- Substitui o seu HTML pelo otimizado
- Testa em `/novo/[nome-da-pagina]`

**Etapa 5 — Marca ✅ e vai pra próxima**

### Checklist por página:

Toda página que você fizer precisa ter isso (CHECK uma a uma):

```
[ ] <title> único e descritivo (50-60 caracteres)
[ ] <meta name="description"> única (140-160 caracteres)
[ ] <link rel="canonical">
[ ] <meta name="viewport">
[ ] <meta name="rating" content="adult">
[ ] Open Graph tags (og:title, og:description, og:image, og:url)
[ ] Twitter Card tags
[ ] hreflang (se tiver versão em outro idioma)
[ ] Skip link no body
[ ] SSI da navbar
[ ] SSI do footer
[ ] H1 único na página
[ ] Hierarquia H2/H3 correta
[ ] Imagens com width/height/alt
[ ] Links externos com rel="noopener nofollow sponsored"
[ ] Mobile-first testado
```

### ✅ Você terminou a Fase 4 quando:

- [ ] `/` (Gateway) pronta
- [ ] `/home` (Hub) pronta
- [ ] `/privacy` pronta
- [ ] `/onlyfans` pronta
- [ ] `/sobre` pronta
- [ ] Todas testadas no celular
- [ ] Marca aqui: Fase 4 completa em ___/___/2026

---

## 📄 FASE 5 — PÁGINAS SECUNDÁRIAS

**Objetivo:** completar o site com as demais páginas.

### Ordem sugerida:

```
1º) /telegram-gratis
2º) /telegram-vip
3º) /videos
4º) /fotos (packs pagos)
5º) /galeria (galeria grátis)
6º) /xvideos
7º) /experiencias
8º) /contato
9º) /blog (estrutura base)
10º) Páginas legais (/termos, /privacidade, /dmca, /2257)
```

### Como trabalhar:

Mesmo ciclo da Fase 4. Você manda, eu reviso, você cola.

### ✅ Você terminou a Fase 5 quando:

- [ ] Todas as spokes criadas
- [ ] Páginas legais criadas
- [ ] Tudo linkado corretamente
- [ ] Marca aqui: Fase 5 completa em ___/___/2026

---

## 🖼️ FASE 6 — OTIMIZAÇÃO DE IMAGENS

**Objetivo:** site rápido em mobile (porque 83% do seu tráfego é mobile).

### O que faremos:

1. Converter todas as imagens importantes pra WebP/AVIF
2. Adicionar preload na imagem do hero (LCP)
3. Lazy loading em todas as outras
4. Tags `<picture>` pra suporte multi-formato
5. Sprite SVG pros ícones

### Vou te entregar nessa fase:

- Scripts pra converter imagens em lote
- Template `<picture>` pronto
- Configuração de preload

**(Detalhamento técnico vem quando chegarmos nessa fase.)**

### ✅ Você terminou a Fase 6 quando:

- [ ] Todas as imagens em WebP/AVIF
- [ ] Hero com preload
- [ ] Lazy loading em todas as outras
- [ ] Core Web Vitals verde no PageSpeed Insights
- [ ] Marca aqui: Fase 6 completa em ___/___/2026

---

## 🚀 FASE 7 — DEPLOY SEGURO

**Objetivo:** colocar o site novo no ar SEM quebrar nada.

### Passo a passo crítico:

**1. Backup novo (do site velho + do /novo/ inteiro)**

**2. Move arquivos do /novo/ pra raiz:**
- Cuidado: NÃO sobrescreva o `.htaccess` que já está funcionando
- Move HTMLs, css, js, components, assets
- Move pasta /en/ se existir

**3. Apaga os arquivos antigos que foram substituídos:**
- `homepage.html` (já tem redirect 301 pro `/`)
- `landing.html` (já tem redirect)
- `vipacess.html` (já tem redirect)
- `getintouch.html` (já tem redirect)
- `index.html` antigo (vai ser substituído pelo gateway)

**4. Testa CADA URL importante:**

```
[ ] vanessarafaella.com/ → mostra gateway 18+
[ ] vanessarafaella.com/home → hub funcionando
[ ] vanessarafaella.com/privacy → spoke funcionando
[ ] vanessarafaella.com/onlyfans → spoke funcionando
[ ] vanessarafaella.com/sobre → página SEO funcionando
[ ] vanessarafaella.com/homepage.html → redireciona pra /
[ ] vanessarafaella.com/landing.html → redireciona pra /
[ ] vanessarafaella.com/vipacess.html → redireciona pra /onlyfans
[ ] Testa tudo no celular também
```

### ✅ Você terminou a Fase 7 quando:

- [ ] Site novo no ar
- [ ] Site antigo apagado
- [ ] Todos os redirects funcionando
- [ ] Tudo testado no celular
- [ ] Marca aqui: Fase 7 completa em ___/___/2026

---

## 📊 FASE 8 — PÓS-DEPLOY

**Objetivo:** avisar o Google que o site mudou e monitorar.

### Passo a passo:

**1. Cria e envia o sitemap.xml**

Cria o arquivo `sitemap.xml` na raiz:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vanessarafaella.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vanessarafaella.com/home</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vanessarafaella.com/sobre</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- adiciona todas as suas URLs aqui -->
</urlset>
```

**2. No Search Console:**
- Menu Indexação → Sitemaps → adiciona `sitemap.xml`
- Inspeção de URL → testa as URLs principais e clica "Solicitar indexação"

**3. Monitoramento (primeiras 4 semanas):**
- Olha o Search Console 1x por semana
- Acompanha: indexação aumentando? Cliques crescendo? Erros sumindo?

### ✅ Você terminou a Fase 8 quando:

- [ ] Sitemap enviado
- [ ] URLs principais reindexadas
- [ ] Erros antigos sumindo do Search Console
- [ ] Marca aqui: Fase 8 completa em ___/___/2026

🎉 **SE VOCÊ CHEGOU AQUI, O PROJETO TÁ NO AR E OTIMIZADO.**

---

## 📚 REFERÊNCIA RÁPIDA

### Estrutura final do site:

```
vanessarafaella.com/
├── /                    Gateway 18+
├── /home                Hub roteador
├── /sobre               Página SEO máximo
├── /privacy             PT-BR spoke
├── /onlyfans            EN spoke
├── /videos              Catálogo
├── /fotos               Packs avulsos
├── /galeria             Galeria grátis
├── /telegram-gratis     Lead magnet
├── /telegram-vip        Pago + bot
├── /xvideos             Canal
├── /experiencias        Premium
├── /contato             Links oficiais
├── /blog                Blog SEO
├── /termos
├── /privacidade
├── /dmca
└── /2257
```

### Mapa de cores por plataforma:

| Plataforma | Cor | Uso |
|---|---|---|
| Geral / Fire | #E50914 (vermelho) | CTAs principais |
| OnlyFans | #00AFF0 (azul) | Botões e destaques OF |
| Privacy | #FF8C00 (laranja) | Botões e destaques Privacy |
| Telegram | #229ED9 (azul claro) | Botões Telegram |
| Hot accent | #FF6B35 (laranja vibrante) | Fire details |

### Os 5 elementos em CADA `<head>`:

```html
<title>...</title>
<meta name="description" content="...">
<link rel="canonical" href="...">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="rating" content="adult">
```

### Em CADA imagem:

```html
<img src="..." width="X" height="Y" alt="..." loading="lazy">
```

### Em CADA link externo:

```html
<a href="..." target="_blank" rel="noopener nofollow sponsored">...</a>
```

### Em CADA página (semântica):

```html
<body>
  <a href="#main-content" class="skip-link">Pular para o conteúdo</a>
  <!--#include virtual="/components/nav.html" -->
  <main id="main-content">
    <h1>Título único da página</h1>
    <!-- conteúdo -->
  </main>
  <!--#include virtual="/components/footer.html" -->
</body>
```

---

## 📞 QUANDO ME CHAMAR

Pra eu te ajudar do melhor jeito, me chama nesses momentos:

### ✅ Sempre me chame quando:

- Terminar uma fase e quiser começar a próxima
- Tiver código pra revisar (manda HTML + CSS)
- Travar em alguma coisa (descreve o que tentou fazer)
- Algo der erro (manda print do erro)

### 💬 Como me chamar de forma eficiente:

Em vez de "tá dando erro, me ajuda" → manda:
1. **Em qual fase você está**
2. **O que você tentou fazer**
3. **O que aconteceu (print se possível)**
4. **O código que você usou (se aplicável)**

Assim eu resolvo rapidinho.

### 📋 Exemplo bom:

> "Tô na Fase 3, criei o nav.html, mas quando coloco o SSI na minha página de teste, aparece o código `<!--#include virtual="..."` literalmente em vez do conteúdo. Tentei verificar se o `.htaccess` tem `Options +Includes` e tem. Print em anexo."

### ❌ Exemplo ruim:

> "Não tá funcionando"

---

## 🎯 SUA PRÓXIMA AÇÃO AGORA

Olha aqui ó. Não é tudo de uma vez. É só isso:

### **Faz APENAS a Fase 0.**

1. Backup do site atual (`.zip` no teu computador)
2. Criar estrutura de pastas local
3. Inicializar Git
4. Testar SSI

**Quando terminar a Fase 0, volta aqui, marca o ✅, e me chama dizendo "Terminei a Fase 0".**

Aí a gente começa a Fase 1 juntas.

Tá tudo bem. Você tá no caminho certo. É só passo a passo. 🔥

---

**Arquivo:** `manual-mestre.md`
**Próxima atualização:** quando avançarmos pra próxima fase
**Mantido por:** Vanessa + Claude
