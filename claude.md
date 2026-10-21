# En Camino

## Flujo de trabajo
- El usuario edita los archivos en esta carpeta (`C:\Mis proyectos_tesis\App`).
- **Claude NUNCA hace commit ni push si el usuario no lo pide explícitamente.** Los cambios quedan locales hasta que el usuario diga que se suban.
- **Claude NO crea BAJO NINGUNA CIRCUNSTANCIA secciones ni páginas internas sin pedido expreso del usuario.** Solo se hace exactamente lo que se pide.

## Tecnologías
- Lenguajes: **solo HTML, CSS y JavaScript**. Sin TypeScript, preprocesadores (Sass, etc.) ni bundlers.
- **Se pueden usar librerías JS/CSS**, especialmente **GSAP** (animaciones), entre otras.
- Cargar las librerías por CDN con versión fija (p. ej. `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`) con `<script>` en el HTML, o descargadas a `js/`. No usar npm/build.
- Sitio estático: no hay build, Vercel sirve los archivos tal cual.

## Estructura de carpetas
```
/
├── index.html      ← página principal (obligatorio en la raíz)
├── *.html          ← otras páginas, también en la raíz
├── css/            ← hojas de estilo (.css)
├── js/             ← scripts (.js)
├── imagenes/       ← imágenes y otros recursos gráficos
└── claude.md
```
- Cada carpeta tiene un `.gitkeep` para que Git la suba vacía; se puede borrar cuando tenga archivos.
- Referencias siempre con rutas relativas, p. ej. `css/estilos.css`, `js/main.js`, `imagenes/logo.png`.
- Cuando se empiece a diseñar una sección nueva, crear los archivos dentro de estas carpetas (no sueltos en la raíz, salvo los `.html`).

## Repositorio GitHub
- URL: https://github.com/rula2-spec/En-Camino
- Remote: `origin` → `https://github.com/rula2-spec/En-Camino.git`
- Rama: `main` (se pushea directo a `main`)
- Autor de commits (config local del repo): `rula2-spec <rula.universidad2@gmail.com>`
- Autenticación: Git Credential Manager (sesión de GitHub ya iniciada en Windows)

## Vercel
- El proyecto de Vercel está conectado a este repo: cada push a `main` dispara un deploy.
- Root Directory: `./` (raíz del repo). No hay subcarpeta de fuente.
- **El `index.html` tiene que estar en la raíz del repo**, al lado de este archivo, o el sitio da 404.
- Todos los archivos estáticos (CSS, JS, imágenes) se referencian con rutas relativas a la raíz.
- Plugin de Vercel para Claude Code instalado: `vercel-plugin@vercel` (scope usuario).

## Entorno
- Windows 11, PowerShell. Git y Node.js LTS instalados con winget.
- Si `git`/`node` no se reconocen en una terminal nueva, reiniciar VS Code para refrescar el PATH.
