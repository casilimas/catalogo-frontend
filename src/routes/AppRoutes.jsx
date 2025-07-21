// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import LoginAdmin from "../pages/LoginAdmin";
import LoginUsuario from "../pages/LoginUsuario";
import NeutralDashboard from "../dashboard/NeutralDashboard";
import SwitchDashboard from "../pages/SwitchDashboard";
import ClienteDashboard from "../dashboard/ClienteDashboard";
import AdminDashboard from "../dashboard/AdminDashboard";
import VistaPreviaCarrito from "../dashboard/VistaPreviaCarrito";
import Portada from "../pages/Portada"; 

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Portada />} /> 
    <Route path="/switch" element={<SwitchDashboard />} />
    <Route path="/login-admin" element={<LoginAdmin />} />
    <Route path="/login-usuario" element={<LoginUsuario />} />
    <Route path="/usuario" element={<ClienteDashboard />} />
    <Route path="/neutral" element={<NeutralDashboard />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/carrito" element={<VistaPreviaCarrito />} />

    {/* Redirección por defecto */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
