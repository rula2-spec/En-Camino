/* ==========================================================================
   En Camino · Cronograma
   - Días: el segmentado del kit cambia el día. Solo el sábado 7 tiene
     actividades (las de la pantalla final 19); los otros días muestran un aviso.
   - Campanas: encienden o apagan el recordatorio de cada actividad
     y quedan guardadas en el teléfono. Todavía no envían notificaciones.
   - Volver: regresa a la pantalla anterior, o a Inicio si se entró directo.
   ========================================================================== */
(function () {
  "use strict";
  const CLAVE = "ec-recordatorios";
  const agenda = document.getElementById("agenda-sab");
  const vacio = document.getElementById("agenda-vacio");
  const avisos = [...document.querySelectorAll(".actividad__aviso")];

  let guardados = null;
  try { guardados = JSON.parse(localStorage.getItem(CLAVE)); } catch { guardados = null; }
  if (guardados) avisos.forEach(a => { if (a.dataset.id in guardados) a.setAttribute("aria-pressed", String(guardados[a.dataset.id])); });

  function guardar() {
    const estado = {};
    avisos.forEach(a => { estado[a.dataset.id] = a.getAttribute("aria-pressed") === "true"; });
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch { /* sin almacenamiento: no queda guardado */ }
  }

  document.addEventListener("ec:cambio", (e) => {
    const d = e.detail;
    if (d.tipo === "segmento" && d.grupo === "dias") {
      const hay = d.valor === "sab";
      agenda.hidden = !hay;
      vacio.hidden = hay;
    } else if (d.tipo === "alternar" && d.id && d.id.startsWith("aviso-")) {
      guardar();
    } else if (d.accion === "volver-cronograma") {
      window.ecVolver("inicio");
    }
  });
})();
