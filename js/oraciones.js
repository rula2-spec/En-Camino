/* ==========================================================================
   En Camino · Oraciones
   - Buscar filtra la lista por título o tipo (sin importar mayúsculas ni tildes).
   - Los chips filtran por tipo; si no queda ninguno elegido, vuelve a «Todas».
   - El corazón marca favoritas (botones.js cambia el ícono).
   - Reproducir cambia el ícono, pero todavía no hay audio.
   - Volver: a la pantalla anterior, o a Fe y comunidad si se entró directo.
   Las oraciones son marcadores del diseño: falta cargar los textos reales.
   ========================================================================== */
(function () {
  "use strict";
  const oraciones = [...document.querySelectorAll(".canto")];
  const buscar = document.getElementById("oraciones-buscar");
  const vacio = document.getElementById("oraciones-vacio");
  const chips = [...document.querySelectorAll('[data-grupo="categoria"]')];
  const todas = chips.find(c => c.dataset.categoria === "todas");
  const normalizar = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function filtrar() {
    const activo = chips.find(c => c.getAttribute("aria-pressed") === "true");
    const categoria = activo ? activo.dataset.categoria : "todas";
    const texto = normalizar(buscar.value.trim());
    let visibles = 0;
    oraciones.forEach(o => {
      const coincide = (categoria === "todas" || o.dataset.categoria === categoria) && (!texto || normalizar(o.textContent).includes(texto));
      o.hidden = !coincide;
      if (coincide) visibles++;
    });
    vacio.hidden = visibles > 0;
  }

  document.addEventListener("ec:cambio", (e) => {
    const d = e.detail;
    if (d.tipo === "alternar" && d.grupo === "categoria") {
      if (!chips.some(c => c.getAttribute("aria-pressed") === "true")) todas.setAttribute("aria-pressed", "true");
      filtrar();
    } else if (d.accion === "volver-oraciones") {
      window.ecVolver("espiritual");
    }
  });
  buscar.addEventListener("input", filtrar);
})();
