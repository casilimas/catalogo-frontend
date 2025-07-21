import { useEffect, useState } from "react";
import axios from "axios";
import FormularioEditarProducto from "./FormularioEditarProducto";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mostrarLista, setMostrarLista] = useState(false);
  const [productoActivoId, setProductoActivoId] = useState(null);

  const obtenerProductos = async () => {
    try {
      const { data } = await axios.get("https://catalogo-plomeria.onrender.com/api/productos");
      setProductos(data);
    } catch (err) {
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const toggleLista = () => setMostrarLista(!mostrarLista);

  const handleClickProducto = (producto) => {
    if (productoActivoId === producto._id) {
      setProductoActivoId(null);
    } else {
      setProductoActivoId(producto._id);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md mt-4">
      <h2
        onClick={toggleLista}
        className="text-xl font-bold mb-2 text-blue-500 cursor-pointer hover:text-gray-600 transition"
      >
        📦 Editar Productos {mostrarLista ? "▲" : "▼"}
      </h2>

      {loading && <p className="text-center">Cargando productos...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {mostrarLista && (
        <ul className="list-disc list-inside space-y-4 text-gray-700 mt-2">
          {productos.map((producto) => (
            <li key={producto._id}>
              <button
                onClick={() => handleClickProducto(producto)}
                className="hover:text-blue-600 font-semibold"
              >
                {producto.nombre}
              </button>

              {productoActivoId === producto._id && (
                <FormularioEditarProducto
                  producto={producto}
                  onClose={() => setProductoActivoId(null)}
                  onUpdated={obtenerProductos}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarProductos;
