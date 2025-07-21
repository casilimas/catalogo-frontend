// src/pages/VistaPreviaCarrito.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { enviarCotizacion } from "../utils/enviarCotizacion";

const VistaPreviaCarrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idUsuario = usuario?._id;

  useEffect(() => {
    if (!idUsuario) return;
    const datos = JSON.parse(localStorage.getItem(`carrito_${idUsuario}`)) || [];
    setCarrito(datos);
  }, [idUsuario]);

  const total = carrito.reduce(
    (acc, item) => acc + (typeof item.subtotal === "number" ? item.subtotal : 0),
    0
  );

  const handleEnviar = async () => {
    const confirmacion = confirm("¿Deseas enviar esta cotización por WhatsApp?");
    if (!confirmacion) return;

    const resultado = await enviarCotizacion(usuario, carrito);
    alert(resultado.message);

    // ✅ Limpiar carrito y redirigir al catálogo
    localStorage.removeItem(`carrito_${idUsuario}`);
    setCarrito([]);
    navigate("/usuario");
  };

  const handleBorrar = () => {
    localStorage.removeItem(`carrito_${idUsuario}`);
    setCarrito([]);
    navigate("/usuario");
  };

  const handleVolver = () => {
    navigate(-1);
  };

  if (carrito.length === 0) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-center p-4 md:hidden">
        <p className="text-gray-600">Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white p-4 md:hidden">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Vista Previa</h2>

      <ul className="space-y-4">
        {carrito.map((item, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded shadow relative">
            <h3 className="font-semibold text-gray-800">{item.nombre}</h3>
            <p className="text-sm text-gray-600">Medida: {item.medida}</p>
            <p className="text-sm text-gray-600">Cantidad: {item.cantidad}</p>
            <p className="text-sm text-gray-600">
              Subtotal: ${typeof item.subtotal === "number" ? item.subtotal.toFixed(2) : "0.00"}
            </p>
            <button
              onClick={() => {
                const copia = [...carrito];
                copia.splice(index, 1);
                localStorage.setItem(`carrito_${idUsuario}`, JSON.stringify(copia));
                setCarrito(copia);
              }}
              className="absolute top-2 right-2 text-red-500 text-xs"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-bold text-gray-800 text-center">
          Total: ${total.toFixed(2)}
        </p>
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={handleEnviar}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Enviar cotización por WhatsApp
        </button>

        <button
          onClick={handleVolver}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
        >
          Seguir comprando
        </button>

        <button
          onClick={handleBorrar}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Eliminar cotización
        </button>
      </div>
    </div>
  );
};

export default VistaPreviaCarrito;
