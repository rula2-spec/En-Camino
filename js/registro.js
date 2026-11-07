/* ==========================================================================
   En Camino · Pantalla de registro (paso 1 de 2)
   ========================================================================== */
(function () {
  "use strict";
  // El navegador valida los campos obligatorios antes de llegar acá.
  // Todavía no existe el paso 2 ni un servidor de cuentas: no hay adónde seguir.
  document.getElementById("form-registro").addEventListener("submit", (e) => {
    e.preventDefault();
  });
})();
