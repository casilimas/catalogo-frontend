import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const NeutralDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("Cargando productos...");
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await api.get("/productos");
        setProductos(res.data);
        setMensaje(res.data.length === 0 ? "No hay productos disponibles." : "");
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setMensaje("Error al cargar productos.");
      }
    };

    obtenerProductos();
  }, []);

  const manejarClickImagen = () => {
    setMostrarAlerta(true);
  };

  const cerrarAlerta = () => {
    setMostrarAlerta(false);
  };

  return (
    <div
      className="w-full min-h-screen bg-white px-4 py-6 sm:block md:hidden relative"
      onClick={cerrarAlerta}
    >
      {/* Botón fijo "Salir" */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 bg-red-600 text-white px-3 py-1 rounded text-sm shadow hover:bg-red-700"
      >
        Salir
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Catálogo de Productos
      </h2>

      {mensaje && (
        <p className="text-center text-sm text-gray-500 mb-4">{mensaje}</p>
      )}

      <div className="grid grid-cols-1 gap-4">
        {productos.map((producto) => (
          <div
            key={producto._id}
            className="border rounded shadow-md overflow-hidden cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              manejarClickImagen();
            }}
          >
            {producto.imagen && (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {producto.nombre}
              </h3>

              {/* Mostrar precio desde la primera variante */}
              {producto.variantes && producto.variantes.length > 0 && (
                <p className="text-green-600 font-bold text-base">
                  ${producto.variantes[0].precio.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje flotante */}
      {mostrarAlerta && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
          onClick={cerrarAlerta}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-md w-[90%] max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-gray-800 mb-2">
              Para gestionar una cotización, por favor <strong>salga</strong> e
              ingrese como usuario desde el botón <strong>'Quiero cotizar'</strong>.
              Deberá indicar su nombre y número de teléfono.
            </p>
            <button
              onClick={cerrarAlerta}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeutralDashboard;
