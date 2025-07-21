import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3900/api", // o tu URL en Render
});

export default api;
