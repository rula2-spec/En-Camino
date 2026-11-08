/* ==========================================================================
   En Camino · Antes de salir (paso 2 de 2): permisos y descarga sin conexión
   La descarga arranca solo al tocar «Descargar». Es simulada: todavía no hay
   mapa real que bajar. Al terminar queda guardado en el teléfono que el mapa
   está descargado, para que la pantalla Mapa lo lea:
     localStorage.getItem("ec-mapa-descargado") === "1"
   ========================================================================== */
(function () {
  "use strict";
  const CLAVE = "ec-mapa-descargado";
  const DURACION = 10000;   // ms hasta el 100 %
  const TOTAL_CUENTAS = 20;

  const contenedor = document.getElementById("descarga-cuentas");
  const progreso = document.getElementById("descarga-progreso");
  const texto = document.getElementById("descarga-texto");
  const porcentaje = document.getElementById("descarga-porcentaje");
  const boton = document.getElementById("descarga-boton");

  const cuentas = Array.from({ length: TOTAL_CUENTAS }, () => {
    const c = document.createElement("span");
    c.className = "descarga__cuenta";
    contenedor.appendChild(c);
    return c;
  });

  const guardar = () => { try { localStorage.setItem(CLAVE, "1"); } catch { /* sin almacenamiento: no queda guardado */ } };

  function mostrar(p) {
    const llenas = Math.floor(p * TOTAL_CUENTAS / 100);
    cuentas.forEach((c, i) => c.classList.toggle("descarga__cuenta--llena", i < llenas));
    porcentaje.textContent = `${p}%`;
    progreso.setAttribute("aria-valuenow", p);
  }

  function completa() {
    mostrar(100);
    texto.textContent = "Descarga completa";
    boton.disabled = true;
    boton.querySelector("span").textContent = "Descargado";
  }

  let reloj = null;

  // Cada vez que se llega a la pantalla: permisos apagados y descarga lista para tocar
  function reiniciar() {
    clearInterval(reloj);
    document.querySelectorAll('.permisos__lista .switch').forEach((sw) => sw.setAttribute("aria-checked", "false"));
    mostrar(0);
    texto.textContent = "Todavía no descargaste el contenido";
    boton.disabled = false;
    boton.querySelector("span").textContent = "Descargar";
  }

  function descargar() {
    boton.disabled = true;
    texto.textContent = "Descargando mapa del recorrido…";
    const inicio = performance.now();
    reloj = setInterval(() => {
      const p = Math.min(100, Math.round((performance.now() - inicio) / DURACION * 100));
      mostrar(p);
      if (p < 100) return;
      clearInterval(reloj);
      guardar();
      completa();
    }, 100);
  }

  reiniciar();
  // Al volver con «Atrás» el navegador puede restaurar la pantalla tal como quedó
  window.addEventListener("pageshow", (e) => { if (e.persisted) reiniciar(); });

  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.tipo === "accion" && e.detail.accion === "descargar") descargar();
  });
})();
