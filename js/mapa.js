/* ==========================================================================
   En Camino · Mapa
   - Cuentas del recorrido: verdes las caminadas, azul la actual, vacías las que faltan.
   - «Guardado sin señal» solo si el mapa se descargó en la pantalla de permisos.
   - Acercar, alejar, «Dónde estoy» y «Mi ubicación» (centra en Vos).
   - Volver: regresa a la pantalla anterior, o a Inicio si se entró directo.
   Los kilómetros y las posiciones son de ejemplo: todavía no hay ubicación real.
   ========================================================================== */
(function () {
  "use strict";
  const TOTAL_CUENTAS = 24;
  const contenedor = document.getElementById("recorrido-cuentas");
  const actual = Math.floor(parseFloat(contenedor.dataset.km) / parseFloat(contenedor.dataset.total) * TOTAL_CUENTAS);
  for (let i = 0; i < TOTAL_CUENTAS; i++) {
    const c = document.createElement("span");
    c.className = "recorrido__cuenta" + (i < actual ? " recorrido__cuenta--hecha" : i === actual ? " recorrido__cuenta--actual" : "");
    contenedor.appendChild(c);
  }

  let descargado = false;
  try { descargado = localStorage.getItem("ec-mapa-descargado") === "1"; } catch { /* sin almacenamiento */ }
  if (!descargado) {
    document.getElementById("recorrido-guardado").classList.add("recorrido__guardado--pendiente");
    document.getElementById("recorrido-guardado-texto").textContent = "Sin descargar";
  }

  const lienzo = document.getElementById("mapa-lienzo");
  const ZOOM_MIN = 1, ZOOM_MAX = 2, PASO = 0.25;
  let zoom = 1;
  const aplicarZoom = (z) => { zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z)); lienzo.style.setProperty("--zoom", zoom); };

  document.addEventListener("ec:cambio", (e) => {
    const accion = e.detail.accion;
    if (accion === "acercar") aplicarZoom(zoom + PASO);
    else if (accion === "alejar") aplicarZoom(zoom - PASO);
    else if (accion === "donde-estoy" || accion === "mi-ubicacion") aplicarZoom(1.5);
    else if (accion === "volver-mapa") window.ecVolver("inicio");
  });
})();
