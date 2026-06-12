# 📋 Fase 3 — Revisão dos Componentes

> Documento de referência da revisão técnica feita em junho/2026.
> Salva isso junto com os arquivos no GitHub.

---

## 📦 Arquivos entregues nessa revisão

```
/components/
  ├── nav.html              ← Substituir o seu atual
  ├── mobile-menu.html      ← Substituir o seu atual
  └── footer.html           ← Substituir o seu atual

/js/
  └── nav.js                ← Substituir o seu atual

/template-pagina.html       ← Use como base pra novas páginas
```

---

## 🐛 Os 9 bugs que foram corrigidos

### 1. `id="mainNav"` faltando

**Problema:** O `nav.js` linha 67 fazia `document.getElementById('mainNav')`, mas o seu `nav.html` tinha só `<nav class="nav">` sem ID.

**Consequência:** Efeito de sombra na navbar ao rolar não funcionava.

**Correção:** Adicionado `id="mainNav"` no `<nav>` principal.

### 2. Caminhos `/novo/` hardcoded

**Problema:** Todos os links e srcs começavam com `/novo/`. Quando você fizer deploy pra raiz, vai quebrar TUDO.

**Consequência:** Site totalmente quebrado após deploy.

**Correção:** Trocado por paths absolutos sem `/novo/`. Durante desenvolvimento, o `.htaccess` dentro de `/novo/` cuida do roteamento.

### 3. Caminhos `./assets/` relativos

**Problema:** Footer e mobile-menu usavam `./assets/...` (relativo). Em qualquer URL profunda (ex: `/blog/post-1`), o navegador procuraria `./assets` dentro de `/blog/`.

**Consequência:** Imagens quebradas em páginas internas.

**Correção:** Padronizado pra `/assets/...` (absoluto).

### 4. Font Awesome não carregado

**Problema:** Você usa MUITO `<i class="fas fa-...">`, mas o Font Awesome não estava sendo carregado em lugar nenhum.

**Consequência:** Todos os ícones ficavam invisíveis.

**Correção:** Adicionado no `<head>` do template:
```html
<link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      crossorigin="anonymous">
```

### 5. `id="mobile-overlay"` não existia

**Problema:** `nav.js` linha 260 procurava `document.getElementById('mobile-overlay')`, mas nenhum HTML tinha esse elemento.

**Consequência:** Quando o menu mobile abrisse, o fundo escuro não apareceria, e o usuário não conseguiria fechar clicando fora.

**Correção:** Adicionado `<div class="mob-overlay" id="mobile-overlay">` no início do `mobile-menu.html`.

### 6. IDs inconsistentes

**Problema:**
- `nav.html`: `aria-controls="mobileMenu"`
- `mobile-menu.html`: `id="mobMenu"`

Não batem. Quebra a relação ARIA.

**Correção:** Padronizado em `mobMenu` nos dois lugares.

### 7. Classe `fire-text` inexistente

**Problema:** No `nav.html` linha 19 usava `class="nav-logo-name fire-text"`, mas `fire-text` não existia no CSS.

**Consequência:** Nada (porque a classe não fazia nada), mas confunde quem lê.

**Correção:** Removida a classe `fire-text` do HTML.

### 8. `<nav>` aninhado dentro de `<nav>`

**Problema:** No `mobile-menu.html`:
```html
<nav class="mob-menu">         <!-- nav 1 -->
  <nav class="mob-nav">         <!-- nav 2 dentro do nav 1 = HTML inválido -->
    <a>...</a>
  </nav>
</nav>
```

**Consequência:** HTML inválido, problemas em validadores W3C e leitores de tela.

**Correção:** O elemento externo virou `<aside>` (porque é um painel/diálogo), e o interno virou `<div class="mob-nav" role="list">`.

### 9. `init()` não chamava `setupScroll()` nem `setupMobileMenu()`

**Problema:** O `nav.js` tinha duas funções separadas: `initNav()` e `initMobileMenu()`. Mas o `index.html` chamava elas de forma confusa, e `setupScroll()` nunca rodava.

**Consequência:** Scroll da navbar e menu mobile não funcionavam.

**Correção:** Reescrito o `nav.js` com uma única função `init()` que roda no `DOMContentLoaded` e chama tudo na ordem correta.

---

## 🛠️ Padronização aplicada

### Estrutura de pastas em `/assets/`

```
/assets/
  ├── img/        ← Fotos da Vanessa (perfil, hero, galeria)
  ├── icons/      ← Ícones de plataformas e redes sociais
  └── video/      ← Vídeos
```

**Importante:** Você precisa renomear suas pastas atuais:

| Pasta atual | Renomear para |
|---|---|
| `assets/icon/` | `assets/icons/` |
| `assets/images/` | `assets/img/` (já é o nome certo) |

### URLs internas

