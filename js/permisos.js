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

  const yaDescargado = () => { try { return localStorage.getItem(CLAVE) === "1"; } catch { return false; } };
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

  function descargar() {
    boton.disabled = true;
    texto.textContent = "Descargando mapa del recorrido…";
    const inicio = performance.now();
    const reloj = setInterval(() => {
      const p = Math.min(100, Math.round((performance.now() - inicio) / DURACION * 100));
      mostrar(p);
      if (p < 100) return;
      clearInterval(reloj);
      guardar();
      completa();
    }, 100);
  }

  if (yaDescargado()) completa();
  else mostrar(0);

  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.tipo === "accion" && e.detail.accion === "descargar") descargar();
  });
})();
