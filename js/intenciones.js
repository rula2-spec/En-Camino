/* ==========================================================================
   En Camino · Intenciones
   - Enviar suma la intención arriba de «Tus intenciones» y vacía el campo.
     Todavía no hay servidor: no se guarda ni se manda a ningún lado.
   - Volver: a la pantalla anterior, o a Fe y comunidad si se entró directo.
   ========================================================================== */
(function () {
  "use strict";
  const form = document.getElementById("nueva-intencion");
  const campo = document.getElementById("intencion-texto");
  const lista = document.getElementById("mis-intenciones");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = campo.value.trim();
    if (!texto) { campo.focus(); return; }
    const li = document.createElement("li");
    li.className = "mi-intencion";
    li.innerHTML = '<span class="icono-seccion icono-seccion--cobalto"><svg class="ico" aria-hidden="true"><use href="#g-vela"/></svg></span>' +
      '<p class="mi-intencion__textos"><span class="mi-intencion__texto"></span><span class="mi-intencion__sub">Pedido · ahora</span></p>' +
      '<span class="mi-intencion__estado">Enviada</span>';
    li.querySelector(".mi-intencion__texto").textContent = texto;
    lista.prepend(li);
    campo.value = "";
  });

  document.addEventListener("ec:cambio", (e) => {
    if (e.detail.accion === "volver-intenciones") window.ecVolver("espiritual");
  });
})();
