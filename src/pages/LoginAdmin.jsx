// src/pages/LoginAdmin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import api from "../services/api";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("Autenticando...");

    try {
      const res = await api.post("/login-admin", { email, password });
      const { token } = res.data;

      localStorage.setItem("token", token);
      setMensaje("Ingreso exitoso. Redirigiendo...");
      navigate("/admin"); // ✅ redirección corregida
    } catch (error) {
      console.error(error);
      setMensaje("Credenciales incorrectas o error de servidor.");
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white px-4 py-10 md:hidden">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Volver</span>
      </button>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
          Ingreso de Administrador
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-3 px-4 py-2 border rounded text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-3 px-4 py-2 border rounded text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700"
        >
          Ingresar
        </button>

        {mensaje && (
          <p className="text-center text-sm mt-4 text-gray-600">{mensaje}</p>
        )}
      </form>
    </div>
  );
};

export default LoginAdmin;
