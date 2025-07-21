import { useNavigate } from "react-router-dom";
import CrearProducto from "../components/admin/CrearProducto";
import ListarProductos from "../components/admin/ListarProductos";
import CrearAdmin from "../components/admin/CrearAdmin";
import ListarAdmins from "../components/admin/ListarAdmins";
import ListarUsuarios from "../components/admin/ListarUsuarios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    navigate("/"); // Redirige al inicio (ajusta si tu ruta es otra, como /inicio o /home)
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 p-4 space-y-4 md:hidden">
      <div className="flex justify-center mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
        >
          Cerrar Sesión
        </button>
      </div>
      <h2 className="text-2xl font-bold text-center mb-4">Panel de Administración</h2>

      <CrearProducto />
      <ListarProductos />
      <CrearAdmin />
      <ListarAdmins />
      <ListarUsuarios />

      {/* Botón de salir */}
      
    </div>
  );
};

export default AdminDashboard;
