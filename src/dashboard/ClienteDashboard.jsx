import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import FormularioCotizacion from "./FormularioCotizacion";

const ClienteDashboard = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  // Obtener ID del usuario actual
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idUsuario = usuario?._id;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await api.get("/productos");
        setProductos(res.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();

    const carritoGuardado = JSON.parse(localStorage.getItem(`carrito_${idUsuario}`)) || [];
    setCarrito(carritoGuardado);
  }, [idUsuario]);

  const agregarAlCarrito = (item) => {
    const nuevoCarrito = [...carrito, item];
    setCarrito(nuevoCarrito);
    localStorage.setItem(`carrito_${idUsuario}`, JSON.stringify(nuevoCarrito));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:hidden relative">
      {/* Botón salir fijo en la parte superior derecha */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 right-4 bg-red-600 text-white px-4 py-1 rounded shadow-md text-sm z-50 hover:bg-red-700 transition-all"
      >
        Salir
      </button>

      <h2 className="text-xl font-bold mb-4 text-center text-gray-800 mt-10">
        Catálogo de Productos
      </h2>

      <div className="space-y-4 pb-20">
        {productos.map((producto) => {
          const precios = producto.variantes?.map((v) => v.precio) || [];
          const precioMinimo =
            precios.length > 0 ? Math.min(...precios).toFixed(2) : "N/A";

          return (
            <div
              key={producto._id}
              className="bg-white rounded shadow p-4 cursor-pointer flex flex-col items-center"
              onClick={() => setProductoSeleccionado(producto)}
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-32 h-32 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {producto.nombre}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                Desde: ${precioMinimo}
              </p>
            </div>
          );
        })}
      </div>

      {productoSeleccionado && (
        <FormularioCotizacion
          producto={productoSeleccionado}
          onClose={() => setProductoSeleccionado(null)}
          onAdd={(data) => {
            agregarAlCarrito(data);
            setProductoSeleccionado(null);
          }}
        />
      )}

      {carrito.length > 0 && (
        <button
          onClick={() => navigate("/carrito", { state: { carrito } })}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg text-sm hover:bg-blue-700 transition-all z-50"
        >
          Ver Carrito ({carrito.length})
        </button>
      )}
    </div>
  );
};

export default ClienteDashboard;
