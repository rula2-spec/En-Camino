/* ==========================================================================
   En Camino · Inicio (Durante)
   - Cuentas de avance: verdes las recorridas, amarilla la actual, vacías las que faltan.
   - Cabecera compacta: aparece fija arriba cuando la cabecera grande sale de la pantalla.
   Los kilómetros son de ejemplo (14,2 de 30): todavía no hay ubicación real.
   ========================================================================== */
(function () {
  "use strict";
  const TOTAL_CUENTAS = 20;
  const contenedor = document.getElementById("avance-cuentas");
  const km = parseFloat(contenedor.dataset.km);
  const total = parseFloat(contenedor.dataset.total);
  const actual = Math.floor(km / total * TOTAL_CUENTAS);   // índice de la cuenta en curso

  for (let i = 0; i < TOTAL_CUENTAS; i++) {
    const c = document.createElement("span");
    c.className = "avance__cuenta" + (i < actual ? " avance__cuenta--hecha" : i === actual ? " avance__cuenta--actual" : "");
    contenedor.appendChild(c);
  }

  const compacta = document.getElementById("cabecera-compacta");
  const cabecera = document.getElementById("cabecera-inicio");
  function revisarCabecera() {
    compacta.classList.toggle("compacta--visible", cabecera.getBoundingClientRect().bottom < 0);
  }
  window.addEventListener("scroll", revisarCabecera, { passive: true });
  revisarCabecera();
})();
