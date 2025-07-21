// src/utils/actividad.js

export function iniciarActividadBackend() {
  const urlBackend = "https://catalogo-plomeria.onrender.com/api/ping"; 

  const estaEnHorarioLaboral = () => {
    const ahora = new Date();
    const hora = ahora.getHours();
    return hora >= 7 && hora < 18;
  };

  const hacerPing = () => {
    if (estaEnHorarioLaboral()) {
      fetch(urlBackend)
        .then(() => console.log("📡 Ping enviado al backend"))
        .catch((err) => console.warn("⚠️ Error al hacer ping:", err));
    } else {
      console.log("🕒 Fuera del horario permitido. No se hace ping.");
    }

    programarSiguientePing();
  };

  const programarSiguientePing = () => {
    const minutos = [3, 6, 9, 11];
    const elegido = minutos[Math.floor(Math.random() * minutos.length)];
    const milisegundos = elegido * 60 * 1000;
    setTimeout(hacerPing, milisegundos);
  };

  hacerPing();
}
