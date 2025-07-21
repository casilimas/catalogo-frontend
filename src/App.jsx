import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./index.css";
import { iniciarActividadBackend } from "./utils/actividad"; // ✅ importar el script

function App() {
  useEffect(() => {
    iniciarActividadBackend(); // ✅ iniciar el ping solo una vez al montar la app
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
