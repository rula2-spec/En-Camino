/* ==========================================================================
   En Camino · Chat de asistencia
   Las respuestas rápidas y el campo de texto agregan tu mensaje a la conversación.
   Todavía no hay equipo de asistencia conectado: nadie responde.
   La conversación inicial es la de la pantalla final 15 (ejemplo).
   ========================================================================== */
(function () {
  "use strict";
  const lista = document.getElementById("chat-mensajes");
  const formulario = document.getElementById("chat-formulario");
  const campo = document.getElementById("chat-texto");

  function enviar(texto) {
    texto = texto.trim();
    if (!texto) return;
    const burbuja = document.createElement("li");
    burbuja.className = "burbuja burbuja--mia";
    burbuja.textContent = texto;
    lista.appendChild(burbuja);
    burbuja.scrollIntoView({ block: "end", behavior: "smooth" });
  }

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    enviar(campo.value);
    campo.value = "";
    campo.focus();
  });

  document.addEventListener("ec:cambio", (e) => {
    const accion = e.detail.accion;
    if (accion === "respuesta-rapida") enviar(e.target.textContent);
    else if (accion === "volver-chat") window.ecVolver("ayuda");
  });
})();
