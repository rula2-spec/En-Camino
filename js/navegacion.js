/* ==========================================================================
   En Camino · Vinculación entre pantallas
   Escucha el evento "ec:cambio" y abre la página de cada destino.
   Los destinos sin ruta todavía no tienen pantalla: no hacen nada.
   ========================================================================== */
(function () {
  "use strict";
  const rutas = {
    apertura: "index.html",
    carga: "carga.html",
    bienvenida: "bienvenida.html",
    "bienvenida-2": "bienvenida-2.html",
    "bienvenida-3": "bienvenida-3.html",
    ingreso: "ingreso.html",
    registro: "registro.html",
    permisos: "permisos.html",
    inicio: "inicio-antes.html",
    "inicio-antes": "inicio-antes.html",
    "inicio-durante": "inicio-durante.html",
    "inicio-despues": "inicio-despues.html",
    mapa: "mapa.html",
    recorrido: "mapa.html",
    "mi-equipo": "mi-equipo.html",
    servicios: "servicios.html",
    espiritual: "fe-y-comunidad.html",
    "fe-y-comunidad": "fe-y-comunidad.html",
    rosario: "rosario.html",
    cronograma: "cronograma.html",
    cancionero: "cancionero.html",
    oraciones: "oraciones.html",
    intenciones: "intenciones.html",
    ayuda: "ayuda.html",
    "chat-asistencia": "chat-asistencia.html",
    chat: "chat-asistencia.html",
    preguntas: "preguntas-frecuentes.html",
    ajustes: "ajustes.html",
    avisos: "notificaciones.html",
    notificaciones: "notificaciones.html",
  };

  // Al refrescar cualquier pantalla, la app vuelve a arrancar desde la apertura
  const navegacion = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  const esRecarga = navegacion ? navegacion.type === "reload" : (performance.navigation && performance.navigation.type === 1);
  const esApertura = !!document.querySelector(".apertura");
  if (esRecarga && !esApertura) {
    location.replace(rutas.apertura);
    return;
  }

  // Marca, en la sesión de esta pestaña, que se llegó desde otra pantalla de la app
  const MARCA = "ec-navego";
  const marcar = () => { try { sessionStorage.setItem(MARCA, "1"); } catch { /* sin almacenamiento */ } };
  const vinoDeLaApp = () => { try { return sessionStorage.getItem(MARCA) === "1"; } catch { return false; } };

  function ir(destino, reemplazar) {
    if (!rutas[destino]) return;
    marcar();
    if (reemplazar) location.replace(rutas[destino]);
    else location.href = rutas[destino];
  }

  document.addEventListener("ec:cambio", (e) => {
    const { tipo, destino, reemplazar } = e.detail;
    if (tipo === "navegar") ir(destino, reemplazar);
    // Flecha de volver con data-volver="destino por defecto"
    else if (tipo === "accion" && e.target.dataset && e.target.dataset.volver) window.ecVolver(e.target.dataset.volver);
  });

  // Volver: a la pantalla anterior de la app, o al destino por defecto si se entró directo
  window.ecVolver = function (porDefecto) {
    if (vinoDeLaApp() && history.length > 1) history.back();
    else ir(porDefecto);
  };
})();
