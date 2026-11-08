/* ==========================================================================
   En Camino · Ajustes
   - Los interruptores cambian (botones.js), pero todavía no activan permisos
     reales ni se guardan.
   - Volver: a la pantalla anterior, o a Inicio si se entró directo.
   ========================================================================== */
(function () {
  "use strict";
  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.accion === "volver-ajustes") window.ecVolver("inicio");
  });
})();
