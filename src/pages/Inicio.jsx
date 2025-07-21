import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [codigoPais, setCodigoPais] = useState("+58");
  const navigate = useNavigate();

  const handleQuieroCotizar = () => {
    setMostrarFormulario(true);
  };

  const handleVerProductos = () => {
    navigate("/catalogo");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const numeroCompleto = `${codigoPais}${telefono}`;
    localStorage.setItem("clienteNombre", nombre);
    localStorage.setItem("clienteTelefono", numeroCompleto);
    navigate("/catalogo");
  };

  return (
    <div className="block sm:block md:hidden">
      <div className="w-full min-h-screen px-4 py-8 bg-white">
        <h2 className="text-xl font-bold text-center mb-6">Bienvenido</h2>

        {!mostrarFormulario ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/login-admin")}
              className="bg-gray-800 text-white py-2 rounded"
            >
              Ingresar como administrador
            </button>

            <button
              onClick={handleQuieroCotizar}
              className="bg-blue-600 text-white py-2 rounded"
            >
              Quiero una cotización
            </button>

            <button
              onClick={handleVerProductos}
              className="bg-green-600 text-white py-2 rounded"
            >
              Solo ver productos
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="p-2 border rounded text-sm"
              required
            />

            <div className="flex gap-2">
              <select
                value={codigoPais}
                onChange={(e) => setCodigoPais(e.target.value)}
                className="p-2 border rounded text-sm"
              >
                <option value="+58">🇻🇪 Venezuela (+58)</option>
                <option value="+57">🇨🇴 Colombia (+57)</option>
                <option value="+1">🇺🇸 Estados Unidos (+1)</option>
              </select>

              <input
                type="tel"
                placeholder="Ej: 4121234567"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="flex-1 p-2 border rounded text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 rounded"
            >
              Ver productos
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Inicio;
