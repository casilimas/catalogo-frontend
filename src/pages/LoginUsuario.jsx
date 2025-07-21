import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios"; // Asegúrate de tener axios instalado

const LoginUsuario = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("venezuela");
  const [telefono, setTelefono] = useState("");

  const codigos = {
    venezuela: "+58",
    colombia: "+57",
    eeuu: "+1",
  };

  useEffect(() => {
    setTelefono(codigos[pais] + " ");
  }, [pais]);

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    const codigo = codigos[pais];
    if (!value.startsWith(codigo)) {
      setTelefono(codigo + " ");
    } else {
      setTelefono(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codigo = codigos[pais];
    const numeroSinEspacios = telefono.replace(/\s+/g, "");

    if (!nombre.trim()) return alert("Ingresa tu nombre");
    if (!numeroSinEspacios || numeroSinEspacios.length <= codigo.length) {
      return alert("Ingresa tu número de teléfono completo");
    }

    try {
      const res = await axios.post("https://catalogo-plomeria.onrender.com/api/usuarios/registro", {
        nombre,
        telefono: numeroSinEspacios,
      });

      const usuario = res.data.user;

      // Opcional: guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirige al dashboard cliente
      navigate("/usuario", {
        state: {
          nombre: usuario.nombre,
          telefono: usuario.telefono,
          id: usuario._id,
        },
      });
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      alert("No se pudo registrar el usuario");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4 md:hidden">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm relative"
      >
        {/* Botón atrás */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Ingreso de Usuario
        </h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nombre completo:
        </label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Selecciona tu país:
        </label>
        <select
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="venezuela">Venezuela (+58)</option>
          <option value="colombia">Colombia (+57)</option>
          <option value="eeuu">EE.UU. (+1)</option>
        </select>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Número de teléfono:
        </label>
        <input
          type="tel"
          value={telefono}
          onChange={handleTelefonoChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginUsuario;
