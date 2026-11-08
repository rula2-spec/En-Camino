/* ==========================================================================
   En Camino · Mapa
   - Cuentas del recorrido: verdes las caminadas, azul la actual, vacías las que faltan.
   - «Guardado sin señal» solo si el mapa se descargó en la pantalla de permisos.
   - Acercar, alejar, «Dónde estoy» y «Mi ubicación» (centra en Vos).
   - Zoom libre: pellizco, arrastre y rueda del mouse.
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

  /* ---------- Zoom y desplazamiento ----------
     Con los botones + y −, pellizcando con dos dedos, arrastrando con uno
     y con la rueda del mouse. Rango de 0,5× (más lejos) a 4× (más cerca). */
  const lienzo = document.getElementById("mapa-lienzo");
  const ZOOM_MIN = 0.5, ZOOM_MAX = 4, PASO = 1.5;   // cada toque de + o − multiplica o divide por 1,5
  const VOS = { x: 0.485, y: 0.48 };                  // posición de «Vos» en el dibujo (proporción del lienzo)
  let zoom = 1, x = 0, y = 0;

  const limitar = (v, min, max) => Math.min(max, Math.max(min, v));

  function dibujar() {
    // Que siempre quede algo de mapa en el centro de la pantalla
    const w = lienzo.clientWidth, h = lienzo.clientHeight;
    x = limitar(x, w / 2 - w * zoom, w / 2);
    y = limitar(y, h / 2 - h * zoom, h / 2);
    lienzo.style.setProperty("--zoom", zoom);
    lienzo.style.setProperty("--x", `${x}px`);
    lienzo.style.setProperty("--y", `${y}px`);
  }

  // Acerca o aleja manteniendo quieto el punto (fx, fy) de la pantalla
  function zoomEn(nuevo, fx, fy) {
    nuevo = limitar(nuevo, ZOOM_MIN, ZOOM_MAX);
    x = fx - (fx - x) * nuevo / zoom;
    y = fy - (fy - y) * nuevo / zoom;
    zoom = nuevo;
    dibujar();
  }
  const zoomAlCentro = (nuevo) => zoomEn(nuevo, lienzo.clientWidth / 2, lienzo.clientHeight / 2);

  function centrarEnVos(nuevo) {
    const w = lienzo.clientWidth, h = lienzo.clientHeight;
    zoom = nuevo;
    x = w * VOS.x * (1 - zoom);
    y = h * VOS.y * (1 - zoom);
    dibujar();
  }

  // Dedos (y mouse) sobre el mapa
  const punteros = new Map();
  let gesto = null;
  const local = (e) => { const r = lienzo.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };

  function empezarGesto() {
    const p = [...punteros.values()];
    if (p.length === 1) gesto = { x0: p[0].x, y0: p[0].y, tx: x, ty: y };
    else if (p.length >= 2) {
      const cx = (p[0].x + p[1].x) / 2, cy = (p[0].y + p[1].y) / 2;
      gesto = { dist: Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y) || 1, zoom0: zoom, cx, cy, tx: x, ty: y };
    } else gesto = null;
  }

  lienzo.addEventListener("pointerdown", (e) => {
    punteros.set(e.pointerId, local(e));
    lienzo.classList.add("mapa__lienzo--arrastrando");
    empezarGesto();
  });

  lienzo.addEventListener("pointermove", (e) => {
    if (!punteros.has(e.pointerId) || !gesto) return;
    punteros.set(e.pointerId, local(e));
    const p = [...punteros.values()];
    if (p.length === 1) {
      x = gesto.tx + p[0].x - gesto.x0;
      y = gesto.ty + p[0].y - gesto.y0;
      dibujar();
    } else {
      // Pellizco: escala según la distancia entre los dedos y sigue al punto medio
      const cx = (p[0].x + p[1].x) / 2, cy = (p[0].y + p[1].y) / 2;
      const nuevo = limitar(gesto.zoom0 * Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y) / gesto.dist, ZOOM_MIN, ZOOM_MAX);
      x = cx - (gesto.cx - gesto.tx) * nuevo / gesto.zoom0;
      y = cy - (gesto.cy - gesto.ty) * nuevo / gesto.zoom0;
      zoom = nuevo;
      dibujar();
    }
  });

  function soltar(e) {
    punteros.delete(e.pointerId);
    if (!punteros.size) lienzo.classList.remove("mapa__lienzo--arrastrando");
    empezarGesto();
  }
  ["pointerup", "pointercancel", "pointerleave"].forEach((t) => lienzo.addEventListener(t, soltar));

  // Rueda del mouse o pellizco en el trackpad
  lienzo.addEventListener("wheel", (e) => {
    e.preventDefault();
    const f = local(e);
    lienzo.classList.add("mapa__lienzo--arrastrando");
    zoomEn(zoom * Math.exp(-e.deltaY * 0.002), f.x, f.y);
    clearTimeout(lienzo._rueda);
    lienzo._rueda = setTimeout(() => lienzo.classList.remove("mapa__lienzo--arrastrando"), 150);
  }, { passive: false });

  window.addEventListener("resize", dibujar);

  document.addEventListener("ec:cambio", (e) => {
    const accion = e.detail.accion;
    if (accion === "acercar") zoomAlCentro(zoom * PASO);
    else if (accion === "alejar") zoomAlCentro(zoom / PASO);
    else if (accion === "donde-estoy" || accion === "mi-ubicacion") centrarEnVos(1.5);
    else if (accion === "volver-mapa") window.ecVolver("inicio");
  });
})();
