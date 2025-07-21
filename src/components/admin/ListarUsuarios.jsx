import { useEffect, useState } from "react";
import axios from "axios";
import { UserX, ChevronUp, ChevronDown } from "lucide-react";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [mostrarLista, setMostrarLista] = useState(false);

  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:3900/api/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsuarios(data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setError("❌ Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    const confirmar = confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://catalogo-plomeria.onrender.com/api/usuario/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMensaje("✅ Usuario eliminado correctamente");
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
      setError("❌ Error al eliminar el usuario");
    } finally {
      setTimeout(() => {
        setMensaje("");
        setError("");
      }, 3000);
    }
  };

  const toggleLista = () => setMostrarLista(!mostrarLista);

  return (
    <div className="p-4 bg-white shadow rounded-md mt-4">
      <h2
  onClick={toggleLista}
  className="text-xl font-bold text-red-300 mb-3 cursor-pointer hover:text-red-500 transition flex items-center gap-2"
>
  <UserX size={22} />
  Eliminar Usuario
  {mostrarLista ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
</h2>


      {mensaje && <p className="text-green-600 text-center mb-2">{mensaje}</p>}
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}

      {mostrarLista && (
        <>
          {loading ? (
            <p className="text-center text-gray-500">Cargando usuarios...</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <li key={usuario._id} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{usuario.nombre}</p>
                    <p className="text-sm text-gray-600">{usuario.email}</p>
                  </div>
                  <button
                    onClick={() => eliminarUsuario(usuario._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    🗑️ Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default ListarUsuarios;
