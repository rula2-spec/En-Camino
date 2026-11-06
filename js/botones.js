/* ==========================================================================
   En Camino · Interactividad base de los botones
   Sin dependencias. Incluir al final del <body>:  <script src="js/botones.js"></script>
   Cada componente emite un evento "ec:cambio" con el detalle del nuevo estado,
   para conectar la lógica propia de la app:
     document.addEventListener("ec:cambio", e => console.log(e.detail));
   ========================================================================== */
(function () {
  "use strict";
  const avisar = (el, detalle) => el.dispatchEvent(new CustomEvent("ec:cambio", { bubbles: true, detail: detalle }));
  const deshabilitado = el => el.disabled || el.getAttribute("aria-disabled") === "true";

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-ec]");
    if (!el || deshabilitado(el)) return;
    const tipo = el.dataset.ec;

    switch (tipo) {
      // Chips, favorito, marcadores: alternan aria-pressed
      case "alternar": {
        const grupo = el.dataset.grupo;          // chips con data-grupo = selección única dentro del grupo
        const nuevo = el.getAttribute("aria-pressed") !== "true";
        if (grupo && el.dataset.unico !== undefined) {
          document.querySelectorAll(`[data-ec="alternar"][data-grupo="${grupo}"]`).forEach(o => o.setAttribute("aria-pressed", "false"));
        }
        el.setAttribute("aria-pressed", String(nuevo));
        if (el.dataset.iconoActivo) {             // cambia el glifo (p. ej. favorito vacío → lleno)
          const use = el.querySelector("use");
          if (use) use.setAttribute("href", nuevo ? el.dataset.iconoActivo : el.dataset.iconoInactivo);
        }
        avisar(el, { tipo, id: el.id || el.dataset.id, activo: nuevo, grupo });
        break;
      }
      // Control segmentado y pestañas: una opción activa por grupo
      case "segmento": {
        const lista = el.closest("[role='tablist']");
        lista.querySelectorAll("[role='tab']").forEach(t => { t.setAttribute("aria-selected", "false"); t.tabIndex = -1; });
        el.setAttribute("aria-selected", "true"); el.tabIndex = 0;
        avisar(el, { tipo, grupo: lista.dataset.id, valor: el.dataset.valor });
        break;
      }
      // Barra inferior: un destino actual
      case "nav": {
        el.closest(".nav-inferior").querySelectorAll(".nav-item").forEach(n => n.removeAttribute("aria-current"));
        el.setAttribute("aria-current", "page");
        avisar(el, { tipo, destino: el.dataset.destino });
        break;
      }
      // Interruptores
      case "switch": {
        const nuevo = el.getAttribute("aria-checked") !== "true";
        el.setAttribute("aria-checked", String(nuevo));
        avisar(el, { tipo, id: el.id || el.dataset.id, encendido: nuevo });
        break;
      }
      // Ítem de lista con interruptor: tocar la fila cambia el interruptor
      case "fila-switch": {
        const sw = el.querySelector(".switch");
        if (sw && e.target.closest(".switch") !== sw) sw.click();
        break;
      }
      // Acordeón
      case "acordeon": {
        const abierto = el.getAttribute("aria-expanded") === "true";
        el.setAttribute("aria-expanded", String(!abierto));
        const panel = document.getElementById(el.getAttribute("aria-controls"));
        if (panel) panel.hidden = abierto;
        avisar(el, { tipo, abierto: !abierto });
        break;
      }
      // Reproducir / pausar
      case "reproducir": {
        const sonando = el.getAttribute("aria-pressed") === "true";
        el.setAttribute("aria-pressed", String(!sonando));
        el.setAttribute("aria-label", sonando ? "Reproducir" : "Pausar");
        const use = el.querySelector("use"); if (use) use.setAttribute("href", sonando ? "#g-play" : "#g-pausa");
        avisar(el, { tipo, reproduciendo: !sonando });
        break;
      }
      // Contador del rosario: cada toque avanza una cuenta (1 a 10)
      case "contador": {
        const total = +el.dataset.total || 10;
        let n = (+el.dataset.valor || 1) % total + 1;
        el.dataset.valor = n;
        el.querySelectorAll("[data-cuenta]").forEach(c => {
          const k = +c.dataset.cuenta;
          c.setAttribute("fill", k < n ? "#FCCB68" : k === n ? "#323366" : "#D9D3C4");
          c.setAttribute("r", k === n ? 12 : 9);
        });
        const t = el.querySelector("[data-numero]"); if (t) t.textContent = `${n}/${total}`;
        if (navigator.vibrate && el.dataset.vibrar !== "false") navigator.vibrate(30);
        el.setAttribute("aria-label", `Cuenta ${n} de ${total}. Tocá para avanzar`);
        avisar(el, { tipo, cuenta: n, total });
        break;
      }
      // Cerrar banner
      case "cerrar-banner": {
        const b = el.closest(".banner-emergencia"); if (b) b.hidden = true;
        avisar(el, { tipo });
        break;
      }
      // Tamaño de texto: Aa alterna 1 → 1.15 → 1.3; A− y A+ ajustan en pasos
      case "texto": {
        const raiz = document.documentElement;
        let s = parseFloat(getComputedStyle(raiz).getPropertyValue("--ec-escala-texto")) || 1;
        const acc = el.dataset.accion;
        s = acc === "mas" ? Math.min(1.3, s + 0.15) : acc === "menos" ? Math.max(1, s - 0.15) : (s >= 1.3 ? 1 : s + 0.15);
        raiz.style.setProperty("--ec-escala-texto", s.toFixed(2));
        avisar(el, { tipo, escala: +s.toFixed(2) });
        break;
      }
      // Botones de acción simple: navegan o disparan una acción
      default: {
        if (el.dataset.destino) avisar(el, { tipo: "navegar", destino: el.dataset.destino, origen: el.dataset.id });
        else avisar(el, { tipo: "accion", accion: tipo, id: el.dataset.id });
      }
    }
  });

  // Flechas izquierda/derecha dentro de controles segmentados (accesibilidad de teclado)
  document.addEventListener("keydown", (e) => {
    const tab = e.target.closest("[role='tab']"); if (!tab || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const tabs = [...tab.closest("[role='tablist']").querySelectorAll("[role='tab']")];
    const i = tabs.indexOf(tab) + (e.key === "ArrowRight" ? 1 : -1);
    const sig = tabs[(i + tabs.length) % tabs.length]; sig.focus(); sig.click();
  });
})();
