// src/pages/SwitchDashboard.jsx
import { useNavigate } from "react-router-dom";
import { ShieldCheck, FileText, ShoppingCart } from "lucide-react";

const SwitchDashboard = () => {
  const navigate = useNavigate();

  const opciones = [
    {
      icono: <ShieldCheck className="w-10 h-10 text-blue-600" />,
      texto: "Administrador",
      ruta: "/login-admin",
      bg: "bg-blue-100",
    },
    {
      icono: <FileText className="w-10 h-10 text-green-600" />,
      texto: "Solicitar Cotización",
      ruta: "/login-usuario",
      bg: "bg-green-100",
    },
    {
      icono: <ShoppingCart className="w-10 h-10 text-gray-800" />,
      texto: "Ver Catálogo",
      ruta: "/neutral",
      bg: "bg-gray-200",
    },
  ];

  return (
<div className="w-full min-h-screen bg-gray-100 flex flex-col justify-center items-center px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        ¿Qué deseas hacer?
      </h1>

      <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
        {opciones.map((op, idx) => (
          <div
            key={idx}
            onClick={() => navigate(op.ruta)}
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow cursor-pointer transition transform active:scale-95 ${op.bg}`}
          >
            {op.icono}
            <p className="mt-2 font-semibold text-gray-700 text-center text-sm">
              {op.texto}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwitchDashboard;
