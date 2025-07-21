import { useState } from "react";
import axios from "axios";

const CrearProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [destacado, setDestacado] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [variantes, setVariantes] = useState([{ medida: "", precio: "" }]);

  const handleAgregarVariante = () => {
    setVariantes([...variantes, { medida: "", precio: "" }]);
  };

  const handleVarianteChange = (index, campo, valor) => {
    const nuevas = [...variantes];
    nuevas[index][campo] = valor;
    setVariantes(nuevas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !categoria || !imagen || variantes.length === 0) {
      return alert("Completa todos los campos obligatorios.");
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("categoria", categoria);
    formData.append("destacado", destacado);
    formData.append("variantes", JSON.stringify(variantes));
    formData.append("file", imagen);

    const token = localStorage.getItem("token");

    // 🟡 Consola para depuración antes del envío
    console.log("📦 Enviando producto...");
    console.log("Nombre:", nombre);
    console.log("Descripción:", descripcion);
    console.log("Categoría:", categoria);
    console.log("Destacado:", destacado);
    console.log("Variantes:", variantes);
    console.log("Imagen:", imagen?.name);
    console.log("Token:", token);

    try {
      const res = await axios.post(
        "https://catalogo-plomeria.onrender.com/api/productos",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Producto creado con éxito");
      // Reset form
      setNombre("");
      setDescripcion("");
      setCategoria("");
      setDestacado(false);
      setImagen(null);
      setVariantes([{ medida: "", precio: "" }]);
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
      alert("❌ Error al crear producto");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Crear nuevo producto</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <div className="flex items-center space-x-2">
          <label className="text-sm">¿Destacado?</label>
          <input
            type="checkbox"
            checked={destacado}
            onChange={(e) => setDestacado(e.target.checked)}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          className="w-full"
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium">Variantes:</label>
          {variantes.map((v, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Medida"
                value={v.medida}
                onChange={(e) => handleVarianteChange(index, "medida", e.target.value)}
                className="w-1/2 border p-2 rounded"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Precio"
                value={v.precio}
                onChange={(e) => handleVarianteChange(index, "precio", e.target.value)}
                className="w-1/2 border p-2 rounded"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAgregarVariante}
            className="text-sm text-blue-600 underline"
          >
            + Agregar otra variante
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CrearProducto;
