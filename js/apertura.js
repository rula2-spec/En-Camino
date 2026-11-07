/* ==========================================================================
   En Camino · Pantalla de apertura
   Muestra la marca un momento y pasa a Carga.
   ========================================================================== */
(function () {
  "use strict";
  const DURACION = 1800; // ms con la marca en pantalla

  setTimeout(() => {
    document.dispatchEvent(new CustomEvent("ec:cambio", { detail: { tipo: "navegar", destino: "carga", reemplazar: true } }));
  }, DURACION);
})();
