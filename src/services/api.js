import axios from "axios";

const api = axios.create({
  baseURL: "https://catalogo-plomeria.onrender.com/api",
});

export default api;
