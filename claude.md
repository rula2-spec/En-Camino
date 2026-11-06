# En Camino

## Flujo de trabajo
- Se trabaja en esta carpeta (`C:\Proyecto tesis ntmovil\App ntmovil\En-Camino`), que es la conectada a GitHub y Vercel.
- **Claude NUNCA hace commit ni push si el usuario no lo pide explícitamente.** Los cambios quedan locales hasta que el usuario diga que se suban.
- **Claude NO crea BAJO NINGUNA CIRCUNSTANCIA secciones ni páginas internas sin pedido expreso del usuario.** Solo se hace exactamente lo que se pide.
- **Al final de cada respuesta, Claude avisa siempre el estado del repo:** si hay archivos modificados sin subir (y cuáles) o si todo está igual que en GitHub.

## Material de diseño (`../materialdeapp`)
- El diseño se venía trabajando en los chats de Claude y se bajó a `C:\Proyecto tesis ntmovil\App ntmovil\materialdeapp`. **Es la referencia obligatoria para todo trabajo de diseño:** consultarla antes de diseñar o maquetar, sin esperar a que el usuario lo recuerde.
- **`materialdeapp` es de solo lectura: Claude NUNCA crea, edita, mueve ni borra nada ahí.** La única excepción es su `CLAUDE.md`, y solo si el usuario lo pide. Todo el trabajo se hace en `En-Camino`. Si hace falta un recurso (CSS, JS, fuentes, íconos), se copia a `En-Camino`, respetando la estructura de carpetas de este archivo.
- Qué hay:
  - `CLAUDE.md`: reglas de diseño, orden de pantallas y decisiones pendientes del trabajo en los chats.
  - `EnCamino_Botones/`: kit de botones (CSS, JS, íconos, catálogo y README).
  - `Manual de identidad En Camino.pdf`: manual de marca.
  - `En Camino - Pantallas finales/`: 20 pantallas de referencia.
  - `app/`: copia de los recursos del kit (`css/`, `js/`, `fuentes/`, `iconos/`), sin pantallas.
  - `16_Ferreyra_Martina_M4_fundamentacion_propuesta.docx`: fundamentación del trabajo final.
- El `CLAUDE.md` de `materialdeapp` define cómo usar esa carpeta y qué se prioriza en diseño: **las pantallas finales mandan sobre el manual de marca.** En flujo de trabajo y tecnologías manda este archivo.

## Tecnologías
- Lenguajes: **solo HTML, CSS y JavaScript**. Sin TypeScript, preprocesadores (Sass, etc.) ni bundlers.
- **Se pueden usar librerías JS/CSS**, especialmente **GSAP** (animaciones), entre otras.
- Cargar las librerías por CDN con versión fija (p. ej. `https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js`) con `<script>` en el HTML, o descargadas a `js/`. No usar npm/build.
- Sitio estático: no hay build, Vercel sirve los archivos tal cual.

## Tipografías
- Baga y Le Monde Sans se cargan desde Adobe Fonts: `<link rel="stylesheet" href="https://use.typekit.net/asn0sci.css">`
- Montserrat se carga desde Google Fonts, incluido el peso 300, que no está en el kit de botones.
- Familias CSS:
  - `"baga", sans-serif`: 300, 400, 500, 600 y 700.
  - `"lemonde-sans", sans-serif`: 200, 300, 400, 600, 700 y 800, normal e itálica.
  - `"le-monde-sans-std-2", sans-serif`: 500 (Book), normal e itálica.
  - `"Montserrat", sans-serif`: 300, 400, 500, 600 y 700. El 700 no está en el manual, pero lo usa `css/botones.css`.
- Uso según el manual de marca:
  - **Baga Light:** nombre de la marca y titulares de lanzamiento. Nunca para textos de lectura.
  - **Le Monde Sans:** editorial e impresos. Light para títulos y textos destacados; Regular para subtítulos y cuerpo.
  - **Montserrat:** app, web, redes y explicaciones. Light para titular y cuerpo, Regular para subtítulo y notas, SemiBold en mayúsculas para antetítulos.
- Criterio a confirmar para la app: Baga en marca y lanzamiento, Le Monde Sans Light en títulos de pantalla (como se ven en las pantallas finales) y Montserrat en el resto.
- Esto resuelve el pendiente de tipografía del `CLAUDE.md` de `materialdeapp`.

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
- **Lo único que se sube al repositorio es la carpeta `En-Camino` con todo lo que incluye.** `materialdeapp` y el `CLAUDE.md` de la carpeta superior quedan afuera.
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
