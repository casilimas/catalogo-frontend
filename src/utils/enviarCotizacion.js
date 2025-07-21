// src/utils/enviarCotizacion.js
import api from "../services/api";

export const enviarCotizacion = async (usuario, carrito) => {
  try {
    const productos = carrito.map((item) => ({
      nombre: item.nombre,
      cantidad: item.cantidad,
      precioUnitario: item.precio,
    }));

    const data = {
      nombre: usuario.nombre,
      telefono: usuario.telefono,
      productos,
    };

    const res = await api.post("/cotizacion", data);
    return { success: true, message: res.data.message };
  } catch (error) {
    console.error("Error al enviar cotización:", error);
    return { success: false, message: "Error al enviar la cotización" };
  }
};
