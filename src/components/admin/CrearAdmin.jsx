import { useState, useEffect } from "react";
import axios from "axios";

const CrearAdmin = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
  });

  const [pais, setPais] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // ⏱️ Oculta mensajes automáticamente después de 3 segundos
  useEffect(() => {
    if (mensaje || error) {
      const timer = setTimeout(() => {
        setMensaje("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensaje, error]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMensaje("");
    setError("");
  };

  const handlePaisChange = (e) => {
    const selected = e.target.value;
    setPais(selected);

    if (selected === "VEN") {
      setForm((prev) => ({ ...prev, telefono: "+58" }));
    } else {
      setForm((prev) => ({ ...prev, telefono: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.password || !form.telefono) {
      return setError("Todos los campos son obligatorios");
    }

    try {
      const { data } = await axios.post("https://catalogo-plomeria.onrender.com/api/admin/registro", form);
      setMensaje(`✅ Admin registrado como: ${data.admin.nombre}`);
      setForm({ nombre: "", email: "", password: "", telefono: "" });
      setPais("");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message;
      if (msg && msg.includes("Ya existe un admin")) {
        setError("❌ Este usuario ya existe");
      } else {
        setError(msg || "Error al registrar admin");
      }
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">➕ Registrar Nuevo Administrador</h2>

      <form onSubmit={handleSubmit} className="space-y-3 text-sm">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        <div>
          <label>País:</label>
          <select
            value={pais}
            onChange={handlePaisChange}
            className="border px-2 py-1 w-full rounded"
          >
            <option value="">Seleccione un país</option>
            <option value="VEN">🇻🇪 Venezuela</option>
            <option value="COL">🇨🇴 Colombia</option>
            <option value="USA">🇺🇸 Estados Unidos</option>
          </select>
        </div>

        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
            placeholder="Ej: +58 4121234567"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Registrar Admin
        </button>

        {mensaje && <p className="text-green-600 mt-2">{mensaje}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CrearAdmin;
