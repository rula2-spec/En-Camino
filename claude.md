# En Camino

## Flujo de trabajo
- El usuario edita los archivos en esta carpeta (`C:\Mis proyectos_tesis\App`).
- Claude se encarga de hacer commit y push a GitHub cuando se lo piden.

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
