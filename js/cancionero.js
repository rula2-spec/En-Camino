/* ==========================================================================
   En Camino · Cancionero
   - Buscar filtra la lista por título o tipo (sin importar mayúsculas ni tildes).
   - Los chips filtran por tipo; si no queda ninguno elegido, vuelve a «Todos».
   - El corazón marca favoritos (botones.js cambia el ícono).
   - Reproducir cambia el ícono, pero todavía no hay audio.
   Los cantos son marcadores de la pantalla final: falta cargar el repertorio real.
   ========================================================================== */
(function () {
  "use strict";
  const cantos = [...document.querySelectorAll(".canto")];
  const buscar = document.getElementById("cancionero-buscar");
  const vacio = document.getElementById("cantos-vacio");
  const chips = [...document.querySelectorAll('[data-grupo="categoria"]')];
  const todos = chips.find(c => c.dataset.categoria === "todos");
  const normalizar = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  function filtrar() {
    const activo = chips.find(c => c.getAttribute("aria-pressed") === "true");
    const categoria = activo ? activo.dataset.categoria : "todos";
    const texto = normalizar(buscar.value.trim());
    let visibles = 0;
    cantos.forEach(c => {
      const coincide = (categoria === "todos" || c.dataset.categoria === categoria) && (!texto || normalizar(c.textContent).includes(texto));
      c.hidden = !coincide;
      if (coincide) visibles++;
    });
    vacio.hidden = visibles > 0;
  }

  document.addEventListener("ec:cambio", (e) => {
    const d = e.detail;
    if (d.tipo === "alternar" && d.grupo === "categoria") {
      if (!chips.some(c => c.getAttribute("aria-pressed") === "true")) todos.setAttribute("aria-pressed", "true");
      filtrar();
    } else if (d.accion === "volver-cancionero") {
      window.ecVolver("espiritual");
    }
  });
  buscar.addEventListener("input", filtrar);
})();
