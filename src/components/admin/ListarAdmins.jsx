import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { UserX, ChevronUp, ChevronDown } from "lucide-react";

const ListarAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mostrarLista, setMostrarLista] = useState(false);

  const token = localStorage.getItem("token");

  const obtenerAdmins = async () => {
    try {
      const { data } = await axios.get("http://localhost:3900/api/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdmins(data);
    } catch (err) {
      setError("❌ Error al obtener los administradores");
    }
  };

  useEffect(() => {
    obtenerAdmins();
  }, []);

  const eliminarAdmin = async (id) => {
    try {
      await axios.delete(`https://catalogo-plomeria.onrender.com/api/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMensaje("✅ Administrador eliminado");
      obtenerAdmins();
    } catch (err) {
      console.error(err);
      setError("❌ No se pudo eliminar el administrador");
    }
  };

  useEffect(() => {
    if (mensaje || error) {
      const timer = setTimeout(() => {
        setMensaje("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje, error]);

  return (
    <div className="p-4 bg-white shadow rounded-md mt-4">
      <h2
  onClick={() => setMostrarLista(!mostrarLista)}
  className="text-xl font-bold mb-4 text-red-300 cursor-pointer hover:text-red-500 transition flex items-center gap-2"
>
  <UserX size={22} />
  Borrar Administradores
  {mostrarLista ? <ChevronUp size={25} /> : <ChevronDown size={25} />}
</h2>


      {mensaje && <p className="text-green-600 text-sm mb-2">{mensaje}</p>}
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      {mostrarLista && (
        <ul className="list-disc list-inside space-y-3 text-gray-700 text-sm">
          {admins.map((admin) => (
            <li key={admin._id} className="flex justify-between items-center border-b pb-2">
              <div>
                <p><strong>Nombre:</strong> {admin.nombre}</p>
                <p><strong>Email:</strong> {admin.email}</p>
                <p><strong>Teléfono:</strong> {admin.telefono}</p>
              </div>
              <button
                onClick={() => eliminarAdmin(admin._id)}
                className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
              >
                <Trash2 size={20} /> Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListarAdmins;
