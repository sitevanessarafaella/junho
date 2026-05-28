```markdown
# 🎀 vanessa-site

**Site Oficial da Vanessa Rafaella**  
*O site mais putinha, organizado e bonito da internet* 🔥

> Site 100% frontend, performático, responsivo e com cara de OnlyFans premium.  
> Feito com amor, tesão e muito café (e um pouquinho de dark mode pra ficar safado de noite).

---

## ✨ Funcionalidades

- Navbar com menu mobile lindo e fluido
- Hero com vídeo de fundo (autoplay + mute)
- Dark/Light mode toggle
- Seletor de idioma (PT/ENG)
- Galeria com lightbox (futura)
- Cursor customizado
- Componentes carregados via JS (clean code)
- Totalmente responsivo (mobile-first)
- Barra fixa do WhatsApp no footer
- Código limpo, modular e fácil de manter

---

## 📁 Estrutura do Projeto

```bash
vanessa-site/
│
├── index.html                 ← monta tudo com os componentes
├── fotos.html                 ← galeria (futura)
│
├── css/
│   ├── base.css               ← variáveis + reset + container
│   ├── nav.css                ← navbar + menu mobile
│   ├── hero.css               ← hero com vídeo
│   ├── sections.css           ← plataformas, vídeos, telegram, etc
│   ├── footer.css             ← footer + barra fixa + WhatsApp
│   └── responsive.css         ← media queries (SEMPRE por último)
│
├── components/
│   ├── nav.html               ← HTML isolado da navbar
│   ├── mobile-menu.html       ← HTML do menu mobile
│   └── footer.html            ← HTML do footer
│
├── js/
│   ├── components-loader.js   ← carrega os componentes via fetch()
│   ├── nav.js                 ← lógica da navbar
│   ├── theme.js               ← dark/light toggle
│   ├── lang.js                ← seletor de idioma
│   ├── gallery.js             ← lógica da galeria + lightbox
│   └── cursor.js              ← cursor customizado
│
├── assets/
│   ├── img/                   ← SVGs, ícones de nav
│   ├── icon/                  ← ícones das plataformas
│   └── images/                ← ícones do menu mobile
│
├── img/
│   └── pics/                  ← fotos da galeria
│
├── video/                     ← vídeos
│
└── legal/                     ← termos, privacidade, DMCA
```

---

## 🛠️ Tecnologias

- **HTML5** + **CSS3**
- **Vanilla JavaScript** (sem framework, bem leve)
- Fetch API para componentes
- CSS Variables + Flexbox + Grid
- Mobile-first + Media Queries

---

## 🚀 Como rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/vanessa-site.git
   ```

2. Entre na pasta:
   ```bash
   cd vanessa-site
   ```

3. Abra o `index.html` direto no navegador (ou use Live Server no VS Code).

Pronto. Tá no ar, tá lindo e tá safado.

---

## 📌 Próximos passos (Roadmap)

- [ ] Galeria completa com filtro por categoria
- [ ] Integração com Telegram + OnlyFans (botão direto)
- [ ] Otimização de performance (lazy load das fotos)
- [ ] Versão multilíngue completa
- [ ] SEO + meta tags

---

**Made with 🔥 and a lot of attitude by Vanessa Rafaella**

Quer contribuir? Abre um PR que eu analiso pelada (brincadeira… ou não 😏).

---

⭐ Se curtiu o projeto, deixa uma estrelinha que ajuda bastante!
```

**Como usar:**
1. Copie todo o texto acima.
2. No seu repositório GitHub, crie (ou edite) o arquivo `README.md`.
3. Cole e salve.
4. Commit e push.

Fica lindo, organizado e profissional (com aquele toque safado que a gente gosta).  

Quer que eu mude alguma coisa? Título mais safado, mais emojis, ou adicionar badges? Só falar que eu ajusto na hora! 💖
