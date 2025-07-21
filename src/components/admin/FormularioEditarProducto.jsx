import { useState } from "react";
import axios from "axios";

const FormularioEditarProducto = ({
  producto,
  onClose,
  onUpdated,
}) => {
  const [formState, setFormState] = useState({
    nombre: producto.nombre,
    descripcion: producto.descripcion || "",
    categoria: producto.categoria,
    destacado: producto.destacado,
    variantes: producto.variantes,
    imagen: null,
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleCheck = () => {
    setFormState({ ...formState, destacado: !formState.destacado });
  };

  const handleVarianteChange = (i, campo, valor) => {
    const nuevas = [...formState.variantes];
    nuevas[i][campo] = campo === "precio" ? parseFloat(valor) : valor;
    setFormState({ ...formState, variantes: nuevas });
  };

  const handleImagenChange = (e) => {
    setFormState({ ...formState, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre", formState.nombre);
      formData.append("descripcion", formState.descripcion);
      formData.append("categoria", formState.categoria);
      formData.append("destacado", formState.destacado);
      formData.append("variantes", JSON.stringify(formState.variantes));
      if (formState.imagen) {
        formData.append("file", formState.imagen);
      }

      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:3900/api/productos/${producto._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMensaje("✅ Producto actualizado");
      onUpdated(); // recarga lista
    } catch (error) {
      console.error("Error al actualizar:", error);
      setMensaje("❌ Error al actualizar producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 mt-2 rounded border text-sm space-y-2">
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formState.nombre}
          onChange={handleChange}
          className="border px-2 py-1 w-full rounded"
        />
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={formState.descripcion}
          onChange={handleChange}
          className="border px-2 py-1 w-full rounded"
        />
      </div>

      <div>
        <label>Categoría:</label>
        <input
          type="text"
          name="categoria"
          value={formState.categoria}
          onChange={handleChange}
          className="border px-2 py-1 w-full rounded"
        />
      </div>

      <div>
        <label>Destacado:</label>
        <input
          type="checkbox"
          checked={formState.destacado}
          onChange={handleCheck}
          className="ml-2"
        />
      </div>

      <div>
        <label>Variantes:</label>
        {formState.variantes.map((v, i) => (
          <div key={i} className="flex gap-2 mb-1">
            <input
              type="text"
              value={v.medida}
              onChange={(e) => handleVarianteChange(i, "medida", e.target.value)}
              placeholder="Medida"
              className="border px-2 py-1 rounded w-1/2"
            />
            <input
              type="number"
              value={v.precio}
              onChange={(e) => handleVarianteChange(i, "precio", e.target.value)}
              placeholder="Precio"
              className="border px-2 py-1 rounded w-1/2"
            />
          </div>
        ))}
      </div>

      <div>
        <label>Nueva imagen (opcional):</label>
        <input type="file" onChange={handleImagenChange} />
      </div>

      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          onClick={onClose}
          className="text-red-500 text-sm"
        >
          Cancelar
        </button>
      </div>

      {mensaje && <p className="text-xs mt-2 text-center">{mensaje}</p>}
    </form>
  );
};

export default FormularioEditarProducto;
