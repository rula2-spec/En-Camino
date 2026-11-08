/* ==========================================================================
   En Camino · Servicios
   - Los chips filtran la lista por tipo; si no queda ninguno elegido, vuelve a «Todos».
   - Volver: a la pantalla anterior, o al Mapa si se entró directo.
   Los servicios, kilómetros y estados son de ejemplo (pantalla final 10).
   ========================================================================== */
(function () {
  "use strict";
  const servicios = [...document.querySelectorAll(".servicio")];
  const chips = [...document.querySelectorAll('[data-grupo="tipo"]')];
  const todos = chips.find(c => c.dataset.tipo === "todos");

  function filtrar() {
    const activo = chips.find(c => c.getAttribute("aria-pressed") === "true");
    const tipo = activo ? activo.dataset.tipo : "todos";
    servicios.forEach(s => { s.hidden = tipo !== "todos" && s.dataset.tipo !== tipo; });
  }

  document.addEventListener("ec:cambio", (e) => {
    const d = e.detail;
    if (d.tipo === "alternar" && d.grupo === "tipo") {
      if (!chips.some(c => c.getAttribute("aria-pressed") === "true")) todos.setAttribute("aria-pressed", "true");
      filtrar();
    } else if (d.accion === "volver-servicios") {
      window.ecVolver("mapa");
    }
  });
})();
