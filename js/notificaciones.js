/* ==========================================================================
   En Camino · Notificaciones
   - «Permitir» pide el permiso de notificaciones del navegador, si existe,
     y pasa a «Permitido». Los avisos son de ejemplo.
   - Volver: a la pantalla anterior, o a Inicio si se entró directo.
   ========================================================================== */
(function () {
  "use strict";
  const permitir = document.getElementById("permitir-avisos");

  function marcarPermitido() {
    permitir.querySelector("span").textContent = "Permitido";
    permitir.setAttribute("aria-disabled", "true");
  }
  try { if ("Notification" in window && Notification.permission === "granted") marcarPermitido(); } catch { /* sin soporte */ }

  document.addEventListener("ec:cambio", (e) => {
    const accion = e.detail.accion;
    if (accion === "volver-notificaciones") {
      window.ecVolver("inicio");
    } else if (accion === "permitir-avisos") {
      if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission().then((p) => { if (p === "granted") marcarPermitido(); }).catch(() => {});
      } else {
        marcarPermitido();
      }
    }
  });
})();
