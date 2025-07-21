// src/pages/Portada.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Portada = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/switch");
    }, 4000); // 4 segundos

    return () => clearTimeout(timer); // limpiar si se desmonta
  }, [navigate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black">
      <img
        src="/fire.png"
        alt="Bienvenida"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Portada;
