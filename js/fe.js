/* ==========================================================================
   En Camino · Fe y comunidad
   Misterios del rosario según el día de la semana:
   lunes y sábado Gozosos · martes y viernes Dolorosos ·
   miércoles y domingo Gloriosos · jueves Luminosos.
   El avance («Ibas por la 2.ª decena») es de ejemplo: el Rosario guiado todavía no existe.
   ========================================================================== */
(function () {
  "use strict";
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const MISTERIOS = ["Gloriosos", "Gozosos", "Dolorosos", "Gloriosos", "Luminosos", "Dolorosos", "Gozosos"];
  const hoy = new Date().getDay();
  document.getElementById("misterios-dia").textContent = `Misterios de hoy · ${DIAS[hoy]}`;
  document.getElementById("misterios-nombre").textContent = `Misterios ${MISTERIOS[hoy]}`;
})();
