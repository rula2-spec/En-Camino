/* ==========================================================================
   En Camino · Preguntas frecuentes
   - Cada pregunta abre y cierra su respuesta (acordeón de botones.js).
   - Volver: a la pantalla anterior, o a Ayuda si se entró directo.
   ========================================================================== */
(function () {
  "use strict";
  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.accion === "volver-preguntas") window.ecVolver("ayuda");
  });
})();
