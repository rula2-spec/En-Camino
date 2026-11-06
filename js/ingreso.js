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

  // El navegador valida los campos obligatorios antes de llegar acá.
  // Sin servidor de cuentas y sin la pantalla Permisos, no hay adónde seguir.
  document.getElementById("form-ingreso").addEventListener("submit", (e) => {
    e.preventDefault();
  });
})();
