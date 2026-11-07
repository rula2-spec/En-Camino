/* ==========================================================================
   En Camino · Inicio (Antes): checklist «Tu preparación»
   Cada tarea se marca o desmarca con un toque y queda guardada en el teléfono.
   «Descargar mapa sin conexión» arranca marcada si el mapa ya se descargó
   en la pantalla de permisos y descarga.
   ========================================================================== */
(function () {
  "use strict";
  const CLAVE = "ec-preparacion";
  const tareas = [...document.querySelectorAll(".tarea")];
  const cuenta = document.getElementById("preparacion-cuenta");

  const leer = (clave) => { try { return localStorage.getItem(clave); } catch { return null; } };
  let estado = {};
  try { estado = JSON.parse(leer(CLAVE)) || {}; } catch { estado = {}; }
  if (!("descargar-mapa" in estado) && leer("ec-mapa-descargado") === "1") estado["descargar-mapa"] = true;

  function actualizarCuenta() {
    const hechas = tareas.filter(t => t.getAttribute("aria-checked") === "true").length;
    cuenta.textContent = `${hechas} de ${tareas.length}`;
  }

  tareas.forEach(t => {
    t.setAttribute("aria-checked", String(!!estado[t.dataset.tarea]));
    t.addEventListener("click", () => {
      const marcada = t.getAttribute("aria-checked") !== "true";
      t.setAttribute("aria-checked", String(marcada));
      estado[t.dataset.tarea] = marcada;
      try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch { /* sin almacenamiento: no queda guardado */ }
      actualizarCuenta();
    });
  });
  actualizarCuenta();
})();
