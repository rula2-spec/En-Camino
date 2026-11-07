/* ==========================================================================
   En Camino · Rosario guiado
   - Misterios según el día (como en Fe y comunidad).
   - Tocar el rosario o «Siguiente» avanza una cuenta; después de la décima
     pasa al misterio siguiente. Vibra en cada cuenta si el teléfono lo permite.
   - Arranca en el 2.º misterio, cuenta 6, como «Ibas por la 2.ª decena».
   - A− / A+ cambian el tamaño del texto (--ec-escala-texto, de botones.js).
   - Reproducir cambia el ícono, pero todavía no hay audio.
   ========================================================================== */
(function () {
  "use strict";
  const MISTERIOS = {
    Gozosos: ["La Anunciación del Ángel a María", "La Visitación de María", "El Nacimiento de Jesús", "La Presentación de Jesús en el Templo", "El Niño perdido y hallado en el Templo"],
    Dolorosos: ["La Oración de Jesús en el Huerto", "La Flagelación del Señor", "La Coronación de espinas", "Jesús con la cruz a cuestas", "La Crucifixión y muerte de Jesús"],
    Gloriosos: ["La Resurrección del Señor", "La Ascensión del Señor", "La Venida del Espíritu Santo", "La Asunción de María", "La Coronación de María"],
    Luminosos: ["El Bautismo de Jesús en el Jordán", "Las Bodas de Caná", "El Anuncio del Reino de Dios", "La Transfiguración del Señor", "La Institución de la Eucaristía"],
  };
  const POR_DIA = ["Gloriosos", "Gozosos", "Dolorosos", "Gloriosos", "Luminosos", "Dolorosos", "Gozosos"];
  const tipo = POR_DIA[new Date().getDay()];
  const TOTAL = 10;
  let misterio = 1;   // índice: 2.º misterio
  let cuenta = 6;

  const svg = "http://www.w3.org/2000/svg";
  const grupo = document.getElementById("rosario-cuentas");
  const cuentas = Array.from({ length: TOTAL }, (_, i) => {
    const angulo = (18 + i * 36) * Math.PI / 180;   // la primera, a la derecha de la cima; en sentido horario
    const c = document.createElementNS(svg, "circle");
    c.setAttribute("cx", (110 + 92 * Math.sin(angulo)).toFixed(2));
    c.setAttribute("cy", (110 - 92 * Math.cos(angulo)).toFixed(2));
    grupo.appendChild(c);
    return c;
  });

  const contador = document.getElementById("rosario-contador");
  const siguiente = document.getElementById("rosario-siguiente");

  function mostrar() {
    document.getElementById("rosario-tipo").textContent = `Misterios ${tipo}`;
    document.getElementById("rosario-numero").textContent = `${misterio + 1}.º misterio`;
    document.getElementById("rosario-misterio").textContent = MISTERIOS[tipo][misterio];
    document.getElementById("rosario-cuenta").textContent = `${cuenta} / ${TOTAL}`;
    cuentas.forEach((c, i) => {
      const n = i + 1;
      c.setAttribute("class", n < cuenta ? "cuenta-rosario cuenta-rosario--hecha" : n === cuenta ? "cuenta-rosario cuenta-rosario--actual" : "cuenta-rosario");
      c.setAttribute("r", n === cuenta ? 13 : 11);
    });
    contador.setAttribute("aria-label", `${misterio + 1}.º misterio. Avemaría ${cuenta} de ${TOTAL}. Tocá para avanzar`);
    const fin = misterio === 4 && cuenta === TOTAL;
    siguiente.disabled = fin;
    contador.disabled = fin;
    document.getElementById("rosario-ayuda").textContent = fin ? "Terminaste los cinco misterios" : "Tocá el rosario para avanzar una cuenta";
  }

  function avanzar() {
    if (cuenta < TOTAL) cuenta++;
    else if (misterio < 4) { misterio++; cuenta = 1; }
    else return;
    if (navigator.vibrate) navigator.vibrate(30);
    mostrar();
  }

  document.addEventListener("ec:cambio", (e) => {
    const accion = e.detail.accion;
    if (accion === "rosario-avanzar") avanzar();
    else if (accion === "volver-rosario") window.ecVolver("espiritual");
  });

  mostrar();
})();
