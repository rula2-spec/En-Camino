/* ==========================================================================
   En Camino · Pantalla de carga
   Contador de 15 cuentas: se llena en el orden del isotipo (blanco, rojo,
   verde, amarillo y azul noche) y al llegar al 100 % pasa a Bienvenida.
   El avance es por tiempo: todavía no hay datos reales que descargar.
   ========================================================================== */
(function () {
  "use strict";
  const DURACION = 3000;       // ms hasta el 100 %
  const PAUSA_FINAL = 350;     // ms con el rosario completo antes de cambiar de pantalla
  const TOTAL_CUENTAS = 15;
  const CENTRO = 82, RADIO_ANILLO = 66, RADIO_CUENTA = 12.2;

  const svg = "http://www.w3.org/2000/svg";
  const grupo = document.getElementById("carga-cuentas");
  const texto = document.getElementById("carga-porcentaje");
  const progreso = document.getElementById("carga-progreso");

  // La primera cuenta queda 24° antes de la cima, como en la pantalla final
  const cuentas = Array.from({ length: TOTAL_CUENTAS }, (_, i) => {
    const angulo = (i - 1) * 24 * Math.PI / 180;
    const c = document.createElementNS(svg, "circle");
    c.setAttribute("cx", (CENTRO + RADIO_ANILLO * Math.sin(angulo)).toFixed(2));
    c.setAttribute("cy", (CENTRO - RADIO_ANILLO * Math.cos(angulo)).toFixed(2));
    c.setAttribute("r", RADIO_CUENTA);
    c.setAttribute("class", "cuenta");
    c.dataset.grupo = Math.floor(i / 3);
    grupo.appendChild(c);
    return c;
  });

  function mostrar(porcentaje) {
    const llenas = Math.ceil(porcentaje * TOTAL_CUENTAS / 100);
    cuentas.forEach((c, i) => c.classList.toggle("cuenta--llena", i < llenas));
    texto.textContent = `${porcentaje}%`;
    progreso.setAttribute("aria-valuenow", porcentaje);
  }

  const inicio = performance.now();
  mostrar(0);
  // Con un temporizador la carga termina aunque la pestaña quede en segundo plano
  const reloj = setInterval(() => {
    const porcentaje = Math.min(100, Math.round((performance.now() - inicio) / DURACION * 100));
    mostrar(porcentaje);
    if (porcentaje < 100) return;
    clearInterval(reloj);
    setTimeout(() => {
      document.dispatchEvent(new CustomEvent("ec:cambio", { detail: { tipo: "navegar", destino: "bienvenida", reemplazar: true } }));
    }, PAUSA_FINAL);
  }, 30);
})();
