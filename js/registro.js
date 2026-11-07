/* ==========================================================================
   En Camino · Pantalla de registro (paso 1 de 2)
   ========================================================================== */
(function () {
  "use strict";
  const unirme = document.getElementById("registro-unirme");
  const codigo = document.getElementById("registro-codigo");

  // «Unirme» bloquea el código y pasa a «Modificar»; «Modificar» lo vuelve a habilitar.
  // Todavía no hay grupos reales: el código no se verifica.
  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.accion !== "unirme") return;
    const unido = unirme.getAttribute("aria-pressed") !== "true";
    unirme.setAttribute("aria-pressed", String(unido));
    unirme.setAttribute("aria-label", unido ? "Modificar el código de grupo" : "Unirme");
    codigo.readOnly = unido;
    if (!unido) codigo.focus();
  });

  // El navegador valida los campos obligatorios antes de llegar acá.
  // Todavía no hay servidor de cuentas: los datos no se guardan.
  document.getElementById("form-registro").addEventListener("submit", (e) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent("ec:cambio", { detail: { tipo: "navegar", destino: "permisos" } }));
  });
})();
