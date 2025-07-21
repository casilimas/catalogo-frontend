import { useState } from "react";

const FormularioCotizacion = ({ producto, onClose, onAdd }) => {
  const primeraVariante = producto?.variantes?.[0] || {};
  const [medida, setMedida] = useState(primeraVariante.medida || "");
  const [precio, setPrecio] = useState(primeraVariante.precio || 0);
  const [cantidad, setCantidad] = useState(1);

  const handleAgregar = () => {
    const item = {
      productoId: producto._id,
      nombre: producto.nombre,
      medida,
      precio,
      cantidad: parseInt(cantidad),
      subtotal: parseInt(cantidad) * precio,
    };

    onAdd(item); // ✅ Usa la función del padre
    onClose();   // Cierra el modal
  };

  const handleChangeMedida = (e) => {
    const seleccionada = producto.variantes.find(v => v.medida === e.target.value);
    setMedida(seleccionada.medida);
    setPrecio(seleccionada.precio);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-11/12 max-w-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{producto.nombre}</h3>

        <label className="block mb-1 text-sm text-gray-700">Medida:</label>
        <select
          value={medida}
          onChange={handleChangeMedida}
          className="w-full mb-3 p-2 border rounded"
        >
          {producto.variantes?.map((v) => (
            <option key={v._id} value={v.medida}>
              {v.medida} - ${v.precio}
            </option>
          ))}
        </select>

        <label className="block mb-1 text-sm text-gray-700">Cantidad:</label>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <p className="text-sm text-gray-600 mb-3">
          Precio unitario: ${precio.toFixed(2)}
        </p>

        <button
          onClick={handleAgregar}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-2"
        >
          Agregar al carrito
        </button>

        <button
          onClick={onClose}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default FormularioCotizacion;
