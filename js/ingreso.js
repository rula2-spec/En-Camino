/* ==========================================================================
   En Camino · Pantalla de ingreso
   ========================================================================== */
(function () {
  "use strict";
  const contrasena = document.getElementById("ingreso-contrasena");

  // Mostrar u ocultar la contraseña
  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.id !== "ver-contrasena") return;
    contrasena.type = e.detail.activo ? "text" : "password";
    e.target.setAttribute("aria-label", e.detail.activo ? "Ocultar contraseña" : "Mostrar contraseña");
  });

  // Todavía no hay servidor de cuentas: «Ingresar» pasa directo a Permisos, sin verificar los datos.
  document.getElementById("form-ingreso").addEventListener("submit", (e) => {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent("ec:cambio", { detail: { tipo: "navegar", destino: "permisos" } }));
  });
})();
