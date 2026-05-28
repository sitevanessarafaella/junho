
**ESTRUTURA**

vanessa-site/<br>
│<br>
├── index.html                    ← monta tudo com os componentes<br>
├── fotos.html                    ← galeria (futura)<br>
│
├── css/<br>
│   ├── base.css                  ← variáveis + reset + container
│   ├── nav.css                   ← navbar + menu mobile
│   ├── hero.css                  ← hero com vídeo
│   ├── sections.css              ← plataformas, vídeos, telegram, etc
│   ├── footer.css                ← footer + barra fixa + WhatsApp
│   └── responsive.css            ← media queries (SEMPRE por último)
│
├── components/
│   ├── nav.html                  ← HTML isolado da navbar
│   ├── mobile-menu.html          ← HTML do menu mobile
│   └── footer.html               ← HTML do footer
│
├── js/
│   ├── components-loader.js      ← carrega os componentes via fetch()
│   ├── nav.js                    ← lógica da navbar
│   ├── theme.js                  ← dark/light toggle
│   ├── lang.js                   ← seletor de idioma
│   ├── gallery.js                ← lógica da galeria + lightbox
│   └── cursor.js                 ← cursor customizado
│
├── assets/
│   ├── img/                      ← SVGs, ícones de nav
│   ├── icon/                     ← ícones das plataformas
│   └── images/                   ← ícones do menu mobile
│
├── img/pics/                     ← fotos da galeria
├── video/                        ← vídeos
└── legal/                        ← termos, privacidade, DMCA