| Antes | Depois |
|---|---|
| `#main-platforms` (âncora) | `/sobre` (URL real) |
| `legal/terms-of-service.html` | `/legal/termos` |
| `./assets/icon/foto.png` | `/assets/icons/foto.png` |
| `/novo/components/nav.html` | `/components/nav.html` |

### IDs padronizados

| Elemento | ID |
|---|---|
| Navbar principal | `mainNav` |
| Menu mobile | `mobMenu` |
| Overlay do menu | `mobile-overlay` |
| Botão fechar menu | `mobClose` |
| Botão hamburger | `hamburger` |
| Botão MENU desktop | `btnMenuDesktop` |
| Botão tema (navbar) | `themeToggle` |
| Botão tema (mobile) | `mobThemeBtn` |
| Seletor idioma | `langSel` |
| Trigger idioma | `langTrigger` |

---

## ✅ Como aplicar a revisão (passo a passo)

### Passo 1 — Backup
- Antes de qualquer coisa, baixa seus arquivos atuais do servidor pro computador.
- Cria uma pasta `backup-pre-fase3-junho-2026` no teu PC.

### Passo 2 — Substituir os arquivos

**No File Manager do cPanel, dentro de `/novo/`:**

- `/components/nav.html` → substitui pelo novo
- `/components/mobile-menu.html` → substitui pelo novo
- `/components/footer.html` → substitui pelo novo
- `/js/nav.js` → substitui pelo novo

### Passo 3 — Renomear pastas

No File Manager:
- `/novo/assets/icon/` → renomeia pra `icons`
- `/novo/assets/images/` → renomeia pra `img` (se existir)
- Move qualquer arquivo solto pra pasta certa

### Passo 4 — Criar novo arquivo de teste

Cria `/novo/teste-ssi.html` com o conteúdo do `template-pagina.html` que entreguei.

### Passo 5 — Testar

Acessa no navegador:
```
https://vanessarafaella.com/novo/teste-ssi.html
```

**Checklist do que deve funcionar:**

- [ ] Navbar aparece no topo
- [ ] Foto, nome e selo verificado aparecem
- [ ] Ícones do Font Awesome (check verificado, hambúrguer) aparecem
- [ ] Botão de tema funciona (clica e troca dark/light)
- [ ] Seletor de idioma abre dropdown
- [ ] Trocar idioma muda os textos
- [ ] Menu hambúrguer abre o painel lateral
- [ ] Overlay escuro aparece atrás do menu mobile
- [ ] Botão X fecha o menu
- [ ] Clicar fora do menu fecha o menu
- [ ] Apertar Escape fecha o menu
- [ ] Scroll na página adiciona sombra na navbar
- [ ] Footer aparece embaixo
- [ ] Barra fixa (Privacy, OnlyFans, Fotos, Vídeos, Telegram) aparece no rodapé
- [ ] Botão WhatsApp flutuante aparece no canto direito

### Passo 6 — Se algo não funcionar

Abre o Console do navegador (F12 → Console):

- **Erro 404 em `/components/nav.html`** → SSI não está habilitado. Verifica o `.htaccess`.
- **Imagens com X vermelho** → Verifica se o nome e a pasta do arquivo de imagem batem com o HTML.
- **Ícones do Font Awesome não aparecem** → Verifica se o link no `<head>` do template está OK.
- **`Cannot read property of null`** → Algum elemento HTML está faltando. Manda print do erro.

---

## 📐 Lembretes pra próximas páginas

Quando criar uma página nova, **sempre copia do `template-pagina.html`** e ajusta:

1. **Title** específico da página
2. **Meta description** específica (140-160 caracteres)
3. **Canonical** com a URL final
4. **Open Graph** com texto e imagem específicos
5. **Conteúdo dentro de `<main id="main-content">`**

E nunca esquece dos 5 obrigatórios no `<head>`:

```html
<title>...</title>
<meta name="description" content="...">
<link rel="canonical" href="...">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="rating" content="adult">
```

---

## 🎯 Você terminou a Fase 3 quando:

- [ ] Substituiu os 4 arquivos (`nav.html`, `mobile-menu.html`, `footer.html`, `nav.js`)
- [ ] Renomeou as pastas de assets (`icon` → `icons`)
- [ ] Criou o `teste-ssi.html` novo
- [ ] Testou TODO o checklist do Passo 5 acima
- [ ] Tudo funcionando — marca Fase 3 ✅ no `manual-mestre.md`

---

## 🚀 Próximo passo: Fase 4

Quando a Fase 3 estiver toda ✅, a gente começa a **Fase 4 (Páginas principais)**:

1. `/` (Gateway 18+)
2. `/home` (Hub)
3. `/privacy`
4. `/onlyfans`
5. `/sobre`

Pra cada uma, você vai me mandar o HTML que estiver fazendo, e eu reviso e devolvo otimizado — mesmo ciclo da Fase 3.

**Você tá indo muito bem.** O código que você fez tem qualidade. Só estamos polindo. 🔥
