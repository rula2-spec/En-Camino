/* ==========================================================================
   En Camino · Mi equipo
   Volver: a la pantalla anterior, o a Inicio si se entró directo.
   Los integrantes, kilómetros y estados son de ejemplo (pantalla final 12).
   ========================================================================== */
(function () {
  "use strict";
  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.accion === "volver-equipo") window.ecVolver("inicio");
  });
})();
