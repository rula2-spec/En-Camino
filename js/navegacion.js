/* ==========================================================================
   En Camino · Vinculación entre pantallas
   Escucha el evento "ec:cambio" y abre la página de cada destino.
   Los destinos sin ruta todavía no tienen pantalla: no hacen nada.
   ========================================================================== */
(function () {
  "use strict";
  const rutas = {
    apertura: "index.html",
    carga: "carga.html",
    bienvenida: "bienvenida.html",
    ingreso: "ingreso.html",
    registro: "registro.html",
  };

  document.addEventListener("ec:cambio", (e) => {
    const { tipo, destino, reemplazar } = e.detail;
    if (tipo !== "navegar" || !rutas[destino]) return;
    if (reemplazar) location.replace(rutas[destino]);
    else location.href = rutas[destino];
  });
})();
